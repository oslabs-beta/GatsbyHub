import * as vscode from 'vscode';
import ThemeData from '../models/ThemeData'
// import react from "React";

export default class ThemeWebView {
  static async openThemeWebView({ links, name }) {
    /*     console.log(name);
    console.log(links.homepage); */
    console.log(
      'in plugin web view',
      await ThemeData.getNpmInstall(links.repository, links.homepage),
    );
    // createWebviewPanel takes in the type of the webview panel & Title of the panel & showOptions
    const panel = vscode.window.createWebviewPanel(
      'theme',
      `Gatsby Theme: ${name}`,
      vscode.ViewColumn.One,
      { enableScripts: true },
    );
    const readMe = await ThemeData.mdToHtml(links.repository, links.homepage);

    panel.webview.html = `
    <div>
    </div>
    ${readMe}`;
  }

  // static installPlugin() {
  //   document.getElementById('install-btn').innerHTML = 'Installing...';
  //   setTimeout(() => {
  //     document.getElementById('install-btn').innerHTML = 'Installed';
  //   }, 3000);
  // const cmdString = await PluginData.getNpmInstall(
  //   links.repository,
  //   links.homepage,
  // );
  // document.getElementById('install-btn').innerHTML = cmdString;
}
}
