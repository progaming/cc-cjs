'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec2, _class4, _temp2, _dec3, _class6, _class7, _descriptor7, _temp3;
var TERRAIN_MAX_LEVELS = 4;
var TERRAIN_MAX_BLEND_LAYERS = 4;
var TERRAIN_MAX_LAYER_COUNT = 256;
var TERRAIN_BLOCK_TILE_COMPLEXITY = 32;
var TERRAIN_BLOCK_VERTEX_COMPLEXITY = 33;
var TERRAIN_BLOCK_VERTEX_SIZE = 8;
var TERRAIN_HEIGHT_BASE = 32768;
var TERRAIN_HEIGHT_FACTORY = 1.0 / 512.0;
var TERRAIN_HEIGHT_FMIN = -TERRAIN_HEIGHT_BASE * TERRAIN_HEIGHT_FACTORY;
var TERRAIN_HEIGHT_FMAX = (65535 - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY;
var TERRAIN_NORTH_INDEX = 0;
var TERRAIN_SOUTH_INDEX = 1;
var TERRAIN_WEST_INDEX = 2;
var TERRAIN_EAST_INDEX = 3;
var TERRAIN_DATA_VERSION = 0x01010001;
var TERRAIN_DATA_VERSION2 = 0x01010002;
var TERRAIN_DATA_VERSION3 = 0x01010003;
var TERRAIN_DATA_VERSION4 = 0x01010004;
var TERRAIN_DATA_VERSION5 = 0x01010005;
var TERRAIN_DATA_VERSION_DEFAULT = 0x01010111;

var TerrainBuffer = function () {
  function TerrainBuffer() {
    this.length = 0;
    this.buffer = new Uint8Array(2048);
    this._buffView = new DataView(this.buffer.buffer);
    this._seekPos = 0;
  }

  var _proto = TerrainBuffer.prototype;

  _proto.reserve = function reserve(size) {
    if (this.buffer.byteLength > size) {
      return;
    }

    var capacity = this.buffer.byteLength;

    while (capacity < size) {
      capacity += capacity;
    }

    var temp = new Uint8Array(capacity);

    for (var i = 0; i < this.length; ++i) {
      temp[i] = this.buffer[i];
    }

    this.buffer = temp;
    this._buffView = new DataView(this.buffer.buffer);
  };

  _proto.assign = function assign(buff) {
    this.buffer = buff;
    this.length = buff.length;
    this._seekPos = buff.byteOffset;
    this._buffView = new DataView(buff.buffer);
  };

  _proto.writeInt8 = function writeInt8(value) {
    this.reserve(this.length + 1);

    this._buffView.setInt8(this.length, value);

    this.length += 1;
  };

  _proto.writeInt16 = function writeInt16(value) {
    this.reserve(this.length + 2);

    this._buffView.setInt16(this.length, value, true);

    this.length += 2;
  };

  _proto.writeInt32 = function writeInt32(value) {
    this.reserve(this.length + 4);

    this._buffView.setInt32(this.length, value, true);

    this.length += 4;
  };

  _proto.writeIntArray = function writeIntArray(value) {
    this.reserve(this.length + 4 * value.length);

    for (var i = 0; i < value.length; ++i) {
      this._buffView.setInt32(this.length + i * 4, value[i], true);
    }

    this.length += 4 * value.length;
  };

  _proto.writeFloat = function writeFloat(value) {
    this.reserve(this.length + 4);

    this._buffView.setFloat32(this.length, value, true);

    this.length += 4;
  };

  _proto.writeFloatArray = function writeFloatArray(value) {
    this.reserve(this.length + 4 * value.length);

    for (var i = 0; i < value.length; ++i) {
      this._buffView.setFloat32(this.length + i * 4, value[i], true);
    }

    this.length += 4 * value.length;
  };

  _proto.writeString = function writeString(value) {
    this.reserve(this.length + value.length + 4);

    this._buffView.setInt32(this.length, value.length, true);

    for (var i = 0; i < value.length; ++i) {
      this._buffView.setInt8(this.length + 4 + i, value.charCodeAt(i));
    }

    this.length += value.length + 4;
  };

  _proto.readInt8 = function readInt8() {
    var value = this._buffView.getInt8(this._seekPos);

    this._seekPos += 1;
    return value;
  };

  _proto.readInt16 = function readInt16() {
    var value = this._buffView.getInt16(this._seekPos, true);

    this._seekPos += 2;
    return value;
  };

  _proto.readInt = function readInt() {
    var value = this._buffView.getInt32(this._seekPos, true);

    this._seekPos += 4;
    return value;
  };

  _proto.readIntArray = function readIntArray(value) {
    for (var i = 0; i < value.length; ++i) {
      value[i] = this._buffView.getInt32(this._seekPos + i * 4, true);
    }

    this._seekPos += 4 * value.length;
    return value;
  };

  _proto.readFloat = function readFloat() {
    var value = this._buffView.getFloat32(this._seekPos, true);

    this._seekPos += 4;
    return value;
  };

  _proto.readFloatArray = function readFloatArray(value) {
    for (var i = 0; i < value.length; ++i) {
      value[i] = this._buffView.getFloat32(this._seekPos + i * 4, true);
    }

    this._seekPos += 4 * value.length;
    return value;
  };

  _proto.readString = function readString() {
    var length = this.readInt();
    var value = '';

    for (var i = 0; i < length; ++i) {
      value += String.fromCharCode(this.readInt8());
    }

    return value;
  };

  return TerrainBuffer;
}();

var TerrainLayerInfo = (_dec = jsonAsset.ccclass('cc.TerrainLayerInfo'), _dec(_class = (_class2 = (_temp = function TerrainLayerInfo() {
  jsonAsset._initializerDefineProperty(this, "slot", _descriptor, this);

  jsonAsset._initializerDefineProperty(this, "tileSize", _descriptor2, this);

  jsonAsset._initializerDefineProperty(this, "detailMap", _descriptor3, this);

  jsonAsset._initializerDefineProperty(this, "normalMap", _descriptor4, this);

  jsonAsset._initializerDefineProperty(this, "roughness", _descriptor5, this);

  jsonAsset._initializerDefineProperty(this, "metallic", _descriptor6, this);
}, _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "slot", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "tileSize", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "detailMap", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "normalMap", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "roughness", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "metallic", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
var TerrainLayerBinaryInfo = (_dec2 = jsonAsset.ccclass('cc.TerrainLayerBinaryInfo'), _dec2(_class4 = (_temp2 = function TerrainLayerBinaryInfo() {
  this.slot = 0;
  this.tileSize = 1;
  this.roughness = 1;
  this.metallic = 0;
  this.detailMapId = '';
  this.normalMapId = '';
}, _temp2)) || _class4);
var TerrainAsset = (_dec3 = jsonAsset.ccclass('cc.TerrainAsset'), _dec3(_class6 = (_class7 = (_temp3 = function (_Asset) {
  jsonAsset._inheritsLoose(TerrainAsset, _Asset);

  function TerrainAsset() {
    var _this;

    _this = _Asset.call(this) || this;
    _this._version = 0;
    _this._data = null;
    _this._tileSize = 1;
    _this._blockCount = [1, 1];
    _this._weightMapSize = 128;
    _this._lightMapSize = 128;
    _this._heights = new Uint16Array();
    _this._weights = new Uint8Array();
    _this._layerBuffer = [-1, -1, -1, -1];
    _this._layerBinaryInfos = [];

    jsonAsset._initializerDefineProperty(_this, "_layerInfos", _descriptor7, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto2 = TerrainAsset.prototype;

  _proto2.getLayer = function getLayer(xBlock, yBlock, layerId) {
    var blockId = yBlock * this.blockCount[0] + xBlock;
    var index = blockId * 4 + layerId;

    if (xBlock < this.blockCount[0] && yBlock < this.blockCount[1] && index < this._layerBuffer.length) {
      return this._layerBuffer[index];
    }

    return -1;
  };

  _proto2.getHeight = function getHeight(i, j) {
    var vertexCountX = this._blockCount[0] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
    return (this._heights[j * vertexCountX + i] - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY;
  };

  _proto2.getVertexCountI = function getVertexCountI() {
    if (this._blockCount.length < 1) return 0;
    return this._blockCount[0] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
  };

  _proto2.getVertexCountJ = function getVertexCountJ() {
    if (this._blockCount.length < 2) return 0;
    return this._blockCount[1] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
  };

  _proto2._setNativeData = function _setNativeData(_nativeData) {
    this._data = _nativeData;
  };

  _proto2._loadNativeData = function _loadNativeData(_nativeData) {
    if (!_nativeData || _nativeData.length === 0) {
      return false;
    }

    var stream = new TerrainBuffer();
    stream.assign(_nativeData);
    this._version = stream.readInt();

    if (this._version === TERRAIN_DATA_VERSION_DEFAULT) {
      return true;
    }

    if (this._version !== TERRAIN_DATA_VERSION && this._version !== TERRAIN_DATA_VERSION2 && this._version !== TERRAIN_DATA_VERSION3 && this._version !== TERRAIN_DATA_VERSION4 && this._version !== TERRAIN_DATA_VERSION5) {
      return false;
    }

    this.tileSize = stream.readFloat();
    stream.readIntArray(this._blockCount);
    this.weightMapSize = stream.readInt16();
    this.lightMapSize = stream.readInt16();
    var heightBufferSize = stream.readInt();
    this.heights = new Uint16Array(heightBufferSize);

    for (var i = 0; i < this.heights.length; ++i) {
      this.heights[i] = stream.readInt16();
    }

    var WeightBufferSize = stream.readInt();
    this.weights = new Uint8Array(WeightBufferSize);

    for (var _i = 0; _i < this.weights.length; ++_i) {
      this.weights[_i] = stream.readInt8();
    }

    if (this._version >= TERRAIN_DATA_VERSION2) {
      var layerBufferSize = stream.readInt();
      this.layerBuffer = new Array(layerBufferSize);

      for (var _i2 = 0; _i2 < this.layerBuffer.length; ++_i2) {
        this.layerBuffer[_i2] = stream.readInt16();
      }
    }

    if (this._version >= TERRAIN_DATA_VERSION3) {
      var layerInfoSize = stream.readInt();
      this._layerBinaryInfos = new Array(layerInfoSize);

      for (var _i3 = 0; _i3 < this._layerBinaryInfos.length; ++_i3) {
        this._layerBinaryInfos[_i3] = new TerrainLayerBinaryInfo();
        this._layerBinaryInfos[_i3].slot = stream.readInt();
        this._layerBinaryInfos[_i3].tileSize = stream.readFloat();
        this._layerBinaryInfos[_i3].detailMapId = stream.readString();

        if (this._version >= TERRAIN_DATA_VERSION4) {
          this._layerBinaryInfos[_i3].normalMapId = stream.readString();
          this._layerBinaryInfos[_i3].roughness = stream.readFloat();
          this._layerBinaryInfos[_i3].metallic = stream.readFloat();
        }
      }
    }

    return true;
  };

  _proto2._exportNativeData = function _exportNativeData() {
    var stream = new TerrainBuffer();
    stream.writeInt32(TERRAIN_DATA_VERSION5);
    stream.writeFloat(this.tileSize);
    stream.writeIntArray(this._blockCount);
    stream.writeInt16(this.weightMapSize);
    stream.writeInt16(this.lightMapSize);
    stream.writeInt32(this.heights.length);

    for (var i = 0; i < this.heights.length; ++i) {
      stream.writeInt16(this.heights[i]);
    }

    stream.writeInt32(this.weights.length);

    for (var _i4 = 0; _i4 < this.weights.length; ++_i4) {
      stream.writeInt8(this.weights[_i4]);
    }

    stream.writeInt32(this.layerBuffer.length);

    for (var _i5 = 0; _i5 < this.layerBuffer.length; ++_i5) {
      stream.writeInt16(this.layerBuffer[_i5]);
    }

    var layerBinaryInfos = [];
    layerBinaryInfos.length = this.layerInfos.length;

    for (var _i6 = 0; _i6 < layerBinaryInfos.length; ++_i6) {
      var layer = this.layerInfos[_i6];
      var binaryLayer = new TerrainLayerBinaryInfo();
      binaryLayer.slot = _i6;
      binaryLayer.tileSize = layer.tileSize;
      binaryLayer.detailMapId = layer.detailMap ? layer.detailMap._uuid : '';
      binaryLayer.normalMapId = layer.normalMap ? layer.normalMap._uuid : '';
      binaryLayer.metallic = layer.metallic;
      binaryLayer.roughness = layer.roughness;
      layerBinaryInfos[_i6] = binaryLayer;
    }

    stream.writeInt32(layerBinaryInfos.length);

    for (var _i7 = 0; _i7 < layerBinaryInfos.length; ++_i7) {
      stream.writeInt32(layerBinaryInfos[_i7].slot);
      stream.writeFloat(layerBinaryInfos[_i7].tileSize);
      stream.writeString(layerBinaryInfos[_i7].detailMapId);
      stream.writeString(layerBinaryInfos[_i7].normalMapId);
      stream.writeFloat(layerBinaryInfos[_i7].roughness);
      stream.writeFloat(layerBinaryInfos[_i7].metallic);
    }

    return stream.buffer;
  };

  _proto2._exportDefaultNativeData = function _exportDefaultNativeData() {
    var stream = new TerrainBuffer();
    stream.writeInt32(TERRAIN_DATA_VERSION_DEFAULT);
    return stream.buffer;
  };

  jsonAsset._createClass(TerrainAsset, [{
    key: "_nativeAsset",
    get: function get() {
      return this._data.buffer;
    },
    set: function set(value) {
      if (this._data && this._data.byteLength === value.byteLength) {
        this._data.set(new Uint8Array(value));
      } else {
        this._data = new Uint8Array(value);
      }

      this._loadNativeData(this._data);
    }
  }, {
    key: "version",
    get: function get() {
      return this._version;
    }
  }, {
    key: "tileSize",
    set: function set(value) {
      this._tileSize = value;
    },
    get: function get() {
      return this._tileSize;
    }
  }, {
    key: "blockCount",
    set: function set(value) {
      this._blockCount = value;
    },
    get: function get() {
      return this._blockCount;
    }
  }, {
    key: "lightMapSize",
    set: function set(value) {
      this._lightMapSize = value;
    },
    get: function get() {
      return this._lightMapSize;
    }
  }, {
    key: "weightMapSize",
    set: function set(value) {
      this._weightMapSize = value;
    },
    get: function get() {
      return this._weightMapSize;
    }
  }, {
    key: "heights",
    set: function set(value) {
      this._heights = value;
    },
    get: function get() {
      return this._heights;
    }
  }, {
    key: "weights",
    set: function set(value) {
      this._weights = value;
    },
    get: function get() {
      return this._weights;
    }
  }, {
    key: "layerBuffer",
    set: function set(value) {
      this._layerBuffer = value;
    },
    get: function get() {
      return this._layerBuffer;
    }
  }, {
    key: "layerInfos",
    set: function set(value) {
      this._layerInfos = value;
    },
    get: function get() {
      return this._layerInfos;
    }
  }, {
    key: "layerBinaryInfos",
    get: function get() {
      return this._layerBinaryInfos;
    }
  }]);

  return TerrainAsset;
}(jsonAsset.Asset), _temp3), (_descriptor7 = jsonAsset._applyDecoratedDescriptor(_class7.prototype, "_layerInfos", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class7)) || _class6);

exports.TERRAIN_BLOCK_TILE_COMPLEXITY = TERRAIN_BLOCK_TILE_COMPLEXITY;
exports.TERRAIN_BLOCK_VERTEX_COMPLEXITY = TERRAIN_BLOCK_VERTEX_COMPLEXITY;
exports.TERRAIN_BLOCK_VERTEX_SIZE = TERRAIN_BLOCK_VERTEX_SIZE;
exports.TERRAIN_DATA_VERSION = TERRAIN_DATA_VERSION;
exports.TERRAIN_DATA_VERSION2 = TERRAIN_DATA_VERSION2;
exports.TERRAIN_DATA_VERSION3 = TERRAIN_DATA_VERSION3;
exports.TERRAIN_DATA_VERSION4 = TERRAIN_DATA_VERSION4;
exports.TERRAIN_DATA_VERSION5 = TERRAIN_DATA_VERSION5;
exports.TERRAIN_DATA_VERSION_DEFAULT = TERRAIN_DATA_VERSION_DEFAULT;
exports.TERRAIN_EAST_INDEX = TERRAIN_EAST_INDEX;
exports.TERRAIN_HEIGHT_BASE = TERRAIN_HEIGHT_BASE;
exports.TERRAIN_HEIGHT_FACTORY = TERRAIN_HEIGHT_FACTORY;
exports.TERRAIN_HEIGHT_FMAX = TERRAIN_HEIGHT_FMAX;
exports.TERRAIN_HEIGHT_FMIN = TERRAIN_HEIGHT_FMIN;
exports.TERRAIN_MAX_BLEND_LAYERS = TERRAIN_MAX_BLEND_LAYERS;
exports.TERRAIN_MAX_LAYER_COUNT = TERRAIN_MAX_LAYER_COUNT;
exports.TERRAIN_MAX_LEVELS = TERRAIN_MAX_LEVELS;
exports.TERRAIN_NORTH_INDEX = TERRAIN_NORTH_INDEX;
exports.TERRAIN_SOUTH_INDEX = TERRAIN_SOUTH_INDEX;
exports.TERRAIN_WEST_INDEX = TERRAIN_WEST_INDEX;
exports.TerrainAsset = TerrainAsset;
exports.TerrainLayerBinaryInfo = TerrainLayerBinaryInfo;
exports.TerrainLayerInfo = TerrainLayerInfo;
