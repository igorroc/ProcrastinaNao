const Command = require("../../structures/Command")

const ms = require("ms")
const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "mensagem",
			description: "Envia uma mensagem para o canal escolhido",
			options: [
				{
					name: "channel",
					type: "CHANNEL",
					description: "O canal a ser enviado a mensagem.",
					required: true,
				},
				{
					name: "message",
					type: "STRING",
					description: "A mensagem a ser enviada.",
					required: true,
				},
			],
		})
	}
	run = async (interaction) => {
		console.log(`\n■▶ [LOGS] ⇥ Usuário '${interaction.user.username}' usou o comando Mensagem`)

		let ch = await interaction.options.getChannel("channel")
		let msg = await interaction.options.getString("message")

		if (!interaction.member.permissions.has("ManageChannels")) {
			const naoDigno = new MessageEmbed()
				.setColor("#FF0000")
				.setTitle("Você não é digno de realizar esse comando!")

			interaction.reply({ embeds: [naoDigno], ephemeral: true })
			console.log(`↳ Acesso negado para '${interaction.user.username}'`)
			return
		}

		if (ch.type !== "GUILD_TEXT") {
			const naoTexto = new MessageEmbed()
				.setColor("#fff200")
				.setDescription("O canal deve ser um canal de texto")

			interaction.reply({ embeds: [naoTexto], ephemeral: true })
			console.log(`↳ O canal deve ser um canal de texto`)
			return
		}

		let mensagem = await ch.send(msg)

		const sucesso = new MessageEmbed()
			.setColor("#0f0")
			.setDescription(`Mensagem enviada com sucesso [aqui](${mensagem.url})!`)

		interaction.reply({
			embeds: [sucesso],
			ephemeral: true,
		})
	}
}
