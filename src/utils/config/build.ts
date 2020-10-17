import { workspace } from 'vscode';

export const getBuildPrefixConfig = (): number =>
	workspace.getConfiguration('gatsbyhub').commands.build.prefixPaths;

const getBuildUglifyConfig = (): number | string =>
	workspace.getConfiguration('gatsbyhub').commands.build.noUglify;

const getBuildTracingConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.build.enableTracing;

export const getBuildCmnd = () => {
	const pathPrefixEnabled = getBuildPrefixConfig();
	const noUglifyEnabled = getBuildUglifyConfig();
	const tracingEnabled = getBuildTracingConfig();
	const pathPrefix = '--prefix-paths';
	const noUglify = '--no-uglify';
	const tracing = '--open-tracing-config-file';
	let command = 'gatsby build';

	if (pathPrefixEnabled) {
		command += ` ${pathPrefix}`;
	}

	if (noUglifyEnabled) {
		command += ` ${noUglify}`;
	}

	if (tracingEnabled) {
		command += ` ${tracing}`;
	}

	return command;
};
