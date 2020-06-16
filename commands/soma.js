const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Soma`)

    let i
    let soma = 0

    for(i = 0; i < args.length; i++){
        soma += parseInt(args[i])
    }
    
    message.channel.send(`\`\`\`md\n# Soma = ${soma}\n\`\`\``)
}


module.exports.config = {
    name: "soma",
    description: "Faz um cálculo simples de soma ou subtração!",
    usage: ".soma 3 4 | .soma 5 -2",
    accessableby: "Membros",
    aliases: ["s"]
}