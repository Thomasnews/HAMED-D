module.exports = {
  config: {
    name: "respect",
    aliases: ["boss","respect"],
    version: "1.0",
    author: "AceGun x Samir Œ",
    countDown: 0,
    role: 0,
    shortDescription: "Give admin and show respect",
    longDescription: "Gives admin  in the thread and shows a respectful message.",
    category: "owner",
    guide: "{pn} respect",
  },

  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);

      const permission = ["61563485781052",];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "👉🧠𝐭𝐢𝐞𝐧 𝐩𝐫𝐞𝐧𝐝 𝐜'𝐞𝐬𝐭 𝐮𝐧 𝐜𝐚𝐝𝐞𝐚𝐮, 𝐩𝐚𝐫𝐜𝐞 𝐪𝐮𝐞 𝐣'𝐚𝐢 𝐫𝐞𝐦𝐚𝐫𝐪𝐮𝐞́ 𝐪𝐮𝐞 𝐭𝐮 𝐧'𝐞𝐧 𝐩𝐫𝐨𝐜𝐞̀𝐝𝐞 𝐩𝐚𝐬...🙂",
          event.threadID,
          event.messageID
        );
api.setMessageReaction("🖕", event.messageID, () => {}, true);
      }

      const threadID = event.threadID;
      const adminID = event.senderID;
      
      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);

      api.sendMessage(
        `𝐛𝐨𝐬𝐬 𝐯𝐨𝐮𝐬 𝐞̂𝐭𝐞𝐬 𝐦𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐭 𝐫𝐞𝐜𝐨𝐧𝐧𝐮 𝐝𝐞𝐬 𝐃𝐢𝐞𝐮𝐱 𝐜𝐨𝐦𝐦𝐞 𝐥𝐞 𝐛𝐨𝐬𝐬 𝐬𝐮𝐩𝐫𝐞̂𝐦𝐞 𝐝𝐞 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 💁`,
        threadID
      );
api.setMessageReaction("✅", event.messageID, () => {}, true);
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("𝐁𝐨𝐬𝐬 𝐣𝐞 𝐧𝐞 𝐬𝐮𝐢𝐬 𝐩𝐚𝐬 𝐞𝐧𝐜𝐨𝐫𝐞 𝐀𝐝𝐦𝐢𝐧 𝐥𝐨𝐫𝐬𝐪𝐮𝐞 𝐣𝐞 𝐥𝐞 𝐬𝐞𝐫𝐚𝐢 𝐥𝐚̀ 𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐩𝐨𝐮𝐫𝐫𝐚 𝐝𝐞́𝐛𝐮𝐭𝐞𝐫  🚀.", event.threadID);
api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  },
};
