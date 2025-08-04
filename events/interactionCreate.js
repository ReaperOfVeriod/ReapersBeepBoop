const { Events, MessageFlags, Collection, GuildMember, PermissionsBitField } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			const { cooldowns } = interaction.client;

			if (!cooldowns.has(command.data.name)) {
				cooldowns.set(command.data.name, new Collection());
			}

			const now = Date.now();
			const timestamps = cooldowns.get(command.data.name);
			const defaultCooldownDuration = 3;
			const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

				if (now < expirationTime) {
					const expiredTimestamp = Math.round(expirationTime / 1000);
					return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, flags: MessageFlags.Ephemeral });
				}
			}

			timestamps.set(interaction.user.id, now);
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
				}
			}
		} else if (interaction.isButton()) {
			if (interaction.customId === 'acceptnotifications') {
				const notifiRoleId = "1401849479149391882";
				try {
					if (interaction.member.roles.cache.has(notifiRoleId)) {
						await interaction.reply({ content: 'you already have the notification role!', flags: MessageFlags.Ephemeral });
					} else {
						await interaction.member.roles.add(notifyRoleId);
						await interaction.reply({ content: 'Thank you hope to see you soon in my streams!', flags: MessageFlags.Ephemeral });
					}
				} catch (error) {
					await interaction.reply({ content: 'something went wrong', flags: MessageFlags.Ephemeral });
					console.log(error);
				}
			}
			if (interaction.customId === 'acceptrules') {
				const viewerRoleId = "1401153107601395774";
				try {
					if (interaction.member.roles.cache.has(viewerRoleId)) {
						await interaction.reply({ content: 'you already have accepted the rules!', flags: MessageFlags.Ephemeral });
					} else {
						await interaction.member.roles.add(viewerRoleId);
						await interaction.reply({ content: 'Thank you for accepting the rules!', flags: MessageFlags.Ephemeral });
					}
				} catch (error) {
					await interaction.reply({ content: 'something went wrong', flags: MessageFlags.Ephemeral });
					console.log(error);
				}
			}
		} else if (interaction.isStringSelectMenu()) {
			// respond to the select menu
		}
	},
};
