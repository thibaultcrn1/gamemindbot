const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require("fs")
const moment = require("moment")
const { MessageEmbed } = require("discord.js");

moment.locale("fr");

module.exports = class UnwarnCommand extends BaseCommand {
    constructor() {
        super('unwarn', 'commands', ['delete-warn', 'remove-warn']);
    }

    run(client, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Vous n'avez pas la permission :/");

        const bdd = require("../../utils/datas/warns.json");

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(":x: Utilisateur introuvable :/");

        if(!bdd.warns[user.id]) return message.channel.send(":x: Cet utilisateur n'as pas de warn :/");
          

        let logChannel = message.guild.channels.cache.find(c => c.name === "📰logs");
        if(!logChannel) return message.channel.send(":x: Je ne toruve pas le channel `📰logs` sur le serveur :/");

        function logMessage(user, reason) {
            let logEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("UNWARN")
            .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addField("Informations", `Membre: <@!${user.id}>\nRaison: **${reason}**\nModérateur: <@!${message.author.id}>\nDate: **${moment(Date.now()).format("HH:MM:SS DD/MM/YYYY")}**`, true)
            .addField("Serveur", message.guild.name, true)

            logChannel.send(logEmbed);
        }

        try {

            const warnIndex = parseInt(args[1], 10) - 1;
            if(warnIndex < 0 || !bdd.warns[user.id][warnIndex]) return message.channel.send(":x: Ce warn n\'existe pas :/")

            const { reason } = bdd.warns[user.id].splice(warnIndex, 1)[0]
            if(!bdd.warns[user.id].length) delete bdd.warns[user.id]
            fs.writeFileSync("./src/utils/datas/warns.json", JSON.stringify(bdd));

            message.channel.send(`J'ai unwarn l'utilisateur <@!${user.id}> du warn n°**${warnIndex + 1}** :thumbsup:`);
            logMessage(user, reason);
        } catch(err) {
            return console.error('[ERREUR] ' + err);
        }
    }
}