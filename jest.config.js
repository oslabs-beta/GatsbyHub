module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageProvider: 'babel',
	testMatch: ['**/__tests__/**/*.+(ts)', '**/?(*.)+(spec|test).+(ts)'],
	transform: {
		'^.+\\.(ts)$': 'ts-jest',
	},
	verbose: true,
};
