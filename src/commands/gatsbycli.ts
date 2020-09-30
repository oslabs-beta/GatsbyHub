// Extract commands and modularize them

import * as vscode from 'vscode';
import Utilities from '../utils/Utilities';

export default class GatsbyCli {
  // no need to instantiate to use this method in extenstion.ts
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
}
