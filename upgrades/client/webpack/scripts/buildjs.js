module.exports = function (angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var webpackStream = require('webpack-stream')
    var webpack = require('webpack')
    var path = require('path')
    var format = require('string-template')
    var glob2base = require('organic-stem-devtools/lib/glob2base')

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.js.webpack) {
        config = require(path.join(process.cwd(), options.js.webpack))
      }
      config.devtool = '#source-map'
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
          semicolons: true,
        }
      }))
      runPipeline({
        name: 'buildjs',
        src: path.join(process.cwd(), options['js'].src),
        rootDir: path.join(process.cwd(), glob2base(options['js'].src)),
        pipeline: [
          webpackStream(config)
        ],
        dest: format(options.dest.build, {version: version}),
        exitOnError: true
      }).on('end', function () {
        console.log('js build successfully')
      })
    })
  })
}
