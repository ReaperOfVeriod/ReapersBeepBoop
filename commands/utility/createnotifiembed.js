const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, MessageFlags, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

const rulesEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Notifications.')
	.setDescription('Would you like to be notified when i go live?')
	.setThumbnail('https://i.imgur.com/3AlTfNL.png');

module.exports = {
	cooldown: 30,
	data: new SlashCommandBuilder()
		.setName('createnotifiembed')
		.setDescription('sends a embed with the notification embed')
		.setDefaultMemberPermissions(0),
	async execute(interaction) {

        const acceptNotifications = new ButtonBuilder()
            .setCustomId('acceptnotifications')
            .setLabel('I want notifications!')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(acceptNotifications);

		await interaction.reply({ 
            embeds: [rulesEmbed],
            components: [row],
        });
	},
};