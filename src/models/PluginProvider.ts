import * as vscode from 'vscode';
import Plugin from './Plugin';

export default class PluginProvider implements vscode.TreeDataProvider<Plugin> {
  data: Plugin[];

  constructor() {
    this.data = [
      new Plugin('gatsby-plugin-sass'),
      new Plugin('gatsby-plugin-sass'),
      new Plugin('gatsby-plugin-sass'),
    ];
  }

  getTreeItem(element: Plugin): Plugin | Promise<Plugin> {
    return element;
  }

  getChildren(element?: Plugin | undefined) {
    if (!element) {
      return this.data;
    }
    return element.children;
  }
}
