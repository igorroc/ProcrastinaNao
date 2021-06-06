const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Lembrete`
	)

	let contador = parseInt(args[0])
	let nMarcar = args[1]
	let check = "<a:check:722456384301563966>"

	const embed = new Discord.MessageEmbed()
		.setTitle(`\\⏰ Lembrete`)
		.setColor("#64B3E3")
		.setTimestamp()

	if (!contador) {
		embed.setDescription(`Digite um tempo válido!`).setColor("#ff0000")
		return message.reply(embed)
	}

	embed.setDescription(
		`Lembrete marcado para daqui a \` ${contador} \` minutos!`
	)
	message.channel.send(embed)

	const contagem = setInterval(async () => {
		if (contador <= 0) {
			console.log(
				`↳ Lembrete de '${message.author.username}' finalizado.`
			)
			if (nMarcar == "true") {
				let lembrete = args.slice(2).join(" ")
				embed.addField("Lembrete:", lembrete)
				message.channel.send(embed)
			} else {
				let lembrete = args.slice(1).join(" ")
				embed.setDescription(`Chegou a hora!`)
				if (lembrete) {
					embed.addField("Lembrete:", lembrete)
				}
				message.reply(embed)
			}

			clearInterval(contagem)
		}
		contador--
	}, 1000)
}

module.exports.config = {
	name: "lembrete",
	description:
		"Faz um lembrete para você pelo tempo determinado em minutos, com uma mensagem opcional!\nCaso você não queira ser marcado quando a contagem acabar, digite true logo após o tempo.",
	usage: ".lembrete [minutos] [true] (mensagem)",
	accessableby: "Membros",
	aliases: ["lembrar"],
}
