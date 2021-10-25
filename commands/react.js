const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando React`
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

	let [mensagemId, emoji] = args
	if (!mensagemId || !emoji) {
		return message.channel.send("Faltam argumentos.").then((m) => {
			m.delete({ timeout: 3000 })
		})
	}

	let servidor = bot.guilds.cache.get("696430420992066112") // Servidor ProcrastinaNão
	emoji = servidor.emojis.cache.filter((e) => e.id == emoji).first() || emoji

	message.channel.messages
		.fetch(mensagemId)
		.then((m) => {
            m.react(emoji)
		})
		.catch((err) => {
			console.error(err)
		})

	message.delete()
}

module.exports.config = {
	name: "react",
	description: "Reage a mensagem especificada com o emoji especificado!",
	usage: ".react [id_da_mensagem] [id_do_emoji]",
	accessableby: "Moderadores",
	aliases: ["reagir"],
}
