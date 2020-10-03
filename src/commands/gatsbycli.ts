// import * as vscode from 'vscode';
// eslint-disable-next-line object-curly-newline
import { window, commands, Uri } from 'vscode';
import * as path from 'path';
import StatusBar from '../utils/statusBarItem';
import Utilities from '../utils/Utilities';

// interface GatsbyCliInterface {
//   status: Boolean;
// }

// Defines the functionality of the Gatsby CLI Commands
export default class GatsbyCli {
  private serverStatus: boolean;

  initStatusBar: void;

  constructor() {
    // Defines the condition on which way to toggle statusBarItem
    this.serverStatus = false;
    // Initializes the StatusBarItem
    this.initStatusBar = StatusBar.init();
    this.toggleStatusBar = this.toggleStatusBar.bind(this);
    this.developServer = this.developServer.bind(this);
    this.disposeServer = this.disposeServer.bind(this);
  }

  // installs gatsby-cli for the user when install gatsby button is clicked
  // static keyword: eliminates the need to instantiate to use this method in extenstion.ts
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
    // get GatsbyHub terminal or create a new terminal if it doesn't exist
    const activeTerminal = Utilities.getActiveTerminal();
    // define string for button in information message
    const openFolderMsg: string = 'Open Folder';
    // tell user that new site will be created in current directory
    const choice = await window.showInformationMessage(
      `New Gatsby site will be created in current directory 
        unless you open a different folder for your project`,
      openFolderMsg
    );

    // give user the option to create site in new folder instead
    /*     if (choice && choice === openFolderMsg) {
      commands.executeCommand('vscode.openFolder');
    } */
    // give user a place to write the name of their site
    const siteName = await window.showInputBox({
      placeHolder: 'Enter-new-site-filename',
    });

    // give user the option to create site in new folder instead
    /*     const workspacePath = Uri.file(
      path.resolve(__dirname, `../../${siteName}`)
    );
    console.log('workspacePath: ', workspacePath); */
    // you can specify where the new window will open to (our new gatsby site)
    /*     commands.executeCommand('vscode.openFolder', workspacePath, true);
     */
    if (choice && choice === openFolderMsg) {
      commands.executeCommand('vscode.openFolder');
    }
    // send command to the terminal
    if (siteName) {
      activeTerminal.sendText(`gatsby new ${siteName} && cd ${siteName}`);
      activeTerminal.show();
    } else {
      window.showWarningMessage(
        'Must enter a name for your new Gatsby directory'
      );
    }
  }

  // Starts development server and opens project in a new browser
  public developServer() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.sendText('gatsby develop --open');
    activeTerminal.show();
    // toggle statusBar so it will dispose server if clicked again
    this.toggleStatusBar();
    window.showInformationMessage('Gatsby Server Running on port:8000');
    /** write options to set host, set port, to open site, and to use https
     * gatsby develop only works in the site directory
     * allow user to open folder for their site directory */
  }

  // Disposes development server by disposing the terminal
  public disposeServer() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.dispose();
    // toggle statusBar so it will developServer if clicked again
    this.toggleStatusBar();
    window.showInformationMessage('Disposing Gatsby Server on port:8000');
  }

  // builds and packages Gatsby site
  static async build() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.sendText('gatsby build');
    activeTerminal.show();
  }

  // toggles statusBar between developing server and disposing server
  private toggleStatusBar(): void {
    if (!this.serverStatus) {
      console.log('Dispose Gatsby Server!');
      StatusBar.offline(8000);
    } else {
      console.log('Develop Gatsby Server!');
      StatusBar.online();
    }
    this.serverStatus = !this.serverStatus;
  }

  public dispose() {
    StatusBar.dispose();
  }

  static installPlugin() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.show();
    console.log('Plugin Installed!');
  }
}
