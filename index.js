'use strict';

var chars = require('regexp-special-chars');

module.exports = function delimiters(open, close, options) {
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
    var syntax = open.slice();
    open = syntax[0];
    close = syntax[1];
  }

  options = options || {};
  var body = '\\s*([\\s\\S]*?)\\s*';

  open = esc(open ? open : '${');
  close = esc(close ? close : '}');

  return new RegExp(open + body + close, options.flags || '');
};


function esc(str) {
  return str.replace(chars, '\\$&');
}