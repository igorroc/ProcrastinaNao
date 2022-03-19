const Event = require("../../structures/Event")

module.exports = class extends Event {
	constructor(client) {
		super(client, {
			name: "messageReactionAdd",
		})
	}

	run = (messageReaction, user) => {
		console.log(messageReaction)
		console.log(user)
	}
}
