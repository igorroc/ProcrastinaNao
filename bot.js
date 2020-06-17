const Discord = require("discord.js");
const config = require("./config.json");

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('config.json')
const dbConfig = low(adapter)

const bot = new Discord.Client();


const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Não foi possivel encontrar comandos!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        console.log(`\n■▶ [LOGS] ⇥ Comando "${pull.config.name}" inicializado com sucesso`)
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
            console.log(`↳ Variação '${alias}' adicionada para "${pull.config.name}"`)
        });
    });
});

//=-=-=-=-=-=-=-=-=-=-=-=-=


bot.once("ready", () => {
    console.log("\n■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■")
    console.log(`■ Bot foi iniciado em ${bot.guilds.size} servidor(es) ■`);
    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n\n")
    bot.user.setActivity(`| Digite ${dbConfig.get('prefix').value()}help para ajuda | Criado por Igor Rocha |`)
});

bot.on("raw", async dados =>{
    if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if(dados.d.message_id != "721347287426793494") return

    
    let servidor = bot.guilds.get("696430420992066112")
    let membro = servidor.members.get(dados.d.user_id)
    console.log(`■▶ [LOGS] ⇥ Evento de reação feito por "${membro.nickname}"`)

    let python = servidor.roles.get('721102448483369140'),
        javascript = servidor.roles.get('721179010767388682'),
        java = servidor.roles.get('721176368964173835'),
        css = servidor.roles.get('721177136655892632'),
        html = servidor.roles.get('721346290369167460'),
        c = servidor.roles.get('721115106871738408')

    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === "696478679391272961"){
            if(membro.roles.has(python)) return console.log(`↳ Usuário "${membro.nickname}" já possui o cargo Python`)
            membro.addRole(python)
            console.log(`↳ Cargo Python adicionado para o usuario "${membro.nickname}"`)

        }else if(dados.d.emoji.name === "721349573901287445"){
            if(membro.roles.has(javascript)) return console.log(`↳ Usuário "${membro.nickname}" já possui o cargo JavaScript`)
            membro.addRole(javascript)
            console.log(`↳ Cargo JavaScript adicionado para o usuario "${membro.nickname}"`)

        }else if(dados.d.emoji.id === "721349577143222272"){
            if(membro.roles.has(java)) return console.log(`↳ Usuário "${membro.nickname}" já possui o cargo Java`)
            membro.addRole(java)
            console.log(`↳ Cargo Java adicionado para o usuario "${membro.nickname}"`)

        }else if(dados.d.emoji.id === "721345484035325984"){
            if(membro.roles.has(css)) return console.log(`↳ Usuário "${membro.nickname}" já possui o cargo CSS`)
            membro.addRole(css)
            console.log(`↳ Cargo CSS adicionado para o usuario "${membro.nickname}"`)

        }else if(dados.d.emoji.id === "721345485314588744"){
            if(membro.roles.has(html)) return console.log(`↳ Usuário "${membro.nickname}" já possui o cargo HTML`)
            membro.addRole(html)
            console.log(`↳ Cargo HTML adicionado para o usuario "${membro.nickname}"`)

        }else if(dados.d.emoji.id === "721347830765322313"){
            if(membro.roles.has(c)) return console.log(`↳ Usuário "${membro.nickname}" já possui o cargo C`)
            membro.addRole(c)
            console.log(`↳ Cargo C adicionado para o usuario "${membro.nickname}"`)
        }
    }
    if(dados.t === "MESSAGE_REACTION_REMOVE"){
        if(dados.d.emoji.id === "696478679391272961"){
            if(membro.roles.has(python)) return console.log(`↳ Usuário "${membro.nickname}" ainda não tinha o cargo Python`)
            membro.removeRole(python)
            console.log(`↳ Usuário "${membro.nickname}" removeu o cargo Python`)

        }else if(dados.d.emoji.name === "721349573901287445"){
            if(membro.roles.has(javascript)) return console.log(`↳ Usuário "${membro.nickname}" ainda não tinha o cargo JavaScript`)
            membro.removeRole(javascript)
            console.log(`↳ Usuário "${membro.nickname}" removeu o cargo JavaScript`)

        }else if(dados.d.emoji.id === "721349577143222272"){
            if(membro.roles.has(java)) return console.log(`↳ Usuário "${membro.nickname}" ainda não tinha o cargo Java`)
            membro.removeRole(java)
            console.log(`↳ Usuário "${membro.nickname}" removeu o cargo Java`)

        }else if(dados.d.emoji.id === "721345484035325984"){
            if(membro.roles.has(css)) return console.log(`↳ Usuário "${membro.nickname}" ainda não tinha o cargo CSS`)
            membro.removeRole(css)
            console.log(`↳ Usuário "${membro.nickname}" removeu o cargo CSS`)

        }else if(dados.d.emoji.id === "721345485314588744"){
            if(membro.roles.has(html)) return console.log(`↳ Usuário "${membro.nickname}" ainda não tinha o cargo HTML`)
            membro.removeRole(html)
            console.log(`↳ Usuário "${membro.nickname}" removeu o cargo HTML`)

        }else if(dados.d.emoji.id === "721347830765322313"){
            if(membro.roles.has(c)) return console.log(`↳ Usuário "${membro.nickname}" ainda não tinha o cargo C`)
            membro.removeRole(c)
            console.log(`↳ Usuário "${membro.nickname}" removeu o cargo C`)
        }
    }
})

bot.on("guildMemberAdd", membro => {
    console.log(`Novo membro no servidor. Dê as boas vindas para "${membro.user.username}"`)
    if(membro.user.bot) return
    membro.addRole("721103513874202645") // Cargo novato
    bot.channels.get('721103116686327820').send(`Olá, ${membro.user}! Seja bem-vindo(a)! -> Faça seu cadastro aqui!\nDigite \`${config.prefix}cadastro\` para começar`)
});

bot.on("message", async message => {
    
    
    if(message.author.bot) return;//se o autor foi um bot, faz nada
    if(message.channel.type == "dm") return message.channel.send("Não fala comigo por aqui..."); //se a mensagem foi enviada por dm, n faz nada
    

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let comando = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return; // valida o prefix do comando
    let commandfile = bot.commands.get(comando.slice(prefix.length)) || bot.commands.get(bot.aliases.get(comando.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})


bot.login(config.token);