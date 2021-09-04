const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = class WarnCommand extends BaseCommand {
    constructor() {
        super('warn', 'commands', ['warns', 'create-warn', 'add-warn']);
    }

    async run(client, message, args) {
        
    }
}