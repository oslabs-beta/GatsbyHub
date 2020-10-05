import got from 'got';

export default class PluginData {
  public static async getPlugins() {
    const keywords = ['gatsby-plugin', 'gatsby-source', 'gatsby-transformer'];

    const npmPackages = keywords.map(async (keyword) => {
      const url = `https://api.npms.io/v2/search?q=${keyword}+keywords:-gatsby-plugin+not:deprecated&size=250`;
      const response = await got(url);
      return JSON.parse(response.body);
    });

    const merged = (await Promise.all(npmPackages)).reduce(
      (arr, obj) => arr.concat(obj.results),
      [],
    );

    interface NpmInterface {
      package: { name: string };
    }

    // keys === plugin names, values === plugin packages
    const uniquePkgs = merged.reduce((obj, elem) => {
      obj[elem.package.name] = obj[elem.package.name] || elem.package;
      return obj;
    }, {});

    return uniquePkgs;
  }

  public static async checker() {
    const npmPackages = await PluginData.getPlugins();
    console.log('checker', npmPackages['gatsby-plugin-benchmark-reporting']);
  }
}
