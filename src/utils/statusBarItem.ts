import * as vscode from 'vscode';
import { window, StatusBarItem } from 'vscode';

export default class StatusBar {
  // defines the type to be a vscode.StatusBarItem
  private static statusBarItem: StatusBarItem;

  // returns a StatusBarItem when called on by other StatusBar methods
  private static get Item() {
    if (!StatusBar.statusBarItem) {
      StatusBar.statusBarItem = window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100,
      );
    }
    // $(pulse) $(broadcast)$(cloud-upload)$(rss)$(radio-tower) $(circle-slash)
    StatusBar.statusBarItem.show();
    return StatusBar.statusBarItem;
  }

  // initializes the statusBar by calling StatusBar.online method
  // this is currently redundant, but it allows for loading sequence if we want
  static init() {
    StatusBar.online();
  }

  static working(msg: string = 'connecting...') {
    StatusBar.Item.text = `$(radio-tower) ${msg}`;
    StatusBar.Item.command = 'null';
  }

  // GatsbyCli toggles statusBar between online() and offline() methods
  public static online() {
    StatusBar.Item.text = '$(rocket) GatsbyHub';
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
