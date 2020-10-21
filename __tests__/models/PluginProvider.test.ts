import PluginProvider from '../../src/models/PluginProvider';
import Plugin from './Plugin';

// jest.mock('../../src/models/PluginProvider');

describe('Plugin View', () => {
	// NOTE change this type once test starts to work
	let provider: any;
	let plugins: Plugin[];

	beforeAll(async () => {
		provider = new PluginProvider();
		plugins = await provider.createPlugins();
		provider.data = plugins;
	});

	it('should successfully fetch plugins from npm api', () => {
		expect(plugins).not.toBeUndefined();
		expect(plugins).not.toHaveLength(0);
		expect(Array.isArray(plugins)).toEqual(true);
	});

	it('should store fetched plugins in data property', () => {
		expect(provider.data).not.toHaveLength(0);
		expect(Array.isArray(provider.data)).toEqual(true);
	});
});
