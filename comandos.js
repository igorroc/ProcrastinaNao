var url = new URL(window.location)
var comando = url.searchParams.get("comando")

let legenda = document.getElementById("legenda")
let busca = document.getElementById("inputBusca")

const comandos = document.getElementsByClassName("lista")[0].children
const filtros = document.getElementById("filtro").children

document.getElementById("qtd-comandos").innerText = comandos.length

if (comando) {
	let selecionado = document.getElementById(comando)
	selecionado.setAttribute(
		"style",
		`--custom-top: ${legenda.offsetHeight + 10}px;`
	)
	selecionado.scrollIntoView()

	selecionado.classList.add("comando-ativo")
	selecionado.addEventListener("mouseleave", removeClass)
}

busca.addEventListener("input", () => {
	for (const comando of comandos) {
		if (!comando.classList.contains("sumir")) {
			if (comando.id.toString().search(busca.value) == -1) {
				comando.classList.add("sumir")
			}
		}
	}
})

function removeClass(evt) {
	let selecionado = evt.target
	selecionado.classList.remove("comando-ativo")
	selecionado.removeEventListener("mouseleave", removeClass)
}

function filtrar(categoria) {
	if (categoria == "todos") {
		for (const filtro of filtros) {
			filtro.classList.remove("active-bg")
		}
		filtros[1].classList.add("active-bg")
		for (const comando of comandos) {
			comando.classList.remove("sumir")
		}
		busca.value = ""
	} else {
		filtros[1].classList.remove("active-bg")
		for (const filtro of filtros) {
			if (filtro.innerText.toLowerCase() == categoria) {
				filtro.classList.toggle("active-bg")
				break
			}
		}
		for (const comando of comandos) {
			if (!comando.classList.contains("sumir")) {
				if (comando.getAttribute("categoria") != categoria) {
					comando.classList.toggle("sumir")
				}
			}
		}
	}
}
