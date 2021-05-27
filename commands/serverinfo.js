const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando ServerInfo`
	)

	let sEmbed = new Discord.MessageEmbed()
		.setColor("#64B3E3")
		.setTitle("Informações do Servidor")
		.setThumbnail(message.guild.iconURL())
		.addField("**Nome do Servidor:**", `${message.guild.name}`, true)
		.addField("**Dono do Servidor:**", `${message.guild.owner}`, true)
		.addField("**Quantidade de Membros:**", `${message.guild.memberCount}`)
		.addField(
			"**Quantidade de Cargos:**",
			`${message.guild.roles.cache.size}`,
			true
		)
		.addField(
			"**Quantidade de Emojis:**",
			`${message.guild.emojis.cache.size}`,
			true
		)
		.setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL())
	message.channel.send({ embed: sEmbed })

	let membros = message.guild.channels.cache.get("846354264741380116")
	membros.setName(`👥▏ Membros: ${message.guild.memberCount}`)

	let cargos = message.guild.channels.cache.get("846356134919143464")
	cargos.setName(`💼▏ Cargos: ${message.guild.roles.cache.size}`)
}

module.exports.config = {
	name: "serverinfo",
	description: "Envia as informações do servidor!",
	usage: ".serverinfo",
	accessableby: "Membros",
	aliases: ["si", "serverdesc"],
}
