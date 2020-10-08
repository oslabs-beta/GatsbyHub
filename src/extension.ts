// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import { ExtensionContext, commands, window } from 'vscode';
import GatsbyCli from './commands/gatsbycli';
import PluginProvider from './models/PluginProvider';
import WebView from './utils/WebViews';
import StarterProvider from './models/StarterProvider';
import ThemeProvider from './models/ThemeProvider';
/* import WebViews from './utils/WebViews'; */
/* import PluginData from './models/PluginData'; */

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const { createTreeView } = window;
  const { registerCommand } = commands;
  const { subscriptions } = context;
  const gatsbyCli = new GatsbyCli();
  /*   console.log(Uri.file(path.resolve(__dirname, '../'))); */
  /*   const uri = Uri.file(path.resolve(__dirname));
  console.log('uri: ', uri);
  workspace.fs.readDirectory(uri).then((data) => {
    data.forEach((file) => {
      if (file[0] === 'package.json') console.log(file[0]);
    });
  });
 */
  subscriptions.push(
    registerCommand('gatsbyhub.installGatsby', GatsbyCli.installGatsby),
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
    registerCommand('gatsbyhub.installPlugin', GatsbyCli.installPlugin),
  );
  subscriptions.push(
    createTreeView('plugins', {
      treeDataProvider: new PluginProvider(),
    }),
  );
  subscriptions.push(
    createTreeView('starters', {
      treeDataProvider: new StarterProvider(),
    }),
  );
  subscriptions.push(
    createTreeView('themes', {
      treeDataProvider: new ThemeProvider(),
    }),
  );
  subscriptions.push(
    registerCommand('gatsbyhub.createWebView', WebView.openPluginWebView),
  );
  subscriptions.push(gatsbyCli);
}

// this method is called when your extension is deactivated
export function deactivate() {}
