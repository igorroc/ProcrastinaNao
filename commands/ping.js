const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Ping`)
    
    let loading = "<a:loading:722456385098481735>"
    let check = "<a:check:722456384301563966>"
    
    const m = await message.channel.send(`${loading} Ping?`);
    m.edit(`${check} Pong! A latencia é de ${m.createdTimestamp - message.createdTimestamp}ms. A latencia da API é ${Math.round(bot.ping)}ms`);
    console.log(`↳ Ping! Pong! Latencia: ${m.createdTimestamp - message.createdTimestamp}ms , API: ${Math.round(bot.ping)}ms`)

}


module.exports.config = {
    name: "ping",
    description: "Informa a latência atual da conexão bot-servidor!",
    usage: ".ping",
    accessableby: "Membros",
    aliases: ["latencia", "ms"]
}