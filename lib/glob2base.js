module.exports = function (input) {
  // input === "client/apps/**/*.bundle.js"
  var result = []
  var parts = input.split('/')
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].indexOf('*') === -1 && parts[i].indexOf('.') === -1) {
      result.push(parts[i])
    } else {
      break
    }
  }
  return result.join('/')
}
