import got from 'got';
import * as marked from 'marked';
import { PluginPkg, NpmPkg } from '../utils/Interfaces';

export default class NpmData {
	pluginKeywords: string[];

	starterKeywords: string[];

	themeKeywords: string[];

	constructor() {
		this.pluginKeywords = [
			'gatsby',
			'gatsby-plugin',
			'gatsby-source',
			'gatsby-transformer',
		];
		this.starterKeywords = ['gatsby-starter'];
		this.themeKeywords = ['gatsby-theme'];
		this.getNpmPackages = this.getNpmPackages.bind(this);
	}

	// returns an object with plugin packages
	// retrieves plugin packages from npm api
	public async getNpmPackages(npmType: string = 'plugin') {
		let keywords: string[] = [];
		if (npmType === 'plugin') {
			keywords = this.pluginKeywords;
		} else if (npmType === 'starter') {
			keywords = this.starterKeywords;
		} else if (npmType === 'theme') {
			keywords = this.themeKeywords;
		}

		// check package name prefix against approved keywords
		const startsWithAllowedPrefix = (name: string) =>
			keywords.some((keyword) => name.startsWith(keyword));

		// checks package names with weird prefixes
		const hasGoodName = (pkg: PluginPkg): boolean => {
			const { name } = pkg;
			const isScopedPackage = name.startsWith('@');
			if (!isScopedPackage) {
				return startsWithAllowedPrefix(name);
			}
			const nameWithoutScope = name.slice(0, name.indexOf('/'));
			return startsWithAllowedPrefix(nameWithoutScope);
		};

		// checks that package has a readme
		const hasReadMe = async (pkg: PluginPkg): Promise<boolean> => {
			if (pkg.links.homepage || pkg.readme) return true;
			if (pkg.links.repository) {
				try {
					const response: any = await got(
						`${pkg.links.repository}/blob/master/README.md`
					);
					return response.statusCode === 200;
				} catch (error) {
					throw new Error(error);
				}
			}
			return false;
		};

		// creates an array of npm objects based on keywords array
		// npm objects contains number of packages and array of package objects
		let npmPackages = keywords.map(async (keyword) => {
			try {
				const url = `https://api.npms.io/v2/search?q=${keyword}&size=250`;
				// +keywords:-gatsby-plugin+not:deprecated
				const response = await got(url);
				return JSON.parse(response.body);
			} catch (error) {
				throw new Error(error);
			}
		});

		// merges the array of npm package objects together to a single array
		npmPackages = (await Promise.all(npmPackages)).reduce(
			(arr, obj) => arr.concat(obj.results),
			[]
		);

		/**
		 * creates an object with unique package names and packages
		 * eliminates duplicate packages
		 * keys === plugin names, values === plugin packages
		 */
		const uniquePackagesObj = (await Promise.all(npmPackages)).reduce(
			(obj: any, elem: NpmPkg) => {
				elem.package.score = elem.score.final;
				obj[elem.package.name] = obj[elem.package.name] || elem.package;
				return obj;
			},
			{}
		);

		// turns uniquePkgs object into an array of plugin packages
		npmPackages = Object.values(uniquePackagesObj);

		// filters out packages without repositories
		npmPackages = (await Promise.all(npmPackages)).filter(
			(pkg: PluginPkg): boolean => !!pkg.links.repository
		);

		// runs every package through hasGoodName = checks package names with weird prefixes
		npmPackages = (await Promise.all(npmPackages)).filter((pkgs: PluginPkg) =>
			hasGoodName(pkgs)
		);

		// check package is not a starter or theme
		if (npmType === 'plugin') {
			npmPackages = (await Promise.all(npmPackages)).filter(
				(pkgs: PluginPkg) =>
					!pkgs.name.startsWith('gatsby-theme' || 'gatsby-starter')
			);
		}

		// filters out Gatsby and Gatsby-cli
		npmPackages = (await Promise.all(npmPackages)).filter(
			(pkgs: PluginPkg) => pkgs.name !== 'gatsby-cli' && pkgs.name !== 'gatsby'
		);

		// filters out packages without readme's
		npmPackages = (await Promise.all(npmPackages)).filter(
			async (pkg: PluginPkg) => {
				try {
					const check = await hasReadMe(pkg);
					return check;
				} catch (error) {
					throw new Error(error);
				}
			}
		);

		/**
		 * Sorts the plugins by npm 'final' score.
		 * Highest score to lowest.
		 *
		 * This score is calculated by the package's average:
		 * Popularity score
		 * Quality score &
		 * Maintenance score.
		 *
		 */
		npmPackages = (await Promise.all(npmPackages)).sort(
			(a: PluginPkg, b: PluginPkg) => {
				return a.score < b.score ? 1 : -1;
			}
		);

		return npmPackages;
	}

	private static async getReadMe(
		pluginRepo: string,
		pluginHomepage: string
	): Promise<string> {
		try {
			let goodUrl: string;
			if (pluginRepo === 'https://github.com/gatsbyjs/gatsby') {
				const noTree = pluginHomepage.replace('/tree', '');
				const raw = noTree.replace('github', 'raw.githubusercontent');
				goodUrl = raw.replace('#readme', '/README.md');
			} else {
				const raw = pluginRepo.replace('github', 'raw.githubusercontent');
				goodUrl = `${raw}/master/README.md`;
			}

			const response = await got(goodUrl);
			return response.body;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async mdToHtml(
		pluginRepo: string,
		pluginHomepage: string
	): Promise<string> {
		const readMe = await this.getReadMe(pluginRepo, pluginHomepage);
		return marked(readMe);
	}

	public static async getNpmInstall(
		pluginRepo: string,
		pluginHomepage: string
	) {
		try {
			let goodUrl: string;
			if (pluginRepo === 'https://github.com/gatsbyjs/gatsby') {
				const noTree = pluginHomepage.replace('/tree', '');
				const raw = noTree.replace('github', 'raw.githubusercontent');
				goodUrl = raw.replace('#readme', '/README.md');
			} else {
				const raw = pluginRepo.replace('github', 'raw.githubusercontent');
				goodUrl = `${raw}/master/README.md`;
			}
			// example readme:
			// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-link#readme

			const response = await got(goodUrl);
			const findNpm = response.body.slice(response.body.indexOf('npm install'));
			const install = findNpm.slice(0, findNpm.indexOf('`'));
			return install;
		} catch (error) {
			throw new Error(error);
		}
	}
}
