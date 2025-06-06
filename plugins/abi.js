

const axios = require("axios");
const { cmd } = require("../command");
cmd({
    pattern: "gpt",
    alias: ["bot", "dj", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("*🧃 ρℓєαѕє ρʀσνι∂є α мєѕѕαgє fσʀ тнє αι єχαмρℓє: .αι нєℓℓσ*");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await reply(`🤖 *AI Response:*\n\n${data.message}`);
        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});

cmd({
    pattern: "llama3",
    desc: "Get a response from Llama3 AI using the provided prompt.",
    category: "ai",
    react: "🤖",
    filename: __filename,
    use: ".llama3 <your prompt>"
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        // Check if a prompt is provided by the user
        if (!q) return reply("⚠️ Please provide a prompt for Llama3 AI.");

        // Inform the user that the request is being processed
        await reply("> *Processing your prompt...*");

        // API URL with encoded user prompt
        const apiUrl = `https://api.davidcyriltech.my.id/ai/llama3?text=${encodeURIComponent(q)}`;

        // Send a GET request to the API
        const response = await axios.get(apiUrl);
        console.log("Llama3 API Response:", response.data);

        // Extract AI response
        let llamaResponse;
        if (typeof response.data === "string") {
            llamaResponse = response.data.trim();
        } else if (typeof response.data === "object") {
            llamaResponse = response.data.response || response.data.result || JSON.stringify(response.data);
        } else {
            llamaResponse = "Unable to process the AI response.";
        }

        // AI image to attach
        const AI_IMG = 'https://i.ibb.co/JjD7C5sj/4396ea90a1dcd020.jpg'; // Replace with a valid image URL

        // Formatted response text
        const formattedInfo = `*🤖 ʟʟᴀᴍᴀ3 ʀᴇsᴘᴏɴsᴇ:*\n\n${llamaResponse}`;

        // Send the response with an image
        await conn.sendMessage(from, {
            image: { url: AI_IMG }, // Ensure the URL is valid
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363318387454868@newsletter',
                    newsletterName: '𝐀ɭι̇ι̇ 𝐌Ɗ 𝐀𝐈 🤖',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in llama3 command:", error);
        return reply(`❌ An error occurred: ${error.message}`);
    }
});
cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("OpenAI failed to respond. Please try again later.");
        }

        await reply(`🧠 *OpenAI Response:*\n\n${data.result}`);
        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply("An error occurred while communicating with OpenAI.");
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("DeepSeek AI failed to respond. Please try again later.");
        }

        await reply(`🧠 *DeepSeek AI Response:*\n\n${data.answer}`);
        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with DeepSeek AI.");
    }
});
