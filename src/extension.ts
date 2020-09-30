// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gatsbyhub" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gatsbyhub.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from GatsbyHub!');
	});

vscode.commands.registerCommand('gatsbyhub.installGatsby', () => {
		// check if terminal is already running 

		// if it is not running create new terminal 
		// helper function to check conditional of if terminal is already running 
		const terminal = vscode.window.createTerminal("gatsbyhub");
		terminal.sendText("sudo npm install -g gatsby-cli");
		terminal.show();
		const activeTerminal = vscode.window.activeTerminal
		console.log(activeTerminal._name);
		// if terminal is already running, then move onto next command 
		// then send "sudo npm install -g gatsby-cli"
		// conditional check if password is required 
		// inputbox pop up of password (if necessary)
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
