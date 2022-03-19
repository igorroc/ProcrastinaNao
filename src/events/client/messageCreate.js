const Event = require("../../structures/Event")

module.exports = class extends Event {
	constructor(client) {
		super(client, {
			name: "messageCreate",
		})
	}

	run = (message) => {
		if (message.content.startsWith(".")) {
			message.reply(
				`Os comandos do bot agora estão sendo utilizados como \`Slash Commands\`, então você deve usar da seguinte forma:\n\n` +
					`\`\`\`fix\n/${message.content.slice(1)}\`\`\``
			)
		}
	}
}
