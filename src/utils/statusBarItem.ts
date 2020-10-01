import * as vscode from 'vscode';

export default class StatusBar {
  static createStatusBarItem() {
    const myStatusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100,
    );
    myStatusBarItem.text = 'GatsbyHub';
    myStatusBarItem.show();
    // status refers to whether server is running

    myStatusBarItem.command = 'gatsbyhub.developServer';

    // context.subscriptions.push(myStatusBarItem);
  }
}
