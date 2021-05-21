const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Kick`
	)

	if (!message.member.hasPermission("KICK_MEMBERS")) {
		const naoDigno = new Discord.MessageEmbed()
			.setColor("#FF0000")
			.setTitle("Você não é digno de realizar esse comando!")

		message.reply(naoDigno)
		message.channel.send(
			"https://tenor.com/view/batman-winger-wag-not-allowed-no-nope-gif-5433518"
		)
		console.log(`↳ Acesso negado para '${message.author.username}'`)
		return
	}

	let user = message.mentions.users.first()
	let member = message.mentions.members.first()
	if (!user) {
		message.channel.send(
			`Ocorreu um erro ao encontrar o usuário mencionado.`
		)
		console.log(
			`↳ Usuário "${args[0]}" não encontrado, operação cancelada.`
		)
		return
	}
	if (!member.kickable) {
		message.channel.send(`Esse usuário não pode ser expulso.`)
		console.log(
			`↳ Usuário "${args[0]}" não pode ser expulso, operação cancelada.`
		)
		return
	}

	let razao = args.slice(1).join(" ")
	if (!razao) {
		return message.channel.send(
			"Indique uma razão para a remoção do usuário."
		)
	}

	let modlog = bot.guilds.cache
		.get("696430420992066112")
		.channels.cache.get("823951071235407972")

	member
		.kick({ reason: razao })
		.then(() => {
			console.log(`↳ Usuário '${user.username}' expulso.`)

			const embed = new Discord.MessageEmbed()
				.setColor("#E3863F")
				.setTitle(`\\🦶 Expulsão de ${user.username}`)
				.setDescription(
					`Usuário: ${user}\nExpulso por: ${message.author}`
				)
				.addFields({ name: "Motivo:", value: razao, inline: false })
				.setFooter("Hora da expulsão:")
				.setTimestamp()

			modlog.send(embed)
		})
		.catch(console.error())

	message.delete().catch(() => console.log("⚠️ Erro ao deletar a mensagem"))
}

module.exports.config = {
	name: "kick",
	description: "Expulsa o usuário marcado!",
	usage: ".kick [@pessoa] [razão]",
	accessableby: "Moderadores",
	aliases: ["expulsar"],
}
