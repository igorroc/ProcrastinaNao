const Discord = require("discord.js");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Uptime`)
    
    let up = ms(bot.uptime, {long: true})
    up = up.replace("seconds", "segundos")
    up = up.replace("minutes", "minutos")
    up = up.replace("hours", "horas")


    const m = await message.channel.send(`Estou trabalhando há ${up} sem acidentes nesse servidor!`);
    console.log(`↳ Uptime: ${up}`)

}


module.exports.config = {
    name: "uptime",
    description: "Informa o tempo que eu estou online!",
    usage: ".uptime",
    accessableby: "Membros",
    aliases: ["up"]
}