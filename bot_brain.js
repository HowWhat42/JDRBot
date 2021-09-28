const { MessageEmbed } = require('discord.js')
const db = require('./db_management')

function create_perso(user_ID, name, title, classe, lvl, hp, mp, fatigue, strength, stamina, agility, intelligence, perception, skills, inventory = [], callback) {
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
            .setThumbnail("https://i.imgur.com/hNJX2pN.png")
        callback(embed)
    })
}

function show_perso(name, callback) {
    const info = {
        name,
    }
    db.get("jdr", "players", info, function (res) {
        const embed = new MessageEmbed()
            .setTitle(name)
            .setAuthor(res.classe)
            .setDescription(`Titre : ${res.title}`)
            .addField("HP", res.stats.hp, true)
            .addField("MP", res.stats.mp, true)
            .addField("Level", res.lvl, true)
            .addField("Fatigue", res.stats.fatigue)
            .addField("Force", res.stats.strength, true)
            .addField("Stamina", res.stats.stamina, true)
            .addField("Agilité", res.stats.agility, true)
            .addField("Intelligence", res.stats.intelligence, true)
            .addField("Perception", res.stats.perception, true)
            .setThumbnail("https://i.imgur.com/hNJX2pN.png")
        callback(embed)
    })
}

function create_pnj(name, classe, hp, mp, strength, stamina, agility, intelligence, perception, skills, callback) {
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
            .setThumbnail("https://i.imgur.com/hNJX2pN.png")
        callback(embed)
    })
}

function show_pnj(name, callback) {
    const info = {
        name,
    }
    db.get("jdr", "pnj", info, function (res) {
        const embed = new MessageEmbed()
            .setTitle(name)
            .setAuthor(res.classe)
            .addField("HP", res.stats.hp, true)
            .addField("MP", res.stats.mp, true)
            .addField("Force", res.stats.strength, true)
            .addField("Stamina", res.stats.stamina, true)
            .addField("Agilité", res.stats.agility, true)
            .addField("Intelligence", res.stats.intelligence, true)
            .addField("Perception", res.stats.perception, true)
            .setThumbnail("https://i.imgur.com/hNJX2pN.png")
        callback(embed)
    })
}

exports.create_perso = create_perso
exports.show_perso = show_perso
exports.create_pnj = create_pnj
exports.show_pnj = show_pnj