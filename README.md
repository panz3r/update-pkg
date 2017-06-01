# update-pkg-extended
[![license](https://img.shields.io/github/license/panz3r/update-pkg-extended.svg)](LICENSE)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Travis](https://img.shields.io/travis/panz3r/update-pkg-extended.svg)](http://travis-ci.org/panz3r/update-pkg-extended) [![NPM version](https://img.shields.io/npm/v/update-pkg-extended.svg)](https://npmjs.com/package/update-pkg-extended) [![NPM downloads](https://img.shields.io/npm/dm/update-pkg-extended.svg)](https://npmjs.com/package/update-pkg-extended)

> Update package.json with ease

## Notice
This is a fork of [update-pkg](https://github.com/egoist/update-pkg) by [EGOIST](https://github.com/egoist)

## Install

```bash
$ npm install --save update-pkg-extended
```
or
```bash
$ yarn add update-pkg-extended
```

## Usage

```js
const Pkg = require('update-pkg-extended')

const pkg = new Pkg()
pkg.data //=> package.json object

// Update package.json fields
pkg.set('author.name', 'panz3r')

// Save synchronously
pkg.saveSync()
// or Promise
pkg.save().then(/* ... */)
```

## API

### new Pkg(cwd, [options])

Return a new Pkg instance and would resolve `package.json` located at `cwd` folder.
Default `cwd` is `./`.

#### options

##### create

Type: `boolean`<br>
Default: `false`

Create `package.json` when it does not exist.

### .data

Type: `object`<br>
Default: `{}`

The parsed content of `package.json`.

### .set(keyPath, value)

Set value by the given `keyPath` like `author.name` and `value` like `EGOIST`.

### .get(keyPath)

Get value by the given keyPath.

### .version()

Type: `function`<br>
Return: `Version`

Manage version field in a `semver`-compatible way

##### .get()

Return formatted version (`0.0.3`)

##### .newMajor()

Increment `major` version and reset all others fields

```js
pkg.version.get() // => '0.0.3'

// New major version
pkg.version().newMajor() // => '1.0.0'
```

##### .newMinor()

Increment `minor` version and reset patch field

```js
pkg.version.get() // => '0.0.3'

// New minor version
pkg.version().newMinor() // => '0.1.0'
```

##### .major([major])

Increment or set `major`

```js
pkg.version.get() // => '0.0.3'

// Increment major version
pkg.version().major() // => '1.0.3'

// Set major version to specified value
pkg.version().major(3) // => '3.0.3'
```

##### .minor([minor])

Increment or set `minor` version

```js
pkg.version.get() // => '0.0.3'

// Increment minor version
pkg.version().minor() // => '0.1.3'

// Set minor version to specified value
pkg.version().minor(3) // => '0.3.3'
```

##### .patch([patch])

Increment or set `patch` version

```js
pkg.version.get() // => '0.0.3'

// Increment minor version
pkg.version().patch() // => '0.0.4'

// Set minor version to specified value
pkg.version().patch(9) // => '0.0.9'
```


### .save([indent])

Type: `function`<br>
Return: `Promise`

Save data to `package.json`.
Default `indent` is `4`

### .saveSync([indent])

Type: `function`<br>
Return: `this`

Save data to `package.json` but synchronously.
Default `indent` is `4`

## License

MIT © [panz3r](https://github.com/panz3r)
