import { workspace } from 'vscode';

export const getDevelopPortConfig = (): number =>
	workspace.getConfiguration('gatsbyhub').commands.develop.port;

export const getDevelopCmnd = () => {
	const config = workspace.getConfiguration('gatsbyhub').commands.develop;
	const { port } = config;
	const host: number | string = config.changeHost;
	const openEnabled: boolean = config.openBrowser;
	const httpsEnabled: boolean = config.useHttps;
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
