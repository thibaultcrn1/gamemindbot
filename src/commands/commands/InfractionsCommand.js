const BaseCommand = require('../../utils/structures/BaseCommand');
const bdd = require("../../utils/datas/warns.json");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");

moment.locale("fr");

module.exports = class InfractionsCommand extends BaseCommand {
    constructor() {
        super('infractions', 'commands', []);
    }

    run(client, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Vous n'avez pas la permissions :/");

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(":x: Utilisateur introuvable :/");
        if(!bdd.warns[user.id]) return message.channel.send(":x: Cet utilisateur n'as pas de warn :/");

        let infractionsEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`**Total de warns:** ${bdd.warns[user.id].length}\n\n__**10 derniers warns**__\n\n${bdd.warns[user.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))

        return message.channel.send(infractionsEmbed);
    }
}