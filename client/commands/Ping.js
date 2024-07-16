const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Shows the bot ping',
    run: async (client, interaction) => {

        const message = await interaction.reply({ content: 'Pinging...', fetchReply: true })
        const ping = message.createdTimestamp - interaction.createdTimestamp

        message.edit({ content: `Pong! Bot Latency: ${ping}ms, API Latency: ${client.ws.ping}ms` })

    }
}