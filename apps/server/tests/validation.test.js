import { test } from 'node:test'
import assert from 'node:assert/strict'
import { RULES, validate } from '../rules.js'
test('입력 검증: 문자열·공백·경계·trim', () => {
  for (const x of [null,42,{},[], '   ']) assert.ok(validate(x).error)
  assert.equal(validate(' 가나 ').text,'가나')
  assert.ok(validate('a'.repeat(RULES.maxLength+1)).error)
  assert.equal(validate('a'.repeat(RULES.maxLength)).text.length,RULES.maxLength)
  assert.ok(validate('a'.repeat(RULES.minLength-1)).error)
})
test('002 최대 길이 20자: 20·21자 경계 (한글·영문)', () => {
  assert.equal(RULES.maxLength, 20)
  assert.equal(validate('가'.repeat(20)).text.length, 20)
  assert.equal(validate(`  ${'a'.repeat(20)}  `).text.length, 20)
  assert.ok(validate('가'.repeat(21)).error)
  assert.ok(validate('a'.repeat(21)).error)
})
test('003 최소 길이 2자: 0·1·2자 경계 (한글·영문, trim 포함)', () => {
  assert.equal(RULES.minLength, 2)
  assert.ok(validate('').error)
  assert.ok(validate('가').error)
  assert.ok(validate('a').error)
  assert.ok(validate('  가  ').error)
  assert.ok(validate(' a ').error)
  assert.equal(validate('가나').text, '가나')
  assert.equal(validate('ab').text, 'ab')
  assert.equal(validate('  ab  ').text, 'ab')
})
