import { EmbedBuilder, PermissionFlagsBits } from "discord.js"
import Entry from "../model/Entry.js"

export default {
    customId: "draw",
    async execute(interaction) {

        if (!interaction.member) {
            return interaction.reply({ content: "Member information is not available.", ephemeral: true })
        }
        if (!isAdmin(interaction.member.permissions)) {
            return interaction.reply({ content: "You do not have permission to draw winners.", ephemeral: true })
        }

        const baseEmbed = new EmbedBuilder()
        .setTitle("Bae Rewards 2 Raffle - Drawing Winners")
        .setColor(0x00AE86)

        await interaction.reply({ 
            embeds: [
                baseEmbed.setDescription("Fetching entries...")
            ]
        })

        const entries = await Entry.find({})

        const studEntries = entries.filter(e => e.studGa)
        const womanizerEntries = entries.filter(e => e.womanizerGa)
        const chadEntries = entries.filter(e => e.chadGa)
        const gigaChadEntries = entries.filter(e => e.gigaChadGa)
        const playboyEntries = entries.filter(e => e.playboyGa)

        const studOdds = 0.6
        const womanizerOdds = 0.7
        const chadOdds = 0.8
        const gigaChadOdds = 0.9
        const playboyOdds = 1.0

        const numOfStudWinners = Math.floor(studEntries.length * studOdds)
        const numOfWomanizerWinners = Math.floor(womanizerEntries.length * womanizerOdds)
        const numOfChadWinners = Math.floor(chadEntries.length * chadOdds)
        const numOfGigaChadWinners = Math.floor(gigaChadEntries.length * gigaChadOdds)
        const numOfPlayboyWinners = Math.floor(playboyEntries.length * playboyOdds)

        const studWinners = getRandomWinners(studEntries, numOfStudWinners)
        const womanizerWinners = getRandomWinners(womanizerEntries, numOfWomanizerWinners)
        const chadWinners = getRandomWinners(chadEntries, numOfChadWinners)
        const gigaChadWinners = getRandomWinners(gigaChadEntries, numOfGigaChadWinners)
        const playboyWinners = getRandomWinners(playboyEntries, numOfPlayboyWinners)

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`Total Entries: ${entries.length}\nDrawing winners now...`)
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`Drawing "Stud 7+ giveaway winners...\nNumber of Winners: ${numOfStudWinners} (from ${studEntries.length} entries)`),
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`🏆 **Stud 7+ Winners** 🏆\n\n${studWinners.map(w => `<@${w.userId}>`).join("\n") || "No winners"}`)
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`Drawing "Womanizer 14+ giveaway winners...\nNumber of Winners: ${numOfWomanizerWinners} (from ${womanizerEntries.length} entries)`),
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`🏆 **Womanizer 14+ Winners** 🏆\n\n${womanizerWinners.map(w => `<@${w.userId}>`).join("\n") || "No winners"}`)
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`Drawing "Chad 21+ giveaway winners...\nNumber of Winners: ${numOfChadWinners} (from ${chadEntries.length} entries)`),
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`🏆 **Chad 21+ Winners** 🏆\n\n${chadWinners.map(w => `<@${w.userId}>`).join("\n") || "No winners"}`)
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`Drawing "Gigachad giveaway winners...\nNumber of Winners: ${numOfGigaChadWinners} (from ${gigaChadEntries.length} entries)`),
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`🏆 **Gigachad Winners** 🏆\n\n${gigaChadWinners.map(w => `<@${w.userId}>`).join("\n") || "No winners"}`)
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`Drawing "Playboy giveaway winners...\nNumber of Winners: ${numOfPlayboyWinners} (from ${playboyEntries.length} entries)`),
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`🏆 **Playboy Winners** 🏆\n\n${playboyWinners.map(w => `<@${w.userId}>`).join("\n") || "No winners"}`)
            ]
        })

        await new Promise(resolve => setTimeout(resolve, 1000))

        await interaction.followUp({
            embeds: [
                baseEmbed.setDescription(`🎉 Drawing complete! Congratulations to all the winners! Please create a ticket and send your wallet address 🎉`)
            ]
        })

    }
}

const isAdmin = (permissions) => {
    return permissions.has(PermissionFlagsBits.Administrator)
}

const getRandomWinners = (entries, numberOfWinners) => {
    const shuffled = entries.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numberOfWinners)
}