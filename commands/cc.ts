import { ICommand } from "wokcommands";

export default {
    category: 'moderation',
    description: 'deletes a set amount of messages',

    permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',

    slash: true,
    testOnly: true,

    callback: async ({ message, interaction, channel, args }) => {
        const amount = args.length ? parseInt(args.shift()!) : 10

        if (message) {
            await message.delete()
        }

        const { size } = await channel.bulkDelete(amount, true)

        const reply = `Deleted ${size} message(s)`

        if (interaction) {
            return reply
        }

        channel.send(reply)
    }
} as ICommand