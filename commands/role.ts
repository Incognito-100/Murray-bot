import { ICommand } from "wokcommands"

const actions = ['give', 'remove', 'has']

export default {
    category: 'configuration',
    description: 'Gives a role to a user',
    
    permissions: ['MANAGE_ROLES'],

    minArgs: 3,
    expectedArgs: `<"${actions.join('", "')}"> <user @> <role@>`, 

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    options: [
      {
        name: 'action',
        description: `The action to perform. one of: ${actions.join(', ')}`,
        type: 'STRING',
        required: true,
        choices: actions.map((action) => ({
          name: action,
          value: action,
      })),
    },
    {
      name:'user',
      description: 'The user to perform the action on',
      type: 'USER',
      required: true,
    },
    {
      name:'role',
      description: 'The role to perform the action on',
      type: 'ROLE',
      required: true,
    },  
  ],
  
  callback: ({ guild, args }) => {
    const action = args.shift()
    if (!action || !actions.includes(action)) {
      return `unknown action! Please use one of the following: ${actions.join(
        ', '
      )}`
    }

    const memberId = args.shift()!.replace(/[<@!&>]/g, '')
    const roleId = args.shift()!.replace(/[<@!&>]/g, '')

    const member = guild!.members.cache.get(memberId)
    const role = guild!.roles.cache.get(roleId)

    if (!member) {
      return `could not find a member with the ID ${memberId}`
    }

    if (!role) {
      return `could not find a role with the ID ${roleId}`
    }

    if (action === 'has') {
      return member.roles.cache.has(roleId)
      ? 'user has role'
      : 'user dose not have role'
    }

    if (action === 'give') {
      member.roles.add(role)
      return 'Role given'
    }

    if (action === 'remove') {
      member.roles.remove(role)
      return 'Role removed'
    }

    return 'unknown action'
  },
} as ICommand
