import { EmbedBuilder } from "@discordjs/builders"
import Entry from "../model/Entry.js"

export default {
    customId: "check",
    async execute(interaction) {

        if (!interaction.member) {
            return interaction.reply({ content: "Member information is not available.", ephemeral: true })
        }

        const existingEntry = await Entry.findOne({ userId: interaction.user.id })

        if (existingEntry) {
            const embed = new EmbedBuilder().setTitle("Bae Rewards 2 Raffle").setDescription("You have already registered for the giveaway!").setColor(0x00AE86).addFields(
                { name: "Playboy Giveaway", value: existingEntry.playboyGa ? "✅" : "❌" },
                { name: "Gigachad Giveaway", value: existingEntry.gigaChadGa ? "✅" : "❌" },
                { name: "Chad Giveaway", value: existingEntry.chadGa ? "✅" : "❌" },
                { name: "Womanizer Giveaway", value: existingEntry.womanizerGa ? "✅" : "❌" },
                { name: "Stud Giveaway", value: existingEntry.studGa ? "✅" : "❌" }
            )

            return interaction.reply({ embeds: [embed], ephemeral: true })
        } else {
            return interaction.reply({ content: "You have not registered for the giveaway.", ephemeral: true })
        }

    }
}