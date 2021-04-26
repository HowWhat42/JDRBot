const dotenv = require("dotenv")
dotenv.config()
const { Client, MessageEmbed, Collection } = require('discord.js')
const client = new Client()
const TOKEN = process.env.TOKEN
const prefix = "/"

client.login(TOKEN)
client.commands = new Collection();

// Set the activity of the bot
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log('I am ready!')
    client.user.setPresence({
        status:'online',
        activity: {
            name: "/help",
            type: "PLAYING"
        }
    })
})

client.on("message", message => {
    if (!message.guild) return

    if (message.author.bot) return
})