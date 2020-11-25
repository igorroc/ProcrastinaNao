const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Lembrete`)
    
    let contador = parseInt(args[0])
    let nMarcar = args[1]
    let check = "<a:check:722456384301563966>"
    
    if(!contador) return message.channel.send('Digite um tempo válido!')

    message.channel.send(`Lembrete marcado para daqui a \` ${contador} \` minutos!`)


    const contagem = setInterval(async () => {
        if(contador > 0){
            contador--
        }else{
            console.log(`↳ Lembrete de '${message.author.username}' finalizado.`)
            if(nMarcar == "true"){
                let lembrete = args.slice(2).join(" ")
                message.channel.send(`**Lembrete:** \n${lembrete}`)
            }else{
                let lembrete = args.slice(1).join(" ")
                message.channel.send(`Olá, ${message.member}! Chegou a hora! ${check}\n`).then( msg => {
                    if(lembrete){
                        msg.edit(`Olá, ${message.member}! Chegou a hora! ${check}\n"${lembrete}"`)
                    }
                })
            }
            
            clearInterval(contagem)
        }
    }, 60000)
}


module.exports.config = {
    name: "lembrete",
    description: "Faz um lembrete para você pelo tempo determinado em minutos, com uma mensagem opcional!\nCaso você não queira ser marcado quando a contagem acabar, digite true logo após o tempo.",
    usage: ".lembrete [minutos] [true] (mensagem)",
    accessableby: "Membros",
    aliases: ["lembrar"]
}