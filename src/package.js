'use strict'

const fs = require('fs')
const path = require('path')
const pify = require('pify')
const mkdirp = require('mkdirp')
const dotProp = require('dot-prop')
const Version = require('./version')

const DEFAULT_INDENT = 4

function resolvePkg (dir) {
  dir = dir || './'
  return path.resolve(dir, 'package.json')
}

module.exports = class Pkg {
  constructor (cwd, options) {
    options = options || {}
    const create = options.create
    this.pkg = resolvePkg(cwd)

    try {
      this.data = require(this.pkg)
    } catch (err) {
      if (err.code === 'ENOENT') {
        mkdirp.sync(this.pkg)
        this.data = {}
      } else if (err.code === 'MODULE_NOT_FOUND' && create) {
        this.data = {}
      } else {
        throw err
      }
    }
  }

  set (prop, value) {
    dotProp.set(this.data, prop, value)
    return this
  }

  get (prop) {
    return dotProp.get(this.data, prop)
  }

  del (prop) {
    dotProp.delete(this.data, prop)
    return this
  }

  has (prop) {
    return dotProp.has(this.data, prop)
  }

  version () {
    return new Version(this.data)
  }

  save (indent) {
    indent = indent || DEFAULT_INDENT
    return pify(fs.writeFile)(this.pkg, JSON.stringify(this.data, null, indent), 'utf8')
  }

  saveSync (indent) {
    indent = indent || DEFAULT_INDENT
    fs.writeFileSync(this.pkg, JSON.stringify(this.data, null, indent), 'utf8')
    return this
  }
}
