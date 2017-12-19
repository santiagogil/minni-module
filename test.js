var childProcess = require('child_process')
var Conf = require('conf')
var fs = require('fs')
var mm = require('./index')
var path = require('path')
var rimraf = require('rimraf')
var test = require('tape')
var config = new Conf()
test('minni-module', function (t) {
  var testdir = path.join(__dirname, '/testdir')
  t.plan(5)
  t.throws(noName, Error, 'It should throw if no module name given')
  function noName () {
    return mm.build({})
  }
  rimraf(testdir, noOps)
  fs.mkdir(testdir, function (err) {
    if (err) noOps()
    sameDir()
  })
  function sameDir () {
    childProcess.exec('node ./minni-module.js --name testdir', function (err, stdout, stderror) {
      if (err) noOps()
      return t.equal(JSON.parse(stderror).code, 'EEXIST', 'It should exit with error if directory already exist')
    })
  }
  displayHelp()
  function displayHelp () {
    childProcess.exec('node ./minni-module.js --help', function (err, stdout, stderror) {
      if (err) console.error(err)
      return t.equal(stdout, mm.help, 'It should display help')
    })
  }
  displayConfig()
  function displayConfig () {
    rimraf(testdir, console.error)
    config.clear()
    childProcess.exec('node ./minni-module.js --config', function (err, stdout, stderror) {
      if (err) noOps()
      return t.equal(stdout, '{}', 'It should display config')
    })
  }
  updateConfig()
  function updateConfig () {
    rimraf(testdir, console.error)
    config.clear()
    childProcess.exec('node ./minni-module.js --name testdir --author tester', function (err, stdout, stderror) {
      if (err) noOps()
      return t.equal(stdout, '{"author":"tester","name":"testdir"}', 'It should update config')
    })
  }
})
function noOps () {
}
