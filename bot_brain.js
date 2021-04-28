const { MessageEmbed } = require('discord.js')
const db = require('./db_management')
function create_perso(user_ID, name, title, classe, lvl, hp, mp, fatigue, strength, stamina, agility, intelligence, perception, ap, skills, inventory = [], callback) {
    const info = {
        user_ID,
        name,
    }
    const value = {
        user_ID,
        name,
        title,
        classe,
        lvl,
        "stats": {
            hp,
            mp,
            fatigue,
            strength,
            stamina,
            agility,
            intelligence,
            perception,
            ap
        },
        skills,
        inventory
    }
    const base = { $set: value }
    db.set("jdr", "players", info, base, function () {
        const embed = new MessageEmbed()
            .setTitle(name)
            .setAuthor(classe)
            .setDescription(`Titre : ${title}`)
            .addField("HP", hp, true)
            .addField("MP", mp, true)
            .addField("Level", lvl, true)
            .addField("Fatigue", fatigue)
            .addField("Force", strength, true)
            .addField("Stamina", stamina, true)
            .addField("Agilité", agility, true)
            .addField("Intelligence", intelligence, true)
            .addField("Perception", perception, true)
            // .addField("AP", ap, true)
            .setThumbnail("https://i.imgur.com/hNJX2pN.png")
        callback(embed)
    })
}

function create_pnj(name, classe, hp, mp, strength, stamina, agility, intelligence, perception, ap, skills, callback) {
    const info = {
        name,
    }
    const value = {
        name,
        classe,
        "stats": {
            hp,
            mp,
            strength,
            stamina,
            agility,
            intelligence,
            perception,
            ap
        },
        skills,
    }
    const base = { $set: value }
    db.set("jdr", "pnj", info, base, function () {
        const embed = new MessageEmbed()
            .setTitle(name)
            .setAuthor(classe)
            .addField("HP", hp, true)
            .addField("MP", mp, true)
            .addField("Force", strength, true)
            .addField("Stamina", stamina, true)
            .addField("Agilité", agility, true)
            .addField("Intelligence", intelligence, true)
            .addField("Perception", perception, true)
            // .addField("AP", ap, true)
            .setThumbnail("https://i.imgur.com/hNJX2pN.png")
        callback(embed)
    })
}

exports.create_perso = create_perso
exports.create_pnj = create_pnj