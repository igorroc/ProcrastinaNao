module.exports = [
	{
		question: "Qual o seu nome completo?",
		description:
			"Seu nome no servidor será alterado para o que você digitar!",
		name: "Nome",
	},
	{
		question: "Qual curso você faz/ensina?",
		description: "Caso não faça nenhum, digite `N`",
		name: "Curso",
	},
	{
		question: "Em qual faculdade?",
		description: "Caso não esteja em uma faculdade, digite `N`",
		name: "Faculdade",
	},
	{
		question: "Você é estudante ou professor?",
		placeholder: "Selecione o cargo",
		customId: "Nível",
		options: [
			{
				label: "Estudante",
				value: "Estudante",
				emoji: "🧑‍🎓",
			},
			{
				label: "Professor",
				value: "Professor",
				emoji: "🧑‍🏫",
			},
		],
	},
]
