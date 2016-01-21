describe('devtools-server', function () {
  var stemCell = new StemSkeleton(require(process.cwd() + '/mock-stemskeleton.json'))
  before(function (next) {
    stemCell.mockTestFolder(next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools', next)
  })
  after(function (next) {
    stemCell.removeMockedFolder(next)
  })
  describe('nodemon', function () {
    before(function (next) {
      stemCell.stackUpgrade('devtools-nodemon', next)
    })
    it('$angel develop', function (next) {
      var child = stemCell.exec('angel develop')
      child.stdout.once('data', function (chunk) {
        // TODO buffer until expect(...).to.contain('...')
        stemCell.forceExit(child)
        next()
      })
    })
  })
})
