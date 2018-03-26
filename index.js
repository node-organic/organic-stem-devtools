#!/usr/bin/env node

const StackUpgrade = require('organic-stack-upgrade')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)

const execute = async function ({destDir = process.cwd(), answers}) {
  let stack = new StackUpgrade({
    destDir: destDir,
    name: 'organic-stem-devtools',
    version: '1.0.0'
  })
  await stack.configureMergeAndUpdateJSON({
    sourceDir: path.join(__dirname, 'seed'),
    answers
  })
  console.info('run npm install...')
  let npmOutput = await exec('npm install')
  console.info(npmOutput.stdout)
  console.error(npmOutput.stderr)
}

if (module.parent) {
  module.exports = execute
} else {
  execute().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
