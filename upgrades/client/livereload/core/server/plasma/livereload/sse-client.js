// code from https://github.com/einaros/sse.js/blob/f2a7482d89fff2d7d2010d897e4f8f7bdfa58b2f/lib/sse.js

var SSEClient = module.exports = function SSEClient (req, res) {
  this.req = req
  this.res = res
}

SSEClient.prototype.initialize = function () {
  this.req.socket.setNoDelay(true)
  this.res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
  this.res.write(':ok\n\n')
}

/*
  Event : {
    type: String,
    data: Object || String,
    id: String,
    retry: Number?
  }
*/
SSEClient.prototype.send = function (event) {
  if (arguments.length === 0) throw new Error('event argument required')

  if (event.type) this.res.write('event: ' + event.type + '\n')
  if (event.retry) this.res.write('retry: ' + event.retry + '\n')
  if (event.id) this.res.write('id: ' + event.id + '\n')

  if (typeof event.data === 'object') {
    event.data = JSON.stringify(event.data)
  }

  if (event.data) {
    event.data = event.data.replace(/(\r\n|\r|\n)/g, '\n')
    var dataLines = event.data.split(/\n/)

    var l = dataLines.length
    for (var i = 0; i < l; ++i) {
      var line = dataLines[i]
      if ((i + 1) === l) {
        this.res.write('data: ' + line + '\n\n')
      } else {
        this.res.write('data: ' + line + '\n')
      }
    }
  } else {
    this.res.write('data: ' + '\n\n')
  }
}

SSEClient.prototype.close = function () {
  this.res.end()
}
