const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando SlowMode`
	)

    if (!message.member.hasPermission("ADMINISTRATOR")) {
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

    if (!args || args.length < 1) {
		message.reply("\\⚠️ Especifique o tempo!")
		console.log(`↳ Nenhum tempo indicado.`)
		return
	}

	let tempo = parseInt(args[0])

    console.log(tempo)
    message.channel.setRateLimitPerUser(tempo)

    const concluido = new Discord.MessageEmbed()
			.setColor("#00ff00")
			.setDescription(`SlowMode do canal ${message.channel} alterado para ${tempo}s!`)
            
    message.channel.send(concluido)
}

module.exports.config = {
	name: "slowmode",
	description: "Altera o delay de mensagens daquele canal!",
	usage: ".slowmode [tempo]",
	accessableby: "Moderadores",
	aliases: ["sm"],
}
