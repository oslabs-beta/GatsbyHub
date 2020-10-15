import { TreeDataProvider } from 'vscode';
import Theme from './Theme';
import NpmData from './NpmData';

export default class ThemeProvider implements TreeDataProvider<Theme> {
  data: any;

  constructor() {
    this.data = this.createPlugins();
    this.createPlugins = this.createPlugins.bind(this);
  }

  async createPlugins() {
    const npmData = new NpmData();
    return (await npmData.getNpmPackages('theme')).map(
      (obj: any) =>
        new Theme(obj.name, {
          command: 'gatsbyhub.createWebView',
          title: 'Show Theme WebView',
          arguments: [obj],
        }),
    );
  }

  getTreeItem(element: Theme): Theme | Promise<Theme> {
    return element;
  }

  getChildren(element?: Theme | undefined) {
    if (!element) {
      return this.data;
    }
    return element.children;
  }
}
