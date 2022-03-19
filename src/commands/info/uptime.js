const Command = require("../../structures/Command")

const ms = require("ms")
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "uptime",
			description: "Mostra quanto tempo eu estou online!",
		})
	}
	run = (interaction) => {
		let up = ms(interaction.client.uptime, { long: true })
		up = up.replace("second", "segundo")
		up = up.replace("seconds", "segundos")
		up = up.replace("minute", "minuto")
		up = up.replace("minutes", "minutos")
		up = up.replace("hour", "hora")
		up = up.replace("hours", "horas")
		up = up.replace("day", "dia")
		up = up.replace("days", "dias")
		up = up.replace("week", "semana")
		up = up.replace("weeks", "semanas")

		const embed = new MessageEmbed()
			.setColor("#64B3E3")
			.setTitle("\\🎉 Up Time")
			.setDescription(
				`Estou trabalhando há **${up}** sem acidentes no **ProcrastinaNão**!`
			)
			.setTimestamp()

		interaction.reply({
			embeds: [embed],
			ephemeral: true,
		})
	}
}
