const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require("fs");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");

moment.locale("fr");

module.exports = class WarnCommand extends BaseCommand {
    constructor() {
        super('warn', 'commands', ['warns', 'create-warn', 'add-warn']);
    }

    async run(client, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Vous n'avez pas la permission.");
        
        const bdd = require("../../utils/datas/warns.json");

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(":x: Utilisateur introuvable :/");

        const reason = args.slice(1).join(" ");
        if(!reason) return message.channel.send(":x: Vous n'avez pas mentionner de raison :/");

        let logChannel = message.guild.channels.cache.find(c => c.name === "📰logs");
        if(!logChannel) return message.channel.send(":x: Je ne trouve pas le channel `📰logs` sur le serveur :/");

        function userMessage(user) {
            let userEmbed = new MessageEmbed()
            .setDescription(`**NOUVEAU WARN !**\nServeur: ${message.guild.name}\nModérateur: <@!${message.author.id}>\nRaison: **${reason}**`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(user.tag, user.displayAvatarURL({dynamic: true}));

            if(user.id !== client.user.id) {
                user.send(userEmbed);
            }
        }

        function logMessage(user) {
            let logEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("WARN")
            .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addField("Informations", `Membre: <@!${user.id}>\nRaison: **${reason}**\nModérateur: <@!${message.author.id}>\nHeure: **${moment(Date.now()).format('HH:MM:SS DD/MM/YYYY')}**`, true)
            .addField("Serveur", message.guild.name, true);

            logChannel.send(logEmbed);
        }

        try {
            if(!bdd.warns[user.id]) bdd.warns[user.id] = []

            bdd.warns[user.id].unshift({
                reason, 
                date: Date.now(),
                mod: message.author.id
            })

            fs.writeFileSync('./src/utils/datas/warns.json', JSON.stringify(bdd));
            message.channel.send(`L\'utilisateur <@!${user.id}> a été warn pour raison: **${reason}** :thumbsup:`);
            logMessage(user);
            userMessage(user);
        } catch(err) {
            return console.error('[ERREUR] ' + err);
        }
    }
}