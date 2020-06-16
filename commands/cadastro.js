const Discord = require("discord.js")
const colours = require("../colours.json")


module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Cadastro`)
    
    let cEmbed = new Discord.RichEmbed()
    .setColor(colours.green_light)
    .setTitle(`Cadastro de ${message.member.nickname}`)
    .setThumbnail(message.author.avatarURL)
    .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL)

    await message.channel.send(cEmbed)
    
    message.delete()

    let questao1 = message.channel.send(`Olá ${message.member.user}, nos informe o seu nome (seu apelido aqui no servidor será alterado para o que você digitar)`)
        .then(() => {
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 120000}).then(collected => {
                    console.log(`↳ Nome escolhido "${collected.first().content}"`)
                    //message.member.setNickname(collected.first().content)
                    console.log("teste")
                    cEmbed.addField("**Nome:**", collected.first().content)

                    collected.first().delete()

                    console.log("teste2")
                    let questao2 = message.channel.send(`${message.member.user}, qual curso você faz?\n||Se você não faz nenhum, digite \`N\`||`).then(() => {
                        message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 120000}).then(collected => {
                                console.log(`↳ Curso escolhido "${collected.first().content}"`)
                                message.guild.channels.get('722274694535053317').send(`O usuário ${collected.first().author} é do curso ${collected.first().content}`)
                                let questao3 = message.channel.send(`${message.member.user}, em qual faculdade? \`Digite a sigla em maiúsculo\` ||Se você não faz nenhuma, digite \`N\`||`).then(() => {
                                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                                        {max: 1, time: 120000}).then(collected => {
                                            console.log(`↳ Faculdade escolhida "${collected.first().content}"`)
                                            let questao4 = message.channel.send(`${message.member.user}, você é:\nCalouro(a): 😀\nVeterano(a): 😫\n`).then(msg => {
                                                msg.react('😀').then(r => {
                                                    msg.react('😫')
                                                });
                                                msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == "😀" || reaction.emoji.name == "😫"),
                                                { max: 1}).then(collected => {
                                                        if (collected.first().emoji.name == "😀") {
                                                            message.member.addRole("696434056778350612")
                                                        }else{
                                                            message.member.addRole("696434089972072519")
                                                        }
                                                }).catch(() => {
                                                    message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                                    console.log(`↳ Ocorreu um erro no cadastro de "${message.member.nickname}", operação cancelada.`)
                                                });
                                            })
                                        }).catch(() => {
                                            message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                            console.log(`↳ Ocorreu um erro no cadastro de "${message.member.nickname}", operação cancelada.`)
                                        });
                                })
                            }).catch(() => {
                                message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                                console.log(`↳ Ocorreu um erro no cadastro de "${message.member.nickname}", operação cancelada.`)
                            });
                    })
                }).catch(() => {
                    message.reply('infelizmente ocorreu um erro ao fazer seu cadastro, tente novamente mais tarde.');
                    console.log(`↳ Ocorreu um erro no cadastro de "${message.member.nickname}", operação cancelada.`)
                });
        })
        

}


module.exports.config = {
    name: "cadastro",
    description: "Comando especifico para o cadastro no servidor!",
    usage: ".cadastro",
    accessableby: "Membros",
    aliases: [""]
}