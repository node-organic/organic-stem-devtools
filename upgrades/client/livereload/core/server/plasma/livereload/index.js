var SSEClient = require('./sse-client')
var watch = require('node-watch')

module.exports = function (plasma, dna) {
  this.dna = dna
  this.plasma = plasma
  this.clients = []
  plasma.on(dna.reactOnExpressServer, (c) => {
    this.watchTargets()
    this.reactOnExpressServer(c.data[0] || c.data)
    console.info('[livereload]', 'listening...')
  })
  plasma.on('kill', () => {
    this.kill()
  })
}

module.exports.prototype.watchTargets = function () {
  this.watcher = watch(this.dna.watchTargetDirectories, {recursive: true})
  this.watcher.on('change', (evt, name) => {
    this.reloadAllClients()
    console.info('livereload: detected', evt, name)
  })
  this.watcher.on('error', function (err) {
    console.error('livereload: error', err)
  })
}

module.exports.prototype.reloadAllClients = function () {
  this.clients.forEach(function (client) {
    client.send({
      type: 'page-reload'
    })
  })
}

module.exports.prototype.kill = function () {
  this.clients.forEach(function (client) {
    client.close()
  })
}

module.exports.prototype.reactOnExpressServer = function (expressServer) {
  expressServer.get(this.dna.livereloadScriptUrl, function (req, res, next) {
    res.sendFile(__dirname + '/client/livereload.js')
  })
  expressServer.all(this.dna.sseEndpoint, (req, res, next) => {
    var client = new SSEClient(req, res)
    this.clients.push(client)
    client.initialize()
    res.on('close', () => {
      var index = this.clients.indexOf(client)
      if (index !== -1) {
        this.clients.splice(index, 1)
      }
    })
  })
}
