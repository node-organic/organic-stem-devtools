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
})
