const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Filme`
	)

	let config = require("../config.json")
	let api = config.apiOMDb

	const embed = new Discord.MessageEmbed()
		.setTitle(`\\🎬 Filme`)
		.setColor("#64B3E3")
		.setTimestamp()

	if (!args[0]) {
		embed
			.setDescription(`Você precisa indicar um nome de filme!`)
			.setColor("#ff0000")
		message.reply(embed)
	}

	let filme = args.join("+").toString().toLowerCase()

	try {
		await fetch(`http://www.omdbapi.com/?apikey=${api}&t=${filme}&`)
			.then((res) => res.json())
			.then(async (json) => {
				if (json.Response == "False") {
					console.log("erro")
					console.log(
						`http://www.omdbapi.com/?apikey=${api}&t=${filme}&`
					)
					embed
						.setDescription(
							`Ocorreu um erro ao buscar o filme.\n||${json.Error}||`
						)
						.setColor("#ff0000")
				} else {
					let rate = ""
					json.Ratings.forEach((i, v) => {
						rate += `▸ *${i.Source}:* **${i.Value}**\n`
					})
					embed
						.setTitle(`\\🎬 ${json.Title}`)
						.addFields(
							{
								name: "Diretor",
								value: json.Director || "N/A",
							},
							{
								name: "Data de Lançamento",
								value: json.Released || "N/A",
								inline: true,
							},
							{
								name: "Duração",
								value: json.Runtime || "N/A",
								inline: true,
							},
							{
								name: "Faturamento",
								value: json.BoxOffice || "N/A",
								inline: true,
							},
							{
								name: "Gênero",
								value: json.Genre || "N/A",
								inline: true,
							},
							{
								name: "Atores Principais",
								value: json.Actors || "N/A",
								inline: true,
							},
							{
								name: "Produção",
								value: json.Production || "N/A",
								inline: true,
							},
							{
								name: "Avaliações",
								value: rate || "N/A",
							},
							{
								name: "Sinopse",
								value: json.Plot || "N/A",
							}
						)
						.setImage(json.Poster)
					if (json.Type == "series") {
						embed.addField("Temporadas", json.totalSeasons, true)
					}
				}
				message.reply(embed)
			})
	} catch (e) {
		embed
			.setDescription(`Ocorreu um erro ao buscar o filme/serie.\n`)
			.setColor("#ff0000")
		message.reply(embed)
		console.log(e)
	}
}

module.exports.config = {
	name: "filme",
	description:
		"Pesquisa o nome do filme/serie.\nInfelizmente todas as informações estão em inglês \\😕",
	usage: ".filme [nome_do_filme/serie]",
	accessableby: "Membros",
	aliases: ["movie", "serie"],
}
