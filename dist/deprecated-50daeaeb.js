'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var view = require('./view-c0f88f03.js');
var cameraComponent = require('./camera-component-c6f89e45.js');
var renderable2d = require('./renderable-2d-fa14364b.js');

var _dec, _dec2, _dec3, _dec4, _class;
var RenderRoot2D = (_dec = jsonAsset.ccclass('cc.RenderRoot2D'), _dec2 = jsonAsset.executionOrder(100), _dec3 = jsonAsset.menu(), _dec4 = jsonAsset.requireComponent(renderable2d.UITransform), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = jsonAsset.disallowMultiple(_class = jsonAsset.executeInEditMode(_class = function (_Component) {
  jsonAsset._inheritsLoose(RenderRoot2D, _Component);

  function RenderRoot2D() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RenderRoot2D.prototype;

  _proto.onEnable = function onEnable() {
    jsonAsset.legacyCC.director.root.batcher2D.addScreen(this);
  };

  _proto.onDisable = function onDisable() {
    jsonAsset.legacyCC.director.root.batcher2D.removeScreen(this);
  };

  _proto.onDestroy = function onDestroy() {
    jsonAsset.legacyCC.director.root.batcher2D.removeScreen(this);
  };

  return RenderRoot2D;
}(jsonAsset.Component)) || _class) || _class) || _class) || _class) || _class) || _class);

var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5, _dec6, _dec7, _dec8, _class$1, _class2, _descriptor, _descriptor2, _temp;

var _worldPos = new jsonAsset.Vec3();

var RenderMode = jsonAsset.Enum({
  OVERLAY: 0,
  INTERSPERSE: 1
});
var Canvas = (_dec$1 = jsonAsset.ccclass('cc.Canvas'), _dec2$1 = jsonAsset.help(), _dec3$1 = jsonAsset.executionOrder(100), _dec4$1 = jsonAsset.menu(), _dec5 = jsonAsset.type(cameraComponent.Camera), _dec6 = jsonAsset.tooltip(), _dec7 = jsonAsset.tooltip(), _dec8 = jsonAsset.type(cameraComponent.Camera), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3$1(_class$1 = _dec4$1(_class$1 = jsonAsset.executeInEditMode(_class$1 = jsonAsset.disallowMultiple(_class$1 = (_class2 = (_temp = function (_RenderRoot2D) {
  jsonAsset._inheritsLoose(Canvas, _RenderRoot2D);

  jsonAsset._createClass(Canvas, [{
    key: "renderMode",
    get: function get() {
      return this._renderMode;
    },
    set: function set(val) {
      this._renderMode = val;

      if (this._cameraComponent) {
        this._cameraComponent.priority = this._getViewPriority();
      }
    }
  }, {
    key: "cameraComponent",
    get: function get() {
      return this._cameraComponent;
    },
    set: function set(value) {
      if (this._cameraComponent === value) {
        return;
      }

      this._cameraComponent = value;

      this._onResizeCamera();
    }
  }, {
    key: "alignCanvasWithScreen",
    get: function get() {
      return this._alignCanvasWithScreen;
    },
    set: function set(value) {
      this._alignCanvasWithScreen = value;

      this._onResizeCamera();
    }
  }]);

  function Canvas() {
    var _this;

    _this = _RenderRoot2D.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_cameraComponent", _descriptor, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_alignCanvasWithScreen", _descriptor2, jsonAsset._assertThisInitialized(_this));

    _this._thisOnCameraResized = void 0;
    _this._fitDesignResolution = void 0;
    _this._pos = new jsonAsset.Vec3();
    _this._renderMode = RenderMode.OVERLAY;
    _this._thisOnCameraResized = _this._onResizeCamera.bind(jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = Canvas.prototype;

  _proto.__preload = function __preload() {
    var widget = this.getComponent('cc.Widget');

    if (widget) {
      widget.updateAlignment();
    }

    {
      if (this._cameraComponent) {
        this._cameraComponent._createCamera();

        this._cameraComponent.node.on(cameraComponent.Camera.TARGET_TEXTURE_CHANGE, this._thisOnCameraResized);
      }
    }

    this._onResizeCamera();

    this.node.on(jsonAsset.NodeEventType.TRANSFORM_CHANGED, this._thisOnCameraResized);
  };

  _proto.onEnable = function onEnable() {
    _RenderRoot2D.prototype.onEnable.call(this);

    if ( this._cameraComponent) {
      this._cameraComponent.node.on(cameraComponent.Camera.TARGET_TEXTURE_CHANGE, this._thisOnCameraResized);
    }
  };

  _proto.onDisable = function onDisable() {
    _RenderRoot2D.prototype.onDisable.call(this);

    if (this._cameraComponent) {
      this._cameraComponent.node.off(cameraComponent.Camera.TARGET_TEXTURE_CHANGE, this._thisOnCameraResized);
    }
  };

  _proto.onDestroy = function onDestroy() {
    _RenderRoot2D.prototype.onDestroy.call(this);

    this.node.off(jsonAsset.NodeEventType.TRANSFORM_CHANGED, this._thisOnCameraResized);
  };

  _proto._onResizeCamera = function _onResizeCamera() {
    if (this._cameraComponent && this._alignCanvasWithScreen) {
      if (this._cameraComponent.targetTexture) {
        var win = this._cameraComponent.targetTexture.window;

        if (this._cameraComponent.camera) {
          this._cameraComponent.camera.setFixedSize(win.width, win.height);
        }

        this._cameraComponent.orthoHeight = view.visibleRect.height / 2;
      } else if (view.game.canvas) {
        var size = view.game.canvas;

        if (this._cameraComponent.camera) {
          this._cameraComponent.camera.resize(size.width, size.height);
        }

        this._cameraComponent.orthoHeight = view.game.canvas.height / view.view.getScaleY() / 2;
      }

      this.node.getWorldPosition(_worldPos);

      this._cameraComponent.node.setWorldPosition(_worldPos.x, _worldPos.y, 1000);
    }
  };

  _proto._getViewPriority = function _getViewPriority() {
    if (this._cameraComponent) {
      var _this$cameraComponent;

      var priority = (_this$cameraComponent = this.cameraComponent) === null || _this$cameraComponent === void 0 ? void 0 : _this$cameraComponent.priority;
      priority = this._renderMode === RenderMode.OVERLAY ? priority | 1 << 30 : priority & ~(1 << 30);
      return priority;
    }

    return 0;
  };

  return Canvas;
}(RenderRoot2D), _temp), (jsonAsset._applyDecoratedDescriptor(_class2.prototype, "cameraComponent", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "cameraComponent"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "alignCanvasWithScreen", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "alignCanvasWithScreen"), _class2.prototype), _descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_cameraComponent", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_alignCanvasWithScreen", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2)) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1);
jsonAsset.legacyCC.Canvas = Canvas;

var _dec$2, _dec2$2, _dec3$2, _class$2, _temp$1;
var UIComponent = (_dec$2 = jsonAsset.ccclass('cc.UIComponent'), _dec2$2 = jsonAsset.requireComponent(renderable2d.UITransform), _dec3$2 = jsonAsset.executionOrder(110), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$2(_class$2 = jsonAsset.disallowMultiple(_class$2 = jsonAsset.executeInEditMode(_class$2 = (_temp$1 = function (_Component) {
  jsonAsset._inheritsLoose(UIComponent, _Component);

  function UIComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this._lastParent = null;
    _this.stencilStage = renderable2d.Stage.DISABLED;
    return _this;
  }

  var _proto = UIComponent.prototype;

  _proto.__preload = function __preload() {
    this.node._uiProps.uiComp = this;
  };

  _proto.onEnable = function onEnable() {};

  _proto.onDisable = function onDisable() {};

  _proto.onDestroy = function onDestroy() {
    if (this.node._uiProps.uiComp === this) {
      this.node._uiProps.uiComp = null;
    }
  };

  _proto.updateAssembler = function updateAssembler(render) {};

  _proto.postUpdateAssembler = function postUpdateAssembler(render) {};

  _proto.markForUpdateRenderData = function markForUpdateRenderData(enable) {
  };

  return UIComponent;
}(jsonAsset.Component), _temp$1)) || _class$2) || _class$2) || _class$2) || _class$2) || _class$2);

jsonAsset.removeProperty(UIComponent.prototype, 'UIComponent', [{
  name: '_visibility'
}, {
  name: 'setVisibility'
}]);
jsonAsset.replaceProperty(Canvas.prototype, 'Canvas.prototype', [{
  name: 'camera',
  newName: 'cameraComponent.camera',
  customGetter: function customGetter() {
    return this._cameraComponent.camera;
  }
}, {
  name: 'clearFlag',
  newName: 'cameraComponent.clearFlags',
  customGetter: function customGetter() {
    return this._cameraComponent ? this._cameraComponent.clearFlags : 0;
  },
  customSetter: function customSetter(val) {
    if (this._cameraComponent) this._cameraComponent.clearFlags = val;
  }
}, {
  name: 'color',
  newName: 'cameraComponent.clearColor',
  customGetter: function customGetter() {
    return this._cameraComponent ? this._cameraComponent.clearColor : jsonAsset.Color$1.BLACK;
  },
  customSetter: function customSetter(val) {
    if (this._cameraComponent) this._cameraComponent.clearColor = val;
  }
}, {
  name: 'priority',
  newName: 'cameraComponent.priority',
  customGetter: function customGetter() {
    return this._cameraComponent ? this._cameraComponent.priority : 0;
  },
  customSetter: function customSetter(val) {
    if (this._cameraComponent) this._cameraComponent.priority = val;
  }
}, {
  name: 'targetTexture',
  newName: 'cameraComponent.targetTexture',
  customGetter: function customGetter() {
    return this._cameraComponent ? this._cameraComponent.targetTexture : null;
  },
  customSetter: function customSetter(value) {
    if (this._cameraComponent) this._cameraComponent.targetTexture = value;
  }
}, {
  name: 'visibility',
  newName: 'cameraComponent.visibility',
  customGetter: function customGetter() {
    return this._cameraComponent ? this._cameraComponent.visibility : 0;
  }
}]);
jsonAsset.markAsWarning(renderable2d.Renderable2D.prototype, 'Renderable2D.prototype', [{
  name: 'srcBlendFactor',
  suggest: 'Please use a custom material to specify blending options instead.'
}, {
  name: 'dstBlendFactor',
  suggest: 'Please use a custom material to specify blending options instead.'
}]);
jsonAsset.markAsWarning(renderable2d.UITransform.prototype, 'UITransform.prototype', [{
  name: 'priority',
  suggest: "Please use setSiblingIndex to change index of the current node in its parent's children array."
}]);
jsonAsset.legacyCC.UITransformComponent = renderable2d.UITransform;
jsonAsset.js$1.setClassAlias(renderable2d.UITransform, 'cc.UITransformComponent');
jsonAsset.js$1.setClassAlias(renderable2d.Renderable2D, 'cc.RenderComponent');
jsonAsset.legacyCC.CanvasComponent = Canvas;
jsonAsset.js$1.setClassAlias(Canvas, 'cc.CanvasComponent');

exports.Canvas = Canvas;
exports.RenderRoot2D = RenderRoot2D;
exports.UIComponent = UIComponent;
