module.exports = function (angel) {
  angel.on('deploy production', function (angel) {
    var sequence = require('organic-stem-devtools/lib/sequencial-exec')
    sequence([
      'git checkout develop',
      'git push origin develop',
      'git pull origin develop',
      'git checkout master',
      'git merge staging',
      'git push origin master',
      'git checkout develop',
      'node ./node_modules/.bin/angel cell upgrade ./dna/_production/cell.json'
    ])
  })
  .example('angel deploy production')
  .description('deploys to the production enviornment (defined by "dna/_production/cell.json") without bumping the semver')

  angel.on('deploy staging', function (angel) {
    var sequence = require('organic-stem-devtools/lib/sequencial-exec')
    sequence([
      'npm run test:style',
      'git checkout develop',
      'git push origin develop',
      'git pull origin develop',
      'npm version patch',
      'git push --tags origin develop',
      'git checkout staging',
      'git pull origin staging',
      'git merge develop',
      'git push origin staging',
      'git checkout develop',
      'node ./node_modules/.bin/angel cell upgrade ./dna/_staging/cell.json'
    ])
  })
  .example('angel deploy staging')
  .description('deploys to the production enviornment (defined by "dna/_staging/cell.json") while BUMPING the MINOR semver (npm version patch)')

  angel.on('deploy:setup', function (angel) {
    var sequence = require('organic-stem-devtools/lib/sequencial-exec')
    sequence([
      'git checkout master',
      'git checkout -b develop',
      'git push origin develop',
      'git checkout -b staging',
      'git push origin staging',
      'git checkout develop'
    ])
  })
  .example('angel deploy setup')
  .description('locally checkouts the "develop" and "staging" branches from "master" and pushes them to the remote')
}
