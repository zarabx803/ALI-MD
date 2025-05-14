const { cmd } = require('../command');

cmd({
    pattern: "chai",
    desc: "Displays a quirky chai-samosa themed animated message.",
    category: "tools",
    react: "☕",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const loadingMessage = await conn.sendMessage(from, { text: '☕' });
        const chaiMessages = [
            "☕", "🥟", "😋", "🍵", "🌧️", "🥳",
            "🍪", "🔥", "☕", "🥟", "😋", "🍵",
            "🌧️", "🥳", "🍪", "🔥", "☕", "🥟",
            "😋", "🍵", "🌧️", "🥳", "🍪", "🔥"
        ];

        for (const line of chaiMessages) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: loadingMessage.key,
                        type: 14,
                        editedMessage: {
                            conversation: line,
                        },
                    },
                },
                {}
            );
        }
        await conn.sendMessage(from, { text: "Chai-Samosa Time! ☕🥟" });
    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
// PLUGIN ATTITUDE 🪧
AUTHOR : ROMEK-XD 🤫

cmd({
    pattern: "attitude",
    desc: "Displays a sassy desi attitude-themed animated message.",
    category: "tools",
    react: "😏",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const loadingMessage = await conn.sendMessage(from, { text: '😏 ATTITUDE ON!' });
        const attitudeMessages = [
            "😏 Chal Bey! 💅\n   _____\n  /     \\\n /_______\\\n |  😏  | \n |  💅  | \n |_______|",
            "😏 Apun Ka Style! 😈\n   _____\n  /     \\\n /_______\\\n |  😏  | \n |  😈  | \n |_______|",
            "😏 Dekh Kya Raha? 😎\n   _____\n  /     \\\n /_______\\\n |  😏  | \n |  😎  | \n |_______|",
            "😏 Attitude King! 👑\n   _____\n  /     \\\n /_______\\\n |  😏  | \n |  👑  | \n |_______|",
            "😏 Sabse Alag! 🌟\n   _____\n  /     \\\n /_______\\\n |  😏  | \n |  🌟  | \n |_______|",
            "😏 Desi Swag! 😜\n   _____\n  /     \\\n /_______\\\n |  😏  | \n |  😜  | \n |_______|"
        ];

        for (const message of attitudeMessages) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for 500ms
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: loadingMessage.key,
                        type: 14,
                        editedMessage: {
                            conversation: message,
                        },
                    },
                },
                {}
            );
        }
        await conn.sendMessage(from, { text: "Attitude Mein No. 1! 😏👑" });
    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});
