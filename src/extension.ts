// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, window } from 'vscode';
import GatsbyCli from './models/GatsbyCli';
import PluginProvider from './models/PluginProvider';
import WebViews from './utils/WebViews';
import StarterProvider from './models/StarterProvider';
import ThemeProvider from './models/ThemeProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const { createTreeView } = window;
  const { registerCommand } = commands;
  const { subscriptions } = context;
  const gatsbyCli = new GatsbyCli();

  subscriptions.push(
    registerCommand('gatsbyhub.installGatsby', gatsbyCli.installGatsby)
  );
  subscriptions.push(
    registerCommand('gatsbyhub.createSite', gatsbyCli.createSite),
  );
  subscriptions.push(
    registerCommand('gatsbyhub.developServer', gatsbyCli.developServer),
  );
  subscriptions.push(
    registerCommand('gatsbyhub.disposeServer', gatsbyCli.disposeServer),
  );
  subscriptions.push(
    registerCommand('gatsbyhub.build', gatsbyCli.build)
  );
  subscriptions.push(
    registerCommand('gatsbyhub.installPlugin', gatsbyCli.installPlugin),
  );
  subscriptions.push(
    createTreeView('plugins', {
      treeDataProvider: new PluginProvider(),
    })
  );
  subscriptions.push(
    createTreeView('starters', {
      treeDataProvider: new StarterProvider(),
    })
  );
  subscriptions.push(
    createTreeView('themes', {
      treeDataProvider: new ThemeProvider(),
    })
  );
  subscriptions.push(
    registerCommand('gatsbyhub.createWebView', WebViews.openWebView)
  );
  subscriptions.push(gatsbyCli);
}

// this method is called when your extension is deactivated
export function deactivate() {}
