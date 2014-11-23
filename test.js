/*!
 * delimiter-regex <https://github.com/jonschlinkert/delimiter-regex>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var delims = require('./');

describe('delims', function () {
  it('should return default es6 regex:', function () {
    delims().should.eql(/\$\{([^}]*)\}/);
  });

  it('should support regexp flags:', function () {
    delims({flags: 'gm'}).should.eql(/\$\{([^}]*)\}/gm);
  });

  it('should support list format:', function () {
    delims('{{', '}}').should.eql(/\{\{([^}}]*)\}\}/);
  });

  it('should support array format:', function () {
    delims(['{{', '}}']).should.eql(/\{\{([^}}]*)\}\}/);
  });
});
