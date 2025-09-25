import "dotenv/config"
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, Events, GatewayIntentBits } from "discord.js"
import mongoose from "mongoose"
import check from "./buttons/check.js"
import draw from "./buttons/draw.js"
import participate from "./buttons/participate.js"

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const MONGO_URI = process.env.MONGO_URI

if (!BOT_TOKEN) {
    console.error("Error: DISCORD_BOT_TOKEN is not set in environment variables.")
    process.exit(1)
}

if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not set in environment variables.")
    process.exit(1)
}

const SB_GUILD_ID = "1183302319987752971"

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})

client.once(Events.ClientReady, async c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)

//     const guildId = "1183302319987752971"
//     const channelId = "1420097709724930220"

//     const guild = await client.guilds.fetch(guildId)
//     if (!guild) {
//         console.error("Guild not found")
//         return
//     }
//     const channel = await guild.channels.fetch(channelId)
//     if (!channel) {
//         console.error("Channel not found")
//         return
//     }

//     const embed = new EmbedBuilder()
//         .setTitle("Bae Rewards 2")
//         .setColor(0x00AE86)
//         .setDescription("To enter the raffle click on the participate button")
//         .setImage("https://i.imgur.com/X7ZXihf.png")
//         .addFields({
//             name: "Roles & Odds ",
//             value: "```" + `
// Playboy 35+     - 1
// Giga Chad 28+   - 0.9
// Chad 21+        - 0.8
// Womanizer 14+   - 0.7
// Stud 7+         - 0.6` + "```",
//         })

//     const row = new ActionRowBuilder().addComponents(
//         new ButtonBuilder()
//             .setCustomId("participate")
//             .setLabel("Participate")
//             .setStyle(ButtonStyle.Primary)
//             .setEmoji("🎉"),
//         new ButtonBuilder()
//             .setCustomId("check")
//             .setLabel("Check Entry")
//             .setStyle(ButtonStyle.Secondary)
//             .setEmoji("🔍"),
//         new ButtonBuilder()
//             .setCustomId("draw")
//             .setLabel("Draw Winners")
//             .setStyle(ButtonStyle.Danger)
//             .setEmoji("🏆")
//     )

//     await channel.send({ embeds: [embed], components: [row] })
})

const buttons = [check, draw, participate]

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.guildId !== SB_GUILD_ID) return

    if (!interaction.isButton()) return

    const { customId } = interaction
    console.log(`Button interaction received: ${customId} from user ${interaction.user.tag}`)

    const button = buttons.find(btn => btn.customId === customId)

    if (!button) return interaction.reply({ content: "Button not found", ephemeral: true })

    try {
        await button.execute(interaction)
    } catch (err) {
        console.error("Error executing button interaction", err)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing this button!", ephemeral: true })
        } else {
            await interaction.reply({ content: "There was an error while executing this button!", ephemeral: true })
        }
    }

})

mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
    client.login(BOT_TOKEN)
}
).catch(err => {
    console.error("Failed to connect to MongoDB", err)
    process.exit(1)
}
)