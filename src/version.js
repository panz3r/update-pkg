'use strict'

const dotProp = require('dot-prop')

module.exports = class Version {
  constructor (sourceData) {
    this.data = sourceData

    this.v = dotProp.get(this.data, 'version').split('.')

    this.v.length < 1 && (this.v[0] = 0)
    this.v.length < 2 && (this.v[1] = 0)
    this.v.length < 3 && (this.v[2] = 0)

    this.v.length = 3
  }

  get () {
    return this.v.join('.')
  }

  _set () {
    dotProp.set(this.data, 'version', this.get())
    return this
  }

  newMajor () {
    return this.major().minor(0).patch(0)
  }

  newMinor () {
    return this.minor().patch(0)
  }

  major (major) {
    this.v[0] = major || ++this.v[0]
    return this._set()
  }

  minor (minor) {
    console.log('m', minor, this.v[1])
    this.v[1] = minor || ++this.v[1]
    return this._set()
  }

  patch (patch) {
    this.v[2] = patch || ++this.v[2]
    return this._set()
  }
}
