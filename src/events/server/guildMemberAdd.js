const Event = require("../../structures/Event")

const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {
	constructor(client) {
		super(client, {
			name: "guildMemberAdd",
		})
	}

	run = (member) => {
		console.log(
			`\n✅ [LOGS] ⇥ Novo membro no servidor. Dê as boas vindas para '${member.user.username}'`
		)

		if (member.user.bot) {
			member.roles.add("696464386071593081") // Cargo de Bots
		} else {
			member.roles.add("721103513874202645") // Cargo novato
			member.guild.channels.cache
				.get("721103116686327820") // Chat de cadastro
				.send(
					`Olá, ${member.user}! Seja bem-vindo(a)\nPara ter **acesso completo** ao servidor, use o comando:\`\`\`fix\n/cadastro\`\`\``
				)
		}

		var memberCount = member.guild.members.cache.filter(
			(m) => !m.user.bot
		).size
		var botCount = member.guild.members.cache.filter((m) => m.user.bot).size

		const embed = new MessageEmbed()
			.setColor("#00FF00")
			.addField(
				"\\✅ → Novo membro",
				member.displayName || member.user.username || "indefinido",
				false
			)
			.setTimestamp()
			.setFooter({
				text: `Total de ${memberCount} membros\nTotal de ${botCount} bots`,
			})

		member.guild.channels.cache
			.get("722274694535053317")
			.send({ embeds: [embed] }) // Chat moderadores
	}
}
