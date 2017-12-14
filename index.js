var fs = require('fs')
var glob = require('glob')
var mustache = require('mustache')
var path = require('path')
var yaml = require('js-yaml')

if(!process.argv[3]) {
  console.error('you must provide a destination directory')
}
fs.mkdir(process.cwd() + '/' + process.argv[3], console.log)

var values = yaml.safeLoad(fs.readFileSync(process.argv[2] || './values.yaml', 'utf8'))
var dest = process.argv[3]
glob(__dirname + '/templates/*mustache', function ( err, files ) {
  if (err) return err
  files.forEach(function (file) {
    fs.readFile(file, 'utf8', function (err,template) {
      if (err) return err
      fs.writeFile(dest + '/' + path.basename(file, '.mustache'), mustache.render(template, values), 'utf8', console.log)
    })
  })
})

glob(__dirname + '/templates/!(*mustache)', function ( err, files ) {
  files.forEach(function (file) {
    fs.createReadStream(file, 'utf8').pipe(fs.createWriteStream(dest + '/' + path.basename(file), 'utf8'))
  })
})
