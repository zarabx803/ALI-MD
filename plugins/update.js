const config = require('../config');
let fs = require('fs');
const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "update",
    react: "👾",
    desc: "Update Repo GitHub",
    category: "system",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/itx-alii-raza/ALI-MD.git'; 
        const targetFolder = 'plugins';

        
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder); 
        }


        const gitCommand = fs.existsSync(`${targetFolder}/.git`)
            ? `git -C ${targetFolder} pull`
            : `git clone ${repoUrl} ${targetFolder}`;


        await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) {
                    reject(`Git command failed: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            });
        });

        await conn.sendMessage(from, { text: '*✅ Update completed successfully!*' }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply(`_*ʀᴇᴅᴇᴘʟᴏʏ ʙᴏᴛ ᴜᴘᴅᴀᴛᴇ ʙᴏᴛ ᴛʜʀᴏᴡ ᴄᴏᴍᴍᴀɴᴅ ᴡɪʟʟ ʙᴇ ᴀᴠᴀɪʟᴀʙʟᴇ sᴏᴏɴ..*_`);
    }
});
