import { ExtensionContext, commands, window } from 'vscode';
import GatsbyCli from './models/GatsbyCli';
import CommandProvider from './models/CommandProvider';
import PluginProvider from './models/PluginProvider';
import WebViews from './utils/WebViews';
import StarterProvider from './models/StarterProvider';
import ThemeProvider from './models/ThemeProvider';
import Utilities from './utils/Utilities';

// TODO create docs for each view, add buttons that open webview with docs
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	const { createTreeView } = window;
	const { registerCommand } = commands;
	const { subscriptions } = context;
	const gatsbyCli = new GatsbyCli();
	/**
	 * Scan workspace on activation
	 * for build folders
	 */
	Utilities.checkIfBuilt();

	subscriptions.push(
		registerCommand('gatsbyhub.installGatsby', gatsbyCli.installGatsby)
	);
	subscriptions.push(
		registerCommand('gatsbyhub.createSite', gatsbyCli.createSite)
	);
	subscriptions.push(registerCommand('gatsbyhub.develop', gatsbyCli.develop));
	subscriptions.push(registerCommand('gatsbyhub.build', gatsbyCli.build));
	subscriptions.push(registerCommand('gatsbyhub.serve', gatsbyCli.serve));
	subscriptions.push(registerCommand('gatsbyhub.info', gatsbyCli.info));
	subscriptions.push(registerCommand('gatsbyhub.clean', gatsbyCli.clean));
	subscriptions.push(registerCommand('gatsbyhub.install', gatsbyCli.install));
	subscriptions.push(
		registerCommand('gatsbyhub.disposeServer', gatsbyCli.disposeServer)
	);
	subscriptions.push(
		registerCommand('gatsbyhub.createWebView', WebViews.openWebView)
	);
	subscriptions.push(
		registerCommand('gatsbyhub.openCommandDocs', WebViews.openCommandDocs)
	);
	subscriptions.push(
		registerCommand('gatsbyhub.openGraphiQL', Utilities.openGraphiQL)
	);
	subscriptions.push(
		createTreeView('commands', {
			treeDataProvider: new CommandProvider(),
		})
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
	subscriptions.push(gatsbyCli);
}

// this method is called when your extension is deactivated
export function deactivate() {}
