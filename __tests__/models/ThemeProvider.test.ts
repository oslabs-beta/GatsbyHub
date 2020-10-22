import ThemeProvider from '../../src/models/ThemeProvider';
import Theme from '../../src/models/Theme';

describe('Themes View', () => {
	let provider: any;
	let themes: Theme[];

	beforeAll(async () => {
		provider = new ThemeProvider();
		themes = await provider.createThemes();
		provider.data = themes;
	});

	it('should successfully fetch themes from npm api', () => {
		expect(themes).not.toBeUndefined();
		expect(themes).not.toHaveLength(0);
		expect(Array.isArray(themes)).toEqual(true);
	});

	it('should store fetched themes in data property as an array', () => {
		expect(provider.data).not.toHaveLength(0);
		expect(Array.isArray(provider.data)).toEqual(true);
	});
});
