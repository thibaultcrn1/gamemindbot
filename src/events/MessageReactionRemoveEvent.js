// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
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
          target.roles.remove(memberRole);

          break;

        case "❌":

          reaction.users.remove(user);

          break;

      }
    }

    if(reaction.emoji.id === "882385056499384401") {
    
      let brawlhallaRole = message.guild.roles.cache.find(role => role.id === "881709473373241374");
      target.roles.remove(brawlhallaRole);

    }
    if(reaction.emoji.id === "882385523329617920") {

      let r6Role = message.guild.roles.cache.find(role => role.id === "881709827640918086");
      target.roles.remove(r6Role);

    }
    if(reaction.emoji.id === "882385816494686269") {

      let minecraftRole = message.guild.roles.cache.find(role => role.id === "881710119753252874");
      target.roles.remove(minecraftRole);

    }
    if(reaction.emoji.id === "882386380192358431") {

      let csRole = message.guild.roles.cache.find(role => role.id === "882037774247661568");
      target.roles.remove(csRole);

    }
    if(reaction.emoji.id === "882386671465795675") {

      let gtavRole = message.guild.roles.cache.find(role => role.id === "882038377694760980");
      target.roles.remove(gtavRole);

    }

  }
}