import { workspace } from 'vscode';

const getBuildCmnd = () => {
	const config = workspace.getConfiguration('gatsbyhub').commands.build;
	const pathPrefixEnabled = config.prefixPaths;
	const noUglifyEnabled = config.noUglify;
	const tracingEnabled = config.enableTracing;
	const profileEnabled = config.profile;
	const graphqlEnabled = config.graphqlTracing;
	const noColorsEnabled = config.noColors;
	const pathPrefix = '--prefix-paths';
	const noUglify = '--no-uglify';
	const tracing = '--open-tracing-config-file';
	const profile = '--profile';
	const graphTracing = '--graphql-tracing';
	const noColors = '--no-colors';
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

	if (profileEnabled) {
		command += ` ${profile}`;
	}

	if (graphqlEnabled) {
		command += ` ${graphTracing}`;
	}

	if (noColorsEnabled) {
		command += ` ${noColors}`;
	}

	return command;
};

export default getBuildCmnd;
