module.exports = {
	trailingComma: 'es5',
	arrowParens: 'always',
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	useTabs: true,
	overrides: [
		{
			files: '*.json',
			options: {
				semi: false,
			},
		},
	],
};
