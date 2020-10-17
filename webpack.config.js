// @ts-check

const path = require('path');

// @type {import('webpack').Configuration}
module.exports = {
	//   mode: process.env.NODE_ENV, // --mode is dictated in the scripts in the package.json
	target: 'node',
	// vscode extensions run in a Node.js-context
	// webpack will compile from extension.ts
	entry: './src/extension.ts',
	output: {
		// the bundle is stored in the 'dist' folder (check package.json)
		path: path.resolve(__dirname, 'dist'),
		filename: 'extension.js',
		libraryTarget: 'commonjs2',
		devtoolModuleFilenameTemplate: '../[resource-path]',
	},
	devtool: 'source-map',
	externals: {
		vscode: 'commonjs vscode',
		// the vscode-module is created on-the-fly and must be excluded
	},
	resolve: {
		// support reading TypeScript and JavaScript files
		extensions: ['.ts', '.js'],
		modules: ['node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						// loader compiles typescript
					},
				],
			},
		],
	},
};
