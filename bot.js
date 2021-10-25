const Discord = require("discord.js")
const fs = require("fs")
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

const pessoasComHorarioPerfeito = new Set()
pessoasComHorarioPerfeito.add("337349173894447106") // Add Gabi

// var intervaloPerfeito = setInterval(timerHorarioPerfeito, 60000)

const MENSAGEM_REINICIO = false

fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err)

	let jsfile = files.filter((f) => f.split(".").pop() === "js") // Pega todos os nomes dos comandos da pasta "./commands/" e remove o '.js'
	if (jsfile.length <= 0) {
		return console.log("[LOGS] Não foi possível encontrar comandos!")
	}

	jsfile.forEach((f, i) => {
		let pull = require(`./commands/${f}`) // Importa cada arquivo
		bot.commands.set(pull.config.name, pull) // Coloca o nome dele na Collection
		console.log(
			`\n■▶ [STARTING] ⇥ Comando '${pull.config.name}' inicializado com sucesso`
		)
		pull.config.aliases.forEach((alias) => {
			bot.aliases.set(alias, pull.config.name) // Coloca a variação dele na Collection
			console.log(`↳ Variação '${alias}' adicionada`)
		})
	})
})

// ! =-=-=-=-=-=-=-=-=-=-=-=-=

bot.once("ready", () => {
	let config = require("./config.json")

	var guild = bot.guilds.cache.get("696430420992066112")
	var memberCount = guild.members.cache.filter(
		(member) => !member.user.bot
	).size

	let mensagem = `■ Bot iniciado, total de ${memberCount} participantes! ■`
	let barra = ""

	for (let i = 0; i < mensagem.length; i++) {
		barra = barra + "■"
	}

	console.log(barra)
	console.log(mensagem)
	console.log(barra + "\n\n")

	const log = bot.channels.cache.get("722274694535053317")

	if (MENSAGEM_REINICIO) {
		const embed = new Discord.MessageEmbed()
			.setColor("#00FF00")
			.setTitle("\\🌟 Bot iniciado!")
			.setDescription(`**Total de \`${memberCount}\` participantes!**`)
			.setTimestamp()

		log.send(embed)
	}

	if (config.status == "on") {
		bot.user.setStatus("online")
		bot.user.setActivity(`| .help para ajuda`, {
			type: "PLAYING",
		})
	} else {
		bot.user.setStatus("idle")
		bot.user.setActivity(`| Estão fazendo alterações em mim! |`, {
			type: "PLAYING",
		})
	}
})

bot.on("raw", async (dados) => {
	if (
		dados.t !== "MESSAGE_REACTION_ADD" &&
		dados.t !== "MESSAGE_REACTION_REMOVE"
	)
		return

	let servidor = bot.guilds.cache.get("696430420992066112") // Servidor ProcrastinaNão
	let membro = servidor.members.cache.get(dados.d.user_id)

	if (membro.user.bot) return

	const embed = new Discord.MessageEmbed()
	let localCorreto = false

	const ListaSkills = [
		{
			name: "Python",
			emoji: "696478679391272961",
			cargo: servidor.roles.cache.get("721102448483369140"),
		},
		{
			name: "JavaScript",
			emoji: "721349573901287445",
			cargo: servidor.roles.cache.get("721179010767388682"),
		},
		{
			name: "Java",
			emoji: "722249250586492978",
			cargo: servidor.roles.cache.get("721176368964173835"),
		},
		{
			name: "CSS",
			emoji: "721345484035325984",
			cargo: servidor.roles.cache.get("721177136655892632"),
		},
		{
			name: "HTML",
			emoji: "721345485314588744",
			cargo: servidor.roles.cache.get("721346290369167460"),
		},
		{
			name: "C",
			emoji: "721347830765322313",
			cargo: servidor.roles.cache.get("721115106871738408"),
		},
		{
			name: "Ruby",
			emoji: "902233239786254357",
			cargo: servidor.roles.cache.get("902233562491781170"),
		},
	]

	const ListaSeparadores = [
		{
			name: "Projetos",
			emoji: "🟥",
			cargo: servidor.roles.cache.get("856261907183042600"),
		},
		{
			name: "Habilidades",
			emoji: "🟩",
			cargo: servidor.roles.cache.get("856259520220889118"),
		},
		{
			name: "Informações",
			emoji: "🟦",
			cargo: servidor.roles.cache.get("856261550994096149"),
		},
	]

	if (dados.t === "MESSAGE_REACTION_ADD") {
		if (dados.d.message_id === "721347287426793494") {
			// Mensagem de cargos
			embed.setTitle("\\💼 Cargo adicionado").setColor("#00FF00")

			ListaSkills.forEach((c) => {
				localCorreto = true
				if (dados.d.emoji.id === c.emoji) {
					if (membro.roles.cache.some((role) => role === c.cargo)) {
						// prettier-ignore
						return console.log(`↳ Usuário '${membro.user.username}' já possui o cargo '${c.name}'`)
					}
					membro.roles.add(c.cargo)
					console.log(
						`↳ Usuário '${membro.user.username}' adicionou o cargo '${c.name}'`
					)
				}
			})
		} else if (dados.d.message_id === "889571344918925342") {
			// Mensagem Separadores
			embed.setTitle("\\💼 Cargo adicionado").setColor("#00FF00")

			ListaSeparadores.forEach((c) => {
				localCorreto = true
				if (dados.d.emoji.name === c.emoji) {
					if (membro.roles.cache.some((role) => role === c.cargo)) {
						// prettier-ignore
						return console.log(`↳ Usuário '${membro.user.username}' já possui o separador '${c.name}'`)
					}
					membro.roles.add(c.cargo)
					console.log(
						`↳ Usuário '${membro.user.username}' adicionou o separador '${c.name}'`
					)
				}
			})
		}
	}
	if (dados.t === "MESSAGE_REACTION_REMOVE") {
		if (dados.d.message_id === "721347287426793494") {
			// Mensagem de cargos
			embed.setTitle("\\💼 Cargo removido").setColor("#FF0000")

			ListaSkills.forEach((c) => {
				localCorreto = true
				if (dados.d.emoji.id === c.emoji) {
					if (!membro.roles.cache.some((role) => role === c.cargo)) {
						// prettier-ignore
						return console.log(`↳ Usuário '${membro.user.username}' ainda não tinha o cargo '${c.name}'`)
					}
					membro.roles.remove(c.cargo)
					console.log(
						`↳ Usuário '${membro.user.username}' removeu o cargo '${c.name}'`
					)
				}
			})
		} else if (dados.d.message_id === "889571344918925342") {
			// Mensagem Separadores
			embed.setTitle("\\💼 Cargo removido").setColor("#FF0000")

			ListaSeparadores.forEach((c) => {
				localCorreto = true
				if (dados.d.emoji.name === c.emoji) {
					if (!membro.roles.cache.some((role) => role === c.cargo)) {
						// prettier-ignore
						return console.log(`↳ Usuário '${membro.user.username}' ainda não tinha o separador '${c.name}'`)
					}
					membro.roles.remove(c.cargo)
					console.log(
						`↳ Usuário '${membro.user.username}' removeu o separador '${c.name}'`
					)
				}
			})
		}
	}

	if (localCorreto) {
		let emoji = servidor.emojis.cache
			.filter((emoji) => emoji.id == dados.d.emoji.id)
			.first()

		embed
			.addFields({
				name: "\u200B",
				value: `${
					emoji || dados.d.emoji || "`" + dados.d.emoji.id + "`"
				} → ${membro}`,
				inline: false,
			})
			.setTimestamp()
		bot.channels.cache.get("722274694535053317").send(embed)
	}
})

bot.on("guildMemberAdd", (membro) => {
	console.log(
		`\n✅ [LOGS] ⇥ Novo membro no servidor. Dê as boas vindas para '${membro.user.username}'`
	)
	if (membro.user.bot) {
		membro.roles.add("696464386071593081") // Cargo de Bots
	} else {
		membro.roles.add("721103513874202645") // Cargo novato
		bot.channels.cache
			.get("721103116686327820")
			.send(
				`Olá, ${membro.user}! Seja bem-vindo(a)\nPara ter **acesso completo** ao servidor, digite:\`\`\`fix\n.cadastro\`\`\``
			)
	}
	var guild = bot.guilds.cache.get("696430420992066112")
	var memberCount = guild.members.cache.filter(
		(member) => !member.user.bot
	).size
	var botCount = guild.members.cache.filter((member) => member.user.bot).size

	const embed = new Discord.MessageEmbed()
		.setColor("#00FF00")
		.addFields({
			name: "\\✅ → Novo membro",
			value:
				membro ||
				membro.username ||
				membro.user ||
				membro.user.username ||
				"indefinido",
			inline: false,
		})
		.setTimestamp()
		.setFooter(`Total de ${memberCount} membros\nTotal de ${botCount} bots`)

	bot.channels.cache.get("722274694535053317").send(embed)

	let membros = guild.channels.cache.get("846354264741380116")
	membros.setName(`👥・Membros: ${memberCount}`)
})

bot.on("guildMemberRemove", (membro) => {
	console.log(
		`\n❌ [LOGS] ⇥ O membro '${membro.user.username}' saiu do servidor.`
	)
	var guild = bot.guilds.cache.get("696430420992066112")
	var memberCount = guild.members.cache.filter(
		(member) => !member.user.bot
	).size
	var botCount = guild.members.cache.filter((member) => member.user.bot).size

	const embed = new Discord.MessageEmbed()
		.setColor("#FF0000")
		.addFields({
			name: "\\❌ → Membro saiu",
			value:
				membro ||
				membro.username ||
				membro.user ||
				membro.user.username ||
				"indefinido",
			inline: false,
		})
		.setTimestamp()
		.setFooter(`Total de ${memberCount} membros\nTotal de ${botCount} bots`)

	bot.channels.cache.get("722274694535053317").send(embed)

	let membros = guild.channels.cache.get("846354264741380116")
	membros.setName(`👥・Membros: ${memberCount}`)
})

bot.on("message", async (message) => {
	// ! Return if the author is a bot
	if (message.author.bot) return

	// ! Restart the config file
	delete require.cache[require.resolve("./config.json")]
	let config = require("./config.json")

	// ? Cleans the message
	let prefix = config.prefix
	let messageArray = message.content.split(" ")
	let comando = messageArray[0].slice(prefix.length)
	let args = messageArray.slice(1)

	// ! Return a message to ModChannel when someone sends a DM
	if (message.channel.type == "dm") {
		let anexo = message.attachments.first()?.attachment
		const embed = new Discord.MessageEmbed()
			.setColor("#64B3E3")
			.setTitle("\\💬 Mensagem recebida")
			.setDescription(
				anexo
					? `[anexo](${anexo.toString()})${anexo
							.toString()
							.slice(-4)}`
					: message.content.length < 1024
					? message.content
					: message.content.slice(0, 1015) + " [...]"
			)
			.addFields({
				name: `Enviado por:`,
				value: message.author || message.author.username,
				inline: false,
			})
			.setImage(
				anexo
					? anexo.toString().endsWith(".png")
						? anexo
						: null
					: null
			)
			.setTimestamp()

		return bot.channels.cache.get("722274694535053317").send(embed)
	}

	let emojiAgree = bot.emojis.cache.get("892486327080218684"),
		emojiDisagree = bot.emojis.cache.get("892486199233618041")

	if (message.channel.id == "696458021500354581") {
		// Suggestion channel
		await message.react(emojiDisagree)
		await message.react(emojiAgree)
		console.log("New suggestion")
	}

	// ! Verify the prefix
	if (!message.content.startsWith(prefix)) return

	// ! Verify if there is a command
	if (!comando) return

	// ! Verify if the bot is set to be offline
	if (config.status == "off" && comando != "help" && comando != "config") {
		// Valida se o bot está online ou offline, liberando apenas o uso do comando config e help
		let off = "<:off:723707654245187665>"
		message.channel.send(
			`${off} Eu estou \` offline \`.\nProvavelmente estão **fazendo alterações** em mim!\n> Seja **paciente**!`
		)
		console.log(
			`⚫ Comando enviado por '${message.author.username}' enquanto o bot está OFF`
		)
	}

	// ! Retorna, caso o usuário esteja preso
	if (message.member.roles.cache.find((r) => r.id == "842189200337666058")) {
		const embed = new Discord.MessageEmbed()
			.setColor("#ff0000")
			.setTitle("\\🚫 Erro")
			.setDescription(
				"Você está **preso**, e **não** pode mais enviar comandos!"
			)
			.setTimestamp()

		return message.reply(embed)
	}

	// ! Run the command
	let commandfile =
		bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando)) // Pega o comando escrito no arquivo de comandos

	// ! Verifica se o comando existe
	if (commandfile) commandfile.run(bot, message, args)
	else {
		message.react(`❓`)
		console.log(`\n■▶ [LOGS] ⇥ Comando '${comando}' não encontrado`)
	}

	// ! HORARIO PERFEITO
	// if (comando == "horarioperfeito" || comando == "hp") {
	// 	const embed = new Discord.MessageEmbed()
	// 		.setColor("#0099ff")
	// 		.setTitle("\\⏰ Horário Perfeito")

	// 	if (pessoasComHorarioPerfeito.has(message.author.id)) {
	// 		pessoasComHorarioPerfeito.delete(message.author.id)
	// 		embed
	// 			.setDescription(
	// 				"Você não irá mais receber os horários perfeitos!"
	// 			)
	// 			.setColor("#ff0000")
	// 	} else {
	// 		pessoasComHorarioPerfeito.add(message.author.id)
	// 		embed.setDescription(
	// 			"A partir de agora você irá receber uma notificação dos horários perfeitos!"
	// 		)
	// 	}
	// 	message.reply(embed)
	// }
})

let config = require("./config.json")
bot.login(config.token)

function timerHorarioPerfeito() {
	let day = new Date()
	let hour = day.getHours()
	let minute = day.getMinutes()

	// ? APLICAÇÃO DO FUSO br
	hour = (hour + 24 - 3) % 24
	// ! Comentar acima caso esteja rodando localmente.

	let formattedHour = ("0" + hour).slice(-2)
	let formattedMinute = ("0" + minute).slice(-2)
	let invertedHour = parseInt(hour.toString().split("").reverse().join(""))
	let invertedMinute = parseInt(
		minute.toString().split("").reverse().join("")
	)

	const embed = new Discord.MessageEmbed()
		.setColor("#64B3E3")
		.setTitle("\\💚 Horário Perfeito")
		.setDescription(`Agora são:\n**${formattedHour}:${formattedMinute}**`)

	pessoasComHorarioPerfeito.forEach((id) => {
		if (
			// prettier-ignore
			(hour == minute) ||
			(hour == invertedMinute ) ||
			(minute == invertedHour ) ||
			(`${hour}${minute}` == "1234")
		) {
			bot.users.cache.get(id).send(embed)
		} else if (hour > 12) {
			hour = (hour % 13) + 1
			formattedHour = ("0" + hour).slice(-2)
			invertedHour = parseInt(
				hour.toString().split("").reverse().join("")
			)

			embed.setDescription(
				`Agora são:\n**${formattedHour}:${formattedMinute}**`
			)

			if (
				// prettier-ignore
				(hour == minute ) ||
				(hour == invertedMinute ) ||
				(minute == invertedHour )
			) {
				bot.users.cache.get(id).send(embed)
			}
		}
	})
}
