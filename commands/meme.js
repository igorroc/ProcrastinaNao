const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Meme`
	)

	let link = `http://apimeme.com/meme`

	let embed = new Discord.MessageEmbed()
		.setTitle(`\\🤣 Meme`)
		.setColor("#64B3E3")
		.setTimestamp()

	if (!args[0]) {
		embed
			.setTitle(`Erro`)
			.setDescription(
				`Você precisa indicar um tipo de meme.\nPara ver todos os tipos, [clique aqui](http://apimeme.com)`
			)
			.setColor("#ff0000")
		return message.reply(embed)
	}

	//prettier-ignore
	link += `?meme=${args[0]}`+
    `&top=${args[1] ? args[1].split("-").join("+") : ""}`+
    `&bottom=${args[2] ? args[2].split("-").join("+") : ""}`

	try {
		fetch(link)
			.then((res) => res.json())
			.then((json) => {
				embed
					.setImage(link)
					.setFooter(`Meme feito por: ${message.author.username}\n`)

				message.reply(embed)
			})
			.catch((err) => {
				embed
					.setTitle("\\🚫 Erro")
					.setDescription(
						`Ocorreu um erro ao criar seu meme.\nVerifique se você digitou corretamente o tipo do meme [aqui](http://apimeme.com)`
					)
					.setColor("#ff0000")
				message.reply(embed)
				console.error(err)
			})
	} catch (err) {
		embed
			.setDescription(`Ocorreu um erro ao criar seu meme.\n`)
			.setColor("#ff0000")
		message.reply(embed)
		console.log(err)
	}
}

module.exports.config = {
	name: "meme",
	description:
		"Retorna um meme feito por você.\nUse `-` para separar as palavras.\nPara ver todos os tipos de memes disponíveis, [clique aqui](http://apimeme.com)",
	usage: ".meme [tipo_do_meme] [frase_superior] [frase_inferior]",
	accessableby: "Membros",
	noalias: "Sem variações",
	aliases: [""],
}
