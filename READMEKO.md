[English README 영어](README.md) | [Japanese README 日本語](READMEJP.md)

[![GitHub link](https://img.shields.io/badge/GitHub-GatsbyHub-blueviolet)](https://github.com/oslabs-beta/GatsbyHub) [![GitHub license](https://img.shields.io/badge/license-MIT-blue)](https://github.com/oslabs-beta/GatsbyHub/blob/main/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/GatsbyHub/pulls) [![VSCode Dev Slack](https://img.shields.io/badge/vscode--dev--community-gatsbyhub-blueviolet.svg?logo=slack&labelColor=555555)](https://vscode-slack.amod.io)

<p align="center">
<a href="https://imgur.com/ITkYDBK"><img src="https://imgur.com/ITkYDBK.jpg" title="source: imgur.com" width="750"/></a>
</p>

# 개요

GatsbyHub는 [Gatsby-cli](https://www.gatsbyjs.com/tutorial/part-zero/#using-the-gatsby-cli)를 위한 상호적인 GUI를 제공하는 [Visual Studio Code](https://code.visualstudio.com/) 전용 [open-source](https://github.com/oslabs-beta/GatsbyHub) 확장입니다.

GatsbyHub를 통해 VS Code 상에서 [Gatsby plugins](https://www.gatsbyjs.com/plugins/), starters, 그리고 themes를 설치하고 사용할 수 있습니다. [Gatsby starter templates](https://www.gatsbyjs.com/starters/?)를 사용하여 단 한 번의 클릭으로 빠르고 모던한 앱을 만들 수 있습니다. Status bar icon 클릭을 통해 hot-reloading 개발 환경을 시작할 수 있습니다. 또한, Gatsby에 내재된 GraphiQL 인스턴스를 통해 GraphQL 쿼리를 설정하실 수 있습니다. [Gatsby docs](https://www.gatsbyjs.com/docs/gatsby-cli/)와 [user settings](https://code.visualstudio.com/docs/getstarted/settings)를 사용해 고급 사용자 설정도 가능합니다.

<!-- <p align="center">
  <br />
  <a href="https://user-images.githubusercontent.com/62862233/96508356-52eceb80-120f-11eb-9ad2-8939e18b691b.gif"><img src="https://user-images.githubusercontent.com/62862233/96508356-52eceb80-120f-11eb-9ad2-8939e18b691b.gif" width="900rem" /></a>
  <br />
</p> -->

# 설치 방법

⚠️ 주의: 현재 GatsbyHub는 베타버젼입니다. 버그를 발견하신다면 [여기로 알려주세요](https://github.com/oslabs-beta/GatsbyHub/issues). 현재 GatsbyHub는 플러그인, 테마 및 gatsby-cli가 설치되는 방식에 영향을 미치는 npm 과만 호환됩니다.

Gatsby는 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GatsbyHub.gatsbyhub)에서 설치하시면 됩니다.

<p align="center">
<a href="https://imgur.com/VkYFaz9"><img src="https://i.imgur.com/VkYFaz9.jpg" title="source: imgur.com" width="750"/></a>
</p>

# 주요 기능

## Gatsby 그래픽 사용자 인터페이스

[명령어 인터페이스](https://www.gatsbyjs.com/docs/gatsby-cli/)를 사용하지 않고 오직 그래픽 사용자 인터페이스를 통해 [Gatsby](https://www.gatsbyjs.com/)와 상호작용하실 수 있습니다. GatsbyHub는 자주 사용하는 Gatsby 명령어들을 버튼과 옵션을 통해 손쉽게 제공합니다.

- Install Gatsby - gatsby-cli npm package를 설치
- Create New Site - 한 번의 클릭으로 새로운 Gatsby 사이트를 만듦
- Develop Server - status bar item 클릭을 통해 hot-reloading 개발자 환경을 시작하고 멈춤
- Build Site - 사이트를 만들고 패키지화함

[확장 세팅](https://code.visualstudio.com/docs/getstarted/settings)의 고급 [Develop](https://www.gatsbyjs.com/docs/gatsby-cli/#develop)과 [Build](https://www.gatsbyjs.com/docs/gatsby-cli/#build) 옵션을 통해 호스트, 포트, 어글리파이 등을 설정하실 수 있습니다.

<!-- <p align="center">
  <br />
  <a href="https://user-images.githubusercontent.com/62862233/96605519-28507080-12ab-11eb-8075-65350a841d45.gif"><img src="https://user-images.githubusercontent.com/62862233/96605519-28507080-12ab-11eb-8075-65350a841d45.gif" width="900rem" /></a>
  <br />
</p> -->

## Gatsby Plugin and Themes

VS Code를 떠나지 않고 Gatsby 수 많은 [플러그인과 테마](https://www.gatsbyjs.com/plugins/)를 찾아서 읽고 다운로드 하실 수 있습니다.

Gatsby.js는 활발한 온라인 커뮤니티와 그에 따른 수 많은 플러그인들로 알려져있습니다. Gatsby의 공식적인 플러그인들과 다큐멘테이션을 GatsbyHub에서 직접 찾아보시고 프로젝트에 사용하실 수 잇습니다. 확장에서 플러그인 메뉴를 클릭하시면 VS Code 웹뷰에서 플러그인의 README 정보를 제공합니다. Gatsby.js 사이트를 가셔서 플러그인 설치 CLI 명령어를 직접 찾아보고 입력하실 필요 없이, 플러그인 다운로드 버튼 한 번이면 자동 다운로드 됩니다.

## Gatsby Starter

Gatsby가 제공하는 수 많은 [Starter sites](https://www.gatsbyjs.com/starters/?)들을 다운로드 받아 웹사이트 템플릿으로 바로 사용하시면 됩니다. 플러그인과 마찬가지로 확장의 starters 메뉴를 통해 README 정보를 읽어보실 수 있습니다. 마음에 드시는 스타터가 있다면, 다운로드 버튼 클릭과 원하시는 사이트 이름만 입력하시면 바로 사이트가 만들어집니다.

<p align="center">
  <br />
  <a href="https://imgur.com/dlip1Mz"><img src="https://i.imgur.com/dlip1Mz.jpg" title="source: imgur.com" width="750"/></a>
  <br />
</p>

## GraphiQL

개발 서버를 실행할 때 한 번의 클릭으로 Gatsby의 내장 GraphiQL 인스턴스에 액세스 할 수 있습니다. GraphQL 쿼리를 작성하는 것은 결코 쉬운 일이 아닙니다.

## 확장 설정

[Gatsby-Cli](https://www.gatsbyjs.com/docs/gatsby-cli/)가 제공하는 개발 서버 생성과 프로젝트 패키지화를 위한 여러가지 고급 옵션들을 GatsbyHub 확장 설정에서 토글 형식으로 제공합니다. 덕분에 매번 애플리케이션을 패키지화하거나 서버를 개발 할 때 이 설정들은 유지됩니다. 그러므로 새로운 프로젝트를 시작하실 때 마다 매번 명령어나 설정을 하실 필요가 없습니다.

<p align="center">
  <br />
  <a href="https://user-images.githubusercontent.com/62862233/96605590-3b634080-12ab-11eb-8ebb-4e4cbd8998d3.gif"><img src="https://user-images.githubusercontent.com/62862233/96605590-3b634080-12ab-11eb-8ebb-4e4cbd8998d3.gif" width="900rem" /></a>
  <br />
</p>

# Release Notes

### GatsbyHub 1.0.6 - 2020/10/21

전체 변경 사항은 [변경 로그를](https://github.com/oslabs-beta/GatsbyHub/blob/main/CHANGELOG.md) 참조하십시오.

GatsbyHub 최초 출시

# Contributors

Brian 'B-Hash' Hayashi [@github](https://github.com/bhayashi) [@linkedin](https://www.linkedin.com/in/brianmakiohayashi/)

Dylan Hensel [@github](https://github.com/dylanrh) [@linkedin](https://www.linkedin.com/in/dylanhensel/)

Joonyoung Kim [@github](https://github.com/JoonyoungKim025) [@linkedin](https://www.linkedin.com/in/joonyoungkim025)

Lucy Chi [@github](https://github.com/lucycchi) [@linkedin](https://www.linkedin.com/in/chilucy/)

Miguel Michel [@github](https://github.com/mig824) [@linkedin](https://www.linkedin.com/in/miguel-michel/)

Risa Hiyama [@linkedin](https://www.linkedin.com/in/risa-hiyama-93898968/)
