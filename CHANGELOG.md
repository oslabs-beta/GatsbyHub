# Change Log

All notable changes to the GatsbyHub extension will be documented in this file.

## [1.0.1] - 2020-10-20

### Fix

- Fixes error where GatsbyHub logo disappears from views container

## [Initial Release]

## [1.0.0] - 2020-10-20

## [Unreleased]

## [0.8.0] - 2020-10-17

### Add

- Adds more command options in the extension's settings
- Adds config directory in utils that handles possible config combinations
- Configured eslint and prettier with pre-commit hook

## [0.7.0] - 2020-10-16

### Update

- Updates method input/output types to match interfaces in the interface file
- Updates issue templates

### Add

- Adds interfaces.ts file to hold interface types
- Adds configuration options for extension in package.json
- Adds method for grabbing port config in Utilities
- Adds methods in GatsbyCli that use a port so that they grab the port from the user's config choice
- Adds Contributing instructions
- Adds Pull Request Template
- Adds and configures Webpack to bundle extension during development and for production

## [0.6.0] - 2020-10-15

### Update

- Updates conditional checks in createSite, buildSite, developServer, and installPlugin, that checks it's workspace and executes accordingly

### Add

- Adds conditional checks for CLI commands
- Adds method that gets workspace URI

### Delete

- Commented out code to check if Gatsby is initialized to the root path since it was causing errors

## [0.5.0] - 2020-10-14

### Update

- Refactors module imports to only import necessary methods instead of importing the entire module

### Add

- Adds openGraphiQL command and icon to 'command' viewTitle
- Adds check method for OS type so that commands are tailored to Mac or Windows

## [0.4.3] - 2020-10-11

### Update

- Makes code easier to read and more modular
- Moves files into more intuitive directories and changed the direct paths to each
- Fixes all ESLint and Prettier problems/errors
- Updated menu icons for installing plugins, starters, and themes

## [0.4.2] - 2020-10-09

### Update

- Refactors how npm package data is fetched so that 3 separate classes are reduced to 1 npmData class
- Fixes edge cases when creating a new site and starting a server

### Add

- Adds npmData.ts file to replace pluginData, starterData, and themeData
- Adds method for checking if current workspace is empty
- Adds method for checking if current workspace has a Gatsby site in it

## [0.4.0] - 2020-10-08

### Update

- Updates Plugin and Starter Menu buttons so that they successfully download and install plugins and starters
- Updates webview panel so that only one new window is created when you click on plugin or starter
- Updates README with imgur image instead of repo's image

### Add

- Adds Themes treeview which follows similar logic to Plugins and Starters
- Adds webview header with install button
- Adds loading state to TreeView plugins, starters, and themes

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
