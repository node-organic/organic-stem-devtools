module.exports = function (angel) {
  angel.on('watchjs', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var path = require('path')
    var glob2base = require('organic-stem-devtools/lib/glob2base')

    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.js.webpack) {
        config = require(path.join(process.cwd(), options.js.webpack))
      }

      config.watch = true
      config.devtool = '#cheap-module-eval-source-map'

      runPipeline({
        name: 'watchjs',
        src: path.join(process.cwd(), options['js'].src),
        rootDir: path.join(process.cwd(), glob2base(options['js'].src)),
        pipeline: [
          webpack(config)
        ],
        dest: options.dest.watch
      }).on('end', function () {
        console.log('js watch successfully')
      })
    })
  })

  angel.on('watchjs :part', function (angel) {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var path = require('path')
    var glob2base = require('organic-stem-devtools/lib/glob2base')
    var glob2filename = require('organic-stem-devtools/lib/glob2filename')

    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.js.webpack) {
        config = require(path.join(process.cwd(), options.js.webpack))
      }

      config.watch = true
      config.devtool = '#cheap-module-eval-source-map'

      var srcRoot = glob2base(options['js'].src)
      var srcFilename = glob2filename(options['js'].src)

      runPipeline({
        name: 'watchjs',
        src: path.join(process.cwd(), srcRoot + angel.cmdData.part + srcFilename),
        rootDir: path.join(process.cwd(), glob2base(options['js'].src)),
        pipeline: [
          webpack(config)
        ],
        dest: options.dest.watch
      }).on('end', function () {
        console.log('js watch successfully')
      })
    })
  })
}
