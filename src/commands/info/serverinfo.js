const Command = require("../../structures/Command")

const ms = require("ms")
const { MessageEmbed } = require("discord.js")

function getAge(dateString) {
	var now = new Date()
	var today = new Date(now.getYear(), now.getMonth(), now.getDate())

	var yearNow = now.getYear()
	var monthNow = now.getMonth()
	var dateNow = now.getDate()

	var dob = new Date(
		dateString.substring(6, 10),
		dateString.substring(0, 2) - 1,
		dateString.substring(3, 5)
	)

	var yearDob = dob.getYear()
	var monthDob = dob.getMonth()
	var dateDob = dob.getDate()
	var age = {}
	var ageString = ""
	var yearString = ""
	var monthString = ""
	var dayString = ""

	yearAge = yearNow - yearDob

	if (monthNow >= monthDob) var monthAge = monthNow - monthDob
	else {
		yearAge--
		var monthAge = 12 + monthNow - monthDob
	}

	if (dateNow >= dateDob) var dateAge = dateNow - dateDob
	else {
		monthAge--
		var dateAge = 31 + dateNow - dateDob

		if (monthAge < 0) {
			monthAge = 11
			yearAge--
		}
	}

	age = {
		years: yearAge,
		months: monthAge,
		days: dateAge,
	}

	if (age.years > 1) yearString = " anos"
	else yearString = " ano"
	if (age.months > 1) monthString = " meses"
	else monthString = " mês"
	if (age.days > 1) dayString = " dias"
	else dayString = " dia"

	if (age.years > 0 && age.months > 0 && age.days > 0)
		ageString =
			age.years +
			yearString +
			", " +
			age.months +
			monthString +
			", e " +
			age.days +
			dayString
	else if (age.years == 0 && age.months == 0 && age.days > 0)
		ageString = age.days + dayString
	else if (age.years > 0 && age.months == 0 && age.days == 0)
		ageString = age.years + yearString + ". Feliz DiscordVersário!!"
	else if (age.years > 0 && age.months > 0 && age.days == 0)
		ageString = age.years + yearString + " e " + age.months + monthString
	else if (age.years == 0 && age.months > 0 && age.days > 0)
		ageString = age.months + monthString + " e " + age.days + dayString
	else if (age.years > 0 && age.months == 0 && age.days > 0)
		ageString = age.years + yearString + " e " + age.days + dayString
	else if (age.years == 0 && age.months > 0 && age.days == 0)
		ageString = age.months + monthString
	else ageString = "Oops! Não consegui calcular a idade!"

	return ageString
}

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "serverinfo",
			description: "Envia as informações do servidor!",
		})
	}
	run = (interaction) => {
		var memberCount = interaction.guild.members.cache.filter(
			(m) => !m.user.bot
		).size
		var botCount = interaction.guild.members.cache.filter(
			(m) => m.user.bot
		).size

		let sEmbed = new MessageEmbed()
			.setColor("#64B3E3")
			.setTitle("Informações do Servidor")
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addField(
				"**Nome do Servidor:**",
				`${interaction.guild.name}`,
				true
			)
			.addField(
				"**Dono do Servidor:**",
				`${interaction.guild.members.cache.get(
					interaction.guild.ownerId
				)}`,
				true
			)
			.addField("**Membros:**", `${memberCount}`, true)
			.addField("**Bots:**", `${botCount}`, true)
			.addField(
				"**Cargos:**",
				`${interaction.guild.roles.cache.size}`,
				true
			)
			.addField(
				"**Emojis:**",
				`${interaction.guild.emojis.cache.size}`,
				true
			)
			.setTimestamp()

		interaction.reply({
			embeds: [sEmbed],
			ephemeral: true,
		})
	}
}
