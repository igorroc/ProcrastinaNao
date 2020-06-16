const Discord = require("discord.js")
const colours = require("../colours.json");


module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
    .setColor(colours.green_light)
    .setTitle("Informações do Servidor")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Nome do Servidor:**", `${message.guild.name}`, true)
    .addField("**Dono do Servidor:**", `${message.guild.owner}`, true)
    .addField("**Quantidade de Membros:**", `${message.guild.memberCount}`, true)
    .addField("**Quantidade de Cargos:**", `${message.guild.roles.size}`, true)
    .setFooter(`Anti-Procrastinador | Rodapé`, bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
}


module.exports.config = {
    name: "serverinfo",
    description: "Envia as informações do servidor!",
    usage: "!serverinfo",
    accessableby: "Members",
    aliases: ["si", "serverdesc"]
}