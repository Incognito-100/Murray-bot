import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'kicks a user',

    requireRoles: true,

    slash: true,
    testOnly: true,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, interaction, args}) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            return {
                custom: true,
                context: 'can not kick that user',
                ephemeral: true
            }
        }

        if (!target.kickable) {
            return 'cannot kick that user'
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)

        return {
            custom: true,
            content: `You kicked <@${target.id}>`,
            ephemeral: false
        }
    }
} as ICommand