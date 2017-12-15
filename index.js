var fs = require('fs')
var glob = require('glob')
var mustache = require('mustache')
var path = require('path')
var Conf = require('conf')

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
  if (!argv.name) {
    console.error(`
    Please provide a name for your module.
    Example:

      'minni-module --name your-module-name'
    `)
    return process.exit(1)
  }
  var config = new Conf()
  config.set({
    'author': argv.author,
    'email': argv.email,
    'user': argv.user
  })
  var values = config.store
  values.name = argv.name
  values.description = argv.description
  console.log(values)
  fs.mkdir(process.cwd() + '/' + values.name, function (err) {
    if (err) {
      console.log('Directory already exist')
      console.error(err)
      return process.exit(1)
    }
  })

  glob(path.join(__dirname, '/templates/*mustache'), function (err, files) {
    if (err) return err
    files.forEach(function (file) {
      fs.readFile(file, 'utf8', function (err, template) {
        if (err) return err
        fs.writeFile(values.name + '/' + path.basename(file, '.mustache'), mustache.render(template, values), 'utf8', console.log)
      })
    })
  })

  glob(path.join(__dirname, '/templates/!(*mustache)'), function (err, files) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    files.forEach(function (file) {
      fs.createReadStream(file, 'utf8').pipe(fs.createWriteStream(values.name + '/' + path.basename(file), 'utf8'))
    })
  })
}
module.exports = {unknown: unknown, help: help, build: build}
