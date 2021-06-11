const Discord = require("discord.js")
const ms = require("ms")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando UserInfo`
	)

	let uEmbed = new Discord.MessageEmbed()
		.setColor("#64B3E3")
		.setTitle("Informações de Usuário")
		.setThumbnail(message.guild.iconURL)

	let member

	if (args.length > 0) {
		member = message.mentions.users.first()
		if (!member) {
			message.channel.send(
				`Ocorreu um erro ao encontrar o usuário mencionado.`
			)
			console.log(
				`↳ Usuário "${args}" não encontrado, operação cancelada.`
			)
			return
		}
		member = message.guild.members.cache.get(member.id)
	} else {
		member = message.guild.members.cache.get(message.author.id)
	}

	let age = ms(new Date() - member.user.createdAt, { long: true })
	age = age.replace("second", "segundo")
	age = age.replace("seconds", "segundos")
	age = age.replace("minute", "minuto")
	age = age.replace("minutes", "minutos")
	age = age.replace("hour", "hora")
	age = age.replace("hours", "horas")
	age = age.replace("day", "dia")
	age = age.replace("days", "dias")

	uEmbed
		.setTitle(`\\👤 ${member.nickname || member.user.username}`)
		.setThumbnail(member.user.displayAvatarURL())
		.addField("**Nome:**", member.user.username, true)
		.addField("**Tag:**", member.user.discriminator, true)
		.addField("**Status:**", member.user.presence.status)
		.addField("**Desde:**", member.user.createdAt.toDateString(), true)
		.addField("**Idade**", age, true)
		.addField(
			"**Server Booster**",
			member.premiumSince ? member.premiumSince.toDateString() : "Não"
		)
		.setFooter(member.user.id)

	message.channel.send(uEmbed)
}

module.exports.config = {
	name: "userinfo",
	description: "Mostra as suas informações ou as do usuário mencionado!",
	usage: ".userinfo (@mention)",
	accessableby: "Membros",
	aliases: ["ui"],
}
