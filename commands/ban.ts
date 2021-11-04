import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'bans a user',

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
                context: 'can not ban that user',
                ephemeral: true
            }
        }

        if (!target.bannable) {
            return 'cannot ban that user'
        }

        args.shift()
        const reason = args.join(' ')

        target.ban({
            reason,
            days: 7,
        })

        return {
            custom: true,
            content: `You banned <@${target.id}>`,
            ephemeral: false
        }
    }
} as ICommand