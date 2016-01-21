module.exports = function (angel) {
  angel.on('develop', function (angel, next) {
    var parallel = require('organic-stem-devtools/lib/parallel-exec')
    parallel([
      'node ./node_modules/.bin/angel watch',
      'node ./node_modules/.bin/nodemon ./index.js'
    ])
  })
}
