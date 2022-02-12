import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import 'dotenv/config'

const client = new DiscordJS.Client({
  intents:[
      Intents.FLAGS.GUILDS, 
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})

client.on('ready', () => {
    console.log('the bot is ready')

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    typeScript: true,
    testServers: ['838405624822890506'],
    mongoUri: process.env.MONGO_URI
  })
})

client.login(process.env.TOKEN)