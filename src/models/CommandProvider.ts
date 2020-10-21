import { TreeDataProvider } from 'vscode';
import CLICommand from './Commands';

export default class CLICommandProvider
	implements TreeDataProvider<CLICommand> {
	data: CLICommand[];

	constructor() {
		this.data = [
			new CLICommand('Install Gatsby', 'Install/Update Gatsby-cli'),
			new CLICommand('New Site', 'Create New Gatsby Site'),
			new CLICommand('Develop Server', 'Launch Development Server'),
			new CLICommand('Build Site', 'Package and Prepare Site for Deployment'),
			new CLICommand('Serve Site', 'Start Production Server'),
			new CLICommand('Info', 'Get Environment Information'),
			new CLICommand('Clean Cache', 'Clear Cache and Public Directories'),
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
