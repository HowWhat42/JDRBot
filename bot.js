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

    // Link new perso to discord user in the DB
    if (message.content.startsWith(prefix + "apply")) {
        const args = message.content.slice(prefix.length).split(' ')
        if (args.length != 14) {
            return message.reply(`ce n'est pas le bon format de commande`);
        }
        const user_ID = message.author.id
        let [,name, title, classe, lvl, hp, mp, fatigue, strength, stamina, agility, intelligence, perception, ap] = args
        lvl = parseInt(lvl)
        hp = parseInt(hp)
        mp = parseInt(mp)
        fatigue = parseInt(fatigue)
        strength = parseInt(strength)
        stamina = parseInt(stamina)
        agility = parseInt(agility)
        intelligence = parseInt(intelligence)
        perception = parseInt(perception)
        ap = parseInt(ap)
        brain.create_perso(user_ID, name, title, classe, lvl, hp, mp, fatigue, strength, stamina, agility, intelligence, perception, ap, [], [], function (msg) {
            message.author.send(msg)
        })
    }

    // Create a new PNJ in the DB
    if (message.content.startsWith(prefix + "pnj")) {
        const args = message.content.slice(prefix.length).split(' ')
        if (args.length != 11) {
            return message.reply(`ce n'est pas le bon format de commande`);
        }
        let [,name, classe, hp, mp, strength, stamina, agility, intelligence, perception, ap] = args
        hp = parseInt(hp)
        mp = parseInt(mp)
        strength = parseInt(strength)
        stamina = parseInt(stamina)
        agility = parseInt(agility)
        intelligence = parseInt(intelligence)
        perception = parseInt(perception)
        ap = parseInt(ap)
        brain.create_pnj(name, classe, hp, mp, strength, stamina, agility, intelligence, perception, ap, [], function (msg) {
            message.channel.send(msg)
        })
    }
})