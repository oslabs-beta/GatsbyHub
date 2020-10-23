[English README 英語](README.md) | [Korean README 한국어](READMEKO.md)

[![GitHub link](https://img.shields.io/badge/GitHub-GatsbyHub-blueviolet)](https://github.com/oslabs-beta/GatsbyHub) [![GitHub license](https://img.shields.io/badge/license-MIT-blue)](https://github.com/oslabs-beta/GatsbyHub/blob/main/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/GatsbyHub/pulls) [![VSCode Dev Slack](https://img.shields.io/badge/vscode--dev--community-gatsbyhub-blueviolet.svg?logo=slack&labelColor=555555)](https://vscode-slack.amod.io)

<p align="center">
<a href="https://i.imgur.com/pL6Oove"><img src="https://i.imgur.com/pL6Oove.jpg" title="source: imgur.com" width="750"/></a>
</p>

# 概要

GatsbyHub は、[Gatsby-cli](https://www.gatsbyjs.com/tutorial/part-zero/#using-the-gatsby-cli)用のインタラクティブな GUI を提供する[Visual Studio Code](https://code.visualstudio.com/)の[オープンソース](https://github.com/oslabs-beta/GatsbyHub)拡張機能です。

GatsbyHub を使用すると、VS Code を離れることなく、[Gatsby プラグイン](https://www.gatsbyjs.com/plugins/)、スターター、およびテーマを参照できます。ワンクリックでアプリを作成したり、[Gatsby スターターテンプレート](https://www.gatsbyjs.com/starters/?)を簡単に閲覧することができます。ステータスバーアイコンをクリックするだけで、ホットリロード開発環境を開始できます。
Gatsby の組み込みの GraphiQL インスタンスを使用して GraphQL クエリを構成します。
高度なカスタマイズについては、[Gatsby のドキュメント](https://www.gatsbyjs.com/docs/gatsby-cli/)を参照し、[ユーザー設定](https://code.visualstudio.com/docs/getstarted/settings)を編集してください。

# インストール

⚠️ 警告：これはベータ版ソフトウェアです。つまり、まだバグがある可能性があります。[バグを見つけた場合は、フィードバックを共有してください](https://github.com/oslabs-beta/GatsbyHub/issues)。
現在、GatsbyHub は、プラグイン、テーマ、および gatsby-cli のインストール方法に影響を与える npm とのみ互換性があります。

GatsbyHub は、[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GatsbyHub.gatsbyhub)にインストールできます。

<p align="center">
<a href="https://i.imgur.com/iNMPGwO"><img src="https://i.imgur.com/iNMPGwO.jpg" title="source: imgur.com" width="750"/></a>
</p>

# 特徴

## Gatsby CLI GUI

GatsbyHub は、[コマンドラインインターフェイス](https://www.gatsbyjs.com/docs/gatsby-cli/)を使用せずに[Gatsby](https://www.gatsbyjs.com/)を使えます。コマンドを打たなくても、画面上のボタンをタップすることで基本的な操作ができます。

基本的な操作：

- Install Gatsby - gatsby-cli npm パッケージをインストールします
- Create New Site - ボタンをクリックするだけで新しいギャツビーサイトを作成します
- Develop Server - ボタンをクリックするか、ステータスバーの項目をクリックして、ホットリロード開発環境を開始および停止します
- Build Site - Gatsby のクラウドにデプロイできるように、サイトを構築してパッケージ化します

高度な[開発](https://www.gatsbyjs.com/docs/gatsby-cli/#develop)および[ビルド](https://www.gatsbyjs.com/docs/gatsby-cli/#build)オプションは、ホスト、ポートの設定、no-uglify の切り替えなどの[拡張設定](https://code.visualstudio.com/docs/getstarted/settings)で使用できます。

## Gatsby プラグインとテーマ

VS Code を離れることなく[Gatsby プラグインとテーマ](https://www.gatsbyjs.com/plugins/)を検索したり、ダウンロードすることができます。

Gatsby は活発なコミュニティと多くのプラグインで知られています。Gatsby の公式プラグインとそれらをプロジェクトに実装するために必要なすべてのドキュメントを見つけることができます。プラグインを選択すると、VS Code 内で Web ビューが開き、プラグインの README を確認できます。 プラグインのインストールは、サイドバーのダウンロードボタンをクリックするのと同じくらい簡単です。

## Gatsby スターター

Gatsby の多くの[スターターサイト](https://www.gatsbyjs.com/starters/?)のからテンプレートとしてあなたのサイトに使ってください。 スターターを閲覧し README を確認してください。 新しいギャツビーサイトの作成は、サイドバーのボタンをクリックしてサイトの名前を入力するのと同じくらい簡単です。

<p align="center">
  <br />
  <a href="https://i.imgur.com/saUF9kz"><img src="https://i.imgur.com/saUF9kz.jpg" title="source: imgur.com" width="750"/></a>
  <br />
</p>

## GraphiQL

開発サーバーの実行時に、Gatsby の組み込みの GraphiQL インスタンスにワンクリックでアクセス。 GraphQL クエリの作成がとても簡単になりました。

## 拡張機能の設定

[Gatsby-Cli](https://www.gatsbyjs.com/docs/gatsby-cli/)には、開発サーバーを生成してプロジェクトをパッケージ化するための高度なオプションが多数あります。GatsbyHub は、VSCode 拡張設定内でこれらのオプションを切り替える方法を提供します。 そうすることでサーバーを開発したりアプリをパッケージ化したりした時も設定が保持されます。 新しいプロジェクトを開始するたびに同じコマンドを入力したり、スクリプトを構成したりする必要はもうありません。

<p align="center">
  <br />
  <a href="https://user-images.githubusercontent.com/62862233/96605590-3b634080-12ab-11eb-8ebb-4e4cbd8998d3.gif"><img src="https://user-images.githubusercontent.com/62862233/96605590-3b634080-12ab-11eb-8ebb-4e4cbd8998d3.gif" width="900rem" /></a>
  <br />
</p>

# リリースノート

### GatsbyHub 1.0.7 - 2020 年 10 月 22 日

詳しい変更については、[変更ログ](https://github.com/oslabs-beta/GatsbyHub/blob/main/CHANGELOG.md)を参照してください

# 貢献者

Brian 'B-Hash' Hayashi [@github](https://github.com/bhayashi) [@linkedin](https://www.linkedin.com/in/brianmakiohayashi/)

Dylan Hensel [@github](https://github.com/dylanrh) [@linkedin](https://www.linkedin.com/in/dylanhensel/)

Joonyoung Kim [@github](https://github.com/JoonyoungKim025) [@linkedin](https://www.linkedin.com/in/joonyoungkim025)

Lucy Chi [@github](https://github.com/lucycchi) [@linkedin](https://www.linkedin.com/in/chilucy/)

Miguel Michel [@github](https://github.com/mig824) [@linkedin](https://www.linkedin.com/in/miguel-michel/)

Risa Hiyama [@linkedin](https://www.linkedin.com/in/risa-hiyama-93898968/)
