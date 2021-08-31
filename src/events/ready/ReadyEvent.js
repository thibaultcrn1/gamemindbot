const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require("discord.js");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log("[LOG] " + client.user.tag + ' est en ligne');

    const prefix = client.prefix;

    let statuses = [
      `${prefix}help`,
      `${client.guilds.cache.size} Serveur(s) 👽`
    ]

    setInterval(function() {
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setPresence({
        activity: {
          name: status,
          type: 'LISTENING'
        },
        status: "dnd"
      });
    }, 3000)

  }
}