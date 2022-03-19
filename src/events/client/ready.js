const Event = require("../../structures/Event")

module.exports = class extends Event {
	constructor(client) {
		super(client, {
			name: "ready",
		})
	}

	run = (client) => {
		var guild = client.guilds.cache.get("696430420992066112") // ProcrastinaNão
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

		this.client.registryCommands()
	}
}
