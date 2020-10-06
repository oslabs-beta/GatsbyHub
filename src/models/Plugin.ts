import * as vscode from 'vscode';
/* import * as fs from 'fs';
import * as path from 'path'; */

export default class Plugin extends vscode.TreeItem {
  constructor(public label: string, command?: vscode.Command, public children?: Plugin[]) {
    super(
      label,
      children === undefined
        ? vscode.TreeItemCollapsibleState.None
        : vscode.TreeItemCollapsibleState.Collapsed
    );
    this.children = children;
    this.command = command;
  }
}
