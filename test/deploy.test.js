describe('stem-devtools-deploy', function () {
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
  it('$angel help', function (next) {
    stemCell.exec('angel help', function (err, stdout) {
      if (err) return next(err)
      expect(stdout).to.contain('deploy')
      expect(stdout).to.contain('vps')
      next()
    })
  })
})
