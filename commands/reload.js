const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Reload`)
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para "${message.author.username}."`)
    }

    if(!args || args.length < 1){
        message.reply("⚠️ Escreva o comando que deseja dar reload!")
        console.log(`↳ Nenhum comando indicado.`)
        return
    }

    let command = args[0]

    if(!bot.commands.has(command)){
        message.reply(`⚠️ Comando \`${command}\` não encontrado!`)
        console.log(`↳ Comando '${command}' não encontrado.`)
        return
    }

    let loading = "<a:loading:722456385098481735>"
    let check = "<a:check:722456384301563966>"

    message.channel.send(`${loading} Recarregando o comando \`${command}\``).then((msg) => {
        console.log(`↳ Recarregando o comando '${command}'.`)
        delete require.cache[require.resolve(`./${command}.js`)];
        bot.commands.delete(command);
        const props = require(`./${command}.js`);
        bot.commands.set(command, props);

        msg.edit(`${check} O comando \`${command}\` foi recarregado com sucesso!`);
        console.log(`↳ Comando '${command}' carregado com sucesso.`)
    }).catch(console.error())
    
}


module.exports.config = {
    name: "reload",
    description: "Recarrega um comando especifico!",
    usage: ".reload [comando]",
    accessableby: "Moderadores",
    aliases: ["r"]
}