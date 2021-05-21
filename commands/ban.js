const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Ban`)

    if(!message.member.hasPermission("BAN_MEMBERS")){
        const naoDigno = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Você não é digno de realizar esse comando!")

        message.reply(naoDigno)
        message.channel.send("https://tenor.com/view/batman-winger-wag-not-allowed-no-nope-gif-5433518")
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

    let modlog = bot.guilds.cache.get('696430420992066112').channels.cache.get('823951071235407972')

    member.ban({days: tempo, reason: razao})
            .then(() => {
                console.log(`↳ Usuário '${user.username}' banido.`)
                
                const embed = new Discord.MessageEmbed()
                    .setColor('#FF0013')
                    .setTitle(`\\🚫 Banimento de ${user.username}`)
                    .setDescription(`Usuário: ${user}\nBanido por: ${message.author}`)
                    .addFields(
                        { name: 'Tempo', value: `${tempo} dia(s)`, inline: false},
                        { name: 'Motivo:', value: razao, inline: false },
                    )
                    .setFooter('Hora do banimento:')
                    .setTimestamp()
                
                modlog.send(embed);
            }).catch(console.error())

    message.delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
}


module.exports.config = {
    name: "ban",
    description: "Bane o usuário marcado!",
    usage: ".ban [@pessoa] [razão]",
    accessableby: "Moderadores",
    aliases: ["banir"]
}