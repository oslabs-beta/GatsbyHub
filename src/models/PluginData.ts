const npmApi = require("npm-api");
const Maintainer = require("npm-api/lib/models/maintainer");
const Repo = require("npm-api/lib/models/repo");
const npm = new npmApi();
const m = new Maintainer("lekoarts");

// export async function PluginData() {
//
// let pluginArray = [];
export default async function plugRepo() {
  try {
    // let pluginArray = [];
    const r = await m.repos();
    const repo = new Repo(r);
    const pluginArray = repo.name;
    console.log("inside of plugRepo -- ", pluginArray);
    return pluginArray;
  } catch (error) {
    throw new Error(error);
  }
}
//
// use below to console log in other files
// async function tryThis() {
//     console.log("Does this work", await PluginData());
//   }
//   tryThis();
