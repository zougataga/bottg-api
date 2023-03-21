## DiscordQrCode

[![discord-qrcode on npm](https://img.shields.io/npm/v/discord-qrcode.svg)](https://www.npmjs.com/package/discord-qrcode)

## Installation

```python
npm i discord-qrcode
```

## Example

```js
const
    discordQrCode = require("../"),
    client = new discordQrCode({
        path: "./qrcode.png",
        template: "./nitro.png"
    });

client
    .on("open", () => {
        console.log("Websocket Open");
    })
    .on("close", () => {
        console.log("Websocket close");
    })
    .on("error", (err) => {
        console.log("Websocket error: ", err);
    })
    .on("qrcodeCreate", (data) => {
        console.log("qrcodeCreate: ", data);
    })
    .on("pending", (user) => {
        console.log("Qrcode scanner, en attente d'autorisation: ", user);
        // -> Qrcode scanner, en attente d'autorisation:  {
        //   id: '282127911690174475',
        //   discriminator: '2139',
        //   avatar: '0',
        //   username: 'jspfkdkshhtlz',
        //   avatarUrl: ''
        // }
    })
    .on("login", (data) => {

        console.log("Login Data: ", data);


        if (data.token.captcha) {
            // -> Login Data:  {
            //     id: '282127911690174475',
            //     discriminator: '2139',
            //     avatar: '0',
            //     username: 'jspfkdkshhtlz',
            //     avatarUrl: '',
            //     token: {
            //     ticket: '*************************************',        
            //     captcha: {
            //       captcha_key: [Array],
            //       captcha_sitekey: 'b2b02ab5-7dae-4d6f-830e-7b55634c888b',
            //       captcha_service: 'hcaptcha',
            //       captcha_rqdata: '*****************************Yb2xV7mA9G7b3DJKfvlIb7Yrv9UtQbr+fMlL8IaZPQF1gkpQGfG9zGCNFRHi5FDvNBo7g2dTVwTev3jXsQ38uSd0xFC3hYVrFFsjYPH9EMZBpwZv7YalrmS5tNoRVDB+GfhlL7bTUtWZlW3L',
            //       captcha_rqtoken: '****************************kTVRTSitaRURod0tmUUhoMjlXdDJVdFhDWkE9PTl3WmZiUVZHT0x2aE5iblEi.ZBnIcw.dNz0sBq69JDiD2Ei5l7tNowVg_U'      
            //     }
            //   }
            //   }


            console.log(`Impossible de recuperer le token de ${data.token.ticket}\nCaptcha:`, data.token.captcha);


            // -> Code pour solve un captcha

            // -> Decrypter le token avec le captcha solved: 
            // client.findRealToken(ticket, CAPTCHASOLUTION);
            return
        };

        // -> Login Data:  {
        //     id: '282127911690174475',
        //     discriminator: '2139',
        //     avatar: '0',
        //     username: 'jspfkdkshhtlz',
        //     avatarUrl: '',
        //     token: '*****************************************************'
        //   }
    })
```