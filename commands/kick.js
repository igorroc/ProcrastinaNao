const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Expulsar`)

    if(!message.member.hasPermission("KICK_MEMBERS")){
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
        return message.channel.send("Indique uma razão para a remoção do usuário.")
    }


    const embed = new Discord.MessageEmbed()
        .setColor('#E3863F')
        .setTitle(`Expulsão de ${user.username}`)
        .setDescription(`Usuário: ${user}\nExpulso por: ${message.author}`)
        .addFields(
            { name: 'Motivo:', value: razao, inline: false },
        )
        .setFooter('Hora da expulsão:')
        .setTimestamp()
    
    message.channel.send(embed);

    // user.kick({reason: razao})
}


module.exports.config = {
    name: "expulsar",
    description: "Expulsa o usuário marcado!",
    usage: ".expulsar [@pessoa] [razão]",
    accessableby: "Moderadores",
    aliases: ["kick"]
}