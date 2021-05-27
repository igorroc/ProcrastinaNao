const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Countdown`
	)

	let contador = parseInt(args) - 1
	let loading = "<a:loading:722456385098481735>"
	let check = "<a:check:722456384301563966>"

	const embed = new Discord.MessageEmbed()
		.setColor("#64B3E3")
		.setTitle(`${loading} Contagem`)
		.addFields({ name: "Contagem iniciada", value: contador })
		.setTimestamp()

	const finalizado = new Discord.MessageEmbed()
		.setColor("#00FF00")
		.setTitle(`${check} Finalizado`)
		.addFields({
			name: "Contagem finalizada",
			value: message.member.user || message.author.username,
		})
		.setTimestamp()

	message.channel.send(embed).then(async (msg) => {
		const contagem = setInterval(async () => {
			if (contador > 0) {
				let contar = new Discord.MessageEmbed()
					.setColor("#64B3E3")
					.setTitle(`${loading} Contagem`)
					.addFields({ name: "Contagem iniciada", value: contador })
					.setTimestamp()

				msg.edit(contar)
				contador--
			} else {
				console.log("↳ Contagem finalizada.")
				msg.edit(finalizado)
				clearInterval(contagem)
			}
		}, 1000)
	})
}

module.exports.config = {
	name: "countdown",
	description: "Inicia uma contagem regressiva com o tempo indicado!",
	usage: ".countdown [tempo]",
	accessableby: "Membros",
	aliases: ["cd"],
}
