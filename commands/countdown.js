const Discord = require("discord.js")
const colours = require("../colours.json")


module.exports.run = async (bot, message, args) => {
    console.log(`■▶ [LOGS] ⇥ Usuário "${message.author.username}" usou o comando Countdown`)
    
    let contador = parseInt(args)
    let loading = "<a:loading:722456385098481735>"
    let check = "<a:check:722456384301563966>"

    let contagemEmbed = new Discord.RichEmbed()
        .setTitle(`${loading} Contagem regressiva de ${message.member.nickname}`)
        .setColor(colours.green_light)
        .setThumbnail(message.author.avatarURL)
        .addField("**CONTAGEM:**", contador)
        .setFooter(`Anti-Procrastinador`, bot.user.displayAvatarURL)
    
    let m = message.channel.send(contagemEmbed)

    const contagem = setInterval(() => {
        if(contador > 0){
            contador--
            m.then(value => {
                value.embeds[0].fields[0].value = contador
                console.log( value.embeds[0].fields[0].value )
            }).catch(console.error)
        }else{
            console.log('↳ Contagem finalizada.')
            clearInterval(contagem)
        }
    }, 1000)
}


module.exports.config = {
    name: "countdown",
    description: "Inicia uma contagem regressiva com o tempo indicado!",
    usage: ".countdown [tempo]",
    accessableby: "Membros",
    aliases: ["cd"]
}