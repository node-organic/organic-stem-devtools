module.exports = function (angel) {
  angel.on('rollback', function (angel, next) {
    var format = require('string-template')
    var sequence = require('organic-stem-devtools/lib/sequencial-exec')
    var loadDNA = require('organic-dna-loader')
    var path = require('path')
    var isOSX = require('organic-stem-devtools/lib/os').isOSX

    var packagejson = require(path.join(process.cwd(), 'package.json'))
    var parts = packagejson.version.split('.')
    parts[2] = (parseInt(parts[2], 10) - 1).toString()
    var olderVersion = parts.join('.')

    loadDNA(function (err, dna) {
      if (err) return next(err)
      var options = dna.client.build

      // destination build folder (default /build/{version})
      var destBuildPath = format(options.dest.build, {version: olderVersion})
      console.info('linking ' + destBuildPath + ' -> ' + options.dest.link)
      var cwd = process.cwd()
      sequence([
        // checkout taggged version
        'git checkout v' + olderVersion,
        // re-link tagged version to destination link (default /public/release)
        'ln ' + (isOSX ? '-sf' : '-sfT') + ' ' + path.join(cwd, destBuildPath) + ' ' + path.join(cwd, options.dest.link)
      ], next)
    })
  })
  .example('angel rollback')
  .description('1. locally checkouts to the PREVIOUS minor version - X.Y.(Z-1).\n' +
               '2. Updates the symlink to the lastest client build ("/public/release" by default).')
}
