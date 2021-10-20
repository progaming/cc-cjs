'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var view = require('./view-c0f88f03.js');

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _class3, _temp;

var _temp_vec3_1 = new jsonAsset.Vec3();

var ProjectionType = jsonAsset.Enum(view.CameraProjection);
var FOVAxis = jsonAsset.Enum(view.CameraFOVAxis);
var Aperture = jsonAsset.Enum(view.CameraAperture);
var Shutter = jsonAsset.Enum(view.CameraShutter);
var ISO = jsonAsset.Enum(view.CameraISO);
var ClearFlag = jsonAsset.Enum({
  SKYBOX: view.SKYBOX_FLAG | jsonAsset.ClearFlagBit.DEPTH_STENCIL,
  SOLID_COLOR: jsonAsset.ClearFlagBit.ALL,
  DEPTH_ONLY: jsonAsset.ClearFlagBit.DEPTH_STENCIL,
  DONT_CLEAR: jsonAsset.ClearFlagBit.NONE
});
var Camera = (_dec = jsonAsset.ccclass('cc.Camera'), _dec2 = jsonAsset.help(), _dec3 = jsonAsset.menu(), _dec4 = jsonAsset.displayOrder(), _dec5 = jsonAsset.tooltip(), _dec6 = jsonAsset.type(jsonAsset.Layers.BitMask), _dec7 = jsonAsset.displayOrder(), _dec8 = jsonAsset.tooltip(), _dec9 = jsonAsset.type(ClearFlag), _dec10 = jsonAsset.displayOrder(), _dec11 = jsonAsset.tooltip(), _dec12 = jsonAsset.displayOrder(), _dec13 = jsonAsset.tooltip(), _dec14 = jsonAsset.displayOrder(), _dec15 = jsonAsset.tooltip(), _dec16 = jsonAsset.displayOrder(), _dec17 = jsonAsset.tooltip(), _dec18 = jsonAsset.type(ProjectionType), _dec19 = jsonAsset.displayOrder(), _dec20 = jsonAsset.tooltip(), _dec21 = jsonAsset.type(FOVAxis), _dec22 = jsonAsset.displayOrder(), _dec23 = jsonAsset.tooltip(), _dec24 = jsonAsset.displayOrder(), _dec25 = jsonAsset.tooltip(), _dec26 = jsonAsset.displayOrder(), _dec27 = jsonAsset.tooltip(), _dec28 = jsonAsset.displayOrder(), _dec29 = jsonAsset.tooltip(), _dec30 = jsonAsset.displayOrder(), _dec31 = jsonAsset.tooltip(), _dec32 = jsonAsset.type(Aperture), _dec33 = jsonAsset.displayOrder(), _dec34 = jsonAsset.tooltip(), _dec35 = jsonAsset.type(Shutter), _dec36 = jsonAsset.displayOrder(), _dec37 = jsonAsset.tooltip(), _dec38 = jsonAsset.type(ISO), _dec39 = jsonAsset.displayOrder(), _dec40 = jsonAsset.tooltip(), _dec41 = jsonAsset.displayOrder(), _dec42 = jsonAsset.tooltip(), _dec43 = jsonAsset.type(jsonAsset.RenderTexture), _dec44 = jsonAsset.displayOrder(), _dec45 = jsonAsset.tooltip(), _dec(_class = _dec2(_class = _dec3(_class = jsonAsset.executeInEditMode(_class = (_class2 = (_temp = _class3 = function (_Component) {
  jsonAsset._inheritsLoose(Camera, _Component);

  function Camera() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_projection", _descriptor, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_priority", _descriptor2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_fov", _descriptor3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_fovAxis", _descriptor4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_orthoHeight", _descriptor5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_near", _descriptor6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_far", _descriptor7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_color", _descriptor8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_depth", _descriptor9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_stencil", _descriptor10, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_clearFlags", _descriptor11, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_rect", _descriptor12, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_aperture", _descriptor13, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_shutter", _descriptor14, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_iso", _descriptor15, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_screenScale", _descriptor16, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_visibility", _descriptor17, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_targetTexture", _descriptor18, jsonAsset._assertThisInitialized(_this));

    _this._camera = null;
    _this._inEditorMode = false;
    _this._flows = undefined;
    return _this;
  }

  var _proto = Camera.prototype;

  _proto.onLoad = function onLoad() {
    this._createCamera();
  };

  _proto.onEnable = function onEnable() {
    this.node.hasChangedFlags |= jsonAsset.TransformBit.POSITION;

    if (this._camera) {
      this._attachToScene();
    }
  };

  _proto.onDisable = function onDisable() {
    if (this._camera) {
      this._detachFromScene();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (this._camera) {
      this._camera.destroy();

      this._camera = null;
    }

    if (this._targetTexture) {
      this._targetTexture.off('resize');
    }
  };

  _proto.screenPointToRay = function screenPointToRay(x, y, out) {
    if (!out) {
      out = jsonAsset.Ray.create();
    }

    if (this._camera) {
      this._camera.screenPointToRay(out, x, y);
    }

    return out;
  };

  _proto.worldToScreen = function worldToScreen(worldPos, out) {
    if (!out) {
      out = new jsonAsset.Vec3();
    }

    if (this._camera) {
      this._camera.worldToScreen(out, worldPos);
    }

    return out;
  };

  _proto.screenToWorld = function screenToWorld(screenPos, out) {
    if (!out) {
      out = this.node.getWorldPosition();
    }

    if (this._camera) {
      this._camera.screenToWorld(out, screenPos);
    }

    return out;
  };

  _proto.convertToUINode = function convertToUINode(wpos, uiNode, out) {
    if (!out) {
      out = new jsonAsset.Vec3();
    }

    if (!this._camera) {
      return out;
    }

    this.worldToScreen(wpos, _temp_vec3_1);
    var cmp = uiNode.getComponent('cc.UITransform');
    var designSize = view.view.getVisibleSize();
    var xoffset = _temp_vec3_1.x - this._camera.width * 0.5;
    var yoffset = _temp_vec3_1.y - this._camera.height * 0.5;
    _temp_vec3_1.x = xoffset / jsonAsset.legacyCC.view.getScaleX() + designSize.width * 0.5;
    _temp_vec3_1.y = yoffset / jsonAsset.legacyCC.view.getScaleY() + designSize.height * 0.5;

    if (cmp) {
      cmp.convertToNodeSpaceAR(_temp_vec3_1, out);
    }

    return out;
  };

  _proto._createCamera = function _createCamera() {
    if (!this._camera) {
      this._camera = jsonAsset.legacyCC.director.root.createCamera();

      this._camera.initialize({
        name: this.node.name,
        node: this.node,
        projection: this._projection,
        window: this._inEditorMode ? jsonAsset.legacyCC.director.root && jsonAsset.legacyCC.director.root.mainWindow : jsonAsset.legacyCC.director.root && jsonAsset.legacyCC.director.root.tempWindow,
        priority: this._priority
      });

      this._camera.viewport = this._rect;
      this._camera.fovAxis = this._fovAxis;
      this._camera.fov = jsonAsset.toRadian(this._fov);
      this._camera.orthoHeight = this._orthoHeight;
      this._camera.nearClip = this._near;
      this._camera.farClip = this._far;
      this._camera.clearColor = this._color;
      this._camera.clearDepth = this._depth;
      this._camera.clearStencil = this._stencil;
      this._camera.clearFlag = this._clearFlags;
      this._camera.visibility = this._visibility;
      this._camera.aperture = this._aperture;
      this._camera.shutter = this._shutter;
      this._camera.iso = this._iso;
    }

    this._updateTargetTexture();
  };

  _proto._attachToScene = function _attachToScene() {
    if (!this.node.scene || !this._camera) {
      return;
    }

    if (this._camera && this._camera.scene) {
      this._camera.scene.removeCamera(this._camera);
    }

    var rs = this._getRenderScene();

    rs.addCamera(this._camera);
  };

  _proto._detachFromScene = function _detachFromScene() {
    if (this._camera && this._camera.scene) {
      this._camera.scene.removeCamera(this._camera);
    }
  };

  _proto._checkTargetTextureEvent = function _checkTargetTextureEvent(old) {
    var _this2 = this;

    var resizeFunc = function resizeFunc(window) {
      if (_this2._camera) {
        _this2._camera.setFixedSize(window.width, window.height);
      }
    };

    if (old) {
      old.off('resize');
    }

    if (this._targetTexture) {
      this._targetTexture.on('resize', resizeFunc, this);
    }
  };

  _proto._updateTargetTexture = function _updateTargetTexture() {
    if (!this._camera) {
      return;
    }

    if (this._targetTexture) {
      var window = this._targetTexture.window;

      this._camera.changeTargetWindow(window);

      this._camera.setFixedSize(window.width, window.height);
    }
  };

  jsonAsset._createClass(Camera, [{
    key: "camera",
    get: function get() {
      return this._camera;
    }
  }, {
    key: "priority",
    get: function get() {
      return this._priority;
    },
    set: function set(val) {
      this._priority = val;

      if (this._camera) {
        this._camera.priority = val;
      }
    }
  }, {
    key: "visibility",
    get: function get() {
      return this._visibility;
    },
    set: function set(val) {
      this._visibility = val;

      if (this._camera) {
        this._camera.visibility = val;
      }
    }
  }, {
    key: "clearFlags",
    get: function get() {
      return this._clearFlags;
    },
    set: function set(val) {
      this._clearFlags = val;

      if (this._camera) {
        this._camera.clearFlag = val;
      }
    }
  }, {
    key: "clearColor",
    get: function get() {
      return this._color;
    },
    set: function set(val) {
      this._color.set(val);

      if (this._camera) {
        this._camera.clearColor = this._color;
      }
    }
  }, {
    key: "clearDepth",
    get: function get() {
      return this._depth;
    },
    set: function set(val) {
      this._depth = val;

      if (this._camera) {
        this._camera.clearDepth = val;
      }
    }
  }, {
    key: "clearStencil",
    get: function get() {
      return this._stencil;
    },
    set: function set(val) {
      this._stencil = val;

      if (this._camera) {
        this._camera.clearStencil = val;
      }
    }
  }, {
    key: "projection",
    get: function get() {
      return this._projection;
    },
    set: function set(val) {
      this._projection = val;

      if (this._camera) {
        this._camera.projectionType = val;
      }
    }
  }, {
    key: "fovAxis",
    get: function get() {
      return this._fovAxis;
    },
    set: function set(val) {
      if (val === this._fovAxis) {
        return;
      }

      this._fovAxis = val;

      if (this._camera) {
        this._camera.fovAxis = val;

        if (val === view.CameraFOVAxis.VERTICAL) {
          this.fov = this._fov * this._camera.aspect;
        } else {
          this.fov = this._fov / this._camera.aspect;
        }
      }
    }
  }, {
    key: "fov",
    get: function get() {
      return this._fov;
    },
    set: function set(val) {
      this._fov = val;

      if (this._camera) {
        this._camera.fov = jsonAsset.toRadian(val);
      }
    }
  }, {
    key: "orthoHeight",
    get: function get() {
      return this._orthoHeight;
    },
    set: function set(val) {
      this._orthoHeight = val;

      if (this._camera) {
        this._camera.orthoHeight = val;
      }
    }
  }, {
    key: "near",
    get: function get() {
      return this._near;
    },
    set: function set(val) {
      this._near = val;

      if (this._camera) {
        this._camera.nearClip = val;
      }
    }
  }, {
    key: "far",
    get: function get() {
      return this._far;
    },
    set: function set(val) {
      this._far = val;

      if (this._camera) {
        this._camera.farClip = val;
      }
    }
  }, {
    key: "aperture",
    get: function get() {
      return this._aperture;
    },
    set: function set(val) {
      this._aperture = val;

      if (this._camera) {
        this._camera.aperture = val;
      }
    }
  }, {
    key: "shutter",
    get: function get() {
      return this._shutter;
    },
    set: function set(val) {
      this._shutter = val;

      if (this._camera) {
        this._camera.shutter = val;
      }
    }
  }, {
    key: "iso",
    get: function get() {
      return this._iso;
    },
    set: function set(val) {
      this._iso = val;

      if (this._camera) {
        this._camera.iso = val;
      }
    }
  }, {
    key: "rect",
    get: function get() {
      return this._rect;
    },
    set: function set(val) {
      this._rect = val;

      if (this._camera) {
        this._camera.viewport = val;
      }
    }
  }, {
    key: "targetTexture",
    get: function get() {
      return this._targetTexture;
    },
    set: function set(value) {
      if (this._targetTexture === value) {
        return;
      }

      var old = this._targetTexture;
      this._targetTexture = value;

      this._checkTargetTextureEvent(old);

      this._updateTargetTexture();

      if (!value && this._camera) {
        this._camera.changeTargetWindow( null);

        this._camera.isWindowSize = true;
      }

      this.node.emit(Camera.TARGET_TEXTURE_CHANGE, this);
    }
  }, {
    key: "screenScale",
    get: function get() {
      return this._screenScale;
    },
    set: function set(val) {
      this._screenScale = val;

      if (this._camera) {
        this._camera.screenScale = val;
      }
    }
  }, {
    key: "inEditorMode",
    get: function get() {
      return this._inEditorMode;
    },
    set: function set(value) {
      this._inEditorMode = value;

      if (this._camera) {
        this._camera.changeTargetWindow(value ? jsonAsset.legacyCC.director.root && jsonAsset.legacyCC.director.root.mainWindow : jsonAsset.legacyCC.director.root && jsonAsset.legacyCC.director.root.tempWindow);
      }
    }
  }]);

  return Camera;
}(jsonAsset.Component), _class3.ProjectionType = ProjectionType, _class3.FOVAxis = FOVAxis, _class3.ClearFlag = ClearFlag, _class3.Aperture = Aperture, _class3.Shutter = Shutter, _class3.ISO = ISO, _class3.TARGET_TEXTURE_CHANGE = 'tex-change', _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_projection", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return ProjectionType.PERSPECTIVE;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_priority", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_fov", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 45;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_fovAxis", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return FOVAxis.VERTICAL;
  }
}), _descriptor5 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_orthoHeight", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 10;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_near", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor7 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_far", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor8 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_color", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Color$1('#333333');
  }
}), _descriptor9 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_depth", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor10 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_stencil", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor11 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_clearFlags", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return ClearFlag.SOLID_COLOR;
  }
}), _descriptor12 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_rect", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Rect$1(0, 0, 1, 1);
  }
}), _descriptor13 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_aperture", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Aperture.F16_0;
  }
}), _descriptor14 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_shutter", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Shutter.D125;
  }
}), _descriptor15 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_iso", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return ISO.ISO100;
  }
}), _descriptor16 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_screenScale", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor17 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_visibility", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.CAMERA_DEFAULT_MASK;
  }
}), _descriptor18 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_targetTexture", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "priority", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "priority"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "visibility", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "visibility"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "clearFlags", [_dec9, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "clearFlags"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "clearColor", [_dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "clearColor"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "clearDepth", [_dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "clearDepth"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "clearStencil", [_dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "clearStencil"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "projection", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "projection"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "fovAxis", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "fovAxis"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "fov", [_dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "fov"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "orthoHeight", [_dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "orthoHeight"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "near", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "near"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "far", [_dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "far"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "aperture", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "aperture"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "shutter", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "shutter"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "iso", [_dec38, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "iso"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "rect", [_dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "rect"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "targetTexture", [_dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "targetTexture"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
jsonAsset.legacyCC.Camera = Camera;

exports.Camera = Camera;
