'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var view = require('./view-c0f88f03.js');

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp;
var _matInsInfo = {
  parent: null,
  owner: null,
  subModelIdx: 0
};
var RenderableComponent = (_dec = jsonAsset.ccclass('cc.RenderableComponent'), _dec2 = jsonAsset.type([jsonAsset.Material]), _dec3 = jsonAsset.type(jsonAsset.Material), _dec4 = jsonAsset.displayOrder(), _dec5 = jsonAsset.displayName(), _dec(_class = (_class2 = (_temp = function (_Component) {
  jsonAsset._inheritsLoose(RenderableComponent, _Component);

  function RenderableComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_materials", _descriptor, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_visFlags", _descriptor2, jsonAsset._assertThisInitialized(_this));

    _this._materialInstances = [];
    _this._models = [];
    return _this;
  }

  var _proto = RenderableComponent.prototype;

  _proto.getMaterial = function getMaterial(idx) {
    if (idx < 0 || idx >= this._materials.length) {
      return null;
    }

    return this._materials[idx];
  };

  _proto.setMaterial = function setMaterial(material, index) {
    if (material && material instanceof view.MaterialInstance) {
      console.error('Can\'t set a material instance to a sharedMaterial slot');
    }

    this._materials[index] = material;
    var inst = this._materialInstances[index];

    if (inst) {
      inst.destroy();
      this._materialInstances[index] = null;
    }

    this._onMaterialModified(index, this._materials[index]);
  };

  _proto.getMaterialInstance = function getMaterialInstance(idx) {
    var mat = this._materials[idx];

    if (!mat) {
      return null;
    }

    if (!this._materialInstances[idx]) {
      _matInsInfo.parent = this._materials[idx];
      _matInsInfo.owner = this;
      _matInsInfo.subModelIdx = idx;
      var instantiated = new view.MaterialInstance(_matInsInfo);
      _matInsInfo.parent = null;
      _matInsInfo.owner = null;
      _matInsInfo.subModelIdx = 0;
      this.setMaterialInstance(instantiated, idx);
    }

    return this._materialInstances[idx];
  };

  _proto.setMaterialInstance = function setMaterialInstance(matInst, index) {
    if (typeof matInst === 'number') {
      jsonAsset.warnID(12007);
      var temp = matInst;
      matInst = index;
      index = temp;
    }

    var curInst = this._materialInstances[index];

    if (matInst && matInst.parent) {
      if (matInst !== curInst) {
        this._materialInstances[index] = matInst;

        this._onMaterialModified(index, matInst);
      }

      return;
    }

    if (matInst !== this._materials[index] || curInst) {
      this.setMaterial(matInst, index);
    }
  };

  _proto.getRenderMaterial = function getRenderMaterial(index) {
    return this._materialInstances[index] || this._materials[index];
  };

  _proto._collectModels = function _collectModels() {
    return this._models;
  };

  _proto._attachToScene = function _attachToScene() {};

  _proto._detachFromScene = function _detachFromScene() {};

  _proto._onMaterialModified = function _onMaterialModified(index, material) {};

  _proto._onRebuildPSO = function _onRebuildPSO(index, material) {};

  _proto._clearMaterials = function _clearMaterials() {};

  _proto._onVisibilityChange = function _onVisibilityChange(val) {};

  jsonAsset._createClass(RenderableComponent, [{
    key: "visibility",
    get: function get() {
      return this._visFlags;
    },
    set: function set(val) {
      this._visFlags = val;

      this._onVisibilityChange(val);
    }
  }, {
    key: "sharedMaterials",
    get: function get() {
      return  this._materials;
    },
    set: function set(val) {
      for (var i = 0; i < val.length; i++) {
        if (val[i] !== this._materials[i]) {
          this.setMaterial(val[i], i);
        }
      }

      if (val.length < this._materials.length) {
        for (var _i = val.length; _i < this._materials.length; _i++) {
          this.setMaterial(null, _i);
        }

        this._materials.splice(val.length);
      }
    }
  }, {
    key: "materials",
    get: function get() {
      for (var i = 0; i < this._materials.length; i++) {
        this._materialInstances[i] = this.getMaterialInstance(i);
      }

      return this._materialInstances;
    },
    set: function set(val) {
      var dLen = val.length - this._materials.length;

      if (dLen > 0) {
        this._materials.length = val.length;
        this._materialInstances.length = val.length;
      } else if (dLen < 0) {
        for (var i = this._materials.length - dLen; i < this._materials.length; ++i) {
          this.setMaterialInstance(null, i);
        }
      }

      for (var _i2 = 0; _i2 < this._materialInstances.length; _i2++) {
        if (this._materialInstances[_i2] != val[_i2]) {
          this.setMaterialInstance(val[_i2], _i2);
        }
      }
    }
  }, {
    key: "sharedMaterial",
    get: function get() {
      return this.getMaterial(0);
    }
  }, {
    key: "material",
    get: function get() {
      return this.getMaterialInstance(0);
    },
    set: function set(val) {
      if (this._materials.length === 1 && !this._materialInstances[0] && this._materials[0] === val) {
        return;
      }

      this.setMaterialInstance(val, 0);
    }
  }]);

  return RenderableComponent;
}(jsonAsset.Component), _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_materials", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_visFlags", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Layers.Enum.NONE;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [_dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype)), _class2)) || _class);
jsonAsset.legacyCC.RenderableComponent = RenderableComponent;

exports.RenderableComponent = RenderableComponent;
