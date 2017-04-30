# devtools-client-livereloadx

Simple stack upgrade adding support for automatic browser page reload using [SSE](https://en.wikipedia.org/wiki/Server-sent_events)

## setup

`$ angel stack use devtools-client-livereload`

## usage

1. add to every page which needs livereload `<script src="//localhost:1337/livereload.js"></script>`
2. `$ angel develop`

## configuration

Update `dna._development.server.process.index.plasma.livereload`
