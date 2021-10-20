'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');

var vfmt = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F)];
var vfmtPosColor = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA32F)];
var vfmtPosUvColor = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RG32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA32F)];
var vfmtPosUvTwoColor = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RG32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR2, jsonAsset.Format.RGBA32F)];
function getComponentPerVertex(attrs) {
  var count = 0;

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    var info = jsonAsset.FormatInfos[attr.format];
    count += info.count;
  }

  return count;
}
function getAttributeStride(attrs) {
  var count = 0;

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    var info = jsonAsset.FormatInfos[attr.format];
    count += info.size;
  }

  return count;
}
jsonAsset.legacyCC.internal.vfmtPosUvColor = vfmtPosUvColor;
jsonAsset.legacyCC.internal.vfmtPosUvTwoColor = vfmtPosUvTwoColor;

var vertexFormat = /*#__PURE__*/Object.freeze({
    __proto__: null,
    vfmt: vfmt,
    vfmtPosColor: vfmtPosColor,
    vfmtPosUvColor: vfmtPosUvColor,
    vfmtPosUvTwoColor: vfmtPosUvTwoColor,
    getComponentPerVertex: getComponentPerVertex,
    getAttributeStride: getAttributeStride
});

exports.getAttributeStride = getAttributeStride;
exports.getComponentPerVertex = getComponentPerVertex;
exports.vertexFormat = vertexFormat;
exports.vfmt = vfmt;
exports.vfmtPosColor = vfmtPosColor;
exports.vfmtPosUvColor = vfmtPosUvColor;
exports.vfmtPosUvTwoColor = vfmtPosUvTwoColor;
