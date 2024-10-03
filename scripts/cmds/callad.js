const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];

module.exports = {
	config: {
		name: "callad",
		version: "1.6",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "gửi tin nhắn về admin bot",
			en: "send message to admin bot"
		},
		longDescription: {
			vi: "gửi báo cáo, góp ý, báo lỗi,... của bạn về admin bot",
			en: "send report, feedback, bug,... to admin bot"
		},
		category: "contacts admin",
		guide: {
			vi: "   {pn} <tin nhắn>",
			en: "   {pn} <message>"
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi về admin",
			sendByGroup: "\n- Được gửi từ nhóm: %1\n- Thread ID: %2",
			sendByUser: "\n- Được gửi từ người dùng",
			content: "\n\nNội dung:\n─────────────────\n%1\n─────────────────\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			success: "Đã gửi tin nhắn của bạn về %1 admin thành công!\n%2",
			failed: "Đã có lỗi xảy ra khi gửi tin nhắn của bạn về %1 admin\n%2\nKiểm tra console để biết thêm chi tiết",
			reply: "📍 Phản hồi từ admin %1:\n─────────────────\n%2\n─────────────────\nPhản hồi tin nhắn này để tiếp tục gửi tin nhắn về admin",
			replySuccess: "Đã gửi phản hồi của bạn về admin thành công!",
			feedback: "📝 Phản hồi từ người dùng %1:\n- User ID: %2%3\n\nNội dung:\n─────────────────\n%4\n─────────────────\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			replyUserSuccess: "Đã gửi phản hồi của bạn về người dùng thành công!",
			noAdmin: "Hiện tại bot chưa có admin nào"
		},
		en: {
			missingMessage: "𝘆𝗼, 𝗲𝗻𝘁𝗿𝗲 𝗷𝘂𝘀𝘁𝗲 𝗹𝗲 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗱𝗲𝘀𝘁𝗶𝗻𝗲́ 𝗮̀ 𝗺𝗼𝗻 𝗕𝗢𝗦𝗦 𝗮𝘃𝗲𝗰 𝘂𝗻 𝗽𝗲𝘂 𝗱𝗲 𝗰𝗵𝗮𝗻𝗰𝗲 𝗶𝗹 𝘃𝗮 𝗿𝗲́𝗽𝗼𝗻𝗱𝗿𝗲 💆",
			sendByGroup: "\n- 𝐞𝐧𝐯𝐨𝐲𝐞𝐫 𝐞𝐧 𝐞́𝐭𝐚𝐧𝐭 𝐝𝐚𝐧𝐬 𝐥𝐞 𝐠𝐫𝐨𝐮𝐩𝐞  : %1\n- Thread ID: %2",
			sendByUser: "\n- 𝐞𝐧𝐯𝐨𝐲𝐞𝐫 𝐩𝐚𝐫 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐞𝐧 𝐏𝐕",
			content: "\n\n𝐮𝐬𝐞𝐫 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 🚀:\n─────────────────\n%1\n─────────────────\n📜𝐛𝐨𝐬𝐬 𝐫𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐜𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐬𝐢 𝐯𝐨𝐮𝐬 𝐯𝐨𝐮𝐥𝐞𝐳 𝐭𝐨𝐮𝐣𝐨𝐮𝐫𝐬 𝐞́𝐜𝐡𝐚𝐧𝐠𝐞́ 𝐚𝐯𝐞𝐜 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧 🥀",
			success: "📜📜𝐯𝐨𝐭𝐫𝐞 𝐫𝐞𝐪𝐮𝐞̂𝐭𝐞 𝐞𝐬𝐭 𝐩𝐚𝐫𝐯𝐞𝐧𝐮 𝐚̀ 𝐦𝐨𝐧 𝐁𝐎𝐒𝐒 𝐃𝐢𝐞𝐮 𝐝𝐞 𝐥𝐚 𝐩𝐡𝐲𝐬𝐢𝐪𝐮𝐞 𝐭𝐡𝐞́𝐨𝐫𝐢𝐪𝐮𝐞  (𝗘𝗶𝗻𝘀𝘁𝗲𝗶𝗻 𝗷𝘂𝗻𝗶𝗼𝗿 )🏌🥀!!\n%2",
			failed: "An error occurred while sending your message to %1 admin\n%2\nCheck console for more details",
			reply: "📍𝐥𝐚 𝐫𝐞́𝐩𝐨𝐧𝐬𝐞 𝐝𝐞 𝐦𝐨𝐧 𝐁𝐎𝐒𝐒🥀 ───────────────── 👑%1: \n─────────────────\n%2\n─────────────────\n📜𝐫𝐞́𝐩𝐨𝐧𝐝𝐞𝐳 𝐚̀ 𝐜𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞𝐫 𝐝'𝐞́𝐜𝐫𝐢𝐫𝐞 𝐚̀ 𝐦𝐨𝐧 𝐁𝐎𝐒𝐒 🏌",
			replySuccess: "📜𝚝𝚘𝚗 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚎𝚜𝚝 𝚙𝚊𝚛𝚟𝚎𝚗𝚞 𝚊𝚟𝚎𝚌 𝚜𝚞𝚌𝚌𝚎̀𝚜 𝚊̀ 𝚖𝚘𝚗 𝐁𝐎𝐒𝐒 🏌🥀!",
			feedback: "📝𝐥𝐚 𝐫𝐞́𝐩𝐨𝐧𝐬𝐞 𝐝𝐞 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 ───────────────── %1: ─────────────────\n- User ID: %2%3\n\n 𝐥𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞  🚀:\n─────────────────\n%4\n─────────────────\n📜𝐁𝐎𝐒𝐒 𝐞́𝐜𝐫𝐢𝐯𝐞𝐳 𝐣𝐮𝐬𝐭𝐞 𝐯𝐨𝐭𝐫𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐫𝐞́𝐩𝐨𝐧𝐝𝐫𝐞 𝐚̀ 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧 💆 ",
			replyUserSuccess: "𝚋𝚘𝚜𝚜 𝚟𝚘𝚝𝚛𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚎𝚜𝚝 𝚙𝚊𝚛𝚟𝚎𝚗𝚞 𝚊𝚟𝚎𝚌 𝚜𝚞𝚌𝚌𝚎̀𝚜 𝚊̀ 𝚕'𝚞𝚝𝚒𝚕𝚒𝚜𝚊𝚝𝚎𝚞𝚛 📮 !",
			noAdmin: "Bot has no admin at the moment"
		}
	},

	onStart: async function ({ args, message, event, usersData, threadsData, api, commandName, getLang }) {
		const { config } = global.GoatBot;
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const { senderID, threadID, isGroup } = event;
		if (config.adminBot.length == 0)
			return message.reply(getLang("noAdmin"));
		const senderName = await usersData.getName(senderID);
		const msg = "📜 𝐁𝐎𝐒𝐒🏌🥀 𝐯𝐨𝐮𝐬 𝐚𝐯𝐞𝐳 𝐮𝐧 𝐧𝐨𝐮𝐯𝐞𝐚𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐚𝐧𝐬 𝐯𝐨𝐭𝐫𝐞 𝐛𝐨𝐢̂𝐭𝐞 𝐚𝐮𝐱 𝐥𝐞𝐭𝐭𝐫𝐞𝐬 📬"
			+ `\n- 𝗡𝗢𝗠 𝖽𝖾 𝗅'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 : ${senderName}`
			+ `\n- 𝗜𝗗 𝖽𝖾 𝗅'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 : ${senderID}`
			+ (isGroup ? getLang("sendByGroup", (await threadsData.get(threadID)).threadName, threadID) : getLang("sendByUser"));

		const formMessage = {
			body: msg + getLang("content", args.join(" ")),
			mentions: [{
				id: senderID,
				tag: senderName
			}],
			attachment: await getStreamsFromAttachment(
				[...event.attachments, ...(event.messageReply?.attachments || [])]
					.filter(item => mediaTypes.includes(item.type))
			)
		};

		const successIDs = [];
		const failedIDs = [];
		const adminNames = await Promise.all(config.adminBot.map(async item => ({
			id: item,
			name: await usersData.getName(item)
		})));

		for (const uid of config.adminBot) {
			try {
				const messageSend = await api.sendMessage(formMessage, uid);
				successIDs.push(uid);
				global.GoatBot.onReply.set(messageSend.messageID, {
					commandName,
					messageID: messageSend.messageID,
					threadID,
					messageIDSender: event.messageID,
					type: "userCallAdmin"
				});
			}
			catch (err) {
				failedIDs.push({
					adminID: uid,
					error: err
				});
			}
		}

		let msg2 = "";
		if (successIDs.length > 0)
			msg2 += getLang("success", successIDs.length,
				adminNames.filter(item => successIDs.includes(item.id)).map(item => ` <@${item.id}> (${item.name})`).join("\n")
			);
		if (failedIDs.length > 0) {
			msg2 += getLang("failed", failedIDs.length,
				failedIDs.map(item => ` <@${item.adminID}> (${adminNames.find(item2 => item2.id == item.adminID)?.name || item.adminID})`).join("\n")
			);
			log.err("CALL ADMIN", failedIDs);
		}
		return message.reply({
			body: msg2,
			mentions: adminNames.map(item => ({
				id: item.id,
				tag: item.name
			}))
		});
	},

	onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
		const { type, threadID, messageIDSender } = Reply;
		const senderName = await usersData.getName(event.senderID);
		const { isGroup } = event;

		switch (type) {
			case "userCallAdmin": {
				const formMessage = {
					body: getLang("reply", senderName, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replyUserSuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "adminReply"
					});
				}, messageIDSender);
				break;
			}
			case "adminReply": {
				let sendByGroup = "";
				if (isGroup) {
					const { threadName } = await api.getThreadInfo(event.threadID);
					sendByGroup = getLang("sendByGroup", threadName, event.threadID);
				}
				const formMessage = {
					body: getLang("feedback", senderName, event.senderID, sendByGroup, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replySuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "userCallAdmin"
					});
				}, messageIDSender);
				break;
			}
			default: {
				break;
			}
		}
	}
};
