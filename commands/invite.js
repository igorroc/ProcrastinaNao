const Discord = require("discord.js")
const colours = require("../colours.json")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Invite`)
    
    let link = 'https://discord.gg/RvtHp7V'
    
    let embed = new Discord.RichEmbed()
        .setColor(colours.green_light)
        .setAuthor('ProcrastinaNão', message.guild.iconURL)
        .setDescription(`Convide seus amigos para o servidor!`)
        .addField('**Link:**', link)
        .setFooter(`Anti-Procrastinador | Membros: ${message.guild.memberCount}`, bot.user.displayAvatarURL)
        
    message.channel.send(embed)
}


module.exports.config = {
    name: "invite",
    description: "Mostra o link de convite do servidor!",
    usage: ".invite",
    accessableby: "Membros",
    aliases: ["convite"]
}