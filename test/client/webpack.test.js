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
})
