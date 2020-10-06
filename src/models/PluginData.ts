import got from 'got';
import * as marked from 'marked';

// TODO: filter theme and starter

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
    const uniquePkgs = merged.reduce((obj, elem) => {
      obj[elem.package.name] = obj[elem.package.name] || elem.package;
      return obj;
    }, {});

    const uniquePackageArr = Object.values(uniquePkgs);
    // console.log('length', uniquePackageArr.length);
    // return uniquePackageArr;

    // filters out packages without repositories
    const packagesWithRepo = uniquePackageArr.filter(
      (pkg) => !!pkg.links.repository
    );

    // check package name prefix against approved keywords
    const startsWithAllowedPrefix = (name) =>
      keywords.some((keyword) => name.startsWith(keyword));

    // checks package names with weird prefixes
    const hasGoodName = (pkg) => {
      const { name } = pkg;
      const isScopedPackage = name.startsWith('@');
      if (!isScopedPackage) {
        return startsWithAllowedPrefix(name);
      }

      const nameWithoutScope = name.slice(0, name.indexOf('/'));
      return startsWithAllowedPrefix(nameWithoutScope);
    };

    const packagesWithGoodName = packagesWithRepo.filter((pkgs) =>
      hasGoodName(pkgs)
    );

    const hasReadMe = (pkg) => {
      if (pkg.links.homepage || pkg.readme) return true;
      if (pkg.links.repository) {
        return got(`${pkg.links.repository}/blob/master/README.md`)
          .then((response) => response.statusCode === 200)
          .catch((err) => false);
      }
      return false;
    };

    const packagesWithReadMe = packagesWithGoodName.filter(async (pkg) => {
      const check = await hasReadMe(pkg);
      return check;
    });

    return packagesWithReadMe;
  }

  public static async checker() {
    const data = await PluginData.getPlugins();
    console.log('checker', data.length);
  }

  public static async getReadMe(): Promise<string> {
    try {
      const url =
        'https://raw.githubusercontent.com/gatsbyjs/gatsby/master/packages/gatsby-source-filesystem/README.md';
      // +keywords:-gatsby-plugin+not:deprecated
      const response = await got(url);
      return response.body;
    } catch (error) {
      throw new Error(`Error in getReadMe: ${error}`);
    }
  }

  public static async mdToHtml() {
    const readMe = await this.getReadMe();
    /*     console.log('in mdtohtml: ', marked(readMe)); */
    return marked(readMe);
  }
}
