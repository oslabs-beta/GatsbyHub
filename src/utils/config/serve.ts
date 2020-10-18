import { workspace } from 'vscode';

export const getServePortConfig = (): number =>
	workspace.getConfiguration('gatsbyhub').commands.serve.port;

const getServeHostConfig = (): number | string =>
	workspace.getConfiguration('gatsbyhub').commands.serve.changeHost;

const getServeOpenConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.serve.openBrowser;

const getServeHttpsConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.serve.useHTTPS;

export const getServeCmnd = () => {
	const port = getServePortConfig();
	const host = getServeHostConfig();
	const openEnabled = getServeOpenConfig();
	const httpsEnabled = getServeHttpsConfig();
	const open = '-o';
	const https = '-S';
	let command = 'gatsby serve';

	if (port !== 9000) {
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
