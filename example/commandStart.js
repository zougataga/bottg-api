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
    console.log(client);

});

client.on("message", (data) => {
    const text = data?.text;
    if (text && text.startsWith(`/start`)) {
        client.api.sendMessage({ chat_id: data.chat.id, text: `@${data.from.username} Hey` });
    }
})

client.bot.start();
