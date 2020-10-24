const Discord = require("discord.js");
const config = require("./config.json");

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./config.json')
const dbConfig = low(adapter)

const bot = new Discord.Client();

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") // Pega todos os nomes dos comandos da pasta "./commands/" e remove o '.js'
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Não foi possivel encontrar comandos!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`); // Importa cada arquivo
        bot.commands.set(pull.config.name, pull); // Coloca o nome dele na Collection
        console.log(`\n■▶ [LOGS] ⇥ Comando '${pull.config.name}' inicializado com sucesso`)
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name) // Coloca a variação dele na Collection
            console.log(`↳ Variação '${alias}' adicionada`)
        });
    });
});

//=-=-=-=-=-=-=-=-=-=-=-=-=


bot.once("ready", () => {
    var guild = bot.guilds.cache.get("696430420992066112")
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size

    console.log("\■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■")
    console.log(`■ Bot iniciado, total de ${memberCount} participantes! ■`);
    console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n\n")
    bot.channels.cache.get('722274694535053317').send(`👋🏻 Bot iniciado, total de \`${memberCount}\` participantes!`)

    if(config.online == true){
        bot.user.setStatus('online')
        bot.user.setActivity(`${dbConfig.get('prefix').value()}help para ajuda | Criado por Igor Rocha |`, {type: 'WATCHING'})
    }else{
        bot.user.setStatus('idle')
        bot.user.setActivity('| ', {type: "CUSTOM_STATUS", name: "Estão fazendo alterações em mim!"})
    }
});

bot.on("raw", async dados =>{
    if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if(dados.d.message_id != "721347287426793494") return // Mensagem de cargos

    let servidor = bot.guilds.cache.get("696430420992066112") // Servidor ProcrastinaNão
    let membro = servidor.members.cache.get(dados.d.user_id)
    console.log(`\n■▶ [LOGS] ⇥ Evento de reação feito por "${membro.user.username}"`)

    let python = servidor.roles.cache.get('721102448483369140'),
        javascript = servidor.roles.cache.get('721179010767388682'),
        java = servidor.roles.cache.get('721176368964173835'),
        css = servidor.roles.cache.get('721177136655892632'),
        html = servidor.roles.cache.get('721346290369167460'),
        c = servidor.roles.cache.get('721115106871738408')

    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === "696478679391272961"){ // Cargo Python
            if(membro.roles.cache.some(role => role === python)) return console.log(`↳ Usuário "${membro.user.username}" já possui o cargo Python`)
            membro.roles.add(python)
            console.log(`↳ Cargo Python adicionado para o usuário "${membro.user.username}"`)

        }else if(dados.d.emoji.id === "721349573901287445"){ // Cargo JavaScript
            if(membro.roles.cache.some(role => role === javascript)) return console.log(`↳ Usuário "${membro.user.username}" já possui o cargo JavaScript`)
            membro.roles.add(javascript)
            console.log(`↳ Cargo JavaScript adicionado para o usuário "${membro.user.username}"`)

        }else if(dados.d.emoji.id === "722249250586492978"){ // Cargo Java
            if(membro.roles.cache.some(role => role === java)) return console.log(`↳ Usuário "${membro.user.username}" já possui o cargo Java`)
            membro.roles.add(java)
            console.log(`↳ Cargo Java adicionado para o usuário "${membro.user.username}"`)

        }else if(dados.d.emoji.id === "721345484035325984"){ // Cargo CSS
            if(membro.roles.cache.some(role => role === css)) return console.log(`↳ Usuário "${membro.user.username}" já possui o cargo CSS`)
            membro.roles.add(css)
            console.log(`↳ Cargo CSS adicionado para o usuário "${membro.user.username}"`)

        }else if(dados.d.emoji.id === "721345485314588744"){ // Cargo HTML
            if(membro.roles.cache.some(role => role === html)) return console.log(`↳ Usuário "${membro.user.username}" já possui o cargo HTML`)
            membro.roles.add(html)
            console.log(`↳ Cargo HTML adicionado para o usuário "${membro.user.username}"`)

        }else if(dados.d.emoji.id === "721347830765322313"){ // Cargo C
            if(membro.roles.cache.some(role => role === c)) return console.log(`↳ Usuário "${membro.user.username}" já possui o cargo C`)
            membro.roles.add(c)
            console.log(`↳ Cargo C adicionado para o usuário "${membro.user.username}"`)
        }
    }
    if(dados.t === "MESSAGE_REACTION_REMOVE"){
        if(dados.d.emoji.id === "696478679391272961"){ // Cargo Python
            if(!membro.roles.cache.some(role => role === python)) return console.log(`↳ Usuário "${membro.user.username}" ainda não tinha o cargo Python`)
            membro.roles.remove(python)
            console.log(`↳ Usuário "${membro.user.username}" removeu o cargo Python`)

        }else if(dados.d.emoji.id === "721349573901287445"){ // Cargo JavaScript
            if(!membro.roles.cache.some(role => role === javascript)) return console.log(`↳ Usuário "${membro.user.username}" ainda não tinha o cargo JavaScript`)
            membro.roles.remove(javascript)
            console.log(`↳ Usuário "${membro.user.username}" removeu o cargo JavaScript`)

        }else if(dados.d.emoji.id === "722249250586492978"){ // Cargo Java
            if(!membro.roles.cache.some(role => role === java)) return console.log(`↳ Usuário "${membro.user.username}" ainda não tinha o cargo Java`)
            membro.roles.remove(java)
            console.log(`↳ Usuário "${membro.user.username}" removeu o cargo Java`)

        }else if(dados.d.emoji.id === "721345484035325984"){ // Cargo CSS
            if(!membro.roles.cache.some(role => role === css)) return console.log(`↳ Usuário "${membro.user.username}" ainda não tinha o cargo CSS`)
            membro.roles.remove(css)
            console.log(`↳ Usuário "${membro.user.username}" removeu o cargo CSS`)

        }else if(dados.d.emoji.id === "721345485314588744"){ // Cargo HMTL
            if(!membro.roles.cache.some(role => role === html)) return console.log(`↳ Usuário "${membro.user.username}" ainda não tinha o cargo HTML`)
            membro.roles.remove(html)
            console.log(`↳ Usuário "${membro.user.username}" removeu o cargo HTML`)

        }else if(dados.d.emoji.id === "721347830765322313"){ // Cargo C
            if(!membro.roles.cache.some(role => role === c)) return console.log(`↳ Usuário "${membro.user.username}" ainda não tinha o cargo C`)
            membro.roles.remove(c)
            console.log(`↳ Usuário "${membro.user.username}" removeu o cargo C`)
        }
    }
})

bot.on("guildMemberAdd", membro => {
    console.log(`\n■▶ [LOGS] ⇥ Novo membro no servidor. Dê as boas vindas para "${membro.user.username}"`)
    if(membro.user.bot){
        membro.roles.add("696464386071593081") // Cargo de Bots
    }else{
        var guild = bot.guilds.cache.get("696430420992066112")
        var memberCount = guild.members.cache.filter(member => !member.user.bot).size

        membro.roles.add("721103513874202645") // Cargo novato
        bot.channels.cache.get('721103116686327820').send(`Olá, ${membro.user}! \`\`\`md\n# Seja bem-vindo(a)!\n/* Faça seu cadastro aqui! */\nDigite <${config.prefix}cadastro> para começar ( sem as <> )\`\`\``)
        bot.channels.cache.get('722274694535053317').send(`✅ Membro \`${membro.user.username}\` entrou no servidor\nTotal: \`${memberCount}\``)
    }
});

bot.on("guildMemberRemove", membro => {
    console.log(`\n■▶ [LOGS] ⇥ O membro "${membro.user.username}" saiu do servidor.`)
    var guild = bot.guilds.cache.get("696430420992066112")
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size

    bot.channels.cache.get('722274694535053317').send(`❌ Membro \`${membro.user.username}\` saiu do servidor\nTotal: \`${memberCount}\``)
});

bot.on("message", async message => {   
    if(message.author.bot) return;// Se o autor foi um bot, faz nada
    if(message.channel.type == "dm") return message.channel.send("Não fala comigo por aqui..."); // Se a mensagem foi enviada por dm, não continua o código
    
    
    let prefix = config.prefix; 
    let messageArray = message.content.split(" ")
    let comando = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);
    

    if(!message.content.startsWith(prefix)) return; // Valida o prefix do comando
    if(!config.online && (comando != "help" && comando != "config")){ // Valida se o bot está online ou offline, liberando apenas o uso do comando config e help
        let off = "<:off:723707654245187665>"
        message.channel.send(`${off} Eu estou \` offline \`. Provavelmente estão fazendo alterações em mim\n> Seja paciente!`)
        console.log(`⚫ Comando enviado por "${message.author.username}" enquanto o bot está OFF`)
        return
    }
    let commandfile = bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando)) // Pega o comando escrito no arquivo de comandos
    if(commandfile) commandfile.run(bot,message,args) // Verifica se o comando existe
    else{
        message.channel.send('Comando não encontrado')
        console.log(`↳ Comando "${comando}" não encontrado`)
    }

})


bot.login(config.token);