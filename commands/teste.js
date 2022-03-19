const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Teste`
	)

	if (!message.member.hasPermission("ADMINISTRATOR")) {
		const naoDigno = new Discord.MessageEmbed()
			.setColor("#FF0000")
			.setTitle("Você não é digno de realizar esse comando!")

		message.reply(naoDigno)
		message.channel.send(
			"https://tenor.com/view/batman-winger-wag-not-allowed-no-nope-gif-5433518"
		)
		console.log(`↳ Acesso negado para '${message.author.username}'`)
		return
	}

	let projetos = message.guild.roles.cache.get('856261907183042600')
	let habilidades = message.guild.roles.cache.get('856259520220889118')
	let informacoes = message.guild.roles.cache.get('856261550994096149')

	console.log(projetos.rawPosition, habilidades.rawPosition, informacoes.rawPosition)

	message.guild.members.cache.forEach((member) => {
		if(member.roles.cache.some((role) => role.id == '721103513874202645' || role.id == '696464386071593081')){
			try {
				member.roles.remove(projetos)
				member.roles.remove(habilidades)
				member.roles.remove(informacoes)
			} catch (e) {
				
			}
			return
		}
		if (member.roles.cache.some((role) => role.rawPosition > habilidades.rawPosition && role.rawPosition < projetos.rawPosition)){
			try {
				member.roles.add(projetos)
			} catch (e) {
				console.log(e)
			}
		}

		if (member.roles.cache.some((role) => role.rawPosition > informacoes.rawPosition && role.rawPosition < habilidades.rawPosition)){
			try {
				member.roles.add(habilidades)
			} catch (e) {
				console.log(e)
			}
		}

		if (member.roles.cache.some((role) => role.rawPosition < informacoes.rawPosition)){
			try {
				member.roles.add(informacoes)
			} catch (e) {
				console.log(e)
			}
		}

		return
	})
}

module.exports.config = {
	name: "teste",
	description: "Comando para testes",
	usage: ".teste",
	accessableby: "Moderadores",
	noalias: "Sem variações",
	aliases: [],
}
