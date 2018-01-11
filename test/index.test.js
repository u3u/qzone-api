const config = require('../lib/utils/config')

test('main', () => {
  expect(typeof config).toBe('object')
})
