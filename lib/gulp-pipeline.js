var path = require('path')
var named = require('vinyl-named')
var debug = require('gulp-debug')
var gulp = require('gulp')

module.exports = function (options) {
  var standardErrorHandler = require('./gulp-error-notifier')(options)

  var stream = gulp.src(options.src)
    .on('error', standardErrorHandler)
    .pipe(named(function (file) {
      var relativeFilePath = file.path.replace(options.rootDir + path.sep, '')
      relativeFilePath = relativeFilePath.replace(path.extname(relativeFilePath), '')
      return relativeFilePath
    }))
  options.pipeline.forEach(function (p) {
    p.on('error', standardErrorHandler)
    stream = stream.pipe(p)
  })
  stream = stream.pipe(debug({title: options.name}))
  stream = stream.pipe(gulp.dest(options.dest))
  return stream
}
