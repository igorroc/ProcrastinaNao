const Discord = require("discord.js")
const colours = require("../colours.json");


module.exports.run = async (bot, message, args) => {
    console.log(`[LOGS] -> Usuário "${message.author.username}" usou o comando ServerInfo`)

    let sEmbed = new Discord.RichEmbed()
    .setColor(colours.yellow)
    .setTitle("Informações do Servidor")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Nome do Servidor:**", `${message.guild.name}`, true)
    .addField("**Dono do Servidor:**", `${message.guild.owner}`, true)
    .addField("**Quantidade de Membros:**", `${message.guild.memberCount}`)
    .addField("**Quantidade de Cargos:**", `${message.guild.roles.size}`, true)
    .setFooter(`| Anti-Procrastinador |`, bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
}


module.exports.config = {
    name: "serverinfo",
    description: "Envia as informações do servidor!",
    usage: ".serverinfo",
    accessableby: "Membros",
    aliases: ["si", "serverdesc"]
}