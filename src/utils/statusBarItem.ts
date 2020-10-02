import * as vscode from 'vscode';
import { window, StatusBarItem } from 'vscode';

export default class StatusBar {
  private static statusBarItem: StatusBarItem;

  static createStatusBarItem() {
    if (!StatusBar.statusBarItem) {
      StatusBar.statusBarItem = window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100,
      );
    }
    // $(pulse) $(broadcast) $(x) $(circle-slash)
    StatusBar.statusBarItem.text =
      '$(broadcast)$(cloud-upload)$(rss)$(radio-tower) GatsbyHub';
    StatusBar.statusBarItem.show();
    // status refers to whether server is running

    StatusBar.statusBarItem.command = 'gatsbyhub.developServer';
  }
}
