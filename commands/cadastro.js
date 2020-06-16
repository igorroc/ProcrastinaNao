const Discord = require("discord.js")
const colours = require("../colours.json")

const agree = "✅";
const disagree = "❌";

module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Cadastro`)
    
    let cEmbed = new Discord.RichEmbed()
    .setColor(colours.green_light)
    .setTitle(`Cadastro de ${message.member.nickname}`)
    .setThumbnail(message.author.avatarURL)
    .setDescription("Responda as perguntas que serão feitas abaixo!")
    .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL)

    let envio = await message.channel.send(cEmbed)
    let confirmacao = [0, 0, 0, 0]
    message.delete()

    let questao1 = message.channel.send(`Olá ${message.member.user}, nos informe o seu nome (seu apelido aqui no servidor será alterado para o que você digitar)`)
        .then(() => {
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 120000}).then(async collected => {
                    console.log(`↳ Nome escolhido "${collected.first().content}"`)
                    
                    cEmbed.addField("**Nome:**", collected.first().content)
                    await envio.delete()
                    await collected.first().delete()
                    envio = await message.channel.send(cEmbed)
                    confirmacao[0] = 1

                    let questao2 = message.channel.send(`${message.member.user}, qual curso você faz?\n||Se você não faz nenhum, digite \`N\`||`).then(() => {
                        message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 120000}).then(async collected => {
                                console.log(`↳ Curso escolhido "${collected.first().content}"`)

                                message.guild.channels.get('722274694535053317').send(`O usuário ${collected.first().author} é do curso ${collected.first().content}`)
                                cEmbed.addField("**Curso:**", collected.first().content)
                                await envio.delete()
                                await collected.first().delete()
                                envio = await message.channel.send(cEmbed)
                                confirmacao[1] = 1

                                let questao3 = message.channel.send(`${message.member.user}, em qual faculdade? \n\`Digite a sigla em maiúsculo\` \n||Se você não faz nenhuma, digite \`N\`||`).then(() => {
                                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                                        {max: 1, time: 120000}).then(async collected => {
                                            console.log(`↳ Faculdade escolhida "${collected.first().content}"`)
                                            cEmbed.addField("**Faculdade:**", collected.first().content)
                                            await envio.delete()
                                            await collected.first().delete()
                                            envio = await message.channel.send(cEmbed)
                                            confirmacao[2] = 1

                                            let questao4 = message.channel.send(`${message.member.user}, você é:\n\`Calouro(a): 😀\`\n\`Veterano(a): 😫\`\n`).then(msg => {
                                                msg.react('😀').then(async r => {
                                                    msg.react('😫')
                                                });
                                                msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == "😀" || reaction.emoji.name == "😫"),
                                                { max: 1}).then(async collected => {
                                                        if (collected.first().emoji.name == "😀") {
                                                            message.member.addRole("696434056778350612")
                                                            cEmbed.addField("**Nível:**", "Calouro")
                                                        }else if(collected.first().emoji.name == "😫") {
                                                            message.member.addRole("696434089972072519")
                                                            cEmbed.addField("**Nível:**", "Veterano")
                                                        }
                                                        await envio.delete()
                                                        envio = await message.channel.send(cEmbed)
                                                        confirmacao[3] = 1

                                                        message.channel.send("Cadastro finalizado, deseja confirmar esses dados?").then(msg => {
                                                            msg.react(disagree).then(async r => {
                                                                msg.react(agree)
                                                            });
                                                            msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == agree || reaction.emoji.name == disagree),
                                                            { max: 1}).then(async collected => {
                                                                    if (collected.first().emoji.name == agree) {
                                                                    }else if(collected.first().emoji.name == disagree) {
                                                                        
                                                                    }
                                                                    await envio.delete()
                                                                    envio = await message.channel.send(cEmbed)
                                                                    confirmacao[3] = 1
            
                                                                    message.channel.send("Cadastro finalizado, deseja confirmar esses dados?").then(msg => {
                                                                        msg.react(disagree).then(async r => {
                                                                            msg.react(agree)
                                                                        })
                                                                    console.log(`↳ Cadastro de "${message.member.nickname}" finalizado.`)
                                                            })
                                                        })           
                                                    }).catch(() => {
                                                        //message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                                        console.log(`↳ Ocorreu um erro (3) no cadastro de "${message.member.nickname}", operação cancelada.`)
                                                    });
                                                        
                                                    console.log(`↳ Cadastro de "${message.member.nickname}" finalizado.`)
                                                }).catch(() => {
                                                    //message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                                    console.log(`↳ Ocorreu um erro (4) no cadastro de "${message.member.nickname}", operação cancelada.`)
                                                });
                                            })
                                                        
                                        }).catch(() => {
                                            //message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                            console.log(`↳ Ocorreu um erro (3) no cadastro de "${message.member.nickname}", operação cancelada.`)
                                        });
                                })
                                                        
                            }).catch(() => {
                                //message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                console.log(`↳ Ocorreu um erro (2) no cadastro de "${message.member.nickname}", operação cancelada.`)
                            });
                    })
                }).catch(() => {
                    //message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                    console.log(`↳ Ocorreu um erro (1) no cadastro de "${message.member.nickname}", operação cancelada.`)
                });
        })
        
        //message.member.setNickname(collected.first().content) SERÁ USADO PARA TROCAR O NICK
}


module.exports.config = {
    name: "cadastro",
    description: "Comando especifico para o cadastro no servidor!",
    usage: ".cadastro",
    accessableby: "Membros",
    aliases: [""]
}