const BaseCommand = require('../../utils/structures/BaseCommand');
const moment = require("moment");
const { MessageEmbed } = require("discord.js");

moment.locale('fr');

module.exports = class ReportCommand extends BaseCommand {
    constructor() {
        super('report', 'commands', []);
    }

    run(client, message, args) {
        let reportedUser = message.mentions.users.first();
        if(!reportedUser) return message.channel.send(":x: Vous n'avez pas mentionner d'utilisateur !")
        if(reportedUser.id === message.author.id) return message.channel.send(":x: Vous ne pouvez pas vous report.");

        let reportChannel = message.guild.channels.cache.find(c => c.id === "882700013367611463");

        let reason = args.slice(1).join(" ");
        if(!reason) return message.channel.send(":x: Vous n'avez pas mentionner de raison pour votre report !");

        let userReportEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Bonjour **${message.author.tag}**, Nous avons bien reçu votre report :thumbsup:, le staff du serveur s'occupe de tout.\n\nServeur: **${message.guild.name}**\nUtilisateur ciblé: **${reportedUser} (ID: ${reportedUser.id})**\nRaison: **${reason}**\nChannel: <#${message.channel.id}>\nDate: **${moment(Date.now()).format('DD/MM/YYYY HH:MM:SS')}**\n\nMerci.`)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))


        let reportEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(reportedUser.username, reportedUser.displayAvatarURL({dynamic: true}))
        .setTitle("NOUVEAU REPORT")
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .addField("Auteur du report", `<@!${message.author.id}>\n(ID: ${message.author.id})`, true)
        .addField("Utilisateur ciblé", `<@!${reportedUser.id}>\n(ID: ${reportedUser.id})`, true)
        .addField("Raison", `**${reason}**`, true)
        .addField("Date", moment(Date.now()).format('DD/MM/YYYY HH:MM:SS'), true)
        .addField("Channel", `<#${message.channel.id}>`, true)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

        message.channel.send(`:thumbsup: J'ai reçu votre demande, l'utilisateur **${reportedUser.tag}** à été report, regardez vos DMs !`)
        message.author.send(userReportEmbed).then(reportChannel.send(reportEmbed));

    }
}