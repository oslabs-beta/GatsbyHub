import * as vscode from 'vscode';
import PluginData from '../models/PluginData';
// import react from "React";

export default class PluginWebView {
  static async openPluginWebView() {
    // createWebviewPanel takes in the type of the webview panel & Title of the panel & showOptions
    const panel = vscode.window.createWebviewPanel(
      'plugin',
      'Plugin',
      vscode.ViewColumn.One
    );
    panel.webview.html = await PluginData.mdToHtml();
  }
}
