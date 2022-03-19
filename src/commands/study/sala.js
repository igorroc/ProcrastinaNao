const Command = require("../../structures/Command")

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "sala",
			description: "Cria uma sala de estudos para você e seus amigos!",
			options: [
				{
					name: "NomeDaSala",
					type: "STRING",
					description: "Nome da sua sala de estudos.",
					required: true,
				},
				{
					name: "Usuarios",
					type: "USER",
					description: "Colegas para adicionar nessa sala.",
					required: true,
				},
			],
		})
	}
	run = (interaction) => {
		let nomeSala = interaction.options
			.getString("Nome da sala")
			.replaceAll(" ", "_")
		let colegas = interaction.options.getUser("Usuarios")

		console.log(nomeSala)
		console.log(colegas)

		interaction.reply({
			content: `Criar sala`,
			ephemeral: true,
		})
	}
}
