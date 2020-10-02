/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import GatsbyCli from './commands/gatsbycli';
import StatusBar from './utils/statusBarItem';
import PluginProvider from './models/PluginProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
  vscode.commands.registerCommand(
    // package.json command
    'gatsbyhub.installGatsby',
    GatsbyCli.installGatsby
  );

  vscode.commands.registerCommand('gatsbyhub.createSite', GatsbyCli.createSite);

  vscode.commands.registerCommand(
    'gatsbyhub.developServer',
    GatsbyCli.developServer
  );

  StatusBar.createStatusBarItem();

  vscode.window.createTreeView('plugins', {
    treeDataProvider: new PluginProvider(),
  });
  //   context.subscriptions.push(sb);
}

// this method is called when your extension is deactivated
export function deactivate() {}
