import { window, ViewColumn } from 'vscode';
import PluginData from '../models/NpmData';

export default class WebViews {
  static async openWebView({ links, name, version, description }: any) {
    // const { links, name, version, description } = npmPackage;
    const readMe = await PluginData.mdToHtml(links.repository, links.homepage);

    // turn npm package name from snake-case to standard capitalized title
    const title = name
      .replace(/-/g, ' ')
      .replace(/^\w?|\s\w?/g, (match: string) => match.toUpperCase());

    // createWebviewPanel takes in the type of the webview panel & Title of the panel & showOptions
    const panel = window.createWebviewPanel(
      'plugin',
      `Gatsby Plugin: ${title}`,
      ViewColumn.One
    );

    // create a header for each npm package and display README underneath header
    // currently #install-btn does not work
    panel.webview.html = `
    <style>
      .plugin-header {
        position: fixed;
        top: 0;
        background-color: var(--vscode-editor-background);
        width: 100vw;
      }

      #title-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-text: center;
      }

      #install-btn {
        height: 1.5rem;
        margin: 1rem;
      }

      body {
        position: absolute;
        top: 9rem;
      }
    </style>
    <div class="plugin-header">
      <div id="title-btn">
        <h1 id="title">${title}</h1>
        <button id="install-btn">Install</button>
      </div>
      <p>Version: ${version}</p>
      <p>${description}</p>
      <hr class="solid">
    </div>
    ${readMe}
    `;

    // close the webview when not looking at it
    panel.onDidChangeViewState((e) => {
      if (!e.webviewPanel.active) {
        panel.dispose();
      }
    });
  }
  // potentially add in install functionality in webview
  // static installPlugin() {
  //   document.getElementById('install-btn').innerHTML = 'Installing...';
  //   setTimeout(() => {
  //     document.getElementById('install-btn').innerHTML = 'Installed';
  //   }, 3000);
  //   // const cmdString = await PluginData.getNpmInstall(
  //   //   links.repository,
  //   //   links.homepage,
  //   // );
  //   // document.getElementById('install-btn').innerHTML = cmdString;
  // }
}
