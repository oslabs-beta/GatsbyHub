import * as vscode from 'vscode';

export default class StatusBar {
  static createStatusBarItem() {
    let myStatusBarItem: vscode.StatusBarItem;
    myStatusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100,
    );
    myStatusBarItem.text = 'GatsbyHub';
    myStatusBarItem.show();
    myStatusBarItem.command = 'gatsbyhub.developServer';
    // context.subscriptions.push(myStatusBarItem);
  }
}
