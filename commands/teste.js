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

    let exemplo = args.join(' ').toString().toLowerCase()

    console.log(exemplo)
    console.log("-------")
    let achou = cargos.find(c => c.name === exemplo || c.aliases.find(v => v === exemplo))
    console.log(achou)

    if(achou){
        let embed = new Discord.RichEmbed()
        .setTitle('Achei isso:')
        .addField('**Nome:**', achou.name)
        .addField('**ID:**', achou.id)
        .addField('**Tipo:**', achou.type)
        .addField('**Variações:**', achou.aliases)

        message.channel.send(embed)
    }else{
        message.channel.send(`Não achei \`${exemplo}\``)
    }
    
}


module.exports.config = {
    name: "teste",
    description: "Só teste mesmo!",
    usage: ".teste",
    accessableby: "Moderadores",
    aliases: ["t"]
}