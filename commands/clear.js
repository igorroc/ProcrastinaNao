const Discord = require("discord.js");
const { default: fetch } = require("node-fetch");



module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Clear`)

    function emojiStr (id){
        return bot.emojis.cache.get(id).toString();
    }

    if(!message.member.hasPermission("MENAGE_MESSAGES")){ // se nao tem permissao para apagar
        const naoDigno = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Você não é digno de realizar esse comando!")

        message.reply(naoDigno)
        message.channel.send("https://tenor.com/view/batman-winger-wag-not-allowed-no-nope-gif-5433518")
        console.log(`↳ Acesso negado para '${message.author.username}'`)
    }
    else{
        let valor = parseInt(args[0], 10);
        if(!valor || valor < 1 || valor > 99)
            return message.channel.send("Mande um valor de 1 até 99 para eu deletar")
        
        const fetched = await message.channel.messages.fetch({limit: valor + 1});
        let apagadas = await message.channel.bulkDelete(fetched)
        .catch(e => {
            console.log(`⚠️ Erro ao apagar mensagens: ${e}`)
            message.channel.send('⚠️ Erro ao apagar as mensagens.')
        })
    }
}


module.exports.config = {
    name: "clear",
    description: "Apaga as ultimas mensagens do servidor!",
    usage: ".clear [quantidade]",
    accessableby: "Moderadores",
    aliases: ["c"]
}