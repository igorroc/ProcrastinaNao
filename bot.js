const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('config.json')
const dbConfig = low(adapter)


function emojiStr (id){
    return client.emojis.get(id).toString();
}
function emojiTrue (id){
    return client.emojis.get(id);
}

client.once("ready", () => {
    console.log("\n\n\n\n= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =")
    console.log(`Bot foi iniciado, com ${client.users.size} usuarios, em ${client.channels.size} canais, e em ${client.guilds.size} servidores`);
    console.log("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =\n\n")
    client.user.setActivity(`| Digite ${dbConfig.get('prefix').value()}help para ajuda | Criado por Igor Rocha |`)
});

client.on("raw", async dados =>{
    if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if(dados.d.message_id != "721347287426793494") return

    let servidor = client.guilds.get("696430420992066112")
    let membro = servidor.members.get(dados.d.user_id)

    let python = servidor.roles.get('721102448483369140'),
        javascript = servidor.roles.get('721179010767388682'),
        java = servidor.roles.get('721176368964173835'),
        css = servidor.roles.get('721177136655892632'),
        html = servidor.roles.get('721346290369167460'),
        c = servidor.roles.get('721115106871738408')

    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === "696478679391272961"){
            if(membro.roles.has(python)) return
            membro.addRole(python)

        }else if(dados.d.emoji.name === "721349573901287445"){
            if(membro.roles.has(javascript)) return
            membro.addRole(javascript)

        }else if(dados.d.emoji.id === "721349577143222272"){
            if(membro.roles.has(java)) return
            membro.addRole(java)

        }else if(dados.d.emoji.id === "721345484035325984"){
            if(membro.roles.has(css)) return
            membro.addRole(css)

        }else if(dados.d.emoji.id === "721345485314588744"){
            if(membro.roles.has(html)) return
            membro.addRole(html)

        }else if(dados.d.emoji.id === "721347830765322313"){
            if(membro.roles.has(c)) return
            membro.addRole(c)
        }
    }
    if(dados.t === "MESSAGE_REACTION_REMOVE"){
        if(dados.d.emoji.id === "696478679391272961"){
            if(membro.roles.has(python)) membro.removeRole(python)

        }else if(dados.d.emoji.name === "721349573901287445"){
            if(membro.roles.has(javascript)) membro.removeRole(javascript)

        }else if(dados.d.emoji.id === "721349577143222272"){
            if(membro.roles.has(java)) membro.removeRole(java)

        }else if(dados.d.emoji.id === "721345484035325984"){
            if(membro.roles.has(css)) membro.removeRole(css)

        }else if(dados.d.emoji.id === "721345485314588744"){
            if(membro.roles.has(html)) membro.removeRole(html)

        }else if(dados.d.emoji.id === "721347830765322313"){
            if(membro.roles.has(c)) membro.removeRole(c)
        }
    }
})

client.on("guildMemberAdd", membro => {
    console.log(`Um novo membro entrou no servidor: ${membro.nickname}`)
    membro.addRole("721103513874202645")
});

client.on("message", async message => {
    const agree = "✅";
    const disagree = "❌";
    
    if(message.author.bot) return;//se o autor foi um bot, faz nada
    if(message.channel.type == "dm") return message.channel.send("Não fala comigo por aqui..."); //se a mensagem foi enviada por dm, n faz nada
    
    const validaPrefix = message.content.slice(0,config.prefix.length)
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // retira o prefixo da mensagem
    const comando = args.shift().toLowerCase(); // muda pra todas minusculas


    if(validaPrefix != dbConfig.get('prefix').value()) return;

    if(comando == "help"){
        console.log("Help")
        message.channel.send(`\`\`\`md\n# Coisas que eu sei fazer:\`\`\`\`\`\`md\n`
        +`${dbConfig.get('prefix').value()}decida <pergunta>\n`
        +`/* Você faz uma pergunta e eu vou responde-la! *\n\n`

        +`${dbConfig.get('prefix').value()}soma <valores>\n`
        +`/* Faço a soma de todos os números que você digitar! *\n\n`
                            
        +`${dbConfig.get('prefix').value()}vote <tempo> <pergunta>\n`
        +`/* Cria um pool para votação, que fica aberto pelo tempo determinado. *\n\n`

        +`${dbConfig.get('prefix').value()}ping\n`
        +`/* Verifico o meu ping! *\`\`\`\`\`\`md\n`
        +`# Para mais informações sobre os comandos, digite o comando sem argumento nenhum.\n`
        +`# Exemplo:  ${dbConfig.get('prefix').value()}decida\n\`\`\``)
        
        if(message.member.hasPermission("ADMINISTRATOR")){
            let confirmacao1 = await message.channel.send("```md\n\n\n# Você quer ver os comandos de ADM?```");
            await confirmacao1.react(disagree).then(r => {
                    confirmacao1.react(agree)
            });

            confirmacao1.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == agree || reaction.emoji.name == disagree),
            { max: 1, time: 5000 }).then(collected => {
                    if (collected.first().emoji.name == agree) {
                        message.channel.send(`\`\`\`md\n# Comandos especiais:\`\`\`\`\`\`md\n`
                        +`${dbConfig.get('prefix').value()}dltmsg\n`
                        +`/* Deleta as ultimas mensagens daquele canal de texto *\n\n`
                        
                        +`${dbConfig.get('prefix').value()}msg <id_canal> <mensagem>\n`
                        +`/* Envio a mensagem que você escreveu para o canal que você escolher *\n\n`
                        
                        +`${dbConfig.get('prefix').value()}prefix <novo_prefix>\n`
                        +`/* Altero o prefixo utilizado por mim *\n\n`

                        +`${dbConfig.get('prefix').value()}edit <id_do_canal> <id_da_mensagem> <mensagem_nova>\n`
                        +`/* Edito uma mensagem enviada por mim mesmo *\n\n`

                        +`${dbConfig.get('prefix').value()}emoji <id_do_emoji>\n`
                        +`/* Envio o emoji desejado no canal que você está *\n\n`
                        
                        +`${dbConfig.get('prefix').value()}react <id_canal> <id_mensagem> <emoji>\n`
                        +`/* Reajo com o emoji escolhido na mensagem escolhida! *\`\`\``)
                        confirmacao1.delete();
                    }else{
                        confirmacao1.delete();
                    }
            }).catch(() => {
                confirmacao1.delete();
            });
            
        }
    }
    
    else if(comando == "config"){
        if(!message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(`Você não é digno...`);
        }else{
            if(!args[0]){
                // mostra a config atual
            }else{
                if(args[0] == "twitter"){

                }
            }
        }
    }

    else if(comando == "ping"){
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A latencia é de ${m.createdTimestamp - message.createdTimestamp}ms. A latencia da API é ${Math.round(client.ping)}ms`);
        console.log(`Ping! Pong! Latencia: ${m.createdTimestamp - message.createdTimestamp}ms , API: ${Math.round(client.ping)}ms`)
    }

    else if(comando == "soma" || comando == "s"){
        let i
        let soma = 0
        if(!args[0]){
            message.channel.send(`\`\`\`md\n# Eu calculo!\n${dbConfig.get('prefix').value()}soma <valores>\n\n< Exemplo: >\n${dbConfig.get('prefix').value()}soma 10 2 3 -2 1\`\`\`\`\`\`md\n# Esse comando é basicamente uma calculadora que só soma e subtrai.\`\`\`\`\`\`md\n# Variações:\n${dbConfig.get('prefix').value()}soma\n${dbConfig.get('prefix').value()}s\`\`\``)
            return;
        }
        for(i = 0; i < args.length; i++){
            soma += parseInt(args[i])
        }
        return message.channel.send(`\`\`\`md\n# Soma = ${soma}\n\`\`\``)
    }

    else if(comando == "msg"){
        let [canal] = args
        if(!canal)[
            message.channel.send(`\`\`\`md\n# Para enviar uma mensagem em um canal especifico, digite:\n${dbConfig.get('prefix').value()}msg <id_do_canal> <mensagem>\`\`\``)
        ]
        else if(!client.channels.get(canal)){
            message.channel.send(`\`\`\`md\nCanal nao encontrado\`\`\``)
        }else{
            let msg = args.slice(1).join(" ");
            client.channels.get(canal).send(msg)
        }
        message.delete();
    }

    else if(comando == "edit"){
        let [channelId, msgId] = args
        if(!args[2]){
            message.channel.send(`\`\`\`md\nFaltam argumentos\`\`\``)
        }
        message.guild.channels.get(channelId).fetchMessages({around: msgId, limit: 1})
        .then(msg => {
            const fetchedMsg = msg.first();
            fetchedMsg.edit(args.slice(2).join(" "));
        }).catch((error) => {
            console.log(error)
            message.reply('Ocorreu um erro')
        });
    }
    
    else if(comando == "dltmsg"){
        console.log("Apagando mensagens")
        if(!message.member.hasPermission("ADMINISTRATOR")){ // se nao tem permissao para apagar
            let onlineMembers = message.guild.members.filter(m => m.presence.status === 'online').size-1;

            if(onlineMembers >= 3){
                let confirmacao = await message.reply(`você não tem permissão para realizar esse comando, porém se 70% das pessoas online aceitarem, as mensagens serão deletadas!`);
                await confirmacao.react(disagree);
                await confirmacao.react(agree);


                let resposta = await confirmacao.awaitReactions(reaction => reaction.emoji.name == agree || reaction.emoji.name == disagree, {time: 10000});

                if(!resposta.get(agree)){
                    message.channel.send(`As mensagens não serão apagadas.`)
                }else{
                    if((resposta.get(agree).count-1 > (onlineMembers-1)*0.7)){
                        console.log(`Apagando mensagens do canal: ${message.channel.name}`)
                        message.channel.send("Apagando mensagens...")
                        try{
                            const encontradas = await message.channel.fetchMessages({ limit: 100 });
                            const naoFixas = encontradas.filter(fetchedMsg => !fetchedMsg.pinned);
                        
                            await message.channel.bulkDelete(naoFixas, true);
                            console.log(`Foram apagadas ${naoFixas.size} mensagens!`)
                        }catch(err) {
                            console.error(err);
                        }
                    }else{
                        message.channel.send(`As mensagens não serão apagadas.`)
                    }
                }
                confirmacao.delete();
                return;
            }else{
                message.reply(`você não tem permissão para usar esse comando com menos de 3 pessoas online.`)
                return;
            }
        }
        else{
            let confirmacao = await message.channel.send(`${emojiStr("708135676339552278")}Apagando mensagens...`)
            const user = message.mentions.users.first();
            // Parse Amount
            const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
            if (!amount) return message.reply('Você deve indicar uma quantidade!');
            if (!amount && !user) return message.reply('Você deve indicar um usuario e/ou uma quantidade!');
            // Fetch 100 messages (will be filtered and lowered up to max amount requested)
            message.channel.fetchMessages({
                limit: 100,
                }).then((messages) => {
                    if (user) {
                        const filterBy = user ? user.id : Client.user.id;
                        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                    }
                    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                });
            await confirmacao.delete();
        }
    }

    else if(comando == "prefix"){
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.reply('Você não é digno de realizar esse comando!');
        }else{
            let [novoPrefix] = args
            if(!novoPrefix){
                message.channel.send(`\`\`\`md\n# O prefixo atual desse servidor é:\n${config.prefix}\n\n# Para resetar, digite:\n${config.prefix}prefix reset\n\n# Para alterar, digite:\n${config.prefix}prefix <novo_prefix>\`\`\``)
            }else if(novoPrefix == "reset"){
                await dbConfig.set('prefix', '.').write()
                console.log(`Prefix resetado para .`)
                message.channel.send(`\`\`\`md\n# Prefix do servidor resetado para:\n.\`\`\``)
            }else if(args[1]){
                message.channel.send(`\`\`\`md\n# Não é possivel adicionar um prefixo com um espaço em branco.\`\`\``);
            }else{
                await dbConfig.set('prefix', novoPrefix).write()
                console.log(`Prefix alterado para ${novoPrefix}`)
                message.channel.send(`\`\`\`md\n# Prefix do servidor alterado para:\n${novoPrefix}\`\`\``);
            }
        }
        client.user.setActivity(`| Digite ${dbConfig.get('prefix').value()}help para ajuda | Criado por Igor Rocha |`)
    }

    else{
        console.log("Comando não existente")
        message.channel.send(`Não sou digno de realizar o comando "${comando}". Desculpe 😔`)
    }

})


client.login(config.token);