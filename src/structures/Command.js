class Command {
	constructor(client, options) {
		this.client = client
		this.name = options.name
		this.aliases = options.aliases
		this.usage = options.usage
		this.description = options.description
		this.options = options.options
	}
}

module.exports = Command
