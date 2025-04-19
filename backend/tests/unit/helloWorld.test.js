const helloWorld = require('../../src/helloWorld');
test('returns "Hello, World!"', () => {
	expect(helloWorld()).toBe('Hello, World!');
});