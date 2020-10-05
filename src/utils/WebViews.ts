import * as vscode from "vscode";
// import react from "React";

export default class PluginWebView {
  static openPluginWebView(): void {
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
  }
}
