const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Embed`
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

	let [canal] = args

	if (!canal) {
		return message.channel
			.send("Indique o canal a ser enviado.")
			.then((m) => {
				m.delete({ timeout: 3000 })
			})
	}
	if (canal.length > 18) {
		canal = canal.slice(2, 20)
	}

	if (!bot.channels.cache.get(canal)) {
		message.channel.send("Canal não encontrado.").then((m) => {
			m.delete({ timeout: 3000 })
		})
		console.log(`↳ Canal '${canal}' não encontrado.`)
	} else {
		let color = args[1]
		let title = args[2].split("-").join(" ")
		let description = args.slice(3).join(" ")

        if (!description){
            message.channel.send("Faltam argumentos.").then((m) => {
                m.delete({ timeout: 3000 })
            })
            console.log(`↳ Faltam argumentos.`)

        }
		const embed = new Discord.MessageEmbed()
			.setColor(color)
			.setTitle(title)
			.setDescription(description)
			.setTimestamp()
			.setFooter(`Mensagem enviada por: ${message.author.username}`)

		bot.channels.cache.get(canal).send(embed)
	}
}

module.exports.config = {
	name: "embed",
	description: "Envia um embed no canal indicado, com a cor, titulo (caso tenha mais de 1 palavra, separe por `-`) e descrição dadas!",
	usage: ".embed (#canal) (#cor) (titulo) (descricao)",
	accessableby: "Moderadores",
	aliases: [],
}
