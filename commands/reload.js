const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Reload`)
    
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        const naoDigno = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Você não é digno de realizar esse comando!")

        message.reply(naoDigno)
        message.channel.send("https://tenor.com/view/batman-winger-wag-not-allowed-no-nope-gif-5433518")
        console.log(`↳ Acesso negado para '${message.author.username}'`)
        return
    }

    if(!args || args.length < 1){
        message.reply("\\⚠️ Escreva o comando que deseja dar reload!")
        console.log(`↳ Nenhum comando indicado.`)
        return
    }

    let command = args[0]

    if(!bot.commands.has(command)){
        message.channel.send(`\\⚠️ Comando \` ${command} \` não encontrado!`)
        console.log(`↳ Comando '${command}' não encontrado.`)
        return
    }

    let loading = "<a:loading:722456385098481735>"
    let check = "<a:check:722456384301563966>"

    const carregando = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${loading} Recarregando comando`)
        .setDescription(`Recarregando o comando \`${command}\`...`)
        .setTimestamp()

    const carregado = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle(`${check} Comando carregado`)
        .setDescription(`O comando \`${command}\` foi carregado com sucesso!`)
        .setTimestamp()

    const erro = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('\\❌ Erro')
        .setDescription(`Ocorreu um erro ao carregar o comando \`${command}\``)
        .setTimestamp()

    message.channel.send(carregando).then((msg) =>{
        console.log(`↳ Recarregando o comando '${command}'.`)
        delete require.cache[require.resolve(`./${command}.js`)];
        bot.commands.delete(command);
        const props = require(`./${command}.js`);
        bot.commands.set(command, props);
    
        msg.edit(carregado)
        console.log(`↳ Comando '${command}' carregado com sucesso.`)

    }).catch((e) => {
        msg.edit(erro)
        console.error(e)
    })
    
}


module.exports.config = {
    name: "reload",
    description: "Recarrega um comando especifico!",
    usage: ".reload [comando]",
    accessableby: "Moderadores",
    aliases: ["r"]
}