import * as vscode from 'vscode';
import { window, StatusBarItem } from 'vscode';

export default class StatusBar {
  private static statusBarItem: StatusBarItem;

  private static get Item() {
    if (!StatusBar.statusBarItem) {
      StatusBar.statusBarItem = window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100,
      );
    }
    // $(pulse) $(broadcast)$(cloud-upload)$(rss)$(radio-tower) $(circle-slash)
    // StatusBar.statusBarItem.text = '$(radio-tower) GatsbyHub';
    StatusBar.statusBarItem.show();
    return StatusBar.statusBarItem;
    // status refers to whether server is running
  }

  static init() {
    StatusBar.online();
  }

  public static online() {
    StatusBar.Item.text = '$(radio-tower) GatsbyHub';
    StatusBar.Item.tooltip = 'Click to develop Gatsby server';
    StatusBar.Item.command = 'gatsbyhub.developServer';
  }

  public static offline(port: Number = 8000) {
    StatusBar.Item.text = `$(circle-slash) Port: ${port}`;
    StatusBar.Item.tooltip = 'Click to close Gatsby server';
    StatusBar.statusBarItem.command = 'gatsbyhub.disposeServer';
  }

  public static dispose() {
    StatusBar.Item.dispose();
  }
}
