const Discord = require("discord.js")
const colours = require("../colours.json")
const botconfig = require('../config.json')
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {
    console.log(`[LOGS] -> Usuário "${message.author.username}" usou o comando Help`)

    if(args[0] == "help") return message.channel.send(`Use \`${prefix}help\` invés disso.`)

    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor(colours.yellow)
            .setAuthor(`Anti-Procrastinador HELP`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`O prefixo do bot é: \`${prefix}\`\n\n**Comando:** ${command.config.name}\n**Descrição:** ${command.config.description || "No Description"}\n**Uso:** ${command.config.usage || "No Usage"}\n**Acessivel para:** ${command.config.accessableby || "Membros"}\n**Abreviações:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed);
        }}

    if(!args[0]) {
        message.delete();
        let Sembed = new Discord.RichEmbed()
        .setColor(colours.yellow)
        .setAuthor(`Anti-Procrastinador Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`Esses são os comandos disponíveis para o Bot Anti-Procrastinador!\nO prefixo do bot é: \`${prefix}\``)
        .addField(`Comandos:`, "``serverinfo`` ``soma``")
        if(message.member.hasPermission("ADMINISTRATOR")){
            Sembed.addField("Comandos Especiais:", "``prefix`` ``msg``")
        }
        Sembed.addField("Para mais informações", `digite \`${prefix}help [comando]\``)
        .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL)
        message.channel.send(Sembed)
    }
}


module.exports.config = {
    name: "help",
    description: "Resumo dos comandos do servidor!",
    usage: ".help",
    accessableby: "Members",
    aliases: ["h", "commands", "comando", "comandos"]
}