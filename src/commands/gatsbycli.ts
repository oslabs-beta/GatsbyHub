// Extract commands and modularize them

import * as vscode from 'vscode';
import Utilities from '../utils/Utilities';

export default class GatsbyCli {
  // no need to instantiate to use this method in extenstion.ts
  static installGatsby() {
    // if a gatsby terminal isn't open, create a new terminal. Otherwise, use gatsbyhub terminal
    const activeTerminal = Utilities.getActiveTerminal();

    activeTerminal.sendText('sudo npm install -g gatsby-cli');
    activeTerminal.show();
  }
}
