const bottgApi = require("../");
const client = new bottgApi("TOKEN");

// EVENTS
client.on("ready", async () => {
    const botInfo = await client.user;
    // -> Object
    // {
    //       id: 5463762196,
    //       is_bot: true,
    //       first_name: 'Rez UHQ 💸',
    //       username: 'test994494999bot',
    //       can_join_groups: true,
    //       can_read_all_group_messages: false,
    //       supports_inline_queries: false
    //   }
    console.log(`BOT LOGIN (${botInfo.first_name} [${botInfo.username}])`);

    // SENDMESSAGE
    client.api.sendMessage({ chat_id: "1463191256", text: "test" })

    console.log(client.api);
    // -> Array
    // {
    //     addStickerToSet: [Function (anonymous)],
    //     answerCallbackQuery: [Function (anonymous)],
    //     answerInlineQuery: [Function (anonymous)],
    //     answerPreCheckoutQuery: [Function (anonymous)],
    //     answerShippingQuery: [Function (anonymous)],
    //     close: [Function (anonymous)],
    //     createNewStickerSet: [Function (anonymous)],
    //     deleteChatPhoto: [Function (anonymous)],
    //     deleteChatStickerSet: [Function (anonymous)],
    //     deleteMessage: [Function (anonymous)],
    //     deleteMyCommands: [Function (anonymous)],
    //     deleteStickerFromSet: [Function (anonymous)],
    //     editMessageCaption: [Function (anonymous)],
    //     editMessageLiveLocation: [Function (anonymous)],
    //     editMessageMedia: [Function (anonymous)],
    //     editMessageReplyMarkup: [Function (anonymous)],
    //     editMessageText: [Function (anonymous)],
    //     exportChatInviteLink: [Function (anonymous)],
    //     forwardMessage: [Function (anonymous)],
    //     getFile: [Function (anonymous)],
    //     getGameHighScores: [Function (anonymous)],
    //     getMe: [Function (anonymous)],
    //     getMyCommands: [Function (anonymous)],
    //     getUpdates: [Function (anonymous)],
    //     getVoice: [Function (anonymous)],
    //     getWebhookInfo: [Function (anonymous)],
    //     kickChatMember: [Function (anonymous)],
    //     logOut: [Function (anonymous)],
    //     pinChatMessage: [Function (anonymous)],
    //     promoteChatMember: [Function (anonymous)],
    //     restrictChatMember: [Function (anonymous)],
    //     sendAnimation: [Function (anonymous)],
    //     sendAudio: [Function (anonymous)],
    //     sendChatAction: [Function (anonymous)],
    //     sendContact: [Function (anonymous)],
    //     sendDice: [Function (anonymous)],
    //     sendDocument: [Function (anonymous)],
    //     sendGame: [Function (anonymous)],
    //     sendInvoice: [Function (anonymous)],
    //     sendLocation: [Function (anonymous)],
    //     sendMediaGroup: [Function (anonymous)],
    //     sendMessage: [Function (anonymous)],
    //     sendPhoto: [Function (anonymous)],
    //     sendPoll: [Function (anonymous)],
    //     sendSticker: [Function (anonymous)],
    //     sendVenue: [Function (anonymous)],
    //     sendVideo: [Function (anonymous)],
    //     sendVideoNote: [Function (anonymous)],
    //     sendVoice: [Function (anonymous)],
    //     sendVoiceNote: [Function (anonymous)],
    //     setChatAdministratorCustomTitle: [Function (anonymous)],
    //     setChatDescription: [Function (anonymous)],
    //     setChatPermissions: [Function (anonymous)],
    //     setChatPhoto: [Function (anonymous)],
    //     setChatStickerSet: [Function (anonymous)],
    //     setChatTitle: [Function (anonymous)],
    //     setGameScore: [Function (anonymous)],
    //     setMyCommands: [Function (anonymous)],
    //     setPassportDataErrors: [Function (anonymous)],
    //     setStickerPositionInSet: [Function (anonymous)],
    //     setWebhook: [Function (anonymous)],
    //     stopMessageLiveLocation: [Function (anonymous)],
    //     stopPoll: [Function (anonymous)],
    //     unbanChatMember: [Function (anonymous)],
    //     unpinChatMessage: [Function (anonymous)],
    //     uploadStickerFile: [Function (anonymous)]
    //   }
});
client.on("error", (err) => console.log(err));
client.on("message", (data) => console.log(data));
client.on("edited_message", (data) => console.log(data));
client.on("channel_post", (data) => console.log(data));
client.on("edited_channel_post", (data) => console.log(data));
client.on("inline_query", (data) => console.log(data));
client.on("chosen_inline_result", (data) => console.log(data));
client.on("callback_query", (data) => console.log(data));


client.bot.start();
// client.bot.stop();