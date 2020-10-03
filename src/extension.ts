/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ExtensionContext, commands, window } from 'vscode';
import GatsbyCli from './commands/gatsbycli';
import StatusBar from './utils/statusBarItem';
import PluginProvider from './models/PluginProvider';
/* import WebViews from './utils/WebViews'; */

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const { createTreeView } = window;
  const { registerCommand } = commands;
  const { subscriptions } = context;
  const gatsbyCli = new GatsbyCli();

  subscriptions.push(
    registerCommand(
      // package.json command
      'gatsbyhub.installGatsby',
      GatsbyCli.installGatsby,
    ),
  );
  subscriptions.push(
    registerCommand('gatsbyhub.createSite', GatsbyCli.createSite),
  );
  subscriptions.push(
    registerCommand('gatsbyhub.developServer', gatsbyCli.developServer),
  );
  subscriptions.push(
    registerCommand('gatsbyhub.disposeServer', gatsbyCli.disposeServer),
  );
  subscriptions.push(registerCommand('gatsbyhub.build', GatsbyCli.build));
  subscriptions.push(
    registerCommand('gatsbyhub.openPluginDocs', GatsbyCli.installPlugin),
  );
  subscriptions.push(
    createTreeView('plugins', {
      treeDataProvider: new PluginProvider(),
    }),
  );
  subscriptions.push(gatsbyCli);
}

// this method is called when your extension is deactivated
export function deactivate() {}
