const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Ping`
	)

	let loading = "<a:loading:722456385098481735>"
	let check = "<a:check:722456384301563966>"

	const ping = new Discord.MessageEmbed()
		.setTitle(`${loading} Ping?`)
		.setColor("#FFC83D")

	var msg = await message.channel.send(ping)

	const pong = new Discord.MessageEmbed()
		.setTitle(`${check} Pong!`)
		.setColor("#64B3E3")
		.setDescription(
			`A latência é de **${
				msg.createdTimestamp - message.createdTimestamp
			}ms**. \nA latência da API é **${Math.round(bot.ws.ping)}ms**.`
		)
		.setTimestamp()

	msg.edit(pong)

	console.log(
		`↳ Latência: ${
			msg.createdTimestamp - message.createdTimestamp
		}ms , API: ${Math.round(bot.ws.ping)}ms`
	)
}

module.exports.config = {
	name: "ping",
	description: "Informa a latência atual da conexão bot-servidor!",
	usage: ".ping",
	accessableby: "Membros",
	aliases: ["latencia", "ms"],
}
