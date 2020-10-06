// import * as vscode from 'vscode';
// eslint-disable-next-line object-curly-newline
import { window, commands, workspace } from 'vscode';
import StatusBar from '../utils/statusBarItem';
import Utilities from '../utils/Utilities';
import { getRootPath } from '../utils/workspaceResolver';

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
    this.showPopUpMsg = this.showPopUpMsg.bind(this);
  }

  // installs gatsby-cli for the user when install gatsby button is clicked
  // static keyword: eliminates the need to instantiate to use this method in extenstion.ts
  static async installGatsby() {
    // if a gatsby terminal isn't open, create a new terminal. Otherwise, use gatsbyhub terminal
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.sendText('sudo npm install -g gatsby-cli');
    // !! check if admin password is required before showing password box

    // Creates a password inputbox when install gatsby button is clicked
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

    if (choice && choice === openFolderMsg) {
      commands.executeCommand('vscode.openFolder');
    }

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
  public async developServer() {
    if (!workspace.workspaceFolders) {
      return this.showPopUpMsg(
        'Open a folder or workspace... (File -> Open Folder)',
        true
      );
    }

    if (!workspace.workspaceFolders.length) {
      return this.showPopUpMsg(
        "You don't have any Gatsby folders in this workspace",
        true
      );
    }

    // const workspacePath = await workspaceResolver();

    // finds path to file in text editor and drops the file name from the path
    const rootPath = getRootPath();

    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.show();

    // only cd into rootpath if it exists, otherwise just run command on current workspace
    if (rootPath) {
      activeTerminal.sendText(`cd && cd ${rootPath}`);
    }
    activeTerminal.sendText('gatsby develop --open');
    // change status bar to working message while server finishes developing
    StatusBar.working('Starting server');
    // toggle statusBar after 3 seconds so it will dispose server if clicked again
    setTimeout(this.toggleStatusBar, 4000);
    window.showInformationMessage('Gatsby Server Running on port:8000');
    /** write options to set host, set port, to open site, and to use https
     * gatsby develop only works in the site directory
     * allow user to open folder for their site directory */
  }

  // Disposes development server by disposing the terminal
  public disposeServer() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.dispose();
    // change status bar to working message while server finishes disposing
    StatusBar.working('Disposing server');
    // toggle statusBar so it will developServer if clicked again
    setTimeout(this.toggleStatusBar, 3000);
    window.showInformationMessage('Disposing Gatsby Server on port:8000');
  }

  // builds and packages Gatsby site
  static async build() {
    // finds path to file in text editor and drops the file name from the path
    const rootPath = getRootPath();

    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.show();

    // only cd into rootpath if it exists, otherwise just run command on current workspace
    if (rootPath) {
      activeTerminal.sendText(`cd && cd ${rootPath}`);
    }
    activeTerminal.sendText('gatsby build');
  }

  // toggles statusBar between developing server and disposing server
  private toggleStatusBar(): void {
    if (!this.serverStatus) {
      StatusBar.offline(8000);
    } else {
      StatusBar.online();
    }
    this.serverStatus = !this.serverStatus;
  }

  public dispose() {
    StatusBar.dispose();
  }

  private showPopUpMsg(
    msg: string,
    isErrorMsg: boolean = false,
    isWarning: boolean = false
  ) {
    if (isErrorMsg) window.showErrorMessage(msg);
    else if (isWarning) window.showWarningMessage(msg);
    else window.showInformationMessage(msg);
  }

  static installPlugin() {
    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.show();
    console.log('Plugin Installed!');
  }
}
