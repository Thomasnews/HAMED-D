const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "prodia",
    aliases: ["imagine", "gen"],
    version: "1.1",
    author: "Aesther",
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    category: "image",
    guide: {
      en: ` ✨ ...` // Keep your guide content here
    }
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');

    if (!text) {
      return message.reply("✨ **𝗛𝗆𝗆𝗆, 𝗐𝗁𝖺𝗍 𝗐𝗈𝗎𝗅𝖽 𝗒𝗈𝗎 𝗅𝗂𝗄𝖾 𝗆𝖾 𝗍𝗈 𝖼𝗋𝖾𝖺𝗍𝖾?** 💫 ...");
    }

    const [prompt, model] = text.split('|').map((text) => text.trim());
    const models = model || "12";
    const baseURL = `https://smfahim.onrender.com/prodia?prompt=${encodeURIComponent(prompt)}&model=${models}`;

    try {
      // Send "wait" message and store the message ID
      const waitMessage = await message.reply("[⚪🔴🔵.....]");
      const waitMessageID = waitMessage.messageID;

      // Attempt to set an initial reaction
      await api.setMessageReaction("🔵", event.messageID);

      // Create a directory for caching images if it doesn't exist
      const cacheDir = path.join(__dirname, 'cache');
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
      }

      // Download and save images
      const imageUrls = [];
      for (let i = 0; i < 4; i++) {
        const url = `${baseURL}&image=${i + 1}`;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imagePath = path.join(cacheDir, `image${i + 1}.png`);
        fs.writeFileSync(imagePath, response.data);
        imageUrls.push(imagePath);
      }

      // Prepare images for sending
      const attachments = imageUrls.map((imagePath) => fs.createReadStream(imagePath));

      // Send images
      await message.reply({
        attachment: attachments,
        body: `🔵🔴⚪ 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗘𝗗 𝗣𝗜𝗖 : \n${prompt} 𒊹︎︎︎`
      });

      // Clean up cached images
      imageUrls.forEach((imagePath) => fs.unlinkSync(imagePath));

      // Unsend "wait" message
      await api.unsendMessage(waitMessageID);

      // Attempt to set a successful reaction
      await api.setMessageReaction("🟢", event.messageID);
    } catch (error) {
      console.error("Error while processing images:", error);

      // Attempt to set an error reaction
      try {
        await api.setMessageReaction("❌", event.messageID);
      } catch (reactionError) {
        console.error("Error setting error reaction:", reactionError);
      }

      // Send error message and unsend "wait" message if possible
      try {
        await api.unsendMessage(waitMessageID);
      } catch (unsendError) {
        console.error("Error unsending wait message:", unsendError);
      }

      message.reply("An error occurred while processing your request.");
    }
  }
};
