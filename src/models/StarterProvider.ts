import { TreeDataProvider } from 'vscode';
import Starter from './Starter';
import NpmData from './NpmData';

export default class StarterProvider
implements TreeDataProvider<Starter> {
  data: any;

  constructor() {
    this.data = this.createPlugins();
    this.createPlugins = this.createPlugins.bind(this);
  }

  async createPlugins() {
    const npmData = new NpmData();
    return (await npmData.getNpmPackages('starter')).map(
      (obj: any) =>
        new Starter(obj.name, {
          command: 'gatsbyhub.createWebView',
          title: 'Show Starter WebView',
          arguments: [obj],
        }),
    );
  }

  getTreeItem(element: Starter): Starter | Promise<Starter> {
    return element;
  }

  getChildren(element?: Starter | undefined) {
    if (!element) {
      return this.data;
    }
    return element.children;
  }
}
