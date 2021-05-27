const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Gif`
	)

	let config = require("../config.json")

	let prefix = config.prefix
	let messageArray = message.content.split(" ")
	let comando = messageArray[0].slice(prefix.length)

	let link = "https://api.giphy.com/v1/"

	if (comando == "gif") link += "gifs/"
	else link += "stickers/"

	const embed = new Discord.MessageEmbed()
		.setTitle(`\\👾 Gif`)
		.setColor("#64B3E3")

	if (args[0]) {
		embed.setDescription(
			`Aqui está seu ${comando} sobre **${args.join(" ")}**`
		)
		link += `search?api_key=${config.apiGiphy}&q=${args.join("%20")}`
	} else {
		embed.setDescription(`Aqui está seu ${comando} aleatório!`)
		link += `trending?api_key=${config.apiGiphy}`
	}

	try {
		fetch(link)
			.then((res) => res.json())
			.then(async (json) => {
                let random = Math.floor(Math.random() * (json.data.length));
                let gif = json.data[random]
				console.log(gif)
                console.log(link)
                embed.setTitle(`\\👾 ${gif.title}`)
                    .setImage(gif.images.original.url)
                message.reply(embed)
			})
	} catch (e) {
		embed
			.setDescription(`Ocorreu um erro ao buscar o ${comando}.\n`)
			.setColor("#ff0000")
		message.reply(embed)
		console.log(e)
	}
}

module.exports.config = {
	name: "gif",
	description:
		"Envia um gif ou figurinha!\nCaso você queira, pode indicar um determinado assunto.",
	usage: ".gif [assuntos]\n.sticker [assunto]",
	accessableby: "Membros",
	aliases: ["sticker", "figurinha"],
}
