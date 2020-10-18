import { workspace } from 'vscode';

// NOTE --> might need this later to make an open browser btn for 'serve'
export const getServePortConfig = (): number =>
	workspace.getConfiguration('gatsbyhub').commands.serve.port;

export const getServeCmnd = () => {
	const config = workspace.getConfiguration('gatsbyhub').commands.serve;
	const { port } = config;
	const host: number | string = config.changeHost;
	const openEnabled = config.openBrowser;
	const httpsEnabled = config.useHttps;
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
