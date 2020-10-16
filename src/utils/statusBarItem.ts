import { window, StatusBarItem, StatusBarAlignment } from 'vscode';

export default class StatusBar {
  // defines the type to be a StatusBarItem
  private static statusBarItem: StatusBarItem;

  // returns a StatusBarItem when called on by other StatusBar methods
  private static get item() {
    if (!StatusBar.statusBarItem) {
      StatusBar.statusBarItem = window.createStatusBarItem(
        StatusBarAlignment.Right,
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
    StatusBar.item.text = `$(radio-tower) ${msg}`;
    StatusBar.item.command = 'null';
  }

  // GatsbyCli toggles statusBar between online() and offline() methods
  public static online() {
    StatusBar.item.text = '$(rocket) GatsbyHub';
    StatusBar.item.tooltip = 'Click to develop Gatsby server';
    StatusBar.item.command = 'gatsbyhub.developServer';
  }

  public static offline(port: Number = 8000) {
    StatusBar.item.text = `$(circle-slash) Port: ${port}`;
    StatusBar.item.tooltip = 'Click to close Gatsby server';
    StatusBar.statusBarItem.command = 'gatsbyhub.disposeServer';
  }

  public static dispose() {
    StatusBar.item.dispose();
  }
}
