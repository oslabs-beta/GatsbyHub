import { TreeDataProvider } from 'vscode';
import CLICommand from './CLICommands';
// import NpmData from './NpmData';
// import { PluginPkg } from '../utils/Interfaces';

export default class CLICommandProvider
	implements TreeDataProvider<CLICommand> {
	data: CLICommand[];

	constructor() {
		this.data = [
			new CLICommand('New', 'new'),
			new CLICommand('Develop', 'develop'),
			new CLICommand('Build', 'build'),
			new CLICommand('Serve', 'serve'),
			new CLICommand('Info', 'info'),
			new CLICommand('Clean', 'clean'),
			new CLICommand('Install', 'install'),
		];
	}

	getTreeItem(element: CLICommand): CLICommand | Promise<CLICommand> {
		return element;
	}

	getChildren(element?: CLICommand | undefined) {
		if (!element) {
			return this.data;
		}
		return element.children;
	}
}
