const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Promoção`
	)

	const embed = new Discord.MessageEmbed()
		.setTitle(`\\🎮 Promoção`)
		.setColor("#64B3E3")
		.setTimestamp()

	if (!args[0]) {
		embed
			.setDescription(`Você precisa indicar o nome do jogo!`)
			.setColor("#ff0000")
		return message.reply(embed)
	}

	let jogo = args.join("%20").toString().toLowerCase()

	let lojas = require("../stores.json")

	try {
		// ! Busca o nome do jogo
		await fetch(`http://www.cheapshark.com/api/1.0/games?title=${jogo}`)
			.then((res) => res.json())
			.then(async (json) => {
				if ((json.length == 0)) {
					embed
						.setDescription(
							`Não consegui encontrar esse jogo \\😔`
						)
						.setColor("#ff0000")
					return message.reply(embed)
				}
				// ! Acessa o jogo pelo ID encontrado
				await fetch(
					`http://www.cheapshark.com/api/1.0/games?id=${json[0].gameID}`
				)
					.then((res) => res.json())
					.then(async (game) => {
						let deals = []
						game.deals.forEach((i) => {
							let oferta = {
								storeID: i.storeID,
								price: i.price,
								discount: i.savings,
							}
							deals.push(oferta)
						})
						deals = deals.slice(0, 6)
						embed
							.setTitle(`\\🎮 ${game.info.title}`)
							.setImage(game.info.thumb)
							.addFields(
								{
									name: "Preço mais baixo",
									value: `$${game.cheapestPriceEver.price}`,
									inline: true,
								},
								{
									name: "Preço inicial",
									value: `$${game.deals[0].retailPrice}`,
									inline: true,
								},
								{
									name: "\u200B",
									value: "\u200B",
								}
							)
						deals.forEach((i) => {
							embed.addField(
								lojas[i.storeID].storeName,
								`▸ Preço: **${new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(i.price)}**
                                ▸ Desconto: **${new Intl.NumberFormat("en-US", {
									maximumFractionDigits: 0,
								}).format(i.discount)}%**`,
								true
							)
						})
					})

				message.reply(embed)
			})
			.catch((err) => {
				embed
					.setDescription(`Ocorreu um erro ao buscar o jogo.`)
					.setColor("#ff0000")
				message.reply(embed)
				console.error(err)
			})
	} catch (e) {
		embed
			.setDescription(`Ocorreu um erro ao buscar o jogo.\n`)
			.setColor("#ff0000")
		message.reply(embed)
		console.log(e)
	}
}

module.exports.config = {
	name: "promocao",
	description:
		"Pesquisa o nome do jogo e retorna os melhores lugares para compra-lo.",
	usage: ".jogo [nome_do_jogo]",
	accessableby: "Membros",
	aliases: ["jogo"],
}
