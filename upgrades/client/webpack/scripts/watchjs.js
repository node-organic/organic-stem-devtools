module.exports = function (angel) {
  angel.on('watchjs', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var sourcemaps = require('gulp-sourcemaps')
    var path = require('path')

    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.webpack) {
        config = require(path.join(process.cwd(), options.webpack))
      }
      config.watch = true
      runPipeline({
        name: 'watchjs',
        src: options.src + (options['watchjs'] ? options['watchjs'].pattern : '/**/*.bundle.js'),
        pipeline: [
          sourcemaps.init(),
          webpack(config),
          sourcemaps.write()
        ],
        dest: options.dest.watch
      }).on('end', function () {
        console.log('js watch successfully')
      })
    })
  })
}
