#!/usr/bin/env node

var parseArgs = require('minimist')
var mm = require('./index')

var opts = {
  string: ['author', 'email', 'user', 'name', 'description'],
  boolean: ['help', 'config'],
  alias: {
    author: 'a',
    email: 'e',
    user: 'u',
    name: 'n',
    description: 'd',
    help: 'h',
    config: 'c'
  },
  unknown: function (param) {
    console.error('unknown arg: ', param)
    throw new Error(mm.help)
  }
}
var argv = parseArgs(process.argv.slice(2), opts)
mm.build(argv)
