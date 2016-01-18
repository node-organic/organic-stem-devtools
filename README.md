# organic-stem-devtools

`organic-stem-skeleton` upgrade providing command line tools for web development.

* compile frontend client code
* deploy to staging/production servers

## usage

1. use devtools core upgrade

  ```
  $ angel stack use git@github.com:outbounder/organic-stem-devtools.git
  -- or --
  $ angel stack use devtools
  ```

2. use client core upgrade

  ```
  $ angel stack use devtools-client
  ```

3. use client tools

  ```
  $ angel stack use devtools-less

  $ angel stack use devtools-webpack
  -- or --
  $ angel stack use devtools-browserify
  ```

4. use deploy tools

  ```
  $ angel stack use devtools-deploy
  ```

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
