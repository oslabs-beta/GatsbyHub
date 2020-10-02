/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import GatsbyCli from './commands/gatsbycli';
import StatusBar from './utils/statusBarItem';
import PluginProvider from './models/PluginProvider';
/* import WebViews from './utils/WebViews'; */

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
  const { createTreeView } = vscode.window;
  const { registerCommand } = vscode.commands;
  registerCommand(
    // package.json command
    'gatsbyhub.installGatsby',
    GatsbyCli.installGatsby
  );
  registerCommand('gatsbyhub.createSite', GatsbyCli.createSite);
  registerCommand('gatsbyhub.developServer', GatsbyCli.developServer);
  registerCommand('gatsbyhub.openPluginDocs', GatsbyCli.installPlugin);
  createTreeView('plugins', {
    treeDataProvider: new PluginProvider(),
  });
  StatusBar.createStatusBarItem();
  //   context.subscriptions.push(sb);
}

// this method is called when your extension is deactivated
export function deactivate() {}
