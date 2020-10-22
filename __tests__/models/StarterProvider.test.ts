import StarterProvider from '../../src/models/StarterProvider';
import Starter from '../../src/models/Starter';

describe('Starters View', () => {
	let provider: any;
	let starters: Starter[];

	beforeAll(async () => {
		provider = new StarterProvider();
		starters = await provider.createStarters();
		provider.data = starters;
	});

	it('should successfully fetch starters from npm api', () => {
		expect(starters).not.toBeUndefined();
		expect(starters).not.toHaveLength(0);
		expect(Array.isArray(starters)).toEqual(true);
	});

	it('should store fetched starters in data property as an array', () => {
		expect(provider.data).not.toHaveLength(0);
		expect(Array.isArray(provider.data)).toEqual(true);
	});
});
