import { EmbedBuilder } from "discord.js"
import { Roles } from "../config/roles.js"
import Entry from "../model/Entry.js"

export default {
    customId: "participate",
    async execute(interaction) {

        if(!interaction.member) {
            return interaction.reply({ content: "Member information is not available.", ephemeral: true })
        }
        if(!interaction.member._roles) {
            return interaction.reply({ content: "Role information is not available.", ephemeral: true })
        }

        const existingEntry = await Entry.findOne({ userId: interaction.user.id })
        if(existingEntry) {
            return interaction.reply({ content: "You have already registered for the giveaway.", ephemeral: true })
        }

        const roles = interaction.member._roles
        const playboyGa = hasRole(Roles.Playboy, roles)
        const gigaChadGa = hasRole(Roles.Gigachad, roles)
        const chadGa = hasRole(Roles.Chad, roles)
        const womanizerGa = hasRole(Roles.Womanizer, roles)
        const studGa = hasRole(Roles.Stoud, roles)

        const newEntry = new Entry({
            userId: interaction.user.id,
            playboyGa,
            gigaChadGa,
            chadGa,
            womanizerGa,
            studGa
        })
        // await newEntry.save()

        const embed = new EmbedBuilder().setTitle("Bae Rewards 2 Raffle").setDescription("You have successfully registered for the giveaway!").setColor(0x00AE86).addFields(
            { name: "Playboy Giveaway", value: playboyGa ? "✅" : "❌" },
            { name: "Gigachad Giveaway", value: gigaChadGa ? "✅" : "❌" },
            { name: "Chad Giveaway", value: chadGa ? "✅" : "❌" },
            { name: "Womanizer Giveaway", value: womanizerGa ? "✅" : "❌" },
            { name: "Stud Giveaway", value: studGa ? "✅" : "❌" }
        )

        return await interaction.reply({ embeds: [embed], ephemeral: true })

    }
}

const hasRole = (roleId, roles) => {
    return roles.includes(roleId)
}