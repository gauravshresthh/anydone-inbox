// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity

const path = require('path');

module.exports = {
	packagerConfig: {
		icon: path.join(__dirname, 'favicon'),
		name: 'Anydone Inbox',
		executableName: 'Anydone Inbox',
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
				name: 'Anydone inbox desk',
				authors: 'treeleaf anydone team',
				icon: path.join(__dirname, 'favicon'),
			},
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin'],
			config: {
				name: 'Anydone inbox desk',
				icon: path.join(__dirname, 'favicon'),
			},
		},
		{
			name: '@electron-forge/maker-deb',
			config: {
				name: 'Anydone inbox desk',
				icon: path.join(__dirname, 'favicon'),
			},
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {
				name: 'Anydone inbox desk',
				icon: path.join(__dirname, 'favicon'),
			},
		},
	],
};
