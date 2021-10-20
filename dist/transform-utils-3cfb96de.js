'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
require('./view-c0f88f03.js');
require('./deprecated-024a684c.js');

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2;
function isPropertyPath(path) {
  return typeof path === 'string' || typeof path === 'number';
}
function isCustomPath(path, constructor) {
  return path instanceof constructor;
}
var HierarchyPath = (_dec = jsonAsset.ccclass('cc.animation.HierarchyPath'), _dec(_class = (_class2 = (_temp = function () {
  function HierarchyPath(path) {
    jsonAsset._initializerDefineProperty(this, "path", _descriptor, this);

    this.path = path || '';
  }

  var _proto = HierarchyPath.prototype;

  _proto.get = function get(target) {
    if (!(target instanceof jsonAsset.Node)) {
      jsonAsset.warnID(3925);
      return null;
    }

    var result = target.getChildByPath(this.path);

    if (!result) {
      jsonAsset.warnID(3926, target.name, this.path);
      return null;
    }

    return result;
  };

  return HierarchyPath;
}(), _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "path", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2)) || _class);
var ComponentPath = (_dec2 = jsonAsset.ccclass('cc.animation.ComponentPath'), _dec2(_class4 = (_class5 = (_temp2 = function () {
  function ComponentPath(component) {
    jsonAsset._initializerDefineProperty(this, "component", _descriptor2, this);

    this.component = component || '';
  }

  var _proto2 = ComponentPath.prototype;

  _proto2.get = function get(target) {
    if (!(target instanceof jsonAsset.Node)) {
      jsonAsset.warnID(3927);
      return null;
    }

    var result = target.getComponent(this.component);

    if (!result) {
      jsonAsset.warnID(3928, target.name, this.component);
      return null;
    }

    return result;
  };

  return ComponentPath;
}(), _temp2), (_descriptor2 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "component", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class5)) || _class4);

var _dec2$1, _class4$1, _class5$1, _descriptor4, _descriptor5, _descriptor6, _temp2$1;

function makeCubicSplineValueConstructor(name, constructorX, scaleFx, scaleAndAdd) {
  var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

  var tempValue = new constructorX();
  var m0 = new constructorX();
  var m1 = new constructorX();
  var CubicSplineValueClass = (_dec = jsonAsset.ccclass(name), _dec(_class = (_class2 = (_temp = function () {
    function CubicSplineValueClass(dataPoint, inTangent, outTangent) {
      jsonAsset._initializerDefineProperty(this, "dataPoint", _descriptor, this);

      jsonAsset._initializerDefineProperty(this, "inTangent", _descriptor2, this);

      jsonAsset._initializerDefineProperty(this, "outTangent", _descriptor3, this);

      this.dataPoint = dataPoint || new constructorX();
      this.inTangent = inTangent || new constructorX();
      this.outTangent = outTangent || new constructorX();
    }

    var _proto = CubicSplineValueClass.prototype;

    _proto.lerp = function lerp(to, t, dt) {
      var p0 = this.dataPoint;
      var p1 = to.dataPoint;
      m0 = scaleFx(m0, this.inTangent, dt);
      m1 = scaleFx(m1, to.outTangent, dt);
      var t_3 = t * t * t;
      var t_2 = t * t;
      var f_0 = 2 * t_3 - 3 * t_2 + 1;
      var f_1 = t_3 - 2 * t_2 + t;
      var f_2 = -2 * t_3 + 3 * t_2;
      var f_3 = t_3 - t_2;
      tempValue = scaleFx(tempValue, p0, f_0);
      tempValue = scaleAndAdd(tempValue, tempValue, m0, f_1);
      tempValue = scaleAndAdd(tempValue, tempValue, p1, f_2);
      tempValue = scaleAndAdd(tempValue, tempValue, m1, f_3);
      return tempValue;
    };

    _proto.getNoLerp = function getNoLerp() {
      return this.dataPoint;
    };

    return CubicSplineValueClass;
  }(), _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "dataPoint", [jsonAsset.serializable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return new constructorX();
    }
  }), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "inTangent", [jsonAsset.serializable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return new constructorX();
    }
  }), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "outTangent", [jsonAsset.serializable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return new constructorX();
    }
  })), _class2)) || _class);

  if (constructorX === jsonAsset.Quat) {
    var _lerp = CubicSplineValueClass.prototype.lerp;

    CubicSplineValueClass.prototype.lerp = function (to, t, dt) {
      var result = _lerp.call(this, to, t, dt);

      jsonAsset.Quat.normalize(result, result);
      return result;
    };
  }

  return CubicSplineValueClass;
}

var CubicSplineVec2Value = makeCubicSplineValueConstructor('cc.CubicSplineVec2Value', jsonAsset.Vec2, jsonAsset.Vec2.multiplyScalar, jsonAsset.Vec2.scaleAndAdd);
jsonAsset.legacyCC.CubicSplineVec2Value = CubicSplineVec2Value;
var CubicSplineVec3Value = makeCubicSplineValueConstructor('cc.CubicSplineVec3Value', jsonAsset.Vec3, jsonAsset.Vec3.multiplyScalar, jsonAsset.Vec3.scaleAndAdd);
jsonAsset.legacyCC.CubicSplineVec3Value = CubicSplineVec3Value;
var CubicSplineVec4Value = makeCubicSplineValueConstructor('cc.CubicSplineVec4Value', jsonAsset.Vec4, jsonAsset.Vec4.multiplyScalar, jsonAsset.Vec4.scaleAndAdd);
jsonAsset.legacyCC.CubicSplineVec4Value = CubicSplineVec4Value;
var CubicSplineQuatValue = makeCubicSplineValueConstructor('cc.CubicSplineQuatValue', jsonAsset.Quat, jsonAsset.Quat.multiplyScalar, jsonAsset.Quat.scaleAndAdd);
jsonAsset.legacyCC.CubicSplineQuatValue = CubicSplineQuatValue;
var CubicSplineNumberValue = (_dec2$1 = jsonAsset.ccclass('cc.CubicSplineNumberValue'), _dec2$1(_class4$1 = (_class5$1 = (_temp2$1 = function () {
  function CubicSplineNumberValue(dataPoint, inTangent, outTangent) {
    jsonAsset._initializerDefineProperty(this, "dataPoint", _descriptor4, this);

    jsonAsset._initializerDefineProperty(this, "inTangent", _descriptor5, this);

    jsonAsset._initializerDefineProperty(this, "outTangent", _descriptor6, this);

    this.dataPoint = dataPoint;
    this.inTangent = inTangent;
    this.outTangent = outTangent;
  }

  var _proto2 = CubicSplineNumberValue.prototype;

  _proto2.lerp = function lerp(to, t, dt) {
    var p0 = this.dataPoint;
    var p1 = to.dataPoint;
    var m0 = this.outTangent * dt;
    var m1 = to.inTangent * dt;
    var t_3 = t * t * t;
    var t_2 = t * t;
    var f_0 = 2 * t_3 - 3 * t_2 + 1;
    var f_1 = t_3 - 2 * t_2 + t;
    var f_2 = -2 * t_3 + 3 * t_2;
    var f_3 = t_3 - t_2;
    return p0 * f_0 + m0 * f_1 + p1 * f_2 + m1 * f_3;
  };

  _proto2.getNoLerp = function getNoLerp() {
    return this.dataPoint;
  };

  return CubicSplineNumberValue;
}(), _temp2$1), (_descriptor4 = jsonAsset._applyDecoratedDescriptor(_class5$1.prototype, "dataPoint", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5 = jsonAsset._applyDecoratedDescriptor(_class5$1.prototype, "inTangent", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class5$1.prototype, "outTangent", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class5$1)) || _class4$1);
jsonAsset.legacyCC.CubicSplineNumberValue = CubicSplineNumberValue;

var CLASS_NAME_PREFIX_ANIM = 'cc.animation.';
var createEvalSymbol = Symbol('CreateEval');

var _dec$1, _class$1, _class2$1, _descriptor$1, _temp$1, _dec2$2, _class4$2, _class5$2, _descriptor2$1, _temp2$2, _dec3, _class7, _class8, _descriptor3, _temp3, _dec4, _class10, _class11, _descriptor4$1, _temp4, _dec5, _class13, _class14, _descriptor5$1, _descriptor6$1, _temp5;
var normalizedFollowTag = Symbol('NormalizedFollow');
var parseTrsPathTag = Symbol('ConvertAsTrsPath');
var trackBindingTag = Symbol('TrackBinding');
var Track = (_dec$1 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "Track"), _dec$1(_class$1 = (_class2$1 = (_temp$1 = function () {
  function Track() {
    jsonAsset._initializerDefineProperty(this, "_binding", _descriptor$1, this);
  }

  var _proto = Track.prototype;

  _proto.channels = function channels() {
    return [];
  };

  _proto.range = function range() {
    var range = {
      min: Infinity,
      max: -Infinity
    };

    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this.channels()), _step; !(_step = _iterator()).done;) {
      var channel = _step.value;
      range.min = Math.min(range.min, channel.curve.rangeMin);
      range.max = Math.max(range.max, channel.curve.rangeMax);
    }

    return range;
  };

  _proto[createEvalSymbol] = function (runtimeBinding) {
    throw new Error("No Impl");
  };

  jsonAsset._createClass(Track, [{
    key: "path",
    get: function get() {
      return this._binding.path;
    },
    set: function set(value) {
      this._binding.path = value;
    }
  }, {
    key: "proxy",
    get: function get() {
      return this._binding.proxy;
    },
    set: function set(value) {
      this._binding.proxy = value;
    }
  }, {
    key: trackBindingTag,
    get: function get() {
      return this._binding;
    }
  }]);

  return Track;
}(), _temp$1), (_descriptor$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_binding", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new TrackBinding();
  }
})), _class2$1)) || _class$1);
var Channel = (_dec2$2 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "Channel"), _dec2$2(_class4$2 = (_class5$2 = (_temp2$2 = function () {
  function Channel(curve) {
    this.name = '';

    jsonAsset._initializerDefineProperty(this, "_curve", _descriptor2$1, this);

    this._curve = curve;
  }

  jsonAsset._createClass(Channel, [{
    key: "curve",
    get: function get() {
      return this._curve;
    }
  }]);

  return Channel;
}(), _temp2$2), (_descriptor2$1 = jsonAsset._applyDecoratedDescriptor(_class5$2.prototype, "_curve", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5$2)) || _class4$2);
var SingleChannelTrack = (_dec3 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "SingleChannelTrack"), _dec3(_class7 = (_class8 = (_temp3 = function (_Track) {
  jsonAsset._inheritsLoose(SingleChannelTrack, _Track);

  function SingleChannelTrack() {
    var _this;

    _this = _Track.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_channel", _descriptor3, jsonAsset._assertThisInitialized(_this));

    _this._channel = new Channel(_this.createCurve());
    return _this;
  }

  var _proto2 = SingleChannelTrack.prototype;

  _proto2.channels = function channels() {
    return [this._channel];
  };

  _proto2.createCurve = function createCurve() {
    throw new Error("Not impl");
  };

  _proto2[createEvalSymbol] = function (_runtimeBinding) {
    var curve = this._channel.curve;
    return new SingleChannelTrackEval(curve);
  };

  jsonAsset._createClass(SingleChannelTrack, [{
    key: "channel",
    get: function get() {
      return this._channel;
    }
  }]);

  return SingleChannelTrack;
}(Track), _temp3), (_descriptor3 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "_channel", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class8)) || _class7);

var SingleChannelTrackEval = function () {
  function SingleChannelTrackEval(_curve) {
    this._curve = _curve;
  }

  var _proto3 = SingleChannelTrackEval.prototype;

  _proto3.evaluate = function evaluate(time) {
    return this._curve.evaluate(time);
  };

  return SingleChannelTrackEval;
}();

var TrackPath = (_dec4 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "TrackPath"), _dec4(_class10 = (_class11 = (_temp4 = function () {
  function TrackPath() {
    jsonAsset._initializerDefineProperty(this, "_paths", _descriptor4$1, this);
  }

  var _proto4 = TrackPath.prototype;

  _proto4.toProperty = function toProperty(name) {
    this._paths.push(name);

    return this;
  };

  _proto4.toElement = function toElement(index) {
    this._paths.push(index);

    return this;
  };

  _proto4.toHierarchy = function toHierarchy(nodePath) {
    this._paths.push(new HierarchyPath(nodePath));

    return this;
  };

  _proto4.toComponent = function toComponent(constructor) {
    var path = new ComponentPath(typeof constructor === 'string' ? constructor : jsonAsset.js$1.getClassName(constructor));

    this._paths.push(path);

    return this;
  };

  _proto4.toCustomized = function toCustomized(resolver) {
    this._paths.push(resolver);

    return this;
  };

  _proto4.append = function append() {
    var _this$_paths;

    for (var _len = arguments.length, trackPaths = new Array(_len), _key = 0; _key < _len; _key++) {
      trackPaths[_key] = arguments[_key];
    }

    var paths = (_this$_paths = this._paths).concat.apply(_this$_paths, trackPaths.map(function (trackPath) {
      return trackPath._paths;
    }));

    this._paths = paths;
    return this;
  };

  _proto4.isPropertyAt = function isPropertyAt(index) {
    return typeof this._paths[index] === 'string';
  };

  _proto4.parsePropertyAt = function parsePropertyAt(index) {
    return this._paths[index];
  };

  _proto4.isElementAt = function isElementAt(index) {
    return typeof this._paths[index] === 'number';
  };

  _proto4.parseElementAt = function parseElementAt(index) {
    return this._paths[index];
  };

  _proto4.isHierarchyAt = function isHierarchyAt(index) {
    return this._paths[index] instanceof HierarchyPath;
  };

  _proto4.parseHierarchyAt = function parseHierarchyAt(index) {
    jsonAsset.assertIsTrue(this.isHierarchyAt(index));
    return this._paths[index].path;
  };

  _proto4.isComponentAt = function isComponentAt(index) {
    return this._paths[index] instanceof ComponentPath;
  };

  _proto4.parseComponentAt = function parseComponentAt(index) {
    jsonAsset.assertIsTrue(this.isComponentAt(index));
    return this._paths[index].component;
  };

  _proto4.slice = function slice(beginIndex, endIndex) {
    var trackPath = new TrackPath();
    trackPath._paths = this._paths.slice(beginIndex, endIndex);
    return trackPath;
  };

  _proto4.trace = function trace(object, beginIndex, endIndex) {
    var _beginIndex, _endIndex;

    (_beginIndex = beginIndex) !== null && _beginIndex !== void 0 ? _beginIndex : beginIndex = 0;
    (_endIndex = endIndex) !== null && _endIndex !== void 0 ? _endIndex : endIndex = this._paths.length;
    return this[normalizedFollowTag](object, beginIndex, endIndex);
  };

  _proto4[parseTrsPathTag] = function () {
    var paths = this._paths;
    var nPaths = paths.length;
    var iPath = 0;
    var nodePath = '';

    for (; iPath < nPaths; ++iPath) {
      var path = paths[iPath];

      if (!(path instanceof HierarchyPath)) {
        break;
      } else if (!path.path) {
        continue;
      } else if (nodePath) {
        nodePath += "/" + path.path;
      } else {
        nodePath = path.path;
      }
    }

    if (iPath === nPaths) {
      return null;
    }

    var prs;

    if (iPath !== nPaths - 1) {
      return null;
    }

    switch (paths[iPath]) {
      case 'position':
      case 'scale':
      case 'rotation':
      case 'eulerAngles':
        prs = paths[iPath];
        break;

      default:
        return null;
    }

    return {
      node: nodePath,
      property: prs
    };
  };

  _proto4[normalizedFollowTag] = function (root, beginIndex, endIndex) {
    var paths = this._paths;
    var result = root;

    for (var iPath = beginIndex; iPath < endIndex; ++iPath) {
      var path = paths[iPath];

      if (isPropertyPath(path)) {
        if (!(path in result)) {
          jsonAsset.warnID(3929, path);
          return null;
        } else {
          result = result[path];
        }
      } else {
        result = path.get(result);
      }

      if (result === null) {
        break;
      }
    }

    return result;
  };

  jsonAsset._createClass(TrackPath, [{
    key: "length",
    get: function get() {
      return this._paths.length;
    }
  }]);

  return TrackPath;
}(), _temp4), (_descriptor4$1 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "_paths", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class11)) || _class10);
var TrackBinding = (_dec5 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "TrackBinding"), _dec5(_class13 = jsonAsset.uniquelyReferenced(_class13 = (_class14 = (_temp5 = function () {
  function TrackBinding() {
    jsonAsset._initializerDefineProperty(this, "path", _descriptor5$1, this);

    jsonAsset._initializerDefineProperty(this, "proxy", _descriptor6$1, this);
  }

  var _proto5 = TrackBinding.prototype;

  _proto5.parseTrsPath = function parseTrsPath() {
    if (this.proxy) {
      return null;
    } else {
      return this.path[parseTrsPathTag]();
    }
  };

  _proto5.createRuntimeBinding = function createRuntimeBinding(target, poseOutput, isConstant) {
    var path = this.path,
        proxy = this.proxy;
    var nPaths = path.length;
    var iLastPath = nPaths - 1;

    if (nPaths !== 0 && (path.isPropertyAt(iLastPath) || path.isElementAt(iLastPath)) && !proxy) {
      var lastPropertyKey = path.isPropertyAt(iLastPath) ? path.parsePropertyAt(iLastPath) : path.parseElementAt(iLastPath);
      var resultTarget = path[normalizedFollowTag](target, 0, nPaths - 1);

      if (resultTarget === null) {
        return null;
      }

      if (poseOutput && resultTarget instanceof jsonAsset.Node && isTrsPropertyName(lastPropertyKey)) {
        var blendStateWriter = poseOutput.createPoseWriter(resultTarget, lastPropertyKey, isConstant);
        return blendStateWriter;
      }

      return {
        setValue: function setValue(value) {
          resultTarget[lastPropertyKey] = value;
        },
        getValue: function getValue() {
          return resultTarget[lastPropertyKey];
        }
      };
    } else if (!proxy) {
      jsonAsset.errorID(3921);
      return null;
    } else {
      var _resultTarget = path[normalizedFollowTag](target, 0, nPaths);

      if (_resultTarget === null) {
        return null;
      }

      var runtimeProxy = proxy.forTarget(_resultTarget);
      var _binding = {
        setValue: function setValue(value) {
          runtimeProxy.set(value);
        }
      };
      var proxyGet = runtimeProxy.get;

      if (proxyGet) {
        _binding.getValue = function () {
          return proxyGet.call(runtimeProxy);
        };
      }

      return _binding;
    }
  };

  return TrackBinding;
}(), _temp5), (_descriptor5$1 = jsonAsset._applyDecoratedDescriptor(_class14.prototype, "path", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new TrackPath();
  }
}), _descriptor6$1 = jsonAsset._applyDecoratedDescriptor(_class14.prototype, "proxy", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class14)) || _class13) || _class13);

function isTrsPropertyName(name) {
  return name === 'position' || name === 'rotation' || name === 'scale' || name === 'eulerAngles';
}

var _dec$2, _class$2;
var RealTrack = (_dec$2 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "RealTrack"), _dec$2(_class$2 = function (_SingleChannelTrack) {
  jsonAsset._inheritsLoose(RealTrack, _SingleChannelTrack);

  function RealTrack() {
    return _SingleChannelTrack.apply(this, arguments) || this;
  }

  var _proto = RealTrack.prototype;

  _proto.createCurve = function createCurve() {
    return new jsonAsset.RealCurve();
  };

  return RealTrack;
}(SingleChannelTrack)) || _class$2);

function maskIfEmpty(curve) {
  return curve.keyFramesCount === 0 ? undefined : curve;
}

var _dec$3, _class$3, _class2$2, _descriptor$2, _descriptor2$2, _temp$2;
var CHANNEL_NAMES = ['X', 'Y', 'Z', 'W'];
var VectorTrack = (_dec$3 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "VectorTrack"), _dec$3(_class$3 = (_class2$2 = (_temp$2 = function (_Track) {
  jsonAsset._inheritsLoose(VectorTrack, _Track);

  function VectorTrack() {
    var _this;

    _this = _Track.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_channels", _descriptor$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_nComponents", _descriptor2$2, jsonAsset._assertThisInitialized(_this));

    _this._channels = new Array(4);

    for (var i = 0; i < _this._channels.length; ++i) {
      var channel = new Channel(new jsonAsset.RealCurve());
      channel.name = CHANNEL_NAMES[i];
      _this._channels[i] = channel;
    }

    return _this;
  }

  var _proto = VectorTrack.prototype;

  _proto.channels = function channels() {
    return this._channels;
  };

  _proto[createEvalSymbol] = function () {
    switch (this._nComponents) {
      default:
      case 2:
        return new Vec2TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve));

      case 3:
        return new Vec3TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve), maskIfEmpty(this._channels[2].curve));

      case 4:
        return new Vec4TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve), maskIfEmpty(this._channels[2].curve), maskIfEmpty(this._channels[3].curve));
    }
  };

  jsonAsset._createClass(VectorTrack, [{
    key: "componentsCount",
    get: function get() {
      return this._nComponents;
    },
    set: function set(value) {
      this._nComponents = value;
    }
  }]);

  return VectorTrack;
}(Track), _temp$2), (_descriptor$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_channels", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_nComponents", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 4;
  }
})), _class2$2)) || _class$3);
var Vec2TrackEval = function () {
  function Vec2TrackEval(_x, _y) {
    this._result = new jsonAsset.Vec2();
    this._x = _x;
    this._y = _y;
  }

  var _proto2 = Vec2TrackEval.prototype;

  _proto2.evaluate = function evaluate(time, runtimeBinding) {
    if ((!this._x || !this._y) && runtimeBinding.getValue) {
      jsonAsset.Vec2.copy(this._result, runtimeBinding.getValue());
    }

    if (this._x) {
      this._result.x = this._x.evaluate(time);
    }

    if (this._y) {
      this._result.y = this._y.evaluate(time);
    }

    return this._result;
  };

  return Vec2TrackEval;
}();
var Vec3TrackEval = function () {
  function Vec3TrackEval(_x, _y, _z) {
    this._result = new jsonAsset.Vec3();
    this._x = _x;
    this._y = _y;
    this._z = _z;
  }

  var _proto3 = Vec3TrackEval.prototype;

  _proto3.evaluate = function evaluate(time, runtimeBinding) {
    if ((!this._x || !this._y || !this._z) && runtimeBinding.getValue) {
      jsonAsset.Vec3.copy(this._result, runtimeBinding.getValue());
    }

    if (this._x) {
      this._result.x = this._x.evaluate(time);
    }

    if (this._y) {
      this._result.y = this._y.evaluate(time);
    }

    if (this._z) {
      this._result.z = this._z.evaluate(time);
    }

    return this._result;
  };

  return Vec3TrackEval;
}();
var Vec4TrackEval = function () {
  function Vec4TrackEval(_x, _y, _z, _w) {
    this._result = new jsonAsset.Vec4();
    this._x = _x;
    this._y = _y;
    this._z = _z;
    this._w = _w;
  }

  var _proto4 = Vec4TrackEval.prototype;

  _proto4.evaluate = function evaluate(time, runtimeBinding) {
    if ((!this._x || !this._y || !this._z || !this._w) && runtimeBinding.getValue) {
      jsonAsset.Vec4.copy(this._result, runtimeBinding.getValue());
    }

    if (this._x) {
      this._result.x = this._x.evaluate(time);
    }

    if (this._y) {
      this._result.y = this._y.evaluate(time);
    }

    if (this._z) {
      this._result.z = this._z.evaluate(time);
    }

    if (this._w) {
      this._result.w = this._w.evaluate(time);
    }

    return this._result;
  };

  return Vec4TrackEval;
}();

var _dec$4, _class$4;
var QuatTrack = (_dec$4 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "QuatTrack"), _dec$4(_class$4 = function (_SingleChannelTrack) {
  jsonAsset._inheritsLoose(QuatTrack, _SingleChannelTrack);

  function QuatTrack() {
    return _SingleChannelTrack.apply(this, arguments) || this;
  }

  var _proto = QuatTrack.prototype;

  _proto.createCurve = function createCurve() {
    return new jsonAsset.QuatCurve();
  };

  _proto[createEvalSymbol] = function () {
    return new QuatTrackEval(this.channels()[0].curve);
  };

  return QuatTrack;
}(SingleChannelTrack)) || _class$4);
var QuatTrackEval = function () {
  function QuatTrackEval(_curve) {
    this._result = new jsonAsset.Quat();
    this._curve = _curve;
  }

  var _proto2 = QuatTrackEval.prototype;

  _proto2.evaluate = function evaluate(time) {
    this._curve.evaluate(time, this._result);

    return this._result;
  };

  return QuatTrackEval;
}();

var _dec$5, _class$5, _class2$3, _descriptor$3, _temp$3;
var CHANNEL_NAMES$1 = ['Red', 'Green', 'Blue', 'Alpha'];
var ColorTrack = (_dec$5 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "ColorTrack"), _dec$5(_class$5 = (_class2$3 = (_temp$3 = function (_Track) {
  jsonAsset._inheritsLoose(ColorTrack, _Track);

  function ColorTrack() {
    var _this;

    _this = _Track.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_channels", _descriptor$3, jsonAsset._assertThisInitialized(_this));

    _this._channels = new Array(4);

    for (var i = 0; i < _this._channels.length; ++i) {
      var channel = new Channel(new jsonAsset.RealCurve());
      channel.name = CHANNEL_NAMES$1[i];
      _this._channels[i] = channel;
    }

    return _this;
  }

  var _proto = ColorTrack.prototype;

  _proto.channels = function channels() {
    return this._channels;
  };

  _proto[createEvalSymbol] = function () {
    return new ColorTrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve), maskIfEmpty(this._channels[2].curve), maskIfEmpty(this._channels[3].curve));
  };

  return ColorTrack;
}(Track), _temp$3), (_descriptor$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_channels", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$3)) || _class$5);
var ColorTrackEval = function () {
  function ColorTrackEval(_x, _y, _z, _w) {
    this._result = new jsonAsset.Color$1();
    this._x = _x;
    this._y = _y;
    this._z = _z;
    this._w = _w;
  }

  var _proto2 = ColorTrackEval.prototype;

  _proto2.evaluate = function evaluate(time, runtimeBinding) {
    if ((!this._x || !this._y || !this._z || !this._w) && runtimeBinding.getValue) {
      jsonAsset.Color$1.copy(this._result, runtimeBinding.getValue());
    }

    if (this._x) {
      this._result.r = this._x.evaluate(time);
    }

    if (this._y) {
      this._result.g = this._y.evaluate(time);
    }

    if (this._z) {
      this._result.b = this._z.evaluate(time);
    }

    if (this._w) {
      this._result.a = this._w.evaluate(time);
    }

    return this._result;
  };

  return ColorTrackEval;
}();

var _dec$6, _class$6, _class2$4, _descriptor$4, _temp$4;
var CHANNEL_NAMES$2 = ['Width', 'Height'];
var SizeTrack = (_dec$6 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "SizeTrack"), _dec$6(_class$6 = (_class2$4 = (_temp$4 = function (_Track) {
  jsonAsset._inheritsLoose(SizeTrack, _Track);

  function SizeTrack() {
    var _this;

    _this = _Track.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_channels", _descriptor$4, jsonAsset._assertThisInitialized(_this));

    _this._channels = new Array(2);

    for (var i = 0; i < _this._channels.length; ++i) {
      var channel = new Channel(new jsonAsset.RealCurve());
      channel.name = CHANNEL_NAMES$2[i];
      _this._channels[i] = channel;
    }

    return _this;
  }

  var _proto = SizeTrack.prototype;

  _proto.channels = function channels() {
    return this._channels;
  };

  _proto[createEvalSymbol] = function () {
    return new SizeTrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve));
  };

  return SizeTrack;
}(Track), _temp$4), (_descriptor$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_channels", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$4)) || _class$6);
var SizeTrackEval = function () {
  function SizeTrackEval(_width, _height) {
    this._result = new jsonAsset.Size$1();
    this._width = _width;
    this._height = _height;
  }

  var _proto2 = SizeTrackEval.prototype;

  _proto2.evaluate = function evaluate(time, runtimeBinding) {
    if ((!this._width || !this._height) && runtimeBinding.getValue) {
      var size = runtimeBinding.getValue();
      this._result.x = size.x;
      this._result.y = size.y;
    }

    if (this._width) {
      this._result.width = this._width.evaluate(time);
    }

    if (this._height) {
      this._result.height = this._height.evaluate(time);
    }

    return this._result;
  };

  return SizeTrackEval;
}();

var _dec$7, _class$7;
var ObjectTrack = (_dec$7 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "ObjectTrack"), _dec$7(_class$7 = function (_SingleChannelTrack) {
  jsonAsset._inheritsLoose(ObjectTrack, _SingleChannelTrack);

  function ObjectTrack() {
    return _SingleChannelTrack.apply(this, arguments) || this;
  }

  var _proto = ObjectTrack.prototype;

  _proto.createCurve = function createCurve() {
    return new jsonAsset.ObjectCurve();
  };

  return ObjectTrack;
}(SingleChannelTrack)) || _class$7);

var BAKE_SKELETON_CURVE_SYMBOL = Symbol('BakeNodeCurves');

var SkelAnimDataHub = function () {
  function SkelAnimDataHub() {}

  SkelAnimDataHub.getOrExtract = function getOrExtract(clip) {
    var data = SkelAnimDataHub.pool.get(clip);

    if (!data || data.samples !== clip.sample) {
      if (data) {
        jsonAsset.legacyCC.director.root.dataPoolManager.releaseAnimationClip(clip);
      }

      var frames = Math.ceil(clip.sample * clip.duration) + 1;
      var step = clip.sample;
      data = clip[BAKE_SKELETON_CURVE_SYMBOL](0, step, frames);
      SkelAnimDataHub.pool.set(clip, data);
    }

    return data;
  };

  SkelAnimDataHub.destroy = function destroy(clip) {
    SkelAnimDataHub.pool["delete"](clip);
  };

  return SkelAnimDataHub;
}();
SkelAnimDataHub.pool = new Map();

function bezier(C1, C2, C3, C4, t) {
  var t1 = 1 - t;
  return t1 * (t1 * (C1 + (C2 * 3 - C1) * t) + C3 * 3 * t * t) + C4 * t * t * t;
}
jsonAsset.legacyCC.bezier = bezier;
var cos = Math.cos;
var acos = Math.acos;
var max = Math.max;
var pi = Math.PI;
var tau = 2 * pi;
var sqrt = Math.sqrt;

function crt(v) {
  if (v < 0) {
    return -Math.pow(-v, 1 / 3);
  } else {
    return Math.pow(v, 1 / 3);
  }
}

function cardano(curve, x) {
  var pa = x - 0;
  var pb = x - curve[0];
  var pc = x - curve[2];
  var pd = x - 1;
  var pa3 = pa * 3;
  var pb3 = pb * 3;
  var pc3 = pc * 3;
  var d = -pa + pb3 - pc3 + pd;
  var rd = 1 / d;
  var r3 = 1 / 3;
  var a = (pa3 - 6 * pb + pc3) * rd;
  var a3 = a * r3;
  var b = (-pa3 + pb3) * rd;
  var c = pa * rd;
  var p = (3 * b - a * a) * r3;
  var p3 = p * r3;
  var q = (2 * a * a * a - 9 * a * b + 27 * c) / 27;
  var q2 = q / 2;
  var discriminant = q2 * q2 + p3 * p3 * p3;
  var u1;
  var v1;
  var x1;
  var x2;
  var x3;

  if (discriminant < 0) {
    var mp3 = -p * r3;
    var mp33 = mp3 * mp3 * mp3;
    var r = sqrt(mp33);
    var t = -q / (2 * r);
    var cosphi = t < -1 ? -1 : t > 1 ? 1 : t;
    var phi = acos(cosphi);
    var crtr = crt(r);
    var t1 = 2 * crtr;
    x1 = t1 * cos(phi * r3) - a3;
    x2 = t1 * cos((phi + tau) * r3) - a3;
    x3 = t1 * cos((phi + 2 * tau) * r3) - a3;

    if (x1 >= 0 && x1 <= 1) {
      if (x2 >= 0 && x2 <= 1) {
        if (x3 >= 0 && x3 <= 1) {
          return max(x1, x2, x3);
        } else {
          return max(x1, x2);
        }
      } else if (x3 >= 0 && x3 <= 1) {
        return max(x1, x3);
      } else {
        return x1;
      }
    } else if (x2 >= 0 && x2 <= 1) {
      if (x3 >= 0 && x3 <= 1) {
        return max(x2, x3);
      } else {
        return x2;
      }
    } else {
      return x3;
    }
  } else if (discriminant === 0) {
    u1 = q2 < 0 ? crt(-q2) : -crt(q2);
    x1 = 2 * u1 - a3;
    x2 = -u1 - a3;

    if (x1 >= 0 && x1 <= 1) {
      if (x2 >= 0 && x2 <= 1) {
        return max(x1, x2);
      } else {
        return x1;
      }
    } else {
      return x2;
    }
  } else {
      var sd = sqrt(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      x1 = u1 - v1 - a3;
      return x1;
    }
}

function bezierByTime(controlPoints, x) {
  var percent = cardano(controlPoints, x);
  var p1y = controlPoints[1];
  var p2y = controlPoints[3];
  return ((1 - percent) * (p1y + (p2y - p1y) * percent) * 3 + percent * percent) * percent;
}
jsonAsset.legacyCC.bezierByTime = bezierByTime;

var RatioSampler = function () {
  function RatioSampler(ratios) {
    this.ratios = void 0;
    this._findRatio = void 0;
    this.ratios = ratios;
    var currRatioDif;
    var lastRatioDif;
    var canOptimize = true;
    var EPSILON = 1e-6;

    for (var i = 1, l = ratios.length; i < l; i++) {
      currRatioDif = ratios[i] - ratios[i - 1];

      if (i === 1) {
        lastRatioDif = currRatioDif;
      } else if (Math.abs(currRatioDif - lastRatioDif) > EPSILON) {
        canOptimize = false;
        break;
      }
    }

    this._findRatio = canOptimize ? quickFindIndex : jsonAsset.binarySearchEpsilon;
  }

  var _proto = RatioSampler.prototype;

  _proto.sample = function sample(ratio) {
    return this._findRatio(this.ratios, ratio);
  };

  return RatioSampler;
}();
jsonAsset.legacyCC.RatioSampler = RatioSampler;
var AnimCurve = function () {
  AnimCurve.Bezier = function Bezier(controlPoints) {
    return controlPoints;
  };

  function AnimCurve(propertyCurveData, duration) {
    this.types = undefined;
    this.type = null;
    this._values = [];
    this._lerp = undefined;
    this._duration = void 0;
    this._array = void 0;
    this._duration = duration;
    this._values = propertyCurveData.values;

    var getCurveType = function getCurveType(easingMethod) {
      if (typeof easingMethod === 'string') {
        return easingMethod;
      } else if (Array.isArray(easingMethod)) {
        if (easingMethod[0] === easingMethod[1] && easingMethod[2] === easingMethod[3]) {
          return AnimCurve.Linear;
        } else {
          return AnimCurve.Bezier(easingMethod);
        }
      } else {
        return AnimCurve.Linear;
      }
    };

    if (propertyCurveData.easingMethod !== undefined) {
      this.type = getCurveType(propertyCurveData.easingMethod);
    } else if (Array.isArray(propertyCurveData.easingMethods)) {
      this.types = propertyCurveData.easingMethods.map(getCurveType);
    } else if (propertyCurveData.easingMethods !== undefined) {
      this.types = new Array(this._values.length).fill(null);

      for (var _i = 0, _Object$keys = Object.keys(propertyCurveData.easingMethods); _i < _Object$keys.length; _i++) {
        var index = _Object$keys[_i];
        this.types[index] = getCurveType(propertyCurveData.easingMethods[index]);
      }
    } else {
      this.type = null;
    }

    var firstValue = propertyCurveData.values[0];
    var interpolate = propertyCurveData.interpolate === undefined ? true : propertyCurveData.interpolate;

    if (interpolate) {
      this._lerp = selectLerpFx(firstValue);
    }

    if (propertyCurveData._arrayLength !== undefined) {
      this._array = new Array(propertyCurveData._arrayLength);
    }
  }

  var _proto2 = AnimCurve.prototype;

  _proto2.hasLerp = function hasLerp() {
    return !!this._lerp;
  };

  _proto2.valueAt = function valueAt(index) {
    if (this._array === undefined) {
      var value = this._values[index];

      if (value && value.getNoLerp) {
        return value.getNoLerp();
      } else {
        return value;
      }
    } else {
      for (var i = 0; i < this._array.length; ++i) {
        this._array[i] = this._values[this._array.length * index + i];
      }

      return this._array;
    }
  };

  _proto2.valueBetween = function valueBetween(ratio, from, fromRatio, to, toRatio) {
    if (this._lerp) {
      var type = this.types ? this.types[from] : this.type;
      var dRatio = toRatio - fromRatio;
      var ratioBetweenFrames = (ratio - fromRatio) / dRatio;

      if (type) {
        ratioBetweenFrames = computeRatioByType(ratioBetweenFrames, type);
      }

      if (this._array === undefined) {
        var fromVal = this._values[from];
        var toVal = this._values[to];

        var value = this._lerp(fromVal, toVal, ratioBetweenFrames, dRatio * this._duration);

        return value;
      } else {
        for (var i = 0; i < this._array.length; ++i) {
          var _fromVal = this._values[this._array.length * from + i];
          var _toVal = this._values[this._array.length * to + i];
          this._array[i] = this._lerp(_fromVal, _toVal, ratioBetweenFrames, dRatio * this._duration);
        }

        return this._array;
      }
    } else if (this._array === undefined) {
      return this.valueAt(from);
    } else {
      for (var _i2 = 0; _i2 < this._array.length; ++_i2) {
        this._array[_i2] = this._values[this._array.length * from + _i2];
      }

      return this._array;
    }
  };

  _proto2.empty = function empty() {
    return this._values.length === 0;
  };

  _proto2.constant = function constant() {
    return this._values.length === 1;
  };

  return AnimCurve;
}();
AnimCurve.Linear = null;
jsonAsset.legacyCC.AnimCurve = AnimCurve;
var EventInfo = function () {
  function EventInfo() {
    this.events = [];
  }

  var _proto3 = EventInfo.prototype;

  _proto3.add = function add(func, params) {
    this.events.push({
      func: func || '',
      params: params || []
    });
  };

  return EventInfo;
}();
function sampleAnimationCurve(curve, sampler, ratio) {
  var index = sampler.sample(ratio);

  if (index < 0) {
    index = ~index;

    if (index <= 0) {
      index = 0;
    } else if (index >= sampler.ratios.length) {
      index = sampler.ratios.length - 1;
    } else {
      return curve.valueBetween(ratio, index - 1, sampler.ratios[index - 1], index, sampler.ratios[index]);
    }
  }

  return curve.valueAt(index);
}
jsonAsset.legacyCC.sampleAnimationCurve = sampleAnimationCurve;
function computeRatioByType(ratio, type) {
  if (typeof type === 'string') {
    var func = jsonAsset.easing[type];

    if (func) {
      ratio = func(ratio);
    } else {
      jsonAsset.errorID(3906, type);
    }
  } else if (Array.isArray(type)) {
    ratio = bezierByTime(type, ratio);
  }

  return ratio;
}

function quickFindIndex(ratios, ratio) {
  var length = ratios.length - 1;

  if (length === 0) {
    return 0;
  }

  var start = ratios[0];

  if (ratio < start) {
    return 0;
  }

  var end = ratios[length];

  if (ratio > end) {
    return length;
  }

  ratio = (ratio - start) / (end - start);
  var eachLength = 1 / length;
  var index = ratio / eachLength;
  var floorIndex = index | 0;
  var EPSILON = 1e-6;

  if (index - floorIndex < EPSILON) {
    return floorIndex;
  } else if (floorIndex + 1 - index < EPSILON) {
    return floorIndex + 1;
  }

  return ~(floorIndex + 1);
}

var selectLerpFx = function () {
  function makeValueTypeLerpFx(constructor) {
    var tempValue = new constructor();
    return function (from, to, ratio) {
      constructor.lerp(tempValue, from, to, ratio);
      return tempValue;
    };
  }

  function callLerpable(from, to, t, dt) {
    return from.lerp(to, t, dt);
  }

  function makeQuatSlerpFx() {
    var tempValue = new jsonAsset.Quat();
    return function (from, to, t, dt) {
      return jsonAsset.Quat.slerp(tempValue, from, to, t);
    };
  }

  return function (value) {
    if (value === null) {
      return undefined;
    }

    if (typeof value === 'number') {
      return jsonAsset.lerp;
    } else if (typeof value === 'object' && value.constructor) {
      if (value instanceof jsonAsset.Quat) {
        return makeQuatSlerpFx();
      } else if (value instanceof jsonAsset.ValueType) {
        return makeValueTypeLerpFx(value.constructor);
      } else if (value.constructor === Number) {
        return jsonAsset.lerp;
      } else if (jsonAsset.isLerpable(value)) {
        return callLerpable;
      }
    }

    return undefined;
  };
}();

var _dec$8, _class$8, _class2$5, _descriptor$5, _temp$5, _dec2$3, _class4$3, _class5$3, _descriptor2$3, _temp2$3;
var UntypedTrackChannel = (_dec$8 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "UntypedTrackChannel"), _dec$8(_class$8 = (_class2$5 = (_temp$5 = function (_Channel) {
  jsonAsset._inheritsLoose(UntypedTrackChannel, _Channel);

  function UntypedTrackChannel() {
    var _this;

    _this = _Channel.call(this, new jsonAsset.RealCurve()) || this;

    jsonAsset._initializerDefineProperty(_this, "property", _descriptor$5, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return UntypedTrackChannel;
}(Channel), _temp$5), (_descriptor$5 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "property", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2$5)) || _class$8);
var UntypedTrack = (_dec2$3 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "UntypedTrack"), _dec2$3(_class4$3 = (_class5$3 = (_temp2$3 = function (_Track) {
  jsonAsset._inheritsLoose(UntypedTrack, _Track);

  function UntypedTrack() {
    var _this2;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _Track.call.apply(_Track, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this2, "_channels", _descriptor2$3, jsonAsset._assertThisInitialized(_this2));

    return _this2;
  }

  var _proto = UntypedTrack.prototype;

  _proto.channels = function channels() {
    return this._channels;
  };

  _proto[createEvalSymbol] = function (runtimeBinding) {
    var _this3 = this;

    if (!runtimeBinding.getValue) {
      throw new Error(jsonAsset.getError(3930));
    }

    var trySearchCurve = function trySearchCurve(property) {
      var _this3$_channels$find;

      return (_this3$_channels$find = _this3._channels.find(function (channel) {
        return channel.property === property;
      })) === null || _this3$_channels$find === void 0 ? void 0 : _this3$_channels$find.curve;
    };

    var value = runtimeBinding.getValue();

    switch (true) {
      default:
        throw new Error(jsonAsset.getError(3931));

      case value instanceof jsonAsset.Vec2:
        return new Vec2TrackEval(trySearchCurve('x'), trySearchCurve('y'));

      case value instanceof jsonAsset.Vec3:
        return new Vec3TrackEval(trySearchCurve('x'), trySearchCurve('y'), trySearchCurve('z'));

      case value instanceof jsonAsset.Vec4:
        return new Vec4TrackEval(trySearchCurve('x'), trySearchCurve('y'), trySearchCurve('z'), trySearchCurve('w'));

      case value instanceof jsonAsset.Color$1:
        return new ColorTrackEval(trySearchCurve('r'), trySearchCurve('g'), trySearchCurve('b'), trySearchCurve('a'));

      case value instanceof jsonAsset.Size$1:
        return new SizeTrackEval(trySearchCurve('width'), trySearchCurve('height'));
    }
  };

  _proto.addChannel = function addChannel(property) {
    var channel = new UntypedTrackChannel();
    channel.property = property;

    this._channels.push(channel);

    return channel;
  };

  _proto.upgrade = function upgrade(refine) {
    var _this4 = this;

    var trySearchChannel = function trySearchChannel(property, outChannel) {
      var untypedChannel = _this4.channels().find(function (channel) {
        return channel.property === property;
      });

      if (untypedChannel) {
        outChannel.name = untypedChannel.name;
        outChannel.curve.assignSorted(Array.from(untypedChannel.curve.times()), Array.from(untypedChannel.curve.values()));
      }
    };

    var kind = refine(this.path, this.proxy);

    switch (kind) {
      default:
        break;

      case 'vec2':
      case 'vec3':
      case 'vec4':
        {
          var track = new VectorTrack();
          track.path = this.path;
          track.proxy = this.proxy;
          track.componentsCount = kind === 'vec2' ? 2 : kind === 'vec3' ? 3 : 4;

          var _track$channels = track.channels(),
              x = _track$channels[0],
              y = _track$channels[1],
              z = _track$channels[2],
              w = _track$channels[3];

          switch (kind) {
            case 'vec4':
              trySearchChannel('w', w);

            case 'vec3':
              trySearchChannel('z', z);

            default:
            case 'vec2':
              trySearchChannel('x', x);
              trySearchChannel('y', y);
          }

          return track;
        }

      case 'color':
        {
          var _track = new ColorTrack();

          var _track$channels2 = _track.channels(),
              r = _track$channels2[0],
              g = _track$channels2[1],
              b = _track$channels2[2],
              a = _track$channels2[3];

          trySearchChannel('r', r);
          trySearchChannel('g', g);
          trySearchChannel('b', b);
          trySearchChannel('a', a);
          trySearchChannel('x', r);
          trySearchChannel('y', g);
          trySearchChannel('z', b);
          trySearchChannel('w', a);
          return _track;
        }

      case 'size':
        break;
    }

    return null;
  };

  return UntypedTrack;
}(Track), _temp2$3), (_descriptor2$3 = jsonAsset._applyDecoratedDescriptor(_class5$3.prototype, "_channels", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class5$3)) || _class4$3);

var AnimationClipLegacyData = function () {
  function AnimationClipLegacyData(duration) {
    this._keys = [];
    this._curves = [];
    this._commonTargets = [];
    this._ratioSamplers = [];
    this._runtimeCurves = void 0;
    this._data = null;
    this._duration = void 0;
    this._duration = duration;
  }

  var _proto = AnimationClipLegacyData.prototype;

  _proto.getPropertyCurves = function getPropertyCurves() {
    if (!this._runtimeCurves) {
      this._createPropertyCurves();
    }

    return this._runtimeCurves;
  };

  _proto.toTracks = function toTracks() {
    var newTracks = [];
    var legacyKeys = this.keys,
        legacyCurves = this.curves,
        legacyCommonTargets = this.commonTargets;

    var convertTrackPath = function convertTrackPath(track, modifiers, valueAdapter) {
      var trackPath = new TrackPath();

      for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(modifiers), _step; !(_step = _iterator()).done;) {
        var modifier = _step.value;

        if (typeof modifier === 'string') {
          trackPath.toProperty(modifier);
        } else if (typeof modifier === 'number') {
          trackPath.toElement(modifier);
        } else if (modifier instanceof HierarchyPath) {
          trackPath.toHierarchy(modifier.path);
        } else if (modifier instanceof ComponentPath) {
          trackPath.toComponent(modifier.component);
        } else {
          trackPath.toCustomized(modifier);
        }
      }

      track.path = trackPath;
      track.proxy = valueAdapter;
    };

    var untypedTracks = legacyCommonTargets.map(function (legacyCommonTarget) {
      var track = new UntypedTrack();
      convertTrackPath(track, legacyCommonTarget.modifiers, legacyCommonTarget.valueAdapter);
      newTracks.push(track);
      return track;
    });

    var _loop = function _loop() {
      var _legacyCurveData$inte;

      var legacyCurve = _step2.value;
      var legacyCurveData = legacyCurve.data;
      var legacyValues = legacyCurveData.values;

      if (legacyValues.length === 0) {
        return "continue";
      }

      var legacyKeysIndex = legacyCurveData.keys;
      var times = legacyKeysIndex < 0 ? [0.0] : legacyKeys[legacyCurveData.keys];
      var firstValue = legacyValues[0];
      var interpolate = (_legacyCurveData$inte = legacyCurveData.interpolate) !== null && _legacyCurveData$inte !== void 0 ? _legacyCurveData$inte : true;
      jsonAsset.assertIsTrue(typeof legacyCurveData._arrayLength !== 'number' || typeof firstValue === 'number');
      var legacyEasingMethodConverter = new LegacyEasingMethodConverter(legacyCurveData, times.length);

      var installPathAndSetter = function installPathAndSetter(track) {
        convertTrackPath(track, legacyCurve.modifiers, legacyCurve.valueAdapter);
      };

      var legacyCommonTargetCurve = void 0;

      if (typeof legacyCurve.commonTarget === 'number') {
        if (!legacyValues.every(function (value) {
          return typeof value === 'number';
        })) {
          jsonAsset.warnID(3932);
          return "continue";
        }

        if (legacyCurve.valueAdapter || legacyCurve.modifiers.length !== 1 || typeof legacyCurve.modifiers[0] !== 'string') {
          jsonAsset.warnID(3933);
          return "continue";
        }

        var _propertyName = legacyCurve.modifiers[0];
        var untypedTrack = untypedTracks[legacyCurve.commonTarget];

        var _untypedTrack$addChan = untypedTrack.addChannel(_propertyName),
            curve = _untypedTrack$addChan.curve;

        legacyCommonTargetCurve = curve;
      }

      var convertCurve = function convertCurve() {
        if (typeof firstValue === 'number') {
          if (!legacyValues.every(function (value) {
            return typeof value === 'number';
          })) {
            jsonAsset.warnID(3934);
            return;
          }

          var realCurve;

          if (legacyCommonTargetCurve) {
            realCurve = legacyCommonTargetCurve;
          } else {
            var track = new RealTrack();
            installPathAndSetter(track);
            newTracks.push(track);
            realCurve = track.channel.curve;
          }

          var interpolationMethod = interpolate ? jsonAsset.RealInterpolationMode.LINEAR : jsonAsset.RealInterpolationMode.CONSTANT;
          realCurve.assignSorted(times, legacyValues.map(function (value) {
            return {
              value: value,
              interpolationMode: interpolationMethod
            };
          }));
          legacyEasingMethodConverter.convert(realCurve);
          return;
        } else if (typeof firstValue === 'object') {
          switch (true) {
            default:
              break;

            case everyInstanceOf(legacyValues, jsonAsset.Vec2):
            case everyInstanceOf(legacyValues, jsonAsset.Vec3):
            case everyInstanceOf(legacyValues, jsonAsset.Vec4):
              {
                var components = firstValue instanceof jsonAsset.Vec2 ? 2 : firstValue instanceof jsonAsset.Vec3 ? 3 : 4;

                var _track = new VectorTrack();

                installPathAndSetter(_track);
                _track.componentsCount = components;

                var _track$channels = _track.channels(),
                    x = _track$channels[0].curve,
                    y = _track$channels[1].curve,
                    z = _track$channels[2].curve,
                    w = _track$channels[3].curve;

                var interpolationMode = interpolate ? jsonAsset.RealInterpolationMode.LINEAR : jsonAsset.RealInterpolationMode.CONSTANT;

                var valueToFrame = function valueToFrame(value) {
                  return {
                    value: value,
                    interpolationMode: interpolationMode
                  };
                };

                switch (components) {
                  case 4:
                    w.assignSorted(times, legacyValues.map(function (value) {
                      return valueToFrame(value.w);
                    }));
                    legacyEasingMethodConverter.convert(w);

                  case 3:
                    z.assignSorted(times, legacyValues.map(function (value) {
                      return valueToFrame(value.z);
                    }));
                    legacyEasingMethodConverter.convert(z);

                  default:
                    x.assignSorted(times, legacyValues.map(function (value) {
                      return valueToFrame(value.x);
                    }));
                    legacyEasingMethodConverter.convert(x);
                    y.assignSorted(times, legacyValues.map(function (value) {
                      return valueToFrame(value.y);
                    }));
                    legacyEasingMethodConverter.convert(y);
                    break;
                }

                newTracks.push(_track);
                return;
              }

            case everyInstanceOf(legacyValues, jsonAsset.Quat):
              {

                var _track2 = new QuatTrack();

                installPathAndSetter(_track2);

                var _interpolationMode = interpolate ? jsonAsset.QuatInterpolationMode.SLERP : jsonAsset.QuatInterpolationMode.CONSTANT;

                _track2.channel.curve.assignSorted(times, legacyValues.map(function (value) {
                  return {
                    value: jsonAsset.Quat.clone(value),
                    interpolationMode: _interpolationMode
                  };
                }));

                newTracks.push(_track2);
                return;
              }

            case everyInstanceOf(legacyValues, jsonAsset.Color$1):
              {
                var _track3 = new ColorTrack();

                installPathAndSetter(_track3);

                var _track3$channels = _track3.channels(),
                    r = _track3$channels[0].curve,
                    g = _track3$channels[1].curve,
                    b = _track3$channels[2].curve,
                    a = _track3$channels[3].curve;

                var _interpolationMode2 = interpolate ? jsonAsset.RealInterpolationMode.LINEAR : jsonAsset.RealInterpolationMode.CONSTANT;

                var _valueToFrame = function _valueToFrame(value) {
                  return {
                    value: value,
                    interpolationMode: _interpolationMode2
                  };
                };

                r.assignSorted(times, legacyValues.map(function (value) {
                  return _valueToFrame(value.r);
                }));
                legacyEasingMethodConverter.convert(r);
                g.assignSorted(times, legacyValues.map(function (value) {
                  return _valueToFrame(value.g);
                }));
                legacyEasingMethodConverter.convert(g);
                b.assignSorted(times, legacyValues.map(function (value) {
                  return _valueToFrame(value.b);
                }));
                legacyEasingMethodConverter.convert(b);
                a.assignSorted(times, legacyValues.map(function (value) {
                  return _valueToFrame(value.a);
                }));
                legacyEasingMethodConverter.convert(a);
                newTracks.push(_track3);
                return;
              }

            case everyInstanceOf(legacyValues, jsonAsset.Size$1):
              {
                var _track4 = new SizeTrack();

                installPathAndSetter(_track4);

                var _track4$channels = _track4.channels(),
                    width = _track4$channels[0].curve,
                    height = _track4$channels[1].curve;

                var _interpolationMode3 = interpolate ? jsonAsset.RealInterpolationMode.LINEAR : jsonAsset.RealInterpolationMode.CONSTANT;

                var _valueToFrame2 = function _valueToFrame2(value) {
                  return {
                    value: value,
                    interpolationMode: _interpolationMode3
                  };
                };

                width.assignSorted(times, legacyValues.map(function (value) {
                  return _valueToFrame2(value.width);
                }));
                legacyEasingMethodConverter.convert(width);
                height.assignSorted(times, legacyValues.map(function (value) {
                  return _valueToFrame2(value.height);
                }));
                legacyEasingMethodConverter.convert(height);
                newTracks.push(_track4);
                return;
              }

            case everyInstanceOf(legacyValues, CubicSplineNumberValue):
              {

                var _track5 = new RealTrack();

                installPathAndSetter(_track5);

                var _interpolationMode4 = interpolate ? jsonAsset.RealInterpolationMode.CUBIC : jsonAsset.RealInterpolationMode.CONSTANT;

                _track5.channel.curve.assignSorted(times, legacyValues.map(function (value) {
                  return {
                    value: value.dataPoint,
                    leftTangent: value.inTangent,
                    rightTangent: value.outTangent,
                    interpolationMode: _interpolationMode4
                  };
                }));

                newTracks.push(_track5);
                return;
              }

            case everyInstanceOf(legacyValues, CubicSplineVec2Value):
            case everyInstanceOf(legacyValues, CubicSplineVec3Value):
            case everyInstanceOf(legacyValues, CubicSplineVec4Value):
              {

                var _components = firstValue instanceof CubicSplineVec2Value ? 2 : firstValue instanceof CubicSplineVec3Value ? 3 : 4;

                var _track6 = new VectorTrack();

                installPathAndSetter(_track6);
                _track6.componentsCount = _components;

                var _track6$channels = _track6.channels(),
                    _x = _track6$channels[0],
                    _y = _track6$channels[1],
                    _z = _track6$channels[2],
                    _w = _track6$channels[3];

                var _interpolationMode5 = interpolate ? jsonAsset.RealInterpolationMode.LINEAR : jsonAsset.RealInterpolationMode.CONSTANT;

                var _valueToFrame3 = function _valueToFrame3(value, inTangent, outTangent) {
                  return {
                    value: value,
                    leftTangent: inTangent,
                    rightTangent: outTangent,
                    interpolationMode: _interpolationMode5
                  };
                };

                switch (_components) {
                  case 4:
                    _w.curve.assignSorted(times, legacyValues.map(function (value) {
                      return _valueToFrame3(value.dataPoint.w, value.inTangent.w, value.outTangent.w);
                    }));

                  case 3:
                    _z.curve.assignSorted(times, legacyValues.map(function (value) {
                      return _valueToFrame3(value.dataPoint.z, value.inTangent.z, value.outTangent.z);
                    }));

                  default:
                    _x.curve.assignSorted(times, legacyValues.map(function (value) {
                      return _valueToFrame3(value.dataPoint.y, value.inTangent.y, value.outTangent.y);
                    }));

                    _y.curve.assignSorted(times, legacyValues.map(function (value) {
                      return _valueToFrame3(value.dataPoint.x, value.inTangent.x, value.outTangent.x);
                    }));

                    break;
                }

                newTracks.push(_track6);
                return;
              }

            case legacyValues.every(function (value) {
              return value instanceof CubicSplineQuatValue;
            }):
              {
                jsonAsset.warnID(3935);
                break;
              }
          }
        }

        var objectTrack = new ObjectTrack();
        installPathAndSetter(objectTrack);
        objectTrack.channel.curve.assignSorted(times, legacyValues);
        newTracks.push(objectTrack);
      };

      convertCurve();
    };

    for (var _iterator2 = jsonAsset._createForOfIteratorHelperLoose(legacyCurves), _step2; !(_step2 = _iterator2()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }

    return newTracks;
  };

  _proto._createPropertyCurves = function _createPropertyCurves() {
    var _this = this;

    this._ratioSamplers = this._keys.map(function (keys) {
      return new RatioSampler(keys.map(function (key) {
        return key / _this._duration;
      }));
    });
    this._runtimeCurves = this._curves.map(function (targetCurve) {
      return {
        curve: new AnimCurve(targetCurve.data, _this._duration),
        modifiers: targetCurve.modifiers,
        valueAdapter: targetCurve.valueAdapter,
        sampler: _this._ratioSamplers[targetCurve.data.keys],
        commonTarget: targetCurve.commonTarget
      };
    });
  };

  jsonAsset._createClass(AnimationClipLegacyData, [{
    key: "keys",
    get: function get() {
      return this._keys;
    },
    set: function set(value) {
      this._keys = value;
    }
  }, {
    key: "curves",
    get: function get() {
      return this._curves;
    },
    set: function set(value) {
      this._curves = value;
      delete this._runtimeCurves;
    }
  }, {
    key: "commonTargets",
    get: function get() {
      return this._commonTargets;
    },
    set: function set(value) {
      this._commonTargets = value;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }]);

  return AnimationClipLegacyData;
}();

function everyInstanceOf(array, constructor) {
  return array.every(function (element) {
    return element instanceof constructor;
  });
}

var LegacyEasingMethodConverter = function () {
  function LegacyEasingMethodConverter(legacyCurveData, keyframesCount) {
    this._easingMethods = void 0;
    var easingMethods = legacyCurveData.easingMethods;

    if (Array.isArray(easingMethods)) {
      if (easingMethods.length === 0 && keyframesCount !== 0) {
        this._easingMethods = new Array(keyframesCount).fill(null);
      } else {
        this._easingMethods = easingMethods;
      }
    } else if (easingMethods === undefined) {
      this._easingMethods = new Array(keyframesCount).fill(legacyCurveData.easingMethod);
    } else {
      this._easingMethods = Array.from({
        length: keyframesCount
      }, function (_, index) {
        var _easingMethods$index;

        return (_easingMethods$index = easingMethods[index]) !== null && _easingMethods$index !== void 0 ? _easingMethods$index : null;
      });
    }
  }

  var _proto2 = LegacyEasingMethodConverter.prototype;

  _proto2.convert = function convert(curve) {
    var easingMethods = this._easingMethods;

    if (!easingMethods) {
      return;
    }

    var nKeyframes = curve.keyFramesCount;

    if (curve.keyFramesCount < 2) {
      return;
    }

    if (Array.isArray(easingMethods)) {
      jsonAsset.assertIsTrue(nKeyframes === easingMethods.length);
    }

    var iLastKeyframe = nKeyframes - 1;

    for (var iKeyframe = 0; iKeyframe < iLastKeyframe; ++iKeyframe) {
      var easingMethod = easingMethods[iKeyframe];

      if (!easingMethod) {
        continue;
      }

      if (Array.isArray(easingMethod)) {
        timeBezierToTangents(easingMethod, curve.getKeyframeTime(iKeyframe), curve.getKeyframeValue(iKeyframe), curve.getKeyframeTime(iKeyframe + 1), curve.getKeyframeValue(iKeyframe + 1));
      } else {
        applyLegacyEasingMethodName(easingMethod, curve, iKeyframe);
      }
    }
  };

  jsonAsset._createClass(LegacyEasingMethodConverter, [{
    key: "nil",
    get: function get() {
      return !this._easingMethods || this._easingMethods.every(function (easingMethod) {
        return easingMethod === null || easingMethod === undefined;
      });
    }
  }]);

  return LegacyEasingMethodConverter;
}();

function applyLegacyEasingMethodName(easingMethodName, curve, keyframeIndex) {
  jsonAsset.assertIsTrue(keyframeIndex !== curve.keyFramesCount - 1);
  var keyframeValue = curve.getKeyframeValue(keyframeIndex);
  var easingMethod = easingMethodNameMap[easingMethodName];

  if (easingMethod === jsonAsset.EasingMethod.CONSTANT) {
    keyframeValue.interpolationMode = jsonAsset.RealInterpolationMode.CONSTANT;
  } else {
    keyframeValue.interpolationMode = jsonAsset.RealInterpolationMode.LINEAR;
    keyframeValue.easingMethod = easingMethod;
  }
}

var easingMethodNameMap = {
  constant: jsonAsset.EasingMethod.CONSTANT,
  linear: jsonAsset.EasingMethod.LINEAR,
  quadIn: jsonAsset.EasingMethod.QUAD_IN,
  quadOut: jsonAsset.EasingMethod.QUAD_OUT,
  quadInOut: jsonAsset.EasingMethod.QUAD_IN_OUT,
  quadOutIn: jsonAsset.EasingMethod.QUAD_OUT_IN,
  cubicIn: jsonAsset.EasingMethod.CUBIC_IN,
  cubicOut: jsonAsset.EasingMethod.CUBIC_OUT,
  cubicInOut: jsonAsset.EasingMethod.CUBIC_IN_OUT,
  cubicOutIn: jsonAsset.EasingMethod.CUBIC_OUT_IN,
  quartIn: jsonAsset.EasingMethod.QUART_IN,
  quartOut: jsonAsset.EasingMethod.QUART_OUT,
  quartInOut: jsonAsset.EasingMethod.QUART_IN_OUT,
  quartOutIn: jsonAsset.EasingMethod.QUART_OUT_IN,
  quintIn: jsonAsset.EasingMethod.QUINT_IN,
  quintOut: jsonAsset.EasingMethod.QUINT_OUT,
  quintInOut: jsonAsset.EasingMethod.QUINT_IN_OUT,
  quintOutIn: jsonAsset.EasingMethod.QUINT_OUT_IN,
  sineIn: jsonAsset.EasingMethod.SINE_IN,
  sineOut: jsonAsset.EasingMethod.SINE_OUT,
  sineInOut: jsonAsset.EasingMethod.SINE_IN_OUT,
  sineOutIn: jsonAsset.EasingMethod.SINE_OUT_IN,
  expoIn: jsonAsset.EasingMethod.EXPO_IN,
  expoOut: jsonAsset.EasingMethod.EXPO_OUT,
  expoInOut: jsonAsset.EasingMethod.EXPO_IN_OUT,
  expoOutIn: jsonAsset.EasingMethod.EXPO_OUT_IN,
  circIn: jsonAsset.EasingMethod.CIRC_IN,
  circOut: jsonAsset.EasingMethod.CIRC_OUT,
  circInOut: jsonAsset.EasingMethod.CIRC_IN_OUT,
  circOutIn: jsonAsset.EasingMethod.CIRC_OUT_IN,
  elasticIn: jsonAsset.EasingMethod.ELASTIC_IN,
  elasticOut: jsonAsset.EasingMethod.ELASTIC_OUT,
  elasticInOut: jsonAsset.EasingMethod.ELASTIC_IN_OUT,
  elasticOutIn: jsonAsset.EasingMethod.ELASTIC_OUT_IN,
  backIn: jsonAsset.EasingMethod.BACK_IN,
  backOut: jsonAsset.EasingMethod.BACK_OUT,
  backInOut: jsonAsset.EasingMethod.BACK_IN_OUT,
  backOutIn: jsonAsset.EasingMethod.BACK_OUT_IN,
  bounceIn: jsonAsset.EasingMethod.BOUNCE_IN,
  bounceOut: jsonAsset.EasingMethod.BOUNCE_OUT,
  bounceInOut: jsonAsset.EasingMethod.BOUNCE_IN_OUT,
  bounceOutIn: jsonAsset.EasingMethod.BOUNCE_OUT_IN,
  smooth: jsonAsset.EasingMethod.SMOOTH,
  fade: jsonAsset.EasingMethod.FADE
};
function timeBezierToTangents(timeBezierPoints, previousTime, previousKeyframe, nextTime, nextKeyframe) {
  var p1X = timeBezierPoints[0],
      p1Y = timeBezierPoints[1],
      p2X = timeBezierPoints[2],
      p2Y = timeBezierPoints[3];
  var previousValue = previousKeyframe.value;
  var nextValue = nextKeyframe.value;
  var dValue = nextValue - previousValue;
  var dTime = nextTime - previousTime;
  var fx = 3 * dTime;
  var fy = 3 * dValue;
  var t1x = p1X * fx;
  var t1y = p1Y * fy;
  var t2x = (1.0 - p2X) * fx;
  var t2y = (1.0 - p2Y) * fy;
  var ONE_THIRD = 1.0 / 3.0;
  var previousTangent = t1y / t1x;
  var previousTangentWeight = Math.sqrt(t1x * t1x + t1y * t1y) * ONE_THIRD;
  var nextTangent = t2y / t2x;
  var nextTangentWeight = Math.sqrt(t2x * t2x + t2y * t2y) * ONE_THIRD;
  previousKeyframe.interpolationMode = jsonAsset.RealInterpolationMode.CUBIC;
  previousKeyframe.tangentWeightMode = ensureRightTangentWeightMode(previousKeyframe.tangentWeightMode);
  previousKeyframe.rightTangent = previousTangent;
  previousKeyframe.rightTangentWeight = previousTangentWeight;
  nextKeyframe.tangentWeightMode = ensureLeftTangentWeightMode(nextKeyframe.tangentWeightMode);
  nextKeyframe.leftTangent = nextTangent;
  nextKeyframe.leftTangentWeight = nextTangentWeight;
}

function ensureLeftTangentWeightMode(tangentWeightMode) {
  if (tangentWeightMode === jsonAsset.TangentWeightMode.NONE) {
    return jsonAsset.TangentWeightMode.LEFT;
  } else if (tangentWeightMode === jsonAsset.TangentWeightMode.RIGHT) {
    return jsonAsset.TangentWeightMode.BOTH;
  } else {
    return tangentWeightMode;
  }
}

function ensureRightTangentWeightMode(tangentWeightMode) {
  if (tangentWeightMode === jsonAsset.TangentWeightMode.NONE) {
    return jsonAsset.TangentWeightMode.RIGHT;
  } else if (tangentWeightMode === jsonAsset.TangentWeightMode.LEFT) {
    return jsonAsset.TangentWeightMode.BOTH;
  } else {
    return tangentWeightMode;
  }
}

var _dec$9, _class$9, _class2$6, _descriptor$6, _temp$6, _dec2$4, _class4$4, _class5$4, _descriptor2$4, _descriptor3$1, _descriptor4$2, _descriptor5$2, _temp2$4, _dec3$1, _class7$1, _class8$1, _descriptor6$2, _descriptor7, _temp3$1, _dec4$1, _class10$1, _dec5$1, _class11$1, _dec6, _class12, _class13$1, _descriptor8, _descriptor9, _temp4$1, _dec7, _class15, _class16, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp5$1;

function throwIfSplitMethodIsNotValid() {
  throw new Error("split() only valid in Editor.");
}

var ExoticAnimation = (_dec$9 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticAnimation"), _dec$9(_class$9 = (_class2$6 = (_temp$6 = function () {
  function ExoticAnimation() {
    jsonAsset._initializerDefineProperty(this, "_nodeAnimations", _descriptor$6, this);
  }

  var _proto = ExoticAnimation.prototype;

  _proto.createEvaluator = function createEvaluator(binder) {
    return new ExoticTrsAnimationEvaluator(this._nodeAnimations, binder);
  };

  _proto.addNodeAnimation = function addNodeAnimation(path) {
    var nodeAnimation = new ExoticNodeAnimation(path);

    this._nodeAnimations.push(nodeAnimation);

    return nodeAnimation;
  };

  _proto.collectAnimatedJoints = function collectAnimatedJoints() {
    return Array.from(new Set(this._nodeAnimations.map(function (_ref) {
      var path = _ref.path;
      return path;
    })));
  };

  _proto.split = function split(from, to) {
    {
      return throwIfSplitMethodIsNotValid();
    }
  };

  _proto.toHashString = function toHashString() {
    return this._nodeAnimations.map(function (nodeAnimation) {
      return nodeAnimation.toHashString();
    }).join('\n');
  };

  return ExoticAnimation;
}(), _temp$6), (_descriptor$6 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "_nodeAnimations", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$6)) || _class$9);
var ExoticNodeAnimation = (_dec2$4 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticNodeAnimation"), _dec2$4(_class4$4 = (_class5$4 = (_temp2$4 = function () {
  function ExoticNodeAnimation(path) {
    jsonAsset._initializerDefineProperty(this, "_path", _descriptor2$4, this);

    jsonAsset._initializerDefineProperty(this, "_position", _descriptor3$1, this);

    jsonAsset._initializerDefineProperty(this, "_rotation", _descriptor4$2, this);

    jsonAsset._initializerDefineProperty(this, "_scale", _descriptor5$2, this);

    this._path = path;
  }

  var _proto2 = ExoticNodeAnimation.prototype;

  _proto2.createPosition = function createPosition(times, values) {
    this._position = new ExoticTrack(times, new ExoticVec3TrackValues(values));
  };

  _proto2.createRotation = function createRotation(times, values) {
    this._rotation = new ExoticTrack(times, new ExoticQuatTrackValues(values));
  };

  _proto2.createScale = function createScale(times, values) {
    this._scale = new ExoticTrack(times, new ExoticVec3TrackValues(values));
  };

  _proto2.createEvaluator = function createEvaluator(binder) {
    return new ExoticNodeAnimationEvaluator(this._path, this._position, this._rotation, this._scale, binder);
  };

  _proto2.split = function split(from, to, splitInfoCache) {
    {
      return throwIfSplitMethodIsNotValid();
    }
  };

  _proto2.toHashString = function toHashString() {
    var _this$_position$toHas, _this$_position, _this$_scale$toHashSt, _this$_scale, _this$_rotation$toHas, _this$_rotation;

    return this._path + "\n" + ((_this$_position$toHas = (_this$_position = this._position) === null || _this$_position === void 0 ? void 0 : _this$_position.toHashString()) !== null && _this$_position$toHas !== void 0 ? _this$_position$toHas : '') + ((_this$_scale$toHashSt = (_this$_scale = this._scale) === null || _this$_scale === void 0 ? void 0 : _this$_scale.toHashString()) !== null && _this$_scale$toHashSt !== void 0 ? _this$_scale$toHashSt : '') + ((_this$_rotation$toHas = (_this$_rotation = this._rotation) === null || _this$_rotation === void 0 ? void 0 : _this$_rotation.toHashString()) !== null && _this$_rotation$toHas !== void 0 ? _this$_rotation$toHas : '');
  };

  jsonAsset._createClass(ExoticNodeAnimation, [{
    key: "path",
    get: function get() {
      return this._path;
    }
  }]);

  return ExoticNodeAnimation;
}(), _temp2$4), (_descriptor2$4 = jsonAsset._applyDecoratedDescriptor(_class5$4.prototype, "_path", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3$1 = jsonAsset._applyDecoratedDescriptor(_class5$4.prototype, "_position", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4$2 = jsonAsset._applyDecoratedDescriptor(_class5$4.prototype, "_rotation", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5$2 = jsonAsset._applyDecoratedDescriptor(_class5$4.prototype, "_scale", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class5$4)) || _class4$4);

function floatToHashString(value) {
  return value.toPrecision(2);
}

function floatArrayToHashString(values) {
  return values.map(floatToHashString).join(' ');
}

var ExoticVectorLikeTrackValues = (_dec3$1 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticVectorLikeTrackValues"), _dec3$1(_class7$1 = (_class8$1 = (_temp3$1 = function () {
  function ExoticVectorLikeTrackValues(values) {
    jsonAsset._initializerDefineProperty(this, "_values", _descriptor6$2, this);

    jsonAsset._initializerDefineProperty(this, "_isQuantized", _descriptor7, this);

    this._values = values;
    this._isQuantized = false;
  }

  var _proto3 = ExoticVectorLikeTrackValues.prototype;

  _proto3.quantize = function quantize(type) {
    jsonAsset.assertIsTrue(!this._isQuantized);
    this._values = _quantize(this._values, type);
    this._isQuantized = true;
  };

  _proto3.toHashString = function toHashString() {
    var isQuantized = this._isQuantized,
        values = this._values;
    return isQuantized + " " + (isQuantized ? values.toHashString() : floatArrayToHashString(values));
  };

  jsonAsset._createClass(ExoticVectorLikeTrackValues, [{
    key: "precision",
    get: function get() {
      return this._isQuantized ? this._values.originalPrecision : getFloatArrayPrecision(this._values);
    }
  }]);

  return ExoticVectorLikeTrackValues;
}(), _temp3$1), (_descriptor6$2 = jsonAsset._applyDecoratedDescriptor(_class8$1.prototype, "_values", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = jsonAsset._applyDecoratedDescriptor(_class8$1.prototype, "_isQuantized", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class8$1)) || _class7$1);
var ExoticVec3TrackValues = (_dec4$1 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticVec3TrackValues"), _dec4$1(_class10$1 = function (_ExoticVectorLikeTrac) {
  jsonAsset._inheritsLoose(ExoticVec3TrackValues, _ExoticVectorLikeTrac);

  function ExoticVec3TrackValues() {
    return _ExoticVectorLikeTrac.apply(this, arguments) || this;
  }

  ExoticVec3TrackValues.imitate = function imitate(values, model) {
    var trackValues = new ExoticVec3TrackValues(values);

    if (model._isQuantized) {
      trackValues.quantize(model._values.quantizationType);
    }

    return trackValues;
  };

  var _proto4 = ExoticVec3TrackValues.prototype;

  _proto4.get = function get(index, resultValue) {
    var values = this._values,
        isQuantized = this._isQuantized;

    if (isQuantized) {
      loadVec3FromQuantized(values, index, resultValue);
    } else {
      jsonAsset.Vec3.fromArray(resultValue, values, index * 3);
    }
  };

  _proto4.lerp = function lerp(prevIndex, nextIndex, ratio, prevValue, nextValue, resultValue) {
    var values = this._values,
        isQuantized = this._isQuantized;

    if (isQuantized) {
      loadVec3FromQuantized(values, prevIndex, prevValue);
      loadVec3FromQuantized(values, nextIndex, nextValue);
    } else {
      jsonAsset.Vec3.fromArray(prevValue, values, prevIndex * 3);
      jsonAsset.Vec3.fromArray(nextValue, values, nextIndex * 3);
    }

    jsonAsset.Vec3.lerp(resultValue, prevValue, nextValue, ratio);
  };

  return ExoticVec3TrackValues;
}(ExoticVectorLikeTrackValues)) || _class10$1);
var ExoticQuatTrackValues = (_dec5$1 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticQuatTrackValues"), _dec5$1(_class11$1 = function (_ExoticVectorLikeTrac2) {
  jsonAsset._inheritsLoose(ExoticQuatTrackValues, _ExoticVectorLikeTrac2);

  function ExoticQuatTrackValues() {
    return _ExoticVectorLikeTrac2.apply(this, arguments) || this;
  }

  ExoticQuatTrackValues.imitate = function imitate(values, model) {
    var trackValues = new ExoticQuatTrackValues(values);

    if (model._isQuantized) {
      trackValues.quantize(model._values.quantizationType);
    }

    return trackValues;
  };

  var _proto5 = ExoticQuatTrackValues.prototype;

  _proto5.get = function get(index, resultValue) {
    var values = this._values,
        isQuantized = this._isQuantized;

    if (isQuantized) {
      loadQuatFromQuantized(values, index, resultValue);
    } else {
      jsonAsset.Quat.fromArray(resultValue, values, index * 4);
    }
  };

  _proto5.lerp = function lerp(prevIndex, nextIndex, ratio, prevValue, nextValue, resultValue) {
    var values = this._values,
        isQuantized = this._isQuantized;

    if (isQuantized) {
      loadQuatFromQuantized(values, prevIndex, prevValue);
      loadQuatFromQuantized(values, nextIndex, nextValue);
    } else {
      jsonAsset.Quat.fromArray(prevValue, values, prevIndex * 4);
      jsonAsset.Quat.fromArray(nextValue, values, nextIndex * 4);
    }

    jsonAsset.Quat.slerp(resultValue, prevValue, nextValue, ratio);
  };

  return ExoticQuatTrackValues;
}(ExoticVectorLikeTrackValues)) || _class11$1);
var ExoticTrack = (_dec6 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticTrack"), _dec6(_class12 = (_class13$1 = (_temp4$1 = function () {
  function ExoticTrack(times, values) {
    jsonAsset._initializerDefineProperty(this, "times", _descriptor8, this);

    jsonAsset._initializerDefineProperty(this, "values", _descriptor9, this);

    this.times = times;
    this.values = values;
  }

  var _proto6 = ExoticTrack.prototype;

  _proto6.toHashString = function toHashString() {
    var times = this.times,
        values = this.values;
    return "times: " + floatArrayToHashString(times) + "; values: " + values.toHashString();
  };

  return ExoticTrack;
}(), _temp4$1), (_descriptor8 = jsonAsset._applyDecoratedDescriptor(_class13$1.prototype, "times", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = jsonAsset._applyDecoratedDescriptor(_class13$1.prototype, "values", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class13$1)) || _class12);

var SplitInfo = function () {
  function SplitInfo() {
    this._reset();
  }

  var _proto7 = SplitInfo.prototype;

  _proto7.transformTime = function transformTime(input) {
    return input - this._timeOffset;
  };

  _proto7.calculate = function calculate(times, from, to) {
    this._reset();

    var nKeyframes = times.length;

    if (!nKeyframes) {
      return;
    }

    var firstTime = times[0];
    var lastTime = times[nKeyframes - 1];
    var fromClamped = jsonAsset.clamp(from, firstTime, lastTime);
    var toClamped = jsonAsset.clamp(to, firstTime, lastTime);
    this._timeOffset = fromClamped;

    var _searchRange = searchRange(times, fromClamped, toClamped),
        fromIndex = _searchRange.fromIndex,
        fromRatio = _searchRange.fromRatio,
        toIndex = _searchRange.toIndex,
        toRatio = _searchRange.toRatio;
    var fromJust = !fromRatio;
    var toJust = !toRatio;

    if (fromIndex === toIndex && fromRatio === toRatio) {
      if (!fromJust) {
        this.preLerpIndex = fromIndex;
        this.preLerpRatio = fromRatio;
      } else {
        this.directKeyframesBegin = fromIndex;
        this.directKeyframesEnd = fromIndex + 1;
      }

      return;
    }

    if (!fromJust) {
      this.preLerpIndex = fromIndex;
      this.preLerpRatio = fromRatio;
    }

    this.directKeyframesBegin = fromJust ? fromIndex : fromIndex + 1;
    this.directKeyframesEnd = toIndex + 1;

    if (!toJust) {
      this.postLerpIndex = toIndex;
      this.postLerpRatio = toRatio;
    }
  };

  _proto7._reset = function _reset() {
    this.preLerpIndex = -1;
    this.preLerpRatio = 0.0;
    this.directKeyframesBegin = 0;
    this.directKeyframesEnd = 0;
    this.postLerpIndex = -1;
    this.postLerpRatio = 0.0;
    this._timeOffset = 0.0;
  };

  jsonAsset._createClass(SplitInfo, [{
    key: "keyframesCount",
    get: function get() {
      var preLerpIndex = this.preLerpIndex,
          directKeyframesBegin = this.directKeyframesBegin,
          directKeyframesEnd = this.directKeyframesEnd,
          postLerpIndex = this.postLerpIndex;
      return 0 + (preLerpIndex < 0 ? 0 : 1) + (directKeyframesEnd - directKeyframesBegin) + (postLerpIndex < 0 ? 0 : 1);
    }
  }]);

  return SplitInfo;
}();

function searchRange(values, from, to) {
  var nValues = values.length;
  jsonAsset.assertIsTrue(to >= from && from >= values[0] && to <= values[nValues - 1]);

  var _binarySearchRatio = binarySearchRatio(values, from),
      fromIndex = _binarySearchRatio.index,
      fromRatio = _binarySearchRatio.ratio;

  var _binarySearchRatio2 = binarySearchRatio(values, to),
      toIndex = _binarySearchRatio2.index,
      toRatio = _binarySearchRatio2.ratio;

  return {
    fromIndex: fromIndex,
    fromRatio: fromRatio,
    toIndex: toIndex,
    toRatio: toRatio
  };
}

function binarySearchRatio(values, value) {
  var nValues = values.length;
  jsonAsset.assertIsTrue(values.length !== 0);
  var resultIndex = 0;
  var resultRatio = 0.0;
  var index0 = jsonAsset.binarySearchEpsilon(values, value);

  if (index0 >= 0) {
    resultIndex = index0;
  } else {
    var iNext = ~index0;
    var iPrev = iNext - 1;
    resultIndex = iPrev;
    var next = values[iNext];
    var prev = values[iPrev];
    resultRatio = (value - prev) / (next - prev);
  }

  return {
    index: resultIndex,
    ratio: resultRatio
  };
}

var ExoticTrsAnimationEvaluator = function () {
  function ExoticTrsAnimationEvaluator(nodeAnimations, binder) {
    this._nodeEvaluations = void 0;
    this._nodeEvaluations = nodeAnimations.map(function (nodeAnimation) {
      return nodeAnimation.createEvaluator(binder);
    });
  }

  var _proto8 = ExoticTrsAnimationEvaluator.prototype;

  _proto8.evaluate = function evaluate(time) {
    this._nodeEvaluations.forEach(function (nodeEvaluator) {
      nodeEvaluator.evaluate(time);
    });
  };

  return ExoticTrsAnimationEvaluator;
}();

var ExoticNodeAnimationEvaluator = function () {
  function ExoticNodeAnimationEvaluator(path, position, rotation, scale, binder) {
    this._position = null;
    this._rotation = null;
    this._scale = null;

    if (position) {
      this._position = createExoticTrackEvaluationRecord(position.times, position.values, jsonAsset.Vec3, path, 'position', binder);
    }

    if (rotation) {
      this._rotation = createExoticTrackEvaluationRecord(rotation.times, rotation.values, jsonAsset.Quat, path, 'rotation', binder);
    }

    if (scale) {
      this._scale = createExoticTrackEvaluationRecord(scale.times, scale.values, jsonAsset.Vec3, path, 'scale', binder);
    }
  }

  var _proto9 = ExoticNodeAnimationEvaluator.prototype;

  _proto9.evaluate = function evaluate(time) {
    if (this._position) {
      var _value = this._position.evaluator.evaluate(time);

      this._position.runtimeBinding.setValue(_value);
    }

    if (this._rotation) {
      var _value2 = this._rotation.evaluator.evaluate(time);

      this._rotation.runtimeBinding.setValue(_value2);
    }

    if (this._scale) {
      var _value3 = this._scale.evaluator.evaluate(time);

      this._scale.runtimeBinding.setValue(_value3);
    }
  };

  return ExoticNodeAnimationEvaluator;
}();

var ExoticTrackEvaluator = function () {
  function ExoticTrackEvaluator(times, values, ValueConstructor) {
    this._times = void 0;
    this._inputSampleResultCache = {
      just: false,
      index: -1,
      nextIndex: -1,
      ratio: 0.0
    };
    this._values = void 0;
    this._prevValue = void 0;
    this._nextValue = void 0;
    this._resultValue = void 0;
    this._times = times;
    this._values = values;
    this._prevValue = new ValueConstructor();
    this._nextValue = new ValueConstructor();
    this._resultValue = new ValueConstructor();
  }

  var _proto10 = ExoticTrackEvaluator.prototype;

  _proto10.evaluate = function evaluate(time) {
    var times = this._times,
        values = this._values,
        resultValue = this._resultValue;
    var nFrames = times.length;

    if (nFrames === 0) {
      return resultValue;
    }

    var inputSampleResult = sampleInput(times, time, this._inputSampleResultCache);

    if (inputSampleResult.just) {
      values.get(inputSampleResult.index, resultValue);
    } else {
      values.lerp(inputSampleResult.index, inputSampleResult.nextIndex, inputSampleResult.ratio, this._prevValue, this._nextValue, resultValue);
    }

    return resultValue;
  };

  return ExoticTrackEvaluator;
}();

function sampleInput(values, time, result) {
  var nFrames = values.length;
  var firstTime = values[0];
  var lastTime = values[nFrames - 1];

  if (time < firstTime) {
    result.just = true;
    result.index = 0;
  } else if (time > lastTime) {
    result.just = true;
    result.index = nFrames - 1;
  } else {
    var _index2 = jsonAsset.binarySearchEpsilon(values, time);

    if (_index2 >= 0) {
      result.just = true;
      result.index = _index2;
    } else {
      var _nextIndex = ~_index2;

      var _prevIndex = _nextIndex - 1;

      var prevTime = values[_prevIndex];
      var nextTime = values[_nextIndex];

      var _ratio = (time - values[_prevIndex]) / (nextTime - prevTime);

      result.just = false;
      result.index = _prevIndex;
      result.nextIndex = _nextIndex;
      result.ratio = _ratio;
    }
  }

  return result;
}

var QUANTIZATION_TYPE_TO_ARRAY_VIEW_CONSTRUCTOR_MAP = {
  uint8: Uint8Array,
  uint16: Uint16Array
};
var FloatPrecision;

(function (FloatPrecision) {
  FloatPrecision[FloatPrecision["FLOAT_32"] = 0] = "FLOAT_32";
  FloatPrecision[FloatPrecision["FLOAT_64"] = 1] = "FLOAT_64";
})(FloatPrecision || (FloatPrecision = {}));

function getFloatArrayPrecision(array) {
  switch (array.BYTES_PER_ELEMENT) {
    default:

    case 4:
      return FloatPrecision.FLOAT_32;

    case 8:
      return FloatPrecision.FLOAT_64;
  }
}

var QuantizedFloatArray = (_dec7 = jsonAsset.ccclass(CLASS_NAME_PREFIX_ANIM + "QuantizedFloatArray"), _dec7(_class15 = (_class16 = (_temp5$1 = function () {
  jsonAsset._createClass(QuantizedFloatArray, [{
    key: "quantizationType",
    get: function get() {
      switch (this.values.BYTES_PER_ELEMENT) {
        default:
        case 1:
          return 'uint8';

        case 2:
          return 'uint16';
      }
    }
  }]);

  function QuantizedFloatArray(originalPrecision, values, extent, min) {
    if (min === void 0) {
      min = 0.0;
    }

    jsonAsset._initializerDefineProperty(this, "originalPrecision", _descriptor10, this);

    jsonAsset._initializerDefineProperty(this, "min", _descriptor11, this);

    jsonAsset._initializerDefineProperty(this, "extent", _descriptor12, this);

    jsonAsset._initializerDefineProperty(this, "values", _descriptor13, this);

    this.originalPrecision = originalPrecision;
    this.values = values;
    this.extent = extent;
    this.min = min;
  }

  var _proto11 = QuantizedFloatArray.prototype;

  _proto11.toHashString = function toHashString() {
    var originalPrecision = this.originalPrecision,
        min = this.min,
        extent = this.extent,
        values = this.values;
    return originalPrecision + " " + floatToHashString(min) + " " + floatToHashString(extent) + " " + values.join(' ');
  };

  return QuantizedFloatArray;
}(), _temp5$1), (_descriptor10 = jsonAsset._applyDecoratedDescriptor(_class16.prototype, "originalPrecision", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = jsonAsset._applyDecoratedDescriptor(_class16.prototype, "min", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = jsonAsset._applyDecoratedDescriptor(_class16.prototype, "extent", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = jsonAsset._applyDecoratedDescriptor(_class16.prototype, "values", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class16)) || _class15);

function _quantize(values, type) {
  var TypedArrayViewConstructor = QUANTIZATION_TYPE_TO_ARRAY_VIEW_CONSTRUCTOR_MAP[type];
  var MAX = 1 << TypedArrayViewConstructor.BYTES_PER_ELEMENT;
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  values.forEach(function (value) {
    min = Math.min(value, min);
    max = Math.max(value, max);
  });
  var extent = max - min;
  var normalized = TypedArrayViewConstructor.from(values, function (value) {
    return (value - min) / extent * MAX;
  });
  return new QuantizedFloatArray(getFloatArrayPrecision(values), normalized, extent, min);
}

function indexQuantized(quantized, index) {
  var quantizedValue = quantized.values[index];
  var MAX_VALUE = 1 << quantized.values.BYTES_PER_ELEMENT;
  return quantizedValue / MAX_VALUE * quantized.extent + quantized.min;
}

function createExoticTrackEvaluationRecord(times, values, ValueConstructor, path, property, binder) {
  var trackBinding = new TrackBinding();
  trackBinding.path = new TrackPath().toHierarchy(path).toProperty(property);
  var runtimeBinding = binder(trackBinding);

  if (!runtimeBinding) {
    return null;
  }

  var evaluator = new ExoticTrackEvaluator(times, values, ValueConstructor);
  return {
    runtimeBinding: runtimeBinding,
    evaluator: evaluator
  };
}

function loadVec3FromQuantized(values, index, out) {
  jsonAsset.Vec3.set(out, indexQuantized(values, 3 * index + 0), indexQuantized(values, 3 * index + 1), indexQuantized(values, 3 * index + 2));
}

function loadQuatFromQuantized(values, index, out) {
  jsonAsset.Quat.set(out, indexQuantized(values, 4 * index + 0), indexQuantized(values, 4 * index + 1), indexQuantized(values, 4 * index + 2), indexQuantized(values, 4 * index + 3));
}

var _dec$a, _class$a, _class2$7, _descriptor$7, _descriptor2$5, _descriptor3$2, _descriptor4$3, _descriptor5$3, _descriptor6$3, _descriptor7$1, _descriptor8$1, _descriptor9$1, _class3, _temp$7;
var searchForRootBonePathSymbol = Symbol('SearchForRootBonePath');
var exoticAnimationTag = Symbol('ExoticAnimation');
var AnimationClip = (_dec$a = jsonAsset.ccclass('cc.AnimationClip'), _dec$a(_class$a = (_class2$7 = (_temp$7 = _class3 = function (_Asset) {
  jsonAsset._inheritsLoose(AnimationClip, _Asset);

  function AnimationClip() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "sample", _descriptor$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "speed", _descriptor2$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "wrapMode", _descriptor3$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "enableTrsBlending", _descriptor4$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_duration", _descriptor5$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_hash", _descriptor6$3, jsonAsset._assertThisInitialized(_this));

    _this.frameRate = 0;

    jsonAsset._initializerDefineProperty(_this, "_tracks", _descriptor7$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_exoticAnimation", _descriptor8$1, jsonAsset._assertThisInitialized(_this));

    _this._legacyData = undefined;
    _this._legacyDataDirty = false;

    jsonAsset._initializerDefineProperty(_this, "_events", _descriptor9$1, jsonAsset._assertThisInitialized(_this));

    _this._runtimeEvents = {
      ratios: [],
      eventGroups: []
    };
    return _this;
  }

  AnimationClip.createWithSpriteFrames = function createWithSpriteFrames(spriteFrames, sample) {
    var clip = new AnimationClip();
    clip.sample = sample || clip.sample;
    clip.duration = spriteFrames.length / clip.sample;
    var step = 1 / clip.sample;
    var track = new ObjectTrack();
    track.path = new TrackPath().toComponent('cc.Sprite').toProperty('spriteFrame');
    var curve = track.channels()[0].curve;
    curve.assignSorted(spriteFrames.map(function (spriteFrame, index) {
      return [step * index, spriteFrame];
    }));
    return clip;
  };

  var _proto = AnimationClip.prototype;

  _proto.onLoaded = function onLoaded() {
    this.frameRate = this.sample;
    this.events = this._events;
  };

  _proto.range = function range() {
    var range = {
      min: Infinity,
      max: -Infinity
    };
    var tracks = this._tracks;
    var nTracks = tracks.length;

    for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
      var track = tracks[iTrack];
      var trackRange = track.range();
      range.min = Math.min(range.min, trackRange.min);
      range.max = Math.max(range.max, trackRange.max);
    }

    return range;
  };

  _proto.getTrack = function getTrack(index) {
    return this._tracks[index];
  };

  _proto.addTrack = function addTrack(track) {
    var index = this._tracks.length;

    this._tracks.push(track);

    return index;
  };

  _proto.removeTrack = function removeTrack(index) {
    this._tracks.splice(index, 1);
  };

  _proto.clearTracks = function clearTracks() {
    this._tracks.length = 0;
  };

  _proto.createEventEvaluator = function createEventEvaluator(targetNode) {
    return new EventEvaluator(targetNode, this._runtimeEvents.ratios, this._runtimeEvents.eventGroups, this.wrapMode);
  };

  _proto.createEvaluator = function createEvaluator(context) {
    var _this2 = this;

    var target = context.target;

    var binder = function binder(binding) {
      var trackTarget = binding.createRuntimeBinding(target, _this2.enableTrsBlending ? context.pose : undefined, false);
      return trackTarget !== null && trackTarget !== void 0 ? trackTarget : undefined;
    };

    return this._createEvalWithBinder(target, binder, context.rootMotion);
  };

  _proto.destroy = function destroy() {
    var _legacyCC$director$ro;

    if ((_legacyCC$director$ro = jsonAsset.legacyCC.director.root) === null || _legacyCC$director$ro === void 0 ? void 0 : _legacyCC$director$ro.dataPoolManager) {
      jsonAsset.legacyCC.director.root.dataPoolManager.releaseAnimationClip(this);
    }

    SkelAnimDataHub.destroy(this);
    return _Asset.prototype.destroy.call(this);
  };

  _proto[BAKE_SKELETON_CURVE_SYMBOL] = function (start, samples, frames) {
    var step = 1.0 / samples;

    var animatedJoints = this._collectAnimatedJoints();

    var nAnimatedJoints = animatedJoints.length;
    var jointsBakeInfo = {};

    for (var iAnimatedJoint = 0; iAnimatedJoint < nAnimatedJoints; ++iAnimatedJoint) {
      var joint = animatedJoints[iAnimatedJoint];
      jointsBakeInfo[joint] = {
        transforms: Array.from({
          length: frames
        }, function () {
          return new jsonAsset.Mat4();
        })
      };
    }

    var skeletonFrames = animatedJoints.reduce(function (result, joint) {
      result[joint] = new BoneGlobalTransform();
      return result;
    }, {});

    for (var _joint in skeletonFrames) {
      var skeletonFrame = skeletonFrames[_joint];

      var parentJoint = _joint.lastIndexOf('/');

      if (parentJoint >= 0) {
        var parentJointName = _joint.substring(0, parentJoint);

        var parentJointFrame = skeletonFrames[parentJointName];

        if (!parentJointFrame) {
          jsonAsset.warnID(3922, _joint, parentJointName);
        } else {
          skeletonFrame.parent = parentJointFrame;
        }
      }
    }

    var binder = function binder(binding) {
      var trsPath = binding.parseTrsPath();

      if (!trsPath) {
        return undefined;
      }

      var jointFrame = skeletonFrames[trsPath.node];

      if (!jointFrame) {
        return undefined;
      }

      return createBoneTransformBinding(jointFrame, trsPath.property);
    };

    var evaluator = this._createEvalWithBinder(undefined, binder, undefined);

    for (var iFrame = 0; iFrame < frames; ++iFrame) {
      var time = start + step * iFrame;
      evaluator.evaluate(time);

      for (var _iAnimatedJoint = 0; _iAnimatedJoint < nAnimatedJoints; ++_iAnimatedJoint) {
        var _joint2 = animatedJoints[_iAnimatedJoint];
        jsonAsset.Mat4.copy(jointsBakeInfo[_joint2].transforms[iFrame], skeletonFrames[_joint2].globalTransform);
      }

      for (var _iAnimatedJoint2 = 0; _iAnimatedJoint2 < nAnimatedJoints; ++_iAnimatedJoint2) {
        var _joint3 = animatedJoints[_iAnimatedJoint2];

        skeletonFrames[_joint3].invalidate();
      }
    }

    return {
      samples: samples,
      frames: frames,
      joints: jointsBakeInfo
    };
  };

  _proto.upgradeUntypedTracks = function upgradeUntypedTracks(refine) {
    var newTracks = [];
    var removals = [];
    var tracks = this._tracks;
    var nTracks = tracks.length;

    for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
      var track = tracks[iTrack];

      if (!(track instanceof UntypedTrack)) {
        continue;
      }

      var newTrack = track.upgrade(refine);

      if (newTrack) {
        newTracks.push(newTrack);
        removals.push(track);
      }
    }

    var nRemovalTracks = removals.length;

    for (var iRemovalTrack = 0; iRemovalTrack < nRemovalTracks; ++iRemovalTrack) {
      jsonAsset.array.remove(tracks, removals[iRemovalTrack]);
    }

    tracks.push.apply(tracks, newTracks);
  };

  _proto[searchForRootBonePathSymbol] = function () {
    return this._searchForRootBonePath();
  };

  _proto.getPropertyCurves = function getPropertyCurves() {
    return this._getLegacyData().getPropertyCurves();
  };

  _proto.updateEventDatas = function updateEventDatas() {};

  _proto.hasEvents = function hasEvents() {
    return this.events.length !== 0;
  };

  _proto.syncLegacyData = function syncLegacyData() {
    if (this._legacyData) {
      this._fromLegacy(this._legacyData);

      this._legacyData = undefined;
    }
  };

  _proto._createEvalWithBinder = function _createEvalWithBinder(target, binder, rootMotionOptions) {
    if (this._legacyDataDirty) {
      this._legacyDataDirty = false;
      this.syncLegacyData();
    }

    var rootMotionTrackExcludes = [];
    var rootMotionEvaluation;

    if (rootMotionOptions) {
      rootMotionEvaluation = this._createRootMotionEvaluation(target, rootMotionOptions, rootMotionTrackExcludes);
    }

    var trackEvalStatues = [];
    var exoticAnimationEvaluator;
    var tracks = this._tracks;
    var nTracks = tracks.length;

    for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
      var track = tracks[iTrack];

      if (rootMotionTrackExcludes.includes(track)) {
        continue;
      }

      var trackTarget = binder(track[trackBindingTag]);

      if (!trackTarget) {
        continue;
      }

      var trackEval = track[createEvalSymbol](trackTarget);
      trackEvalStatues.push({
        binding: trackTarget,
        trackEval: trackEval
      });
    }

    if (this._exoticAnimation) {
      exoticAnimationEvaluator = this._exoticAnimation.createEvaluator(binder);
    }

    var evaluation = new AnimationClipEvaluation(trackEvalStatues, exoticAnimationEvaluator, rootMotionEvaluation);
    return evaluation;
  };

  _proto._createRootMotionEvaluation = function _createRootMotionEvaluation(target, rootMotionOptions, rootMotionTrackExcludes) {
    if (!(target instanceof jsonAsset.Node)) {
      jsonAsset.errorID(3920);
      return undefined;
    }

    var rootBonePath = this._searchForRootBonePath();

    if (!rootBonePath) {
      jsonAsset.warnID(3923);
      return undefined;
    }

    var rootBone = target.getChildByPath(rootBonePath);

    if (!rootBone) {
      jsonAsset.warnID(3924);
      return undefined;
    }

    var boneTransform = new BoneTransform();
    var rootMotionsTrackEvaluations = [];
    var tracks = this._tracks;
    var nTracks = tracks.length;

    for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
      var track = tracks[iTrack];
      var trackBinding = track[trackBindingTag];
      var trsPath = trackBinding.parseTrsPath();

      if (!trsPath) {
        continue;
      }

      var bonePath = trsPath.node;

      if (bonePath !== rootBonePath) {
        continue;
      }

      rootMotionTrackExcludes.push(track);
      var property = trsPath.property;
      var trackTarget = createBoneTransformBinding(boneTransform, property);

      if (!trackTarget) {
        continue;
      }

      var trackEval = track[createEvalSymbol](trackTarget);
      rootMotionsTrackEvaluations.push({
        binding: trackTarget,
        trackEval: trackEval
      });
    }

    var rootMotionEvaluation = new RootMotionEvaluation(rootBone, this._duration, boneTransform, rootMotionsTrackEvaluations);
    return rootMotionEvaluation;
  };

  _proto._searchForRootBonePath = function _searchForRootBonePath() {
    var paths = this._tracks.map(function (track) {
      var trsPath = track[trackBindingTag].parseTrsPath();

      if (trsPath) {
        var nodePath = trsPath.node;
        return {
          path: nodePath,
          rank: nodePath.split('/').length
        };
      } else {
        return {
          path: '',
          rank: 0
        };
      }
    });

    paths.sort(function (a, b) {
      return a.rank - b.rank;
    });
    var iNonEmptyPath = paths.findIndex(function (p) {
      return p.rank !== 0;
    });

    if (iNonEmptyPath < 0) {
      return '';
    }

    var nPaths = paths.length;
    var firstPath = paths[iNonEmptyPath];
    var highestPathsAreSame = true;

    for (var iPath = iNonEmptyPath + 1; iPath < nPaths; ++iPath) {
      var path = paths[iPath];

      if (path.rank !== firstPath.rank) {
        break;
      }

      if (path.path !== firstPath.path) {
        highestPathsAreSame = false;
        break;
      }
    }

    return highestPathsAreSame ? firstPath.path : '';
  };

  _proto._getLegacyData = function _getLegacyData() {
    if (!this._legacyData) {
      this._legacyData = this._toLegacy();
    }

    return this._legacyData;
  };

  _proto._toLegacy = function _toLegacy() {
    var keys = [];
    var legacyCurves = [];
    var commonTargets = [];
    var legacyClipData = new AnimationClipLegacyData(this._duration);
    legacyClipData.keys = keys;
    legacyClipData.curves = legacyCurves;
    legacyClipData.commonTargets = commonTargets;
    return legacyClipData;
  };

  _proto._fromLegacy = function _fromLegacy(legacyData) {
    var newTracks = legacyData.toTracks();
    var nNewTracks = newTracks.length;

    for (var iNewTrack = 0; iNewTrack < nNewTracks; ++iNewTrack) {
      this.addTrack(newTracks[iNewTrack]);
    }
  };

  _proto._collectAnimatedJoints = function _collectAnimatedJoints() {
    var joints = new Set();
    var tracks = this._tracks;
    var nTracks = tracks.length;

    for (var iTrack = 0; iTrack < nTracks; ++iTrack) {
      var track = tracks[iTrack];
      var trsPath = track[trackBindingTag].parseTrsPath();

      if (trsPath) {
        joints.add(trsPath.node);
      }
    }

    if (this._exoticAnimation) {
      var animatedJoints = this._exoticAnimation.collectAnimatedJoints();

      var nAnimatedJoints = animatedJoints.length;

      for (var iAnimatedJoint = 0; iAnimatedJoint < nAnimatedJoints; ++iAnimatedJoint) {
        joints.add(animatedJoints[iAnimatedJoint]);
      }
    }

    return Array.from(joints);
  };

  jsonAsset._createClass(AnimationClip, [{
    key: "duration",
    get: function get() {
      return this._duration;
    },
    set: function set(value) {
      this._duration = value;
    }
  }, {
    key: "tracksCount",
    get: function get() {
      return this._tracks.length;
    }
  }, {
    key: "tracks",
    get: function get() {
      return this._tracks;
    }
  }, {
    key: "hash",
    get: function get() {
      var _this$_exoticAnimatio, _this$_exoticAnimatio2;

      if (this._hash) {
        return this._hash;
      }

      var hashString = "Exotic:" + ((_this$_exoticAnimatio = (_this$_exoticAnimatio2 = this._exoticAnimation) === null || _this$_exoticAnimatio2 === void 0 ? void 0 : _this$_exoticAnimatio2.toHashString()) !== null && _this$_exoticAnimatio !== void 0 ? _this$_exoticAnimatio : '');
      return this._hash = jsonAsset.murmurhash2_32_gc(hashString, 666);
    }
  }, {
    key: "events",
    get: function get() {
      return this._events;
    },
    set: function set(value) {
      var _this3 = this;

      this._events = value;
      var ratios = [];
      var eventGroups = [];
      var events = this.events.sort(function (a, b) {
        return a.frame - b.frame;
      });
      var nEvents = events.length;

      var _loop = function _loop(iEvent) {
        var eventData = events[iEvent];
        var ratio = eventData.frame / _this3._duration;
        var i = ratios.findIndex(function (r) {
          return r === ratio;
        });

        if (i < 0) {
          i = ratios.length;
          ratios.push(ratio);
          eventGroups.push({
            events: []
          });
        }

        eventGroups[i].events.push({
          functionName: eventData.func,
          parameters: eventData.params
        });
      };

      for (var iEvent = 0; iEvent < nEvents; ++iEvent) {
        _loop(iEvent);
      }

      this._runtimeEvents = {
        ratios: ratios,
        eventGroups: eventGroups
      };
    }
  }, {
    key: exoticAnimationTag,
    get: function get() {
      return this._exoticAnimation;
    },
    set: function set(value) {
      this._exoticAnimation = value;
    }
  }, {
    key: "keys",
    get: function get() {
      return this._getLegacyData().keys;
    },
    set: function set(value) {
      this._legacyDataDirty = true;
      this._getLegacyData().keys = value;
    }
  }, {
    key: "curves",
    get: function get() {
      this._legacyDataDirty = true;
      return this._getLegacyData().curves;
    },
    set: function set(value) {
      this._getLegacyData().curves = value;
    }
  }, {
    key: "commonTargets",
    get: function get() {
      return this._getLegacyData().commonTargets;
    },
    set: function set(value) {
      this._legacyDataDirty = true;
      this._getLegacyData().commonTargets = value;
    }
  }, {
    key: "data",
    get: function get() {
      return this._getLegacyData().data;
    }
  }, {
    key: "eventGroups",
    get: function get() {
      return this._runtimeEvents.eventGroups;
    }
  }]);

  return AnimationClip;
}(jsonAsset.Asset), _class3.WrapMode = jsonAsset.WrapMode, _temp$7), (_descriptor$7 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "sample", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 60;
  }
}), _descriptor2$5 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "speed", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor3$2 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "wrapMode", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.WrapMode.Normal;
  }
}), _descriptor4$3 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "enableTrsBlending", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5$3 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_duration", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6$3 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_hash", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor7$1 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_tracks", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor8$1 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_exoticAnimation", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor9$1 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_events", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$7)) || _class$a);
jsonAsset.legacyCC.AnimationClip = AnimationClip;

var AnimationClipEvaluation = function () {
  function AnimationClipEvaluation(trackEvalStatuses, exoticAnimationEvaluator, rootMotionEvaluation) {
    this._exoticAnimationEvaluator = void 0;
    this._trackEvalStatues = [];
    this._rootMotionEvaluation = undefined;
    this._trackEvalStatues = trackEvalStatuses;
    this._exoticAnimationEvaluator = exoticAnimationEvaluator;
    this._rootMotionEvaluation = rootMotionEvaluation;
  }

  var _proto2 = AnimationClipEvaluation.prototype;

  _proto2.evaluate = function evaluate(time) {
    var trackEvalStatuses = this._trackEvalStatues,
        exoticAnimationEvaluator = this._exoticAnimationEvaluator;
    var nTrackEvalStatuses = trackEvalStatuses.length;

    for (var iTrackEvalStatus = 0; iTrackEvalStatus < nTrackEvalStatuses; ++iTrackEvalStatus) {
      var _trackEvalStatuses$iT = trackEvalStatuses[iTrackEvalStatus],
          trackEval = _trackEvalStatuses$iT.trackEval,
          binding = _trackEvalStatuses$iT.binding;
      var value = trackEval.evaluate(time, binding);
      binding.setValue(value);
    }

    if (exoticAnimationEvaluator) {
      exoticAnimationEvaluator.evaluate(time);
    }
  };

  _proto2.evaluateRootMotion = function evaluateRootMotion(time, motionLength) {
    var rootMotionEvaluation = this._rootMotionEvaluation;

    if (rootMotionEvaluation) {
      rootMotionEvaluation.evaluate(time, motionLength);
    }
  };

  return AnimationClipEvaluation;
}();

var BoneTransform = function () {
  function BoneTransform() {
    this.position = new jsonAsset.Vec3();
    this.scale = new jsonAsset.Vec3(1.0, 1.0, 1.0);
    this.rotation = new jsonAsset.Quat();
    this.eulerAngles = new jsonAsset.Vec3();
  }

  var _proto3 = BoneTransform.prototype;

  _proto3.getTransform = function getTransform(out) {
    jsonAsset.Mat4.fromRTS(out, this.rotation, this.position, this.scale);
  };

  return BoneTransform;
}();

var BoneGlobalTransform = function (_BoneTransform) {
  jsonAsset._inheritsLoose(BoneGlobalTransform, _BoneTransform);

  function BoneGlobalTransform() {
    var _this4;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _BoneTransform.call.apply(_BoneTransform, [this].concat(args)) || this;
    _this4.parent = null;
    _this4._dirty = true;
    _this4._transform = new jsonAsset.Mat4();
    return _this4;
  }

  var _proto4 = BoneGlobalTransform.prototype;

  _proto4.invalidate = function invalidate() {
    this._dirty = true;
  };

  jsonAsset._createClass(BoneGlobalTransform, [{
    key: "globalTransform",
    get: function get() {
      var transform = this._transform;

      if (this._dirty) {
        this._dirty = false;
        jsonAsset.Mat4.fromRTS(transform, this.rotation, this.position, this.scale);

        if (this.parent) {
          jsonAsset.Mat4.multiply(transform, this.parent.globalTransform, transform);
        }
      }

      return this._transform;
    }
  }]);

  return BoneGlobalTransform;
}(BoneTransform);

var motionTransformCache = new jsonAsset.Mat4();

var RootMotionEvaluation = function () {
  function RootMotionEvaluation(_rootBone, _duration, _boneTransform, _trackEvalStatuses) {
    this._initialTransformCache = new jsonAsset.Mat4();
    this._clipEndTransformCache = new jsonAsset.Mat4();
    this._startTransformCache = new jsonAsset.Mat4();
    this._endTransformCache = new jsonAsset.Mat4();
    this._motionTransformCache = new jsonAsset.Mat4();
    this._translationMotionCache = new jsonAsset.Vec3();
    this._rotationMotionCache = new jsonAsset.Quat();
    this._scaleMotionCache = new jsonAsset.Vec3();
    this._rootBone = _rootBone;
    this._duration = _duration;
    this._boneTransform = _boneTransform;
    this._trackEvalStatuses = _trackEvalStatuses;
  }

  var _proto5 = RootMotionEvaluation.prototype;

  _proto5.evaluate = function evaluate(time, motionLength) {
    var motionTransform = this._calcMotionTransform(time, motionLength, this._motionTransformCache);

    var translationMotion = this._translationMotionCache,
        rotationMotion = this._rotationMotionCache,
        scaleMotion = this._scaleMotionCache,
        rootBone = this._rootBone;
    jsonAsset.Mat4.toRTS(motionTransform, rotationMotion, translationMotion, scaleMotion);
    jsonAsset.Vec3.add(translationMotion, translationMotion, rootBone.position);
    rootBone.setPosition(translationMotion);
    jsonAsset.Quat.multiply(rotationMotion, rotationMotion, rootBone.rotation);
    rootBone.setRotation(rotationMotion);
    jsonAsset.Vec3.multiply(scaleMotion, scaleMotion, rootBone.scale);
    rootBone.setScale(scaleMotion);
  };

  _proto5._calcMotionTransform = function _calcMotionTransform(time, motionLength, outTransform) {
    var duration = this._duration;
    var remainLength = duration - time;

    var startTransform = this._evaluateAt(time, this._startTransformCache);

    if (motionLength < remainLength) {
      var endTransform = this._evaluateAt(time + motionLength, this._endTransformCache);

      relativeTransform(outTransform, startTransform, endTransform);
    } else {
      jsonAsset.Mat4.identity(outTransform);

      var accumulateMotionTransform = function accumulateMotionTransform(from, to) {
        relativeTransform(motionTransformCache, from, to);
        jsonAsset.Mat4.multiply(outTransform, outTransform, motionTransformCache);
      };

      var diff = motionLength - remainLength;
      var repeatCount = Math.floor(diff / duration);
      var lastRemainTime = diff - repeatCount * duration;

      var clipStartTransform = this._evaluateAt(0, this._initialTransformCache);

      var clipEndTransform = this._evaluateAt(duration, this._clipEndTransformCache);

      var _endTransform = this._evaluateAt(lastRemainTime, this._endTransformCache);

      accumulateMotionTransform(startTransform, clipEndTransform);
      relativeTransform(motionTransformCache, clipStartTransform, clipEndTransform);

      for (var i = 0; i < repeatCount; ++i) {
        jsonAsset.Mat4.multiply(outTransform, outTransform, motionTransformCache);
      }

      accumulateMotionTransform(clipStartTransform, _endTransform);
    }

    return outTransform;
  };

  _proto5._evaluateAt = function _evaluateAt(time, outTransform) {
    var trackEvalStatuses = this._trackEvalStatuses;
    var nTrackEvalStatuses = trackEvalStatuses.length;

    for (var iTrackEvalStatus = 0; iTrackEvalStatus < nTrackEvalStatuses; ++iTrackEvalStatus) {
      var _trackEvalStatuses$iT2 = trackEvalStatuses[iTrackEvalStatus],
          trackEval = _trackEvalStatuses$iT2.trackEval,
          binding = _trackEvalStatuses$iT2.binding;
      var value = trackEval.evaluate(time, binding);
      binding.setValue(value);
    }

    this._boneTransform.getTransform(outTransform);

    return outTransform;
  };

  return RootMotionEvaluation;
}();

function relativeTransform(out, from, to) {
  jsonAsset.Mat4.invert(out, from);
  jsonAsset.Mat4.multiply(out, to, out);
}

function createBoneTransformBinding(boneTransform, property) {
  switch (property) {
    default:
      return undefined;

    case 'position':
      return {
        setValue: function setValue(value) {
          jsonAsset.Vec3.copy(boneTransform.position, value);
        }
      };

    case 'rotation':
      return {
        setValue: function setValue(value) {
          jsonAsset.Quat.copy(boneTransform.rotation, value);
        }
      };

    case 'scale':
      return {
        setValue: function setValue(value) {
          jsonAsset.Vec3.copy(boneTransform.scale, value);
        }
      };

    case 'eulerAngles':
      return {
        setValue: function setValue(value) {
          jsonAsset.Vec3.copy(boneTransform.eulerAngles, value);
        }
      };
  }
}

var InvalidIndex = -1;

var EventEvaluator = function () {
  function EventEvaluator(_targetNode, _ratios, _eventGroups, _wrapMode) {
    this._lastFrameIndex = -1;
    this._lastIterations = 0.0;
    this._lastDirection = 0;
    this._ignoreIndex = InvalidIndex;
    this._sampled = false;
    this._targetNode = _targetNode;
    this._ratios = _ratios;
    this._eventGroups = _eventGroups;
    this._wrapMode = _wrapMode;
  }

  var _proto6 = EventEvaluator.prototype;

  _proto6.setWrapMode = function setWrapMode(wrapMode) {
    this._wrapMode = wrapMode;
  };

  _proto6.ignore = function ignore(ratio, direction) {
    this._ignoreIndex = InvalidIndex;
    this._sampled = false;
    var frameIndex = getEventGroupIndexAtRatio(ratio, this._ratios);

    if (frameIndex < 0) {
      frameIndex = ~frameIndex - 1;

      if (direction < 0) {
        frameIndex += 1;
      }

      this._ignoreIndex = frameIndex;
    }
  };

  _proto6.sample = function sample(ratio, direction, iterations) {
    var length = this._eventGroups.length;
    var eventIndex = getEventGroupIndexAtRatio(ratio, this._ratios);

    if (eventIndex < 0) {
      eventIndex = ~eventIndex - 1;

      if (direction < 0) {
        eventIndex += 1;
      }
    }

    if (this._ignoreIndex !== eventIndex) {
      this._ignoreIndex = InvalidIndex;
    }

    if (!this._sampled) {
      this._sampled = true;

      this._doFire(eventIndex, false);

      this._lastFrameIndex = eventIndex;
      this._lastIterations = iterations;
      this._lastDirection = direction;
      return;
    }

    var wrapMode = this._wrapMode;
    var currentIterations = wrapIterations(iterations);
    var lastIterations = wrapIterations(this._lastIterations);
    var lastIndex = this._lastFrameIndex;
    var lastDirection = this._lastDirection;
    var iterationsChanged = lastIterations !== -1 && currentIterations !== lastIterations;

    if (lastIndex === eventIndex && iterationsChanged && length === 1) {
      this._doFire(0, false);
    } else if (lastIndex !== eventIndex || iterationsChanged) {
      direction = lastDirection;

      do {
        if (lastIndex !== eventIndex) {
          if (direction === -1 && lastIndex === 0 && eventIndex > 0) {
            if ((wrapMode & jsonAsset.WrapModeMask.PingPong) === jsonAsset.WrapModeMask.PingPong) {
              direction *= -1;
            } else {
              lastIndex = length;
            }

            lastIterations++;
          } else if (direction === 1 && lastIndex === length - 1 && eventIndex < length - 1) {
            if ((wrapMode & jsonAsset.WrapModeMask.PingPong) === jsonAsset.WrapModeMask.PingPong) {
              direction *= -1;
            } else {
              lastIndex = -1;
            }

            lastIterations++;
          }

          if (lastIndex === eventIndex) {
            break;
          }

          if (lastIterations > currentIterations) {
            break;
          }
        }

        lastIndex += direction;

        this._doFire(lastIndex, true);
      } while (lastIndex !== eventIndex && lastIndex > -1 && lastIndex < length);
    }

    this._lastFrameIndex = eventIndex;
    this._lastIterations = iterations;
    this._lastDirection = direction;
  };

  _proto6._doFire = function _doFire(eventIndex, delay) {
    if (delay) {
      jsonAsset.legacyCC.director.getAnimationManager().pushDelayEvent(this._checkAndFire, this, [eventIndex]);
    } else {
      this._checkAndFire(eventIndex);
    }
  };

  _proto6._checkAndFire = function _checkAndFire(eventIndex) {
    if (!this._targetNode || !this._targetNode.isValid) {
      return;
    }

    var eventGroups = this._eventGroups;

    if (eventIndex < 0 || eventIndex >= eventGroups.length || this._ignoreIndex === eventIndex) {
      return;
    }

    var eventGroup = eventGroups[eventIndex];
    var components = this._targetNode.components;
    var nEvents = eventGroup.events.length;

    for (var iEvent = 0; iEvent < nEvents; ++iEvent) {
      var event = eventGroup.events[iEvent];
      var functionName = event.functionName;
      var nComponents = components.length;

      for (var iComponent = 0; iComponent < nComponents; ++iComponent) {
        var component = components[iComponent];
        var fx = component[functionName];

        if (typeof fx === 'function') {
          fx.apply(component, event.parameters);
        }
      }
    }
  };

  return EventEvaluator;
}();

function wrapIterations(iterations) {
  if (iterations - (iterations | 0) === 0) {
    iterations -= 1;
  }

  return iterations | 0;
}

function getEventGroupIndexAtRatio(ratio, ratios) {
  var result = jsonAsset.binarySearchEpsilon(ratios, ratio);
  return result;
}

var Playable = function () {
  function Playable() {
    this._isPlaying = false;
    this._isPaused = false;
    this._stepOnce = false;
  }

  var _proto = Playable.prototype;

  _proto.play = function play() {
    if (this._isPlaying) {
      if (this._isPaused) {
        this._isPaused = false;
        this.onResume();
      } else {
        this.onError(jsonAsset.getError(3912));
      }
    } else {
      this._isPlaying = true;
      this.onPlay();
    }
  };

  _proto.stop = function stop() {
    if (this._isPlaying) {
      this._isPlaying = false;
      this.onStop();
      this._isPaused = false;
    }
  };

  _proto.pause = function pause() {
    if (this._isPlaying && !this._isPaused) {
      this._isPaused = true;
      this.onPause();
    }
  };

  _proto.resume = function resume() {
    if (this._isPlaying && this._isPaused) {
      this._isPaused = false;
      this.onResume();
    }
  };

  _proto.step = function step() {
    this.pause();
    this._stepOnce = true;

    if (!this._isPlaying) {
      this.play();
    }
  };

  _proto.update = function update(deltaTime) {};

  _proto.onPlay = function onPlay() {};

  _proto.onPause = function onPause() {};

  _proto.onResume = function onResume() {};

  _proto.onStop = function onStop() {};

  _proto.onError = function onError(message) {};

  jsonAsset._createClass(Playable, [{
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
    key: "isMotionless",
    get: function get() {
      return !this.isPlaying || this.isPaused;
    }
  }]);

  return Playable;
}();

var PoseOutput = function () {
  function PoseOutput(pose) {
    this.weight = 0.0;
    this._pose = void 0;
    this._blendStateWriters = [];
    this._pose = pose;
  }

  var _proto = PoseOutput.prototype;

  _proto.destroy = function destroy() {
    for (var iBlendStateWriter = 0; iBlendStateWriter < this._blendStateWriters.length; ++iBlendStateWriter) {
      this._pose.destroyWriter(this._blendStateWriters[iBlendStateWriter]);
    }

    this._blendStateWriters.length = 0;
  };

  _proto.createPoseWriter = function createPoseWriter(node, property, constants) {
    var writer = this._pose.createWriter(node, property, this, constants);

    this._blendStateWriters.push(writer);

    return writer;
  };

  return PoseOutput;
}();

var EventType;

(function (EventType) {
  EventType["PLAY"] = "play";
  EventType["STOP"] = "stop";
  EventType["PAUSE"] = "pause";
  EventType["RESUME"] = "resume";
  EventType["LASTFRAME"] = "lastframe";
  EventType["FINISHED"] = "finished";
})(EventType || (EventType = {}));

jsonAsset.ccenum(EventType);
var AnimationState = function (_Playable) {
  jsonAsset._inheritsLoose(AnimationState, _Playable);

  jsonAsset._createClass(AnimationState, [{
    key: "clip",
    get: function get() {
      return this._clip;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "length",
    get: function get() {
      return this.duration;
    }
  }, {
    key: "wrapMode",
    get: function get() {
      return this._wrapMode;
    },
    set: function set(value) {
      var _this$_clipEventEval;

      this._wrapMode = value;
      this.time = 0;

      if (value & jsonAsset.WrapModeMask.Loop) {
        this.repeatCount = Infinity;
      } else {
        this.repeatCount = 1;
      }

      (_this$_clipEventEval = this._clipEventEval) === null || _this$_clipEventEval === void 0 ? void 0 : _this$_clipEventEval.setWrapMode(value);
    }
  }, {
    key: "repeatCount",
    get: function get() {
      return this._repeatCount;
    },
    set: function set(value) {
      this._repeatCount = value;
      var shouldWrap = this._wrapMode & jsonAsset.WrapModeMask.ShouldWrap;
      var reverse = (this.wrapMode & jsonAsset.WrapModeMask.Reverse) === jsonAsset.WrapModeMask.Reverse;

      if (value === Infinity && !shouldWrap && !reverse) {
        this._useSimpleProcess = true;
      } else {
        this._useSimpleProcess = false;
      }
    }
  }, {
    key: "delay",
    get: function get() {
      return this._delay;
    },
    set: function set(value) {
      this._delayTime = this._delay = value;
    }
  }, {
    key: "playbackRange",
    get: function get() {
      return this._playbackRange;
    },
    set: function set(value) {
      jsonAsset.assertIsTrue(value.max > value.min);
      this._playbackRange.min = Math.max(value.min, 0);
      this._playbackRange.max = Math.min(value.max, this.duration);
      this._playbackDuration = this._playbackRange.max - this._playbackRange.min;
      this.setTime(0.0);
    }
  }, {
    key: "current",
    get: function get() {
      return this.getWrappedInfo(this.time).time;
    }
  }, {
    key: "ratio",
    get: function get() {
      return this.current / this.duration;
    }
  }, {
    key: "weight",
    get: function get() {
      return this._weight;
    },
    set: function set(value) {
      this._weight = value;

      if (this._poseOutput) {
        this._poseOutput.weight = value;
      }
    }
  }]);

  function AnimationState(clip, name) {
    var _this;

    if (name === void 0) {
      name = '';
    }

    _this = _Playable.call(this) || this;
    _this.duration = 1.0;
    _this.speed = 1.0;
    _this.time = 0.0;
    _this.frameRate = 0;
    _this._targetNode = null;
    _this._curveLoaded = false;
    _this._clip = void 0;
    _this._useSimpleProcess = false;
    _this._target = null;
    _this._wrapMode = jsonAsset.WrapMode.Normal;
    _this._repeatCount = 1;
    _this._delay = 0.0;
    _this._delayTime = 0.0;
    _this._currentFramePlayed = false;
    _this._name = void 0;
    _this._lastIterations = NaN;
    _this._lastWrapInfo = null;
    _this._wrappedInfo = new jsonAsset.WrappedInfo();
    _this._allowLastFrame = false;
    _this._blendStateWriterHost = {
      weight: 0.0
    };
    _this._playbackDuration = 0.0;
    _this._invDuration = 1.0;
    _this._poseOutput = null;
    _this._weight = 0.0;
    _this._clipEval = void 0;
    _this._clipEventEval = void 0;
    _this._doNotCreateEval = false;
    _this._clip = clip;
    _this._name = name || clip && clip.name;
    _this._playbackRange = {
      min: 0.0,
      max: clip.duration
    };
    _this._playbackDuration = clip.duration;

    if (!clip.duration) {
      jsonAsset.debug$1("Clip " + clip.name + " has zero duration.");
    }

    return _this;
  }

  var _proto = AnimationState.prototype;

  _proto.initialize = function initialize(root) {
    if (this._curveLoaded) {
      return;
    }

    this._curveLoaded = true;

    if (this._poseOutput) {
      this._poseOutput.destroy();

      this._poseOutput = null;
    }

    if (this._clipEval) {
      this._clipEval = undefined;
    }

    this._targetNode = root;
    var clip = this._clip;
    this.duration = clip.duration;
    this._invDuration = 1.0 / this.duration;
    this.speed = clip.speed;
    this.wrapMode = clip.wrapMode;
    this.frameRate = clip.sample;
    this._playbackRange.min = 0.0;
    this._playbackRange.max = clip.duration;
    this._playbackDuration = clip.duration;

    if ((this.wrapMode & jsonAsset.WrapModeMask.Loop) === jsonAsset.WrapModeMask.Loop) {
      this.repeatCount = Infinity;
    } else {
      this.repeatCount = 1;
    }

    if (!this._doNotCreateEval) {
      var _legacyCC$director$ge, _legacyCC$director$ge2, _this$_poseOutput;

      var pose = (_legacyCC$director$ge = (_legacyCC$director$ge2 = jsonAsset.legacyCC.director.getAnimationManager()) === null || _legacyCC$director$ge2 === void 0 ? void 0 : _legacyCC$director$ge2.blendState) !== null && _legacyCC$director$ge !== void 0 ? _legacyCC$director$ge : null;

      if (pose) {
        this._poseOutput = new PoseOutput(pose);
      }

      this._clipEval = clip.createEvaluator({
        target: root,
        pose: (_this$_poseOutput = this._poseOutput) !== null && _this$_poseOutput !== void 0 ? _this$_poseOutput : undefined
      });
    }

    {
      this._clipEventEval = clip.createEventEvaluator(this._targetNode);
    }
  };

  _proto.destroy = function destroy() {
    if (!this.isMotionless) {
      jsonAsset.legacyCC.director.getAnimationManager().removeAnimation(this);
    }

    if (this._poseOutput) {
      this._poseOutput.destroy();

      this._poseOutput = null;
    }

    this._clipEval = undefined;
  };

  _proto.emit = function emit() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    jsonAsset.legacyCC.director.getAnimationManager().pushDelayEvent(this._emit, this, args);
  };

  _proto.on = function on(type, callback, target) {
    if (this._target && this._target.isValid) {
      return this._target.on(type, callback, target);
    } else {
      return null;
    }
  };

  _proto.once = function once(type, callback, target) {
    if (this._target && this._target.isValid) {
      return this._target.once(type, callback, target);
    } else {
      return null;
    }
  };

  _proto.off = function off(type, callback, target) {
    if (this._target && this._target.isValid) {
      this._target.off(type, callback, target);
    }
  };

  _proto.allowLastFrameEvent = function allowLastFrameEvent(allowed) {
    this._allowLastFrame = allowed;
  };

  _proto._setEventTarget = function _setEventTarget(target) {
    this._target = target;
  };

  _proto.setTime = function setTime(time) {
    this._currentFramePlayed = false;
    this.time = time || 0.0;

    {
      var _this$_clipEventEval2;

      var info = this.getWrappedInfo(time, this._wrappedInfo);
      (_this$_clipEventEval2 = this._clipEventEval) === null || _this$_clipEventEval2 === void 0 ? void 0 : _this$_clipEventEval2.ignore(info.ratio, info.direction);
    }
  };

  _proto.update = function update(delta) {
    if (this._delayTime > 0.0) {
      this._delayTime -= delta;

      if (this._delayTime > 0.0) {
        return;
      }
    }

    if (this._currentFramePlayed) {
      this.time += delta * this.speed;
    } else {
      this._currentFramePlayed = true;
    }

    this._process();
  };

  _proto.sample = function sample() {
    var info = this.getWrappedInfo(this.time, this._wrappedInfo);

    this._sampleCurves(info.time);

    {
      this._sampleEvents(info);
    }

    return info;
  };

  _proto.onPlay = function onPlay() {
    this.setTime(0.0);
    this._delayTime = this._delay;

    this._onReplayOrResume();

    this.emit(EventType.PLAY, this);
  };

  _proto.onStop = function onStop() {
    if (!this.isPaused) {
      this._onPauseOrStop();
    }

    this.emit(EventType.STOP, this);
  };

  _proto.onResume = function onResume() {
    this._onReplayOrResume();

    this.emit(EventType.RESUME, this);
  };

  _proto.onPause = function onPause() {
    this._onPauseOrStop();

    this.emit(EventType.PAUSE, this);
  };

  _proto._sampleCurves = function _sampleCurves(time) {
    var poseOutput = this._poseOutput,
        clipEval = this._clipEval;

    if (poseOutput) {
      poseOutput.weight = this.weight;
    }

    if (clipEval) {
      clipEval.evaluate(time);
    }
  };

  _proto._process = function _process() {
    if (this._useSimpleProcess) {
      this.simpleProcess();
    } else {
      this.process();
    }
  };

  _proto.process = function process() {
    var info = this.sample();

    if (this._allowLastFrame) {
      var lastInfo;

      if (!this._lastWrapInfo) {
        lastInfo = this._lastWrapInfo = new jsonAsset.WrappedInfo(info);
      } else {
        lastInfo = this._lastWrapInfo;
      }

      if (this.repeatCount > 1 && (info.iterations | 0) > (lastInfo.iterations | 0)) {
        this.emit(EventType.LASTFRAME, this);
      }

      lastInfo.set(info);
    }

    if (info.stopped) {
      this.stop();
      this.emit(EventType.FINISHED, this);
    }
  };

  _proto.simpleProcess = function simpleProcess() {
    var playbackStart = this._playbackRange.min;
    var playbackDuration = this._playbackDuration;
    var time = this.time % playbackDuration;

    if (time < 0.0) {
      time += playbackDuration;
    }

    var realTime = playbackStart + time;
    var ratio = realTime * this._invDuration;

    this._sampleCurves(playbackStart + time);

    {
      this._sampleEvents(this.getWrappedInfo(this.time, this._wrappedInfo));
    }

    if (this._allowLastFrame) {
      if (Number.isNaN(this._lastIterations)) {
        this._lastIterations = ratio;
      }

      if (this.time > 0 && this._lastIterations > ratio || this.time < 0 && this._lastIterations < ratio) {
        this.emit(EventType.LASTFRAME, this);
      }

      this._lastIterations = ratio;
    }
  };

  _proto._needReverse = function _needReverse(currentIterations) {
    var wrapMode = this.wrapMode;
    var needReverse = false;

    if ((wrapMode & jsonAsset.WrapModeMask.PingPong) === jsonAsset.WrapModeMask.PingPong) {
      var isEnd = currentIterations - (currentIterations | 0) === 0;

      if (isEnd && currentIterations > 0) {
        currentIterations -= 1;
      }

      var isOddIteration = currentIterations & 1;

      if (isOddIteration) {
        needReverse = !needReverse;
      }
    }

    if ((wrapMode & jsonAsset.WrapModeMask.Reverse) === jsonAsset.WrapModeMask.Reverse) {
      needReverse = !needReverse;
    }

    return needReverse;
  };

  _proto.getWrappedInfo = function getWrappedInfo(time, info) {
    info = info || new jsonAsset.WrappedInfo();

    var playbackStart = this._getPlaybackStart();

    var playbackEnd = this._getPlaybackEnd();

    var playbackDuration = playbackEnd - playbackStart;
    var stopped = false;
    var repeatCount = this.repeatCount;
    var currentIterations = time > 0 ? time / playbackDuration : -(time / playbackDuration);

    if (currentIterations >= repeatCount) {
      currentIterations = repeatCount;
      stopped = true;
      var tempRatio = repeatCount - (repeatCount | 0);

      if (tempRatio === 0) {
        tempRatio = 1;
      }

      time = tempRatio * playbackDuration * (time > 0 ? 1 : -1);
    }

    if (time > playbackDuration) {
      var tempTime = time % playbackDuration;
      time = tempTime === 0 ? playbackDuration : tempTime;
    } else if (time < 0) {
      time %= playbackDuration;

      if (time !== 0) {
        time += playbackDuration;
      }
    }

    var needReverse = false;
    var shouldWrap = this._wrapMode & jsonAsset.WrapModeMask.ShouldWrap;

    if (shouldWrap) {
      needReverse = this._needReverse(currentIterations);
    }

    var direction = needReverse ? -1 : 1;

    if (this.speed < 0) {
      direction *= -1;
    }

    if (shouldWrap && needReverse) {
      time = playbackDuration - time;
    }

    info.time = playbackStart + time;
    info.ratio = info.time / this.duration;
    info.direction = direction;
    info.stopped = stopped;
    info.iterations = currentIterations;
    return info;
  };

  _proto._getPlaybackStart = function _getPlaybackStart() {
    return this._playbackRange.min;
  };

  _proto._getPlaybackEnd = function _getPlaybackEnd() {
    return this._playbackRange.max;
  };

  _proto._sampleEvents = function _sampleEvents(wrapInfo) {
    var _this$_clipEventEval3;

    (_this$_clipEventEval3 = this._clipEventEval) === null || _this$_clipEventEval3 === void 0 ? void 0 : _this$_clipEventEval3.sample(wrapInfo.ratio, wrapInfo.direction, wrapInfo.iterations);
  };

  _proto._emit = function _emit(type, state) {
    if (this._target && this._target.isValid) {
      this._target.emit(type, type, state);
    }
  };

  _proto._onReplayOrResume = function _onReplayOrResume() {
    jsonAsset.legacyCC.director.getAnimationManager().addAnimation(this);
  };

  _proto._onPauseOrStop = function _onPauseOrStop() {
    jsonAsset.legacyCC.director.getAnimationManager().removeAnimation(this);
  };

  jsonAsset._createClass(AnimationState, [{
    key: "curveLoaded",
    get: function get() {
      return this._curveLoaded;
    }
  }]);

  return AnimationState;
}(Playable);
jsonAsset.legacyCC.AnimationState = AnimationState;

var CrossFade = function (_Playable) {
  jsonAsset._inheritsLoose(CrossFade, _Playable);

  function CrossFade(scheduler) {
    var _this;

    _this = _Playable.call(this) || this;
    _this._managedStates = [];
    _this._fadings = [];
    _this._scheduled = false;
    _this._scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : jsonAsset.legacyCC.director.getAnimationManager();
    return _this;
  }

  var _proto = CrossFade.prototype;

  _proto.update = function update(deltaTime) {
    if (this.isMotionless) {
      return;
    }

    var managedStates = this._managedStates;
    var fadings = this._fadings;

    if (managedStates.length === 1 && fadings.length === 1) {
      var state = managedStates[0].state;

      if (state) {
        state.weight = 1.0;
      }
    } else {
      this._calculateWeights(deltaTime);
    }

    if (managedStates.length === 1 && fadings.length === 1) {
      this._unscheduleThis();
    }
  };

  _proto.crossFade = function crossFade(state, duration) {
    var _target$state;

    if (this._managedStates.length === 0) {
      duration = 0;
    }

    if (duration === 0) {
      this.clear();
    }

    var target = this._managedStates.find(function (weightedState) {
      return weightedState.state === state;
    });

    if (!target) {
      target = {
        state: state,
        reference: 0
      };

      if (state) {
        state.play();
      }

      this._managedStates.push(target);
    } else if ((_target$state = target.state) === null || _target$state === void 0 ? void 0 : _target$state.isMotionless) {
      target.state.play();
    }

    ++target.reference;

    this._fadings.unshift({
      easeDuration: duration,
      easeTime: 0,
      target: target
    });

    if (!this.isMotionless) {
      this._scheduleThis();
    }
  };

  _proto.clear = function clear() {
    for (var iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
      var state = this._managedStates[iManagedState].state;

      if (state) {
        state.stop();
      }
    }

    this._managedStates.length = 0;
    this._fadings.length = 0;
  };

  _proto.onPlay = function onPlay() {
    _Playable.prototype.onPlay.call(this);

    this._scheduleThis();
  };

  _proto.onPause = function onPause() {
    _Playable.prototype.onPause.call(this);

    for (var iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
      var state = this._managedStates[iManagedState].state;

      if (state) {
        state.pause();
      }
    }

    this._unscheduleThis();
  };

  _proto.onResume = function onResume() {
    _Playable.prototype.onResume.call(this);

    for (var iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
      var state = this._managedStates[iManagedState].state;

      if (state) {
        state.resume();
      }
    }

    this._scheduleThis();
  };

  _proto.onStop = function onStop() {
    _Playable.prototype.onStop.call(this);

    this.clear();
  };

  _proto._calculateWeights = function _calculateWeights(deltaTime) {
    var managedStates = this._managedStates;
    var fadings = this._fadings;

    for (var iManagedState = 0; iManagedState < managedStates.length; ++iManagedState) {
      var state = managedStates[iManagedState].state;

      if (state) {
        state.weight = 0;
      }
    }

    var absoluteWeight = 1.0;
    var deadFadingBegin = fadings.length;

    for (var iFading = 0; iFading < fadings.length; ++iFading) {
      var fading = fadings[iFading];
      fading.easeTime += deltaTime;
      var relativeWeight = fading.easeDuration === 0 ? 1 : jsonAsset.clamp01(fading.easeTime / fading.easeDuration);
      var weight = relativeWeight * absoluteWeight;
      absoluteWeight *= 1.0 - relativeWeight;

      if (fading.target.state) {
        fading.target.state.weight += weight;
      }

      if (fading.easeTime >= fading.easeDuration) {
        deadFadingBegin = iFading + 1;
        fading.easeTime = fading.easeDuration;
        break;
      }
    }

    if (deadFadingBegin !== fadings.length) {
      for (var iDeadFading = deadFadingBegin; iDeadFading < fadings.length; ++iDeadFading) {
        var deadFading = fadings[iDeadFading];
        --deadFading.target.reference;

        if (deadFading.target.reference <= 0) {
          if (deadFading.target.state) {
            deadFading.target.state.stop();
          }

          jsonAsset.remove(this._managedStates, deadFading.target);
        }
      }

      fadings.splice(deadFadingBegin);
    }
  };

  _proto._scheduleThis = function _scheduleThis() {
    if (!this._scheduled) {
      this._scheduler.addCrossFade(this);

      this._scheduled = true;
    }
  };

  _proto._unscheduleThis = function _unscheduleThis() {
    if (this._scheduled) {
      this._scheduler.removeCrossFade(this);

      this._scheduled = false;
    }
  };

  return CrossFade;
}(Playable);

var _dec$b, _dec2$5, _dec3$2, _dec4$2, _dec5$2, _dec6$1, _dec7$1, _dec8, _dec9, _dec10, _class$b, _class2$8, _descriptor$8, _descriptor2$6, _descriptor3$3, _class3$1, _temp$8;
var Animation = (_dec$b = jsonAsset.ccclass('cc.Animation'), _dec2$5 = jsonAsset.help(), _dec3$2 = jsonAsset.executionOrder(99), _dec4$2 = jsonAsset.menu(), _dec5$2 = jsonAsset.type([AnimationClip]), _dec6$1 = jsonAsset.tooltip(), _dec7$1 = jsonAsset.type(AnimationClip), _dec8 = jsonAsset.tooltip(), _dec9 = jsonAsset.tooltip(), _dec10 = jsonAsset.type([AnimationClip]), _dec$b(_class$b = _dec2$5(_class$b = _dec3$2(_class$b = jsonAsset.executeInEditMode(_class$b = _dec4$2(_class$b = (_class2$8 = (_temp$8 = _class3$1 = function (_Eventify) {
  jsonAsset._inheritsLoose(Animation, _Eventify);

  function Animation() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Eventify.call.apply(_Eventify, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "playOnLoad", _descriptor$8, jsonAsset._assertThisInitialized(_this));

    _this._crossFade = new CrossFade();
    _this._nameToState = jsonAsset.createMap(true);

    jsonAsset._initializerDefineProperty(_this, "_clips", _descriptor2$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_defaultClip", _descriptor3$3, jsonAsset._assertThisInitialized(_this));

    _this._hasBeenPlayed = false;
    return _this;
  }

  var _proto = Animation.prototype;

  _proto.onLoad = function onLoad() {
    this.clips = this._clips;

    for (var stateName in this._nameToState) {
      var state = this._nameToState[stateName];
      state.initialize(this.node);
    }
  };

  _proto.start = function start() {
    if ( this.playOnLoad && !this._hasBeenPlayed && this._defaultClip) {
      this.crossFade(this._defaultClip.name, 0);
    }
  };

  _proto.onEnable = function onEnable() {
    this._crossFade.resume();
  };

  _proto.onDisable = function onDisable() {
    this._crossFade.pause();
  };

  _proto.onDestroy = function onDestroy() {
    this._crossFade.stop();

    for (var name in this._nameToState) {
      var state = this._nameToState[name];
      state.destroy();
    }

    this._nameToState = jsonAsset.createMap(true);
  };

  _proto.play = function play(name) {
    this._hasBeenPlayed = true;

    if (!name) {
      if (!this._defaultClip) {
        return;
      }

      name = this._defaultClip.name;
    }

    this.crossFade(name, 0);
  };

  _proto.crossFade = function crossFade(name, duration) {
    if (duration === void 0) {
      duration = 0.3;
    }

    this._hasBeenPlayed = true;
    var state = this._nameToState[name];

    if (state) {
      this._crossFade.play();

      this._crossFade.crossFade(state, duration);
    }
  };

  _proto.pause = function pause() {
    this._crossFade.pause();
  };

  _proto.resume = function resume() {
    this._crossFade.resume();
  };

  _proto.stop = function stop() {
    this._crossFade.stop();
  };

  _proto.getAnimationState = function getAnimationState(name) {
    return this.getState(name);
  };

  _proto.getState = function getState(name) {
    var state = this._nameToState[name];

    if (state && !state.curveLoaded) {
      state.initialize(this.node);
    }

    return state || null;
  };

  _proto.createState = function createState(clip, name) {
    name = name || clip.name;
    this.removeState(name);
    return this._doCreateState(clip, name);
  };

  _proto.removeState = function removeState(name) {
    var state = this._nameToState[name];

    if (state) {
      state.allowLastFrameEvent(false);
      state.stop();
      delete this._nameToState[name];
    }
  };

  _proto.addClip = function addClip(clip, name) {
    if (!jsonAsset.contains(this._clips, clip)) {
      this._clips.push(clip);
    }

    return this.createState(clip, name);
  };

  _proto.removeClip = function removeClip(clip, force) {
    var removalState;

    for (var name in this._nameToState) {
      var state = this._nameToState[name];
      var stateClip = state.clip;

      if (stateClip === clip) {
        removalState = state;
        break;
      }
    }

    if (clip === this._defaultClip) {
      if (force) {
        this._defaultClip = null;
      } else {
        {
          jsonAsset.warnID(3902);
        }

        return;
      }
    }

    if (removalState && removalState.isPlaying) {
      if (force) {
        removalState.stop();
      } else {
        {
          jsonAsset.warnID(3903);
        }

        return;
      }
    }

    this._clips = this._clips.filter(function (item) {
      return item !== clip;
    });

    if (removalState) {
      delete this._nameToState[removalState.name];
    }
  };

  _proto.on = function on(type, callback, thisArg, once) {
    var ret = _Eventify.prototype.on.call(this, type, callback, thisArg, once);

    if (type === EventType.LASTFRAME) {
      this._syncAllowLastFrameEvent();
    }

    return ret;
  };

  _proto.once = function once(type, callback, thisArg) {
    var ret = _Eventify.prototype.once.call(this, type, callback, thisArg);

    if (type === EventType.LASTFRAME) {
      this._syncAllowLastFrameEvent();
    }

    return ret;
  };

  _proto.off = function off(type, callback, thisArg) {
    _Eventify.prototype.off.call(this, type, callback, thisArg);

    if (type === EventType.LASTFRAME) {
      this._syncDisallowLastFrameEvent();
    }
  };

  _proto._createState = function _createState(clip, name) {
    return new AnimationState(clip, name);
  };

  _proto._doCreateState = function _doCreateState(clip, name) {
    var state = this._createState(clip, name);

    state._setEventTarget(this);

    state.allowLastFrameEvent(this.hasEventListener(EventType.LASTFRAME));

    if (this.node) {
      state.initialize(this.node);
    }

    this._nameToState[state.name] = state;
    return state;
  };

  _proto._getStateByNameOrDefaultClip = function _getStateByNameOrDefaultClip(name) {
    if (!name) {
      if (!this._defaultClip) {
        return null;
      }

      name = this._defaultClip.name;
    }

    var state = this._nameToState[name];

    if (state) {
      return state;
    }

    return null;
  };

  _proto._removeStateOfAutomaticClip = function _removeStateOfAutomaticClip(clip) {
    for (var name in this._nameToState) {
      var state = this._nameToState[name];

      if (equalClips(clip, state.clip)) {
        state.stop();
        delete this._nameToState[name];
      }
    }
  };

  _proto._syncAllowLastFrameEvent = function _syncAllowLastFrameEvent() {
    if (this.hasEventListener(EventType.LASTFRAME)) {
      for (var stateName in this._nameToState) {
        this._nameToState[stateName].allowLastFrameEvent(true);
      }
    }
  };

  _proto._syncDisallowLastFrameEvent = function _syncDisallowLastFrameEvent() {
    if (!this.hasEventListener(EventType.LASTFRAME)) {
      for (var stateName in this._nameToState) {
        this._nameToState[stateName].allowLastFrameEvent(false);
      }
    }
  };

  jsonAsset._createClass(Animation, [{
    key: "clips",
    get: function get() {
      return this._clips;
    },
    set: function set(value) {
      var _this2 = this;

      if (this._crossFade) {
        this._crossFade.clear();
      }

      for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._clips), _step; !(_step = _iterator()).done;) {
        var clip = _step.value;

        if (clip) {
          this._removeStateOfAutomaticClip(clip);
        }
      }

      for (var _iterator2 = jsonAsset._createForOfIteratorHelperLoose(value), _step2; !(_step2 = _iterator2()).done;) {
        var _clip = _step2.value;

        if (_clip) {
          this.createState(_clip);
        }
      }

      var newDefaultClip = value.find(function (clip) {
        return equalClips(clip, _this2._defaultClip);
      });

      if (newDefaultClip) {
        this._defaultClip = newDefaultClip;
      } else {
        this._defaultClip = null;
      }

      this._clips = value;
    }
  }, {
    key: "defaultClip",
    get: function get() {
      return this._defaultClip;
    },
    set: function set(value) {
      this._defaultClip = value;

      if (!value) {
        return;
      }

      var isBoundedDefaultClip = this._clips.findIndex(function (clip) {
        return equalClips(clip, value);
      }) >= 0;

      if (!isBoundedDefaultClip) {
        this._clips.push(value);

        this.createState(value);
      }
    }
  }]);

  return Animation;
}(jsonAsset.Eventify(jsonAsset.Component)), _class3$1.EventType = EventType, _temp$8), (jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "clips", [_dec5$2, _dec6$1], Object.getOwnPropertyDescriptor(_class2$8.prototype, "clips"), _class2$8.prototype), jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "defaultClip", [_dec7$1, _dec8], Object.getOwnPropertyDescriptor(_class2$8.prototype, "defaultClip"), _class2$8.prototype), _descriptor$8 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "playOnLoad", [jsonAsset.serializable, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$6 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_clips", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3$3 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_defaultClip", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2$8)) || _class$b) || _class$b) || _class$b) || _class$b) || _class$b);

function equalClips(clip1, clip2) {
  if (clip1 === clip2) {
    return true;
  }

  return !!clip1 && !!clip2 && clip1._uuid === clip2._uuid && clip1._uuid;
}

var stack = [];
var pool = new Map();
function getWorldMatrix(transform, stamp) {
  var i = 0;
  var res = jsonAsset.Mat4.IDENTITY;

  while (transform) {
    if (transform.stamp === stamp || transform.stamp + 1 === stamp && !transform.node.hasChangedFlags) {
      res = transform.world;
      transform.stamp = stamp;
      break;
    }

    transform.stamp = stamp;
    stack[i++] = transform;
    transform = transform.parent;
  }

  while (i > 0) {
    transform = stack[--i];
    stack[i] = null;
    var node = transform.node;
    jsonAsset.Mat4.fromRTS(transform.local, node.rotation, node.position, node.scale);
    res = jsonAsset.Mat4.multiply(transform.world, res, transform.local);
  }

  return res;
}
function getTransform(node, root) {
  var joint = null;
  var i = 0;

  while (node !== root) {
    var id = node.uuid;

    if (pool.has(id)) {
      joint = pool.get(id);
      break;
    } else {
      joint = {
        node: node,
        local: new jsonAsset.Mat4(),
        world: new jsonAsset.Mat4(),
        stamp: -1,
        parent: null
      };
      pool.set(id, joint);
    }

    stack[i++] = joint;
    node = node.parent;
    joint = null;
  }

  var child;

  while (i > 0) {
    child = stack[--i];
    stack[i] = null;
    child.parent = joint;
    joint = child;
  }

  return joint;
}
function deleteTransform(node) {
  var transform = pool.get(node.uuid) || null;

  while (transform) {
    pool["delete"](transform.node.uuid);
    transform = transform.parent;
  }
}

var m4_1 = new jsonAsset.Mat4();
function getPathFromRoot(target, root) {
  var node = target;
  var path = '';

  while (node !== null && node !== root) {
    path = node.name + "/" + path;
    node = node.parent;
  }

  return path.slice(0, -1);
}
function getWorldTransformUntilRoot(target, root, outMatrix) {
  jsonAsset.Mat4.identity(outMatrix);

  while (target !== root) {
    jsonAsset.Mat4.fromRTS(m4_1, target.rotation, target.position, target.scale);
    jsonAsset.Mat4.multiply(outMatrix, m4_1, outMatrix);
    target = target.parent;
  }

  return outMatrix;
}

exports.AnimCurve = AnimCurve;
exports.Animation = Animation;
exports.AnimationClip = AnimationClip;
exports.AnimationState = AnimationState;
exports.ColorTrack = ColorTrack;
exports.ComponentPath = ComponentPath;
exports.CubicSplineNumberValue = CubicSplineNumberValue;
exports.CubicSplineQuatValue = CubicSplineQuatValue;
exports.CubicSplineVec2Value = CubicSplineVec2Value;
exports.CubicSplineVec3Value = CubicSplineVec3Value;
exports.CubicSplineVec4Value = CubicSplineVec4Value;
exports.EventInfo = EventInfo;
exports.HierarchyPath = HierarchyPath;
exports.ObjectTrack = ObjectTrack;
exports.QuatTrack = QuatTrack;
exports.RatioSampler = RatioSampler;
exports.RealTrack = RealTrack;
exports.SizeTrack = SizeTrack;
exports.SkelAnimDataHub = SkelAnimDataHub;
exports.Track = Track;
exports.TrackPath = TrackPath;
exports.VectorTrack = VectorTrack;
exports.bezier = bezier;
exports.bezierByTime = bezierByTime;
exports.computeRatioByType = computeRatioByType;
exports.deleteTransform = deleteTransform;
exports.getPathFromRoot = getPathFromRoot;
exports.getTransform = getTransform;
exports.getWorldMatrix = getWorldMatrix;
exports.getWorldTransformUntilRoot = getWorldTransformUntilRoot;
exports.isCustomPath = isCustomPath;
exports.isPropertyPath = isPropertyPath;
exports.sampleAnimationCurve = sampleAnimationCurve;
