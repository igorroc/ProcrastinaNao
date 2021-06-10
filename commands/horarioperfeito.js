const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando HorarioPerfeito`
	)

    
}

module.exports.config = {
	name: "horarioperfeito",
	description: "Te avisa todos os horarios perfeitos!",
	usage: ".horarioperfeito",
	accessableby: "Membros",
	aliases: ["hp", "gabi"],
}