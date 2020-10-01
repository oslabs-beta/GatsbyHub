// Helper functions for gatsbycli.ts
import * as vscode from 'vscode';

// interface Terminal {
//   sendText: any;
//   show: any;
//   name: string;
// }

export default class Utilities {
  static getActiveTerminal() {
    const { terminals } = vscode.window;
    const filtered = terminals.filter(
      (obj: vscode.Terminal) => obj.name === 'gatsbyhub',
    );

    let terminal: vscode.Terminal;

    // if there is no gatsby terminal running, create one
    if (filtered.length === 0) {
      terminal = vscode.window.createTerminal('gatsbyhub');
    } else {
      // if gatsby terminal already exists, return it
      [terminal] = filtered;
    }

    return terminal;
  }
}
