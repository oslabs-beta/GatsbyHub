//@ts-check

'use strict';

const path = require('path');

// @type {import('webpack').Configuration}
module.exports = {
  // mode: process.env.NODE_ENV --mode is dictated in the scripts in the package.json
  target: 'node', // vscode extensions run in a Node.js-context
  entry: './src/extension.ts',
  output: {
    // the bundle is stored in the 'dist' folder (check package.json)
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed
  },
  resolve: {
    // support reading TypeScript and JavaScript files
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'es6' // override `tsconfig.json` so that TypeScript emits native JavaScript modules.
              }
            }
          }
        ]
      }
    ]
  }
};
