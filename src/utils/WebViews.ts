import * as vscode from 'vscode';
import Plugin from '../models/Plugin';
import PluginData from '../models/PluginData';
// import react from "React";

export default class PluginWebView {
  static async openPluginWebView({ links, name, version, description }) {
    const readMe = await PluginData.mdToHtml(links.repository, links.homepage);
    const title = name
      .replace(/-/g, ' ')
      .replace(/^\w?|\s\w?/g, (match: string) => match.toUpperCase());
    // createWebviewPanel takes in the type of the webview panel & Title of the panel & showOptions
    const panel = vscode.window.createWebviewPanel(
      'plugin',
      `Gatsby Plugin: ${title}`,
      vscode.ViewColumn.One,
      { enableScripts: true },
    );

    panel.webview.html = `
    <style>
      .plugin-header {
        position: fixed;
        top: 0;
        background-color: var(--vscode-editor-background);
        width: 100vw;
      }
      body {
        position: absolute;
        top: 9rem;
      }
    </style>
    <div class="plugin-header">
      <h1>${title}</h1>
      <p>Version: ${version}</p>
      <p>${description}</p>
      <hr class="solid">
    </div>
    <div class="readme">
      ${readMe}
    </div>
    `;
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
