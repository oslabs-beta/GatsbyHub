// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import GatsbyCli from './commands/gatsbycli';
import StatusBar from './utils/statusBarItem';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    // package.json command
    'gatsbyhub.installGatsby',
    GatsbyCli.installGatsby,
  );

  vscode.commands.registerCommand('gatsbyhub.createSite', GatsbyCli.createSite);

  vscode.commands.registerCommand(
    'gatsbyhub.developServer',
    GatsbyCli.developServer,
  );

  StatusBar.createStatusBarItem();
  //   context.subscriptions.push(sb);
  vscode.commands.registerCommand('gatsbyhub.build', GatsbyCli.build);
}

// this method is called when your extension is deactivated
export function deactivate() {}
