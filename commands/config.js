const Discord = require("discord.js")
const colours = require("../colours.json")

const fs = require('fs')

const left = '◀️'
const right = '▶'
const x = '❌'
const on = '<:on:723708056763891753>'
const off = '<:off:723707654245187665>'


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Config`)
    
    const loading = message.guild.emojis.cache.get("722456385098481735");
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para '${message.author.username}'`)
        return
    }

    delete require.cache[require.resolve("../cargos.json")]
    let cargos = require("../cargos.json")
    
    delete require.cache[require.resolve("../config.json")]
    let config = require("../config.json")
    
    let opcao1 = args.shift()

    if(opcao1 == "comandos"){
        console.log(bot.commands)
        return
    }else if(opcao1 == "cargos"){
        let opcao2 = args.shift()

        if(opcao2 == "add"){
            let nome = args.shift().toLowerCase().replace(/_/gi, ' ')
            let tipo = args.shift().toLowerCase().replace(/_/gi, ' ')
            let id = args.shift().toLowerCase()
            let variacoes = args
            for(let i in variacoes){
                variacoes[i] = variacoes[i].toLowerCase().replace(/_/gi, ' ')
            }

            if(nome && tipo && id){
                let cargo = {"name": nome, "type": tipo, "id": id, "aliases": variacoes}
            
                try {
                    fs.readFile("./cargos.json", 'utf8', function readFileCallback(err, data){
                        if (err){
                            console.log(err);
                        } else {
                            obj = JSON.parse(data) //now it an object
                            obj.push(cargo) //add some data
                            json = JSON.stringify(obj) //convert it back to json
                            fs.writeFile("./cargos.json", json, 'utf8', function(err){if(err) throw err;}) // write it back 
                        }
                    });
                    message.channel.send(`\\✅ Cargo \`${nome}\` adicionado com sucesso!`)
                    console.log(`↳ Cargo '${nome}' adicionado com sucesso.`)
                    message.guild.channels.cache.get('722274694535053317').send(`\\▶ [LOGS] ⇥ Cargo \`${nome}\` adicionado com sucesso.`)
                } catch (error) {
                    console.log(error)
                    message.channel.send(`\\❌ Ocorreu um erro ao adicionar o cargo novo.`)
                    console.log(`↳ Ocorreu um erro ao adicionar o cargo novo.`)
                    message.guild.channels.cache.get('722274694535053317').send(`\\▶ [LOGS] ⇥ Ocorreu um erro ao adicionar o cargo \`${nome}\`.`)
                }
                
            }

        }else if (opcao2 == "remove"){
            let id = args.shift()
            fs.readFile("./cargos.json", 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    let achou = false
                    let cargo = null
                    obj = JSON.parse(data) //now it an object
                    obj.find(function(item, i){
                        if(item.id == id || item.name == id){
                            obj.splice(i, 1) // This will remove the object that first name equals to Test1
                            achou = true
                            cargo = item.name
                            return
                        }
                    })
                    json = JSON.stringify(obj) //convert it back to json
                    fs.writeFile("./cargos.json", json, 'utf8', function(err){if(err) throw err;}) // write it back 
                    if(achou){
                        console.log(`↳ Cargo '${cargo}' removido`)
                        message.channel.send(`Cargo \`${cargo}\` removido com sucesso!`)
                        message.guild.channels.cache.get('722274694535053317').send(`\\▶ [LOGS] ⇥ Cargo \`${cargo}\` removido.`)
                    }else{
                        console.log(`↳ Cargo '${id}' não encontrado`)
                        message.channel.send(`Cargo \`${id}\` não encontrado!`)
                    }
                    
                }
            });
        }else if (opcao2 == "edit"){
            let id = args.shift()
            let itemParaSerMudado = args.shift()
            let valor = (itemParaSerMudado=="aliases") ? args : args.toString()
            fs.readFile("./cargos.json", 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    let achouCargo = false
                    let achouItem = false
                    let cargo = null
                    obj = JSON.parse(data) //now it an object
                    obj.find(function(item, i){
                        if(item.id == id || item.name == id){
                            achouCargo = true
                            cargo = item.name
                            if(item[itemParaSerMudado]){
                                achouItem = true
                                item[itemParaSerMudado] = valor
                            }
                            return
                        }
                    })
                    json = JSON.stringify(obj) //convert it back to json
                    if(achouItem){
                        fs.writeFile("./cargos.json", json, 'utf8', function(err){if(err) throw err;}) // write it back 
                    
                        console.log(`↳ Cargo '${cargo}', item '${itemParaSerMudado}' alterado para '${valor}'`)
                        message.channel.send(`Cargo \`${cargo}\` alterado com sucesso!`)
                        message.guild.channels.cache.get('722274694535053317').send(`\\▶ [LOGS] ⇥ Cargo \`${cargo}\`, item \`${itemParaSerMudado}\` alterado para \`${valor}\``)
                    }else if(achouCargo){
                        console.log(`↳ Chave '${itemParaSerMudado}' não encontrada`)
                        message.channel.send(`Chave \`${itemParaSerMudado}\` não encontrada!`)
                    }else{
                        console.log(`↳ Cargo '${id}' não encontrado`)
                        message.channel.send(`Cargo \`${id}\` não encontrado!`)
                    }
                    
                }
            });
        }else if(opcao2){
            
            let exemplo = opcao2.toString().toLowerCase()
            
            let achou = cargos.find(c => c.name === exemplo || c.aliases.find(v => v === exemplo))
        
            if(achou){
                let embed = new Discord.MessageEmbed()
                .setColor(colours.cyan)
                .setTitle('Achei isso:')
                .addField('**Nome:**', achou.name)
                .addField('**ID:**', achou.id)
                .addField('**Tipo:**', achou.type)
                .addField('**Variações:**', achou.aliases)
        
                message.channel.send(embed)
            }else{
                message.channel.send(`Não achei o cargo: \`${exemplo}\``)
            }

        }else{
            let i = 0

            let embed = new Discord.MessageEmbed()
                .setTitle('Cargos:')
                .setColor(colours.cyan)
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
            ).on("collect", async reaction => {
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
                const userReactions = mCargos.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                try{
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                }catch (error) {
                    console.log('↳ ⚠️ Erro ao remover as reações');
                }
            });
        }
    }else if(opcao1 == "emojis"){
        return message.channel.send("Funcionalidade em manutenção")
    }else if(opcao1 == "on" || opcao1 == "off"){
        if(config.status == opcao1){
            message.channel.send(`O bot ja está \`${opcao1}\``)
        }else{
            fs.readFile("./config.json", 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    obj = JSON.parse(data) //now it an object
                    obj.status = opcao1
                    json = JSON.stringify(obj) //convert it back to json
                    fs.writeFile("./config.json", json, 'utf8', function(err){if(err) throw err;}) // write it back 
                }
            });
            if(opcao1 == "on"){
                message.channel.send(`${on} Bot configurado para \`ONLINE\`!`)
                message.guild.channels.cache.get('722274694535053317').send(`\\▶ [LOGS] ⇥ ${on} STATUS: \`ONLINE\``)
                await bot.user.setActivity(`| .help para ajuda | Criado por Igor Rocha |`, {type: 'PLAYING'})
                await bot.user.setStatus('online')
            }else{
                message.channel.send(`${off} Bot configurado para \`OFFLINE\`!`)
                message.guild.channels.cache.get('722274694535053317').send(`\\▶ [LOGS] ⇥ ${off} STATUS: \`OFFLINE\``)
                await bot.user.setActivity(`| Estão fazendo alterações em mim! |`, {type: 'PLAYING'})
                await bot.user.setStatus('idle')
            }
        }
    }else{
        message.channel.send('Digite `comandos`, `cargos`, `emojis`, `on`, `off`')
    }

}


module.exports.config = {
    name: "config",
    description: "Configurações do servidor!",
    usage: ".config (comandos|cargos|on|off)",
    accessableby: "Moderadores",
    aliases: []
}