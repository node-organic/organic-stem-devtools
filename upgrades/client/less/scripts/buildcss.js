module.exports = function (angel) {
  angel.on('buildcss', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var less = require('gulp-less')
    var format = require('string-template')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')
    var config = {
      verbose: true,
      plugins: [ new LessPluginAutoPrefix() ],
      compress: true
    }

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      runPipeline({
        name: 'buildcss',
        src: options.src + (options['buildcss'] ? options['buildcss'].pattern : '/**/*.bundle.css'),
        pipeline: [
          less(config)
        ],
        dest: format(options.dest.build, {version: version}),
        exitOnError: true
      }).on('end', function () {
        console.log('css build successfully')
      })
    })
  })
}
