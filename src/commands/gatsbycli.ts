// Extract commands and modularize them

import * as vscode from 'vscode';
import Utilities from '../utils/Utilities';

export default class GatsbyCli {
  // installs gatsby-cli for the user when install gatsby button is clicked

  //  static keyword: eliminates the need to instantiate to use this method in extenstion.ts
  static async installGatsby() {
    // if a gatsby terminal isn't open, create a new terminal. Otherwise, use gatsbyhub terminal
    const activeTerminal = Utilities.getActiveTerminal();

    activeTerminal.sendText('sudo npm install -g gatsby-cli');
    // NOTE: comeback to this
    // if admin password is required:
      // Creates an inputbox for password when install gatsby button is clicked
      const inputPassword = await vscode.window.showInputBox({ password: true, placeHolder: 'Input administrator password' });
      activeTerminal.sendText(inputPassword);

      // if the password is wrong, show inputbox again
      
    // else, show terminal

    activeTerminal.show();
  }

  /**  creates a new site when 'Create New Site' button is clicked
   * currently uses default gatsby starter, but uses gatsby new url. see https://www.gatsbyjs.com/docs/gatsby-cli/
   * NOTE: new site will be created wherever the root directory is currently located
   * the user terminal should be at the directory user wishes to download the files.
   */
  static async createSite() {
    const activeTerminal = Utilities.getActiveTerminal();

    // problem: does not work when creating a new folder
    const root = await vscode.commands.executeCommand('vscode.openFolder');
    console.log(root);

    const siteName = await vscode.window.showInputBox({ placeHolder: 'Input new site name' });
    activeTerminal.sendText(`gatsby new ${siteName}`);

    activeTerminal.show();
  }
}
