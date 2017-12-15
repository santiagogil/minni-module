var parseArgs = require('minimist')
var mm = require('./index')

var opts = {
  string: ['author', 'email', 'user', 'name', 'description'],
  alias: {
    author: 'a',
    email: 'e',
    user: 'u',
    name: 'n',
    description: 'd'
  },
  unknown: function (param) {
    console.error('unknown arg: ', param)
    console.error(mm.help)
    process.exit(1)
  }
}
var argv = parseArgs(process.argv.slice(2), opts)
mm.build(argv)
