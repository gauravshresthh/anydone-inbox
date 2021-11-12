// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity

const path = require('path');

module.exports = {
	packagerConfig: {
		icon: path.join(__dirname, 'anydone-app-icon-desktop.png'),
	},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				name: 'Anydone inbox desk',
				authors: 'treeleaf anydone team',
				icon: path.join(__dirname, 'anydone-app-icon-desktop.png'),
			},
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin'],
			config: {
				name: 'Anydone inbox desk',
				icon: path.join(__dirname, 'anydone-app-icon-desktop.png'),
			},
		},
		{
			name: '@electron-forge/maker-deb',
			config: {
				name: 'Anydone inbox desk',
				icon: path.join(__dirname, 'anydone-app-icon-desktop.png'),
			},
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {
				name: 'Anydone inbox desk',
				icon: path.join(__dirname, 'anydone-app-icon-desktop.png'),
			},
		},
	],
};
