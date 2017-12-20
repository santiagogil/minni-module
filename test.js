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
    var out = function () {childProcess.execSync('node ./minni-module.js --name testdir')}
    t.throws(out, Error, 'It should exit with error if directory already exist')
    }
  displayHelp()
  function displayHelp () {
    var out = childProcess.execSync('node ./minni-module.js --help').toString()
      return t.equal(out, mm.help, 'It should display help')
    }
  displayConfig()
  function displayConfig () {
    rimraf(testdir, console.error)
    config.clear()
    var out = childProcess.execSync('node ./minni-module.js --config').toString()
      return t.equal(out, '{}', 'It should display config')
    }
  updateConfig()
  function updateConfig () {
    rimraf(testdir, console.error)
    config.clear()
    var out = function () {childProcess.execSync('node ./minni-module.js --name testdir --author tester')}
    t.throws(out, '{"author":"tester","name":"testdir"}', 'It should update config')
    }
  }
)
function noOps () {
}
