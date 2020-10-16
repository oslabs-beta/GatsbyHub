# Contributing

🚀 First off, thanks for taking the time to contribute! 🚀

When contributing to this project, please first discuss the changes you wish to make via an [issue](https://github.com/oslabs-beta/GatsbyHub/issues) before making changes.

### Getting the code

You can fork from the repo below or directly clone it using this command in the terminal:

```
git clone https://github.com/oslabs-beta/GatsbyHub.git
```

Prerequisites

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/), `>= 10.11.0`

### Dependencies

From a terminal, where you have cloned the repository, execute the following command to install the required dependencies:

```
npm install
```

### Watch

During development you can use a watcher to make builds on changes quick and easy. From a terminal, where you have cloned the repository, execute the following command:

```
npm run watch
```

Or use the provided `watch` task in VS Code, execute the following from the command palette (be sure there is no `>` at the start):

```
task watch
```

This will first do an initial full build and then watch for file changes, compiling those changes incrementally, enabling a fast, iterative coding experience.

### Formatting

This project uses [prettier](https://prettier.io/) for code formatting.

To format the code as you make changes you can install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items/esbenp.prettier-vscode) extension.

Add the following to your User Settings to run prettier:

```
"editor.formatOnSave": true,
```

### Linting

This project uses [ESLint](https://eslint.org/) for code linting TypeScript using the AirBnB Style Guide. Warnings from ESLint show up in the `Errors and Warnings` quick box and you can navigate to them from inside VS Code.

To lint the code as you make changes you can install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension.

### Debugging

#### Using VS Code

1. Ensure the required [dependencies](#dependencies) are installed
2. Start the [`watch`](#watch) task
3. Choose the `Launch GatsbyHub` launch configuration from the launch dropdown in the Debug viewlet and press `F5`.

# Submitting a Pull Request

Please follow all instructions in the [PR template](https://github.com/oslabs-beta/GatsbyHub/blob/main/PULL_REQUEST_TEMPLATE.md).
