// import { PluginData } from "./PluginData";
const PluginData = require("./PluginData");

async function tryThis() {
  console.log("Inside of Each Plugin -- ", await PluginData());
}
tryThis();

// function Plugin() {
//   // need to do npm.api webscraping for array of plugin names
//   // grab array of pluggin names and assign to variable within this file context
//   // with array, on click of tree view name, populate webview with call to eachUrl
//   async () => {
//     let pluginName = pluginArray[i];
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const pluginUrl = `https://www.gatsbyjs.com/plugins/${pluginName}/?=`;
//     //iterate through array of plugin names within pluginUrl
//     await page.goto(pluginUrl, { waitUntil: "domcontentloaded" });
//     // await page.screenshot({path: 'example.png'});
//     // await browser.close();
//     // await page.waitForNavigation();
//     const pluginNames = await page.evaluate(() =>
//       Array.from(
//         document.querySelectorAll("div.css-198itke h2.css-67d70j")
//       ).map((plug) => plug.innerText)
//     );
//     // console.log("pluggin array: ", pluginNames);
//     await browser.close();
//   };
//   //();
// }
