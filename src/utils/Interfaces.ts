// defines object shape of each plugin package in array served by NpmData.getNpmPackages
export interface PluginPkg {
	name: string;
	links: {
		repository: string;
		homepage: string;
	};
	readme: string;
	version: string;
	description: string;
	score: number;
}

// defines object shape of each element in merged array when first fetching npmPackages in NpmData
export interface NpmPkg {
	package: {
		name: string;
		links: {
			repository: string;
			homepage: string;
		};
		readme: string;
		score: number;
	};
	score: {
		final: number;
	};
}

// defines object shape of each of the TreeItems in Views: Plugins, Starters, Themes
export interface NpmTreeItem {
	command: {
		arguments: [
			{
				name: string;
				links: {
					repository: string;
					homepage: string;
				};
				readme: string;
				version: string;
				description: string;
			}
		];
	};
}
