const Discord = require("discord.js")
const cargos = require("../cargos.json")
const config = require("../config.json")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('config.json')
const configDB = low(adapter)

const left = '◀️'
const right = '▶'
const x = '❌'
const on = '<:on:723708056763891753>'
const off = '<:off:723707654245187665>'


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Config`)
    
    const loading = message.guild.emojis.get("722456385098481735");
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para "${message.author.username}"`)
        return
    }
    
    if(args[0] == "comandos"){
        console.log(bot.commands)
        return
    }else if(args[0] == "cargos"){

        if(args[1]){
            
            let exemplo = args.slice(1).join(' ').toString().toLowerCase()

            let achou = cargos.find(c => c.name === exemplo || c.aliases.find(v => v === exemplo))
        
            if(achou){
                let embed = new Discord.RichEmbed()
                .setAuthor(`Anti-Procrastinador`, message.guild.iconURL)
                .setTitle('Achei isso:')
                .addField('**Nome:**', achou.name)
                .addField('**ID:**', achou.id)
                .addField('**Tipo:**', achou.type)
                .addField('**Variações:**', achou.aliases)
        
                message.channel.send(embed)
            }else{
                message.channel.send(`Não achei \`${exemplo}\``)
            }

        }else{
            let i = 0

            let embed = new Discord.RichEmbed()
                .setAuthor(`Anti-Procrastinador Help`, message.guild.iconURL)
                .addField('**Nome:**', cargos[i].name || "Sem nome")
                .addField('**ID:**', cargos[i].id || "Sem ID")
                .addField('**Tipo:**', cargos[i].type || "Sem tipo")
                .addField('**Variações:**', cargos[i].aliases || "Sem variação")
                .setFooter(`Anti-Procrastinador | Cargo ${i+1} de ${cargos.length}`, bot.user.displayAvatarURL)

            let mCargos = await message.channel.send(embed)
            
            await mCargos.react(left).then(async r => {
                await mCargos.react(x).then(async r => {
                    await mCargos.react(right).then(async r => {
                        await mCargos.react(loading).then( r => r.remove())
                    })
                })
            })
            
            const collector = await mCargos.createReactionCollector((reaction, user1) => 
                user1.id === message.author.id &&
                reaction.emoji.name === left ||
                reaction.emoji.name === right ||
                reaction.emoji.name === x
            ).on("collect", reaction => {
                const chosen = reaction.emoji.name;
                if(chosen === left){
                    if(i > 0) i--

                    embed.fields.splice(0, 4)
                    embed
                        .addField('**Nome:**', cargos[i].name || "Sem nome")
                        .addField('**ID:**', cargos[i].id || "Sem ID")
                        .addField('**Tipo:**', cargos[i].type || "Sem tipo")
                        .addField('**Variações:**', cargos[i].aliases || "Sem variação")
                        .setFooter(`Anti-Procrastinador | Cargo ${i+1} de ${cargos.length}`, bot.user.displayAvatarURL)
                    
                    mCargos.edit(embed)
                    
                }else if(chosen === right){
                    if(i < cargos.length-1) i++

                    embed.fields.splice(0, 4)
                    embed
                        .addField('**Nome:**', `${cargos[i].name || "Sem nome"}`)
                        .addField('**ID:**', `${cargos[i].id || "Sem ID"}`)
                        .addField('**Tipo:**', `${cargos[i].type || "Sem tipo"}`)
                        .addField('**Variações:**', `${cargos[i].aliases || "Sem variação"}`)
                        .setFooter(`Anti-Procrastinador | Cargo ${i+1} de ${cargos.length}`, bot.user.displayAvatarURL)

                    mCargos.edit(embed) 
                    
                }else if(chosen === x){
                    collector.stop();
                    mCargos.delete().catch( () => console.log('↳ ⚠️ Erro ao deletar a mensagem'))
                    message.delete().catch( () => console.log('↳ ⚠️ Erro ao deletar a mensagem'))
                }
                mCargos.reactions.forEach(reaction => reaction.remove(message.author.id).catch( () => console.log('↳ ⚠️ Erro ao remover as reações')))
                
            });
        }
    }else if(args[0] == "on"){
        if(config.online){
            console.log('ja estou on')
            message.channel.send(`${on} Status do bot já é: \` ONLINE \``)
        }else{
            console.log('mudando para on')
            await configDB.assign("online", true).write()
            console.log(`↳ Status alterado para "online"`)
            message.channel.send(`${on} Status do bot alterado para: \` ONLINE \``)
        }
    }else if(args[0] == "off"){
        if(config.online){
            console.log('mudando para off')
            await configDB.assign("online", false).write()
            console.log(`↳ Status alterado para "offline"`)
            message.channel.send(`${off} Status do bot alterado para: \` OFFLINE \``)
        }else{
            console.log('ja estou off')
            message.channel.send(`${off} Status do bot já é: \` OFFLINE \``)
        }
    }
    
}


module.exports.config = {
    name: "config",
    description: "Configurações do servidor!",
    usage: ".config (comandos|cargos|on|off)",
    accessableby: "Moderadores",
    aliases: []
}