const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	console.log(
		`\n■▶ [LOGS] ⇥ Usuário '${message.author.username}' usou o comando FotoAleatoria`
	)

    let link = "https://source.unsplash.com/"

    const embed = new Discord.MessageEmbed()
        .setTitle(`\🎲 Foto aleatória`)
        .setColor("#64B3E3")

    if(args[0]){
        embed.setDescription(`Aqui está sua foto aleatória sobre\n**${args.join(", ")}**`)
        link += `featured/?${args.join(",")}`
    }else{
        embed.setDescription(`Aqui está sua foto aleatória!`)
        link += "random/"
    }

    try{
        embed.setImage(link)
        message.reply(embed)
    }catch(e){
        console.log(e)
    }

}

module.exports.config = {
	name: "fotoaleatoria",
	description: "Envia uma foto aleatória!\nCaso você queira, pode indicar um determinado assunto.",
	usage: ".fotoaleatoria [assuntos]",
	accessableby: "Membros",
	aliases: ["randompic"],
}
