# Change Log

All notable changes to the "gatsbyhub" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Initial Release]

## [Unreleased]

## [0.3.0] - 2020-10-06

### Add

- Added PluginData class that fetches Gatsby Plugins from npm (modeled after Gatsby's plugin script)
- Added WebView command so that clicking on a plugin opens a new webview window
- Added WebView functionality so that it fetches markdown from github repository

## [0.2.0] - 2020-10-03

### Add

- Added loading message to StatusBarItem while developing and disposing server
- Added functionality to 'Develop Server' such that the server is developed using the root path of the active text editor
- Added TreeView infrastructure for Plugins
- Added Webview infrastructure for Plugins

### Fix

- Fixed bug where new site would be created if input was undefined
- Fixed bug where message and input would appear simultaneously

## [0.1.0] - 2020-10-02

### Add

- Added 'Create New Site' button
- Added 'Develop Server' button
- Added 'Develop' status bar item
- Added 'Build Site' button
- Updated 'Develop Server' functionality so that the button and status bar toggle between developing server and disposing server
- Updated 'Create New Site' functionality so that message pops up with option to open new folder

## [0.0.2] - 2020-09-29

### Add

- Added commands directory
- Added "Install" button
- Added functionality to access CLI through our extension

## [0.0.1] - 2020-09-28

### Add

- Added README
- Initialized Yeoman with starter code for VSCode Extension
- Added TreeViewsContainer and Views for GatsbyHub
