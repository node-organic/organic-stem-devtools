describe('devtools-client', function () {
  var stemCell = new StemSkeleton(require(process.cwd() + '/mock-stemskeleton.json'))
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
})
