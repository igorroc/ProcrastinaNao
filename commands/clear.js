const Discord = require("discord.js")



module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Clear`)

    function emojiStr (id){
        return bot.emojis.get(id).toString();
    }

    if(!message.member.hasPermission("ADMINISTRATOR")){ // se nao tem permissao para apagar
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para "${message.author.username}"`)
    }
    else{
        let confirmacao = await message.channel.send(`${emojiStr("722456385098481735")} Apagando mensagens...`)
        const user = message.mentions.users.first();
        // Parse Amount
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.reply('Você deve indicar uma quantidade!');
        if (!amount && !user) return message.reply('Você deve indicar um usuario e/ou uma quantidade!');
        // Fetch 100 messages (will be filtered and lowered up to max amount requested)
        message.channel.fetchMessages({
            limit: 100,
            }).then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : bot.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                }
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                console.log(`↳ ${amount} mensagens apagadas`)
            });
        await confirmacao.delete()
        await message.delete()
    }
}


module.exports.config = {
    name: "clear",
    description: "Apaga as ultimas mensagens do servidor!",
    usage: ".clear [quantidade] (usuario)",
    accessableby: "Moderadores",
    aliases: ["c"]
}