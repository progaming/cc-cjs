'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
require('./base.js');
require('./index-04f3192a.js');
require('./view-c0f88f03.js');
require('./texture-buffer-pool-e09c9995.js');
require('./deprecated-024a684c.js');
require('./camera-component-c6f89e45.js');
require('./renderable-component-f3f3ccc0.js');
require('./transform-utils-3cfb96de.js');
require('./_commonjsHelpers-14b89ad2.js');
var instantiated = require('./instantiated-d036c6ce.js');

function atob(input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var output = '';
  var chr1 = 0;
  var chr2 = 0;
  var chr3 = 0;
  var enc1 = 0;
  var enc2 = 0;
  var enc3 = 0;
  var enc4 = 0;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    output += String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }

    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  } while (i < input.length);

  return output;
}

jsonAsset.legacyCC._global.atob = atob;

module.exports = instantiated.waitForAmmoInstantiation;
