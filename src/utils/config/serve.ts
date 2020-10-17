import { workspace } from 'vscode';

export const getServePortConfig = (): number =>
	workspace.getConfiguration('gatsbyhub').commands.develop.port;

const getServeHostConfig = (): number | string =>
	workspace.getConfiguration('gatsbyhub').commands.develop.changeHost;

const getServeOpenConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.develop.openBrowser;

const getServeHttpsConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.develop.useHTTPS;

export const getServeCmnd = () => {
	const port = getServePortConfig();
	const host = getServeHostConfig();
	const openEnabled = getServeOpenConfig();
	const httpsEnabled = getServeHttpsConfig();
	const open = '-o';
	const https = '-S';
	let command = 'gatsby serve';

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
