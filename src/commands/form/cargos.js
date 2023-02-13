const Command = require("../../structures/Command")

const questions = require("../../util/cargosQuestions")

const { once } = require("events")
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")

const questionsTimeOut = 1

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "cargos",
			description: "Comando para você receber cargos específicos!",
		})
	}

	run = (interaction) => {
		console.log(`\n■▶ [LOGS] ⇥ Usuário '${interaction.user.username}' usou o comando Cargos`)

		interaction.reply({
			content: "Formulário iniciado. Responda as perguntas abaixo",
			ephemeral: true,
		})

		createForm()
			.then(async (answers) => {
				interaction.editReply({
					content: "Cargos adicionados com sucesso!",
					embeds: [],
					components: [],
				})
			})
			.catch((err) => {
				console.log(err)

				const embed = new MessageEmbed().setColor("RED").setDescription("err")

				interaction.channel.send({
					content: interaction.user.toString(),
					embeds: [embed],
				})
			})

		async function createForm() {
			const answers = []

			const channel = interaction.channel

			let question = questions.find((q) => q.customId === "tipo")

			let verifyEnd = false
			while (!verifyEnd) {
				const embed = new MessageEmbed()
					.setTitle(question.question)
					.setFooter({
						text: `Você tem ${questionsTimeOut} minutos para responder a essa pergunta`,
					})
					.setColor("BLURPLE")
				if (question.description) embed.setDescription(question.description)

				if (question.options) {
					const actionRow = new MessageActionRow().addComponents(
						new MessageSelectMenu(question)
					)
					const msg = await channel.send({
						content: interaction.user.toString(),
						embeds: [embed],
						components: [actionRow],
					})

					const filter = (i) => i.user.id === interaction.user.id

					const collector = msg.createMessageComponentCollector({
						filter,
						max: 1,
						time: questionsTimeOut * 60000,
					})

					const [collected, reason] = await once(collector, "end")

					let nextQuestion = collected.first().values.join(", ")
					let role = interaction.guild.roles.cache.get(nextQuestion)
					if (role) {
						let memberHasRole = interaction.member.roles.cache.some((r) => r === role)
						if (memberHasRole) {
							interaction.member.roles.remove(role)
							console.log(
								`↳ Usuário '${interaction.member.user.username}' removeu o cargo '${role.name}'`
							)
						} else {
							interaction.member.roles.add(role)
							console.log(
								`↳ Usuário '${interaction.member.user.username}' adicionou o cargo '${role.name}'`
							)
						}
					}
					question = questions.find((q) => q.customId === nextQuestion)
					if (!question) {
						question = questions.find((q) => q.customId === "tipo")
					}

					if (reason === "limit") {
						msg.delete().catch(() => {})
						answers.push({
							name: collected.first().customId,
							value: collected.first().values.join(", "),
						})
					} else if (reason === "time") {
						throw "O tempo para responder a pergunta se esgotou"
					} else {
						throw "Ocorreu um erro durante a realização do formulário"
					}
				}

				verifyEnd = answers.find((a) => {
					return a.value == "finalizar"
				})
			}

			return answers
		}
	}
}
