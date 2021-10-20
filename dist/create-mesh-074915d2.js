'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var mesh = require('./mesh-1b66157b.js');

var _keyMap;

(function (_keyMap) {
  _keyMap[_keyMap["positions"] = jsonAsset.AttributeName.ATTR_POSITION] = "positions";
  _keyMap[_keyMap["normals"] = jsonAsset.AttributeName.ATTR_NORMAL] = "normals";
  _keyMap[_keyMap["uvs"] = jsonAsset.AttributeName.ATTR_TEX_COORD] = "uvs";
  _keyMap[_keyMap["colors"] = jsonAsset.AttributeName.ATTR_COLOR] = "colors";
})(_keyMap || (_keyMap = {}));

function readMesh(mesh, iPrimitive) {
  if (iPrimitive === void 0) {
    iPrimitive = 0;
  }

  var out = {
    positions: []
  };
  var dataView = new DataView(mesh.data.buffer, mesh.data.byteOffset, mesh.data.byteLength);
  var struct = mesh.struct;
  var primitive = struct.primitives[iPrimitive];

  for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(primitive.vertexBundelIndices), _step; !(_step = _iterator()).done;) {
    var idx = _step.value;
    var bundle = struct.vertexBundles[idx];
    var offset = bundle.view.offset;
    var _bundle$view = bundle.view,
        length = _bundle$view.length,
        stride = _bundle$view.stride;

    for (var _iterator2 = jsonAsset._createForOfIteratorHelperLoose(bundle.attributes), _step2; !(_step2 = _iterator2()).done;) {
      var attr = _step2.value;
      var name = _keyMap[attr.name];

      if (name) {
        out[name] = (out[name] || []).concat(jsonAsset.readBuffer(dataView, attr.format, offset, length, stride));
      }

      offset += jsonAsset.FormatInfos[attr.format].size;
    }
  }

  var view = primitive.indexView;
  out.indices = jsonAsset.readBuffer(dataView, jsonAsset.Format["R" + view.stride * 8 + "UI"], view.offset, view.length);
  return out;
}

var _defAttrs = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_NORMAL, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RG32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TANGENT, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA32F)];
var v3_1 = new jsonAsset.Vec3();
function createMesh(geometry, out, options) {
  options = options || {};
  var attributes = [];
  var stride = 0;
  var channels = [];
  var vertCount = 0;
  var attr;
  var positions = geometry.positions.slice();

  if (positions.length > 0) {
    attr = null;

    if (geometry.attributes) {
      for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(geometry.attributes), _step; !(_step = _iterator()).done;) {
        var att = _step.value;

        if (att.name === jsonAsset.AttributeName.ATTR_POSITION) {
          attr = att;
          break;
        }
      }
    }

    if (!attr) {
      attr = _defAttrs[0];
    }

    attributes.push(attr);
    var info = jsonAsset.FormatInfos[attr.format];
    vertCount = Math.max(vertCount, Math.floor(positions.length / info.count));
    channels.push({
      offset: stride,
      data: positions,
      attribute: attr
    });
    stride += info.size;
  }

  if (geometry.normals && geometry.normals.length > 0) {
    attr = null;

    if (geometry.attributes) {
      for (var _iterator2 = jsonAsset._createForOfIteratorHelperLoose(geometry.attributes), _step2; !(_step2 = _iterator2()).done;) {
        var _att = _step2.value;

        if (_att.name === jsonAsset.AttributeName.ATTR_NORMAL) {
          attr = _att;
          break;
        }
      }
    }

    if (!attr) {
      attr = _defAttrs[1];
    }

    var _info = jsonAsset.FormatInfos[attr.format];
    attributes.push(attr);
    vertCount = Math.max(vertCount, Math.floor(geometry.normals.length / _info.count));
    channels.push({
      offset: stride,
      data: geometry.normals,
      attribute: attr
    });
    stride += _info.size;
  }

  if (geometry.uvs && geometry.uvs.length > 0) {
    attr = null;

    if (geometry.attributes) {
      for (var _iterator3 = jsonAsset._createForOfIteratorHelperLoose(geometry.attributes), _step3; !(_step3 = _iterator3()).done;) {
        var _att2 = _step3.value;

        if (_att2.name === jsonAsset.AttributeName.ATTR_TEX_COORD) {
          attr = _att2;
          break;
        }
      }
    }

    if (!attr) {
      attr = _defAttrs[2];
    }

    var _info2 = jsonAsset.FormatInfos[attr.format];
    attributes.push(attr);
    vertCount = Math.max(vertCount, Math.floor(geometry.uvs.length / _info2.count));
    channels.push({
      offset: stride,
      data: geometry.uvs,
      attribute: attr
    });
    stride += _info2.size;
  }

  if (geometry.tangents && geometry.tangents.length > 0) {
    attr = null;

    if (geometry.attributes) {
      for (var _iterator4 = jsonAsset._createForOfIteratorHelperLoose(geometry.attributes), _step4; !(_step4 = _iterator4()).done;) {
        var _att3 = _step4.value;

        if (_att3.name === jsonAsset.AttributeName.ATTR_TANGENT) {
          attr = _att3;
          break;
        }
      }
    }

    if (!attr) {
      attr = _defAttrs[3];
    }

    var _info3 = jsonAsset.FormatInfos[attr.format];
    attributes.push(attr);
    vertCount = Math.max(vertCount, Math.floor(geometry.tangents.length / _info3.count));
    channels.push({
      offset: stride,
      data: geometry.tangents,
      attribute: attr
    });
    stride += _info3.size;
  }

  if (geometry.colors && geometry.colors.length > 0) {
    attr = null;

    if (geometry.attributes) {
      for (var _iterator5 = jsonAsset._createForOfIteratorHelperLoose(geometry.attributes), _step5; !(_step5 = _iterator5()).done;) {
        var _att4 = _step5.value;

        if (_att4.name === jsonAsset.AttributeName.ATTR_COLOR) {
          attr = _att4;
          break;
        }
      }
    }

    if (!attr) {
      attr = _defAttrs[4];
    }

    var _info4 = jsonAsset.FormatInfos[attr.format];
    attributes.push(attr);
    vertCount = Math.max(vertCount, Math.floor(geometry.colors.length / _info4.count));
    channels.push({
      offset: stride,
      data: geometry.colors,
      attribute: attr
    });
    stride += _info4.size;
  }

  if (geometry.customAttributes) {
    for (var _iterator6 = jsonAsset._createForOfIteratorHelperLoose(geometry.customAttributes), _step6; !(_step6 = _iterator6()).done;) {
      var ca = _step6.value;
      var _info5 = jsonAsset.FormatInfos[ca.attr.format];
      attributes.push(ca.attr);
      vertCount = Math.max(vertCount, Math.floor(ca.values.length / _info5.count));
      channels.push({
        offset: stride,
        data: ca.values,
        attribute: ca.attr
      });
      stride += _info5.size;
    }
  }

  var bufferBlob = new mesh.BufferBlob();
  var vertexBuffer = new ArrayBuffer(vertCount * stride);
  var vertexBufferView = new DataView(vertexBuffer);

  for (var _i = 0, _channels = channels; _i < _channels.length; _i++) {
    var channel = _channels[_i];
    jsonAsset.writeBuffer(vertexBufferView, channel.data, channel.attribute.format, channel.offset, stride);
  }

  bufferBlob.setNextAlignment(0);
  var vertexBundle = {
    attributes: attributes,
    view: {
      offset: bufferBlob.getLength(),
      length: vertexBuffer.byteLength,
      count: vertCount,
      stride: stride
    }
  };
  bufferBlob.addBuffer(vertexBuffer);
  var indexBuffer = null;
  var idxCount = 0;
  var idxStride = 2;

  if (geometry.indices) {
    var indices = geometry.indices;
    idxCount = indices.length;
    indexBuffer = new ArrayBuffer(idxStride * idxCount);
    var indexBufferView = new DataView(indexBuffer);
    jsonAsset.writeBuffer(indexBufferView, indices, jsonAsset.Format.R16UI);
  }

  var primitive = {
    primitiveMode: geometry.primitiveMode || jsonAsset.PrimitiveMode.TRIANGLE_LIST,
    vertexBundelIndices: [0]
  };

  if (indexBuffer) {
    bufferBlob.setNextAlignment(idxStride);
    primitive.indexView = {
      offset: bufferBlob.getLength(),
      length: indexBuffer.byteLength,
      count: idxCount,
      stride: idxStride
    };
    bufferBlob.addBuffer(indexBuffer);
  }

  var minPosition = geometry.minPos;

  if (!minPosition && options.calculateBounds) {
    minPosition = jsonAsset.Vec3.set(new jsonAsset.Vec3(), Infinity, Infinity, Infinity);

    for (var iVertex = 0; iVertex < vertCount; ++iVertex) {
      jsonAsset.Vec3.set(v3_1, positions[iVertex * 3 + 0], positions[iVertex * 3 + 1], positions[iVertex * 3 + 2]);
      jsonAsset.Vec3.min(minPosition, minPosition, v3_1);
    }
  }

  var maxPosition = geometry.maxPos;

  if (!maxPosition && options.calculateBounds) {
    maxPosition = jsonAsset.Vec3.set(new jsonAsset.Vec3(), -Infinity, -Infinity, -Infinity);

    for (var _iVertex = 0; _iVertex < vertCount; ++_iVertex) {
      jsonAsset.Vec3.set(v3_1, positions[_iVertex * 3 + 0], positions[_iVertex * 3 + 1], positions[_iVertex * 3 + 2]);
      jsonAsset.Vec3.max(maxPosition, maxPosition, v3_1);
    }
  }

  var meshStruct = {
    vertexBundles: [vertexBundle],
    primitives: [primitive]
  };

  if (minPosition) {
    meshStruct.minPosition = new jsonAsset.Vec3(minPosition.x, minPosition.y, minPosition.z);
  }

  if (maxPosition) {
    meshStruct.maxPosition = new jsonAsset.Vec3(maxPosition.x, maxPosition.y, maxPosition.z);
  }

  if (!out) {
    out = new mesh.Mesh();
  }

  out.reset({
    struct: meshStruct,
    data: new Uint8Array(bufferBlob.getCombined())
  });
  return out;
}

exports.createMesh = createMesh;
exports.readMesh = readMesh;
