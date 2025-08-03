const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, MessageFlags, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

const rulesEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Rules')
	.setDescription('Follow these simple rules and we will be the best of friends!')
	.setThumbnail('https://i.imgur.com/3AlTfNL.png')
	.addFields(
		{ name: 'Common sense', value: 'Seriously this gets you a long way.' },
		{ name: 'Be respectful to everyone', value: 'No harassment, bullying or personal attacks.'},
		{ name: 'No hate speech', value: 'Racism, sexism, homophobia, transphobia or any discriminatory remarks will result in an immediate ban.'},
		{ name: 'English only', value: 'I cant be fucked to moderate other languages i do or dont speak.'},
		{ name: 'No roleplay, flirting or weird parasocial behavior', value: 'I dont care if you think you are an animal or feel attracted to me keep it clean.'},
		{ name: 'Respect personal boundaries', value: `Don't ask invasive or inappropriate questions.`},
		{ name: 'Mods have the final say', value: 'Dont argue its an uphill battle.'},
		{ name: 'Warnings may be given once (or not at all)', value: 'Depending on the severety of the offence.'},
		{ name: 'No Trauma dumping or serious personal issues', value: `This isnt therapy, and chat isn't the place for it.`},
		{ name: 'Keep political/religious debates out', value: 'I dont care for it and it only leads to a mess.'},
		{ name: 'This is an 18+ stream', value: 'I will ban minors on the spot, joke that you are under 18 and see yourself get banned without warning.'},
        { name: 'No NSFW', value: 'I might be weird but lets keep it clean alright?' },
		{ name: 'Enjoy your time here', value: `Thats what we're here for right`});


module.exports = {
	cooldown: 30,
	data: new SlashCommandBuilder()
		.setName('createrulesembed')
		.setDescription('sends a embed with the rules')
		.setDefaultMemberPermissions(0),
	async execute(interaction) {

        const acceptRules = new ButtonBuilder()
            .setCustomId('acceptrules')
            .setLabel('I accept the rules.')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(acceptRules);

		await interaction.reply({ 
            embeds: [rulesEmbed],
            components: [row],
        });
	},
};