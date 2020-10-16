// Helper functions for gatsbycli.ts
import {
  window,
  workspace,
  commands,
  Terminal,
  WorkspaceFolder,
  Uri,
} from 'vscode';

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

  static getActiveServerTerminal(): Terminal {
    const { terminals, createTerminal } = window;
    const filteredTerminals = terminals.filter(
      (obj: Terminal) => obj.name === 'Gatsby Server'
    );

    let terminal: Terminal;

    if (filteredTerminals.length === 0) {
      terminal = createTerminal('Gatsby Server');
    } else {
      [terminal] = filteredTerminals;
    }

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

  static async checkIfGatsbySiteInitiated(): Promise<boolean | null> {
    const uri = await this.getWorkspaceUri();

    if (uri) {
      const data = await workspace.fs.readDirectory(uri);

      // if workspace is empty, that means a gatsby site has not been initiated
      if (data.length < 1) return false;

      let initiated: boolean = false;
      // if there are files/folders
      data.forEach((file) => {
        // if one of these files is gatsby-config set initiated to true
        if (file[0] === 'gatsby-config.js') initiated = true;
      });

      return initiated;
    }

    return null;
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
    commands.executeCommand(
      'vscode.open',
      Uri.parse('http://localhost:8000/___graphql')
    );
  }
}
