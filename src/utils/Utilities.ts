// Helper functions for gatsbycli.ts
import {
	window,
	workspace,
	commands,
	Terminal,
	WorkspaceFolder,
	Uri,
} from 'vscode';

import { getDevelopPortConfig } from './config/develop';

export default class Utilities {
	static getActiveTerminal(): Terminal {
		const { terminals, createTerminal } = window;
		const filteredTerminals = terminals.filter(
			(obj: Terminal) => obj.name === 'GatsbyHub'
		);

		let terminal: Terminal;

		// if there is no gatsby terminal running, create one
		if (filteredTerminals.length === 0) {
			terminal = createTerminal('GatsbyHub');
		} else {
			// if gatsby terminal already exists, return it
			[terminal] = filteredTerminals;
		}

		return terminal;
	}

	static getActiveDevServerTerminal(): Terminal {
		const { terminals, createTerminal } = window;
		const filteredTerminals = terminals.filter(
			(obj: Terminal) => obj.name === 'GatsbyServer [Dev]'
		);

		let terminal: Terminal;

		if (filteredTerminals.length === 0) {
			terminal = createTerminal('GatsbyServer [Dev]');
		} else {
			[terminal] = filteredTerminals;
		}

		return terminal;
	}

	static getActiveProdServerTerminal(): Terminal {
		const { terminals, createTerminal } = window;
		const filteredTerminals = terminals.filter(
			(obj: Terminal) => obj.name === 'GatsbyServer [Prod]'
		);

		let terminal: Terminal;

		if (filteredTerminals.length === 0) {
			terminal = createTerminal('GatsbyServer [Prod]');
		} else {
			[terminal] = filteredTerminals;
		}

		return terminal;
	}

	static getActiveServer(): Terminal {
		const { terminals } = window;
		const filteredTerminals = terminals.filter(
			(obj: Terminal) =>
				obj.name === 'GatsbyServer [Prod]' || obj.name === 'GatsbyServer [Dev]'
		);

		const [terminal] = filteredTerminals;

		return terminal;
	}

	static async getWorkspaceUri(): Promise<Uri | undefined> {
		const currWorkspace: readonly WorkspaceFolder[] | undefined =
			workspace.workspaceFolders;

		if (currWorkspace === undefined) {
			const input = await window.showErrorMessage(
				'A workspace must be open. Choose a folder to work in.',
				'Open Folder',
				'Cancel'
			);
			if (input === 'Open Folder') {
				commands.executeCommand('vscode.openFolder');
			}

			return currWorkspace;
		}

		const uri = Uri.file(currWorkspace[0].uri.path);

		return uri;
	}

	static async checkIfWorkspaceEmpty(): Promise<boolean> {
		const uri = await this.getWorkspaceUri();

		if (uri) {
			const data = await workspace.fs.readDirectory(uri);
			return data.length < 1;
		}

		return true;
	}

	static async checkIfGatsbySiteInitiated(): Promise<boolean> {
		const uri = await this.getWorkspaceUri();
		let initiated = false;

		if (uri) {
			const data = await workspace.fs.readDirectory(uri);

			// if workspace is empty, that means a gatsby site has not been initiated
			if (data.length < 1) return initiated;

			// if there are files/folders
			data.forEach((file) => {
				// if one of these files is gatsby-config set initiated to true
				if (file[0] === 'gatsby-config.js') initiated = true;
			});

			return initiated;
		}

		return initiated;
	}

	static async checkIfBuilt(event?: string): Promise<boolean> {
		const uri = await this.getWorkspaceUri();
		let built = false;

		if (event === 'cleaned') {
			commands.executeCommand('setContext', 'siteBuilt', false);
			return built;
		}

		if (uri) {
			const data = await workspace.fs.readDirectory(uri);

			// if workspace is empty, that means a gatsby site has not been initiated
			if (data.length < 1) {
				commands.executeCommand('setContext', 'siteIsBuilt', false);
				return built;
			}

			// if there are files/folders
			data.forEach((file) => {
				// if one of these files is .cache or public set built to true
				if (file[0] === '.cache' || file[0] === 'public') {
					built = true;
				}
			});
		}

		if (built) {
			setTimeout(() => {
				commands.executeCommand('setContext', 'siteBuilt', true);
			}, 6000);
		} else {
			commands.executeCommand('setContext', 'siteBuilt', false);
		}

		return built;
	}

	static async getRootPath(): Promise<string | undefined> {
		// replaces spaces with backslash
		// .replace(/\s/g, '\\ ')
		// drops fileName and common folders that aren't part of the root path
		// .replace(/\/(src\/)?(pages\/)?(components\/)?[a-zA-Z\-\d]+\.(ts)?(js)?x?/, '')
		const uri = await this.getWorkspaceUri();

		return uri?.path;
	}

	static openGraphiQL() {
		const port = getDevelopPortConfig();

		commands.executeCommand(
			'vscode.open',
			Uri.parse(`http://localhost:${port}/___graphql`)
		);
	}

	static openBrowser() {
		const port = getDevelopPortConfig();

		commands.executeCommand(
			'vscode.open',
			Uri.parse(`http://localhost:${port}`)
		);
	}

	static getPortConfig(): number {
		return workspace.getConfiguration('gatsbyhub').commands.develop.port;
	}
}
