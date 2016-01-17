module.exports = function (angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')
    var path = require('path')
    var format = require('string-template')

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.webpack) {
        config = require(path.join(process.cwd(), options.webpack))
      }
      runPipeline({
        name: 'buildjs',
        src: options.src + (options['buildjs'] ? options['buildjs'].pattern : '/**/*.bundle.js'),
        pipeline: [
          sourcemaps.init(),
          webpack(config),
          uglify(),
          sourcemaps.write('../maps')
        ],
        dest: format(options.dest.build, {version: version}),
        exitOnError: true
      }).on('end', function () {
        console.log('js build successfully')
      })
    })
  })
}
