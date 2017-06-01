# update-pkg-extended
[![license](https://img.shields.io/github/license/panz3r/update-pkg.svg)](LICENSE)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![NPM version](https://img.shields.io/npm/v/update-pkg-extended.svg)](https://npmjs.com/package/update-pkg-extended) [![NPM downloads](https://img.shields.io/npm/dm/update-pkg-extended.svg)](https://npmjs.com/package/update-pkg-extended)

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
