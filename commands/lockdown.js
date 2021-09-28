const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando LockDown`
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

	let lock = true
	if (args[0]) {
		lock = !(args[0] == "open")
	}

	const concluido = new Discord.MessageEmbed()
		.setTitle("AVISO")
		.setTimestamp()
	if (lock) {
		concluido.setColor("#ff0000").setDescription(`O servidor foi fechado!`)
	} else {
		concluido.setColor("#00ff00").setDescription(`O servidor foi aberto!`)
	}

	message.channel.send(concluido)
}

module.exports.config = {
	name: "lockdown",
	description: "Bloqueia o servidor para não ser possível enviar mensagem!\nPara abrir novamente, digite `.lockdown open`",
	usage: ".lockdown (boolean)",
	accessableby: "Moderadores",
	aliases: ["lock"],
}
