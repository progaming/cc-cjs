'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsonAsset = require('./json-asset-ae61ceca.js');
var index = require('./index-04f3192a.js');
var view = require('./view-c0f88f03.js');
require('./texture-buffer-pool-e09c9995.js');
require('./deprecated-024a684c.js');
require('./camera-component-c6f89e45.js');
var renderableComponent = require('./renderable-component-f3f3ccc0.js');
require('./transform-utils-3cfb96de.js');
require('./index-96855766.js');
var createMesh = require('./create-mesh-074915d2.js');
var mesh = require('./mesh-1b66157b.js');
require('./mesh-renderer-4bdcdd3f.js');
require('./skeleton-42e69a3d.js');

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;
var Billboard = (_dec = jsonAsset.ccclass('cc.Billboard'), _dec2 = jsonAsset.help(), _dec3 = jsonAsset.menu(), _dec4 = jsonAsset.type(jsonAsset.Texture2D), _dec5 = jsonAsset.type(jsonAsset.Texture2D), _dec6 = jsonAsset.tooltip(), _dec7 = jsonAsset.tooltip(), _dec8 = jsonAsset.tooltip(), _dec9 = jsonAsset.tooltip(), _dec(_class = _dec2(_class = _dec3(_class = jsonAsset.executeInEditMode(_class = (_class2 = (_temp = function (_Component) {
  jsonAsset._inheritsLoose(Billboard, _Component);

  jsonAsset._createClass(Billboard, [{
    key: "texture",
    get: function get() {
      return this._texture;
    },
    set: function set(val) {
      this._texture = val;

      if (this._material) {
        this._material.setProperty('mainTexture', val);
      }
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    },
    set: function set(val) {
      this._height = val;

      if (this._material) {
        this._uniform.y = val;

        this._material.setProperty('cc_size_rotation', this._uniform);
      }
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    },
    set: function set(val) {
      this._width = val;

      if (this._material) {
        this._uniform.x = val;

        this._material.setProperty('cc_size_rotation', this._uniform);
      }
    }
  }, {
    key: "rotation",
    get: function get() {
      return Math.round(jsonAsset.toDegree(this._rotation) * 100) / 100;
    },
    set: function set(val) {
      this._rotation = jsonAsset.toRadian(val);

      if (this._material) {
        this._uniform.z = this._rotation;

        this._material.setProperty('cc_size_rotation', this._uniform);
      }
    }
  }]);

  function Billboard() {
    var _this;

    _this = _Component.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_texture", _descriptor, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_height", _descriptor2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_width", _descriptor3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_rotation", _descriptor4, jsonAsset._assertThisInitialized(_this));

    _this._model = null;
    _this._mesh = null;
    _this._material = null;
    _this._uniform = new jsonAsset.Vec4(1, 1, 0, 0);
    return _this;
  }

  var _proto = Billboard.prototype;

  _proto.onLoad = function onLoad() {
    this.createModel();
  };

  _proto.onEnable = function onEnable() {
    this.attachToScene();
    this._model.enabled = true;
    this.width = this._width;
    this.height = this._height;
    this.rotation = this.rotation;
    this.texture = this.texture;
  };

  _proto.onDisable = function onDisable() {
    this.detachFromScene();
  };

  _proto.attachToScene = function attachToScene() {
    if (this._model && this.node && this.node.scene) {
      if (this._model.scene) {
        this.detachFromScene();
      }

      this._getRenderScene().addModel(this._model);
    }
  };

  _proto.detachFromScene = function detachFromScene() {
    if (this._model && this._model.scene) {
      this._model.scene.removeModel(this._model);
    }
  };

  _proto.createModel = function createModel() {
    this._mesh = createMesh.createMesh({
      primitiveMode: jsonAsset.PrimitiveMode.TRIANGLE_LIST,
      positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      uvs: [0, 0, 1, 0, 0, 1, 1, 1],
      colors: [jsonAsset.Color$1.WHITE.r, jsonAsset.Color$1.WHITE.g, jsonAsset.Color$1.WHITE.b, jsonAsset.Color$1.WHITE.a, jsonAsset.Color$1.WHITE.r, jsonAsset.Color$1.WHITE.g, jsonAsset.Color$1.WHITE.b, jsonAsset.Color$1.WHITE.a, jsonAsset.Color$1.WHITE.r, jsonAsset.Color$1.WHITE.g, jsonAsset.Color$1.WHITE.b, jsonAsset.Color$1.WHITE.a, jsonAsset.Color$1.WHITE.r, jsonAsset.Color$1.WHITE.g, jsonAsset.Color$1.WHITE.b, jsonAsset.Color$1.WHITE.a],
      attributes: [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RG32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA8UI, true)],
      indices: [0, 1, 2, 1, 2, 3]
    }, undefined, {
      calculateBounds: false
    });
    var model = this._model = jsonAsset.legacyCC.director.root.createModel(view.Model, this.node);
    model.node = model.transform = this.node;

    if (this._material == null) {
      this._material = new jsonAsset.Material();

      this._material.copy(jsonAsset.builtinResMgr.get('default-billboard-material'));
    }

    model.initSubModel(0, this._mesh.renderingSubMeshes[0], this._material);
  };

  return Billboard;
}(jsonAsset.Component), _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_texture", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "texture", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_height", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "height", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "height"), _class2.prototype), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_width", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "width", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_rotation", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "rotation", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);

var _vertex_attrs = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD1, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA8, true)];

var _temp_v1 = new jsonAsset.Vec3();

var _temp_v2 = new jsonAsset.Vec3();

var LineModel = function (_scene$Model) {
  jsonAsset._inheritsLoose(LineModel, _scene$Model);

  function LineModel() {
    var _this;

    _this = _scene$Model.call(this) || this;
    _this._capacity = void 0;
    _this._vertSize = 0;
    _this._vBuffer = null;
    _this._vertAttrsFloatCount = 0;
    _this._vdataF32 = null;
    _this._vdataUint32 = null;
    _this._iaInfo = void 0;
    _this._iaInfoBuffer = void 0;
    _this._subMeshData = null;
    _this._vertCount = 0;
    _this._indexCount = 0;
    _this._material = null;
    _this.type = view.ModelType.LINE;
    _this._capacity = 100;
    _this._iaInfo = new jsonAsset.IndirectBuffer([new jsonAsset.DrawInfo()]);
    _this._iaInfoBuffer = _this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDIRECT, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.DRAW_INFO_SIZE, jsonAsset.DRAW_INFO_SIZE));
    return _this;
  }

  var _proto = LineModel.prototype;

  _proto.setCapacity = function setCapacity(capacity) {
    this._capacity = capacity;
    this.createBuffer();
  };

  _proto.createBuffer = function createBuffer() {
    this._vertSize = 0;

    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(_vertex_attrs), _step; !(_step = _iterator()).done;) {
      var a = _step.value;
      a.offset = this._vertSize;
      this._vertSize += jsonAsset.FormatInfos[a.format].size;
    }

    this._vertAttrsFloatCount = this._vertSize / 4;
    this._vBuffer = this.createSubMeshData();
    this._vdataF32 = new Float32Array(this._vBuffer);
    this._vdataUint32 = new Uint32Array(this._vBuffer);
  };

  _proto.updateMaterial = function updateMaterial(mat) {
    this._material = mat;

    _scene$Model.prototype.setSubModelMaterial.call(this, 0, mat);
  };

  _proto.createSubMeshData = function createSubMeshData() {
    if (this._subMeshData) {
      this.destroySubMeshData();
    }

    this._vertCount = 2;
    this._indexCount = 6;

    var vertexBuffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, this._vertSize * this._capacity * this._vertCount, this._vertSize));

    var vBuffer = new ArrayBuffer(this._vertSize * this._capacity * this._vertCount);
    vertexBuffer.update(vBuffer);
    var indices = new Uint16Array((this._capacity - 1) * this._indexCount);
    var dst = 0;

    for (var i = 0; i < this._capacity - 1; ++i) {
      var baseIdx = 2 * i;
      indices[dst++] = baseIdx;
      indices[dst++] = baseIdx + 1;
      indices[dst++] = baseIdx + 2;
      indices[dst++] = baseIdx + 3;
      indices[dst++] = baseIdx + 2;
      indices[dst++] = baseIdx + 1;
    }

    var indexBuffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, (this._capacity - 1) * this._indexCount * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));

    indexBuffer.update(indices);
    this._iaInfo.drawInfos[0].vertexCount = this._capacity * this._vertCount;
    this._iaInfo.drawInfos[0].indexCount = (this._capacity - 1) * this._indexCount;

    this._iaInfoBuffer.update(this._iaInfo);

    this._subMeshData = new jsonAsset.RenderingSubMesh([vertexBuffer], _vertex_attrs, jsonAsset.PrimitiveMode.TRIANGLE_LIST, indexBuffer, this._iaInfoBuffer);
    this.initSubModel(0, this._subMeshData, this._material);
    return vBuffer;
  };

  _proto.addLineVertexData = function addLineVertexData(positions, width, color) {
    if (positions.length > 1) {
      var offset = 0;
      jsonAsset.Vec3.subtract(_temp_v1, positions[1], positions[0]);
      this._vdataF32[offset++] = positions[0].x;
      this._vdataF32[offset++] = positions[0].y;
      this._vdataF32[offset++] = positions[0].z;
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = width.evaluate(0, 1);
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = _temp_v1.x;
      this._vdataF32[offset++] = _temp_v1.y;
      this._vdataF32[offset++] = _temp_v1.z;
      this._vdataUint32[offset++] = color.evaluate(0, 1)._val;
      this._vdataF32[offset++] = positions[0].x;
      this._vdataF32[offset++] = positions[0].y;
      this._vdataF32[offset++] = positions[0].z;
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = width.evaluate(0, 1);
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = _temp_v1.x;
      this._vdataF32[offset++] = _temp_v1.y;
      this._vdataF32[offset++] = _temp_v1.z;
      this._vdataUint32[offset++] = color.evaluate(0, 1)._val;

      for (var i = 1; i < positions.length - 1; i++) {
        jsonAsset.Vec3.subtract(_temp_v1, positions[i - 1], positions[i]);
        jsonAsset.Vec3.subtract(_temp_v2, positions[i + 1], positions[i]);
        jsonAsset.Vec3.subtract(_temp_v2, _temp_v2, _temp_v1);
        var seg = i / positions.length;
        this._vdataF32[offset++] = positions[i].x;
        this._vdataF32[offset++] = positions[i].y;
        this._vdataF32[offset++] = positions[i].z;
        this._vdataF32[offset++] = 0;
        this._vdataF32[offset++] = width.evaluate(seg, 1);
        this._vdataF32[offset++] = seg;
        this._vdataF32[offset++] = 0;
        this._vdataF32[offset++] = _temp_v2.x;
        this._vdataF32[offset++] = _temp_v2.y;
        this._vdataF32[offset++] = _temp_v2.z;
        this._vdataUint32[offset++] = color.evaluate(seg, 1)._val;
        this._vdataF32[offset++] = positions[i].x;
        this._vdataF32[offset++] = positions[i].y;
        this._vdataF32[offset++] = positions[i].z;
        this._vdataF32[offset++] = 1;
        this._vdataF32[offset++] = width.evaluate(seg, 1);
        this._vdataF32[offset++] = seg;
        this._vdataF32[offset++] = 1;
        this._vdataF32[offset++] = _temp_v2.x;
        this._vdataF32[offset++] = _temp_v2.y;
        this._vdataF32[offset++] = _temp_v2.z;
        this._vdataUint32[offset++] = color.evaluate(seg, 1)._val;
      }

      jsonAsset.Vec3.subtract(_temp_v1, positions[positions.length - 1], positions[positions.length - 2]);
      this._vdataF32[offset++] = positions[positions.length - 1].x;
      this._vdataF32[offset++] = positions[positions.length - 1].y;
      this._vdataF32[offset++] = positions[positions.length - 1].z;
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = width.evaluate(1, 1);
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = _temp_v1.x;
      this._vdataF32[offset++] = _temp_v1.y;
      this._vdataF32[offset++] = _temp_v1.z;
      this._vdataUint32[offset++] = color.evaluate(1, 1)._val;
      this._vdataF32[offset++] = positions[positions.length - 1].x;
      this._vdataF32[offset++] = positions[positions.length - 1].y;
      this._vdataF32[offset++] = positions[positions.length - 1].z;
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = width.evaluate(1, 1);
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = _temp_v1.x;
      this._vdataF32[offset++] = _temp_v1.y;
      this._vdataF32[offset++] = _temp_v1.z;
      this._vdataUint32[offset++] = color.evaluate(1, 1)._val;
    }

    this.updateIA(Math.max(0, positions.length - 1));
  };

  _proto.updateIA = function updateIA(count) {
    var ia = this._subModels[0].inputAssembler;
    ia.vertexBuffers[0].update(this._vdataF32);
    this._iaInfo.drawInfos[0].firstIndex = 0;
    this._iaInfo.drawInfos[0].indexCount = this._indexCount * count;

    this._iaInfoBuffer.update(this._iaInfo);
  };

  _proto.destroySubMeshData = function destroySubMeshData() {
    if (this._subMeshData) {
      this._subMeshData.destroy();

      this._subMeshData = null;
    }
  };

  return LineModel;
}(view.Model);

var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5$1, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4$1, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp$1;
var SerializableTable = [['mode', 'constant', 'multiplier'], ['mode', 'spline', 'multiplier'], ['mode', 'splineMin', 'splineMax', 'multiplier'], ['mode', 'constantMin', 'constantMax', 'multiplier']];
var Mode = jsonAsset.Enum({
  Constant: 0,
  Curve: 1,
  TwoCurves: 2,
  TwoConstants: 3
});
var CurveRange = (_dec$1 = jsonAsset.ccclass('cc.CurveRange'), _dec2$1 = jsonAsset.type(Mode), _dec3$1 = jsonAsset.type(jsonAsset.RealCurve), _dec4$1 = jsonAsset.type(jsonAsset.RealCurve), _dec5$1 = jsonAsset.type(jsonAsset.RealCurve), _dec$1(_class$1 = (_class2$1 = (_temp$1 = _class3 = function () {
  jsonAsset._createClass(CurveRange, [{
    key: "curve",
    get: function get() {
      return this._curve;
    },
    set: function set(value) {
      this._curve = value;
      this.spline = value._internalCurve;
    }
  }, {
    key: "curveMin",
    get: function get() {
      return this._curveMin;
    },
    set: function set(value) {
      this._curveMin = value;
      this.splineMin = value._internalCurve;
    }
  }, {
    key: "curveMax",
    get: function get() {
      return this._curveMax;
    },
    set: function set(value) {
      this._curveMax = value;
      this.splineMax = value._internalCurve;
    }
  }]);

  function CurveRange() {
    jsonAsset._initializerDefineProperty(this, "mode", _descriptor$1, this);

    jsonAsset._initializerDefineProperty(this, "spline", _descriptor2$1, this);

    jsonAsset._initializerDefineProperty(this, "splineMin", _descriptor3$1, this);

    jsonAsset._initializerDefineProperty(this, "splineMax", _descriptor4$1, this);

    jsonAsset._initializerDefineProperty(this, "constant", _descriptor5, this);

    jsonAsset._initializerDefineProperty(this, "constantMin", _descriptor6, this);

    jsonAsset._initializerDefineProperty(this, "constantMax", _descriptor7, this);

    jsonAsset._initializerDefineProperty(this, "multiplier", _descriptor8, this);

    this._curve = new jsonAsset.AnimationCurve(this.spline);
    this._curveMin = new jsonAsset.AnimationCurve(this.splineMin);
    this._curveMax = new jsonAsset.AnimationCurve(this.splineMax);
  }

  var _proto = CurveRange.prototype;

  _proto.evaluate = function evaluate(time, rndRatio) {
    switch (this.mode) {
      default:
      case Mode.Constant:
        return this.constant;

      case Mode.Curve:
        return this.spline.evaluate(time) * this.multiplier;

      case Mode.TwoCurves:
        return jsonAsset.lerp(this.splineMin.evaluate(time), this.splineMax.evaluate(time), rndRatio) * this.multiplier;

      case Mode.TwoConstants:
        return jsonAsset.lerp(this.constantMin, this.constantMax, rndRatio);
    }
  };

  _proto.getMax = function getMax() {
    switch (this.mode) {
      default:
      case Mode.Constant:
        return this.constant;

      case Mode.Curve:
        return this.multiplier;

      case Mode.TwoConstants:
        return this.constantMax;

      case Mode.TwoCurves:
        return this.multiplier;
    }
  };

  _proto._onBeforeSerialize = function _onBeforeSerialize(props) {
    return SerializableTable[this.mode];
  };

  return CurveRange;
}(), _class3.Mode = Mode, _temp$1), (_descriptor$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "mode", [_dec2$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode.Constant;
  }
}), _descriptor2$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "spline", [_dec3$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.constructLegacyCurveAndConvert();
  }
}), _descriptor3$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "splineMin", [_dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.constructLegacyCurveAndConvert();
  }
}), _descriptor4$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "splineMax", [_dec5$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.constructLegacyCurveAndConvert();
  }
}), _descriptor5 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "constant", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "constantMin", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor7 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "constantMax", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor8 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "multiplier", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
})), _class2$1)) || _class$1);

function evaluateCurve(cr, time, index) {
  switch (cr.mode) {
    case Mode.Constant:
      return cr.constant;

    case Mode.Curve:
      return cr.spline.evaluate(time) * cr.multiplier;

    case Mode.TwoCurves:
      return index === 0 ? cr.splineMin.evaluate(time) * cr.multiplier : cr.splineMax.evaluate(time) * cr.multiplier;

    case Mode.TwoConstants:
      return index === 0 ? cr.constantMin : cr.constantMax;

    default:
      return 0;
  }
}

function evaluateHeight(cr) {
  switch (cr.mode) {
    case Mode.TwoConstants:
      return 2;

    case Mode.TwoCurves:
      return 2;

    default:
      return 1;
  }
}

function packTexture(data, width, height) {
  var image = new jsonAsset.ImageAsset({
    width: width,
    height: height,
    _data: data,
    _compressed: false,
    format: jsonAsset.PixelFormat.RGBA32F
  });
  var texture = new jsonAsset.Texture2D();
  texture.setFilters(jsonAsset.Filter$1.NEAREST, jsonAsset.Filter$1.NEAREST);
  texture.setMipFilter(jsonAsset.Filter$1.NONE);
  texture.setWrapMode(jsonAsset.WrapMode$1.CLAMP_TO_EDGE, jsonAsset.WrapMode$1.CLAMP_TO_EDGE, jsonAsset.WrapMode$1.CLAMP_TO_EDGE);
  texture.image = image;
  return texture;
}

function packCurveRangeZ(samples, cr, discrete) {
  var height = evaluateHeight(cr);
  var data = new Float32Array(samples * height * 4);
  var interval = 1.0 / (samples - 1);
  var offset = 0;

  for (var h = 0; h < height; h++) {

    for (var j = 0; j < samples; j++) {
      var value = evaluateCurve(cr, interval * j, h);

      data[offset + 2] = value;
      offset += 4;
    }
  }

  return packTexture(data, samples, height);
}
function packCurveRangeN(samples, cr, discrete) {
  var height = evaluateHeight(cr);
  var data = new Float32Array(samples * height * 4);
  var interval = 1.0 / (samples - 1);
  var sum = 0;
  var average = 0;
  var offset = 0;

  for (var h = 0; h < height; h++) {
    sum = 0;

    for (var j = 0; j < samples; j++) {
      var value = evaluateCurve(cr, interval * j, h);

      if (discrete) {
        average = value;
      } else {
        sum += value;
        average = sum / (j + 1);
      }

      data[offset] = average;
      data[offset + 1] = average;
      data[offset + 2] = average;
      offset += 4;
    }
  }

  return packTexture(data, samples, height);
}
function packCurveRangeXY(samples, x, y, discrete) {
  var height = Math.max(evaluateHeight(x), evaluateHeight(y));
  var data = new Float32Array(samples * height * 4);
  var curves = [x, y];
  var interval = 1.0 / (samples - 1);

  for (var h = 0; h < height; h++) {
    for (var i = 0; i < 2; i++) {
      var cr = curves[i];
      var sum = 0;
      var average = 0;

      for (var j = 0; j < samples; j++) {
        var value = evaluateCurve(cr, interval * j, h);

        if (discrete) {
          average = value;
        } else {
          sum += value;
          average = sum / (j + 1);
        }

        data[j * 4 + i] = average;
      }
    }
  }

  return packTexture(data, samples, height);
}
function packCurveRangeXYZ(samples, x, y, z, discrete) {
  var height = Math.max(evaluateHeight(x), evaluateHeight(y), evaluateHeight(z));
  var data = new Float32Array(samples * height * 4);
  var curves = [x, y, z];
  var interval = 1.0 / (samples - 1);

  for (var h = 0; h < height; h++) {
    for (var i = 0; i < 3; i++) {
      var cr = curves[i];
      var sum = 0;
      var average = 0;

      for (var j = 0; j < samples; j++) {
        var value = evaluateCurve(cr, interval * j, h);

        if (discrete) {
          average = value;
        } else {
          sum += value;
          average = sum / (j + 1);
        }

        data[j * 4 + i] = average;
      }
    }
  }

  return packTexture(data, samples, height);
}
function packCurveRangeXYZW(samples, x, y, z, w, discrete) {
  var height = Math.max(evaluateHeight(x), evaluateHeight(y), evaluateHeight(z), evaluateHeight(w));
  var data = new Float32Array(samples * height * 4);
  var curves = [x, y, z, w];
  var interval = 1.0 / (samples - 1);

  for (var h = 0; h < height; h++) {
    for (var i = 0; i < 4; i++) {
      var cr = curves[i];
      var sum = 0;
      var average = 0;

      for (var j = 0; j < samples; j++) {
        var value = evaluateCurve(cr, interval * j, h);

        if (discrete) {
          average = value;
        } else {
          sum += value;
          average = sum / (j + 1);
        }

        data[j * 4 + i] = average;
      }
    }
  }

  return packTexture(data, samples, height);
}

var _dec$2, _class$2, _class2$2, _descriptor$2, _descriptor2$2, _temp$2, _dec2$2, _class4, _class5, _descriptor3$2, _descriptor4$2, _temp2, _dec3$2, _class7, _class8, _descriptor5$1, _descriptor6$1, _descriptor7$1, _class9, _temp3;
var Mode$1 = jsonAsset.Enum({
  Blend: 0,
  Fixed: 1
});
var ColorKey = (_dec$2 = jsonAsset.ccclass('cc.ColorKey'), _dec$2(_class$2 = (_class2$2 = (_temp$2 = function ColorKey() {
  jsonAsset._initializerDefineProperty(this, "color", _descriptor$2, this);

  jsonAsset._initializerDefineProperty(this, "time", _descriptor2$2, this);
}, _temp$2), (_descriptor$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "color", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Color$1.WHITE.clone();
  }
}), _descriptor2$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "time", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2$2)) || _class$2);
var AlphaKey = (_dec2$2 = jsonAsset.ccclass('cc.AlphaKey'), _dec2$2(_class4 = (_class5 = (_temp2 = function AlphaKey() {
  jsonAsset._initializerDefineProperty(this, "alpha", _descriptor3$2, this);

  jsonAsset._initializerDefineProperty(this, "time", _descriptor4$2, this);
}, _temp2), (_descriptor3$2 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "alpha", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4$2 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "time", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class5)) || _class4);
var Gradient = (_dec3$2 = jsonAsset.ccclass('cc.Gradient'), _dec3$2(_class7 = (_class8 = (_temp3 = _class9 = function () {
  function Gradient() {
    jsonAsset._initializerDefineProperty(this, "colorKeys", _descriptor5$1, this);

    jsonAsset._initializerDefineProperty(this, "alphaKeys", _descriptor6$1, this);

    jsonAsset._initializerDefineProperty(this, "mode", _descriptor7$1, this);

    this._color = void 0;
    this._color = jsonAsset.Color$1.WHITE.clone();
  }

  var _proto = Gradient.prototype;

  _proto.setKeys = function setKeys(colorKeys, alphaKeys) {
    this.colorKeys = colorKeys;
    this.alphaKeys = alphaKeys;
  };

  _proto.sortKeys = function sortKeys() {
    if (this.colorKeys.length > 1) {
      this.colorKeys.sort(function (a, b) {
        return a.time - b.time;
      });
    }

    if (this.alphaKeys.length > 1) {
      this.alphaKeys.sort(function (a, b) {
        return a.time - b.time;
      });
    }
  };

  _proto.evaluate = function evaluate(time) {
    this.getRGB(time);

    this._color._set_a_unsafe(this.getAlpha(time));

    return this._color;
  };

  _proto.randomColor = function randomColor() {
    var c = this.colorKeys[Math.trunc(Math.random() * this.colorKeys.length)];
    var a = this.alphaKeys[Math.trunc(Math.random() * this.alphaKeys.length)];

    this._color.set(c.color);

    this._color._set_a_unsafe(a.alpha);

    return this._color;
  };

  _proto.getRGB = function getRGB(time) {
    if (this.colorKeys.length > 1) {
      time = jsonAsset.repeat(time, 1);

      for (var i = 1; i < this.colorKeys.length; ++i) {
        var preTime = this.colorKeys[i - 1].time;
        var curTime = this.colorKeys[i].time;

        if (time >= preTime && time < curTime) {
          if (this.mode === Mode$1.Fixed) {
            return this.colorKeys[i].color;
          }

          var factor = (time - preTime) / (curTime - preTime);
          jsonAsset.Color$1.lerp(this._color, this.colorKeys[i - 1].color, this.colorKeys[i].color, factor);
          return this._color;
        }
      }

      var lastIndex = this.colorKeys.length - 1;

      if (time < this.colorKeys[0].time) {
        jsonAsset.Color$1.lerp(this._color, jsonAsset.Color$1.BLACK, this.colorKeys[0].color, time / this.colorKeys[0].time);
      } else if (time > this.colorKeys[lastIndex].time) {
        jsonAsset.Color$1.lerp(this._color, this.colorKeys[lastIndex].color, jsonAsset.Color$1.BLACK, (time - this.colorKeys[lastIndex].time) / (1 - this.colorKeys[lastIndex].time));
      }
    } else if (this.colorKeys.length === 1) {
      this._color.set(this.colorKeys[0].color);

      return this._color;
    } else {
      this._color.set(jsonAsset.Color$1.WHITE);

      return this._color;
    }
  };

  _proto.getAlpha = function getAlpha(time) {
    var basicAlpha = 0;

    if (this.alphaKeys.length > 1) {
      time = jsonAsset.repeat(time, 1);

      for (var i = 1; i < this.alphaKeys.length; ++i) {
        var preTime = this.alphaKeys[i - 1].time;
        var curTime = this.alphaKeys[i].time;

        if (time >= preTime && time < curTime) {
          if (this.mode === Mode$1.Fixed) {
            return this.alphaKeys[i].alpha;
          }

          var factor = (time - preTime) / (curTime - preTime);
          return jsonAsset.lerp(this.alphaKeys[i - 1].alpha, this.alphaKeys[i].alpha, factor);
        }
      }

      var lastIndex = this.alphaKeys.length - 1;

      if (time < this.alphaKeys[0].time) {
        return jsonAsset.lerp(basicAlpha, this.alphaKeys[0].alpha, time / this.alphaKeys[0].time);
      } else if (time > this.alphaKeys[lastIndex].time) {
        return jsonAsset.lerp(this.alphaKeys[lastIndex].alpha, basicAlpha, (time - this.alphaKeys[lastIndex].time) / (1 - this.alphaKeys[lastIndex].time));
      }
    } else if (this.alphaKeys.length === 1) {
      return this.alphaKeys[0].alpha;
    } else {
      return 255;
    }
  };

  return Gradient;
}(), _class9.Mode = Mode$1, _temp3), (_descriptor5$1 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "colorKeys", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _descriptor6$1 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "alphaKeys", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _descriptor7$1 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "mode", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode$1.Blend;
  }
})), _class8)) || _class7);

var _dec$3, _dec2$3, _dec3$3, _dec4$2, _dec5$2, _dec6$1, _class$3, _class2$3, _descriptor$3, _descriptor2$3, _descriptor3$3, _descriptor4$3, _descriptor5$2, _descriptor6$2, _descriptor7$2, _class3$1, _temp$3;
var SerializableTable$1 = jsonAsset.EDITOR ;
var Mode$2 = jsonAsset.Enum({
  Color: 0,
  Gradient: 1,
  TwoColors: 2,
  TwoGradients: 3,
  RandomColor: 4
});
var GradientRange = (_dec$3 = jsonAsset.ccclass('cc.GradientRange'), _dec2$3 = jsonAsset.type(Mode$2), _dec3$3 = jsonAsset.type(Gradient), _dec4$2 = jsonAsset.type(Gradient), _dec5$2 = jsonAsset.type(Gradient), _dec6$1 = jsonAsset.type(Mode$2), _dec$3(_class$3 = (_class2$3 = (_temp$3 = _class3$1 = function () {
  function GradientRange() {
    jsonAsset._initializerDefineProperty(this, "color", _descriptor$3, this);

    jsonAsset._initializerDefineProperty(this, "colorMin", _descriptor2$3, this);

    jsonAsset._initializerDefineProperty(this, "colorMax", _descriptor3$3, this);

    jsonAsset._initializerDefineProperty(this, "gradient", _descriptor4$3, this);

    jsonAsset._initializerDefineProperty(this, "gradientMin", _descriptor5$2, this);

    jsonAsset._initializerDefineProperty(this, "gradientMax", _descriptor6$2, this);

    jsonAsset._initializerDefineProperty(this, "_mode", _descriptor7$2, this);

    this._color = jsonAsset.Color$1.WHITE.clone();
  }

  var _proto = GradientRange.prototype;

  _proto.evaluate = function evaluate(time, rndRatio) {
    switch (this._mode) {
      case Mode$2.Color:
        return this.color;

      case Mode$2.TwoColors:
        jsonAsset.Color$1.lerp(this._color, this.colorMin, this.colorMax, rndRatio);
        return this._color;

      case Mode$2.RandomColor:
        return this.gradient.randomColor();

      case Mode$2.Gradient:
        return this.gradient.evaluate(time);

      case Mode$2.TwoGradients:
        jsonAsset.Color$1.lerp(this._color, this.gradientMin.evaluate(time), this.gradientMax.evaluate(time), rndRatio);
        return this._color;

      default:
        return this.color;
    }
  };

  _proto._onBeforeSerialize = function _onBeforeSerialize(props) {
    return SerializableTable$1[this._mode];
  };

  jsonAsset._createClass(GradientRange, [{
    key: "mode",
    get: function get() {
      return this._mode;
    },
    set: function set(m) {

      this._mode = m;
    }
  }]);

  return GradientRange;
}(), _class3$1.Mode = Mode$2, _temp$3), (jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "mode", [_dec2$3], Object.getOwnPropertyDescriptor(_class2$3.prototype, "mode"), _class2$3.prototype), _descriptor$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "color", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Color$1.WHITE.clone();
  }
}), _descriptor2$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "colorMin", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Color$1.WHITE.clone();
  }
}), _descriptor3$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "colorMax", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Color$1.WHITE.clone();
  }
}), _descriptor4$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "gradient", [_dec3$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Gradient();
  }
}), _descriptor5$2 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "gradientMin", [_dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Gradient();
  }
}), _descriptor6$2 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "gradientMax", [_dec5$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Gradient();
  }
}), _descriptor7$2 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_mode", [_dec6$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode$2.Color;
  }
})), _class2$3)) || _class$3);

function evaluateGradient(gr, time, index) {
  switch (gr.mode) {
    case Mode$2.Color:
      return gr.color;

    case Mode$2.TwoColors:
      return index === 0 ? gr.colorMin : gr.colorMax;

    case Mode$2.RandomColor:
      return gr.gradient.randomColor();

    case Mode$2.Gradient:
      return gr.gradient.evaluate(time);

    case Mode$2.TwoGradients:
      return index === 0 ? gr.gradientMin.evaluate(time) : gr.gradientMax.evaluate(time);

    default:
      return gr.color;
  }
}

function evaluateHeight$1(gr) {
  switch (gr.mode) {
    case Mode$2.TwoColors:
      return 2;

    case Mode$2.TwoGradients:
      return 2;

    default:
      return 1;
  }
}

function packGradientRange(samples, gr) {
  var height = evaluateHeight$1(gr);
  var data = new Uint8Array(samples * height * 4);
  var interval = 1.0 / (samples - 1);
  var offset = 0;

  for (var h = 0; h < height; h++) {
    for (var j = 0; j < samples; j++) {
      var color = evaluateGradient(gr, interval * j, h);
      data[offset] = color.r;
      data[offset + 1] = color.g;
      data[offset + 2] = color.b;
      data[offset + 3] = color.a;
      offset += 4;
    }
  }

  var texture = new jsonAsset.Texture2D();
  texture.create(samples, height, jsonAsset.PixelFormat.RGBA8888);
  texture.setFilters(jsonAsset.Filter$1.LINEAR, jsonAsset.Filter$1.LINEAR);
  texture.setWrapMode(jsonAsset.WrapMode$1.CLAMP_TO_EDGE, jsonAsset.WrapMode$1.CLAMP_TO_EDGE);
  texture.uploadData(data);
  return texture;
}

var _dec$4, _dec2$4, _dec3$4, _dec4$3, _dec5$3, _dec6$2, _dec7$1, _dec8$1, _dec9$1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class$4, _class2$4, _descriptor$4, _descriptor2$4, _descriptor3$4, _descriptor4$4, _descriptor5$3, _descriptor6$3, _descriptor7$3, _temp$4;
var _matInsInfo = {
  parent: null,
  owner: null,
  subModelIdx: 0
};
var CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
var define = {
  CC_USE_WORLD_SPACE: false
};
var Line = (_dec$4 = jsonAsset.ccclass('cc.Line'), _dec2$4 = jsonAsset.help(), _dec3$4 = jsonAsset.menu(), _dec4$3 = jsonAsset.type(jsonAsset.Texture2D), _dec5$3 = jsonAsset.type(jsonAsset.Texture2D), _dec6$2 = jsonAsset.displayOrder(), _dec7$1 = jsonAsset.tooltip(), _dec8$1 = jsonAsset.displayOrder(), _dec9$1 = jsonAsset.tooltip(), _dec10 = jsonAsset.type([jsonAsset.Vec3]), _dec11 = jsonAsset.type([jsonAsset.Vec3]), _dec12 = jsonAsset.displayOrder(), _dec13 = jsonAsset.tooltip(), _dec14 = jsonAsset.type(CurveRange), _dec15 = jsonAsset.type(CurveRange), _dec16 = jsonAsset.displayOrder(), _dec17 = jsonAsset.tooltip(), _dec18 = jsonAsset.type(jsonAsset.Vec2), _dec19 = jsonAsset.displayOrder(), _dec20 = jsonAsset.tooltip(), _dec21 = jsonAsset.type(jsonAsset.Vec2), _dec22 = jsonAsset.displayOrder(), _dec23 = jsonAsset.tooltip(), _dec24 = jsonAsset.type(GradientRange), _dec25 = jsonAsset.type(GradientRange), _dec26 = jsonAsset.displayOrder(), _dec27 = jsonAsset.tooltip(), _dec$4(_class$4 = _dec2$4(_class$4 = _dec3$4(_class$4 = jsonAsset.executeInEditMode(_class$4 = (_class2$4 = (_temp$4 = function (_Component) {
  jsonAsset._inheritsLoose(Line, _Component);

  jsonAsset._createClass(Line, [{
    key: "texture",
    get: function get() {
      return this._texture;
    },
    set: function set(val) {
      this._texture = val;

      if (this._materialInstance) {
        this._materialInstance.setProperty('mainTexture', val);
      }
    }
  }, {
    key: "worldSpace",
    get: function get() {
      return this._worldSpace;
    },
    set: function set(val) {
      this._worldSpace = val;

      if (this._materialInstance) {
        define[CC_USE_WORLD_SPACE] = this.worldSpace;

        this._materialInstance.recompileShaders(define);

        if (this._model) {
          this._model.setSubModelMaterial(0, this._materialInstance);
        }
      }
    }
  }, {
    key: "positions",
    get: function get() {
      return this._positions;
    },
    set: function set(val) {
      this._positions = val;

      if (this._model) {
        this._model.addLineVertexData(this._positions, this._width, this._color);
      }
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    },
    set: function set(val) {
      this._width = val;

      if (this._model) {
        this._model.addLineVertexData(this._positions, this._width, this._color);
      }
    }
  }, {
    key: "tile",
    get: function get() {
      return this._tile;
    },
    set: function set(val) {
      this._tile.set(val);

      if (this._materialInstance) {
        this._tile_offset.x = this._tile.x;
        this._tile_offset.y = this._tile.y;

        this._materialInstance.setProperty('mainTiling_Offset', this._tile_offset);
      }
    }
  }, {
    key: "offset",
    get: function get() {
      return this._offset;
    },
    set: function set(val) {
      this._offset.set(val);

      if (this._materialInstance) {
        this._tile_offset.z = this._offset.x;
        this._tile_offset.w = this._offset.y;

        this._materialInstance.setProperty('mainTiling_Offset', this._tile_offset);
      }
    }
  }, {
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(val) {
      this._color = val;

      if (this._model) {
        this._model.addLineVertexData(this._positions, this._width, this._color);
      }
    }
  }]);

  function Line() {
    var _this;

    _this = _Component.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_texture", _descriptor$4, jsonAsset._assertThisInitialized(_this));

    _this._material = null;
    _this._materialInstance = null;

    jsonAsset._initializerDefineProperty(_this, "_worldSpace", _descriptor2$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_positions", _descriptor3$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_width", _descriptor4$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_tile", _descriptor5$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_offset", _descriptor6$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_color", _descriptor7$3, jsonAsset._assertThisInitialized(_this));

    _this._model = null;
    _this._tile_offset = new jsonAsset.Vec4();
    return _this;
  }

  var _proto = Line.prototype;

  _proto.onLoad = function onLoad() {
    var model = this._model = jsonAsset.legacyCC.director.root.createModel(LineModel);
    model.node = model.transform = this.node;

    if (this._material === null) {
      this._material = new jsonAsset.Material();

      this._material.copy(jsonAsset.builtinResMgr.get('default-trail-material'));

      define[CC_USE_WORLD_SPACE] = this.worldSpace;
      _matInsInfo.parent = this._material;
      _matInsInfo.subModelIdx = 0;
      this._materialInstance = new view.MaterialInstance(_matInsInfo);
      _matInsInfo.parent = null;
      _matInsInfo.subModelIdx = 0;

      this._materialInstance.recompileShaders(define);
    }

    model.updateMaterial(this._materialInstance);
    model.setCapacity(100);
  };

  _proto.onEnable = function onEnable() {
    if (!this._model) {
      return;
    }

    this._attachToScene();

    this.texture = this._texture;
    this.tile = this._tile;
    this.offset = this._offset;

    this._model.addLineVertexData(this._positions, this._width, this._color);
  };

  _proto.onDisable = function onDisable() {
    if (this._model) {
      this._detachFromScene();
    }
  };

  _proto._attachToScene = function _attachToScene() {
    if (this._model && this.node && this.node.scene) {
      if (this._model.scene) {
        this._detachFromScene();
      }

      this._getRenderScene().addModel(this._model);
    }
  };

  _proto._detachFromScene = function _detachFromScene() {
    if (this._model && this._model.scene) {
      this._model.scene.removeModel(this._model);
    }
  };

  return Line;
}(jsonAsset.Component), _temp$4), (_descriptor$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_texture", [_dec4$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "texture", [_dec5$3, _dec6$2, _dec7$1], Object.getOwnPropertyDescriptor(_class2$4.prototype, "texture"), _class2$4.prototype), _descriptor2$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_worldSpace", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "worldSpace", [_dec8$1, _dec9$1], Object.getOwnPropertyDescriptor(_class2$4.prototype, "worldSpace"), _class2$4.prototype), _descriptor3$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_positions", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "positions", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2$4.prototype, "positions"), _class2$4.prototype), _descriptor4$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_width", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "width", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2$4.prototype, "width"), _class2$4.prototype), _descriptor5$3 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_tile", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2(1, 1);
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "tile", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2$4.prototype, "tile"), _class2$4.prototype), _descriptor6$3 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_offset", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2(0, 0);
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "offset", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2$4.prototype, "offset"), _class2$4.prototype), _descriptor7$3 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_color", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new GradientRange();
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "color", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2$4.prototype, "color"), _class2$4.prototype)), _class2$4)) || _class$4) || _class$4) || _class$4) || _class$4);

var Particle = function () {
  function Particle(particleSystem) {
    this.particleSystem = void 0;
    this.position = void 0;
    this.velocity = void 0;
    this.animatedVelocity = void 0;
    this.ultimateVelocity = void 0;
    this.angularVelocity = void 0;
    this.axisOfRotation = void 0;
    this.rotation = void 0;
    this.startEuler = void 0;
    this.startRotation = void 0;
    this.deltaQuat = void 0;
    this.deltaMat = void 0;
    this.localMat = void 0;
    this.startSize = void 0;
    this.size = void 0;
    this.startColor = void 0;
    this.color = void 0;
    this.randomSeed = void 0;
    this.remainingLifetime = void 0;
    this.startLifetime = void 0;
    this.emitAccumulator0 = void 0;
    this.emitAccumulator1 = void 0;
    this.frameIndex = void 0;
    this.startRow = void 0;
    this.particleSystem = particleSystem;
    this.position = new jsonAsset.Vec3(0, 0, 0);
    this.velocity = new jsonAsset.Vec3(0, 0, 0);
    this.animatedVelocity = new jsonAsset.Vec3(0, 0, 0);
    this.ultimateVelocity = new jsonAsset.Vec3(0, 0, 0);
    this.angularVelocity = new jsonAsset.Vec3(0, 0, 0);
    this.axisOfRotation = new jsonAsset.Vec3(0, 0, 0);
    this.rotation = new jsonAsset.Vec3(0, 0, 0);
    this.startEuler = new jsonAsset.Vec3(0, 0, 0);
    this.startRotation = new jsonAsset.Quat();
    this.deltaQuat = new jsonAsset.Quat();
    this.deltaMat = new jsonAsset.Mat4();
    this.localMat = new jsonAsset.Mat4();
    this.startSize = new jsonAsset.Vec3(0, 0, 0);
    this.size = new jsonAsset.Vec3(0, 0, 0);
    this.startColor = jsonAsset.Color$1.WHITE.clone();
    this.color = jsonAsset.Color$1.WHITE.clone();
    this.randomSeed = 0;
    this.remainingLifetime = 0.0;
    this.startLifetime = 0.0;
    this.emitAccumulator0 = 0.0;
    this.emitAccumulator1 = 0.0;
    this.frameIndex = 0.0;
    this.startRow = 0;
  }

  var _proto = Particle.prototype;

  _proto.reset = function reset() {
    this.rotation.set(0, 0, 0);
    this.startEuler.set(0, 0, 0);
    this.startRotation.set(0, 0, 0, 1);
    this.deltaQuat.set(0, 0, 0, 1);
    this.deltaMat.identity();
    this.localMat.identity();
  };

  return Particle;
}();
Particle.INDENTIFY_NEG_QUAT = 10;
Particle.R2D = 180.0 / Math.PI;
var PARTICLE_MODULE_NAME = {
  COLOR: 'colorModule',
  FORCE: 'forceModule',
  LIMIT: 'limitModule',
  ROTATION: 'rotationModule',
  SIZE: 'sizeModule',
  VELOCITY: 'velocityModule',
  TEXTURE: 'textureModule'
};
var PARTICLE_MODULE_ORDER = ['sizeModule', 'colorModule', 'forceModule', 'velocityModule', 'limitModule', 'rotationModule', 'textureModule'];
var PARTICLE_MODULE_PROPERTY = ['_colorOverLifetimeModule', '_shapeModule', '_sizeOvertimeModule', '_velocityOvertimeModule', '_forceOvertimeModule', '_limitVelocityOvertimeModule', '_rotationOvertimeModule', '_textureAnimationModule', '_trailModule'];
var ParticleModuleBase = function () {
  function ParticleModuleBase() {
    this.target = null;
    this.needUpdate = false;
    this.needAnimate = true;
    this.name = void 0;
  }

  var _proto2 = ParticleModuleBase.prototype;

  _proto2.bindTarget = function bindTarget(target) {
    this.target = target;
  };

  _proto2.update = function update(space, trans) {};

  return ParticleModuleBase;
}();

var Space = jsonAsset.Enum({
  World: 0,
  Local: 1,
  Custom: 2
});
var RenderMode = jsonAsset.Enum({
  Billboard: 0,
  StrecthedBillboard: 1,
  HorizontalBillboard: 2,
  VerticalBillboard: 3,
  Mesh: 4
});
var ShapeType = jsonAsset.Enum({
  Box: 0,
  Circle: 1,
  Cone: 2,
  Sphere: 3,
  Hemisphere: 4
});
var EmitLocation = jsonAsset.Enum({
  Base: 0,
  Edge: 1,
  Shell: 2,
  Volume: 3
});
var ArcMode = jsonAsset.Enum({
  Random: 0,
  Loop: 1,
  PingPong: 2
});
var TrailMode = jsonAsset.Enum({
  Particles: 0
});
var TextureMode = jsonAsset.Enum({
  Stretch: 0
});
var ModuleRandSeed = {
  LIMIT: 23541,
  SIZE: 39825,
  TEXTURE: 90794,
  COLOR: 91041,
  FORCE: 212165,
  ROTATION: 125292,
  VELOCITY_X: 197866,
  VELOCITY_Y: 156497,
  VELOCITY_Z: 984136
};

var _dec$5, _dec2$5, _dec3$5, _dec4$4, _class$5, _class2$5, _descriptor$5, _descriptor2$5, _temp$5;
var COLOR_OVERTIME_RAND_OFFSET = ModuleRandSeed.COLOR;
var ColorOvertimeModule = (_dec$5 = jsonAsset.ccclass('cc.ColorOvertimeModule'), _dec2$5 = jsonAsset.displayOrder(), _dec3$5 = jsonAsset.type(GradientRange), _dec4$4 = jsonAsset.displayOrder(), _dec$5(_class$5 = (_class2$5 = (_temp$5 = function (_ParticleModuleBase) {
  jsonAsset._inheritsLoose(ColorOvertimeModule, _ParticleModuleBase);

  function ColorOvertimeModule() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ParticleModuleBase.call.apply(_ParticleModuleBase, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_enable", _descriptor$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "color", _descriptor2$5, jsonAsset._assertThisInitialized(_this));

    _this.name = PARTICLE_MODULE_NAME.COLOR;
    return _this;
  }

  var _proto = ColorOvertimeModule.prototype;

  _proto.animate = function animate(particle) {
    particle.color.set(particle.startColor);
    particle.color.multiply(this.color.evaluate(1.0 - particle.remainingLifetime / particle.startLifetime, jsonAsset.pseudoRandom(particle.randomSeed + COLOR_OVERTIME_RAND_OFFSET)));
  };

  jsonAsset._createClass(ColorOvertimeModule, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (this._enable === val) return;
      this._enable = val;
      if (!this.target) return;
      this.target.enableModule(this.name, val, this);
    }
  }]);

  return ColorOvertimeModule;
}(ParticleModuleBase), _temp$5), (_descriptor$5 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "enable", [_dec2$5], Object.getOwnPropertyDescriptor(_class2$5.prototype, "enable"), _class2$5.prototype), _descriptor2$5 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "color", [_dec3$5, jsonAsset.serializable, _dec4$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new GradientRange();
  }
})), _class2$5)) || _class$5);

var particleEmitZAxis = new jsonAsset.Vec3(0, 0, -1);
function calculateTransform(systemSpace, moduleSpace, worldTransform, outQuat) {
  if (moduleSpace !== systemSpace) {
    if (systemSpace === Space.World) {
      jsonAsset.Mat4.getRotation(outQuat, worldTransform);
    } else {
      jsonAsset.Mat4.invert(worldTransform, worldTransform);
      jsonAsset.Mat4.getRotation(outQuat, worldTransform);
    }

    return true;
  } else {
    jsonAsset.Quat.set(outQuat, 0, 0, 0, 1);
    return false;
  }
}
function fixedAngleUnitVector2(out, theta) {
  jsonAsset.Vec2.set(out, Math.cos(theta), Math.sin(theta));
}
function randomUnitVector(out) {
  var z = jsonAsset.randomRange(-1, 1);
  var a = jsonAsset.randomRange(0, 2 * Math.PI);
  var r = Math.sqrt(1 - z * z);
  var x = r * Math.cos(a);
  var y = r * Math.sin(a);
  jsonAsset.Vec3.set(out, x, y, z);
}
function randomPointBetweenSphere(out, minRadius, maxRadius) {
  randomUnitVector(out);
  jsonAsset.Vec3.multiplyScalar(out, out, minRadius + (maxRadius - minRadius) * jsonAsset.random());
}
function randomPointBetweenCircleAtFixedAngle(out, minRadius, maxRadius, theta) {
  fixedAngleUnitVector2(out, theta);
  out.z = 0;
  jsonAsset.Vec3.multiplyScalar(out, out, minRadius + (maxRadius - minRadius) * jsonAsset.random());
}
function randomPointInCube(out, extents) {
  jsonAsset.Vec3.set(out, jsonAsset.randomRange(-extents.x, extents.x), jsonAsset.randomRange(-extents.y, extents.y), jsonAsset.randomRange(-extents.z, extents.z));
}
function randomSortArray(arr) {
  for (var i = 0; i < arr.length; i++) {
    var transpose = i + jsonAsset.randomRangeInt(0, arr.length - i);
    var val = arr[transpose];
    arr[transpose] = arr[i];
    arr[i] = val;
  }
}
function randomSign() {
  var sgn = jsonAsset.randomRange(-1, 1);

  if (sgn === 0) {
    sgn++;
  }

  return jsonAsset.sign(sgn);
}

var _dec$6, _dec2$6, _dec3$6, _dec4$5, _dec5$4, _dec6$3, _dec7$2, _dec8$2, _dec9$2, _dec10$1, _dec11$1, _dec12$1, _dec13$1, _dec14$1, _dec15$1, _dec16$1, _dec17$1, _class$6, _class2$6, _descriptor$6, _descriptor2$6, _descriptor3$5, _descriptor4$5, _descriptor5$4, _temp$6;
var FORCE_OVERTIME_RAND_OFFSET = ModuleRandSeed.FORCE;

var _temp_v3 = new jsonAsset.Vec3();

var ForceOvertimeModule = (_dec$6 = jsonAsset.ccclass('cc.ForceOvertimeModule'), _dec2$6 = jsonAsset.displayOrder(), _dec3$6 = jsonAsset.type(CurveRange), _dec4$5 = jsonAsset.range(), _dec5$4 = jsonAsset.displayOrder(), _dec6$3 = jsonAsset.tooltip(), _dec7$2 = jsonAsset.type(CurveRange), _dec8$2 = jsonAsset.range(), _dec9$2 = jsonAsset.displayOrder(), _dec10$1 = jsonAsset.tooltip(), _dec11$1 = jsonAsset.type(CurveRange), _dec12$1 = jsonAsset.range(), _dec13$1 = jsonAsset.displayOrder(), _dec14$1 = jsonAsset.tooltip(), _dec15$1 = jsonAsset.type(Space), _dec16$1 = jsonAsset.displayOrder(), _dec17$1 = jsonAsset.tooltip(), _dec$6(_class$6 = (_class2$6 = (_temp$6 = function (_ParticleModuleBase) {
  jsonAsset._inheritsLoose(ForceOvertimeModule, _ParticleModuleBase);

  jsonAsset._createClass(ForceOvertimeModule, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (this._enable === val) return;
      this._enable = val;
      if (!this.target) return;
      this.target.enableModule(this.name, val, this);
    }
  }]);

  function ForceOvertimeModule() {
    var _this;

    _this = _ParticleModuleBase.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_enable", _descriptor$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "x", _descriptor2$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "y", _descriptor3$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "z", _descriptor4$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "space", _descriptor5$4, jsonAsset._assertThisInitialized(_this));

    _this.randomized = false;
    _this.rotation = void 0;
    _this.needTransform = void 0;
    _this.name = PARTICLE_MODULE_NAME.FORCE;
    _this.rotation = new jsonAsset.Quat();
    _this.needTransform = false;
    _this.needUpdate = true;
    return _this;
  }

  var _proto = ForceOvertimeModule.prototype;

  _proto.update = function update(space, worldTransform) {
    this.needTransform = calculateTransform(space, this.space, worldTransform, this.rotation);
  };

  _proto.animate = function animate(p, dt) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var force = jsonAsset.Vec3.set(_temp_v3, this.x.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)), this.y.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)), this.z.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)));

    if (this.needTransform) {
      jsonAsset.Vec3.transformQuat(force, force, this.rotation);
    }

    jsonAsset.Vec3.scaleAndAdd(p.velocity, p.velocity, force, dt);
    jsonAsset.Vec3.copy(p.ultimateVelocity, p.velocity);
  };

  return ForceOvertimeModule;
}(ParticleModuleBase), _temp$6), (_descriptor$6 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "enable", [_dec2$6], Object.getOwnPropertyDescriptor(_class2$6.prototype, "enable"), _class2$6.prototype), _descriptor2$6 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "x", [_dec3$6, jsonAsset.serializable, _dec4$5, _dec5$4, _dec6$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor3$5 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "y", [_dec7$2, jsonAsset.serializable, _dec8$2, _dec9$2, _dec10$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor4$5 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "z", [_dec11$1, jsonAsset.serializable, _dec12$1, _dec13$1, _dec14$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor5$4 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "space", [_dec15$1, jsonAsset.serializable, _dec16$1, _dec17$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Space.Local;
  }
})), _class2$6)) || _class$6);

var _dec$7, _dec2$7, _dec3$7, _dec4$6, _dec5$5, _dec6$4, _dec7$3, _dec8$3, _dec9$3, _dec10$2, _dec11$2, _dec12$2, _dec13$2, _dec14$2, _dec15$2, _dec16$2, _dec17$2, _dec18$1, _dec19$1, _dec20$1, _dec21$1, _dec22$1, _dec23$1, _dec24$1, _dec25$1, _class$7, _class2$7, _descriptor$7, _descriptor2$7, _descriptor3$6, _descriptor4$6, _descriptor5$5, _descriptor6$4, _descriptor7$4, _descriptor8$1, _temp$7;
var LIMIT_VELOCITY_RAND_OFFSET = ModuleRandSeed.LIMIT;

var _temp_v3$1 = new jsonAsset.Vec3();

var _temp_v3_1 = new jsonAsset.Vec3();

var LimitVelocityOvertimeModule = (_dec$7 = jsonAsset.ccclass('cc.LimitVelocityOvertimeModule'), _dec2$7 = jsonAsset.displayOrder(), _dec3$7 = jsonAsset.type(CurveRange), _dec4$6 = jsonAsset.range(), _dec5$5 = jsonAsset.displayOrder(), _dec6$4 = jsonAsset.tooltip(), _dec7$3 = jsonAsset.type(CurveRange), _dec8$3 = jsonAsset.range(), _dec9$3 = jsonAsset.displayOrder(), _dec10$2 = jsonAsset.tooltip(), _dec11$2 = jsonAsset.type(CurveRange), _dec12$2 = jsonAsset.range(), _dec13$2 = jsonAsset.displayOrder(), _dec14$2 = jsonAsset.tooltip(), _dec15$2 = jsonAsset.type(CurveRange), _dec16$2 = jsonAsset.range(), _dec17$2 = jsonAsset.displayOrder(), _dec18$1 = jsonAsset.tooltip(), _dec19$1 = jsonAsset.displayOrder(), _dec20$1 = jsonAsset.tooltip(), _dec21$1 = jsonAsset.displayOrder(), _dec22$1 = jsonAsset.tooltip(), _dec23$1 = jsonAsset.type(Space), _dec24$1 = jsonAsset.displayOrder(), _dec25$1 = jsonAsset.tooltip(), _dec$7(_class$7 = (_class2$7 = (_temp$7 = function (_ParticleModuleBase) {
  jsonAsset._inheritsLoose(LimitVelocityOvertimeModule, _ParticleModuleBase);

  jsonAsset._createClass(LimitVelocityOvertimeModule, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (this._enable === val) return;
      this._enable = val;
      if (!this.target) return;
      this.target.enableModule(this.name, val, this);
    }
  }]);

  function LimitVelocityOvertimeModule() {
    var _this;

    _this = _ParticleModuleBase.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_enable", _descriptor$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "limitX", _descriptor2$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "limitY", _descriptor3$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "limitZ", _descriptor4$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "limit", _descriptor5$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "dampen", _descriptor6$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "separateAxes", _descriptor7$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "space", _descriptor8$1, jsonAsset._assertThisInitialized(_this));

    _this.drag = null;
    _this.multiplyDragByParticleSize = false;
    _this.multiplyDragByParticleVelocity = false;
    _this.name = PARTICLE_MODULE_NAME.LIMIT;
    _this.rotation = void 0;
    _this.needTransform = void 0;
    _this.rotation = new jsonAsset.Quat();
    _this.needTransform = false;
    _this.needUpdate = true;
    return _this;
  }

  var _proto = LimitVelocityOvertimeModule.prototype;

  _proto.update = function update(space, worldTransform) {
    this.needTransform = calculateTransform(space, this.space, worldTransform, this.rotation);
  };

  _proto.animate = function animate(p, dt) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var dampedVel = _temp_v3$1;

    if (this.separateAxes) {
      jsonAsset.Vec3.set(_temp_v3_1, this.limitX.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitY.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitZ.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)));

      if (this.needTransform) {
        jsonAsset.Vec3.transformQuat(_temp_v3_1, _temp_v3_1, this.rotation);
      }

      jsonAsset.Vec3.set(dampedVel, dampenBeyondLimit(p.ultimateVelocity.x, _temp_v3_1.x, this.dampen), dampenBeyondLimit(p.ultimateVelocity.y, _temp_v3_1.y, this.dampen), dampenBeyondLimit(p.ultimateVelocity.z, _temp_v3_1.z, this.dampen));
    } else {
      jsonAsset.Vec3.normalize(dampedVel, p.ultimateVelocity);
      jsonAsset.Vec3.multiplyScalar(dampedVel, dampedVel, dampenBeyondLimit(p.ultimateVelocity.length(), this.limit.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.dampen));
    }

    jsonAsset.Vec3.copy(p.ultimateVelocity, dampedVel);
  };

  return LimitVelocityOvertimeModule;
}(ParticleModuleBase), _temp$7), (_descriptor$7 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "enable", [_dec2$7], Object.getOwnPropertyDescriptor(_class2$7.prototype, "enable"), _class2$7.prototype), _descriptor2$7 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "limitX", [_dec3$7, jsonAsset.serializable, _dec4$6, _dec5$5, _dec6$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor3$6 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "limitY", [_dec7$3, jsonAsset.serializable, _dec8$3, _dec9$3, _dec10$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor4$6 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "limitZ", [_dec11$2, jsonAsset.serializable, _dec12$2, _dec13$2, _dec14$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor5$5 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "limit", [_dec15$2, jsonAsset.serializable, _dec16$2, _dec17$2, _dec18$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor6$4 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "dampen", [jsonAsset.serializable, _dec19$1, _dec20$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3;
  }
}), _descriptor7$4 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "separateAxes", [jsonAsset.serializable, _dec21$1, _dec22$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8$1 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "space", [_dec23$1, jsonAsset.serializable, _dec24$1, _dec25$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Space.Local;
  }
})), _class2$7)) || _class$7);

function dampenBeyondLimit(vel, limit, dampen) {
  var sgn = Math.sign(vel);
  var abs = Math.abs(vel);

  if (abs > limit) {
    abs = jsonAsset.lerp(abs, limit, dampen);
  }

  return abs * sgn;
}

var _dec$8, _dec2$8, _dec3$8, _dec4$7, _dec5$6, _dec6$5, _dec7$4, _dec8$4, _dec9$4, _dec10$3, _dec11$3, _dec12$3, _dec13$3, _dec14$3, _dec15$3, _dec16$3, _class$8, _class2$8, _descriptor$8, _descriptor2$8, _descriptor3$7, _descriptor4$7, _descriptor5$6, _temp$8;
var ROTATION_OVERTIME_RAND_OFFSET = ModuleRandSeed.ROTATION;
var RotationOvertimeModule = (_dec$8 = jsonAsset.ccclass('cc.RotationOvertimeModule'), _dec2$8 = jsonAsset.displayOrder(), _dec3$8 = jsonAsset.displayOrder(), _dec4$7 = jsonAsset.tooltip(), _dec5$6 = jsonAsset.type(CurveRange), _dec6$5 = jsonAsset.range(), _dec7$4 = jsonAsset.displayOrder(), _dec8$4 = jsonAsset.tooltip(), _dec9$4 = jsonAsset.type(CurveRange), _dec10$3 = jsonAsset.range(), _dec11$3 = jsonAsset.displayOrder(), _dec12$3 = jsonAsset.tooltip(), _dec13$3 = jsonAsset.type(CurveRange), _dec14$3 = jsonAsset.range(), _dec15$3 = jsonAsset.displayOrder(), _dec16$3 = jsonAsset.tooltip(), _dec$8(_class$8 = (_class2$8 = (_temp$8 = function (_ParticleModuleBase) {
  jsonAsset._inheritsLoose(RotationOvertimeModule, _ParticleModuleBase);

  function RotationOvertimeModule() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ParticleModuleBase.call.apply(_ParticleModuleBase, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_enable", _descriptor$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_separateAxes", _descriptor2$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "x", _descriptor3$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "y", _descriptor4$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "z", _descriptor5$6, jsonAsset._assertThisInitialized(_this));

    _this.name = PARTICLE_MODULE_NAME.ROTATION;
    _this._startMat = new jsonAsset.Mat4();
    _this._matRot = new jsonAsset.Mat4();
    _this._quatRot = new jsonAsset.Quat();
    _this._otherEuler = new jsonAsset.Vec3();
    return _this;
  }

  var _proto = RotationOvertimeModule.prototype;

  _proto._processRotation = function _processRotation(p, r2d) {
    var renderMode = p.particleSystem.processor.getInfo().renderMode;

    if (renderMode !== RenderMode.Mesh) {
      if (renderMode === RenderMode.StrecthedBillboard) {
        this._quatRot.set(0, 0, 0, 1);
      }
    }

    jsonAsset.Quat.normalize(this._quatRot, this._quatRot);

    if (this._quatRot.w < 0.0) {
      this._quatRot.x += Particle.INDENTIFY_NEG_QUAT;
    }
  };

  _proto.animate = function animate(p, dt) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var rotationRand = jsonAsset.pseudoRandom(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET);
    var renderMode = p.particleSystem.processor.getInfo().renderMode;

    if (!this._separateAxes || renderMode === RenderMode.VerticalBillboard || renderMode === RenderMode.HorizontalBillboard) {
      jsonAsset.Quat.fromEuler(p.deltaQuat, 0, 0, this.z.evaluate(normalizedTime, rotationRand) * dt * Particle.R2D);
    } else {
      jsonAsset.Quat.fromEuler(p.deltaQuat, this.x.evaluate(normalizedTime, rotationRand) * dt * Particle.R2D, this.y.evaluate(normalizedTime, rotationRand) * dt * Particle.R2D, this.z.evaluate(normalizedTime, rotationRand) * dt * Particle.R2D);
    }

    p.deltaMat = jsonAsset.Mat4.fromQuat(p.deltaMat, p.deltaQuat);
    p.localMat = p.localMat.multiply(p.deltaMat);
    this._startMat = jsonAsset.Mat4.fromQuat(this._startMat, p.startRotation);
    this._matRot = this._startMat.multiply(p.localMat);
    jsonAsset.Mat4.getRotation(this._quatRot, this._matRot);

    this._processRotation(p, Particle.R2D);

    p.rotation.set(this._quatRot.x, this._quatRot.y, this._quatRot.z);
  };

  jsonAsset._createClass(RotationOvertimeModule, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (this._enable === val) return;
      this._enable = val;
      if (!this.target) return;
      this.target.enableModule(this.name, val, this);
    }
  }, {
    key: "separateAxes",
    get: function get() {
      return this._separateAxes;
    },
    set: function set(val) {
      this._separateAxes = val;
    }
  }]);

  return RotationOvertimeModule;
}(ParticleModuleBase), _temp$8), (_descriptor$8 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "enable", [_dec2$8], Object.getOwnPropertyDescriptor(_class2$8.prototype, "enable"), _class2$8.prototype), _descriptor2$8 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_separateAxes", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "separateAxes", [_dec3$8, _dec4$7], Object.getOwnPropertyDescriptor(_class2$8.prototype, "separateAxes"), _class2$8.prototype), _descriptor3$7 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "x", [_dec5$6, jsonAsset.serializable, _dec6$5, jsonAsset.radian, _dec7$4, _dec8$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor4$7 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "y", [_dec9$4, jsonAsset.serializable, _dec10$3, jsonAsset.radian, _dec11$3, _dec12$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor5$6 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "z", [_dec13$3, jsonAsset.serializable, _dec14$3, jsonAsset.radian, _dec15$3, _dec16$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
})), _class2$8)) || _class$8);

var _dec$9, _dec2$9, _dec3$9, _dec4$8, _dec5$7, _dec6$6, _dec7$5, _dec8$5, _dec9$5, _dec10$4, _dec11$4, _dec12$4, _dec13$4, _dec14$4, _dec15$4, _dec16$4, _class$9, _class2$9, _descriptor$9, _descriptor2$9, _descriptor3$8, _descriptor4$8, _descriptor5$7, _descriptor6$5, _temp$9;
var SIZE_OVERTIME_RAND_OFFSET = ModuleRandSeed.SIZE;
var SizeOvertimeModule = (_dec$9 = jsonAsset.ccclass('cc.SizeOvertimeModule'), _dec2$9 = jsonAsset.displayOrder(), _dec3$9 = jsonAsset.displayOrder(), _dec4$8 = jsonAsset.tooltip(), _dec5$7 = jsonAsset.type(CurveRange), _dec6$6 = jsonAsset.displayOrder(), _dec7$5 = jsonAsset.tooltip(), _dec8$5 = jsonAsset.type(CurveRange), _dec9$5 = jsonAsset.displayOrder(), _dec10$4 = jsonAsset.tooltip(), _dec11$4 = jsonAsset.type(CurveRange), _dec12$4 = jsonAsset.displayOrder(), _dec13$4 = jsonAsset.tooltip(), _dec14$4 = jsonAsset.type(CurveRange), _dec15$4 = jsonAsset.displayOrder(), _dec16$4 = jsonAsset.tooltip(), _dec$9(_class$9 = (_class2$9 = (_temp$9 = function (_ParticleModuleBase) {
  jsonAsset._inheritsLoose(SizeOvertimeModule, _ParticleModuleBase);

  function SizeOvertimeModule() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ParticleModuleBase.call.apply(_ParticleModuleBase, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_enable", _descriptor$9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "separateAxes", _descriptor2$9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "size", _descriptor3$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "x", _descriptor4$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "y", _descriptor5$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "z", _descriptor6$5, jsonAsset._assertThisInitialized(_this));

    _this.name = PARTICLE_MODULE_NAME.SIZE;
    return _this;
  }

  var _proto = SizeOvertimeModule.prototype;

  _proto.animate = function animate(particle, dt) {
    if (!this.separateAxes) {
      jsonAsset.Vec3.multiplyScalar(particle.size, particle.startSize, this.size.evaluate(1 - particle.remainingLifetime / particle.startLifetime, jsonAsset.pseudoRandom(particle.randomSeed + SIZE_OVERTIME_RAND_OFFSET)));
    } else {
      var currLifetime = 1 - particle.remainingLifetime / particle.startLifetime;
      var sizeRand = jsonAsset.pseudoRandom(particle.randomSeed + SIZE_OVERTIME_RAND_OFFSET);
      particle.size.x = particle.startSize.x * this.x.evaluate(currLifetime, sizeRand);
      particle.size.y = particle.startSize.y * this.y.evaluate(currLifetime, sizeRand);
      particle.size.z = particle.startSize.z * this.z.evaluate(currLifetime, sizeRand);
    }
  };

  jsonAsset._createClass(SizeOvertimeModule, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (this._enable === val) return;
      this._enable = val;
      if (!this.target) return;
      this.target.enableModule(this.name, val, this);
    }
  }]);

  return SizeOvertimeModule;
}(ParticleModuleBase), _temp$9), (_descriptor$9 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "enable", [_dec2$9], Object.getOwnPropertyDescriptor(_class2$9.prototype, "enable"), _class2$9.prototype), _descriptor2$9 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "separateAxes", [jsonAsset.serializable, _dec3$9, _dec4$8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3$8 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "size", [_dec5$7, jsonAsset.serializable, _dec6$6, _dec7$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor4$8 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "x", [_dec8$5, jsonAsset.serializable, _dec9$5, _dec10$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor5$7 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "y", [_dec11$4, jsonAsset.serializable, _dec12$4, _dec13$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor6$5 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "z", [_dec14$4, jsonAsset.serializable, _dec15$4, _dec16$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
})), _class2$9)) || _class$9);

var _dec$a, _dec2$a, _dec3$a, _dec4$9, _dec5$8, _dec6$7, _dec7$6, _dec8$6, _dec9$6, _dec10$5, _dec11$5, _dec12$5, _dec13$5, _dec14$5, _dec15$5, _dec16$5, _dec17$3, _dec18$2, _dec19$2, _dec20$2, _dec21$2, _dec22$2, _dec23$2, _dec24$2, _dec25$2, _dec26$1, _dec27$1, _class$a, _class2$a, _descriptor$a, _descriptor2$a, _descriptor3$9, _descriptor4$9, _descriptor5$8, _descriptor6$6, _descriptor7$5, _descriptor8$2, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp$a;
var TEXTURE_ANIMATION_RAND_OFFSET = ModuleRandSeed.TEXTURE;
var Mode$3 = jsonAsset.Enum({
  Grid: 0
});
var Animation = jsonAsset.Enum({
  WholeSheet: 0,
  SingleRow: 1
});
var TextureAnimationModule = (_dec$a = jsonAsset.ccclass('cc.TextureAnimationModule'), _dec2$a = jsonAsset.formerlySerializedAs('numTilesX'), _dec3$a = jsonAsset.formerlySerializedAs('numTilesY'), _dec4$9 = jsonAsset.displayOrder(), _dec5$8 = jsonAsset.type(Mode$3), _dec6$7 = jsonAsset.type(Mode$3), _dec7$6 = jsonAsset.displayOrder(), _dec8$6 = jsonAsset.tooltip(), _dec9$6 = jsonAsset.displayOrder(), _dec10$5 = jsonAsset.tooltip(), _dec11$5 = jsonAsset.displayOrder(), _dec12$5 = jsonAsset.tooltip(), _dec13$5 = jsonAsset.type(Animation), _dec14$5 = jsonAsset.displayOrder(), _dec15$5 = jsonAsset.tooltip(), _dec16$5 = jsonAsset.type(CurveRange), _dec17$3 = jsonAsset.displayOrder(), _dec18$2 = jsonAsset.tooltip(), _dec19$2 = jsonAsset.type(CurveRange), _dec20$2 = jsonAsset.displayOrder(), _dec21$2 = jsonAsset.tooltip(), _dec22$2 = jsonAsset.displayOrder(), _dec23$2 = jsonAsset.tooltip(), _dec24$2 = jsonAsset.displayOrder(), _dec25$2 = jsonAsset.tooltip(), _dec26$1 = jsonAsset.displayOrder(), _dec27$1 = jsonAsset.tooltip(), _dec$a(_class$a = (_class2$a = (_temp$a = function (_ParticleModuleBase) {
  jsonAsset._inheritsLoose(TextureAnimationModule, _ParticleModuleBase);

  function TextureAnimationModule() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ParticleModuleBase.call.apply(_ParticleModuleBase, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_enable", _descriptor$a, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_numTilesX", _descriptor2$a, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_numTilesY", _descriptor3$9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_mode", _descriptor4$9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "animation", _descriptor5$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "frameOverTime", _descriptor6$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startFrame", _descriptor7$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "cycleCount", _descriptor8$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_flipU", _descriptor9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_flipV", _descriptor10, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_uvChannelMask", _descriptor11, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "randomRow", _descriptor12, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "rowIndex", _descriptor13, jsonAsset._assertThisInitialized(_this));

    _this.name = PARTICLE_MODULE_NAME.TEXTURE;
    return _this;
  }

  var _proto = TextureAnimationModule.prototype;

  _proto.init = function init(p) {
    p.startRow = Math.floor(Math.random() * this.numTilesY);
  };

  _proto.animate = function animate(p, dt) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var startFrame = this.startFrame.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) / (this.numTilesX * this.numTilesY);

    if (this.animation === Animation.WholeSheet) {
      p.frameIndex = jsonAsset.repeat(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
    } else if (this.animation === Animation.SingleRow) {
      var rowLength = 1 / this.numTilesY;

      if (this.randomRow) {
        var f = jsonAsset.repeat(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
        var from = p.startRow * rowLength;
        var to = from + rowLength;
        p.frameIndex = jsonAsset.lerp(from, to, f);
      } else {
        var _from = this.rowIndex * rowLength;

        var _to = _from + rowLength;

        p.frameIndex = jsonAsset.lerp(_from, _to, jsonAsset.repeat(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1));
      }
    }
  };

  jsonAsset._createClass(TextureAnimationModule, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (this._enable === val) return;
      this._enable = val;
      if (!this.target) return;
      this.target.updateMaterialParams();
      this.target.enableModule(this.name, val, this);
    }
  }, {
    key: "mode",
    get: function get() {
      return this._mode;
    },
    set: function set(val) {
      if (val !== Mode$3.Grid) {
        console.error('particle texture animation\'s sprites is not supported!');
      }
    }
  }, {
    key: "numTilesX",
    get: function get() {
      return this._numTilesX;
    },
    set: function set(val) {
      if (this._numTilesX !== val) {
        this._numTilesX = val;
        this.target.updateMaterialParams();
      }
    }
  }, {
    key: "numTilesY",
    get: function get() {
      return this._numTilesY;
    },
    set: function set(val) {
      if (this._numTilesY !== val) {
        this._numTilesY = val;
        this.target.updateMaterialParams();
      }
    }
  }, {
    key: "flipU",
    get: function get() {
      return this._flipU;
    },
    set: function set(val) {
      console.error('particle texture animation\'s flipU is not supported!');
    }
  }, {
    key: "flipV",
    get: function get() {
      return this._flipV;
    },
    set: function set(val) {
      console.error('particle texture animation\'s flipV is not supported!');
    }
  }, {
    key: "uvChannelMask",
    get: function get() {
      return this._uvChannelMask;
    },
    set: function set(val) {
      console.error('particle texture animation\'s uvChannelMask is not supported!');
    }
  }]);

  return TextureAnimationModule;
}(ParticleModuleBase), _temp$a), (_descriptor$a = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$a = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_numTilesX", [_dec2$a], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3$9 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_numTilesY", [_dec3$a], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "enable", [_dec4$9], Object.getOwnPropertyDescriptor(_class2$a.prototype, "enable"), _class2$a.prototype), _descriptor4$9 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_mode", [_dec5$8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode$3.Grid;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "mode", [_dec6$7, _dec7$6, _dec8$6], Object.getOwnPropertyDescriptor(_class2$a.prototype, "mode"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "numTilesX", [_dec9$6, _dec10$5], Object.getOwnPropertyDescriptor(_class2$a.prototype, "numTilesX"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "numTilesY", [_dec11$5, _dec12$5], Object.getOwnPropertyDescriptor(_class2$a.prototype, "numTilesY"), _class2$a.prototype), _descriptor5$8 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "animation", [_dec13$5, jsonAsset.serializable, _dec14$5, _dec15$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Animation.WholeSheet;
  }
}), _descriptor6$6 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "frameOverTime", [_dec16$5, jsonAsset.serializable, _dec17$3, _dec18$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor7$5 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "startFrame", [_dec19$2, jsonAsset.serializable, _dec20$2, _dec21$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor8$2 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "cycleCount", [jsonAsset.serializable, _dec22$2, _dec23$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor9 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_flipU", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor10 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_flipV", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor11 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_uvChannelMask", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return -1;
  }
}), _descriptor12 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "randomRow", [jsonAsset.serializable, _dec24$2, _dec25$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor13 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "rowIndex", [jsonAsset.serializable, _dec26$1, _dec27$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2$a)) || _class$a);

var _dec$b, _dec2$b, _dec3$b, _dec4$a, _dec5$9, _dec6$8, _dec7$7, _dec8$7, _dec9$7, _dec10$6, _dec11$6, _dec12$6, _dec13$6, _dec14$6, _dec15$6, _dec16$6, _dec17$4, _dec18$3, _dec19$3, _dec20$3, _dec21$3, _class$b, _class2$b, _descriptor$b, _descriptor2$b, _descriptor3$a, _descriptor4$a, _descriptor5$9, _descriptor6$7, _temp$b;
var VELOCITY_X_OVERTIME_RAND_OFFSET = ModuleRandSeed.VELOCITY_X;
var VELOCITY_Y_OVERTIME_RAND_OFFSET = ModuleRandSeed.VELOCITY_Y;
var VELOCITY_Z_OVERTIME_RAND_OFFSET = ModuleRandSeed.VELOCITY_Z;

var _temp_v3$2 = new jsonAsset.Vec3();

var VelocityOvertimeModule = (_dec$b = jsonAsset.ccclass('cc.VelocityOvertimeModule'), _dec2$b = jsonAsset.displayOrder(), _dec3$b = jsonAsset.type(CurveRange), _dec4$a = jsonAsset.range(), _dec5$9 = jsonAsset.displayOrder(), _dec6$8 = jsonAsset.tooltip(), _dec7$7 = jsonAsset.type(CurveRange), _dec8$7 = jsonAsset.range(), _dec9$7 = jsonAsset.displayOrder(), _dec10$6 = jsonAsset.tooltip(), _dec11$6 = jsonAsset.type(CurveRange), _dec12$6 = jsonAsset.range(), _dec13$6 = jsonAsset.displayOrder(), _dec14$6 = jsonAsset.tooltip(), _dec15$6 = jsonAsset.type(CurveRange), _dec16$6 = jsonAsset.range(), _dec17$4 = jsonAsset.displayOrder(), _dec18$3 = jsonAsset.tooltip(), _dec19$3 = jsonAsset.type(Space), _dec20$3 = jsonAsset.displayOrder(), _dec21$3 = jsonAsset.tooltip(), _dec$b(_class$b = (_class2$b = (_temp$b = function (_ParticleModuleBase) {
  jsonAsset._inheritsLoose(VelocityOvertimeModule, _ParticleModuleBase);

  jsonAsset._createClass(VelocityOvertimeModule, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (this._enable === val) return;
      this._enable = val;
      if (!this.target) return;
      this.target.enableModule(this.name, val, this);
    }
  }]);

  function VelocityOvertimeModule() {
    var _this;

    _this = _ParticleModuleBase.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_enable", _descriptor$b, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "x", _descriptor2$b, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "y", _descriptor3$a, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "z", _descriptor4$a, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "speedModifier", _descriptor5$9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "space", _descriptor6$7, jsonAsset._assertThisInitialized(_this));

    _this.rotation = void 0;
    _this.needTransform = void 0;
    _this.name = PARTICLE_MODULE_NAME.VELOCITY;
    _this.rotation = new jsonAsset.Quat();
    _this.speedModifier.constant = 1;
    _this.needTransform = false;
    _this.needUpdate = true;
    return _this;
  }

  var _proto = VelocityOvertimeModule.prototype;

  _proto.update = function update(space, worldTransform) {
    this.needTransform = calculateTransform(space, this.space, worldTransform, this.rotation);
  };

  _proto.animate = function animate(p, dt) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var vel = jsonAsset.Vec3.set(_temp_v3$2, this.x.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed ^ VELOCITY_X_OVERTIME_RAND_OFFSET)), this.y.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed ^ VELOCITY_Y_OVERTIME_RAND_OFFSET)), this.z.evaluate(normalizedTime, jsonAsset.pseudoRandom(p.randomSeed ^ VELOCITY_Z_OVERTIME_RAND_OFFSET)));

    if (this.needTransform) {
      jsonAsset.Vec3.transformQuat(vel, vel, this.rotation);
    }

    jsonAsset.Vec3.add(p.animatedVelocity, p.animatedVelocity, vel);
    jsonAsset.Vec3.add(p.ultimateVelocity, p.velocity, p.animatedVelocity);
    jsonAsset.Vec3.multiplyScalar(p.ultimateVelocity, p.ultimateVelocity, this.speedModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, jsonAsset.pseudoRandom(p.randomSeed + VELOCITY_X_OVERTIME_RAND_OFFSET)));
  };

  return VelocityOvertimeModule;
}(ParticleModuleBase), _temp$b), (_descriptor$b = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "enable", [_dec2$b], Object.getOwnPropertyDescriptor(_class2$b.prototype, "enable"), _class2$b.prototype), _descriptor2$b = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "x", [_dec3$b, jsonAsset.serializable, _dec4$a, _dec5$9, _dec6$8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor3$a = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "y", [_dec7$7, jsonAsset.serializable, _dec8$7, _dec9$7, _dec10$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor4$a = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "z", [_dec11$6, jsonAsset.serializable, _dec12$6, _dec13$6, _dec14$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor5$9 = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "speedModifier", [_dec15$6, jsonAsset.serializable, _dec16$6, _dec17$4, _dec18$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor6$7 = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "space", [_dec19$3, jsonAsset.serializable, _dec20$3, _dec21$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Space.Local;
  }
})), _class2$b)) || _class$b);

var _dec$c, _dec2$c, _class$c, _class2$c, _descriptor$c, _descriptor2$c, _descriptor3$b, _descriptor4$b, _temp$c;
var Burst = (_dec$c = jsonAsset.ccclass('cc.Burst'), _dec2$c = jsonAsset.type(CurveRange), _dec$c(_class$c = (_class2$c = (_temp$c = function () {
  jsonAsset._createClass(Burst, [{
    key: "time",
    get: function get() {
      return this._time;
    },
    set: function set(val) {
      this._time = val;
      this._curTime = val;
    }
  }, {
    key: "repeatCount",
    get: function get() {
      return this._repeatCount;
    },
    set: function set(val) {
      this._repeatCount = val;
      this._remainingCount = val;
    }
  }]);

  function Burst() {
    jsonAsset._initializerDefineProperty(this, "_time", _descriptor$c, this);

    jsonAsset._initializerDefineProperty(this, "_repeatCount", _descriptor2$c, this);

    jsonAsset._initializerDefineProperty(this, "repeatInterval", _descriptor3$b, this);

    jsonAsset._initializerDefineProperty(this, "count", _descriptor4$b, this);

    this._remainingCount = void 0;
    this._curTime = void 0;
    this._remainingCount = 0;
    this._curTime = 0.0;
  }

  var _proto = Burst.prototype;

  _proto.update = function update(psys, dt) {
    if (this._remainingCount === 0) {
      this._remainingCount = this._repeatCount;
      this._curTime = this._time;
    }

    if (this._remainingCount > 0) {
      var preFrameTime = jsonAsset.repeat(psys._time - psys.startDelay.evaluate(0, 1), psys.duration) - dt;
      preFrameTime = preFrameTime > 0.0 ? preFrameTime : 0.0;
      var curFrameTime = jsonAsset.repeat(psys.time - psys.startDelay.evaluate(0, 1), psys.duration);

      if (this._curTime >= preFrameTime && this._curTime < curFrameTime) {
        psys.emit(this.count.evaluate(this._curTime / psys.duration, 1), dt - (curFrameTime - this._curTime));
        this._curTime += this.repeatInterval;
        --this._remainingCount;
      }
    }
  };

  _proto.getMaxCount = function getMaxCount(psys) {
    return this.count.getMax() * Math.min(Math.ceil(psys.duration / this.repeatInterval), this.repeatCount);
  };

  return Burst;
}(), _temp$c), (_descriptor$c = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_time", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "time", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2$c.prototype, "time"), _class2$c.prototype), _descriptor2$c = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_repeatCount", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "repeatCount", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2$c.prototype, "repeatCount"), _class2$c.prototype), _descriptor3$b = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "repeatInterval", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4$b = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "count", [_dec2$c], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
})), _class2$c)) || _class$c);

var _dec$d, _dec2$d, _dec3$c, _dec4$b, _dec5$a, _dec6$9, _dec7$8, _dec8$8, _dec9$8, _dec10$7, _dec11$7, _dec12$7, _dec13$7, _dec14$7, _dec15$7, _dec16$7, _dec17$5, _dec18$4, _dec19$4, _dec20$4, _dec21$4, _dec22$3, _dec23$3, _dec24$3, _dec25$3, _dec26$2, _dec27$2, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _class$d, _class2$d, _descriptor$d, _descriptor2$d, _descriptor3$c, _descriptor4$c, _descriptor5$a, _descriptor6$8, _descriptor7$6, _descriptor8$3, _descriptor9$1, _descriptor10$1, _descriptor11$1, _descriptor12$1, _descriptor13$1, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _temp$d;

var _intermediVec = new jsonAsset.Vec3(0, 0, 0);

var _intermediArr = [];

var _unitBoxExtent = new jsonAsset.Vec3(0.5, 0.5, 0.5);

var ShapeModule = (_dec$d = jsonAsset.ccclass('cc.ShapeModule'), _dec2$d = jsonAsset.displayOrder(), _dec3$c = jsonAsset.tooltip(), _dec4$b = jsonAsset.displayOrder(), _dec5$a = jsonAsset.tooltip(), _dec6$9 = jsonAsset.displayOrder(), _dec7$8 = jsonAsset.tooltip(), _dec8$8 = jsonAsset.displayOrder(), _dec9$8 = jsonAsset.tooltip(), _dec10$7 = jsonAsset.displayOrder(), _dec11$7 = jsonAsset.tooltip(), _dec12$7 = jsonAsset.displayOrder(), _dec13$7 = jsonAsset.type(ShapeType), _dec14$7 = jsonAsset.formerlySerializedAs('shapeType'), _dec15$7 = jsonAsset.displayOrder(), _dec16$7 = jsonAsset.type(ShapeType), _dec17$5 = jsonAsset.tooltip(), _dec18$4 = jsonAsset.type(EmitLocation), _dec19$4 = jsonAsset.displayOrder(), _dec20$4 = jsonAsset.tooltip(), _dec21$4 = jsonAsset.displayOrder(), _dec22$3 = jsonAsset.tooltip(), _dec23$3 = jsonAsset.displayOrder(), _dec24$3 = jsonAsset.tooltip(), _dec25$3 = jsonAsset.displayOrder(), _dec26$2 = jsonAsset.tooltip(), _dec27$2 = jsonAsset.displayOrder(), _dec28 = jsonAsset.tooltip(), _dec29 = jsonAsset.displayOrder(), _dec30 = jsonAsset.tooltip(), _dec31 = jsonAsset.displayOrder(), _dec32 = jsonAsset.tooltip(), _dec33 = jsonAsset.type(ArcMode), _dec34 = jsonAsset.displayOrder(), _dec35 = jsonAsset.tooltip(), _dec36 = jsonAsset.visible(), _dec37 = jsonAsset.displayOrder(), _dec38 = jsonAsset.tooltip(), _dec39 = jsonAsset.type(CurveRange), _dec40 = jsonAsset.visible(), _dec41 = jsonAsset.displayOrder(), _dec42 = jsonAsset.tooltip(), _dec43 = jsonAsset.displayOrder(), _dec44 = jsonAsset.tooltip(), _dec45 = jsonAsset.displayOrder(), _dec46 = jsonAsset.tooltip(), _dec$d(_class$d = (_class2$d = (_temp$d = function () {
  jsonAsset._createClass(ShapeModule, [{
    key: "position",
    get: function get() {
      return this._position;
    },
    set: function set(val) {
      this._position = val;
      this.constructMat();
    }
  }, {
    key: "rotation",
    get: function get() {
      return this._rotation;
    },
    set: function set(val) {
      this._rotation = val;
      this.constructMat();
    }
  }, {
    key: "scale",
    get: function get() {
      return this._scale;
    },
    set: function set(val) {
      this._scale = val;
      this.constructMat();
    }
  }, {
    key: "arc",
    get: function get() {
      return jsonAsset.toDegree(this._arc);
    },
    set: function set(val) {
      this._arc = jsonAsset.toRadian(val);
    }
  }, {
    key: "angle",
    get: function get() {
      return Math.round(jsonAsset.toDegree(this._angle) * 100) / 100;
    },
    set: function set(val) {
      this._angle = jsonAsset.toRadian(val);
    }
  }, {
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      this._enable = val;
    }
  }, {
    key: "shapeType",
    get: function get() {
      return this._shapeType;
    },
    set: function set(val) {
      this._shapeType = val;

      switch (this._shapeType) {
        case ShapeType.Box:
          if (this.emitFrom === EmitLocation.Base) {
            this.emitFrom = EmitLocation.Volume;
          }

          break;

        case ShapeType.Cone:
          if (this.emitFrom === EmitLocation.Edge) {
            this.emitFrom = EmitLocation.Base;
          }

          break;

        case ShapeType.Sphere:
        case ShapeType.Hemisphere:
          if (this.emitFrom === EmitLocation.Base || this.emitFrom === EmitLocation.Edge) {
            this.emitFrom = EmitLocation.Volume;
          }

          break;
      }
    }
  }]);

  function ShapeModule() {
    jsonAsset._initializerDefineProperty(this, "_enable", _descriptor$d, this);

    jsonAsset._initializerDefineProperty(this, "_shapeType", _descriptor2$d, this);

    jsonAsset._initializerDefineProperty(this, "emitFrom", _descriptor3$c, this);

    jsonAsset._initializerDefineProperty(this, "alignToDirection", _descriptor4$c, this);

    jsonAsset._initializerDefineProperty(this, "randomDirectionAmount", _descriptor5$a, this);

    jsonAsset._initializerDefineProperty(this, "sphericalDirectionAmount", _descriptor6$8, this);

    jsonAsset._initializerDefineProperty(this, "randomPositionAmount", _descriptor7$6, this);

    jsonAsset._initializerDefineProperty(this, "radius", _descriptor8$3, this);

    jsonAsset._initializerDefineProperty(this, "radiusThickness", _descriptor9$1, this);

    jsonAsset._initializerDefineProperty(this, "arcMode", _descriptor10$1, this);

    jsonAsset._initializerDefineProperty(this, "arcSpread", _descriptor11$1, this);

    jsonAsset._initializerDefineProperty(this, "arcSpeed", _descriptor12$1, this);

    jsonAsset._initializerDefineProperty(this, "length", _descriptor13$1, this);

    jsonAsset._initializerDefineProperty(this, "boxThickness", _descriptor14, this);

    jsonAsset._initializerDefineProperty(this, "_position", _descriptor15, this);

    jsonAsset._initializerDefineProperty(this, "_rotation", _descriptor16, this);

    jsonAsset._initializerDefineProperty(this, "_scale", _descriptor17, this);

    jsonAsset._initializerDefineProperty(this, "_arc", _descriptor18, this);

    jsonAsset._initializerDefineProperty(this, "_angle", _descriptor19, this);

    this.mat = void 0;
    this.quat = void 0;
    this.particleSystem = void 0;
    this.lastTime = void 0;
    this.totalAngle = void 0;
    this.mat = new jsonAsset.Mat4();
    this.quat = new jsonAsset.Quat();
    this.particleSystem = null;
    this.lastTime = 0;
    this.totalAngle = 0;
  }

  var _proto = ShapeModule.prototype;

  _proto.onInit = function onInit(ps) {
    this.particleSystem = ps;
    this.constructMat();
    this.lastTime = this.particleSystem._time;
  };

  _proto.emit = function emit(p) {
    switch (this.shapeType) {
      case ShapeType.Box:
        boxEmit(this.emitFrom, this.boxThickness, p.position, p.velocity);
        break;

      case ShapeType.Circle:
        circleEmit(this.radius, this.radiusThickness, this.generateArcAngle(), p.position, p.velocity);
        break;

      case ShapeType.Cone:
        coneEmit(this.emitFrom, this.radius, this.radiusThickness, this.generateArcAngle(), this._angle, this.length, p.position, p.velocity);
        break;

      case ShapeType.Sphere:
        sphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
        break;

      case ShapeType.Hemisphere:
        hemisphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
        break;

      default:
        console.warn(this.shapeType + " shapeType is not supported by ShapeModule.");
    }

    if (this.randomPositionAmount > 0) {
      p.position.x += jsonAsset.randomRange(-this.randomPositionAmount, this.randomPositionAmount);
      p.position.y += jsonAsset.randomRange(-this.randomPositionAmount, this.randomPositionAmount);
      p.position.z += jsonAsset.randomRange(-this.randomPositionAmount, this.randomPositionAmount);
    }

    jsonAsset.Vec3.transformQuat(p.velocity, p.velocity, this.quat);
    jsonAsset.Vec3.transformMat4(p.position, p.position, this.mat);

    if (this.sphericalDirectionAmount > 0) {
      var sphericalVel = jsonAsset.Vec3.normalize(_intermediVec, p.position);
      jsonAsset.Vec3.lerp(p.velocity, p.velocity, sphericalVel, this.sphericalDirectionAmount);
    }

    this.lastTime = this.particleSystem._time;
  };

  _proto.constructMat = function constructMat() {
    jsonAsset.Quat.fromEuler(this.quat, this._rotation.x, this._rotation.y, this._rotation.z);
    jsonAsset.Mat4.fromRTS(this.mat, this.quat, this._position, this._scale);
  };

  _proto.generateArcAngle = function generateArcAngle() {
    if (this.arcMode === ArcMode.Random) {
      return jsonAsset.randomRange(0, this._arc);
    }

    var angle = this.totalAngle + 2 * Math.PI * this.arcSpeed.evaluate(this.particleSystem._time, 1) * (this.particleSystem._time - this.lastTime);
    this.totalAngle = angle;

    if (this.arcSpread !== 0) {
      angle = Math.floor(angle / (this._arc * this.arcSpread)) * this._arc * this.arcSpread;
    }

    switch (this.arcMode) {
      case ArcMode.Loop:
        return jsonAsset.repeat(angle, this._arc);

      case ArcMode.PingPong:
        return jsonAsset.pingPong(angle, this._arc);

      default:
        return jsonAsset.repeat(angle, this._arc);
    }
  };

  return ShapeModule;
}(), _temp$d), (jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "position", [_dec2$d, _dec3$c], Object.getOwnPropertyDescriptor(_class2$d.prototype, "position"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "rotation", [_dec4$b, _dec5$a], Object.getOwnPropertyDescriptor(_class2$d.prototype, "rotation"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "scale", [_dec6$9, _dec7$8], Object.getOwnPropertyDescriptor(_class2$d.prototype, "scale"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "arc", [_dec8$8, _dec9$8], Object.getOwnPropertyDescriptor(_class2$d.prototype, "arc"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "angle", [_dec10$7, _dec11$7], Object.getOwnPropertyDescriptor(_class2$d.prototype, "angle"), _class2$d.prototype), _descriptor$d = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "enable", [_dec12$7], Object.getOwnPropertyDescriptor(_class2$d.prototype, "enable"), _class2$d.prototype), _descriptor2$d = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_shapeType", [_dec13$7, _dec14$7, _dec15$7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return ShapeType.Cone;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "shapeType", [_dec16$7, _dec17$5], Object.getOwnPropertyDescriptor(_class2$d.prototype, "shapeType"), _class2$d.prototype), _descriptor3$c = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "emitFrom", [_dec18$4, jsonAsset.serializable, _dec19$4, _dec20$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return EmitLocation.Volume;
  }
}), _descriptor4$c = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "alignToDirection", [jsonAsset.serializable, _dec21$4, _dec22$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5$a = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "randomDirectionAmount", [jsonAsset.serializable, _dec23$3, _dec24$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6$8 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "sphericalDirectionAmount", [jsonAsset.serializable, _dec25$3, _dec26$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor7$6 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "randomPositionAmount", [jsonAsset.serializable, _dec27$2, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor8$3 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "radius", [jsonAsset.serializable, _dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor9$1 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "radiusThickness", [jsonAsset.serializable, _dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor10$1 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "arcMode", [_dec33, jsonAsset.serializable, _dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return ArcMode.Random;
  }
}), _descriptor11$1 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "arcSpread", [_dec36, jsonAsset.serializable, _dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor12$1 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "arcSpeed", [_dec39, _dec40, jsonAsset.serializable, _dec41, _dec42], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor13$1 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "length", [jsonAsset.serializable, _dec43, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor14 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "boxThickness", [jsonAsset.serializable, _dec45, _dec46], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3(0, 0, 0);
  }
}), _descriptor15 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_position", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3(0, 0, 0);
  }
}), _descriptor16 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_rotation", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3(0, 0, 0);
  }
}), _descriptor17 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_scale", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3(1, 1, 1);
  }
}), _descriptor18 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_arc", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.toRadian(360);
  }
}), _descriptor19 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_angle", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.toRadian(25);
  }
})), _class2$d)) || _class$d);

function sphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
  switch (emitFrom) {
    case EmitLocation.Volume:
      randomPointBetweenSphere(pos, radius * (1 - radiusThickness), radius);
      jsonAsset.Vec3.normalize(dir, pos);
      break;

    case EmitLocation.Shell:
      randomUnitVector(pos);
      jsonAsset.Vec3.multiplyScalar(pos, pos, radius);
      jsonAsset.Vec3.normalize(dir, pos);
      break;

    default:
      console.warn(emitFrom + " is not supported for sphere emitter.");
  }
}

function hemisphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
  switch (emitFrom) {
    case EmitLocation.Volume:
      randomPointBetweenSphere(pos, radius * (1 - radiusThickness), radius);

      if (pos.z > 0) {
        pos.z *= -1;
      }

      jsonAsset.Vec3.normalize(dir, pos);
      break;

    case EmitLocation.Shell:
      randomUnitVector(pos);
      jsonAsset.Vec3.multiplyScalar(pos, pos, radius);

      if (pos.z > 0) {
        pos.z *= -1;
      }

      jsonAsset.Vec3.normalize(dir, pos);
      break;

    default:
      console.warn(emitFrom + " is not supported for hemisphere emitter.");
  }
}

function coneEmit(emitFrom, radius, radiusThickness, theta, angle, length, pos, dir) {
  switch (emitFrom) {
    case EmitLocation.Base:
      randomPointBetweenCircleAtFixedAngle(pos, radius * (1 - radiusThickness), radius, theta);
      jsonAsset.Vec2.multiplyScalar(dir, pos, Math.sin(angle));
      dir.z = -Math.cos(angle) * radius;
      jsonAsset.Vec3.normalize(dir, dir);
      pos.z = 0;
      break;

    case EmitLocation.Shell:
      fixedAngleUnitVector2(pos, theta);
      jsonAsset.Vec2.multiplyScalar(dir, pos, Math.sin(angle));
      dir.z = -Math.cos(angle);
      jsonAsset.Vec3.normalize(dir, dir);
      jsonAsset.Vec2.multiplyScalar(pos, pos, radius);
      pos.z = 0;
      break;

    case EmitLocation.Volume:
      randomPointBetweenCircleAtFixedAngle(pos, radius * (1 - radiusThickness), radius, theta);
      jsonAsset.Vec2.multiplyScalar(dir, pos, Math.sin(angle));
      dir.z = -Math.cos(angle) * radius;
      jsonAsset.Vec3.normalize(dir, dir);
      pos.z = 0;
      jsonAsset.Vec3.add(pos, pos, jsonAsset.Vec3.multiplyScalar(_intermediVec, dir, length * jsonAsset.random() / -dir.z));
      break;

    default:
      console.warn(emitFrom + " is not supported for cone emitter.");
  }
}

function boxEmit(emitFrom, boxThickness, pos, dir) {
  switch (emitFrom) {
    case EmitLocation.Volume:
      randomPointInCube(pos, _unitBoxExtent);
      break;

    case EmitLocation.Shell:
      _intermediArr.splice(0, _intermediArr.length);

      _intermediArr.push(jsonAsset.randomRange(-0.5, 0.5));

      _intermediArr.push(jsonAsset.randomRange(-0.5, 0.5));

      _intermediArr.push(randomSign() * 0.5);

      randomSortArray(_intermediArr);
      applyBoxThickness(_intermediArr, boxThickness);
      jsonAsset.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);
      break;

    case EmitLocation.Edge:
      _intermediArr.splice(0, _intermediArr.length);

      _intermediArr.push(jsonAsset.randomRange(-0.5, 0.5));

      _intermediArr.push(randomSign() * 0.5);

      _intermediArr.push(randomSign() * 0.5);

      randomSortArray(_intermediArr);
      applyBoxThickness(_intermediArr, boxThickness);
      jsonAsset.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);
      break;

    default:
      console.warn(emitFrom + " is not supported for box emitter.");
  }

  jsonAsset.Vec3.copy(dir, particleEmitZAxis);
}

function circleEmit(radius, radiusThickness, theta, pos, dir) {
  randomPointBetweenCircleAtFixedAngle(pos, radius * (1 - radiusThickness), radius, theta);
  jsonAsset.Vec3.normalize(dir, pos);
}

function applyBoxThickness(pos, thickness) {
  if (thickness.x > 0) {
    pos[0] += 0.5 * jsonAsset.randomRange(-thickness.x, thickness.x);
    pos[0] = jsonAsset.clamp(pos[0], -0.5, 0.5);
  }

  if (thickness.y > 0) {
    pos[1] += 0.5 * jsonAsset.randomRange(-thickness.y, thickness.y);
    pos[1] = jsonAsset.clamp(pos[1], -0.5, 0.5);
  }

  if (thickness.z > 0) {
    pos[2] += 0.5 * jsonAsset.randomRange(-thickness.z, thickness.z);
    pos[2] = jsonAsset.clamp(pos[2], -0.5, 0.5);
  }
}

var _uvs = [0, 0, 1, 0, 0, 1, 1, 1];

var ParticleBatchModel = function (_scene$Model) {
  jsonAsset._inheritsLoose(ParticleBatchModel, _scene$Model);

  function ParticleBatchModel() {
    var _this;

    _this = _scene$Model.call(this) || this;
    _this._capacity = void 0;
    _this._vertAttrs = void 0;
    _this._vertSize = void 0;
    _this._vBuffer = void 0;
    _this._vertAttrsFloatCount = void 0;
    _this._vdataF32 = void 0;
    _this._vdataUint32 = void 0;
    _this._iaInfo = void 0;
    _this._iaInfoBuffer = void 0;
    _this._subMeshData = void 0;
    _this._mesh = void 0;
    _this._vertCount = 0;
    _this._indexCount = 0;
    _this._startTimeOffset = 0;
    _this._lifeTimeOffset = 0;
    _this._material = null;
    _this.type = view.ModelType.PARTICLE_BATCH;
    _this._capacity = 0;
    _this._vertAttrs = null;
    _this._vertSize = 0;
    _this._vBuffer = null;
    _this._vertAttrsFloatCount = 0;
    _this._vdataF32 = null;
    _this._vdataUint32 = null;
    _this._iaInfo = new jsonAsset.IndirectBuffer([new jsonAsset.DrawInfo()]);
    _this._iaInfoBuffer = _this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDIRECT, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.DRAW_INFO_SIZE, jsonAsset.DRAW_INFO_SIZE));
    _this._subMeshData = null;
    _this._mesh = null;
    return _this;
  }

  var _proto = ParticleBatchModel.prototype;

  _proto.setCapacity = function setCapacity(capacity) {
    var capChanged = this._capacity !== capacity;
    this._capacity = capacity;

    if (this._subMeshData && capChanged) {
      this.rebuild();
    }
  };

  _proto.setVertexAttributes = function setVertexAttributes(mesh, attrs) {
    if (this._mesh === mesh && this._vertAttrs === attrs) {
      return;
    }

    this._mesh = mesh;
    this._vertAttrs = attrs;
    this._vertSize = 0;

    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._vertAttrs), _step; !(_step = _iterator()).done;) {
      var a = _step.value;
      a.offset = this._vertSize;
      this._vertSize += jsonAsset.FormatInfos[a.format].size;
    }

    this._vertAttrsFloatCount = this._vertSize / 4;
    this.rebuild();
  };

  _proto.createSubMeshData = function createSubMeshData() {
    this.destroySubMeshData();
    this._vertCount = 4;
    this._indexCount = 6;

    if (this._mesh) {
      this._vertCount = this._mesh.struct.vertexBundles[this._mesh.struct.primitives[0].vertexBundelIndices[0]].view.count;
      this._indexCount = this._mesh.struct.primitives[0].indexView.count;
    }

    var vertexBuffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, this._vertSize * this._capacity * this._vertCount, this._vertSize));

    var vBuffer = new ArrayBuffer(this._vertSize * this._capacity * this._vertCount);

    if (this._mesh) {
      var vOffset = this._vertAttrs[this._vertAttrs.findIndex(function (val) {
        return val.name === jsonAsset.AttributeName.ATTR_TEX_COORD;
      })].offset;

      this._mesh.copyAttribute(0, jsonAsset.AttributeName.ATTR_TEX_COORD, vBuffer, this._vertSize, vOffset);

      var vIdx = this._vertAttrs.findIndex(function (val) {
        return val.name === jsonAsset.AttributeName.ATTR_TEX_COORD3;
      });

      vOffset = this._vertAttrs[vIdx++].offset;

      this._mesh.copyAttribute(0, jsonAsset.AttributeName.ATTR_POSITION, vBuffer, this._vertSize, vOffset);

      vOffset = this._vertAttrs[vIdx++].offset;

      this._mesh.copyAttribute(0, jsonAsset.AttributeName.ATTR_NORMAL, vBuffer, this._vertSize, vOffset);

      vOffset = this._vertAttrs[vIdx++].offset;

      if (!this._mesh.copyAttribute(0, jsonAsset.AttributeName.ATTR_COLOR, vBuffer, this._vertSize, vOffset)) {
        var vb = new Uint32Array(vBuffer);

        for (var iVertex = 0; iVertex < this._vertCount; ++iVertex) {
          vb[iVertex * this._vertAttrsFloatCount + vOffset / 4] = jsonAsset.Color$1.WHITE._val;
        }
      }

      var vbFloatArray = new Float32Array(vBuffer);

      for (var i = 1; i < this._capacity; i++) {
        vbFloatArray.copyWithin(i * this._vertSize * this._vertCount / 4, 0, this._vertSize * this._vertCount / 4);
      }
    }

    vertexBuffer.update(vBuffer);
    var indices = new Uint16Array(this._capacity * this._indexCount);

    if (this._mesh) {
      this._mesh.copyIndices(0, indices);

      for (var _i = 1; _i < this._capacity; _i++) {
        for (var j = 0; j < this._indexCount; j++) {
          indices[_i * this._indexCount + j] = indices[j] + _i * this._vertCount;
        }
      }
    } else {
      var dst = 0;

      for (var _i2 = 0; _i2 < this._capacity; ++_i2) {
        var baseIdx = 4 * _i2;
        indices[dst++] = baseIdx;
        indices[dst++] = baseIdx + 1;
        indices[dst++] = baseIdx + 2;
        indices[dst++] = baseIdx + 3;
        indices[dst++] = baseIdx + 2;
        indices[dst++] = baseIdx + 1;
      }
    }

    var indexBuffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, this._capacity * this._indexCount * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));

    indexBuffer.update(indices);
    this._iaInfo.drawInfos[0].vertexCount = this._capacity * this._vertCount;
    this._iaInfo.drawInfos[0].indexCount = this._capacity * this._indexCount;

    if (!this._iaInfoBuffer) {
      this._iaInfoBuffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDIRECT, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.DRAW_INFO_SIZE, jsonAsset.DRAW_INFO_SIZE));
    }

    this._iaInfoBuffer.update(this._iaInfo);

    this._subMeshData = new jsonAsset.RenderingSubMesh([vertexBuffer], this._vertAttrs, jsonAsset.PrimitiveMode.TRIANGLE_LIST, indexBuffer, this._iaInfoBuffer);
    this.initSubModel(0, this._subMeshData, this._material);
    return vBuffer;
  };

  _proto.updateMaterial = function updateMaterial(mat) {
    this._material = mat;
    this.setSubModelMaterial(0, mat);
  };

  _proto.addParticleVertexData = function addParticleVertexData(index, pvdata) {
    if (!this._mesh) {
      var offset = index * this._vertAttrsFloatCount;
      this._vdataF32[offset++] = pvdata[0].x;
      this._vdataF32[offset++] = pvdata[0].y;
      this._vdataF32[offset++] = pvdata[0].z;
      this._vdataF32[offset++] = pvdata[1].x;
      this._vdataF32[offset++] = pvdata[1].y;
      this._vdataF32[offset++] = pvdata[1].z;
      this._vdataF32[offset++] = pvdata[2].x;
      this._vdataF32[offset++] = pvdata[2].y;
      this._vdataF32[offset++] = pvdata[2].z;
      this._vdataF32[offset++] = pvdata[3].x;
      this._vdataF32[offset++] = pvdata[3].y;
      this._vdataF32[offset++] = pvdata[3].z;
      this._vdataUint32[offset++] = pvdata[4];

      if (pvdata[5]) {
        this._vdataF32[offset++] = pvdata[5].x;
        this._vdataF32[offset++] = pvdata[5].y;
        this._vdataF32[offset++] = pvdata[5].z;
      }
    } else {
      for (var i = 0; i < this._vertCount; i++) {
        var _offset = (index * this._vertCount + i) * this._vertAttrsFloatCount;

        this._vdataF32[_offset++] = pvdata[0].x;
        this._vdataF32[_offset++] = pvdata[0].y;
        this._vdataF32[_offset++] = pvdata[0].z;
        _offset += 2;
        this._vdataF32[_offset++] = pvdata[1].z;
        this._vdataF32[_offset++] = pvdata[2].x;
        this._vdataF32[_offset++] = pvdata[2].y;
        this._vdataF32[_offset++] = pvdata[2].z;
        this._vdataF32[_offset++] = pvdata[3].x;
        this._vdataF32[_offset++] = pvdata[3].y;
        this._vdataF32[_offset++] = pvdata[3].z;
        this._vdataUint32[_offset++] = pvdata[4];
      }
    }
  };

  _proto.addGPUParticleVertexData = function addGPUParticleVertexData(p, num, time) {
    var offset = num * this._vertAttrsFloatCount * this._vertCount;

    for (var i = 0; i < this._vertCount; i++) {
      var idx = offset;
      this._vdataF32[idx++] = p.position.x;
      this._vdataF32[idx++] = p.position.y;
      this._vdataF32[idx++] = p.position.z;
      this._vdataF32[idx++] = time;
      this._vdataF32[idx++] = p.startSize.x;
      this._vdataF32[idx++] = p.startSize.y;
      this._vdataF32[idx++] = p.startSize.z;
      this._vdataF32[idx++] = _uvs[2 * i];
      this._vdataF32[idx++] = p.rotation.x;
      this._vdataF32[idx++] = p.rotation.y;
      this._vdataF32[idx++] = p.rotation.z;
      this._vdataF32[idx++] = _uvs[2 * i + 1];
      this._vdataF32[idx++] = p.startColor.r / 255.0;
      this._vdataF32[idx++] = p.startColor.g / 255.0;
      this._vdataF32[idx++] = p.startColor.b / 255.0;
      this._vdataF32[idx++] = p.startColor.a / 255.0;
      this._vdataF32[idx++] = p.velocity.x;
      this._vdataF32[idx++] = p.velocity.y;
      this._vdataF32[idx++] = p.velocity.z;
      this._vdataF32[idx++] = p.startLifetime;
      this._vdataF32[idx++] = p.randomSeed;
      offset += this._vertAttrsFloatCount;
    }
  };

  _proto.updateGPUParticles = function updateGPUParticles(num, time, dt) {
    var pSize = this._vertAttrsFloatCount * this._vertCount;
    var pBaseIndex = 0;
    var startTime = 0;
    var lifeTime = 0;
    var lastBaseIndex = 0;
    var interval = 0;

    for (var i = 0; i < num; ++i) {
      pBaseIndex = i * pSize;
      startTime = this._vdataF32[pBaseIndex + this._startTimeOffset];
      lifeTime = this._vdataF32[pBaseIndex + this._lifeTimeOffset];
      interval = time - startTime;

      if (lifeTime - interval < dt) {
        lastBaseIndex = --num * pSize;

        this._vdataF32.copyWithin(pBaseIndex, lastBaseIndex, lastBaseIndex + pSize);

        i--;
      }
    }

    return num;
  };

  _proto.constructAttributeIndex = function constructAttributeIndex() {
    if (!this._vertAttrs) {
      return;
    }

    var vIdx = this._vertAttrs.findIndex(function (val) {
      return val.name === 'a_position_starttime';
    });

    var vOffset = this._vertAttrs[vIdx].offset;
    this._startTimeOffset = vOffset / 4 + 3;
    vIdx = this._vertAttrs.findIndex(function (val) {
      return val.name === 'a_dir_life';
    });
    vOffset = this._vertAttrs[vIdx].offset;
    this._lifeTimeOffset = vOffset / 4 + 3;
  };

  _proto.updateIA = function updateIA(count) {
    var ia = this._subModels[0].inputAssembler;
    ia.vertexBuffers[0].update(this._vdataF32);
    this._iaInfo.drawInfos[0].firstIndex = 0;
    this._iaInfo.drawInfos[0].indexCount = this._indexCount * count;

    this._iaInfoBuffer.update(this._iaInfo);
  };

  _proto.clear = function clear() {
    this._subModels[0].inputAssembler.indexCount = 0;
  };

  _proto.destroy = function destroy() {
    _scene$Model.prototype.destroy.call(this);

    this._vBuffer = null;
    this._vdataF32 = null;
    this.destroySubMeshData();

    if (this._iaInfoBuffer) {
      this._iaInfoBuffer.destroy();

      this._iaInfoBuffer = null;
    }
  };

  _proto.rebuild = function rebuild() {
    this._vBuffer = this.createSubMeshData();
    this._vdataF32 = new Float32Array(this._vBuffer);
    this._vdataUint32 = new Uint32Array(this._vBuffer);
  };

  _proto.destroySubMeshData = function destroySubMeshData() {
    if (this._subMeshData) {
      this._subMeshData.destroy();

      this._subMeshData = null;
      this._iaInfoBuffer = null;
    }
  };

  return ParticleBatchModel;
}(view.Model);

var ParticleSystemRendererBase = function () {
  function ParticleSystemRendererBase(info) {
    this._particleSystem = null;
    this._model = null;
    this._renderInfo = null;
    this._vertAttrs = [];
    this._renderInfo = info;
  }

  var _proto = ParticleSystemRendererBase.prototype;

  _proto.getInfo = function getInfo() {
    return this._renderInfo;
  };

  _proto.onInit = function onInit(ps) {
    this._particleSystem = ps;
  };

  _proto.onEnable = function onEnable() {
    if (!this._particleSystem) {
      return;
    }

    this.attachToScene();
    var model = this._model;

    if (model) {
      model.node = model.transform = this._particleSystem.node;
      model.enabled = this._particleSystem.enabledInHierarchy;
    }
  };

  _proto.onDisable = function onDisable() {
    this.detachFromScene();
  };

  _proto.onDestroy = function onDestroy() {
    if (this._model) {
      jsonAsset.legacyCC.director.root.destroyModel(this._model);
      this._model = null;
    }
  };

  _proto.attachToScene = function attachToScene() {
    if (this._model) {
      if (this._model.scene) {
        this.detachFromScene();
      }

      this._particleSystem._getRenderScene().addModel(this._model);
    }
  };

  _proto.detachFromScene = function detachFromScene() {
    if (this._model && this._model.scene) {
      this._model.scene.removeModel(this._model);
    }
  };

  _proto.setVertexAttributes = function setVertexAttributes() {
    if (this._model) {
      this._model.setVertexAttributes(this._renderInfo.renderMode === RenderMode.Mesh ? this._renderInfo.mesh : null, this._vertAttrs);
    }
  };

  _proto.clear = function clear() {
    if (this._model) this._model.enabled = false;
  };

  _proto._initModel = function _initModel() {
    if (!this._model) {
      this._model = jsonAsset.legacyCC.director.root.createModel(ParticleBatchModel);

      this._model.setCapacity(this._particleSystem.capacity);

      this._model.visFlags = this._particleSystem.visibility;
    }
  };

  _proto.updateTrailMaterial = function updateTrailMaterial() {};

  _proto.getDefaultTrailMaterial = function getDefaultTrailMaterial() {
    return null;
  };

  return ParticleSystemRendererBase;
}();

var _tempAttribUV = new jsonAsset.Vec3();

var _tempWorldTrans = new jsonAsset.Mat4();

var _anim_module = ['_colorOverLifetimeModule', '_sizeOvertimeModule', '_velocityOvertimeModule', '_forceOvertimeModule', '_limitVelocityOvertimeModule', '_rotationOvertimeModule', '_textureAnimationModule'];
var _uvs$1 = [0, 0, 1, 0, 0, 1, 1, 1];
var CC_USE_WORLD_SPACE$1 = 'CC_USE_WORLD_SPACE';
var CC_RENDER_MODE = 'CC_RENDER_MODE';
var RENDER_MODE_BILLBOARD = 0;
var RENDER_MODE_STRETCHED_BILLBOARD = 1;
var RENDER_MODE_HORIZONTAL_BILLBOARD = 2;
var RENDER_MODE_VERTICAL_BILLBOARD = 3;
var RENDER_MODE_MESH = 4;
var _vertex_attrs$1 = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD1, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD2, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA8, true)];
var _vertex_attrs_stretch = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD1, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD2, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA8, true), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR1, jsonAsset.Format.RGB32F)];
var _vertex_attrs_mesh = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD1, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD2, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA8, true), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD3, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_NORMAL, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR1, jsonAsset.Format.RGBA8, true)];
var _matInsInfo$1 = {
  parent: null,
  owner: null,
  subModelIdx: 0
};

var ParticleSystemRendererCPU = function (_ParticleSystemRender) {
  jsonAsset._inheritsLoose(ParticleSystemRendererCPU, _ParticleSystemRender);

  function ParticleSystemRendererCPU(info) {
    var _this;

    _this = _ParticleSystemRender.call(this, info) || this;
    _this._defines = void 0;
    _this._trailDefines = void 0;
    _this._frameTile_velLenScale = void 0;
    _this._tmp_velLenScale = void 0;
    _this._defaultMat = null;
    _this._node_scale = void 0;
    _this._attrs = void 0;
    _this._particles = null;
    _this._defaultTrailMat = null;
    _this._updateList = new Map();
    _this._animateList = new Map();
    _this._runAnimateList = new Array();
    _this._fillDataFunc = null;
    _this._uScaleHandle = 0;
    _this._uLenHandle = 0;
    _this._inited = false;
    _this._localMat = new jsonAsset.Mat4();
    _this._gravity = new jsonAsset.Vec4();
    _this._model = null;
    _this._frameTile_velLenScale = new jsonAsset.Vec4(1, 1, 0, 0);
    _this._tmp_velLenScale = _this._frameTile_velLenScale.clone();
    _this._node_scale = new jsonAsset.Vec4();
    _this._attrs = new Array(5);
    _this._defines = {
      CC_USE_WORLD_SPACE: true,
      CC_USE_BILLBOARD: true,
      CC_USE_STRETCHED_BILLBOARD: false,
      CC_USE_HORIZONTAL_BILLBOARD: false,
      CC_USE_VERTICAL_BILLBOARD: false
    };
    _this._trailDefines = {
      CC_USE_WORLD_SPACE: true
    };
    return _this;
  }

  var _proto = ParticleSystemRendererCPU.prototype;

  _proto.onInit = function onInit(ps) {
    var _this2 = this;

    _ParticleSystemRender.prototype.onInit.call(this, ps);

    this._particles = new jsonAsset.RecyclePool(function () {
      return new Particle(_this2);
    }, 16);

    this._setVertexAttrib();

    this._setFillFunc();

    this._initModuleList();

    this._initModel();

    this.updateMaterialParams();
    this.updateTrailMaterial();
    this.setVertexAttributes();
    this._inited = true;
  };

  _proto.clear = function clear() {
    _ParticleSystemRender.prototype.clear.call(this);

    this._particles.reset();

    if (this._particleSystem._trailModule) {
      this._particleSystem._trailModule.clear();
    }

    this.updateRenderData();
    this._model.enabled = false;
  };

  _proto.updateRenderMode = function updateRenderMode() {
    this._setVertexAttrib();

    this._setFillFunc();

    this.updateMaterialParams();
    this.setVertexAttributes();
  };

  _proto.getFreeParticle = function getFreeParticle() {
    if (this._particles.length >= this._particleSystem.capacity) {
      return null;
    }

    return this._particles.add();
  };

  _proto.getDefaultTrailMaterial = function getDefaultTrailMaterial() {
    return this._defaultTrailMat;
  };

  _proto.setNewParticle = function setNewParticle(p) {};

  _proto._initModuleList = function _initModuleList() {
    var _this3 = this;

    _anim_module.forEach(function (val) {
      var pm = _this3._particleSystem[val];

      if (pm && pm.enable) {
        if (pm.needUpdate) {
          _this3._updateList[pm.name] = pm;
        }

        if (pm.needAnimate) {
          _this3._animateList[pm.name] = pm;
        }
      }
    });

    this._runAnimateList.length = 0;

    for (var i = 0, len = PARTICLE_MODULE_ORDER.length; i < len; i++) {
      var p = this._animateList[PARTICLE_MODULE_ORDER[i]];

      if (p) {
        this._runAnimateList.push(p);
      }
    }
  };

  _proto.enableModule = function enableModule(name, val, pm) {
    if (val) {
      if (pm.needUpdate) {
        this._updateList[pm.name] = pm;
      }

      if (pm.needAnimate) {
        this._animateList[pm.name] = pm;
      }
    } else {
      delete this._animateList[name];
      delete this._updateList[name];
    }

    this._runAnimateList.length = 0;

    for (var i = 0, len = PARTICLE_MODULE_ORDER.length; i < len; i++) {
      var p = this._animateList[PARTICLE_MODULE_ORDER[i]];

      if (p) {
        this._runAnimateList.push(p);
      }
    }
  };

  _proto.updateParticles = function updateParticles(dt) {
    var _this4 = this;

    var ps = this._particleSystem;

    if (!ps) {
      return this._particles.length;
    }

    ps.node.getWorldMatrix(_tempWorldTrans);

    switch (ps.scaleSpace) {
      case Space.Local:
        ps.node.getScale(this._node_scale);
        break;

      case Space.World:
        ps.node.getWorldScale(this._node_scale);
        break;
    }

    var mat = ps.getMaterialInstance(0) || this._defaultMat;

    var pass = mat.passes[0];
    pass.setUniform(this._uScaleHandle, this._node_scale);

    this._updateList.forEach(function (value, key) {
      value.update(ps._simulationSpace, _tempWorldTrans);
    });

    var trailModule = ps._trailModule;
    var trailEnable = trailModule && trailModule.enable;

    if (trailEnable) {
      trailModule.update();
    }

    if (ps.simulationSpace === Space.Local) {
      var r = ps.node.getRotation();
      jsonAsset.Mat4.fromQuat(this._localMat, r);

      this._localMat.transpose();
    }

    var _loop = function _loop(_i) {
      var p = _this4._particles.data[_i];
      p.remainingLifetime -= dt;
      jsonAsset.Vec3.set(p.animatedVelocity, 0, 0, 0);

      if (p.remainingLifetime < 0.0) {
        if (trailEnable) {
          trailModule.removeParticle(p);
        }

        _this4._particles.removeAt(_i);

        --_i;
        i = _i;
        return "continue";
      }

      if (ps.simulationSpace === Space.Local) {
        var gravityFactor = -ps.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, jsonAsset.pseudoRandom(p.randomSeed)) * 9.8 * dt;
        _this4._gravity.x = 0.0;
        _this4._gravity.y = gravityFactor;
        _this4._gravity.z = 0.0;
        _this4._gravity.w = 1.0;
        _this4._gravity = _this4._gravity.transformMat4(_this4._localMat);
        p.velocity.x += _this4._gravity.x;
        p.velocity.y += _this4._gravity.y;
        p.velocity.z += _this4._gravity.z;
      } else {
        p.velocity.y -= ps.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, jsonAsset.pseudoRandom(p.randomSeed)) * 9.8 * dt;
      }

      jsonAsset.Vec3.copy(p.ultimateVelocity, p.velocity);

      _this4._runAnimateList.forEach(function (value) {
        value.animate(p, dt);
      });

      jsonAsset.Vec3.scaleAndAdd(p.position, p.position, p.ultimateVelocity, dt);

      if (trailEnable) {
        trailModule.animate(p, dt);
      }

      i = _i;
    };

    for (var i = 0; i < this._particles.length; ++i) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    this._model.enabled = this._particles.length > 0;
    return this._particles.length;
  };

  _proto.updateRenderData = function updateRenderData() {
    var idx = 0;

    for (var _i2 = 0; _i2 < this._particles.length; ++_i2) {
      var p = this._particles.data[_i2];
      var fi = 0;
      var textureModule = this._particleSystem._textureAnimationModule;

      if (textureModule && textureModule.enable) {
        fi = p.frameIndex;
      }

      idx = _i2 * 4;

      this._fillDataFunc(p, idx, fi);
    }
  };

  _proto.beforeRender = function beforeRender() {
    this._model.updateIA(this._particles.length);
  };

  _proto.getParticleCount = function getParticleCount() {
    return this._particles.length;
  };

  _proto.onMaterialModified = function onMaterialModified(index, material) {
    if (!this._inited) {
      return;
    }

    if (index === 0) {
      this.updateMaterialParams();
    } else {
      this.updateTrailMaterial();
    }
  };

  _proto.onRebuildPSO = function onRebuildPSO(index, material) {
    if (this._model && index === 0) {
      this._model.setSubModelMaterial(0, material);
    }

    var trailModule = this._particleSystem._trailModule;

    if (trailModule && trailModule._trailModel && index === 1) {
      trailModule._trailModel.setSubModelMaterial(0, material);
    }
  };

  _proto._setFillFunc = function _setFillFunc() {
    if (this._renderInfo.renderMode === RenderMode.Mesh) {
      this._fillDataFunc = this._fillMeshData;
    } else if (this._renderInfo.renderMode === RenderMode.StrecthedBillboard) {
      this._fillDataFunc = this._fillStrecthedData;
    } else {
      this._fillDataFunc = this._fillNormalData;
    }
  };

  _proto._fillMeshData = function _fillMeshData(p, idx, fi) {
    var i = idx / 4;
    this._attrs[0] = p.position;
    _tempAttribUV.z = fi;
    this._attrs[1] = _tempAttribUV;
    this._attrs[2] = p.size;
    this._attrs[3] = p.rotation;
    this._attrs[4] = p.color._val;

    this._model.addParticleVertexData(i, this._attrs);
  };

  _proto._fillStrecthedData = function _fillStrecthedData(p, idx, fi) {
    for (var j = 0; j < 4; ++j) {
      this._attrs[0] = p.position;
      _tempAttribUV.x = _uvs$1[2 * j];
      _tempAttribUV.y = _uvs$1[2 * j + 1];
      _tempAttribUV.z = fi;
      this._attrs[1] = _tempAttribUV;
      this._attrs[2] = p.size;
      this._attrs[3] = p.rotation;
      this._attrs[4] = p.color._val;
      this._attrs[5] = p.ultimateVelocity;
      this._attrs[6] = null;

      this._model.addParticleVertexData(idx++, this._attrs);
    }
  };

  _proto._fillNormalData = function _fillNormalData(p, idx, fi) {
    for (var j = 0; j < 4; ++j) {
      this._attrs[0] = p.position;
      _tempAttribUV.x = _uvs$1[2 * j];
      _tempAttribUV.y = _uvs$1[2 * j + 1];
      _tempAttribUV.z = fi;
      this._attrs[1] = _tempAttribUV;
      this._attrs[2] = p.size;
      this._attrs[3] = p.rotation;
      this._attrs[4] = p.color._val;
      this._attrs[5] = null;

      this._model.addParticleVertexData(idx++, this._attrs);
    }
  };

  _proto._setVertexAttrib = function _setVertexAttrib() {
    switch (this._renderInfo.renderMode) {
      case RenderMode.StrecthedBillboard:
        this._vertAttrs = _vertex_attrs_stretch.slice();
        break;

      case RenderMode.Mesh:
        this._vertAttrs = _vertex_attrs_mesh.slice();
        break;

      default:
        this._vertAttrs = _vertex_attrs$1.slice();
    }
  };

  _proto.updateMaterialParams = function updateMaterialParams() {
    if (!this._particleSystem) {
      return;
    }

    var ps = this._particleSystem;
    var shareMaterial = ps.sharedMaterial;

    if (shareMaterial != null) {
      var effectName = shareMaterial._effectAsset._name;
      this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0);

      if (effectName.indexOf('particle') === -1 || effectName.indexOf('particle-gpu') !== -1) {
        ps.setMaterial(null, 0);
      }
    }

    if (ps.sharedMaterial == null && this._defaultMat == null) {
      _matInsInfo$1.parent = jsonAsset.builtinResMgr.get('default-particle-material');
      _matInsInfo$1.owner = this._particleSystem;
      _matInsInfo$1.subModelIdx = 0;
      this._defaultMat = new view.MaterialInstance(_matInsInfo$1);
      _matInsInfo$1.parent = null;
      _matInsInfo$1.owner = null;
      _matInsInfo$1.subModelIdx = 0;

      if (this._renderInfo.mainTexture !== null) {
        this._defaultMat.setProperty('mainTexture', this._renderInfo.mainTexture);
      }
    }

    var mat = ps.getMaterialInstance(0) || this._defaultMat;

    if (ps._simulationSpace === Space.World) {
      this._defines[CC_USE_WORLD_SPACE$1] = true;
    } else {
      this._defines[CC_USE_WORLD_SPACE$1] = false;
    }

    var pass = mat.passes[0];
    this._uScaleHandle = pass.getHandle('scale');
    this._uLenHandle = pass.getHandle('frameTile_velLenScale');
    var renderMode = this._renderInfo.renderMode;
    var vlenScale = this._frameTile_velLenScale;

    if (renderMode === RenderMode.Billboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_BILLBOARD;
    } else if (renderMode === RenderMode.StrecthedBillboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_STRETCHED_BILLBOARD;
      vlenScale.z = this._renderInfo.velocityScale;
      vlenScale.w = this._renderInfo.lengthScale;
    } else if (renderMode === RenderMode.HorizontalBillboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_HORIZONTAL_BILLBOARD;
    } else if (renderMode === RenderMode.VerticalBillboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_VERTICAL_BILLBOARD;
    } else if (renderMode === RenderMode.Mesh) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_MESH;
    } else {
      console.warn("particle system renderMode " + renderMode + " not support.");
    }

    var textureModule = ps._textureAnimationModule;

    if (textureModule && textureModule.enable) {
      jsonAsset.Vec4.copy(this._tmp_velLenScale, vlenScale);
      jsonAsset.Vec2.set(this._tmp_velLenScale, textureModule.numTilesX, textureModule.numTilesY);
      pass.setUniform(this._uLenHandle, this._tmp_velLenScale);
    } else {
      pass.setUniform(this._uLenHandle, vlenScale);
    }

    mat.recompileShaders(this._defines);

    if (this._model) {
      this._model.updateMaterial(mat);
    }
  };

  _proto.updateTrailMaterial = function updateTrailMaterial() {
    if (!this._particleSystem) {
      return;
    }

    var ps = this._particleSystem;
    var trailModule = ps._trailModule;

    if (trailModule && trailModule.enable) {
      if (ps.simulationSpace === Space.World || trailModule.space === Space.World) {
        this._trailDefines[CC_USE_WORLD_SPACE$1] = true;
      } else {
        this._trailDefines[CC_USE_WORLD_SPACE$1] = false;
      }

      var mat = ps.getMaterialInstance(1);

      if (mat === null && this._defaultTrailMat === null) {
        _matInsInfo$1.parent = jsonAsset.builtinResMgr.get('default-trail-material');
        _matInsInfo$1.owner = this._particleSystem;
        _matInsInfo$1.subModelIdx = 1;
        this._defaultTrailMat = new view.MaterialInstance(_matInsInfo$1);
        _matInsInfo$1.parent = null;
        _matInsInfo$1.owner = null;
        _matInsInfo$1.subModelIdx = 0;
      }

      mat = mat || this._defaultTrailMat;
      mat.recompileShaders(this._trailDefines);
      trailModule.updateMaterial();
    }
  };

  return ParticleSystemRendererCPU;
}(ParticleSystemRendererBase);

var _tempWorldTrans$1 = new jsonAsset.Mat4();

var _tempVec4 = new jsonAsset.Vec4();

var _world_rot = new jsonAsset.Quat();

var _sample_num = 32;

var _sample_interval = 1.0 / _sample_num;

var CC_USE_WORLD_SPACE$2 = 'CC_USE_WORLD_SPACE';
var CC_RENDER_MODE$1 = 'CC_RENDER_MODE';
var RENDER_MODE_BILLBOARD$1 = 0;
var RENDER_MODE_STRETCHED_BILLBOARD$1 = 1;
var RENDER_MODE_HORIZONTAL_BILLBOARD$1 = 2;
var RENDER_MODE_VERTICAL_BILLBOARD$1 = 3;
var RENDER_MODE_MESH$1 = 4;
var COLOR_OVER_TIME_MODULE_ENABLE = 'COLOR_OVER_TIME_MODULE_ENABLE';
var ROTATION_OVER_TIME_MODULE_ENABLE = 'ROTATION_OVER_TIME_MODULE_ENABLE';
var SIZE_OVER_TIME_MODULE_ENABLE = 'SIZE_OVER_TIME_MODULE_ENABLE';
var VELOCITY_OVER_TIME_MODULE_ENABLE = 'VELOCITY_OVER_TIME_MODULE_ENABLE';
var FORCE_OVER_TIME_MODULE_ENABLE = 'FORCE_OVER_TIME_MODULE_ENABLE';
var TEXTURE_ANIMATION_MODULE_ENABLE = 'TEXTURE_ANIMATION_MODULE_ENABLE';
var _vert_attr_name = {
  POSITION_STARTTIME: 'a_position_starttime',
  VERT_SIZE_UV: 'a_size_uv',
  VERT_ROTATION_UV: 'a_rotation_uv',
  COLOR: 'a_color',
  DIR_LIFE: 'a_dir_life',
  RANDOM_SEED: 'a_rndSeed'
};
var _gpu_vert_attr = [new jsonAsset.Attribute(_vert_attr_name.POSITION_STARTTIME, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.VERT_SIZE_UV, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.VERT_ROTATION_UV, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.COLOR, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.DIR_LIFE, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.RANDOM_SEED, jsonAsset.Format.R32F)];
var _gpu_vert_attr_mesh = [new jsonAsset.Attribute(_vert_attr_name.POSITION_STARTTIME, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.VERT_SIZE_UV, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.VERT_ROTATION_UV, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.COLOR, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.DIR_LIFE, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(_vert_attr_name.RANDOM_SEED, jsonAsset.Format.R32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD3, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_NORMAL, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR1, jsonAsset.Format.RGBA8, true)];
var _matInsInfo$2 = {
  parent: null,
  owner: null,
  subModelIdx: 0
};

var ParticleSystemRendererGPU = function (_ParticleSystemRender) {
  jsonAsset._inheritsLoose(ParticleSystemRendererGPU, _ParticleSystemRender);

  function ParticleSystemRendererGPU(info) {
    var _this;

    _this = _ParticleSystemRender.call(this, info) || this;
    _this._defines = void 0;
    _this._frameTile_velLenScale = void 0;
    _this._unifrom_velLenScale = void 0;
    _this._tmp_velLenScale = void 0;
    _this._node_scale = void 0;
    _this._vertAttrs = [];
    _this._defaultMat = null;
    _this._particleNum = 0;
    _this._tempParticle = null;
    _this._colorTexture = null;
    _this._forceTexture = null;
    _this._velocityTexture = null;
    _this._rotationTexture = null;
    _this._sizeTexture = null;
    _this._animTexture = null;
    _this._uTimeHandle = 0;
    _this._uRotHandle = 0;
    _this._inited = false;
    _this._frameTile_velLenScale = new jsonAsset.Vec4(1, 1, 0, 0);
    _this._unifrom_velLenScale = _this._frameTile_velLenScale.clone();
    _this._tmp_velLenScale = _this._frameTile_velLenScale.clone();
    _this._node_scale = new jsonAsset.Vec4();
    _this._defines = {
      CC_USE_WORLD_SPACE: true,
      CC_USE_BILLBOARD: true,
      CC_USE_STRETCHED_BILLBOARD: false,
      CC_USE_HORIZONTAL_BILLBOARD: false,
      CC_USE_VERTICAL_BILLBOARD: false,
      COLOR_OVER_TIME_MODULE_ENABLE: false
    };
    _this._tempParticle = new Particle(null);
    _this._particleNum = 0;
    return _this;
  }

  var _proto = ParticleSystemRendererGPU.prototype;

  _proto.onInit = function onInit(ps) {
    _ParticleSystemRender.prototype.onInit.call(this, ps);

    this._setVertexAttrib();

    this._initModel();

    this.updateMaterialParams();
    this.setVertexAttributes();
    this._inited = true;
  };

  _proto.updateRenderMode = function updateRenderMode() {
    this._setVertexAttrib();

    this.updateMaterialParams();
    this.setVertexAttributes();
  };

  _proto.setVertexAttributes = function setVertexAttributes() {
    _ParticleSystemRender.prototype.setVertexAttributes.call(this);

    this._model.constructAttributeIndex();
  };

  _proto.clear = function clear() {
    _ParticleSystemRender.prototype.clear.call(this);

    this._particleNum = 0;
    this.updateRenderData();
  };

  _proto.onDestroy = function onDestroy() {
    _ParticleSystemRender.prototype.onDestroy.call(this);

    if (this._forceTexture) this._forceTexture.destroy();
    if (this._velocityTexture) this._velocityTexture.destroy();
    if (this._colorTexture) this._colorTexture.destroy();
    if (this._sizeTexture) this._sizeTexture.destroy();
    if (this._rotationTexture) this._rotationTexture.destroy();
    if (this._animTexture) this._animTexture.destroy();
  };

  _proto.enableModule = function enableModule(name, val, pm) {
    var mat = this._particleSystem.getMaterialInstance(0) || this._defaultMat;

    if (!mat) {
      return;
    }

    this.initShaderUniform(mat);
    mat.recompileShaders(this._defines);

    if (this._model) {
      this._model.setSubModelMaterial(0, mat);
    }
  };

  _proto.getFreeParticle = function getFreeParticle() {
    if (this._particleNum >= this._particleSystem._capacity) {
      return null;
    }

    return this._tempParticle;
  };

  _proto.setNewParticle = function setNewParticle(p) {
    this._model.addGPUParticleVertexData(p, this._particleNum, this._particleSystem._time);

    this._particleNum++;
  };

  _proto.updateParticles = function updateParticles(dt) {

    this._particleNum = this._model.updateGPUParticles(this._particleNum, this._particleSystem._time, dt);
    this.updateShaderUniform(dt);
    this._model.enabled = this._particleNum > 0;
    return this._particleNum;
  };

  _proto.updateRenderData = function updateRenderData() {};

  _proto.beforeRender = function beforeRender() {
    this._model.updateIA(this._particleNum);
  };

  _proto.updateShaderUniform = function updateShaderUniform(dt) {
    var mat = this._particleSystem.getMaterialInstance(0) || this._defaultMat;

    if (!mat) {
      return;
    }

    var pass = mat.passes[0];
    _tempVec4.x = this._particleSystem._time;
    _tempVec4.y = dt;
    pass.setUniform(this._uTimeHandle, _tempVec4);

    this._particleSystem.node.getWorldRotation(_world_rot);

    pass.setUniform(this._uRotHandle, _world_rot);
  };

  _proto.initShaderUniform = function initShaderUniform(mat) {
    var pass = mat.passes[0];
    this._uTimeHandle = pass.getHandle('u_timeDelta');
    this._uRotHandle = pass.getHandle('u_worldRot');
    pass.setUniform(pass.getHandle('scale'), this._node_scale);
    pass.setUniform(pass.getHandle('frameTile_velLenScale'), this._unifrom_velLenScale);
    _tempVec4.x = _sample_num;
    _tempVec4.y = _sample_interval;
    pass.setUniform(pass.getHandle('u_sampleInfo'), _tempVec4);
    var enable = false;
    var forceModule = this._particleSystem._forceOvertimeModule;
    enable = forceModule && forceModule.enable;
    this._defines[FORCE_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._forceTexture) this._forceTexture.destroy();
      this._forceTexture = packCurveRangeXYZ(_sample_num, forceModule.x, forceModule.y, forceModule.z);
      var handle = pass.getHandle('force_over_time_tex0');
      var binding = jsonAsset.Pass.getBindingFromHandle(handle);
      pass.bindSampler(binding, this._forceTexture.getGFXSampler());
      pass.bindTexture(binding, this._forceTexture.getGFXTexture());
      var spaceHandle = pass.getHandle('u_force_space');
      pass.setUniform(spaceHandle, forceModule.space);
      var modeHandle = pass.getHandle('u_force_mode');
      pass.setUniform(modeHandle, this._forceTexture.height);
    }

    var velocityModule = this._particleSystem._velocityOvertimeModule;
    enable = velocityModule && velocityModule.enable;
    this._defines[VELOCITY_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._velocityTexture) this._velocityTexture.destroy();
      this._velocityTexture = packCurveRangeXYZW(_sample_num, velocityModule.x, velocityModule.y, velocityModule.z, velocityModule.speedModifier);

      var _handle = pass.getHandle('velocity_over_time_tex0');

      var _binding = jsonAsset.Pass.getBindingFromHandle(_handle);

      pass.bindSampler(_binding, this._velocityTexture.getGFXSampler());
      pass.bindTexture(_binding, this._velocityTexture.getGFXTexture());

      var _spaceHandle = pass.getHandle('u_velocity_space');

      pass.setUniform(_spaceHandle, velocityModule.space);

      var _modeHandle = pass.getHandle('u_velocity_mode');

      pass.setUniform(_modeHandle, this._velocityTexture.height);
    }

    var colorModule = this._particleSystem._colorOverLifetimeModule;
    enable = colorModule && colorModule.enable;
    this._defines[COLOR_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._colorTexture) this._colorTexture.destroy();
      this._colorTexture = packGradientRange(_sample_num, colorModule.color);

      var _handle2 = pass.getHandle('color_over_time_tex0');

      var _binding2 = jsonAsset.Pass.getBindingFromHandle(_handle2);

      pass.bindSampler(_binding2, this._colorTexture.getGFXSampler());
      pass.bindTexture(_binding2, this._colorTexture.getGFXTexture());

      var _modeHandle2 = pass.getHandle('u_color_mode');

      pass.setUniform(_modeHandle2, this._colorTexture.height);
    }

    var roationModule = this._particleSystem._rotationOvertimeModule;
    enable = roationModule && roationModule.enable;
    this._defines[ROTATION_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._rotationTexture) this._rotationTexture.destroy();

      if (roationModule.separateAxes) {
        this._rotationTexture = packCurveRangeXYZ(_sample_num, roationModule.x, roationModule.y, roationModule.z);
      } else {
        this._rotationTexture = packCurveRangeZ(_sample_num, roationModule.z);
      }

      var _handle3 = pass.getHandle('rotation_over_time_tex0');

      var _binding3 = jsonAsset.Pass.getBindingFromHandle(_handle3);

      pass.bindSampler(_binding3, this._rotationTexture.getGFXSampler());
      pass.bindTexture(_binding3, this._rotationTexture.getGFXTexture());

      var _modeHandle3 = pass.getHandle('u_rotation_mode');

      pass.setUniform(_modeHandle3, this._rotationTexture.height);
    }

    var sizeModule = this._particleSystem._sizeOvertimeModule;
    enable = sizeModule && sizeModule.enable;
    this._defines[SIZE_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._sizeTexture) this._sizeTexture.destroy();

      if (sizeModule.separateAxes) {
        this._sizeTexture = packCurveRangeXYZ(_sample_num, sizeModule.x, sizeModule.y, sizeModule.z, true);
      } else {
        this._sizeTexture = packCurveRangeN(_sample_num, sizeModule.size, true);
      }

      var _handle4 = pass.getHandle('size_over_time_tex0');

      var _binding4 = jsonAsset.Pass.getBindingFromHandle(_handle4);

      pass.bindSampler(_binding4, this._sizeTexture.getGFXSampler());
      pass.bindTexture(_binding4, this._sizeTexture.getGFXTexture());

      var _modeHandle4 = pass.getHandle('u_size_mode');

      pass.setUniform(_modeHandle4, this._sizeTexture.height);
    }

    var textureModule = this._particleSystem._textureAnimationModule;
    enable = textureModule && textureModule.enable;
    this._defines[TEXTURE_ANIMATION_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._animTexture) this._animTexture.destroy();
      this._animTexture = packCurveRangeXY(_sample_num, textureModule.startFrame, textureModule.frameOverTime);

      var _handle5 = pass.getHandle('texture_animation_tex0');

      var _binding5 = jsonAsset.Pass.getBindingFromHandle(_handle5);

      pass.bindSampler(_binding5, this._animTexture.getGFXSampler());
      pass.bindTexture(_binding5, this._animTexture.getGFXTexture());
      var infoHandle = pass.getHandle('u_anim_info');
      _tempVec4.x = this._animTexture.height;
      _tempVec4.y = textureModule.numTilesX * textureModule.numTilesY;
      _tempVec4.z = textureModule.cycleCount;
      pass.setUniform(infoHandle, _tempVec4);
    }
  };

  _proto.getParticleCount = function getParticleCount() {
    return this._particleNum;
  };

  _proto.onMaterialModified = function onMaterialModified(index, material) {
    if (!this._inited) {
      return;
    }

    this.updateMaterialParams();
  };

  _proto.onRebuildPSO = function onRebuildPSO(index, material) {
    if (this._model && index === 0) {
      this._model.setSubModelMaterial(0, material);
    }
  };

  _proto._setVertexAttrib = function _setVertexAttrib() {
    switch (this._renderInfo.renderMode) {
      case RenderMode.StrecthedBillboard:
        this._vertAttrs = _gpu_vert_attr.slice();
        break;

      case RenderMode.Mesh:
        this._vertAttrs = _gpu_vert_attr_mesh.slice();
        break;

      default:
        this._vertAttrs = _gpu_vert_attr.slice();
    }
  };

  _proto.updateMaterialParams = function updateMaterialParams() {
    if (!this._particleSystem) {
      return;
    }

    var ps = this._particleSystem;
    var shareMaterial = ps.sharedMaterial;

    if (shareMaterial !== null) {
      var effectName = shareMaterial._effectAsset._name;
      this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0);

      if (effectName.indexOf('particle-gpu') === -1) {
        this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0);

        this._particleSystem.setMaterial(null, 0);
      }
    }

    if (ps.sharedMaterial == null && this._defaultMat == null) {
      _matInsInfo$2.parent = jsonAsset.builtinResMgr.get('default-particle-gpu-material');
      _matInsInfo$2.owner = ps;
      _matInsInfo$2.subModelIdx = 0;
      this._defaultMat = new view.MaterialInstance(_matInsInfo$2);
      _matInsInfo$2.parent = null;
      _matInsInfo$2.owner = null;
      _matInsInfo$2.subModelIdx = 0;

      if (this._renderInfo.mainTexture !== null) {
        this._defaultMat.setProperty('mainTexture', this._renderInfo.mainTexture);
      }
    }

    var mat = ps.getMaterialInstance(0) || this._defaultMat;

    ps.node.getWorldMatrix(_tempWorldTrans$1);

    switch (ps.scaleSpace) {
      case Space.Local:
        ps.node.getScale(this._node_scale);
        break;

      case Space.World:
        ps.node.getWorldScale(this._node_scale);
        break;
    }

    if (ps._simulationSpace === Space.World) {
      this._defines[CC_USE_WORLD_SPACE$2] = true;
    } else {
      this._defines[CC_USE_WORLD_SPACE$2] = false;
    }

    var renderMode = this._renderInfo.renderMode;

    if (renderMode === RenderMode.Billboard) {
      this._defines[CC_RENDER_MODE$1] = RENDER_MODE_BILLBOARD$1;
    } else if (renderMode === RenderMode.StrecthedBillboard) {
      this._defines[CC_RENDER_MODE$1] = RENDER_MODE_STRETCHED_BILLBOARD$1;
      this._frameTile_velLenScale.z = this._renderInfo.velocityScale;
      this._frameTile_velLenScale.w = this._renderInfo.lengthScale;
    } else if (renderMode === RenderMode.HorizontalBillboard) {
      this._defines[CC_RENDER_MODE$1] = RENDER_MODE_HORIZONTAL_BILLBOARD$1;
    } else if (renderMode === RenderMode.VerticalBillboard) {
      this._defines[CC_RENDER_MODE$1] = RENDER_MODE_VERTICAL_BILLBOARD$1;
    } else if (renderMode === RenderMode.Mesh) {
      this._defines[CC_RENDER_MODE$1] = RENDER_MODE_MESH$1;
    } else {
      console.warn("particle system renderMode " + renderMode + " not support.");
    }

    var textureModule = ps._textureAnimationModule;

    if (textureModule && textureModule.enable) {
      jsonAsset.Vec2.set(this._frameTile_velLenScale, textureModule.numTilesX, textureModule.numTilesY);
      jsonAsset.Vec4.copy(this._unifrom_velLenScale, this._frameTile_velLenScale);
    } else {
      this._tmp_velLenScale.z = this._frameTile_velLenScale.z;
      this._tmp_velLenScale.w = this._frameTile_velLenScale.w;
      jsonAsset.Vec4.copy(this._unifrom_velLenScale, this._tmp_velLenScale);
    }

    this.initShaderUniform(mat);
    mat.recompileShaders(this._defines);

    if (this._model) {
      this._model.updateMaterial(mat);
    }
  };

  return ParticleSystemRendererGPU;
}(ParticleSystemRendererBase);

var _dec$e, _dec2$e, _dec3$d, _dec4$c, _dec5$b, _dec6$a, _dec7$9, _dec8$9, _dec9$9, _dec10$8, _dec11$8, _dec12$8, _dec13$8, _dec14$8, _dec15$8, _dec16$8, _dec17$6, _dec18$5, _dec19$5, _dec20$5, _class$e, _class2$e, _descriptor$e, _descriptor2$e, _descriptor3$d, _descriptor4$d, _descriptor5$b, _descriptor6$9, _temp$e;

function isSupportGPUParticle() {
  var device = index.director.root.device;

  if (device.capabilities.maxVertexTextureUnits >= 8 && device.hasFeature(jsonAsset.Feature.TEXTURE_FLOAT)) {
    return true;
  }

  jsonAsset.legacyCC.warn('Maybe the device has restrictions on vertex textures or does not support float textures.');
  return false;
}

var ParticleSystemRenderer = (_dec$e = jsonAsset.ccclass('cc.ParticleSystemRenderer'), _dec2$e = jsonAsset.type(RenderMode), _dec3$d = jsonAsset.displayOrder(), _dec4$c = jsonAsset.tooltip(), _dec5$b = jsonAsset.displayOrder(), _dec6$a = jsonAsset.tooltip(), _dec7$9 = jsonAsset.displayOrder(), _dec8$9 = jsonAsset.tooltip(), _dec9$9 = jsonAsset.type(RenderMode), _dec10$8 = jsonAsset.type(mesh.Mesh), _dec11$8 = jsonAsset.displayOrder(), _dec12$8 = jsonAsset.tooltip(), _dec13$8 = jsonAsset.type(jsonAsset.Material), _dec14$8 = jsonAsset.displayOrder(), _dec15$8 = jsonAsset.tooltip(), _dec16$8 = jsonAsset.type(jsonAsset.Material), _dec17$6 = jsonAsset.displayOrder(), _dec18$5 = jsonAsset.tooltip(), _dec19$5 = jsonAsset.displayOrder(), _dec20$5 = jsonAsset.tooltip(), _dec$e(_class$e = (_class2$e = (_temp$e = function () {
  function ParticleSystemRenderer() {
    jsonAsset._initializerDefineProperty(this, "_renderMode", _descriptor$e, this);

    jsonAsset._initializerDefineProperty(this, "_velocityScale", _descriptor2$e, this);

    jsonAsset._initializerDefineProperty(this, "_lengthScale", _descriptor3$d, this);

    jsonAsset._initializerDefineProperty(this, "_mesh", _descriptor4$d, this);

    jsonAsset._initializerDefineProperty(this, "_mainTexture", _descriptor5$b, this);

    jsonAsset._initializerDefineProperty(this, "_useGPU", _descriptor6$9, this);

    this._particleSystem = null;
  }

  var _proto = ParticleSystemRenderer.prototype;

  _proto.create = function create(ps) {
    if (this._particleSystem === null) {
      this._particleSystem = ps;
    } else if (this._particleSystem !== ps) {
      jsonAsset.errorID(6033);
    }
  };

  _proto.onInit = function onInit(ps) {
    this.create(ps);

    if (!this._particleSystem.processor) {
      var useGPU = this._useGPU && isSupportGPUParticle();
      this._particleSystem.processor = useGPU ? new ParticleSystemRendererGPU(this) : new ParticleSystemRendererCPU(this);

      this._particleSystem.processor.onInit(ps);
    } else {
      jsonAsset.errorID(6034);
    }
  };

  _proto._switchProcessor = function _switchProcessor() {
    if (!this._particleSystem) {
      return;
    }

    if (this._particleSystem.processor) {
      this._particleSystem.processor.detachFromScene();

      this._particleSystem.processor.clear();

      this._particleSystem.processor = null;
    }

    this._particleSystem.processor = this._useGPU ? new ParticleSystemRendererGPU(this) : new ParticleSystemRendererCPU(this);

    this._particleSystem.processor.onInit(this._particleSystem);

    this._particleSystem.processor.onEnable();

    this._particleSystem.bindModule();
  };

  jsonAsset._createClass(ParticleSystemRenderer, [{
    key: "renderMode",
    get: function get() {
      return this._renderMode;
    },
    set: function set(val) {
      if (this._renderMode === val) {
        return;
      }

      this._renderMode = val;

      if (this._particleSystem) {
        this._particleSystem.processor.updateRenderMode();
      }
    }
  }, {
    key: "velocityScale",
    get: function get() {
      return this._velocityScale;
    },
    set: function set(val) {
      this._velocityScale = val;

      if (this._particleSystem) {
        this._particleSystem.processor.updateMaterialParams();
      }
    }
  }, {
    key: "lengthScale",
    get: function get() {
      return this._lengthScale;
    },
    set: function set(val) {
      this._lengthScale = val;

      if (this._particleSystem) {
        this._particleSystem.processor.updateMaterialParams();
      }
    }
  }, {
    key: "mesh",
    get: function get() {
      return this._mesh;
    },
    set: function set(val) {
      this._mesh = val;

      if (this._particleSystem) {
        this._particleSystem.processor.setVertexAttributes();
      }
    }
  }, {
    key: "particleMaterial",
    get: function get() {
      if (!this._particleSystem) {
        return null;
      }

      return this._particleSystem.getMaterial(0);
    },
    set: function set(val) {
      if (this._particleSystem) {
        this._particleSystem.setMaterial(val, 0);
      }
    }
  }, {
    key: "trailMaterial",
    get: function get() {
      if (!this._particleSystem) {
        return null;
      }

      return this._particleSystem.getMaterial(1);
    },
    set: function set(val) {
      if (this._particleSystem) {
        this._particleSystem.setMaterial(val, 1);
      }
    }
  }, {
    key: "mainTexture",
    get: function get() {
      return this._mainTexture;
    },
    set: function set(val) {
      this._mainTexture = val;
    }
  }, {
    key: "useGPU",
    get: function get() {
      return this._useGPU;
    },
    set: function set(val) {
      if (this._useGPU === val) {
        return;
      }

      if (!isSupportGPUParticle()) {
        this._useGPU = false;
      } else {
        this._useGPU = val;
      }

      this._switchProcessor();
    }
  }]);

  return ParticleSystemRenderer;
}(), _temp$e), (jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "renderMode", [_dec2$e, _dec3$d, _dec4$c], Object.getOwnPropertyDescriptor(_class2$e.prototype, "renderMode"), _class2$e.prototype), jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "velocityScale", [_dec5$b, _dec6$a], Object.getOwnPropertyDescriptor(_class2$e.prototype, "velocityScale"), _class2$e.prototype), jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "lengthScale", [_dec7$9, _dec8$9], Object.getOwnPropertyDescriptor(_class2$e.prototype, "lengthScale"), _class2$e.prototype), _descriptor$e = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_renderMode", [_dec9$9, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return RenderMode.Billboard;
  }
}), _descriptor2$e = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_velocityScale", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor3$d = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_lengthScale", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4$d = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_mesh", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "mesh", [_dec10$8, _dec11$8, _dec12$8], Object.getOwnPropertyDescriptor(_class2$e.prototype, "mesh"), _class2$e.prototype), jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "particleMaterial", [_dec13$8, _dec14$8, _dec15$8], Object.getOwnPropertyDescriptor(_class2$e.prototype, "particleMaterial"), _class2$e.prototype), jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "trailMaterial", [_dec16$8, _dec17$6, _dec18$5], Object.getOwnPropertyDescriptor(_class2$e.prototype, "trailMaterial"), _class2$e.prototype), _descriptor5$b = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_mainTexture", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6$9 = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_useGPU", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "useGPU", [_dec19$5, _dec20$5], Object.getOwnPropertyDescriptor(_class2$e.prototype, "useGPU"), _class2$e.prototype)), _class2$e)) || _class$e);

var _dec$f, _dec2$f, _dec3$e, _dec4$d, _dec5$c, _dec6$b, _dec7$a, _dec8$a, _dec9$a, _dec10$9, _dec11$9, _dec12$9, _dec13$9, _dec14$9, _dec15$9, _dec16$9, _dec17$7, _dec18$6, _dec19$6, _dec20$6, _dec21$5, _dec22$4, _dec23$4, _dec24$4, _dec25$4, _dec26$3, _dec27$3, _dec28$1, _dec29$1, _dec30$1, _class$f, _class2$f, _descriptor$f, _descriptor2$f, _descriptor3$e, _descriptor4$e, _descriptor5$c, _descriptor6$a, _descriptor7$7, _descriptor8$4, _descriptor9$2, _descriptor10$2, _descriptor11$2, _descriptor12$2, _descriptor13$2, _temp$f;
var PRE_TRIANGLE_INDEX = 1;
var NEXT_TRIANGLE_INDEX = 1 << 2;
var DIRECTION_THRESHOLD = Math.cos(jsonAsset.toRadian(100));
var _temp_trailEle = {
  position: new jsonAsset.Vec3(),
  velocity: new jsonAsset.Vec3()
};

var _temp_quat = new jsonAsset.Quat();

var _temp_xform = new jsonAsset.Mat4();

var _temp_vec3 = new jsonAsset.Vec3();

var _temp_vec3_1 = new jsonAsset.Vec3();

var _temp_color = new jsonAsset.Color$1();

var TrailSegment = function () {
  function TrailSegment(maxTrailElementNum) {
    this.start = void 0;
    this.end = void 0;
    this.trailElements = void 0;
    this.start = -1;
    this.end = -1;
    this.trailElements = [];

    while (maxTrailElementNum--) {
      this.trailElements.push({
        position: new jsonAsset.Vec3(),
        lifetime: 0,
        width: 0,
        velocity: new jsonAsset.Vec3(),
        direction: 0,
        color: new jsonAsset.Color$1()
      });
    }
  }

  var _proto = TrailSegment.prototype;

  _proto.getElement = function getElement(idx) {
    if (this.start === -1) {
      return null;
    }

    if (idx < 0) {
      idx = (idx + this.trailElements.length) % this.trailElements.length;
    }

    if (idx >= this.trailElements.length) {
      idx %= this.trailElements.length;
    }

    return this.trailElements[idx];
  };

  _proto.addElement = function addElement() {
    if (this.trailElements.length === 0) {
      return null;
    }

    if (this.start === -1) {
      this.start = 0;
      this.end = 1;
      return this.trailElements[0];
    }

    if (this.start === this.end) {
      this.trailElements.splice(this.end, 0, {
        position: new jsonAsset.Vec3(),
        lifetime: 0,
        width: 0,
        velocity: new jsonAsset.Vec3(),
        direction: 0,
        color: new jsonAsset.Color$1()
      });
      this.start++;
      this.start %= this.trailElements.length;
    }

    var newEleLoc = this.end++;
    this.end %= this.trailElements.length;
    return this.trailElements[newEleLoc];
  };

  _proto.iterateElement = function iterateElement(target, f, p, dt) {
    var end = this.start >= this.end ? this.end + this.trailElements.length : this.end;

    for (var i = this.start; i < end; i++) {
      if (f(target, this.trailElements[i % this.trailElements.length], p, dt)) {
        this.start++;
        this.start %= this.trailElements.length;
      }
    }

    if (this.start === end) {
      this.start = -1;
      this.end = -1;
    }
  };

  _proto.count = function count() {
    if (this.start < this.end) {
      return this.end - this.start;
    } else {
      return this.trailElements.length + this.end - this.start;
    }
  };

  _proto.clear = function clear() {
    this.start = -1;
    this.end = -1;
  };

  return TrailSegment;
}();

var TrailModule = (_dec$f = jsonAsset.ccclass('cc.TrailModule'), _dec2$f = jsonAsset.displayOrder(), _dec3$e = jsonAsset.type(TrailMode), _dec4$d = jsonAsset.displayOrder(), _dec5$c = jsonAsset.tooltip(), _dec6$b = jsonAsset.type(CurveRange), _dec7$a = jsonAsset.displayOrder(), _dec8$a = jsonAsset.tooltip(), _dec9$a = jsonAsset.displayOrder(), _dec10$9 = jsonAsset.tooltip(), _dec11$9 = jsonAsset.type(Space), _dec12$9 = jsonAsset.displayOrder(), _dec13$9 = jsonAsset.tooltip(), _dec14$9 = jsonAsset.type(TextureMode), _dec15$9 = jsonAsset.displayOrder(), _dec16$9 = jsonAsset.tooltip(), _dec17$7 = jsonAsset.displayOrder(), _dec18$6 = jsonAsset.tooltip(), _dec19$6 = jsonAsset.type(CurveRange), _dec20$6 = jsonAsset.displayOrder(), _dec21$5 = jsonAsset.tooltip(), _dec22$4 = jsonAsset.displayOrder(), _dec23$4 = jsonAsset.tooltip(), _dec24$4 = jsonAsset.type(GradientRange), _dec25$4 = jsonAsset.displayOrder(), _dec26$3 = jsonAsset.tooltip(), _dec27$3 = jsonAsset.type(GradientRange), _dec28$1 = jsonAsset.displayOrder(), _dec29$1 = jsonAsset.tooltip(), _dec30$1 = jsonAsset.type(Space), _dec$f(_class$f = (_class2$f = (_temp$f = function () {
  jsonAsset._createClass(TrailModule, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (val === this._enable && this._trailModel) {
        return;
      }

      if (val && !this._enable) {
        this._enable = val;
        if (this._particleSystem.processor) this._particleSystem.processor.updateTrailMaterial();
      }

      if (val && !this._trailModel) {
        this._createModel();

        this.rebuild();
      }

      this._enable = val;

      if (this._trailModel) {
        this._trailModel.enabled = val;
      }

      if (val) this.onEnable();else this.onDisable();
    }
  }, {
    key: "minParticleDistance",
    get: function get() {
      return this._minParticleDistance;
    },
    set: function set(val) {
      this._minParticleDistance = val;
      this._minSquaredDistance = val * val;
    }
  }, {
    key: "space",
    get: function get() {
      return this._space;
    },
    set: function set(val) {
      this._space = val;
      var ps = this._particleSystem;

      if (ps && ps.processor) {
        ps.processor.updateTrailMaterial();
      }
    }
  }]);

  function TrailModule() {
    jsonAsset._initializerDefineProperty(this, "_enable", _descriptor$f, this);

    jsonAsset._initializerDefineProperty(this, "mode", _descriptor2$f, this);

    jsonAsset._initializerDefineProperty(this, "lifeTime", _descriptor3$e, this);

    jsonAsset._initializerDefineProperty(this, "_minParticleDistance", _descriptor4$e, this);

    jsonAsset._initializerDefineProperty(this, "existWithParticles", _descriptor5$c, this);

    jsonAsset._initializerDefineProperty(this, "textureMode", _descriptor6$a, this);

    jsonAsset._initializerDefineProperty(this, "widthFromParticle", _descriptor7$7, this);

    jsonAsset._initializerDefineProperty(this, "widthRatio", _descriptor8$4, this);

    jsonAsset._initializerDefineProperty(this, "colorFromParticle", _descriptor9$2, this);

    jsonAsset._initializerDefineProperty(this, "colorOverTrail", _descriptor10$2, this);

    jsonAsset._initializerDefineProperty(this, "colorOvertime", _descriptor11$2, this);

    jsonAsset._initializerDefineProperty(this, "_space", _descriptor12$2, this);

    jsonAsset._initializerDefineProperty(this, "_particleSystem", _descriptor13$2, this);

    this._minSquaredDistance = 0;
    this._vertSize = void 0;
    this._trailNum = 0;
    this._trailLifetime = 0;
    this.vbOffset = 0;
    this.ibOffset = 0;
    this._trailSegments = null;
    this._particleTrail = void 0;
    this._trailModel = null;
    this._iaInfo = void 0;
    this._iaInfoBuffer = null;
    this._subMeshData = null;
    this._vertAttrs = void 0;
    this._vbF32 = null;
    this._vbUint32 = null;
    this._iBuffer = null;
    this._needTransform = false;
    this._material = null;
    this._iaInfo = new jsonAsset.IndirectBuffer([new jsonAsset.DrawInfo()]);
    this._vertAttrs = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RGBA32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD1, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGBA8, true)];
    this._vertSize = 0;

    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._vertAttrs), _step; !(_step = _iterator()).done;) {
      var a = _step.value;
      this._vertSize += jsonAsset.FormatInfos[a.format].size;
    }

    this._particleTrail = new Map();
  }

  var _proto2 = TrailModule.prototype;

  _proto2.onInit = function onInit(ps) {
    this._particleSystem = ps;
    this.minParticleDistance = this._minParticleDistance;
    var burstCount = 0;
    var psTime = ps.startLifetime.getMax();
    var psRate = ps.rateOverTime.getMax();
    var duration = ps.duration;

    for (var i = 0, len = ps.bursts.length; i < len; i++) {
      var b = ps.bursts[i];
      burstCount += b.getMaxCount(ps) * Math.ceil(psTime / duration);
    }

    this._trailNum = Math.ceil(psTime * this.lifeTime.getMax() * 60 * (psRate * duration + burstCount));
    this._trailSegments = new jsonAsset.Pool(function () {
      return new TrailSegment(10);
    }, Math.ceil(psRate * duration));

    if (this._enable) {
      this.enable = this._enable;
    }
  };

  _proto2.onEnable = function onEnable() {
    this._attachToScene();
  };

  _proto2.onDisable = function onDisable() {
    this._particleTrail.clear();

    this._detachFromScene();
  };

  _proto2._attachToScene = function _attachToScene() {
    if (this._trailModel) {
      if (this._trailModel.scene) {
        this._detachFromScene();
      }

      this._particleSystem._getRenderScene().addModel(this._trailModel);
    }
  };

  _proto2._detachFromScene = function _detachFromScene() {
    if (this._trailModel && this._trailModel.scene) {
      this._trailModel.scene.removeModel(this._trailModel);
    }
  };

  _proto2.destroy = function destroy() {
    this.destroySubMeshData();

    if (this._trailModel) {
      index.director.root.destroyModel(this._trailModel);
      this._trailModel = null;
    }

    if (this._trailSegments) {
      this._trailSegments.destroy(function (obj) {
        obj.trailElements.length = 0;
      });

      this._trailSegments = null;
    }
  };

  _proto2.play = function play() {
    if (this._trailModel && this._enable) {
      this._trailModel.enabled = true;
    }
  };

  _proto2.clear = function clear() {
    if (this.enable) {
      var trailIter = this._particleTrail.values();

      var trail = trailIter.next();

      while (!trail.done) {
        trail.value.clear();
        trail = trailIter.next();
      }

      this._particleTrail.clear();

      this.updateRenderData();
      if (this._trailModel) this._trailModel.enabled = false;
    }
  };

  _proto2.updateMaterial = function updateMaterial() {
    if (this._particleSystem) {
      this._material = this._particleSystem.getMaterialInstance(1) || this._particleSystem.processor._defaultTrailMat;

      if (this._trailModel) {
        this._trailModel.setSubModelMaterial(0, this._material);
      }
    }
  };

  _proto2.update = function update() {
    this._trailLifetime = this.lifeTime.evaluate(this._particleSystem._time, 1);

    if (this.space === Space.World && this._particleSystem._simulationSpace === Space.Local) {
      this._needTransform = true;

      this._particleSystem.node.getWorldMatrix(_temp_xform);

      this._particleSystem.node.getWorldRotation(_temp_quat);
    } else {
      this._needTransform = false;
    }
  };

  _proto2.animate = function animate(p, scaledDt) {
    if (!this._trailSegments) {
      return;
    }

    var trail = this._particleTrail.get(p);

    if (!trail) {
      trail = this._trailSegments.alloc();

      this._particleTrail.set(p, trail);

      return;
    }

    var lastSeg = trail.getElement(trail.end - 1);

    if (this._needTransform) {
      jsonAsset.Vec3.transformMat4(_temp_vec3, p.position, _temp_xform);
    } else {
      jsonAsset.Vec3.copy(_temp_vec3, p.position);
    }

    if (lastSeg) {
      trail.iterateElement(this, this._updateTrailElement, p, scaledDt);

      if (jsonAsset.Vec3.squaredDistance(lastSeg.position, _temp_vec3) < this._minSquaredDistance) {
        return;
      }
    }

    lastSeg = trail.addElement();

    if (!lastSeg) {
      return;
    }

    jsonAsset.Vec3.copy(lastSeg.position, _temp_vec3);
    lastSeg.lifetime = 0;

    if (this.widthFromParticle) {
      lastSeg.width = p.size.x * this.widthRatio.evaluate(0, 1);
    } else {
      lastSeg.width = this.widthRatio.evaluate(0, 1);
    }

    var trailNum = trail.count();

    if (trailNum === 2) {
      var lastSecondTrail = trail.getElement(trail.end - 2);
      jsonAsset.Vec3.subtract(lastSecondTrail.velocity, lastSeg.position, lastSecondTrail.position);
    } else if (trailNum > 2) {
      var _lastSecondTrail = trail.getElement(trail.end - 2);

      var lastThirdTrail = trail.getElement(trail.end - 3);
      jsonAsset.Vec3.subtract(_temp_vec3, lastThirdTrail.position, _lastSecondTrail.position);
      jsonAsset.Vec3.subtract(_temp_vec3_1, lastSeg.position, _lastSecondTrail.position);
      jsonAsset.Vec3.subtract(_lastSecondTrail.velocity, _temp_vec3_1, _temp_vec3);

      if (jsonAsset.Vec3.equals(jsonAsset.Vec3.ZERO, _lastSecondTrail.velocity)) {
        jsonAsset.Vec3.copy(_lastSecondTrail.velocity, _temp_vec3);
      }

      jsonAsset.Vec3.normalize(_lastSecondTrail.velocity, _lastSecondTrail.velocity);

      this._checkDirectionReverse(_lastSecondTrail, lastThirdTrail);
    }

    if (this.colorFromParticle) {
      lastSeg.color.set(p.color);
    } else {
      lastSeg.color.set(this.colorOvertime.evaluate(0, 1));
    }
  };

  _proto2.removeParticle = function removeParticle(p) {
    var trail = this._particleTrail.get(p);

    if (trail && this._trailSegments) {
      trail.clear();

      this._trailSegments.free(trail);

      this._particleTrail["delete"](p);
    }
  };

  _proto2.updateRenderData = function updateRenderData() {
    this.vbOffset = 0;
    this.ibOffset = 0;

    for (var _iterator2 = jsonAsset._createForOfIteratorHelperLoose(this._particleTrail.keys()), _step2; !(_step2 = _iterator2()).done;) {
      var p = _step2.value;

      var trailSeg = this._particleTrail.get(p);

      if (trailSeg.start === -1) {
        continue;
      }

      var indexOffset = this.vbOffset * 4 / this._vertSize;
      var end = trailSeg.start >= trailSeg.end ? trailSeg.end + trailSeg.trailElements.length : trailSeg.end;
      var trailNum = end - trailSeg.start;
      var textCoordSeg = 1 / trailNum;
      var startSegEle = trailSeg.trailElements[trailSeg.start];

      this._fillVertexBuffer(startSegEle, this.colorOverTrail.evaluate(1, 1), indexOffset, 1, 0, NEXT_TRIANGLE_INDEX);

      for (var i = trailSeg.start + 1; i < end; i++) {
        var segEle = trailSeg.trailElements[i % trailSeg.trailElements.length];
        var j = i - trailSeg.start;

        this._fillVertexBuffer(segEle, this.colorOverTrail.evaluate(1 - j / trailNum, 1), indexOffset, 1 - j * textCoordSeg, j, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);
      }

      if (this._needTransform) {
        jsonAsset.Vec3.transformMat4(_temp_trailEle.position, p.position, _temp_xform);
      } else {
        jsonAsset.Vec3.copy(_temp_trailEle.position, p.position);
      }

      if (trailNum === 1 || trailNum === 2) {
        var lastSecondTrail = trailSeg.getElement(trailSeg.end - 1);
        jsonAsset.Vec3.subtract(lastSecondTrail.velocity, _temp_trailEle.position, lastSecondTrail.position);
        this._vbF32[this.vbOffset - this._vertSize / 4 - 4] = lastSecondTrail.velocity.x;
        this._vbF32[this.vbOffset - this._vertSize / 4 - 3] = lastSecondTrail.velocity.y;
        this._vbF32[this.vbOffset - this._vertSize / 4 - 2] = lastSecondTrail.velocity.z;
        this._vbF32[this.vbOffset - 4] = lastSecondTrail.velocity.x;
        this._vbF32[this.vbOffset - 3] = lastSecondTrail.velocity.y;
        this._vbF32[this.vbOffset - 2] = lastSecondTrail.velocity.z;
        jsonAsset.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, lastSecondTrail.position);

        this._checkDirectionReverse(_temp_trailEle, lastSecondTrail);
      } else if (trailNum > 2) {
        var _lastSecondTrail2 = trailSeg.getElement(trailSeg.end - 1);

        var lastThirdTrail = trailSeg.getElement(trailSeg.end - 2);
        jsonAsset.Vec3.subtract(_temp_vec3, lastThirdTrail.position, _lastSecondTrail2.position);
        jsonAsset.Vec3.subtract(_temp_vec3_1, _temp_trailEle.position, _lastSecondTrail2.position);
        jsonAsset.Vec3.normalize(_temp_vec3, _temp_vec3);
        jsonAsset.Vec3.normalize(_temp_vec3_1, _temp_vec3_1);
        jsonAsset.Vec3.subtract(_lastSecondTrail2.velocity, _temp_vec3_1, _temp_vec3);
        jsonAsset.Vec3.normalize(_lastSecondTrail2.velocity, _lastSecondTrail2.velocity);

        this._checkDirectionReverse(_lastSecondTrail2, lastThirdTrail);

        this.vbOffset -= this._vertSize / 4 * 2;
        this.ibOffset -= 6;

        this._fillVertexBuffer(_lastSecondTrail2, this.colorOverTrail.evaluate(textCoordSeg, 1), indexOffset, textCoordSeg, trailNum - 1, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);

        jsonAsset.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, _lastSecondTrail2.position);
        jsonAsset.Vec3.normalize(_temp_trailEle.velocity, _temp_trailEle.velocity);

        this._checkDirectionReverse(_temp_trailEle, _lastSecondTrail2);
      }

      if (this.widthFromParticle) {
        _temp_trailEle.width = p.size.x * this.widthRatio.evaluate(0, 1);
      } else {
        _temp_trailEle.width = this.widthRatio.evaluate(0, 1);
      }

      _temp_trailEle.color = p.color;

      if (jsonAsset.Vec3.equals(_temp_trailEle.velocity, jsonAsset.Vec3.ZERO)) {
        this.ibOffset -= 3;
      } else {
        this._fillVertexBuffer(_temp_trailEle, this.colorOverTrail.evaluate(0, 1), indexOffset, 0, trailNum, PRE_TRIANGLE_INDEX);
      }
    }

    this._trailModel.enabled = this.ibOffset > 0;
  };

  _proto2.updateIA = function updateIA(count) {
    var subModels = this._trailModel && this._trailModel.subModels;

    if (subModels && subModels.length > 0) {
      var subModel = subModels[0];
      subModel.inputAssembler.vertexBuffers[0].update(this._vbF32);
      subModel.inputAssembler.indexBuffer.update(this._iBuffer);
      this._iaInfo.drawInfos[0].firstIndex = 0;
      this._iaInfo.drawInfos[0].indexCount = count;

      this._iaInfoBuffer.update(this._iaInfo);
    }
  };

  _proto2.beforeRender = function beforeRender() {
    this.updateIA(this.ibOffset);
  };

  _proto2._createModel = function _createModel() {
    if (this._trailModel) {
      return;
    }

    this._trailModel = jsonAsset.legacyCC.director.root.createModel(view.Model);
  };

  _proto2.rebuild = function rebuild() {
    var device = index.director.root.device;
    var vertexBuffer = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, this._vertSize * (this._trailNum + 1) * 2, this._vertSize));
    var vBuffer = new ArrayBuffer(this._vertSize * (this._trailNum + 1) * 2);
    this._vbF32 = new Float32Array(vBuffer);
    this._vbUint32 = new Uint32Array(vBuffer);
    vertexBuffer.update(vBuffer);
    var indexBuffer = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, this._trailNum * 6 * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));
    this._iBuffer = new Uint16Array(this._trailNum * 6);
    indexBuffer.update(this._iBuffer);
    this._iaInfoBuffer = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDIRECT, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.DRAW_INFO_SIZE, jsonAsset.DRAW_INFO_SIZE));
    this._iaInfo.drawInfos[0].vertexCount = (this._trailNum + 1) * 2;
    this._iaInfo.drawInfos[0].indexCount = this._trailNum * 6;

    this._iaInfoBuffer.update(this._iaInfo);

    this._subMeshData = new jsonAsset.RenderingSubMesh([vertexBuffer], this._vertAttrs, jsonAsset.PrimitiveMode.TRIANGLE_LIST, indexBuffer, this._iaInfoBuffer);
    var trailModel = this._trailModel;

    if (trailModel) {
      trailModel.node = trailModel.transform = this._particleSystem.node;
      trailModel.visFlags = this._particleSystem.visibility;
      trailModel.initSubModel(0, this._subMeshData, this._material);
      trailModel.enabled = true;
    }
  };

  _proto2._updateTrailElement = function _updateTrailElement(module, trailEle, p, dt) {
    trailEle.lifetime += dt;

    if (module.colorFromParticle) {
      trailEle.color.set(p.color);
      trailEle.color.multiply(module.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
    } else {
      trailEle.color.set(module.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
    }

    if (module.widthFromParticle) {
      trailEle.width = p.size.x * module.widthRatio.evaluate(trailEle.lifetime / module._trailLifetime, 1);
    } else {
      trailEle.width = module.widthRatio.evaluate(trailEle.lifetime / module._trailLifetime, 1);
    }

    return trailEle.lifetime > module._trailLifetime;
  };

  _proto2._fillVertexBuffer = function _fillVertexBuffer(trailSeg, colorModifer, indexOffset, xTexCoord, trailEleIdx, indexSet) {
    this._vbF32[this.vbOffset++] = trailSeg.position.x;
    this._vbF32[this.vbOffset++] = trailSeg.position.y;
    this._vbF32[this.vbOffset++] = trailSeg.position.z;
    this._vbF32[this.vbOffset++] = trailSeg.direction;
    this._vbF32[this.vbOffset++] = trailSeg.width;
    this._vbF32[this.vbOffset++] = xTexCoord;
    this._vbF32[this.vbOffset++] = 0;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.z;

    _temp_color.set(trailSeg.color);

    _temp_color.multiply(colorModifer);

    this._vbUint32[this.vbOffset++] = _temp_color._val;
    this._vbF32[this.vbOffset++] = trailSeg.position.x;
    this._vbF32[this.vbOffset++] = trailSeg.position.y;
    this._vbF32[this.vbOffset++] = trailSeg.position.z;
    this._vbF32[this.vbOffset++] = 1 - trailSeg.direction;
    this._vbF32[this.vbOffset++] = trailSeg.width;
    this._vbF32[this.vbOffset++] = xTexCoord;
    this._vbF32[this.vbOffset++] = 1;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.z;
    this._vbUint32[this.vbOffset++] = _temp_color._val;

    if (indexSet & PRE_TRIANGLE_INDEX) {
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx - 1;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
    }

    if (indexSet & NEXT_TRIANGLE_INDEX) {
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 2;
    }
  };

  _proto2._checkDirectionReverse = function _checkDirectionReverse(currElement, prevElement) {
    if (jsonAsset.Vec3.dot(currElement.velocity, prevElement.velocity) < DIRECTION_THRESHOLD) {
      currElement.direction = 1 - prevElement.direction;
    } else {
      currElement.direction = prevElement.direction;
    }
  };

  _proto2.destroySubMeshData = function destroySubMeshData() {
    if (this._subMeshData) {
      this._subMeshData.destroy();

      this._subMeshData = null;
    }
  };

  return TrailModule;
}(), _temp$f), (jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "enable", [_dec2$f], Object.getOwnPropertyDescriptor(_class2$f.prototype, "enable"), _class2$f.prototype), _descriptor$f = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "_enable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$f = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "mode", [_dec3$e, jsonAsset.serializable, _dec4$d, _dec5$c], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return TrailMode.Particles;
  }
}), _descriptor3$e = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "lifeTime", [_dec6$b, jsonAsset.serializable, _dec7$a, _dec8$a], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor4$e = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "_minParticleDistance", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "minParticleDistance", [_dec9$a, _dec10$9], Object.getOwnPropertyDescriptor(_class2$f.prototype, "minParticleDistance"), _class2$f.prototype), jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "space", [_dec11$9, _dec12$9, _dec13$9], Object.getOwnPropertyDescriptor(_class2$f.prototype, "space"), _class2$f.prototype), _descriptor5$c = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "existWithParticles", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor6$a = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "textureMode", [_dec14$9, jsonAsset.serializable, _dec15$9, _dec16$9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return TextureMode.Stretch;
  }
}), _descriptor7$7 = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "widthFromParticle", [jsonAsset.serializable, _dec17$7, _dec18$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor8$4 = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "widthRatio", [_dec19$6, jsonAsset.serializable, _dec20$6, _dec21$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor9$2 = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "colorFromParticle", [jsonAsset.serializable, _dec22$4, _dec23$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor10$2 = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "colorOverTrail", [_dec24$4, jsonAsset.serializable, _dec25$4, _dec26$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new GradientRange();
  }
}), _descriptor11$2 = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "colorOvertime", [_dec27$3, jsonAsset.serializable, _dec28$1, _dec29$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new GradientRange();
  }
}), _descriptor12$2 = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "_space", [_dec30$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Space.World;
  }
}), _descriptor13$2 = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "_particleSystem", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2$f)) || _class$f);

var _dec$g, _dec2$g, _dec3$f, _dec4$e, _dec5$d, _dec6$c, _dec7$b, _dec8$b, _dec9$b, _dec10$a, _dec11$a, _dec12$a, _dec13$a, _dec14$a, _dec15$a, _dec16$a, _dec17$8, _dec18$7, _dec19$7, _dec20$7, _dec21$6, _dec22$5, _dec23$5, _dec24$5, _dec25$5, _dec26$4, _dec27$4, _dec28$2, _dec29$2, _dec30$2, _dec31$1, _dec32$1, _dec33$1, _dec34$1, _dec35$1, _dec36$1, _dec37$1, _dec38$1, _dec39$1, _dec40$1, _dec41$1, _dec42$1, _dec43$1, _dec44$1, _dec45$1, _dec46$1, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _class$g, _class2$g, _descriptor$g, _descriptor2$g, _descriptor3$f, _descriptor4$f, _descriptor5$d, _descriptor6$b, _descriptor7$8, _descriptor8$5, _descriptor9$3, _descriptor10$3, _descriptor11$3, _descriptor12$3, _descriptor13$3, _descriptor14$1, _descriptor15$1, _descriptor16$1, _descriptor17$1, _descriptor18$1, _descriptor19$1, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _temp$g;

var _world_mat = new jsonAsset.Mat4();

var _world_rol = new jsonAsset.Quat();

var superMaterials = Object.getOwnPropertyDescriptor(renderableComponent.RenderableComponent.prototype, 'sharedMaterials');
var ParticleSystem = (_dec$g = jsonAsset.ccclass('cc.ParticleSystem'), _dec2$g = jsonAsset.help(), _dec3$f = jsonAsset.menu(), _dec4$e = jsonAsset.executionOrder(99), _dec5$d = jsonAsset.displayOrder(), _dec6$c = jsonAsset.tooltip(), _dec7$b = jsonAsset.type(GradientRange), _dec8$b = jsonAsset.displayOrder(), _dec9$b = jsonAsset.tooltip(), _dec10$a = jsonAsset.type(Space), _dec11$a = jsonAsset.displayOrder(), _dec12$a = jsonAsset.tooltip(), _dec13$a = jsonAsset.displayOrder(), _dec14$a = jsonAsset.tooltip(), _dec15$a = jsonAsset.formerlySerializedAs('startSize'), _dec16$a = jsonAsset.type(CurveRange), _dec17$8 = jsonAsset.displayOrder(), _dec18$7 = jsonAsset.tooltip(), _dec19$7 = jsonAsset.type(CurveRange), _dec20$7 = jsonAsset.displayOrder(), _dec21$6 = jsonAsset.tooltip(), _dec22$5 = jsonAsset.type(CurveRange), _dec23$5 = jsonAsset.displayOrder(), _dec24$5 = jsonAsset.tooltip(), _dec25$5 = jsonAsset.type(CurveRange), _dec26$4 = jsonAsset.displayOrder(), _dec27$4 = jsonAsset.tooltip(), _dec28$2 = jsonAsset.displayOrder(), _dec29$2 = jsonAsset.tooltip(), _dec30$2 = jsonAsset.type(CurveRange), _dec31$1 = jsonAsset.displayOrder(), _dec32$1 = jsonAsset.tooltip(), _dec33$1 = jsonAsset.type(CurveRange), _dec34$1 = jsonAsset.displayOrder(), _dec35$1 = jsonAsset.tooltip(), _dec36$1 = jsonAsset.type(CurveRange), _dec37$1 = jsonAsset.formerlySerializedAs('startRotation'), _dec38$1 = jsonAsset.displayOrder(), _dec39$1 = jsonAsset.tooltip(), _dec40$1 = jsonAsset.type(CurveRange), _dec41$1 = jsonAsset.displayOrder(), _dec42$1 = jsonAsset.tooltip(), _dec43$1 = jsonAsset.type(CurveRange), _dec44$1 = jsonAsset.displayOrder(), _dec45$1 = jsonAsset.tooltip(), _dec46$1 = jsonAsset.displayOrder(), _dec47 = jsonAsset.tooltip(), _dec48 = jsonAsset.displayOrder(), _dec49 = jsonAsset.tooltip(), _dec50 = jsonAsset.displayOrder(), _dec51 = jsonAsset.tooltip(), _dec52 = jsonAsset.type(Space), _dec53 = jsonAsset.displayOrder(), _dec54 = jsonAsset.tooltip(), _dec55 = jsonAsset.displayOrder(), _dec56 = jsonAsset.tooltip(), _dec57 = jsonAsset.displayOrder(), _dec58 = jsonAsset.tooltip(), _dec59 = jsonAsset.type(CurveRange), _dec60 = jsonAsset.displayOrder(), _dec61 = jsonAsset.tooltip(), _dec62 = jsonAsset.type(CurveRange), _dec63 = jsonAsset.displayOrder(), _dec64 = jsonAsset.tooltip(), _dec65 = jsonAsset.type(CurveRange), _dec66 = jsonAsset.displayOrder(), _dec67 = jsonAsset.tooltip(), _dec68 = jsonAsset.type([Burst]), _dec69 = jsonAsset.displayOrder(), _dec70 = jsonAsset.tooltip(), _dec71 = jsonAsset.visible(), _dec72 = jsonAsset.type(jsonAsset.Material), _dec73 = jsonAsset.displayName(), _dec74 = jsonAsset.type(ColorOvertimeModule), _dec75 = jsonAsset.type(ColorOvertimeModule), _dec76 = jsonAsset.displayOrder(), _dec77 = jsonAsset.tooltip(), _dec78 = jsonAsset.type(ShapeModule), _dec79 = jsonAsset.type(ShapeModule), _dec80 = jsonAsset.displayOrder(), _dec81 = jsonAsset.tooltip(), _dec82 = jsonAsset.type(SizeOvertimeModule), _dec83 = jsonAsset.type(SizeOvertimeModule), _dec84 = jsonAsset.displayOrder(), _dec85 = jsonAsset.tooltip(), _dec86 = jsonAsset.type(VelocityOvertimeModule), _dec87 = jsonAsset.type(VelocityOvertimeModule), _dec88 = jsonAsset.displayOrder(), _dec89 = jsonAsset.tooltip(), _dec90 = jsonAsset.type(ForceOvertimeModule), _dec91 = jsonAsset.type(ForceOvertimeModule), _dec92 = jsonAsset.displayOrder(), _dec93 = jsonAsset.tooltip(), _dec94 = jsonAsset.type(LimitVelocityOvertimeModule), _dec95 = jsonAsset.type(LimitVelocityOvertimeModule), _dec96 = jsonAsset.displayOrder(), _dec97 = jsonAsset.tooltip(), _dec98 = jsonAsset.type(RotationOvertimeModule), _dec99 = jsonAsset.type(RotationOvertimeModule), _dec100 = jsonAsset.displayOrder(), _dec101 = jsonAsset.tooltip(), _dec102 = jsonAsset.type(TextureAnimationModule), _dec103 = jsonAsset.type(TextureAnimationModule), _dec104 = jsonAsset.displayOrder(), _dec105 = jsonAsset.tooltip(), _dec106 = jsonAsset.type(TrailModule), _dec107 = jsonAsset.type(TrailModule), _dec108 = jsonAsset.displayOrder(), _dec109 = jsonAsset.tooltip(), _dec110 = jsonAsset.type(ParticleSystemRenderer), _dec111 = jsonAsset.displayOrder(), _dec112 = jsonAsset.tooltip(), _dec113 = jsonAsset.displayOrder(), _dec114 = jsonAsset.tooltip(), _dec$g(_class$g = _dec2$g(_class$g = _dec3$f(_class$g = _dec4$e(_class$g = jsonAsset.executeInEditMode(_class$g = (_class2$g = (_temp$g = function (_RenderableComponent) {
  jsonAsset._inheritsLoose(ParticleSystem, _RenderableComponent);

  jsonAsset._createClass(ParticleSystem, [{
    key: "capacity",
    get: function get() {
      return this._capacity;
    },
    set: function set(val) {
      this._capacity = Math.floor(val);

      if (this.processor && this.processor._model) {
        this.processor._model.setCapacity(this._capacity);
      }
    }
  }, {
    key: "prewarm",
    get: function get() {
      return this._prewarm;
    },
    set: function set(val) {
      if (val === true && this.loop === false) ;

      this._prewarm = val;
    }
  }, {
    key: "simulationSpace",
    get: function get() {
      return this._simulationSpace;
    },
    set: function set(val) {
      if (val !== this._simulationSpace) {
        this._simulationSpace = val;

        if (this.processor) {
          this.processor.updateMaterialParams();
          this.processor.updateTrailMaterial();
        }
      }
    }
  }, {
    key: "sharedMaterials",
    get: function get() {
      return superMaterials.get.call(this);
    },
    set: function set(val) {
      superMaterials.set.call(this, val);
    }
  }, {
    key: "colorOverLifetimeModule",
    get: function get() {

      return this._colorOverLifetimeModule;
    },
    set: function set(val) {
      if (!val) return;
      this._colorOverLifetimeModule = val;
    }
  }, {
    key: "shapeModule",
    get: function get() {

      return this._shapeModule;
    },
    set: function set(val) {
      if (!val) return;
      this._shapeModule = val;
    }
  }, {
    key: "sizeOvertimeModule",
    get: function get() {

      return this._sizeOvertimeModule;
    },
    set: function set(val) {
      if (!val) return;
      this._sizeOvertimeModule = val;
    }
  }, {
    key: "velocityOvertimeModule",
    get: function get() {

      return this._velocityOvertimeModule;
    },
    set: function set(val) {
      if (!val) return;
      this._velocityOvertimeModule = val;
    }
  }, {
    key: "forceOvertimeModule",
    get: function get() {

      return this._forceOvertimeModule;
    },
    set: function set(val) {
      if (!val) return;
      this._forceOvertimeModule = val;
    }
  }, {
    key: "limitVelocityOvertimeModule",
    get: function get() {

      return this._limitVelocityOvertimeModule;
    },
    set: function set(val) {
      if (!val) return;
      this._limitVelocityOvertimeModule = val;
    }
  }, {
    key: "rotationOvertimeModule",
    get: function get() {

      return this._rotationOvertimeModule;
    },
    set: function set(val) {
      if (!val) return;
      this._rotationOvertimeModule = val;
    }
  }, {
    key: "textureAnimationModule",
    get: function get() {

      return this._textureAnimationModule;
    },
    set: function set(val) {
      if (!val) return;
      this._textureAnimationModule = val;
    }
  }, {
    key: "trailModule",
    get: function get() {

      return this._trailModule;
    },
    set: function set(val) {
      if (!val) return;
      this._trailModule = val;
    }
  }]);

  function ParticleSystem() {
    var _this;

    _this = _RenderableComponent.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "startColor", _descriptor$g, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "scaleSpace", _descriptor2$g, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startSize3D", _descriptor3$f, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startSizeX", _descriptor4$f, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startSizeY", _descriptor5$d, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startSizeZ", _descriptor6$b, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startSpeed", _descriptor7$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startRotation3D", _descriptor8$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startRotationX", _descriptor9$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startRotationY", _descriptor10$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startRotationZ", _descriptor11$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startDelay", _descriptor12$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "startLifetime", _descriptor13$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "duration", _descriptor14$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "loop", _descriptor15$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "simulationSpeed", _descriptor16$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "playOnAwake", _descriptor17$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "gravityModifier", _descriptor18$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "rateOverTime", _descriptor19$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "rateOverDistance", _descriptor20, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "bursts", _descriptor21, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_colorOverLifetimeModule", _descriptor22, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_shapeModule", _descriptor23, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_sizeOvertimeModule", _descriptor24, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_velocityOvertimeModule", _descriptor25, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_forceOvertimeModule", _descriptor26, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_limitVelocityOvertimeModule", _descriptor27, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_rotationOvertimeModule", _descriptor28, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_textureAnimationModule", _descriptor29, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_trailModule", _descriptor30, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "renderer", _descriptor31, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "enableCulling", _descriptor32, jsonAsset._assertThisInitialized(_this));

    _this._isPlaying = void 0;
    _this._isPaused = void 0;
    _this._isStopped = void 0;
    _this._isEmitting = void 0;
    _this._needRefresh = void 0;
    _this._time = void 0;
    _this._emitRateTimeCounter = void 0;
    _this._emitRateDistanceCounter = void 0;
    _this._oldWPos = void 0;
    _this._curWPos = void 0;
    _this._customData1 = void 0;
    _this._customData2 = void 0;
    _this._subEmitters = void 0;

    jsonAsset._initializerDefineProperty(_this, "_prewarm", _descriptor33, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_capacity", _descriptor34, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_simulationSpace", _descriptor35, jsonAsset._assertThisInitialized(_this));

    _this.processor = null;
    _this.rateOverTime.constant = 10;
    _this.startLifetime.constant = 5;
    _this.startSizeX.constant = 1;
    _this.startSpeed.constant = 5;
    _this._isPlaying = false;
    _this._isPaused = false;
    _this._isStopped = true;
    _this._isEmitting = false;
    _this._needRefresh = true;
    _this._time = 0.0;
    _this._emitRateTimeCounter = 0.0;
    _this._emitRateDistanceCounter = 0.0;
    _this._oldWPos = new jsonAsset.Vec3();
    _this._curWPos = new jsonAsset.Vec3();
    _this._customData1 = new jsonAsset.Vec2();
    _this._customData2 = new jsonAsset.Vec2();
    _this._subEmitters = [];
    return _this;
  }

  var _proto = ParticleSystem.prototype;

  _proto.onFocusInEditor = function onFocusInEditor() {
    this.renderer.create(this);
  };

  _proto.onLoad = function onLoad() {
    this.renderer.onInit(this);
    if (this._shapeModule) this._shapeModule.onInit(this);
    if (this._trailModule) this._trailModule.onInit(this);
    this.bindModule();

    this._resetPosition();
  };

  _proto._onMaterialModified = function _onMaterialModified(index, material) {
    if (this.processor !== null) {
      this.processor.onMaterialModified(index, material);
    }
  };

  _proto._onRebuildPSO = function _onRebuildPSO(index, material) {
    this.processor.onRebuildPSO(index, material);
  };

  _proto._collectModels = function _collectModels() {
    this._models.length = 0;

    this._models.push(this.processor._model);

    if (this._trailModule && this._trailModule.enable && this._trailModule._trailModel) {
      this._models.push(this._trailModule._trailModel);
    }

    return this._models;
  };

  _proto._attachToScene = function _attachToScene() {
    this.processor.attachToScene();

    if (this._trailModule && this._trailModule.enable) {
      this._trailModule._attachToScene();
    }
  };

  _proto._detachFromScene = function _detachFromScene() {
    this.processor.detachFromScene();

    if (this._trailModule && this._trailModule.enable) {
      this._trailModule._detachFromScene();
    }
  };

  _proto.bindModule = function bindModule() {
    if (this._colorOverLifetimeModule) this._colorOverLifetimeModule.bindTarget(this.processor);
    if (this._sizeOvertimeModule) this._sizeOvertimeModule.bindTarget(this.processor);
    if (this._rotationOvertimeModule) this._rotationOvertimeModule.bindTarget(this.processor);
    if (this._forceOvertimeModule) this._forceOvertimeModule.bindTarget(this.processor);
    if (this._limitVelocityOvertimeModule) this._limitVelocityOvertimeModule.bindTarget(this.processor);
    if (this._velocityOvertimeModule) this._velocityOvertimeModule.bindTarget(this.processor);
    if (this._textureAnimationModule) this._textureAnimationModule.bindTarget(this.processor);
  };

  _proto.play = function play() {
    if (this._isPaused) {
      this._isPaused = false;
    }

    if (this._isStopped) {
      this._isStopped = false;
    }

    this._isPlaying = true;
    this._isEmitting = true;

    this._resetPosition();

    if (this._prewarm) {
      this._prewarmSystem();
    }

    if (this._trailModule) {
      this._trailModule.play();
    }
  };

  _proto.pause = function pause() {
    if (this._isStopped) {
      console.warn('pause(): particle system is already stopped.');
      return;
    }

    if (this._isPlaying) {
      this._isPlaying = false;
    }

    this._isPaused = true;
  };

  _proto.stop = function stop() {
    if (this._isPlaying || this._isPaused) {
      this.clear();
    }

    if (this._isPlaying) {
      this._isPlaying = false;
    }

    if (this._isPaused) {
      this._isPaused = false;
    }

    this._time = 0.0;
    this._emitRateTimeCounter = 0.0;
    this._emitRateDistanceCounter = 0.0;
    this._isStopped = true;
    this._needRefresh = true;
  };

  _proto.clear = function clear() {
    if (this.enabledInHierarchy) {
      this.processor.clear();
      if (this._trailModule) this._trailModule.clear();
    }
  };

  _proto.getParticleCount = function getParticleCount() {
    return this.processor.getParticleCount();
  };

  _proto.setCustomData1 = function setCustomData1(x, y) {
    jsonAsset.Vec2.set(this._customData1, x, y);
  };

  _proto.setCustomData2 = function setCustomData2(x, y) {
    jsonAsset.Vec2.set(this._customData2, x, y);
  };

  _proto.onDestroy = function onDestroy() {
    jsonAsset.legacyCC.director.off(jsonAsset.legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);
    this.processor.onDestroy();
    if (this._trailModule) this._trailModule.destroy();
  };

  _proto.onEnable = function onEnable() {
    jsonAsset.legacyCC.director.on(jsonAsset.legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);

    if (this.playOnAwake) {
      this.play();
    }

    this.processor.onEnable();
    if (this._trailModule) this._trailModule.onEnable();
  };

  _proto.onDisable = function onDisable() {
    jsonAsset.legacyCC.director.off(jsonAsset.legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);
    this.processor.onDisable();
    if (this._trailModule) this._trailModule.onDisable();
  };

  _proto.update = function update(dt) {
    var scaledDeltaTime = dt * this.simulationSpeed;

    if (this._isPlaying) {
      this._time += scaledDeltaTime;

      this._emit(scaledDeltaTime);

      if (this.processor.updateParticles(scaledDeltaTime) === 0 && !this._isEmitting) {
        this.stop();
      }
    }

    this.processor.updateRenderData();

    if (this._trailModule && this._trailModule.enable) {
      this._trailModule.updateRenderData();
    }
  };

  _proto.beforeRender = function beforeRender() {
    if (!this._isPlaying) return;
    this.processor.beforeRender();

    if (this._trailModule && this._trailModule.enable) {
      this._trailModule.beforeRender();
    }
  };

  _proto._onVisibilityChange = function _onVisibilityChange(val) {
    if (this.processor._model) {
      this.processor._model.visFlags = val;
    }
  };

  _proto._processRotation = function _processRotation(particle) {
    var renderMode = this.processor.getInfo().renderMode;

    if (renderMode !== RenderMode.Mesh) {
      if (renderMode === RenderMode.StrecthedBillboard) {
        particle.startEuler.set(0, 0, 0);
      } else if (renderMode !== RenderMode.Billboard) {
        particle.startEuler.set(0, 0, particle.startEuler.z);
      }
    }

    jsonAsset.Quat.fromEuler(particle.startRotation, particle.startEuler.x * Particle.R2D, particle.startEuler.y * Particle.R2D, particle.startEuler.z * Particle.R2D);
    particle.startRotation = jsonAsset.Quat.normalize(particle.startRotation, particle.startRotation);

    if (particle.startRotation.w < 0.0) {
      particle.startRotation.x += Particle.INDENTIFY_NEG_QUAT;
    }
  };

  _proto.emit = function emit(count, dt) {
    var delta = this._time / this.duration;

    if (this._needRefresh) {
      this.node.invalidateChildren(jsonAsset.TransformBit.POSITION);
      this._needRefresh = false;
    }

    if (this._simulationSpace === Space.World) {
      this.node.getWorldMatrix(_world_mat);
      this.node.getWorldRotation(_world_rol);
    }

    for (var i = 0; i < count; ++i) {
      var particle = this.processor.getFreeParticle();

      if (particle === null) {
        return;
      }

      particle.particleSystem = this;
      particle.reset();
      var rand = jsonAsset.pseudoRandom(jsonAsset.randomRangeInt(0, jsonAsset.INT_MAX));

      if (this._shapeModule && this._shapeModule.enable) {
        this._shapeModule.emit(particle);
      } else {
        jsonAsset.Vec3.set(particle.position, 0, 0, 0);
        jsonAsset.Vec3.copy(particle.velocity, particleEmitZAxis);
      }

      if (this._textureAnimationModule && this._textureAnimationModule.enable) {
        this._textureAnimationModule.init(particle);
      }

      var curveStartSpeed = this.startSpeed.evaluate(delta, rand);

      if (this.startSpeed.mode === Mode.Curve) {
        var current = this._time % this.duration;
        curveStartSpeed = this.startSpeed.evaluate(current / this.duration, rand);
      }

      jsonAsset.Vec3.multiplyScalar(particle.velocity, particle.velocity, curveStartSpeed);

      if (this._simulationSpace === Space.World) {
        jsonAsset.Vec3.transformMat4(particle.position, particle.position, _world_mat);
        jsonAsset.Vec3.transformQuat(particle.velocity, particle.velocity, _world_rol);
      }

      jsonAsset.Vec3.copy(particle.ultimateVelocity, particle.velocity);

      if (this.startRotation3D) {
        particle.startEuler.set(this.startRotationX.evaluate(delta, rand), this.startRotationY.evaluate(delta, rand), this.startRotationZ.evaluate(delta, rand));
      } else {
        particle.startEuler.set(0, 0, this.startRotationZ.evaluate(delta, rand));
      }

      this._processRotation(particle);

      jsonAsset.Vec3.set(particle.rotation, particle.startRotation.x, particle.startRotation.y, particle.startRotation.z);

      if (this.startSize3D) {
        jsonAsset.Vec3.set(particle.startSize, this.startSizeX.evaluate(delta, rand), this.startSizeY.evaluate(delta, rand), this.startSizeZ.evaluate(delta, rand));
      } else {
        jsonAsset.Vec3.set(particle.startSize, this.startSizeX.evaluate(delta, rand), 1, 1);
        particle.startSize.y = particle.startSize.x;
      }

      jsonAsset.Vec3.copy(particle.size, particle.startSize);
      particle.startColor.set(this.startColor.evaluate(delta, rand));
      particle.color.set(particle.startColor);
      particle.startLifetime = this.startLifetime.evaluate(delta, rand) + dt;
      particle.remainingLifetime = particle.startLifetime;
      particle.randomSeed = jsonAsset.randomRangeInt(0, 233280);
      this.processor.setNewParticle(particle);
    }
  };

  _proto._prewarmSystem = function _prewarmSystem() {
    this.startDelay.mode = Mode.Constant;
    this.startDelay.constant = 0;
    var dt = 1.0;
    var cnt = this.duration / dt;

    for (var i = 0; i < cnt; ++i) {
      this._time += dt;

      this._emit(dt);

      this.processor.updateParticles(dt);
    }
  };

  _proto._emit = function _emit(dt) {
    var startDelay = this.startDelay.evaluate(0, 1);

    if (this._time > startDelay) {
      if (this._time > this.duration + startDelay) {
        if (!this.loop) {
          this._isEmitting = false;
          return;
        }
      }

      this._emitRateTimeCounter += this.rateOverTime.evaluate(this._time / this.duration, 1) * dt;

      if (this._emitRateTimeCounter > 1 && this._isEmitting) {
        var emitNum = Math.floor(this._emitRateTimeCounter);
        this._emitRateTimeCounter -= emitNum;
        this.emit(emitNum, dt);
      }

      this.node.getWorldPosition(this._curWPos);
      var distance = jsonAsset.Vec3.distance(this._curWPos, this._oldWPos);
      jsonAsset.Vec3.copy(this._oldWPos, this._curWPos);
      this._emitRateDistanceCounter += distance * this.rateOverDistance.evaluate(this._time / this.duration, 1);

      if (this._emitRateDistanceCounter > 1 && this._isEmitting) {
        var _emitNum = Math.floor(this._emitRateDistanceCounter);

        this._emitRateDistanceCounter -= _emitNum;
        this.emit(_emitNum, dt);
      }

      for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this.bursts), _step; !(_step = _iterator()).done;) {
        var burst = _step.value;
        burst.update(this, dt);
      }
    }
  };

  _proto._resetPosition = function _resetPosition() {
    this.node.getWorldPosition(this._oldWPos);
    jsonAsset.Vec3.copy(this._curWPos, this._oldWPos);
  };

  _proto.addSubEmitter = function addSubEmitter(subEmitter) {
    this._subEmitters.push(subEmitter);
  };

  _proto.removeSubEmitter = function removeSubEmitter(idx) {
    this._subEmitters.splice(this._subEmitters.indexOf(idx), 1);
  };

  _proto.addBurst = function addBurst(burst) {
    this.bursts.push(burst);
  };

  _proto.removeBurst = function removeBurst(idx) {
    this.bursts.splice(this.bursts.indexOf(idx), 1);
  };

  _proto._onBeforeSerialize = function _onBeforeSerialize(props) {
    var _this2 = this;

    return this.enableCulling ? props.filter(function (p) {
      return !PARTICLE_MODULE_PROPERTY.includes(p) || _this2[p] && _this2[p].enable;
    }) : props;
  };

  jsonAsset._createClass(ParticleSystem, [{
    key: "isPlaying",
    get: function get() {
      return this._isPlaying;
    }
  }, {
    key: "isPaused",
    get: function get() {
      return this._isPaused;
    }
  }, {
    key: "isStopped",
    get: function get() {
      return this._isStopped;
    }
  }, {
    key: "isEmitting",
    get: function get() {
      return this._isEmitting;
    }
  }, {
    key: "time",
    get: function get() {
      return this._time;
    }
  }]);

  return ParticleSystem;
}(renderableComponent.RenderableComponent), _temp$g), (jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "capacity", [_dec5$d, _dec6$c], Object.getOwnPropertyDescriptor(_class2$g.prototype, "capacity"), _class2$g.prototype), _descriptor$g = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startColor", [_dec7$b, jsonAsset.serializable, _dec8$b, _dec9$b], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new GradientRange();
  }
}), _descriptor2$g = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "scaleSpace", [_dec10$a, jsonAsset.serializable, _dec11$a, _dec12$a], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Space.Local;
  }
}), _descriptor3$f = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startSize3D", [jsonAsset.serializable, _dec13$a, _dec14$a], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4$f = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startSizeX", [_dec15$a, _dec16$a, _dec17$8, _dec18$7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor5$d = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startSizeY", [_dec19$7, jsonAsset.serializable, _dec20$7, _dec21$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor6$b = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startSizeZ", [_dec22$5, jsonAsset.serializable, _dec23$5, _dec24$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor7$8 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startSpeed", [_dec25$5, jsonAsset.serializable, _dec26$4, _dec27$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor8$5 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startRotation3D", [jsonAsset.serializable, _dec28$2, _dec29$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9$3 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startRotationX", [_dec30$2, jsonAsset.serializable, jsonAsset.radian, _dec31$1, _dec32$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor10$3 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startRotationY", [_dec33$1, jsonAsset.serializable, jsonAsset.radian, _dec34$1, _dec35$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor11$3 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startRotationZ", [_dec36$1, _dec37$1, jsonAsset.radian, _dec38$1, _dec39$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor12$3 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startDelay", [_dec40$1, jsonAsset.serializable, _dec41$1, _dec42$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor13$3 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "startLifetime", [_dec43$1, jsonAsset.serializable, _dec44$1, _dec45$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor14$1 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "duration", [jsonAsset.serializable, _dec46$1, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5.0;
  }
}), _descriptor15$1 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "loop", [jsonAsset.serializable, _dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "prewarm", [_dec50, _dec51], Object.getOwnPropertyDescriptor(_class2$g.prototype, "prewarm"), _class2$g.prototype), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "simulationSpace", [_dec52, jsonAsset.serializable, _dec53, _dec54], Object.getOwnPropertyDescriptor(_class2$g.prototype, "simulationSpace"), _class2$g.prototype), _descriptor16$1 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "simulationSpeed", [jsonAsset.serializable, _dec55, _dec56], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1.0;
  }
}), _descriptor17$1 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "playOnAwake", [jsonAsset.serializable, _dec57, _dec58], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor18$1 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "gravityModifier", [_dec59, jsonAsset.serializable, _dec60, _dec61], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor19$1 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "rateOverTime", [_dec62, jsonAsset.serializable, _dec63, _dec64], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor20 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "rateOverDistance", [_dec65, jsonAsset.serializable, _dec66, _dec67], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new CurveRange();
  }
}), _descriptor21 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "bursts", [_dec68, jsonAsset.serializable, _dec69, _dec70], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "sharedMaterials", [jsonAsset.override, _dec71, _dec72, jsonAsset.serializable, _dec73], Object.getOwnPropertyDescriptor(_class2$g.prototype, "sharedMaterials"), _class2$g.prototype), _descriptor22 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_colorOverLifetimeModule", [_dec74], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "colorOverLifetimeModule", [_dec75, _dec76, _dec77], Object.getOwnPropertyDescriptor(_class2$g.prototype, "colorOverLifetimeModule"), _class2$g.prototype), _descriptor23 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_shapeModule", [_dec78], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "shapeModule", [_dec79, _dec80, _dec81], Object.getOwnPropertyDescriptor(_class2$g.prototype, "shapeModule"), _class2$g.prototype), _descriptor24 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_sizeOvertimeModule", [_dec82], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "sizeOvertimeModule", [_dec83, _dec84, _dec85], Object.getOwnPropertyDescriptor(_class2$g.prototype, "sizeOvertimeModule"), _class2$g.prototype), _descriptor25 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_velocityOvertimeModule", [_dec86], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "velocityOvertimeModule", [_dec87, _dec88, _dec89], Object.getOwnPropertyDescriptor(_class2$g.prototype, "velocityOvertimeModule"), _class2$g.prototype), _descriptor26 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_forceOvertimeModule", [_dec90], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "forceOvertimeModule", [_dec91, _dec92, _dec93], Object.getOwnPropertyDescriptor(_class2$g.prototype, "forceOvertimeModule"), _class2$g.prototype), _descriptor27 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_limitVelocityOvertimeModule", [_dec94], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "limitVelocityOvertimeModule", [_dec95, _dec96, _dec97], Object.getOwnPropertyDescriptor(_class2$g.prototype, "limitVelocityOvertimeModule"), _class2$g.prototype), _descriptor28 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_rotationOvertimeModule", [_dec98], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "rotationOvertimeModule", [_dec99, _dec100, _dec101], Object.getOwnPropertyDescriptor(_class2$g.prototype, "rotationOvertimeModule"), _class2$g.prototype), _descriptor29 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_textureAnimationModule", [_dec102], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "textureAnimationModule", [_dec103, _dec104, _dec105], Object.getOwnPropertyDescriptor(_class2$g.prototype, "textureAnimationModule"), _class2$g.prototype), _descriptor30 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_trailModule", [_dec106], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "trailModule", [_dec107, _dec108, _dec109], Object.getOwnPropertyDescriptor(_class2$g.prototype, "trailModule"), _class2$g.prototype), _descriptor31 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "renderer", [_dec110, jsonAsset.serializable, _dec111, _dec112], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new ParticleSystemRenderer();
  }
}), _descriptor32 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "enableCulling", [jsonAsset.serializable, _dec113, _dec114], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor33 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_prewarm", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor34 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_capacity", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 100;
  }
}), _descriptor35 = jsonAsset._applyDecoratedDescriptor(_class2$g.prototype, "_simulationSpace", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Space.Local;
  }
})), _class2$g)) || _class$g) || _class$g) || _class$g) || _class$g) || _class$g);

var ParticleUtils = function () {
  function ParticleUtils() {}

  ParticleUtils.instantiate = function instantiate(prefab) {
    if (!this.registeredSceneEvent) {
      index.director.on(index.Director.EVENT_BEFORE_SCENE_LAUNCH, this.onSceneUnload, this);
      this.registeredSceneEvent = true;
    }

    if (!this.particleSystemPool.has(prefab._uuid)) {
      this.particleSystemPool.set(prefab._uuid, new jsonAsset.Pool(function () {
        return jsonAsset.instantiate(prefab) || new jsonAsset.Node();
      }, 1));
    }

    return this.particleSystemPool.get(prefab._uuid).alloc();
  };

  ParticleUtils.destroy = function destroy(prefab) {
    if (this.particleSystemPool.has(prefab._prefab.asset._uuid)) {
      this.stop(prefab);
      this.particleSystemPool.get(prefab._prefab.asset._uuid).free(prefab);
    }
  };

  ParticleUtils.play = function play(rootNode) {
    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(rootNode.getComponentsInChildren(ParticleSystem)), _step; !(_step = _iterator()).done;) {
      var ps = _step.value;
      ps.play();
    }
  };

  ParticleUtils.stop = function stop(rootNode) {
    for (var _iterator2 = jsonAsset._createForOfIteratorHelperLoose(rootNode.getComponentsInChildren(ParticleSystem)), _step2; !(_step2 = _iterator2()).done;) {
      var ps = _step2.value;
      ps.stop();
    }
  };

  ParticleUtils.onSceneUnload = function onSceneUnload() {
    this.particleSystemPool.forEach(function (value) {
      value.destroy(function (prefab) {
        prefab.destroy();
      });
    });
    this.particleSystemPool.clear();
  };

  return ParticleUtils;
}();
ParticleUtils.particleSystemPool = new Map();
ParticleUtils.registeredSceneEvent = false;

jsonAsset.removeProperty(Burst.prototype, 'Burst.prototype', [{
  name: 'minCount'
}, {
  name: 'maxCount'
}]);
jsonAsset.legacyCC.ParticleSystemComponent = ParticleSystem;
jsonAsset.js$1.setClassAlias(ParticleSystem, 'cc.ParticleSystemComponent');
jsonAsset.legacyCC.BillboardComponent = Billboard;
jsonAsset.js$1.setClassAlias(Billboard, 'cc.BillboardComponent');
jsonAsset.legacyCC.LineComponent = Line;
jsonAsset.js$1.setClassAlias(Line, 'cc.LineComponent');

jsonAsset.legacyCC.ParticleUtils = ParticleUtils;

exports.AlphaKey = AlphaKey;
exports.Billboard = Billboard;
exports.BillboardComponent = Billboard;
exports.Burst = Burst;
exports.ColorKey = ColorKey;
exports.CurveRange = CurveRange;
exports.Gradient = Gradient;
exports.GradientRange = GradientRange;
exports.Line = Line;
exports.LineComponent = Line;
exports.ParticleSystem = ParticleSystem;
exports.ParticleSystemComponent = ParticleSystem;
exports.ParticleUtils = ParticleUtils;
