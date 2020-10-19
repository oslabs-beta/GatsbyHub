/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/naming-convention */
import StatusBar from './statusBarItem';

// eslint-disable-next-line no-undef
describe('status bar item', () => {
	beforeAll(() => {});

	afterEach(() => {});

	it('status bar online', () => {
		const statusBarItem = StatusBar.online();
		expect(statusBarItem).toEqual(
			expect.objectContaining({
				text: '$(rocket) GatsbyHub',
				tooltip: 'Launch Development Server',
				command: 'gatsbyhub.develop',
			})
		);
	});
});
