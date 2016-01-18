describe('stem-devtools-client', function () {
  var stemCell = new StemSkeleton(require(process.cwd() + '/stemskeleton.json'))
  before(function (next) {
    stemCell.mockTestFolder(next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools-client', next)
  })
  after(function (next) {
    stemCell.removeMockedFolder(next)
  })
  it('$angel build', function (next) {
    stemCell.exec('angel build', function (err, stdout) {
      if (err) return next(err)
      expect(stdout).to.contain('buildjs')
      expect(stdout).to.contain('buildcss')
      expect(stdout).to.contain('buildassets')
      expect(stdout).to.contain('not found')
      next()
    })
  })
  it('$angel watch', function (next) {
    stemCell.exec('angel watch', function (err, stdout) {
      if (err) return next(err)
      expect(stdout).to.contain('watchjs')
      expect(stdout).to.contain('watchcss')
      expect(stdout).to.contain('watchassets')
      expect(stdout).to.contain('not found')
      next()
    })
  })
  describe('assets', function () {
    before(function (next) {
      stemCell.stackUpgrade('devtools-assets', next)
    })
    it('$angel buildassets', function (next) {
      stemCell.exec('angel buildassets', function (err, stdout) {
        if (err) return next(err)
        expect(stdout).to.contain('assets build successfully')
        next()
      })
    })
    it('$angel watchassets', function (next) {
      var child = stemCell.exec('angel watchassets')
      child.stdout.once('data', function (chunk) {
        // TODO buffer until expect(...).to.contain('assets watch successfully')
        stemCell.forceExit(child)
        next()
      })
    })
  })
  describe('less', function () {
    before(function (next) {
      stemCell.stackUpgrade('devtools-less', next)
    })
    it('$angel buildcss', function (next) {
      stemCell.exec('angel buildcss', function (err, stdout) {
        if (err) return next(err)
        expect(stdout).to.contain('css build successfully')
        next()
      })
    })
    it('$angel watchcss', function (next) {
      var child = stemCell.exec('angel watchcss')
      child.stdout.once('data', function (chunk) {
        // TODO buffer until expect(...).to.contain('css watch successfully')
        stemCell.forceExit(child)
        next()
      })
    })
  })
  describe('webpack', function () {
    before(function (next) {
      stemCell.stackUpgrade('devtools-webpack', next)
    })
    it('$angel buildjs', function (next) {
      stemCell.exec('angel buildjs', function (err, stdout) {
        if (err) return next(err)
        expect(stdout).to.contain('js build successfully')
        next()
      })
    })
    it('$angel watchjs', function (next) {
      var child = stemCell.exec('angel watchjs')
      child.stdout.once('data', function (chunk) {
        // TODO buffer until expect(...).to.contain('js watch successfully')
        stemCell.forceExit(child)
        next()
      })
    })
  })
  describe('browserify', function () {
    before(function (next) {
      stemCell.stackUpgrade('devtools-browserify', next)
    })
    it('$angel buildjs', function (next) {
      stemCell.exec('angel buildjs', function (err, stdout) {
        if (err) return next(err)
        expect(stdout).to.contain('js build successfully')
        next()
      })
    })
    it('$angel watchjs', function (next) {
      var child = stemCell.exec('angel watchjs')
      child.stdout.once('data', function (chunk) {
        // TODO buffer until expect(...).to.contain('js watch successfully')
        stemCell.forceExit(child)
        next()
      })
    })
  })
})
