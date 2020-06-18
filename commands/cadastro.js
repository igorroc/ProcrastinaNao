const Discord = require("discord.js")
const colours = require("../colours.json")
const config = require("../config.json")
const cargos = require("../cargos.json")

const agree = "✅";
const disagree = "❌";
const prefix = config.prefix

module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Cadastro`)

    let cEmbed = new Discord.RichEmbed()
        .setColor(colours.green_light)
        .setTitle(`<a:loading:722456385098481735> Cadastro de ${message.author.username}`)
        .setThumbnail(message.author.avatarURL)
        .setDescription("Responda as perguntas que serão feitas abaixo!\nItens marcados com \"❗\" serão revistos pelo suporte, não é necessário se preocupar!")
        .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL)

    let envio = await message.channel.send(cEmbed)
    message.delete()

    let questao1 = message.channel.send(`Olá ${message.member.user}, nos informe o seu nome real (seu apelido aqui no servidor será alterado para o que você digitar)`)
        .then(() => {
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                { max: 1, time: 120000 }).then(async collected => {
                    console.log(`↳ Nome escolhido "${collected.first().content}"`)

                    cEmbed.addField("**Nome:**", collected.first().content)
                    await envio.delete()
                    await collected.first().delete()
                    envio = await message.channel.send(cEmbed)

                    let questao2 = message.channel.send(`${message.member.user}, qual curso você faz?\n||Se você não faz nenhum, digite \`N\`||`).then(() => {
                        message.channel.awaitMessages(m => m.author.id == message.author.id,
                            { max: 1, time: 120000 }).then(async collected => {
                                let curso = collected.first().content
                                console.log(`↳ Curso escolhido "${curso}"`)
                                if (!cargos.find(c => c.type == 'curso' && c.name === curso.toLowerCase() || c.aliases.find(v => v === curso.toLowerCase()))) {
                                    cEmbed.addField("**Curso:** ❗", curso)
                                } else {
                                    cEmbed.addField("**Curso:**", curso)
                                }
                                await envio.delete()
                                await collected.first().delete()
                                envio = await message.channel.send(cEmbed)

                                let questao3 = message.channel.send(`${message.member.user}, em qual faculdade? \n\`Digite a sigla\`\n||Se você não faz nenhuma, digite \`N\`||`).then(() => {
                                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                                        { max: 1, time: 120000 }).then(async collected => {
                                            let faculdade = collected.first().content
                                            console.log(`↳ Faculdade escolhida "${faculdade}"`)
                                            if (!cargos.find(c => c.type == 'faculdade' && c.name === faculdade.toLowerCase() || c.aliases.find(v => v === faculdade.toLowerCase()))) {
                                                cEmbed.addField("**Faculdade:** ❗", faculdade)
                                            } else {
                                                cEmbed.addField("**Faculdade:**", faculdade)
                                            }
                                            await envio.delete()
                                            await collected.first().delete()
                                            envio = await message.channel.send(cEmbed)

                                            let questao4 = message.channel.send(`${message.member.user}, você é:\n\`Calouro(a):\` 😀\n\`Veterano(a):\` 😫\n> Caso você seja professor(a), fale com algum membro da Moderação ou Suporte!`).then(msg => {
                                                msg.react('😀').then(async r => {
                                                    msg.react('😫')
                                                });
                                                msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == "😀" || reaction.emoji.name == "😫"),
                                                    { max: 1 }).then(async collected => {
                                                        if (collected.first().emoji.name == "😀") {
                                                            cEmbed.addField("**Nível:**", "Calouro(a)")
                                                            console.log(`↳ Nível escolhido "Calouro(a)"`)
                                                        } else if (collected.first().emoji.name == "😫") {
                                                            cEmbed.addField("**Nível:**", "Veterano(a)")
                                                            console.log(`↳ Nível escolhido "Veterano(a)"`)
                                                        }

                                                        await envio.delete()
                                                        envio = await message.channel.send(cEmbed)

                                                        let fim = message.channel.send("Cadastro finalizado, deseja confirmar esses dados?").then(msg => {
                                                            msg.react(disagree).then(async r => {
                                                                msg.react(agree)
                                                            });
                                                            msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == agree || reaction.emoji.name == disagree),
                                                                { max: 1 }).then(async collected => {

                                                                    let concluido = new Discord.RichEmbed()
                                                                        .setColor(colours.green_light)

                                                                    if (collected.first().emoji.name == agree) {
                                                                        console.log(`↳ Cadastro de "${message.author.username}" concluido.`)

                                                                        message.member.setNickname(cEmbed.fields.find(({ name }) => name === '**Nome:**').value).catch(console.log(`↳ ⚠️ Não foi possível alterar o nick de "${message.author.username}"`)) // Alterando o Nick

                                                                        if (cEmbed.fields.find(({ name }) => name === '**Nível:**').value == "Veterano(a)") // Cargo de Veterano
                                                                            message.member.addRole("696434089972072519").catch(console.log(`↳ ⚠️ Não foi possível adicionar o cargo "Veterano(a)" para "${message.author.username}"`))
                                                                        else if (cEmbed.fields.find(({ name }) => name === '**Nível:**').value == "Calouro(a)") // Cargo de Calouro
                                                                            message.member.addRole("696434056778350612").catch(console.log(`↳ ⚠️ Não foi possível adicionar o cargo "Veterano(a)" para "${message.author.username}"`))

                                                                        if (cEmbed.fields.find(({ name }) => name === '**Curso:**')) { // Cargo do Curso
                                                                            let nomeCurso = cargos.find(c => c.type == 'curso' && c.name === curso.toLowerCase() || c.aliases.find(v => v === curso.toLowerCase())).name
                                                                            let roleCurso = message.guild.roles.find((role) => role.name == nomeCurso).id
                                                                            message.member.addRole(roleCurso).catch(console.log(`↳ ⚠️ Não foi possível adicionar o cargo "${nomeCurso}" para "${message.author.username}"`))
                                                                        }
                                                                        if (cEmbed.fields.find(({ name }) => name === '**Faculdade:**')) { // Cargo da Faculdade 
                                                                            let nomeFaculdade = cargos.find(c => c.type == 'faculdade' && c.name === faculdade.toLowerCase() || c.aliases.find(v => v === faculdade.toLowerCase())).name.toUpperCase()
                                                                            let roleFaculdade = message.guild.roles.find((role) => role.name == nomeFaculdade).id
                                                                            message.member.addRole(roleFaculdade).catch(console.log(`↳ ⚠️ Não foi possível adicionar o cargo "${nomeFaculdade}" para "${message.author.username}"`))
                                                                        }

                                                                        message.member.removeRole('721103513874202645').catch(console.log(`↳ ⚠️ Não foi possível remover o cargo "Novato(a)" para "${message.author.username}"`))

                                                                        concluido.setTitle(`${agree} Cadastro de ${message.author.username}`)

                                                                    } else if (collected.first().emoji.name == disagree) {
                                                                        console.log(`↳ Cadastro de "${message.author.username}" cancelado.`)
                                                                        message.channel.send(`Tudo bem, você pode refazer o cadastro digitando novamente \`${prefix}cadastro\`!`)
                                                                        concluido.setTitle(`${disagree} Cadastro de ${message.author.username}`)
                                                                    }
                                                                    await envio.delete()

                                                                    concluido.setThumbnail(message.author.avatarURL)
                                                                        .setDescription("~~Responda as perguntas que serão feitas abaixo!~~")
                                                                        .addField(cEmbed.fields[0].name, cEmbed.fields[0].value)
                                                                        .addField(cEmbed.fields[1].name, cEmbed.fields[1].value)
                                                                        .addField(cEmbed.fields[2].name, cEmbed.fields[2].value)
                                                                        .addField(cEmbed.fields[3].name, cEmbed.fields[3].value)
                                                                        .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL)

                                                                    envio = await message.channel.send(concluido)
                                                                        .then(m => m.pin())
                                                                        .catch(console.log('↳ ⚠️ Erro ao fixar a mensagem'))

                                                                })
                                                        })
                                                    }).catch(() => {
                                                        message.reply('infelizmente ocorreu um erro ao finalizar seu cadastro, tente novamente mais tarde.');
                                                        console.log(`↳ Ocorreu um erro (5) no cadastro de "${message.member.nickname}", operação cancelada.`)
                                                    }); // AwaitReactions
                                            }).catch(() => {
                                                message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                                console.log(`↳ Ocorreu um erro (4) no cadastro de "${message.member.nickname}", operação cancelada.`)
                                            });
                                        })

                                }).catch(() => {
                                    message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                    console.log(`↳ Ocorreu um erro (3) no cadastro de "${message.member.nickname}", operação cancelada.`)
                                });
                            })

                    }).catch(() => {
                        message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                        console.log(`↳ Ocorreu um erro (2) no cadastro de "${message.member.nickname}", operação cancelada.`)
                    });
                })
        }).catch(() => {
            message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
            console.log(`↳ Ocorreu um erro (1) no cadastro de "${message.member.nickname}", operação cancelada.`)
        });
}


module.exports.config = {
    name: "cadastro",
    description: "Comando especifico para o cadastro no servidor!",
    usage: ".cadastro",
    accessableby: "Membros",
    noalias: "Sem variações",
    aliases: []
}