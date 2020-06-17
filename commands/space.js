const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Space`)
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para "${message.author.username}."`)
    }

    let novoNome = message.channel.name.toString()

    console.log(novoNome)
    novoNome.replace(/-/gi, "\u2009")
    console.log(novoNome)
    message.delete()
}


module.exports.config = {
    name: "space",
    description: "Arruma o nome do canal para poder colocar espaços vazios!",
    usage: ".space",
    accessableby: "Moderadores",
    aliases: ["s"]
}