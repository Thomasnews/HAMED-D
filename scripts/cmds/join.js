module.exports = {
  config: {
    name: "join",
    aliases: ['addme', 'joinme'],
    version: "1.0",
    author: "Samir ",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Add user to support group",
    },
    longDescription: {
      en: "This command adds the user to the group where bot exist",
    },
    category: "owner",
    guide: {
      en: "To use this command, simply type !join <threadID>.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = args[0];
    if (!supportGroupId) {
      api.sendMessage("𝘃𝗲𝘂𝗶𝗹𝗹𝗲𝘇 𝗳𝗼𝘂𝗿𝗻𝗶 𝗹'𝗶𝗱𝗲𝗻𝘁𝗶𝗳𝗶𝗮𝗻𝘁 𝗼𝘂̀ 𝘂𝗶𝗱 𝗱𝘂 𝗴𝗿𝗼𝘂𝗽𝗲", event.threadID);
api.setMessageReaction("⁉️", event.messageID, () => {}, true);
      return;
    }
    const threadID = event.threadID;
    const userID = event.senderID;
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      api.sendMessage(
        "𝗩𝗼𝘂𝘀 𝗲̂𝘁𝗲 𝗱𝗲́𝗷𝗮̀ 𝗱𝗮𝗻𝘀 𝗰𝗲 𝗴𝗿𝗼𝘂𝗽𝗲",
        threadID
      );
api.setMessageReaction("‼", event.messageID, () => {}, true);
    } else {
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("Failed to add user to support group:", err);
          api.sendMessage("𝗱𝗲́𝘀𝗼𝗹𝗲́ 𝗷𝗲 𝗻𝗲 𝗽𝗲𝘂𝘁 𝗽𝗮𝘀 𝘃𝗼𝘂𝘀 𝗮𝗷𝗼𝘂𝘁𝗲𝘇 𝗮𝘂 𝗴𝗿𝗼𝘂𝗽𝗲 𝗽𝗲𝘂𝘁-𝗲̂𝘁𝗿𝗲 𝗽𝗮𝗿𝗰𝗲 𝗾𝘂𝗲 𝗹'𝗮𝗽𝗽𝗿𝗼𝗯𝗮𝘁𝗶𝗼𝗻 𝗲𝘀𝘁 𝗮𝗰𝘁𝗶𝘃𝗶𝘁𝗲́𝘀", threadID);
api.setMessageReaction("❌", event.messageID, () => {}, true);
        } else {
          api.sendMessage(
            "𝗩𝗼𝘂𝘀 𝗮𝘃𝗲𝘇 𝗲́𝘁𝗲́ 𝗮𝗷𝗼𝘂𝘁𝗲𝗿 𝗮𝘂 𝗴𝗿𝗼𝘂𝗽𝗲 𝗮𝘃𝗲𝗰 𝘀𝘂𝗰𝗰𝗲̀𝘀",
            threadID
          );
api.setMessageReaction("✅", event.messageID, () => {}, true);
        }
      });
    }
  },
};
