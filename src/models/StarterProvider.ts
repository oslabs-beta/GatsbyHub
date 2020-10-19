import { TreeDataProvider } from 'vscode';
import Starter from './Starter';
import NpmData from './NpmData';
import { PluginPkg } from '../utils/Interfaces';

export default class StarterProvider implements TreeDataProvider<Starter> {
	data: Promise<Starter[]>;

	constructor() {
		this.data = this.createStarters();
		this.createStarters = this.createStarters.bind(this);
	}

	async createStarters() {
		const npmData = new NpmData();
		return (await Promise.all(await npmData.getNpmPackages('starter'))).map(
			(obj: PluginPkg) =>
				new Starter(obj.name, {
					command: 'gatsbyhub.createWebView',
					title: 'Show Starter WebView',
					arguments: [obj],
				})
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
