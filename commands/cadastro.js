const Discord = require("discord.js")
const config = require("../config.json")
const cargos = require("../cargos.json")

const agree = "✅";
const disagree = "❌";
const loading = "<a:loading:722456385098481735>";
const prefix = config.prefix

module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Cadastro`)

    if(!message.member.roles.cache.has("721103513874202645")){ // Não tem cargo novato
        message.channel.send(`Você já está cadastrado no servidor!\n> Caso queira alterar sua faculdade/curso, fale com um membro do <@&721329022621057074>`)
        console.log(`⚠️ Usuário "${message.author.username}" já cadastrado`)
        return
    }

    let cEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`Cadastro de ${message.author.username}`)
        .setThumbnail(message.author.avatarURL)
        .setDescription("**Responda as perguntas que serão feitas abaixo!**\n> Itens marcados com \"❗\" serão revistos pelo suporte, não é necessário se preocupar!")
        .setFooter(`Anti-Procrastinador | Passo 0 de 5`, bot.user.displayAvatarURL)

    let envio = await message.channel.send(cEmbed)
    message.delete()


    cEmbed.addField(`**Nome:**  ${loading}`, `Olá ${message.member.user}, nos informe o seu nome real\n> Seu apelido aqui no servidor será alterado para o que você digitar`)
        .setFooter(`Anti-Procrastinador | Passo 1 de 5`, bot.user.displayAvatarURL)
        .setColor("#e75220")
    
    await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))
        
    message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 120000 }).then(async collected => {
            console.log(`↳ Nome escolhido "${collected.first().content}"`)
            
            cEmbed.fields.splice(0, 1) // Remove a mensagem de pedido de dado
            cEmbed.addField(`**Nome:**`, collected.first().content)

            await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))
         
            cEmbed.addField(`**Curso:**  ${loading}`, `${message.member.user}, qual curso você faz/ensina?\n||Se você não faz nenhum, digite \` N \`||`)
                .setFooter(`Anti-Procrastinador | Passo 2 de 5`, bot.user.displayAvatarURL)
                .setColor("#ec6b08")
            
            await collected.first().delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
            await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

            message.channel.awaitMessages(m => m.author.id == message.author.id,
                { max: 1, time: 120000 }).then(async collected => {
                    let curso = collected.first().content
                    console.log(`↳ Curso escolhido "${curso}"`)

                    cEmbed.fields.splice(1, 1) // Remove a mensagem de pedido de dado

                    if (!cargos.find(c => c.type == 'curso' && c.name === curso.toLowerCase() || c.aliases.find(v => v === curso.toLowerCase()))) {
                        cEmbed.addField("**Curso:** ❗", curso)
                        message.guild.channels.cache.get('722274694535053317').send(`⚠️ O curso \` ${curso} \` escolhido por \` ${message.author.username} \` não foi encontrado.`)
                    } else {
                        cEmbed.addField("**Curso:**", curso)
                    }

                    cEmbed.addField(`**Faculdade:**  ${loading}`, `${message.member.user}, em qual faculdade? \n||Se você não faz nenhuma, digite \`N\`||`)
                        .setFooter(`Anti-Procrastinador | Passo 3 de 5`, bot.user.displayAvatarURL)
                        .setColor("#a17700")
                    
                    await collected.first().delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
                    await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                        { max: 1, time: 120000 }).then(async collected => {
                            let faculdade = collected.first().content
                            console.log(`↳ Faculdade escolhida "${faculdade}"`)

                            cEmbed.fields.splice(2, 1) // Remove a mensagem de pedido de dado

                            if (!cargos.find(c => c.type == 'faculdade' && c.name === faculdade.toLowerCase() || c.aliases.find(v => v === faculdade.toLowerCase()))) {
                                cEmbed.addField("**Faculdade:** ❗", faculdade)
                                message.guild.channels.cache.get('722274694535053317').send(`⚠️ A faculdade \` ${faculdade} \` escolhida por \` ${message.author.username} \` não foi encontrada.`)
                            } else {
                                cEmbed.addField("**Faculdade:**", faculdade)
                            }

                            cEmbed.addField(`**Nível:**  ${loading}`, `${message.member.user}, você é:\n\` Calouro(a):\` 😀\n\` Veterano(a):\` 😫\n\` Professor(a):\` 📚\n`)
                                .setFooter(`Anti-Procrastinador | Passo 4 de 5`, bot.user.displayAvatarURL)
                                .setColor("#a9c40f")
                            
                            await collected.first().delete().catch(() => console.log('⚠️ Erro ao deletar a mensagem'))
                            await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

                            envio.react('😀').then(async r => {
                                await envio.react('😫').then( async r1 => {
                                    await envio.react('📚')
                                })
                            });
                            envio.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == "😀" || reaction.emoji.name == "😫" || reaction.emoji.name == "📚"),
                                { max: 1 }).then(async collected => {
                                    
                                    cEmbed.fields.splice(3, 1) // Remove a mensagem de pedido de dado

                                    if (collected.first().emoji.name == "😀") {
                                        cEmbed.addField("**Nível:**", "Calouro(a)")
                                        console.log(`↳ Nível escolhido "Calouro(a)"`)
                                    } else if (collected.first().emoji.name == "😫") {
                                        cEmbed.addField("**Nível:**", "Veterano(a)")
                                        console.log(`↳ Nível escolhido "Veterano(a)"`)
                                    } else if (collected.first().emoji.name == "📚") {
                                        cEmbed.addField("**Nível:**", "Professor(a)")
                                        message.guild.channels.cache.get('722274694535053317').send(`⚠️ O usuário \` ${message.author.username} \` disse ser um professor, verifique por favor!`)
                                        console.log(`↳ Nível escolhido "Professor(a)"`)
                                    }
                                    
                                    await envio.reactions.removeAll()
                                        .catch(error => console.error('⚠️ Erro ao limpar as reações: ', error));

                                    cEmbed
                                        .addField('\u200B', '\u200B')
                                        .addField(`**Confirmação:**  ${loading}`, "Cadastro finalizado, deseja confirmar esses dados?")
                                        .setFooter(`Anti-Procrastinador | Passo 5 de 5`, bot.user.displayAvatarURL)
                                        .setColor("#00ff00")

                                    await envio.edit(cEmbed).catch(() => console.log('⚠️ Erro ao editar o embed'))

                                    envio.react(disagree).then(async r => {
                                        await envio.react(agree)
                                    });

                                    envio.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == agree || reaction.emoji.name == disagree),
                                        { max: 1 }).then(async collected => {

                                            if (collected.first().emoji.name == agree) {
                                                console.log(`↳ Cadastro de "${message.author.username}" concluido.`)

                                                message.member.setNickname(cEmbed.fields.find(({ name }) => name === '**Nome:**').value).catch(() => console.log(`⚠️ Não foi possível alterar o nick de "${message.author.username}"`)) // Alterando o Nick

                                                if (cEmbed.fields.find(({ name }) => name === '**Nível:**').value == "Veterano(a)") // Cargo de Veterano
                                                    message.member.roles.add("696434089972072519").catch(() => console.log(`⚠️ Não foi possível adicionar o cargo "Veterano(a)" para "${message.author.username}"`))
                                                else if (cEmbed.fields.find(({ name }) => name === '**Nível:**').value == "Calouro(a)") // Cargo de Calouro
                                                    message.member.roles.add("696434056778350612").catch(() => console.log(`⚠️ Não foi possível adicionar o cargo "Veterano(a)" para "${message.author.username}"`))
                                                
                                                if (cEmbed.fields.find(({ name }) => name === '**Curso:**')) { // Cargo do Curso
                                                    let nomeCurso = cargos.find(c => c.type == 'curso' && c.name === curso.toLowerCase() || c.aliases.find(v => v === curso.toLowerCase())).name
                                                    let roleCurso = message.guild.roles.cache.find((role) => role.name == nomeCurso).id
                                                    message.member.roles.add(roleCurso).catch(() => console.log(`⚠️ Não foi possível adicionar o cargo "${nomeCurso}" para "${message.author.username}"`))
                                                }
                                                if (cEmbed.fields.find(({ name }) => name === '**Faculdade:**')) { // Cargo da Faculdade 
                                                    let nomeFaculdade = cargos.find(c => c.type == 'faculdade' && c.name === faculdade.toLowerCase() || c.aliases.find(v => v === faculdade.toLowerCase())).name.toUpperCase()
                                                    let roleFaculdade = message.guild.roles.cache.find((role) => role.name == nomeFaculdade).id
                                                    message.member.roles.add(roleFaculdade).catch(() => console.log(`⚠️ Não foi possível adicionar o cargo "${nomeFaculdade}" para "${message.author.username}"`))
                                                }

                                                message.member.roles.remove('721103513874202645').catch(() => console.log(`⚠️ Não foi possível remover o cargo "Novato(a)" para "${message.author.username}"`))

                                                cEmbed
                                                    .setTitle(`${agree} Cadastro de ${message.author.username}`)
                                                    .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL)

                                            } else if (collected.first().emoji.name == disagree) {
                                                console.log(`↳ Cadastro de "${message.author.username}" cancelado.`)
                                                message.channel.send(`Tudo bem, você pode refazer o cadastro digitando novamente \` ${prefix}cadastro \`!`)
                                                    .then(msg => {
                                                        msg.delete(5000)
                                                    })
                                                    .catch( (e) => console.error(e) );
                                                await envio.delete().catch(() => console.log('⚠️ Erro ao excluir a mensagem'))
                                                return
                                            }
                                            
                                            cEmbed.fields.splice(4, 2) // Remove a mensagem de pedido de dado

                                            cEmbed
                                                .setDescription("~~Responda as perguntas que serão feitas abaixo!~~")
                                                .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL)
                                            
                                            await envio.reactions.removeAll()
                                                .catch(error => console.error('⚠️ Erro ao limpar as reações: ', error));
                                            await envio.edit(cEmbed)
                                                .catch(() => console.log('⚠️ Erro ao editar a mensagem'))

                                        })

                                }).catch((e) => {
                                    message.reply('infelizmente ocorreu um erro ao finalizar seu cadastro, tente novamente mais tarde.');
                                    console.error(e);
                                }); // AwaitReactions
                            
                        })

                    
                })

            
        }).catch( (m) => {
            m.delete()
            message.channel.send(`Seu cadastro passou do tempo limite, para se cadastrar novamente digite \` ${config.prefix}cadastro \``)
        })
        
}


module.exports.config = {
    name: "cadastro",
    description: "Comando especifico para o cadastro no servidor!",
    usage: ".cadastro",
    accessableby: "Novato",
    noalias: "Sem variações",
    aliases: []
}