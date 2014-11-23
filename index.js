'use strict';

var chars = require('regexp-special-chars');

module.exports = function(open, close, options) {
  if (typeof close !== 'string') {
    options = close;
    close = null;
  }

  if (typeof open === 'object' && !Array.isArray(open)) {
    options = open;
    open = null;
    close = null;
  }

  if (Array.isArray(open)) {
    var syntax = open;
    open = syntax[0];
    close = syntax[1];
  }

  var opts = options || {};
  close = close || '}';

  var body = '([^' + close + ']*)';
  open = open ? esc(open) : '\\$\\{';
  close = close ? esc(close) : '\\}';

  return new RegExp(open + body + close, opts.flags || '');
};

function esc(str) {
  return str.replace(chars, '\\$&');
}