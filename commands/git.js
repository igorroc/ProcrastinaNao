const Discord = require("discord.js")
const fetch = require("node-fetch")

const loading = "<a:loading:722456385098481735>"

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Git`
	)

	const emojiLoading = message.guild.emojis.cache.get("722456385098481735")

	let user = args.toString()

	if (!args[0]) {
		return message.channel.send("Indique um usuário")
	}

	fetch(`https://api.github.com/users/${user}`)
		.then((res) => res.json())
		.then(async (json) => {
			if (
				!json.name &&
				!json.company &&
				!json.location &&
				!json.email &&
				!json.hireable &&
				!json.bio
			) {
				message.channel.send(`Usuário '${user}' não encontrado`)
				console.log(`↳ Usuário '${user}' não encontrado`)
				return
			}
			let embed = new Discord.MessageEmbed()
				.setColor("#64B3E3")
				.setTitle(
					`<:github:722277332206747691> GitHub de ${json.login}`
				)
				.setURL(json.html_url)
				.setThumbnail(json.avatar_url)
				.setDescription(
					"Navegue pelas páginas utilizando as setas abaixo"
				)
				.addField("**Nome:**", json.name, true)
				.addField("**Id:**", json.id, true)
				.addField("**Bio:**", json.bio || "Sem bio")
				.addField("**Repositórios:**", json.public_repos || 0, true)
				.addField("**Seguidores:**", json.followers, true)

			let msg = await message.channel.send(embed)
			await msg.react(emojiLoading).then(async (load) => {
				await msg.react("◀️").then(async (r) => {
					await msg.react("❌").then(async (r) => {
						await msg.react("▶").then(async (r) => load.remove())
					})
				})
			})
			console.log(`↳ Perfil Git de '${user}' enviado`)

			const collector = await msg
				.createReactionCollector(
					(reaction, user1) =>
						(user1.id === message.author.id &&
							reaction.emoji.name === "◀️") ||
						reaction.emoji.name === "▶" ||
						reaction.emoji.name === "❌"
				)
				.on("collect", async (reaction) => {
					const chosen = reaction.emoji.name
					if (chosen === "▶") {
						let novoEmbed = new Discord.MessageEmbed()
							.setColor("#64B3E3")
							.setTitle(
								`<:github:722277332206747691> Repositórios de ${json.login}`
							)
							.setURL(json.html_url + "?tab=repositories")
							.setThumbnail(json.avatar_url)
							.setDescription(
								"Navegue pelas páginas utilizando as setas abaixo"
							)
						let total = json.public_repos
						fetch(`https://api.github.com/users/${user}/repos`)
							.then((res) => res.json())
							.then(async (json) => {
								let i = 0
								json = json.slice(0, 6)
								json.forEach((repos) => {
									i++
									novoEmbed
										.addField(
											"**" + repos.name + "**",
											repos.description
												? `[${repos.description}](${repos.html_url})`
												: "Sem descrição"
										)
										.setFooter(`${i} de ${total}`)
									if (i == total) {
										novoEmbed.setDescription(
											`\\✅ Repositórios carregados`
										)
									} else if (i >= 6) {
										novoEmbed.setDescription(
											`\\✅ Para ver mais repositórios de **${repos.owner.login}**, [clique aqui](${repos.owner.html_url})`
										)
									} else {
										novoEmbed.setDescription(
											`${loading} Carregando repositórios...`
										)
									}
									msg.edit(
										new Discord.MessageEmbed(novoEmbed)
									)
								})
							})
					} else if (chosen === "◀️") {
						msg.edit(new Discord.MessageEmbed(embed))
					} else if (chosen === "❌") {
						collector.stop()
						msg.reactions
							.removeAll()
							.catch(() =>
								console.log("↳ ⚠️ Erro ao deletar a mensagem")
							)
						msg.delete().catch(() =>
							console.log("↳ ⚠️ Erro ao deletar a mensagem")
						)
						message
							.delete()
							.catch(() =>
								console.log("↳ ⚠️ Erro ao deletar a mensagem")
							)
					}
					const userReactions = msg.reactions.cache.filter(
						(reaction) =>
							reaction.users.cache.has(message.author.id)
					)
					try {
						for (const reaction of userReactions.values()) {
							await reaction.users.remove(message.author.id)
						}
					} catch (error) {
						console.log("↳ ⚠️ Erro ao remover as reações")
					}
				})
		})
}

module.exports.config = {
	name: "git",
	description:
		"Acessa o perfil do GitHub do usuário desejado. É possível também acessar os repositórios.",
	usage: ".git (usuário)",
	accessableby: "Membros",
	noalias: "Sem variações",
	aliases: [],
}
