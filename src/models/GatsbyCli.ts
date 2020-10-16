import { window, commands, workspace } from 'vscode';
import StatusBar from '../utils/statusBarItem';
import Utilities from '../utils/Utilities';
import PluginData from './NpmData';

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

  /* - installs gatsby-cli for the user when install gatsby button is clicked - */

  // static keyword: eliminates the need to instantiate to use this method in extenstion.ts
  async installGatsby() {
    // if a gatsby terminal isn't open, create a new terminal. Otherwise, use gatsbyhub terminal
    const activeTerminal = Utilities.getActiveTerminal();

    // if windows user
    if (!process.env.USER) {
      activeTerminal.sendText('npm install -g gatsby-cli');
    } else {
      // then it is linux or unnix based environment
      activeTerminal.sendText('sudo npm install -g gatsby-cli');
      // Mac and Linux requrie password to install
      const inputPassword = await window.showInputBox({
        password: true,
        placeHolder: 'Input administrator password',
      });
      if (inputPassword !== undefined) activeTerminal.sendText(inputPassword);
      // if the password is wrong, show inputbox again
      // else, show terminal
    }
    activeTerminal.show(true);
  }

  /* ------------------ Logic for creating a new Gatsby site ------------------ */

  /**  creates a new site when 'Create New Site' button is clicked
   * currently uses default gatsby starter, but uses gatsby new url. see https://www.gatsbyjs.com/docs/gatsby-cli/
   * NOTE: new site will be created wherever the root directory is currently located
   * the user terminal should be at the directory user wishes to download the files.
   */
  async createSite(starterObj?: any) {
    // get GatsbyHub terminal or create a new terminal if it doesn't exist
    const activeTerminal = Utilities.getActiveTerminal();

    // define string for button in information message
    const openFolderMsg = 'Open Different Folder';
    const continueMsg = 'Continue';
    const cancelMsg = 'Cancel';

    /*
     * Check if the current workspace is a Gatsby project
     * If it is, don't let the user create another site in here
     *
     */
    const gatsbyIsInitiated:
      | boolean
      | null = await Utilities.checkIfGatsbySiteInitiated();

    if (gatsbyIsInitiated) {
      const input = await window.showErrorMessage(
        "Can't create a site in a Gatsby Workspace. If you would like to start a new project, navigate to the parent directory and create a site there.",
        openFolderMsg,
        cancelMsg
      );
      if (input && input === openFolderMsg) {
        commands.executeCommand('vscode.openFolder');
      }
      return;
    }

    if (!starterObj) {
      const input = await window.showInformationMessage(
        'This creates the default starter. If you would like a different starter, refer to the "Starters" menu.',
        'Use default',
        'Choose a different starter'
      );

      if (input === 'Choose a different starter') return;
    }

    // tell user that new site will be created in current directory
    const choice = await window.showWarningMessage(
      `New Gatsby site will be created in current directory
        unless you open a different folder for your project`,
      openFolderMsg,
      continueMsg
    );

    if (choice && choice === openFolderMsg) {
      commands.executeCommand('vscode.openFolder');
    }

    // give user the option to create site in new folder instead
    // give user a place to write the name of their site
    const siteName = await window.showInputBox({
      placeHolder: 'Enter Name of New Site',
    });

    // send command to the terminal
    if (siteName) {
      if (starterObj) {
        const { repository } = starterObj.command.arguments[0].links;
        activeTerminal.sendText(
          `gatsby new ${siteName} ${repository} && cd ${siteName}`
        );
        activeTerminal.sendText('code .');
        activeTerminal.show(true);
      } else {
        activeTerminal.sendText(`gatsby new ${siteName} && cd ${siteName}`);
        activeTerminal.sendText('code .');
        activeTerminal.show(true);
      }
    } else {
      window.showWarningMessage(
        'Must enter a name for your new Gatsby project'
      );
    }
  }

  /* ------ Starts development server and opens project in a new browser ------ */

  public async developServer(): Promise<null> {
    const gatsbyIsInitiated:
      | boolean
      | null = await Utilities.checkIfGatsbySiteInitiated();

    if (!workspace.workspaceFolders) {
      window.showInformationMessage(
        'Open a folder or workspace... (File -> Open Folder)'
      );
      return null;
    }

    if (!workspace.workspaceFolders.length) {
      window.showErrorMessage(
        "You don't have any Gatsby folders in this workspace"
      );
      return null;
    }

    if (!gatsbyIsInitiated) {
      const input = await window.showErrorMessage(
        'Open up a new workspace containing only the site you are working on.',
        'Change Workspace',
        'Cancel'
      );
      if (input && input === 'Change Workspace') {
        commands.executeCommand('vscode.openFolder');
      }
      return null;
    }

    const activeTerminal = Utilities.getActiveServerTerminal();

    activeTerminal.sendText('gatsby develop --open');
    // change status bar to working message while server finishes developing
    StatusBar.working('Starting server');
    // toggle statusBar after 3 seconds so it will dispose server if clicked again
    setTimeout(this.toggleStatusBar, 4000);
    window.showInformationMessage('Gatsby Server Running on port:8000');
    activeTerminal.show(true);
    /** write options to set host, set port, to open site, and to use https
     * gatsby develop only works in the site directory
     * allow user to open folder for their site directory */
    commands.executeCommand('setContext', 'serverIsRunning', true);
    return null;
  }

  /* ---------- Disposes development server by disposing the terminal --------- */

  public disposeServer(): void {
    const activeTerminal = Utilities.getActiveServerTerminal();
    activeTerminal.dispose();
    // change status bar to working message while server finishes disposing
    StatusBar.working('Disposing server');
    // toggle statusBar so it will developServer if clicked again
    setTimeout(this.toggleStatusBar, 3000);
    window.showInformationMessage('Disposing Gatsby Server on port:8000');
    commands.executeCommand('setContext', 'serverIsRunning', false);
  }

  /* --------------------- builds and packages Gatsby site -------------------- */

  async build(): Promise<void> {
    const gatsbyIsInitiated:
      | boolean
      | null = await Utilities.checkIfGatsbySiteInitiated();

    if (!gatsbyIsInitiated) {
      const input = await window.showErrorMessage(
        'Open up a new workspace containing only the site you are working on.',
        'Change Workspace',
        'Cancel'
      );
      if (input && input === 'Change Workspace') {
        commands.executeCommand('vscode.openFolder');
      }
      return;
    }
    // finds path to file in text editor and drops the file name from the path
    // const rootPath = Utilities.getRootPath();

    const activeTerminal = Utilities.getActiveTerminal();
    activeTerminal.show(true);

    // // only cd into rootpath if it exists, otherwise just run command on current workspace
    // if (rootPath) {
    //   activeTerminal.sendText(`cd && cd ${rootPath}`);
    // }
    activeTerminal.sendText('gatsby build');
  }

  /* ---- toggles statusBar between developing server and disposing server ---- */

  private toggleStatusBar(): void {
    if (!this.serverStatus) {
      StatusBar.offline(8000);
    } else {
      StatusBar.online();
    }
    this.serverStatus = !this.serverStatus;
  }

  /* ----------------------- Dispose the status bar item ---------------------- */

  public dispose(): void {
    StatusBar.dispose();
  }

  /* ---------- Logic handling the installation of Plugins and Themes --------- */

  async installPlugin(plugin?: any): Promise<void> {
    const activeTerminal = Utilities.getActiveTerminal();
    const gatsbyIsInitiated:
      | boolean
      | null = await Utilities.checkIfGatsbySiteInitiated();

    if (!gatsbyIsInitiated) {
      const input = await window.showErrorMessage(
        'Open up a new workspace containing only the site you are working on.',
        'Change Workspace',
        'Cancel'
      );
      if (input && input === 'Change Workspace') {
        commands.executeCommand('vscode.openFolder');
      }
      return;
    }
    // const rootPath = await Utilities.getRootPath();
    const { name, links } = plugin.command.arguments[0];
    if (plugin) {
      const installCmnd =
        (await PluginData.getNpmInstall(links.repository, links.homepage)) ||
        `npm install ${name}`;

      // if (rootPath) {
      //   activeTerminal.sendText(`cd && cd ${rootPath}`);
      //   activeTerminal.sendText(installCmnd);
      //   activeTerminal.show(true);
      // } else {
      // }
      activeTerminal.sendText(installCmnd);
      activeTerminal.show(true);
      // check for if "plugin" is a theme or actual plugin
      if (name.startsWith('gatsby-theme')) {
        window.showInformationMessage(
          'Refer to this theme\'s documentation regarding implementation. Simply click on the theme in the "Themes" section.',
          'OK'
        );
      } else {
        window.showInformationMessage(
          'Refer to this plugin\'s documentation regarding further configuration. Simply click on the plugin in the "Plugins" section.',
          'OK'
        );
      }
    }
  }
}
