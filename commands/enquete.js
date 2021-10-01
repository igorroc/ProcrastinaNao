const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Enquete`
	)

	const enquete = new Discord.MessageEmbed()
		.setColor("#69B2E0")
		.setFooter(
			`Criado por ${
				message.author.username || message.author.user || message.author
			}`
		)
		.setTimestamp()

	let title = args[0]
	let opcoes = args.slice(1).join(" ")

	if (!title) {
		return message.reply("você precisa indicar um título para a enquete.")
	}

	if (!opcoes) {
		return message.reply("você precisa indicar as opções da enquete.")
	}

	enquete.setTitle(title.replace(/-/g, " "))
	opcoes = opcoes.split("|")
	let description = ""
	let listaEmojis = []
	opcoes.forEach((e) => {
		e = e.split("-")
		let emoji = e[0]
		let frase = e[1]
		description += emoji + " → **" + frase + "**\n"
		listaEmojis.push(emoji)
	})
	enquete.setDescription(description)
    let isError = false
    let waiting = true
    let qtdAccepted = 0
	let msg1 = await message.channel.send(enquete).then((msg) => {
		listaEmojis.forEach(async (e) => {
			await msg.react(e).catch((err) => {
				console.error("ERRO", err)
				isError = true
			})
            qtdAccepted += 1
		})
        return msg
	})
    
    while(waiting){
        await sleep(100)
        if(isError) waiting = false
        if(qtdAccepted == listaEmojis.length) waiting = false
    }

    if (isError) {
        let error = new Discord.MessageEmbed()
            .setColor("#C7151C")
            .setTitle("Erro na enquete")
            .setDescription(
                "Ocorreu um erro na criação da sua enquete.\nEsse comando apenas aceita **emojis padrões** do sistema."
            )
        message.channel.send(error)
        msg1.delete()
    }

	message.delete()
}

module.exports.config = {
	name: "enquete",
	description: "Cria uma enquete no canal atual!",
	usage: ".enquete [titulo-assim] [emoji1-opcao1|emoji2-opcao2|emoji3-opcao3...]\nExemplo:\n.enquete Meu-titulo 😀-Opção 1|💚-Opção 2|💥-Opção 3",
	accessableby: "Membros",
	aliases: ["pool"],
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
