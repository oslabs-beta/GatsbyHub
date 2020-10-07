import * as vscode from 'vscode';
/* import * as fs from 'fs';
import * as path from 'path'; */

export default class Starter extends vscode.TreeItem {
  constructor(public label: string, command?: vscode.Command, public children?: Starter[]) {
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
