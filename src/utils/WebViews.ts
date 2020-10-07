import { link } from 'fs';
import * as vscode from 'vscode';
import PluginData from '../models/PluginData';
// import react from "React";

export default class PluginWebView {
  static async openPluginWebView({ links }) {
    /*     console.log(name);
    console.log(links.homepage); */
    console.log(
      'in plugin web view',
      await PluginData.getNpmInstall(links.repository, links.homepage)
    );
    // createWebviewPanel takes in the type of the webview panel & Title of the panel & showOptions
    const panel = vscode.window.createWebviewPanel(
      'plugin',
      'Plugin',
      vscode.ViewColumn.One
    );
    panel.webview.html = await PluginData.mdToHtml(
      links.repository,
      links.homepage
    );
  }
}
