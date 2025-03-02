const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "kick",
    react: "🚪",
    alias: ["remove"],
    desc: "To Remove a participant from Group",
    category: "group",
    use: '.kick',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/Um4r719/UD-MD-DATA/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
  
		let users = mek.mentionedJid ? mek.mentionedJid[0] : mek.msg.contextInfo.participant || true;
			if (!users) return reply("*📛 ᴘʟᴇᴀsᴇ ᴍᴇɴᴛɪᴏɴ ᴀ ɢᴀʏ ᴇxᴀᴍᴘʟᴇ .ᴋɪᴄᴋ @⁨ᴜsᴇʀ*")

			await conn.groupParticipantsUpdate(from, [users], "remove")
			await conn.sendMessage(from,{text:`_*Successfully Removed ✅*_`},{quoted:mek })
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )
