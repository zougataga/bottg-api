const EventEmitter = require('eventemitter3');

class client extends EventEmitter {
    #baseUrl;

    constructor(token) {
        super();
        if (!token) throw TypeError("BotError - Token not found!");
        this.#baseUrl = 'https://api.telegram.org/bot' + token + '/';
        const
            self = this,
            api_methods = [
                { method: 'addStickerToSet', request_method: 'POST' },
                { method: 'answerCallbackQuery', request_method: 'POST' },
                { method: 'answerInlineQuery', request_method: 'POST' },
                { method: 'answerPreCheckoutQuery', request_method: 'POST' },
                { method: 'answerShippingQuery', request_method: 'POST' },
                { method: 'close', request_method: 'GET' },
                { method: 'createNewStickerSet', request_method: 'POST' },
                { method: 'deleteChatPhoto', request_method: 'POST' },
                { method: 'deleteChatStickerSet', request_method: 'POST' },
                { method: 'deleteMessage', request_method: 'POST' },
                { method: 'deleteMyCommands', request_method: 'POST' },
                { method: 'deleteStickerFromSet', request_method: 'POST' },
                { method: 'editMessageCaption', request_method: 'POST' },
                { method: 'editMessageLiveLocation', request_method: 'POST' },
                { method: 'editMessageMedia', request_method: 'POST' },
                { method: 'editMessageReplyMarkup', request_method: 'POST' },
                { method: 'editMessageText', request_method: 'POST' },
                { method: 'exportChatInviteLink', request_method: 'POST' },
                { method: 'forwardMessage', request_method: 'POST' },
                { method: 'getFile', request_method: 'POST' },
                { method: 'getGameHighScores', request_method: 'POST' },
                { method: 'getMe', request_method: 'GET' },
                { method: 'getMyCommands', request_method: 'GET' },
                { method: 'getUpdates', request_method: 'GET' },
                { method: 'getVoice', request_method: 'POST' },
                { method: 'getWebhookInfo', request_method: 'GET' },
                { method: 'kickChatMember', request_method: 'POST' },
                { method: 'logOut', request_method: 'GET' },
                { method: 'pinChatMessage', request_method: 'POST' },
                { method: 'promoteChatMember', request_method: 'POST' },
                { method: 'restrictChatMember', request_method: 'POST' },
                { method: 'sendAnimation', request_method: 'POST' },
                { method: 'sendAudio', request_method: 'POST', sendFile: true },
                { method: 'sendChatAction', request_method: 'POST' },
                { method: 'sendContact', request_method: 'POST' },
                { method: 'sendDice', request_method: 'POST' },
                { method: 'sendDocument', request_method: 'POST', sendFile: true },
                { method: 'sendGame', request_method: 'POST' },
                { method: 'sendInvoice', request_method: 'POST' },
                { method: 'sendLocation', request_method: 'POST' },
                { method: 'sendMediaGroup', request_method: 'POST' },
                { method: 'sendMessage', request_method: 'POST' },
                { method: 'sendPhoto', request_method: 'POST', sendFile: true },
                { method: 'sendPoll', request_method: 'POST' },
                { method: 'sendSticker', request_method: 'POST', sendFile: true },
                { method: 'sendVenue', request_method: 'POST' },
                { method: 'sendVideo', request_method: 'POST', sendFile: true },
                { method: 'sendVideoNote', request_method: 'POST' },
                { method: 'sendVoice', request_method: 'POST', sendFile: true },
                { method: 'sendVoiceNote', request_method: 'POST' },
                { method: 'setChatAdministratorCustomTitle', request_method: 'POST' },
                { method: 'setChatDescription', request_method: 'POST' },
                { method: 'setChatPermissions', request_method: 'POST' },
                { method: 'setChatPhoto', request_method: 'POST' },
                { method: 'setChatStickerSet', request_method: 'POST' },
                { method: 'setChatTitle', request_method: 'POST' },
                { method: 'setGameScore', request_method: 'POST' },
                { method: 'setMyCommands', request_method: 'POST' },
                { method: 'setPassportDataErrors', request_method: 'POST' },
                { method: 'setStickerPositionInSet', request_method: 'POST' },
                { method: 'setWebhook', request_method: 'POST' },
                { method: 'stopMessageLiveLocation', request_method: 'POST' },
                { method: 'stopPoll', request_method: 'POST' },
                { method: 'unbanChatMember', request_method: 'POST' },
                { method: 'unpinChatMessage', request_method: 'POST' },
                { method: 'uploadStickerFile', request_method: 'POST' }
            ];
        let methods = {};
        for (const data of api_methods) {
            const { method, request_method, sendFile = undefined } = data;
            methods[method] = (apidata = {}) => {
                return self.#request({ data: apidata, method, sendFile: sendFile }, request_method)
                    .catch(err => self.emit("error", err));
            };

        };
        this.api = methods;
        this.user =  self.#verifToken();
        this.offset = 0;
        this.stopLoop = null;
        this.bot = {
            start() {
                self.emit("ready");
                self.#polling();
            },
            stop: () => {
                this.stopLoop = true;
            }
        }
    }

    // command(cmd, call) {
    //     this.on("message", (data) => {
    //         const text = data?.text;
    //         if (text && text.startsWith(`/${cmd}`)) call(data);
    //     })
    // }

    async #verifToken() {
        const exist = await this.api.getMe();
        if (!exist) throw new TypeError("BotError - Token is not valid !");
        return exist;
    }

    async #polling() {
        let offset = this.offset;
        while (!this.stopLoop) {
            try {
                const res = await this.#request({ data: { offset, timeout: 50 }, method: "getUpdates" });
                res?.forEach((result) => {
                    offset = result.update_id;
                    if (result.message) this.emit("message", result.message);
                    if (result.edited_message) this.emit("edited_message", result.edited_message);
                    if (result.channel_post) this.emit("channel_post", result.channel_post);
                    if (result.edited_channel_post) this.emit("edited_channel_post", result.edited_channel_post);
                    if (result.inline_query) this.emit("inline_query", result.inline_query);
                    if (result.chosen_inline_result) this.emit("chosen_inline_result", result.chosen_inline_result);
                    if (result.callback_query) this.emit("callback_query", result.callback_query);
                });
                this.emit("polling", offset);
                offset++;
            } catch (err) {
                console.log("Error occurred:", err);
            }
        }
    }

    #request(config, method = "POST") {
        let
            url = this.#baseUrl + config.method,
            requestOptions = {}

        if (method === 'GET' || method === 'HEAD') {
            const qs = Object.entries(config.data)
                .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
                .join('&');
            if (qs) url += `?${qs}`;
        } else {
            const
                headers = config.sendfile ? {} : { 'Content-Type': 'application/json' },
                body = config.sendfile ? config.data : JSON.stringify(config.data);
            requestOptions = { method, headers, body, }
        };

        return fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                return data?.result;
            })
            .catch(error => {
                return;
                // throw error;
            });

    }
}
module.exports = client;