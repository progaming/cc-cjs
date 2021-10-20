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
var terrainAsset = require('./terrain-asset-bbf166bf.js');

var HeightField = function () {
  function HeightField(w, h) {
    this.data = new Uint16Array();
    this.w = 0;
    this.h = 0;
    this.w = w;
    this.h = h;
    this.data = new Uint16Array(w * h);

    for (var i = 0; i < w * h; ++i) {
      this.data[i] = 0;
    }
  }

  var _proto = HeightField.prototype;

  _proto.set = function set(i, j, value) {
    this.data[j * this.w + i] = value;
  };

  _proto.get = function get(i, j) {
    return this.data[j * this.w + i];
  };

  _proto.getClamp = function getClamp(i, j) {
    i = jsonAsset.clamp(i, 0, this.w - 1);
    j = jsonAsset.clamp(j, 0, this.h - 1);
    return this.get(i, j);
  };

  _proto.getAt = function getAt(x, y) {
    var fx = x;
    var fy = y;
    var ix0 = Math.floor(fx);
    var iz0 = Math.floor(fy);
    var ix1 = ix0 + 1;
    var iz1 = iz0 + 1;
    var dx = fx - ix0;
    var dz = fy - iz0;
    ix0 = jsonAsset.clamp(ix0, 0, this.w - 1);
    iz0 = jsonAsset.clamp(iz0, 0, this.h - 1);
    ix1 = jsonAsset.clamp(ix1, 0, this.w - 1);
    iz1 = jsonAsset.clamp(iz1, 0, this.h - 1);
    var a = this.get(ix0, iz0);
    var b = this.get(ix1, iz0);
    var c = this.get(ix0, iz1);
    var d = this.get(ix1, iz1);
    var m = (b + c) * 0.5;

    if (dx + dz <= 1.0) {
      d = m + (m - a);
    } else {
      a = m + (m - d);
    }

    var h1 = a * (1.0 - dx) + b * dx;
    var h2 = c * (1.0 - dx) + d * dx;
    var h = h1 * (1.0 - dz) + h2 * dz;
    return h;
  };

  return HeightField;
}();

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _dec2, _class4, _class5, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp2, _dec3, _class7, _class8, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _temp3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class10, _class11, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _temp4;
var bbMin = new jsonAsset.Vec3();
var bbMax = new jsonAsset.Vec3();
var TerrainInfo = (_dec = jsonAsset.ccclass('cc.TerrainInfo'), _dec(_class = (_class2 = (_temp = function () {
  function TerrainInfo() {
    jsonAsset._initializerDefineProperty(this, "tileSize", _descriptor, this);

    jsonAsset._initializerDefineProperty(this, "blockCount", _descriptor2, this);

    jsonAsset._initializerDefineProperty(this, "weightMapSize", _descriptor3, this);

    jsonAsset._initializerDefineProperty(this, "lightMapSize", _descriptor4, this);
  }

  jsonAsset._createClass(TerrainInfo, [{
    key: "size",
    get: function get() {
      var sz = new jsonAsset.Size$1(0, 0);
      sz.width = this.blockCount[0] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * this.tileSize;
      sz.height = this.blockCount[1] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * this.tileSize;
      return sz;
    }
  }, {
    key: "tileCount",
    get: function get() {
      var _tileCount = [0, 0];
      _tileCount[0] = this.blockCount[0] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
      _tileCount[1] = this.blockCount[1] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
      return _tileCount;
    }
  }, {
    key: "vertexCount",
    get: function get() {
      var _vertexCount = this.tileCount;
      _vertexCount[0] += 1;
      _vertexCount[1] += 1;
      return _vertexCount;
    }
  }]);

  return TerrainInfo;
}(), _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "tileSize", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "blockCount", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [1, 1];
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "weightMapSize", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 128;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "lightMapSize", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 128;
  }
})), _class2)) || _class);
var TerrainLayer = (_dec2 = jsonAsset.ccclass('cc.TerrainLayer'), _dec2(_class4 = (_class5 = (_temp2 = function TerrainLayer() {
  jsonAsset._initializerDefineProperty(this, "detailMap", _descriptor5, this);

  jsonAsset._initializerDefineProperty(this, "normalMap", _descriptor6, this);

  jsonAsset._initializerDefineProperty(this, "tileSize", _descriptor7, this);

  jsonAsset._initializerDefineProperty(this, "metallic", _descriptor8, this);

  jsonAsset._initializerDefineProperty(this, "roughness", _descriptor9, this);
}, _temp2), (_descriptor5 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "detailMap", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "normalMap", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor7 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "tileSize", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor8 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "metallic", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor9 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "roughness", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
})), _class5)) || _class4);

var TerrainRenderable = function (_RenderableComponent) {
  jsonAsset._inheritsLoose(TerrainRenderable, _RenderableComponent);

  function TerrainRenderable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _RenderableComponent.call.apply(_RenderableComponent, [this].concat(args)) || this;
    _this._model = null;
    _this._meshData = null;
    _this._brushMaterial = null;
    _this._currentMaterial = null;
    _this._currentMaterialLayers = 0;
    return _this;
  }

  var _proto = TerrainRenderable.prototype;

  _proto.destroy = function destroy() {
    if (this._model != null) {
      jsonAsset.legacyCC.director.root.destroyModel(this._model);
      this._model = null;
    }

    return _RenderableComponent.prototype.destroy.call(this);
  };

  _proto._destroyModel = function _destroyModel() {
    if (this._model != null) {
      jsonAsset.legacyCC.director.root.destroyModel(this._model);
      this._model = null;
    }
  };

  _proto._invalidMaterial = function _invalidMaterial() {
    if (this._currentMaterial == null) {
      return;
    }

    this._clearMaterials();

    this._currentMaterial = null;

    if (this._model != null) {
      this._model.enabled = false;
    }
  };

  _proto._updateMaterial = function _updateMaterial(block, init) {
    if (this._meshData == null || this._model == null) {
      return;
    }

    var nLayers = block.getMaxLayer();

    if (this._currentMaterial == null || nLayers !== this._currentMaterialLayers) {
      this._currentMaterial = new jsonAsset.Material();

      this._currentMaterial.initialize({
        effectAsset: block.getTerrain().getEffectAsset(),
        defines: block._getMaterialDefines(nLayers)
      });

      if (this._brushMaterial !== null && this._brushMaterial.passes !== null && this._brushMaterial.passes.length > 0) {
        var passes = this._currentMaterial.passes;
        passes.push(this._brushMaterial.passes[0]);
      }

      if (init) {
        this._model.initSubModel(0, this._meshData, this._currentMaterial);
      }

      this.setMaterial(this._currentMaterial, 0);
      this._currentMaterialLayers = nLayers;
      this._model.enabled = true;
      this._model.receiveShadow = block.getTerrain().receiveShadow;
    }
  };

  _proto._onMaterialModified = function _onMaterialModified(idx, mtl) {
    if (this._model == null) {
      return;
    }

    this._onRebuildPSO(idx, mtl || this._getBuiltinMaterial());
  };

  _proto._onRebuildPSO = function _onRebuildPSO(idx, material) {
    if (this._model) {
      this._model.setSubModelMaterial(idx, material);
    }
  };

  _proto._clearMaterials = function _clearMaterials() {
    if (this._model == null) {
      return;
    }

    this._onMaterialModified(0, null);
  };

  _proto._getBuiltinMaterial = function _getBuiltinMaterial() {
    return jsonAsset.builtinResMgr.get('missing-material');
  };

  return TerrainRenderable;
}(renderableComponent.RenderableComponent);

var TerrainBlockLightmapInfo = (_dec3 = jsonAsset.ccclass('cc.TerrainBlockLightmapInfo'), _dec3(_class7 = (_class8 = (_temp3 = function TerrainBlockLightmapInfo() {
  jsonAsset._initializerDefineProperty(this, "texture", _descriptor10, this);

  jsonAsset._initializerDefineProperty(this, "UOff", _descriptor11, this);

  jsonAsset._initializerDefineProperty(this, "VOff", _descriptor12, this);

  jsonAsset._initializerDefineProperty(this, "UScale", _descriptor13, this);

  jsonAsset._initializerDefineProperty(this, "VScale", _descriptor14, this);
}, _temp3), (_descriptor10 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "texture", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor11 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "UOff", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor12 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "VOff", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor13 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "UScale", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor14 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "VScale", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class8)) || _class7);
var TerrainBlock = function () {
  function TerrainBlock(t, i, j) {
    this._terrain = void 0;
    this._node = void 0;
    this._renderable = void 0;
    this._index = [1, 1];
    this._weightMap = null;
    this._lightmapInfo = null;
    this._terrain = t;
    this._index[0] = i;
    this._index[1] = j;
    this._lightmapInfo = t._getLightmapInfo(i, j);
    this._node = new jsonAsset.Node();

    this._node.setParent(this._terrain.node);

    this._node.hideFlags |= jsonAsset.CCObject.Flags.DontSave | jsonAsset.CCObject.Flags.HideInHierarchy;
    this._node.layer = this._terrain.node.layer;
    this._renderable = this._node.addComponent(TerrainRenderable);
  }

  var _proto2 = TerrainBlock.prototype;

  _proto2.build = function build() {
    var gfxDevice = index.director.root.device;
    var vertexData = new Float32Array(terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY);
    var index$1 = 0;
    bbMin.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    bbMax.set(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);

    for (var j = 0; j < terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY; ++j) {
      for (var i = 0; i < terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY; ++i) {
        var x = this._index[0] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY + i;
        var y = this._index[1] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY + j;

        var position = this._terrain.getPosition(x, y);

        var normal = this._terrain.getNormal(x, y);

        var uv = new jsonAsset.Vec2(i / terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY, j / terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY);
        vertexData[index$1++] = position.x;
        vertexData[index$1++] = position.y;
        vertexData[index$1++] = position.z;
        vertexData[index$1++] = normal.x;
        vertexData[index$1++] = normal.y;
        vertexData[index$1++] = normal.z;
        vertexData[index$1++] = uv.x;
        vertexData[index$1++] = uv.y;
        jsonAsset.Vec3.min(bbMin, bbMin, position);
        jsonAsset.Vec3.max(bbMax, bbMax, position);
      }
    }

    var vertexBuffer = gfxDevice.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY, terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT));
    vertexBuffer.update(vertexData);
    var gfxAttributes = [new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_NORMAL, jsonAsset.Format.RGB32F), new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RG32F)];
    this._renderable._meshData = new jsonAsset.RenderingSubMesh([vertexBuffer], gfxAttributes, jsonAsset.PrimitiveMode.TRIANGLE_LIST, this._terrain._getSharedIndexBuffer());
    var model = this._renderable._model = jsonAsset.legacyCC.director.root.createModel(view.Model);
    model.createBoundingShape(bbMin, bbMax);
    model.node = model.transform = this._node;

    this._renderable._getRenderScene().addModel(model);

    this._updateWeightMap();

    this._updateMaterial(true);
  };

  _proto2.rebuild = function rebuild() {
    this._updateHeight();

    this._updateWeightMap();

    this._renderable._invalidMaterial();

    this._updateMaterial(false);
  };

  _proto2.destroy = function destroy() {
    this._renderable._destroyModel();

    if (this._node != null) {
      this._node.destroy();
    }

    if (this._weightMap != null) {
      this._weightMap.destroy();
    }
  };

  _proto2.update = function update() {
    this._updateMaterial(false);

    var useNormalMap = this._terrain.useNormalMap;
    var usePBR = this._terrain.usePBR;

    var getDetailTex = function getDetailTex(layer) {
      return layer !== null ? layer.detailMap : null;
    };

    var getNormalTex = function getNormalTex(layer) {
      var normalTex = layer !== null ? layer.normalMap : null;

      if (normalTex === null) {
        normalTex = jsonAsset.legacyCC.builtinResMgr.get('normal-texture');
      }

      return normalTex;
    };

    var mtl = this._renderable._currentMaterial;

    if (mtl !== null) {
      var nlayers = this.getMaxLayer();
      var uvScale = new jsonAsset.Vec4(1, 1, 1, 1);
      var roughness = new jsonAsset.Vec4(1, 1, 1, 1);
      var metallic = new jsonAsset.Vec4(0, 0, 0, 0);

      if (nlayers === 0) {
        if (this.layers[0] !== -1) {
          var l0 = this._terrain.getLayer(this.layers[0]);

          if (l0 !== null) {
            uvScale.x = 1.0 / l0.tileSize;
            roughness.x = l0.roughness;
            metallic.x = l0.metallic;
          }

          mtl.setProperty('detailMap0', getDetailTex(l0));

          if (useNormalMap) {
            mtl.setProperty('normalMap0', getNormalTex(l0));
          }
        } else {
          mtl.setProperty('detailMap0', jsonAsset.legacyCC.builtinResMgr.get('default-texture'));

          if (useNormalMap) {
            mtl.setProperty('normalMap0', jsonAsset.legacyCC.builtinResMgr.get('normal-texture'));
          }
        }
      } else if (nlayers === 1) {
        var _l = this._terrain.getLayer(this.layers[0]);

        var l1 = this._terrain.getLayer(this.layers[1]);

        if (_l !== null) {
          uvScale.x = 1.0 / _l.tileSize;
          roughness.x = _l.roughness;
          metallic.x = _l.metallic;
        }

        if (l1 !== null) {
          uvScale.y = 1.0 / l1.tileSize;
          roughness.y = l1.roughness;
          metallic.y = l1.metallic;
        }

        mtl.setProperty('weightMap', this._weightMap);
        mtl.setProperty('detailMap0', getDetailTex(_l));
        mtl.setProperty('detailMap1', getDetailTex(l1));

        if (useNormalMap) {
          mtl.setProperty('normalMap0', getNormalTex(_l));
          mtl.setProperty('normalMap1', getNormalTex(l1));
        }
      } else if (nlayers === 2) {
        var _l2 = this._terrain.getLayer(this.layers[0]);

        var _l3 = this._terrain.getLayer(this.layers[1]);

        var l2 = this._terrain.getLayer(this.layers[2]);

        if (_l2 !== null) {
          uvScale.x = 1.0 / _l2.tileSize;
          roughness.x = _l2.roughness;
          metallic.x = _l2.metallic;
        }

        if (_l3 !== null) {
          uvScale.y = 1.0 / _l3.tileSize;
          roughness.y = _l3.roughness;
          metallic.y = _l3.metallic;
        }

        if (l2 !== null) {
          uvScale.z = 1.0 / l2.tileSize;
          roughness.z = l2.roughness;
          metallic.z = l2.metallic;
        }

        mtl.setProperty('weightMap', this._weightMap);
        mtl.setProperty('detailMap0', getDetailTex(_l2));
        mtl.setProperty('detailMap1', getDetailTex(_l3));
        mtl.setProperty('detailMap2', getDetailTex(l2));

        if (useNormalMap) {
          mtl.setProperty('normalMap0', getNormalTex(_l2));
          mtl.setProperty('normalMap1', getNormalTex(_l3));
          mtl.setProperty('normalMap2', getNormalTex(l2));
        }
      } else if (nlayers === 3) {
        var _l4 = this._terrain.getLayer(this.layers[0]);

        var _l5 = this._terrain.getLayer(this.layers[1]);

        var _l6 = this._terrain.getLayer(this.layers[2]);

        var l3 = this._terrain.getLayer(this.layers[3]);

        if (_l4 !== null) {
          uvScale.x = 1.0 / _l4.tileSize;
          roughness.x = _l4.roughness;
          metallic.x = _l4.metallic;
        }

        if (_l5 !== null) {
          uvScale.y = 1.0 / _l5.tileSize;
          roughness.y = _l5.roughness;
          metallic.y = _l5.metallic;
        }

        if (_l6 !== null) {
          uvScale.z = 1.0 / _l6.tileSize;
          roughness.z = _l6.roughness;
          metallic.z = _l6.metallic;
        }

        if (l3 !== null) {
          uvScale.w = 1.0 / l3.tileSize;
          roughness.w = l3.roughness;
          metallic.w = l3.metallic;
        }

        mtl.setProperty('weightMap', this._weightMap);
        mtl.setProperty('detailMap0', getDetailTex(_l4));
        mtl.setProperty('detailMap1', getDetailTex(_l5));
        mtl.setProperty('detailMap2', getDetailTex(_l6));
        mtl.setProperty('detailMap3', getDetailTex(l3));

        if (useNormalMap) {
          mtl.setProperty('normalMap0', getNormalTex(_l4));
          mtl.setProperty('normalMap1', getNormalTex(_l5));
          mtl.setProperty('normalMap2', getNormalTex(_l6));
          mtl.setProperty('normalMap3', getNormalTex(l3));
        }
      }

      mtl.setProperty('UVScale', uvScale);

      if (usePBR) {
        mtl.setProperty('roughness', roughness);
        mtl.setProperty('metallic', metallic);
      }

      if (this.lightmap !== null) {
        mtl.setProperty('lightMap', this.lightmap);
        mtl.setProperty('lightMapUVParam', this.lightmapUVParam);
      }
    }
  };

  _proto2.setBrushMaterial = function setBrushMaterial(mtl) {
    if (this._renderable._brushMaterial !== mtl) {
      this._renderable._brushMaterial = mtl;

      this._renderable._invalidMaterial();
    }
  };

  _proto2.getTerrain = function getTerrain() {
    return this._terrain;
  };

  _proto2.getIndex = function getIndex() {
    return this._index;
  };

  _proto2.getRect = function getRect() {
    var rect = new jsonAsset.Rect$1();
    rect.x = this._index[0] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    rect.y = this._index[1] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    rect.width = terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    rect.height = terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
    return rect;
  };

  _proto2.setLayer = function setLayer(index, layerId) {
    if (this.layers[index] !== layerId) {
      this._terrain.setBlockLayer(this._index[0], this._index[1], index, layerId);

      this._renderable._invalidMaterial();

      this._updateMaterial(false);
    }
  };

  _proto2.getLayer = function getLayer(index) {
    return this.layers[index];
  };

  _proto2.getMaxLayer = function getMaxLayer() {
    if (this.layers[3] >= 0) {
      return 3;
    }

    if (this.layers[2] >= 0) {
      return 2;
    }

    if (this.layers[1] >= 0) {
      return 1;
    }

    return 0;
  };

  _proto2._getMaterialDefines = function _getMaterialDefines(nlayers) {
    return {
      LAYERS: nlayers + 1,
      USE_LIGHTMAP: this.lightmap !== null ? 1 : 0,
      USE_NORMALMAP: this._terrain.useNormalMap ? 1 : 0,
      USE_PBR: this._terrain.usePBR ? 1 : 0
    };
  };

  _proto2._invalidMaterial = function _invalidMaterial() {
    this._renderable._invalidMaterial();
  };

  _proto2._updateMaterial = function _updateMaterial(init) {
    this._renderable._updateMaterial(this, init);
  };

  _proto2._updateHeight = function _updateHeight() {
    if (this._renderable._meshData == null) {
      return;
    }

    var vertexData = new Float32Array(terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY);
    var index = 0;
    bbMin.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    bbMax.set(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);

    for (var j = 0; j < terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY; ++j) {
      for (var i = 0; i < terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY; ++i) {
        var x = this._index[0] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY + i;
        var y = this._index[1] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY + j;

        var position = this._terrain.getPosition(x, y);

        var normal = this._terrain.getNormal(x, y);

        var uv = new jsonAsset.Vec2(i / terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY, j / terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY);
        vertexData[index++] = position.x;
        vertexData[index++] = position.y;
        vertexData[index++] = position.z;
        vertexData[index++] = normal.x;
        vertexData[index++] = normal.y;
        vertexData[index++] = normal.z;
        vertexData[index++] = uv.x;
        vertexData[index++] = uv.y;
        jsonAsset.Vec3.min(bbMin, bbMin, position);
        jsonAsset.Vec3.max(bbMax, bbMax, position);
      }
    }

    this._renderable._meshData.vertexBuffers[0].update(vertexData);

    this._renderable._model.createBoundingShape(bbMin, bbMax);

    this._renderable._model.updateWorldBound();
  };

  _proto2._updateWeightMap = function _updateWeightMap() {
    var nlayers = this.getMaxLayer();

    if (nlayers === 0) {
      if (this._weightMap != null) {
        this._weightMap.destroy();

        this._weightMap = null;
      }

      return;
    }

    if (this._weightMap == null) {
      this._weightMap = new jsonAsset.Texture2D();

      this._weightMap.create(this._terrain.weightMapSize, this._terrain.weightMapSize, jsonAsset.PixelFormat.RGBA8888);

      this._weightMap.setFilters(jsonAsset.Filter$1.LINEAR, jsonAsset.Filter$1.LINEAR);

      this._weightMap.setWrapMode(jsonAsset.WrapMode$1.CLAMP_TO_EDGE, jsonAsset.WrapMode$1.CLAMP_TO_EDGE);
    }

    var weightData = new Uint8Array(this._terrain.weightMapSize * this._terrain.weightMapSize * 4);
    var weightIndex = 0;

    for (var j = 0; j < this._terrain.weightMapSize; ++j) {
      for (var i = 0; i < this._terrain.weightMapSize; ++i) {
        var x = this._index[0] * this._terrain.weightMapSize + i;
        var y = this._index[1] * this._terrain.weightMapSize + j;

        var w = this._terrain.getWeight(x, y);

        weightData[weightIndex * 4 + 0] = Math.floor(w.x * 255);
        weightData[weightIndex * 4 + 1] = Math.floor(w.y * 255);
        weightData[weightIndex * 4 + 2] = Math.floor(w.z * 255);
        weightData[weightIndex * 4 + 3] = Math.floor(w.w * 255);
        weightIndex += 1;
      }
    }

    this._weightMap.uploadData(weightData);
  };

  _proto2._updateLightmap = function _updateLightmap(info) {
    this._lightmapInfo = info;

    this._invalidMaterial();
  };

  jsonAsset._createClass(TerrainBlock, [{
    key: "valid",
    get: function get() {
      if (this._terrain === null) {
        return false;
      }

      var blocks = this._terrain.getBlocks();

      for (var i = 0; i < blocks.length; ++i) {
        if (blocks[i] === this) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "layers",
    get: function get() {
      return this._terrain.getBlockLayers(this._index[0], this._index[1]);
    }
  }, {
    key: "lightmap",
    get: function get() {
      return this._lightmapInfo ? this._lightmapInfo.texture : null;
    }
  }, {
    key: "lightmapUVParam",
    get: function get() {
      if (this._lightmapInfo != null) {
        return new jsonAsset.Vec4(this._lightmapInfo.UOff, this._lightmapInfo.VOff, this._lightmapInfo.UScale, this._lightmapInfo.VScale);
      }

      return new jsonAsset.Vec4(0, 0, 0, 0);
    }
  }]);

  return TerrainBlock;
}();
var Terrain = (_dec4 = jsonAsset.ccclass('cc.Terrain'), _dec5 = jsonAsset.help(), _dec6 = jsonAsset.type(terrainAsset.TerrainAsset), _dec7 = jsonAsset.type(jsonAsset.EffectAsset), _dec8 = jsonAsset.visible(), _dec9 = jsonAsset.type(TerrainBlockLightmapInfo), _dec10 = jsonAsset.type(jsonAsset.CCBoolean), _dec11 = jsonAsset.type(jsonAsset.CCBoolean), _dec12 = jsonAsset.type(jsonAsset.CCBoolean), _dec13 = jsonAsset.type(terrainAsset.TerrainAsset), _dec14 = jsonAsset.visible(), _dec15 = jsonAsset.type(jsonAsset.EffectAsset), _dec16 = jsonAsset.visible(), _dec17 = jsonAsset.type(TerrainInfo), _dec4(_class10 = _dec5(_class10 = jsonAsset.executeInEditMode(_class10 = jsonAsset.disallowMultiple(_class10 = (_class11 = (_temp4 = function (_Component) {
  jsonAsset._inheritsLoose(Terrain, _Component);

  function Terrain() {
    var _this2;

    _this2 = _Component.call(this) || this;

    jsonAsset._initializerDefineProperty(_this2, "__asset", _descriptor15, jsonAsset._assertThisInitialized(_this2));

    jsonAsset._initializerDefineProperty(_this2, "_effectAsset", _descriptor16, jsonAsset._assertThisInitialized(_this2));

    jsonAsset._initializerDefineProperty(_this2, "_lightmapInfos", _descriptor17, jsonAsset._assertThisInitialized(_this2));

    jsonAsset._initializerDefineProperty(_this2, "_receiveShadow", _descriptor18, jsonAsset._assertThisInitialized(_this2));

    jsonAsset._initializerDefineProperty(_this2, "_useNormalmap", _descriptor19, jsonAsset._assertThisInitialized(_this2));

    jsonAsset._initializerDefineProperty(_this2, "_usePBR", _descriptor20, jsonAsset._assertThisInitialized(_this2));

    _this2._tileSize = 1;
    _this2._blockCount = [1, 1];
    _this2._weightMapSize = 128;
    _this2._lightMapSize = 128;
    _this2._heights = new Uint16Array();
    _this2._weights = new Uint8Array();
    _this2._normals = [];
    _this2._layerList = [];
    _this2._layerBuffer = [];
    _this2._blocks = [];
    _this2._sharedIndexBuffer = null;

    for (var i = 0; i < terrainAsset.TERRAIN_MAX_LAYER_COUNT; ++i) {
      _this2._layerList.push(null);
    }

    return _this2;
  }

  var _proto3 = Terrain.prototype;

  _proto3.build = function build(info) {
    this._tileSize = info.tileSize;
    this._blockCount[0] = info.blockCount[0];
    this._blockCount[1] = info.blockCount[1];
    this._weightMapSize = info.weightMapSize;
    this._lightMapSize = info.lightMapSize;
    return this._buildImp();
  };

  _proto3.rebuild = function rebuild(info) {
    for (var i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].destroy();
    }

    this._blocks = [];

    this._rebuildLayerBuffer(info);

    this._rebuildHeights(info);

    this._rebuildWeights(info);

    this._tileSize = info.tileSize;
    this._blockCount[0] = info.blockCount[0];
    this._blockCount[1] = info.blockCount[1];
    this._weightMapSize = info.weightMapSize;
    this._lightMapSize = info.lightMapSize;

    this._buildNormals();

    for (var j = 0; j < this._blockCount[1]; ++j) {
      for (var _i2 = 0; _i2 < this._blockCount[0]; ++_i2) {
        this._blocks.push(new TerrainBlock(this, _i2, j));
      }
    }

    for (var _i3 = 0; _i3 < this._blocks.length; ++_i3) {
      this._blocks[_i3].build();
    }
  };

  _proto3.importHeightField = function importHeightField(hf, heightScale) {
    var index = 0;

    for (var j = 0; j < this.vertexCount[1]; ++j) {
      for (var i = 0; i < this.vertexCount[0]; ++i) {
        var u = i / this.tileCount[0];
        var v = j / this.tileCount[1];
        var h = hf.getAt(u * hf.w, v * hf.h) * heightScale;
        this._heights[index++] = h;
      }
    }

    this._buildNormals();

    for (var _i4 = 0; _i4 < this._blocks.length; ++_i4) {
      this._blocks[_i4]._updateHeight();
    }
  };

  _proto3.exportHeightField = function exportHeightField(hf, heightScale) {
    var index = 0;

    for (var j = 0; j < hf.h; ++j) {
      for (var i = 0; i < hf.w; ++i) {
        var u = i / (hf.w - 1);
        var v = j / (hf.h - 1);
        var x = u * this.size.width;
        var y = v * this.size.height;
        var h = this.getHeightAt(x, y);

        if (h != null) {
          hf.data[index++] = h * heightScale;
        }
      }
    }
  };

  _proto3.exportAsset = function exportAsset() {
    var asset = new terrainAsset.TerrainAsset();
    asset.tileSize = this.tileSize;
    asset.blockCount = this.blockCount;
    asset.lightMapSize = this.lightMapSize;
    asset.weightMapSize = this.weightMapSize;
    asset.heights = this.heights;
    asset.weights = this.weights;
    asset.layerBuffer = new Array(this._blocks.length * 4);

    for (var i = 0; i < this._blocks.length; ++i) {
      asset.layerBuffer[i * 4 + 0] = this._blocks[i].layers[0];
      asset.layerBuffer[i * 4 + 1] = this._blocks[i].layers[1];
      asset.layerBuffer[i * 4 + 2] = this._blocks[i].layers[2];
      asset.layerBuffer[i * 4 + 3] = this._blocks[i].layers[3];
    }

    for (var _i5 = 0; _i5 < this._layerList.length; ++_i5) {
      var temp = this._layerList[_i5];

      if (temp && temp.detailMap && jsonAsset.isValid(temp.detailMap)) {
        var layer = new terrainAsset.TerrainLayerInfo();
        layer.slot = _i5;
        layer.tileSize = temp.tileSize;
        layer.detailMap = temp.detailMap;
        layer.normalMap = temp.normalMap;
        layer.metallic = temp.metallic;
        layer.roughness = temp.roughness;
        asset.layerInfos.push(layer);
      }
    }

    return asset;
  };

  _proto3.getEffectAsset = function getEffectAsset() {
    if (this._effectAsset === null) {
      return jsonAsset.legacyCC.EffectAsset.get('terrain');
    }

    return this._effectAsset;
  };

  _proto3.onLoad = function onLoad() {
    var gfxDevice = jsonAsset.legacyCC.director.root.device;
    var indexData = new Uint16Array(terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * 6);
    var index = 0;

    for (var j = 0; j < terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY; ++j) {
      for (var i = 0; i < terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY; ++i) {
        var a = j * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY + i;
        var b = j * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY + i + 1;
        var c = (j + 1) * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY + i;
        var d = (j + 1) * terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY + i + 1;
        indexData[index++] = a;
        indexData[index++] = c;
        indexData[index++] = b;
        indexData[index++] = b;
        indexData[index++] = c;
        indexData[index++] = d;
      }
    }

    this._sharedIndexBuffer = gfxDevice.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, Uint16Array.BYTES_PER_ELEMENT * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * 6, Uint16Array.BYTES_PER_ELEMENT));

    this._sharedIndexBuffer.update(indexData);
  };

  _proto3.onEnable = function onEnable() {
    if (this._blocks.length === 0) {
      this._buildImp();
    }
  };

  _proto3.onDisable = function onDisable() {
    for (var i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].destroy();
    }

    this._blocks = [];
  };

  _proto3.onDestroy = function onDestroy() {
    for (var i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].destroy();
    }

    this._blocks = [];

    for (var _i6 = 0; _i6 < this._layerList.length; ++_i6) {
      this._layerList[_i6] = null;
    }

    if (this._sharedIndexBuffer != null) {
      this._sharedIndexBuffer.destroy();
    }
  };

  _proto3.onRestore = function onRestore() {
    this.onDisable();
    this.onLoad();

    this._buildImp(true);
  };

  _proto3.update = function update(deltaTime) {
    for (var i = 0; i < this._blocks.length; ++i) {
      this._blocks[i].update();
    }
  };

  _proto3.addLayer = function addLayer(layer) {
    for (var i = 0; i < this._layerList.length; ++i) {
      var _this$_layerList$i;

      if (this._layerList[i] === null || this._layerList[i] && ((_this$_layerList$i = this._layerList[i]) === null || _this$_layerList$i === void 0 ? void 0 : _this$_layerList$i.detailMap) === null) {
        this._layerList[i] = layer;
        return i;
      }
    }

    return -1;
  };

  _proto3.setLayer = function setLayer(i, layer) {
    this._layerList[i] = layer;
  };

  _proto3.removeLayer = function removeLayer(id) {
    this._layerList[id] = null;
  };

  _proto3.getLayer = function getLayer(id) {
    if (id === -1) {
      return null;
    }

    return this._layerList[id];
  };

  _proto3.getPosition = function getPosition(i, j) {
    var x = i * this._tileSize;
    var z = j * this._tileSize;
    var y = this.getHeight(i, j);
    return new jsonAsset.Vec3(x, y, z);
  };

  _proto3.getHeightField = function getHeightField() {
    return this._heights;
  };

  _proto3.setHeight = function setHeight(i, j, h) {
    h = jsonAsset.clamp(h, terrainAsset.TERRAIN_HEIGHT_FMIN, terrainAsset.TERRAIN_HEIGHT_FMAX);
    this._heights[j * this.vertexCount[0] + i] = terrainAsset.TERRAIN_HEIGHT_BASE + h / terrainAsset.TERRAIN_HEIGHT_FACTORY;
  };

  _proto3.getHeight = function getHeight(i, j) {
    return (this._heights[j * this.vertexCount[0] + i] - terrainAsset.TERRAIN_HEIGHT_BASE) * terrainAsset.TERRAIN_HEIGHT_FACTORY;
  };

  _proto3.getHeightClamp = function getHeightClamp(i, j) {
    i = jsonAsset.clamp(i, 0, this.vertexCount[0] - 1);
    j = jsonAsset.clamp(j, 0, this.vertexCount[1] - 1);
    return this.getHeight(i, j);
  };

  _proto3.getHeightAt = function getHeightAt(x, y) {
    var fx = x / this.tileSize;
    var fy = y / this.tileSize;
    var ix0 = Math.floor(fx);
    var iz0 = Math.floor(fy);
    var ix1 = ix0 + 1;
    var iz1 = iz0 + 1;
    var dx = fx - ix0;
    var dz = fy - iz0;

    if (ix0 < 0 || ix0 > this.vertexCount[0] - 1 || iz0 < 0 || iz0 > this.vertexCount[1] - 1) {
      return null;
    }

    ix0 = jsonAsset.clamp(ix0, 0, this.vertexCount[0] - 1);
    iz0 = jsonAsset.clamp(iz0, 0, this.vertexCount[1] - 1);
    ix1 = jsonAsset.clamp(ix1, 0, this.vertexCount[0] - 1);
    iz1 = jsonAsset.clamp(iz1, 0, this.vertexCount[1] - 1);
    var a = this.getHeight(ix0, iz0);
    var b = this.getHeight(ix1, iz0);
    var c = this.getHeight(ix0, iz1);
    var d = this.getHeight(ix1, iz1);
    var m = (b + c) * 0.5;

    if (dx + dz <= 1.0) {
      d = m + (m - a);
    } else {
      a = m + (m - d);
    }

    var h1 = a * (1.0 - dx) + b * dx;
    var h2 = c * (1.0 - dx) + d * dx;
    var h = h1 * (1.0 - dz) + h2 * dz;
    return h;
  };

  _proto3._setNormal = function _setNormal(i, j, n) {
    var index = j * this.vertexCount[0] + i;
    this._normals[index * 3 + 0] = n.x;
    this._normals[index * 3 + 1] = n.y;
    this._normals[index * 3 + 2] = n.z;
  };

  _proto3.getNormal = function getNormal(i, j) {
    var index = j * this.vertexCount[0] + i;
    var n = new jsonAsset.Vec3();
    n.x = this._normals[index * 3 + 0];
    n.y = this._normals[index * 3 + 1];
    n.z = this._normals[index * 3 + 2];
    return n;
  };

  _proto3.getNormalAt = function getNormalAt(x, y) {
    var fx = x / this.tileSize;
    var fy = y / this.tileSize;
    var ix0 = Math.floor(fx);
    var iz0 = Math.floor(fy);
    var ix1 = ix0 + 1;
    var iz1 = iz0 + 1;
    var dx = fx - ix0;
    var dz = fy - iz0;

    if (ix0 < 0 || ix0 > this.vertexCount[0] - 1 || iz0 < 0 || iz0 > this.vertexCount[1] - 1) {
      return null;
    }

    ix0 = jsonAsset.clamp(ix0, 0, this.vertexCount[0] - 1);
    iz0 = jsonAsset.clamp(iz0, 0, this.vertexCount[1] - 1);
    ix1 = jsonAsset.clamp(ix1, 0, this.vertexCount[0] - 1);
    iz1 = jsonAsset.clamp(iz1, 0, this.vertexCount[1] - 1);
    var a = this.getNormal(ix0, iz0);
    var b = this.getNormal(ix1, iz0);
    var c = this.getNormal(ix0, iz1);
    var d = this.getNormal(ix1, iz1);
    var m = new jsonAsset.Vec3();
    jsonAsset.Vec3.add(m, b, c).multiplyScalar(0.5);

    if (dx + dz <= 1.0) {
      d.set(m);
      d.subtract(a);
      d.add(m);
    } else {
      a.set(m);
      a.subtract(d);
      a.add(m);
    }

    var n1 = new jsonAsset.Vec3();
    var n2 = new jsonAsset.Vec3();
    var n = new jsonAsset.Vec3();
    jsonAsset.Vec3.lerp(n1, a, b, dx);
    jsonAsset.Vec3.lerp(n2, c, d, dx);
    jsonAsset.Vec3.lerp(n, n1, n2, dz);
    return n;
  };

  _proto3.setWeight = function setWeight(i, j, w) {
    var index = j * this._weightMapSize * this._blockCount[0] + i;
    this._weights[index * 4 + 0] = w.x * 255;
    this._weights[index * 4 + 1] = w.y * 255;
    this._weights[index * 4 + 2] = w.z * 255;
    this._weights[index * 4 + 3] = w.w * 255;
  };

  _proto3.getWeight = function getWeight(i, j) {
    var index = j * this._weightMapSize * this._blockCount[0] + i;
    var w = new jsonAsset.Vec4();
    w.x = this._weights[index * 4 + 0] / 255.0;
    w.y = this._weights[index * 4 + 1] / 255.0;
    w.z = this._weights[index * 4 + 2] / 255.0;
    w.w = this._weights[index * 4 + 3] / 255.0;
    return w;
  };

  _proto3.getWeightAt = function getWeightAt(x, y) {
    var uWeigthComplexity = this.weightMapSize * this.blockCount[0];
    var vWeigthComplexity = this.weightMapSize * this.blockCount[1];

    if (uWeigthComplexity === 0 || vWeigthComplexity === 0) {
      return null;
    }

    var fx = x / uWeigthComplexity;
    var fy = y / vWeigthComplexity;
    var ix0 = Math.floor(fx);
    var iz0 = Math.floor(fy);
    var ix1 = ix0 + 1;
    var iz1 = iz0 + 1;
    var dx = fx - ix0;
    var dz = fy - iz0;

    if (ix0 < 0 || ix0 > uWeigthComplexity - 1 || iz0 < 0 || iz0 > vWeigthComplexity - 1) {
      return null;
    }

    ix0 = jsonAsset.clamp(ix0, 0, uWeigthComplexity - 1);
    iz0 = jsonAsset.clamp(iz0, 0, vWeigthComplexity - 1);
    ix1 = jsonAsset.clamp(ix1, 0, uWeigthComplexity - 1);
    iz1 = jsonAsset.clamp(iz1, 0, vWeigthComplexity - 1);
    var a = this.getWeight(ix0, iz0);
    var b = this.getWeight(ix1, iz0);
    var c = this.getWeight(ix0, iz1);
    var d = this.getWeight(ix1, iz1);
    var m = new jsonAsset.Vec4();
    jsonAsset.Vec4.add(m, b, c).multiplyScalar(0.5);

    if (dx + dz <= 1.0) {
      d = new jsonAsset.Vec4();
      jsonAsset.Vec4.subtract(d, m, a).add(m);
    } else {
      a = new jsonAsset.Vec4();
      jsonAsset.Vec4.subtract(a, m, d).add(m);
    }

    var n1 = new jsonAsset.Vec4();
    var n2 = new jsonAsset.Vec4();
    var n = new jsonAsset.Vec4();
    jsonAsset.Vec4.lerp(n1, a, b, dx);
    jsonAsset.Vec4.lerp(n2, c, d, dx);
    jsonAsset.Vec4.lerp(n, n1, n2, dz);
    return n;
  };

  _proto3.getMaxWeightLayerAt = function getMaxWeightLayerAt(x, y) {
    var uWeigthComplexity = this.weightMapSize * this.blockCount[0];
    var vWeigthComplexity = this.weightMapSize * this.blockCount[1];

    if (uWeigthComplexity === 0 || vWeigthComplexity === 0) {
      return null;
    }

    var fx = x / uWeigthComplexity;
    var fy = y / vWeigthComplexity;
    var ix0 = Math.floor(fx);
    var iz0 = Math.floor(fy);

    if (ix0 < 0 || ix0 > uWeigthComplexity - 1 || iz0 < 0 || iz0 > vWeigthComplexity - 1) {
      return null;
    }

    var w = this.getWeight(ix0, iz0);
    var bx = Math.floor(x / this.weightMapSize);
    var by = Math.floor(y / this.weightMapSize);
    var block = this.getBlock(bx, by);
    var i = 0;

    if (w.y > w[i] && block.getLayer(1) !== -1) {
      i = 1;
    }

    if (w.y > w[i] && block.getLayer(2) !== -1) {
      i = 2;
    }

    if (w.z > w[i] && block.getLayer(3) !== -1) {
      i = 3;
    }

    i = block.getLayer(i);
    return this.getLayer(i);
  };

  _proto3.getBlockLayers = function getBlockLayers(i, j) {
    var layerIndex = (j * this._blockCount[0] + i) * terrainAsset.TERRAIN_MAX_BLEND_LAYERS;
    return [this._layerBuffer[layerIndex], this._layerBuffer[layerIndex + 1], this._layerBuffer[layerIndex + 2], this._layerBuffer[layerIndex + 3]];
  };

  _proto3.getBlockLayer = function getBlockLayer(i, j, index) {
    var layerIndex = (j * this._blockCount[0] + i) * terrainAsset.TERRAIN_MAX_BLEND_LAYERS;
    return this._layerBuffer[layerIndex + index];
  };

  _proto3.setBlockLayer = function setBlockLayer(i, j, index, layerId) {
    var layerIndex = (j * this._blockCount[0] + i) * terrainAsset.TERRAIN_MAX_BLEND_LAYERS;
    this._layerBuffer[layerIndex + index] = layerId;
  };

  _proto3.getBlock = function getBlock(i, j) {
    return this._blocks[j * this._blockCount[0] + i];
  };

  _proto3.getBlocks = function getBlocks() {
    return this._blocks;
  };

  _proto3.rayCheck = function rayCheck(start, dir, step, worldSpace) {
    if (worldSpace === void 0) {
      worldSpace = true;
    }

    var MAX_COUNT = 2000;
    var trace = start;

    if (worldSpace) {
      jsonAsset.Vec3.subtract(trace, start, this.node.getWorldPosition());
    }

    var delta = new jsonAsset.Vec3();
    delta.set(dir);
    delta.multiplyScalar(step);
    var position = null;

    if (dir.equals(new jsonAsset.Vec3(0, 1, 0))) {
      var y = this.getHeightAt(trace.x, trace.z);

      if (y != null && trace.y <= y) {
        position = new jsonAsset.Vec3(trace.x, y, trace.z);
      }
    } else if (dir.equals(new jsonAsset.Vec3(0, -1, 0))) {
      var _y2 = this.getHeightAt(trace.x, trace.z);

      if (_y2 != null && trace.y >= _y2) {
        position = new jsonAsset.Vec3(trace.x, _y2, trace.z);
      }
    } else {
      var i = 0;

      while (i++ < MAX_COUNT) {
        var _y3 = this.getHeightAt(trace.x, trace.z);

        if (_y3 != null && trace.y <= _y3) {
          break;
        }

        trace.add(dir);
      }

      while (i++ < MAX_COUNT) {
        var _y4 = this.getHeightAt(trace.x, trace.z);

        if (_y4 != null && trace.y <= _y4) {
          position = new jsonAsset.Vec3(trace.x, _y4, trace.z);
          break;
        }

        trace.add(delta);
      }
    }

    return position;
  };

  _proto3._getSharedIndexBuffer = function _getSharedIndexBuffer() {
    return this._sharedIndexBuffer;
  };

  _proto3._resetLightmap = function _resetLightmap(enble) {
    this._lightmapInfos.length = 0;

    if (enble) {
      for (var i = 0; i < this._blockCount[0] * this._blockCount[1]; ++i) {
        this._lightmapInfos.push(new TerrainBlockLightmapInfo());
      }
    }
  };

  _proto3._updateLightmap = function _updateLightmap(blockId, tex, uOff, vOff, uScale, vScale) {
    this._lightmapInfos[blockId].texture = tex;
    this._lightmapInfos[blockId].UOff = uOff;
    this._lightmapInfos[blockId].VOff = vOff;
    this._lightmapInfos[blockId].UScale = uScale;
    this._lightmapInfos[blockId].VScale = vScale;

    this._blocks[blockId]._updateLightmap(this._lightmapInfos[blockId]);
  };

  _proto3._getLightmapInfo = function _getLightmapInfo(i, j) {
    var index = j * this._blockCount[0] + i;
    return index < this._lightmapInfos.length ? this._lightmapInfos[index] : null;
  };

  _proto3._calcNormal = function _calcNormal(x, z) {
    var flip = 1;
    var here = this.getPosition(x, z);
    var right;
    var up;

    if (x < this.vertexCount[0] - 1) {
      right = this.getPosition(x + 1, z);
    } else {
      flip *= -1;
      right = this.getPosition(x - 1, z);
    }

    if (z < this.vertexCount[1] - 1) {
      up = this.getPosition(x, z + 1);
    } else {
      flip *= -1;
      up = this.getPosition(x, z - 1);
    }

    right.subtract(here);
    up.subtract(here);
    var normal = new jsonAsset.Vec3();
    normal.set(up);
    normal.cross(right);
    normal.multiplyScalar(flip);
    normal.normalize();
    return normal;
  };

  _proto3._buildNormals = function _buildNormals() {
    var index = 0;

    for (var y = 0; y < this.vertexCount[1]; ++y) {
      for (var x = 0; x < this.vertexCount[0]; ++x) {
        var n = this._calcNormal(x, y);

        this._normals[index * 3 + 0] = n.x;
        this._normals[index * 3 + 1] = n.y;
        this._normals[index * 3 + 2] = n.z;
        index += 1;
      }
    }
  };

  _proto3._buildImp = function _buildImp(restore) {
    var _this3 = this;

    if (restore === void 0) {
      restore = false;
    }

    if (this.valid) {
      return;
    }

    var terrainAsset$1 = this.__asset;

    if (!restore && terrainAsset$1 !== null) {
      this._tileSize = terrainAsset$1.tileSize;
      this._blockCount = terrainAsset$1.blockCount;
      this._weightMapSize = terrainAsset$1.weightMapSize;
      this._lightMapSize = terrainAsset$1.lightMapSize;
      this._heights = terrainAsset$1.heights;
      this._weights = terrainAsset$1.weights;
      this._layerBuffer = terrainAsset$1.layerBuffer;

      for (var i = 0; i < this._layerList.length; ++i) {
        this._layerList[i] = null;
      }

      if (terrainAsset$1.version < terrainAsset.TERRAIN_DATA_VERSION5) {
        var _loop = function _loop(_i7) {
          var layer = new TerrainLayer();
          var layerInfo = terrainAsset$1.layerBinaryInfos[_i7];
          layer.tileSize = layerInfo.tileSize;
          jsonAsset.legacyCC.assetManager.loadAny(layerInfo.detailMapId, function (err, asset) {
            layer.detailMap = asset;
          });

          if (layerInfo.normalMapId !== '') {
            jsonAsset.legacyCC.assetManager.loadAny(layerInfo.normalMapId, function (err, asset) {
              layer.normalMap = asset;
            });
          }

          layer.roughness = layerInfo.roughness;
          layer.metallic = layerInfo.metallic;
          _this3._layerList[layerInfo.slot] = layer;
        };

        for (var _i7 = 0; _i7 < terrainAsset$1.layerBinaryInfos.length; ++_i7) {
          _loop(_i7);
        }
      } else {
        for (var _i8 = 0; _i8 < terrainAsset$1.layerInfos.length; ++_i8) {
          var layer = new TerrainLayer();
          var layerInfo = terrainAsset$1.layerInfos[_i8];
          layer.tileSize = layerInfo.tileSize;
          layer.detailMap = layerInfo.detailMap;
          layer.normalMap = layerInfo.normalMap;
          layer.roughness = layerInfo.roughness;
          layer.metallic = layerInfo.metallic;
          this._layerList[layerInfo.slot] = layer;
        }
      }
    }

    if (this._blockCount[0] === 0 || this._blockCount[1] === 0) {
      return;
    }

    var vertexCount = this.vertexCount[0] * this.vertexCount[1];

    if (this._heights === null || this._heights.length !== vertexCount) {
      this._heights = new Uint16Array(vertexCount);
      this._normals = new Array(vertexCount * 3);

      for (var _i9 = 0; _i9 < vertexCount; ++_i9) {
        this._heights[_i9] = terrainAsset.TERRAIN_HEIGHT_BASE;
        this._normals[_i9 * 3 + 0] = 0;
        this._normals[_i9 * 3 + 1] = 1;
        this._normals[_i9 * 3 + 2] = 0;
      }
    } else {
      this._normals = new Array(vertexCount * 3);

      this._buildNormals();
    }

    var layerBufferSize = this.blockCount[0] * this.blockCount[1] * terrainAsset.TERRAIN_MAX_BLEND_LAYERS;

    if (this._layerBuffer === null || this._layerBuffer.length !== layerBufferSize) {
      this._layerBuffer = new Array(layerBufferSize);

      for (var _i10 = 0; _i10 < layerBufferSize; ++_i10) {
        this._layerBuffer[_i10] = -1;
      }
    }

    var weightMapComplexityU = this._weightMapSize * this._blockCount[0];
    var weightMapComplexityV = this._weightMapSize * this._blockCount[1];

    if (this._weights.length !== weightMapComplexityU * weightMapComplexityV * 4) {
      this._weights = new Uint8Array(weightMapComplexityU * weightMapComplexityV * 4);

      for (var _i11 = 0; _i11 < weightMapComplexityU * weightMapComplexityV; ++_i11) {
        this._weights[_i11 * 4 + 0] = 255;
        this._weights[_i11 * 4 + 1] = 0;
        this._weights[_i11 * 4 + 2] = 0;
        this._weights[_i11 * 4 + 3] = 0;
      }
    }

    for (var j = 0; j < this._blockCount[1]; ++j) {
      for (var _i12 = 0; _i12 < this._blockCount[0]; ++_i12) {
        this._blocks.push(new TerrainBlock(this, _i12, j));
      }
    }

    for (var _i13 = 0; _i13 < this._blocks.length; ++_i13) {
      this._blocks[_i13].build();
    }
  };

  _proto3._rebuildHeights = function _rebuildHeights(info) {
    if (this.vertexCount[0] === info.vertexCount[0] && this.vertexCount[1] === info.vertexCount[1]) {
      return false;
    }

    var heights = new Uint16Array(info.vertexCount[0] * info.vertexCount[1]);

    for (var i = 0; i < heights.length; ++i) {
      heights[i] = terrainAsset.TERRAIN_HEIGHT_BASE;
    }

    var w = Math.min(this.vertexCount[0], info.vertexCount[0]);
    var h = Math.min(this.vertexCount[1], info.vertexCount[1]);

    for (var j = 0; j < h; ++j) {
      for (var _i14 = 0; _i14 < w; ++_i14) {
        var index0 = j * info.vertexCount[0] + _i14;
        var index1 = j * this.vertexCount[0] + _i14;
        heights[index0] = this._heights[index1];
      }
    }

    this._heights = heights;
    return true;
  };

  _proto3._rebuildLayerBuffer = function _rebuildLayerBuffer(info) {
    if (this.blockCount[0] === info.blockCount[0] && this.blockCount[1] === info.blockCount[1]) {
      return false;
    }

    var layerBuffer = [];
    layerBuffer.length = info.blockCount[0] * info.blockCount[1] * terrainAsset.TERRAIN_MAX_BLEND_LAYERS;

    for (var i = 0; i < layerBuffer.length; ++i) {
      layerBuffer[i] = -1;
    }

    var w = Math.min(this.blockCount[0], info.blockCount[0]);
    var h = Math.min(this.blockCount[1], info.blockCount[1]);

    for (var j = 0; j < h; ++j) {
      for (var _i15 = 0; _i15 < w; ++_i15) {
        var index0 = j * info.blockCount[0] + _i15;
        var index1 = j * this.blockCount[0] + _i15;

        for (var l = 0; l < terrainAsset.TERRAIN_MAX_BLEND_LAYERS; ++l) {
          layerBuffer[index0 * terrainAsset.TERRAIN_MAX_BLEND_LAYERS + l] = this._layerBuffer[index1 * terrainAsset.TERRAIN_MAX_BLEND_LAYERS + l];
        }
      }
    }

    this._layerBuffer = layerBuffer;
    return true;
  };

  _proto3._rebuildWeights = function _rebuildWeights(info) {
    var _this4 = this;

    var oldWeightMapSize = this._weightMapSize;
    var oldWeightMapComplexityU = this._weightMapSize * this._blockCount[0];
    var oldWeightMapComplexityV = this._weightMapSize * this._blockCount[1];
    var weightMapComplexityU = info.weightMapSize * info.blockCount[0];
    var weightMapComplexityV = info.weightMapSize * info.blockCount[1];

    if (weightMapComplexityU === oldWeightMapComplexityU && weightMapComplexityV === oldWeightMapComplexityV) {
      return false;
    }

    var weights = new Uint8Array(weightMapComplexityU * weightMapComplexityV * 4);

    for (var i = 0; i < weightMapComplexityU * weightMapComplexityV; ++i) {
      weights[i * 4 + 0] = 255;
      weights[i * 4 + 1] = 0;
      weights[i * 4 + 2] = 0;
      weights[i * 4 + 3] = 0;
    }

    var w = Math.min(info.blockCount[0], this._blockCount[0]);
    var h = Math.min(info.blockCount[1], this._blockCount[1]);

    var getOldWeight = function getOldWeight(_i, _j, _weights) {
      var index = _j * oldWeightMapComplexityU + _i;
      var weight = new jsonAsset.Vec4();
      weight.x = _weights[index * 4 + 0] / 255.0;
      weight.y = _weights[index * 4 + 1] / 255.0;
      weight.z = _weights[index * 4 + 2] / 255.0;
      weight.w = _weights[index * 4 + 3] / 255.0;
      return weight;
    };

    var sampleOldWeight = function sampleOldWeight(_x, _y, _xOff, _yOff, _weights) {
      var ix0 = Math.floor(_x);
      var iz0 = Math.floor(_y);
      var ix1 = ix0 + 1;
      var iz1 = iz0 + 1;
      var dx = _x - ix0;
      var dz = _y - iz0;
      var a = getOldWeight(ix0 + _xOff, iz0 + _yOff, _this4._weights);
      var b = getOldWeight(ix1 + _xOff, iz0 + _yOff, _this4._weights);
      var c = getOldWeight(ix0 + _xOff, iz1 + _yOff, _this4._weights);
      var d = getOldWeight(ix1 + _xOff, iz1 + _yOff, _this4._weights);
      var m = new jsonAsset.Vec4();
      jsonAsset.Vec4.add(m, b, c).multiplyScalar(0.5);

      if (dx + dz <= 1.0) {
        d.set(m);
        d.subtract(a);
        d.add(m);
      } else {
        a.set(m);
        a.subtract(d);
        a.add(m);
      }

      var n1 = new jsonAsset.Vec4();
      var n2 = new jsonAsset.Vec4();
      var n = new jsonAsset.Vec4();
      jsonAsset.Vec4.lerp(n1, a, b, dx);
      jsonAsset.Vec4.lerp(n2, c, d, dx);
      jsonAsset.Vec4.lerp(n, n1, n2, dz);
      return n;
    };

    for (var j = 0; j < h; ++j) {
      for (var _i16 = 0; _i16 < w; ++_i16) {
        var uOff = _i16 * oldWeightMapSize;
        var vOff = j * oldWeightMapSize;

        for (var v = 0; v < info.weightMapSize; ++v) {
          for (var u = 0; u < info.weightMapSize; ++u) {
            var _w = void 0;

            if (info.weightMapSize === oldWeightMapSize) {
              _w = getOldWeight(u + uOff, v + vOff, this._weights);
            } else {
              var x = u / (info.weightMapSize - 1) * (oldWeightMapSize - 1);
              var y = v / (info.weightMapSize - 1) * (oldWeightMapSize - 1);
              _w = sampleOldWeight(x, y, uOff, vOff, this._weights);
            }

            var du = _i16 * info.weightMapSize + u;
            var dv = j * info.weightMapSize + v;
            var index = dv * weightMapComplexityU + du;
            weights[index * 4 + 0] = _w.x * 255;
            weights[index * 4 + 1] = _w.y * 255;
            weights[index * 4 + 2] = _w.z * 255;
            weights[index * 4 + 3] = _w.w * 255;
          }
        }
      }
    }

    this._weights = weights;
    return true;
  };

  jsonAsset._createClass(Terrain, [{
    key: "_asset",
    set: function set(value) {
      if (this.__asset !== value) {
        this.__asset = value;

        if (this.__asset != null && this.valid) {
          for (var i = 0; i < this._blocks.length; ++i) {
            this._blocks[i].destroy();
          }

          this._blocks = [];

          this._buildImp();
        }
      }
    },
    get: function get() {
      return this.__asset;
    }
  }, {
    key: "effectAsset",
    set: function set(value) {
      if (this._effectAsset === value) {
        return;
      }

      this._effectAsset = value;

      for (var i = 0; i < this._blocks.length; ++i) {
        this._blocks[i]._invalidMaterial();
      }
    },
    get: function get() {
      return this._effectAsset;
    }
  }, {
    key: "receiveShadow",
    get: function get() {
      return this._receiveShadow;
    },
    set: function set(val) {
      this._receiveShadow = val;

      for (var i = 0; i < this._blocks.length; i++) {
        this._blocks[i]._invalidMaterial();
      }
    }
  }, {
    key: "useNormalMap",
    get: function get() {
      return this._useNormalmap;
    },
    set: function set(val) {
      this._useNormalmap = val;

      for (var i = 0; i < this._blocks.length; i++) {
        this._blocks[i]._invalidMaterial();
      }
    }
  }, {
    key: "usePBR",
    get: function get() {
      return this._usePBR;
    },
    set: function set(val) {
      this._usePBR = val;

      for (var i = 0; i < this._blocks.length; i++) {
        this._blocks[i]._invalidMaterial();
      }
    }
  }, {
    key: "size",
    get: function get() {
      var sz = new jsonAsset.Size$1(0, 0);
      sz.width = this.blockCount[0] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * this.tileSize;
      sz.height = this.blockCount[1] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY * this.tileSize;
      return sz;
    }
  }, {
    key: "tileSize",
    get: function get() {
      return this._tileSize;
    }
  }, {
    key: "tileCount",
    get: function get() {
      return [this.blockCount[0] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY, this.blockCount[1] * terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY];
    }
  }, {
    key: "vertexCount",
    get: function get() {
      var _vertexCount = this.tileCount;
      _vertexCount[0] += 1;
      _vertexCount[1] += 1;
      return _vertexCount;
    }
  }, {
    key: "blockCount",
    get: function get() {
      return this._blockCount;
    }
  }, {
    key: "lightMapSize",
    get: function get() {
      return this._lightMapSize;
    }
  }, {
    key: "weightMapSize",
    get: function get() {
      return this._weightMapSize;
    }
  }, {
    key: "heights",
    get: function get() {
      return this._heights;
    }
  }, {
    key: "weights",
    get: function get() {
      return this._weights;
    }
  }, {
    key: "valid",
    get: function get() {
      return this._blocks.length > 0;
    }
  }, {
    key: "info",
    get: function get() {
      var ti = new TerrainInfo();
      ti.tileSize = this.tileSize;
      ti.blockCount[0] = this.blockCount[0];
      ti.blockCount[1] = this.blockCount[1];
      ti.weightMapSize = this.weightMapSize;
      ti.lightMapSize = this.lightMapSize;
      return ti;
    }
  }]);

  return Terrain;
}(jsonAsset.Component), _temp4), (_descriptor15 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "__asset", [_dec6, jsonAsset.serializable, jsonAsset.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor16 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "_effectAsset", [_dec7, jsonAsset.serializable, jsonAsset.disallowAnimation, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor17 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "_lightmapInfos", [_dec9, jsonAsset.serializable, jsonAsset.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor18 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "_receiveShadow", [_dec10, jsonAsset.serializable, jsonAsset.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor19 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "_useNormalmap", [_dec11, jsonAsset.serializable, jsonAsset.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor20 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "_usePBR", [_dec12, jsonAsset.serializable, jsonAsset.disallowAnimation], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class11.prototype, "_asset", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class11.prototype, "_asset"), _class11.prototype), jsonAsset._applyDecoratedDescriptor(_class11.prototype, "effectAsset", [_dec15, _dec16], Object.getOwnPropertyDescriptor(_class11.prototype, "effectAsset"), _class11.prototype), jsonAsset._applyDecoratedDescriptor(_class11.prototype, "receiveShadow", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class11.prototype, "receiveShadow"), _class11.prototype), jsonAsset._applyDecoratedDescriptor(_class11.prototype, "useNormalMap", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class11.prototype, "useNormalMap"), _class11.prototype), jsonAsset._applyDecoratedDescriptor(_class11.prototype, "usePBR", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class11.prototype, "usePBR"), _class11.prototype), jsonAsset._applyDecoratedDescriptor(_class11.prototype, "info", [_dec17], Object.getOwnPropertyDescriptor(_class11.prototype, "info"), _class11.prototype)), _class11)) || _class10) || _class10) || _class10) || _class10);

exports.TERRAIN_BLOCK_TILE_COMPLEXITY = terrainAsset.TERRAIN_BLOCK_TILE_COMPLEXITY;
exports.TERRAIN_BLOCK_VERTEX_COMPLEXITY = terrainAsset.TERRAIN_BLOCK_VERTEX_COMPLEXITY;
exports.TERRAIN_BLOCK_VERTEX_SIZE = terrainAsset.TERRAIN_BLOCK_VERTEX_SIZE;
exports.TERRAIN_DATA_VERSION = terrainAsset.TERRAIN_DATA_VERSION;
exports.TERRAIN_DATA_VERSION2 = terrainAsset.TERRAIN_DATA_VERSION2;
exports.TERRAIN_DATA_VERSION3 = terrainAsset.TERRAIN_DATA_VERSION3;
exports.TERRAIN_DATA_VERSION4 = terrainAsset.TERRAIN_DATA_VERSION4;
exports.TERRAIN_DATA_VERSION5 = terrainAsset.TERRAIN_DATA_VERSION5;
exports.TERRAIN_DATA_VERSION_DEFAULT = terrainAsset.TERRAIN_DATA_VERSION_DEFAULT;
exports.TERRAIN_EAST_INDEX = terrainAsset.TERRAIN_EAST_INDEX;
exports.TERRAIN_HEIGHT_BASE = terrainAsset.TERRAIN_HEIGHT_BASE;
exports.TERRAIN_HEIGHT_FACTORY = terrainAsset.TERRAIN_HEIGHT_FACTORY;
exports.TERRAIN_HEIGHT_FMAX = terrainAsset.TERRAIN_HEIGHT_FMAX;
exports.TERRAIN_HEIGHT_FMIN = terrainAsset.TERRAIN_HEIGHT_FMIN;
exports.TERRAIN_MAX_BLEND_LAYERS = terrainAsset.TERRAIN_MAX_BLEND_LAYERS;
exports.TERRAIN_MAX_LAYER_COUNT = terrainAsset.TERRAIN_MAX_LAYER_COUNT;
exports.TERRAIN_MAX_LEVELS = terrainAsset.TERRAIN_MAX_LEVELS;
exports.TERRAIN_NORTH_INDEX = terrainAsset.TERRAIN_NORTH_INDEX;
exports.TERRAIN_SOUTH_INDEX = terrainAsset.TERRAIN_SOUTH_INDEX;
exports.TERRAIN_WEST_INDEX = terrainAsset.TERRAIN_WEST_INDEX;
exports.TerrainAsset = terrainAsset.TerrainAsset;
exports.TerrainLayerBinaryInfo = terrainAsset.TerrainLayerBinaryInfo;
exports.TerrainLayerInfo = terrainAsset.TerrainLayerInfo;
exports.HeightField = HeightField;
exports.Terrain = Terrain;
exports.TerrainBlock = TerrainBlock;
exports.TerrainBlockLightmapInfo = TerrainBlockLightmapInfo;
exports.TerrainInfo = TerrainInfo;
exports.TerrainLayer = TerrainLayer;
