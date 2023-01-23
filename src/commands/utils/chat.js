require("dotenv").config()

const Command = require("../../structures/Command")

const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
})
const openai = new OpenAIApi(configuration)

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "chat",
			description: "Usa a API do ChatGPT para falar com o bot",
			options: [
				{
					name: "prompt",
					type: "STRING",
					description: "O prompt que você quer que o bot responda",
					required: true,
				},
			],
		})
	}
	run = async (interaction) => {
		console.log(`\n■▶ [LOGS] ⇥ Usuário '${interaction.user.username}' usou o comando Chat`)

		let prompt = interaction.options.getString("prompt")

		try {
			const gptResponse = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: `${process.env.OPENAI_STARTUP_MESSAGE} \n\
                ChatGPT: Olá, no que posso ajuda-lo? \n\
                ${interaction.user.username}: ${prompt} \n\
                ChatGPT:`,
				temperature: 0,
				max_tokens: 100,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			})

			const response = gptResponse.data.choices[0].text

			if (response) {
				interaction.reply({
					content: response,
					ephemeral: true,
				})
			} else {
				interaction.reply({
					content: "Não entendi o que você quis dizer",
					ephemeral: true,
				})
			}
		} catch (err) {
			console.log(err)
			interaction.reply({
				content: "Ocorreu um erro",
				ephemeral: true,
			})
		}
	}
}
