<h1 align="center">
  <a href="https://imgur.com/FBLZ4Ma"><img align="center" src="https://i.imgur.com/FBLZ4Ma.png" alt="GatsbyHub purple logo" width="200rem"></a>
  <p align="center" style="font-family:futura">GatsbyHub</p>
</h1>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue)](https://github.com/oslabs-beta/GatsbyHub/blob/main/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/GatsbyHub/pulls) [![VSCode Dev Slack](https://img.shields.io/badge/vscode--dev--community-gatsbyhub-blueviolet.svg?logo=slack&labelColor=555555)](https://vscode-slack.amod.io)

[English README 英語](README.md) | [Korean README 한국어](READMEKO.md)

# 概要

GatsbyHub は、[Gatsby-cli](https://www.gatsbyjs.com/tutorial/part-zero/#using-the-gatsby-cli)用のインタラクティブな GUI を提供する[Visual Studio Code](https://code.visualstudio.com/)の[オープンソース](https://github.com/oslabs-beta/GatsbyHub)拡張機能です。

GatsbyHub を使用すると、VS Code を離れることなく、[Gatsby プラグイン](https://www.gatsbyjs.com/plugins/)、スターター、およびテーマを参照できます。ワンクリックでアプリを作成したり、[Gatsby スターターテンプレート](https://www.gatsbyjs.com/starters/?)を簡単に閲覧することができます。ステータスバーアイコンをクリックするだけで、ホットリロード開発環境を開始できます。
Gatsby の組み込みの GraphiQL インスタンスを使用して GraphQL クエリを構成します。
高度なカスタマイズについては、[Gatsby のドキュメント](https://www.gatsbyjs.com/docs/gatsby-cli/)を参照し、[ユーザー設定](https://code.visualstudio.com/docs/getstarted/settings)を編集してください。

<p align="center">
  <br />
  <a href="https://user-images.githubusercontent.com/62862233/96508356-52eceb80-120f-11eb-9ad2-8939e18b691b.gif"><img src="https://user-images.githubusercontent.com/62862233/96508356-52eceb80-120f-11eb-9ad2-8939e18b691b.gif" width="900rem" /></a>
  <br />
</p>

# インストール

⚠️ 警告：これはベータ版ソフトウェアです。つまり、まだバグがある可能性があります。[バグを報告し、フィードバックを共有してください](https://github.com/oslabs-beta/GatsbyHub/issues)。

GatsbyHub は、[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GatsbyHub.gatsbyhub)にインストールできます。

⚠️ Warning: This is beta software, which means there may still be bugs. Please [report bugs and share your feedback](https://github.com/oslabs-beta/GatsbyHub/issues).

GatsbyHub is available to install in [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GatsbyHub.gatsbyhub).

# 特徴

## Gatsby CLI GUI

[コマンドラインインターフェイス](https://www.gatsbyjs.com/docs/gatsby-cli/)を使用せずに[Gatsby](https://www.gatsbyjs.com/)と対話します。GatsbyHub は、最も一般的に使用されるすべてのコマンドのボタンとオプションを提供します。

- Gatsby のインストール - gatsby-cli npm パッケージをインストールします
- 新しいサイトの作成 - ボタンをクリックするだけで新しいギャツビーサイトを作成します
- サーバーの開発 - ボタンをクリックするか、ステータスバーの項目をクリックして、ホットリロード開発環境を開始および停止します
- サイトの構築 - Gatsby のクラウドにデプロイできるように、サイトを構築してパッケージ化します

高度な[開発](https://www.gatsbyjs.com/docs/gatsby-cli/#develop)および[ビルド](https://www.gatsbyjs.com/docs/gatsby-cli/#build)オプションは、ホスト、ポートの設定、no-uglify の切り替えなどの[拡張設定](https://code.visualstudio.com/docs/getstarted/settings)で使用できます。

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

### GatsbyHub 1.0.2 - October 20,2020

See the [change log](https://github.com/oslabs-beta/GatsbyHub/blob/main/CHANGELOG.md) for the full set of changes

# Contributors

### Brian 'B-Hash' Hayashi [@github](https://github.com/bhayashi) [@linkedin](https://www.linkedin.com/in/brianmakiohayashi/)

### Dylan Hensel [@github](https://github.com/dylanrh) [@linkedin](https://www.linkedin.com/in/dylanhensel/)

### Joonyoung Kim [@github](https://github.com/JoonyoungKim025) [@linkedin](https://www.linkedin.com/in/joon-k-00a92819a/)

### Lucy Chi [@github](https://github.com/lucycchi) [@linkedin](https://www.linkedin.com/in/chilucy/)

### Miguel Michel [@github](https://github.com/mig824)

### Risa Hiyama [@linkedin](https://www.linkedin.com/in/risa-hiyama-93898968/)
