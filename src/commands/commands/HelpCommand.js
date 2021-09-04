const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageEmbed } = require("discord.js");

module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super('help', 'commands', []);
    }

    run(client, message, args) {
        const prefix = "g!";

        if(!args[0]) {
            let helpEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Commandes de GAMEMIND'BOT", client.user.displayAvatarURL({dynamic: true}))
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .addField("Commandes", `\`${prefix}help commands\``, true)
            .addField("Modérateur", `\`${prefix}help moderator\``, true)

            return message.channel.send(helpEmbed);
        } else if(args[0] === "commands") {
            let helpEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Commandes")
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`\`${prefix}report @USER RAISON\`\nReporté un utilisateur au staff du serveur.\n\n\`${prefix}help\`\nVoir les commandes du bot.`)

            return message.channel.send(helpEmbed);
        } else if(args[0] === "moderator") {
            let helpEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Commandes Modérateur")
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`\`${prefix}warn @USER RAISON\`\nWarn un utilisateur.\n\n\`${prefix}unwarn @USER NUMÉRO_DU_WARN\`\nUnwarn un utilisateur.\n\n\`${prefix}infractions @USER\`\nVoir les warns d'un utilisateur.`)

            return message.channel.send(helpEmbed);
        } else {
            let helpEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(":x: Section introuvable :/")

            return message.channel.send(helpEmbed);
        }
    }
}