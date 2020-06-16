const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`[LOGS] -> Usuário "${message.author.username}" usou o comando MSG`)

    let [canal] = args

    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`-> Acesso negado para "${message.author.username}"`)
    }
    
    if(!bot.channels.get(canal)){
        message.channel.send("``Canal não encontrado.``").then(m =>{
            const contagem = setInterval(() => {
                m.delete()
                clearInterval(contagem)
            }, 3000)
        })
    }else{
        let msg = args.slice(1).join(" ");
        bot.channels.get(canal).send(msg)
    }
    message.delete();
        
}


module.exports.config = {
    name: "msg",
    description: "Envia a mensagem desejada para o canal especificado!",
    usage: ".msg [id_do_canal] [mensagem]",
    accessableby: "Admin",
    noalias: "Sem variações",
    aliases: []
}