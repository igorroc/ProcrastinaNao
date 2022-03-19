const Command = require("../../structures/Command")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "invite",
			aliases: ["convite"],
			description: "Envia o convite para esse servidor",
		})
	}
	run = (interaction) => {
		const link = "https://discord.gg/RvtHp7V"

		const actionRow = new MessageActionRow().addComponents([
			new MessageButton().setStyle("LINK").setLabel("Link").setURL(link),
		])

		const embed = new MessageEmbed()
			.setColor("#64B3E3")
			.setTitle("📨 Convite para o ProcrastinaNão")
			.setDescription(`Convide seus amigos para o servidor!`)
			.addField("**Link:**", link)
			.setFooter({
				text: `Anti-Procrastinador | Membros: ${interaction.guild.memberCount}`,
			})

		interaction.reply({
			embeds: [embed],
			components: [actionRow],
		})
	}
}
