require("dotenv").config()

const Event = require("../../structures/Event")

const { MessageActionRow, MessageButton } = require("discord.js")

const link = "https://discord.gg/RvtHp7V"

const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
})
const openai = new OpenAIApi(configuration)

const actionRow = new MessageActionRow().addComponents([
	new MessageButton().setStyle("LINK").setLabel("Ir para o ProcrastinaNão").setURL(link),
])

async function react(msg) {
	let emojiAgree = msg.guild.emojis.cache.get("892486327080218684"),
		emojiDisagree = msg.guild.emojis.cache.get("892486199233618041")

	await msg.react(emojiDisagree)
	await msg.react(emojiAgree)
}

module.exports = class extends Event {
	constructor(client) {
		super(client, {
			name: "messageCreate",
		})
	}

	run = async (message) => {
		if (message.author.bot) return

		if (message.content.startsWith(".")) {
			message.reply(
				`Os comandos do bot agora estão sendo utilizados como \` Slash Commands \`, então você deve usar da seguinte forma:\n\n` +
					`\`\`\`fix\n/${message.content.slice(1)}\`\`\``
			)
		}
		if (message.channel.type === "DM") {
			message.reply({
				content: "Eu só respondo pelo servidor!",
				components: [actionRow],
			})
		}

		// ? Suggestion channel
		if (message.channel.id == "696458021500354581") {
			react(message)
			console.log("New suggestion")
		}

		// ? ChatGPT channel
		if (message.channel.id == "1066018801189134336") {
			message.react(message.guild.emojis.cache.get("722456385098481735"))
			try {
				const gptResponse = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: `${process.env.OPENAI_STARTUP_MESSAGE} \n\
					Anti-Procrastinador: Olá, no que posso ajuda-lo? \n\
					${message.author.username}: ${message.content} \n\
					Anti-Procrastinador:`,
					temperature: 0,
					max_tokens: 100,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				})

				const response = gptResponse.data.choices[0].text

				if (response) {
					message.reply(response)
				} else {
					message.reply("Não entendi o que você quis dizer.")
				}
			} catch (err) {
				console.log(err)
				message.reply("Ocorreu um erro ao tentar processar sua mensagem.")
			}
			message.reactions.removeAll()
		}

		// Aprender como enviar mensagem DM pro servidor:
		// if (message.channel.type === "DM") {
		// 	let anexo = message.attachments.first()?.attachment
		// 	const embed = new MessageEmbed()
		// 		.setColor("#64B3E3")
		// 		.setTitle("\\💬 Mensagem recebida")
		// 		.setDescription(
		// 			anexo
		// 				? `[anexo](${anexo.toString()})${anexo
		// 						.toString()
		// 						.slice(-4)}`
		// 				: message.content.length < 1024
		// 				? message.content
		// 				: message.content.slice(0, 1015) + " [...]"
		// 		)
		// 		.addField(
		// 			`Enviado por:`,
		// 			message.author || message.author.username,
		// 			false
		// 		)
		// 		.setImage(
		// 			anexo
		// 				? anexo.toString().endsWith(".png")
		// 					? anexo
		// 					: null
		// 				: null
		// 		)
		// 		.setTimestamp()

		// 	// bot.channels.cache.get("722274694535053317").send(embed)
		// }
	}
}
