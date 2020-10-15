import { TreeItem, Command, TreeItemCollapsibleState } from 'vscode';
/* import * as fs from 'fs';
import * as path from 'path'; */

export default class Starter extends TreeItem {
  constructor(public label: string, command?: Command, public children?: Starter[]) {
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
