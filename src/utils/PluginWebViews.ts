import * as vscode from 'vscode';
import Plugin from '../models/Plugin';
import PluginData from '../models/PluginData';
// import react from "React";

export default class PluginWebView {
  static async openPluginWebView({ links, name }) {
    /*     console.log(name);
    console.log(links.homepage); */
    console.log(
      'in plugin web view',
      await PluginData.getNpmInstall(links.repository, links.homepage),
    );
    // createWebviewPanel takes in the type of the webview panel & Title of the panel & showOptions
    const panel = vscode.window.createWebviewPanel(
      'plugin',
      `Gatsby Plugin: ${name}`,
      vscode.ViewColumn.One,
      { enableScripts: true },
    );
    const readMe = await PluginData.mdToHtml(links.repository, links.homepage);

    panel.webview.html = `
    <div>
    </div>
    ${readMe}`;
  }

  static installPlugin() {
    document.getElementById('install-btn').innerHTML = 'Installing...';
    setTimeout(() => {
      document.getElementById('install-btn').innerHTML = 'Installed';
    }, 3000);
    // const cmdString = await PluginData.getNpmInstall(
    //   links.repository,
    //   links.homepage,
    // );
    // document.getElementById('install-btn').innerHTML = cmdString;
  }
}
