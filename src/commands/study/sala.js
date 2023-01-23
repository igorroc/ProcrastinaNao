const Command = require("../../structures/Command")

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "sala",
			description: "Cria uma sala de estudos para você e seus amigos!",
			options: [
				{
					name: "nome_da_sala",
					type: "STRING",
					description: "Nome da sua sala de estudos.",
					required: true,
				},
				{
					name: "usuários",
					type: "USER",
					description: "Colegas para adicionar nessa sala.",
					required: true,
				},
			],
		})
	}
	run = (interaction) => {
		console.log(`\n■▶ [LOGS] ⇥ Usuário '${interaction.user.username}' usou o comando Sala`)

		let nomeSala = interaction.options.getString("nome_da_sala")
		let colegas = interaction.options.getUser("usuários")

		console.log(nomeSala)
		console.log(colegas)

		interaction.reply({
			content: `Criar sala`,
			ephemeral: true,
		})
	}
}
