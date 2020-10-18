import { TreeDataProvider } from 'vscode';
import CLICommand from './Commands';

export default class CLICommandProvider
	implements TreeDataProvider<CLICommand> {
	data: CLICommand[];

	constructor() {
		this.data = [
			new CLICommand('New'),
			new CLICommand('Develop'),
			new CLICommand('Build'),
			new CLICommand('Serve'),
			new CLICommand('Info'),
			new CLICommand('Clean'),
			new CLICommand('Install'),
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
