(function () {
  var EventSource = window.EventSource
  if (!EventSource) {
    console.warn('[livereload]',
      'your browser does not support EventSource (SSE)',
      'see https://en.wikipedia.org/wiki/Server-sent_events')
    return
  }
  var es = new EventSource('/sse')
  es.addEventListener('page-reload', function (e) {
    console.log('[livereload]', 'reloading page...')
    window.location.reload()
  })
  // TODO (?) replace css
  // TODO (?) hot reload javascript
  console.log('[livereload]', 'waiting for commands...')
})()
