'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');

(function (CameraFOVAxis) {
  CameraFOVAxis[CameraFOVAxis["VERTICAL"] = 0] = "VERTICAL";
  CameraFOVAxis[CameraFOVAxis["HORIZONTAL"] = 1] = "HORIZONTAL";
})(exports.CameraFOVAxis || (exports.CameraFOVAxis = {}));

(function (CameraProjection) {
  CameraProjection[CameraProjection["ORTHO"] = 0] = "ORTHO";
  CameraProjection[CameraProjection["PERSPECTIVE"] = 1] = "PERSPECTIVE";
})(exports.CameraProjection || (exports.CameraProjection = {}));

(function (CameraAperture) {
  CameraAperture[CameraAperture["F1_8"] = 0] = "F1_8";
  CameraAperture[CameraAperture["F2_0"] = 1] = "F2_0";
  CameraAperture[CameraAperture["F2_2"] = 2] = "F2_2";
  CameraAperture[CameraAperture["F2_5"] = 3] = "F2_5";
  CameraAperture[CameraAperture["F2_8"] = 4] = "F2_8";
  CameraAperture[CameraAperture["F3_2"] = 5] = "F3_2";
  CameraAperture[CameraAperture["F3_5"] = 6] = "F3_5";
  CameraAperture[CameraAperture["F4_0"] = 7] = "F4_0";
  CameraAperture[CameraAperture["F4_5"] = 8] = "F4_5";
  CameraAperture[CameraAperture["F5_0"] = 9] = "F5_0";
  CameraAperture[CameraAperture["F5_6"] = 10] = "F5_6";
  CameraAperture[CameraAperture["F6_3"] = 11] = "F6_3";
  CameraAperture[CameraAperture["F7_1"] = 12] = "F7_1";
  CameraAperture[CameraAperture["F8_0"] = 13] = "F8_0";
  CameraAperture[CameraAperture["F9_0"] = 14] = "F9_0";
  CameraAperture[CameraAperture["F10_0"] = 15] = "F10_0";
  CameraAperture[CameraAperture["F11_0"] = 16] = "F11_0";
  CameraAperture[CameraAperture["F13_0"] = 17] = "F13_0";
  CameraAperture[CameraAperture["F14_0"] = 18] = "F14_0";
  CameraAperture[CameraAperture["F16_0"] = 19] = "F16_0";
  CameraAperture[CameraAperture["F18_0"] = 20] = "F18_0";
  CameraAperture[CameraAperture["F20_0"] = 21] = "F20_0";
  CameraAperture[CameraAperture["F22_0"] = 22] = "F22_0";
})(exports.CameraAperture || (exports.CameraAperture = {}));

(function (CameraISO) {
  CameraISO[CameraISO["ISO100"] = 0] = "ISO100";
  CameraISO[CameraISO["ISO200"] = 1] = "ISO200";
  CameraISO[CameraISO["ISO400"] = 2] = "ISO400";
  CameraISO[CameraISO["ISO800"] = 3] = "ISO800";
})(exports.CameraISO || (exports.CameraISO = {}));

(function (CameraShutter) {
  CameraShutter[CameraShutter["D1"] = 0] = "D1";
  CameraShutter[CameraShutter["D2"] = 1] = "D2";
  CameraShutter[CameraShutter["D4"] = 2] = "D4";
  CameraShutter[CameraShutter["D8"] = 3] = "D8";
  CameraShutter[CameraShutter["D15"] = 4] = "D15";
  CameraShutter[CameraShutter["D30"] = 5] = "D30";
  CameraShutter[CameraShutter["D60"] = 6] = "D60";
  CameraShutter[CameraShutter["D125"] = 7] = "D125";
  CameraShutter[CameraShutter["D250"] = 8] = "D250";
  CameraShutter[CameraShutter["D500"] = 9] = "D500";
  CameraShutter[CameraShutter["D1000"] = 10] = "D1000";
  CameraShutter[CameraShutter["D2000"] = 11] = "D2000";
  CameraShutter[CameraShutter["D4000"] = 12] = "D4000";
})(exports.CameraShutter || (exports.CameraShutter = {}));

var FSTOPS = [1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10.0, 11.0, 13.0, 14.0, 16.0, 18.0, 20.0, 22.0];
var SHUTTERS = [1.0, 1.0 / 2.0, 1.0 / 4.0, 1.0 / 8.0, 1.0 / 15.0, 1.0 / 30.0, 1.0 / 60.0, 1.0 / 125.0, 1.0 / 250.0, 1.0 / 500.0, 1.0 / 1000.0, 1.0 / 2000.0, 1.0 / 4000.0];
var ISOS = [100.0, 200.0, 400.0, 800.0];
var v_a = new jsonAsset.Vec3();
var v_b = new jsonAsset.Vec3();

var _tempMat1 = new jsonAsset.Mat4();

var SKYBOX_FLAG = jsonAsset.ClearFlagBit.STENCIL << 1;
var correctionMatrices = [];
var Camera = function () {
  function Camera(device) {
    this.isWindowSize = true;
    this.screenScale = void 0;
    this._device = void 0;
    this._scene = null;
    this._node = null;
    this._name = null;
    this._enabled = false;
    this._proj = -1;
    this._aspect = void 0;
    this._orthoHeight = 10.0;
    this._fovAxis = exports.CameraFOVAxis.VERTICAL;
    this._fov = jsonAsset.toRadian(45);
    this._nearClip = 1.0;
    this._farClip = 1000.0;
    this._clearColor = new jsonAsset.Color(0.2, 0.2, 0.2, 1);
    this._viewport = new jsonAsset.Rect$1(0, 0, 1, 1);
    this._curTransform = jsonAsset.SurfaceTransform.IDENTITY;
    this._isProjDirty = true;
    this._matView = new jsonAsset.Mat4();
    this._matViewInv = null;
    this._matProj = new jsonAsset.Mat4();
    this._matProjInv = new jsonAsset.Mat4();
    this._matViewProj = new jsonAsset.Mat4();
    this._matViewProjInv = new jsonAsset.Mat4();
    this._frustum = new jsonAsset.Frustum();
    this._forward = new jsonAsset.Vec3();
    this._position = new jsonAsset.Vec3();
    this._priority = 0;
    this._aperture = exports.CameraAperture.F16_0;
    this._apertureValue = void 0;
    this._shutter = exports.CameraShutter.D125;
    this._shutterValue = 0.0;
    this._iso = exports.CameraISO.ISO100;
    this._isoValue = 0.0;
    this._ec = 0.0;
    this._window = null;
    this._width = 1;
    this._height = 1;
    this._clearFlag = jsonAsset.ClearFlagBit.NONE;
    this._clearDepth = 1.0;
    this._visibility = jsonAsset.CAMERA_DEFAULT_MASK;
    this._exposure = 0;
    this._clearStencil = 0;
    this._device = device;
    this._apertureValue = FSTOPS[this._aperture];
    this._shutterValue = SHUTTERS[this._shutter];
    this._isoValue = ISOS[this._iso];
    this._aspect = this.screenScale = 1;

    if (!correctionMatrices.length) {
      var ySign = device.capabilities.clipSpaceSignY;
      correctionMatrices[jsonAsset.SurfaceTransform.IDENTITY] = new jsonAsset.Mat4(1, 0, 0, 0, 0, ySign);
      correctionMatrices[jsonAsset.SurfaceTransform.ROTATE_90] = new jsonAsset.Mat4(0, 1, 0, 0, -ySign, 0);
      correctionMatrices[jsonAsset.SurfaceTransform.ROTATE_180] = new jsonAsset.Mat4(-1, 0, 0, 0, 0, -ySign);
      correctionMatrices[jsonAsset.SurfaceTransform.ROTATE_270] = new jsonAsset.Mat4(0, -1, 0, 0, ySign, 0);
    }
  }

  var _proto = Camera.prototype;

  _proto._setWidth = function _setWidth(val) {
    this._width = val;
  };

  _proto._setHeight = function _setHeight(val) {
    this._height = val;
  };

  _proto._setScene = function _setScene(scene) {
    this._scene = scene;
  };

  _proto._init = function _init(info) {
  };

  _proto.initialize = function initialize(info) {
    this._init(info);

    this.node = info.node;

    this._setWidth(1);

    this._setHeight(1);

    this.clearFlag = jsonAsset.ClearFlagBit.NONE;
    this.clearDepth = 1.0;
    this.visibility = jsonAsset.CAMERA_DEFAULT_MASK;
    this._name = info.name;
    this._proj = info.projection;
    this._priority = info.priority || 0;
    this._aspect = this.screenScale = 1;
    this.updateExposure();
    this.changeTargetWindow(info.window);
  };

  _proto._destroy = function _destroy() {
  };

  _proto.destroy = function destroy() {
    if (this._window) {
      this._window.detachCamera(this);

      this.window = null;
    }

    this._name = null;

    this._destroy();
  };

  _proto.attachToScene = function attachToScene(scene) {
    this._enabled = true;

    this._setScene(scene);
  };

  _proto.detachFromScene = function detachFromScene() {
    this._enabled = false;

    this._setScene(null);
  };

  _proto.resize = function resize(width, height) {
    if (!this._window) return;

    this._setWidth(width);

    this._setHeight(height);

    this._aspect = width * this._viewport.width / (height * this._viewport.height);
    this._isProjDirty = true;
  };

  _proto.setFixedSize = function setFixedSize(width, height) {
    this._setWidth(width);

    this._setHeight(height);

    this._aspect = width * this._viewport.width / (height * this._viewport.height);
    this.isWindowSize = false;
  };

  _proto.update = function update(forceUpdate) {
    if (forceUpdate === void 0) {
      forceUpdate = false;
    }

    if (!this._node) return;
    var viewProjDirty = false;

    if (this._node.hasChangedFlags || forceUpdate) {
      jsonAsset.Mat4.invert(this._matView, this._node.worldMatrix);

      this._forward.x = -this._matView.m02;
      this._forward.y = -this._matView.m06;
      this._forward.z = -this._matView.m10;

      this._node.getWorldPosition(this._position);

      viewProjDirty = true;
    }

    var orientation = this._device.surfaceTransform;

    if (this._isProjDirty || this._curTransform !== orientation) {
      var _this$window;

      this._curTransform = orientation;
      var projectionSignY = this._device.capabilities.clipSpaceSignY;

      if ((_this$window = this.window) === null || _this$window === void 0 ? void 0 : _this$window.hasOffScreenAttachments) {
        orientation = jsonAsset.SurfaceTransform.IDENTITY;
      }

      if (this._proj === exports.CameraProjection.PERSPECTIVE) {
        jsonAsset.Mat4.perspective(this._matProj, this._fov, this._aspect, this._nearClip, this._farClip, this._fovAxis === exports.CameraFOVAxis.VERTICAL, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
      } else {
        var x = this._orthoHeight * this._aspect;
        var y = this._orthoHeight;
        jsonAsset.Mat4.ortho(this._matProj, -x, x, -y, y, this._nearClip, this._farClip, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
      }

      jsonAsset.Mat4.invert(this._matProjInv, this._matProj);

      viewProjDirty = true;
      this._isProjDirty = false;
    }

    if (viewProjDirty) {
      jsonAsset.Mat4.multiply(this._matViewProj, this._matProj, this._matView);
      jsonAsset.Mat4.invert(this._matViewProjInv, this._matViewProj);

      this._frustum.update(this._matViewProj, this._matViewProjInv);
    }
  };

  _proto.changeTargetWindow = function changeTargetWindow(window) {
    if (window === void 0) {
      window = null;
    }

    if (this._window) {
      this._window.detachCamera(this);
    }

    var win = window || jsonAsset.legacyCC.director.root.mainWindow;

    if (win) {
      win.attachCamera(this);
      this.window = win;
      this.resize(win.width, win.height);
    }
  };

  _proto.detachCamera = function detachCamera() {
    if (this._window) {
      this._window.detachCamera(this);
    }
  };

  _proto.screenPointToRay = function screenPointToRay(out, x, y) {
    if (!this._node) return null;
    var width = this.width;
    var height = this.height;
    var cx = this._viewport.x * width;
    var cy = this._viewport.y * height;
    var cw = this._viewport.width * width;
    var ch = this._viewport.height * height;
    var isProj = this._proj === exports.CameraProjection.PERSPECTIVE;
    var ySign = this._device.capabilities.clipSpaceSignY;
    var preTransform = jsonAsset.preTransforms[this._curTransform];
    jsonAsset.Vec3.set(v_a, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, isProj ? 1 : -1);
    var ox = v_a.x,
        oy = v_a.y;
    v_a.x = ox * preTransform[0] + oy * preTransform[2] * ySign;
    v_a.y = ox * preTransform[1] + oy * preTransform[3] * ySign;
    jsonAsset.Vec3.transformMat4(isProj ? v_a : out.o, v_a, this._matViewProjInv);

    if (isProj) {
      this._node.getWorldPosition(v_b);

      jsonAsset.Ray.fromPoints(out, v_b, v_a);
    } else {
      jsonAsset.Vec3.transformQuat(out.d, jsonAsset.Vec3.FORWARD, this._node.worldRotation);
    }

    return out;
  };

  _proto.screenToWorld = function screenToWorld(out, screenPos) {
    var width = this.width;
    var height = this.height;
    var cx = this._viewport.x * width;
    var cy = this._viewport.y * height;
    var cw = this._viewport.width * width;
    var ch = this._viewport.height * height;
    var ySign = this._device.capabilities.clipSpaceSignY;
    var preTransform = jsonAsset.preTransforms[this._curTransform];

    if (this._proj === exports.CameraProjection.PERSPECTIVE) {
      jsonAsset.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, 1.0);
      var x = out.x,
          y = out.y;
      out.x = x * preTransform[0] + y * preTransform[2] * ySign;
      out.y = x * preTransform[1] + y * preTransform[3] * ySign;
      jsonAsset.Vec3.transformMat4(out, out, this._matViewProjInv);

      if (this._node) {
        this._node.getWorldPosition(v_a);
      }

      jsonAsset.Vec3.lerp(out, v_a, out, jsonAsset.lerp(this._nearClip / this._farClip, 1, screenPos.z));
    } else {
      jsonAsset.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, screenPos.z * 2 - 1);
      var _x = out.x,
          _y = out.y;
      out.x = _x * preTransform[0] + _y * preTransform[2] * ySign;
      out.y = _x * preTransform[1] + _y * preTransform[3] * ySign;
      jsonAsset.Vec3.transformMat4(out, out, this._matViewProjInv);
    }

    return out;
  };

  _proto.worldToScreen = function worldToScreen(out, worldPos) {
    var width = this.width;
    var height = this.height;
    var cx = this._viewport.x * width;
    var cy = this._viewport.y * height;
    var cw = this._viewport.width * width;
    var ch = this._viewport.height * height;
    var ySign = this._device.capabilities.clipSpaceSignY;
    var preTransform = jsonAsset.preTransforms[this._curTransform];
    jsonAsset.Vec3.transformMat4(out, worldPos, this._matViewProj);
    var x = out.x,
        y = out.y;
    out.x = x * preTransform[0] + y * preTransform[2] * ySign;
    out.y = x * preTransform[1] + y * preTransform[3] * ySign;
    out.x = cx + (out.x + 1) * 0.5 * cw;
    out.y = cy + (out.y + 1) * 0.5 * ch;
    out.z = out.z * 0.5 + 0.5;
    return out;
  };

  _proto.worldMatrixToScreen = function worldMatrixToScreen(out, worldMatrix, width, height) {
    jsonAsset.Mat4.multiply(out, this._matViewProj, worldMatrix);
    jsonAsset.Mat4.multiply(out, correctionMatrices[this._curTransform], out);
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    jsonAsset.Mat4.identity(_tempMat1);
    jsonAsset.Mat4.transform(_tempMat1, _tempMat1, jsonAsset.Vec3.set(v_a, halfWidth, halfHeight, 0));
    jsonAsset.Mat4.scale(_tempMat1, _tempMat1, jsonAsset.Vec3.set(v_a, halfWidth, halfHeight, 1));
    jsonAsset.Mat4.multiply(out, _tempMat1, out);
    return out;
  };

  _proto.setExposure = function setExposure(ev100) {
    this._exposure = 0.833333 / Math.pow(2.0, ev100);
  };

  _proto.updateExposure = function updateExposure() {
    var ev100 = Math.log2(this._apertureValue * this._apertureValue / this._shutterValue * 100.0 / this._isoValue);
    this.setExposure(ev100);
  };

  jsonAsset._createClass(Camera, [{
    key: "node",
    set: function set(val) {
      this._node = val;
    },
    get: function get() {
      return this._node;
    }
  }, {
    key: "enabled",
    set: function set(val) {
      this._enabled = val;
    },
    get: function get() {
      return this._enabled;
    }
  }, {
    key: "orthoHeight",
    set: function set(val) {
      this._orthoHeight = val;
      this._isProjDirty = true;
    },
    get: function get() {
      return this._orthoHeight;
    }
  }, {
    key: "projectionType",
    set: function set(val) {
      this._proj = val;
      this._isProjDirty = true;
    },
    get: function get() {
      return this._proj;
    }
  }, {
    key: "fovAxis",
    set: function set(axis) {
      this._fovAxis = axis;
      this._isProjDirty = true;
    },
    get: function get() {
      return this._fovAxis;
    }
  }, {
    key: "fov",
    set: function set(fov) {
      this._fov = fov;
      this._isProjDirty = true;
    },
    get: function get() {
      return this._fov;
    }
  }, {
    key: "nearClip",
    set: function set(nearClip) {
      this._nearClip = nearClip;
      this._isProjDirty = true;
    },
    get: function get() {
      return this._nearClip;
    }
  }, {
    key: "farClip",
    set: function set(farClip) {
      this._farClip = farClip;
      this._isProjDirty = true;
    },
    get: function get() {
      return this._farClip;
    }
  }, {
    key: "clearColor",
    set: function set(val) {
      this._clearColor.x = val.x;
      this._clearColor.y = val.y;
      this._clearColor.z = val.z;
      this._clearColor.w = val.w;
    },
    get: function get() {
      return this._clearColor;
    }
  }, {
    key: "viewport",
    get: function get() {
      return this._viewport;
    },
    set: function set(val) {
      var x = val.x,
          width = val.width,
          height = val.height;
      var y = this._device.capabilities.clipSpaceSignY < 0 ? 1 - val.y - height : val.y;

      switch (this._device.surfaceTransform) {
        case jsonAsset.SurfaceTransform.ROTATE_90:
          this._viewport.x = 1 - y - height;
          this._viewport.y = x;
          this._viewport.width = height;
          this._viewport.height = width;
          break;

        case jsonAsset.SurfaceTransform.ROTATE_180:
          this._viewport.x = 1 - x - width;
          this._viewport.y = 1 - y - height;
          this._viewport.width = width;
          this._viewport.height = height;
          break;

        case jsonAsset.SurfaceTransform.ROTATE_270:
          this._viewport.x = y;
          this._viewport.y = 1 - x - width;
          this._viewport.width = height;
          this._viewport.height = width;
          break;

        case jsonAsset.SurfaceTransform.IDENTITY:
          this._viewport.x = x;
          this._viewport.y = y;
          this._viewport.width = width;
          this._viewport.height = height;
          break;
      }

      this.resize(this.width, this.height);
    }
  }, {
    key: "scene",
    get: function get() {
      return this._scene;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    }
  }, {
    key: "aspect",
    get: function get() {
      return this._aspect;
    }
  }, {
    key: "matView",
    set: function set(val) {
      this._matView = val;
    },
    get: function get() {
      return this._matView;
    }
  }, {
    key: "matViewInv",
    set: function set(val) {
      this._matViewInv = val;
    },
    get: function get() {
      return this._matViewInv || this._node.worldMatrix;
    }
  }, {
    key: "matProj",
    set: function set(val) {
      this._matProj = val;
    },
    get: function get() {
      return this._matProj;
    }
  }, {
    key: "matProjInv",
    set: function set(val) {
      this._matProjInv = val;
    },
    get: function get() {
      return this._matProjInv;
    }
  }, {
    key: "matViewProj",
    set: function set(val) {
      this._matViewProj = val;
    },
    get: function get() {
      return this._matViewProj;
    }
  }, {
    key: "matViewProjInv",
    set: function set(val) {
      this._matViewProjInv = val;
    },
    get: function get() {
      return this._matViewProjInv;
    }
  }, {
    key: "frustum",
    set: function set(val) {
      this._frustum = val;
    },
    get: function get() {
      return this._frustum;
    }
  }, {
    key: "window",
    set: function set(val) {
      this._window = val;
    },
    get: function get() {
      return this._window;
    }
  }, {
    key: "forward",
    set: function set(val) {
      this._forward = val;
    },
    get: function get() {
      return this._forward;
    }
  }, {
    key: "position",
    set: function set(val) {
      this._position = val;
    },
    get: function get() {
      return this._position;
    }
  }, {
    key: "visibility",
    set: function set(vis) {
      this._visibility = vis;
    },
    get: function get() {
      return this._visibility;
    }
  }, {
    key: "priority",
    get: function get() {
      return this._priority;
    },
    set: function set(val) {
      this._priority = val;
    }
  }, {
    key: "aperture",
    set: function set(val) {
      this._aperture = val;
      this._apertureValue = FSTOPS[this._aperture];
      this.updateExposure();
    },
    get: function get() {
      return this._aperture;
    }
  }, {
    key: "apertureValue",
    get: function get() {
      return this._apertureValue;
    }
  }, {
    key: "shutter",
    set: function set(val) {
      this._shutter = val;
      this._shutterValue = SHUTTERS[this._shutter];
      this.updateExposure();
    },
    get: function get() {
      return this._shutter;
    }
  }, {
    key: "shutterValue",
    get: function get() {
      return this._shutterValue;
    }
  }, {
    key: "iso",
    set: function set(val) {
      this._iso = val;
      this._isoValue = ISOS[this._iso];
      this.updateExposure();
    },
    get: function get() {
      return this._iso;
    }
  }, {
    key: "isoValue",
    get: function get() {
      return this._isoValue;
    }
  }, {
    key: "ec",
    set: function set(val) {
      this._ec = val;
    },
    get: function get() {
      return this._ec;
    }
  }, {
    key: "exposure",
    get: function get() {
      return this._exposure;
    }
  }, {
    key: "clearFlag",
    get: function get() {
      return this._clearFlag;
    },
    set: function set(flag) {
      this._clearFlag = flag;
    }
  }, {
    key: "clearDepth",
    get: function get() {
      return this._clearDepth;
    },
    set: function set(depth) {
      this._clearDepth = depth;
    }
  }, {
    key: "clearStencil",
    get: function get() {
      return this._clearStencil;
    },
    set: function set(stencil) {
      this._clearStencil = stencil;
    }
  }, {
    key: "native",
    get: function get() {
      return this._nativeObj;
    }
  }]);

  return Camera;
}();

var _dsInfo = new jsonAsset.DescriptorSetInfo(null);

var MAX_PASS_COUNT = 8;
var SubModel = function () {
  function SubModel() {
    this._device = null;
    this._passes = null;
    this._shaders = null;
    this._subMesh = null;
    this._patches = null;
    this._priority = jsonAsset.RenderPriority.DEFAULT;
    this._inputAssembler = null;
    this._descriptorSet = null;
    this._planarInstanceShader = null;
    this._planarShader = null;
    this._reflectionTex = null;
    this._reflectionSampler = null;
  }

  var _proto = SubModel.prototype;

  _proto._destroyDescriptorSet = function _destroyDescriptorSet() {
    this._descriptorSet.destroy();

    this._descriptorSet = null;
  };

  _proto._destroyInputAssembler = function _destroyInputAssembler() {
    this._inputAssembler.destroy();

    this._inputAssembler = null;
  };

  _proto._createDescriptorSet = function _createDescriptorSet(descInfo) {
    this._descriptorSet = this._device.createDescriptorSet(descInfo);
  };

  _proto._setInputAssembler = function _setInputAssembler(iaInfo) {
    this._inputAssembler = this._device.createInputAssembler(iaInfo);
  };

  _proto._setSubMesh = function _setSubMesh(subMesh) {
    this._subMesh = subMesh;
  };

  _proto._init = function _init() {
  };

  _proto.initialize = function initialize(subMesh, passes, patches) {
    if (patches === void 0) {
      patches = null;
    }

    this._device = jsonAsset.legacyCC.director.root.device;
    _dsInfo.layout = passes[0].localSetLayout;

    this._init();

    this._setInputAssembler(subMesh.iaInfo);

    this._createDescriptorSet(_dsInfo);

    this._setSubMesh(subMesh);

    this._patches = patches;
    this._passes = passes;

    this._flushPassInfo();

    if (passes[0].batchingScheme === jsonAsset.BatchingSchemes.VB_MERGING) {
      this.subMesh.genFlatBuffers();
    }

    this.priority = jsonAsset.RenderPriority.DEFAULT;

    if (passes[0].phase === jsonAsset.getPhaseID('reflection')) {
      var texWidth = this._device.width;
      var texHeight = this._device.height;
      var minSize = 512;

      if (texHeight < texWidth) {
        texWidth = minSize * texWidth / texHeight;
        texHeight = minSize;
      } else {
        texWidth = minSize;
        texHeight = minSize * texHeight / texWidth;
      }

      this._reflectionTex = this._device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.STORAGE | jsonAsset.TextureUsageBit.TRANSFER_SRC | jsonAsset.TextureUsageBit.SAMPLED, jsonAsset.Format.RGBA8, texWidth, texHeight, jsonAsset.TextureFlagBit.IMMUTABLE));
      this.descriptorSet.bindTexture(jsonAsset.UNIFORM_REFLECTION_TEXTURE_BINDING, this._reflectionTex);
      var samplerInfo = [jsonAsset.Filter.LINEAR, jsonAsset.Filter.LINEAR, jsonAsset.Filter.NONE, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP];
      var samplerHash = jsonAsset.genSamplerHash(samplerInfo);
      this._reflectionSampler = jsonAsset.samplerLib.getSampler(this._device, samplerHash);
      this.descriptorSet.bindSampler(jsonAsset.UNIFORM_REFLECTION_TEXTURE_BINDING, this._reflectionSampler);
      this.descriptorSet.bindTexture(jsonAsset.UNIFORM_REFLECTION_STORAGE_BINDING, this._reflectionTex);
    }
  };

  _proto._initNativePlanarShadowShader = function _initNativePlanarShadowShader(shadowInfo) {
    this._planarShader = shadowInfo.getPlanarShader(this._patches);
  };

  _proto.initPlanarShadowShader = function initPlanarShadowShader() {
    var pipeline = jsonAsset.legacyCC.director.root.pipeline;
    var shadowInfo = pipeline.pipelineSceneData.shadows;

    this._initNativePlanarShadowShader(shadowInfo);
  };

  _proto._initNativePlanarShadowInstanceShader = function _initNativePlanarShadowInstanceShader(shadowInfo) {
    this._planarInstanceShader = shadowInfo.getPlanarInstanceShader(this._patches);
  };

  _proto.initPlanarShadowInstanceShader = function initPlanarShadowInstanceShader() {
    var pipeline = jsonAsset.legacyCC.director.root.pipeline;
    var shadowInfo = pipeline.pipelineSceneData.shadows;

    this._initNativePlanarShadowInstanceShader(shadowInfo);
  };

  _proto._destroy = function _destroy() {
  };

  _proto.destroy = function destroy() {
    this._destroyDescriptorSet();

    this._destroyInputAssembler();

    this.priority = jsonAsset.RenderPriority.DEFAULT;
    this._patches = null;
    this._subMesh = null;
    this._passes = null;
    this._shaders = null;
    if (this._reflectionTex) this._reflectionTex.destroy();
    this._reflectionTex = null;
    if (this._reflectionSampler) this._reflectionSampler.destroy();
    this._reflectionSampler = null;

    this._destroy();
  };

  _proto.update = function update() {
    for (var i = 0; i < this._passes.length; ++i) {
      var pass = this._passes[i];
      pass.update();
    }

    this._descriptorSet.update();
  };

  _proto.onPipelineStateChanged = function onPipelineStateChanged() {
    var passes = this._passes;

    if (!passes) {
      return;
    }

    for (var i = 0; i < passes.length; i++) {
      var pass = passes[i];
      pass.beginChangeStatesSilently();
      pass.tryCompile();
      pass.endChangeStatesSilently();
    }

    this._flushPassInfo();
  };

  _proto.onMacroPatchesStateChanged = function onMacroPatchesStateChanged(patches) {
    this._patches = patches;
    var passes = this._passes;

    if (!passes) {
      return;
    }

    for (var i = 0; i < passes.length; i++) {
      var pass = passes[i];
      pass.beginChangeStatesSilently();
      pass.tryCompile();
      pass.endChangeStatesSilently();
    }

    this._flushPassInfo();
  };

  _proto._flushPassInfo = function _flushPassInfo() {
    var passes = this._passes;

    if (!passes) {
      return;
    }

    if (!this._shaders) {
      this._shaders = [];
    }

    this._shaders.length = passes.length;

    for (var i = 0, len = passes.length; i < len; i++) {
      this._shaders[i] = passes[i].getShaderVariant(this.patches);
    }
  };

  jsonAsset._createClass(SubModel, [{
    key: "passes",
    set: function set(passes) {
      var passLengh = passes.length;

      if (passLengh > MAX_PASS_COUNT) {
        jsonAsset.errorID(12004, MAX_PASS_COUNT);
        return;
      }

      this._passes = passes;

      this._flushPassInfo();

      if (this._descriptorSet) {
        this._destroyDescriptorSet();

        _dsInfo.layout = passes[0].localSetLayout;

        this._createDescriptorSet(_dsInfo);
      }
    },
    get: function get() {
      return this._passes;
    }
  }, {
    key: "shaders",
    get: function get() {
      return this._shaders;
    }
  }, {
    key: "subMesh",
    set: function set(subMesh) {
      this._setSubMesh(subMesh);

      this._inputAssembler.destroy();

      this._inputAssembler.initialize(subMesh.iaInfo);

      if (this._passes[0].batchingScheme === jsonAsset.BatchingSchemes.VB_MERGING) {
        this.subMesh.genFlatBuffers();
      }
    },
    get: function get() {
      return this._subMesh;
    }
  }, {
    key: "priority",
    set: function set(val) {
      this._priority = val;
    },
    get: function get() {
      return this._priority;
    }
  }, {
    key: "inputAssembler",
    get: function get() {
      return this._inputAssembler;
    }
  }, {
    key: "descriptorSet",
    get: function get() {
      return this._descriptorSet;
    }
  }, {
    key: "patches",
    get: function get() {
      return this._patches;
    }
  }, {
    key: "planarInstanceShader",
    get: function get() {
      return this._planarInstanceShader;
    }
  }, {
    key: "planarShader",
    get: function get() {
      return this._planarShader;
    }
  }, {
    key: "native",
    get: function get() {
      return this._nativeObj;
    }
  }]);

  return SubModel;
}();

var INITIAL_CAPACITY = 32;
var MAX_CAPACITY = 1024;
var InstancedBuffer = function () {
  InstancedBuffer.get = function get(pass, extraKey) {
    if (extraKey === void 0) {
      extraKey = 0;
    }

    var buffers = InstancedBuffer._buffers;
    if (!buffers.has(pass)) buffers.set(pass, {});
    var record = buffers.get(pass);
    return record[extraKey] || (record[extraKey] = new InstancedBuffer(pass));
  };

  function InstancedBuffer(pass) {
    this.instances = [];
    this.pass = void 0;
    this.hasPendingModels = false;
    this.dynamicOffsets = [];
    this._device = void 0;
    this._device = pass.device;
    this.pass = pass;
  }

  var _proto = InstancedBuffer.prototype;

  _proto.destroy = function destroy() {
    for (var i = 0; i < this.instances.length; ++i) {
      var instance = this.instances[i];
      instance.vb.destroy();
      instance.ia.destroy();
    }

    this.instances.length = 0;
  };

  _proto.merge = function merge(subModel, attrs, passIdx, shaderImplant) {
    if (shaderImplant === void 0) {
      shaderImplant = null;
    }

    var stride = attrs.buffer.length;

    if (!stride) {
      return;
    }

    var sourceIA = subModel.inputAssembler;
    var lightingMap = subModel.descriptorSet.getTexture(jsonAsset.UNIFORM_LIGHTMAP_TEXTURE_BINDING);
    var shader = shaderImplant;

    if (!shader) {
      shader = subModel.shaders[passIdx];
    }

    var descriptorSet = subModel.descriptorSet;

    for (var i = 0; i < this.instances.length; ++i) {
      var instance = this.instances[i];

      if (instance.ia.indexBuffer !== sourceIA.indexBuffer || instance.count >= MAX_CAPACITY) {
        continue;
      }

      if (instance.lightingMap !== lightingMap) {
        continue;
      }

      if (instance.stride !== stride) {
        return;
      }

      if (instance.count >= instance.capacity) {
        instance.capacity <<= 1;
        var newSize = instance.stride * instance.capacity;
        var oldData = instance.data;
        instance.data = new Uint8Array(newSize);
        instance.data.set(oldData);
        instance.vb.resize(newSize);
      }

      if (instance.shader !== shader) {
        instance.shader = shader;
      }

      if (instance.descriptorSet !== descriptorSet) {
        instance.descriptorSet = descriptorSet;
      }

      instance.data.set(attrs.buffer, instance.stride * instance.count++);
      this.hasPendingModels = true;
      return;
    }

    var vb = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, stride * INITIAL_CAPACITY, stride));

    var data = new Uint8Array(stride * INITIAL_CAPACITY);
    var vertexBuffers = sourceIA.vertexBuffers.slice();
    var attributes = sourceIA.attributes.slice();
    var indexBuffer = sourceIA.indexBuffer;

    for (var _i = 0; _i < attrs.attributes.length; _i++) {
      var attr = attrs.attributes[_i];
      var newAttr = new jsonAsset.Attribute(attr.name, attr.format, attr.isNormalized, vertexBuffers.length, true);
      attributes.push(newAttr);
    }

    data.set(attrs.buffer);
    vertexBuffers.push(vb);
    var iaInfo = new jsonAsset.InputAssemblerInfo(attributes, vertexBuffers, indexBuffer);

    var ia = this._device.createInputAssembler(iaInfo);

    this.instances.push({
      count: 1,
      capacity: INITIAL_CAPACITY,
      vb: vb,
      data: data,
      ia: ia,
      stride: stride,
      shader: shader,
      descriptorSet: descriptorSet,
      lightingMap: lightingMap
    });
    this.hasPendingModels = true;
  };

  _proto.uploadBuffers = function uploadBuffers(cmdBuff) {
    for (var i = 0; i < this.instances.length; ++i) {
      var instance = this.instances[i];

      if (!instance.count) {
        continue;
      }

      instance.ia.instanceCount = instance.count;
      cmdBuff.updateBuffer(instance.vb, instance.data);
    }
  };

  _proto.clear = function clear() {
    for (var i = 0; i < this.instances.length; ++i) {
      var instance = this.instances[i];
      instance.count = 0;
    }

    this.hasPendingModels = false;
  };

  return InstancedBuffer;
}();
InstancedBuffer._buffers = new Map();

var m4_1 = new jsonAsset.Mat4();

var _subModelPool = new jsonAsset.Pool(function () {
  return new SubModel();
}, 32);

var shadowMapPatches = [{
  name: 'CC_RECEIVE_SHADOW',
  value: true
}];

(function (ModelType) {
  ModelType[ModelType["DEFAULT"] = 0] = "DEFAULT";
  ModelType[ModelType["SKINNING"] = 1] = "SKINNING";
  ModelType[ModelType["BAKED_SKINNING"] = 2] = "BAKED_SKINNING";
  ModelType[ModelType["BATCH_2D"] = 3] = "BATCH_2D";
  ModelType[ModelType["PARTICLE_BATCH"] = 4] = "PARTICLE_BATCH";
  ModelType[ModelType["LINE"] = 5] = "LINE";
})(exports.ModelType || (exports.ModelType = {}));

function uploadMat4AsVec4x3(mat, v1, v2, v3) {
  v1[0] = mat.m00;
  v1[1] = mat.m01;
  v1[2] = mat.m02;
  v1[3] = mat.m12;
  v2[0] = mat.m04;
  v2[1] = mat.m05;
  v2[2] = mat.m06;
  v2[3] = mat.m13;
  v3[0] = mat.m08;
  v3[1] = mat.m09;
  v3[2] = mat.m10;
  v3[3] = mat.m14;
}

var lightmapSamplerHash = jsonAsset.genSamplerHash([jsonAsset.Filter.LINEAR, jsonAsset.Filter.LINEAR, jsonAsset.Filter.NONE, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP]);
var lightmapSamplerWithMipHash = jsonAsset.genSamplerHash([jsonAsset.Filter.LINEAR, jsonAsset.Filter.LINEAR, jsonAsset.Filter.LINEAR, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP]);
var Model = function () {
  jsonAsset._createClass(Model, [{
    key: "subModels",
    get: function get() {
      return this._subModels;
    }
  }, {
    key: "inited",
    get: function get() {
      return this._inited;
    }
  }, {
    key: "worldBounds",
    get: function get() {
      return this._worldBounds;
    }
  }, {
    key: "modelBounds",
    get: function get() {
      return this._modelBounds;
    }
  }, {
    key: "localBuffer",
    get: function get() {
      return this._localBuffer;
    }
  }, {
    key: "updateStamp",
    get: function get() {
      return this._updateStamp;
    }
  }, {
    key: "isInstancingEnabled",
    get: function get() {
      return this._instMatWorldIdx >= 0;
    }
  }, {
    key: "receiveShadow",
    get: function get() {
      return this._receiveShadow;
    },
    set: function set(val) {
      this._setReceiveShadow(val);

      this.onMacroPatchesStateChanged();
    }
  }, {
    key: "castShadow",
    get: function get() {
      return this._castShadow;
    },
    set: function set(val) {
      this._castShadow = val;
    }
  }, {
    key: "node",
    get: function get() {
      return this._node;
    },
    set: function set(n) {
      this._node = n;
    }
  }, {
    key: "transform",
    get: function get() {
      return this._transform;
    },
    set: function set(n) {
      this._transform = n;
    }
  }, {
    key: "visFlags",
    get: function get() {
      return this._visFlags;
    },
    set: function set(val) {
      this._visFlags = val;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(val) {
      this._enabled = val;
    }
  }, {
    key: "native",
    get: function get() {
      return this._nativeObj;
    }
  }]);

  function Model() {
    this.type = exports.ModelType.DEFAULT;
    this.scene = null;
    this.isDynamicBatching = false;
    this.instancedAttributes = {
      buffer: null,
      views: [],
      attributes: []
    };
    this._worldBounds = null;
    this._modelBounds = null;
    this._subModels = [];
    this._node = null;
    this._transform = null;
    this._device = void 0;
    this._inited = false;
    this._descriptorSetCount = 1;
    this._updateStamp = -1;
    this._transformUpdated = true;
    this._localData = new Float32Array(jsonAsset.UBOLocal.COUNT);
    this._localBuffer = null;
    this._instMatWorldIdx = -1;
    this._lightmap = null;
    this._lightmapUVParam = new jsonAsset.Vec4();
    this._receiveShadow = false;
    this._castShadow = false;
    this._enabled = true;
    this._visFlags = jsonAsset.Layers.Enum.NONE;
    this._device = jsonAsset.legacyCC.director.root.device;
  }

  var _proto = Model.prototype;

  _proto._setReceiveShadow = function _setReceiveShadow(val) {
    this._receiveShadow = val;
  };

  _proto._init = function _init() {
  };

  _proto.initialize = function initialize() {
    if (this._inited) {
      return;
    }

    this._init();

    this._setReceiveShadow(true);

    this.castShadow = false;
    this.enabled = true;
    this.visFlags = jsonAsset.Layers.Enum.NONE;
    this._inited = true;
  };

  _proto._destroySubmodel = function _destroySubmodel(subModel) {
    subModel.destroy();
  };

  _proto._destroy = function _destroy() {
  };

  _proto.destroy = function destroy() {
    var subModels = this._subModels;

    for (var i = 0; i < subModels.length; i++) {
      var subModel = this._subModels[i];

      this._destroySubmodel(subModel);
    }

    if (this._localBuffer) {
      this._localBuffer.destroy();

      this._localBuffer = null;
    }

    this._worldBounds = null;
    this._modelBounds = null;
    this._subModels.length = 0;
    this._inited = false;
    this._transformUpdated = true;
    this._transform = null;
    this._node = null;
    this.isDynamicBatching = false;

    this._destroy();
  };

  _proto.attachToScene = function attachToScene(scene) {
    this.scene = scene;
  };

  _proto.detachFromScene = function detachFromScene() {
    this.scene = null;
  };

  _proto.updateTransform = function updateTransform(stamp) {
    var node = this.transform;

    if (node.hasChangedFlags || node._dirtyFlags) {
      node.updateWorldTransform();
      this._transformUpdated = true;
      var worldBounds = this._worldBounds;

      if (this._modelBounds && worldBounds) {
        this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);
      }
    }
  };

  _proto.updateWorldBound = function updateWorldBound() {
    var node = this.transform;

    if (node !== null) {
      node.updateWorldTransform();
      this._transformUpdated = true;
      var worldBounds = this._worldBounds;

      if (this._modelBounds && worldBounds) {
        this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);
      }
    }
  };

  _proto._applyLocalData = function _applyLocalData() {
  };

  _proto._applyLocalBuffer = function _applyLocalBuffer() {
  };

  _proto.updateUBOs = function updateUBOs(stamp) {
    var subModels = this._subModels;

    for (var i = 0; i < subModels.length; i++) {
      subModels[i].update();
    }

    this._updateStamp = stamp;

    if (!this._transformUpdated) {
      return;
    }

    this._transformUpdated = false;
    var worldMatrix = this.transform._mat;
    var idx = this._instMatWorldIdx;

    if (idx >= 0) {
      var attrs = this.instancedAttributes.views;
      uploadMat4AsVec4x3(worldMatrix, attrs[idx], attrs[idx + 1], attrs[idx + 2]);
    } else if (this._localBuffer) {
      jsonAsset.Mat4.toArray(this._localData, worldMatrix, jsonAsset.UBOLocal.MAT_WORLD_OFFSET);
      jsonAsset.Mat4.inverseTranspose(m4_1, worldMatrix);

      {
        var det = jsonAsset.Mat4.determinant(m4_1);
        var factor = 1.0 / Math.sqrt(det);
        jsonAsset.Mat4.multiplyScalar(m4_1, m4_1, factor);
      }

      jsonAsset.Mat4.toArray(this._localData, m4_1, jsonAsset.UBOLocal.MAT_WORLD_IT_OFFSET);

      this._localBuffer.update(this._localData);

      this._applyLocalData();

      this._applyLocalBuffer();
    }
  };

  _proto._updateNativeBounds = function _updateNativeBounds() {
  };

  _proto.createBoundingShape = function createBoundingShape(minPos, maxPos) {
    if (!minPos || !maxPos) {
      return;
    }

    this._modelBounds = jsonAsset.AABB.fromPoints(jsonAsset.AABB.create(), minPos, maxPos);
    this._worldBounds = jsonAsset.AABB.clone(this._modelBounds);

    this._updateNativeBounds();
  };

  _proto._createSubModel = function _createSubModel() {
    return new SubModel();
  };

  _proto.initSubModel = function initSubModel(idx, subMeshData, mat) {
    this.initialize();

    if (this._subModels[idx] == null) {
      this._subModels[idx] = this._createSubModel();
    } else {
      this._subModels[idx].destroy();
    }

    this._subModels[idx].initialize(subMeshData, mat.passes, this.getMacroPatches(idx));

    this._subModels[idx].initPlanarShadowShader();

    this._subModels[idx].initPlanarShadowInstanceShader();

    this._updateAttributesAndBinding(idx);
  };

  _proto.setSubModelMesh = function setSubModelMesh(idx, subMesh) {
    if (!this._subModels[idx]) {
      return;
    }

    this._subModels[idx].subMesh = subMesh;
  };

  _proto.setSubModelMaterial = function setSubModelMaterial(idx, mat) {
    if (!this._subModels[idx]) {
      return;
    }

    this._subModels[idx].passes = mat.passes;

    this._updateAttributesAndBinding(idx);
  };

  _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
    var subModels = this._subModels;

    for (var i = 0; i < subModels.length; i++) {
      subModels[i].onPipelineStateChanged();
    }
  };

  _proto.onMacroPatchesStateChanged = function onMacroPatchesStateChanged() {
    var subModels = this._subModels;

    for (var i = 0; i < subModels.length; i++) {
      subModels[i].onMacroPatchesStateChanged(this.getMacroPatches(i));
    }
  };

  _proto.updateLightingmap = function updateLightingmap(texture, uvParam) {
    jsonAsset.Vec4.toArray(this._localData, uvParam, jsonAsset.UBOLocal.LIGHTINGMAP_UVPARAM);

    this._applyLocalData();

    this._lightmap = texture;
    this._lightmapUVParam = uvParam;

    if (texture === null) {
      texture = jsonAsset.builtinResMgr.get('empty-texture');
    }

    var gfxTexture = texture.getGFXTexture();

    if (gfxTexture) {
      var sampler = jsonAsset.samplerLib.getSampler(this._device, texture.mipmaps.length > 1 ? lightmapSamplerWithMipHash : lightmapSamplerHash);
      var subModels = this._subModels;

      for (var i = 0; i < subModels.length; i++) {
        var descriptorSet = subModels[i].descriptorSet;
        descriptorSet.bindTexture(jsonAsset.UNIFORM_LIGHTMAP_TEXTURE_BINDING, gfxTexture);
        descriptorSet.bindSampler(jsonAsset.UNIFORM_LIGHTMAP_TEXTURE_BINDING, sampler);
        descriptorSet.update();
      }
    }
  };

  _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
    return this.receiveShadow ? shadowMapPatches : null;
  };

  _proto._updateAttributesAndBinding = function _updateAttributesAndBinding(subModelIndex) {
    var subModel = this._subModels[subModelIndex];

    if (!subModel) {
      return;
    }

    this._initLocalDescriptors(subModelIndex);

    this._updateLocalDescriptors(subModelIndex, subModel.descriptorSet);

    var shader = subModel.passes[0].getShaderVariant(subModel.patches);

    this._updateInstancedAttributes(shader.attributes, subModel.passes[0]);
  };

  _proto._getInstancedAttributeIndex = function _getInstancedAttributeIndex(name) {
    var attributes = this.instancedAttributes.attributes;

    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i].name === name) {
        return i;
      }
    }

    return -1;
  };

  _proto._setInstMatWorldIdx = function _setInstMatWorldIdx(idx) {
    this._instMatWorldIdx = idx;
  };

  _proto._updateInstancedAttributes = function _updateInstancedAttributes(attributes, pass) {
    if (!pass.device.hasFeature(jsonAsset.Feature.INSTANCED_ARRAYS)) {
      return;
    }

    var size = 0;

    for (var j = 0; j < attributes.length; j++) {
      var attribute = attributes[j];

      if (!attribute.isInstanced) {
        continue;
      }

      size += jsonAsset.FormatInfos[attribute.format].size;
    }

    var attrs = this.instancedAttributes;
    attrs.buffer = new Uint8Array(size);
    attrs.views.length = attrs.attributes.length = 0;
    var offset = 0;

    for (var _j = 0; _j < attributes.length; _j++) {
      var _attribute = attributes[_j];

      if (!_attribute.isInstanced) {
        continue;
      }

      var attr = new jsonAsset.Attribute();
      attr.format = _attribute.format;
      attr.name = _attribute.name;
      attr.isNormalized = _attribute.isNormalized;
      attr.location = _attribute.location;
      attrs.attributes.push(attr);
      var info = jsonAsset.FormatInfos[_attribute.format];
      var typeViewArray = new (jsonAsset.getTypedArrayConstructor(info))(attrs.buffer.buffer, offset, info.count);
      attrs.views.push(typeViewArray);
      offset += info.size;
    }

    if (pass.batchingScheme === jsonAsset.BatchingSchemes.INSTANCING) {
      InstancedBuffer.get(pass).destroy();
    }

    this._setInstMatWorldIdx(this._getInstancedAttributeIndex(jsonAsset.INST_MAT_WORLD));

    this._transformUpdated = true;
  };

  _proto._initLocalDescriptors = function _initLocalDescriptors(subModelIndex) {
    if (!this._localBuffer) {
      this._localBuffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOLocal.SIZE, jsonAsset.UBOLocal.SIZE));

      this._applyLocalBuffer();
    }
  };

  _proto._updateLocalDescriptors = function _updateLocalDescriptors(subModelIndex, descriptorSet) {
    if (this._localBuffer) descriptorSet.bindBuffer(jsonAsset.UBOLocal.BINDING, this._localBuffer);
  };

  return Model;
}();

var RenderScene = function () {
  RenderScene.registerCreateFunc = function registerCreateFunc(root) {
    root._createSceneFun = function (_root) {
      return new RenderScene(_root);
    };
  };

  jsonAsset._createClass(RenderScene, [{
    key: "root",
    get: function get() {
      return this._root;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "cameras",
    get: function get() {
      return this._cameras;
    }
  }, {
    key: "mainLight",
    get: function get() {
      return this._mainLight;
    }
  }, {
    key: "sphereLights",
    get: function get() {
      return this._sphereLights;
    }
  }, {
    key: "spotLights",
    get: function get() {
      return this._spotLights;
    }
  }, {
    key: "models",
    get: function get() {
      return this._models;
    }
  }, {
    key: "native",
    get: function get() {
      return this._nativeObj;
    }
  }, {
    key: "batches",
    get: function get() {
      return this._batches;
    }
  }]);

  function RenderScene(root) {
    this._root = void 0;
    this._name = '';
    this._cameras = [];
    this._models = [];
    this._batches = [];
    this._directionalLights = [];
    this._sphereLights = [];
    this._spotLights = [];
    this._mainLight = null;
    this._modelId = 0;
    this._root = root;

    this._createNativeObject();
  }

  var _proto = RenderScene.prototype;

  _proto.initialize = function initialize(info) {
    this._name = info.name;

    this._createNativeObject();

    return true;
  };

  _proto.update = function update(stamp) {

    var mainLight = this._mainLight;

    if (mainLight) {
      mainLight.update();
    }

    var sphereLights = this._sphereLights;

    for (var _i = 0; _i < sphereLights.length; _i++) {
      var light = sphereLights[_i];
      light.update();
    }

    var spotLights = this._spotLights;

    for (var _i2 = 0; _i2 < spotLights.length; _i2++) {
      var _light = spotLights[_i2];

      _light.update();
    }

    var models = this._models;

    for (var _i3 = 0; _i3 < models.length; _i3++) {
      var model = models[_i3];

      if (model.enabled) {
        model.updateTransform(stamp);
        model.updateUBOs(stamp);
      }
    }
  };

  _proto._destroy = function _destroy() {
  };

  _proto.destroy = function destroy() {
    this.removeCameras();
    this.removeSphereLights();
    this.removeSpotLights();
    this.removeModels();

    this._destroy();
  };

  _proto.addCamera = function addCamera(cam) {
    cam.attachToScene(this);

    this._cameras.push(cam);
  };

  _proto.removeCamera = function removeCamera(camera) {
    for (var i = 0; i < this._cameras.length; ++i) {
      if (this._cameras[i] === camera) {
        this._cameras.splice(i, 1);

        camera.detachFromScene();
        return;
      }
    }
  };

  _proto.removeCameras = function removeCameras() {
    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._cameras), _step; !(_step = _iterator()).done;) {
      var camera = _step.value;
      camera.detachFromScene();
    }

    this._cameras.splice(0);
  };

  _proto.setMainLight = function setMainLight(dl) {
    this._mainLight = dl;
  };

  _proto.unsetMainLight = function unsetMainLight(dl) {
    if (this._mainLight === dl) {
      var dlList = this._directionalLights;

      if (dlList.length) {
        this.setMainLight(dlList[dlList.length - 1]);

        if (this._mainLight.node) {
          this._mainLight.node.hasChangedFlags |= jsonAsset.TransformBit.ROTATION;
        }

        return;
      }

      this.setMainLight(null);
    }
  };

  _proto.addDirectionalLight = function addDirectionalLight(dl) {
    dl.attachToScene(this);

    this._directionalLights.push(dl);
  };

  _proto.removeDirectionalLight = function removeDirectionalLight(dl) {
    for (var i = 0; i < this._directionalLights.length; ++i) {
      if (this._directionalLights[i] === dl) {
        dl.detachFromScene();

        this._directionalLights.splice(i, 1);

        return;
      }
    }
  };

  _proto.addSphereLight = function addSphereLight(pl) {
    pl.attachToScene(this);

    this._sphereLights.push(pl);
  };

  _proto.removeSphereLight = function removeSphereLight(pl) {
    for (var i = 0; i < this._sphereLights.length; ++i) {
      if (this._sphereLights[i] === pl) {
        pl.detachFromScene();

        this._sphereLights.splice(i, 1);

        return;
      }
    }
  };

  _proto.addSpotLight = function addSpotLight(sl) {
    sl.attachToScene(this);

    this._spotLights.push(sl);
  };

  _proto.removeSpotLight = function removeSpotLight(sl) {
    for (var i = 0; i < this._spotLights.length; ++i) {
      if (this._spotLights[i] === sl) {
        sl.detachFromScene();

        this._spotLights.splice(i, 1);

        return;
      }
    }
  };

  _proto.removeSphereLights = function removeSphereLights() {
    for (var i = 0; i < this._sphereLights.length; ++i) {
      this._sphereLights[i].detachFromScene();
    }

    this._sphereLights.length = 0;
  };

  _proto.removeSpotLights = function removeSpotLights() {
    for (var i = 0; i < this._spotLights.length; ++i) {
      this._spotLights[i].detachFromScene();
    }

    this._spotLights = [];
  };

  _proto.addModel = function addModel(m) {
    m.attachToScene(this);

    this._models.push(m);
  };

  _proto.removeModel = function removeModel(model) {
    for (var i = 0; i < this._models.length; ++i) {
      if (this._models[i] === model) {
        model.detachFromScene();

        this._models.splice(i, 1);

        return;
      }
    }
  };

  _proto.removeModels = function removeModels() {
    for (var _iterator2 = jsonAsset._createForOfIteratorHelperLoose(this._models), _step2; !(_step2 = _iterator2()).done;) {
      var m = _step2.value;
      m.detachFromScene();
      m.destroy();
    }

    this._models.length = 0;
  };

  _proto.addBatch = function addBatch(batch) {
    this._batches.push(batch);
  };

  _proto.removeBatch = function removeBatch(batch) {
    for (var i = 0; i < this._batches.length; ++i) {
      if (this._batches[i] === batch) {
        this._batches.splice(i, 1);

        return;
      }
    }
  };

  _proto.removeBatches = function removeBatches() {
    this._batches.length = 0;
  };

  _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
    for (var _iterator3 = jsonAsset._createForOfIteratorHelperLoose(this._models), _step3; !(_step3 = _iterator3()).done;) {
      var m = _step3.value;
      m.onGlobalPipelineStateChanged();
    }
  };

  _proto.generateModelId = function generateModelId() {
    return this._modelId++;
  };

  _proto._createNativeObject = function _createNativeObject() {
  };

  return RenderScene;
}();

jsonAsset.removeProperty(RenderScene.prototype, 'RenderScene.prototype', [{
  name: 'raycastUI2DNode'
}, {
  name: 'raycastUINode'
}]);
jsonAsset.removeProperty(RenderScene.prototype, 'RenderScene.prototype', [{
  name: 'raycastAll',
  suggest: 'using intersect.rayModel in geometry'
}, {
  name: 'raycastAllModels',
  suggest: 'using intersect.rayModel in geometry'
}, {
  name: 'raycastSingleModel',
  suggest: 'using intersect.rayModel in geometry'
}, {
  name: 'raycastAllCanvas',
  suggest: 'using intersect.rayAABB in geometry'
}, {
  name: 'rayResultCanvas'
}, {
  name: 'rayResultModels'
}, {
  name: 'rayResultAll'
}, {
  name: 'rayResultSingleModel'
}]);
var CameraVisFlags = {};
jsonAsset.removeProperty(CameraVisFlags, 'CameraVisFlags', [{
  name: 'GENERAL'
}]);
jsonAsset.replaceProperty(CameraVisFlags, 'CameraVisFlags', [{
  name: 'PROFILER',
  newName: 'PROFILER',
  target: jsonAsset.Layers.BitMask,
  targetName: 'PROFILER'
}, {
  name: 'GIZMOS',
  newName: 'GIZMOS',
  target: jsonAsset.Layers.BitMask,
  targetName: 'GIZMOS'
}, {
  name: 'EDITOR',
  newName: 'EDITOR',
  target: jsonAsset.Layers.BitMask,
  targetName: 'EDITOR'
}, {
  name: 'UI',
  newName: 'UI',
  target: jsonAsset.Layers.BitMask,
  targetName: 'UI_3D'
}, {
  name: 'UI2D',
  newName: 'UI2D',
  target: jsonAsset.Layers.BitMask,
  targetName: 'UI_2D'
}]);
jsonAsset.legacyCC.CameraVisFlags = CameraVisFlags;
var VisibilityFlags = {};
jsonAsset.removeProperty(VisibilityFlags, 'VisibilityFlags', [{
  name: 'GENERAL'
}]);
jsonAsset.replaceProperty(VisibilityFlags, 'VisibilityFlags', [{
  name: 'ALWALS',
  newName: 'ALWALS',
  target: jsonAsset.Layers.Enum,
  targetName: 'ALWALS'
}, {
  name: 'PROFILER',
  newName: 'PROFILER',
  target: jsonAsset.Layers.Enum,
  targetName: 'PROFILER'
}, {
  name: 'GIZMOS',
  newName: 'GIZMOS',
  target: jsonAsset.Layers.Enum,
  targetName: 'GIZMOS'
}, {
  name: 'EDITOR',
  newName: 'EDITOR',
  target: jsonAsset.Layers.Enum,
  targetName: 'EDITOR'
}, {
  name: 'UI',
  newName: 'UI',
  target: jsonAsset.Layers.Enum,
  targetName: 'UI_3D'
}, {
  name: 'UI2D',
  newName: 'UI2D',
  target: jsonAsset.Layers.Enum,
  targetName: 'UI_2D'
}]);
jsonAsset.legacyCC.VisibilityFlags = VisibilityFlags;
jsonAsset.replaceProperty(jsonAsset.Pass.prototype, 'Pass.prototype', [{
  name: 'getBindingTypeFromHandle',
  newName: 'getDescriptorTypeFromHandle'
}]);
jsonAsset.removeProperty(Camera.prototype, 'Camera.prototype', [{
  name: 'getSplitFrustum'
}]);

function ColorTemperatureToRGB(rgb, kelvin) {
  if (kelvin < 1000.0) {
    kelvin = 1000.0;
  } else if (kelvin > 15000.0) {
    kelvin = 15000.0;
  }

  var kSqr = kelvin * kelvin;
  var u = (0.860117757 + 1.54118254e-4 * kelvin + 1.28641212e-7 * kSqr) / (1.0 + 8.42420235e-4 * kelvin + 7.08145163e-7 * kSqr);
  var v = (0.317398726 + 4.22806245e-5 * kelvin + 4.20481691e-8 * kSqr) / (1.0 - 2.89741816e-5 * kelvin + 1.61456053e-7 * kSqr);
  var d = 2.0 * u - 8.0 * v + 4.0;
  var x = 3.0 * u / d;
  var y = 2.0 * v / d;
  var z = 1.0 - x - y;
  var X = 1.0 / y * x;
  var Z = 1.0 / y * z;
  rgb.x = 3.2404542 * X + -1.5371385 + -0.4985314 * Z;
  rgb.y = -0.9692660 * X + 1.8760108 + 0.0415560 * Z;
  rgb.z = 0.0556434 * X + -0.2040259 + 1.0572252 * Z;
}

(function (LightType) {
  LightType[LightType["DIRECTIONAL"] = 0] = "DIRECTIONAL";
  LightType[LightType["SPHERE"] = 1] = "SPHERE";
  LightType[LightType["SPOT"] = 2] = "SPOT";
  LightType[LightType["UNKNOWN"] = 3] = "UNKNOWN";
})(exports.LightType || (exports.LightType = {}));

var nt2lm = function nt2lm(size) {
  return 4 * Math.PI * Math.PI * size * size;
};
var Light = function () {
  function Light() {
    this._baked = false;
    this._color = new jsonAsset.Vec3(1, 1, 1);
    this._colorTemp = 6550.0;
    this._colorTempRGB = new jsonAsset.Vec3(1, 1, 1);
    this._scene = null;
    this._node = null;
    this._name = null;
    this._useColorTemperature = false;
    this._type = exports.LightType.UNKNOWN;
  }

  var _proto = Light.prototype;

  _proto._init = function _init() {
  };

  _proto._destroy = function _destroy() {
  };

  _proto.initialize = function initialize() {
    this._init();

    this.color = new jsonAsset.Vec3(1, 1, 1);
    this.colorTemperature = 6550.0;
  };

  _proto.attachToScene = function attachToScene(scene) {
    this._scene = scene;
  };

  _proto.detachFromScene = function detachFromScene() {
    this._scene = null;
  };

  _proto.destroy = function destroy() {
    this._name = null;
    this._node = null;

    this._destroy();
  };

  _proto.update = function update() {};

  jsonAsset._createClass(Light, [{
    key: "baked",
    get: function get() {
      return this._baked;
    },
    set: function set(val) {
      this._baked = val;
    }
  }, {
    key: "color",
    set: function set(color) {
      this._color.set(color);
    },
    get: function get() {
      return this._color;
    }
  }, {
    key: "useColorTemperature",
    set: function set(enable) {
      this._useColorTemperature = enable;
    },
    get: function get() {
      return this._useColorTemperature;
    }
  }, {
    key: "colorTemperature",
    set: function set(val) {
      this._colorTemp = val;
      ColorTemperatureToRGB(this._colorTempRGB, this._colorTemp);
    },
    get: function get() {
      return this._colorTemp;
    }
  }, {
    key: "colorTemperatureRGB",
    get: function get() {
      return this._colorTempRGB;
    }
  }, {
    key: "node",
    set: function set(n) {
      this._node = n;

      if (this._node) {
        this._node.hasChangedFlags |= jsonAsset.TransformBit.ROTATION;
      }
    },
    get: function get() {
      return this._node;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(n) {
      this._name = n;
    }
  }, {
    key: "scene",
    get: function get() {
      return this._scene;
    }
  }, {
    key: "native",
    get: function get() {
      return this._nativeObj;
    }
  }]);

  return Light;
}();

var _forward = new jsonAsset.Vec3(0, 0, -1);

var _v3 = new jsonAsset.Vec3();

var DirectionalLight = function (_Light) {
  jsonAsset._inheritsLoose(DirectionalLight, _Light);

  jsonAsset._createClass(DirectionalLight, [{
    key: "direction",
    set: function set(dir) {
      jsonAsset.Vec3.normalize(this._dir, dir);
    },
    get: function get() {
      return this._dir;
    }
  }, {
    key: "illuminance",
    set: function set(illum) {
      this._illuminance = illum;
    },
    get: function get() {
      return this._illuminance;
    }
  }]);

  function DirectionalLight() {
    var _this;

    _this = _Light.call(this) || this;
    _this._dir = new jsonAsset.Vec3(1.0, -1.0, -1.0);
    _this._illuminance = jsonAsset.Ambient.SUN_ILLUM;
    _this._type = exports.LightType.DIRECTIONAL;
    return _this;
  }

  var _proto = DirectionalLight.prototype;

  _proto.initialize = function initialize() {
    _Light.prototype.initialize.call(this);

    this.illuminance = jsonAsset.Ambient.SUN_ILLUM;
    this.direction = new jsonAsset.Vec3(1.0, -1.0, -1.0);
  };

  _proto.update = function update() {
    if (this._node && this._node.hasChangedFlags) {
      this.direction = jsonAsset.Vec3.transformQuat(_v3, _forward, this._node.worldRotation);
    }
  };

  return DirectionalLight;
}(Light);

var PassInstance = function (_Pass) {
  jsonAsset._inheritsLoose(PassInstance, _Pass);

  jsonAsset._createClass(PassInstance, [{
    key: "parent",
    get: function get() {
      return this._parent;
    }
  }]);

  function PassInstance(parent, owner) {
    var _this;

    _this = _Pass.call(this, parent.root) || this;
    _this._parent = void 0;
    _this._owner = void 0;
    _this._dontNotify = false;
    _this._parent = parent;
    _this._owner = owner;

    _this._doInit(_this._parent, true);

    for (var i = 0; i < _this._shaderInfo.blocks.length; i++) {
      var u = _this._shaderInfo.blocks[i];
      var block = _this._blocks[u.binding];
      var parentBlock = _this._parent.blocks[u.binding];
      block.set(parentBlock);
    }

    _this._setRootBufferDirty(true);

    var paren = _this._parent;

    for (var _i = 0; _i < _this._shaderInfo.samplerTextures.length; _i++) {
      var _u = _this._shaderInfo.samplerTextures[_i];

      for (var j = 0; j < _u.count; j++) {
        var sampler = paren._descriptorSet.getSampler(_u.binding, j);

        var texture = paren._descriptorSet.getTexture(_u.binding, j);

        _this._descriptorSet.bindSampler(_u.binding, sampler, j);

        _this._descriptorSet.bindTexture(_u.binding, texture, j);
      }
    }

    _Pass.prototype.tryCompile.call(jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = PassInstance.prototype;

  _proto.overridePipelineStates = function overridePipelineStates(original, overrides) {
    this._bs.reset();

    this._rs.reset();

    this._dss.reset();

    jsonAsset.Pass.fillPipelineInfo(this, original);
    jsonAsset.Pass.fillPipelineInfo(this, overrides);

    this._onStateChange();
  };

  _proto.tryCompile = function tryCompile(defineOverrides) {
    if (defineOverrides) {
      if (!jsonAsset.overrideMacros(this._defines, defineOverrides)) {
        return false;
      }
    }

    var res = _Pass.prototype.tryCompile.call(this);

    this._onStateChange();

    return res;
  };

  _proto.beginChangeStatesSilently = function beginChangeStatesSilently() {
    this._dontNotify = true;
  };

  _proto.endChangeStatesSilently = function endChangeStatesSilently() {
    this._dontNotify = false;
  };

  _proto._syncBatchingScheme = function _syncBatchingScheme() {
    this._defines.USE_BATCHING = this._defines.USE_INSTANCING = false;

    this._setBatchingScheme(jsonAsset.BatchingSchemes.NONE);
  };

  _proto._onStateChange = function _onStateChange() {
    this._setHash(jsonAsset.Pass.getPassHash(this));

    this._owner.onPassStateChange(this._dontNotify);
  };

  return PassInstance;
}(jsonAsset.Pass);

var MaterialInstance = function (_Material) {
  jsonAsset._inheritsLoose(MaterialInstance, _Material);

  jsonAsset._createClass(MaterialInstance, [{
    key: "parent",
    get: function get() {
      return this._parent;
    }
  }, {
    key: "owner",
    get: function get() {
      return this._owner;
    }
  }]);

  function MaterialInstance(info) {
    var _this;

    _this = _Material.call(this) || this;
    _this._passes = [];
    _this._parent = void 0;
    _this._owner = void 0;
    _this._subModelIdx = 0;
    _this._parent = info.parent;
    _this._owner = info.owner || null;
    _this._subModelIdx = info.subModelIdx || 0;

    _this.copy(_this._parent);

    return _this;
  }

  var _proto = MaterialInstance.prototype;

  _proto.recompileShaders = function recompileShaders(overrides, passIdx) {
    if (!this._passes || !this.effectAsset) {
      return;
    }

    if (passIdx === undefined) {
      for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._passes), _step; !(_step = _iterator()).done;) {
        var pass = _step.value;
        pass.tryCompile(overrides);
      }
    } else {
      this._passes[passIdx].tryCompile(overrides);
    }
  };

  _proto.overridePipelineStates = function overridePipelineStates(overrides, passIdx) {
    if (!this._passes || !this.effectAsset) {
      return;
    }

    var passInfos = this.effectAsset.techniques[this.technique].passes;

    if (passIdx === undefined) {
      for (var i = 0; i < this._passes.length; i++) {
        var pass = this._passes[i];
        var state = this._states[i] || (this._states[i] = {});

        for (var key in overrides) {
          state[key] = overrides[key];
        }

        pass.overridePipelineStates(passInfos[pass.passIndex], state);
      }
    } else {
      var _state = this._states[passIdx] || (this._states[passIdx] = {});

      for (var _key in overrides) {
        _state[_key] = overrides[_key];
      }

      this._passes[passIdx].overridePipelineStates(passInfos[passIdx], _state);
    }
  };

  _proto.destroy = function destroy() {
    this._doDestroy();

    return true;
  };

  _proto.onPassStateChange = function onPassStateChange(dontNotify) {
    this._hash = jsonAsset.Material.getHash(this);

    if (!dontNotify && this._owner) {
      this._owner._onRebuildPSO(this._subModelIdx, this);
    }
  };

  _proto._createPasses = function _createPasses() {
    var passes = [];
    var parentPasses = this._parent.passes;

    if (!parentPasses) {
      return passes;
    }

    for (var k = 0; k < parentPasses.length; ++k) {
      passes.push(new PassInstance(parentPasses[k], this));
    }

    return passes;
  };

  return MaterialInstance;
}(jsonAsset.Material);

var skybox_mesh = null;
var skybox_material = null;
var Skybox = function () {
  jsonAsset._createClass(Skybox, [{
    key: "model",
    get: function get() {
      return this._model;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(val) {
      this._setEnabled(val);

      if (val) this.activate();else this._updatePipeline();
    }
  }, {
    key: "useIBL",
    get: function get() {
      return this._useIBL;
    },
    set: function set(val) {
      this._setUseIBL(val);

      this._updatePipeline();
    }
  }, {
    key: "isRGBE",
    get: function get() {
      return this._isRGBE;
    },
    set: function set(val) {
      if (val) {
        if (skybox_material) {
          skybox_material.recompileShaders({
            USE_RGBE_CUBEMAP: val
          });
        }

        if (this._model) {
          this._model.setSubModelMaterial(0, skybox_material);
        }
      }

      this._setIsRGBE(val);

      this._updatePipeline();
    }
  }, {
    key: "envmap",
    get: function get() {
      return this._envmap;
    },
    set: function set(val) {
      this._envmap = val || this._default;

      if (this._envmap) {
        jsonAsset.legacyCC.director.root.pipeline.pipelineSceneData.ambient.albedoArray[3] = this._envmap.mipmapLevel;

        this._updateGlobalBinding();
      }
    }
  }, {
    key: "native",
    get: function get() {
      return this._nativeObj;
    }
  }]);

  function Skybox() {
    this._envmap = null;
    this._globalDSManager = null;
    this._model = null;
    this._default = null;
    this._enabled = false;
    this._useIBL = false;
    this._isRGBE = false;
  }

  var _proto = Skybox.prototype;

  _proto._setEnabled = function _setEnabled(val) {
    this._enabled = val;
  };

  _proto._setUseIBL = function _setUseIBL(val) {
    this._useIBL = val;
  };

  _proto._setIsRGBE = function _setIsRGBE(val) {
    this._isRGBE = val;
  };

  _proto.initialize = function initialize(skyboxInfo) {
    this._setEnabled(skyboxInfo.enabled);

    this._setUseIBL(skyboxInfo.useIBL);

    this._setIsRGBE(skyboxInfo.isRGBE);

    this._envmap = skyboxInfo.envmap;
  };

  _proto.activate = function activate() {
    var pipeline = jsonAsset.legacyCC.director.root.pipeline;
    var ambient = pipeline.pipelineSceneData.ambient;
    this._globalDSManager = pipeline.globalDSManager;
    this._default = jsonAsset.builtinResMgr.get('default-cube-texture');

    if (!this._model) {
      this._model = jsonAsset.legacyCC.director.root.createModel(jsonAsset.legacyCC.renderer.scene.Model);

      this._model._initLocalDescriptors = function () {};
    }

    if (!this._envmap) {
      this._envmap = this._default;
    }

    ambient.albedoArray[3] = this._envmap.mipmapLevel;

    if (!skybox_material) {
      var mat = new jsonAsset.Material();
      mat.initialize({
        effectName: 'skybox',
        defines: {
          USE_RGBE_CUBEMAP: this.isRGBE
        }
      });
      skybox_material = new MaterialInstance({
        parent: mat
      });
    } else {
      skybox_material.recompileShaders({
        USE_RGBE_CUBEMAP: this.isRGBE
      });
    }

    if (this.enabled) {
      if (!skybox_mesh) {
        skybox_mesh = jsonAsset.legacyCC.utils.createMesh(jsonAsset.legacyCC.primitives.box({
          width: 2,
          height: 2,
          length: 2
        }));
      }

      this._model.initSubModel(0, skybox_mesh.renderingSubMeshes[0], skybox_material);
    }

    this._updateGlobalBinding();

    this._updatePipeline();
  };

  _proto._updatePipeline = function _updatePipeline() {
    var value = this.useIBL ? this.isRGBE ? 2 : 1 : 0;
    var root = jsonAsset.legacyCC.director.root;
    var pipeline = root.pipeline;
    var current = pipeline.macros.CC_USE_IBL;

    if (current === value) {
      return;
    }

    pipeline.macros.CC_USE_IBL = value;
    root.onGlobalPipelineStateChanged();
  };

  _proto._updateGlobalBinding = function _updateGlobalBinding() {
    var texture = this.envmap.getGFXTexture();
    var sampler = jsonAsset.samplerLib.getSampler(jsonAsset.legacyCC.director._device, this.envmap.getSamplerHash());

    this._globalDSManager.bindSampler(jsonAsset.UNIFORM_ENVIRONMENT_BINDING, sampler);

    this._globalDSManager.bindTexture(jsonAsset.UNIFORM_ENVIRONMENT_BINDING, texture);

    this._globalDSManager.update();
  };

  _proto._destroy = function _destroy() {
  };

  _proto.destroy = function destroy() {
    this._destroy();
  };

  return Skybox;
}();
jsonAsset.legacyCC.Skybox = Skybox;

var SphereLight = function (_Light) {
  jsonAsset._inheritsLoose(SphereLight, _Light);

  var _proto = SphereLight.prototype;

  _proto._init = function _init() {
    _Light.prototype._init.call(this);
  };

  _proto._destroy = function _destroy() {
    _Light.prototype._destroy.call(this);
  };

  jsonAsset._createClass(SphereLight, [{
    key: "position",
    get: function get() {
      return this._pos;
    }
  }, {
    key: "size",
    set: function set(size) {
      this._size = size;
    },
    get: function get() {
      return this._size;
    }
  }, {
    key: "range",
    set: function set(range) {
      this._range = range;

      this._needUpdate = true;
    },
    get: function get() {
      return this._range;
    }
  }, {
    key: "luminance",
    set: function set(lum) {
      this._luminance = lum;
    },
    get: function get() {
      return this._luminance;
    }
  }, {
    key: "aabb",
    get: function get() {
      return this._aabb;
    }
  }]);

  function SphereLight() {
    var _this;

    _this = _Light.call(this) || this;
    _this._needUpdate = false;
    _this._size = 0.15;
    _this._range = 1.0;
    _this._luminance = 0;
    _this._pos = void 0;
    _this._aabb = void 0;
    _this._aabb = jsonAsset.AABB.create();
    _this._pos = new jsonAsset.Vec3();
    _this._type = exports.LightType.SPHERE;
    return _this;
  }

  _proto.initialize = function initialize() {
    _Light.prototype.initialize.call(this);

    var size = 0.15;
    this.size = size;
    this.range = 1.0;
    this.luminance = 1700 / nt2lm(size);
  };

  _proto.update = function update() {
    if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
      this._node.getWorldPosition(this._pos);

      var range = this._range;
      jsonAsset.AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, range, range, range);
      this._needUpdate = false;
    }
  };

  return SphereLight;
}(Light);

var _forward$1 = new jsonAsset.Vec3(0, 0, -1);

var _qt = new jsonAsset.Quat();

var _matView = new jsonAsset.Mat4();

var _matProj = new jsonAsset.Mat4();

var _matViewProj = new jsonAsset.Mat4();

var _matViewProjInv = new jsonAsset.Mat4();

var SpotLight = function (_Light) {
  jsonAsset._inheritsLoose(SpotLight, _Light);

  var _proto = SpotLight.prototype;

  _proto._init = function _init() {
    _Light.prototype._init.call(this);
  };

  _proto._destroy = function _destroy() {
    _Light.prototype._destroy.call(this);
  };

  _proto._setDirection = function _setDirection(dir) {
    this._dir.set(dir);
  };

  jsonAsset._createClass(SpotLight, [{
    key: "position",
    get: function get() {
      return this._pos;
    }
  }, {
    key: "size",
    set: function set(size) {
      this._size = size;
    },
    get: function get() {
      return this._size;
    }
  }, {
    key: "range",
    set: function set(range) {
      this._range = range;

      this._needUpdate = true;
    },
    get: function get() {
      return this._range;
    }
  }, {
    key: "luminance",
    set: function set(lum) {
      this._luminance = lum;
    },
    get: function get() {
      return this._luminance;
    }
  }, {
    key: "direction",
    get: function get() {
      return this._dir;
    }
  }, {
    key: "spotAngle",
    get: function get() {
      return this._spotAngle;
    },
    set: function set(val) {
      this._angle = val;
      this._spotAngle = Math.cos(val * 0.5);

      this._needUpdate = true;
    }
  }, {
    key: "aspect",
    set: function set(val) {
      this._aspect = val;

      this._needUpdate = true;
    },
    get: function get() {
      return this._aspect;
    }
  }, {
    key: "aabb",
    get: function get() {
      return this._aabb;
    }
  }, {
    key: "frustum",
    get: function get() {
      return this._frustum;
    }
  }]);

  function SpotLight() {
    var _this;

    _this = _Light.call(this) || this;
    _this._dir = new jsonAsset.Vec3(1.0, -1.0, -1.0);
    _this._range = 5.0;
    _this._spotAngle = Math.cos(Math.PI / 6);
    _this._pos = void 0;
    _this._aabb = void 0;
    _this._frustum = void 0;
    _this._angle = 0;
    _this._needUpdate = false;
    _this._size = 0.15;
    _this._luminance = 0;
    _this._aspect = 0;
    _this._aabb = jsonAsset.AABB.create();
    _this._frustum = jsonAsset.Frustum.create();
    _this._pos = new jsonAsset.Vec3();
    _this._type = exports.LightType.SPOT;
    return _this;
  }

  _proto.initialize = function initialize() {
    _Light.prototype.initialize.call(this);

    var size = 0.15;
    this.size = size;
    this.aspect = 1.0;
    this.luminance = 1700 / nt2lm(size);
    this.range = Math.cos(Math.PI / 6);

    this._setDirection(new jsonAsset.Vec3(1.0, -1.0, -1.0));
  };

  _proto.update = function update() {
    if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
      this._node.getWorldPosition(this._pos);

      jsonAsset.Vec3.transformQuat(this._dir, _forward$1, this._node.getWorldRotation(_qt));
      jsonAsset.Vec3.normalize(this._dir, this._dir);
      jsonAsset.AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, this._range, this._range, this._range);

      this._node.getWorldRT(_matView);

      jsonAsset.Mat4.invert(_matView, _matView);
      jsonAsset.Mat4.perspective(_matProj, this._angle, 1.0, 0.001, this._range);
      jsonAsset.Mat4.multiply(_matViewProj, _matProj, _matView);

      this._frustum.update(_matViewProj, _matViewProjInv);

      this._needUpdate = false;
    }
  };

  return SpotLight;
}(Light);

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;
var RenderStage = (_dec = jsonAsset.ccclass('RenderStage'), _dec2 = jsonAsset.displayOrder(), _dec3 = jsonAsset.displayOrder(), _dec4 = jsonAsset.displayOrder(), _dec(_class = (_class2 = (_temp = function () {
  function RenderStage() {
    jsonAsset._initializerDefineProperty(this, "_name", _descriptor, this);

    jsonAsset._initializerDefineProperty(this, "_priority", _descriptor2, this);

    jsonAsset._initializerDefineProperty(this, "_tag", _descriptor3, this);

    this._pipeline = void 0;
    this._flow = void 0;
  }

  var _proto = RenderStage.prototype;

  _proto.initialize = function initialize(info) {
    this._name = info.name;
    this._priority = info.priority;

    if (info.tag) {
      this._tag = info.tag;
    }

    return true;
  };

  _proto.activate = function activate(pipeline, flow) {
    this._pipeline = pipeline;
    this._flow = flow;
  };

  jsonAsset._createClass(RenderStage, [{
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "priority",
    get: function get() {
      return this._priority;
    }
  }, {
    key: "tag",
    get: function get() {
      return this._tag;
    }
  }]);

  return RenderStage;
}(), _temp), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_name", [_dec2, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_priority", [_dec3, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_tag", [_dec4, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
jsonAsset.legacyCC.RenderStage = RenderStage;

var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5, _dec6, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4, _temp$1;
var RenderFlow = (_dec$1 = jsonAsset.ccclass('RenderFlow'), _dec2$1 = jsonAsset.displayOrder(), _dec3$1 = jsonAsset.displayOrder(), _dec4$1 = jsonAsset.displayOrder(), _dec5 = jsonAsset.displayOrder(), _dec6 = jsonAsset.type([RenderStage]), _dec$1(_class$1 = (_class2$1 = (_temp$1 = function () {
  function RenderFlow() {
    jsonAsset._initializerDefineProperty(this, "_name", _descriptor$1, this);

    jsonAsset._initializerDefineProperty(this, "_priority", _descriptor2$1, this);

    jsonAsset._initializerDefineProperty(this, "_tag", _descriptor3$1, this);

    jsonAsset._initializerDefineProperty(this, "_stages", _descriptor4, this);

    this._pipeline = void 0;
  }

  var _proto = RenderFlow.prototype;

  _proto.initialize = function initialize(info) {
    this._name = info.name;
    this._priority = info.priority;
    this._stages = info.stages;

    if (info.tag) {
      this._tag = info.tag;
    }

    return true;
  };

  _proto.activate = function activate(pipeline) {
    this._pipeline = pipeline;

    this._stages.sort(function (a, b) {
      return a.priority - b.priority;
    });

    for (var i = 0, len = this._stages.length; i < len; i++) {
      this._stages[i].activate(pipeline, this);
    }
  };

  _proto.render = function render(camera) {
    for (var i = 0, len = this._stages.length; i < len; i++) {
      this._stages[i].render(camera);
    }
  };

  _proto.destroy = function destroy() {
    for (var i = 0, len = this._stages.length; i < len; i++) {
      this._stages[i].destroy();
    }

    this._stages.length = 0;
  };

  jsonAsset._createClass(RenderFlow, [{
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "priority",
    get: function get() {
      return this._priority;
    }
  }, {
    key: "tag",
    get: function get() {
      return this._tag;
    }
  }, {
    key: "stages",
    get: function get() {
      return this._stages;
    }
  }, {
    key: "pipeline",
    get: function get() {
      return this._pipeline;
    }
  }]);

  return RenderFlow;
}(), _temp$1), (_descriptor$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_name", [_dec2$1, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_priority", [_dec3$1, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_tag", [_dec4$1, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_stages", [_dec5, _dec6, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$1)) || _class$1);
jsonAsset.legacyCC.RenderFlow = RenderFlow;

var _tempVec3 = new jsonAsset.Vec3();

var _dir_negate = new jsonAsset.Vec3();

var _vec3_p = new jsonAsset.Vec3();

var _mat4_trans = new jsonAsset.Mat4();

var _castWorldBounds = new jsonAsset.AABB();

var _castBoundsInited = false;
var _validLights = [];

var _sphere = jsonAsset.Sphere.create(0, 0, 0, 1);

var roPool = new jsonAsset.Pool(function () {
  return {
    model: null,
    depth: 0
  };
}, 128);
var shadowPool = new jsonAsset.Pool(function () {
  return {
    model: null,
    depth: 0
  };
}, 128);

function getRenderObject(model, camera) {
  var depth = 0;

  if (model.node) {
    jsonAsset.Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
    depth = jsonAsset.Vec3.dot(_tempVec3, camera.forward);
  }

  var ro = roPool.alloc();
  ro.model = model;
  ro.depth = depth;
  return ro;
}

function getCastShadowRenderObject(model, camera) {
  var depth = 0;

  if (model.node) {
    jsonAsset.Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
    depth = jsonAsset.Vec3.dot(_tempVec3, camera.forward);
  }

  var ro = shadowPool.alloc();
  ro.model = model;
  ro.depth = depth;
  return ro;
}

function getShadowWorldMatrix(pipeline, rotation, dir, out) {
  var shadows = pipeline.pipelineSceneData.shadows;
  jsonAsset.Vec3.negate(_dir_negate, dir);
  var distance = shadows.sphere.radius * jsonAsset.Shadows.COEFFICIENT_OF_EXPANSION;
  jsonAsset.Vec3.multiplyScalar(_vec3_p, _dir_negate, distance);
  jsonAsset.Vec3.add(_vec3_p, _vec3_p, shadows.sphere.center);
  out.set(_vec3_p);
  jsonAsset.Mat4.fromRT(_mat4_trans, rotation, _vec3_p);
  return _mat4_trans;
}

function updateDirLight(pipeline, light) {
  var shadows = pipeline.pipelineSceneData.shadows;
  var dir = light.direction;
  var n = shadows.normal;
  var d = shadows.distance + 0.001;
  var NdL = jsonAsset.Vec3.dot(n, dir);
  var scale = 1 / NdL;
  var lx = dir.x * scale;
  var ly = dir.y * scale;
  var lz = dir.z * scale;
  var nx = n.x;
  var ny = n.y;
  var nz = n.z;
  var m = shadows.matLight;
  m.m00 = 1 - nx * lx;
  m.m01 = -nx * ly;
  m.m02 = -nx * lz;
  m.m03 = 0;
  m.m04 = -ny * lx;
  m.m05 = 1 - ny * ly;
  m.m06 = -ny * lz;
  m.m07 = 0;
  m.m08 = -nz * lx;
  m.m09 = -nz * ly;
  m.m10 = 1 - nz * lz;
  m.m11 = 0;
  m.m12 = lx * d;
  m.m13 = ly * d;
  m.m14 = lz * d;
  m.m15 = 1;
  pipeline.pipelineUBO.updateShadowUBORange(jsonAsset.UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET, shadows.matLight);
}

function updatePlanarPROJ(shadowInfo, light, shadowUBO) {
  var dir = light.direction;
  var n = shadowInfo.normal;
  var d = shadowInfo.distance + 0.001;
  var NdL = jsonAsset.Vec3.dot(n, dir);
  var scale = 1 / NdL;
  var lx = dir.x * scale;
  var ly = dir.y * scale;
  var lz = dir.z * scale;
  var nx = n.x;
  var ny = n.y;
  var nz = n.z;
  var m = shadowInfo.matLight;
  m.m00 = 1 - nx * lx;
  m.m01 = -nx * ly;
  m.m02 = -nx * lz;
  m.m03 = 0;
  m.m04 = -ny * lx;
  m.m05 = 1 - ny * ly;
  m.m06 = -ny * lz;
  m.m07 = 0;
  m.m08 = -nz * lx;
  m.m09 = -nz * ly;
  m.m10 = 1 - nz * lz;
  m.m11 = 0;
  m.m12 = lx * d;
  m.m13 = ly * d;
  m.m14 = lz * d;
  m.m15 = 1;
  jsonAsset.Mat4.toArray(shadowUBO, m, jsonAsset.UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET);
}
function lightCollecting(camera, lightNumber) {
  _validLights.length = 0;
  var scene = camera.scene;

  _validLights.push(scene.mainLight);

  var spotLights = scene.spotLights;

  for (var i = 0; i < spotLights.length; i++) {
    var light = spotLights[i];
    jsonAsset.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

    if (jsonAsset.intersect.sphereFrustum(_sphere, camera.frustum) && lightNumber > _validLights.length) {
      _validLights.push(light);
    }
  }

  return _validLights;
}
function sceneCulling(pipeline, camera) {
  var scene = camera.scene;
  var mainLight = scene.mainLight;
  var sceneData = pipeline.pipelineSceneData;
  var shadows = sceneData.shadows;
  var skybox = sceneData.skybox;
  var renderObjects = sceneData.renderObjects;
  roPool.freeArray(renderObjects);
  renderObjects.length = 0;
  var shadowObjects = null;
  _castBoundsInited = false;

  if (shadows.enabled) {
    pipeline.pipelineUBO.updateShadowUBORange(jsonAsset.UBOShadow.SHADOW_COLOR_OFFSET, shadows.shadowColor);

    if (shadows.type === jsonAsset.ShadowType.ShadowMap) {
      shadowObjects = pipeline.pipelineSceneData.shadowObjects;
      shadowPool.freeArray(shadowObjects);
      shadowObjects.length = 0;
    }
  }

  if (mainLight) {
    if (shadows.type === jsonAsset.ShadowType.Planar) {
      updateDirLight(pipeline, mainLight);
    }
  }

  if (skybox.enabled && skybox.model && camera.clearFlag & SKYBOX_FLAG) {
    renderObjects.push(getRenderObject(skybox.model, camera));
  }

  var models = scene.models;
  var visibility = camera.visibility;

  for (var i = 0; i < models.length; i++) {
    var model = models[i];

    if (model.enabled) {
      if (model.node && (visibility & model.node.layer) === model.node.layer || visibility & model.visFlags) {
        if (shadowObjects != null && model.castShadow && model.worldBounds) {
          if (!_castBoundsInited) {
            _castWorldBounds.copy(model.worldBounds);

            _castBoundsInited = true;
          }

          jsonAsset.AABB.merge(_castWorldBounds, _castWorldBounds, model.worldBounds);
          shadowObjects.push(getCastShadowRenderObject(model, camera));
        }

        if (model.worldBounds && !jsonAsset.intersect.aabbFrustum(model.worldBounds, camera.frustum)) {
          continue;
        }

        renderObjects.push(getRenderObject(model, camera));
      }
    }
  }

  if (_castWorldBounds) {
    jsonAsset.AABB.toBoundingSphere(shadows.sphere, _castWorldBounds);
  }
}

var matShadowView = new jsonAsset.Mat4();
var matShadowViewProj = new jsonAsset.Mat4();
var vec3_center = new jsonAsset.Vec3();
var vec4ShadowInfo = new jsonAsset.Vec4();
var PipelineUBO = function () {
  function PipelineUBO() {
    this._globalUBO = new Float32Array(jsonAsset.UBOGlobal.COUNT);
    this._cameraUBO = new Float32Array(jsonAsset.UBOCamera.COUNT);
    this._shadowUBO = new Float32Array(jsonAsset.UBOShadow.COUNT);
  }

  PipelineUBO.updateGlobalUBOView = function updateGlobalUBOView(pipeline, bufferView) {
    var device = pipeline.device;
    var root = jsonAsset.legacyCC.director.root;
    var fv = bufferView;
    var shadingWidth = Math.floor(device.width);
    var shadingHeight = Math.floor(device.height);
    fv[jsonAsset.UBOGlobal.TIME_OFFSET] = root.cumulativeTime;
    fv[jsonAsset.UBOGlobal.TIME_OFFSET + 1] = root.frameTime;
    fv[jsonAsset.UBOGlobal.TIME_OFFSET + 2] = jsonAsset.legacyCC.director.getTotalFrames();
    fv[jsonAsset.UBOGlobal.SCREEN_SIZE_OFFSET] = device.width;
    fv[jsonAsset.UBOGlobal.SCREEN_SIZE_OFFSET + 1] = device.height;
    fv[jsonAsset.UBOGlobal.SCREEN_SIZE_OFFSET + 2] = 1.0 / device.width;
    fv[jsonAsset.UBOGlobal.SCREEN_SIZE_OFFSET + 3] = 1.0 / device.height;
    fv[jsonAsset.UBOGlobal.NATIVE_SIZE_OFFSET] = shadingWidth;
    fv[jsonAsset.UBOGlobal.NATIVE_SIZE_OFFSET + 1] = shadingHeight;
    fv[jsonAsset.UBOGlobal.NATIVE_SIZE_OFFSET + 2] = 1.0 / fv[jsonAsset.UBOGlobal.NATIVE_SIZE_OFFSET];
    fv[jsonAsset.UBOGlobal.NATIVE_SIZE_OFFSET + 3] = 1.0 / fv[jsonAsset.UBOGlobal.NATIVE_SIZE_OFFSET + 1];
  };

  PipelineUBO.updateCameraUBOView = function updateCameraUBOView(pipeline, bufferView, camera) {
    var device = pipeline.device;
    var scene = camera.scene ? camera.scene : jsonAsset.legacyCC.director.getScene().renderScene;
    var mainLight = scene.mainLight;
    var sceneData = pipeline.pipelineSceneData;
    var ambient = sceneData.ambient;
    var fog = sceneData.fog;
    var shadingWidth = Math.floor(device.width);
    var shadingHeight = Math.floor(device.height);
    var cv = bufferView;
    var exposure = camera.exposure;
    var isHDR = sceneData.isHDR;
    var shadingScale = sceneData.shadingScale;
    var fpScale = sceneData.fpScale;
    cv[jsonAsset.UBOCamera.SCREEN_SCALE_OFFSET] = camera.width / shadingWidth * shadingScale;
    cv[jsonAsset.UBOCamera.SCREEN_SCALE_OFFSET + 1] = camera.height / shadingHeight * shadingScale;
    cv[jsonAsset.UBOCamera.SCREEN_SCALE_OFFSET + 2] = 1.0 / cv[jsonAsset.UBOCamera.SCREEN_SCALE_OFFSET];
    cv[jsonAsset.UBOCamera.SCREEN_SCALE_OFFSET + 3] = 1.0 / cv[jsonAsset.UBOCamera.SCREEN_SCALE_OFFSET + 1];
    cv[jsonAsset.UBOCamera.EXPOSURE_OFFSET] = exposure;
    cv[jsonAsset.UBOCamera.EXPOSURE_OFFSET + 1] = 1.0 / exposure;
    cv[jsonAsset.UBOCamera.EXPOSURE_OFFSET + 2] = isHDR ? 1.0 : 0.0;
    cv[jsonAsset.UBOCamera.EXPOSURE_OFFSET + 3] = fpScale / exposure;

    if (mainLight) {
      jsonAsset.Vec3.toArray(cv, mainLight.direction, jsonAsset.UBOCamera.MAIN_LIT_DIR_OFFSET);
      jsonAsset.Vec3.toArray(cv, mainLight.color, jsonAsset.UBOCamera.MAIN_LIT_COLOR_OFFSET);

      if (mainLight.useColorTemperature) {
        var colorTempRGB = mainLight.colorTemperatureRGB;
        cv[jsonAsset.UBOCamera.MAIN_LIT_COLOR_OFFSET] *= colorTempRGB.x;
        cv[jsonAsset.UBOCamera.MAIN_LIT_COLOR_OFFSET + 1] *= colorTempRGB.y;
        cv[jsonAsset.UBOCamera.MAIN_LIT_COLOR_OFFSET + 2] *= colorTempRGB.z;
      }

      if (isHDR) {
        cv[jsonAsset.UBOCamera.MAIN_LIT_COLOR_OFFSET + 3] = mainLight.illuminance * fpScale;
      } else {
        cv[jsonAsset.UBOCamera.MAIN_LIT_COLOR_OFFSET + 3] = mainLight.illuminance * exposure;
      }
    } else {
      jsonAsset.Vec3.toArray(cv, jsonAsset.Vec3.UNIT_Z, jsonAsset.UBOCamera.MAIN_LIT_DIR_OFFSET);
      jsonAsset.Vec4.toArray(cv, jsonAsset.Vec4.ZERO, jsonAsset.UBOCamera.MAIN_LIT_COLOR_OFFSET);
    }

    var skyColor = ambient.colorArray;

    if (isHDR) {
      skyColor[3] = ambient.skyIllum * fpScale;
    } else {
      skyColor[3] = ambient.skyIllum * exposure;
    }

    cv.set(skyColor, jsonAsset.UBOCamera.AMBIENT_SKY_OFFSET);
    cv.set(ambient.albedoArray, jsonAsset.UBOCamera.AMBIENT_GROUND_OFFSET);
    jsonAsset.Mat4.toArray(cv, camera.matView, jsonAsset.UBOCamera.MAT_VIEW_OFFSET);
    jsonAsset.Mat4.toArray(cv, camera.node.worldMatrix, jsonAsset.UBOCamera.MAT_VIEW_INV_OFFSET);
    jsonAsset.Vec3.toArray(cv, camera.position, jsonAsset.UBOCamera.CAMERA_POS_OFFSET);
    jsonAsset.Mat4.toArray(cv, camera.matProj, jsonAsset.UBOCamera.MAT_PROJ_OFFSET);
    jsonAsset.Mat4.toArray(cv, camera.matProjInv, jsonAsset.UBOCamera.MAT_PROJ_INV_OFFSET);
    jsonAsset.Mat4.toArray(cv, camera.matViewProj, jsonAsset.UBOCamera.MAT_VIEW_PROJ_OFFSET);
    jsonAsset.Mat4.toArray(cv, camera.matViewProjInv, jsonAsset.UBOCamera.MAT_VIEW_PROJ_INV_OFFSET);
    cv[jsonAsset.UBOCamera.CAMERA_POS_OFFSET + 3] = this.getCombineSignY();
    cv.set(fog.colorArray, jsonAsset.UBOCamera.GLOBAL_FOG_COLOR_OFFSET);
    cv[jsonAsset.UBOCamera.GLOBAL_FOG_BASE_OFFSET] = fog.fogStart;
    cv[jsonAsset.UBOCamera.GLOBAL_FOG_BASE_OFFSET + 1] = fog.fogEnd;
    cv[jsonAsset.UBOCamera.GLOBAL_FOG_BASE_OFFSET + 2] = fog.fogDensity;
    cv[jsonAsset.UBOCamera.GLOBAL_FOG_ADD_OFFSET] = fog.fogTop;
    cv[jsonAsset.UBOCamera.GLOBAL_FOG_ADD_OFFSET + 1] = fog.fogRange;
    cv[jsonAsset.UBOCamera.GLOBAL_FOG_ADD_OFFSET + 2] = fog.fogAtten;
  };

  PipelineUBO.updateShadowUBOView = function updateShadowUBOView(pipeline, bufferView, camera) {
    var device = pipeline.device;
    var mainLight = camera.scene.mainLight;
    var sceneData = pipeline.pipelineSceneData;
    var shadowInfo = sceneData.shadows;
    var sv = bufferView;

    if (shadowInfo.enabled) {
      if (mainLight && shadowInfo.type === jsonAsset.ShadowType.ShadowMap) {
        var shadowCameraView;
        var x = 0;
        var y = 0;
        var far = 0;

        if (shadowInfo.autoAdapt) {
          shadowCameraView = getShadowWorldMatrix(pipeline, mainLight.node.getWorldRotation(), mainLight.direction, vec3_center);
          var radius = shadowInfo.sphere.radius;
          x = radius;
          y = radius;
          var halfFar = jsonAsset.Vec3.distance(shadowInfo.sphere.center, vec3_center);
          far = Math.min(halfFar * jsonAsset.Shadows.COEFFICIENT_OF_EXPANSION, jsonAsset.Shadows.MAX_FAR);
        } else {
          shadowCameraView = mainLight.node.getWorldMatrix();
          x = shadowInfo.orthoSize;
          y = shadowInfo.orthoSize;
          far = shadowInfo.far;
        }

        jsonAsset.Mat4.toArray(sv, shadowCameraView, jsonAsset.UBOShadow.MAT_LIGHT_VIEW_OFFSET);
        jsonAsset.Mat4.invert(matShadowView, shadowCameraView);
        jsonAsset.Mat4.ortho(matShadowViewProj, -x, x, -y, y, shadowInfo.near, far, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);
        jsonAsset.Mat4.multiply(matShadowViewProj, matShadowViewProj, matShadowView);
        jsonAsset.Mat4.toArray(sv, matShadowViewProj, jsonAsset.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);
        var linear = jsonAsset.supportsHalfFloatTexture(device) ? 1.0 : 0.0;
        var packing = linear ? 0.0 : 1.0;
        sv[jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 0] = shadowInfo.near;
        sv[jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 1] = far;
        sv[jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 2] = linear;
        sv[jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 3] = 1.0 - shadowInfo.saturation;
        sv[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
        sv[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
        sv[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
        sv[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
        sv[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 0.0;
        sv[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
        sv[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
        sv[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0;
      } else if (mainLight && shadowInfo.type === jsonAsset.ShadowType.Planar) {
        updatePlanarPROJ(shadowInfo, mainLight, sv);
      }

      jsonAsset.Color$1.toArray(sv, shadowInfo.shadowColor, jsonAsset.UBOShadow.SHADOW_COLOR_OFFSET);
    }
  };

  PipelineUBO.updateShadowUBOLightView = function updateShadowUBOLightView(pipeline, bufferView, light) {
    var device = pipeline.device;
    var shadowInfo = pipeline.pipelineSceneData.shadows;
    var sv = bufferView;
    var linear = jsonAsset.supportsHalfFloatTexture(device) ? 1.0 : 0.0;
    var packing = linear ? 0.0 : 1.0;
    var _x = 0;
    var _y = 0;
    var _far = 0;
    var shadowCameraView;

    switch (light.type) {
      case exports.LightType.DIRECTIONAL:
        light.update();

        if (shadowInfo.autoAdapt) {
          var node = light.node;

          if (node) {
            shadowCameraView = getShadowWorldMatrix(pipeline, node.getWorldRotation(), light.direction, vec3_center);
          }

          var radius = shadowInfo.sphere.radius;
          _x = radius;
          _y = radius;
          var halfFar = jsonAsset.Vec3.distance(shadowInfo.sphere.center, vec3_center);
          _far = Math.min(halfFar * jsonAsset.Shadows.COEFFICIENT_OF_EXPANSION, jsonAsset.Shadows.MAX_FAR);
        } else {
          shadowCameraView = light.node.getWorldMatrix();
          _x = shadowInfo.orthoSize;
          _y = shadowInfo.orthoSize;
          _far = shadowInfo.far;
        }

        jsonAsset.Mat4.toArray(sv, shadowCameraView, jsonAsset.UBOShadow.MAT_LIGHT_VIEW_OFFSET);
        jsonAsset.Mat4.invert(matShadowView, shadowCameraView);
        vec4ShadowInfo.set(shadowInfo.near, _far, linear, 1.0 - shadowInfo.saturation);
        jsonAsset.Vec4.toArray(sv, vec4ShadowInfo, jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET);
        vec4ShadowInfo.set(0.0, packing, shadowInfo.normalBias, 0.0);
        jsonAsset.Vec4.toArray(sv, vec4ShadowInfo, jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET);
        jsonAsset.Mat4.ortho(matShadowViewProj, -_x, _x, -_y, _y, shadowInfo.near, _far, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);
        break;

      case exports.LightType.SPOT:
        jsonAsset.Mat4.toArray(sv, light.node.getWorldMatrix(), jsonAsset.UBOShadow.MAT_LIGHT_VIEW_OFFSET);
        jsonAsset.Mat4.invert(matShadowView, light.node.getWorldMatrix());
        vec4ShadowInfo.set(0.01, light.range, linear, 1.0 - shadowInfo.saturation);
        jsonAsset.Vec4.toArray(sv, vec4ShadowInfo, jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET);
        vec4ShadowInfo.set(1.0, packing, shadowInfo.normalBias, 0.0);
        jsonAsset.Vec4.toArray(sv, vec4ShadowInfo, jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET);
        jsonAsset.Mat4.perspective(matShadowViewProj, light.spotAngle, light.aspect, 0.001, light.range);
        break;
    }

    jsonAsset.Mat4.multiply(matShadowViewProj, matShadowViewProj, matShadowView);
    jsonAsset.Mat4.toArray(sv, matShadowViewProj, jsonAsset.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);
    vec4ShadowInfo.set(shadowInfo.size.x, shadowInfo.size.y, shadowInfo.pcf, shadowInfo.bias);
    jsonAsset.Vec4.toArray(sv, vec4ShadowInfo, jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET);
    jsonAsset.Color$1.toArray(sv, shadowInfo.shadowColor, jsonAsset.UBOShadow.SHADOW_COLOR_OFFSET);
  };

  PipelineUBO.getCombineSignY = function getCombineSignY() {
    return PipelineUBO._combineSignY;
  };

  var _proto = PipelineUBO.prototype;

  _proto._initCombineSignY = function _initCombineSignY() {
    var device = this._device;
    PipelineUBO._combineSignY = device.capabilities.screenSpaceSignY * 0.5 + 0.5 << 1 | device.capabilities.clipSpaceSignY * 0.5 + 0.5;
  };

  _proto.activate = function activate(device, pipeline) {
    this._device = device;
    this._pipeline = pipeline;
    var ds = this._pipeline.descriptorSet;

    this._initCombineSignY();

    var globalUBO = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOGlobal.SIZE, jsonAsset.UBOGlobal.SIZE));
    ds.bindBuffer(jsonAsset.UBOGlobal.BINDING, globalUBO);
    var cameraUBO = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOCamera.SIZE, jsonAsset.UBOCamera.SIZE));
    ds.bindBuffer(jsonAsset.UBOCamera.BINDING, cameraUBO);
    var shadowUBO = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOShadow.SIZE, jsonAsset.UBOShadow.SIZE));
    ds.bindBuffer(jsonAsset.UBOShadow.BINDING, shadowUBO);
  };

  _proto.updateGlobalUBO = function updateGlobalUBO() {
    var globalDSManager = this._pipeline.globalDSManager;
    var ds = this._pipeline.descriptorSet;
    var cmdBuffer = this._pipeline.commandBuffers;
    ds.update();
    PipelineUBO.updateGlobalUBOView(this._pipeline, this._globalUBO);
    cmdBuffer[0].updateBuffer(ds.getBuffer(jsonAsset.UBOGlobal.BINDING), this._globalUBO);
    globalDSManager.bindBuffer(jsonAsset.UBOGlobal.BINDING, ds.getBuffer(jsonAsset.UBOGlobal.BINDING));
    globalDSManager.update();
  };

  _proto.updateCameraUBO = function updateCameraUBO(camera) {
    var globalDSManager = this._pipeline.globalDSManager;
    var ds = this._pipeline.descriptorSet;
    var cmdBuffer = this._pipeline.commandBuffers;
    PipelineUBO.updateCameraUBOView(this._pipeline, this._cameraUBO, camera);
    cmdBuffer[0].updateBuffer(ds.getBuffer(jsonAsset.UBOCamera.BINDING), this._cameraUBO);
    globalDSManager.bindBuffer(jsonAsset.UBOCamera.BINDING, ds.getBuffer(jsonAsset.UBOCamera.BINDING));
    globalDSManager.update();
  };

  _proto.updateShadowUBO = function updateShadowUBO(camera) {
    var sceneData = this._pipeline.pipelineSceneData;
    var shadowInfo = sceneData.shadows;
    if (!shadowInfo.enabled) return;
    var ds = this._pipeline.descriptorSet;
    var cmdBuffer = this._pipeline.commandBuffers;
    var shadowFrameBufferMap = sceneData.shadowFrameBufferMap;
    var mainLight = camera.scene.mainLight;
    ds.update();

    if (mainLight && shadowFrameBufferMap.has(mainLight)) {
      ds.bindTexture(jsonAsset.UNIFORM_SHADOWMAP_BINDING, shadowFrameBufferMap.get(mainLight).colorTextures[0]);
    }

    PipelineUBO.updateShadowUBOView(this._pipeline, this._shadowUBO, camera);
    cmdBuffer[0].updateBuffer(ds.getBuffer(jsonAsset.UBOShadow.BINDING), this._shadowUBO);
  };

  _proto.updateShadowUBOLight = function updateShadowUBOLight(light) {
    var ds = this._pipeline.descriptorSet;
    PipelineUBO.updateShadowUBOLightView(this._pipeline, this._shadowUBO, light);
    ds.getBuffer(jsonAsset.UBOShadow.BINDING).update(this._shadowUBO);
  };

  _proto.updateShadowUBORange = function updateShadowUBORange(offset, data) {
    if (data instanceof jsonAsset.Mat4) {
      jsonAsset.Mat4.toArray(this._shadowUBO, data, offset);
    } else if (data instanceof jsonAsset.Color$1) {
      jsonAsset.Color$1.toArray(this._shadowUBO, data, offset);
    }
  };

  _proto.destroy = function destroy() {};

  return PipelineUBO;
}();
PipelineUBO._combineSignY = 0;

var _samplerLinearInfo = [jsonAsset.Filter.LINEAR, jsonAsset.Filter.LINEAR, jsonAsset.Filter.NONE, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP];
var _samplerPointInfo = [jsonAsset.Filter.POINT, jsonAsset.Filter.POINT, jsonAsset.Filter.NONE, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP];
var GlobalDSManager = function () {
  jsonAsset._createClass(GlobalDSManager, [{
    key: "descriptorSetMap",
    get: function get() {
      return this._descriptorSetMap;
    }
  }, {
    key: "linearSampler",
    get: function get() {
      return this._linearSampler;
    }
  }, {
    key: "pointSampler",
    get: function get() {
      return this._pointSampler;
    }
  }, {
    key: "descriptorSetLayout",
    get: function get() {
      return this._descriptorSetLayout;
    }
  }, {
    key: "globalDescriptorSet",
    get: function get() {
      return this._globalDescriptorSet;
    }
  }]);

  function GlobalDSManager(pipeline) {
    this._device = void 0;
    this._descriptorSetMap = new Map();
    this._globalDescriptorSet = void 0;
    this._descriptorSetLayout = void 0;
    this._linearSampler = void 0;
    this._pointSampler = void 0;
    this._device = pipeline.device;
    var linearSamplerHash = jsonAsset.genSamplerHash(_samplerLinearInfo);
    this._linearSampler = jsonAsset.samplerLib.getSampler(this._device, linearSamplerHash);
    var pointSamplerHash = jsonAsset.genSamplerHash(_samplerPointInfo);
    this._pointSampler = jsonAsset.samplerLib.getSampler(this._device, pointSamplerHash);
    var layoutInfo = new jsonAsset.DescriptorSetLayoutInfo(jsonAsset.globalDescriptorSetLayout.bindings);
    this._descriptorSetLayout = this._device.createDescriptorSetLayout(layoutInfo);
    this._globalDescriptorSet = this._device.createDescriptorSet(new jsonAsset.DescriptorSetInfo(this._descriptorSetLayout));
  }

  var _proto = GlobalDSManager.prototype;

  _proto.bindBuffer = function bindBuffer(binding, buffer) {
    this._globalDescriptorSet.bindBuffer(binding, buffer);

    var it = this._descriptorSetMap.values();

    var res = it.next();

    while (!res.done) {
      var descriptorSet = res.value;
      descriptorSet.bindBuffer(binding, buffer);
      res = it.next();
    }
  };

  _proto.bindSampler = function bindSampler(binding, sampler) {
    this._globalDescriptorSet.bindSampler(binding, sampler);

    var it = this._descriptorSetMap.values();

    var res = it.next();

    while (!res.done) {
      var descriptorSet = res.value;
      descriptorSet.bindSampler(binding, sampler);
      res = it.next();
    }
  };

  _proto.bindTexture = function bindTexture(binding, texture) {
    this._globalDescriptorSet.bindTexture(binding, texture);

    var it = this._descriptorSetMap.values();

    var res = it.next();

    while (!res.done) {
      var descriptorSet = res.value;
      descriptorSet.bindTexture(binding, texture);
      res = it.next();
    }
  };

  _proto.update = function update() {
    this._globalDescriptorSet.update();

    var it = this._descriptorSetMap.values();

    var res = it.next();

    while (!res.done) {
      var descriptorSet = res.value;
      descriptorSet.update();
      res = it.next();
    }
  };

  _proto.getOrCreateDescriptorSet = function getOrCreateDescriptorSet(idx) {
    var device = this._device;

    if (!this._descriptorSetMap.has(idx)) {
      var globalDescriptorSet = this._globalDescriptorSet;
      var descriptorSet = device.createDescriptorSet(new jsonAsset.DescriptorSetInfo(this._descriptorSetLayout));

      this._descriptorSetMap.set(idx, descriptorSet);

      for (var i = jsonAsset.PipelineGlobalBindings.UBO_GLOBAL; i < jsonAsset.PipelineGlobalBindings.COUNT; i++) {
        descriptorSet.bindBuffer(i, globalDescriptorSet.getBuffer(i));
        descriptorSet.bindSampler(i, globalDescriptorSet.getSampler(i));
        descriptorSet.bindTexture(i, globalDescriptorSet.getTexture(i));
      }

      var shadowBUO = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOShadow.SIZE, jsonAsset.UBOShadow.SIZE));
      descriptorSet.bindBuffer(jsonAsset.UBOShadow.BINDING, shadowBUO);
      descriptorSet.update();
    }

    return this._descriptorSetMap.get(idx);
  };

  _proto.destroy = function destroy() {
    this._descriptorSetLayout.destroy();

    this._linearSampler.destroy();

    this._pointSampler.destroy();
  };

  return GlobalDSManager;
}();

var _dec$2, _dec2$2, _dec3$2, _dec4$2, _class$2, _class2$2, _descriptor$2, _descriptor2$2, _temp$2;
var RenderPipeline = (_dec$2 = jsonAsset.ccclass('cc.RenderPipeline'), _dec2$2 = jsonAsset.displayOrder(), _dec3$2 = jsonAsset.displayOrder(), _dec4$2 = jsonAsset.type([RenderFlow]), _dec$2(_class$2 = (_class2$2 = (_temp$2 = function (_Asset) {
  jsonAsset._inheritsLoose(RenderPipeline, _Asset);

  function RenderPipeline() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_tag", _descriptor$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_flows", _descriptor2$2, jsonAsset._assertThisInitialized(_this));

    _this._device = void 0;
    _this._globalDSManager = void 0;
    _this._descriptorSet = void 0;
    _this._commandBuffers = [];
    _this._pipelineUBO = new PipelineUBO();
    _this._macros = {};
    _this._constantMacros = '';
    return _this;
  }

  var _proto = RenderPipeline.prototype;

  _proto.initialize = function initialize(info) {
    this._flows = info.flows;

    if (info.tag) {
      this._tag = info.tag;
    }

    return true;
  };

  _proto.generateRenderArea = function generateRenderArea(camera) {
    var res = new jsonAsset.Rect();
    var vp = camera.viewport;
    var sceneData = this.pipelineSceneData;
    var w = camera.window.hasOnScreenAttachments && this.device.surfaceTransform % 2 ? camera.height : camera.width;
    var h = camera.window.hasOnScreenAttachments && this.device.surfaceTransform % 2 ? camera.width : camera.height;
    res.x = vp.x * w;
    res.y = vp.y * h;
    res.width = vp.width * w * sceneData.shadingScale;
    res.height = vp.height * h * sceneData.shadingScale;
    return res;
  };

  _proto.activate = function activate() {
    this._device = jsonAsset.legacyCC.director.root.device;
    this._globalDSManager = new GlobalDSManager(this);
    this._descriptorSet = this._globalDSManager.globalDescriptorSet;

    this._pipelineUBO.activate(this._device, this);

    this._pipelineSceneData.activate(this._device, this);

    for (var i = 0; i < this._flows.length; i++) {
      this._flows[i].activate(this);
    }

    this._macros.CC_USE_HDR = this._pipelineSceneData.isHDR;

    this._generateConstantMacros();

    return true;
  };

  _proto.render = function render(cameras) {
    for (var i = 0; i < cameras.length; i++) {
      var camera = cameras[i];

      if (camera.scene) {
        for (var j = 0; j < this._flows.length; j++) {
          this._flows[j].render(camera);
        }
      }
    }
  };

  _proto.destroy = function destroy() {
    var _this$_globalDSManage, _this$_pipelineSceneD;

    for (var i = 0; i < this._flows.length; i++) {
      this._flows[i].destroy();
    }

    this._flows.length = 0;

    if (this._descriptorSet) {
      this._descriptorSet.destroy();
    }

    (_this$_globalDSManage = this._globalDSManager) === null || _this$_globalDSManage === void 0 ? void 0 : _this$_globalDSManage.destroy();

    for (var _i = 0; _i < this._commandBuffers.length; _i++) {
      this._commandBuffers[_i].destroy();
    }

    this._commandBuffers.length = 0;

    this._pipelineUBO.destroy();

    (_this$_pipelineSceneD = this._pipelineSceneData) === null || _this$_pipelineSceneD === void 0 ? void 0 : _this$_pipelineSceneD.destroy();
    return _Asset.prototype.destroy.call(this);
  };

  _proto.resize = function resize(width, height) {};

  _proto._generateConstantMacros = function _generateConstantMacros() {
    var str = '';
    str += "#define CC_DEVICE_SUPPORT_FLOAT_TEXTURE " + (this.device.hasFeature(jsonAsset.Feature.TEXTURE_FLOAT) ? 1 : 0) + "\n";
    str += "#define CC_DEVICE_MAX_VERTEX_UNIFORM_VECTORS " + this.device.capabilities.maxVertexUniformVectors + "\n";
    str += "#define CC_DEVICE_MAX_FRAGMENT_UNIFORM_VECTORS " + this.device.capabilities.maxFragmentUniformVectors + "\n";
    this._constantMacros = str;
  };

  jsonAsset._createClass(RenderPipeline, [{
    key: "tag",
    get: function get() {
      return this._tag;
    }
  }, {
    key: "flows",
    get: function get() {
      return this._flows;
    }
  }, {
    key: "constantMacros",
    get: function get() {
      return this._constantMacros;
    }
  }, {
    key: "macros",
    get: function get() {
      return this._macros;
    }
  }, {
    key: "device",
    get: function get() {
      return this._device;
    }
  }, {
    key: "globalDSManager",
    get: function get() {
      return this._globalDSManager;
    }
  }, {
    key: "descriptorSetLayout",
    get: function get() {
      return this._globalDSManager.descriptorSetLayout;
    }
  }, {
    key: "descriptorSet",
    get: function get() {
      return this._descriptorSet;
    }
  }, {
    key: "commandBuffers",
    get: function get() {
      return this._commandBuffers;
    }
  }, {
    key: "pipelineUBO",
    get: function get() {
      return this._pipelineUBO;
    }
  }, {
    key: "pipelineSceneData",
    get: function get() {
      return this._pipelineSceneData;
    }
  }]);

  return RenderPipeline;
}(jsonAsset.Asset), _temp$2), (_descriptor$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_tag", [_dec2$2, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_flows", [_dec3$2, _dec4$2, jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$2)) || _class$2);
jsonAsset.legacyCC.RenderPipeline = RenderPipeline;

var ForwardStagePriority;

(function (ForwardStagePriority) {
  ForwardStagePriority[ForwardStagePriority["FORWARD"] = 10] = "FORWARD";
  ForwardStagePriority[ForwardStagePriority["UI"] = 20] = "UI";
})(ForwardStagePriority || (ForwardStagePriority = {}));

var ForwardFlowPriority;

(function (ForwardFlowPriority) {
  ForwardFlowPriority[ForwardFlowPriority["SHADOW"] = 0] = "SHADOW";
  ForwardFlowPriority[ForwardFlowPriority["FORWARD"] = 1] = "FORWARD";
  ForwardFlowPriority[ForwardFlowPriority["UI"] = 10] = "UI";
})(ForwardFlowPriority || (ForwardFlowPriority = {}));

var PipelineStateManager = function () {
  function PipelineStateManager() {}

  PipelineStateManager.getOrCreatePipelineState = function getOrCreatePipelineState(device, pass, shader, renderPass, ia) {
    var hash1 = pass.hash;
    var hash2 = renderPass.hash;
    var hash3 = ia.attributesHash;
    var hash4 = shader.id;
    var newHash = hash1 ^ hash2 ^ hash3 ^ hash4;

    var pso = this._PSOHashMap.get(newHash);

    if (!pso) {
      var pipelineLayout = pass.pipelineLayout;
      var inputState = new jsonAsset.InputState(ia.attributes);
      var psoInfo = new jsonAsset.PipelineStateInfo(shader, pass.pipelineLayout, renderPass, inputState, pass.rasterizerState, pass.depthStencilState, pass.blendState, pass.primitive, pass.dynamicStates);
      pso = device.createPipelineState(psoInfo);

      this._PSOHashMap.set(newHash, pso);
    }

    return pso;
  };

  return PipelineStateManager;
}();
PipelineStateManager._PSOHashMap = new Map();

var _dec$3, _dec2$3, _dec3$3, _dec4$3, _class$3, _class2$3, _descriptor$3, _descriptor2$3, _descriptor3$2, _descriptor4$1, _descriptor5, _descriptor6, _temp$3, _dec5$1, _dec6$1, _class4, _class5, _descriptor7, _descriptor8, _temp2, _dec7, _dec8, _class7, _class8, _descriptor9, _descriptor10, _temp3, _dec9, _dec10, _dec11, _class10, _class11, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _temp4, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class13, _class14, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _temp5, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class16, _class17, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _temp6, _dec26, _dec27, _dec28, _class19, _class20, _descriptor30, _descriptor31, _descriptor32, _temp7, _dec29, _dec30, _dec31, _class22, _class23, _descriptor33, _descriptor34, _descriptor35, _temp8;
jsonAsset.ccenum(jsonAsset.TextureType);
jsonAsset.ccenum(jsonAsset.TextureUsageBit);
jsonAsset.ccenum(jsonAsset.StoreOp);
jsonAsset.ccenum(jsonAsset.LoadOp);
jsonAsset.ccenum(jsonAsset.AccessType);
var RenderFlowTag;

(function (RenderFlowTag) {
  RenderFlowTag[RenderFlowTag["SCENE"] = 0] = "SCENE";
  RenderFlowTag[RenderFlowTag["POSTPROCESS"] = 1] = "POSTPROCESS";
  RenderFlowTag[RenderFlowTag["UI"] = 2] = "UI";
})(RenderFlowTag || (RenderFlowTag = {}));

jsonAsset.ccenum(RenderFlowTag);
var RenderTextureDesc = (_dec$3 = jsonAsset.ccclass('RenderTextureDesc'), _dec2$3 = jsonAsset.type(jsonAsset.TextureType), _dec3$3 = jsonAsset.type(jsonAsset.TextureUsageBit), _dec4$3 = jsonAsset.type(jsonAsset.Format), _dec$3(_class$3 = (_class2$3 = (_temp$3 = function RenderTextureDesc() {
  jsonAsset._initializerDefineProperty(this, "name", _descriptor$3, this);

  jsonAsset._initializerDefineProperty(this, "type", _descriptor2$3, this);

  jsonAsset._initializerDefineProperty(this, "usage", _descriptor3$2, this);

  jsonAsset._initializerDefineProperty(this, "format", _descriptor4$1, this);

  jsonAsset._initializerDefineProperty(this, "width", _descriptor5, this);

  jsonAsset._initializerDefineProperty(this, "height", _descriptor6, this);
}, _temp$3), (_descriptor$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "name", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "type", [_dec2$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.TextureType.TEX2D;
  }
}), _descriptor3$2 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "usage", [_dec3$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.TextureUsageBit.COLOR_ATTACHMENT;
  }
}), _descriptor4$1 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "format", [_dec4$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Format.UNKNOWN;
  }
}), _descriptor5 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "width", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return -1;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "height", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return -1;
  }
})), _class2$3)) || _class$3);
var RenderTextureConfig = (_dec5$1 = jsonAsset.ccclass('RenderTextureConfig'), _dec6$1 = jsonAsset.type(jsonAsset.RenderTexture), _dec5$1(_class4 = (_class5 = (_temp2 = function RenderTextureConfig() {
  jsonAsset._initializerDefineProperty(this, "name", _descriptor7, this);

  jsonAsset._initializerDefineProperty(this, "texture", _descriptor8, this);
}, _temp2), (_descriptor7 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "name", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor8 = jsonAsset._applyDecoratedDescriptor(_class5.prototype, "texture", [_dec6$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class5)) || _class4);
var MaterialConfig = (_dec7 = jsonAsset.ccclass('MaterialConfig'), _dec8 = jsonAsset.type(jsonAsset.Material), _dec7(_class7 = (_class8 = (_temp3 = function MaterialConfig() {
  jsonAsset._initializerDefineProperty(this, "name", _descriptor9, this);

  jsonAsset._initializerDefineProperty(this, "material", _descriptor10, this);
}, _temp3), (_descriptor9 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "name", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor10 = jsonAsset._applyDecoratedDescriptor(_class8.prototype, "material", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class8)) || _class7);
var FrameBufferDesc = (_dec9 = jsonAsset.ccclass('FrameBufferDesc'), _dec10 = jsonAsset.type([jsonAsset.CCString]), _dec11 = jsonAsset.type(jsonAsset.RenderTexture), _dec9(_class10 = (_class11 = (_temp4 = function FrameBufferDesc() {
  jsonAsset._initializerDefineProperty(this, "name", _descriptor11, this);

  jsonAsset._initializerDefineProperty(this, "renderPass", _descriptor12, this);

  jsonAsset._initializerDefineProperty(this, "colorTextures", _descriptor13, this);

  jsonAsset._initializerDefineProperty(this, "depthStencilTexture", _descriptor14, this);

  jsonAsset._initializerDefineProperty(this, "texture", _descriptor15, this);
}, _temp4), (_descriptor11 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "name", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor12 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "renderPass", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor13 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "colorTextures", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor14 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "depthStencilTexture", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor15 = jsonAsset._applyDecoratedDescriptor(_class11.prototype, "texture", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class11)) || _class10);
var ColorDesc = (_dec12 = jsonAsset.ccclass('ColorDesc'), _dec13 = jsonAsset.type(jsonAsset.Format), _dec14 = jsonAsset.type(jsonAsset.LoadOp), _dec15 = jsonAsset.type(jsonAsset.StoreOp), _dec16 = jsonAsset.type([jsonAsset.AccessType]), _dec17 = jsonAsset.type([jsonAsset.AccessType]), _dec12(_class13 = (_class14 = (_temp5 = function ColorDesc() {
  jsonAsset._initializerDefineProperty(this, "format", _descriptor16, this);

  jsonAsset._initializerDefineProperty(this, "loadOp", _descriptor17, this);

  jsonAsset._initializerDefineProperty(this, "storeOp", _descriptor18, this);

  jsonAsset._initializerDefineProperty(this, "sampleCount", _descriptor19, this);

  jsonAsset._initializerDefineProperty(this, "beginAccesses", _descriptor20, this);

  jsonAsset._initializerDefineProperty(this, "endAccesses", _descriptor21, this);
}, _temp5), (_descriptor16 = jsonAsset._applyDecoratedDescriptor(_class14.prototype, "format", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Format.UNKNOWN;
  }
}), _descriptor17 = jsonAsset._applyDecoratedDescriptor(_class14.prototype, "loadOp", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.LoadOp.CLEAR;
  }
}), _descriptor18 = jsonAsset._applyDecoratedDescriptor(_class14.prototype, "storeOp", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.StoreOp.STORE;
  }
}), _descriptor19 = jsonAsset._applyDecoratedDescriptor(_class14.prototype, "sampleCount", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor20 = jsonAsset._applyDecoratedDescriptor(_class14.prototype, "beginAccesses", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor21 = jsonAsset._applyDecoratedDescriptor(_class14.prototype, "endAccesses", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [jsonAsset.AccessType.PRESENT];
  }
})), _class14)) || _class13);
var DepthStencilDesc = (_dec18 = jsonAsset.ccclass('DepthStencilDesc'), _dec19 = jsonAsset.type(jsonAsset.Format), _dec20 = jsonAsset.type(jsonAsset.LoadOp), _dec21 = jsonAsset.type(jsonAsset.StoreOp), _dec22 = jsonAsset.type(jsonAsset.LoadOp), _dec23 = jsonAsset.type(jsonAsset.StoreOp), _dec24 = jsonAsset.type([jsonAsset.AccessType]), _dec25 = jsonAsset.type([jsonAsset.AccessType]), _dec18(_class16 = (_class17 = (_temp6 = function DepthStencilDesc() {
  jsonAsset._initializerDefineProperty(this, "format", _descriptor22, this);

  jsonAsset._initializerDefineProperty(this, "depthLoadOp", _descriptor23, this);

  jsonAsset._initializerDefineProperty(this, "depthStoreOp", _descriptor24, this);

  jsonAsset._initializerDefineProperty(this, "stencilLoadOp", _descriptor25, this);

  jsonAsset._initializerDefineProperty(this, "stencilStoreOp", _descriptor26, this);

  jsonAsset._initializerDefineProperty(this, "sampleCount", _descriptor27, this);

  jsonAsset._initializerDefineProperty(this, "beginAccesses", _descriptor28, this);

  jsonAsset._initializerDefineProperty(this, "endAccesses", _descriptor29, this);
}, _temp6), (_descriptor22 = jsonAsset._applyDecoratedDescriptor(_class17.prototype, "format", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.Format.UNKNOWN;
  }
}), _descriptor23 = jsonAsset._applyDecoratedDescriptor(_class17.prototype, "depthLoadOp", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.LoadOp.CLEAR;
  }
}), _descriptor24 = jsonAsset._applyDecoratedDescriptor(_class17.prototype, "depthStoreOp", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.StoreOp.STORE;
  }
}), _descriptor25 = jsonAsset._applyDecoratedDescriptor(_class17.prototype, "stencilLoadOp", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.LoadOp.CLEAR;
  }
}), _descriptor26 = jsonAsset._applyDecoratedDescriptor(_class17.prototype, "stencilStoreOp", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return jsonAsset.StoreOp.STORE;
  }
}), _descriptor27 = jsonAsset._applyDecoratedDescriptor(_class17.prototype, "sampleCount", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor28 = jsonAsset._applyDecoratedDescriptor(_class17.prototype, "beginAccesses", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor29 = jsonAsset._applyDecoratedDescriptor(_class17.prototype, "endAccesses", [_dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [jsonAsset.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
  }
})), _class17)) || _class16);
var RenderPassDesc = (_dec26 = jsonAsset.ccclass('RenderPassDesc'), _dec27 = jsonAsset.type([ColorDesc]), _dec28 = jsonAsset.type(DepthStencilDesc), _dec26(_class19 = (_class20 = (_temp7 = function RenderPassDesc() {
  jsonAsset._initializerDefineProperty(this, "index", _descriptor30, this);

  jsonAsset._initializerDefineProperty(this, "colorAttachments", _descriptor31, this);

  jsonAsset._initializerDefineProperty(this, "depthStencilAttachment", _descriptor32, this);
}, _temp7), (_descriptor30 = jsonAsset._applyDecoratedDescriptor(_class20.prototype, "index", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return -1;
  }
}), _descriptor31 = jsonAsset._applyDecoratedDescriptor(_class20.prototype, "colorAttachments", [_dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor32 = jsonAsset._applyDecoratedDescriptor(_class20.prototype, "depthStencilAttachment", [_dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new DepthStencilDesc();
  }
})), _class20)) || _class19);
var RenderQueueSortMode;

(function (RenderQueueSortMode) {
  RenderQueueSortMode[RenderQueueSortMode["FRONT_TO_BACK"] = 0] = "FRONT_TO_BACK";
  RenderQueueSortMode[RenderQueueSortMode["BACK_TO_FRONT"] = 1] = "BACK_TO_FRONT";
})(RenderQueueSortMode || (RenderQueueSortMode = {}));

jsonAsset.ccenum(RenderQueueSortMode);
var RenderQueueDesc = (_dec29 = jsonAsset.ccclass('RenderQueueDesc'), _dec30 = jsonAsset.type(RenderQueueSortMode), _dec31 = jsonAsset.type([jsonAsset.CCString]), _dec29(_class22 = (_class23 = (_temp8 = function RenderQueueDesc() {
  jsonAsset._initializerDefineProperty(this, "isTransparent", _descriptor33, this);

  jsonAsset._initializerDefineProperty(this, "sortMode", _descriptor34, this);

  jsonAsset._initializerDefineProperty(this, "stages", _descriptor35, this);
}, _temp8), (_descriptor33 = jsonAsset._applyDecoratedDescriptor(_class23.prototype, "isTransparent", [jsonAsset.serializable, jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor34 = jsonAsset._applyDecoratedDescriptor(_class23.prototype, "sortMode", [_dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return RenderQueueSortMode.FRONT_TO_BACK;
  }
}), _descriptor35 = jsonAsset._applyDecoratedDescriptor(_class23.prototype, "stages", [_dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class23)) || _class22);

function opaqueCompareFn(a, b) {
  return a.hash - b.hash || a.depth - b.depth || a.shaderId - b.shaderId;
}
function transparentCompareFn(a, b) {
  return a.hash - b.hash || b.depth - a.depth || a.shaderId - b.shaderId;
}
var RenderQueue = function () {
  function RenderQueue(desc) {
    this.queue = void 0;
    this._passDesc = void 0;
    this._passPool = void 0;
    this._passDesc = desc;
    this._passPool = new jsonAsset.RecyclePool(function () {
      return {
        hash: 0,
        depth: 0,
        shaderId: 0,
        subModel: null,
        passIdx: 0
      };
    }, 64);
    this.queue = new jsonAsset.CachedArray(64, this._passDesc.sortFunc);
  }

  var _proto = RenderQueue.prototype;

  _proto.clear = function clear() {
    this.queue.clear();

    this._passPool.reset();
  };

  _proto.insertRenderPass = function insertRenderPass(renderObj, subModelIdx, passIdx) {
    var subModel = renderObj.model.subModels[subModelIdx];
    var pass = subModel.passes[passIdx];
    var shader = subModel.shaders[passIdx];
    var isTransparent = pass.blendState.targets[0].blend;

    if (isTransparent !== this._passDesc.isTransparent || !(pass.phase & this._passDesc.phases)) {
      return false;
    }

    var hash = 0 << 30 | pass.priority << 16 | subModel.priority << 8 | passIdx;

    var rp = this._passPool.add();

    rp.hash = hash;
    rp.depth = renderObj.depth || 0;
    rp.shaderId = shader.id;
    rp.subModel = subModel;
    rp.passIdx = passIdx;
    this.queue.push(rp);
    return true;
  };

  _proto.sort = function sort() {
    this.queue.sort();
  };

  _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
    for (var i = 0; i < this.queue.length; ++i) {
      var _this$queue$array$i = this.queue.array[i],
          subModel = _this$queue$array$i.subModel,
          passIdx = _this$queue$array$i.passIdx;
      var inputAssembler = subModel.inputAssembler;
      var pass = subModel.passes[passIdx];
      var shader = subModel.shaders[passIdx];
      var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, pass.descriptorSet);
      cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.LOCAL, subModel.descriptorSet);
      cmdBuff.bindInputAssembler(inputAssembler);
      cmdBuff.draw(inputAssembler);
    }
  };

  return RenderQueue;
}();
function convertRenderQueue(desc) {
  var phase = 0;

  for (var j = 0; j < desc.stages.length; j++) {
    phase |= jsonAsset.getPhaseID(desc.stages[j]);
  }

  var sortFunc = opaqueCompareFn;

  switch (desc.sortMode) {
    case RenderQueueSortMode.BACK_TO_FRONT:
      sortFunc = transparentCompareFn;
      break;

    case RenderQueueSortMode.FRONT_TO_BACK:
      sortFunc = opaqueCompareFn;
      break;
  }

  return new RenderQueue({
    isTransparent: desc.isTransparent,
    phases: phase,
    sortFunc: sortFunc
  });
}
function renderQueueClearFunc(rq) {
  rq.clear();
}
function renderQueueSortFunc(rq) {
  rq.sort();
}

function SRGBToLinear(out, gamma) {
  out.x = gamma.x * gamma.x;
  out.y = gamma.y * gamma.y;
  out.z = gamma.z * gamma.z;
}

var RenderBatchedQueue = function () {
  function RenderBatchedQueue() {
    this.queue = new Set();
  }

  var _proto = RenderBatchedQueue.prototype;

  _proto.clear = function clear() {
    var it = this.queue.values();
    var res = it.next();

    while (!res.done) {
      res.value.clear();
      res = it.next();
    }

    this.queue.clear();
  };

  _proto.uploadBuffers = function uploadBuffers(cmdBuff) {
    var it = this.queue.values();
    var res = it.next();

    while (!res.done) {
      for (var b = 0; b < res.value.batches.length; ++b) {
        var batch = res.value.batches[b];

        if (!batch.mergeCount) {
          continue;
        }

        for (var v = 0; v < batch.vbs.length; ++v) {
          batch.vbs[v].update(batch.vbDatas[v]);
        }

        cmdBuff.updateBuffer(batch.vbIdx, batch.vbIdxData.buffer);
        cmdBuff.updateBuffer(batch.ubo, batch.uboData);
      }

      res = it.next();
    }
  };

  _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
    var it = this.queue.values();
    var res = it.next();

    while (!res.done) {
      var boundPSO = false;

      for (var b = 0; b < res.value.batches.length; ++b) {
        var batch = res.value.batches[b];

        if (!batch.mergeCount) {
          continue;
        }

        if (!boundPSO) {
          var shader = batch.shader;
          var pso = PipelineStateManager.getOrCreatePipelineState(device, batch.pass, shader, renderPass, batch.ia);
          cmdBuff.bindPipelineState(pso);
          cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, batch.pass.descriptorSet);
          boundPSO = true;
        }

        cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.LOCAL, batch.descriptorSet, res.value.dynamicOffsets);
        cmdBuff.bindInputAssembler(batch.ia);
        cmdBuff.draw(batch.ia);
      }

      res = it.next();
    }
  };

  return RenderBatchedQueue;
}();

var RenderInstancedQueue = function () {
  function RenderInstancedQueue() {
    this.queue = new Set();
  }

  var _proto = RenderInstancedQueue.prototype;

  _proto.clear = function clear() {
    var it = this.queue.values();
    var res = it.next();

    while (!res.done) {
      res.value.clear();
      res = it.next();
    }

    this.queue.clear();
  };

  _proto.uploadBuffers = function uploadBuffers(cmdBuff) {
    var it = this.queue.values();
    var res = it.next();

    while (!res.done) {
      if (res.value.hasPendingModels) res.value.uploadBuffers(cmdBuff);
      res = it.next();
    }
  };

  _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
    var it = this.queue.values();
    var res = it.next();

    while (!res.done) {
      var _res$value = res.value,
          instances = _res$value.instances,
          pass = _res$value.pass,
          hasPendingModels = _res$value.hasPendingModels;

      if (hasPendingModels) {
        cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, pass.descriptorSet);
        var lastPSO = null;

        for (var b = 0; b < instances.length; ++b) {
          var instance = instances[b];

          if (!instance.count) {
            continue;
          }

          var shader = instance.shader;
          var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, instance.ia);

          if (lastPSO !== pso) {
            cmdBuff.bindPipelineState(pso);
            lastPSO = pso;
          }

          cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.LOCAL, instance.descriptorSet, res.value.dynamicOffsets);
          cmdBuff.bindInputAssembler(instance.ia);
          cmdBuff.draw(instance.ia);
        }
      }

      res = it.next();
    }
  };

  return RenderInstancedQueue;
}();

var BatchedBuffer = function () {
  BatchedBuffer.get = function get(pass, extraKey) {
    if (extraKey === void 0) {
      extraKey = 0;
    }

    var buffers = BatchedBuffer._buffers;
    if (!buffers.has(pass)) buffers.set(pass, {});
    var record = buffers.get(pass);
    return record[extraKey] || (record[extraKey] = new BatchedBuffer(pass));
  };

  function BatchedBuffer(pass) {
    this.batches = [];
    this.dynamicOffsets = [];
    this._device = void 0;
    this._device = pass.device;
  }

  var _proto = BatchedBuffer.prototype;

  _proto.destroy = function destroy() {
    for (var i = 0; i < this.batches.length; ++i) {
      var batch = this.batches[i];

      for (var j = 0; j < batch.vbs.length; ++j) {
        batch.vbs[j].destroy();
      }

      batch.vbIdx.destroy();
      batch.ia.destroy();
      batch.ubo.destroy();
    }

    this.batches.length = 0;
  };

  _proto.merge = function merge(subModel, passIdx, model) {
    var flatBuffers = subModel.subMesh.flatBuffers;

    if (flatBuffers.length === 0) {
      return;
    }

    var vbSize = 0;
    var vbIdxSize = 0;
    var vbCount = flatBuffers[0].count;
    var pass = subModel.passes[passIdx];
    var shader = subModel.shaders[passIdx];
    var descriptorSet = subModel.descriptorSet;
    var isBatchExist = false;

    for (var i = 0; i < this.batches.length; ++i) {
      var batch = this.batches[i];

      if (batch.vbs.length === flatBuffers.length && batch.mergeCount < jsonAsset.UBOLocalBatched.BATCHING_COUNT) {
        isBatchExist = true;

        for (var j = 0; j < batch.vbs.length; ++j) {
          var vb = batch.vbs[j];

          if (vb.stride !== flatBuffers[j].stride) {
            isBatchExist = false;
            break;
          }
        }

        if (isBatchExist) {
          for (var _j = 0; _j < batch.vbs.length; ++_j) {
            var flatBuff = flatBuffers[_j];
            var batchVB = batch.vbs[_j];
            var vbBuf = batch.vbDatas[_j];
            vbSize = (vbCount + batch.vbCount) * flatBuff.stride;

            if (vbSize > batchVB.size) {
              batchVB.resize(vbSize);
              batch.vbDatas[_j] = new Uint8Array(vbSize);

              batch.vbDatas[_j].set(vbBuf);
            }

            batch.vbDatas[_j].set(flatBuff.buffer, batch.vbCount * flatBuff.stride);
          }

          var vbIdxBuf = batch.vbIdxData;
          vbIdxSize = (vbCount + batch.vbCount) * 4;

          if (vbIdxSize > batch.vbIdx.size) {
            batch.vbIdx.resize(vbIdxSize);
            batch.vbIdxData = new Float32Array(vbIdxSize / Float32Array.BYTES_PER_ELEMENT);
            batch.vbIdxData.set(vbIdxBuf);
            vbIdxBuf = batch.vbIdxData;
          }

          var start = batch.vbCount;
          var end = start + vbCount;
          var mergeCount = batch.mergeCount;

          if (vbIdxBuf[start] !== mergeCount || vbIdxBuf[end - 1] !== mergeCount) {
            for (var _j2 = start; _j2 < end; _j2++) {
              vbIdxBuf[_j2] = mergeCount + 0.1;
            }
          }

          jsonAsset.Mat4.toArray(batch.uboData, model.transform.worldMatrix, jsonAsset.UBOLocalBatched.MAT_WORLDS_OFFSET + batch.mergeCount * 16);

          if (!batch.mergeCount) {
            descriptorSet.bindBuffer(jsonAsset.UBOLocalBatched.BINDING, batch.ubo);
            descriptorSet.update();
            batch.pass = pass;
            batch.shader = shader;
            batch.descriptorSet = descriptorSet;
          }

          ++batch.mergeCount;
          batch.vbCount += vbCount;
          batch.ia.vertexCount += vbCount;
          return;
        }
      }
    }

    var vbs = [];
    var vbDatas = [];
    var totalVBs = [];

    for (var _i = 0; _i < flatBuffers.length; ++_i) {
      var _flatBuff = flatBuffers[_i];

      var newVB = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, _flatBuff.count * _flatBuff.stride, _flatBuff.stride));

      newVB.update(_flatBuff.buffer.buffer);
      vbs.push(newVB);
      vbDatas.push(new Uint8Array(newVB.size));
      totalVBs.push(newVB);
    }

    var vbIdx = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, vbCount * 4, 4));

    var vbIdxData = new Float32Array(vbCount);
    vbIdxData.fill(0);
    vbIdx.update(vbIdxData);
    totalVBs.push(vbIdx);
    var attributes = subModel.inputAssembler.attributes;
    var attrs = new Array(attributes.length + 1);

    for (var a = 0; a < attributes.length; ++a) {
      attrs[a] = attributes[a];
    }

    attrs[attributes.length] = new jsonAsset.Attribute('a_dyn_batch_id', jsonAsset.Format.R32F, false, flatBuffers.length);
    var iaInfo = new jsonAsset.InputAssemblerInfo(attrs, totalVBs);

    var ia = this._device.createInputAssembler(iaInfo);

    var ubo = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, jsonAsset.UBOLocalBatched.SIZE, jsonAsset.UBOLocalBatched.SIZE));

    descriptorSet.bindBuffer(jsonAsset.UBOLocalBatched.BINDING, ubo);
    descriptorSet.update();
    var uboData = new Float32Array(jsonAsset.UBOLocalBatched.COUNT);
    jsonAsset.Mat4.toArray(uboData, model.transform.worldMatrix, jsonAsset.UBOLocalBatched.MAT_WORLDS_OFFSET);
    this.batches.push({
      mergeCount: 1,
      vbs: vbs,
      vbDatas: vbDatas,
      vbIdx: vbIdx,
      vbIdxData: vbIdxData,
      vbCount: vbCount,
      ia: ia,
      ubo: ubo,
      uboData: uboData,
      pass: pass,
      shader: shader,
      descriptorSet: descriptorSet
    });
  };

  _proto.clear = function clear() {
    for (var i = 0; i < this.batches.length; ++i) {
      var batch = this.batches[i];
      batch.vbCount = 0;
      batch.mergeCount = 0;
      batch.ia.vertexCount = 0;
    }
  };

  return BatchedBuffer;
}();
BatchedBuffer._buffers = new Map();

var _lightPassPool = new jsonAsset.Pool(function () {
  return {
    subModel: null,
    passIdx: -1,
    dynamicOffsets: [],
    lights: []
  };
}, 16);

var _vec4Array = new Float32Array(4);

var _sphere$1 = jsonAsset.Sphere.create(0, 0, 0, 1);

var _dynamicOffsets = [];
var _lightIndices = [];

var _matShadowView = new jsonAsset.Mat4();

var _matShadowViewProj = new jsonAsset.Mat4();

function cullSphereLight(light, model) {
  return !!(model.worldBounds && !jsonAsset.intersect.aabbWithAABB(model.worldBounds, light.aabb));
}

function cullSpotLight(light, model) {
  return !!(model.worldBounds && (!jsonAsset.intersect.aabbWithAABB(model.worldBounds, light.aabb) || !jsonAsset.intersect.aabbFrustum(model.worldBounds, light.frustum)));
}

var _phaseID = jsonAsset.getPhaseID('forward-add');

var _lightPassIndices = [];

function getLightPassIndices(subModels, lightPassIndices) {
  lightPassIndices.length = 0;
  var hasValidLightPass = false;

  for (var j = 0; j < subModels.length; j++) {
    var passes = subModels[j].passes;
    var lightPassIndex = -1;

    for (var k = 0; k < passes.length; k++) {
      if (passes[k].phase === _phaseID) {
        lightPassIndex = k;
        hasValidLightPass = true;
        break;
      }
    }

    lightPassIndices.push(lightPassIndex);
  }

  return hasValidLightPass;
}

var RenderAdditiveLightQueue = function () {
  function RenderAdditiveLightQueue(pipeline) {
    this._pipeline = void 0;
    this._device = void 0;
    this._validLights = [];
    this._lightPasses = [];
    this._shadowUBO = new Float32Array(jsonAsset.UBOShadow.COUNT);
    this._lightBufferCount = 16;
    this._lightBufferStride = void 0;
    this._lightBufferElementCount = void 0;
    this._lightBuffer = void 0;
    this._firstLightBufferView = void 0;
    this._lightBufferData = void 0;
    this._instancedQueue = void 0;
    this._batchedQueue = void 0;
    this._lightMeterScale = 10000.0;
    this._pipeline = pipeline;
    this._device = pipeline.device;
    this._instancedQueue = new RenderInstancedQueue();
    this._batchedQueue = new RenderBatchedQueue();
    var alignment = this._device.capabilities.uboOffsetAlignment;
    this._lightBufferStride = Math.ceil(jsonAsset.UBOForwardLight.SIZE / alignment) * alignment;
    this._lightBufferElementCount = this._lightBufferStride / Float32Array.BYTES_PER_ELEMENT;
    this._lightBuffer = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, this._lightBufferStride * this._lightBufferCount, this._lightBufferStride));
    this._firstLightBufferView = this._device.createBuffer(new jsonAsset.BufferViewInfo(this._lightBuffer, 0, jsonAsset.UBOForwardLight.SIZE));
    this._lightBufferData = new Float32Array(this._lightBufferElementCount * this._lightBufferCount);
  }

  var _proto = RenderAdditiveLightQueue.prototype;

  _proto.clear = function clear() {
    this._instancedQueue.clear();

    this._batchedQueue.clear();

    this._validLights.length = 0;

    for (var i = 0; i < this._lightPasses.length; i++) {
      var lp = this._lightPasses[i];
      lp.dynamicOffsets.length = 0;
      lp.lights.length = 0;
    }

    _lightPassPool.freeArray(this._lightPasses);

    this._lightPasses.length = 0;
  };

  _proto.destroy = function destroy() {
    var descriptorSetMap = this._pipeline.globalDSManager.descriptorSetMap;
    var keys = descriptorSetMap.keys;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var descriptorSet = descriptorSetMap.get(key);

      if (descriptorSet) {
        descriptorSet.getBuffer(jsonAsset.UBOShadow.BINDING).destroy();
        descriptorSet.getSampler(jsonAsset.UNIFORM_SHADOWMAP_BINDING).destroy();
        descriptorSet.getSampler(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
        descriptorSet.getTexture(jsonAsset.UNIFORM_SHADOWMAP_BINDING).destroy();
        descriptorSet.getTexture(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
        descriptorSet.destroy();
      }

      descriptorSetMap["delete"](key);
    }
  };

  _proto.gatherLightPasses = function gatherLightPasses(camera, cmdBuff) {
    var validLights = this._validLights;
    this.clear();

    this._gatherValidLights(camera, validLights);

    if (!validLights.length) {
      return;
    }

    this._updateUBOs(camera, cmdBuff);

    this._updateLightDescriptorSet(camera, cmdBuff);

    var renderObjects = this._pipeline.pipelineSceneData.renderObjects;

    for (var i = 0; i < renderObjects.length; i++) {
      var ro = renderObjects[i];
      var model = ro.model;
      var subModels = model.subModels;

      if (!getLightPassIndices(subModels, _lightPassIndices)) {
        continue;
      }

      _lightIndices.length = 0;

      this._lightCulling(model, validLights);

      if (!_lightIndices.length) {
        continue;
      }

      for (var j = 0; j < subModels.length; j++) {
        var lightPassIdx = _lightPassIndices[j];

        if (lightPassIdx < 0) {
          continue;
        }

        var subModel = subModels[j];
        var pass = subModel.passes[lightPassIdx];
        subModel.descriptorSet.bindBuffer(jsonAsset.UBOForwardLight.BINDING, this._firstLightBufferView);
        subModel.descriptorSet.update();

        this._addRenderQueue(pass, subModel, model, lightPassIdx, validLights);
      }
    }

    this._instancedQueue.uploadBuffers(cmdBuff);

    this._batchedQueue.uploadBuffers(cmdBuff);
  };

  _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
    this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    var globalDSManager = this._pipeline.globalDSManager;

    for (var i = 0; i < this._lightPasses.length; i++) {
      var _this$_lightPasses$i = this._lightPasses[i],
          subModel = _this$_lightPasses$i.subModel,
          passIdx = _this$_lightPasses$i.passIdx,
          dynamicOffsets = _this$_lightPasses$i.dynamicOffsets,
          lights = _this$_lightPasses$i.lights;
      var pass = subModel.passes[passIdx];
      var shader = subModel.shaders[passIdx];
      var ia = subModel.inputAssembler;
      var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
      var matDS = pass.descriptorSet;
      var localDS = subModel.descriptorSet;
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, matDS);
      cmdBuff.bindInputAssembler(ia);

      for (var j = 0; j < dynamicOffsets.length; ++j) {
        var light = lights[j];
        var descriptorSet = globalDSManager.getOrCreateDescriptorSet(light);
        _dynamicOffsets[0] = dynamicOffsets[j];
        cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.GLOBAL, descriptorSet);
        cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.LOCAL, localDS, _dynamicOffsets);
        cmdBuff.draw(ia);
      }
    }
  };

  _proto._gatherValidLights = function _gatherValidLights(camera, validLights) {
    var _ref = camera.scene,
        sphereLights = _ref.sphereLights;

    for (var i = 0; i < sphereLights.length; i++) {
      var light = sphereLights[i];

      if (light.baked) {
        continue;
      }

      jsonAsset.Sphere.set(_sphere$1, light.position.x, light.position.y, light.position.z, light.range);

      if (jsonAsset.intersect.sphereFrustum(_sphere$1, camera.frustum)) {
        validLights.push(light);
      }
    }

    var _ref2 = camera.scene,
        spotLights = _ref2.spotLights;

    for (var _i = 0; _i < spotLights.length; _i++) {
      var _light = spotLights[_i];

      if (_light.baked) {
        continue;
      }

      jsonAsset.Sphere.set(_sphere$1, _light.position.x, _light.position.y, _light.position.z, _light.range);

      if (jsonAsset.intersect.sphereFrustum(_sphere$1, camera.frustum)) {
        validLights.push(_light);
      }
    }
  };

  _proto._lightCulling = function _lightCulling(model, validLights) {
    for (var l = 0; l < validLights.length; l++) {
      var light = validLights[l];
      var isCulled = false;

      switch (light.type) {
        case exports.LightType.SPHERE:
          isCulled = cullSphereLight(light, model);
          break;

        case exports.LightType.SPOT:
          isCulled = cullSpotLight(light, model);
          break;
      }

      if (!isCulled) {
        _lightIndices.push(l);
      }
    }
  };

  _proto._addRenderQueue = function _addRenderQueue(pass, subModel, model, lightPassIdx, validLights) {
    var batchingScheme = pass.batchingScheme;

    if (batchingScheme === jsonAsset.BatchingSchemes.INSTANCING) {
      for (var l = 0; l < _lightIndices.length; l++) {
        var idx = _lightIndices[l];
        var buffer = InstancedBuffer.get(pass, idx);
        buffer.merge(subModel, model.instancedAttributes, lightPassIdx);
        buffer.dynamicOffsets[0] = this._lightBufferStride * idx;

        this._instancedQueue.queue.add(buffer);
      }
    } else if (batchingScheme === jsonAsset.BatchingSchemes.VB_MERGING) {
      for (var _l = 0; _l < _lightIndices.length; _l++) {
        var _idx = _lightIndices[_l];

        var _buffer = BatchedBuffer.get(pass, _idx);

        _buffer.merge(subModel, lightPassIdx, model);

        _buffer.dynamicOffsets[0] = this._lightBufferStride * _idx;

        this._batchedQueue.queue.add(_buffer);
      }
    } else {
      var lp = _lightPassPool.alloc();

      lp.subModel = subModel;
      lp.passIdx = lightPassIdx;

      for (var _l2 = 0; _l2 < _lightIndices.length; _l2++) {
        var _idx2 = _lightIndices[_l2];
        lp.lights.push(_idx2);
        lp.dynamicOffsets.push(this._lightBufferStride * _idx2);
      }

      this._lightPasses.push(lp);
    }
  };

  _proto._updateLightDescriptorSet = function _updateLightDescriptorSet(camera, cmdBuff) {
    var device = this._pipeline.device;
    var sceneData = this._pipeline.pipelineSceneData;
    var shadowInfo = sceneData.shadows;
    var shadowFrameBufferMap = sceneData.shadowFrameBufferMap;
    var mainLight = camera.scene.mainLight;
    var linear = jsonAsset.supportsHalfFloatTexture(device) ? 1.0 : 0.0;
    var packing = linear ? 0.0 : 1.0;
    var globalDSManager = this._pipeline.globalDSManager;

    for (var i = 0; i < this._validLights.length; i++) {
      var light = this._validLights[i];
      var descriptorSet = globalDSManager.getOrCreateDescriptorSet(i);

      if (!descriptorSet) {
        continue;
      }

      switch (light.type) {
        case exports.LightType.SPHERE:
          if (mainLight) {
            updatePlanarPROJ(shadowInfo, mainLight, this._shadowUBO);
          }

          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 2.0;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0;
          jsonAsset.Color$1.toArray(this._shadowUBO, shadowInfo.shadowColor, jsonAsset.UBOShadow.SHADOW_COLOR_OFFSET);
          break;

        case exports.LightType.SPOT:
          if (mainLight) {
            updatePlanarPROJ(shadowInfo, mainLight, this._shadowUBO);
          }

          jsonAsset.Mat4.toArray(this._shadowUBO, light.node.getWorldMatrix(), jsonAsset.UBOShadow.MAT_LIGHT_VIEW_OFFSET);
          jsonAsset.Mat4.invert(_matShadowView, light.node.getWorldMatrix());
          jsonAsset.Mat4.perspective(_matShadowViewProj, light.spotAngle, light.aspect, 0.001, light.range);
          jsonAsset.Mat4.multiply(_matShadowViewProj, _matShadowViewProj, _matShadowView);
          jsonAsset.Mat4.toArray(this._shadowUBO, _matShadowViewProj, jsonAsset.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 0] = 0.01;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 1] = light.range;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 2] = linear;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SATURATION_INFO_OFFSET + 3] = 1.0 - shadowInfo.saturation;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 1.0;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
          this._shadowUBO[jsonAsset.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0;
          jsonAsset.Color$1.toArray(this._shadowUBO, shadowInfo.shadowColor, jsonAsset.UBOShadow.SHADOW_COLOR_OFFSET);

          if (shadowFrameBufferMap.has(light)) {
            var _shadowFrameBufferMap;

            var texture = (_shadowFrameBufferMap = shadowFrameBufferMap.get(light)) === null || _shadowFrameBufferMap === void 0 ? void 0 : _shadowFrameBufferMap.colorTextures[0];

            if (texture) {
              descriptorSet.bindTexture(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, texture);
            }
          }

          break;
      }

      descriptorSet.update();
      cmdBuff.updateBuffer(descriptorSet.getBuffer(jsonAsset.UBOShadow.BINDING), this._shadowUBO);
    }
  };

  _proto._updateUBOs = function _updateUBOs(camera, cmdBuff) {
    var exposure = camera.exposure;
    var sceneData = this._pipeline.pipelineSceneData;
    var isHDR = sceneData.isHDR;
    var fpScale = sceneData.fpScale;

    if (this._validLights.length > this._lightBufferCount) {
      this._firstLightBufferView.destroy();

      this._lightBufferCount = jsonAsset.nextPow2(this._validLights.length);

      this._lightBuffer.resize(this._lightBufferStride * this._lightBufferCount);

      this._lightBufferData = new Float32Array(this._lightBufferElementCount * this._lightBufferCount);

      this._firstLightBufferView.initialize(new jsonAsset.BufferViewInfo(this._lightBuffer, 0, jsonAsset.UBOForwardLight.SIZE));
    }

    for (var l = 0, offset = 0; l < this._validLights.length; l++, offset += this._lightBufferElementCount) {
      var light = this._validLights[l];

      switch (light.type) {
        case exports.LightType.SPHERE:
          jsonAsset.Vec3.toArray(_vec4Array, light.position);
          _vec4Array[3] = 0;

          this._lightBufferData.set(_vec4Array, offset + jsonAsset.UBOForwardLight.LIGHT_POS_OFFSET);

          _vec4Array[0] = light.size;
          _vec4Array[1] = light.range;
          _vec4Array[2] = 0.0;

          this._lightBufferData.set(_vec4Array, offset + jsonAsset.UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET);

          jsonAsset.Vec3.toArray(_vec4Array, light.color);

          if (light.useColorTemperature) {
            var tempRGB = light.colorTemperatureRGB;
            _vec4Array[0] *= tempRGB.x;
            _vec4Array[1] *= tempRGB.y;
            _vec4Array[2] *= tempRGB.z;
          }

          if (isHDR) {
            _vec4Array[3] = light.luminance * fpScale * this._lightMeterScale;
          } else {
            _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
          }

          this._lightBufferData.set(_vec4Array, offset + jsonAsset.UBOForwardLight.LIGHT_COLOR_OFFSET);

          break;

        case exports.LightType.SPOT:
          jsonAsset.Vec3.toArray(_vec4Array, light.position);
          _vec4Array[3] = 1;

          this._lightBufferData.set(_vec4Array, offset + jsonAsset.UBOForwardLight.LIGHT_POS_OFFSET);

          _vec4Array[0] = light.size;
          _vec4Array[1] = light.range;
          _vec4Array[2] = light.spotAngle;

          this._lightBufferData.set(_vec4Array, offset + jsonAsset.UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET);

          jsonAsset.Vec3.toArray(_vec4Array, light.direction);

          this._lightBufferData.set(_vec4Array, offset + jsonAsset.UBOForwardLight.LIGHT_DIR_OFFSET);

          jsonAsset.Vec3.toArray(_vec4Array, light.color);

          if (light.useColorTemperature) {
            var _tempRGB = light.colorTemperatureRGB;
            _vec4Array[0] *= _tempRGB.x;
            _vec4Array[1] *= _tempRGB.y;
            _vec4Array[2] *= _tempRGB.z;
          }

          if (isHDR) {
            _vec4Array[3] = light.luminance * fpScale * this._lightMeterScale;
          } else {
            _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
          }

          this._lightBufferData.set(_vec4Array, offset + jsonAsset.UBOForwardLight.LIGHT_COLOR_OFFSET);

          break;
      }
    }

    cmdBuff.updateBuffer(this._lightBuffer, this._lightBufferData);
  };

  return RenderAdditiveLightQueue;
}();

var _ab = new jsonAsset.AABB();

var PlanarShadowQueue = function () {
  function PlanarShadowQueue(pipeline) {
    this._pendingModels = [];
    this._instancedQueue = new RenderInstancedQueue();
    this._pipeline = void 0;
    this._pipeline = pipeline;
  }

  var _proto = PlanarShadowQueue.prototype;

  _proto.gatherShadowPasses = function gatherShadowPasses(camera, cmdBuff) {
    var pipelineSceneData = this._pipeline.pipelineSceneData;
    var pipelineUBO = this._pipeline.pipelineUBO;
    var shadows = pipelineSceneData.shadows;

    this._instancedQueue.clear();

    this._pendingModels.length = 0;

    if (!shadows.enabled || shadows.type !== jsonAsset.ShadowType.Planar) {
      return;
    }

    pipelineUBO.updateShadowUBO(camera);
    var scene = camera.scene;
    var frustum = camera.frustum;
    var shadowVisible = (camera.visibility & jsonAsset.Layers.BitMask.DEFAULT) !== 0;

    if (!scene.mainLight || !shadowVisible) {
      return;
    }

    var renderObjects = pipelineSceneData.renderObjects;
    var instancedBuffer = InstancedBuffer.get(shadows.instancingMaterial.passes[0]);

    this._instancedQueue.queue.add(instancedBuffer);

    for (var i = 0; i < renderObjects.length; i++) {
      var model = renderObjects[i].model;

      if (!model.enabled || !model.node || !model.castShadow) {
        continue;
      }

      if (model.worldBounds) {
        jsonAsset.AABB.transform(_ab, model.worldBounds, shadows.matLight);

        if (!jsonAsset.intersect.aabbFrustum(_ab, frustum)) {
          continue;
        }
      }

      if (model.isInstancingEnabled) {
        var subModels = model.subModels;

        for (var m = 0; m < subModels.length; m++) {
          var subModel = subModels[m];
          instancedBuffer.merge(subModel, model.instancedAttributes, 0, subModel.planarInstanceShader);
        }
      } else {
        this._pendingModels.push(model);
      }
    }

    this._instancedQueue.uploadBuffers(cmdBuff);
  };

  _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
    var shadows = this._pipeline.pipelineSceneData.shadows;

    if (!shadows.enabled || shadows.type !== jsonAsset.ShadowType.Planar) {
      return;
    }

    this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    if (!this._pendingModels.length) {
      return;
    }

    var pass = shadows.material.passes[0];
    var descriptorSet = pass.descriptorSet;
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, descriptorSet);
    var modelCount = this._pendingModels.length;

    for (var i = 0; i < modelCount; i++) {
      var model = this._pendingModels[i];

      for (var j = 0; j < model.subModels.length; j++) {
        var subModel = model.subModels[j];
        var shader = subModel.planarShader;
        var ia = subModel.inputAssembler;
        var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
        cmdBuff.bindPipelineState(pso);
        cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.LOCAL, subModel.descriptorSet);
        cmdBuff.bindInputAssembler(ia);
        cmdBuff.draw(ia);
      }
    }
  };

  return PlanarShadowQueue;
}();

var UIPhase = function () {
  function UIPhase() {
    this._phaseID = jsonAsset.getPhaseID('default');
  }

  var _proto = UIPhase.prototype;

  _proto.activate = function activate(pipeline) {
    this._pipeline = pipeline;
  };

  _proto.render = function render(camera, renderPass) {
    var pipeline = this._pipeline;
    var device = pipeline.device;
    var cmdBuff = pipeline.commandBuffers[0];
    var scene = camera.scene;
    var batches = scene.batches;

    for (var i = 0; i < batches.length; i++) {
      var batch = batches[i];
      var visible = false;

      if (camera.visibility & batch.visFlags) {
        visible = true;
      }

      if (!visible) continue;
      var count = batch.passes.length;

      for (var j = 0; j < count; j++) {
        var pass = batch.passes[j];
        if (pass.phase !== this._phaseID) continue;
        var shader = batch.shaders[j];
        var inputAssembler = batch.inputAssembler;
        var ds = batch.descriptorSet;
        var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
        cmdBuff.bindPipelineState(pso);
        cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, pass.descriptorSet);
        cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.LOCAL, ds);
        cmdBuff.bindInputAssembler(inputAssembler);
        cmdBuff.draw(inputAssembler);
      }
    }
  };

  return UIPhase;
}();

var _dec$4, _dec2$4, _dec3$4, _class$4, _class2$4, _descriptor$4, _class3, _temp$4;
var colors = [new jsonAsset.Color(0, 0, 0, 1)];
var ForwardStage = (_dec$4 = jsonAsset.ccclass('ForwardStage'), _dec2$4 = jsonAsset.type([RenderQueueDesc]), _dec3$4 = jsonAsset.displayOrder(), _dec$4(_class$4 = (_class2$4 = (_temp$4 = _class3 = function (_RenderStage) {
  jsonAsset._inheritsLoose(ForwardStage, _RenderStage);

  function ForwardStage() {
    var _this;

    _this = _RenderStage.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "renderQueues", _descriptor$4, jsonAsset._assertThisInitialized(_this));

    _this._renderQueues = [];
    _this._renderArea = new jsonAsset.Rect();
    _this._batchedQueue = void 0;
    _this._instancedQueue = void 0;
    _this._phaseID = jsonAsset.getPhaseID('default');
    _this._clearFlag = 0xffffffff;
    _this._batchedQueue = new RenderBatchedQueue();
    _this._instancedQueue = new RenderInstancedQueue();
    _this._uiPhase = new UIPhase();
    return _this;
  }

  var _proto = ForwardStage.prototype;

  _proto.initialize = function initialize(info) {
    _RenderStage.prototype.initialize.call(this, info);

    if (info.renderQueues) {
      this.renderQueues = info.renderQueues;
    }

    return true;
  };

  _proto.activate = function activate(pipeline, flow) {
    _RenderStage.prototype.activate.call(this, pipeline, flow);

    for (var i = 0; i < this.renderQueues.length; i++) {
      this._renderQueues[i] = convertRenderQueue(this.renderQueues[i]);
    }

    this._additiveLightQueue = new RenderAdditiveLightQueue(this._pipeline);
    this._planarQueue = new PlanarShadowQueue(this._pipeline);

    this._uiPhase.activate(pipeline);
  };

  _proto.destroy = function destroy() {};

  _proto.render = function render(camera) {
    this._instancedQueue.clear();

    this._batchedQueue.clear();

    var pipeline = this._pipeline;
    var device = pipeline.device;

    this._renderQueues.forEach(renderQueueClearFunc);

    var renderObjects = pipeline.pipelineSceneData.renderObjects;
    var m = 0;
    var p = 0;
    var k = 0;

    for (var i = 0; i < renderObjects.length; ++i) {
      var ro = renderObjects[i];
      var subModels = ro.model.subModels;

      for (m = 0; m < subModels.length; ++m) {
        var subModel = subModels[m];
        var passes = subModel.passes;

        for (p = 0; p < passes.length; ++p) {
          var pass = passes[p];
          if (pass.phase !== this._phaseID) continue;
          var batchingScheme = pass.batchingScheme;

          if (batchingScheme === jsonAsset.BatchingSchemes.INSTANCING) {
            var instancedBuffer = InstancedBuffer.get(pass);
            instancedBuffer.merge(subModel, ro.model.instancedAttributes, p);

            this._instancedQueue.queue.add(instancedBuffer);
          } else if (batchingScheme === jsonAsset.BatchingSchemes.VB_MERGING) {
            var batchedBuffer = BatchedBuffer.get(pass);
            batchedBuffer.merge(subModel, p, ro.model);

            this._batchedQueue.queue.add(batchedBuffer);
          } else {
            for (k = 0; k < this._renderQueues.length; k++) {
              this._renderQueues[k].insertRenderPass(ro, m, p);
            }
          }
        }
      }
    }

    this._renderQueues.forEach(renderQueueSortFunc);

    var cmdBuff = pipeline.commandBuffers[0];

    this._instancedQueue.uploadBuffers(cmdBuff);

    this._batchedQueue.uploadBuffers(cmdBuff);

    this._additiveLightQueue.gatherLightPasses(camera, cmdBuff);

    this._planarQueue.gatherShadowPasses(camera, cmdBuff);

    var sceneData = pipeline.pipelineSceneData;
    this._renderArea = pipeline.generateRenderArea(camera);

    if (camera.clearFlag & jsonAsset.ClearFlagBit.COLOR) {
      if (sceneData.isHDR) {
        SRGBToLinear(colors[0], camera.clearColor);
        var scale = sceneData.fpScale / camera.exposure;
        colors[0].x *= scale;
        colors[0].y *= scale;
        colors[0].z *= scale;
      } else {
        colors[0].x = camera.clearColor.x;
        colors[0].y = camera.clearColor.y;
        colors[0].z = camera.clearColor.z;
      }
    }

    colors[0].w = camera.clearColor.w;
    var framebuffer = camera.window.framebuffer;
    var renderPass = framebuffer.colorTextures[0] ? framebuffer.renderPass : pipeline.getRenderPass(camera.clearFlag & this._clearFlag);
    cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.GLOBAL, pipeline.descriptorSet);

    this._renderQueues[0].recordCommandBuffer(device, renderPass, cmdBuff);

    this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._additiveLightQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._planarQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._renderQueues[1].recordCommandBuffer(device, renderPass, cmdBuff);

    this._uiPhase.render(camera, renderPass);

    cmdBuff.endRenderPass();
  };

  return ForwardStage;
}(RenderStage), _class3.initInfo = {
  name: 'ForwardStage',
  priority: ForwardStagePriority.FORWARD,
  tag: 0,
  renderQueues: [{
    isTransparent: false,
    sortMode: RenderQueueSortMode.FRONT_TO_BACK,
    stages: ['default']
  }, {
    isTransparent: true,
    sortMode: RenderQueueSortMode.BACK_TO_FRONT,
    stages: ['default', 'planarShadow']
  }]
}, _temp$4), (_descriptor$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "renderQueues", [_dec2$4, jsonAsset.serializable, _dec3$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$4)) || _class$4);

var _dec$5, _class$5, _class2$5, _temp$5;
var ForwardFlow = (_dec$5 = jsonAsset.ccclass('ForwardFlow'), _dec$5(_class$5 = (_temp$5 = _class2$5 = function (_RenderFlow) {
  jsonAsset._inheritsLoose(ForwardFlow, _RenderFlow);

  function ForwardFlow() {
    return _RenderFlow.apply(this, arguments) || this;
  }

  var _proto = ForwardFlow.prototype;

  _proto.initialize = function initialize(info) {
    _RenderFlow.prototype.initialize.call(this, info);

    if (this._stages.length === 0) {
      var forwardStage = new ForwardStage();
      forwardStage.initialize(ForwardStage.initInfo);

      this._stages.push(forwardStage);
    }

    return true;
  };

  _proto.activate = function activate(pipeline) {
    _RenderFlow.prototype.activate.call(this, pipeline);
  };

  _proto.render = function render(camera) {
    _RenderFlow.prototype.render.call(this, camera);
  };

  _proto.destroy = function destroy() {
    _RenderFlow.prototype.destroy.call(this);
  };

  return ForwardFlow;
}(RenderFlow), _class2$5.initInfo = {
  name: jsonAsset.PIPELINE_FLOW_FORWARD,
  priority: ForwardFlowPriority.FORWARD,
  stages: []
}, _temp$5)) || _class$5);

var _phaseID$1 = jsonAsset.getPhaseID('shadow-caster');

var _shadowPassIndices = [];

function getShadowPassIndex(subModels, shadowPassIndices) {
  shadowPassIndices.length = 0;
  var hasShadowPass = false;

  for (var j = 0; j < subModels.length; j++) {
    var passes = subModels[j].passes;
    var shadowPassIndex = -1;

    for (var k = 0; k < passes.length; k++) {
      if (passes[k].phase === _phaseID$1) {
        shadowPassIndex = k;
        hasShadowPass = true;
        break;
      }
    }

    shadowPassIndices.push(shadowPassIndex);
  }

  return hasShadowPass;
}

var RenderShadowMapBatchedQueue = function () {
  function RenderShadowMapBatchedQueue(pipeline) {
    this._pipeline = void 0;
    this._subModelsArray = [];
    this._passArray = [];
    this._shaderArray = [];
    this._instancedQueue = void 0;
    this._batchedQueue = void 0;
    this._pipeline = pipeline;
    this._instancedQueue = new RenderInstancedQueue();
    this._batchedQueue = new RenderBatchedQueue();
  }

  var _proto = RenderShadowMapBatchedQueue.prototype;

  _proto.gatherLightPasses = function gatherLightPasses(light, cmdBuff) {
    this.clear();
    var shadowInfo = this._pipeline.pipelineSceneData.shadows;
    var shadowObjects = this._pipeline.pipelineSceneData.shadowObjects;

    if (light && shadowInfo.enabled && shadowInfo.type === jsonAsset.ShadowType.ShadowMap) {
      this._pipeline.pipelineUBO.updateShadowUBOLight(light);

      for (var i = 0; i < shadowObjects.length; i++) {
        var ro = shadowObjects[i];
        var model = ro.model;

        if (!getShadowPassIndex(model.subModels, _shadowPassIndices)) {
          continue;
        }

        switch (light.type) {
          case exports.LightType.DIRECTIONAL:
            this.add(model, cmdBuff, _shadowPassIndices);
            break;

          case exports.LightType.SPOT:
            if (model.worldBounds && (!jsonAsset.intersect.aabbWithAABB(model.worldBounds, light.aabb) || !jsonAsset.intersect.aabbFrustum(model.worldBounds, light.frustum))) continue;
            this.add(model, cmdBuff, _shadowPassIndices);
            break;
        }
      }
    }
  };

  _proto.clear = function clear() {
    this._subModelsArray.length = 0;
    this._shaderArray.length = 0;
    this._passArray.length = 0;

    this._instancedQueue.clear();

    this._batchedQueue.clear();
  };

  _proto.add = function add(model, cmdBuff, _shadowPassIndices) {
    var subModels = model.subModels;

    for (var j = 0; j < subModels.length; j++) {
      var subModel = subModels[j];
      var shadowPassIdx = _shadowPassIndices[j];
      var pass = subModel.passes[shadowPassIdx];
      var batchingScheme = pass.batchingScheme;

      if (batchingScheme === jsonAsset.BatchingSchemes.INSTANCING) {
        var buffer = InstancedBuffer.get(pass);
        buffer.merge(subModel, model.instancedAttributes, shadowPassIdx);

        this._instancedQueue.queue.add(buffer);
      } else if (pass.batchingScheme === jsonAsset.BatchingSchemes.VB_MERGING) {
        var _buffer = BatchedBuffer.get(pass);

        _buffer.merge(subModel, shadowPassIdx, model);

        this._batchedQueue.queue.add(_buffer);
      } else {
        var shader = subModel.shaders[shadowPassIdx];

        this._subModelsArray.push(subModel);

        if (shader) this._shaderArray.push(shader);

        this._passArray.push(pass);
      }
    }

    this._instancedQueue.uploadBuffers(cmdBuff);

    this._batchedQueue.uploadBuffers(cmdBuff);
  };

  _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
    this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    for (var i = 0; i < this._subModelsArray.length; ++i) {
      var subModel = this._subModelsArray[i];
      var shader = this._shaderArray[i];
      var pass = this._passArray[i];
      var ia = subModel.inputAssembler;
      var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
      var descriptorSet = pass.descriptorSet;
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, descriptorSet);
      cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.LOCAL, subModel.descriptorSet);
      cmdBuff.bindInputAssembler(ia);
      cmdBuff.draw(ia);
    }
  };

  return RenderShadowMapBatchedQueue;
}();

var _dec$6, _class$6, _class2$6, _temp$6;
var colors$1 = [new jsonAsset.Color(1, 1, 1, 1)];
var ShadowStage = (_dec$6 = jsonAsset.ccclass('ShadowStage'), _dec$6(_class$6 = (_temp$6 = _class2$6 = function (_RenderStage) {
  jsonAsset._inheritsLoose(ShadowStage, _RenderStage);

  function ShadowStage() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _RenderStage.call.apply(_RenderStage, [this].concat(args)) || this;
    _this._additiveShadowQueue = void 0;
    _this._shadowFrameBuffer = null;
    _this._renderArea = new jsonAsset.Rect();
    _this._light = null;
    return _this;
  }

  var _proto = ShadowStage.prototype;

  _proto.setUsage = function setUsage(light, shadowFrameBuffer) {
    this._light = light;
    this._shadowFrameBuffer = shadowFrameBuffer;
  };

  _proto.destroy = function destroy() {
    var _this$_additiveShadow;

    (_this$_additiveShadow = this._additiveShadowQueue) === null || _this$_additiveShadow === void 0 ? void 0 : _this$_additiveShadow.clear();
  };

  _proto.clearFramebuffer = function clearFramebuffer(camera) {
    if (!this._light || !this._shadowFrameBuffer) {
      return;
    }

    colors$1[0].w = camera.clearColor.w;
    var pipeline = this._pipeline;
    var cmdBuff = pipeline.commandBuffers[0];
    var renderPass = this._shadowFrameBuffer.renderPass;
    cmdBuff.beginRenderPass(renderPass, this._shadowFrameBuffer, this._renderArea, colors$1, camera.clearDepth, camera.clearStencil);
    cmdBuff.endRenderPass();
  };

  _proto.render = function render(camera) {
    var pipeline = this._pipeline;
    var pipelineSceneData = pipeline.pipelineSceneData;
    var shadowInfo = pipelineSceneData.shadows;
    var shadingScale = pipelineSceneData.shadingScale;
    var cmdBuff = pipeline.commandBuffers[0];

    if (!this._light || !this._shadowFrameBuffer) {
      return;
    }

    this._additiveShadowQueue.gatherLightPasses(this._light, cmdBuff);

    var vp = camera.viewport;
    var shadowMapSize = shadowInfo.size;
    this._renderArea.x = vp.x * shadowMapSize.x;
    this._renderArea.y = vp.y * shadowMapSize.y;
    this._renderArea.width = vp.width * shadowMapSize.x * shadingScale;
    this._renderArea.height = vp.height * shadowMapSize.y * shadingScale;
    var device = pipeline.device;
    var renderPass = this._shadowFrameBuffer.renderPass;
    cmdBuff.beginRenderPass(renderPass, this._shadowFrameBuffer, this._renderArea, colors$1, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.GLOBAL, pipeline.descriptorSet);

    this._additiveShadowQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    cmdBuff.endRenderPass();
  };

  _proto.activate = function activate(pipeline, flow) {
    _RenderStage.prototype.activate.call(this, pipeline, flow);

    this._additiveShadowQueue = new RenderShadowMapBatchedQueue(pipeline);
  };

  return ShadowStage;
}(RenderStage), _class2$6.initInfo = {
  name: 'ShadowStage',
  priority: ForwardStagePriority.FORWARD,
  tag: 0
}, _temp$6)) || _class$6);

var _dec$7, _class$7, _class2$7, _temp$7;
var ShadowFlow = (_dec$7 = jsonAsset.ccclass('ShadowFlow'), _dec$7(_class$7 = (_temp$7 = _class2$7 = function (_RenderFlow) {
  jsonAsset._inheritsLoose(ShadowFlow, _RenderFlow);

  function ShadowFlow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _RenderFlow.call.apply(_RenderFlow, [this].concat(args)) || this;
    _this._shadowRenderPass = null;
    return _this;
  }

  var _proto = ShadowFlow.prototype;

  _proto.initialize = function initialize(info) {
    _RenderFlow.prototype.initialize.call(this, info);

    if (this._stages.length === 0) {
      var shadowMapStage = new ShadowStage();
      shadowMapStage.initialize(ShadowStage.initInfo);

      this._stages.push(shadowMapStage);
    }

    return true;
  };

  _proto.render = function render(camera) {
    var pipeline = this._pipeline;
    var shadowInfo = pipeline.pipelineSceneData.shadows;
    var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    var shadowObjects = pipeline.pipelineSceneData.shadowObjects;

    if (!shadowInfo.enabled || shadowInfo.type !== jsonAsset.ShadowType.ShadowMap) {
      return;
    }

    var validLights = lightCollecting(camera, shadowInfo.maxReceived);

    if (shadowObjects.length === 0) {
      this.clearShadowMap(validLights, camera);
      return;
    }

    if (shadowInfo.shadowMapDirty) {
      this.resizeShadowMap();
    }

    for (var l = 0; l < validLights.length; l++) {
      var light = validLights[l];

      if (!shadowFrameBufferMap.has(light)) {
        this._initShadowFrameBuffer(pipeline, light);
      }

      var shadowFrameBuffer = shadowFrameBufferMap.get(light);

      for (var i = 0; i < this._stages.length; i++) {
        var shadowStage = this._stages[i];
        shadowStage.setUsage(light, shadowFrameBuffer);
        shadowStage.render(camera);
      }
    }

    pipeline.pipelineUBO.updateShadowUBO(camera);
  };

  _proto.destroy = function destroy() {
    _RenderFlow.prototype.destroy.call(this);

    if (this._pipeline) {
      var shadowFrameBufferMap = this._pipeline.pipelineSceneData.shadowFrameBufferMap;
      var shadowFrameBuffers = Array.from(shadowFrameBufferMap.values());

      for (var i = 0; i < shadowFrameBuffers.length; i++) {
        var frameBuffer = shadowFrameBuffers[i];

        if (!frameBuffer) {
          continue;
        }

        var renderTargets = frameBuffer.colorTextures;

        for (var j = 0; j < renderTargets.length; j++) {
          var renderTarget = renderTargets[i];

          if (renderTarget) {
            renderTarget.destroy();
          }
        }

        renderTargets.length = 0;
        var depth = frameBuffer.depthStencilTexture;

        if (depth) {
          depth.destroy();
        }

        frameBuffer.destroy();
      }

      shadowFrameBufferMap.clear();
    }

    if (this._shadowRenderPass) {
      this._shadowRenderPass.destroy();
    }
  };

  _proto._initShadowFrameBuffer = function _initShadowFrameBuffer(pipeline, light) {
    var device = pipeline.device;
    var shadows = pipeline.pipelineSceneData.shadows;
    var shadowMapSize = shadows.size;
    var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    var format = jsonAsset.supportsHalfFloatTexture(device) ? jsonAsset.Format.R16F : jsonAsset.Format.RGBA8;

    if (!this._shadowRenderPass) {
      var colorAttachment = new jsonAsset.ColorAttachment();
      colorAttachment.format = format;
      colorAttachment.loadOp = jsonAsset.LoadOp.CLEAR;
      colorAttachment.storeOp = jsonAsset.StoreOp.STORE;
      colorAttachment.sampleCount = 1;
      var depthStencilAttachment = new jsonAsset.DepthStencilAttachment();
      depthStencilAttachment.format = device.depthStencilFormat;
      depthStencilAttachment.depthLoadOp = jsonAsset.LoadOp.CLEAR;
      depthStencilAttachment.depthStoreOp = jsonAsset.StoreOp.DISCARD;
      depthStencilAttachment.stencilLoadOp = jsonAsset.LoadOp.CLEAR;
      depthStencilAttachment.stencilStoreOp = jsonAsset.StoreOp.DISCARD;
      depthStencilAttachment.sampleCount = 1;
      var renderPassInfo = new jsonAsset.RenderPassInfo([colorAttachment], depthStencilAttachment);
      this._shadowRenderPass = device.createRenderPass(renderPassInfo);
    }

    var shadowRenderTargets = [];
    shadowRenderTargets.push(device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.COLOR_ATTACHMENT | jsonAsset.TextureUsageBit.SAMPLED, format, shadowMapSize.x, shadowMapSize.y)));
    var depth = device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, device.depthStencilFormat, shadowMapSize.x, shadowMapSize.y));
    var shadowFrameBuffer = device.createFramebuffer(new jsonAsset.FramebufferInfo(this._shadowRenderPass, shadowRenderTargets, depth));
    shadowFrameBufferMap.set(light, shadowFrameBuffer);
  };

  _proto.clearShadowMap = function clearShadowMap(validLights, camera) {
    var scene = this._pipeline.pipelineSceneData;

    for (var l = 0; l < validLights.length; l++) {
      var light = validLights[l];
      var shadowFrameBuffer = scene.shadowFrameBufferMap.get(light);

      if (!scene.shadowFrameBufferMap.has(light)) {
        continue;
      }

      for (var i = 0; i < this._stages.length; i++) {
        var shadowStage = this._stages[i];
        shadowStage.setUsage(light, shadowFrameBuffer);
        shadowStage.clearFramebuffer(camera);
      }
    }
  };

  _proto.resizeShadowMap = function resizeShadowMap() {
    var shadows = this._pipeline.pipelineSceneData.shadows;
    var shadowMapSize = shadows.size;
    var pipeline = this._pipeline;
    var device = pipeline.device;
    var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    var format = jsonAsset.supportsHalfFloatTexture(device) ? jsonAsset.Format.R16F : jsonAsset.Format.RGBA8;
    var it = shadowFrameBufferMap.values();
    var res = it.next();

    while (!res.done) {
      var frameBuffer = res.value;

      if (!frameBuffer) {
        res = it.next();
        continue;
      }

      var renderTargets = [];
      renderTargets.push(pipeline.device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.COLOR_ATTACHMENT | jsonAsset.TextureUsageBit.SAMPLED, format, shadowMapSize.x, shadowMapSize.y)));
      var depth = frameBuffer.depthStencilTexture;

      if (depth) {
        depth.resize(shadowMapSize.x, shadowMapSize.y);
      }

      var shadowRenderPass = frameBuffer.renderPass;
      frameBuffer.destroy();
      frameBuffer.initialize(new jsonAsset.FramebufferInfo(shadowRenderPass, renderTargets, depth));
      res = it.next();
    }

    shadows.shadowMapDirty = false;
  };

  return ShadowFlow;
}(RenderFlow), _class2$7.initInfo = {
  name: jsonAsset.PIPELINE_FLOW_SHADOW,
  priority: ForwardFlowPriority.SHADOW,
  tag: RenderFlowTag.SCENE,
  stages: []
}, _temp$7)) || _class$7);

var PipelineSceneData = function () {
  var _proto = PipelineSceneData.prototype;

  _proto._init = function _init() {
  };

  jsonAsset._createClass(PipelineSceneData, [{
    key: "native",
    get: function get() {
      return this._nativeObj;
    }
  }, {
    key: "isHDR",
    get: function get() {
      return this._isHDR;
    },
    set: function set(val) {
      this._isHDR = val;
    }
  }, {
    key: "shadingScale",
    get: function get() {
      return this._shadingScale;
    },
    set: function set(val) {
      this._shadingScale = val;
    }
  }, {
    key: "fpScale",
    get: function get() {
      return this._fpScale;
    },
    set: function set(val) {
      this._fpScale = val;
    }
  }]);

  function PipelineSceneData() {
    this.fog = new jsonAsset.Fog();
    this.ambient = new jsonAsset.Ambient();
    this.skybox = new Skybox();
    this.shadows = new jsonAsset.Shadows();
    this.renderObjects = [];
    this.shadowObjects = [];
    this.shadowFrameBufferMap = new Map();
    this._isHDR = false;
    this._shadingScale = 1.0;
    this._fpScale = 1.0 / 1024.0;

    this._init();

    this.shadingScale = 1.0;
    this.fpScale = 1.0 / 1024.0;
  }

  _proto.activate = function activate(device, pipeline) {
    this._device = device;
    this._pipeline = pipeline;
    return true;
  };

  _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {};

  _proto.destroy = function destroy() {
    this.ambient.destroy();
    this.skybox.destroy();
    this.fog.destroy();
    this.shadows.destroy();
  };

  return PipelineSceneData;
}();

var _dec$8, _dec2$5, _dec3$5, _class$8, _class2$8, _descriptor$5, _temp$8;
var PIPELINE_TYPE = 0;
var _samplerInfo = [jsonAsset.Filter.POINT, jsonAsset.Filter.POINT, jsonAsset.Filter.NONE, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP];
var ForwardPipeline = (_dec$8 = jsonAsset.ccclass('ForwardPipeline'), _dec2$5 = jsonAsset.type([RenderTextureConfig]), _dec3$5 = jsonAsset.displayOrder(), _dec$8(_class$8 = (_class2$8 = (_temp$8 = function (_RenderPipeline) {
  jsonAsset._inheritsLoose(ForwardPipeline, _RenderPipeline);

  function ForwardPipeline() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _RenderPipeline.call.apply(_RenderPipeline, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "renderTextures", _descriptor$5, jsonAsset._assertThisInitialized(_this));

    _this._renderPasses = new Map();
    return _this;
  }

  var _proto = ForwardPipeline.prototype;

  _proto.initialize = function initialize(info) {
    _RenderPipeline.prototype.initialize.call(this, info);

    if (this._flows.length === 0) {
      var shadowFlow = new ShadowFlow();
      shadowFlow.initialize(ShadowFlow.initInfo);

      this._flows.push(shadowFlow);

      var forwardFlow = new ForwardFlow();
      forwardFlow.initialize(ForwardFlow.initInfo);

      this._flows.push(forwardFlow);
    }

    return true;
  };

  _proto.activate = function activate() {

    this._macros = {
      CC_PIPELINE_TYPE: PIPELINE_TYPE
    };
    this._pipelineSceneData = new PipelineSceneData();

    if (!_RenderPipeline.prototype.activate.call(this)) {
      return false;
    }

    if (!this._activeRenderer()) {
      jsonAsset.errorID(2402);
      return false;
    }

    return true;
  };

  _proto.render = function render(cameras) {
    this._commandBuffers[0].begin();

    this._pipelineUBO.updateGlobalUBO();

    for (var i = 0; i < cameras.length; i++) {
      var camera = cameras[i];

      if (camera.scene) {
        sceneCulling(this, camera);

        this._pipelineUBO.updateCameraUBO(camera);

        for (var j = 0; j < this._flows.length; j++) {
          this._flows[j].render(camera);
        }
      }
    }

    this._commandBuffers[0].end();

    this._device.flushCommands(this._commandBuffers);

    this._device.queue.submit(this._commandBuffers);
  };

  _proto.getRenderPass = function getRenderPass(clearFlags) {
    var renderPass = this._renderPasses.get(clearFlags);

    if (renderPass) {
      return renderPass;
    }

    var device = this.device;
    var colorAttachment = new jsonAsset.ColorAttachment();
    var depthStencilAttachment = new jsonAsset.DepthStencilAttachment();
    colorAttachment.format = device.colorFormat;
    depthStencilAttachment.format = device.depthStencilFormat;
    depthStencilAttachment.stencilStoreOp = jsonAsset.StoreOp.DISCARD;
    depthStencilAttachment.depthStoreOp = jsonAsset.StoreOp.DISCARD;

    if (!(clearFlags & jsonAsset.ClearFlagBit.COLOR)) {
      if (clearFlags & SKYBOX_FLAG) {
        colorAttachment.loadOp = jsonAsset.LoadOp.DISCARD;
      } else {
        colorAttachment.loadOp = jsonAsset.LoadOp.LOAD;
        colorAttachment.beginAccesses = [jsonAsset.AccessType.PRESENT];
      }
    }

    if ((clearFlags & jsonAsset.ClearFlagBit.DEPTH_STENCIL) !== jsonAsset.ClearFlagBit.DEPTH_STENCIL) {
      if (!(clearFlags & jsonAsset.ClearFlagBit.DEPTH)) depthStencilAttachment.depthLoadOp = jsonAsset.LoadOp.LOAD;
      if (!(clearFlags & jsonAsset.ClearFlagBit.STENCIL)) depthStencilAttachment.stencilLoadOp = jsonAsset.LoadOp.LOAD;
      depthStencilAttachment.beginAccesses = [jsonAsset.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
    }

    var renderPassInfo = new jsonAsset.RenderPassInfo([colorAttachment], depthStencilAttachment);
    renderPass = device.createRenderPass(renderPassInfo);

    this._renderPasses.set(clearFlags, renderPass);

    return renderPass;
  };

  _proto._activeRenderer = function _activeRenderer() {
    var device = this.device;

    this._commandBuffers.push(device.commandBuffer);

    var shadowMapSamplerHash = jsonAsset.genSamplerHash(_samplerInfo);
    var shadowMapSampler = jsonAsset.samplerLib.getSampler(device, shadowMapSamplerHash);

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_SHADOWMAP_BINDING, shadowMapSampler);

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_SHADOWMAP_BINDING, jsonAsset.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, shadowMapSampler);

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, jsonAsset.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.update();

    return true;
  };

  _proto.destroyUBOs = function destroyUBOs() {
    if (this._descriptorSet) {
      this._descriptorSet.getBuffer(jsonAsset.UBOGlobal.BINDING).destroy();

      this._descriptorSet.getBuffer(jsonAsset.UBOShadow.BINDING).destroy();

      this._descriptorSet.getBuffer(jsonAsset.UBOCamera.BINDING).destroy();

      this._descriptorSet.getSampler(jsonAsset.UNIFORM_SHADOWMAP_BINDING).destroy();

      this._descriptorSet.getSampler(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();

      this._descriptorSet.getTexture(jsonAsset.UNIFORM_SHADOWMAP_BINDING).destroy();

      this._descriptorSet.getTexture(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
    }
  };

  _proto.destroy = function destroy() {
    this.destroyUBOs();

    var rpIter = this._renderPasses.values();

    var rpRes = rpIter.next();

    while (!rpRes.done) {
      rpRes.value.destroy();
      rpRes = rpIter.next();
    }

    this._commandBuffers.length = 0;
    return _RenderPipeline.prototype.destroy.call(this);
  };

  return ForwardPipeline;
}(RenderPipeline), _temp$8), (_descriptor$5 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "renderTextures", [_dec2$5, jsonAsset.serializable, _dec3$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$8)) || _class$8);

var DeferredStagePriority;

(function (DeferredStagePriority) {
  DeferredStagePriority[DeferredStagePriority["GBUFFER"] = 10] = "GBUFFER";
  DeferredStagePriority[DeferredStagePriority["LIGHTING"] = 15] = "LIGHTING";
  DeferredStagePriority[DeferredStagePriority["TRANSPARENT"] = 18] = "TRANSPARENT";
  DeferredStagePriority[DeferredStagePriority["POSTPROCESS"] = 19] = "POSTPROCESS";
  DeferredStagePriority[DeferredStagePriority["UI"] = 20] = "UI";
})(DeferredStagePriority || (DeferredStagePriority = {}));

var DeferredFlowPriority;

(function (DeferredFlowPriority) {
  DeferredFlowPriority[DeferredFlowPriority["SHADOW"] = 0] = "SHADOW";
  DeferredFlowPriority[DeferredFlowPriority["MAIN"] = 1] = "MAIN";
  DeferredFlowPriority[DeferredFlowPriority["UI"] = 10] = "UI";
})(DeferredFlowPriority || (DeferredFlowPriority = {}));

var _dec$9, _dec2$6, _dec3$6, _class$9, _class2$9, _descriptor$6, _class3$1, _temp$9;
var colors$2 = [new jsonAsset.Color(0, 0, 0, 0), new jsonAsset.Color(0, 0, 0, 0), new jsonAsset.Color(0, 0, 0, 0), new jsonAsset.Color(0, 0, 0, 0)];
var GbufferStage = (_dec$9 = jsonAsset.ccclass('GbufferStage'), _dec2$6 = jsonAsset.type([RenderQueueDesc]), _dec3$6 = jsonAsset.displayOrder(), _dec$9(_class$9 = (_class2$9 = (_temp$9 = _class3$1 = function (_RenderStage) {
  jsonAsset._inheritsLoose(GbufferStage, _RenderStage);

  function GbufferStage() {
    var _this;

    _this = _RenderStage.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "renderQueues", _descriptor$6, jsonAsset._assertThisInitialized(_this));

    _this._renderQueues = [];
    _this._renderArea = new jsonAsset.Rect();
    _this._batchedQueue = void 0;
    _this._instancedQueue = void 0;
    _this._phaseID = jsonAsset.getPhaseID('deferred');
    _this._batchedQueue = new RenderBatchedQueue();
    _this._instancedQueue = new RenderInstancedQueue();
    return _this;
  }

  var _proto = GbufferStage.prototype;

  _proto.initialize = function initialize(info) {
    _RenderStage.prototype.initialize.call(this, info);

    if (info.renderQueues) {
      this.renderQueues = info.renderQueues;
    }

    return true;
  };

  _proto.activate = function activate(pipeline, flow) {
    _RenderStage.prototype.activate.call(this, pipeline, flow);

    for (var i = 0; i < this.renderQueues.length; i++) {
      this._renderQueues[i] = convertRenderQueue(this.renderQueues[i]);
    }
  };

  _proto.destroy = function destroy() {};

  _proto.render = function render(camera) {
    this._instancedQueue.clear();

    this._batchedQueue.clear();

    var pipeline = this._pipeline;
    var device = pipeline.device;

    this._renderQueues.forEach(renderQueueClearFunc);

    var renderObjects = pipeline.pipelineSceneData.renderObjects;

    if (renderObjects.length === 0) {
      return;
    }

    var m = 0;
    var p = 0;
    var k = 0;

    for (var i = 0; i < renderObjects.length; ++i) {
      var ro = renderObjects[i];
      var subModels = ro.model.subModels;

      for (m = 0; m < subModels.length; ++m) {
        var subModel = subModels[m];
        var passes = subModel.passes;

        for (p = 0; p < passes.length; ++p) {
          var pass = passes[p];
          if (pass.phase !== this._phaseID) continue;
          var batchingScheme = pass.batchingScheme;

          if (batchingScheme === jsonAsset.BatchingSchemes.INSTANCING) {
            var instancedBuffer = InstancedBuffer.get(pass);
            instancedBuffer.merge(subModel, ro.model.instancedAttributes, p);

            this._instancedQueue.queue.add(instancedBuffer);
          } else if (batchingScheme === jsonAsset.BatchingSchemes.VB_MERGING) {
            var batchedBuffer = BatchedBuffer.get(pass);
            batchedBuffer.merge(subModel, p, ro.model);

            this._batchedQueue.queue.add(batchedBuffer);
          } else {
            for (k = 0; k < this._renderQueues.length; k++) {
              this._renderQueues[k].insertRenderPass(ro, m, p);
            }
          }
        }
      }
    }

    this._renderQueues.forEach(renderQueueSortFunc);

    var cmdBuff = pipeline.commandBuffers[0];

    this._instancedQueue.uploadBuffers(cmdBuff);

    this._batchedQueue.uploadBuffers(cmdBuff);

    this._renderArea = pipeline.generateRenderArea(camera);
    pipeline.updateQuadVertexData(this._renderArea);

    if (camera.clearFlag & jsonAsset.ClearFlagBit.COLOR) {
      if (pipeline.pipelineSceneData.isHDR) {
        SRGBToLinear(colors$2[0], camera.clearColor);
        var scale = pipeline.pipelineSceneData.fpScale / camera.exposure;
        colors$2[0].x *= scale;
        colors$2[0].y *= scale;
        colors$2[0].z *= scale;
      } else {
        colors$2[0].x = camera.clearColor.x;
        colors$2[0].y = camera.clearColor.y;
        colors$2[0].z = camera.clearColor.z;
      }
    }

    colors$2[0].w = camera.clearColor.w;
    var deferredData = pipeline.getDeferredRenderData(camera);
    var framebuffer = deferredData.gbufferFrameBuffer;
    var renderPass = framebuffer.renderPass;
    cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors$2, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.GLOBAL, pipeline.descriptorSet);

    for (var _i = 0; _i < this.renderQueues.length; _i++) {
      this._renderQueues[_i].recordCommandBuffer(device, renderPass, cmdBuff);
    }

    this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    cmdBuff.endRenderPass();
  };

  return GbufferStage;
}(RenderStage), _class3$1.initInfo = {
  name: 'GbufferStage',
  priority: DeferredStagePriority.GBUFFER,
  tag: 0,
  renderQueues: [{
    isTransparent: false,
    sortMode: RenderQueueSortMode.FRONT_TO_BACK,
    stages: ['default']
  }, {
    isTransparent: true,
    sortMode: RenderQueueSortMode.BACK_TO_FRONT,
    stages: ['default']
  }]
}, _temp$9), (_descriptor$6 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "renderQueues", [_dec2$6, jsonAsset.serializable, _dec3$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$9)) || _class$9);

var _dec$a, _dec2$7, _dec3$7, _dec4$4, _dec5$2, _class$a, _class2$a, _descriptor$7, _descriptor2$4, _class3$2, _temp$a;
var colors$3 = [new jsonAsset.Color(0, 0, 0, 1)];
var LightingStage = (_dec$a = jsonAsset.ccclass('LightingStage'), _dec2$7 = jsonAsset.type(jsonAsset.Material), _dec3$7 = jsonAsset.displayOrder(), _dec4$4 = jsonAsset.type([RenderQueueDesc]), _dec5$2 = jsonAsset.displayOrder(), _dec$a(_class$a = (_class2$a = (_temp$a = _class3$2 = function (_RenderStage) {
  jsonAsset._inheritsLoose(LightingStage, _RenderStage);

  function LightingStage() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _RenderStage.call.apply(_RenderStage, [this].concat(args)) || this;
    _this._deferredLitsBufs = null;
    _this._maxDeferredLights = jsonAsset.UBODeferredLight.LIGHTS_PER_PASS;
    _this._lightBufferData = void 0;
    _this._lightMeterScale = 10000.0;
    _this._descriptorSet = null;
    _this._descriptorSetLayout = void 0;
    _this._renderArea = new jsonAsset.Rect();

    jsonAsset._initializerDefineProperty(_this, "_deferredMaterial", _descriptor$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "renderQueues", _descriptor2$4, jsonAsset._assertThisInitialized(_this));

    _this._phaseID = jsonAsset.getPhaseID('default');
    _this._defPhaseID = jsonAsset.getPhaseID('deferred');
    _this._renderQueues = [];
    return _this;
  }

  var _proto = LightingStage.prototype;

  _proto.initialize = function initialize(info) {
    _RenderStage.prototype.initialize.call(this, info);

    return true;
  };

  _proto.gatherLights = function gatherLights(camera) {
    var pipeline = this._pipeline;
    var cmdBuff = pipeline.commandBuffers[0];
    var sphereLights = camera.scene.sphereLights;
    var spotLights = camera.scene.spotLights;

    var _sphere = jsonAsset.Sphere.create(0, 0, 0, 1);

    var _vec4Array = new Float32Array(4);

    var exposure = camera.exposure;
    var idx = 0;
    var elementLen = jsonAsset.Vec4.length;
    var fieldLen = elementLen * this._maxDeferredLights;

    for (var i = 0; i < sphereLights.length && idx < this._maxDeferredLights; i++, ++idx) {
      var light = sphereLights[i];
      jsonAsset.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (jsonAsset.intersect.sphereFrustum(_sphere, camera.frustum)) {
        jsonAsset.Vec3.toArray(_vec4Array, light.position);
        _vec4Array[3] = 0;

        this._lightBufferData.set(_vec4Array, idx * elementLen);

        jsonAsset.Vec3.toArray(_vec4Array, light.color);

        if (light.useColorTemperature) {
          var tempRGB = light.colorTemperatureRGB;
          _vec4Array[0] *= tempRGB.x;
          _vec4Array[1] *= tempRGB.y;
          _vec4Array[2] *= tempRGB.z;
        }

        if (pipeline.pipelineSceneData.isHDR) {
          _vec4Array[3] = light.luminance * pipeline.pipelineSceneData.fpScale * this._lightMeterScale;
        } else {
          _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
        }

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1);

        _vec4Array[0] = light.size;
        _vec4Array[1] = light.range;
        _vec4Array[2] = 0.0;

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2);
      }
    }

    for (var _i = 0; _i < spotLights.length && idx < this._maxDeferredLights; _i++, ++idx) {
      var _light = spotLights[_i];
      jsonAsset.Sphere.set(_sphere, _light.position.x, _light.position.y, _light.position.z, _light.range);

      if (jsonAsset.intersect.sphereFrustum(_sphere, camera.frustum)) {
        jsonAsset.Vec3.toArray(_vec4Array, _light.position);
        _vec4Array[3] = 1;

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 0);

        jsonAsset.Vec3.toArray(_vec4Array, _light.color);

        if (_light.useColorTemperature) {
          var _tempRGB = _light.colorTemperatureRGB;
          _vec4Array[0] *= _tempRGB.x;
          _vec4Array[1] *= _tempRGB.y;
          _vec4Array[2] *= _tempRGB.z;
        }

        if (pipeline.pipelineSceneData.isHDR) {
          _vec4Array[3] = _light.luminance * pipeline.pipelineSceneData.fpScale * this._lightMeterScale;
        } else {
          _vec4Array[3] = _light.luminance * exposure * this._lightMeterScale;
        }

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1);

        _vec4Array[0] = _light.size;
        _vec4Array[1] = _light.range;
        _vec4Array[2] = _light.spotAngle;

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2);

        jsonAsset.Vec3.toArray(_vec4Array, _light.direction);

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 3);
      }
    }

    var offset = fieldLen * 3 + 3;

    this._lightBufferData.set([idx], offset);

    cmdBuff.updateBuffer(this._deferredLitsBufs, this._lightBufferData);
  };

  _proto.activate = function activate(pipeline, flow) {
    _RenderStage.prototype.activate.call(this, pipeline, flow);

    var device = pipeline.device;

    for (var i = 0; i < this.renderQueues.length; i++) {
      this._renderQueues[i] = convertRenderQueue(this.renderQueues[i]);
    }

    var totalSize = Float32Array.BYTES_PER_ELEMENT * 4 * 4 * this._maxDeferredLights;
    totalSize = Math.ceil(totalSize / device.capabilities.uboOffsetAlignment) * device.capabilities.uboOffsetAlignment;
    this._deferredLitsBufs = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.UNIFORM | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, totalSize, device.capabilities.uboOffsetAlignment));
    var deferredLitsBufView = device.createBuffer(new jsonAsset.BufferViewInfo(this._deferredLitsBufs, 0, totalSize));
    this._lightBufferData = new Float32Array(totalSize / Float32Array.BYTES_PER_ELEMENT);
    var layoutInfo = new jsonAsset.DescriptorSetLayoutInfo(jsonAsset.localDescriptorSetLayout.bindings);
    this._descriptorSetLayout = device.createDescriptorSetLayout(layoutInfo);
    this._descriptorSet = device.createDescriptorSet(new jsonAsset.DescriptorSetInfo(this._descriptorSetLayout));

    this._descriptorSet.bindBuffer(jsonAsset.UBOForwardLight.BINDING, deferredLitsBufView);

    this._planarQueue = new PlanarShadowQueue(this._pipeline);

    if (this._deferredMaterial) {
      pipeline.pipelineSceneData.deferredLightingMaterial = this._deferredMaterial;
    }
  };

  _proto.destroy = function destroy() {
    var _this$_deferredLitsBu;

    (_this$_deferredLitsBu = this._deferredLitsBufs) === null || _this$_deferredLitsBu === void 0 ? void 0 : _this$_deferredLitsBu.destroy();
    this._deferredLitsBufs = null;
    this._descriptorSet = null;
  };

  _proto.render = function render(camera) {
    var pipeline = this._pipeline;
    var device = pipeline.device;
    var cmdBuff = pipeline.commandBuffers[0];
    var sceneData = pipeline.pipelineSceneData;
    var renderObjects = sceneData.renderObjects;

    if (renderObjects.length === 0) {
      return;
    }

    this.gatherLights(camera);

    this._descriptorSet.update();

    this._planarQueue.gatherShadowPasses(camera, cmdBuff);

    var dynamicOffsets = [0];
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.LOCAL, this._descriptorSet, dynamicOffsets);
    this._renderArea = pipeline.generateRenderArea(camera);

    if (camera.clearFlag & jsonAsset.ClearFlagBit.COLOR) {
      if (sceneData.isHDR) {
        SRGBToLinear(colors$3[0], camera.clearColor);
        var scale = sceneData.fpScale / camera.exposure;
        colors$3[0].x *= scale;
        colors$3[0].y *= scale;
        colors$3[0].z *= scale;
      } else {
        colors$3[0].x = camera.clearColor.x;
        colors$3[0].y = camera.clearColor.y;
        colors$3[0].z = camera.clearColor.z;
      }
    }

    colors$3[0].w = 0;
    var deferredData = pipeline.getDeferredRenderData(camera);
    var framebuffer = deferredData.lightingFrameBuffer;
    var renderPass = framebuffer.renderPass;
    cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors$3, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.GLOBAL, pipeline.descriptorSet);
    var lightingMat = sceneData.deferredLightingMaterial;
    var pass = lightingMat.passes[0];
    var shader = pass.getShaderVariant();
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, pass.descriptorSet);
    var inputAssembler = pipeline.quadIAOffscreen;
    var pso = null;

    if (pass != null && shader != null && inputAssembler != null) {
      pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
    }

    if (pso != null) {
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindInputAssembler(inputAssembler);
      cmdBuff.draw(inputAssembler);
    }

    this._renderQueues.forEach(renderQueueClearFunc);

    var m = 0;
    var p = 0;
    var k = 0;

    for (var i = 0; i < renderObjects.length; ++i) {
      var ro = renderObjects[i];
      var subModels = ro.model.subModels;

      for (m = 0; m < subModels.length; ++m) {
        var subModel = subModels[m];
        var passes = subModel.passes;

        for (p = 0; p < passes.length; ++p) {
          var _pass = passes[p];
          if (_pass.phase !== this._phaseID && _pass.phase !== this._defPhaseID) continue;

          for (k = 0; k < this._renderQueues.length; k++) {
            this._renderQueues[k].insertRenderPass(ro, m, p);
          }
        }
      }
    }

    this._renderQueues.forEach(renderQueueSortFunc);

    for (var _i2 = 0; _i2 < this._renderQueues.length; _i2++) {
      this._renderQueues[_i2].recordCommandBuffer(device, renderPass, cmdBuff);
    }

    this._planarQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    cmdBuff.endRenderPass();
  };

  return LightingStage;
}(RenderStage), _class3$2.initInfo = {
  name: 'LightingStage',
  priority: DeferredStagePriority.LIGHTING,
  tag: 0
}, _temp$a), (_descriptor$7 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_deferredMaterial", [_dec2$7, jsonAsset.serializable, _dec3$7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2$4 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "renderQueues", [_dec4$4, jsonAsset.serializable, _dec5$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$a)) || _class$a);

var _dec$b, _dec2$8, _dec3$8, _dec4$5, _dec5$3, _class$b, _class2$b, _descriptor$8, _descriptor2$5, _class3$3, _temp$b;
var colors$4 = [new jsonAsset.Color(0, 0, 0, 1)];
var PostprocessStage = (_dec$b = jsonAsset.ccclass('PostprocessStage'), _dec2$8 = jsonAsset.type(jsonAsset.Material), _dec3$8 = jsonAsset.displayOrder(), _dec4$5 = jsonAsset.type([RenderQueueDesc]), _dec5$3 = jsonAsset.displayOrder(), _dec$b(_class$b = (_class2$b = (_temp$b = _class3$3 = function (_RenderStage) {
  jsonAsset._inheritsLoose(PostprocessStage, _RenderStage);

  function PostprocessStage() {
    var _this;

    _this = _RenderStage.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_postProcessMaterial", _descriptor$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "renderQueues", _descriptor2$5, jsonAsset._assertThisInitialized(_this));

    _this._renderArea = new jsonAsset.Rect();
    _this._uiPhase = void 0;
    _this._uiPhase = new UIPhase();
    return _this;
  }

  var _proto = PostprocessStage.prototype;

  _proto.initialize = function initialize(info) {
    _RenderStage.prototype.initialize.call(this, info);

    return true;
  };

  _proto.activate = function activate(pipeline, flow) {
    _RenderStage.prototype.activate.call(this, pipeline, flow);

    this._uiPhase.activate(pipeline);

    if (this._postProcessMaterial) {
      pipeline.pipelineSceneData.deferredPostMaterial = this._postProcessMaterial;
    }
  };

  _proto.destroy = function destroy() {};

  _proto.render = function render(camera) {
    var pipeline = this._pipeline;
    var device = pipeline.device;
    var sceneData = pipeline.pipelineSceneData;
    var cmdBuff = pipeline.commandBuffers[0];
    pipeline.pipelineUBO.updateCameraUBO(camera);
    var vp = camera.viewport;
    this._renderArea.x = vp.x * camera.width;
    this._renderArea.y = vp.y * camera.height;
    this._renderArea.width = vp.width * camera.width * sceneData.shadingScale;
    this._renderArea.height = vp.height * camera.height * sceneData.shadingScale;
    var framebuffer = camera.window.framebuffer;
    var renderPass = framebuffer.colorTextures[0] ? framebuffer.renderPass : pipeline.getRenderPass(camera.clearFlag);

    if (camera.clearFlag & jsonAsset.ClearFlagBit.COLOR) {
      colors$4[0].x = camera.clearColor.x;
      colors$4[0].y = camera.clearColor.y;
      colors$4[0].z = camera.clearColor.z;
    }

    colors$4[0].w = camera.clearColor.w;
    cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors$4, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.GLOBAL, pipeline.descriptorSet);
    var builtinPostProcess = sceneData.deferredPostMaterial;
    var pass = builtinPostProcess.passes[0];
    var shader = pass.getShaderVariant();
    cmdBuff.bindDescriptorSet(jsonAsset.SetIndex.MATERIAL, pass.descriptorSet);
    var inputAssembler = camera.window.hasOffScreenAttachments ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
    var pso = null;

    if (pass != null && shader != null && inputAssembler != null) {
      pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
    }

    var renderObjects = pipeline.pipelineSceneData.renderObjects;

    if (pso != null && renderObjects.length > 0) {
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindInputAssembler(inputAssembler);
      cmdBuff.draw(inputAssembler);
    }

    this._uiPhase.render(camera, renderPass);

    cmdBuff.endRenderPass();
  };

  return PostprocessStage;
}(RenderStage), _class3$3.initInfo = {
  name: 'PostprocessStage',
  priority: DeferredStagePriority.POSTPROCESS,
  tag: 0
}, _temp$b), (_descriptor$8 = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "_postProcessMaterial", [_dec2$8, jsonAsset.serializable, _dec3$8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2$5 = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "renderQueues", [_dec4$5, jsonAsset.serializable, _dec5$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$b)) || _class$b);

var _dec$c, _class$c, _class2$c, _temp$c;
var MainFlow = (_dec$c = jsonAsset.ccclass('MainFlow'), _dec$c(_class$c = (_temp$c = _class2$c = function (_RenderFlow) {
  jsonAsset._inheritsLoose(MainFlow, _RenderFlow);

  function MainFlow() {
    return _RenderFlow.apply(this, arguments) || this;
  }

  var _proto = MainFlow.prototype;

  _proto.initialize = function initialize(info) {
    _RenderFlow.prototype.initialize.call(this, info);

    if (this._stages.length === 0) {
      var gbufferStage = new GbufferStage();
      gbufferStage.initialize(GbufferStage.initInfo);

      this._stages.push(gbufferStage);

      var lightingStage = new LightingStage();
      lightingStage.initialize(LightingStage.initInfo);

      this._stages.push(lightingStage);

      var postprocessStage = new PostprocessStage();
      postprocessStage.initialize(PostprocessStage.initInfo);

      this._stages.push(postprocessStage);
    }

    return true;
  };

  _proto.activate = function activate(pipeline) {
    _RenderFlow.prototype.activate.call(this, pipeline);
  };

  _proto.render = function render(camera) {
    _RenderFlow.prototype.render.call(this, camera);
  };

  _proto.destroy = function destroy() {
    _RenderFlow.prototype.destroy.call(this);
  };

  return MainFlow;
}(RenderFlow), _class2$c.initInfo = {
  name: jsonAsset.PIPELINE_FLOW_MAIN,
  priority: DeferredFlowPriority.MAIN,
  stages: []
}, _temp$c)) || _class$c);

var DeferredPipelineSceneData = function (_PipelineSceneData) {
  jsonAsset._inheritsLoose(DeferredPipelineSceneData, _PipelineSceneData);

  function DeferredPipelineSceneData() {
    return _PipelineSceneData.apply(this, arguments) || this;
  }

  var _proto = DeferredPipelineSceneData.prototype;

  _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
    this.updateDeferredPassInfo();
  };

  _proto.initPipelinePassInfo = function initPipelinePassInfo() {
    var deferredMat = new jsonAsset.Material();
    deferredMat._uuid = 'builtin-deferred-material';
    deferredMat.initialize({
      effectName: 'deferred-lighting'
    });

    for (var i = 0; i < deferredMat.passes.length; ++i) {
      deferredMat.passes[i].tryCompile();
    }

    this._deferredLightingMaterial = deferredMat;
    var postMat = new jsonAsset.Material();
    postMat._uuid = 'builtin-post-process-material';
    postMat.initialize({
      effectName: 'post-process'
    });

    for (var _i = 0; _i < postMat.passes.length; ++_i) {
      postMat.passes[_i].tryCompile();
    }

    this._deferredPostMaterial = postMat;
    this.updateDeferredPassInfo();
  };

  _proto.activate = function activate(device, pipeline) {
    _PipelineSceneData.prototype.activate.call(this, device, pipeline);

    this.initPipelinePassInfo();
    return true;
  };

  _proto.updateDeferredPassInfo = function updateDeferredPassInfo() {
    this.updateDeferredLightPass();
    this.updateDeferredPostPass();
  };

  _proto.updateDeferredLightPass = function updateDeferredLightPass() {
    if (!this._deferredLightingMaterial) return;
    var passLit = this._deferredLightingMaterial.passes[0];
    passLit.beginChangeStatesSilently();
    passLit.tryCompile();
    passLit.endChangeStatesSilently();
  };

  _proto.updateDeferredPostPass = function updateDeferredPostPass() {
    if (!this.deferredPostMaterial) return;
    var passPost = this.deferredPostMaterial.passes[0];
    passPost.beginChangeStatesSilently();
    passPost.tryCompile();
    passPost.endChangeStatesSilently();
  };

  jsonAsset._createClass(DeferredPipelineSceneData, [{
    key: "deferredLightingMaterial",
    get: function get() {
      return this._deferredLightingMaterial;
    },
    set: function set(mat) {
      if (this._deferredLightingMaterial === mat || !mat) return;
      this._deferredLightingMaterial = mat;
      this.updateDeferredPassInfo();
    }
  }, {
    key: "deferredPostMaterial",
    get: function get() {
      return this._deferredPostMaterial;
    },
    set: function set(mat) {
      if (this._deferredPostMaterial === mat || !mat) return;
      this._deferredPostMaterial = mat;
      this.updateDeferredPassInfo();
    }
  }]);

  return DeferredPipelineSceneData;
}(PipelineSceneData);

var _dec$d, _dec2$9, _dec3$9, _class$d, _class2$d, _descriptor$9, _temp$d;
var PIPELINE_TYPE$1 = 1;
var _samplerInfo$1 = [jsonAsset.Filter.POINT, jsonAsset.Filter.POINT, jsonAsset.Filter.NONE, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP, jsonAsset.Address.CLAMP];
var samplerHash = jsonAsset.genSamplerHash(_samplerInfo$1);

var InputAssemblerData = function InputAssemblerData() {
  this.quadIB = null;
  this.quadVB = null;
  this.quadIA = null;
};

var DeferredRenderData = function DeferredRenderData() {
  this.gbufferFrameBuffer = null;
  this.gbufferRenderTargets = [];
  this.lightingFrameBuffer = null;
  this.lightingRenderTargets = [];
  this.depthTex = null;
};
var DeferredPipeline = (_dec$d = jsonAsset.ccclass('DeferredPipeline'), _dec2$9 = jsonAsset.type([RenderTextureConfig]), _dec3$9 = jsonAsset.displayOrder(), _dec$d(_class$d = (_class2$d = (_temp$d = function (_RenderPipeline) {
  jsonAsset._inheritsLoose(DeferredPipeline, _RenderPipeline);

  function DeferredPipeline() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _RenderPipeline.call.apply(_RenderPipeline, [this].concat(args)) || this;
    _this._quadIB = null;
    _this._quadVBOnscreen = null;
    _this._quadVBOffscreen = null;
    _this._quadIAOnscreen = null;
    _this._quadIAOffscreen = null;
    _this._deferredRenderData = null;
    _this._gbufferRenderPass = null;
    _this._lightingRenderPass = null;
    _this._width = 0;
    _this._height = 0;
    _this._lastUsedRenderArea = new jsonAsset.Rect();

    jsonAsset._initializerDefineProperty(_this, "renderTextures", _descriptor$9, jsonAsset._assertThisInitialized(_this));

    _this._renderPasses = new Map();
    return _this;
  }

  var _proto = DeferredPipeline.prototype;

  _proto.initialize = function initialize(info) {
    _RenderPipeline.prototype.initialize.call(this, info);

    if (this._flows.length === 0) {
      var shadowFlow = new ShadowFlow();
      shadowFlow.initialize(ShadowFlow.initInfo);

      this._flows.push(shadowFlow);

      var mainFlow = new MainFlow();
      mainFlow.initialize(MainFlow.initInfo);

      this._flows.push(mainFlow);
    }

    return true;
  };

  _proto.activate = function activate() {

    this._macros = {
      CC_PIPELINE_TYPE: PIPELINE_TYPE$1
    };
    this._pipelineSceneData = new DeferredPipelineSceneData();

    if (!_RenderPipeline.prototype.activate.call(this)) {
      return false;
    }

    if (!this._activeRenderer()) {
      jsonAsset.errorID(2402);
      return false;
    }

    return true;
  };

  _proto.render = function render(cameras) {
    if (cameras.length === 0) {
      return;
    }

    this._commandBuffers[0].begin();

    this._pipelineUBO.updateGlobalUBO();

    for (var i = 0; i < cameras.length; i++) {
      var camera = cameras[i];

      if (camera.scene) {
        sceneCulling(this, camera);

        this._pipelineUBO.updateCameraUBO(camera);

        for (var j = 0; j < this._flows.length; j++) {
          this._flows[j].render(camera);
        }
      }
    }

    this._commandBuffers[0].end();

    this._device.queue.submit(this._commandBuffers);
  };

  _proto.getRenderPass = function getRenderPass(clearFlags) {
    var renderPass = this._renderPasses.get(clearFlags);

    if (renderPass) {
      return renderPass;
    }

    var device = this.device;
    var colorAttachment = new jsonAsset.ColorAttachment();
    var depthStencilAttachment = new jsonAsset.DepthStencilAttachment();
    colorAttachment.format = device.colorFormat;
    depthStencilAttachment.format = device.depthStencilFormat;
    depthStencilAttachment.stencilStoreOp = jsonAsset.StoreOp.DISCARD;
    depthStencilAttachment.depthStoreOp = jsonAsset.StoreOp.DISCARD;

    if (!(clearFlags & jsonAsset.ClearFlagBit.COLOR)) {
      if (clearFlags & SKYBOX_FLAG) {
        colorAttachment.loadOp = jsonAsset.LoadOp.DISCARD;
      } else {
        colorAttachment.loadOp = jsonAsset.LoadOp.LOAD;
        colorAttachment.beginAccesses = [jsonAsset.AccessType.PRESENT];
      }
    }

    if ((clearFlags & jsonAsset.ClearFlagBit.DEPTH_STENCIL) !== jsonAsset.ClearFlagBit.DEPTH_STENCIL) {
      if (!(clearFlags & jsonAsset.ClearFlagBit.DEPTH)) depthStencilAttachment.depthLoadOp = jsonAsset.LoadOp.LOAD;
      if (!(clearFlags & jsonAsset.ClearFlagBit.STENCIL)) depthStencilAttachment.stencilLoadOp = jsonAsset.LoadOp.LOAD;
      depthStencilAttachment.beginAccesses = [jsonAsset.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
    }

    var renderPassInfo = new jsonAsset.RenderPassInfo([colorAttachment], depthStencilAttachment);
    renderPass = device.createRenderPass(renderPassInfo);

    this._renderPasses.set(clearFlags, renderPass);

    return renderPass;
  };

  _proto.getDeferredRenderData = function getDeferredRenderData(camera) {
    if (!this._deferredRenderData) {
      this._generateDeferredRenderData();
    }

    return this._deferredRenderData;
  };

  _proto._activeRenderer = function _activeRenderer() {
    var device = this.device;

    this._commandBuffers.push(device.commandBuffer);

    var sampler = jsonAsset.samplerLib.getSampler(device, samplerHash);

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_SHADOWMAP_BINDING, sampler);

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_SHADOWMAP_BINDING, jsonAsset.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, sampler);

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, jsonAsset.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.update();

    var inputAssemblerDataOffscreen = new InputAssemblerData();
    inputAssemblerDataOffscreen = this.createQuadInputAssembler(jsonAsset.SurfaceTransform.IDENTITY);

    if (!inputAssemblerDataOffscreen.quadIB || !inputAssemblerDataOffscreen.quadVB || !inputAssemblerDataOffscreen.quadIA) {
      return false;
    }

    this._quadIB = inputAssemblerDataOffscreen.quadIB;
    this._quadVBOffscreen = inputAssemblerDataOffscreen.quadVB;
    this._quadIAOffscreen = inputAssemblerDataOffscreen.quadIA;
    var inputAssemblerDataOnscreen = this.createQuadInputAssembler(device.surfaceTransform);

    if (!inputAssemblerDataOnscreen.quadIB || !inputAssemblerDataOnscreen.quadVB || !inputAssemblerDataOnscreen.quadIA) {
      return false;
    }

    this._quadVBOnscreen = inputAssemblerDataOnscreen.quadVB;
    this._quadIAOnscreen = inputAssemblerDataOnscreen.quadIA;

    if (!this._gbufferRenderPass) {
      var colorAttachment0 = new jsonAsset.ColorAttachment();
      colorAttachment0.format = jsonAsset.Format.RGBA16F;
      colorAttachment0.loadOp = jsonAsset.LoadOp.CLEAR;
      colorAttachment0.storeOp = jsonAsset.StoreOp.STORE;
      var colorAttachment1 = new jsonAsset.ColorAttachment();
      colorAttachment1.format = jsonAsset.Format.RGBA16F;
      colorAttachment1.loadOp = jsonAsset.LoadOp.CLEAR;
      colorAttachment1.storeOp = jsonAsset.StoreOp.STORE;
      var colorAttachment2 = new jsonAsset.ColorAttachment();
      colorAttachment2.format = jsonAsset.Format.RGBA16F;
      colorAttachment2.loadOp = jsonAsset.LoadOp.CLEAR;
      colorAttachment2.storeOp = jsonAsset.StoreOp.STORE;
      var colorAttachment3 = new jsonAsset.ColorAttachment();
      colorAttachment3.format = jsonAsset.Format.RGBA16F;
      colorAttachment3.loadOp = jsonAsset.LoadOp.CLEAR;
      colorAttachment3.storeOp = jsonAsset.StoreOp.STORE;
      var depthStencilAttachment = new jsonAsset.DepthStencilAttachment();
      depthStencilAttachment.format = device.depthStencilFormat;
      depthStencilAttachment.depthLoadOp = jsonAsset.LoadOp.CLEAR;
      depthStencilAttachment.depthStoreOp = jsonAsset.StoreOp.STORE;
      depthStencilAttachment.stencilLoadOp = jsonAsset.LoadOp.CLEAR;
      depthStencilAttachment.stencilStoreOp = jsonAsset.StoreOp.STORE;
      var renderPassInfo = new jsonAsset.RenderPassInfo([colorAttachment0, colorAttachment1, colorAttachment2, colorAttachment3], depthStencilAttachment);
      this._gbufferRenderPass = device.createRenderPass(renderPassInfo);
    }

    if (!this._lightingRenderPass) {
      var colorAttachment = new jsonAsset.ColorAttachment();
      colorAttachment.format = jsonAsset.Format.RGBA8;
      colorAttachment.loadOp = jsonAsset.LoadOp.CLEAR;
      colorAttachment.storeOp = jsonAsset.StoreOp.STORE;
      colorAttachment.endAccesses = [jsonAsset.AccessType.COLOR_ATTACHMENT_WRITE];

      var _depthStencilAttachment = new jsonAsset.DepthStencilAttachment();

      _depthStencilAttachment.format = device.depthStencilFormat;
      _depthStencilAttachment.depthLoadOp = jsonAsset.LoadOp.LOAD;
      _depthStencilAttachment.depthStoreOp = jsonAsset.StoreOp.DISCARD;
      _depthStencilAttachment.stencilLoadOp = jsonAsset.LoadOp.LOAD;
      _depthStencilAttachment.stencilStoreOp = jsonAsset.StoreOp.DISCARD;
      _depthStencilAttachment.beginAccesses = [jsonAsset.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
      _depthStencilAttachment.endAccesses = [jsonAsset.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];

      var _renderPassInfo = new jsonAsset.RenderPassInfo([colorAttachment], _depthStencilAttachment);

      this._lightingRenderPass = device.createRenderPass(_renderPassInfo);
    }

    this._width = device.width;
    this._height = device.height;

    this._generateDeferredRenderData();

    return true;
  };

  _proto.destroyUBOs = function destroyUBOs() {
    if (this._descriptorSet) {
      this._descriptorSet.getBuffer(jsonAsset.UBOGlobal.BINDING).destroy();

      this._descriptorSet.getBuffer(jsonAsset.UBOShadow.BINDING).destroy();

      this._descriptorSet.getBuffer(jsonAsset.UBOCamera.BINDING).destroy();

      this._descriptorSet.getSampler(jsonAsset.UNIFORM_SHADOWMAP_BINDING).destroy();

      this._descriptorSet.getSampler(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();

      this._descriptorSet.getTexture(jsonAsset.UNIFORM_SHADOWMAP_BINDING).destroy();

      this._descriptorSet.getTexture(jsonAsset.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
    }
  };

  _proto.destroyDeferredData = function destroyDeferredData() {
    var deferredData = this._deferredRenderData;

    if (deferredData) {
      if (deferredData.gbufferFrameBuffer) deferredData.gbufferFrameBuffer.destroy();
      if (deferredData.lightingFrameBuffer) deferredData.lightingFrameBuffer.destroy();
      if (deferredData.depthTex) deferredData.depthTex.destroy();

      for (var i = 0; i < deferredData.gbufferRenderTargets.length; i++) {
        deferredData.gbufferRenderTargets[i].destroy();
      }

      deferredData.gbufferRenderTargets.length = 0;

      for (var _i = 0; _i < deferredData.lightingRenderTargets.length; _i++) {
        deferredData.lightingRenderTargets[_i].destroy();
      }

      deferredData.lightingRenderTargets.length = 0;
    }

    this._deferredRenderData = null;
  };

  _proto.destroy = function destroy() {
    this.destroyUBOs();
    this.destroyQuadInputAssembler();
    this.destroyDeferredData();

    var rpIter = this._renderPasses.values();

    var rpRes = rpIter.next();

    while (!rpRes.done) {
      rpRes.value.destroy();
      rpRes = rpIter.next();
    }

    this._commandBuffers.length = 0;
    return _RenderPipeline.prototype.destroy.call(this);
  };

  _proto.resize = function resize(width, height) {
    if (this._width === width && this._height === height) {
      return;
    }

    this._width = width;
    this._height = height;
    this.destroyDeferredData();

    this._generateDeferredRenderData();
  };

  _proto.createQuadInputAssembler = function createQuadInputAssembler(surfaceTransform) {
    var inputAssemblerData = new InputAssemblerData();
    var vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
    var vbSize = vbStride * 4;

    var quadVB = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, vbSize, vbStride));

    if (!quadVB) {
      return inputAssemblerData;
    }

    var ibStride = Uint8Array.BYTES_PER_ELEMENT;
    var ibSize = ibStride * 6;

    var quadIB = this._device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, ibSize, ibStride));

    if (!quadIB) {
      return inputAssemblerData;
    }

    var indices = new Uint8Array(6);
    indices[0] = 0;
    indices[1] = 1;
    indices[2] = 2;
    indices[3] = 1;
    indices[4] = 3;
    indices[5] = 2;
    quadIB.update(indices);
    var attributes = new Array(2);
    attributes[0] = new jsonAsset.Attribute('a_position', jsonAsset.Format.RG32F);
    attributes[1] = new jsonAsset.Attribute('a_texCoord', jsonAsset.Format.RG32F);

    var quadIA = this._device.createInputAssembler(new jsonAsset.InputAssemblerInfo(attributes, [quadVB], quadIB));

    inputAssemblerData.quadIB = quadIB;
    inputAssemblerData.quadVB = quadVB;
    inputAssemblerData.quadIA = quadIA;
    return inputAssemblerData;
  };

  _proto.updateQuadVertexData = function updateQuadVertexData(renderArea) {
    if (this._lastUsedRenderArea === renderArea) {
      return;
    }

    this._lastUsedRenderArea = renderArea;
    var offData = this.genQuadVertexData(jsonAsset.SurfaceTransform.IDENTITY, renderArea);

    this._quadVBOffscreen.update(offData);

    var onData = this.genQuadVertexData(this.device.surfaceTransform, renderArea);

    this._quadVBOnscreen.update(onData);
  };

  _proto.genQuadVertexData = function genQuadVertexData(surfaceTransform, renderArea) {
    var vbData = new Float32Array(4 * 4);
    var minX = renderArea.x / this.device.width;
    var maxX = (renderArea.x + renderArea.width) / this.device.width;
    var minY = renderArea.y / this.device.height;
    var maxY = (renderArea.y + renderArea.height) / this.device.height;

    if (this.device.capabilities.screenSpaceSignY > 0) {
      var temp = maxY;
      maxY = minY;
      minY = temp;
    }

    var n = 0;

    switch (surfaceTransform) {
      case jsonAsset.SurfaceTransform.IDENTITY:
        n = 0;
        vbData[n++] = -1.0;
        vbData[n++] = -1.0;
        vbData[n++] = minX;
        vbData[n++] = maxY;
        vbData[n++] = 1.0;
        vbData[n++] = -1.0;
        vbData[n++] = maxX;
        vbData[n++] = maxY;
        vbData[n++] = -1.0;
        vbData[n++] = 1.0;
        vbData[n++] = minX;
        vbData[n++] = minY;
        vbData[n++] = 1.0;
        vbData[n++] = 1.0;
        vbData[n++] = maxX;
        vbData[n++] = minY;
        break;

      case jsonAsset.SurfaceTransform.ROTATE_90:
        n = 0;
        vbData[n++] = -1.0;
        vbData[n++] = -1.0;
        vbData[n++] = maxX;
        vbData[n++] = maxY;
        vbData[n++] = 1.0;
        vbData[n++] = -1.0;
        vbData[n++] = maxX;
        vbData[n++] = minY;
        vbData[n++] = -1.0;
        vbData[n++] = 1.0;
        vbData[n++] = minX;
        vbData[n++] = maxY;
        vbData[n++] = 1.0;
        vbData[n++] = 1.0;
        vbData[n++] = minX;
        vbData[n++] = minY;
        break;

      case jsonAsset.SurfaceTransform.ROTATE_180:
        n = 0;
        vbData[n++] = -1.0;
        vbData[n++] = -1.0;
        vbData[n++] = minX;
        vbData[n++] = minY;
        vbData[n++] = 1.0;
        vbData[n++] = -1.0;
        vbData[n++] = maxX;
        vbData[n++] = minY;
        vbData[n++] = -1.0;
        vbData[n++] = 1.0;
        vbData[n++] = minX;
        vbData[n++] = maxY;
        vbData[n++] = 1.0;
        vbData[n++] = 1.0;
        vbData[n++] = maxX;
        vbData[n++] = maxY;
        break;

      case jsonAsset.SurfaceTransform.ROTATE_270:
        n = 0;
        vbData[n++] = -1.0;
        vbData[n++] = -1.0;
        vbData[n++] = minX;
        vbData[n++] = minY;
        vbData[n++] = 1.0;
        vbData[n++] = -1.0;
        vbData[n++] = minX;
        vbData[n++] = maxY;
        vbData[n++] = -1.0;
        vbData[n++] = 1.0;
        vbData[n++] = maxX;
        vbData[n++] = minY;
        vbData[n++] = 1.0;
        vbData[n++] = 1.0;
        vbData[n++] = maxX;
        vbData[n++] = maxY;
        break;
    }

    return vbData;
  };

  _proto.destroyQuadInputAssembler = function destroyQuadInputAssembler() {
    if (this._quadIB) {
      this._quadIB.destroy();

      this._quadIB = null;
    }

    if (this._quadVBOnscreen) {
      this._quadVBOnscreen.destroy();

      this._quadVBOnscreen = null;
    }

    if (this._quadVBOffscreen) {
      this._quadVBOffscreen.destroy();

      this._quadVBOffscreen = null;
    }

    if (this._quadIAOnscreen) {
      this._quadIAOnscreen.destroy();

      this._quadIAOnscreen = null;
    }

    if (this._quadIAOffscreen) {
      this._quadIAOffscreen.destroy();

      this._quadIAOffscreen = null;
    }
  };

  _proto._generateDeferredRenderData = function _generateDeferredRenderData() {
    var device = this.device;
    var data = this._deferredRenderData = new DeferredRenderData();
    data.gbufferRenderTargets.push(device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.COLOR_ATTACHMENT | jsonAsset.TextureUsageBit.SAMPLED, jsonAsset.Format.RGBA16F, this._width, this._height)));
    data.gbufferRenderTargets.push(device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.COLOR_ATTACHMENT | jsonAsset.TextureUsageBit.SAMPLED, jsonAsset.Format.RGBA16F, this._width, this._height)));
    data.gbufferRenderTargets.push(device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.COLOR_ATTACHMENT | jsonAsset.TextureUsageBit.SAMPLED, jsonAsset.Format.RGBA16F, this._width, this._height)));
    data.gbufferRenderTargets.push(device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.COLOR_ATTACHMENT | jsonAsset.TextureUsageBit.SAMPLED, jsonAsset.Format.RGBA16F, this._width, this._height)));
    data.depthTex = device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, device.depthStencilFormat, this._width, this._height));
    data.gbufferFrameBuffer = device.createFramebuffer(new jsonAsset.FramebufferInfo(this._gbufferRenderPass, data.gbufferRenderTargets, data.depthTex));
    data.lightingRenderTargets.push(device.createTexture(new jsonAsset.TextureInfo(jsonAsset.TextureType.TEX2D, jsonAsset.TextureUsageBit.COLOR_ATTACHMENT | jsonAsset.TextureUsageBit.SAMPLED, jsonAsset.Format.RGBA8, this._width, this._height)));
    data.lightingFrameBuffer = device.createFramebuffer(new jsonAsset.FramebufferInfo(this._lightingRenderPass, data.lightingRenderTargets, data.depthTex));

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_GBUFFER_ALBEDOMAP_BINDING, data.gbufferFrameBuffer.colorTextures[0]);

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_GBUFFER_POSITIONMAP_BINDING, data.gbufferFrameBuffer.colorTextures[1]);

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_GBUFFER_NORMALMAP_BINDING, data.gbufferFrameBuffer.colorTextures[2]);

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, data.gbufferFrameBuffer.colorTextures[3]);

    this._descriptorSet.bindTexture(jsonAsset.UNIFORM_LIGHTING_RESULTMAP_BINDING, data.lightingFrameBuffer.colorTextures[0]);

    var sampler = jsonAsset.samplerLib.getSampler(device, samplerHash);

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_GBUFFER_ALBEDOMAP_BINDING, sampler);

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_GBUFFER_POSITIONMAP_BINDING, sampler);

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_GBUFFER_NORMALMAP_BINDING, sampler);

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, sampler);

    this._descriptorSet.bindSampler(jsonAsset.UNIFORM_LIGHTING_RESULTMAP_BINDING, sampler);
  };

  jsonAsset._createClass(DeferredPipeline, [{
    key: "quadIAOnscreen",
    get: function get() {
      return this._quadIAOnscreen;
    }
  }, {
    key: "quadIAOffscreen",
    get: function get() {
      return this._quadIAOffscreen;
    }
  }]);

  return DeferredPipeline;
}(RenderPipeline), _temp$d), (_descriptor$9 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "renderTextures", [_dec2$9, jsonAsset.serializable, _dec3$9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class2$d)) || _class$d);

var AccelerometerInputSource = function () {
  function AccelerometerInputSource() {
    this.support = void 0;
    this._intervalInMileseconds = 200;
    this._accelTimer = 0;
    this._eventTarget = new jsonAsset.EventTarget();
    this._deviceEventName = void 0;
    this._globalEventClass = void 0;
    this._didAccelerateFunc = void 0;
    this.support = window.DeviceMotionEvent !== undefined || window.DeviceOrientationEvent !== undefined;
    this._globalEventClass = window.DeviceMotionEvent || window.DeviceOrientationEvent;

    if (jsonAsset.systemInfo.browserType === jsonAsset.BrowserType.MOBILE_QQ) {
      this._globalEventClass = window.DeviceOrientationEvent;
    }

    this._deviceEventName = this._globalEventClass === window.DeviceMotionEvent ? 'devicemotion' : 'deviceorientation';
    this._didAccelerateFunc = this._didAccelerate.bind(this);
  }

  var _proto = AccelerometerInputSource.prototype;

  _proto._registerEvent = function _registerEvent() {
    this._accelTimer = performance.now();
    window.addEventListener(this._deviceEventName, this._didAccelerateFunc, false);
  };

  _proto._unregisterEvent = function _unregisterEvent() {
    this._accelTimer = 0;
    window.removeEventListener(this._deviceEventName, this._didAccelerateFunc, false);
  };

  _proto._didAccelerate = function _didAccelerate(event) {
    var now = performance.now();

    if (now - this._accelTimer < this._intervalInMileseconds) {
      return;
    }

    this._accelTimer = now;
    var x = 0;
    var y = 0;
    var z = 0;

    if (this._globalEventClass === window.DeviceMotionEvent) {
      var deviceMotionEvent = event;
      var eventAcceleration = deviceMotionEvent.accelerationIncludingGravity;
      x = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.x) || 0) * 0.1;
      y = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.y) || 0) * 0.1;
      z = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.z) || 0) * 0.1;
    } else {
      var deviceOrientationEvent = event;
      x = (deviceOrientationEvent.gamma || 0) / 90 * 0.981;
      y = -((deviceOrientationEvent.beta || 0) / 90) * 0.981;
      z = (deviceOrientationEvent.alpha || 0) / 90 * 0.981;
    }

    if (jsonAsset.legacyCC.view._isRotated) {
      var tmp = x;
      x = -y;
      y = tmp;
    }
    var LANDSCAPE_LEFT = -90;
    var PORTRAIT_UPSIDE_DOWN = 180;
    var LANDSCAPE_RIGHT = 90;
    var tmpX = x;

    if (window.orientation === LANDSCAPE_RIGHT) {
      x = -y;
      y = tmpX;
    } else if (window.orientation === LANDSCAPE_LEFT) {
      x = y;
      y = -tmpX;
    } else if (window.orientation === PORTRAIT_UPSIDE_DOWN) {
      x = -x;
      y = -y;
    }

    if (jsonAsset.systemInfo.os === jsonAsset.OS.ANDROID && jsonAsset.systemInfo.browserType !== jsonAsset.BrowserType.MOBILE_QQ) {
      x = -x;
      y = -y;
    }

    var accelerometer = {
      type: jsonAsset.SystemEventType.DEVICEMOTION,
      x: x,
      y: y,
      z: z,
      timestamp: performance.now()
    };

    this._eventTarget.emit(jsonAsset.SystemEventType.DEVICEMOTION, accelerometer);
  };

  _proto.start = function start() {
    this._registerEvent();
  };

  _proto.stop = function stop() {
    this._unregisterEvent();
  };

  _proto.setInterval = function setInterval(intervalInMileseconds) {
    this._intervalInMileseconds = intervalInMileseconds;
  };

  _proto.onChange = function onChange(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.DEVICEMOTION, cb);
  };

  return AccelerometerInputSource;
}();

var InputBox = function () {
  function InputBox() {
    this.support = void 0;
    this.support = true;
  }

  var _proto = InputBox.prototype;

  _proto.show = function show() {
    throw new Error('Method not implemented.');
  };

  _proto.hide = function hide() {
    throw new Error('Method not implemented.');
  };

  _proto.onChange = function onChange() {
    throw new Error('Method not implemented.');
  };

  _proto.onComplete = function onComplete() {
    throw new Error('Method not implemented.');
  };

  _proto.offChange = function offChange() {
    throw new Error('Method not implemented.');
  };

  _proto.offComplete = function offComplete() {
    throw new Error('Method not implemented.');
  };

  return InputBox;
}();

(function (KeyCode) {
  KeyCode[KeyCode["NONE"] = 0] = "NONE";
  KeyCode[KeyCode["BACKSPACE"] = 8] = "BACKSPACE";
  KeyCode[KeyCode["TAB"] = 9] = "TAB";
  KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
  KeyCode[KeyCode["SHIFT_LEFT"] = 16] = "SHIFT_LEFT";
  KeyCode[KeyCode["CTRL_LEFT"] = 17] = "CTRL_LEFT";
  KeyCode[KeyCode["ALT_LEFT"] = 18] = "ALT_LEFT";
  KeyCode[KeyCode["PAUSE"] = 19] = "PAUSE";
  KeyCode[KeyCode["CAPS_LOCK"] = 20] = "CAPS_LOCK";
  KeyCode[KeyCode["ESCAPE"] = 27] = "ESCAPE";
  KeyCode[KeyCode["SPACE"] = 32] = "SPACE";
  KeyCode[KeyCode["PAGE_UP"] = 33] = "PAGE_UP";
  KeyCode[KeyCode["PAGE_DOWN"] = 34] = "PAGE_DOWN";
  KeyCode[KeyCode["END"] = 35] = "END";
  KeyCode[KeyCode["HOME"] = 36] = "HOME";
  KeyCode[KeyCode["ARROW_LEFT"] = 37] = "ARROW_LEFT";
  KeyCode[KeyCode["ARROW_UP"] = 38] = "ARROW_UP";
  KeyCode[KeyCode["ARROW_RIGHT"] = 39] = "ARROW_RIGHT";
  KeyCode[KeyCode["ARROW_DOWN"] = 40] = "ARROW_DOWN";
  KeyCode[KeyCode["INSERT"] = 45] = "INSERT";
  KeyCode[KeyCode["DELETE"] = 46] = "DELETE";
  KeyCode[KeyCode["DIGIT_0"] = 48] = "DIGIT_0";
  KeyCode[KeyCode["DIGIT_1"] = 49] = "DIGIT_1";
  KeyCode[KeyCode["DIGIT_2"] = 50] = "DIGIT_2";
  KeyCode[KeyCode["DIGIT_3"] = 51] = "DIGIT_3";
  KeyCode[KeyCode["DIGIT_4"] = 52] = "DIGIT_4";
  KeyCode[KeyCode["DIGIT_5"] = 53] = "DIGIT_5";
  KeyCode[KeyCode["DIGIT_6"] = 54] = "DIGIT_6";
  KeyCode[KeyCode["DIGIT_7"] = 55] = "DIGIT_7";
  KeyCode[KeyCode["DIGIT_8"] = 56] = "DIGIT_8";
  KeyCode[KeyCode["DIGIT_9"] = 57] = "DIGIT_9";
  KeyCode[KeyCode["KEY_A"] = 65] = "KEY_A";
  KeyCode[KeyCode["KEY_B"] = 66] = "KEY_B";
  KeyCode[KeyCode["KEY_C"] = 67] = "KEY_C";
  KeyCode[KeyCode["KEY_D"] = 68] = "KEY_D";
  KeyCode[KeyCode["KEY_E"] = 69] = "KEY_E";
  KeyCode[KeyCode["KEY_F"] = 70] = "KEY_F";
  KeyCode[KeyCode["KEY_G"] = 71] = "KEY_G";
  KeyCode[KeyCode["KEY_H"] = 72] = "KEY_H";
  KeyCode[KeyCode["KEY_I"] = 73] = "KEY_I";
  KeyCode[KeyCode["KEY_J"] = 74] = "KEY_J";
  KeyCode[KeyCode["KEY_K"] = 75] = "KEY_K";
  KeyCode[KeyCode["KEY_L"] = 76] = "KEY_L";
  KeyCode[KeyCode["KEY_M"] = 77] = "KEY_M";
  KeyCode[KeyCode["KEY_N"] = 78] = "KEY_N";
  KeyCode[KeyCode["KEY_O"] = 79] = "KEY_O";
  KeyCode[KeyCode["KEY_P"] = 80] = "KEY_P";
  KeyCode[KeyCode["KEY_Q"] = 81] = "KEY_Q";
  KeyCode[KeyCode["KEY_R"] = 82] = "KEY_R";
  KeyCode[KeyCode["KEY_S"] = 83] = "KEY_S";
  KeyCode[KeyCode["KEY_T"] = 84] = "KEY_T";
  KeyCode[KeyCode["KEY_U"] = 85] = "KEY_U";
  KeyCode[KeyCode["KEY_V"] = 86] = "KEY_V";
  KeyCode[KeyCode["KEY_W"] = 87] = "KEY_W";
  KeyCode[KeyCode["KEY_X"] = 88] = "KEY_X";
  KeyCode[KeyCode["KEY_Y"] = 89] = "KEY_Y";
  KeyCode[KeyCode["KEY_Z"] = 90] = "KEY_Z";
  KeyCode[KeyCode["NUM_0"] = 96] = "NUM_0";
  KeyCode[KeyCode["NUM_1"] = 97] = "NUM_1";
  KeyCode[KeyCode["NUM_2"] = 98] = "NUM_2";
  KeyCode[KeyCode["NUM_3"] = 99] = "NUM_3";
  KeyCode[KeyCode["NUM_4"] = 100] = "NUM_4";
  KeyCode[KeyCode["NUM_5"] = 101] = "NUM_5";
  KeyCode[KeyCode["NUM_6"] = 102] = "NUM_6";
  KeyCode[KeyCode["NUM_7"] = 103] = "NUM_7";
  KeyCode[KeyCode["NUM_8"] = 104] = "NUM_8";
  KeyCode[KeyCode["NUM_9"] = 105] = "NUM_9";
  KeyCode[KeyCode["NUM_MULTIPLY"] = 106] = "NUM_MULTIPLY";
  KeyCode[KeyCode["NUM_PLUS"] = 107] = "NUM_PLUS";
  KeyCode[KeyCode["NUM_SUBTRACT"] = 109] = "NUM_SUBTRACT";
  KeyCode[KeyCode["NUM_DECIMAL"] = 110] = "NUM_DECIMAL";
  KeyCode[KeyCode["NUM_DIVIDE"] = 111] = "NUM_DIVIDE";
  KeyCode[KeyCode["F1"] = 112] = "F1";
  KeyCode[KeyCode["F2"] = 113] = "F2";
  KeyCode[KeyCode["F3"] = 114] = "F3";
  KeyCode[KeyCode["F4"] = 115] = "F4";
  KeyCode[KeyCode["F5"] = 116] = "F5";
  KeyCode[KeyCode["F6"] = 117] = "F6";
  KeyCode[KeyCode["F7"] = 118] = "F7";
  KeyCode[KeyCode["F8"] = 119] = "F8";
  KeyCode[KeyCode["F9"] = 120] = "F9";
  KeyCode[KeyCode["F10"] = 121] = "F10";
  KeyCode[KeyCode["F11"] = 122] = "F11";
  KeyCode[KeyCode["F12"] = 123] = "F12";
  KeyCode[KeyCode["NUM_LOCK"] = 144] = "NUM_LOCK";
  KeyCode[KeyCode["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
  KeyCode[KeyCode["SEMICOLON"] = 186] = "SEMICOLON";
  KeyCode[KeyCode["EQUAL"] = 187] = "EQUAL";
  KeyCode[KeyCode["COMMA"] = 188] = "COMMA";
  KeyCode[KeyCode["DASH"] = 189] = "DASH";
  KeyCode[KeyCode["PERIOD"] = 190] = "PERIOD";
  KeyCode[KeyCode["SLASH"] = 191] = "SLASH";
  KeyCode[KeyCode["BACK_QUOTE"] = 192] = "BACK_QUOTE";
  KeyCode[KeyCode["BRACKET_LEFT"] = 219] = "BRACKET_LEFT";
  KeyCode[KeyCode["BACKSLASH"] = 220] = "BACKSLASH";
  KeyCode[KeyCode["BRACKET_RIGHT"] = 221] = "BRACKET_RIGHT";
  KeyCode[KeyCode["QUOTE"] = 222] = "QUOTE";
  KeyCode[KeyCode["SHIFT_RIGHT"] = 2000] = "SHIFT_RIGHT";
  KeyCode[KeyCode["CTRL_RIGHT"] = 2001] = "CTRL_RIGHT";
  KeyCode[KeyCode["ALT_RIGHT"] = 2002] = "ALT_RIGHT";
  KeyCode[KeyCode["NUM_ENTER"] = 2003] = "NUM_ENTER";
})(exports.KeyCode || (exports.KeyCode = {}));

var code2KeyCode = {
  Backspace: exports.KeyCode.BACKSPACE,
  Tab: exports.KeyCode.TAB,
  Enter: exports.KeyCode.ENTER,
  ShiftLeft: exports.KeyCode.SHIFT_LEFT,
  ControlLeft: exports.KeyCode.CTRL_LEFT,
  AltLeft: exports.KeyCode.ALT_LEFT,
  ShiftRight: exports.KeyCode.SHIFT_RIGHT,
  ControlRight: exports.KeyCode.CTRL_RIGHT,
  AltRight: exports.KeyCode.ALT_RIGHT,
  Pause: exports.KeyCode.PAUSE,
  CapsLock: exports.KeyCode.CAPS_LOCK,
  Escape: exports.KeyCode.ESCAPE,
  Space: exports.KeyCode.SPACE,
  PageUp: exports.KeyCode.PAGE_UP,
  PageDown: exports.KeyCode.PAGE_DOWN,
  End: exports.KeyCode.END,
  Home: exports.KeyCode.HOME,
  ArrowLeft: exports.KeyCode.ARROW_LEFT,
  ArrowUp: exports.KeyCode.ARROW_UP,
  ArrowRight: exports.KeyCode.ARROW_RIGHT,
  ArrowDown: exports.KeyCode.ARROW_DOWN,
  Insert: exports.KeyCode.INSERT,
  Delete: exports.KeyCode.DELETE,
  Digit0: exports.KeyCode.DIGIT_0,
  Digit1: exports.KeyCode.DIGIT_1,
  Digit2: exports.KeyCode.DIGIT_2,
  Digit3: exports.KeyCode.DIGIT_3,
  Digit4: exports.KeyCode.DIGIT_4,
  Digit5: exports.KeyCode.DIGIT_5,
  Digit6: exports.KeyCode.DIGIT_6,
  Digit7: exports.KeyCode.DIGIT_7,
  Digit8: exports.KeyCode.DIGIT_8,
  Digit9: exports.KeyCode.DIGIT_9,
  KeyA: exports.KeyCode.KEY_A,
  KeyB: exports.KeyCode.KEY_B,
  KeyC: exports.KeyCode.KEY_C,
  KeyD: exports.KeyCode.KEY_D,
  KeyE: exports.KeyCode.KEY_E,
  KeyF: exports.KeyCode.KEY_F,
  KeyG: exports.KeyCode.KEY_G,
  KeyH: exports.KeyCode.KEY_H,
  KeyI: exports.KeyCode.KEY_I,
  KeyJ: exports.KeyCode.KEY_J,
  KeyK: exports.KeyCode.KEY_K,
  KeyL: exports.KeyCode.KEY_L,
  KeyM: exports.KeyCode.KEY_M,
  KeyN: exports.KeyCode.KEY_N,
  KeyO: exports.KeyCode.KEY_O,
  KeyP: exports.KeyCode.KEY_P,
  KeyQ: exports.KeyCode.KEY_Q,
  KeyR: exports.KeyCode.KEY_R,
  KeyS: exports.KeyCode.KEY_S,
  KeyT: exports.KeyCode.KEY_T,
  KeyU: exports.KeyCode.KEY_U,
  KeyV: exports.KeyCode.KEY_V,
  KeyW: exports.KeyCode.KEY_W,
  KeyX: exports.KeyCode.KEY_X,
  KeyY: exports.KeyCode.KEY_Y,
  KeyZ: exports.KeyCode.KEY_Z,
  Numpad0: exports.KeyCode.NUM_0,
  Numpad1: exports.KeyCode.NUM_1,
  Numpad2: exports.KeyCode.NUM_2,
  Numpad3: exports.KeyCode.NUM_3,
  Numpad4: exports.KeyCode.NUM_4,
  Numpad5: exports.KeyCode.NUM_5,
  Numpad6: exports.KeyCode.NUM_6,
  Numpad7: exports.KeyCode.NUM_7,
  Numpad8: exports.KeyCode.NUM_8,
  Numpad9: exports.KeyCode.NUM_9,
  NumpadMultiply: exports.KeyCode.NUM_MULTIPLY,
  NumpadAdd: exports.KeyCode.NUM_PLUS,
  NumpadSubtract: exports.KeyCode.NUM_SUBTRACT,
  NumpadDecimal: exports.KeyCode.NUM_DECIMAL,
  NumpadDivide: exports.KeyCode.NUM_DIVIDE,
  NumpadEnter: exports.KeyCode.NUM_ENTER,
  F1: exports.KeyCode.F1,
  F2: exports.KeyCode.F2,
  F3: exports.KeyCode.F3,
  F4: exports.KeyCode.F4,
  F5: exports.KeyCode.F5,
  F6: exports.KeyCode.F6,
  F7: exports.KeyCode.F7,
  F8: exports.KeyCode.F8,
  F9: exports.KeyCode.F9,
  F10: exports.KeyCode.F10,
  F11: exports.KeyCode.F11,
  F12: exports.KeyCode.F12,
  NumLock: exports.KeyCode.NUM_LOCK,
  ScrollLock: exports.KeyCode.SCROLL_LOCK,
  Semicolon: exports.KeyCode.SEMICOLON,
  Equal: exports.KeyCode.EQUAL,
  Comma: exports.KeyCode.COMMA,
  Minus: exports.KeyCode.DASH,
  Period: exports.KeyCode.PERIOD,
  Slash: exports.KeyCode.SLASH,
  Backquote: exports.KeyCode.BACK_QUOTE,
  BracketLeft: exports.KeyCode.BRACKET_LEFT,
  Backslash: exports.KeyCode.BACKSLASH,
  BracketRight: exports.KeyCode.BRACKET_RIGHT,
  Quote: exports.KeyCode.QUOTE
};

function getKeyCode(code) {
  return code2KeyCode[code] || exports.KeyCode.NONE;
}

var KeyboardInputSource = function () {
  function KeyboardInputSource() {
    this.support = void 0;
    this._eventTarget = new jsonAsset.EventTarget();
    this.support = document.documentElement.onkeyup !== undefined;

    this._registerEvent();
  }

  var _proto = KeyboardInputSource.prototype;

  _proto._registerEvent = function _registerEvent() {
    var _this = this;

    var canvas = document.getElementById('GameCanvas');
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keydown', function (event) {
      event.stopPropagation();
      event.preventDefault();

      var keyPressingInputEvent = _this._getInputEvent(event, jsonAsset.SystemEventType.KEY_DOWN);

      _this._eventTarget.emit(jsonAsset.SystemEventType.KEY_DOWN, keyPressingInputEvent);
    });
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keyup', function (event) {
      var inputEvent = _this._getInputEvent(event, jsonAsset.SystemEventType.KEY_UP);

      event.stopPropagation();
      event.preventDefault();

      _this._eventTarget.emit(jsonAsset.SystemEventType.KEY_UP, inputEvent);
    });
  };

  _proto._getInputEvent = function _getInputEvent(event, eventType) {
    var keyCode = getKeyCode(event.code);
    var inputEvent = {
      type: eventType,
      code: keyCode,
      timestamp: performance.now()
    };
    return inputEvent;
  };

  _proto.onDown = function onDown(cb) {
    this._eventTarget.on('keypress', cb);
  };

  _proto.onPressing = function onPressing(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.KEY_DOWN, cb);
  };

  _proto.onUp = function onUp(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.KEY_UP, cb);
  };

  return KeyboardInputSource;
}();

var MouseInputSource = function () {
  function MouseInputSource() {
    this.support = void 0;
    this._canvas = void 0;
    this._eventTarget = new jsonAsset.EventTarget();
    this._pointLocked = false;
    this._isPressed = false;
    this._preMousePos = new jsonAsset.Vec2();
    this.support =  document.documentElement.onmouseup !== undefined;

    if (this.support) {
      this._canvas = document.getElementById('GameCanvas');

      if (!this._canvas && !jsonAsset.TEST) {
        console.warn('failed to access canvas');
      }

      this._registerEvent();
    }
  }

  var _proto = MouseInputSource.prototype;

  _proto._getCanvasRect = function _getCanvasRect() {
    var canvas = this._canvas;
    var box = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();

    if (box) {
      return new jsonAsset.Rect$1(box.x, box.y, box.width, box.height);
    }

    return new jsonAsset.Rect$1(0, 0, 0, 0);
  };

  _proto._getLocation = function _getLocation(event) {
    return new jsonAsset.Vec2(event.clientX, event.clientY);
  };

  _proto._registerEvent = function _registerEvent() {
    var _this = this,
        _this$_canvas,
        _this$_canvas2,
        _this$_canvas3,
        _this$_canvas4;

    window.addEventListener('mousedown', function () {
      _this._isPressed = true;
    });
    (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('mousedown', this._createCallback(jsonAsset.SystemEventType.MOUSE_DOWN));
    (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('mousemove', this._createCallback(jsonAsset.SystemEventType.MOUSE_MOVE));
    window.addEventListener('mouseup', this._createCallback(jsonAsset.SystemEventType.MOUSE_UP));
    (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('mouseup', this._createCallback(jsonAsset.SystemEventType.MOUSE_UP));
    (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('wheel', function (event) {
      var canvasRect = _this._getCanvasRect();

      var location = _this._getLocation(event);

      var wheelSensitivityFactor = 5;
      var inputEvent = {
        type: jsonAsset.SystemEventType.MOUSE_WHEEL,
        x: location.x - canvasRect.x,
        y: canvasRect.y + canvasRect.height - location.y,
        button: event.button,
        deltaX: event.deltaX * wheelSensitivityFactor,
        deltaY: -event.deltaY * wheelSensitivityFactor,
        timestamp: performance.now(),
        movementX: event.movementX,
        movementY: event.movementY
      };
      event.stopPropagation();
      event.preventDefault();

      _this._eventTarget.emit(jsonAsset.SystemEventType.MOUSE_WHEEL, inputEvent);
    });

    this._registerPointerLockEvent();
  };

  _proto._registerPointerLockEvent = function _registerPointerLockEvent() {
    var _this2 = this;

    var lockChangeAlert = function lockChangeAlert() {
      var canvas = _this2._canvas;

      if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
        _this2._pointLocked = true;
      } else {
        _this2._pointLocked = false;
      }
    };

    if ('onpointerlockchange' in document) {
      document.addEventListener('pointerlockchange', lockChangeAlert, false);
    } else if ('onmozpointerlockchange' in document) {
      document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    }
  };

  _proto._createCallback = function _createCallback(eventType) {
    var _this3 = this;

    return function (event) {
      var _this3$_canvas;

      var canvasRect = _this3._getCanvasRect();

      var location = _this3._getLocation(event);

      var button = event.button;

      switch (event.type) {
        case 'mousedown':
          (_this3$_canvas = _this3._canvas) === null || _this3$_canvas === void 0 ? void 0 : _this3$_canvas.focus();
          _this3._isPressed = true;
          break;

        case 'mouseup':
          _this3._isPressed = false;
          break;

        case 'mousemove':
          if (!_this3._isPressed) {
            button = -1;
          }

          break;
      }

      var inputEvent = {
        type: eventType,
        x: _this3._pointLocked ? _this3._preMousePos.x + event.movementX : location.x - canvasRect.x,
        y: _this3._pointLocked ? _this3._preMousePos.y - event.movementY : canvasRect.y + canvasRect.height - location.y,
        button: button,
        timestamp: performance.now(),
        movementX: event.movementX,
        movementY: event.movementY
      };

      _this3._preMousePos.set(inputEvent.x, inputEvent.y);

      event.stopPropagation();

      if (event.target === _this3._canvas) {
        event.preventDefault();
      }

      _this3._eventTarget.emit(eventType, inputEvent);
    };
  };

  _proto.onDown = function onDown(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.MOUSE_DOWN, cb);
  };

  _proto.onMove = function onMove(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.MOUSE_MOVE, cb);
  };

  _proto.onUp = function onUp(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.MOUSE_UP, cb);
  };

  _proto.onWheel = function onWheel(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.MOUSE_WHEEL, cb);
  };

  return MouseInputSource;
}();

var TouchInputSource = function () {
  function TouchInputSource() {
    this.support = void 0;
    this._canvas = void 0;
    this._eventTarget = new jsonAsset.EventTarget();
    this.support = document.documentElement.ontouchstart !== undefined || document.ontouchstart !== undefined || navigator.msPointerEnabled;

    if (this.support) {
      this._canvas = document.getElementById('GameCanvas');

      if (!this._canvas && !jsonAsset.TEST) {
        console.warn('failed to access canvas');
      }

      this._registerEvent();
    }
  }

  var _proto = TouchInputSource.prototype;

  _proto._registerEvent = function _registerEvent() {
    var _this$_canvas, _this$_canvas2, _this$_canvas3, _this$_canvas4;

    (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('touchstart', this._createCallback(jsonAsset.SystemEventType.TOUCH_START));
    (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('touchmove', this._createCallback(jsonAsset.SystemEventType.TOUCH_MOVE));
    (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('touchend', this._createCallback(jsonAsset.SystemEventType.TOUCH_END));
    (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('touchcancel', this._createCallback(jsonAsset.SystemEventType.TOUCH_CANCEL));
  };

  _proto._createCallback = function _createCallback(eventType) {
    var _this = this;

    return function (event) {
      var canvasRect = _this._getCanvasRect();

      var touchDataList = [];
      var length = event.changedTouches.length;

      for (var i = 0; i < length; ++i) {
        var touch = event.changedTouches[i];

        var location = _this._getLocation(touch);

        var x = location.x - canvasRect.x;
        var y = canvasRect.y + canvasRect.height - location.y;

        if (jsonAsset.legacyCC.view._isRotated) {
          var tmp = x;
          x = canvasRect.height - y;
          y = tmp;
        }

        var touchData = {
          identifier: touch.identifier,
          x: x,
          y: y,
          force: touch.force
        };
        touchDataList.push(touchData);
      }

      var inputEvent = {
        type: eventType,
        changedTouches: touchDataList,
        timestamp: performance.now()
      };
      event.stopPropagation();

      if (event.target === _this._canvas) {
        event.preventDefault();
      }

      if (event.type === 'touchstart') {
        var _this$_canvas5;

        (_this$_canvas5 = _this._canvas) === null || _this$_canvas5 === void 0 ? void 0 : _this$_canvas5.focus();
      }

      _this._eventTarget.emit(eventType, inputEvent);
    };
  };

  _proto._getCanvasRect = function _getCanvasRect() {
    var canvas = this._canvas;
    var box = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();

    if (box) {
      return new jsonAsset.Rect$1(box.x, box.y, box.width, box.height);
    }

    return new jsonAsset.Rect$1(0, 0, 0, 0);
  };

  _proto._getLocation = function _getLocation(event) {
    return new jsonAsset.Vec2(event.clientX, event.clientY);
  };

  _proto.onStart = function onStart(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.TOUCH_START, cb);
  };

  _proto.onMove = function onMove(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.TOUCH_MOVE, cb);
  };

  _proto.onEnd = function onEnd(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.TOUCH_END, cb);
  };

  _proto.onCancel = function onCancel(cb) {
    this._eventTarget.on(jsonAsset.SystemEventType.TOUCH_CANCEL, cb);
  };

  return TouchInputSource;
}();

var Input = function () {
  function Input() {
    this._touch = new TouchInputSource();
    this._mouse = new MouseInputSource();
    this._keyboard = new KeyboardInputSource();
    this._accelerometer = new AccelerometerInputSource();
    this._inputBox = new InputBox();
    this._touchEvents = [];
    this._mouseEvents = [];
    this._keyboardEvents = [];
    this._accelerometerEvents = [];

    this._registerEvent();
  }

  var _proto = Input.prototype;

  _proto._registerEvent = function _registerEvent() {
    if (this._touch.support) {
      var touchEvents = this._touchEvents;

      this._touch.onStart(function (event) {
        touchEvents.push(event);
      });

      this._touch.onMove(function (event) {
        touchEvents.push(event);
      });

      this._touch.onEnd(function (event) {
        touchEvents.push(event);
      });

      this._touch.onCancel(function (event) {
        touchEvents.push(event);
      });
    }

    if (this._mouse.support) {
      var mouseEvents = this._mouseEvents;

      this._mouse.onDown(function (event) {
        mouseEvents.push(event);
      });

      this._mouse.onMove(function (event) {
        mouseEvents.push(event);
      });

      this._mouse.onUp(function (event) {
        mouseEvents.push(event);
      });

      this._mouse.onWheel(function (event) {
        mouseEvents.push(event);
      });
    }

    if (this._keyboard.support) {
      var keyboardEvents = this._keyboardEvents;

      this._keyboard.onPressing(function (event) {
        keyboardEvents.push(event);
      });

      this._keyboard.onUp(function (event) {
        keyboardEvents.push(event);
      });
    }

    if (this._accelerometer.support) {
      var accelerometerEvents = this._accelerometerEvents;

      this._accelerometer.onChange(function (event) {
        accelerometerEvents.push(event);
      });
    }
  };

  _proto.startAccelerometer = function startAccelerometer() {
    this._accelerometer.start();
  };

  _proto.stopAccelerometer = function stopAccelerometer() {
    this._accelerometer.stop();
  };

  _proto.setAccelerometerInterval = function setAccelerometerInterval(interval) {
    this._accelerometer.setInterval(interval);
  };

  _proto.pollTouchEvents = function pollTouchEvents() {
    var events = jsonAsset.js$1.array.copy(this._touchEvents);
    this._touchEvents.length = 0;
    return events;
  };

  _proto.pollMouseEvents = function pollMouseEvents() {
    var events = jsonAsset.js$1.array.copy(this._mouseEvents);
    this._mouseEvents.length = 0;
    return events;
  };

  _proto.pollKeyboardEvents = function pollKeyboardEvents() {
    var events = jsonAsset.js$1.array.copy(this._keyboardEvents);
    this._keyboardEvents.length = 0;
    return events;
  };

  _proto.pollAccelerometerEvents = function pollAccelerometerEvents() {
    var events = jsonAsset.js$1.array.copy(this._accelerometerEvents);
    this._accelerometerEvents.length = 0;
    return events;
  };

  return Input;
}();
var input = new Input();

var _vec2 = new jsonAsset.Vec2();

var EventMouse = function (_Event) {
  jsonAsset._inheritsLoose(EventMouse, _Event);

  jsonAsset._createClass(EventMouse, [{
    key: "eventType",
    get: function get() {
      return this._eventType;
    }
  }]);

  function EventMouse(eventType, bubbles, prevLoc) {
    var _this;

    _this = _Event.call(this, eventType, bubbles) || this;
    _this.movementX = 0;
    _this.movementY = 0;
    _this._eventType = void 0;
    _this._button = EventMouse.BUTTON_MISSING;
    _this._x = 0;
    _this._y = 0;
    _this._prevX = 0;
    _this._prevY = 0;
    _this._scrollX = 0;
    _this._scrollY = 0;
    _this._eventType = eventType;

    if (prevLoc) {
      _this._prevX = prevLoc.x;
      _this._prevY = prevLoc.y;
    }

    return _this;
  }

  var _proto = EventMouse.prototype;

  _proto.setScrollData = function setScrollData(scrollX, scrollY) {
    this._scrollX = scrollX;
    this._scrollY = scrollY;
  };

  _proto.getScrollX = function getScrollX() {
    return this._scrollX;
  };

  _proto.getScrollY = function getScrollY() {
    return this._scrollY;
  };

  _proto.setLocation = function setLocation(x, y) {
    this._x = x;
    this._y = y;
  };

  _proto.getLocation = function getLocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    jsonAsset.Vec2.set(out, this._x, this._y);
    return out;
  };

  _proto.getLocationInView = function getLocationInView(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    jsonAsset.Vec2.set(out, this._x, jsonAsset.legacyCC.view._designResolutionSize.height - this._y);
    return out;
  };

  _proto.getUILocation = function getUILocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    jsonAsset.Vec2.set(out, this._x, this._y);

    jsonAsset.legacyCC.view._convertPointWithScale(out);

    return out;
  };

  _proto.getPreviousLocation = function getPreviousLocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    jsonAsset.Vec2.set(out, this._prevX, this._prevY);
    return out;
  };

  _proto.getUIPreviousLocation = function getUIPreviousLocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    jsonAsset.Vec2.set(out, this._prevX, this._prevY);

    jsonAsset.legacyCC.view._convertPointWithScale(out);

    return out;
  };

  _proto.getDelta = function getDelta(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    jsonAsset.Vec2.set(out, this._x - this._prevX, this._y - this._prevY);
    return out;
  };

  _proto.getDeltaX = function getDeltaX() {
    return this._x - this._prevX;
  };

  _proto.getDeltaY = function getDeltaY() {
    return this._y - this._prevY;
  };

  _proto.getUIDelta = function getUIDelta(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    jsonAsset.Vec2.set(out, (this._x - this._prevX) / jsonAsset.legacyCC.view.getScaleX(), (this._y - this._prevY) / jsonAsset.legacyCC.view.getScaleY());
    return out;
  };

  _proto.getUIDeltaX = function getUIDeltaX() {
    return (this._x - this._prevX) / jsonAsset.legacyCC.view.getScaleX();
  };

  _proto.getUIDeltaY = function getUIDeltaY() {
    return (this._y - this._prevY) / jsonAsset.legacyCC.view.getScaleY();
  };

  _proto.setButton = function setButton(button) {
    this._button = button;
  };

  _proto.getButton = function getButton() {
    return this._button;
  };

  _proto.getLocationX = function getLocationX() {
    return this._x;
  };

  _proto.getLocationY = function getLocationY() {
    return this._y;
  };

  _proto.getUILocationX = function getUILocationX() {
    var viewport = jsonAsset.legacyCC.view.getViewportRect();
    return (this._x - viewport.x) / jsonAsset.legacyCC.view.getScaleX();
  };

  _proto.getUILocationY = function getUILocationY() {
    var viewport = jsonAsset.legacyCC.view.getViewportRect();
    return (this._y - viewport.y) / jsonAsset.legacyCC.view.getScaleY();
  };

  return EventMouse;
}(jsonAsset.Event);
EventMouse.BUTTON_MISSING = -1;
EventMouse.BUTTON_LEFT = 0;
EventMouse.BUTTON_RIGHT = 2;
EventMouse.BUTTON_MIDDLE = 1;
EventMouse.BUTTON_4 = 3;
EventMouse.BUTTON_5 = 4;
EventMouse.BUTTON_6 = 5;
EventMouse.BUTTON_7 = 6;
EventMouse.BUTTON_8 = 7;
var EventTouch = function (_Event2) {
  jsonAsset._inheritsLoose(EventTouch, _Event2);

  function EventTouch(changedTouches, bubbles, eventType, touches) {
    var _this2;

    if (touches === void 0) {
      touches = [];
    }

    _this2 = _Event2.call(this, eventType, bubbles) || this;
    _this2.touch = null;
    _this2.simulate = false;
    _this2._eventCode = void 0;
    _this2._touches = void 0;
    _this2._allTouches = void 0;
    _this2._eventCode = eventType;
    _this2._touches = changedTouches || [];
    _this2._allTouches = touches;
    return _this2;
  }

  var _proto2 = EventTouch.prototype;

  _proto2.getEventCode = function getEventCode() {
    return this._eventCode;
  };

  _proto2.getTouches = function getTouches() {
    return this._touches;
  };

  _proto2.getAllTouches = function getAllTouches() {
    return this._allTouches;
  };

  _proto2.setLocation = function setLocation(x, y) {
    if (this.touch) {
      this.touch.setTouchInfo(this.touch.getID(), x, y);
    }
  };

  _proto2.getLocation = function getLocation(out) {
    return this.touch ? this.touch.getLocation(out) : new jsonAsset.Vec2();
  };

  _proto2.getUILocation = function getUILocation(out) {
    return this.touch ? this.touch.getUILocation(out) : new jsonAsset.Vec2();
  };

  _proto2.getLocationInView = function getLocationInView(out) {
    return this.touch ? this.touch.getLocationInView(out) : new jsonAsset.Vec2();
  };

  _proto2.getPreviousLocation = function getPreviousLocation(out) {
    return this.touch ? this.touch.getPreviousLocation(out) : new jsonAsset.Vec2();
  };

  _proto2.getStartLocation = function getStartLocation(out) {
    return this.touch ? this.touch.getStartLocation(out) : new jsonAsset.Vec2();
  };

  _proto2.getUIStartLocation = function getUIStartLocation(out) {
    return this.touch ? this.touch.getUIStartLocation(out) : new jsonAsset.Vec2();
  };

  _proto2.getID = function getID() {
    return this.touch ? this.touch.getID() : null;
  };

  _proto2.getDelta = function getDelta(out) {
    return this.touch ? this.touch.getDelta(out) : new jsonAsset.Vec2();
  };

  _proto2.getUIDelta = function getUIDelta(out) {
    return this.touch ? this.touch.getUIDelta(out) : new jsonAsset.Vec2();
  };

  _proto2.getDeltaX = function getDeltaX() {
    return this.touch ? this.touch.getDelta(_vec2).x : 0;
  };

  _proto2.getDeltaY = function getDeltaY() {
    return this.touch ? this.touch.getDelta(_vec2).y : 0;
  };

  _proto2.getLocationX = function getLocationX() {
    return this.touch ? this.touch.getLocationX() : 0;
  };

  _proto2.getLocationY = function getLocationY() {
    return this.touch ? this.touch.getLocationY() : 0;
  };

  return EventTouch;
}(jsonAsset.Event);
EventTouch.MAX_TOUCHES = 5;
var EventAcceleration = function (_Event3) {
  jsonAsset._inheritsLoose(EventAcceleration, _Event3);

  function EventAcceleration(acc, bubbles) {
    var _this3;

    _this3 = _Event3.call(this, jsonAsset.SystemEventType.DEVICEMOTION, bubbles) || this;
    _this3.acc = void 0;
    _this3.acc = acc;
    return _this3;
  }

  return EventAcceleration;
}(jsonAsset.Event);
var EventKeyboard = function (_Event4) {
  jsonAsset._inheritsLoose(EventKeyboard, _Event4);

  jsonAsset._createClass(EventKeyboard, [{
    key: "isPressed",
    get: function get() {
      return this._isPressed;
    }
  }]);

  function EventKeyboard(keyCode, eventType, bubbles) {
    var _this4;

    if (typeof eventType === 'boolean') {
      var _isPressed = eventType;
      eventType = _isPressed ? jsonAsset.SystemEventType.KEY_DOWN : jsonAsset.SystemEventType.KEY_UP;
    }

    _this4 = _Event4.call(this, eventType, bubbles) || this;
    _this4.keyCode = void 0;
    _this4.rawEvent = void 0;
    _this4._isPressed = void 0;
    _this4._isPressed = eventType !== jsonAsset.SystemEventType.KEY_UP;

    if (typeof keyCode === 'number') {
      _this4.keyCode = keyCode;
    } else {
      _this4.keyCode = keyCode.keyCode;
      _this4.rawEvent = keyCode;
    }

    return _this4;
  }

  return EventKeyboard;
}(jsonAsset.Event);
jsonAsset.Event.EventMouse = EventMouse;
jsonAsset.Event.EventTouch = EventTouch;
jsonAsset.Event.EventAcceleration = EventAcceleration;
jsonAsset.Event.EventKeyboard = EventKeyboard;

var _vec2$1 = new jsonAsset.Vec2();

var Touch = function () {
  jsonAsset._createClass(Touch, [{
    key: "lastModified",
    get: function get() {
      return this._lastModified;
    }
  }]);

  function Touch(x, y, id) {
    if (id === void 0) {
      id = 0;
    }

    this._point = new jsonAsset.Vec2();
    this._prevPoint = new jsonAsset.Vec2();
    this._lastModified = 0;
    this._id = 0;
    this._startPoint = new jsonAsset.Vec2();
    this._startPointCaptured = false;
    this.setTouchInfo(id, x, y);
  }

  var _proto = Touch.prototype;

  _proto.getLocation = function getLocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._point.x, this._point.y);
    return out;
  };

  _proto.getLocationX = function getLocationX() {
    return this._point.x;
  };

  _proto.getLocationY = function getLocationY() {
    return this._point.y;
  };

  _proto.getUILocation = function getUILocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._point.x, this._point.y);

    jsonAsset.legacyCC.view._convertPointWithScale(out);

    return out;
  };

  _proto.getUILocationX = function getUILocationX() {
    var viewport = jsonAsset.legacyCC.view.getViewportRect();
    return (this._point.x - viewport.x) / jsonAsset.legacyCC.view.getScaleX();
  };

  _proto.getUILocationY = function getUILocationY() {
    var viewport = jsonAsset.legacyCC.view.getViewportRect();
    return (this._point.y - viewport.y) / jsonAsset.legacyCC.view.getScaleY();
  };

  _proto.getPreviousLocation = function getPreviousLocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._prevPoint.x, this._prevPoint.y);
    return out;
  };

  _proto.getUIPreviousLocation = function getUIPreviousLocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._prevPoint.x, this._prevPoint.y);

    jsonAsset.legacyCC.view._convertPointWithScale(out);

    return out;
  };

  _proto.getStartLocation = function getStartLocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._startPoint.x, this._startPoint.y);
    return out;
  };

  _proto.getUIStartLocation = function getUIStartLocation(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._startPoint.x, this._startPoint.y);

    jsonAsset.legacyCC.view._convertPointWithScale(out);

    return out;
  };

  _proto.getDelta = function getDelta(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._point);
    out.subtract(this._prevPoint);
    return out;
  };

  _proto.getUIDelta = function getUIDelta(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    _vec2$1.set(this._point);

    _vec2$1.subtract(this._prevPoint);

    out.set(jsonAsset.legacyCC.view.getScaleX(), jsonAsset.legacyCC.view.getScaleY());
    jsonAsset.Vec2.divide(out, _vec2$1, out);
    return out;
  };

  _proto.getLocationInView = function getLocationInView(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._point.x, jsonAsset.legacyCC.view._designResolutionSize.height - this._point.y);
    return out;
  };

  _proto.getPreviousLocationInView = function getPreviousLocationInView(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._prevPoint.x, jsonAsset.legacyCC.view._designResolutionSize.height - this._prevPoint.y);
    return out;
  };

  _proto.getStartLocationInView = function getStartLocationInView(out) {
    if (!out) {
      out = new jsonAsset.Vec2();
    }

    out.set(this._startPoint.x, jsonAsset.legacyCC.view._designResolutionSize.height - this._startPoint.y);
    return out;
  };

  _proto.getID = function getID() {
    return this._id;
  };

  _proto.setTouchInfo = function setTouchInfo(id, x, y) {
    if (id === void 0) {
      id = 0;
    }

    this._prevPoint = this._point;
    this._point = new jsonAsset.Vec2(x || 0, y || 0);
    this._id = id;

    if (!this._startPointCaptured) {
      this._startPoint = new jsonAsset.Vec2(this._point);
      this._startPointCaptured = true;
    }
  };

  _proto.setPoint = function setPoint(x, y) {
    if (typeof x === 'object') {
      this._point.x = x.x;
      this._point.y = x.y;
    } else {
      this._point.x = x || 0;
      this._point.y = y || 0;
    }

    this._lastModified = jsonAsset.legacyCC.game.frameStartTime;
  };

  _proto.setPrevPoint = function setPrevPoint(x, y) {
    if (typeof x === 'object') {
      this._prevPoint = new jsonAsset.Vec2(x.x, x.y);
    } else {
      this._prevPoint = new jsonAsset.Vec2(x || 0, y || 0);
    }

    this._lastModified = jsonAsset.legacyCC.game.frameStartTime;
  };

  return Touch;
}();
jsonAsset.legacyCC.Touch = Touch;

var Acceleration = function Acceleration(x, y, z, timestamp) {
  if (x === void 0) {
    x = 0;
  }

  if (y === void 0) {
    y = 0;
  }

  if (z === void 0) {
    z = 0;
  }

  if (timestamp === void 0) {
    timestamp = 0;
  }

  this.x = void 0;
  this.y = void 0;
  this.z = void 0;
  this.timestamp = void 0;
  this.x = x;
  this.y = y;
  this.z = z;
  this.timestamp = timestamp;
};

var TOUCH_TIMEOUT = jsonAsset.macro.TOUCH_TIMEOUT;

var _vec2$2 = new jsonAsset.Vec2();

var _preLocation = new jsonAsset.Vec2();

var InputManager = function () {
  function InputManager() {
    this._preTouchPoint = new jsonAsset.Vec2();
    this._prevMousePoint = new jsonAsset.Vec2();
    this._preTouchPool = [];
    this._preTouchPoolPointer = 0;
    this._touches = [];
    this._touchesIntegerDict = {};
    this._indexBitsUsed = 0;
    this._maxTouches = 8;
    this._glView = null;
  }

  var _proto = InputManager.prototype;

  _proto.clearEvents = function clearEvents() {
    input.pollMouseEvents();
    input.pollTouchEvents();
    input.pollKeyboardEvents();
    input.pollAccelerometerEvents();
  };

  _proto.frameDispatchEvents = function frameDispatchEvents() {
    var mouseEvents = input.pollMouseEvents();

    for (var i = 0, length = mouseEvents.length; i < length; ++i) {
      var mouseEvent = mouseEvents[i];

      this._dispatchMouseEvent(mouseEvent);
    }

    var touchEvents = input.pollTouchEvents();

    for (var _i = 0, _length = touchEvents.length; _i < _length; ++_i) {
      var touchEvent = touchEvents[_i];

      this._dispatchTouchEvent(touchEvent);
    }

    var keyboardEvents = input.pollKeyboardEvents();

    for (var _i2 = 0, _length2 = keyboardEvents.length; _i2 < _length2; ++_i2) {
      var keyboardEvent = keyboardEvents[_i2];

      this._dispatchKeyboardEvent(keyboardEvent);
    }

    var accelerometerEvents = input.pollAccelerometerEvents();

    for (var _i3 = 0, _length3 = accelerometerEvents.length; _i3 < _length3; ++_i3) {
      var accelerometerEvent = accelerometerEvents[_i3];

      this._dispatchAccelerometerEvent(accelerometerEvent);
    }
  };

  _proto._dispatchMouseEvent = function _dispatchMouseEvent(inputEvent) {
    var mouseEvent;
    var touch;

    switch (inputEvent.type) {
      case jsonAsset.SystemEventType.MOUSE_DOWN:
        mouseEvent = this._getMouseEvent(inputEvent);
        touch = this._getTouch(inputEvent);

        this._handleTouchesStart([touch]);

        jsonAsset.eventManager.dispatchEvent(mouseEvent);
        break;

      case jsonAsset.SystemEventType.MOUSE_MOVE:
        mouseEvent = this._getMouseEvent(inputEvent);
        touch = this._getTouch(inputEvent);

        this._handleTouchesMove([touch]);

        jsonAsset.eventManager.dispatchEvent(mouseEvent);
        break;

      case jsonAsset.SystemEventType.MOUSE_UP:
        mouseEvent = this._getMouseEvent(inputEvent);
        touch = this._getTouch(inputEvent);

        this._handleTouchesEnd([touch]);

        jsonAsset.eventManager.dispatchEvent(mouseEvent);
        break;

      case jsonAsset.SystemEventType.MOUSE_WHEEL:
        mouseEvent = this._getMouseEvent(inputEvent);
        mouseEvent.setScrollData(inputEvent.deltaX, inputEvent.deltaY);
        jsonAsset.eventManager.dispatchEvent(mouseEvent);
        break;
    }
  };

  _proto._dispatchTouchEvent = function _dispatchTouchEvent(inputEvent) {
    var touchList = this._getTouchList(inputEvent);

    switch (inputEvent.type) {
      case jsonAsset.SystemEventType.TOUCH_START:
        this._handleTouchesStart(touchList);

        break;

      case jsonAsset.SystemEventType.TOUCH_MOVE:
        this._handleTouchesMove(touchList);

        break;

      case jsonAsset.SystemEventType.TOUCH_END:
        this._handleTouchesEnd(touchList);

        break;

      case jsonAsset.SystemEventType.TOUCH_CANCEL:
        this._handleTouchesCancel(touchList);

        break;
    }
  };

  _proto._handleTouchesStart = function _handleTouchesStart(touches) {
    var handleTouches = [];
    var locTouchIntDict = this._touchesIntegerDict;

    for (var i = 0; i < touches.length; ++i) {
      var touch = touches[i];
      var touchID = touch.getID();

      if (touchID === null) {
        continue;
      }

      var _index = locTouchIntDict[touchID];

      if (_index === undefined) {
        var unusedIndex = this._getUnUsedIndex();

        if (unusedIndex === -1) {
          jsonAsset.logID(2300, unusedIndex);
          continue;
        }

        touch.getLocation(_vec2$2);
        var curTouch = new Touch(_vec2$2.x, _vec2$2.y, touchID);
        this._touches[unusedIndex] = curTouch;
        touch.getPreviousLocation(_vec2$2);
        curTouch.setPrevPoint(_vec2$2);
        locTouchIntDict[touchID] = unusedIndex;
        handleTouches.push(curTouch);
      }
    }

    if (handleTouches.length > 0) {
      var touchEvent = new EventTouch(handleTouches, false, jsonAsset.SystemEventType.TOUCH_START, jsonAsset.macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
      jsonAsset.eventManager.dispatchEvent(touchEvent);
    }
  };

  _proto._handleTouchesMove = function _handleTouchesMove(touches) {
    var handleTouches = [];
    var locTouches = this._touches;

    for (var i = 0; i < touches.length; ++i) {
      var touch = touches[i];
      var touchID = touch.getID();

      if (touchID === null) {
        continue;
      }

      var _index2 = this._touchesIntegerDict[touchID];

      if (_index2 === undefined) {
        continue;
      }

      if (locTouches[_index2]) {
        touch.getLocation(_vec2$2);

        locTouches[_index2].setPoint(_vec2$2);

        touch.getPreviousLocation(_vec2$2);

        locTouches[_index2].setPrevPoint(_vec2$2);

        handleTouches.push(locTouches[_index2]);
      }
    }

    if (handleTouches.length > 0) {
      var touchEvent = new EventTouch(handleTouches, false, jsonAsset.SystemEventType.TOUCH_MOVE, jsonAsset.macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
      jsonAsset.eventManager.dispatchEvent(touchEvent);
    }
  };

  _proto._handleTouchesEnd = function _handleTouchesEnd(touches) {
    var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

    if (handleTouches.length > 0) {
      var touchEvent = new EventTouch(handleTouches, false, jsonAsset.SystemEventType.TOUCH_END, jsonAsset.macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
      jsonAsset.eventManager.dispatchEvent(touchEvent);
    }

    this._preTouchPool.length = 0;
  };

  _proto._handleTouchesCancel = function _handleTouchesCancel(touches) {
    var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

    if (handleTouches.length > 0) {
      var touchEvent = new EventTouch(handleTouches, false, jsonAsset.SystemEventType.TOUCH_CANCEL, jsonAsset.macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
      jsonAsset.eventManager.dispatchEvent(touchEvent);
    }

    this._preTouchPool.length = 0;
  };

  _proto.getSetOfTouchesEndOrCancel = function getSetOfTouchesEndOrCancel(touches) {
    var handleTouches = [];
    var locTouches = this._touches;
    var locTouchesIntDict = this._touchesIntegerDict;

    for (var i = 0; i < touches.length; ++i) {
      var touch = touches[i];
      var touchID = touch.getID();

      if (touchID === null) {
        continue;
      }

      var _index3 = locTouchesIntDict[touchID];

      if (_index3 === undefined) {
        continue;
      }

      if (locTouches[_index3]) {
        touch.getLocation(_vec2$2);

        locTouches[_index3].setPoint(_vec2$2);

        touch.getPreviousLocation(_vec2$2);

        locTouches[_index3].setPrevPoint(_vec2$2);

        handleTouches.push(locTouches[_index3]);

        this._removeUsedIndexBit(_index3);

        delete locTouchesIntDict[touchID];
      }
    }

    return handleTouches;
  };

  _proto._getPreTouch = function _getPreTouch(touch) {
    var preTouch = null;
    var locPreTouchPool = this._preTouchPool;
    var id = touch.getID();

    for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
      if (locPreTouchPool[i].getID() === id) {
        preTouch = locPreTouchPool[i];
        break;
      }
    }

    if (!preTouch) {
      preTouch = touch;
    }

    return preTouch;
  };

  _proto._setPreTouch = function _setPreTouch(touch) {
    var find = false;
    var locPreTouchPool = this._preTouchPool;
    var id = touch.getID();

    for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
      if (locPreTouchPool[i].getID() === id) {
        locPreTouchPool[i] = touch;
        find = true;
        break;
      }
    }

    if (!find) {
      if (locPreTouchPool.length <= 50) {
        locPreTouchPool.push(touch);
      } else {
        locPreTouchPool[this._preTouchPoolPointer] = touch;
        this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50;
      }
    }
  };

  _proto._getViewPixelRatio = function _getViewPixelRatio() {
    if (!this._glView) {
      this._glView = jsonAsset.legacyCC.view;
    }

    return this._glView ? this._glView._devicePixelRatio : 1;
  };

  _proto._getTouch = function _getTouch(inputEvent) {
    var locPreTouch = this._preTouchPoint;

    var pixelRatio = this._getViewPixelRatio();

    var x = inputEvent.x * pixelRatio;
    var y = inputEvent.y * pixelRatio;
    var touch = new Touch(x, y, 0);
    touch.setPrevPoint(locPreTouch.x, locPreTouch.y);
    locPreTouch.x = x;
    locPreTouch.y = y;
    return touch;
  };

  _proto._getMouseEvent = function _getMouseEvent(inputEvent) {
    var locPreMouse = this._prevMousePoint;
    var mouseEvent = new EventMouse(inputEvent.type, false, locPreMouse);

    var pixelRatio = this._getViewPixelRatio();

    locPreMouse.x = inputEvent.x * pixelRatio;
    locPreMouse.y = inputEvent.y * pixelRatio;

    if (jsonAsset.legacyCC.GAME_VIEW) {
      locPreMouse.x /= jsonAsset.legacyCC.gameView.canvas.width / jsonAsset.legacyCC.game.canvas.width;
      locPreMouse.y /= jsonAsset.legacyCC.gameView.canvas.height / jsonAsset.legacyCC.game.canvas.height;
    }

    mouseEvent.setLocation(locPreMouse.x, locPreMouse.y);
    mouseEvent.setButton(inputEvent.button);

    if (inputEvent.movementX) {
      mouseEvent.movementX = inputEvent.movementX;
    }

    if (inputEvent.movementY) {
      mouseEvent.movementY = inputEvent.movementY;
    }

    return mouseEvent;
  };

  _proto._getTouchList = function _getTouchList(inputEvent) {
    var touchList = [];
    var locPreTouch = this._preTouchPoint;
    var length = inputEvent.changedTouches.length;

    var pixelRatio = this._getViewPixelRatio();

    for (var i = 0; i < length; i++) {
      var touchData = inputEvent.changedTouches[i];
      var x = touchData.x * pixelRatio;
      var y = touchData.y * pixelRatio;
      var touch = new Touch(x, y, touchData.identifier);

      this._getPreTouch(touch).getLocation(_preLocation);

      touch.setPrevPoint(_preLocation.x, _preLocation.y);

      this._setPreTouch(touch);

      locPreTouch.x = x;
      locPreTouch.y = y;
      touchList.push(touch);

      if (!jsonAsset.macro.ENABLE_MULTI_TOUCH) {
        break;
      }
    }

    return touchList;
  };

  _proto._getUnUsedIndex = function _getUnUsedIndex() {
    var temp = this._indexBitsUsed;
    var now = jsonAsset.legacyCC.game.frameStartTime;

    for (var i = 0; i < this._maxTouches; i++) {
      if (!(temp & 0x00000001)) {
        this._indexBitsUsed |= 1 << i;
        return i;
      } else {
        var touch = this._touches[i];

        if (now - touch.lastModified > TOUCH_TIMEOUT) {
          this._removeUsedIndexBit(i);

          var touchID = touch.getID();

          if (touchID !== null) {
            delete this._touchesIntegerDict[touchID];
          }

          return i;
        }
      }

      temp >>= 1;
    }

    return -1;
  };

  _proto._removeUsedIndexBit = function _removeUsedIndexBit(index) {
    if (index < 0 || index >= this._maxTouches) {
      return;
    }

    var temp = 1 << index;
    temp = ~temp;
    this._indexBitsUsed &= temp;
  };

  _proto._getUsefulTouches = function _getUsefulTouches() {
    var touches = [];
    var touchDict = this._touchesIntegerDict;

    for (var id in touchDict) {
      var _index4 = parseInt(id);

      var usedID = touchDict[_index4];

      if (usedID === undefined || usedID === null) {
        continue;
      }

      var touch = this._touches[usedID];
      touches.push(touch);
    }

    return touches;
  };

  _proto._dispatchKeyboardEvent = function _dispatchKeyboardEvent(inputEvent) {
    switch (inputEvent.type) {
      case jsonAsset.SystemEventType.KEY_DOWN:
        jsonAsset.eventManager.dispatchEvent(new EventKeyboard(inputEvent.code, jsonAsset.SystemEventType.KEY_DOWN));
        break;

      case jsonAsset.SystemEventType.KEY_UP:
        jsonAsset.eventManager.dispatchEvent(new EventKeyboard(inputEvent.code, jsonAsset.SystemEventType.KEY_UP));
        break;
    }
  };

  _proto._dispatchAccelerometerEvent = function _dispatchAccelerometerEvent(inputEvent) {
    if (inputEvent.type === jsonAsset.SystemEventType.DEVICEMOTION) {
      var x = inputEvent.x,
          y = inputEvent.y,
          z = inputEvent.z,
          timestamp = inputEvent.timestamp;
      jsonAsset.eventManager.dispatchEvent(new EventAcceleration(new Acceleration(x, y, z, timestamp)));
    }
  };

  _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnable) {
    if (isEnable) {
      input.startAccelerometer();
    } else {
      input.stopAccelerometer();
    }
  };

  _proto.setAccelerometerInterval = function setAccelerometerInterval(intervalInMileSeconds) {
    input.setAccelerometerInterval(intervalInMileSeconds);
  };

  return InputManager;
}();

var inputManager = new InputManager();
jsonAsset.legacyCC.internal.inputManager = inputManager;

var Game = function (_EventTarget) {
  jsonAsset._inheritsLoose(Game, _EventTarget);

  function Game() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _EventTarget.call.apply(_EventTarget, [this].concat(args)) || this;
    _this.frame = null;
    _this.container = null;
    _this.canvas = null;
    _this.renderType = -1;
    _this.eventTargetOn = _EventTarget.prototype.on;
    _this.eventTargetOnce = _EventTarget.prototype.once;
    _this.config = {};
    _this.onStart = null;
    _this.frameTime = 1000 / 60;
    _this.collisionMatrix = [];
    _this.groupList = [];
    _this._persistRootNodes = {};
    _this._gfxDevice = null;
    _this._configLoaded = false;
    _this._isCloning = false;
    _this._inited = false;
    _this._engineInited = false;
    _this._rendererInitialized = false;
    _this._paused = true;
    _this._frameRate = 60;
    _this._intervalId = 0;
    _this._initTime = 0;
    _this._startTime = 0;
    _this._deltaTime = 0.0;
    return _this;
  }

  var _proto = Game.prototype;

  _proto.setFrameRate = function setFrameRate(frameRate) {
    this.frameRate = frameRate;
  };

  _proto.getFrameRate = function getFrameRate() {
    return this.frameRate;
  };

  _proto.step = function step() {
    jsonAsset.legacyCC.director.tick(this.frameTime);
  };

  _proto.pause = function pause() {
    if (this._paused) {
      return;
    }

    this._paused = true;

    if (this._intervalId) {
      window.cAF(this._intervalId);
      this._intervalId = 0;
    }
  };

  _proto.resume = function resume() {
    if (!this._paused) {
      return;
    }

    inputManager.clearEvents();

    if (this._intervalId) {
      window.cAF(this._intervalId);
      this._intervalId = 0;
    }

    this._paused = false;

    this._updateCallback();

    this._intervalId = window.rAF(this._frameCB);
  };

  _proto.isPaused = function isPaused() {
    return this._paused;
  };

  _proto.restart = function restart() {
    var _this2 = this;

    var afterDrawPromise = new Promise(function (resolve) {
      return jsonAsset.legacyCC.director.once(jsonAsset.legacyCC.Director.EVENT_AFTER_DRAW, function () {
        return resolve();
      });
    });
    return afterDrawPromise.then(function () {
      for (var id in _this2._persistRootNodes) {
        _this2.removePersistRootNode(_this2._persistRootNodes[id]);
      }

      jsonAsset.legacyCC.director.getScene().destroy();

      jsonAsset.legacyCC.Object._deferredDestroy();

      jsonAsset.legacyCC.director.reset();

      _this2.pause();

      return _this2._setRenderPipelineNShowSplash().then(function () {
        _this2.resume();

        _this2._safeEmit(Game.EVENT_RESTART);
      });
    });
  };

  _proto.end = function end() {
    jsonAsset.systemInfo.close();
  };

  _proto.on = function on(type, callback, target, once) {
    if (this._engineInited && type === Game.EVENT_ENGINE_INITED || this._inited && type === Game.EVENT_GAME_INITED || this._rendererInitialized && type === Game.EVENT_RENDERER_INITED) {
      callback.call(target);
    }

    return this.eventTargetOn(type, callback, target, once);
  };

  _proto.once = function once(type, callback, target) {
    if (this._engineInited && type === Game.EVENT_ENGINE_INITED) {
      return callback.call(target);
    }

    return this.eventTargetOnce(type, callback, target);
  };

  _proto.init = function init(config) {
    var _this3 = this;

    this._initConfig(config);

    if (this.config.assetOptions) {
      jsonAsset.legacyCC.assetManager.init(this.config.assetOptions);
    }

    if (this.config.layers) {
      var userLayers = this.config.layers;

      for (var i = 0; i < userLayers.length; i++) {
        var layer = userLayers[i];
        var bitNum = jsonAsset.log2(layer.value);
        jsonAsset.Layers.addLayer(layer.name, bitNum);
      }
    }

    return this._initEngine().then(function () {
      {
        _this3._initEvents();
      }

      if (jsonAsset.legacyCC.director.root && jsonAsset.legacyCC.director.root.dataPoolManager) {
        jsonAsset.legacyCC.director.root.dataPoolManager.jointTexturePool.registerCustomTextureLayouts(config.customJointTextureLayouts);
      }

      return _this3._engineInited;
    });
  };

  _proto.run = function run(configOrCallback, onStart) {
    var _this4 = this;

    var initPromise;

    if (typeof configOrCallback !== 'function' && configOrCallback) {
      initPromise = this.init(configOrCallback);
      this.onStart = onStart !== null && onStart !== void 0 ? onStart : null;
    } else {
      this.onStart = configOrCallback !== null && configOrCallback !== void 0 ? configOrCallback : null;
    }

    jsonAsset.garbageCollectionManager.init();
    return Promise.resolve(initPromise).then(function () {
      return _this4._setRenderPipelineNShowSplash();
    });
  };

  _proto.addPersistRootNode = function addPersistRootNode(node) {
    if (!jsonAsset.legacyCC.Node.isNode(node) || !node.uuid) {
      jsonAsset.warnID(3800);
      return;
    }

    var id = node.uuid;

    if (!this._persistRootNodes[id]) {
      var scene = jsonAsset.legacyCC.director._scene;

      if (jsonAsset.legacyCC.isValid(scene)) {
        if (!node.parent) {
          node.parent = scene;
        } else if (!(node.parent instanceof jsonAsset.legacyCC.Scene)) {
          jsonAsset.warnID(3801);
          return;
        } else if (node.parent !== scene) {
          jsonAsset.warnID(3802);
          return;
        } else {
          node._originalSceneId = scene.uuid;
        }
      }

      this._persistRootNodes[id] = node;
      node._persistNode = true;

      jsonAsset.legacyCC.assetManager._releaseManager._addPersistNodeRef(node);
    }
  };

  _proto.removePersistRootNode = function removePersistRootNode(node) {
    var id = node.uuid || '';

    if (node === this._persistRootNodes[id]) {
      delete this._persistRootNodes[id];
      node._persistNode = false;
      node._originalSceneId = '';

      jsonAsset.legacyCC.assetManager._releaseManager._removePersistNodeRef(node);
    }
  };

  _proto.isPersistRootNode = function isPersistRootNode(node) {
    return !!node._persistNode;
  };

  _proto._initEngine = function _initEngine() {
    var _this5 = this;

    this._initDevice();

    return Promise.resolve(jsonAsset.legacyCC.director._init()).then(function () {
      jsonAsset.log("Cocos Creator v" + jsonAsset.engineVersion);

      _this5.emit(Game.EVENT_ENGINE_INITED);

      _this5._engineInited = true;

      if (jsonAsset.legacyCC.internal.dynamicAtlasManager) {
        jsonAsset.legacyCC.internal.dynamicAtlasManager.enabled = !jsonAsset.macro.CLEANUP_IMAGE_CACHE;
      }
    });
  };

  _proto._setAnimFrame = function _setAnimFrame() {
    var frameRate = this._frameRate;

    {
      var rAF = window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

      if (frameRate !== 60 && frameRate !== 30) {
        window.rAF = this._stTime.bind(this);
        window.cAF = this._ctTime;
      } else {
        window.rAF = rAF || this._stTime.bind(this);
        window.cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.ocancelAnimationFrame || this._ctTime;

        this._updateCallback();
      }
    }
  };

  _proto._stTime = function _stTime(callback) {
    var currTime = performance.now();
    var elapseTime = Math.max(0, currTime - this._startTime);
    var timeToCall = Math.max(0, this.frameTime - elapseTime);
    var id = window.setTimeout(callback, timeToCall);
    return id;
  };

  _proto._ctTime = function _ctTime(id) {
    window.clearTimeout(id);
  };

  _proto._calculateDT = function _calculateDT(now) {
    if (!now) now = performance.now();
    this._deltaTime = now > this._startTime ? (now - this._startTime) / 1000 : 0;
    this._startTime = now;
    return this._deltaTime;
  };

  _proto._updateCallback = function _updateCallback() {
    var _this6 = this;

    var director = jsonAsset.legacyCC.director;
    var callback;

    if ( this._frameRate === 30) {
      var skip = true;

      callback = function callback(time) {
        _this6._intervalId = window.rAF(_this6._frameCB);
        skip = !skip;

        if (skip) {
          return;
        }

        director.tick(_this6._calculateDT(time));
      };
    } else {
      callback = function callback(time) {
        director.tick(_this6._calculateDT(time));
        _this6._intervalId = window.rAF(_this6._frameCB);
      };
    }

    this._frameCB = callback;
  };

  _proto._runMainLoop = function _runMainLoop() {
    if (!this._inited || jsonAsset.EDITOR ) {
      return;
    }

    var config = this.config;
    var director = jsonAsset.legacyCC.director;
    jsonAsset.setDisplayStats(!!config.showFPS);
    director.startAnimation();
    this.resume();
  };

  _proto._initConfig = function _initConfig(config) {
    if (typeof config.debugMode !== 'number') {
      config.debugMode = jsonAsset.DebugMode.NONE;
    }

    config.exposeClassName = !!config.exposeClassName;

    if (typeof config.frameRate !== 'number') {
      config.frameRate = 60;
    }

    var renderMode = config.renderMode;

    if (typeof renderMode !== 'number' || renderMode > 2 || renderMode < 0) {
      config.renderMode = 0;
    }

    config.showFPS = !!config.showFPS;

    jsonAsset._resetDebugSetting(config.debugMode);

    this.config = config;
    this._configLoaded = true;
    this.frameRate = config.frameRate;
  };

  _proto._determineRenderType = function _determineRenderType() {
    var config = this.config;
    var userRenderMode = parseInt(config.renderMode, 10);
    this.renderType = Game.RENDER_TYPE_CANVAS;
    var supportRender = false;

    if (userRenderMode === 0) {
      if (jsonAsset.sys.capabilities.opengl) {
        this.renderType = Game.RENDER_TYPE_WEBGL;
        supportRender = true;
      } else if (jsonAsset.sys.capabilities.canvas) {
        this.renderType = Game.RENDER_TYPE_CANVAS;
        supportRender = true;
      }
    } else if (userRenderMode === 1 && jsonAsset.sys.capabilities.canvas) {
      this.renderType = Game.RENDER_TYPE_CANVAS;
      supportRender = true;
    } else if (userRenderMode === 2 && jsonAsset.sys.capabilities.opengl) {
      this.renderType = Game.RENDER_TYPE_WEBGL;
      supportRender = true;
    }

    if (!supportRender) {
      throw new Error(jsonAsset.getError(3820, userRenderMode));
    }
  };

  _proto._initDevice = function _initDevice() {
    if (this._rendererInitialized) {
      return;
    }

    var adapter = this.config.adapter;

    if (adapter) {
      this.canvas = adapter.canvas;
      this.frame = adapter.frame;
      this.container = adapter.container;
    }

    this._determineRenderType();

    if (this.renderType === Game.RENDER_TYPE_WEBGL) {
      var ctors = [];
      var opts = new jsonAsset.DeviceInfo(this.canvas,  jsonAsset.macro.ENABLE_WEBGL_ANTIALIAS, false, window.devicePixelRatio, jsonAsset.sys.windowPixelResolution.width, jsonAsset.sys.windowPixelResolution.height, jsonAsset.bindingMappingInfo);

      {
        var useWebGL2 = !!window.WebGL2RenderingContext;
        var userAgent = window.navigator.userAgent.toLowerCase();

        if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 || jsonAsset.sys.browserType === jsonAsset.BrowserType.UC) {
            useWebGL2 = false;
          }

        if (useWebGL2 && jsonAsset.legacyCC.WebGL2Device) {
          ctors.push(jsonAsset.legacyCC.WebGL2Device);
        }

        if (jsonAsset.legacyCC.WebGLDevice) {
          ctors.push(jsonAsset.legacyCC.WebGLDevice);
        }

        for (var i = 0; i < ctors.length; i++) {
          this._gfxDevice = new ctors[i]();

          if (this._gfxDevice.initialize(opts)) {
            break;
          }
        }
      }
    }

    if (!this._gfxDevice) {
      jsonAsset.error('can not support canvas rendering in 3D');
      this.renderType = Game.RENDER_TYPE_CANVAS;
      return;
    }

    this.canvas.oncontextmenu = function () {
      return false;
    };
  };

  _proto._initEvents = function _initEvents() {
    jsonAsset.systemInfo.on('show', this._onShow, this);
    jsonAsset.systemInfo.on('hide', this._onHide, this);
  };

  _proto._onHide = function _onHide() {
    this.emit(Game.EVENT_HIDE);
    this.pause();
  };

  _proto._onShow = function _onShow() {
    this.emit(Game.EVENT_SHOW);
    this.resume();
  };

  _proto._setRenderPipelineNShowSplash = function _setRenderPipelineNShowSplash() {
    var _this7 = this;

    return Promise.resolve(this._setupRenderPipeline()).then(function () {
      return Promise.resolve(_this7._showSplashScreen()).then(function () {
        _this7._inited = true;
        _this7._initTime = performance.now();

        _this7._runMainLoop();

        _this7._safeEmit(Game.EVENT_GAME_INITED);

        if (_this7.onStart) {
          _this7.onStart();
        }
      });
    });
  };

  _proto._setupRenderPipeline = function _setupRenderPipeline() {
    var _this8 = this;

    var renderPipeline = this.config.renderPipeline;

    if (!renderPipeline) {
      return this._setRenderPipeline();
    }

    return new Promise(function (resolve, reject) {
      jsonAsset.legacyCC.assetManager.loadAny(renderPipeline, function (err, asset) {
        return err || !(asset instanceof RenderPipeline) ? reject(err) : resolve(asset);
      });
    }).then(function (asset) {
      _this8._setRenderPipeline(asset);
    })["catch"](function (reason) {
      jsonAsset.warn(reason);
      jsonAsset.warn("Failed load render pipeline: " + renderPipeline + ", engine failed to initialize, will fallback to default pipeline");

      _this8._setRenderPipeline();
    });
  };

  _proto._showSplashScreen = function _showSplashScreen() {
    if ( jsonAsset.legacyCC.internal.SplashScreen) {
      var splashScreen = jsonAsset.legacyCC.internal.SplashScreen.instance;
      splashScreen.main(jsonAsset.legacyCC.director.root);
      return new Promise(function (resolve) {
        splashScreen.setOnFinish(function () {
          return resolve();
        });
        splashScreen.loadFinish = true;
      });
    }

    return null;
  };

  _proto._setRenderPipeline = function _setRenderPipeline(rppl) {
    if (!jsonAsset.legacyCC.director.root.setRenderPipeline(rppl)) {
      this._setRenderPipeline();
    }

    this._rendererInitialized = true;

    this._safeEmit(Game.EVENT_RENDERER_INITED);
  };

  _proto._safeEmit = function _safeEmit(event) {
    {
      this.emit(event);
    }
  };

  jsonAsset._createClass(Game, [{
    key: "inited",
    get: function get() {
      return this._inited;
    }
  }, {
    key: "frameRate",
    get: function get() {
      return this._frameRate;
    },
    set: function set(frameRate) {
      if (typeof frameRate !== 'number') {
        frameRate = parseInt(frameRate, 10);

        if (Number.isNaN(frameRate)) {
          frameRate = 60;
        }
      }

      this._frameRate = frameRate;
      this.frameTime = 1000 / frameRate;

      this._setAnimFrame();
    }
  }, {
    key: "deltaTime",
    get: function get() {
      return this._deltaTime;
    }
  }, {
    key: "totalTime",
    get: function get() {
      return performance.now() - this._initTime;
    }
  }, {
    key: "frameStartTime",
    get: function get() {
      return this._startTime;
    }
  }]);

  return Game;
}(jsonAsset.EventTarget);
Game.EVENT_HIDE = 'game_on_hide';
Game.EVENT_SHOW = 'game_on_show';
Game.EVENT_LOW_MEMORY = 'game_on_low_memory';
Game.EVENT_GAME_INITED = 'game_inited';
Game.EVENT_ENGINE_INITED = 'engine_inited';
Game.EVENT_RENDERER_INITED = 'renderer_inited';
Game.EVENT_RESTART = 'game_on_restart';
Game.RENDER_TYPE_CANVAS = 0;
Game.RENDER_TYPE_WEBGL = 1;
Game.RENDER_TYPE_OPENGL = 2;
jsonAsset.legacyCC.Game = Game;
var game = jsonAsset.legacyCC.game = new Game();

var visibleRect = {
  topLeft: jsonAsset.legacyCC.v2(0, 0),
  topRight: jsonAsset.legacyCC.v2(0, 0),
  top: jsonAsset.legacyCC.v2(0, 0),
  bottomLeft: jsonAsset.legacyCC.v2(0, 0),
  bottomRight: jsonAsset.legacyCC.v2(0, 0),
  bottom: jsonAsset.legacyCC.v2(0, 0),
  center: jsonAsset.legacyCC.v2(0, 0),
  left: jsonAsset.legacyCC.v2(0, 0),
  right: jsonAsset.legacyCC.v2(0, 0),
  width: 0,
  height: 0,
  init: function init(visibleRect_) {
    var w = this.width = visibleRect_.width;
    var h = this.height = visibleRect_.height;
    var l = visibleRect_.x;
    var b = visibleRect_.y;
    var t = b + h;
    var r = l + w;
    this.topLeft.x = l;
    this.topLeft.y = t;
    this.topRight.x = r;
    this.topRight.y = t;
    this.top.x = l + w / 2;
    this.top.y = t;
    this.bottomLeft.x = l;
    this.bottomLeft.y = b;
    this.bottomRight.x = r;
    this.bottomRight.y = b;
    this.bottom.x = l + w / 2;
    this.bottom.y = b;
    this.center.x = l + w / 2;
    this.center.y = b + h / 2;
    this.left.x = l;
    this.left.y = b + h / 2;
    this.right.x = r;
    this.right.y = b + h / 2;
  }
};
jsonAsset.legacyCC.visibleRect = visibleRect;

var Screen = function () {
  function Screen() {}

  var _proto = Screen.prototype;

  _proto.fullScreen = function fullScreen() {
    return jsonAsset.screenAdapter.isFullScreen;
  };

  _proto.requestFullScreen = function requestFullScreen(element, onFullScreenChange, onFullScreenError) {
    if (arguments.length > 0) {
      jsonAsset.warnID(1400, 'screen.requestFullScreen(element, onFullScreenChange?, onFullScreenError?)', 'screen.requestFullScreen(): Promise');
    }

    return jsonAsset.screenAdapter.requestFullScreen().then(function () {
      onFullScreenChange === null || onFullScreenChange === void 0 ? void 0 : onFullScreenChange();
    })["catch"](function (err) {
      console.error(err);
      onFullScreenError === null || onFullScreenError === void 0 ? void 0 : onFullScreenError();
    });
  };

  _proto.exitFullScreen = function exitFullScreen() {
    return jsonAsset.screenAdapter.exitFullScreen();
  };

  _proto.autoFullScreen = function autoFullScreen(element, onFullScreenChange) {
    var _this$requestFullScre;

    (_this$requestFullScre = this.requestFullScreen(element, onFullScreenChange)) === null || _this$requestFullScre === void 0 ? void 0 : _this$requestFullScre["catch"](function (e) {});
  };

  _proto.disableAutoFullScreen = function disableAutoFullScreen(element) {};

  jsonAsset._createClass(Screen, [{
    key: "supportsFullScreen",
    get: function get() {
      return jsonAsset.screenAdapter.supportFullScreen;
    }
  }]);

  return Screen;
}();

var screen = new Screen();
jsonAsset.legacyCC.screen = screen;

var localWinSize = new jsonAsset.Size$1();
var View = function (_EventTarget) {
  jsonAsset._inheritsLoose(View, _EventTarget);

  function View() {
    var _this;

    _this = _EventTarget.call(this) || this;
    _this._resizeWithBrowserSize = void 0;
    _this._designResolutionSize = void 0;
    _this._frameSize = void 0;
    _this._scaleX = void 0;
    _this._scaleY = void 0;
    _this._viewportRect = void 0;
    _this._visibleRect = void 0;
    _this._autoFullScreen = void 0;
    _this._devicePixelRatio = void 0;
    _this._maxPixelRatio = void 0;
    _this._retinaEnabled = void 0;
    _this._resizeCallback = void 0;
    _this._resizing = void 0;
    _this._orientationChanging = void 0;
    _this._isRotated = void 0;
    _this._orientation = void 0;
    _this._resolutionPolicy = void 0;
    _this._rpExactFit = void 0;
    _this._rpShowAll = void 0;
    _this._rpNoBorder = void 0;
    _this._rpFixedHeight = void 0;
    _this._rpFixedWidth = void 0;
    var _strategyer = ContainerStrategy;
    var _strategy = ContentStrategy;
    _this._frameSize = new jsonAsset.Size$1(0, 0);
    _this._designResolutionSize = new jsonAsset.Size$1(0, 0);
    _this._scaleX = 1;
    _this._scaleY = 1;
    _this._viewportRect = new jsonAsset.Rect$1(0, 0, 0, 0);
    _this._visibleRect = new jsonAsset.Rect$1(0, 0, 0, 0);
    _this._autoFullScreen = false;
    _this._devicePixelRatio = 1;

    {
      _this._maxPixelRatio = 2;
    }

    _this._retinaEnabled = false;
    _this._resizeCallback = null;
    _this._resizing = false;
    _this._resizeWithBrowserSize = false;
    _this._orientationChanging = true;
    _this._isRotated = false;
    _this._orientation = jsonAsset.legacyCC.macro.ORIENTATION_AUTO;
    _this._rpExactFit = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.EXACT_FIT);
    _this._rpShowAll = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.SHOW_ALL);
    _this._rpNoBorder = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.NO_BORDER);
    _this._rpFixedHeight = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_HEIGHT);
    _this._rpFixedWidth = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_WIDTH);
    _this._resolutionPolicy = _this._rpShowAll;
    jsonAsset.legacyCC.game.once(jsonAsset.legacyCC.Game.EVENT_ENGINE_INITED, _this.init, jsonAsset._assertThisInitialized(_this));
    return _this;
  }

  var _proto = View.prototype;

  _proto.init = function init() {
    this._initFrameSize();

    var w = jsonAsset.legacyCC.game.canvas.width;
    var h = jsonAsset.legacyCC.game.canvas.height;
    this._designResolutionSize.width = w;
    this._designResolutionSize.height = h;
    this._viewportRect.width = w;
    this._viewportRect.height = h;
    this._visibleRect.width = w;
    this._visibleRect.height = h;
    localWinSize.width = this._visibleRect.width;
    localWinSize.height = this._visibleRect.height;

    if (visibleRect) {
      visibleRect.init(this._visibleRect);
    }
  };

  _proto.resizeWithBrowserSize = function resizeWithBrowserSize(enabled) {
    if (enabled) {
      if (!this._resizeWithBrowserSize) {
        this._resizeWithBrowserSize = true;
        jsonAsset.screenAdapter.on('window-resize', this._resizeEvent, this);
        jsonAsset.screenAdapter.on('orientation-change', this._orientationChange, this);
      }
    } else if (this._resizeWithBrowserSize) {
      this._resizeWithBrowserSize = false;
      jsonAsset.screenAdapter.off('window-resize', this._resizeEvent, this);
      jsonAsset.screenAdapter.off('orientation-change', this._orientationChange, this);
    }
  };

  _proto.setResizeCallback = function setResizeCallback(callback) {
    if (typeof callback === 'function' || callback == null) {
      this._resizeCallback = callback;
    }
  };

  _proto.setOrientation = function setOrientation(orientation) {
    orientation &= jsonAsset.legacyCC.macro.ORIENTATION_AUTO;

    if (orientation && this._orientation !== orientation) {
      this._orientation = orientation;
    }
  };

  _proto.adjustViewportMeta = function adjustViewportMeta(enabled) {};

  _proto.enableRetina = function enableRetina(enabled) {
    this._retinaEnabled = !!enabled;
  };

  _proto.isRetinaEnabled = function isRetinaEnabled() {
    return this._retinaEnabled;
  };

  _proto.enableAutoFullScreen = function enableAutoFullScreen(enabled) {
    if (enabled === this._autoFullScreen) {
      return;
    }

    this._autoFullScreen = enabled;

    if (enabled) {
      screen.requestFullScreen()["catch"](function (e) {});
    }
  };

  _proto.isAutoFullScreenEnabled = function isAutoFullScreenEnabled() {
    return this._autoFullScreen;
  };

  _proto.setCanvasSize = function setCanvasSize(width, height) {
    var canvas = jsonAsset.legacyCC.game.canvas;
    var container = jsonAsset.legacyCC.game.container;
    this._devicePixelRatio = window.devicePixelRatio;
    canvas.width = jsonAsset.sys.windowPixelResolution.width;
    canvas.height = jsonAsset.sys.windowPixelResolution.height;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    container.style.width = width + "px";
    container.style.height = height + "px";

    this._resizeEvent();
  };

  _proto.getCanvasSize = function getCanvasSize() {
    return new jsonAsset.Size$1(jsonAsset.legacyCC.game.canvas.width, jsonAsset.legacyCC.game.canvas.height);
  };

  _proto.getFrameSize = function getFrameSize() {
    return new jsonAsset.Size$1(this._frameSize.width, this._frameSize.height);
  };

  _proto.setFrameSize = function setFrameSize(width, height) {
    this._frameSize.width = width;
    this._frameSize.height = height;
    jsonAsset.legacyCC.game.frame.style.width = width + "px";
    jsonAsset.legacyCC.game.frame.style.height = height + "px";

    this._resizeEvent();
  };

  _proto.getVisibleSize = function getVisibleSize() {
    return new jsonAsset.Size$1(this._visibleRect.width, this._visibleRect.height);
  };

  _proto.getVisibleSizeInPixel = function getVisibleSizeInPixel() {
    return new jsonAsset.Size$1(this._visibleRect.width * this._scaleX, this._visibleRect.height * this._scaleY);
  };

  _proto.getVisibleOrigin = function getVisibleOrigin() {
    return new jsonAsset.Vec2(this._visibleRect.x, this._visibleRect.y);
  };

  _proto.getVisibleOriginInPixel = function getVisibleOriginInPixel() {
    return new jsonAsset.Vec2(this._visibleRect.x * this._scaleX, this._visibleRect.y * this._scaleY);
  };

  _proto.getResolutionPolicy = function getResolutionPolicy() {
    return this._resolutionPolicy;
  };

  _proto.setResolutionPolicy = function setResolutionPolicy(resolutionPolicy) {
    if (resolutionPolicy instanceof ResolutionPolicy) {
      this._resolutionPolicy = resolutionPolicy;
    } else {
      var _locPolicy = ResolutionPolicy;

      if (resolutionPolicy === _locPolicy.EXACT_FIT) {
        this._resolutionPolicy = this._rpExactFit;
      }

      if (resolutionPolicy === _locPolicy.SHOW_ALL) {
        this._resolutionPolicy = this._rpShowAll;
      }

      if (resolutionPolicy === _locPolicy.NO_BORDER) {
        this._resolutionPolicy = this._rpNoBorder;
      }

      if (resolutionPolicy === _locPolicy.FIXED_HEIGHT) {
        this._resolutionPolicy = this._rpFixedHeight;
      }

      if (resolutionPolicy === _locPolicy.FIXED_WIDTH) {
        this._resolutionPolicy = this._rpFixedWidth;
      }
    }
  };

  _proto.setDesignResolutionSize = function setDesignResolutionSize(width, height, resolutionPolicy) {
    if (!(width > 0 && height > 0)) {
      jsonAsset.errorID(2200);
      return;
    }

    this.setResolutionPolicy(resolutionPolicy);
    var policy = this._resolutionPolicy;

    if (policy) {
      policy.preApply(this);
    }

    this._orientationChanging = true;

    if (!this._resizing) {
      this._initFrameSize();
    }

    if (!policy) {
      jsonAsset.logID(2201);
      return;
    }

    this._designResolutionSize.width = width;
    this._designResolutionSize.height = height;
    var result = policy.apply(this, this._designResolutionSize);

    if (result.scale && result.scale.length === 2) {
      this._scaleX = result.scale[0];
      this._scaleY = result.scale[1];
    }

    if (result.viewport) {
      var vp = this._viewportRect;
      var vb = this._visibleRect;
      var rv = result.viewport;
      vp.x = rv.x;
      vp.y = rv.y;
      vp.width = rv.width;
      vp.height = rv.height;
      vb.x = 0;
      vb.y = 0;
      vb.width = rv.width / this._scaleX;
      vb.height = rv.height / this._scaleY;
    }

    policy.postApply(this);
    localWinSize.width = this._visibleRect.width;
    localWinSize.height = this._visibleRect.height;

    if (visibleRect) {
      visibleRect.init(this._visibleRect);
    }

    this.emit('design-resolution-changed');
  };

  _proto.getDesignResolutionSize = function getDesignResolutionSize() {
    return new jsonAsset.Size$1(this._designResolutionSize.width, this._designResolutionSize.height);
  };

  _proto.setRealPixelResolution = function setRealPixelResolution(width, height, resolutionPolicy) {
    {
      document.documentElement.style.width = width + "px";
      document.body.style.width = width + "px";
      document.body.style.left = '0px';
      document.body.style.top = '0px';
    }

    this.setDesignResolutionSize(width, height, resolutionPolicy);
  };

  _proto.getViewportRect = function getViewportRect() {
    return this._viewportRect;
  };

  _proto.getScaleX = function getScaleX() {
    return this._scaleX;
  };

  _proto.getScaleY = function getScaleY() {
    return this._scaleY;
  };

  _proto.getDevicePixelRatio = function getDevicePixelRatio() {
    return this._devicePixelRatio;
  };

  _proto.convertToLocationInView = function convertToLocationInView(tx, ty, relatedPos, out) {
    var result = out || new jsonAsset.Vec2();
    var x = this._devicePixelRatio * (tx - relatedPos.left);
    var y = this._devicePixelRatio * (relatedPos.top + relatedPos.height - ty);

    if (this._isRotated) {
      result.x = jsonAsset.legacyCC.game.canvas.width - y;
      result.y = x;
    } else {
      result.x = x;
      result.y = y;
    }

    if (jsonAsset.legacyCC.GAME_VIEW) {
      result.x /= jsonAsset.legacyCC.gameView.canvas.width / jsonAsset.legacyCC.game.canvas.width;
      result.y /= jsonAsset.legacyCC.gameView.canvas.height / jsonAsset.legacyCC.game.canvas.height;
    }

    return result;
  };

  _proto._convertPointWithScale = function _convertPointWithScale(point) {
    var viewport = this._viewportRect;
    point.x = (point.x - viewport.x) / this._scaleX;
    point.y = (point.y - viewport.y) / this._scaleY;
  };

  _proto._resizeEvent = function _resizeEvent() {
    var _this$_resizeCallback;

    var prevFrameW = this._frameSize.width;
    var prevFrameH = this._frameSize.height;
    var prevRotated = this._isRotated;

    if (jsonAsset.legacyCC.sys.isMobile) {
      var containerStyle = jsonAsset.legacyCC.game.container.style;
      var margin = containerStyle.margin;
      containerStyle.margin = '0';
      containerStyle.display = 'none';

      this._initFrameSize();

      containerStyle.margin = margin;
      containerStyle.display = 'block';
    } else {
      this._initFrameSize();
    }

    if ( !this._orientationChanging && this._isRotated === prevRotated && this._frameSize.width === prevFrameW && this._frameSize.height === prevFrameH) {
      return;
    }

    var width = this._designResolutionSize.width;
    var height = this._designResolutionSize.height;
    this._resizing = true;

    if (width > 0) {
      this.setDesignResolutionSize(width, height, this._resolutionPolicy);
    }

    this._resizing = false;
    this.emit('canvas-resize');
    (_this$_resizeCallback = this._resizeCallback) === null || _this$_resizeCallback === void 0 ? void 0 : _this$_resizeCallback.call(this);
  };

  _proto._orientationChange = function _orientationChange() {
    this._orientationChanging = true;

    this._resizeEvent();
  };

  _proto._initFrameSize = function _initFrameSize() {
    var locFrameSize = this._frameSize;
    var windowSize = jsonAsset.screenAdapter.windowSize;
    var w = windowSize.width;
    var h = windowSize.height;
    var isLandscape = w >= h;

    if ( !jsonAsset.legacyCC.sys.isMobile || isLandscape && this._orientation & jsonAsset.legacyCC.macro.ORIENTATION_LANDSCAPE || !isLandscape && this._orientation & jsonAsset.legacyCC.macro.ORIENTATION_PORTRAIT) {
      locFrameSize.width = w;
      locFrameSize.height = h;
      jsonAsset.legacyCC.game.container.style['-webkit-transform'] = 'rotate(0deg)';
      jsonAsset.legacyCC.game.container.style.transform = 'rotate(0deg)';
      this._isRotated = false;
    } else {
      locFrameSize.width = h;
      locFrameSize.height = w;
      jsonAsset.legacyCC.game.container.style['-webkit-transform'] = 'rotate(90deg)';
      jsonAsset.legacyCC.game.container.style.transform = 'rotate(90deg)';
      jsonAsset.legacyCC.game.container.style['-webkit-transform-origin'] = '0px 0px 0px';
      jsonAsset.legacyCC.game.container.style.transformOrigin = '0px 0px 0px';
      this._isRotated = true;
      jsonAsset.legacyCC.game.canvas.style['-webkit-transform'] = 'translateZ(0px)';
      jsonAsset.legacyCC.game.canvas.style.transform = 'translateZ(0px)';
    }

    if (this._orientationChanging) {
      setTimeout(function () {
        jsonAsset.legacyCC.view._orientationChanging = false;
      }, 1000);
    }
  };

  return View;
}(jsonAsset.EventTarget);
View.instance = void 0;

var ContainerStrategy = function () {
  function ContainerStrategy() {
    this.name = 'ContainerStrategy';
  }

  var _proto2 = ContainerStrategy.prototype;

  _proto2.preApply = function preApply(_view) {};

  _proto2.apply = function apply(_view, designedResolution) {};

  _proto2.postApply = function postApply(_view) {};

  _proto2._setupContainer = function _setupContainer(_view, w, h) {
    var locCanvas = jsonAsset.legacyCC.game.canvas;
    var locContainer = jsonAsset.legacyCC.game.container;

    if (jsonAsset.sys.os === jsonAsset.OS.ANDROID || jsonAsset.sys.os === jsonAsset.OS.OHOS) {
      document.body.style.width = (_view._isRotated ? h : w) + "px";
      document.body.style.height = (_view._isRotated ? w : h) + "px";
    }

    locContainer.style.width = locCanvas.style.width = w + "px";
    locContainer.style.height = locCanvas.style.height = h + "px";
    _view._devicePixelRatio = 1;

    if (_view.isRetinaEnabled()) {
      _view._devicePixelRatio = Math.min(_view._maxPixelRatio, window.devicePixelRatio || 1);
    }

    {
      locCanvas.width = w * _view._devicePixelRatio;
      locCanvas.height = h * _view._devicePixelRatio;
    }
  };

  _proto2._fixContainer = function _fixContainer() {
    document.body.insertBefore(jsonAsset.legacyCC.game.container, document.body.firstChild);
    var bs = document.body.style;
    bs.width = window.innerWidth + "px";
    bs.height = window.innerHeight + "px";
    bs.overflow = 'hidden';
    var contStyle = jsonAsset.legacyCC.game.container.style;
    contStyle.position = 'fixed';
    contStyle.left = contStyle.top = '0px';
    document.body.scrollTop = 0;
  };

  return ContainerStrategy;
}();

ContainerStrategy.EQUAL_TO_FRAME = void 0;
ContainerStrategy.PROPORTION_TO_FRAME = void 0;

var ContentStrategy = function () {
  function ContentStrategy() {
    this.name = 'ContentStrategy';
    this._result = void 0;
    this._result = {
      scale: [1, 1],
      viewport: null
    };
  }

  var _proto3 = ContentStrategy.prototype;

  _proto3.preApply = function preApply(_view) {};

  _proto3.apply = function apply(_view, designedResolution) {
    return {
      scale: [1, 1]
    };
  };

  _proto3.postApply = function postApply(_view) {};

  _proto3._buildResult = function _buildResult(containerW, containerH, contentW, contentH, scaleX, scaleY) {
    if (Math.abs(containerW - contentW) < 2) {
      contentW = containerW;
    }

    if (Math.abs(containerH - contentH) < 2) {
      contentH = containerH;
    }

    var viewport = new jsonAsset.Rect$1(Math.round((containerW - contentW) / 2), Math.round((containerH - contentH) / 2), contentW, contentH);
    this._result.scale = [scaleX, scaleY];
    this._result.viewport = viewport;
    return this._result;
  };

  return ContentStrategy;
}();

ContentStrategy.EXACT_FIT = void 0;
ContentStrategy.SHOW_ALL = void 0;
ContentStrategy.NO_BORDER = void 0;
ContentStrategy.FIXED_HEIGHT = void 0;
ContentStrategy.FIXED_WIDTH = void 0;

(function () {
  var EqualToFrame = function (_ContainerStrategy) {
    jsonAsset._inheritsLoose(EqualToFrame, _ContainerStrategy);

    function EqualToFrame() {
      var _this2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2 = _ContainerStrategy.call.apply(_ContainerStrategy, [this].concat(args)) || this;
      _this2.name = 'EqualToFrame';
      return _this2;
    }

    var _proto4 = EqualToFrame.prototype;

    _proto4.apply = function apply(_view) {
      var frameH = _view._frameSize.height;
      var containerStyle = jsonAsset.legacyCC.game.container.style;

      this._setupContainer(_view, _view._frameSize.width, _view._frameSize.height);

      if (_view._isRotated) {
        containerStyle.margin = "0 0 0 " + frameH + "px";
      } else {
        containerStyle.margin = '0px';
      }

      containerStyle.padding = '0px';
    };

    return EqualToFrame;
  }(ContainerStrategy);

  var ProportionalToFrame = function (_ContainerStrategy2) {
    jsonAsset._inheritsLoose(ProportionalToFrame, _ContainerStrategy2);

    function ProportionalToFrame() {
      var _this3;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this3 = _ContainerStrategy2.call.apply(_ContainerStrategy2, [this].concat(args)) || this;
      _this3.name = 'ProportionalToFrame';
      return _this3;
    }

    var _proto5 = ProportionalToFrame.prototype;

    _proto5.apply = function apply(_view, designedResolution) {
      var frameW = _view._frameSize.width;
      var frameH = _view._frameSize.height;
      var containerStyle = jsonAsset.legacyCC.game.container.style;
      var designW = designedResolution.width;
      var designH = designedResolution.height;
      var scaleX = frameW / designW;
      var scaleY = frameH / designH;
      var containerW;
      var containerH;

      if (scaleX < scaleY) {
        containerW = frameW;
        containerH = designH * scaleX;
      } else {
        containerW = designW * scaleY;
        containerH = frameH;
      }

      var offx = Math.round((frameW - containerW) / 2);
      var offy = Math.round((frameH - containerH) / 2);
      containerW = frameW - 2 * offx;
      containerH = frameH - 2 * offy;

      this._setupContainer(_view, containerW, containerH);

      {
        if (_view._isRotated) {
          containerStyle.margin = "0 0 0 " + frameH + "px";
        } else {
          containerStyle.margin = '0px';
        }

        containerStyle.paddingLeft = offx + "px";
        containerStyle.paddingRight = offx + "px";
        containerStyle.paddingTop = offy + "px";
        containerStyle.paddingBottom = offy + "px";
      }
    };

    return ProportionalToFrame;
  }(ContainerStrategy);

  var _global = typeof window === 'undefined' ? global : window;

  var globalAdapter = _global.__globalAdapter;

  if (globalAdapter) {
    if (globalAdapter.adaptContainerStrategy) {
      globalAdapter.adaptContainerStrategy(ContainerStrategy.prototype);
    }

    if (globalAdapter.adaptView) {
      globalAdapter.adaptView(View.prototype);
    }
  }

  ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame();
  ContainerStrategy.PROPORTION_TO_FRAME = new ProportionalToFrame();

  var ExactFit = function (_ContentStrategy) {
    jsonAsset._inheritsLoose(ExactFit, _ContentStrategy);

    function ExactFit() {
      var _this4;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _this4 = _ContentStrategy.call.apply(_ContentStrategy, [this].concat(args)) || this;
      _this4.name = 'ExactFit';
      return _this4;
    }

    var _proto6 = ExactFit.prototype;

    _proto6.apply = function apply(_view, designedResolution) {
      var containerW = jsonAsset.legacyCC.game.canvas.width;
      var containerH = jsonAsset.legacyCC.game.canvas.height;
      var scaleX = containerW / designedResolution.width;
      var scaleY = containerH / designedResolution.height;
      return this._buildResult(containerW, containerH, containerW, containerH, scaleX, scaleY);
    };

    return ExactFit;
  }(ContentStrategy);

  var ShowAll = function (_ContentStrategy2) {
    jsonAsset._inheritsLoose(ShowAll, _ContentStrategy2);

    function ShowAll() {
      var _this5;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      _this5 = _ContentStrategy2.call.apply(_ContentStrategy2, [this].concat(args)) || this;
      _this5.name = 'ShowAll';
      return _this5;
    }

    var _proto7 = ShowAll.prototype;

    _proto7.apply = function apply(_view, designedResolution) {
      var containerW = jsonAsset.legacyCC.game.canvas.width;
      var containerH = jsonAsset.legacyCC.game.canvas.height;
      var designW = designedResolution.width;
      var designH = designedResolution.height;
      var scaleX = containerW / designW;
      var scaleY = containerH / designH;
      var scale = 0;
      var contentW;
      var contentH;

      if (scaleX < scaleY) {
        scale = scaleX;
        contentW = containerW;
        contentH = designH * scale;
      } else {
        scale = scaleY;
        contentW = designW * scale;
        contentH = containerH;
      }

      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    };

    return ShowAll;
  }(ContentStrategy);

  var NoBorder = function (_ContentStrategy3) {
    jsonAsset._inheritsLoose(NoBorder, _ContentStrategy3);

    function NoBorder() {
      var _this6;

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      _this6 = _ContentStrategy3.call.apply(_ContentStrategy3, [this].concat(args)) || this;
      _this6.name = 'NoBorder';
      return _this6;
    }

    var _proto8 = NoBorder.prototype;

    _proto8.apply = function apply(_view, designedResolution) {
      var containerW = jsonAsset.legacyCC.game.canvas.width;
      var containerH = jsonAsset.legacyCC.game.canvas.height;
      var designW = designedResolution.width;
      var designH = designedResolution.height;
      var scaleX = containerW / designW;
      var scaleY = containerH / designH;
      var scale;
      var contentW;
      var contentH;

      if (scaleX < scaleY) {
        scale = scaleY;
        contentW = designW * scale;
        contentH = containerH;
      } else {
        scale = scaleX;
        contentW = containerW;
        contentH = designH * scale;
      }

      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    };

    return NoBorder;
  }(ContentStrategy);

  var FixedHeight = function (_ContentStrategy4) {
    jsonAsset._inheritsLoose(FixedHeight, _ContentStrategy4);

    function FixedHeight() {
      var _this7;

      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      _this7 = _ContentStrategy4.call.apply(_ContentStrategy4, [this].concat(args)) || this;
      _this7.name = 'FixedHeight';
      return _this7;
    }

    var _proto9 = FixedHeight.prototype;

    _proto9.apply = function apply(_view, designedResolution) {
      var containerW = jsonAsset.legacyCC.game.canvas.width;
      var containerH = jsonAsset.legacyCC.game.canvas.height;
      var designH = designedResolution.height;
      var scale = containerH / designH;
      var contentW = containerW;
      var contentH = containerH;
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    };

    return FixedHeight;
  }(ContentStrategy);

  var FixedWidth = function (_ContentStrategy5) {
    jsonAsset._inheritsLoose(FixedWidth, _ContentStrategy5);

    function FixedWidth() {
      var _this8;

      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      _this8 = _ContentStrategy5.call.apply(_ContentStrategy5, [this].concat(args)) || this;
      _this8.name = 'FixedWidth';
      return _this8;
    }

    var _proto10 = FixedWidth.prototype;

    _proto10.apply = function apply(_view, designedResolution) {
      var containerW = jsonAsset.legacyCC.game.canvas.width;
      var containerH = jsonAsset.legacyCC.game.canvas.height;
      var designW = designedResolution.width;
      var scale = containerW / designW;
      var contentW = containerW;
      var contentH = containerH;
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    };

    return FixedWidth;
  }(ContentStrategy);

  ContentStrategy.EXACT_FIT = new ExactFit();
  ContentStrategy.SHOW_ALL = new ShowAll();
  ContentStrategy.NO_BORDER = new NoBorder();
  ContentStrategy.FIXED_HEIGHT = new FixedHeight();
  ContentStrategy.FIXED_WIDTH = new FixedWidth();
})();

var ResolutionPolicy = function () {
  function ResolutionPolicy(containerStg, contentStg) {
    this.name = 'ResolutionPolicy';
    this._containerStrategy = void 0;
    this._contentStrategy = void 0;
    this._containerStrategy = null;
    this._contentStrategy = null;
    this.setContainerStrategy(containerStg);
    this.setContentStrategy(contentStg);
  }

  var _proto11 = ResolutionPolicy.prototype;

  _proto11.preApply = function preApply(_view) {
    this._containerStrategy.preApply(_view);

    this._contentStrategy.preApply(_view);
  };

  _proto11.apply = function apply(_view, designedResolution) {
    this._containerStrategy.apply(_view, designedResolution);

    return this._contentStrategy.apply(_view, designedResolution);
  };

  _proto11.postApply = function postApply(_view) {
    this._containerStrategy.postApply(_view);

    this._contentStrategy.postApply(_view);
  };

  _proto11.setContainerStrategy = function setContainerStrategy(containerStg) {
    if (containerStg instanceof ContainerStrategy) {
      this._containerStrategy = containerStg;
    }
  };

  _proto11.setContentStrategy = function setContentStrategy(contentStg) {
    if (contentStg instanceof ContentStrategy) {
      this._contentStrategy = contentStg;
    }
  };

  jsonAsset._createClass(ResolutionPolicy, [{
    key: "canvasSize",
    get: function get() {
      return new jsonAsset.Vec2(jsonAsset.legacyCC.game.canvas.width, jsonAsset.legacyCC.game.canvas.height);
    }
  }]);

  return ResolutionPolicy;
}();
ResolutionPolicy.EXACT_FIT = 0;
ResolutionPolicy.NO_BORDER = 1;
ResolutionPolicy.SHOW_ALL = 2;
ResolutionPolicy.FIXED_HEIGHT = 3;
ResolutionPolicy.FIXED_WIDTH = 4;
ResolutionPolicy.UNKNOWN = 5;
ResolutionPolicy.ContainerStrategy = ContainerStrategy;
ResolutionPolicy.ContentStrategy = ContentStrategy;
jsonAsset.legacyCC.ResolutionPolicy = ResolutionPolicy;
var view = View.instance = jsonAsset.legacyCC.view = new View();
jsonAsset.legacyCC.winSize = localWinSize;

exports.Camera = Camera;
exports.CameraVisFlags = CameraVisFlags;
exports.ColorTemperatureToRGB = ColorTemperatureToRGB;
exports.DeferredPipeline = DeferredPipeline;
exports.DirectionalLight = DirectionalLight;
exports.EventAcceleration = EventAcceleration;
exports.EventKeyboard = EventKeyboard;
exports.EventMouse = EventMouse;
exports.EventTouch = EventTouch;
exports.ForwardFlow = ForwardFlow;
exports.ForwardPipeline = ForwardPipeline;
exports.ForwardStage = ForwardStage;
exports.Game = Game;
exports.GbufferStage = GbufferStage;
exports.InstancedBuffer = InstancedBuffer;
exports.Light = Light;
exports.LightingStage = LightingStage;
exports.MainFlow = MainFlow;
exports.MaterialInstance = MaterialInstance;
exports.Model = Model;
exports.PassInstance = PassInstance;
exports.PipelineStateManager = PipelineStateManager;
exports.PostprocessStage = PostprocessStage;
exports.RenderFlow = RenderFlow;
exports.RenderPipeline = RenderPipeline;
exports.RenderScene = RenderScene;
exports.RenderStage = RenderStage;
exports.ResolutionPolicy = ResolutionPolicy;
exports.SKYBOX_FLAG = SKYBOX_FLAG;
exports.ShadowFlow = ShadowFlow;
exports.ShadowStage = ShadowStage;
exports.Skybox = Skybox;
exports.SphereLight = SphereLight;
exports.SpotLight = SpotLight;
exports.SubModel = SubModel;
exports.Touch = Touch;
exports.View = View;
exports.VisibilityFlags = VisibilityFlags;
exports.game = game;
exports.inputManager = inputManager;
exports.nt2lm = nt2lm;
exports.screen = screen;
exports.view = view;
exports.visibleRect = visibleRect;
