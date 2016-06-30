module.exports = function (angel) {
  angel.on('vps setup :vpsPath', function (angel) {
    var format = require('organic-stem-devtools/string-template')
    var sequence = require('organic-stem-devtools/lib/sequencial-exec')

    var vpsConfig = require(angel.cmdData.vpsPath)
    sequence([
      format('scp {local} {remote}:{dest}', vpsConfig),
      format("ssh {remote} '{shell} -c {dest}'", vpsConfig)
    ])
  })
}
