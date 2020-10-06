import * as vscode from "vscode";
// import react from "React";

export default class PluginWebView {
  static openPluginWebView(): void {
    // createWebviewPanel takes in the type of the webview panel & Title of the panel & showOptions
    const panel = vscode.window.createWebviewPanel(
      "plugin",
      "Plugin",
      vscode.ViewColumn.One
    );
    panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
    </head>
    <body>
      <h3>Install</h3>
      <p><code class="language-text">npm install --save gatsby-source-filesystem</code></p> 
    </body>
    </html>`;

    // we want to iteratively display the readme.markdown in panel.webview
  }
}
