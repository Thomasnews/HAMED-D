const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const url = require("url");

const CACHE_DIR = path.join(__dirname, "cache");
const TEMP_DIR = path.join(__dirname, "temp");

// Ensure TEMP_DIR exists
fs.ensureDirSync(TEMP_DIR);

module.exports = {
  config: {
    name: "nhentai",
    aliases: ["nh"],
    version: "1",
    author: "Aesther",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "nhentai 📷",
      en: "Fetch NHentai images 📸"
    },
    longDescription: {
      vi: "Lấy tất cả hình ảnh từ NHentai",
      en: "Fetch all images from NHentai"
    },
    category: "image",
    guide: {
      vi: "{pn} [code]",
      en: "{pn} [code]"
    }
  },

  langs: {
    vi: {
      syntaxError: "Lỗi cú pháp. Vui lòng sử dụng cú pháp đúng: {pn} [code]",
      fetchError: "Lỗi khi lấy dữ liệu từ server",
      downloadError: "Lỗi khi tải hình ảnh"
    },
    en: {
      syntaxError: "Syntax Error. Please use the correct syntax: {pn} [code]",
      fetchError: "Error fetching data from server",
      downloadError: "Error downloading images"
    }
  },

  onStart: async function ({ api, message, event, args, getLang }) {
    const code = args[0];
    
    if (!code) {
      return message.reply(getLang('syntaxError').replace('{pn}', this.config.name) + ": " + getLang('guide'));
    }

    const cacheFilePath = path.join(CACHE_DIR, `${code}.json`);

    try {
      // Ensure cache directory exists
      await fs.ensureDir(CACHE_DIR);

      let imageLinks = null;
      if (await fs.pathExists(cacheFilePath)) {
        const cachedData = await fs.readJson(cacheFilePath);
        imageLinks = cachedData.data;
      } else {
        // Fetch data from API
        const apiUrl = `https://api.agatz.xyz/api/nhentaiimg?url=https://nhentai.to/g/${code}/`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.data) {
          imageLinks = response.data.data;

          // Cache the data
          await fs.writeJson(cacheFilePath, { data: imageLinks });
        } else {
          return message.reply(getLang('fetchError'));
        }
      }

      if (!imageLinks || imageLinks.length === 0) {
        return message.reply("No images found for this code.");
      }

      // Filter .jpg images
      const jpgLinks = imageLinks.filter(imgUrl => imgUrl.endsWith('.jpg'));

      if (jpgLinks.length === 0) {
        return message.reply("No .jpg images found.");
      }

      // Download .jpg images
      const downloadPromises = jpgLinks.map(async (imgUrl) => {
        try {
          const imgResponse = await axios({
            url: imgUrl,
            method: 'GET',
            responseType: 'stream'
          });

          const fileName = path.basename(url.parse(imgUrl).pathname);
          const filePath = path.join(TEMP_DIR, fileName);

          return new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(filePath);
            imgResponse.data.pipe(writer);
            writer.on('finish', () => resolve(filePath));
            writer.on('error', reject);
          });
        } catch (error) {
          console.error(`Failed to download ${imgUrl}:`, error);
          message.reply(`Failed to download image: ${imgUrl}`);
          return null;
        }
      });

      const downloadedFiles = await Promise.all(downloadPromises);
      const validFiles = downloadedFiles.filter(filePath => filePath);

      if (validFiles.length === 0) {
        return message.reply("No images were successfully downloaded.");
      }

      // Send images in a single message
      const attachments = validFiles.map(filePath => fs.createReadStream(filePath));

      await api.sendMessage({
        body: "Here are your images:",
        attachment: attachments
      }, event.threadID);

      // Clean up temp directory
      await fs.emptyDir(TEMP_DIR);

      // Remove cache file
      await fs.remove(cacheFilePath);

    } catch (error) {
      console.error(error);
      return message.reply(getLang('downloadError'));
    }
  }
};
