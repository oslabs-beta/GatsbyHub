import { TreeDataProvider } from 'vscode';
import Plugin from './Plugin';
import NpmData from './NpmData';

export default class PluginProvider implements TreeDataProvider<Plugin> {
  data: any;

  constructor() {
    this.data = this.createPlugins();
    this.createPlugins = this.createPlugins.bind(this);
  }

  async createPlugins() {
    const npmData = new NpmData();
    return (await npmData.getNpmPackages('plugin')).map(
      (obj: any) =>
        new Plugin(obj.name, {
          command: 'gatsbyhub.createWebView',
          title: 'Show Plugin WebView',
          arguments: [obj],
        })
    );
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
