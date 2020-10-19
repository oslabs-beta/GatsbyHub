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
		// let thisPromise = new Promise(function() : Promise<Plugin> {
		//  const firstPlugins = async () => {
		//         return (await Promise.all((await npmData.getNpmPackages('plugin')).slice(0, 1))).map(
		//           (obj: PluginPkg) =>
		//             new Plugin(obj.name, {
		//               command: 'gatsbyhub.createWebView',
		//               title: 'Show Plugin WebView',
		//               arguments: [obj],
		//             })
		//         );
		//       };
		//       .then(const secondPlugins = async () => {
		//           return (await Promise.all((await npmData.getNpmPackages('plugin')).slice(1))).map(
		//             (obj: PluginPkg) =>
		//               new Plugin(obj.name, {
		//                 command: 'gatsbyhub.createWebView',
		//                 title: 'Show Plugin WebView',
		//                 arguments: [obj],
		//               })
		//           );
		//         })
		//   }
		// })
		// const pluginPromise = new Promise(((await Promise.all(npmData.getNpmPackages('plugin')).slice(0, 1))).map(
		//   (obj: PluginPkg) =>
		//     new Plugin(obj.name, {
		//       command: 'gatsbyhub.createWebView',
		//       title: 'Show Plugin WebView',
		//       arguments: [obj],
		//     })))
		//     .then((await Promise.all((await npmData.getNpmPackages('plugin')).slice(0, 1))).map(
		//       (obj: PluginPkg) =>
		//         new Plugin(obj.name, {
		//           command: 'gatsbyhub.createWebView',
		//           title: 'Show Plugin WebView',
		//           arguments: [obj],
		//         })
		//     ));
		//     return Promise.resolve(pluginPromise);
		// return (await Promise.all((await npmData.getNpmPackages('plugin')).slice(0, 1))).map(
		//   (obj: PluginPkg) =>
		//     new Plugin(obj.name, {
		//       command: 'gatsbyhub.createWebView',
		//       title: 'Show Plugin WebView',
		//       arguments: [obj],
		//     })
		// );

		// THIS Way works but is not lazy loading
		const firstPlugins = async () => {
			return (
				await Promise.all((await npmData.getNpmPackages('plugin')).slice(0, 1))
			).map(
				(obj: PluginPkg) =>
					new Plugin(obj.name, {
						command: 'gatsbyhub.createWebView',
						title: 'Show Plugin WebView',
						arguments: [obj],
					})
			);
		};
		const secondPlugins = async () => {
			return (
				await Promise.all((await npmData.getNpmPackages('plugin')).slice(1))
			).map(
				(obj: PluginPkg) =>
					new Plugin(obj.name, {
						command: 'gatsbyhub.createWebView',
						title: 'Show Plugin WebView',
						arguments: [obj],
					})
			);
		};
		return (await firstPlugins()).concat(await secondPlugins());
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
