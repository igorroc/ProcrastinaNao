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
			name: "userinfo",
			description:
				"Informações gerais do usuário mencionado, ou suas informações!",
			options: [
				{
					name: "Usuário",
					type: "USER",
					description:
						"O usuário a ser pesquisado. Caso queira ver suas informações, basta enviar o comando sozinho!",
					required: false,
				},
			],
		})
	}
	run = (interaction) => {
		let usuario = interaction.options.getUser("Usuário")

		if (!usuario) usuario = interaction.user

		usuario = interaction.guild.members.cache.get(usuario.id)

		let uEmbed = new MessageEmbed()
			.setColor("#64B3E3")
			.setTitle("Informações de Usuário")
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))

		let birthDay = new Date(usuario.user.createdTimestamp)
		let formattedAge =
			("0" + birthDay.getDate()).slice(-2) +
			"/" +
			("0" + (birthDay.getMonth() + 1)).slice(-2) +
			"/" +
			birthDay.getFullYear()

		uEmbed
			.setTitle(`\\👤 ${usuario.nickname || usuario.user.username}`)
			.setThumbnail(usuario.user.displayAvatarURL({ dynamic: true }))
			.addField("**Nome:**", usuario.user.username, true)
			.addField("**Tag:**", usuario.user.discriminator, true)
			.addField(
				"**Status:**",
				usuario.presence?.status
					? usuario.presence.status.charAt(0).toUpperCase() +
							usuario.presence.status.slice(1)
					: "Offline"
			)
			.addField("**Desde:**", formattedAge, true)
			.addField("**Idade**", getAge(formattedAge), true)
			.addField(
				"**Server Booster**",
				usuario.premiumSince
					? usuario.premiumSince.toDateString()
					: "Não"
			)
			.setFooter({ text: usuario.user.id })

		interaction.reply({
			embeds: [uEmbed],
			ephemeral: true,
		})
	}
}
