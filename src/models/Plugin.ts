import * as vscode from 'vscode';
/* import * as fs from 'fs';
import * as path from 'path'; */

export default class Plugin extends vscode.TreeItem {
  constructor(public label: string, public children?: Plugin[]) {
    super(
      label,
      children === undefined
        ? vscode.TreeItemCollapsibleState.None
        : vscode.TreeItemCollapsibleState.Expanded
    );
    this.children = children;
  }
}
