const Discord = require("discord.js")
const fetch = require("node-fetch")
const colours = require("../colours.json")
const config = require("../config.json")

const left = '◀️'
const right = '▶'
const x = '❌'

module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Git`)
    
    let user = args.toString()
    
    fetch(`https://api.github.com/users/${user}`)
        .then(res => res.json())
        .then(async json => {
            if(!json.name && !json.company && !json.location && !json.email && !json.hireable && !json.bio){
                message.channel.send(`Usuário não encontrado`)
                console.log(`↳ Usuário '${user}' não encontrado`)
                return
            }
            let embed = new Discord.RichEmbed()
                .setColor(colours.orange)
                .setTitle(`<:github:722277332206747691> GitHub de ${json.login}`)
                .setURL(json.html_url)
                .setThumbnail(json.avatar_url)
                .setDescription('Navegue pelas páginas utilizando as setas abaixo')
                .addField('**Nome:**', json.name, true)
                .addField('**Id:**', json.id, true)
                .addField('**Bio:**', json.bio || 'Sem bio')
                .addField('**Repositórios:**', json.public_repos || 0, true)
                .addField('**Seguidores:**', json.followers, true)
                .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL, true)
                
            let msg = await message.channel.send(embed)
            await msg.react(left).then(async r => {
                await msg.react(x).then(async r => {
                    await msg.react(right)
                })
            })
            console.log(`↳ Perfil de '${user}' enviado`)

            const collector = await msg.createReactionCollector((reaction, user1) => 
                user1.id === message.author.id &&
                reaction.emoji.name === left ||
                reaction.emoji.name === right ||
                reaction.emoji.name === x
            ).on("collect", reaction => {
                const chosen = reaction.emoji.name;
                if(chosen === right){
                    let novoEmbed = new Discord.RichEmbed()
                        .setColor(colours.orange)
                        .setTitle(`<:github:722277332206747691> Repositórios de ${json.login}`)
                        .setURL(json.html_url)
                        .setThumbnail(json.avatar_url)
                        .setDescription('Navegue pelas páginas utilizando as setas abaixo')
                        .addField('**TESTE:**', json.name, true)
                        .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL, true)
                        
                    msg.edit(new Discord.RichEmbed(novoEmbed));

                }else if(chosen === left){
                    msg.edit(new Discord.RichEmbed(embed));
                    
                }else if(chosen === x){
                    collector.stop();
                    msg.delete().catch(console.log('↳ ⚠️ Error'))
                    message.delete().catch(console.log('↳ ⚠️ Error'))
                
                }
                msg.reactions.forEach(reaction => reaction.remove(message.author.id))
                
            });

        })
}


module.exports.config = {
    name: "git",
    description: "teste",
    usage: ".teste",
    accessableby: "Membros",
    aliases: [""]
}