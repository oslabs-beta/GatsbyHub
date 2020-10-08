// Helper functions for gatsbycli.ts
import { window, workspace, Terminal, WorkspaceFolder, Uri } from 'vscode';

export default class Utilities {
  static getActiveTerminal() {
    const { terminals, createTerminal } = window;
    const filtered = terminals.filter(
      (obj: Terminal) => obj.name === 'gatsbyhub'
    );

    let terminal: Terminal;

    // if there is no gatsby terminal running, create one
    if (filtered.length === 0) {
      terminal = createTerminal('gatsbyhub');
    } else {
      // if gatsby terminal already exists, return it
      [terminal] = filtered;
    }

    return terminal;
  }

  static async checkIfWorkspaceEmpty() {
    const currWorkspace: readonly WorkspaceFolder[] | undefined =
      workspace.workspaceFolders;

    if (currWorkspace === undefined) return [];

    const uri = Uri.file(currWorkspace[0].uri.path);

    const data = await workspace.fs.readDirectory(uri);

    return data;
  }
}
