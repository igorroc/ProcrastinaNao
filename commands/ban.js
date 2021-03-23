const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Ban`)

    if(!message.member.hasPermission("BAN_MEMBERS")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para '${message.author.username}'`)
    }
    
    let user = message.mentions.users.first()
    if(!user){
        message.channel.send(`Ocorreu um erro ao encontrar o usuário mencionado.`)
        console.log(`↳ Usuário "${args[0]}" não encontrado, operação cancelada.`)
        return
    }

    let razao = args.slice(1).join(" ")
    if(!razao){
        return message.channel.send("Indique uma razão para o banimento do usuário.")
    }


    const embed = new Discord.MessageEmbed()
        .setColor('#FF0013')
        .setTitle(`Banimento de ${user.username}`)
        .setDescription(`Usuário: ${user}\nBanido por: ${message.author}`)
        .addFields(
            { name: 'Motivo:', value: razao, inline: false },
        )
        .setFooter('Hora do banimento:')
        .setTimestamp()
    
    message.channel.send(embed);

    // user.kick({reason: razao})
}


module.exports.config = {
    name: "banir",
    description: "Bane o usuário marcado!",
    usage: ".banir [@pessoa] [razão]",
    accessableby: "Moderadores",
    aliases: ["ban"]
}