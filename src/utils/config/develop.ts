import { workspace } from 'vscode';

export const getDevelopPortConfig = (): number =>
	workspace.getConfiguration('gatsbyhub').commands.develop.port;

const getDevelopHostConfig = (): number | string =>
	workspace.getConfiguration('gatsbyhub').commands.develop.changeHost;

const getDevelopOpenConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.develop.openBrowser;

const getDevelopHTTPSConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.develop.useHTTPS;

export const getDevelopCmnd = () => {
	const port = getDevelopPortConfig();
	const host = getDevelopHostConfig();
	const openEnabled = getDevelopOpenConfig();
	const httpsEnabled = getDevelopHTTPSConfig();
	const open = '-o';
	const https = '-S';
	let command = 'gatsby develop';

	if (port !== 8000) {
		command += ` -p ${port}`;
	}

	if (host !== 'localhost') {
		command += ` -H ${host}`;
	}

	if (openEnabled) {
		command += ` ${open}`;
	}

	if (httpsEnabled) {
		command += ` ${https}`;
	}

	return command;
};
