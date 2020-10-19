import { window, ViewColumn } from 'vscode';
import got from 'got';
import * as marked from 'marked';
import PluginData from '../models/NpmData';
import { PluginPkg } from '../utils/Interfaces';

export default class WebViews {
	static async openWebView(npmPackage: PluginPkg) {
		const { links, name, version, description } = npmPackage;
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
        <a id="install-btn">Install</a>
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
		// const url =
		// 	'https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/docs/plugins.md';
		// const response = await got(url);
		// const readMe = marked(response.body);

		const panel = window.createWebviewPanel(
			'Plugin Docs',
			`Plugin Docs`,
			ViewColumn.One
		);

		panel.webview.html = `
		<h1>Plugins</h2> 
		<h3>Gatsby plugins are Node.js packages that implement Gatsby APIs. For larger, more complex sites, plugins let you modularize your site customizations into site-specific functionality.</h3>
		<p>
		One of the best ways to add functionality to Gatsby is through our plugin system. Gatsby is designed to be extensible, which means plugins are able to extend and modify just about everything Gatsby does.
		<br>
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
		<br>
		Then update your gatsby-config.js file to include the new plugin in your plugins array. 
		<br>
		<br>
		<a href="https://www.gatsbyjs.com/docs/using-a-plugin-in-your-site/">Read more about gatsby pluggins</a>
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
	static async openStarterDocs() {
		const url =
			'https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/docs/starters.md';
		const response = await got(url);
		const readMe = marked(response.body);

		const panel = window.createWebviewPanel(
			'Starter Docs',
			`Starter Docs`,
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

	// opens webview for Themes readme -- has to be seperate function in order to be pushed to subscriptions in extension.ts
	static async openThemeDocs() {
		const url =
			'https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/docs/themes.md';
		const response = await got(url);
		const readMe = marked(response.body);

		const panel = window.createWebviewPanel(
			'Theme Docs',
			`Theme Docs`,
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
}
