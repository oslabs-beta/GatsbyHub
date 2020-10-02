import * as vscode from 'vscode';
import Plugin from './Plugin';

export default class PluginProvider implements vscode.TreeDataProvider<Plugin> {
  data: Plugin[];

  constructor() {
    this.data = [
      new Plugin('gatsby-source-filesystem'),
      new Plugin('gatsby-plugin-react-helmet'),
      new Plugin('gatsby-plugin-sharp'),
      new Plugin('gatsby-plugin-manifest'),
      new Plugin('gatsby-image'),
      new Plugin('gatsby-plugin-page-creator'),
      new Plugin('gatsby-plugin-typescript'),
      new Plugin('gatsby-transformer-sharp'),
      new Plugin('gatsby-plugin-offline'),
      new Plugin('gatsby-plugin-styled-components'),
      new Plugin('gatsby-remark-images'),
      new Plugin('gatsby-plugin-mdx'),
      new Plugin('gatsby-transformer-remark'),
      new Plugin('gatsby-plugin-sitemap'),
      new Plugin('gatsby-plugin-sass', [
        new Plugin('Peer Dependencies', [new Plugin('node-sass')]),
        new Plugin('Docs', [new Plugin('Link to Docs')]),
      ]),
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
