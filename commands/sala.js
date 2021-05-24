const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Sala`
	)

	let server = bot.guilds.cache.get("696430420992066112")
	let gruposDeEstudo = server.channels.cache.find(
		(c) => c.name == "⤙ 🏫 GRUPOS DE ESTUDO ⤚" && c.type == "category"
	)

	let nomeDoGrupo = args[0]
	let membros = message.mentions.users

	if (!args[1]) {
		message.reply("indique o nome da sua sala!")
		return
	}

	let permissoes = [
		{ id: message.guild.id, deny: ["VIEW_CHANNEL"] },
		{ id: message.author.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
	]
	let membrosMarcados = ["<@!" + message.author.id + ">"]

	membros.forEach((membro) => {
		membrosMarcados.push("<@!" + membro.id + ">")
		permissoes.push({
			id: membro.id,
			allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
		})
	})
	const aviso = new Discord.MessageEmbed()
		.setColor("#FCE100")
		.setTitle("\\⚠️ Aviso")
		.setDescription(
			`Esse grupo de estudos foi criado **apenas** para os usuários:\n${membrosMarcados.join(
				", "
			)}\nEsse canal **não será permanente**, então **não salvem** nada de **importante** aqui.\nAproveitem!`
		)
		.setTimestamp()
	const concluido = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("✅ Concluido")
		.setDescription("Sua **sala de estudos** foi criada com **sucesso!**")

	server.channels
		.create(`▏${nomeDoGrupo}`, {
			type: "text",
			parent: gruposDeEstudo.id,
			permissionOverwrites: permissoes,
		})
		.then((channel) => {
			channel.send(aviso).then((message) => {
				message.pin()
			})

			concluido.addFields({
				name: "Vá para ela:",
				value: `<#${channel.id}>`,
			})
			message.reply(concluido)
		})
		.catch(console.error)

	console.log(`↳ Sala de estudos criada com sucesso`)
}

module.exports.config = {
	name: "sala",
	description: "Cria uma sala de estudos para você e seus amigos!",
	usage: ".sala [nome_da_sala] [usuarios]",
	accessableby: "Membros",
	aliases: ["grupo"],
}
