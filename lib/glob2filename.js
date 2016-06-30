module.exports = function (input) {
  // input === "client/apps/**/*.bundle.js"
  return input.split('/').pop()
}
