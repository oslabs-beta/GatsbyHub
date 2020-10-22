import NpmData from '../../src/models/NpmData';

describe('Npm Data model', () => {
	let provider: NpmData;
	let plugins: any;
	let starters: any;
	let themes: any;

	beforeAll(async () => {
		provider = new NpmData();
		plugins = await provider.getNpmPackages('plugin');
		starters = await provider.getNpmPackages('starter');
		themes = await provider.getNpmPackages('theme');
	});

	it('getNpmPackages successfully fetches plugins', () => {
		expect(plugins).not.toBeUndefined();
		expect(plugins).not.toEqual({});
		expect(plugins).not.toEqual([]);
	});

	it('getNpmPackages successfully fetches starters', () => {
		expect(starters).not.toBeUndefined();
		expect(starters).not.toEqual({});
		expect(starters).not.toEqual([]);
	});

	it('getNpmPackages successfully fetches themes', () => {
		expect(themes).not.toBeUndefined();
		expect(themes).not.toEqual({});
		expect(themes).not.toEqual([]);
	});

	it('getNpmInstall should return a string containing "npm install"', async () => {
		const { links } = plugins[0];
		const install = await NpmData.getNpmInstall(
			links.repository,
			links.homepage
		);
		expect(install).toContain('npm install');
	});

	it('mdToHtml should return a string', async () => {
		const { links } = plugins[0];
		const html = await NpmData.mdToHtml(links.repository, links.homepage);
		expect(typeof html).toEqual('string');
	});
});
