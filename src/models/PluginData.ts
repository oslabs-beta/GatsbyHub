/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import got from 'got';
import * as marked from 'marked';

export default class PluginData {
  // returns an object with plugin packages
  // retrieves plugin packages from npm api
  public static async getPlugins() {
    const keywords = [
      'gatsby',
      'gatsby-plugin',
      'gatsby-source',
      'gatsby-transformer',
    ];

    // defines object shape of each element in merged array
    interface NpmPkg {
      package: { name: string };
    }

    // defines object shape of each plugin package in array
    interface PluginPkg {
      name: string;
      links: {
        repository: string;
        homepage: string;
      };
      readme: string;
    }

    // check package name prefix against approved keywords
    const startsWithAllowedPrefix = (name: string) =>
      keywords.some((keyword) => name.startsWith(keyword));

    // checks package names with weird prefixes
    const hasGoodName = (pkg: PluginPkg) => {
      const { name } = pkg;
      const isScopedPackage = name.startsWith('@');
      if (!isScopedPackage) {
        return startsWithAllowedPrefix(name);
      }
      const nameWithoutScope = name.slice(0, name.indexOf('/'));
      return startsWithAllowedPrefix(nameWithoutScope);
    };

    const hasReadMe = (pkg: PluginPkg) => {
      if (pkg.links.homepage || pkg.readme) return true;
      if (pkg.links.repository) {
        return got(`${pkg.links.repository}/blob/master/README.md`)
          .then((response) => response.statusCode === 200)
          .catch((err) => false);
      }
      return false;
    };

    // creates an array of npm objects based on keywords array
    // npm objects contains number of packages and array of package objects
    const npmPackages = keywords.map(async (keyword) => {
      const url = `https://api.npms.io/v2/search?q=${keyword}&size=250`;
      // +keywords:-gatsby-plugin+not:deprecated
      const response = await got(url);
      return JSON.parse(response.body);
    });

    // merges the array of npm package objects together to a single array
    const merged = (await Promise.all(npmPackages)).reduce(
      (arr, obj) => arr.concat(obj.results),
      []
    );

    // creates an object with unique package names and packages
    // eliminates duplicate packages
    // keys === plugin names, values === plugin packages
    const uniquePkgs = merged.reduce((obj: any, elem: NpmPkg) => {
      obj[elem.package.name] = obj[elem.package.name] || elem.package;
      return obj;
    }, {});

    // turns uniquePkgs object into an array of plugin packages
    const uniquePackageArr = Object.values(uniquePkgs);

    // filters out packages without repositories
    const packagesWithRepo = uniquePackageArr.filter(
      (pkg: any): boolean => !!pkg.links.repository
    );

    const packagesWithGoodName = packagesWithRepo.filter((pkgs: any) =>
      hasGoodName(pkgs)
    );

    // check package is not a starter or theme
    const noStarterNoTheme = packagesWithGoodName.filter(
      (pkgs: any) => !pkgs.name.startsWith('gatsby-theme' || 'gatsby-starter')
    );

    // filters out Gatsby and Gatsby-cli
    const noGatsbyCli = noStarterNoTheme.filter(
      (pkgs: any) => pkgs.name !== 'gatsby-cli' && pkgs.name !== 'gatsby'
    );

    const packagesWithReadMe = noGatsbyCli.filter(async (pkg: any) => {
      const check = await hasReadMe(pkg);
      return check;
    });

    return packagesWithReadMe;
  }

  public static async checker() {
    const data = await PluginData.getPlugins();
    console.log('checker', data.length);
  }

  private static async getReadMe(
    pluginRepo: string,
    pluginHomepage: string
  ): Promise<string> {
    try {
      /* console.log('in getReadMe: ', pluginName, pluginReadMe); */
      let goodUrl: string;
      if (pluginRepo === 'https://github.com/gatsbyjs/gatsby') {
        const noTree = pluginHomepage.replace('/tree', '');
        const raw = noTree.replace('github', 'raw.githubusercontent');
        goodUrl = raw.replace('#readme', '/README.md');
      } else {
        const raw = pluginRepo.replace('github', 'raw.githubusercontent');
        goodUrl = `${raw}/master/README.md`;
      }
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-link#readme

      const response = await got(goodUrl);
      const findNpm = response.body.slice(response.body.indexOf('npm install'));
      const install = findNpm.slice(0, findNpm.indexOf('`'));
      return response.body;
    } catch (error) {
      throw new Error(`Error in getReadMe: ${error}`);
    }
  }

  public static async mdToHtml(pluginRepo: string, pluginHomepage: string) {
    const readMe = await this.getReadMe(pluginRepo, pluginHomepage);
    /*   console.log(marked(readMe)); */
    return marked(readMe);
  }

  public static async getNpmInstall(
    pluginRepo: string,
    pluginHomepage: string
  ) {
    try {
      /* console.log('in getReadMe: ', pluginName, pluginReadMe); */
      let goodUrl: string;
      if (pluginRepo === 'https://github.com/gatsbyjs/gatsby') {
        const noTree = pluginHomepage.replace('/tree', '');
        const raw = noTree.replace('github', 'raw.githubusercontent');
        goodUrl = raw.replace('#readme', '/README.md');
      } else {
        const raw = pluginRepo.replace('github', 'raw.githubusercontent');
        goodUrl = `${raw}/master/README.md`;
      }
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-link#readme

      const response = await got(goodUrl);
      const findNpm = response.body.slice(response.body.indexOf('npm install'));
      const install = findNpm.slice(0, findNpm.indexOf('`'));
      return install;
    } catch (error) {
      throw new Error(`Error in getNpmInstall: ${error}`);
    }
  }
}
