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
	let permissoes = [
		{ id: message.guild.id, deny: ["VIEW_CHANNEL"] },
		{ id: message.author.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
	]
	let membrosMarcados = ["<@!" + message.author.id + ">"]

	if (!nomeDoGrupo) {
		message.reply("indique o nome da sua sala!")
		return
	}

	if (nomeDoGrupo == "fechar") {
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
			embed.setDescription("Essa sala de estudos **não** é sua!")
			return message.reply(embed)
		}

		let voice = message.guild.channels.cache.get(message.channel.topic)
		voice.delete()
		message.channel.delete()
		console.log(`↳ Sala de estudos removida com sucesso`)
		return
	}
	else if(nomeDoGrupo == "add"){
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
			embed.setDescription("Essa sala de estudos **não** é sua!")
			return message.reply(embed)
		}

		if (!args[1]) {
			message.reply("você precisa mencionar pessoas para entrar na sua sala!")
			return
		}

		membros.forEach((membro) => {
			membrosMarcados.push("<@!" + membro.id + ">")
			permissoes.push({
				id: membro.id,
				allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
			})
		})
		console.log(permissoes)
		console.log(message.channel.permissionOverwrites)
		// message.channel.overwritePermissions(permissoes)
		// message.channel.permissionOverwrites.edit(permissoes)
		console.log("Membros adicionados com sucesso!")
		return
	}
	else if(nomeDoGrupo == "del"){
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
			embed.setDescription("Essa sala de estudos **não** é sua!")
			return message.reply(embed)
		}

		if (!args[1]) {
			message.reply("você precisa mencionar pessoas para remover de sua sala!")
			return
		}

		membros.forEach((membro) => {
			message.channel.permissionOverwrites.delete(membro.id)
		})
		console.log("Membros removidos com sucesso!")
		return
	}

	if (!args[1]) {
		message.reply("você precisa mencionar pessoas para entrar na sua sala!")
		return
	}

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
			)}\nEsse canal **não será permanente**, então **não salvem** nada de **importante** aqui.\nQuando **acabarem** de usar a sala, utilizem o comando \`.sala fechar\` aqui mesmo, para finalizar.\n\nAproveitem!`
		)
		.setTimestamp()

	const concluido = new Discord.MessageEmbed()
		.setColor("#64B3E3")
		.setTitle("\\✅ Concluído")
		.setDescription(
			"Sua **sala de estudos** foi criada com **sucesso!**\nQuando **acabarem** de usar a sala, utilizem o comando `.fecharsala` dentro da sua própria sala, para finalizar.\n\n||Certifiquem que não tem nenhum arquivo importante, pois a sala será excluída||"
		)

	if (
		server.channels.cache.find(
			(c) =>
				(c.name == `🔊・${nomeDoGrupo}` && c.type == "voice") ||
				(c.name == `💬・${nomeDoGrupo}` && c.type == "text")
		)
	) {
		aviso.setDescription(
			`Já existe uma sala de estudos com o nome **${nomeDoGrupo}**, por favor indique outro nome para o seu grupo!`
		)
		return message.reply(aviso)
	}
	let voice = await server.channels
		.create(`🔊・${nomeDoGrupo}`, {
			type: "voice",
			parent: gruposDeEstudo.id,
			permissionOverwrites: permissoes,
		})
		.catch(console.error)

	server.channels
		.create(`💬・${nomeDoGrupo}`, {
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
				concluido.addFields({
					name: "Vá para o canal de voz:",
					value: `[\\🔊・${nomeDoGrupo}](https://discord.gg/${invite.code})`,
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
	usage: ".sala [nome_da_sala] [usuarios]\n.sala fechar\n.sala add [usuarios]\n.sala del [usuarios]",
	accessableby: "Membros",
	aliases: ["grupo"],
}
