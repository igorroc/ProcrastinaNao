const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Noticia`
	)

	let config = require("../config.json")
	let link = `https://newsapi.org/v2/`

	let embed = new Discord.MessageEmbed()
		.setTitle(`\\📰 Notícia`)
		.setColor("#64B3E3")
		.setTimestamp()

	if (!args[0]) {
		link += `top-headlines?apiKey=${config.apiNews}&country=br`
	} else if (args[0].length == 2 && !args[1]) {
		link += `top-headlines?apiKey=${config.apiNews}&country=${args[0]}`
	} else if (args[0].length > 2 && !args[1]) {
		link += `everything?apiKey=${config.apiNews}&q=${args[0]}&language=pt`
	} else if (args[0].length == 2 && args[1]) {
		link += `everything?apiKey=${config.apiNews}&q=${args
			.slice(1)
			.join("%20")}&language=${args[0]}`
	} else {
		link += `everything?apiKey=${config.apiNews}&q=${args.join(
			"%20"
		)}&language=pt`
	}

	try {
		fetch(link)
			.then((res) => res.json())
			.then(async (json) => {
				let random = Math.floor(Math.random() * json.articles.length)
				let noticia = json.articles[random]
				embed
					.setTitle(`\\📰 ${noticia.title}`)
					.setDescription(
						noticia.description + `\n[Leia mais](${noticia.url})`
					)
					.setAuthor(noticia.source.name || noticia.author)
					.setImage(noticia.urlToImage)
					.setFooter(
						`Publicado em: ${new Date(
							noticia.publishedAt
						).toDateString()}`
					)

				message.reply(embed)
			})
			.catch((err) => {
				embed
					.setDescription(`Ocorreu um erro ao buscar a notícia.\n`)
					.setColor("#ff0000")
				message.reply(embed)
				console.log(err)
			})
	} catch (err) {
		embed
			.setDescription(`Ocorreu um erro ao buscar a notícia.\n`)
			.setColor("#ff0000")
		message.reply(embed)
		console.log(err)
	}
}

module.exports.config = {
	name: "noticia",
	description:
		"Retorna uma notícia aleatória, ou sobre um determinado assunto.",
	usage: ".noticia [br/us] [assunto]",
	accessableby: "Membros",
	aliases: ["news"],
}
