import { workspace } from 'vscode';

const getInfoCmnd = (): string => {
	const clipboardEnabled: boolean = workspace.getConfiguration('gatsbyhub')
		.commands.info.enableClipboard;
	let command = 'gatsby info';

	if (clipboardEnabled) {
		command += ' -C';
	}

	return command;
};

export default getInfoCmnd;
