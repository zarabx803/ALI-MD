const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "kick",
    desc: "Removes a participant by replying to or mentioning their message.",
    react: "🚪",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`❌ This command can only be used in groups.`);
        
        // Only admins or the owner can use this command
        if (!isAdmins && !isOwner) return reply(`❌ Only group admins or the owner can use this command.`);
        
        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`❌ I need admin privileges to remove group members.`);
        
        // Retrieve the target participant via a reply or a mention
        let target;
        if (quoted) {
            target = quoted.sender; // Use the sender of the quoted message
        } else if (mek.message && mek.message.mentionedJid && mek.message.mentionedJid.length > 0) {
            target = mek.message.mentionedJid[0]; // Use the first mentioned ID
        }
        
        if (!target) {
            return reply(`❌ Please mention or reply to the message of the participant to remove.`);
        }
        
        // Remove the participant from the group
        await conn.groupParticipantsUpdate(from, [target], "remove")
            .catch(err => {
                console.error(`⚠️ Failed to remove ${target}:`, err);
                return reply(`❌ An error occurred while trying to remove the participant.`);
            });
        
        // Send a confirmation message upon successful removal
        reply(`✅ Success! The participant has been removed from the group.`);
    } catch (e) {
        console.error('Error while executing kick:', e);
        reply('❌ An error occurred while executing the command.');
    }
});
