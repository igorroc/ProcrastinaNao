const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Prender`
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
		message.channel.send(`Esse usuário não pode ser preso.`)
		console.log(
			`↳ Usuário "${args[0]}" não pode ser preso, operação cancelada.`
		)
		return
	}

	let embed = new Discord.MessageEmbed()
	let modlog = bot.guilds.cache
		.get("696430420992066112")
		.channels.cache.get("823951071235407972")

	if (member.roles.cache.has("842189200337666058")) {
		embed
			.setColor("#8915bf")
			.setTitle(`${user.username} saiu da prisão`)
			.setDescription(`Usuário: ${user}\nSolto por: ${message.author}`)
			.setFooter("Hora da remoção:")
			.setTimestamp()
		member.roles
			.remove("842189200337666058")
			.catch(() =>
				console.log(
					`⚠️ Não foi possível remover o cargo para '${user.username}'`
				)
			)
	} else {
		let razao = args.slice(1).join(" ")
		if (!razao) {
			return message.channel.send(
				"Indique uma razão para a prisão do usuário."
			)
		}

		let prisao = bot.guilds.cache
			.get("696430420992066112")
			.channels.cache.get("842189783454449704")
			.send(`${member}, você agora está preso(a)!`)

		embed
			.setColor("#8915bf")
			.setTitle(`${user.username} está preso(a)`)
			.setDescription(`Usuário: ${user}\nPreso por: ${message.author}`)
			.addFields({ name: "Motivo:", value: razao, inline: false })
			.setFooter("Hora da prisão:")
			.setTimestamp()

		member.roles
			.add("842189200337666058")
			.catch(() =>
				console.log(
					`⚠️ Não foi possível adicionar o cargo para '${user.username}'`
				)
			)
		member.voice.kick()
	}

	modlog.send(embed)

	message.delete().catch(() => console.log("⚠️ Erro ao deletar a mensagem"))
}

module.exports.config = {
	name: "prender",
	description: "Prende/solta o usuário marcado!",
	usage: ".prender [@pessoa] [razão]",
	accessableby: "Moderadores",
	aliases: ["prisao", "soltar"],
}
