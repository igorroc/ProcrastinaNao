const Command = require("../../structures/Command")

const ms = require("ms")
const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "git",
			description: "Mostra as informações do github do usuário mencionado",
			usage: "Use ` /git username ` para ver informações do usuário mencionado.",
			options: [
				{
					name: "username",
					type: "STRING",
					description: "O usuário a ser pesquisado.",
					required: true,
				},
			],
		})
	}
	run = (interaction) => {
		console.log(`\n■▶ [LOGS] ⇥ Usuário '${interaction.user.username}' usou o comando Git`)

		let user = interaction.options.getString("username")

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
					interaction.reply(`Usuário \`${user}\` não encontrado`)
					console.log(`↳ Usuário '${user}' não encontrado`)
					return
				}
				console.log(json)

				let uEmbed = new MessageEmbed()
					.setColor("#64B3E3")
					.setTitle(`<:github:722277332206747691> GitHub de ${json.login}`)
					.setURL(json.html_url)
					.setThumbnail(json.avatar_url)
					.addField("**Nome:**", json.name, true)
					.addField("**Id:**", json.id.toString(), true)
					.addField("**Bio:**", json.bio || "Sem bio")
					.addField("**Repositórios:**", json.public_repos.toString() || 0, true)
					.addField("**Seguidores:**", json.followers.toString(), true)

				interaction.reply({
					embeds: [uEmbed],
				})

				console.log(`↳ Perfil Git de '${user}' enviado`)
			})
	}
}
