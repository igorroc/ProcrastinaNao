const Discord = require("discord.js")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('config.json')
const config = low(adapter)

module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Prefix`)
    
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.reply('Você não é digno de realizar esse comando!')
        console.log(`↳ Acesso negado para "${message.author.username}"`)
        return
    }
    
    let [novoPrefix] = args
    if(novoPrefix == "reset"){
        await config.set('prefix', '.').write()
        console.log(`↳ Prefixo resetado para "."`)
        message.channel.send(`\`\`\`md\n# Prefix do servidor resetado para:\n.\`\`\``)
    }else if(args[1]){
        message.channel.send(`\`\`\`md\n# Não é possivel adicionar um prefixo com um espaço em branco.\`\`\``);
    }else{
        await config.set('prefix', novoPrefix).write()
        console.log(`↳ Prefix alterado para "${novoPrefix}"`)
        message.channel.send(`\`\`\`md\n# Prefix do servidor alterado para:\n${novoPrefix}\n\`\`\``);
    }
    
    bot.user.setActivity(`| Digite ${config.get('prefix').value()}help para ajuda | Criado por Igor Rocha |`, {type: 'LISTENING'})

    
}


module.exports.config = {
    name: "prefix",
    description: "Altera o prefixo do servidor!",
    usage: ".prefix [novo_prefix] | .prefix reset",
    accessableby: "Moderadores",
    noalias: "Sem variações",
    aliases: []
}