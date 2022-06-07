import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes multiple messages at once.',
    
    permissions: ['ADMINISTRATOR'],

    maxArgs: 1,
    expectedArgs: '[amount]',

    slash: true,
    testOnly: true,

    callback: async ({interaction, channel, args}) => {
        const amount = args.length ? parseInt(args.shift()!) : 1

        const {size} = await channel.bulkDelete(amount, true)

        interaction.reply({
            content: `${size} message(s) deleted`,
            ephemeral: true,
        })
    }
} as ICommand