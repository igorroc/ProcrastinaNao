const Command = require("../../structures/Command")

const questions = require("../../util/cadastroQuestions")

const { once } = require("events")
const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
} = require("discord.js")

const questionsTimeOut = 2

const actionRow = new MessageActionRow().addComponents([
	new MessageButton().setStyle("DANGER").setLabel("Não").setCustomId("no"),
	new MessageButton()
		.setStyle("SUCCESS")
		.setLabel("Confirmar")
		.setCustomId("yes"),
])

let errorProfEmbed = new MessageEmbed()
	.setColor("#FCE100")
	.setTitle("\\⚠️ Aviso cadastro")
	.setDescription("O usuário diz ser um professor, verifique por favor!")

let cargos = require("../../util/cargos.json")

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "cadastro",
			description: "Realiza o cadastro no servidor.",
		})
	}

	run = (interaction) => {
		console.log(`\n■▶ [LOGS] ⇥ Usuário '${interaction.user.username}' usou o comando Cadastro`)

		interaction.reply({
			content: "Cadastro iniciado. Responda as perguntas abaixo",
			ephemeral: true,
		})

		createForm()
			.then(async (answers) => {
				const embed = new MessageEmbed()
					.setTitle("Respostas do Cadastro")
					.setAuthor({
						name: interaction.user.tag,
						iconURL: interaction.user.displayAvatarURL({
							dynamic: true,
						}),
					})
					.setColor("AQUA")
					.setTimestamp()
					.setFooter({
						text: `ID do usuário: ${interaction.user.id}`,
					})
					.addFields(answers)
					.addField("\u200B", "\u200B") // blank field
					.addField(
						"Deseja confirmar esses dados?",
						"Clique no botão abaixo da mensagem"
					)

				const confirmation = await interaction.channel.send({
					embeds: [embed],
					components: [actionRow],
					fetchReply: true,
				})
				const filter = (b) => b.user.id === interaction.user.id
				const collector = confirmation.createMessageComponentCollector({
					filter,
					time: 10000,
				})
				collector.on("collect", (i) => {
					const embedConfirmation = new MessageEmbed().setTimestamp()

					switch (i.customId) {
						case "yes":
							embedConfirmation
								.setTitle(
									`Seu cadastro foi concluído com sucesso!`
								)
								.setDescription(
									`Seja bem vindo(a) **${
										answers.find((a) => a.name === "Nome")
											.value
									}**!`
								)
								.setColor("GREEN")
							break
						case "no":
							embedConfirmation
								.setTitle(`Seu cadastro foi cancelado.`)
								.setDescription(
									`Verifique os dados e tente novamente para ter acesso ao servidor!`
								)
								.setColor("RED")

							break
					}

					interaction.editReply({
						content: " ",
						components: [],
						embeds: [embedConfirmation],
						ephemeral: false,
					})
					confirmation.delete()

					interaction.member
						.setNickname(
							answers.find((a) => a.name === "Nome").value
						)
						.catch(() => {
							console.log(
								`⚠️ Não foi possível alterar o nick de "${interaction.member.nickname}"`
							)
						})

					if (answers.find((a) => a.value === "Professor")) {
						errorProfEmbed
							.addField(
								"Usuário",
								interaction.member.nickname ||
									interaction.user ||
									interaction.user.username
							)
							.setTimestamp()

						interaction.guild.channels.cache
							.get("722274694535053317")
							.send({ embeds: [errorProfEmbed] })
					}

					if (
						answers.find((a) => a.name === "Nível").value ==
						"Estudante"
					) {
						// Cargo de Estudante
						interaction.member.roles
							.add("821147812456300574")
							.catch(() =>
								console.log(
									`⚠️ Não foi possível adicionar o cargo 'Estudante' para '${interaction.member.nickname}'`
								)
							)
					}
					const curso = answers.find((a) => a.name === "Curso")
					if (curso) {
						// Cargo do Curso
						if (curso.value.toLowerCase() != "n") {
							let nomeCurso = cargos.find(
								(c) =>
									(c.type == "curso" &&
										c.name === curso.value.toLowerCase()) ||
									c.aliases.find(
										(v) => v === curso.value.toLowerCase()
									)
							)?.name
							let roleCurso = interaction.guild.roles.cache.find(
								(role) => role.name == nomeCurso
							)?.id
							interaction.member.roles
								.add(roleCurso)
								.catch(() =>
									console.log(
										`⚠️ Não foi possível adicionar o cargo '${nomeCurso}' para '${interaction.member.nickname}'`
									)
								)
						}
					}

					const faculdade = answers.find(
						(a) => a.name === "Faculdade"
					)
					if (faculdade) {
						// Cargo da Faculdade
						if (faculdade.value.toLowerCase() != "n") {
							let nomeFaculdade = cargos
								.find(
									(c) =>
										(c.type == "faculdade" &&
											c.name ===
												faculdade.value.toLowerCase()) ||
										c.aliases.find(
											(v) =>
												v ===
												faculdade.value.toLowerCase()
										)
								)
								?.name.toUpperCase()
							let roleFaculdade =
								interaction.guild.roles.cache.find(
									(role) => role.name == nomeFaculdade
								)?.id
							interaction.member.roles
								.add(roleFaculdade)
								.catch(() =>
									console.log(
										`⚠️ Não foi possível adicionar o cargo '${nomeFaculdade}' para '${interaction.member.nickname}'`
									)
								)
						}
					}

					interaction.member.roles
						.remove("721103513874202645") // Remover cargo Novato
						.catch(() =>
							console.log(
								`⚠️ Não foi possível remover o cargo 'Novato(a)' para '${interaction.member.nickname}'`
							)
						)
					interaction.member.roles
						.add("781125011523895368") // Adicionar cargo Verificado
						.catch(() =>
							console.log(
								`⚠️ Não foi possível adicionar o cargo 'Verificado(a)' para '${interaction.member.nickname}'`
							)
						)
				})
			})
			.catch((err) => {
				const embed = new MessageEmbed()
					.setColor("RED")
					.setDescription(err)

				interaction.channel.send({
					content: interaction.user.toString(),
					embeds: [embed],
				})
			})

		async function createForm() {
			const answers = []

			const channel = interaction.channel

			for (const question of questions) {
				const embed = new MessageEmbed()
					.setTitle(question.question)
					.setFooter({
						text: `Você tem ${questionsTimeOut} minutos para responder a essa pergunta`,
					})
					.setColor("BLURPLE")
				if (question.description)
					embed.setDescription(question.description)

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

					if (reason === "limit") {
						msg.delete().catch(() => {})
						answers.push({
							name: collected.first().customId,
							value: collected.first().values.join(", "),
						})
					} else if (reason === "time")
						throw "O tempo para responder a pergunta se esgotou"
					else
						throw "Ocorreu um erro durante a realização do formulário"
				} else {
					const msg = await channel.send({
						content: interaction.user.toString(),
						embeds: [embed],
					})

					const filter = (m) =>
						m.author.id === interaction.user.id && m.content?.length
					const collector = channel.createMessageCollector({
						filter,
						max: 1,
						time: questionsTimeOut * 60000,
					})

					const [collected, reason] = await once(collector, "end")

					if (reason === "limit") {
						channel
							.bulkDelete([msg.id, collected.first().id])
							.catch(() => {})
						answers.push({
							name: question.name,
							value: collected.first().content,
						})
					} else if (reason === "time")
						throw "O tempo para responder a pergunta se esgotou"
					else
						throw "Ocorreu um erro durante a realização do formulário"
				}
			}

			return answers
		}
	}
}
