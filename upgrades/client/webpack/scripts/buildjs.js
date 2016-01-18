module.exports = function (angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')
    var path = require('path')
    var format = require('organic-stem-devtools/node_modules/string-template')

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.js.webpack) {
        config = require(path.join(process.cwd(), options.js.webpack))
      }
      runPipeline({
        name: 'buildjs',
        src: options['js'].src,
        pipeline: [
          sourcemaps.init(),
          webpack(config),
          uglify(),
          sourcemaps.write('./maps')
        ],
        dest: format(options.dest.build, {version: version}),
        exitOnError: true
      }).on('end', function () {
        console.log('js build successfully')
      })
    })
  })
}
