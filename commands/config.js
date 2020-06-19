const Discord = require("discord.js")
const cargos = require("../cargos.json")

const left = '◀️'
const right = '▶'
const x = '❌'

module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Teste`)
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para "${message.author.username}"`)
        return
    }
    
    if(args[0] == "comandos"){
        console.log(bot.commands)
        return
    }else if(args[1] == "cargos"){

        if(args[2]){
            
            let exemplo = args.join(' ').toString().toLowerCase()
            console.log(exemplo)

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
                .addField('**Nome:**', cargos[i].name)
                .addField('**ID:**', cargos[i].id)
                .addField('**Tipo:**', cargos[i].type)
                .addField('**Variações:**', cargos[i].aliases)
                .setFooter(`Anti-Procrastinador | Comando ${i} de ${cargos.length}`, bot)

            let mCargos = message.channel.send(embed)
            
            await mCargos.react(left).then(async r => {
                await mCargos.react(x).then(async r => {
                    await mCargos.react(right)
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
                        .addField('**Nome:**', cargos[i].name)
                        .addField('**ID:**', cargos[i].id)
                        .addField('**Tipo:**', cargos[i].type)
                        .addField('**Variações:**', cargos[i].aliases)
                        .setFooter(`Anti-Procrastinador | Comando ${i} de ${cargos.length}`, bot)
                    
                    await mCargos.edit(embed)
                    
                }else if(chosen === right){
                    if(i < cargos.length) i++

                    embed.fields.splice(0, 4)
                    embed
                        .addField('**Nome:**', cargos[i].name)
                        .addField('**ID:**', cargos[i].id)
                        .addField('**Tipo:**', cargos[i].type)
                        .addField('**Variações:**', cargos[i].aliases)
                        .setFooter(`Anti-Procrastinador | Comando ${i} de ${cargos.length}`, bot)

                    await mCargos.edit(embed) 
                    
                }else if(chosen === x){
                    collector.stop();
                    mCargos.delete().catch(console.log('↳ ⚠️ Erro ao deletar a mensagem'))
                    message.delete().catch(console.log('↳ ⚠️ Erro ao deletar a mensagem'))
                }
                mCargos.reactions.forEach(reaction => reaction.remove(message.author.id).catch(console.log('↳ ⚠️ Erro ao remover as reações')))
                
            });
        }
    }
    
}


module.exports.config = {
    name: "config",
    description: "Configurações do servidor!",
    usage: ".config (comandos|cargos)",
    accessableby: "Moderadores",
    aliases: []
}