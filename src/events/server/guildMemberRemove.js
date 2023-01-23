const Event = require("../../structures/Event")

const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {
	constructor(client) {
		super(client, {
			name: "guildMemberRemove",
		})
	}

	run = (member) => {
		console.log(`\n❌ [LOGS] ⇥ O membro '${member.user.username}' saiu do servidor.`)

		var memberCount = member.guild.members.cache.filter((m) => !m.user.bot).size
		var botCount = member.guild.members.cache.filter((m) => m.user.bot).size

		const embed = new MessageEmbed()
			.setColor("#FF0000")
			.setTitle("\\❌ → Membro saiu")
			.setDescription(`<@${member.user.id}>`)
			.setTimestamp()
			.setFooter({
				text: `Total de ${memberCount} membros\nTotal de ${botCount} bots`,
			})

		member.guild.channels.cache.get("722274694535053317").send({ embeds: [embed] }) // Chat moderadores
	}
}
