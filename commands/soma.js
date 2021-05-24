const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Soma`
	)

	const embed = new Discord.MessageEmbed()
		.setColor("#5E8A60")
		.setTitle("➗ DisCalculus")
		.setDescription(
			"Utilize o bot <@725319850808967198> para fazer operações matemáticas!\nDigite `+help` para mais informações!"
		)
		

	message.channel.send(embed)
}

module.exports.config = {
	name: "soma",
	description: "Faça operações matemáticas!",
	usage: "+soma",
	accessableby: "Membros",
	aliases: ["s"],
}
