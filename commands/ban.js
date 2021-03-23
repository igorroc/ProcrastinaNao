const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Ban`)

    if(!message.member.hasPermission("BAN_MEMBERS")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para '${message.author.username}'`)
        return
    }
    
    let user = message.mentions.users.first()
    let member = message.mentions.members.first()
    if(!user){
        message.channel.send(`Ocorreu um erro ao encontrar o usuário mencionado.`)
        console.log(`↳ Usuário "${args[0]}" não encontrado, operação cancelada.`)
        return
    }
    if(!member.bannable){
        message.channel.send(`Esse usuário não pode ser banido.`)
        console.log(`↳ Usuário "${args[0]}" não pode ser banido, operação cancelada.`)
        return
    }

    let tempo = parseInt(args.slice(1,2))
    let razao = args.slice(2).join(" ")
    if(!tempo || !Number.isInteger(tempo)){
        return message.channel.send("Indique um período valido para o banimento do usuário.")
    }

    if(!razao){
        return message.channel.send("Indique uma razão para o banimento do usuário.")
    }


    const embed = new Discord.MessageEmbed()
        .setColor('#FF0013')
        .setTitle(`Banimento de ${user.username}`)
        .setDescription(`Usuário: ${user}\nBanido por: ${message.author}`)
        .addFields(
            { name: 'Tempo', value: `${tempo} dia(s)`, inline: false},
            { name: 'Motivo:', value: razao, inline: false },
        )
        .setFooter('Hora do banimento:')
        .setTimestamp()
    
    message.channel.send(embed);

    member.ban({days: tempo, reason: razao})
            .then(console.log("banido"))
            .catch(console.error("desbanido"));

    message.delete().catch(console.log('⚠️ Erro ao deletar a mensagem'))
}


module.exports.config = {
    name: "ban",
    description: "Bane o usuário marcado!",
    usage: ".ban [@pessoa] [razão]",
    accessableby: "Moderadores",
    aliases: ["banir"]
}