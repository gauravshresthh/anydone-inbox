// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity

const path = require('path');

module.exports = {
	packagerConfig: {
		icon: path.join(__dirname, 'favicon.png'),
		overwrite: true,
		platform: 'all',
		quiet: true,
		usageDescription: {
			Camera: 'Needed for video calls',
			Microphone: 'Needed for voice calls',
		},
	},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				name: 'Anydone Inbox',
				authors: 'treeleaf_anydone_team',
				icon: path.join(__dirname, 'favicon.png'),
			},
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin'],
			config: {
				name: 'Anydone',
				icon: path.join(__dirname, 'favicon.png'),
			},
		},
		{
			name: '@electron-forge/maker-deb',
			config: {
				icon: path.join(__dirname, 'favicon.png'),
			},
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {
				icon: path.join(__dirname, 'favicon.png'),
			},
		},
	],
};
