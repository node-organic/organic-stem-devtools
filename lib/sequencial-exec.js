module.exports = function (entries, done) {
  entries = entries.map(function (e) {
    if (typeof e === 'object') {
      return e.cmd
    } else {
      return e
    }
  })
  var exec = require('child_process').exec
  var child = exec(entries.join(' && '), { maxBuffer: 2000 * 1024 })
  process.stdin.resume()
  process.stdin.pipe(child.stdin)
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  child.on('exit', function (code) {
    if (done) return done(new Error('failed ' + entries.join(' && ')))
    process.exit(code)
  })
}
