const config = require('../config');
const { cmd } = require('../command');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the group',
    async execute(conn, message, { from, isOwner, isAdmins, isGroup, args, reply }) {
        // Check if the message is from a group
        if (!isGroup) {
            return reply('This command can only be used in groups.');
        }

        // Check if the user has permission to use the command
        if (!isOwner && !isAdmins) {
            return reply('Only owners and admins can use this command.');
        }

        // Ensure a user is mentioned to be kicked
        if (args.length === 0) {
            return reply('Please mention a user to kick.');
        }

        const userToKick = args[0].replace('@', '') + '@s.whatsapp.net';

        // Kick the user
        try {
            await conn.groupParticipantsUpdate(from, [userToKick], 'remove');
            reply(`User @${userToKick.split('@')[0]} has been kicked.`, null, { mentions: [userToKick] });
        } catch (error) {
            reply('An error occurred while trying to kick the user.');
        }
    },
};