const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 30,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.setDefaultMemberPermissions(0),
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', flags: MessageFlags.Ephemeral });
	},
};
