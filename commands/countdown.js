const Discord = require("discord.js")
const colours = require("../colours.json")


module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Countdown`)
    
    let contador = parseInt(args)
    let loading = "<a:loading:722456385098481735>"
    let check = "<a:check:722456384301563966>"
    
    message.channel.send(`${loading} **Contagem iniciada**\n${contador}`).then(async (msg) => {
        const contagem = setInterval(async () => {
            if(contador > 0){
                msg.edit(`${loading} **Contagem iniciada**\n${contador}`)
                contador--
            }else{
                console.log('↳ Contagem finalizada.')
                msg.edit(`${check} **Contagem finalizada!**`)
                clearInterval(contagem)
            }
        }, 1000)
    })
    
}


module.exports.config = {
    name: "countdown",
    description: "Inicia uma contagem regressiva com o tempo indicado!",
    usage: ".countdown [tempo]",
    accessableby: "Membros",
    aliases: ["cd"]
}