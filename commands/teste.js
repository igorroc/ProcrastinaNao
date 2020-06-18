const Discord = require("discord.js")
const cargos = require("../cargos.json")


module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Teste`)
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para "${message.author.username}"`)
        return
    }
    
    if(args.length < 1){
        message.channel.send('Indique um curso/faculdade')
        return
    }

    let exemplo = args.join(' ').toString()

    console.log(exemplo)
    console.log("-------")
    console.log(cargos.find(c => c.name === exemplo || c.aliases.forEach(v => v === exemplo)).name)
}


module.exports.config = {
    name: "teste",
    description: "Só teste mesmo!",
    usage: ".teste",
    accessableby: "Moderadores",
    aliases: ["t"]
}