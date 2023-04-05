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

    client.api.sendMessage({
        chat_id: "-662126450",
        text: "test",
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Hey", callback_data: "hey" }] // 1er components
            ]
        })
    });
});

client.on("callback_query", async (data) => {
    const user = data.from;
    console.log(user);
    if (data.data == "hey") {
        await client.api.answerCallbackQuery({ callback_query_id: data.id, text: "Hello!" });
        console.log(`Hey @${user.username}`);
    }
});

client.bot.start();
// client.bot.stop();