const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Teste`
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
}

module.exports.config = {
	name: "teste",
	description: "Comando para testes",
	usage: ".teste",
	accessableby: "Moderadores",
	noalias: "Sem variações",
	aliases: [""],
}
