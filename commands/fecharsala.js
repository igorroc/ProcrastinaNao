const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando FecharSala`
	)

	let server = bot.guilds.cache.get("696430420992066112")
	let gruposDeEstudo = server.channels.cache.find(
		(c) => c.name == "⤙ 🏫 GRUPOS DE ESTUDO ⤚" && c.type == "category"
	)

	let embed = new Discord.MessageEmbed()
		.setColor("#ff0000")
		.setTitle("\\🚫 Erro")
		.setDescription(
			"Você precisa utilizar esse comando dentro de uma **sala de estudos**."
		)
		.setTimestamp()

	if (message.channel.parentID != gruposDeEstudo.id) {
		return message.reply(embed)
	}

	if (
		!message.channel.permissionOverwrites.find(
			(perm) => perm.id == message.author.id
		)
	) {
        embed.setDescription('Essa sala de estudos **não** é sua!')
        return message.reply(embed)
	}

	let voice = message.guild.channels.cache.get(message.channel.topic)
	voice.delete()
	message.channel.delete()
	console.log(`↳ Sala de estudos removida com sucesso`)
}

module.exports.config = {
	name: "fecharsala",
	description:
		"Apaga a sala de estudos que você criou!\nPra isso acontecer, você precisa enviar a mensagem a partir do chat da sua sala.",
	usage: ".fecharsala",
	accessableby: "Membros",
	aliases: ["apagarsala"],
}
