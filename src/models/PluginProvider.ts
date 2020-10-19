import { TreeDataProvider } from 'vscode';
import Plugin from './Plugin';
import NpmData from './NpmData';
import { PluginPkg } from '../utils/Interfaces';

export default class PluginProvider implements TreeDataProvider<Plugin> {
	data: Promise<Plugin[]>;

	constructor() {
		this.data = this.createPlugins();
		this.createPlugins = this.createPlugins.bind(this);
	}

	async createPlugins() {
		const npmData = new NpmData();
		return (await Promise.all(await npmData.getNpmPackages('plugin'))).map(
			(obj: PluginPkg) =>
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
