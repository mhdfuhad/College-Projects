const converter = require('../../src/utils/converter');

describe('converter()', () => {
  test('converts buffer to string given type text/plain', async () => {
    const data = Buffer.from('hello');
    expect(await converter('text/plain', data)).toBe('hello');
  });

  test('converts buffer to JSON given type application/json', async () => {
    const data = Buffer.from('{"hello":"world"}');
    expect(await converter('application/json', data)).toEqual({ hello: 'world' });
  });

  test('converts buffer to HTML given type text/html', async () => {
    const data = Buffer.from('# hello');
    expect(await converter('text/html', data, 'text/markdown')).toBe('<h1>hello</h1>\n');
  });
});
