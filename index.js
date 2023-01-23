require("dotenv").config()

const Client = require("./src/structures/Client")

const client = new Client({
	partials: ["CHANNEL"],
	intents: [
		"GUILDS",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"GUILD_INVITES",
		"GUILD_VOICE_STATES",
		"GUILD_MEMBERS",
		"GUILD_PRESENCES",
		"GUILD_EMOJIS_AND_STICKERS",
		"GUILD_SCHEDULED_EVENTS",
		"DIRECT_MESSAGES",
		"DIRECT_MESSAGE_REACTIONS",
	],
})

client.login(process.env.BOT_TOKEN)
