module.exports = function (angel) {
  angel.on('buildcss', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var less = require('gulp-less')
    var format = require('organic-stem-devtools/node_modules/string-template')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')

    // load configuration
    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build

      // run the css pipeline on every bundle
      runPipeline({
        name: 'buildcss',
        src: options['css'].src,
        pipeline: [
          less({
            verbose: true,
            plugins: [ new LessPluginAutoPrefix() ],
            compress: true
          })
        ],
        dest: format(options.dest.build, {version: version}),
        exitOnError: true
      }).on('end', function () {
        console.log('css build successfully')
      })
    })
  })
}
