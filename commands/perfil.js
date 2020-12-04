const Discord = require("discord.js")
const config = require("../config.json")

const fs = require('fs')

const left = '◀️'
const right = '▶'
const x = '❌'
const agree = "✅"
const loading = "<a:loading:722456385098481735>"

module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Perfil`)

    const emojiLoading = message.guild.emojis.cache.get("722456385098481735")
    
    delete require.cache[require.resolve("../perfis.json")]
    let perfis = require("../perfis.json")

    if (args[0]){
        if (args[0] == "all"){
            let total = perfis.length
            let indice = 0
            let perfil = perfis[indice]
            let cEmbed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setTitle(`Perfis do Servidor`)
                .addField(`Nome:`, perfil.nome, false)
                .addField(`Matrícula:`, `_${perfil.matricula}_`, true)
                .addField(`Ano de Egresso:`, `_${perfil.anoEgresso}_`, true)
                .addField(`Email:`, `[${perfil.email}](https://${perfil.email})`, false)
                .setFooter(`${indice+1}/${total}`, bot.user.displayAvatarURL())
            
            try {
                cEmbed.setThumbnail(perfil.foto)
            } catch (error) {
                console.log(error)
            }

            let msg = await message.channel.send(cEmbed)
            await msg.react(left).then(async r => {
                await msg.react(x).then(async r => {
                    await msg.react(right).then(async r => {
                        await msg.react(emojiLoading).then( r => r.remove())
                    })
                })
            })

            const collector = await msg.createReactionCollector((reaction, user1) => 
                user1.id === message.author.id &&
                reaction.emoji.name === left ||
                reaction.emoji.name === right ||
                reaction.emoji.name === x
            ).on("collect", async reaction => {
                const chosen = reaction.emoji.name;
                if(chosen === right){
                    if(indice < total-1){
                        indice++
                    }
                    perfil = perfis[indice]
                    try{
                        cEmbed = new Discord.MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(`Perfis do Servidor`)
                        .setThumbnail(perfil.foto)
                        .addField(`Nome:`, perfil.nome, false)
                        .addField(`Matrícula:`, `_${perfil.matricula}_`, true)
                        .addField(`Ano de Egresso:`, `_${perfil.anoEgresso}_`, true)
                        .addField(`Email:`, `[${perfil.email}](https://${perfil.email})`, false)
                        .setFooter(`${indice+1}/${total}`, bot.user.displayAvatarURL())
                    
                    }catch(e){
                        console.log(e)
                    }
                    
                    msg.edit(new Discord.MessageEmbed(cEmbed))
                }else if(chosen === left){
                    if(indice > 0){
                        indice--
                    }
                    perfil = perfis[indice]
                    cEmbed = new Discord.MessageEmbed()
                        .setColor("#00ff00")
                        .setTitle(`Perfis do Servidor`)
                        .setThumbnail(perfil.foto)
                        .addField(`Nome:`, perfil.nome, false)
                        .addField(`Matrícula:`, `_${perfil.matricula}_`, true)
                        .addField(`Ano de Egresso:`, `_${perfil.anoEgresso}_`, true)
                        .addField(`Email:`, `[${perfil.email}](https://${perfil.email})`, false)
                        .setFooter(`${indice+1}/${total}`, bot.user.displayAvatarURL())
                    
                    msg.edit(new Discord.MessageEmbed(cEmbed))
                }else if(chosen === x){
                    collector.stop();
                    msg.reactions.removeAll().catch( () => console.log('↳ ⚠️ Erro ao deletar a mensagem'))
                    msg.delete().catch( () => console.log('↳ ⚠️ Erro ao deletar o embed'))
                    message.delete().catch( () => console.log('↳ ⚠️ Erro ao deletar a mensagem'))
                
                }
                const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                try{
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                }catch (error) {
                    console.log('↳ ⚠️ Erro ao remover as reações');
                }
            });
            message.delete()
        }else if (args[0] == "remover"){
            let user = message.author
            let perfil = perfis.find(c => c.id == user.id)
            if (perfil){
                fs.readFile("./perfis.json", 'utf8', function readFileCallback(err, data){
                    if (err){
                        console.log(err);
                    } else {
                        obj = JSON.parse(data) //now it an object
                        obj.find(function(item, i){
                            if(item.id == user.id){
                                obj.splice(i, 1) // This will remove the object that first name equals to Test1
                                return
                            }
                        })
                        json = JSON.stringify(obj) //convert it back to json
                        fs.writeFile("./perfis.json", json, 'utf8', function(err){if(err) throw err;}) // write it back 
                        console.log(`↳ Perfil de '${user.username}' removido`)
                        message.channel.send(`Seu perfil foi removido com sucesso!`)
                        message.guild.channels.cache.get('722274694535053317').send(`\\▶ [LOGS] ⇥ Perfil de \` ${user.username} \` removido.`)
                    }
                });
            }
        }else{
            let user = message.mentions.users.first()
            let perfil = null
            if (!user){
                user = args[0]
                perfil = perfis.find(c => c.id == user)
            }else{
                perfil = perfis.find(c => c.id == user.id)
            }
            if (perfil) {
                let cEmbed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setTitle(`Perfil de ${message.mentions.members.first().nickname}`)
                .addField(`Nome:`, perfil.nome, false)
                .addField(`Matrícula:`, `_${perfil.matricula}_`, true)
                .addField(`Ano de Egresso:`, `_${perfil.anoEgresso}_`, true)
                .addField(`Email:`, `[${perfil.email}](https://${perfil.email})`, false)
                try {
                    cEmbed.setThumbnail(perfil.foto)
                } catch (error) {
                    console.log(error)
                }
                let envio = await message.channel.send(cEmbed)
                message.delete()
            }else{
                message.channel.send(`Perfil de \`${user.username}\` ainda não foi criado.`)
            }
        }
    } else{
        let user = message.author
        let perfil = perfis.find(c => c.id == user.id)
        if (perfil){
            let cEmbed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setTitle(`Perfil de ${user.username}`)
            .addField(`Nome:`, perfil.nome, false)
            .addField(`Matrícula:`, `_${perfil.matricula}_`, true)
            .addField(`Ano de Egresso:`, `_${perfil.anoEgresso}_`, true)
            .addField(`Email:`, `[${perfil.email}](https://${perfil.email})`, false)
            try {
                cEmbed.setThumbnail(perfil.foto)
            } catch (error) {
                console.log(error)
            }

            let envio = await message.channel.send(cEmbed)
            message.delete()
        } else{
            console.log(`↳ '${message.author.username}' começou a fazer o perfil.`)
            message.guild.channels.cache.get('722274694535053317').send(`\\▶ [LOGS] ⇥ \` ${message.author.username} \` começou a fazer o perfil.`)
            let cEmbed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(`Perfil de ${message.author.username}`)
                .setThumbnail(message.author.avatarURL)
                .setDescription("**Responda as perguntas que serão feitas abaixo!**\n> Você necessita ter um arquivo com a sua foto!\n> Itens marcados com \"❗\" serão revistos pelo suporte, não é necessário se preocupar!")
                .setFooter(`Passo 0 de 5`, bot.user.displayAvatarURL())

            let envio = await message.channel.send(cEmbed)
            message.delete()


            cEmbed.addField(`**Nome Completo:**  ${loading}`, `Olá ${message.member.user}, nos informe o seu nome completo`)
                .setFooter(`Passo 1 de 5`, bot.user.displayAvatarURL())
                .setColor("#e75220")
            
            await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))
            
            message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 60000 }).then(async collected => {
                let nome = collected.first().content
                console.log(`↳ Nome escolhido '${nome}'`)
                
                cEmbed.fields.splice(0, 1) // Remove a mensagem de pedido de dado
                cEmbed.addField(`**Nome Completo:**`, collected.first().content)

                await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))
            
                cEmbed.addField(`**Matrícula:**  ${loading}`, `${message.member.user}, nos informe seu número de matrícula\n> Exemplo: \`202010123\``)
                    .setFooter(`Passo 2 de 5`, bot.user.displayAvatarURL())
                    .setColor("#ec6b08")
                
                await collected.first().delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
                await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

                message.channel.awaitMessages(m => m.author.id == message.author.id,
                    { max: 1, time: 60000 }).then(async collected => {
                        let matricula = collected.first().content
                        console.log(`↳ Matrícula '${matricula}'`)

                        cEmbed.fields.splice(1, 1) // Remove a mensagem de pedido de dado
                        cEmbed.addField(`**Matrícula:**`, collected.first().content)
                        await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

                        cEmbed.addField(`**Email:**  ${loading}`, `${message.member.user}, informe seu email para contato.\n> Dê preferência o email institucional.\n> Exemplo: \`abc@uesc.br\``)
                            .setFooter(`Passo 3 de 5`, bot.user.displayAvatarURL())
                            .setColor("#a17700")
                        
                        await collected.first().delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
                        await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

                        message.channel.awaitMessages(m => m.author.id == message.author.id,
                            { max: 1, time: 60000 }).then(async collected => {
                                let email = collected.first().content
                                console.log(`↳ Email '${email}'`)

                                cEmbed.fields.splice(2, 1) // Remove a mensagem de pedido de dado
                                cEmbed.addField("**Email:**", email)
                                await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

                                cEmbed.addField(`**Ano de Egresso:**  ${loading}`, `${message.member.user}, nos informe a previsão de término do curso.\n> Exemplo: \`2024\``)
                                    .setFooter(`Passo 4 de 5`, bot.user.displayAvatarURL())
                                    .setColor("#a9c40f")
                                
                                await collected.first().delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
                                await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

                                message.channel.awaitMessages(m => m.author.id == message.author.id,
                                    { max: 1, time: 60000 }).then(async collected => {
                                        let ano = collected.first().content
                                        console.log(`↳ Ano de Egresso '${ano}'`)
            
                                        cEmbed.fields.splice(3, 1) // Remove a mensagem de pedido de dado
            
                                        cEmbed.addField("**Ano de Egresso:**", ano)
            
                                        cEmbed.addField(`**Foto de Perfil:**  ${loading}`, `${message.member.user}, envie a sua foto de perfil.\n> Basta arrastar a imagem para o chat, ou nos mandar o link da sua foto.`)
                                            .setFooter(`Passo 4 de 5`, bot.user.displayAvatarURL())
                                            .setColor("#00c40f")
                                        
                                        await collected.first().delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
                                        await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))
            
                                        message.channel.awaitMessages(m => m.author.id == message.author.id,
                                            { max: 1, time: 60000 }).then(async collected => {
                                                let foto = null
                                                try {
                                                    foto = collected.first().attachments.first().proxyURL
                                                } catch (error) {
                                                    foto = collected.first().content
                                                }
                
                                                console.log(`↳ Foto '${foto}'`)
                    
                                                cEmbed.fields.splice(4, 1) // Remove a mensagem de pedido de dado
                    
                                                cEmbed.addField("**Foto de Perfil:**", foto)
                    
                                                cEmbed
                                                    .setTitle(`${agree} Perfil de ${message.author.username}`)
                                                    .setDescription("Cadastro finalizado!")
                                                    .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL())
                                                
                                                await collected.first().delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
                                                await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))
                    
                                                // ADIÇÃO NO BANCO DE DADOS 

                                                fs.readFile("./perfis.json", 'utf8', function readFileCallback(err, data){
                                                    if (err){
                                                        console.log(err);
                                                    } else {
                                                        obj = JSON.parse(data) //now it an object
                                                        obj.push({id:message.author.id, nome:nome, matricula: matricula, email:email, anoEgresso: ano, foto:foto}) //add some data
                                                        json = JSON.stringify(obj) //convert it back to json
                                                        fs.writeFile("./perfis.json", json, 'utf8', function(err){if(err) throw err;}) // write it back 
                                                        console.log(`↳ Perfil de '${message.author.username}' criado com sucesso`)
                                                        message.guild.channels.cache.get('722274694535053317').send(`↳ Perfil de \` ${message.author.username} \` criado com sucesso.`)
                                                    }
                                                });
                                            }).catch( err => {
                                                envio.delete()
                                                console.log(err)
                                                message.channel.send(`Ocorreu um **erro** ao criar seu perfil, **tente novamente** mais tarde ou fale com alguém do <@&721329022621057074>`)
                                            })
                                        
                                    }).catch( err => {
                                        envio.delete()
                                        console.log(err)
                                        message.channel.send(`Ocorreu um **erro** ao criar seu perfil, **tente novamente** mais tarde ou fale com alguém do <@&721329022621057074>`)
                                    })
                                
                            }).catch( err => {
                                envio.delete()
                                console.log(err)
                                message.channel.send(`Ocorreu um **erro** ao criar seu perfil, **tente novamente** mais tarde ou fale com alguém do <@&721329022621057074>`)
                            })
                        
                    }).catch( err => {
                        envio.delete()
                        console.log(err)
                        message.channel.send(`Ocorreu um **erro** ao criar seu perfil, **tente novamente** mais tarde ou fale com alguém do <@&721329022621057074>`)
                    })
                
            }).catch( err => {
                envio.delete()
                console.log(err)
                message.channel.send(`Ocorreu um **erro** ao criar seu perfil, **tente novamente** mais tarde ou fale com alguém do <@&721329022621057074>`)
            })
        }
    }
}


module.exports.config = {
    name: "perfil",
    description: "Comando especifico para o cadastro no COLCIC!",
    usage: ".perfil",
    accessableby: "Membros",
    noalias: "Sem variações",
    aliases: []
}