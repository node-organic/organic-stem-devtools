const path = require('path')
const os = require('os')
let tempDir = path.join(os.tmpdir(), 'test-stack-upgrade-' + Math.random())

test('stack upgrade', async () => {
  jest.setTimeout(60 * 1000)
  let execute = require('../index')
  await execute({
    destDir: tempDir,
    answers: {
      'stack-name': 'test',
      'stack-desc': 'desc'
    }
  })
})
