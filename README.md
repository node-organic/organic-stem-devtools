# organic-stem-devtools

`organic-stem-skeleton` upgrade providing command line tools for web development.

* compile frontend client code
* deploy to staging/production servers

## devtools core upgrade

```
$ npm install organic-stem-devtools
$ angel stack use devtools
... install any devtools addon upgrades, see $ angel stack list
```

This upgrade provide support for developing a cell via

```
$ angel develop
```

After upgrade git diff:
* `scripts/develop.js`

### devtools-client

```
$ angel stack use devtools-client
```

This upgrade provide support for building and watching frontend/client code via

```
$ angel build
$ angel watch
```

After upgrade git diff:
* `scripts/build.js`
* `scripts/watch.js`

#### devtools-assets

```
$ angel stack use devtools-assets
```

This upgrade provide support for copying static assets from various source folders to build/watch destination via:

```
$ angel buildassets
$ angel watchassets
```

After upgrade git diff:
* `dna/client/build.json` -> `assets` section
* `scripts/buildassets.js`
* `scripts/watchassets.js`

#### devtools-less

```
$ angel stack use devtools-less
```

This upgrade provide support for `*.bundle.css` files via [less](https://github.com/less/less.js)

```
$ angel buildcss
$ angel watchcss
```

After upgrade git diff:
* `dna/client/build.json` -> `css` section
* `scripts/buildcss.js`
* `scripts/watchcss.js`

#### devtools-webpack

```
$ angel stack use devtools-webpack
```

This upgrade provide support for `*.bundle.js` files via [webpack](https://github.com/webpack/webpack)

```
$ angel buildjs
$ angel watchjs
```

After upgrade git diff:
* `dna/client/build.json` -> `js` section
* `scripts/buildjs.js`
* `scripts/watchjs.js`

#### devtools-browserify

```
$ angel stack use devtools-browserify
```

This upgrade provide support for `*.bundle.js` files via [browserify](https://github.com/substack/node-browserify)

```
$ angel buildjs
$ angel watchjs
```

After upgrade git diff:
* `dna/client/build.json` -> `js` section
* `scripts/buildjs.js`
* `scripts/watchjs.js`

### devtools-deploy

```
$ angel stack use devtools-deploy
```

This upgrade provide support for deploy and release at remote servers.

```
$ angel vps setup ./dna/_staging/vps.json
$ angel nginx update ./dna/_staging/nginx.json
$ angel cell setup ./dna/_staging/cell.json
$ angel deploy staging
$ angel cell rollback ./dna/_staging/cell.json
$ angel cell uninstall ./dna/_staging/cell.json
```

After upgrade git diff:
* `dna/_production` folder
* `dna/_staging` folder
* `scripts/deploy.js`
* `scripts/vps.js`
* `scripts/rollback.js`
* [angelscripts-cellcmds](https://github.com/outbounder/angelscripts-cellcmds) package
* [angelscripts-nginx](https://github.com/outbounder/angelscripts-nginx) package

### devtools-nodemon


```
$ angel stack use devtools-nodemon
```

This upgrade provide support for autmatic restart of server process via [nodemon](https://github.com/remy/nodemon/)

```
$ angel develop
```

After upgrade git diff:
* `scripts/develop.js`


## how to run tests

1. create `mock-stemskeleton.json` into the repo's root folder

  ```
  $ cd organic-stem-devtools
  $ echo '"/full/path/to/stem-seed"' > mock-stemskeleton.json
  ```

2. **optimize performance** and install all stack upgrades

  ```
  $ cd /full/path/to/stem-seed
  $ npm install angelscripts-stack-use organic-stem-skeleton
  $ angel stack use devtools
  $ git add --all && git commit
  // ... angel stack use all devtools upgrades, this will cache node_modules deps
  git reset --hard HEAD
  ```
