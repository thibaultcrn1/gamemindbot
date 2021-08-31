// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  
  async run(client, reaction, user) {

    if(user.bot) return;
    if(!reaction.message.guild) return;

    let message = reaction.message;

    let target = message.guild.members.cache.get(user.id);

    if(
      "✅",
      "❌"
    ) {
      switch(reaction.emoji.name) {

        case "✅":

          let memberRole = message.guild.roles.cache.find(role => role.id === "881709317546463314");
          target.roles.add(memberRole);

          break;

        case "❌":

          reaction.users.remove(user);

          message.channel.send(`:x: Si vous n'acceptez pas les règles du serveur <@!${user.id}>, nous ne pourrez pas voir les salons du serveur :worried:`).then(msg => msg.delete({timeout: 5000}));

          break;

      }
    }

    if(reaction.emoji.id === "882385056499384401") {
    
      let brawlhallaRole = message.guild.roles.cache.find(role => role.id === "881709473373241374");
      target.roles.add(brawlhallaRole);

    }
    if(reaction.emoji.id === "882385523329617920") {

      let r6Role = message.guild.roles.cache.find(role => role.id === "881709827640918086");
      target.roles.add(r6Role);

    }
    if(reaction.emoji.id === "882385816494686269") {

      let minecraftRole = message.guild.roles.cache.find(role => role.id === "881710119753252874");
      target.roles.add(minecraftRole);

    }
    if(reaction.emoji.id === "882386380192358431") {

      let csRole = message.guild.roles.cache.find(role => role.id === "882037774247661568");
      target.roles.add(csRole);

    }
    if(reaction.emoji.id === "882386671465795675") {

      let gtavRole = message.guild.roles.cache.find(role => role.id === "882038377694760980");
      target.roles.add(gtavRole);

    }


  }
}