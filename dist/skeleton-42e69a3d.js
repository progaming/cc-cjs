'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var mesh = require('./mesh-1b66157b.js');

jsonAsset.replaceProperty(mesh.Mesh.prototype, 'Mesh.prototype', [{
  name: 'renderingMesh',
  newName: 'renderingSubMeshes'
}]);
jsonAsset.removeProperty(mesh.Mesh.prototype, 'Mesh.prototype', [{
  name: 'hasFlatBuffers'
}, {
  name: 'destroyFlatBuffers'
}]);

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;
var Skeleton = (_dec = jsonAsset.ccclass('cc.Skeleton'), _dec2 = jsonAsset.type([jsonAsset.CCString]), _dec3 = jsonAsset.type([jsonAsset.Mat4]), _dec(_class = (_class2 = (_temp = function (_Asset) {
  jsonAsset._inheritsLoose(Skeleton, _Asset);

  function Skeleton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_joints", _descriptor, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_bindposes", _descriptor2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_hash", _descriptor3, jsonAsset._assertThisInitialized(_this));

    _this._invBindposes = null;
    return _this;
  }

  var _proto = Skeleton.prototype;

  _proto.destroy = function destroy() {
    var _ref, _legacyCC$director$ro;

    (_ref = (_legacyCC$director$ro = jsonAsset.legacyCC.director.root) === null || _legacyCC$director$ro === void 0 ? void 0 : _legacyCC$director$ro.dataPoolManager) === null || _ref === void 0 ? void 0 : _ref.releaseSkeleton(this);
    return _Asset.prototype.destroy.call(this);
  };

  _proto.validate = function validate() {
    return this.joints.length > 0 && this.bindposes.length > 0;
  };

  jsonAsset._createClass(Skeleton, [{
    key: "joints",
    get: function get() {
      return this._joints;
    },
    set: function set(value) {
      this._joints = value;
    }
  }, {
    key: "bindposes",
    get: function get() {
      return this._bindposes;
    },
    set: function set(value) {
      this._bindposes = value;
    }
  }, {
    key: "inverseBindposes",
    get: function get() {
      if (!this._invBindposes) {
        this._invBindposes = [];

        for (var i = 0; i < this._bindposes.length; i++) {
          var inv = new jsonAsset.Mat4();
          jsonAsset.Mat4.invert(inv, this._bindposes[i]);

          this._invBindposes.push(inv);
        }
      }

      return this._invBindposes;
    }
  }, {
    key: "hash",
    get: function get() {
      if (!this._hash) {
        var str = '';

        for (var i = 0; i < this._bindposes.length; i++) {
          var ibm = this._bindposes[i];
          str += ibm.m00.toPrecision(2) + " " + ibm.m01.toPrecision(2) + " " + ibm.m02.toPrecision(2) + " " + ibm.m03.toPrecision(2) + " " + ibm.m04.toPrecision(2) + " " + ibm.m05.toPrecision(2) + " " + ibm.m06.toPrecision(2) + " " + ibm.m07.toPrecision(2) + " " + ibm.m08.toPrecision(2) + " " + ibm.m09.toPrecision(2) + " " + ibm.m10.toPrecision(2) + " " + ibm.m11.toPrecision(2) + " " + ibm.m12.toPrecision(2) + " " + ibm.m13.toPrecision(2) + " " + ibm.m14.toPrecision(2) + " " + ibm.m15.toPrecision(2) + "\n";
        }

        this._hash = jsonAsset.murmurhash2_32_gc(str, 666);
      }

      return this._hash;
    }
  }]);

  return Skeleton;
}(jsonAsset.Asset), _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_joints", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_bindposes", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_hash", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
jsonAsset.legacyCC.Skeleton = Skeleton;

exports.Skeleton = Skeleton;
