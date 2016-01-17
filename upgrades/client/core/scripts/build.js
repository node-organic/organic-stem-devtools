module.exports = function (angel) {
  angel.on('build', function (angel, next) {
    var exec = require('child_process').exec
    var path = require('path')
    var format = require('string-template')
    var loadDNA = require('organic-dna-loader')
    var parallel = require('organic-stem-devtools/lib/parallel-exec')

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      var options = dna.client.build
      parallel(options.commands.build, function (err) {
        if (err) return next(err)
        var cwd = process.cwd()
        var destBuildPath = format(options.dest.build, {version: version})
        exec('ln -sfT ' + path.join(cwd, destBuildPath) + ' ' + path.join(cwd, options.dest.link), function (err) {
          if (err) return next(err)
          console.info('linked ' + destBuildPath + ' -> ' + options.dest.link)
        })
      })
    })
  })
}
