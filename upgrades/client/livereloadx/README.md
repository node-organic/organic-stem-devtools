# devtools-client-livereloadx

Simple stack upgrade adding support for automatic browser page reload when `build` folder contents is modified via [livereloadx](http://nitoyon.github.io/livereloadx/)

## setup

`$ angel stack use devtools-client-livereloadx`

## usage

1. add to every page which needs livereload `<script src="//localhost:35729/livereload.js?snipver=2"></script>`
2. `$ angel develop` (or `$ angel watch`)

## configuration

update your copy of `/scripts/watch.js`
