import { TreeDataProvider } from 'vscode';
import CLICommand from './Commands';

export default class CLICommandProvider
	implements TreeDataProvider<CLICommand> {
	data: CLICommand[];

	constructor() {
		this.data = [
			new CLICommand(
				'Install Gatsby',
				undefined,
				undefined,
				'Install/Update Gatsby-cli'
			),
			new CLICommand(
				'New Site',
				undefined,
				undefined,
				'Create New Gatsby Site'
			),
			new CLICommand(
				'Develop Server',
				undefined,
				undefined,
				'Launch Development Server'
			),
			new CLICommand(
				'Build Site',
				undefined,
				undefined,
				'Package and Prepare Site for Deployment'
			),
			new CLICommand(
				'Serve Site',
				undefined,
				undefined,
				'Start Production Server'
			),
			new CLICommand(
				'Info',
				undefined,
				undefined,
				'Get Environment Information'
			),
			new CLICommand(
				'Clean Cache',
				undefined,
				undefined,
				'Clear Cache and Public Directories'
			),
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
