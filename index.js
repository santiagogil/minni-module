var fs = require('fs')
var glob = require('glob')
var mustache = require('mustache')
var path = require('path')
var Conf = require('conf')

var config = new Conf()
var unknown = `
Usage: minni-module [OPTIONS] <module name>
Try 'minni-module --help' for more information.
`
var help = `
Example: 

  minni-module --name myModuleName --author myself 

will create a new folder in current directory named 'myModuleName'
and set myself as author in config file as a parammeter to parse templates.


Options:
  -a  --author      Author name (package.json)                  [conf]
  -e  --email       email (code-of-conduct.md)                  [conf]
  -u  --user        Github user (urls in package.json)          [conf]
  -n  --name        Name of the module (folder, package.json)
  -d  --description Short description (README.md, package.json)

All options marked as '[conf]' will be saved for future usage.
You will see them in order to confirm on every use and can be overwriten
in any invocation.
`

function build (argv) {
  if (argv.help) {
    process.stdout.write(help)
    process.exit(0)
  }
  if (argv.config) {
    var val = JSON.stringify(makeConf(argv))
    process.stdout.write(val)
    process.exit(0)
  }
  if (!argv.name) {
    throw new Error(help)
  }
  makedir(makeConf(argv))
}
module.exports = {unknown: unknown, help: help, build: build}
function makeConf (argv) {
  config.set({
    'author': argv.author || config.get('author'),
    'email': argv.email || config.get('email'),
    'user': argv.user || config.get('user')
  })
  var values = config.store
  values.name = argv.name
  values.description = argv.description
  values.year = new Date().getFullYear()
  return values
}
function makedir (values) {
  fs.mkdir(path.join(process.cwd(), '/', values.name), function (err) {
    if (err) {
      throw err
    }
    process.stdout.write(JSON.stringify(values))
    makemodule(values)
  })
}
function makemodule (values) {
  glob(path.join(__dirname, '/templates/*mustache'), function (err, files) {
    if (err) process.stderr.write(err)
    files.forEach(function (file) {
      fs.readFile(file, 'utf8', function (err, template) {
        if (err) process.stderr.write(err)
        fs.writeFile(values.name + '/' + path.basename(file, '.mustache'), mustache.render(template, values), 'utf8', function (err) { if (err) process.stderr.write(err) })
      })
    })
  })

  glob(path.join(__dirname, '/templates/\.?!(*mustache)'), function (err, files) {
    if (err) {
      process.stderr.write(err)
      process.exit(1)
    }
    files.forEach(function (file) {
      fs.createReadStream(file, 'utf8').pipe(fs.createWriteStream(values.name + '/' + path.basename(file), 'utf8'))
    })
  })
}
