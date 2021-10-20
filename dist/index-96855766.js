'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var view = require('./view-c0f88f03.js');
var textureBufferPool = require('./texture-buffer-pool-e09c9995.js');
var transformUtils = require('./transform-utils-3cfb96de.js');
var createMesh = require('./create-mesh-074915d2.js');
var mesh = require('./mesh-1b66157b.js');
var meshRenderer = require('./mesh-renderer-4bdcdd3f.js');
var skeleton = require('./skeleton-42e69a3d.js');

function toPPM(buffer, w, h) {
  return "P3 " + w + " " + h + " 255\n" + buffer.filter(function (e, i) {
    return i % 4 < 3;
  }).toString() + "\n";
}

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    find: jsonAsset.find,
    toPPM: toPPM,
    readMesh: createMesh.readMesh,
    createMesh: createMesh.createMesh,
    readBuffer: jsonAsset.readBuffer,
    writeBuffer: jsonAsset.writeBuffer,
    mapBuffer: jsonAsset.mapBuffer
});

function checkMaterialisSame(comp1, comp2) {
  var matNum = comp1.sharedMaterials.length;

  if (matNum !== comp2.sharedMaterials.length) {
    return false;
  }

  for (var i = 0; i < matNum; i++) {
    if (comp1.getRenderMaterial(i) !== comp2.getRenderMaterial(i)) {
      return false;
    }
  }

  return true;
}

var BatchingUtility = function () {
  function BatchingUtility() {}

  BatchingUtility.batchStaticModel = function batchStaticModel(staticModelRoot, batchedRoot) {
    var models = staticModelRoot.getComponentsInChildren(meshRenderer.MeshRenderer);

    if (models.length < 2) {
      console.error('the number of static models to batch is less than 2,it needn\'t batch.');
      return false;
    }

    for (var i = 1; i < models.length; i++) {
      if (!models[0].mesh.validateMergingMesh(models[i].mesh)) {
        console.error("the meshes of " + models[0].node.name + " and " + models[i].node.name + " can't be merged");
        return false;
      }

      if (!checkMaterialisSame(models[0], models[i])) {
        console.error("the materials of " + models[0].node.name + " and " + models[i].node.name + " can't be merged");
        return false;
      }
    }

    var batchedMesh = new mesh.Mesh();
    var worldMat = new jsonAsset.Mat4();
    var rootWorldMatInv = new jsonAsset.Mat4();
    staticModelRoot.getWorldMatrix(rootWorldMatInv);
    jsonAsset.Mat4.invert(rootWorldMatInv, rootWorldMatInv);

    for (var _i = 0; _i < models.length; _i++) {
      var comp = models[_i];
      comp.node.getWorldMatrix(worldMat);
      jsonAsset.Mat4.multiply(worldMat, rootWorldMatInv, worldMat);
      batchedMesh.merge(models[_i].mesh, worldMat);
      comp.enabled = false;
    }

    var batchedModel = batchedRoot.addComponent(meshRenderer.MeshRenderer);
    batchedModel.mesh = batchedMesh;
    batchedModel.sharedMaterials = models[0].sharedMaterials;
    return true;
  };

  BatchingUtility.unbatchStaticModel = function unbatchStaticModel(staticModelRoot, batchedRoot) {
    var models = staticModelRoot.getComponentsInChildren(meshRenderer.MeshRenderer);

    for (var i = 0; i < models.length; i++) {
      var comp = models[i];
      comp.enabled = true;
    }

    var batchedModel = batchedRoot.getComponent(meshRenderer.MeshRenderer);

    if (batchedModel) {
      if (batchedModel.mesh) {
        batchedModel.mesh.destroyRenderingMesh();
      }

      batchedModel.destroy();
    }

    return true;
  };

  return BatchingUtility;
}();

jsonAsset.removeProperty(meshRenderer.MeshRenderer.prototype, 'MeshRenderer.prototype', [{
  name: 'enableDynamicBatching'
}, {
  name: 'recieveShadows'
}]);
jsonAsset.legacyCC.ModelComponent = meshRenderer.MeshRenderer;
jsonAsset.js$1.setClassAlias(meshRenderer.MeshRenderer, 'cc.ModelComponent');

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class4, _class5, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class6, _temp2;
var PhotometricTerm = jsonAsset.Enum({
  LUMINOUS_POWER: 0,
  LUMINANCE: 1
});

var _color_tmp = new jsonAsset.Vec3();

var StaticLightSettings = (_dec = jsonAsset.ccclass('cc.StaticLightSettings'), _dec(_class = (_class2 = (_temp = function () {
  function StaticLightSettings() {
    jsonAsset._initializerDefineProperty(this, "_baked", _descriptor, this);

    jsonAsset._initializerDefineProperty(this, "_editorOnly", _descriptor2, this);

    jsonAsset._initializerDefineProperty(this, "_bakeable", _descriptor3, this);

    jsonAsset._initializerDefineProperty(this, "_castShadow", _descriptor4, this);
  }

  jsonAsset._createClass(StaticLightSettings, [{
    key: "editorOnly",
    get: function get() {
      return this._editorOnly;
    },
    set: function set(val) {
      this._editorOnly = val;
    }
  }, {
    key: "baked",
    get: function get() {
      return this._baked;
    },
    set: function set(val) {
      this._baked = val;
    }
  }, {
    key: "bakeable",
    get: function get() {
      return this._bakeable;
    },
    set: function set(val) {
      this._bakeable = val;
    }
  }, {
    key: "castShadow",
    get: function get() {
      return this._castShadow;
    },
    set: function set(val) {
      this._castShadow = val;
    }
  }]);

  return StaticLightSettings;
}(), _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_baked", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_editorOnly", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_bakeable", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_castShadow", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "editorOnly", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "editorOnly"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "bakeable", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "bakeable"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "castShadow", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "castShadow"), _class2.prototype)), _class2)) || _class);
var Light = (_dec2 = jsonAsset.ccclass('cc.Light'), _dec3 = jsonAsset.tooltip(), _dec4 = jsonAsset.tooltip(), _dec5 = jsonAsset.range(), _dec6 = jsonAsset.tooltip(), _dec7 = jsonAsset.type(StaticLightSettings), _dec2(_class4 = (_class5 = (_temp2 = _class6 = function (_Component) {
  jsonAsset._inheritsLoose(Light, _Component);

  jsonAsset._createClass(Light, [{
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(val) {
      this._color = val;

      if (this._light) {
        _color_tmp.x = val.r / 255.0;
        _color_tmp.y = val.g / 255.0;
        _color_tmp.z = val.b / 255.0;
        this._light.color = _color_tmp;
      }
    }
  }, {
    key: "useColorTemperature",
    get: function get() {
      return this._useColorTemperature;
    },
    set: function set(enable) {
      this._useColorTemperature = enable;

      if (this._light) {
        this._light.useColorTemperature = enable;
      }
    }
  }, {
    key: "colorTemperature",
    get: function get() {
      return this._colorTemperature;
    },
    set: function set(val) {
      this._colorTemperature = val;

      if (this._light) {
        this._light.colorTemperature = val;
      }
    }
  }, {
    key: "staticSettings",
    get: function get() {
      return this._staticSettings;
    },
    set: function set(val) {
      this._staticSettings = val;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "baked",
    get: function get() {
      return this.staticSettings.baked;
    },
    set: function set(val) {
      this.staticSettings.baked = val;

      if (this._light !== null) {
        this._light.baked = val;
      }
    }
  }]);

  function Light() {
    var _this;

    _this = _Component.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_color", _descriptor5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_useColorTemperature", _descriptor6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_colorTemperature", _descriptor7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_staticSettings", _descriptor8, jsonAsset._assertThisInitialized(_this));

    _this._type = view.LightType.UNKNOWN;
    _this._lightType = void 0;
    _this._light = null;
    _this._lightType = view.Light;
    return _this;
  }

  var _proto = Light.prototype;

  _proto.onLoad = function onLoad() {
    this._createLight();
  };

  _proto.onEnable = function onEnable() {
    this._attachToScene();
  };

  _proto.onDisable = function onDisable() {
    this._detachFromScene();
  };

  _proto.onDestroy = function onDestroy() {
    this._destroyLight();
  };

  _proto._createLight = function _createLight() {
    if (!this._light) {
      this._light = jsonAsset.legacyCC.director.root.createLight(this._lightType);
    }

    this.color = this._color;
    this.useColorTemperature = this._useColorTemperature;
    this.colorTemperature = this._colorTemperature;
    this._light.node = this.node;
    this._light.baked = this.baked;
  };

  _proto._destroyLight = function _destroyLight() {
    if (this._light) {
      jsonAsset.legacyCC.director.root.destroyLight(this);
      this._light = null;
    }
  };

  _proto._attachToScene = function _attachToScene() {
    this._detachFromScene();

    if (this._light && !this._light.scene && this.node.scene) {
      var renderScene = this._getRenderScene();

      switch (this._type) {
        case view.LightType.DIRECTIONAL:
          renderScene.addDirectionalLight(this._light);
          renderScene.setMainLight(this._light);
          break;

        case view.LightType.SPHERE:
          renderScene.addSphereLight(this._light);
          break;

        case view.LightType.SPOT:
          renderScene.addSpotLight(this._light);
          break;
      }
    }
  };

  _proto._detachFromScene = function _detachFromScene() {
    if (this._light && this._light.scene) {
      var renderScene = this._light.scene;

      switch (this._type) {
        case view.LightType.DIRECTIONAL:
          renderScene.removeDirectionalLight(this._light);
          renderScene.unsetMainLight(this._light);
          break;

        case view.LightType.SPHERE:
          renderScene.removeSphereLight(this._light);
          break;

        case view.LightType.SPOT:
          renderScene.removeSpotLight(this._light);
          break;
      }
    }
  };

  return Light;
}(jsonAsset.Component), _class6.Type = view.LightType, _class6.PhotometricTerm = PhotometricTerm, _temp2), (_descriptor5 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "_color", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Color$1.WHITE.clone();
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "_useColorTemperature", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "_colorTemperature", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 6550;
  }
}), _descriptor8 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "_staticSettings", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new StaticLightSettings();
  }
}), jsonAsset._applyDecoratedDescriptor(_class5.prototype, "color", [_dec3], Object.getOwnPropertyDescriptor(_class5.prototype, "color"), _class5.prototype), jsonAsset._applyDecoratedDescriptor(_class5.prototype, "useColorTemperature", [_dec4], Object.getOwnPropertyDescriptor(_class5.prototype, "useColorTemperature"), _class5.prototype), jsonAsset._applyDecoratedDescriptor(_class5.prototype, "colorTemperature", [jsonAsset.slide, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class5.prototype, "colorTemperature"), _class5.prototype), jsonAsset._applyDecoratedDescriptor(_class5.prototype, "staticSettings", [_dec7], Object.getOwnPropertyDescriptor(_class5.prototype, "staticSettings"), _class5.prototype)), _class5)) || _class4);

var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5$1, _class$1, _class2$1, _descriptor$1, _temp$1;
var DirectionalLight = (_dec$1 = jsonAsset.ccclass('cc.DirectionalLight'), _dec2$1 = jsonAsset.help(), _dec3$1 = jsonAsset.menu(), _dec4$1 = jsonAsset.unit(), _dec5$1 = jsonAsset.tooltip(), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3$1(_class$1 = jsonAsset.executeInEditMode(_class$1 = (_class2$1 = (_temp$1 = function (_Light) {
  jsonAsset._inheritsLoose(DirectionalLight, _Light);

  jsonAsset._createClass(DirectionalLight, [{
    key: "illuminance",
    get: function get() {
      return this._illuminance;
    },
    set: function set(val) {
      this._illuminance = val;

      if (this._light) {
        this._light.illuminance = this._illuminance;
      }
    }
  }]);

  function DirectionalLight() {
    var _this;

    _this = _Light.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_illuminance", _descriptor$1, jsonAsset._assertThisInitialized(_this));

    _this._type = view.LightType.DIRECTIONAL;
    _this._light = null;
    _this._lightType = view.DirectionalLight;
    return _this;
  }

  var _proto = DirectionalLight.prototype;

  _proto._createLight = function _createLight() {
    _Light.prototype._createLight.call(this);

    if (!this._light) {
      return;
    }

    this.illuminance = this._illuminance;
  };

  return DirectionalLight;
}(Light), _temp$1), (_descriptor$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_illuminance", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 65000;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "illuminance", [_dec4$1, _dec5$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "illuminance"), _class2$1.prototype)), _class2$1)) || _class$1) || _class$1) || _class$1) || _class$1);

var _dec$2, _dec2$2, _dec3$2, _dec4$2, _dec5$2, _dec6$1, _dec7$1, _dec8, _dec9, _dec10, _dec11, _class$2, _class2$2, _descriptor$2, _descriptor2$1, _descriptor3$1, _descriptor4$1, _temp$2;
var SphereLight = (_dec$2 = jsonAsset.ccclass('cc.SphereLight'), _dec2$2 = jsonAsset.help(), _dec3$2 = jsonAsset.menu(), _dec4$2 = jsonAsset.unit(), _dec5$2 = jsonAsset.tooltip(), _dec6$1 = jsonAsset.unit(), _dec7$1 = jsonAsset.tooltip(), _dec8 = jsonAsset.type(PhotometricTerm), _dec9 = jsonAsset.tooltip(), _dec10 = jsonAsset.tooltip(), _dec11 = jsonAsset.tooltip(), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$2(_class$2 = jsonAsset.executeInEditMode(_class$2 = (_class2$2 = (_temp$2 = function (_Light) {
  jsonAsset._inheritsLoose(SphereLight, _Light);

  jsonAsset._createClass(SphereLight, [{
    key: "luminousPower",
    get: function get() {
      return this._luminance * view.nt2lm(this._size);
    },
    set: function set(val) {
      this._luminance = val / view.nt2lm(this._size);

      if (this._light) {
        this._light.luminance = this._luminance;
      }
    }
  }, {
    key: "luminance",
    get: function get() {
      return this._luminance;
    },
    set: function set(val) {
      this._luminance = val;

      if (this._light) {
        this._light.luminance = val;
      }
    }
  }, {
    key: "term",
    get: function get() {
      return this._term;
    },
    set: function set(val) {
      this._term = val;
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    },
    set: function set(val) {
      this._size = val;

      if (this._light) {
        this._light.size = val;
      }
    }
  }, {
    key: "range",
    get: function get() {
      return this._range;
    },
    set: function set(val) {
      this._range = val;

      if (this._light) {
        this._light.range = val;
      }
    }
  }]);

  function SphereLight() {
    var _this;

    _this = _Light.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_size", _descriptor$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_luminance", _descriptor2$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_term", _descriptor3$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_range", _descriptor4$1, jsonAsset._assertThisInitialized(_this));

    _this._type = view.LightType.SPHERE;
    _this._light = null;
    _this._lightType = view.SphereLight;
    return _this;
  }

  var _proto = SphereLight.prototype;

  _proto._createLight = function _createLight() {
    _Light.prototype._createLight.call(this);

    if (!this._light) {
      return;
    }

    this.luminance = this._luminance;
    this.size = this._size;
    this.range = this._range;
  };

  return SphereLight;
}(Light), _temp$2), (_descriptor$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_size", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.15;
  }
}), _descriptor2$1 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_luminance", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1700 / view.nt2lm(0.15);
  }
}), _descriptor3$1 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_term", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return PhotometricTerm.LUMINOUS_POWER;
  }
}), _descriptor4$1 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_range", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "luminousPower", [_dec4$2, _dec5$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "luminousPower"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "luminance", [_dec6$1, _dec7$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "luminance"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "term", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2$2.prototype, "term"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "size", [_dec10], Object.getOwnPropertyDescriptor(_class2$2.prototype, "size"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "range", [_dec11], Object.getOwnPropertyDescriptor(_class2$2.prototype, "range"), _class2$2.prototype)), _class2$2)) || _class$2) || _class$2) || _class$2) || _class$2);

var _dec$3, _dec2$3, _dec3$3, _dec4$3, _dec5$3, _dec6$2, _dec7$2, _dec8$1, _dec9$1, _dec10$1, _dec11$1, _dec12, _dec13, _class$3, _class2$3, _descriptor$3, _descriptor2$2, _descriptor3$2, _descriptor4$2, _descriptor5$1, _temp$3;
var SpotLight = (_dec$3 = jsonAsset.ccclass('cc.SpotLight'), _dec2$3 = jsonAsset.help(), _dec3$3 = jsonAsset.menu(), _dec4$3 = jsonAsset.unit(), _dec5$3 = jsonAsset.tooltip(), _dec6$2 = jsonAsset.unit(), _dec7$2 = jsonAsset.tooltip(), _dec8$1 = jsonAsset.type(PhotometricTerm), _dec9$1 = jsonAsset.tooltip(), _dec10$1 = jsonAsset.tooltip(), _dec11$1 = jsonAsset.tooltip(), _dec12 = jsonAsset.range(), _dec13 = jsonAsset.tooltip(), _dec$3(_class$3 = _dec2$3(_class$3 = _dec3$3(_class$3 = jsonAsset.executeInEditMode(_class$3 = (_class2$3 = (_temp$3 = function (_Light) {
  jsonAsset._inheritsLoose(SpotLight, _Light);

  jsonAsset._createClass(SpotLight, [{
    key: "luminousPower",
    get: function get() {
      return this._luminance * view.nt2lm(this._size);
    },
    set: function set(val) {
      this._luminance = val / view.nt2lm(this._size);

      if (this._light) {
        this._light.luminance = this._luminance;
      }
    }
  }, {
    key: "luminance",
    get: function get() {
      return this._luminance;
    },
    set: function set(val) {
      this._luminance = val;

      if (this._light) {
        this._light.luminance = val;
      }
    }
  }, {
    key: "term",
    get: function get() {
      return this._term;
    },
    set: function set(val) {
      this._term = val;
    }
  }, {
    key: "size",
    get: function get() {
      return this._size;
    },
    set: function set(val) {
      this._size = val;

      if (this._light) {
        this._light.size = val;
      }
    }
  }, {
    key: "range",
    get: function get() {
      return this._range;
    },
    set: function set(val) {
      this._range = val;

      if (this._light) {
        this._light.range = val;
      }
    }
  }, {
    key: "spotAngle",
    get: function get() {
      return this._spotAngle;
    },
    set: function set(val) {
      this._spotAngle = val;

      if (this._light) {
        this._light.spotAngle = jsonAsset.toRadian(val);
      }
    }
  }]);

  function SpotLight() {
    var _this;

    _this = _Light.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_size", _descriptor$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_luminance", _descriptor2$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_term", _descriptor3$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_range", _descriptor4$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_spotAngle", _descriptor5$1, jsonAsset._assertThisInitialized(_this));

    _this._type = view.LightType.SPOT;
    _this._light = null;
    _this._lightType = view.SpotLight;
    return _this;
  }

  var _proto = SpotLight.prototype;

  _proto._createLight = function _createLight() {
    _Light.prototype._createLight.call(this);

    if (!this._light) {
      return;
    }

    this.luminance = this._luminance;
    this.size = this._size;
    this.range = this._range;
    this.spotAngle = this._spotAngle;
  };

  return SpotLight;
}(Light), _temp$3), (_descriptor$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_size", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.15;
  }
}), _descriptor2$2 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_luminance", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1700 / view.nt2lm(0.15);
  }
}), _descriptor3$2 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_term", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return PhotometricTerm.LUMINOUS_POWER;
  }
}), _descriptor4$2 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_range", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5$1 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_spotAngle", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 60;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "luminousPower", [_dec4$3, _dec5$3], Object.getOwnPropertyDescriptor(_class2$3.prototype, "luminousPower"), _class2$3.prototype), jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "luminance", [_dec6$2, _dec7$2], Object.getOwnPropertyDescriptor(_class2$3.prototype, "luminance"), _class2$3.prototype), jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "term", [_dec8$1, _dec9$1], Object.getOwnPropertyDescriptor(_class2$3.prototype, "term"), _class2$3.prototype), jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "size", [_dec10$1], Object.getOwnPropertyDescriptor(_class2$3.prototype, "size"), _class2$3.prototype), jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "range", [_dec11$1], Object.getOwnPropertyDescriptor(_class2$3.prototype, "range"), _class2$3.prototype), jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "spotAngle", [jsonAsset.slide, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2$3.prototype, "spotAngle"), _class2$3.prototype)), _class2$3)) || _class$3) || _class$3) || _class$3) || _class$3);

jsonAsset.legacyCC.LightComponent = Light;
jsonAsset.js$1.setClassAlias(Light, 'cc.LightComponent');
jsonAsset.legacyCC.DirectionalLightComponent = DirectionalLight;
jsonAsset.js$1.setClassAlias(DirectionalLight, 'cc.DirectionalLightComponent');
jsonAsset.legacyCC.SphereLightComponent = SphereLight;
jsonAsset.js$1.setClassAlias(SphereLight, 'cc.SphereLightComponent');
jsonAsset.legacyCC.SpotLightComponent = SpotLight;
jsonAsset.js$1.setClassAlias(SpotLight, 'cc.SpotLightComponent');

var uploadJointData = uploadJointDataLBS;
var MINIMUM_JOINT_TEXTURE_SIZE =  480;
function selectJointsMediumFormat(device) {
  if (device.hasFeature(jsonAsset.Feature.TEXTURE_FLOAT)) {
    return jsonAsset.Format.RGBA32F;
  }

  return jsonAsset.Format.RGBA8;
}

function uploadJointDataLBS(out, base, mat, firstBone) {
  out[base + 0] = mat.m00;
  out[base + 1] = mat.m01;
  out[base + 2] = mat.m02;
  out[base + 3] = mat.m12;
  out[base + 4] = mat.m04;
  out[base + 5] = mat.m05;
  out[base + 6] = mat.m06;
  out[base + 7] = mat.m13;
  out[base + 8] = mat.m08;
  out[base + 9] = mat.m09;
  out[base + 10] = mat.m10;
  out[base + 11] = mat.m14;
}

var dq_0 = new jsonAsset.Quat();
var dq_1 = new jsonAsset.Quat();
var v3_1 = new jsonAsset.Vec3();
var qt_1 = new jsonAsset.Quat();
var v3_2 = new jsonAsset.Vec3();

function roundUpTextureSize(targetLength, formatSize) {
  var formatScale = 4 / Math.sqrt(formatSize);
  return Math.ceil(Math.max(MINIMUM_JOINT_TEXTURE_SIZE * formatScale, targetLength) / 12) * 12;
}

var jointTextureSamplerHash = jsonAsset.genSamplerHash([jsonAsset.Filter.POINT, jsonAsset.Filter.POINT, jsonAsset.Filter.NONE, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP]);
var v3_3 = new jsonAsset.Vec3();
var v3_4 = new jsonAsset.Vec3();
var v3_min = new jsonAsset.Vec3();
var v3_max = new jsonAsset.Vec3();
var m4_1 = new jsonAsset.Mat4();
var m4_2 = new jsonAsset.Mat4();
var ab_1 = new jsonAsset.AABB();
var Inf = Number.MAX_SAFE_INTEGER;
var JointTexturePool = function () {
  jsonAsset._createClass(JointTexturePool, [{
    key: "pixelsPerJoint",
    get: function get() {
      return this._pixelsPerJoint;
    }
  }]);

  function JointTexturePool(device) {
    this._device = void 0;
    this._pool = void 0;
    this._textureBuffers = new Map();
    this._formatSize = void 0;
    this._pixelsPerJoint = void 0;
    this._customPool = void 0;
    this._chunkIdxMap = new Map();
    this._device = device;
    var format = selectJointsMediumFormat(this._device);
    this._formatSize = jsonAsset.FormatInfos[format].size;
    this._pixelsPerJoint = 48 / this._formatSize;
    this._pool = new textureBufferPool.TextureBufferPool(device);

    this._pool.initialize({
      format: format,
      roundUpFn: roundUpTextureSize
    });

    this._customPool = new textureBufferPool.TextureBufferPool(device);

    this._customPool.initialize({
      format: format,
      roundUpFn: roundUpTextureSize
    });
  }

  var _proto = JointTexturePool.prototype;

  _proto.clear = function clear() {
    this._pool.destroy();

    this._textureBuffers.clear();
  };

  _proto.registerCustomTextureLayouts = function registerCustomTextureLayouts(layouts) {
    for (var i = 0; i < layouts.length; i++) {
      var layout = layouts[i];

      var chunkIdx = this._customPool.createChunk(layout.textureLength);

      for (var j = 0; j < layout.contents.length; j++) {
        var content = layout.contents[j];
        var skeleton = content.skeleton;

        this._chunkIdxMap.set(skeleton, chunkIdx);

        for (var k = 0; k < content.clips.length; k++) {
          var clip = content.clips[k];

          this._chunkIdxMap.set(skeleton ^ clip, chunkIdx);
        }
      }
    }
  };

  _proto.getDefaultPoseTexture = function getDefaultPoseTexture(skeleton, mesh, skinningRoot) {
    var hash = skeleton.hash ^ 0;
    var texture = this._textureBuffers.get(hash) || null;

    if (texture && texture.bounds.has(mesh.hash)) {
      texture.refCount++;
      return texture;
    }

    var joints = skeleton.joints,
        bindposes = skeleton.bindposes;
    var textureBuffer = null;
    var buildTexture = false;
    var jointCount = joints.length;

    if (!texture) {
      var bufSize = jointCount * 12;

      var customChunkIdx = this._chunkIdxMap.get(hash);

      var handle = customChunkIdx !== undefined ? this._customPool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT, customChunkIdx) : this._pool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT);

      if (!handle) {
        return texture;
      }

      texture = {
        pixelOffset: handle.start / this._formatSize,
        refCount: 1,
        bounds: new Map(),
        skeletonHash: skeleton.hash,
        clipHash: 0,
        readyToBeDeleted: false,
        handle: handle
      };
      textureBuffer = new Float32Array(bufSize);
      buildTexture = true;
    } else {
      texture.refCount++;
    }

    jsonAsset.Vec3.set(v3_min, Inf, Inf, Inf);
    jsonAsset.Vec3.set(v3_max, -Inf, -Inf, -Inf);
    var boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);

    for (var j = 0, offset = 0; j < jointCount; j++, offset += 12) {
      var node = skinningRoot.getChildByPath(joints[j]);
      var mat = node ? transformUtils.getWorldTransformUntilRoot(node, skinningRoot, m4_1) : skeleton.inverseBindposes[j];
      var bound = boneSpaceBounds[j];

      if (bound) {
        jsonAsset.AABB.transform(ab_1, bound, mat);
        ab_1.getBoundary(v3_3, v3_4);
        jsonAsset.Vec3.min(v3_min, v3_min, v3_3);
        jsonAsset.Vec3.max(v3_max, v3_max, v3_4);
      }

      if (buildTexture) {
        if (node) {
          jsonAsset.Mat4.multiply(mat, mat, bindposes[j]);
        }

        uploadJointData(textureBuffer, offset, node ? mat : jsonAsset.Mat4.IDENTITY);
      }
    }

    var bounds = [new jsonAsset.AABB()];
    texture.bounds.set(mesh.hash, bounds);
    jsonAsset.AABB.fromPoints(bounds[0], v3_min, v3_max);

    if (buildTexture) {
      this._pool.update(texture.handle, textureBuffer.buffer);

      this._textureBuffers.set(hash, texture);
    }

    return texture;
  };

  _proto.getSequencePoseTexture = function getSequencePoseTexture(skeleton, clip, mesh, skinningRoot) {
    var hash = skeleton.hash ^ clip.hash;
    var texture = this._textureBuffers.get(hash) || null;

    if (texture && texture.bounds.has(mesh.hash)) {
      texture.refCount++;
      return texture;
    }

    var joints = skeleton.joints,
        bindposes = skeleton.bindposes;
    var clipData = transformUtils.SkelAnimDataHub.getOrExtract(clip);
    var frames = clipData.frames;
    var textureBuffer = null;
    var buildTexture = false;
    var jointCount = joints.length;

    if (!texture) {
      var bufSize = jointCount * 12 * frames;

      var customChunkIdx = this._chunkIdxMap.get(hash);

      var handle = customChunkIdx !== undefined ? this._customPool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT, customChunkIdx) : this._pool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT);

      if (!handle) {
        return null;
      }

      var animInfos = this._createAnimInfos(skeleton, clip, skinningRoot);

      texture = {
        pixelOffset: handle.start / this._formatSize,
        refCount: 1,
        bounds: new Map(),
        skeletonHash: skeleton.hash,
        clipHash: clip.hash,
        readyToBeDeleted: false,
        handle: handle,
        animInfos: animInfos
      };
      textureBuffer = new Float32Array(bufSize);
      buildTexture = true;
    } else {
      texture.refCount++;
    }

    var boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);
    var bounds = [];
    texture.bounds.set(mesh.hash, bounds);

    for (var f = 0; f < frames; f++) {
      bounds.push(new jsonAsset.AABB(Inf, Inf, Inf, -Inf, -Inf, -Inf));
    }

    for (var _f = 0, offset = 0; _f < frames; _f++) {
      var bound = bounds[_f];

      for (var j = 0; j < jointCount; j++, offset += 12) {
        var _j = texture.animInfos[j],
            curveData = _j.curveData,
            downstream = _j.downstream,
            bindposeIdx = _j.bindposeIdx,
            bindposeCorrection = _j.bindposeCorrection;
        var mat = void 0;
        var transformValid = true;

        if (curveData && downstream) {
          mat = jsonAsset.Mat4.multiply(m4_1, curveData[_f], downstream);
        } else if (curveData) {
          mat = curveData[_f];
        } else if (downstream) {
          mat = downstream;
        } else {
          mat = skeleton.inverseBindposes[bindposeIdx];
          transformValid = false;
        }

        var boneSpaceBound = boneSpaceBounds[j];

        if (boneSpaceBound) {
          var transform = bindposeCorrection ? jsonAsset.Mat4.multiply(m4_2, mat, bindposeCorrection) : mat;
          jsonAsset.AABB.transform(ab_1, boneSpaceBound, transform);
          ab_1.getBoundary(v3_3, v3_4);
          jsonAsset.Vec3.min(bound.center, bound.center, v3_3);
          jsonAsset.Vec3.max(bound.halfExtents, bound.halfExtents, v3_4);
        }

        if (buildTexture) {
          if (transformValid) {
            jsonAsset.Mat4.multiply(m4_1, mat, bindposes[bindposeIdx]);
          }

          uploadJointData(textureBuffer, offset, transformValid ? m4_1 : jsonAsset.Mat4.IDENTITY);
        }
      }

      jsonAsset.AABB.fromPoints(bound, bound.center, bound.halfExtents);
    }

    if (buildTexture) {
      this._pool.update(texture.handle, textureBuffer.buffer);

      this._textureBuffers.set(hash, texture);
    }

    return texture;
  };

  _proto.releaseHandle = function releaseHandle(handle) {
    if (handle.refCount > 0) {
      handle.refCount--;
    }

    if (!handle.refCount && handle.readyToBeDeleted) {
      var hash = handle.skeletonHash ^ handle.clipHash;

      var customChunkIdx = this._chunkIdxMap.get(hash);

      (customChunkIdx !== undefined ? this._customPool : this._pool).free(handle.handle);

      if (this._textureBuffers.get(hash) === handle) {
        this._textureBuffers["delete"](hash);
      }
    }
  };

  _proto.releaseSkeleton = function releaseSkeleton(skeleton) {
    var it = this._textureBuffers.values();

    var res = it.next();

    while (!res.done) {
      var handle = res.value;

      if (handle.skeletonHash === skeleton.hash) {
        handle.readyToBeDeleted = true;

        if (handle.refCount) {
          this._textureBuffers["delete"](handle.skeletonHash ^ handle.clipHash);
        } else {
          this.releaseHandle(handle);
        }
      }

      res = it.next();
    }
  };

  _proto.releaseAnimationClip = function releaseAnimationClip(clip) {
    var it = this._textureBuffers.values();

    var res = it.next();

    while (!res.done) {
      var handle = res.value;

      if (handle.clipHash === clip.hash) {
        handle.readyToBeDeleted = true;

        if (handle.refCount) {
          this._textureBuffers["delete"](handle.skeletonHash ^ handle.clipHash);
        } else {
          this.releaseHandle(handle);
        }
      }

      res = it.next();
    }
  };

  _proto._createAnimInfos = function _createAnimInfos(skeleton, clip, skinningRoot) {
    var animInfos = [];
    var joints = skeleton.joints,
        bindposes = skeleton.bindposes;
    var jointCount = joints.length;
    var clipData = transformUtils.SkelAnimDataHub.getOrExtract(clip);

    for (var j = 0; j < jointCount; j++) {
      var animPath = joints[j];
      var source = clipData.joints[animPath];
      var animNode = skinningRoot.getChildByPath(animPath);
      var downstream = void 0;
      var correctionPath = void 0;

      while (!source) {
        var idx = animPath.lastIndexOf('/');
        animPath = animPath.substring(0, idx);
        source = clipData.joints[animPath];

        if (animNode) {
          if (!downstream) {
            downstream = new jsonAsset.Mat4();
          }

          jsonAsset.Mat4.fromRTS(m4_1, animNode.rotation, animNode.position, animNode.scale);
          jsonAsset.Mat4.multiply(downstream, m4_1, downstream);
          animNode = animNode.parent;
        } else {
          correctionPath = animPath;
        }

        if (idx < 0) {
          break;
        }
      }

      var bindposeIdx = j;
      var bindposeCorrection = void 0;

      if (correctionPath !== undefined && source) {
        bindposeIdx = j - 1;

        for (var t = 0; t < jointCount; t++) {
          if (joints[t] === correctionPath) {
            bindposeIdx = t;
            bindposeCorrection = new jsonAsset.Mat4();
            jsonAsset.Mat4.multiply(bindposeCorrection, bindposes[t], skeleton.inverseBindposes[j]);
            break;
          }
        }
      }

      animInfos.push({
        curveData: source && source.transforms,
        downstream: downstream,
        bindposeIdx: bindposeIdx,
        bindposeCorrection: bindposeCorrection
      });
    }

    return animInfos;
  };

  return JointTexturePool;
}();
var JointAnimationInfo = function () {
  function JointAnimationInfo(device) {
    this._pool = new Map();
    this._device = void 0;
    this._device = device;
  }

  var _proto2 = JointAnimationInfo.prototype;

  _proto2.getData = function getData(nodeID) {
    if (nodeID === void 0) {
      nodeID = '-1';
    }

    var res = this._pool.get(nodeID);

    if (res) {
      return res;
    }

    var buffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOSkinningAnimation.SIZE, jsonAsset.UBOSkinningAnimation.SIZE));

    var data = new Float32Array([0, 0, 0, 0]);
    buffer.update(data);
    var info = {
      buffer: buffer,
      data: data,
      dirty: false
    };

    this._setAnimInfoDirty(info, false);

    this._pool.set(nodeID, info);

    return info;
  };

  _proto2.destroy = function destroy(nodeID) {
    var info = this._pool.get(nodeID);

    if (!info) {
      return;
    }

    info.buffer.destroy();

    this._pool["delete"](nodeID);
  };

  _proto2._setAnimInfoDirty = function _setAnimInfoDirty(info, value) {
    info.dirty = value;
  };

  _proto2.switchClip = function switchClip(info, clip) {
    info.data[0] = 0;
    info.buffer.update(info.data);

    this._setAnimInfoDirty(info, false);

    return info;
  };

  _proto2.clear = function clear() {
    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._pool.values()), _step; !(_step = _iterator()).done;) {
      var info = _step.value;
      info.buffer.destroy();
    }

    this._pool.clear();
  };

  return JointAnimationInfo;
}();

var DataPoolManager = function () {
  function DataPoolManager(device) {
    this.jointTexturePool = void 0;
    this.jointAnimationInfo = void 0;
    this.jointTexturePool = new JointTexturePool(device);
    this.jointAnimationInfo = new JointAnimationInfo(device);
  }

  var _proto = DataPoolManager.prototype;

  _proto.releaseSkeleton = function releaseSkeleton(skeleton) {
    this.jointTexturePool.releaseSkeleton(skeleton);
  };

  _proto.releaseAnimationClip = function releaseAnimationClip(clip) {
    this.jointTexturePool.releaseAnimationClip(clip);
  };

  _proto.clear = function clear() {
    this.jointTexturePool.clear();
    this.jointAnimationInfo.clear();
  };

  return DataPoolManager;
}();
jsonAsset.legacyCC.internal.DataPoolManager = DataPoolManager;

var myPatches = [{
  name: 'CC_USE_SKINNING',
  value: true
}];

function getRelevantBuffers(outIndices, outBuffers, jointMaps, targetJoint) {
  for (var i = 0; i < jointMaps.length; i++) {
    var idxMap = jointMaps[i];
    var index = -1;

    for (var j = 0; j < idxMap.length; j++) {
      if (idxMap[j] === targetJoint) {
        index = j;
        break;
      }
    }

    if (index >= 0) {
      outBuffers.push(i);
      outIndices.push(index);
    }
  }
}

var v3_min$1 = new jsonAsset.Vec3();
var v3_max$1 = new jsonAsset.Vec3();
var v3_1$1 = new jsonAsset.Vec3();
var v3_2$1 = new jsonAsset.Vec3();
var m4_1$1 = new jsonAsset.Mat4();
var ab_1$1 = new jsonAsset.AABB();
var SkinningModel = function (_MorphModel) {
  jsonAsset._inheritsLoose(SkinningModel, _MorphModel);

  function SkinningModel() {
    var _this;

    _this = _MorphModel.call(this) || this;
    _this.uploadAnimation = null;
    _this._buffers = [];
    _this._dataArray = [];
    _this._joints = [];
    _this._bufferIndices = null;
    _this.type = view.ModelType.SKINNING;
    return _this;
  }

  var _proto = SkinningModel.prototype;

  _proto._init = function _init() {
  };

  _proto.destroy = function destroy() {
    this.bindSkeleton();

    if (this._buffers.length) {
      for (var i = 0; i < this._buffers.length; i++) {
        this._buffers[i].destroy();
      }

      this._buffers.length = 0;
    }

    _MorphModel.prototype.destroy.call(this);
  };

  _proto.bindSkeleton = function bindSkeleton(skeleton, skinningRoot, mesh) {
    if (skeleton === void 0) {
      skeleton = null;
    }

    if (skinningRoot === void 0) {
      skinningRoot = null;
    }

    if (mesh === void 0) {
      mesh = null;
    }

    for (var i = 0; i < this._joints.length; i++) {
      transformUtils.deleteTransform(this._joints[i].target);
    }

    this._bufferIndices = null;
    this._joints.length = 0;

    if (!skeleton || !skinningRoot || !mesh) {
      return;
    }

    this.transform = skinningRoot;
    var boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);
    var jointMaps = mesh.struct.jointMaps;

    this._ensureEnoughBuffers(jointMaps && jointMaps.length || 1);

    this._bufferIndices = mesh.jointBufferIndices;

    for (var index = 0; index < skeleton.joints.length; index++) {
      var bound = boneSpaceBounds[index];
      var target = skinningRoot.getChildByPath(skeleton.joints[index]);

      if (!bound || !target) {
        continue;
      }

      var transform = transformUtils.getTransform(target, skinningRoot);
      var bindpose = skeleton.bindposes[index];
      var indices = [];
      var buffers = [];

      if (!jointMaps) {
        indices.push(index);
        buffers.push(0);
      } else {
        getRelevantBuffers(indices, buffers, jointMaps, index);
      }

      this._joints.push({
        indices: indices,
        buffers: buffers,
        bound: bound,
        target: target,
        bindpose: bindpose,
        transform: transform
      });
    }
  };

  _proto.updateTransform = function updateTransform(stamp) {
    var root = this.transform;

    if (root.hasChangedFlags || root._dirtyFlags) {
      root.updateWorldTransform();
      this._transformUpdated = true;
    }

    jsonAsset.Vec3.set(v3_min$1, Infinity, Infinity, Infinity);
    jsonAsset.Vec3.set(v3_max$1, -Infinity, -Infinity, -Infinity);

    for (var i = 0; i < this._joints.length; i++) {
      var _this$_joints$i = this._joints[i],
          bound = _this$_joints$i.bound,
          transform = _this$_joints$i.transform;
      var worldMatrix = transformUtils.getWorldMatrix(transform, stamp);
      jsonAsset.AABB.transform(ab_1$1, bound, worldMatrix);
      ab_1$1.getBoundary(v3_1$1, v3_2$1);
      jsonAsset.Vec3.min(v3_min$1, v3_min$1, v3_1$1);
      jsonAsset.Vec3.max(v3_max$1, v3_max$1, v3_2$1);
    }

    var worldBounds = this._worldBounds;

    if (this._modelBounds && worldBounds) {
      jsonAsset.AABB.fromPoints(this._modelBounds, v3_min$1, v3_max$1);

      this._modelBounds.transform(root._mat, root._pos, root._rot, root._scale, this._worldBounds);

      this._updateNativeBounds();
    }
  };

  _proto.updateUBOs = function updateUBOs(stamp) {
    _MorphModel.prototype.updateUBOs.call(this, stamp);

    for (var i = 0; i < this._joints.length; i++) {
      var _this$_joints$i2 = this._joints[i],
          indices = _this$_joints$i2.indices,
          buffers = _this$_joints$i2.buffers,
          transform = _this$_joints$i2.transform,
          bindpose = _this$_joints$i2.bindpose;
      jsonAsset.Mat4.multiply(m4_1$1, transform.world, bindpose);

      for (var b = 0; b < buffers.length; b++) {
        uploadJointData(this._dataArray[buffers[b]], indices[b] * 12, m4_1$1);
      }
    }

    for (var _b = 0; _b < this._buffers.length; _b++) {
      this._buffers[_b].update(this._dataArray[_b]);
    }

    return true;
  };

  _proto.initSubModel = function initSubModel(idx, subMeshData, mat) {
    var original = subMeshData.vertexBuffers;
    var iaInfo = subMeshData.iaInfo;
    iaInfo.vertexBuffers = subMeshData.jointMappedBuffers;

    _MorphModel.prototype.initSubModel.call(this, idx, subMeshData, mat);

    iaInfo.vertexBuffers = original;
  };

  _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
    var superMacroPatches = _MorphModel.prototype.getMacroPatches.call(this, subModelIndex);

    if (superMacroPatches) {
      return myPatches.concat(superMacroPatches);
    }

    return myPatches;
  };

  _proto._updateLocalDescriptors = function _updateLocalDescriptors(submodelIdx, descriptorSet) {
    _MorphModel.prototype._updateLocalDescriptors.call(this, submodelIdx, descriptorSet);

    var buffer = this._buffers[this._bufferIndices[submodelIdx]];

    if (buffer) {
      descriptorSet.bindBuffer(jsonAsset.UBOSkinning.BINDING, buffer);
    }
  };

  _proto._ensureEnoughBuffers = function _ensureEnoughBuffers(count) {
    for (var i = 0; i < count; i++) {
      if (!this._buffers[i]) {
        this._buffers[i] = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOSkinning.SIZE, jsonAsset.UBOSkinning.SIZE));
      }

      if (!this._dataArray[i]) {
        this._dataArray[i] = new Float32Array(jsonAsset.UBOSkinning.COUNT);
      }
    }
  };

  return SkinningModel;
}(meshRenderer.MorphModel);

var myPatches$1 = [{
  name: 'CC_USE_SKINNING',
  value: true
}, {
  name: 'CC_USE_BAKED_ANIMATION',
  value: true
}];
var BakedSkinningModel = function (_MorphModel) {
  jsonAsset._inheritsLoose(BakedSkinningModel, _MorphModel);

  function BakedSkinningModel() {
    var _this;

    _this = _MorphModel.call(this) || this;
    _this.uploadedAnim = undefined;
    _this._jointsMedium = void 0;
    _this._skeleton = null;
    _this._mesh = null;
    _this._dataPoolManager = void 0;
    _this._instAnimInfoIdx = -1;
    _this.type = view.ModelType.BAKED_SKINNING;
    _this._dataPoolManager = jsonAsset.legacyCC.director.root.dataPoolManager;
    var jointTextureInfo = new Float32Array(4);

    var animInfo = _this._dataPoolManager.jointAnimationInfo.getData();

    _this._jointsMedium = {
      buffer: null,
      jointTextureInfo: jointTextureInfo,
      animInfo: animInfo,
      texture: null,
      boundsInfo: null
    };
    return _this;
  }

  var _proto = BakedSkinningModel.prototype;

  _proto._init = function _init() {
  };

  _proto.destroy = function destroy() {
    this.uploadedAnim = undefined;
    this._jointsMedium.boundsInfo = null;

    if (this._jointsMedium.buffer) {
      this._jointsMedium.buffer.destroy();

      this._jointsMedium.buffer = null;
    }

    this._applyJointTexture();

    this._applyNativeJointMedium();

    _MorphModel.prototype.destroy.call(this);
  };

  _proto.bindSkeleton = function bindSkeleton(skeleton, skinningRoot, mesh) {
    if (skeleton === void 0) {
      skeleton = null;
    }

    if (skinningRoot === void 0) {
      skinningRoot = null;
    }

    if (mesh === void 0) {
      mesh = null;
    }

    this._skeleton = skeleton;
    this._mesh = mesh;

    if (!skeleton || !skinningRoot || !mesh) {
      return;
    }

    this.transform = skinningRoot;
    var resMgr = this._dataPoolManager;
    this._jointsMedium.animInfo = resMgr.jointAnimationInfo.getData(skinningRoot.uuid);

    if (!this._jointsMedium.buffer) {
      this._jointsMedium.buffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOSkinningTexture.SIZE, jsonAsset.UBOSkinningTexture.SIZE));
    }
  };

  _proto.updateTransform = function updateTransform(stamp) {
    _MorphModel.prototype.updateTransform.call(this, stamp);

    if (!this.uploadedAnim) {
      return;
    }

    var _this$_jointsMedium = this._jointsMedium,
        animInfo = _this$_jointsMedium.animInfo,
        boundsInfo = _this$_jointsMedium.boundsInfo;
    var skelBound = boundsInfo[animInfo.data[0]];
    var worldBounds = this._worldBounds;

    if (worldBounds && skelBound) {
      var node = this.transform;
      skelBound.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);
    }
  };

  _proto.updateUBOs = function updateUBOs(stamp) {
    _MorphModel.prototype.updateUBOs.call(this, stamp);

    var info = this._jointsMedium.animInfo;
    var idx = this._instAnimInfoIdx;

    if (idx >= 0) {
      var view = this.instancedAttributes.views[idx];
      view[0] = info.data[0];
    } else if (info.dirty) {
      info.buffer.update(info.data);
      info.dirty = false;
    }

    return true;
  };

  _proto._applyNativeJointMedium = function _applyNativeJointMedium() {
  };

  _proto._updateModelBounds = function _updateModelBounds(aabb) {
    this._modelBounds = aabb;
  };

  _proto.uploadAnimation = function uploadAnimation(anim) {
    if (!this._skeleton || !this._mesh || this.uploadedAnim === anim) {
      return;
    }

    this.uploadedAnim = anim;
    var resMgr = this._dataPoolManager;
    var texture = null;

    if (anim) {
      texture = resMgr.jointTexturePool.getSequencePoseTexture(this._skeleton, anim, this._mesh, this.transform);
      this._jointsMedium.boundsInfo = texture && texture.bounds.get(this._mesh.hash);

      this._updateModelBounds(null);
    } else {
      texture = resMgr.jointTexturePool.getDefaultPoseTexture(this._skeleton, this._mesh, this.transform);
      this._jointsMedium.boundsInfo = null;

      this._updateModelBounds(texture && texture.bounds.get(this._mesh.hash)[0]);
    }

    this._applyJointTexture(texture);

    this._applyNativeJointMedium();
  };

  _proto._applyJointTexture = function _applyJointTexture(texture) {
    if (texture === void 0) {
      texture = null;
    }

    var oldTex = this._jointsMedium.texture;

    if (oldTex && oldTex !== texture) {
      this._dataPoolManager.jointTexturePool.releaseHandle(oldTex);
    }

    this._jointsMedium.texture = texture;

    if (!texture) {
      return;
    }

    var _this$_jointsMedium2 = this._jointsMedium,
        buffer = _this$_jointsMedium2.buffer,
        jointTextureInfo = _this$_jointsMedium2.jointTextureInfo;
    jointTextureInfo[0] = texture.handle.texture.width;
    jointTextureInfo[1] = this._skeleton.joints.length;
    jointTextureInfo[2] = texture.pixelOffset + 0.1;
    jointTextureInfo[3] = 1 / jointTextureInfo[0];
    this.updateInstancedJointTextureInfo();

    if (buffer) {
      buffer.update(jointTextureInfo);
    }

    var tex = texture.handle.texture;

    for (var i = 0; i < this._subModels.length; ++i) {
      var descriptorSet = this._subModels[i].descriptorSet;
      descriptorSet.bindTexture(jsonAsset.UNIFORM_JOINT_TEXTURE_BINDING, tex);
    }
  };

  _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
    var patches = _MorphModel.prototype.getMacroPatches.call(this, subModelIndex);

    return patches ? patches.concat(myPatches$1) : myPatches$1;
  };

  _proto._updateLocalDescriptors = function _updateLocalDescriptors(submodelIdx, descriptorSet) {
    _MorphModel.prototype._updateLocalDescriptors.call(this, submodelIdx, descriptorSet);

    var _this$_jointsMedium3 = this._jointsMedium,
        buffer = _this$_jointsMedium3.buffer,
        texture = _this$_jointsMedium3.texture,
        animInfo = _this$_jointsMedium3.animInfo;
    descriptorSet.bindBuffer(jsonAsset.UBOSkinningTexture.BINDING, buffer);
    descriptorSet.bindBuffer(jsonAsset.UBOSkinningAnimation.BINDING, animInfo.buffer);

    if (texture) {
      var sampler = jsonAsset.samplerLib.getSampler(this._device, jointTextureSamplerHash);
      descriptorSet.bindTexture(jsonAsset.UNIFORM_JOINT_TEXTURE_BINDING, texture.handle.texture);
      descriptorSet.bindSampler(jsonAsset.UNIFORM_JOINT_TEXTURE_BINDING, sampler);
    }
  };

  _proto._setInstAnimInfoIdx = function _setInstAnimInfoIdx(idx) {
    this._instAnimInfoIdx = idx;
  };

  _proto._updateInstancedAttributes = function _updateInstancedAttributes(attributes, pass) {
    _MorphModel.prototype._updateInstancedAttributes.call(this, attributes, pass);

    this._setInstAnimInfoIdx(this._getInstancedAttributeIndex(jsonAsset.INST_JOINT_ANIM_INFO));

    this.updateInstancedJointTextureInfo();
  };

  _proto.updateInstancedJointTextureInfo = function updateInstancedJointTextureInfo() {
    var _this$_jointsMedium4 = this._jointsMedium,
        jointTextureInfo = _this$_jointsMedium4.jointTextureInfo,
        animInfo = _this$_jointsMedium4.animInfo;
    var idx = this._instAnimInfoIdx;

    if (idx >= 0) {
      var view = this.instancedAttributes.views[idx];
      view[0] = animInfo.data[0];
      view[1] = jointTextureInfo[1];
      view[2] = jointTextureInfo[2];
    }
  };

  return BakedSkinningModel;
}(meshRenderer.MorphModel);

var _dec$4, _dec2$4, _dec3$4, _dec4$4, _dec5$4, _dec6$3, _dec7$3, _dec8$2, _dec9$2, _class$4, _class2$4, _descriptor$4, _descriptor2$3, _temp$4;
var SkinnedMeshRenderer = (_dec$4 = jsonAsset.ccclass('cc.SkinnedMeshRenderer'), _dec2$4 = jsonAsset.help(), _dec3$4 = jsonAsset.executionOrder(100), _dec4$4 = jsonAsset.menu(), _dec5$4 = jsonAsset.type(skeleton.Skeleton), _dec6$3 = jsonAsset.type(jsonAsset.Node), _dec7$3 = jsonAsset.type(skeleton.Skeleton), _dec8$2 = jsonAsset.type(jsonAsset.Node), _dec9$2 = jsonAsset.tooltip(), _dec$4(_class$4 = _dec2$4(_class$4 = _dec3$4(_class$4 = jsonAsset.executeInEditMode(_class$4 = _dec4$4(_class$4 = (_class2$4 = (_temp$4 = function (_MeshRenderer) {
  jsonAsset._inheritsLoose(SkinnedMeshRenderer, _MeshRenderer);

  jsonAsset._createClass(SkinnedMeshRenderer, [{
    key: "skeleton",
    get: function get() {
      return this._skeleton;
    },
    set: function set(val) {
      if (val === this._skeleton) {
        return;
      }

      this._skeleton = val;

      this._update();
    }
  }, {
    key: "skinningRoot",
    get: function get() {
      return this._skinningRoot;
    },
    set: function set(value) {
      if (value === this._skinningRoot) {
        return;
      }

      this._skinningRoot = value;

      this._updateModelType();

      this._update();
    }
  }, {
    key: "model",
    get: function get() {
      return this._model;
    }
  }]);

  function SkinnedMeshRenderer() {
    var _this;

    _this = _MeshRenderer.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_skeleton", _descriptor$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_skinningRoot", _descriptor2$3, jsonAsset._assertThisInitialized(_this));

    _this._clip = null;
    _this._modelType = BakedSkinningModel;
    return _this;
  }

  var _proto = SkinnedMeshRenderer.prototype;

  _proto.__preload = function __preload() {
    this._updateModelType();
  };

  _proto.uploadAnimation = function uploadAnimation(clip) {
    this._clip = clip;

    if (this.model && this.model.uploadAnimation) {
      this.model.uploadAnimation(clip);
    }
  };

  _proto.setUseBakedAnimation = function setUseBakedAnimation(val, force) {
    if (val === void 0) {
      val = true;
    }

    if (force === void 0) {
      force = false;
    }

    var modelType = val ? BakedSkinningModel : SkinningModel;

    if (!force && this._modelType === modelType) {
      return;
    }

    this._modelType = modelType;

    if (this._model) {
      jsonAsset.legacyCC.director.root.destroyModel(this._model);
      this._model = null;
      this._models.length = 0;

      this._updateModels();

      this._updateCastShadow();

      if (this.enabledInHierarchy) {
        this._attachToScene();
      }
    }
  };

  _proto.setMaterial = function setMaterial(material, index) {
    _MeshRenderer.prototype.setMaterial.call(this, material, index);

    if (this._modelType === SkinningModel) {
      this.getMaterialInstance(index);
    }
  };

  _proto._updateModelParams = function _updateModelParams() {
    this._update();

    _MeshRenderer.prototype._updateModelParams.call(this);
  };

  _proto._updateModelType = function _updateModelType() {
    if (!this._skinningRoot) {
      return;
    }

    var comp = this._skinningRoot.getComponent('cc.SkeletalAnimation');

    if (comp) {
      this.setUseBakedAnimation(comp.useBakedAnimation);
    } else {
      this.setUseBakedAnimation(false);
    }
  };

  _proto._update = function _update() {
    if (this.model) {
      this.model.bindSkeleton(this._skeleton, this._skinningRoot, this._mesh);

      if (this.model.uploadAnimation) {
        this.model.uploadAnimation(this._clip);
      }
    }
  };

  return SkinnedMeshRenderer;
}(meshRenderer.MeshRenderer), _temp$4), (_descriptor$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_skeleton", [_dec5$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2$3 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_skinningRoot", [_dec6$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "skeleton", [_dec7$3], Object.getOwnPropertyDescriptor(_class2$4.prototype, "skeleton"), _class2$4.prototype), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "skinningRoot", [_dec8$2, _dec9$2], Object.getOwnPropertyDescriptor(_class2$4.prototype, "skinningRoot"), _class2$4.prototype)), _class2$4)) || _class$4) || _class$4) || _class$4) || _class$4) || _class$4);

var _dec$5, _dec2$5, _dec3$5, _dec4$5, _dec5$5, _class$5, _class2$5, _descriptor$5, _descriptor2$4, _descriptor3$3, _descriptor4$3, _descriptor5$2, _descriptor6$1, _temp$5, _dec6$4, _dec7$4, _dec8$3, _dec9$3, _dec10$2, _dec11$2, _dec12$1, _dec13$1, _dec14, _dec15, _dec16, _class4$1, _class5$1, _descriptor7$1, _descriptor8$1, _descriptor9, _temp2$1;

var repeat = function repeat(n) {
  return n - Math.floor(n);
};

var batch_id = new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_BATCH_ID, jsonAsset.Format.R32F);
var batch_uv = new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_BATCH_UV, jsonAsset.Format.RG32F);
var batch_extras_size = jsonAsset.FormatInfos[batch_id.format].size + jsonAsset.FormatInfos[batch_uv.format].size;
var SkinnedMeshUnit = (_dec$5 = jsonAsset.ccclass('cc.SkinnedMeshUnit'), _dec2$5 = jsonAsset.type(mesh.Mesh), _dec3$5 = jsonAsset.type(skeleton.Skeleton), _dec4$5 = jsonAsset.type(jsonAsset.Material), _dec5$5 = jsonAsset.type(SkinnedMeshRenderer), _dec$5(_class$5 = (_class2$5 = (_temp$5 = function () {
  function SkinnedMeshUnit() {
    jsonAsset._initializerDefineProperty(this, "mesh", _descriptor$5, this);

    jsonAsset._initializerDefineProperty(this, "skeleton", _descriptor2$4, this);

    jsonAsset._initializerDefineProperty(this, "material", _descriptor3$3, this);

    jsonAsset._initializerDefineProperty(this, "_localTransform", _descriptor4$3, this);

    jsonAsset._initializerDefineProperty(this, "_offset", _descriptor5$2, this);

    jsonAsset._initializerDefineProperty(this, "_size", _descriptor6$1, this);
  }

  jsonAsset._createClass(SkinnedMeshUnit, [{
    key: "offset",
    set: function set(offset) {
      jsonAsset.Vec2.copy(this._offset, offset);
    },
    get: function get() {
      return this._offset;
    }
  }, {
    key: "size",
    set: function set(size) {
      jsonAsset.Vec2.copy(this._size, size);
    },
    get: function get() {
      return this._size;
    }
  }, {
    key: "copyFrom",
    set: function set(comp) {
      if (!comp) {
        return;
      }

      this.mesh = comp.mesh;
      this.skeleton = comp.skeleton;
      this.material = comp.getMaterial(0);

      if (comp.skinningRoot) {
        transformUtils.getWorldTransformUntilRoot(comp.node, comp.skinningRoot, this._localTransform);
      }
    },
    get: function get() {
      return null;
    }
  }]);

  return SkinnedMeshUnit;
}(), _temp$5), (_descriptor$5 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "mesh", [_dec2$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2$4 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "skeleton", [_dec3$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3$3 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "material", [_dec4$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4$3 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "_localTransform", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Mat4();
  }
}), _descriptor5$2 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "_offset", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2(0, 0);
  }
}), _descriptor6$1 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "_size", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2(1, 1);
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "offset", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2$5.prototype, "offset"), _class2$5.prototype), jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "size", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2$5.prototype, "size"), _class2$5.prototype), jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "copyFrom", [_dec5$5], Object.getOwnPropertyDescriptor(_class2$5.prototype, "copyFrom"), _class2$5.prototype)), _class2$5)) || _class$5);
var m4_local = new jsonAsset.Mat4();
var m4_1$2 = new jsonAsset.Mat4();
var v3_1$2 = new jsonAsset.Vec3();
var SkinnedMeshBatchRenderer = (_dec6$4 = jsonAsset.ccclass('cc.SkinnedMeshBatchRenderer'), _dec7$4 = jsonAsset.help(), _dec8$3 = jsonAsset.executionOrder(100), _dec9$3 = jsonAsset.menu(), _dec10$2 = jsonAsset.tooltip(), _dec11$2 = jsonAsset.type([jsonAsset.CCString]), _dec12$1 = jsonAsset.tooltip(), _dec13$1 = jsonAsset.type([SkinnedMeshUnit]), _dec14 = jsonAsset.tooltip(), _dec15 = jsonAsset.visible(), _dec16 = jsonAsset.visible(), _dec6$4(_class4$1 = _dec7$4(_class4$1 = _dec8$3(_class4$1 = jsonAsset.executeInEditMode(_class4$1 = _dec9$3(_class4$1 = (_class5$1 = (_temp2$1 = function (_SkinnedMeshRenderer) {
  jsonAsset._inheritsLoose(SkinnedMeshBatchRenderer, _SkinnedMeshRenderer);

  function SkinnedMeshBatchRenderer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _SkinnedMeshRenderer.call.apply(_SkinnedMeshRenderer, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "atlasSize", _descriptor7$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "batchableTextureNames", _descriptor8$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "units", _descriptor9, jsonAsset._assertThisInitialized(_this));

    _this._textures = {};
    _this._batchMaterial = null;
    return _this;
  }

  var _proto = SkinnedMeshBatchRenderer.prototype;

  _proto.onLoad = function onLoad() {
    _SkinnedMeshRenderer.prototype.onLoad.call(this);

    this.cook();
  };

  _proto.onDestroy = function onDestroy() {
    for (var tex in this._textures) {
      this._textures[tex].destroy();
    }

    this._textures = {};

    if (this._mesh) {
      this._mesh.destroy();

      this._mesh = null;
    }

    _SkinnedMeshRenderer.prototype.onDestroy.call(this);
  };

  _proto._onMaterialModified = function _onMaterialModified(idx, material) {
    this.cookMaterials();

    _SkinnedMeshRenderer.prototype._onMaterialModified.call(this, idx, this.getMaterialInstance(idx));
  };

  _proto.cook = function cook() {
    this.cookMaterials();
    this.cookSkeletons();
    this.cookMeshes();
  };

  _proto.cookMaterials = function cookMaterials() {
    var _this2 = this;

    if (!this._batchMaterial) {
      this._batchMaterial = this.getMaterial(0);
    }

    var mat = this.getMaterialInstance(0);

    if (!mat || !this._batchMaterial || !this._batchMaterial.effectAsset) {
      console.warn('incomplete batch material!');
      return;
    }

    mat.copy(this._batchMaterial);
    this.resizeAtlases();
    var tech = mat.effectAsset.techniques[mat.technique];

    var _loop = function _loop(i) {
      var pass = tech.passes[i];

      if (!pass.properties) {
        return "continue";
      }

      var _loop2 = function _loop2(prop) {
        if (pass.properties[prop].type >= jsonAsset.Type.SAMPLER1D) {
          var tex = null;

          if (_this2.batchableTextureNames.find(function (n) {
            return n === prop;
          })) {
            tex = _this2._textures[prop];

            if (!tex) {
              tex = _this2.createTexture(prop);
            }

            _this2.cookTextures(tex, prop, i);
          } else {
            _this2.units.some(function (u) {
              return tex = u.material && u.material.getProperty(prop, i);
            });
          }

          if (tex) {
            mat.setProperty(prop, tex, i);
          }
        } else {
          var value = [];

          for (var u = 0; u < _this2.units.length; u++) {
            var unit = _this2.units[u];

            if (!unit.material) {
              continue;
            }

            value.push(unit.material.getProperty(prop.slice(0, -3), i));
          }

          mat.setProperty(prop, value, i);
        }
      };

      for (var prop in pass.properties) {
        _loop2(prop);
      }
    };

    for (var i = 0; i < tech.passes.length; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }
  };

  _proto.cookSkeletons = function cookSkeletons() {

    if (!this._skinningRoot) {
      console.warn('no skinning root specified!');
      return;
    }

    var joints = [];
    var bindposes = [];

    for (var u = 0; u < this.units.length; u++) {
      var unit = this.units[u];

      if (!unit || !unit.skeleton) {
        continue;
      }

      var partial = unit.skeleton;
      jsonAsset.Mat4.invert(m4_local, unit._localTransform);

      var _loop3 = function _loop3(i) {
        var path = partial.joints[i];
        var idx = joints.findIndex(function (p) {
          return p === path;
        });

        if (idx >= 0) {

          return "continue";
        }

        joints.push(path);
        bindposes.push(jsonAsset.Mat4.multiply(new jsonAsset.Mat4(), partial.bindposes[i] || jsonAsset.Mat4.IDENTITY, m4_local));
      };

      for (var i = 0; i < partial.joints.length; i++) {
        var _ret2 = _loop3(i);

        if (_ret2 === "continue") continue;
      }
    }

    var idxMap = Array.from(Array(joints.length).keys()).sort(function (a, b) {
      if (joints[a] > joints[b]) {
        return 1;
      }

      if (joints[a] < joints[b]) {
        return -1;
      }

      return 0;
    });
    var skeleton$1 = new skeleton.Skeleton();
    skeleton$1.joints = joints.map(function (_, idx, arr) {
      return arr[idxMap[idx]];
    });
    skeleton$1.bindposes = bindposes.map(function (_, idx, arr) {
      return arr[idxMap[idx]];
    });

    if (this._skeleton) {
      this._skeleton.destroy();
    }

    this.skeleton = skeleton$1;
  };

  _proto.cookMeshes = function cookMeshes() {
    var _this4 = this;

    var isValid = false;

    for (var u = 0; u < this.units.length; u++) {
      var unit = this.units[u];

      if (unit.mesh) {
        isValid = true;
        break;
      }
    }

    if (!isValid || !this._skinningRoot) {
      return;
    }

    if (this._mesh) {
      this._mesh.destroyRenderingMesh();
    } else {
      this._mesh = new mesh.Mesh();
    }

    var posOffset = 0;
    var posFormat = jsonAsset.Format.UNKNOWN;
    var normalOffset = 0;
    var normalFormat = jsonAsset.Format.UNKNOWN;
    var tangentOffset = 0;
    var tangentFormat = jsonAsset.Format.UNKNOWN;
    var uvOffset = 0;
    var uvFormat = jsonAsset.Format.UNKNOWN;
    var jointOffset = 0;
    var jointFormat = jsonAsset.Format.UNKNOWN;
    var jointIndexMap = new Array(this.units.length);
    var unitLen = this.units.length;

    for (var i = 0; i < unitLen; i++) {
      var _unit = this.units[i];

      if (!_unit || !_unit.skeleton) {
        continue;
      }

      jointIndexMap[i] = _unit.skeleton.joints.map(function (j) {
        return _this4._skeleton.joints.findIndex(function (ref) {
          return j === ref;
        });
      });
    }

    var _loop4 = function _loop4(_i) {
      var unit = _this4.units[_i];

      if (!unit || !unit.mesh || !unit.mesh.data) {
        return "continue";
      }

      var newMesh = _this4._createUnitMesh(_i, unit.mesh);

      var dataView = new DataView(newMesh.data.buffer);
      jsonAsset.Mat4.inverseTranspose(m4_local, unit._localTransform);
      var offset = unit.offset;
      var size = unit.size;

      var _loop5 = function _loop5(b) {
        var bundle = newMesh.struct.vertexBundles[b];
        posOffset = bundle.view.offset;
        posFormat = jsonAsset.Format.UNKNOWN;

        for (var a = 0; a < bundle.attributes.length; a++) {
          var attr = bundle.attributes[a];

          if (attr.name === jsonAsset.AttributeName.ATTR_POSITION) {
            posFormat = attr.format;
            break;
          }

          posOffset += jsonAsset.FormatInfos[attr.format].size;
        }

        if (posFormat) {
          var pos = jsonAsset.readBuffer(dataView, posFormat, posOffset, bundle.view.length, bundle.view.stride);

          for (var j = 0; j < pos.length; j += 3) {
            jsonAsset.Vec3.fromArray(v3_1$2, pos, j);
            jsonAsset.Vec3.transformMat4(v3_1$2, v3_1$2, unit._localTransform);
            jsonAsset.Vec3.toArray(pos, v3_1$2, j);
          }

          jsonAsset.writeBuffer(dataView, pos, posFormat, posOffset, bundle.view.stride);
        }

        normalOffset = bundle.view.offset;
        normalFormat = jsonAsset.Format.UNKNOWN;

        for (var _a = 0; _a < bundle.attributes.length; _a++) {
          var _attr = bundle.attributes[_a];

          if (_attr.name === jsonAsset.AttributeName.ATTR_NORMAL) {
            normalFormat = _attr.format;
            break;
          }

          normalOffset += jsonAsset.FormatInfos[_attr.format].size;
        }

        if (normalFormat) {
          var normal = jsonAsset.readBuffer(dataView, normalFormat, normalOffset, bundle.view.length, bundle.view.stride);

          for (var _j = 0; _j < normal.length; _j += 3) {
            jsonAsset.Vec3.fromArray(v3_1$2, normal, _j);
            jsonAsset.Vec3.transformMat4Normal(v3_1$2, v3_1$2, m4_local);
            jsonAsset.Vec3.toArray(normal, v3_1$2, _j);
          }

          jsonAsset.writeBuffer(dataView, normal, normalFormat, normalOffset, bundle.view.stride);
        }

        tangentOffset = bundle.view.offset;
        tangentFormat = jsonAsset.Format.UNKNOWN;

        for (var _a2 = 0; _a2 < bundle.attributes.length; _a2++) {
          var _attr2 = bundle.attributes[_a2];

          if (_attr2.name === jsonAsset.AttributeName.ATTR_TANGENT) {
            tangentFormat = _attr2.format;
            break;
          }

          tangentOffset += jsonAsset.FormatInfos[_attr2.format].size;
        }

        if (tangentFormat) {
          var tangent = jsonAsset.readBuffer(dataView, tangentFormat, tangentOffset, bundle.view.length, bundle.view.stride);

          for (var _j2 = 0; _j2 < tangent.length; _j2 += 3) {
            jsonAsset.Vec3.fromArray(v3_1$2, tangent, _j2);
            jsonAsset.Vec3.transformMat4Normal(v3_1$2, v3_1$2, m4_local);
            jsonAsset.Vec3.toArray(tangent, v3_1$2, _j2);
          }

          jsonAsset.writeBuffer(dataView, tangent, tangentFormat, tangentOffset, bundle.view.stride);
        }

        uvOffset = bundle.view.offset;
        uvFormat = jsonAsset.Format.UNKNOWN;

        for (var _a3 = 0; _a3 < bundle.attributes.length; _a3++) {
          var _attr3 = bundle.attributes[_a3];

          if (_attr3.name === jsonAsset.AttributeName.ATTR_BATCH_UV) {
            uvFormat = _attr3.format;
            break;
          }

          uvOffset += jsonAsset.FormatInfos[_attr3.format].size;
        }

        if (uvFormat) {
          jsonAsset.mapBuffer(dataView, function (cur, idx) {
            cur = repeat(cur);
            var comp = idx === 0 ? 'x' : 'y';
            return cur * size[comp] + offset[comp];
          }, uvFormat, uvOffset, bundle.view.length, bundle.view.stride, dataView);
        }

        var idxMap = jointIndexMap[_i];

        if (!idxMap) {
          return "continue";
        }

        jointOffset = bundle.view.offset;
        jointFormat = jsonAsset.Format.UNKNOWN;

        for (var _a4 = 0; _a4 < bundle.attributes.length; _a4++) {
          var _attr4 = bundle.attributes[_a4];

          if (_attr4.name === jsonAsset.AttributeName.ATTR_JOINTS) {
            jointFormat = _attr4.format;
            break;
          }

          jointOffset += jsonAsset.FormatInfos[_attr4.format].size;
        }

        if (jointFormat) {
          jsonAsset.mapBuffer(dataView, function (cur) {
            return idxMap[cur];
          }, jointFormat, jointOffset, bundle.view.length, bundle.view.stride, dataView);
        }
      };

      for (var b = 0; b < newMesh.struct.vertexBundles.length; b++) {
        var _ret4 = _loop5(b);

        if (_ret4 === "continue") continue;
      }

      _this4._mesh.merge(newMesh);
    };

    for (var _i = 0; _i < unitLen; _i++) {
      var _ret3 = _loop4(_i);

      if (_ret3 === "continue") continue;
    }

    this._onMeshChanged(this._mesh);

    this._updateModels();
  };

  _proto.cookTextures = function cookTextures(target, prop, passIdx) {
    var texImages = [];
    var texImageRegions = [];
    var texBuffers = [];
    var texBufferRegions = [];

    for (var u = 0; u < this.units.length; u++) {
      var unit = this.units[u];

      if (!unit.material) {
        continue;
      }

      var partial = unit.material.getProperty(prop, passIdx);

      if (partial && partial.image && partial.image.data) {
        var region = new jsonAsset.BufferTextureCopy();
        region.texOffset.x = unit.offset.x * this.atlasSize;
        region.texOffset.y = unit.offset.y * this.atlasSize;
        region.texExtent.width = unit.size.x * this.atlasSize;
        region.texExtent.height = unit.size.y * this.atlasSize;
        var data = partial.image.data;

        if (!ArrayBuffer.isView(data)) {
          texImages.push(data);
          texImageRegions.push(region);
        } else {
          texBuffers.push(data);
          texBufferRegions.push(region);
        }
      }
    }

    var gfxTex = target.getGFXTexture();
    var _ref = jsonAsset.legacyCC.director.root,
        device = _ref.device;

    if (texBuffers.length > 0) {
      device.copyBuffersToTexture(texBuffers, gfxTex, texBufferRegions);
    }

    if (texImages.length > 0) {
      device.copyTexImagesToTexture(texImages, gfxTex, texImageRegions);
    }
  };

  _proto.createTexture = function createTexture(prop) {
    var tex = new jsonAsset.Texture2D();
    tex.setFilters(jsonAsset.Filter$1.LINEAR, jsonAsset.Filter$1.LINEAR);
    tex.setMipFilter(jsonAsset.Filter$1.NEAREST);
    tex.reset({
      width: this.atlasSize,
      height: this.atlasSize,
      format: jsonAsset.PixelFormat.RGBA8888
    });
    this._textures[prop] = tex;
    return tex;
  };

  _proto.resizeAtlases = function resizeAtlases() {
    for (var prop in this._textures) {
      var tex = this._textures[prop];
      tex.reset({
        width: this.atlasSize,
        height: this.atlasSize,
        format: jsonAsset.PixelFormat.RGBA8888
      });
    }
  };

  _proto._createUnitMesh = function _createUnitMesh(unitIdx, mesh$1) {
    var newMeshStruct = JSON.parse(JSON.stringify(mesh$1.struct));
    var modifiedBundles = {};

    for (var p = 0; p < mesh$1.struct.primitives.length; p++) {
      var primitive = mesh$1.struct.primitives[p];
      var uvOffset = 0;
      var uvFormat = jsonAsset.Format.UNKNOWN;
      var bundleIdx = 0;

      for (; bundleIdx < primitive.vertexBundelIndices.length; bundleIdx++) {
        var bundle = mesh$1.struct.vertexBundles[primitive.vertexBundelIndices[bundleIdx]];
        uvOffset = bundle.view.offset;
        uvFormat = jsonAsset.Format.UNKNOWN;

        for (var a = 0; a < bundle.attributes.length; a++) {
          var attr = bundle.attributes[a];

          if (attr.name === jsonAsset.AttributeName.ATTR_TEX_COORD) {
            uvFormat = attr.format;
            break;
          }

          uvOffset += jsonAsset.FormatInfos[attr.format].size;
        }

        if (uvFormat) {
          break;
        }
      }

      if (modifiedBundles[bundleIdx] !== undefined) {
        continue;
      }

      modifiedBundles[bundleIdx] = [uvFormat, uvOffset];
      var newBundle = newMeshStruct.vertexBundles[bundleIdx];
      newBundle.attributes.push(batch_id);
      newBundle.attributes.push(batch_uv);
      newBundle.view.offset = 0;
      newBundle.view.length += newBundle.view.count * batch_extras_size;
      newBundle.view.stride += batch_extras_size;
    }

    var totalLength = 0;

    for (var b = 0; b < newMeshStruct.vertexBundles.length; b++) {
      totalLength += newMeshStruct.vertexBundles[b].view.length;
    }

    for (var _p = 0; _p < newMeshStruct.primitives.length; _p++) {
      var pm = newMeshStruct.primitives[_p];

      if (pm.indexView) {
        pm.indexView.offset = totalLength;
        totalLength += pm.indexView.length;
      }
    }

    var newMeshData = new Uint8Array(totalLength);
    var oldMeshData = mesh$1.data;
    var newDataView = new DataView(newMeshData.buffer);
    var oldDataView = new DataView(oldMeshData.buffer);
    var isLittleEndian = jsonAsset.legacyCC.sys.isLittleEndian;

    for (var _b in modifiedBundles) {
      var _newBundle = newMeshStruct.vertexBundles[_b];
      var oldBundle = mesh$1.struct.vertexBundles[_b];
      var _modifiedBundles$_b = modifiedBundles[_b],
          _uvFormat = _modifiedBundles$_b[0],
          _uvOffset = _modifiedBundles$_b[1];
      var uvs = jsonAsset.readBuffer(oldDataView, _uvFormat, _uvOffset, oldBundle.view.length, oldBundle.view.stride);
      var oldView = oldBundle.view;
      var newView = _newBundle.view;
      var oldStride = oldView.stride;
      var newStride = newView.stride;
      var oldOffset = oldView.offset;
      var newOffset = newView.offset;

      for (var j = 0; j < newView.count; j++) {
        var srcVertex = oldMeshData.subarray(oldOffset, oldOffset + oldStride);
        newMeshData.set(srcVertex, newOffset);
        newDataView.setFloat32(newOffset + oldStride, unitIdx);
        newDataView.setFloat32(newOffset + oldStride + 4, uvs[j * 2], isLittleEndian);
        newDataView.setFloat32(newOffset + oldStride + 8, uvs[j * 2 + 1], isLittleEndian);
        newOffset += newStride;
        oldOffset += oldStride;
      }
    }

    for (var k = 0; k < newMeshStruct.primitives.length; k++) {
      var oldPrimitive = mesh$1.struct.primitives[k];
      var newPrimitive = newMeshStruct.primitives[k];

      if (oldPrimitive.indexView && newPrimitive.indexView) {
        var _oldStride = oldPrimitive.indexView.stride;
        var _newStride = newPrimitive.indexView.stride;
        var _oldOffset = oldPrimitive.indexView.offset;
        var _newOffset = newPrimitive.indexView.offset;

        for (var _j3 = 0; _j3 < newPrimitive.indexView.count; _j3++) {
          var srcIndices = oldMeshData.subarray(_oldOffset, _oldOffset + _oldStride);
          newMeshData.set(srcIndices, _newOffset);
          _newOffset += _newStride;
          _oldOffset += _oldStride;
        }
      }
    }

    var newMesh = new mesh.Mesh();
    newMesh.reset({
      struct: newMeshStruct,
      data: newMeshData
    });
    return newMesh;
  };

  jsonAsset._createClass(SkinnedMeshBatchRenderer, [{
    key: "mesh",
    get: function get() {
      return _SkinnedMeshRenderer.prototype.mesh;
    },
    set: function set(val) {
      this.mesh = val;
    }
  }, {
    key: "skeleton",
    get: function get() {
      return _SkinnedMeshRenderer.prototype.skeleton;
    },
    set: function set(val) {
      this.skeleton = val;
    }
  }]);

  return SkinnedMeshBatchRenderer;
}(SkinnedMeshRenderer), _temp2$1), (_descriptor7$1 = jsonAsset._applyDecoratedDescriptor(_class5$1.prototype, "atlasSize", [jsonAsset.serializable, _dec10$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1024;
  }
}), _descriptor8$1 = jsonAsset._applyDecoratedDescriptor(_class5$1.prototype, "batchableTextureNames", [_dec11$2, jsonAsset.serializable, _dec12$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor9 = jsonAsset._applyDecoratedDescriptor(_class5$1.prototype, "units", [_dec13$1, jsonAsset.serializable, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), jsonAsset._applyDecoratedDescriptor(_class5$1.prototype, "mesh", [jsonAsset.override, _dec15], Object.getOwnPropertyDescriptor(_class5$1.prototype, "mesh"), _class5$1.prototype), jsonAsset._applyDecoratedDescriptor(_class5$1.prototype, "skeleton", [jsonAsset.override, _dec16], Object.getOwnPropertyDescriptor(_class5$1.prototype, "skeleton"), _class5$1.prototype)), _class5$1)) || _class4$1) || _class4$1) || _class4$1) || _class4$1) || _class4$1);

jsonAsset.legacyCC.SkinningModelComponent = SkinnedMeshRenderer;
jsonAsset.js$1.setClassAlias(SkinnedMeshRenderer, 'cc.SkinningModelComponent');
jsonAsset.legacyCC.SkinningModelUnit = SkinnedMeshUnit;
jsonAsset.js$1.setClassAlias(SkinnedMeshUnit, 'cc.SkinningModelUnit');
jsonAsset.legacyCC.BatchedSkinningModelComponent = SkinnedMeshBatchRenderer;
jsonAsset.js$1.setClassAlias(SkinnedMeshBatchRenderer, 'cc.BatchedSkinningModelComponent');

var m4_1$3 = new jsonAsset.Mat4();
var m4_2$1 = new jsonAsset.Mat4();
var SkeletalAnimationState = function (_AnimationState) {
  jsonAsset._inheritsLoose(SkeletalAnimationState, _AnimationState);

  function SkeletalAnimationState(clip, name) {
    var _this;

    if (name === void 0) {
      name = '';
    }

    _this = _AnimationState.call(this, clip, name) || this;
    _this._frames = 1;
    _this._bakedDuration = 0;
    _this._animInfo = null;
    _this._sockets = [];
    _this._animInfoMgr = void 0;
    _this._comps = [];
    _this._parent = null;
    _this._curvesInited = false;
    _this._animInfoMgr = jsonAsset.legacyCC.director.root.dataPoolManager.jointAnimationInfo;
    return _this;
  }

  var _proto = SkeletalAnimationState.prototype;

  _proto.initialize = function initialize(root) {
    if (this._curveLoaded) {
      return;
    }

    this._comps.length = 0;
    var comps = root.getComponentsInChildren(SkinnedMeshRenderer);

    for (var i = 0; i < comps.length; ++i) {
      var comp = comps[i];

      if (comp.skinningRoot === root) {
        this._comps.push(comp);
      }
    }

    this._parent = root.getComponent('cc.SkeletalAnimation');
    var baked = this._parent.useBakedAnimation;
    this._doNotCreateEval = baked;

    _AnimationState.prototype.initialize.call(this, root);

    this._curvesInited = !baked;

    var _SkelAnimDataHub$getO = transformUtils.SkelAnimDataHub.getOrExtract(this.clip),
        frames = _SkelAnimDataHub$getO.frames,
        samples = _SkelAnimDataHub$getO.samples;

    this._frames = frames - 1;
    this._animInfo = this._animInfoMgr.getData(root.uuid);
    this._bakedDuration = this._frames / samples;
  };

  _proto.onPlay = function onPlay() {
    _AnimationState.prototype.onPlay.call(this);

    var baked = this._parent.useBakedAnimation;

    if (baked) {
      this._sampleCurves = this._sampleCurvesBaked;
      this.duration = this._bakedDuration;

      this._animInfoMgr.switchClip(this._animInfo, this.clip);

      for (var i = 0; i < this._comps.length; ++i) {
        this._comps[i].uploadAnimation(this.clip);
      }
    } else {
      this._sampleCurves = _AnimationState.prototype._sampleCurves;
      this.duration = this.clip.duration;

      if (!this._curvesInited) {
        this._curveLoaded = false;

        _AnimationState.prototype.initialize.call(this, this._targetNode);

        this._curvesInited = true;
      }
    }
  };

  _proto.rebuildSocketCurves = function rebuildSocketCurves(sockets) {
    this._sockets.length = 0;

    if (!this._targetNode) {
      return;
    }

    var root = this._targetNode;

    for (var i = 0; i < sockets.length; ++i) {
      var socket = sockets[i];
      var targetNode = root.getChildByPath(socket.path);

      if (!socket.target) {
        continue;
      }

      var clipData = transformUtils.SkelAnimDataHub.getOrExtract(this.clip);
      var animPath = socket.path;
      var source = clipData.joints[animPath];
      var animNode = targetNode;
      var downstream = void 0;

      while (!source) {
        var idx = animPath.lastIndexOf('/');
        animPath = animPath.substring(0, idx);
        source = clipData.joints[animPath];

        if (animNode) {
          if (!downstream) {
            downstream = jsonAsset.Mat4.identity(m4_2$1);
          }

          jsonAsset.Mat4.fromRTS(m4_1$3, animNode.rotation, animNode.position, animNode.scale);
          jsonAsset.Mat4.multiply(downstream, m4_1$3, downstream);
          animNode = animNode.parent;
        }

        if (idx < 0) {
          break;
        }
      }

      var curveData = source && source.transforms;
      var frames = clipData.frames;
      var transforms = [];

      for (var f = 0; f < frames; f++) {
        var mat = void 0;

        if (curveData && downstream) {
          mat = jsonAsset.Mat4.multiply(m4_1$3, curveData[f], downstream);
        } else if (curveData) {
          mat = curveData[f];
        } else if (downstream) {
          mat = downstream;
        } else {
          mat = new jsonAsset.Mat4();
        }

        var tfm = {
          pos: new jsonAsset.Vec3(),
          rot: new jsonAsset.Quat(),
          scale: new jsonAsset.Vec3()
        };
        jsonAsset.Mat4.toRTS(mat, tfm.rot, tfm.pos, tfm.scale);
        transforms.push(tfm);
      }

      this._sockets.push({
        target: socket.target,
        frames: transforms
      });
    }
  };

  _proto._setAnimInfoDirty = function _setAnimInfoDirty(info, value) {
    info.dirty = value;
  };

  _proto._sampleCurvesBaked = function _sampleCurvesBaked(time) {
    var ratio = time / this.duration;
    var info = this._animInfo;
    var curFrame = ratio * this._frames + 0.5 | 0;

    if (curFrame === info.data[0]) {
      return;
    }

    info.data[0] = curFrame;

    this._setAnimInfoDirty(info, true);

    for (var i = 0; i < this._sockets.length; ++i) {
      var _this$_sockets$i = this._sockets[i],
          target = _this$_sockets$i.target,
          frames = _this$_sockets$i.frames;
      var _frames$curFrame = frames[curFrame],
          pos = _frames$curFrame.pos,
          rot = _frames$curFrame.rot,
          scale = _frames$curFrame.scale;
      target.setRTS(rot, pos, scale);
    }
  };

  return SkeletalAnimationState;
}(transformUtils.AnimationState);

var _dec$6, _dec2$6, _class$6, _class2$6, _descriptor$6, _descriptor2$5, _temp$6, _dec3$6, _dec4$6, _dec5$6, _dec6$5, _dec7$5, _dec8$4, _dec9$4, _dec10$3, _class4$2, _class5$2, _descriptor3$4, _descriptor4$4, _class6$1, _temp2$2;
var Socket = (_dec$6 = jsonAsset.ccclass('cc.SkeletalAnimation.Socket'), _dec2$6 = jsonAsset.type(jsonAsset.Node), _dec$6(_class$6 = (_class2$6 = (_temp$6 = function Socket(path, target) {
  if (path === void 0) {
    path = '';
  }

  if (target === void 0) {
    target = null;
  }

  jsonAsset._initializerDefineProperty(this, "path", _descriptor$6, this);

  jsonAsset._initializerDefineProperty(this, "target", _descriptor2$5, this);

  this.path = path;
  this.target = target;
}, _temp$6), (_descriptor$6 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "path", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2$5 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "target", [_dec2$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2$6)) || _class$6);
jsonAsset.js$1.setClassAlias(Socket, 'cc.SkeletalAnimationComponent.Socket');
var m4_1$4 = new jsonAsset.Mat4();
var m4_2$2 = new jsonAsset.Mat4();

function collectRecursively(node, prefix, out) {
  if (prefix === void 0) {
    prefix = '';
  }

  if (out === void 0) {
    out = [];
  }

  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];

    if (!child) {
      continue;
    }

    var path = prefix ? prefix + "/" + child.name : child.name;
    out.push(path);
    collectRecursively(child, path, out);
  }

  return out;
}

var SkeletalAnimation = (_dec3$6 = jsonAsset.ccclass('cc.SkeletalAnimation'), _dec4$6 = jsonAsset.help(), _dec5$6 = jsonAsset.executionOrder(99), _dec6$5 = jsonAsset.menu(), _dec7$5 = jsonAsset.type([Socket]), _dec8$4 = jsonAsset.tooltip(), _dec9$4 = jsonAsset.tooltip(), _dec10$3 = jsonAsset.type([Socket]), _dec3$6(_class4$2 = _dec4$6(_class4$2 = _dec5$6(_class4$2 = jsonAsset.executeInEditMode(_class4$2 = _dec6$5(_class4$2 = (_class5$2 = (_temp2$2 = _class6$1 = function (_Animation) {
  jsonAsset._inheritsLoose(SkeletalAnimation, _Animation);

  function SkeletalAnimation() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Animation.call.apply(_Animation, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_useBakedAnimation", _descriptor3$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_sockets", _descriptor4$4, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = SkeletalAnimation.prototype;

  _proto.onDestroy = function onDestroy() {
    _Animation.prototype.onDestroy.call(this);

    jsonAsset.legacyCC.director.root.dataPoolManager.jointAnimationInfo.destroy(this.node.uuid);
    jsonAsset.legacyCC.director.getAnimationManager().removeSockets(this.node, this._sockets);
  };

  _proto.start = function start() {
    this.sockets = this._sockets;
    this.useBakedAnimation = this._useBakedAnimation;

    _Animation.prototype.start.call(this);
  };

  _proto.querySockets = function querySockets() {
    var animPaths = this._defaultClip && Object.keys(transformUtils.SkelAnimDataHub.getOrExtract(this._defaultClip).joints).sort().reduce(function (acc, cur) {
      return cur.startsWith(acc[acc.length - 1]) ? acc : (acc.push(cur), acc);
    }, []) || [];

    if (!animPaths.length) {
      return ['please specify a valid default animation clip first'];
    }

    var out = [];

    for (var i = 0; i < animPaths.length; i++) {
      var path = animPaths[i];
      var node = this.node.getChildByPath(path);

      if (!node) {
        continue;
      }

      out.push(path);
      collectRecursively(node, path, out);
    }

    return out;
  };

  _proto.rebuildSocketAnimations = function rebuildSocketAnimations() {
    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._sockets), _step; !(_step = _iterator()).done;) {
      var socket = _step.value;
      var joint = this.node.getChildByPath(socket.path);
      var target = socket.target;

      if (joint && target) {
        target.name = socket.path.substring(socket.path.lastIndexOf('/') + 1) + " Socket";
        target.parent = this.node;
        transformUtils.getWorldTransformUntilRoot(joint, this.node, m4_1$4);
        jsonAsset.Mat4.fromRTS(m4_2$2, target.rotation, target.position, target.scale);

        if (!jsonAsset.Mat4.equals(m4_2$2, m4_1$4)) {
          target.matrix = m4_1$4;
        }
      }
    }

    for (var _i = 0, _Object$keys = Object.keys(this._nameToState); _i < _Object$keys.length; _i++) {
      var stateName = _Object$keys[_i];
      var state = this._nameToState[stateName];
      state.rebuildSocketCurves(this._sockets);
    }
  };

  _proto.createSocket = function createSocket(path) {
    var socket = this._sockets.find(function (s) {
      return s.path === path;
    });

    if (socket) {
      return socket.target;
    }

    var joint = this.node.getChildByPath(path);

    if (!joint) {
      console.warn('illegal socket path');
      return null;
    }

    var target = new jsonAsset.Node();
    target.parent = this.node;

    this._sockets.push(new Socket(path, target));

    this.rebuildSocketAnimations();
    return target;
  };

  _proto._createState = function _createState(clip, name) {
    return new SkeletalAnimationState(clip, name);
  };

  _proto._doCreateState = function _doCreateState(clip, name) {
    var state = _Animation.prototype._doCreateState.call(this, clip, name);

    state.rebuildSocketCurves(this._sockets);
    return state;
  };

  jsonAsset._createClass(SkeletalAnimation, [{
    key: "sockets",
    get: function get() {
      return this._sockets;
    },
    set: function set(val) {
      if (!this._useBakedAnimation) {
        var animMgr = jsonAsset.legacyCC.director.getAnimationManager();
        animMgr.removeSockets(this.node, this._sockets);
        animMgr.addSockets(this.node, val);
      }

      this._sockets = val;
      this.rebuildSocketAnimations();
    }
  }, {
    key: "useBakedAnimation",
    get: function get() {
      return this._useBakedAnimation;
    },
    set: function set(val) {
      this._useBakedAnimation = val;
      var comps = this.node.getComponentsInChildren(SkinnedMeshRenderer);

      for (var i = 0; i < comps.length; ++i) {
        var comp = comps[i];

        if (comp.skinningRoot === this.node) {
          comp.setUseBakedAnimation(this._useBakedAnimation, true);
        }
      }

      if (this._useBakedAnimation) {
        jsonAsset.legacyCC.director.getAnimationManager().removeSockets(this.node, this._sockets);
      } else {
        jsonAsset.legacyCC.director.getAnimationManager().addSockets(this.node, this._sockets);
      }
    }
  }]);

  return SkeletalAnimation;
}(transformUtils.Animation), _class6$1.Socket = Socket, _temp2$2), (jsonAsset._applyDecoratedDescriptor(_class5$2.prototype, "sockets", [_dec7$5, _dec8$4], Object.getOwnPropertyDescriptor(_class5$2.prototype, "sockets"), _class5$2.prototype), jsonAsset._applyDecoratedDescriptor(_class5$2.prototype, "useBakedAnimation", [_dec9$4], Object.getOwnPropertyDescriptor(_class5$2.prototype, "useBakedAnimation"), _class5$2.prototype), _descriptor3$4 = jsonAsset._applyDecoratedDescriptor(_class5$2.prototype, "_useBakedAnimation", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor4$4 = jsonAsset._applyDecoratedDescriptor(_class5$2.prototype, "_sockets", [_dec10$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class5$2)) || _class4$2) || _class4$2) || _class4$2) || _class4$2) || _class4$2);

jsonAsset.legacyCC.SkeletalAnimationComponent = SkeletalAnimation;
jsonAsset.js$1.setClassAlias(SkeletalAnimation, 'cc.SkeletalAnimationComponent');

jsonAsset.legacyCC.utils = utils;

exports.BatchingUtility = BatchingUtility;
exports.DirectionalLight = DirectionalLight;
exports.Light = Light;
exports.SkeletalAnimation = SkeletalAnimation;
exports.SkeletalAnimationState = SkeletalAnimationState;
exports.SkinnedMeshBatchRenderer = SkinnedMeshBatchRenderer;
exports.SkinnedMeshRenderer = SkinnedMeshRenderer;
exports.SkinnedMeshUnit = SkinnedMeshUnit;
exports.Socket = Socket;
exports.SphereLight = SphereLight;
exports.SpotLight = SpotLight;
exports.utils = utils;
