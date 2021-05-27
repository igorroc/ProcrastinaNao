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
			)}\nEsse canal **não será permanente**, então **não salvem** nada de **importante** aqui.\nQuando **acabarem** de usar a sala, utilizem o comando \`.fecharsala\` aqui mesmo, para finalizar.\n\nAproveitem!`
		)
		.setTimestamp()

	const concluido = new Discord.MessageEmbed()
		.setColor("#77B155")
		.setTitle("\\✅ Concluído")
		.setDescription(
			"Sua **sala de estudos** foi criada com **sucesso!**\nQuando **acabarem** de usar a sala, utilizem o comando `.fecharsala` dentro da sua própria sala, para finalizar.\n\n||Certifiquem que não tem nenhum arquivo importante, pois a sala será excluída||"
		)

	if (
		server.channels.cache.find(
			(c) =>
				(c.name == `🔊▏${nomeDoGrupo}` && c.type == "voice") ||
				(c.name == `💬▏${nomeDoGrupo}` && c.type == "text")
		)
	) {
		aviso.setDescription(
			`Já existe uma sala de estudos com o nome **${nomeDoGrupo}**, por favor indique outro nome para o seu grupo!`
		)
		return message.reply(aviso)
	}
	let voice = await server.channels
		.create(`🔊▏${nomeDoGrupo}`, {
			type: "voice",
			parent: gruposDeEstudo.id,
			permissionOverwrites: permissoes,
		})
		.catch(console.error)

	server.channels
		.create(`💬▏${nomeDoGrupo}`, {
			type: "text",
			topic: voice.id,
			parent: gruposDeEstudo.id,
			permissionOverwrites: permissoes,
		})
		.then(async (channel) => {
			channel.send(aviso).then((message) => {
				message.pin()
			})

			concluido.addFields({
				name: "Vá para o canal de texto:",
				value: `<#${channel.id}>`,
				inline: true,
			})
			await voice.createInvite().then((invite) => {
				console.log(invite)
				concluido.addFields({
					name: "Vá para o canal de voz:",
					value: `[\\🔊▏${nomeDoGrupo}](https://discord.gg/${invite.code})`,
					inline: true,
				})
			})
			message.reply(concluido)
		})
		.catch(console.error)

	console.log(`↳ Sala de estudos criada com sucesso`)
}

module.exports.config = {
	name: "sala",
	description:
		"Cria uma sala de estudos para você e seus amigos!\nPara utilizar, coloque o nome do grupo (sem espaços) e marque as pessoas que você quiser adicionar ao grupo!",
	usage: ".sala [nome_da_sala] [usuarios]",
	accessableby: "Membros",
	aliases: ["grupo"],
}
