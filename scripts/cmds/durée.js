module.exports = {
	config: {
		name: "durée",
		aliases: ["durée","temps","vie","t"],
		role: 0,
		shortDescription: {
			en: "Show server uptime",
			tl: "Ipakita ang uptime ng server",
		},
		longDescription: {
			en: "Shows the duration for which the server has been running",
			tl: "Ipapakita ang tagal na gumagana ang server",
		},
		category: "goatBot",
		guide: {
			en: "{p}uptime",
			tl: "{p}uptime",
		},
	},

	onStart: async function ({ api, message, threadsData }) {
		const os = require("os");
		const uptime = os.uptime();

		const days = Math.floor(uptime / (3600 * 24));
		const hours = Math.floor((uptime % (3600 * 24)) / 3600);
		const mins = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);

		const system = `𝐎𝐬: ${os.platform()} ${os.release()}`;
		const cores = `𝐍𝐨𝐲𝐚𝐮 : ${os.cpus().length}`;
		const arch = `𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞 : ${os.arch()}`;
		const totalMemory = `𝐌𝐞́𝐦𝐨𝐢𝐫𝐞 𝐓𝐨𝐭𝐚𝐥𝐞: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`;
		const freeMemory = `𝐄𝐬𝐩𝐚𝐜𝐞 𝐋𝐢𝐛𝐫𝐞 : ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB`;
		const uptimeString = `𝐃𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐢𝐥𝐢𝐭𝐞́ : ${days} 𝗷𝗼𝘂𝗿(𝘀), ${hours} 𝗵𝗲𝘂𝗿𝗲(𝘀), ${mins} 𝗺𝗶𝗻𝘂𝘁𝗲(𝘀), 𝗮𝗻𝗱  ${seconds} 𝘀𝗲𝗰𝗼𝗻𝗱𝗲(𝘀)`;

		const response = `🕒 ${uptimeString}\n━━━━━━━━━━━━━━━━━━\n\n📡 ${system}\n🛡 ${cores}\n⚔𝗕𝗢𝗧 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘́ 🟢\n📈 𝖭𝗈𝗆𝖻𝗋𝖾 𝖽'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋: ${threadsData.size}\n📉 𝖭𝗈𝗆𝖻𝗋𝖾 𝖽𝖾 𝗀𝗋𝗈𝗎𝗉𝖾 : ${threadsData.size}\n⚖ 𝖴𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝗂𝗈𝗇 𝗔𝗜: 0.0\n📊𝖴𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝗂𝗈𝗇 𝖽𝖾 𝗅𝖺 𝗥𝗔𝗠: ${Math.round(process.memoryUsage().rss / (1024 * 1024))} MB\n💽 (𝗥𝗔𝗠) 𝗧𝗼𝘁𝗮𝗹𝗲: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB\n💾 (𝗥𝗔𝗠) 𝗮𝗰𝘁𝘂𝗲𝗹: ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB\n🛫 𝗣𝗶𝗻𝗴: 15 ms\n⏰ 𝘀𝗲𝗰𝗼𝗻𝗱𝗲𝘀 𝗱𝗶𝘀𝗽𝗼𝗻𝗶𝗯𝗹𝗲: ${Math.floor(process.uptime())}\n𝗙𝗕 𝗟𝗜𝗡𝗞𝗦 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 \nhttps://www.facebook.com/EINSTEIN.JUNIOR.HAMED\n━━━━━━━━━━━━━━━━━━`;

		message.reply(response);
	},
};
