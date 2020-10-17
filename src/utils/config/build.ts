import { workspace } from 'vscode';

const getBuildPrefixConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.build.prefixPaths;

const getBuildUglifyConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.build.noUglify;

const getBuildTracingConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.build.enableTracing;

const getBuildProfileConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.build.profile;

const getBuildGraphqlConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.build.graphqlTracing;

const getBuildColorsConfig = (): boolean =>
	workspace.getConfiguration('gatsbyhub').commands.build.noColors;

const getBuildCmnd = () => {
	const pathPrefixEnabled = getBuildPrefixConfig();
	const noUglifyEnabled = getBuildUglifyConfig();
	const tracingEnabled = getBuildTracingConfig();
	const profileEnabled = getBuildProfileConfig();
	const graphqlEnabled = getBuildGraphqlConfig();
	const noColorsEnabled = getBuildColorsConfig();
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
