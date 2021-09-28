const dotenv = require('dotenv')
const { Client, MessageEmbed, Collection } = require('discord.js')
const brain = require('./bot_brain')

dotenv.config()
const bot = new Client()
const TOKEN = process.env.TOKEN
const prefix = "/"

bot.login(TOKEN)
bot.commands = new Collection();

// Set the activity of the bot
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)
    console.log('I am ready!')
    bot.user.setPresence({
        status:'online',
        activity: {
            name: "/help",
            type: "PLAYING"
        }
    })
})

// Tell when bot disconnect
bot.on('disconnect', () => {
    console.log('Disconnect')
})

bot.on("message", message => {
    if (!message.guild) return

    if (message.author.bot) return

    if (message.content === prefix + "help") {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Commandes:')
                    .addField('/apply [nom] [titre] [classe] [lvl] [hp] [mp] [fatigue] [strength] [stamina] [agility] [intelligence] [perception]', "Ajoute un personnage à un utilisateur en demandant la classe le rôle et la spé")
                    .addField('/show perso [nom]', "Affiche les stats d'un perso")
                    .addField('/create pnj [nom] [classe] [hp] [mp] [strength] [stamina] [agility] [intelligence] [perception]', "Ajoute un PNJ dans la base de données")
                    .addField('/show pnj [nom]', "Affiche les stats d'un PNJ")
                message.delete();
                message.author.send(embed);
    }

    // Link new perso to discord user in the DB
    if (message.content.startsWith(prefix + "create perso")) {
        const args = message.content.slice(prefix.length).split(' ')
        if (args.length != 13) {
            return message.reply(`ce n'est pas le bon format de commande`);
        }
        const user_ID = message.author.id
        let [,name, title, classe, lvl, hp, mp, fatigue, strength, stamina, agility, intelligence, perception] = args
        lvl = parseInt(lvl)
        hp = parseInt(hp)
        mp = parseInt(mp)
        fatigue = parseInt(fatigue)
        strength = parseInt(strength)
        stamina = parseInt(stamina)
        agility = parseInt(agility)
        intelligence = parseInt(intelligence)
        perception = parseInt(perception)
        brain.create_perso(user_ID, name, title, classe, lvl, hp, mp, fatigue, strength, stamina, agility, intelligence, perception, [], [], function (msg) {
            message.author.send(msg)
        })
    }

    // Show a Perso in the DB
    if (message.content.startsWith(prefix + "show perso")) {
        const args = message.content.slice(prefix.length).split(' ')
        if (args.length != 3) {
            return message.reply(`ce n'est pas le bon format de commande`);
        }
        let name = args[2]
        brain.show_perso(name, function (msg) {
            message.channel.send(msg)
        })
    }

    // Create a new PNJ in the DB
    if (message.content.startsWith(prefix + "create pnj")) {
        const args = message.content.slice(prefix.length).split(' ')
        if (args.length != 10) {
            return message.reply(`ce n'est pas le bon format de commande`);
        }
        let [,name, classe, hp, mp, strength, stamina, agility, intelligence, perception] = args
        hp = parseInt(hp)
        mp = parseInt(mp)
        strength = parseInt(strength)
        stamina = parseInt(stamina)
        agility = parseInt(agility)
        intelligence = parseInt(intelligence)
        perception = parseInt(perception)
        brain.create_pnj(name, classe, hp, mp, strength, stamina, agility, intelligence, perception, [], function (msg) {
            message.channel.send(msg)
        })
    }

    // Show a PNJ in the DB
    if (message.content.startsWith(prefix + "show pnj")) {
        const args = message.content.slice(prefix.length).split(' ')
        if (args.length != 3) {
            return message.reply(`ce n'est pas le bon format de commande`);
        }
        let name = args[2]
        brain.show_pnj(name, function (msg) {
            message.channel.send(msg)
        })
    }
})