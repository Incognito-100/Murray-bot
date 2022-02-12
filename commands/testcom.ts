import { GuildMember } from "discord.js"
import { ICommand } from "wokcommands"

export default {
    category: "Moderation",
    description: 'test',
    
    requireRoles: true,

    slash: true,
    testOnly: true,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({message, interaction, args}) => {
        const target = message ? message.mentions.members.first() : interaction.options.getMember('User') as GuildMember
        if (!target) {
            return {
                ephemeral: true,
                custom: true,
                context: 'feeee',
            }
        }
    }
}