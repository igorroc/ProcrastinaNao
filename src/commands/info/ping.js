const Command = require("../../structures/Command")

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "ping",
			description: "Mostra o ping do bot",
		})
	}
	run = (interaction) => {
		console.log(`\n■▶ [LOGS] ⇥ Usuário '${interaction.user.username}' usou o comando Ping`)

		interaction.reply({
			content: `O ping atual é de \`${this.client.ws.ping}\`ms.`,
			ephemeral: true,
		})
	}
}
