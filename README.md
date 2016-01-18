# organic-stem-devtools

`organic-stem-skeleton` upgrade providing command line tools for web development.

* compile frontend client code
* deploy to staging/production servers

## devtools

1. use devtools core upgrade

  ```
  $ angel stack use git@github.com:outbounder/organic-stem-devtools.git
  -- or --
  $ angel stack use devtools
  ```

2. use any of the follow up upgrades provided from the package

### devtools-client

1. use client core upgrade

  ```
  $ angel stack use devtools-client
  ```

  This upgrade provide support for building and watching frontend/client code via

  ```
  $ angel build
  $ angel watch
  ```

  Checkout:
  * `scripts/build.js`
  * `scripts/watch.js` for details.

2. use devtools

  #### devtools-assets

  ```
  $ angel stack use devtools-assets
  ```

  This upgrade provide support for asset files.

  Checkout:
  * `dna/client/build.json` -> `assets` section
  * `scripts/buildassets.js`
  * `scripts/watchassets.js`

  #### devtools-less

  ```
  $ angel stack use devtools-less
  ```

  This upgrade provide support for `*.bundle.css` files via `less`.

  Checkout:
  * `dna/client/build.json` -> `buildcss` section
  * `scripts/buildcss.js`
  * `scripts/watchcss.js`

  #### devtools-webpack

  ```
  $ angel stack use devtools-webpack
  ```

  This upgrade provide support for `*.bundle.js` files via `webpack`.

  Checkout:
  * `dna/client/build.json` -> `buildjs` section
  * `scripts/buildjs.js`
  * `scripts/watchjs.js`

  #### devtools-browserify

  ```
  $ angel stack use devtools-browserify
  ```

  This upgrade provide support for `*.bundle.js` files via `browserify`.

  Checkout:
  * `dna/client/build.json` -> `buildjs` section
  * `scripts/buildjs.js`
  * `scripts/watchjs.js`

### devtools-deploy

  ```
  $ angel stack use devtools-deploy
  ```

  This upgrade provide support for deploy and release at remote servers.

  Checkout:
  * `dna/_production` folder
  * `dna/_staging` folder
  * `scripts/deploy.js`
  * `scripts/vps.js`
  * [angelscripts-cellcmds](https://github.com/outbounder/angelscripts-cellcmds) package
  * [angelscripts-nginx](https://github.com/outbounder/angelscripts-nginx) package


## how to run tests

```
npm test
```

### pre-test steps

1. define stemskeleton.json

  ```
  $ cd organic-stem-devtools
  $ echo '"/full/path/to/organic-stem-skeleton"' > stemskeleton.json
  ```

2. **optimize performance** and install all stack upgrades

  ```
  $ cd /full/path/to/organic-stem-skeleton
  $ angel stack use devtools &&
  angel stack use devtools-client &&
  angel stack use devtools-deploy &&
  angel stack use devtools-less &&
  angel stack use devtools-webpack &&
  angel stack use devtools-browserify &&
  git reset --hard HEAD
  ```
