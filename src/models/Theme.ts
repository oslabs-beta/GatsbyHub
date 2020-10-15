import { TreeItem, Command, TreeItemCollapsibleState } from 'vscode';
/* import * as fs from 'fs';
import * as path from 'path'; */

export default class Theme extends TreeItem {
  constructor(public label: string, command?: Command, public children?: Theme[]) {
    super(
      label,
      children === undefined
        ? TreeItemCollapsibleState.None
        : TreeItemCollapsibleState.Collapsed
    );
    this.children = children;
    this.command = command;
  }
}
