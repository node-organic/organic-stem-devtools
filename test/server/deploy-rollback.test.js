describe('devtools-deploy', function () {
  var stemCell = new StemSkeleton(require(process.cwd() + '/mock-stemskeleton.json'))
  before(function (next) {
    stemCell.mockTestFolder(next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools', next)
  })
  before(function (next) {
    stemCell.stackUpgrade('devtools-deploy', next)
  })
  after(function (next) {
    stemCell.removeMockedFolder(next)
  })
  it('$angel rollback', function (next) {
    stemCell.exec('angel rollback', function (err) {
      console.log(err)
      next()
    })
  })
  describe('with devtools-client', function () {
    before(function (next) {
      stemCell.stackUpgrade('devtools-client', next)
    })
    before(function (next) {
      stemCell.stackUpgrade('devtools-deploy', next)
    })
    it('$angel rollback', function (next) {
      stemCell.exec('angel rollback', function (err) {
        console.log(err)
        next()
      })
    })
  })
})
