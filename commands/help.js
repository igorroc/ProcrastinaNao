const Discord = require("discord.js")
const colours = require("../colours.json")
const botconfig = require('../config.json')
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Help`)

    if(args[0] == "help") args[0] = null

    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command) || bot.aliases.has(command)) {
            command = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
            
            var SHembed = new Discord.MessageEmbed()
            .setColor(colours.yellow)
            .setTitle(`Comando: ${command.config.name}`)  
            .setDescription(`\n**Descrição:** ${command.config.description || "Sem descrição"}\n**Uso:** ${command.config.usage || "Sem uso"}\n**Acessivel para:** ${command.config.accessableby || "Membros"}\n**Variações:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed)
        }else{
            message.channel.send(`Comando \`${command}\` não encontrado`)
            console.log(`↳ Comando '${command}' não encontrado`)
        }
    }

    if(!args[0]) {
        let comandosSimples = Array.from(bot.commands.filter(c => c.config.accessableby === 'Membros' )).join("`, `")
        comandosSimples = comandosSimples.split("[object Object]").toString().replace(/,,/g, '')
        
        let comandosAdmin = Array.from(bot.commands.filter(c => c.config.accessableby === 'Moderadores' )).join("`, `")
        comandosAdmin = comandosAdmin.split("[object Object]").toString().replace(/,,/g, '')
        
        let Sembed = new Discord.MessageEmbed()
        .setColor(colours.yellow)
        .setTitle(`${bot.commands.size} comandos`)
        .setDescription(`Esses são os comandos disponíveis para o Bot Anti-Procrastinador!`)
        .addField(`Simples:`, "`" + comandosSimples + "`")
        
        if(message.member.hasPermission("ADMINISTRATOR")){
            Sembed.addField("Especiais:", "`" + comandosAdmin + "`")
        }
        Sembed.addField("Para mais informações", `Digite \`${prefix}help [comando]\``)
        message.channel.send(Sembed)
    }
}


module.exports.config = {
    name: "help",
    description: "Resumo dos comandos do servidor!",
    usage: ".help",
    accessableby: "Membros",
    aliases: ["h", "commands", "comando", "comandos", "ajuda"]
}