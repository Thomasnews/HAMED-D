const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["61563485781052"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("𝐲𝐨 𝐚𝐫𝐫𝐞̂𝐭𝐞 𝐝𝐞 𝐟𝐚𝐢𝐫𝐞 𝐭𝐚 𝐩𝐮̂𝐭 🙂...🖕🖕", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝐟𝐢𝐜𝐡𝐢𝐞𝐫 𝐧𝐚𝐦𝐞 ✨", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`𝐝𝐞𝐬𝐬𝐨𝐥𝐞́ 𝐛𝐨𝐬𝐬 𝐣'𝐚𝐢 𝐩𝐚𝐬 𝐜𝐞𝐭𝐭𝐞 𝐜𝐦𝐝 𝐞𝐧 𝐦𝐚 𝐩𝐨𝐬𝐬𝐞𝐬𝐬𝐢𝐨𝐧  [❌]: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
