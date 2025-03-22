const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const util = require("util");
const { getAnti, setAnti, initializeAntiDeleteSettings } = require('../data/antidel');

initializeAntiDeleteSettings();

cmd({
    pattern: "antidelete",
    alias: ['antidel', 'ad'],
    desc: "Sets up the Antidelete",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, text, isCreator, fromMe }) => {
    if (!isCreator) return reply('This command is only for the bot owner');
    try {
        const command = q?.toLowerCase();

        switch (command) {
            case 'off':
                await setAnti('gc', false);
                await setAnti('dm', false);
                return reply('*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ɪs ɴᴏᴡ ᴏғғ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ᴀɴᴅ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs.*');

            case 'off gc':
                await setAnti('gc', false);
                return reply('*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*');

            case 'off dm':
                await setAnti('dm', false);
                return reply('*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ.*');

            case 'gc':
                const gcStatus = await getAnti('gc');
                await setAnti('gc', !gcStatus);
                return reply(`*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ${!gcStatus ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}.*`);

            case 'dm':
                const dmStatus = await getAnti('dm');
                await setAnti('dm', !dmStatus);
                return reply(`*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs ${!dmStatus ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}.*`);

            case 'on':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴍᴇsɢ sᴇᴛ ғᴏʀ ᴀʟʟ ᴄʜᴀᴛs.*');

            case 'status':
                const currentDmStatus = await getAnti('dm');
                const currentGcStatus = await getAnti('gc');
                return reply(`*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴛᴀᴛᴜs*\n\n*ᴅᴍ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ:* ${currentDmStatus ? '*ᴇɴᴀʙʟᴇᴅ*' : '*ᴅɪsᴀʙʟᴇᴅ*'}\n*ɢʀᴏᴜᴘ ᴄʜᴀᴛ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ:* ${currentGcStatus ? '*ᴇɴᴀʙʟᴇᴅ*' : '*ᴅɪsᴀʙʟᴇᴅ*'}`);

            default:
                const helpMessage = `❒ *ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴄᴏᴍᴍᴀɴᴅ ɢᴜɪᴅᴇ ❒*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏɴ* - _*ʀᴇꜱᴇᴛ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ᴀʟʟ ᴄʜᴀᴛꜱ (ᴅɪꜱᴀʙʟᴇᴅ ʙʏ ᴅᴇꜰᴀᴜʟᴛ)*_
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏꜰꜰ ɢᴄ* - *_ᴅɪꜱᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏꜰꜰ ᴅᴍ* - *_ᴅɪꜱᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇꜱꜱᴀɢᴇꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴇᴛ ɢᴄ*- *_ᴛᴏɢɢʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴇᴛ ᴅᴍ*- *_ᴛᴏɢɢʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇꜱꜱᴀɢᴇꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴇᴛ ᴀʟʟ* - *_ᴇɴᴀʙʟᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜰᴏʀ ᴀʟʟ ᴄʜᴀᴛꜱ_*
                *• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴛᴀᴛᴜꜱ* - *_ᴄʜᴇᴄᴋ ᴄᴜʀʀᴇɴᴛ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴛᴀᴛᴜꜱ_*`;

                return reply(helpMessage);
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("An error occurred while processing your request.");
    }
});


cmd({
    pattern: "vv",
    alias: ['retrive', '🔥'],
    desc: "Fetch and resend a ViewOnce message content (image/video).",
    category: "misc",
    use: '<query>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // Get quoted message

        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const quot = quotedMessage.viewOnceMessageV2;
            if (quot.message.imageMessage) {
                let cap = quot.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.audioMessage) {
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.audioMessage);
                return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
            }
        }

        // If there is no quoted message or it's not a ViewOnce message
        if (!m.quoted) return reply("Please reply to a ViewOnce message.");
        if (m.quoted.mtype === "viewOnceMessage") {
            if (m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            else if (m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
        } else if (m.quoted.message.audioMessage) {
            let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.audioMessage);
            return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
        } else {
            return reply("This is not a ViewOnce message.");
        }
    } catch (e) {
        console.log("Error:", e);
        reply("An error occurred while fetching the ViewOnce message.");
    }
});

// if you want use the codes give me credit on your channel and repo in this file and my all files 
