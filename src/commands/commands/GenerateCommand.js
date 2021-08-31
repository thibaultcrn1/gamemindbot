const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class GenerateCommand extends BaseCommand {
  constructor() {
    super('generate', 'commands', []);
  }

  run(client, message, args) {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Vous n'avez pas la permission !");

    let rulesEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle('Règles du serveur')
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .addField(":one: Pseudonyme/Avatar", "Les pseudonymes ou Avatar à caractère pornographique sont strictement interdit sur le serveur, pour les joueurs DarkRP votre pseudonyme doit être remplacer par votre propre nom RôlePlay.")
    .addField(":two: Comportement", "Toutes insulte, propos raciste dégradant etc seront automatique supprimer suivie d'une sanction pour la personne ayant envoyer le message.")
    .addField(":three: Spamming et flooding", "Le spamming (Envoyer la même phrase plusieurs fois de suite) et le Flooding (Envoyer des lettres rapidement) sont strictement interdit sur le serveur et seras suivis d'une sanctions.")
    .addField(":four: Salons textuels", "Les salons textuels sont spétialement conçus pour nos 2 types de serveurs doivent rester en rapport avec la catégories du salon vocal, si ce n'est pas le cas, une sanction seras automatiquement appliqué.")
    .addField(":five: Publicité", "La publicité est interdite sur le serveur, cependant vous pouvez faire une demande de partenariat avec le serveur au près d'un membre du staff pour partagers votre contenue twitch ou youtube avec le serveur discord !")
    .addField(":six: R.A.I.D", "Les RAIDS ou demande de RAIDS sont strictement interdit sur le serveurs et seras automatiquement accompagné d'un bannissement définitif des personnes concernés par les raids du serveur.")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))    

    let rulesChannel = client.channels.cache.find(c => c.id === "881700036067602432")

    rulesChannel.bulkDelete(10);
    rulesChannel.send(rulesEmbed).then(msg => {
      msg.react("✅");
      msg.react("❌");
    });;

    let gamesEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Choisissez vos jeux")
    .setDescription(`Bienvenue sur le serveur GAME MIND !\nPour continuer, s'il vous plaît réagissez avec les réactions des jeux de cette liste:\n\n<:brawlhalla:882385056499384401> Brawlhalla\n<:r6:882385523329617920> R6S\n<:minecraft:882385816494686269> Minecraft\n<:cs:882386380192358431> CS:GO\n<:gtav:882386671465795675> GTAV`)
    .setFooter("GAME MIND TEAM")

    rulesChannel.send(gamesEmbed).then(msg => {
      msg.react("<:brawlhalla:882385056499384401>");
      msg.react("<:r6:882385523329617920>");
      msg.react("<:minecraft:882385816494686269>");
      msg.react("<:cs:882386380192358431>");
      msg.react("<:gtav:882386671465795675>");
    });

    return message.channel.send(`Embed envoyé dans <#881700036067602432> :thumbsup:`).then(msg => msg.delete({timeout: 3000}))
  }
}