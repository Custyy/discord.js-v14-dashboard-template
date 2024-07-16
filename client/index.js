const Discord = require('discord.js')
const client = global.client = new Discord.Client({ intents: 32767 })
const fs = require('node:fs')
const axios = require('axios')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

const files = fs.readdirSync('./client/commands').filter(file => file.endsWith('.js'))
var props;

for (var file in files) {
    props = require(`./commands/${files[file]}`)
    client.commands.set(props.name, props)
    console.log(`(*): Loaded command: ${props.name}.`)
}

const allFiles = client.commands.map(command => {
    return { name: command.name, description: command.description, options: command.options }
})

client.on('interactionCreate', async interaction => {
    
    if (!interaction.isCommand()) return;
    if (!client.commands.get(interaction.commandName)) return

    client.commands.get(interaction.commandName).run(client, interaction)
})

client.on('ready', async () => {
    client.user.setActivity({ type: Discord.ActivityType.Playing, name: 'Change index.js:31' })
    console.log(`(*): Logged in as ${client.user.tag}.`)
    client.application.commands.set(allFiles)
})

client.login(config.client.token).catch(() => {
    console.log('(*): Please check bot token.')
    process.exit(0)
})

process.on('uncaughtException', (err) => {
    if (err === 'DiscordAPIError: Missing Access') return console.log(`(!): ${err}`)
    console.log(err)
})