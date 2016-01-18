describe('devtools-client', function () {
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
})
