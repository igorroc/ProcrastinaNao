const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Lembrete`)
    
    let contador = parseInt(args[0])
    let lembrete = args.slice(1).join(" ")
    let check = "<a:check:722456384301563966>"
    
    if(!contador) return message.channel.send('Digite um tempo válido!')

    message.channel.send(`Lembrete marcado para daqui a ${contador}min`)

    const contagem = setInterval(async () => {
        if(contador > 0){
            contador--
        }else{
            console.log(`↳ Contagem de ${message.author.username} finalizada.`)
            let msg = message.channel.send(`Olá, ${message.member}! Chegou a hora! ${check}\n`)
            if(lembrete){
                msg.edit(`Olá, ${message.member}! Chegou a hora! ${check}\n\`${lembrete}\``)
            }
            clearInterval(contagem)
        }
    }, 1000)
}


module.exports.config = {
    name: "lembrete",
    description: "Faz um lembrete para você pelo tempo determinado em minutos, com uma mensagem opcional!",
    usage: ".lembrete [minutos] (mensagem)",
    accessableby: "Membros",
    aliases: ["lembrar"]
}