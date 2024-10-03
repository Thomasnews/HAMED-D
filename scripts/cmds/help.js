const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🎶🎧 | REZ BOT V2 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "destruction", // original author Kshitiz 
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `\n█⧠⧠⧠✰🔵.✰.🔵✰⧠⧠⧠█.\n\n█⧠✰𝗚𝗢𝗔𝗧𝗕𝗢𝗧✰..V3✰⧠█\n`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n█⧠⧠⧠✰⚪.✰.⚪✰⧠⧠⧠█.\n│ 👉🏽『  ${category.toUpperCase()}  』`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 1).map((item) => `👉✰${item}✰↫`);
            msg += `\n│ ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += `\n█⧠⧠⧠✰⚪.✰.⚪✰⧠⧠⧠█.`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n𝗜 𝗵𝗮𝘃𝗲   ${totalCommands} 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 \n⚪\n`;
      msg += ` 𝘄𝗿𝗶𝘁𝗲 ${prefix} 𝗵𝗲𝗹𝗽 + 𝗰𝗺𝗱 𝗻𝗮𝗺𝗲, 𝗧𝗼 𝗳𝗶𝗻𝗱 𝗼𝘂𝘁 𝗺𝗼𝗿𝗲 \n⚪\n`;
      msg += `𝗜 𝘀𝘁𝗮𝗿𝘁 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗶𝗱𝗲𝗮 𝘁𝗵𝗲𝗻 𝗜 𝗹𝗼𝗼𝗸 𝗳𝗼𝗿 𝗵𝗼𝘄 𝘁𝗼 𝗺𝗮𝗸𝗲 𝗶𝘁 🟢V4`; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.ibb.co/DtnQdTX/image.jpg", // add image link here
                "https://i.ibb.co/rwjP8Hn/image.jpg",
        "https://i.ibb.co/Tw4N8DR/image.jpg",
        // Add more image links as needed
      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭── NOM ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Autres noms : ${configCommand.aliases ? configCommand.aliases.join(", ") : "Ne pas avoir"}
  │ Autres noms dans votre groupe : Je n'en ai pas
  │ Version: ${configCommand.version || "1.0"}
  │ Rôle : \n${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: \n${author}
  ├── utilisation
  │ ${usage}
  ├── Notes
  │ The content inside <XXXXX> can be changed
  │ The content inside [a|b|c] is A or B or C
  ╰━━━━━━━❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
            }
