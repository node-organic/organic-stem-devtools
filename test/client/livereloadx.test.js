describe('devtools-client-livereloadx', function () {
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
  describe('livereloadx', function () {
    before(function (next) {
      stemCell.stackUpgrade('devtools-client-livereloadx', next)
    })
    it('$angel watch', function (next) {
      var child = stemCell.exec('angel watch')
      child.stdout.once('data', function (chunk) {
        // TODO buffer until expect(...).to.contain('')
        stemCell.forceExit(child)
        next()
      })
    })
  })
})
