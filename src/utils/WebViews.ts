import { window, ViewColumn } from 'vscode';
import got from 'got';
import * as marked from 'marked';
import PluginData from '../models/NpmData';
import { NpmTreeItem } from '../utils/Interfaces';

export default class WebViews {
	static async openWebView(npmPackage: NpmTreeItem) {
		const {
			links,
			name,
			version,
			description,
		} = npmPackage.command.arguments[0];
		const readMe = await PluginData.mdToHtml(links.repository, links.homepage);

		// turn npm package name from snake-case to standard capitalized title
		const title = name
			.replace(/-/g, ' ')
			.replace(/^\w?|\s\w?/g, (match: string) => match.toUpperCase());

		// createWebviewPanel takes in the type of the webview panel & Title of the panel & showOptions
		const panel = window.createWebviewPanel(
			'plugin',
			`Gatsby Plugin: ${title}`,
			ViewColumn.One
		);

		// create a header for each npm package and display README underneath header
		// currently #install-btn does not work
		panel.webview.html = `
    <style>
      .plugin-header {
        position: fixed;
        top: 0;
        background-color: var(--vscode-editor-background);
        width: 100vw;
      }

      #title-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-text: center;
      }

      #install-btn {
        height: 1.5rem;
        margin: 1rem;
      }

      body {
        position: absolute;
        top: 9rem;
      }
    </style>
    <div class="plugin-header">
      <div id="title-btn">
        <h1 id="title">${title}</h1>
      </div>
      <p>Version: ${version}</p>
      <p>${description}</p>
      <hr class="solid">
    </div>
    ${readMe}
    `;

		// close the webview when not looking at it
		panel.onDidChangeViewState((e) => {
			if (!e.webviewPanel.active) {
				panel.dispose();
			}
		});
	}

	// open webview readme fo the Gatsby CLI commands
	static async openCommandDocs() {
		const url =
			'https://raw.githubusercontent.com/gatsbyjs/gatsby/master/packages/gatsby-cli/README.md';
		const response = await got(url);
		const readMe = marked(response.body);

		const panel = window.createWebviewPanel(
			'CLI Docs',
			`CLI Docs`,
			ViewColumn.One
		);

		panel.webview.html = `${readMe}`;

		// close the webview when not looking at it
		panel.onDidChangeViewState((e) => {
			if (!e.webviewPanel.active) {
				panel.dispose();
			}
		});
	}

	// Open webview readme of Plugin docs -- has to be seperate function because the command has to be pushed to subscriptions in extension.ts file -- same for starters and themes
	static openPluginDocs() {
		const panel = window.createWebviewPanel(
			'Plugin Docs',
			`Plugin Docs`,
			ViewColumn.One
		);

		panel.webview.html = `
		<h1>Plugins</h2> 
		<h2>Gatsby plugins are Node.js packages that implement Gatsby APIs. For larger, more complex sites, plugins let you modularize your site customizations into site-specific functionality.</h2>
		<h3>⬅️  Install plugins using the download button in the Plugins Menu next to your selected plugin's name</h3>
		<p>
		One of the best ways to add functionality to Gatsby is through our plugin system. Gatsby is designed to be extensible, which means plugins are able to extend and modify just about everything Gatsby does.
		<br><br>
		Of the many possibilities, plugins can:
		<br>
		<ul>
		<li>add external data or content (e.g. your CMS, static files, a REST API) to your Gatsby GraphQL data</li>
		<li>transform data from other formats (e.g. Markdown, YAML, CSV) to JSON objects</li>
		<li>add third-party services (e.g. Google Analytics, Instagram) to your site</li>
		<li>add bundled, pre-configured functionality with themes
		do anything you can dream up!</li>
		</ul></p>
		<h3>Using Gatsby Plugins through GatsbyHub in your new Gatsby site</h3>
		<p>
		Gatsby plugins are Node.js packages, so you can install them like other packages in node, and with GatsbyHub, you can now use the install button in the plugins menu sidebar.
		<br><br>
		Then update your gatsby-config.js file to include the new plugin in your plugins array. 
		<br>
		<br>
		For example, gatsby-transformer-json is a package that adds support for JSON files to the Gatsby data layer.
		<br><br>
		In your site’s gatsby-config.js you add gatsby-transformer-json to the plugins array like:
		<br>
		<code>module.exports = {
			plugins: ['gatsby-transformer-json'],
		  }
		</code>
		<br><br>
		Plugins can also take <a href="https://www.gatsbyjs.com/docs/using-a-plugin-in-your-site/">options</a>.
		<br><br>
		<a href="https://www.gatsbyjs.com/docs/what-is-a-plugin/">Read more about gatsby pluggins</a>
		</p>
		`;

		// close the webview when not looking at it
		panel.onDidChangeViewState((e) => {
			if (!e.webviewPanel.active) {
				panel.dispose();
			}
		});
	}

	// opens webview for Starter readmen has to be seperate function to push to subscriptions
	static openStarterDocs() {
		const panel = window.createWebviewPanel(
			'Starter Docs',
			`Starter Docs`,
			ViewColumn.One
		);

		panel.webview.html = `
		<h1>Starters</h2> 
		<h2>The Gatsby and GatsbyHub tool lets you install starters, which are boilerplate Gatsby sites maintained by the community and intended for jump-starting development quickly.</h2>
		<h3>⬅️  Install starters using the download button in the Starters Menu next to your selected starter's name</h3>
		<p>
		You can begin by using the Gatsby default starter simply by pressing on the "New" button in the Commands Menu, or you can install any of the starters in the Starters Menu by clicking the download button. 
		<br><br>
		<h3>Choosing a starter</h3>
		<p>To choose a starter, first consider the functionality you need. Are you building an e-commerce site? A blog? Do you already know what data sources you’ll want to use? Find a starter that fulfills your requirements by searching through the Gatsby Starters Menu on the left.
		<br><br>
		If you’re not sure what to choose or want only the most essential functionality, try customizing either gatsby-starter-blog (if you’re primarily using this site as a blog) or gatsby-starter-default (which you can use by simply pressing the "New" button in the Commands Menu). These official starters are maintained by Gatsby and are great options, particularly for your first Gatsby site.
		<br><br>
		<h3>Modifying starters</h3>
		<p>
		Learn how to <a href="https://www.gatsbyjs.com/docs/modifying-a-starter/">modify a starter</a> in the Gatsby docs. 
		<br><br>
		You can use official and community starters out of the box but you may want to customize their style and functionality.
		<br><br>
		What you need to know will depend on the starter you choose and the data or functionality you’d like to modify. Even if you choose not to modify the starter’s components, you may still want to update text, use data from an external source, and modify the style (CSS) of the site. To do this, you’ll write some <a href="https://www.gatsbyjs.com/docs/mdx/markdown-syntax/">Markdown</a> and <a href="https://www.digitalocean.com/community/tutorials/an-introduction-to-json">JSON</a>.
		<br><br>
		To modify the functionality of a starter, you’ll want a basic understanding of <a href="https://reactjs.org/docs/introducing-jsx.html">JSX</a> syntax for updating components and making new ones. You’ll also want some knowledge of <a href="https://www.gatsbyjs.com/docs/graphql-concepts/">GraphQL</a> for querying your data. Start with these and add to your skills as you continue to add functionality to your starter.
		</p>
		<p><a href="https://www.gatsbyjs.com/docs/starters/">Read more about Gatsby Starters</a></p>
		`;

		// close the webview when not looking at it
		panel.onDidChangeViewState((e) => {
			if (!e.webviewPanel.active) {
				panel.dispose();
			}
		});
	}

	// opens webview for Themes readme -- has to be seperate function in order to be pushed to subscriptions in extension.ts
	static openThemeDocs() {
		const panel = window.createWebviewPanel(
			'Theme Docs',
			`Theme Docs`,
			ViewColumn.One
		);

		panel.webview.html = `
		<h1>Themes</h1>
		<h2>Using a Gatsby theme, all of your default configuration (shared functionality, data sourcing, design) is abstracted out of your site, and into an installable package.</h2>
		<h3>⬅️  Install themes using the download button in the Themes Menu next to your selected theme's name</h3>
		<p>
		This means that the configuration and functionality isn’t directly written into your project, but rather versioned, centrally managed, and installed as a dependency. You can seamlessly update a theme, compose themes together, and even swap out one compatible theme for another.
		<br><br>
		Gatsby themes are plugins that include a gatsby-config.js file and add pre-configured functionality, data sourcing, and/or UI code to Gatsby sites. You can think of Gatsby themes as separate Gatsby sites that can be put together and allow you to split up a larger Gatsby project!
		</p>
		<h3>Gatsby themes allow Gatsby site functionality to be packaged as a standalone product for others (and yourself!) to easily reuse. Using a traditional starter, all of your default configuration lives directly in your site. Using a theme, all of your default configuration lives in an npm package.</h3>
		<p> 
		Themes solve the problems that traditional starters experience:
		<ul>
		<li>Sites created using a Gatsby theme can adopt upstream changes to the theme — themes are versioned packages that can be updated like any other package.</li>
		<li>You can create multiple sites that consume the same theme. To make updates across those sites, you can update the central theme and bump the version in the sites through package.json files (rather than spending the time to tediously update the functionality of each individual site).</li>
		<li>Themes are composable. You could install a blog theme alongside a notes theme, alongside an e-commerce theme (and so forth)</li>
		</ul>
		</p>
		<h2>When should I use or build a theme?</h2>
		<h3>Consider using a theme if:</h3>
		<ul>
		<li>You already have an existing Gatsby site and can’t start from a starter</li>
		<li>You want to be able to update to the latest version of a feature on your site</li>
		<li>You want multiple features on your site, but there is no starter with all the features — you can use multiple themes, composed in one Gatsby site</li>
		</ul>
		<h3>Consider building a theme if:</h3>
		<ul>
		<li>You plan on re-using similar functionality across multiple Gatsby sites</li>
		<li>You would like to share new Gatsby functionality to the community</li>
		</ul>
		<p><a href="https://www.gatsbyjs.com/docs/themes/">Read more about Gatsby themes</a></p>
		`;

		// close the webview when not looking at it
		panel.onDidChangeViewState((e) => {
			if (!e.webviewPanel.active) {
				panel.dispose();
			}
		});
	}
}
