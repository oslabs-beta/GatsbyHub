// Extract commands and modularize them

// import * as vscode from 'vscode';
import { window, commands } from 'vscode';
import StatusBar from '../utils/statusBarItem';
import Utilities from '../utils/Utilities';

// interface GatsbyCliInterface {
//   status: Boolean;
// }

export default class GatsbyCli {
  private serverStatus: boolean = false;

  // installs gatsby-cli for the user when install gatsby button is clicked
  //  static keyword: eliminates the need to instantiate to use this method in extenstion.ts
  static async installGatsby() {
    // if a gatsby terminal isn't open, create a new terminal. Otherwise, use gatsbyhub terminal
    const activeTerminal = Utilities.getActiveTerminal();

    activeTerminal.sendText('sudo npm install -g gatsby-cli');
    // Creates a password inputbox when install gatsby button is clicked
    // NOTE: comeback to this
    // if admin password is required:
    // Creates an inputbox for password when install gatsby button is clicked
    const inputPassword = await window.showInputBox({
      password: true,
      placeHolder: 'Input administrator password',
    });
    if (inputPassword !== undefined) activeTerminal.sendText(inputPassword);

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
    const root = await commands.executeCommand('vscode.openFolder');
    // console.log(root);

    const siteName = await window.showInputBox({
      placeHolder: 'Input new site name',
    });
    activeTerminal.sendText(`gatsby new ${siteName}`);

    activeTerminal.show();
  }

  static async developServer() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.show();
    console.log('Status Bar Command Worked!!');
    // vscode.commands.executeCommand('createStatusBarItem');
    /** write in active terminal gatsby develop
    options to set host, set port, to open site, and to use https - research how to create little
    icons gatsby develop only works in the site directory, allow user to open folder for
    their site directory
    two seperate methods toggle between start and stop server
    need a global variable to store whether or not server is running */
    activeTerminal.sendText('gatsby develop --open');
    activeTerminal.show();
  }

  static async build() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.sendText('gatsby build');
    activeTerminal.show();
    console.log('Build Site works!');
  }

  private toggleStatusBarItem() {
    // if (!this.serverStatus) {
    //   StatusBar.offline();
    // } else {
    //   StatusBar.online();
    // }
    this.serverStatus = !this.serverStatus;
  }

  static installPlugin() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.show();
    console.log('Plugin Installed!');
  }
}
