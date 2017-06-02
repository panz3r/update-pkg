import test from 'ava'
import { mkdtempSync, writeFileSync, unlinkSync, rmdirSync } from 'fs'
import { join, sep } from 'path'
import Pkg from '../'

const testDir = join(__dirname, sep)
const testPackage = join(testDir, './package.json')
const fixturePath = mkdtempSync(testDir)
const fixturePackage = join(fixturePath, './package.json')

// Test 'get' function
test('get property', async t => {
  // Setup
  const pkg = new Pkg() // => Load real `package.json`
  const pkgName = pkg.get('name')

  // Expectations
  t.is(pkgName, 'update-pkg-extended')
})

// Test 'set' function
test.before('create test package.json', t => {
  writeFileSync(testPackage, JSON.stringify({ name: 'test package', version: '0.0.1' }), 'utf8')
})

test('set property', async t => {
  const pkg = new Pkg(testDir)
  pkg.set('foo', 'bar')
  await pkg.save()
  t.is(require(testPackage).foo, 'bar')
})

test('set deep property', async t => {
  const pkg = new Pkg(testDir)
  pkg.set('bar.baz', 'foo')
  await pkg.save()
  t.is(require(testPackage).bar.baz, 'foo')
})

// Test 'package.json' creation
test('create package', async t => {
  const pkg = new Pkg(fixturePath, { create: true })
  pkg.set('foo', 'bar')
  await pkg.save()
  t.is(require(fixturePackage).foo, 'bar')
})

// Cleanup
test.after.always('cleanup', t => {
  unlinkSync(testPackage)
  unlinkSync(fixturePackage)
  rmdirSync(fixturePath)
})
