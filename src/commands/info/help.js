const Command = require("../../structures/Command")

const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js")

const { once } = require("events")

function createCommandResume(command) {
	var SHembed = new MessageEmbed()
		.setColor("#64B3E3")
		.setTitle(`\\🔧 Comando: ${command.name}`) //
		.setURL(`https://igorroc.github.io/ProcrastinaNao/comandos.html?comando=${command.name}`)
	if (command.description) {
		SHembed.addField("Descrição", command.description)
	}
	if (command.usage) {
		SHembed.addField("Como usar", command.usage)
	}
	if (command.aliases) {
		SHembed.addField("Variações", command.aliases.join(", "))
	}

	return SHembed
}

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "help",
			description: "Reuni todos os comandos do bot, mostrando suas funções e exemplos",
			options: [
				{
					name: "comando",
					type: "STRING",
					description:
						"Caso você queira ver um comando em específico, use o nome dele aqui.",
					required: false,
				},
			],
		})
	}
	run = async (interaction) => {
		console.log(`\n■▶ [LOGS] ⇥ Usuário '${interaction.user.username}' usou o comando Help`)

		const command = interaction.options.getString("comando")
		let commandList = {
			question: "Qual comando você deseja ver?",
			description:
				"Abaixo está a lista de comandos do servidor, selecione um para ler mais sobre ele.",
			placeholder: "Selecione o comando",
			customId: "seleção",
			options: [],
		}

		if (command) {
			const findCommand = this.client.commands.find((c) => c.name === command)
			if (findCommand) {
				const embed = createCommandResume(findCommand)

				interaction.reply({
					embeds: [embed],
				})
			} else {
				interaction.reply({
					content:
						`Não encontrei o comando \` ${command} \`.\n` +
						`Verifique se o nome do comando está correto, usando o comando:` +
						`\n\n\`\`\`fix\n/help\`\`\``,
					ephemeral: true,
				})
			}
		} else {
			await interaction.deferReply()

			this.client.commands.forEach((cmd) => {
				commandList.options.push({
					label: cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1),
					value: cmd.name,
				})
			})

			const embed = new MessageEmbed()
				.setTitle(commandList.question)
				.setFooter({
					text: `Você tem 1 minuto para responder a essa pergunta`,
				})
				.setColor("BLURPLE")
				.setDescription(commandList.description)

			const actionRow = new MessageActionRow().addComponents(
				new MessageSelectMenu(commandList)
			)

			const msg = await interaction.channel.send({
				content: interaction.user.toString(),
				embeds: [embed],
				components: [actionRow],
			})

			const filter = (i) => i.user.id === interaction.user.id

			const collector = msg.createMessageComponentCollector({
				filter,
				max: 1,
				time: 60000,
			})

			const [collected, reason] = await once(collector, "end")

			const chosenCommand = collected.first().values.join(", ")

			const findCommand = this.client.commands.find((c) => c.name === chosenCommand)

			if (findCommand) {
				const Sembed = createCommandResume(findCommand)

				interaction.editReply({
					embeds: [Sembed],
				})
			} else {
				interaction.reply({
					content: `Não encontrei o comando \` ${chosenCommand} \`.`,
					ephemeral: true,
				})
			}

			if (reason === "limit") {
				msg.delete().catch(() => {})
			} else if (reason === "time") {
				interaction.reply({
					content: `O tempo para responder a pergunta se esgotou`,
					ephemeral: true,
				})
			} else {
				interaction.reply({
					content: `Ocorreu um erro durante a realização do formulário`,
					ephemeral: true,
				})
			}
		}
	}
}
