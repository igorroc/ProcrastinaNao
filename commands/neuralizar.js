const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando neuralizar`
	)

	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
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

	let server = bot.guilds.cache.get("696430420992066112")

	let novato = server.roles.cache.get("721103513874202645")
	let calouro = server.roles.cache.get("696434056778350612")
	let veterano = server.roles.cache.get("696434089972072519")
	let estudante = server.roles.cache.get("821147812456300574")
	let professor = server.roles.cache.get("723181852684320769")

	let geral = server.channels.cache.find(
		(c) => c.name == "⤙ 🌍 GERAL ⤚" && c.type == "category"
	)
	let semprof = server.channels.cache.find(
		(c) => c.name == "❌▏sem-professores" && c.type == "text"
	)

	semprof.delete()

	server.channels
		.create("❌▏sem-professores", {
			type: "text",
			parent: geral.id,
			position: 14,
			topic: "As mensagens desse canal serão excluídas de tempos em tempos :shushing_face:",
			permissionOverwrites: [
				{
					id: message.guild.id,
					deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
				},
				{
					id: novato.id,
					deny: ["VIEW_CHANNEL"],
				},
				{
					id: calouro.id,
					allow: [
						"VIEW_CHANNEL",
						"SEND_MESSAGES",
						"READ_MESSAGE_HISTORY",
					],
				},
				{
					id: veterano.id,
					allow: [
						"VIEW_CHANNEL",
						"SEND_MESSAGES",
						"READ_MESSAGE_HISTORY",
					],
				},
				{
					id: estudante.id,
					allow: [
						"VIEW_CHANNEL",
						"SEND_MESSAGES",
						"READ_MESSAGE_HISTORY",
					],
				},
				{
					id: professor.id,
					deny: [
						"VIEW_CHANNEL",
						"SEND_MESSAGES",
						"READ_MESSAGE_HISTORY",
					],
				},
			],
		})
		.then((channel) => {
			const embed = new Discord.MessageEmbed()
				.setColor("#FCE100")
				.setTitle("\\⚠️ Aviso")
				.setDescription(
					"As mensagens desse canal serão excluídas periódicamente :shushing_face:"
				)
				.setTimestamp()

			channel.send(embed).then((message) => {
				message.pin()
			})
		})
		.catch(console.error)
}

module.exports.config = {
	name: "neuralizar",
	description: "Redefine o canal sem professores!",
	usage: ".neuralizar",
	accessableby: "Moderadores",
	aliases: [],
}
