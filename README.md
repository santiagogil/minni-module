# minni-module

Minimal npm module scaffolding

[![Build Status](https://travis-ci.org/santiagogil/minni-module.svg?branch=master)](https://travis-ci.org/santiagogil/minni-module)
[![Greenkeeper badge](https://badges.greenkeeper.io/santiagogil/minni-module.svg)](https://greenkeeper.io/)
[![NSP Status](https://nodesecurity.io/orgs/nnns/projects/7fc35d21-a146-4778-8b36-e7436e7553a3/badge)](https://nodesecurity.io/orgs/nnns/projects/7fc35d21-a146-4778-8b36-e7436e7553a3)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![codecov](https://codecov.io/gh/santiagogil/minni-module/branch/master/graph/badge.svg)](https://codecov.io/gh/santiagogil/minni-module)




## Work in progress
Not redy for usage yet.

## Usage

```
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
```

## What it does

Scaffolds a high quality javascript module in one command so you can focus on codding.


## Why

We love high quality open source so we love standards, best practices and unix filosophy.

The goal of this tool is to make it as uncomplicated as posible to create new healthy modules.

Let's make high quality our default.


## Features

### Static analysis

Check code for common mistakes and style on every commit with standard.


## Security

Audit your dependencies for known vulnerabilities on every commit using nsp.


### Tests

Write uncomplicated tests with tape and run your test suit on every commit.


### Test coverage

Keep an eye on test coverage with istambul.


### Release

Rekease often and reliably with commitizen and semantic release.


### Update

With all this in place it's really easy to enable greenkeeper to let it keep dependencies up to date for you.


### Colaborate

Inform contributors and users about your workflow with issues and pull request templates.


### Organize

Create a healthy community around your work by establishing a govenance model (open open-source) and  a code of conduct (contributor covennant).


### Write

Use write-good to to lint documentation.

```
$ npm run lint-prose
```


### Certify

Your minni-module based module is almost ready to certify CII Best Practices.

Go get your badge to proudly show in the readme.

