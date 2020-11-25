const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando MSG`)

    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para '${message.author.username}'`)
    }
    
    let [canal] = args
    if(!canal){
        return message.channel.send("Faltam argumentos.").then(m =>{
            m.delete( {timeout: 3000} )
        })
    }
    if(canal.length > 18){
        canal = canal.slice(2, 20)
    }

    if(!bot.channels.cache.get(canal)){
        message.channel.send("Canal não encontrado.").then(m =>{
            m.delete( {timeout: 3000} )
        })
        console.log(`↳ Canal '${canal}' não encontrado.`)
    }else{
        let msg = args.slice(1).join(" ");
        if(!msg){
            return message.channel.send("Envie uma mensagem")
        }
        bot.channels.cache.get(canal).send(msg)
    }
    message.delete();
        
}


module.exports.config = {
    name: "msg",
    description: "Envia a mensagem desejada para o canal especificado!",
    usage: ".msg [id_do_canal] [mensagem]",
    accessableby: "Moderadores",
    aliases: ["say", "mensagem"]
}