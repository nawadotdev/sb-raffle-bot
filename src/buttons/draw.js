import { PermissionFlagsBits } from "discord.js"

export default {
    customId: "draw",
    async execute(interaction) {

        if (!interaction.member) {
            return interaction.reply({ content: "Member information is not available.", ephemeral: true })
        }
        if (!isAdmin(interaction.member.permissions)) {
            return interaction.reply({ content: "You do not have permission to draw winners.", ephemeral: true })
        }

        return interaction.reply({ content: "Drawing winners is not implemented yet.", ephemeral: true })
    }
}

const isAdmin = (permissions) => {
    return permissions.has(PermissionFlagsBits.Administrator)
}