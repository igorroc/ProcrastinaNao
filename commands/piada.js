const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Piada`
	)

	let piada = new Discord.MessageEmbed()
		.setTitle(`🤡 Piada`)
		.setColor("#64B3E3")
        .setTimestamp()

	fetch("https://geek-jokes.sameerkumar.website/api?format=json")
		.then((res) => res.json())
		.then(async (json) => {
            console.log(json)
            piada.setDescription(json.joke)
            message.reply(piada)
        })

}

module.exports.config = {
	name: "piada",
	description: "Conta uma piada, em inglês, a você",
	usage: ".piada",
	accessableby: "Membros",
	aliases: ["joke"],
}
