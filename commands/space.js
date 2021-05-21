const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Space`
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

	let novoNome = message.channel.name.toString()

	console.log(novoNome)
	let limpo = novoNome.replace(/-/gi, "\u3000")
	console.log(limpo)
	message.channel.setName(limpo)
	message.delete()
}

module.exports.config = {
	name: "space",
	description:
		"Arruma o nome do canal para poder colocar espaços vazios!\nAinda não achei um caractere vazio que o Discord deixe passar...",
	usage: ".space",
	accessableby: "Moderadores",
	aliases: ["sp"],
}
