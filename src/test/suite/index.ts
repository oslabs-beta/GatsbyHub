/* eslint-disable arrow-parens */
import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export default function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true,
	});

	const testsRoot = path.resolve(__dirname, '..');

	return new Promise((c, e) => {
		glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
			if (err) {
				return e(err);
			}

			// Add files to the test suite
			files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

			try {
				// Run the mocha test
				mocha.run((failures) => {
					if (failures > 0) {
						return e(new Error(`${failures} tests failed.`));
					}
					return c();
				});
			} catch (error) {
				console.error(error);
				return e(error);
			}
			return c();
		});
	});
}
