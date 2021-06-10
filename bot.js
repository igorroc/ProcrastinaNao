const Discord = require("discord.js")
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

const pessoasComHorarioPerfeito = new Set()

var intervaloPerfeito = setInterval(timerHorarioPerfeito, 10000)

const fs = require("fs")

const MENSAGEM_REINICIO = true

let loading = "<a:loading:722456385098481735>"

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
		bot.user.setActivity(`| .help para ajuda | Criado por Igor Rocha |`, {
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

	let python = servidor.roles.cache.get("721102448483369140"),
		javascript = servidor.roles.cache.get("721179010767388682"),
		java = servidor.roles.cache.get("721176368964173835"),
		css = servidor.roles.cache.get("721177136655892632"),
		html = servidor.roles.cache.get("721346290369167460"),
		c = servidor.roles.cache.get("721115106871738408")

	const embed = new Discord.MessageEmbed()
	let localCorreto = false

	if (dados.t === "MESSAGE_REACTION_ADD") {
		if (dados.d.message_id === "721347287426793494") {
			// Mensagem de cargos
			embed.setTitle("\\💼 Cargo adicionado").setColor("#00FF00")
			localCorreto = true

			if (dados.d.emoji.id === "696478679391272961") {
				// Cargo Python
				if (membro.roles.cache.some((role) => role === python))
					return console.log(
						`↳ Usuário '${membro.user.username}' já possui o cargo 'Python'`
					)
				membro.roles.add(python)
				console.log(
					`↳ Cargo 'Python' adicionado para o usuário '${membro.user.username}'`
				)
			} else if (dados.d.emoji.id === "721349573901287445") {
				// Cargo JavaScript
				if (membro.roles.cache.some((role) => role === javascript))
					return console.log(
						`↳ Usuário '${membro.user.username}' já possui o cargo 'JavaScript'`
					)
				membro.roles.add(javascript)
				console.log(
					`↳ Cargo 'JavaScript' adicionado para o usuário '${membro.user.username}'`
				)
			} else if (dados.d.emoji.id === "722249250586492978") {
				// Cargo Java
				if (membro.roles.cache.some((role) => role === java))
					return console.log(
						`↳ Usuário '${membro.user.username}' já possui o cargo 'Java'`
					)
				membro.roles.add(java)
				console.log(
					`↳ Cargo 'Java' adicionado para o usuário '${membro.user.username}'`
				)
			} else if (dados.d.emoji.id === "721345484035325984") {
				// Cargo CSS
				if (membro.roles.cache.some((role) => role === css))
					return console.log(
						`↳ Usuário '${membro.user.username}' já possui o cargo 'CSS'`
					)
				membro.roles.add(css)
				console.log(
					`↳ Cargo 'CSS' adicionado para o usuário '${membro.user.username}'`
				)
			} else if (dados.d.emoji.id === "721345485314588744") {
				// Cargo HTML
				if (membro.roles.cache.some((role) => role === html))
					return console.log(
						`↳ Usuário '${membro.user.username}' já possui o cargo 'HTML'`
					)
				membro.roles.add(html)
				console.log(
					`↳ Cargo 'HTML' adicionado para o usuário '${membro.user.username}'`
				)
			} else if (dados.d.emoji.id === "721347830765322313") {
				// Cargo C
				if (membro.roles.cache.some((role) => role === c))
					return console.log(
						`↳ Usuário '${membro.user.username}' já possui o cargo 'C'`
					)
				membro.roles.add(c)
				console.log(
					`↳ Cargo 'C' adicionado para o usuário '${membro.user.username}'`
				)
			}
		}
	}
	if (dados.t === "MESSAGE_REACTION_REMOVE") {
		if (dados.d.message_id === "721347287426793494") {
			// Mensagem de cargos
			embed.setTitle("\\💼 Cargo removido").setColor("#FF0000")
			localCorreto = true

			if (dados.d.emoji.id === "696478679391272961") {
				// Cargo Python
				if (!membro.roles.cache.some((role) => role === python))
					return console.log(
						`↳ Usuário '${membro.user.username}' ainda não tinha o cargo 'Python'`
					)
				membro.roles.remove(python)
				console.log(
					`↳ Usuário '${membro.user.username}' removeu o cargo 'Python'`
				)
			} else if (dados.d.emoji.id === "721349573901287445") {
				// Cargo JavaScript
				if (!membro.roles.cache.some((role) => role === javascript))
					return console.log(
						`↳ Usuário '${membro.user.username}' ainda não tinha o cargo 'JavaScript'`
					)
				membro.roles.remove(javascript)
				console.log(
					`↳ Usuário '${membro.user.username}' removeu o cargo 'JavaScript'`
				)
			} else if (dados.d.emoji.id === "722249250586492978") {
				// Cargo Java
				if (!membro.roles.cache.some((role) => role === java))
					return console.log(
						`↳ Usuário '${membro.user.username}' ainda não tinha o cargo 'Java'`
					)
				membro.roles.remove(java)
				console.log(
					`↳ Usuário '${membro.user.username}' removeu o cargo 'Java'`
				)
			} else if (dados.d.emoji.id === "721345484035325984") {
				// Cargo CSS
				if (!membro.roles.cache.some((role) => role === css))
					return console.log(
						`↳ Usuário '${membro.user.username}' ainda não tinha o cargo 'CSS'`
					)
				membro.roles.remove(css)
				console.log(
					`↳ Usuário '${membro.user.username}' removeu o cargo 'CSS'`
				)
			} else if (dados.d.emoji.id === "721345485314588744") {
				// Cargo HMTL
				if (!membro.roles.cache.some((role) => role === html))
					return console.log(
						`↳ Usuário '${membro.user.username}' ainda não tinha o cargo 'HTML'`
					)
				membro.roles.remove(html)
				console.log(
					`↳ Usuário '${membro.user.username}' removeu o cargo 'HTML'`
				)
			} else if (dados.d.emoji.id === "721347830765322313") {
				// Cargo C
				if (!membro.roles.cache.some((role) => role === c))
					return console.log(
						`↳ Usuário '${membro.user.username}' ainda não tinha o cargo 'C'`
					)
				membro.roles.remove(c)
				console.log(
					`↳ Usuário '${membro.user.username}' removeu o cargo 'C'`
				)
			}
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
		message.channel.send(`Comando \`${comando}\` não encontrado`)
		console.log(`\n\\▶ [LOGS] ⇥ Comando '${comando}' não encontrado`)
	}

	// ! HORARIO PERFEITO
	if (comando == "horarioperfeito" || comando == "hp") {
		const embed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("\\⏰ Horário Perfeito")

		if (pessoasComHorarioPerfeito.has(message.author.id)) {
			pessoasComHorarioPerfeito.delete(message.author.id)
			embed
				.setDescription(
					"Você não irá mais receber os horários perfeitos!"
				)
				.setColor("#ff0000")
		} else {
			pessoasComHorarioPerfeito.add(message.author.id)
			embed.setDescription(
				"A partir de agora você irá receber uma notificação dos horários perfeitos!"
			)
		}
		message.reply(embed)
	}
})

let config = require("./config.json")
bot.login(config.token)

function timerHorarioPerfeito() {
	let day = new Date()
	let hour = day.getHours()
	let minute = day.getMinutes()
	let fuso = day.getTimezoneOffset()

	// ? APLICAÇÃO DO FUSO br
	hour -= 3
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
			(hour > 12 && (hour % 13) + 1 == minute) ||
			(hour == invertedMinute ) ||
			(minute == invertedHour ) ||
			(`${hour}${minute}` == "1234")
		) {
			bot.users.cache.get(id).send(embed)
		}
	})
}
