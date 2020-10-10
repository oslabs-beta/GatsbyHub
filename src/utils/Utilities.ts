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

  static async checkIfWorkspaceEmpty(): Promise<boolean> {
    const currWorkspace: readonly WorkspaceFolder[] | undefined =
      workspace.workspaceFolders;

    if (currWorkspace === undefined) return false;

    const uri = Uri.file(currWorkspace[0].uri.path);

    const data = await workspace.fs.readDirectory(uri);

    return data.length < 1;
  }

  static async checkIfGatsbySiteInitiated(): Promise<boolean> {
    const currWorkspace: readonly WorkspaceFolder[] | undefined =
      workspace.workspaceFolders;

    if (currWorkspace === undefined) return false;

    const uri = Uri.file(currWorkspace[0].uri.path);

    const data = await workspace.fs.readDirectory(uri);

    // if workspace is empty, that means a gatsby site has not been initiated
    if (data.length < 1) return false;

    let initiated: boolean = false;
    let gatsbySiteFolder: string = '';

    // if there are files/folders
    data.forEach((file) => {
      // check if one of these files is a folder
      // if so , store the name of that folde in a variable
      if (file[1] > 1) [gatsbySiteFolder] = file;

      // if one of these files is gatsby-config set initiated to true
      if (file[0] === 'gatsby-config.js') initiated = true;
    });

    // if there is a folder in current workspace
    if (gatsbySiteFolder) {
      // update uri for new folder
      const newUri = Uri.file(`${uri.path}/${gatsbySiteFolder}`);

      // read the directory of that new uri
      const newData = await workspace.fs.readDirectory(newUri);

      // check if this folder is a gatsby site
      newData.forEach((file) => {
        if (file[0] === 'gatsby-config.js') initiated = true;
      });
    }

    return initiated;
  }

  static getRootPath() {
    return (
      // gets path to file in active text editor
      window.activeTextEditor?.document.fileName
        // replaces spaces with backslash
        .replace(/\s/g, '\\ ')
        // drops fileName and common folders that aren't part of the root path
        .replace(
          /\/(src\/)?(pages\/)?(components\/)?[a-zA-Z\-\d]+\.(ts)?(js)?x?/,
          '',
        )
    );
  }
}
