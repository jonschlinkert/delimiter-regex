/*!
 * delimiter-regex <https://github.com/jonschlinkert/delimiter-regex>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var delims = require('./');

function match(str, re) {
  return re.exec(str);
}

describe('delims', function () {
  it('should return default es6 regex:', function () {
    assert.deepEqual(/\$\{\s*([\s\S]*?)\s*\}/, delims());
  });

  it('should match correctly:', function () {
    assert.equal(match('abc/${foo}/xyz', delims())[0], '${foo}');
    assert.equal(match('abc/${foo}/xyz', delims())[1], 'foo');
    assert.equal(match('abc/${foo}/${bar}/xyz', delims())[0], '${foo}');
    assert.equal(match('abc/${foo}/${bar}/xyz', delims())[1], 'foo');
    assert.equal(match('---\na: b\nc: d\n---\ncontent', delims('---', '---'))[0], '---\na: b\nc: d\n---');
    assert.equal(match('---\na: b\nc: d\n---\ncontent', delims('---', '---'))[1], 'a: b\nc: d');
    assert.equal(match('abc/${foo}/${bar}/xyz', delims())[1], 'foo');
  });

  it('should support regexp flags:', function () {
    assert.deepEqual(/---\s*([\s\S]*?)\s*---/g, delims('---', '---', {flags: 'g'}));
    assert.deepEqual(/\$\{\s*([\s\S]*?)\s*\}/gm, delims({flags: 'gm'}));
  });

  it('should support list format:', function () {
    assert.deepEqual(/---\s*([\s\S]*?)\s*---/, delims('---', '---'));
    assert.deepEqual(/\{\{\s*([\s\S]*?)\s*\}\}/, delims('{{', '}}'));
  });

  it('should support array format:', function () {
    assert.deepEqual(/---\s*([\s\S]*?)\s*---/, delims(['---', '---']));
    assert.deepEqual(/\{\{\s*([\s\S]*?)\s*\}\}/, delims(['{{', '}}']));
  });
});
