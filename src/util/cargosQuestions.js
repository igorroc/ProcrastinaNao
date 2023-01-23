module.exports = [
	{
		question: "Qual tipo de cargo você quer receber?",
		description: "Caso deseje finalizar, selecione a opção `Finalizar`",
		placeholder: "Selecione o tipo do cargo",
		customId: "tipo",
		options: [
			{
				label: "Linguagens de Programação",
				value: "linguagem",
				emoji: "💻",
			},
			{
				label: "Separadores",
				value: "separador",
				emoji: "➗",
			},
			{
				label: "Habilidades Diversas",
				value: "diversas",
				emoji: "💼",
			},
			{
				label: "Finalizar",
				value: "finalizar",
				emoji: "❌",
			},
		],
	},
	{
		question:
			"Qual linguagem de programação você deseja adicionar/remover?",
		placeholder: "Selecione a linguagem",
		customId: "linguagem",
		options: [
			{
				label: "Python",
				value: "721102448483369140",
				emoji: {
					name: "python",
					id: "696478679391272961",
				},
			},
			{
				label: "JavaScript",
				value: "721179010767388682",
				emoji: { name: "js", id: "721349573901287445" },
			},
			{
				label: "Ruby",
				value: "902233562491781170",
				emoji: { name: "ruby", id: "902233239786254357" },
			},
			{
				label: "Java",
				value: "721176368964173835",
				emoji: { name: "java", id: "722249250586492978" },
			},
			{
				label: "C | C++ | C#",
				value: "721115106871738408",
				emoji: { name: "c_", id: "721347830765322313" },
			},
			{
				label: "CSS",
				value: "721177136655892632",
				emoji: { name: "css", id: "721345484035325984" },
			},
			{
				label: "HTML",
				value: "721346290369167460",
				emoji: { name: "html", id: "721345485314588744" },
			},
		],
	},
	{
		question: "Qual separador você deseja adicionar/remover?",
		placeholder: "Selecione o separador",
		customId: "separador",
		options: [
			{
				label: "Projetos",
				value: "856261907183042600",
				emoji: "🟥",
			},
			{
				label: "Habilidades",
				value: "856259520220889118",
				emoji: "🟩",
			},
			{
				label: "Informações",
				value: "856261550994096149",
				emoji: "🟦",
			},
		],
	},
	{
		question: "Qual habilidade você deseja adicionar/remover?",
		placeholder: "Selecione a habilidade",
		customId: "diversas",
		options: [
			{
				label: "Design",
				value: "772974290860900432",
				emoji: "🎨",
			},
		],
	},
]
