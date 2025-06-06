const fs = require("fs");
const { cmd, commands } = require('../command');
const config = require('../config');
const axios = require('axios');
const prefix = config.PREFIX;
const AdmZip = require("adm-zip");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');
const { exec } = require('child_process');
const FormData = require('form-data');
const { setConfig, getConfig } = require("../lib/configdb");
const {sleepp} = require('../lib/functions')


cmd({
  pattern: "update",
  desc: "Pull the latest code from GitHub repo (ZIP method)",
  react: "🆕",
  category: "owner",
  filename: __filename
}, async (client, message, args, { reply, isOwner }) => {
  if (!isOwner) return reply("❌ Owner only.");

  try {
    await reply("🛠 Downloading latest update from GitHub...");
    
    const zipUrl = "https://github.com/itx-alii-raza/ALI-MD/archive/refs/heads/main.zip";
    const zipPath = path.join(__dirname, "repo.zip");
    const extractPath = path.join(__dirname, "update_tmp");

    // دانلود ZIP
    const { data } = await axios.get(zipUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(zipPath, data);

    // آنزیپ
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);

    // پوشه اصلی پروژه در داخل ZIP
    const extractedFolder = fs.readdirSync(extractPath).find(f => fs.statSync(path.join(extractPath, f)).isDirectory());
    const source = path.join(extractPath, extractedFolder);
    const target = path.join(__dirname, ".."); // روت پروژه

    // کپی محتوا
    const copyFolderSync = (src, dest) => {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

      for (const item of fs.readdirSync(src)) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (["config.js", "app.json"].includes(item)) continue;

        if (fs.lstatSync(srcPath).isDirectory()) {
          copyFolderSync(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };

    copyFolderSync(source, target);

    // حذف فایل‌ها
    fs.unlinkSync(zipPath);
    fs.rmSync(extractPath, { recursive: true, force: true });

    await reply("✅ Update completed successfully...");
        await sleep(1500);  
        exec("pm2 restart all");  
  } catch (err) {
    console.error("Update error:", err);
    reply("❌ Update failed: " + err.message);
  }
});
