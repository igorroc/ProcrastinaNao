const { Client } = require("discord.js")

const { readdirSync } = require("fs")
const { join } = require("path")

module.exports = class extends Client {
	constructor(options) {
		super(options)

		this.commands = []
		this.loadCommands()
		this.loadEvents()
	}

	registryCommands() {
		// Temporário:
		this.guilds.cache.get("696430420992066112").commands.set(this.commands)
		// Global:
		// this.application.commands.set(this.commands)
	}

	loadCommands(path = "src/commands") {
		const categories = readdirSync(path)

		console.log(`\n■■■■ Loading ■■■■\n`)

		for (const category of categories) {
			const commands = readdirSync(`${path}/${category}`)
			for (const command of commands) {
				const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
				const cmd = new commandClass(this)

				this.commands.push(cmd)
				console.log(`[COMMAND] ✅ ${cmd.name}`)
			}
		}
	}

	loadEvents(path = "src/events") {
		const categories = readdirSync(path)

		console.log(`\n■■■■ Loading ■■■■\n`)

		for (const category of categories) {
			const events = readdirSync(`${path}/${category}`)
			for (const event of events) {
				const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
				const evt = new eventClass(this)

				this.on(evt.name, evt.run)
				console.log(`[EVENT] ✅ ${evt.name}`)
			}
		}
	}
}
