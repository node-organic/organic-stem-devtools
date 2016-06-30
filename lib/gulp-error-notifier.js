var util = require('gulp-util')
var notifier = null
try {
  notifier = require('node-notifier')
} catch (err) {
  // ignore err
}

module.exports = function (options) {
  return function standardErrorHandler (err) {
    // Notification
    if (notifier && !options.skipErrorNotification) {
      notifier.notify({ title: options.name + ' Error', message: err.message || err })
    }
    // Log to console
    util.log(util.colors.red(options.name + ' Error'), err.message || err)
    if (options.exitOnError) {
      process.exit(1)
    }
  }
}
