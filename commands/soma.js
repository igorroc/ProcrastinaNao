const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
    console.log(`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando Soma`)

    message.channel.send(`Utilize o bot <@725319850808967198> para fazer operações matemáticas!\nDigite \` +help \` para ajuda`)
}


module.exports.config = {
    name: "soma",
    description: "",
    usage: "",
    accessableby: "Membros",
    aliases: ["s"]
}