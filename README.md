<h1 align="center">
  <a href="https://imgur.com/FBLZ4Ma"><img align="center" src="https://i.imgur.com/FBLZ4Ma.png" alt="GatsbyHub purple logo" width="200rem"></a>
  <p align="center" style="font-family:futura">GatsbyHub</p>
</h1>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue)](https://github.com/oslabs-beta/GatsbyHub/blob/main/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/GatsbyHub/pulls) [![VSCode Dev Slack](https://img.shields.io/badge/vscode--dev--community-gatsbyhub-blueviolet.svg?logo=slack&labelColor=555555)](https://vscode-slack.amod.io)

[Korean README 한국어](READMEKO.md)

# About

GatsbyHub is an [open-source](https://github.com/oslabs-beta/GatsbyHub) extension for [Visual Studio Code](https://code.visualstudio.com/) that offers an interactive GUI for [Gatsby-cli](https://www.gatsbyjs.com/tutorial/part-zero/#using-the-gatsby-cli).

GatsbyHub allows you to browse [Gatsby plugins](https://www.gatsbyjs.com/plugins/), starters, and themes without ever having to leave VS Code. Create a blazing fast, modern app with a single click or check out the many [Gatsby starter templates](https://www.gatsbyjs.com/starters/?) available. Start a hot-reloading development environment by simply clicking the status bar icon. Configure GraphQL queries using Gatsby's built-in instance of GraphiQL. For advanced customizations, please refer to the [Gatsby docs](https://www.gatsbyjs.com/docs/gatsby-cli/) and edit your [user settings](https://code.visualstudio.com/docs/getstarted/settings).

<p align="center">
  <br />
  <a href="https://user-images.githubusercontent.com/62862233/96508356-52eceb80-120f-11eb-9ad2-8939e18b691b.gif"><img src="https://user-images.githubusercontent.com/62862233/96508356-52eceb80-120f-11eb-9ad2-8939e18b691b.gif" width="900rem" /></a>
  <br />
</p>

# Installation

⚠️ Warning: This is beta software, which means there may still be bugs. Please [report bugs and share your feedback](https://github.com/oslabs-beta/GatsbyHub/issues).

GatsbyHub is available to install in [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GatsbyHub.gatsbyhub).

# Features

## Gatsby CLI GUI

Interact with [Gatsby](https://www.gatsbyjs.com/) without ever having to use the [command line interface](https://www.gatsbyjs.com/docs/gatsby-cli/). GatsbyHub provides buttons and options for all the most commonly used commands.

- Install Gatsby - Installs the gatsby-cli npm package
- Create New Site - Creates a new Gatsby site with the click of a button
- Develop Server - Starts and stops a hot-reloading development environment by either clicking the button or clicking the status bar item
- Build Site - Build and package your site so it's ready to deploy on Gatsby's cloud

Advanced [Develop](https://www.gatsbyjs.com/docs/gatsby-cli/#develop) and [Build](https://www.gatsbyjs.com/docs/gatsby-cli/#build) options are available in the [extension settings](https://code.visualstudio.com/docs/getstarted/settings) for things like setting up the host, port, toggling no-uglify, etc.

<p align="center">
  <br />
  <a href="https://user-images.githubusercontent.com/62862233/96605519-28507080-12ab-11eb-8075-65350a841d45.gif"><img src="https://user-images.githubusercontent.com/62862233/96605519-28507080-12ab-11eb-8075-65350a841d45.gif" width="900rem" /></a>
  <br />
</p>

## Gatsby Plugins and Themes

Find and download [Gatsby plugins and themes](https://www.gatsbyjs.com/plugins/) without ever leaving VS Code.

Gatsby is known for it's active community and many plugins. You can find Gatsby's official plugins and all the documentation needed to implement them into your project. Selecting a plugin opens a webview within VS Code where you can read up on the plugin's README. Installing the plugin is as easy as clicking the download button in the sidebar.

## Gatsby Starters

Use one of Gatsby's many [Starter sites](https://www.gatsbyjs.com/starters/?) as a template for your site. Browse the starters and check out their READMEs. Creating a new Gatsby site is as easy as clicking a button in the sidebar and typing in a name for your site.

## Extension Settings

[Gatsby-Cli](https://www.gatsbyjs.com/docs/gatsby-cli/) has a lot of advanced options for generating a development server and packaging your project. GatsbyHub provides a way to toggle these options within the VS Code extension settings. That way the settings persist every time you want to develop a server or package your app. No more typing out the same commands or configuring a script everytime you start a new project.

<p align="center">
  <br />
  <a href="https://user-images.githubusercontent.com/62862233/96605590-3b634080-12ab-11eb-8ebb-4e4cbd8998d3.gif"><img src="https://user-images.githubusercontent.com/62862233/96605590-3b634080-12ab-11eb-8ebb-4e4cbd8998d3.gif" width="900rem" /></a>
  <br />
</p>

# Release Notes

### 1.0.0

Initial release of GatsbyHub
