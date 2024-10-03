const { GoatWrapper } = require("fca-liane-utils");
const axios = require("axios");

module.exports = {
  config: {
    name: "4k",
    aliases: ["remini","upscale"],
    version: "2 ",
    role: 0,
    author: "Aesther",
    countDown: 5,
    longDescription: "Upscale your image Enhance ur dirty pic.",
    category: "image",
    guide: {
      en: "⛔ Please reply to an image."
    }
  },
  
  onStart: async function ({ message, event }) {
    // Check if the reply contains an image
    if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
      return message.reply("‼️‼️ | Reply with a 𝗣𝗜𝗖𝗧𝗨𝗥𝗘 or provide a 𝗨𝗥𝗟.\n\nThen type 4𝗞 or 𝗥𝗘𝗠𝗜𝗡𝗜");
    }
    
    const imgUrl = encodeURIComponent(event.messageReply.attachments[0].url);
    const upscaleUrl = `https://itzpire.com/tools/enhance?url=${imgUrl}&type=minecraft_modelx4`;
    
    // Notify the user that processing has started
    const processingMessage = await message.reply("🕟 | 𝙐𝙋𝙎𝘾𝘼𝙇𝙀 𒊹︎︎︎𒊹︎︎︎𒊹︎︎︎");

    try {
      // Get the upscale image from the API
      const { data } = await axios.get(upscaleUrl);
      
      if (data.status === "success" && data.result && data.result.img) {
        const resultImageUrl = data.result.img;
        
        // Retrieve the image stream from the resulting URL
        const attachment = await global.utils.getStreamFromURL(resultImageUrl, "upscaled-image.png");

        // Reply with the upscaled image
        await message.reply({
          body: "🟢 | 𝙎𝙐𝘾𝘾𝙀𝙎𝙎",
          attachment: attachment
        });
        
        // Optionally unsend the processing message
        await message.unsend(processingMessage.messageID);
      } else {
        throw new Error("Image upscaling failed. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      await message.reply("❌| There was an error upscaling your image. Please try again later.");
    }
  }
};

// Apply no prefix for command usage
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
