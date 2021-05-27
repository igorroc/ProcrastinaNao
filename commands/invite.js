const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Invite`
	)

	let link = "https://discord.gg/RvtHp7V"

	let embed = new Discord.MessageEmbed()
		.setColor("#64B3E3")
		.setTitle("📨 Convite para o ProcrastinaNão")
		.setDescription(`Convide seus amigos para o servidor!`)
		.addField("**Link:**", link)
		.setFooter(
			`Anti-Procrastinador | Membros: ${message.guild.memberCount}`,
			bot.user.displayAvatarURL()
		)

	message.channel.send(embed)
}

module.exports.config = {
	name: "invite",
	description: "Mostra o link de convite do servidor!",
	usage: ".invite",
	accessableby: "Membros",
	aliases: ["convite"],
}
