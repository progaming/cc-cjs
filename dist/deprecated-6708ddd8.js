'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var index = require('./index-04f3192a.js');
var view = require('./view-c0f88f03.js');
require('./texture-buffer-pool-e09c9995.js');
require('./deprecated-024a684c.js');
require('./camera-component-c6f89e45.js');
require('./renderable-component-f3f3ccc0.js');
var spriteFrame = require('./sprite-frame-385ed34c.js');
var sprite = require('./sprite-14580321.js');
var renderable2d = require('./renderable-2d-fa14364b.js');
var graphics = require('./graphics-b8239a5d.js');
var vertexFormat = require('./vertex-format-30c6ba0e.js');
var deprecated = require('./deprecated-50daeaeb.js');

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

var _worldMatrix = new jsonAsset.Mat4();

var _vec2_temp = new jsonAsset.Vec2();

var _mat4_temp = new jsonAsset.Mat4();

var _circlePoints = [];

function _calculateCircle(center, radius, segments) {
  _circlePoints.length = 0;
  var anglePerStep = Math.PI * 2 / segments;

  for (var step = 0; step < segments; ++step) {
    _circlePoints.push(new jsonAsset.Vec3(radius.x * Math.cos(anglePerStep * step) + center.x, radius.y * Math.sin(anglePerStep * step) + center.y, 0));
  }

  return _circlePoints;
}

(function (MaskType) {
  MaskType[MaskType["RECT"] = 0] = "RECT";
  MaskType[MaskType["ELLIPSE"] = 1] = "ELLIPSE";
  MaskType[MaskType["GRAPHICS_STENCIL"] = 2] = "GRAPHICS_STENCIL";
  MaskType[MaskType["IMAGE_STENCIL"] = 3] = "IMAGE_STENCIL";
})(exports.MaskType || (exports.MaskType = {}));

jsonAsset.ccenum(exports.MaskType);
var SEGMENTS_MIN = 3;
var SEGMENTS_MAX = 10000;
var Mask = (_dec = jsonAsset.ccclass('cc.Mask'), _dec2 = jsonAsset.help(), _dec3 = jsonAsset.executionOrder(110), _dec4 = jsonAsset.menu(), _dec5 = jsonAsset.type(exports.MaskType), _dec6 = jsonAsset.displayOrder(), _dec7 = jsonAsset.tooltip(), _dec8 = jsonAsset.displayOrder(), _dec9 = jsonAsset.tooltip(), _dec10 = jsonAsset.visible(), _dec11 = jsonAsset.type(spriteFrame.SpriteFrame), _dec12 = jsonAsset.visible(), _dec13 = jsonAsset.visible(), _dec14 = jsonAsset.range(), _dec15 = jsonAsset.visible(), _dec16 = jsonAsset.visible(), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = function (_Renderable2D) {
  jsonAsset._inheritsLoose(Mask, _Renderable2D);

  jsonAsset._createClass(Mask, [{
    key: "type",
    get: function get() {
      return this._type;
    },
    set: function set(value) {
      if (this._type === value) {
        return;
      }

      this._type = value;
      this.markForUpdateRenderData(false);

      this._updateMaterial();

      if (this._type !== exports.MaskType.IMAGE_STENCIL) {
        this._spriteFrame = null;

        this._updateGraphics();

        if (this._renderData) {
          this.destroyRenderData();
          this._renderData = null;
        }
      } else {
        this._useRenderData();

        if (this._graphics) {
          this._graphics.clear();
        }
      }
    }
  }, {
    key: "inverted",
    get: function get() {
      return this._inverted;
    },
    set: function set(value) {
      this._inverted = value;
      this.stencilStage = renderable2d.Stage.DISABLED;

      if (this._graphics) {
        this._graphics.stencilStage = renderable2d.Stage.DISABLED;
      }
    }
  }, {
    key: "segments",
    get: function get() {
      return this._segments;
    },
    set: function set(value) {
      if (this._segments === value) {
        return;
      }

      this._segments = jsonAsset.clamp(value, SEGMENTS_MIN, SEGMENTS_MAX);

      this._updateGraphics();
    }
  }, {
    key: "spriteFrame",
    get: function get() {
      return this._spriteFrame;
    },
    set: function set(value) {
      if (this._spriteFrame === value) {
        return;
      }

      var lastSp = this._spriteFrame;
      this._spriteFrame = value;

      if (this._type === exports.MaskType.IMAGE_STENCIL) {
        if (!lastSp && value) {
          this.markForUpdateRenderData();
        }
      }
    }
  }, {
    key: "alphaThreshold",
    get: function get() {
      return this._alphaThreshold;
    },
    set: function set(value) {
      if (this._alphaThreshold === value) {
        return;
      }

      this._alphaThreshold = value;

      if (this.type === exports.MaskType.IMAGE_STENCIL && this._graphics) {
        var mat = this._graphics.getMaterialInstance(0);

        mat.setProperty('alphaThreshold', this._alphaThreshold);
      }
    }
  }, {
    key: "graphics",
    get: function get() {
      return this._graphics;
    }
  }, {
    key: "dstBlendFactor",
    get: function get() {
      return this._dstBlendFactor;
    },
    set: function set(value) {
      if (this._dstBlendFactor === value) {
        return;
      }

      this._dstBlendFactor = value;

      this._updateBlendFunc();
    }
  }, {
    key: "srcBlendFactor",
    get: function get() {
      return this._srcBlendFactor;
    },
    set: function set(value) {
      if (this._srcBlendFactor === value) {
        return;
      }

      this._srcBlendFactor = value;

      this._updateBlendFunc();
    }
  }, {
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(value) {
      if (this._color === value) {
        return;
      }

      this._color.set(value);

      this.markForUpdateRenderData();
    }
  }, {
    key: "customMaterial",
    get: function get() {
      return this._customMaterial;
    },
    set: function set(val) {}
  }]);

  function Mask() {
    var _this;

    _this = _Renderable2D.call(this) || this;
    _this._clearStencilMtl = null;
    _this._clearModel = null;

    jsonAsset._initializerDefineProperty(_this, "_type", _descriptor, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_inverted", _descriptor2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_segments", _descriptor3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_spriteFrame", _descriptor4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_alphaThreshold", _descriptor5, jsonAsset._assertThisInitialized(_this));

    _this._graphics = null;
    _this._clearModelMesh = null;
    _this._instanceMaterialType = renderable2d.InstanceMaterialType.ADD_COLOR;
    return _this;
  }

  var _proto = Mask.prototype;

  _proto.onLoad = function onLoad() {
    this._createClearModel();

    this._createGraphics();

    if (this._graphics) {
      this._graphics.onLoad();
    }
  };

  _proto.onEnable = function onEnable() {
    _Renderable2D.prototype.onEnable.call(this);

    this._updateGraphics();
  };

  _proto.onRestore = function onRestore() {
    this._createGraphics();

    _Renderable2D.prototype.updateMaterial.call(this);

    this._updateGraphics();

    this._renderFlag = this._canRender();
  };

  _proto.onDisable = function onDisable() {
    _Renderable2D.prototype.onDisable.call(this);

    this._disableGraphics();
  };

  _proto.onDestroy = function onDestroy() {
    _Renderable2D.prototype.onDestroy.call(this);

    if (this._clearModel && this._clearModelMesh) {
      index.director.root.destroyModel(this._clearModel);

      this._clearModelMesh.destroy();
    }

    if (this._clearStencilMtl) {
      this._clearStencilMtl.destroy();
    }

    this._removeGraphics();
  };

  _proto.isHit = function isHit(cameraPt) {
    var uiTrans = this.node._uiProps.uiTransformComp;
    var size = uiTrans.contentSize;
    var w = size.width;
    var h = size.height;
    var testPt = _vec2_temp;
    this.node.getWorldMatrix(_worldMatrix);
    jsonAsset.Mat4.invert(_mat4_temp, _worldMatrix);
    jsonAsset.Vec2.transformMat4(testPt, cameraPt, _mat4_temp);
    var ap = uiTrans.anchorPoint;
    testPt.x += ap.x * w;
    testPt.y += ap.y * h;
    var result = false;

    if (this.type === exports.MaskType.RECT || this.type === exports.MaskType.GRAPHICS_STENCIL) {
      result = testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h;
    } else if (this.type === exports.MaskType.ELLIPSE) {
      var rx = w / 2;
      var ry = h / 2;
      var px = testPt.x - 0.5 * w;
      var py = testPt.y - 0.5 * h;
      result = px * px / (rx * rx) + py * py / (ry * ry) < 1;
    }

    if (this._inverted) {
      result = !result;
    }

    return result;
  };

  _proto._render = function _render(render) {
    render.commitComp(this, null, this._assembler, null);
  };

  _proto._postRender = function _postRender(render) {
    if (!this._postAssembler) {
      return;
    }

    render.commitComp(this, null, this._postAssembler, null);
  };

  _proto._nodeStateChange = function _nodeStateChange(type) {
    _Renderable2D.prototype._nodeStateChange.call(this, type);

    this._updateGraphics();
  };

  _proto._canRender = function _canRender() {
    if (!_Renderable2D.prototype._canRender.call(this)) {
      return false;
    }

    return this._graphics !== null && (this._type !== exports.MaskType.IMAGE_STENCIL || this._spriteFrame !== null);
  };

  _proto._flushAssembler = function _flushAssembler() {
    var assembler = Mask.Assembler.getAssembler(this);
    var posAssembler = Mask.PostAssembler.getAssembler(this);

    if (this._assembler !== assembler) {
      this.destroyRenderData();
      this._assembler = assembler;
    }

    if (this._postAssembler !== posAssembler) {
      this._postAssembler = posAssembler;
    }

    this._useRenderData();
  };

  _proto._createGraphics = function _createGraphics() {
    if (!this._graphics) {
      var graphics$1 = this._graphics = new graphics.Graphics();
      graphics$1._objFlags |= jsonAsset.CCObject.Flags.IsOnLoadCalled;
      graphics$1.node = this.node;
      graphics$1.node.getWorldMatrix();
      graphics$1.lineWidth = 0;
      var color = jsonAsset.Color$1.WHITE.clone();
      color.a = 0;
      graphics$1.fillColor = color;
    }

    this._updateMaterial();
  };

  _proto._updateGraphics = function _updateGraphics() {
    if (!this._graphics || this._type !== exports.MaskType.RECT && this._type !== exports.MaskType.ELLIPSE) {
      return;
    }

    var uiTrans = this.node._uiProps.uiTransformComp;
    var graphics = this._graphics;
    graphics.clear();
    var size = uiTrans.contentSize;
    var width = size.width;
    var height = size.height;
    var ap = uiTrans.anchorPoint;
    var x = -width * ap.x;
    var y = -height * ap.y;

    if (this._type === exports.MaskType.RECT) {
      graphics.rect(x, y, width, height);
    } else if (this._type === exports.MaskType.ELLIPSE) {
      var center = new jsonAsset.Vec3(x + width / 2, y + height / 2, 0);
      var radius = new jsonAsset.Vec3(width / 2, height / 2, 0);

      var points = _calculateCircle(center, radius, this._segments);

      for (var i = 0; i < points.length; ++i) {
        var point = points[i];

        if (i === 0) {
          graphics.moveTo(point.x, point.y);
        } else {
          graphics.lineTo(point.x, point.y);
        }
      }

      graphics.close();
    }

    graphics.fill();
  };

  _proto._createClearModel = function _createClearModel() {
    if (!this._clearModel) {
      var mtl = jsonAsset.builtinResMgr.get('default-clear-stencil');
      this._clearStencilMtl = new view.MaterialInstance({
        parent: mtl,
        owner: this,
        subModelIdx: 0
      });
      this._clearModel = index.director.root.createModel(view.Model);
      this._clearModel.node = this._clearModel.transform = this.node;
      var stride = vertexFormat.getAttributeStride(vertexFormat.vfmt);
      var gfxDevice = jsonAsset.legacyCC.director.root.device;
      var vertexBuffer = gfxDevice.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.DEVICE, 4 * stride, stride));
      var vb = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
      vertexBuffer.update(vb);
      var indexBuffer = gfxDevice.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.DEVICE, 6 * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));
      var ib = new Uint16Array([0, 1, 2, 2, 1, 3]);
      indexBuffer.update(ib);
      this._clearModelMesh = new jsonAsset.RenderingSubMesh([vertexBuffer], vertexFormat.vfmt, jsonAsset.PrimitiveMode.TRIANGLE_LIST, indexBuffer);
      this._clearModelMesh.subMeshIdx = 0;

      this._clearModel.initSubModel(0, this._clearModelMesh, this._clearStencilMtl);
    }
  };

  _proto._updateMaterial = function _updateMaterial() {
    if (this._graphics) {
      var target = this._graphics;
      target.stencilStage = renderable2d.Stage.DISABLED;
      var mat;

      if (this._type === exports.MaskType.IMAGE_STENCIL) {
        mat = jsonAsset.builtinResMgr.get('ui-alpha-test-material');
        target.setMaterial(mat, 0);
        mat = target.getMaterialInstance(0);
        mat.setProperty('alphaThreshold', this._alphaThreshold);
      } else {
        mat = jsonAsset.builtinResMgr.get('ui-graphics-material');
        target.setMaterial(mat, 0);
        target.getMaterialInstance(0);
      }
    }
  };

  _proto._disableGraphics = function _disableGraphics() {
    if (this._graphics) {
      this._graphics.onDisable();
    }
  };

  _proto._removeGraphics = function _removeGraphics() {
    if (this._graphics) {
      this._graphics.destroy();

      this._graphics._destroyImmediate();

      this._graphics = null;
    }
  };

  _proto._useRenderData = function _useRenderData() {
    if (this._type === exports.MaskType.IMAGE_STENCIL && !this._renderData) {
      if (this._assembler && this._assembler.createData) {
        this._renderData = this._assembler.createData(this);
        this.markForUpdateRenderData();
      }
    }
  };

  return Mask;
}(renderable2d.Renderable2D), _class3.Type = exports.MaskType, _temp), (jsonAsset._applyDecoratedDescriptor(_class2.prototype, "type", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "inverted", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "inverted"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "segments", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "segments"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "alphaThreshold", [_dec13, _dec14, jsonAsset.slide], Object.getOwnPropertyDescriptor(_class2.prototype, "alphaThreshold"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "color", [jsonAsset.override, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "customMaterial", [jsonAsset.override, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "customMaterial"), _class2.prototype), _descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_type", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return exports.MaskType.RECT;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_inverted", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_segments", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 64;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_alphaThreshold", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
})), _class2)) || _class) || _class) || _class) || _class);
jsonAsset.NodeEventProcessor._comp = Mask;
jsonAsset.legacyCC.Mask = Mask;

var eventRegx = /^(click)(\s)*=|(param)(\s)*=/;
var imageAttrReg = /(\s)*src(\s)*=|(\s)*height(\s)*=|(\s)*width(\s)*=|(\s)*align(\s)*=|(\s)*offset(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;
var HtmlTextParser = function () {
  function HtmlTextParser() {
    this._specialSymbolArray = [];
    this._stack = [];
    this._resultObjectArray = [];

    this._specialSymbolArray.push([/&lt;/g, '<']);

    this._specialSymbolArray.push([/&gt;/g, '>']);

    this._specialSymbolArray.push([/&amp;/g, '&']);

    this._specialSymbolArray.push([/&quot;/g, '"']);

    this._specialSymbolArray.push([/&apos;/g, '\'']);
  }

  var _proto = HtmlTextParser.prototype;

  _proto.parse = function parse(htmlString) {
    this._resultObjectArray.length = 0;
    this._stack.length = 0;
    var startIndex = 0;
    var length = htmlString.length;

    while (startIndex < length) {
      var tagEndIndex = htmlString.indexOf('>', startIndex);
      var tagBeginIndex = -1;

      if (tagEndIndex >= 0) {
        tagBeginIndex = htmlString.lastIndexOf('<', tagEndIndex);
        var noTagBegin = tagBeginIndex < startIndex - 1;

        if (noTagBegin) {
          tagBeginIndex = htmlString.indexOf('<', tagEndIndex + 1);
          tagEndIndex = htmlString.indexOf('>', tagBeginIndex + 1);
        }
      }

      if (tagBeginIndex < 0) {
        this._stack.pop();

        this._processResult(htmlString.substring(startIndex));

        startIndex = length;
      } else {
        var newStr = htmlString.substring(startIndex, tagBeginIndex);
        var tagStr = htmlString.substring(tagBeginIndex + 1, tagEndIndex);
        if (tagStr === '') newStr = htmlString.substring(startIndex, tagEndIndex + 1);

        this._processResult(newStr);

        if (tagEndIndex === -1) {
          tagEndIndex = tagBeginIndex;
        } else if (htmlString.charAt(tagBeginIndex + 1) === '/') {
          this._stack.pop();
        } else {
          this._addToStack(tagStr);
        }

        startIndex = tagEndIndex + 1;
      }
    }

    return this._resultObjectArray;
  };

  _proto._attributeToObject = function _attributeToObject(attribute) {
    attribute = attribute.trim();
    var obj = {};
    var header = /^(color|size)(\s)*=/.exec(attribute);
    var tagName = '';
    var nextSpace = 0;
    var eventHanlderString = '';

    if (header) {
      tagName = header[0];
      attribute = attribute.substring(tagName.length).trim();

      if (attribute === '') {
        return obj;
      }

      nextSpace = attribute.indexOf(' ');

      switch (tagName[0]) {
        case 'c':
          if (nextSpace > -1) {
            obj.color = attribute.substring(0, nextSpace).trim();
          } else {
            obj.color = attribute;
          }

          break;

        case 's':
          obj.size = parseInt(attribute);
          break;
      }

      if (nextSpace > -1) {
        eventHanlderString = attribute.substring(nextSpace + 1).trim();
        obj.event = this._processEventHandler(eventHanlderString);
      }

      return obj;
    }

    header = /^(br(\s)*\/)/.exec(attribute);

    if (header && header[0].length > 0) {
      tagName = header[0].trim();

      if (tagName.startsWith('br') && tagName[tagName.length - 1] === '/') {
        obj.isNewLine = true;

        this._resultObjectArray.push({
          text: '',
          style: {
            isNewLine: true
          }
        });

        return obj;
      }
    }

    header = /^(img(\s)*src(\s)*=[^>]+\/)/.exec(attribute);
    var remainingArgument = '';

    if (header && header[0].length > 0) {
      tagName = header[0].trim();

      if (tagName.startsWith('img') && tagName[tagName.length - 1] === '/') {
        header = imageAttrReg.exec(attribute);
        var tagValue;
        var isValidImageTag = false;

        while (header) {
          attribute = attribute.substring(attribute.indexOf(header[0]));
          tagName = attribute.substr(0, header[0].length);
          remainingArgument = attribute.substring(tagName.length).trim();
          nextSpace = remainingArgument.indexOf(' ');
          tagValue = nextSpace > -1 ? remainingArgument.substr(0, nextSpace) : remainingArgument;
          tagName = tagName.replace(/[^a-zA-Z]/g, '').trim();
          tagName = tagName.toLowerCase();
          attribute = remainingArgument.substring(nextSpace).trim();
          if (tagValue.endsWith('/')) tagValue = tagValue.slice(0, -1);

          if (tagName === 'src') {
            switch (tagValue.charCodeAt(0)) {
              case 34:
              case 39:
                isValidImageTag = true;
                tagValue = tagValue.slice(1, -1);
                break;
            }

            obj.isImage = true;
            obj.src = tagValue;
          } else if (tagName === 'height') {
            obj.imageHeight = parseInt(tagValue);
          } else if (tagName === 'width') {
            obj.imageWidth = parseInt(tagValue);
          } else if (tagName === 'align') {
            switch (tagValue.charCodeAt(0)) {
              case 34:
              case 39:
                tagValue = tagValue.slice(1, -1);
                break;
            }

            obj.imageAlign = tagValue.toLowerCase();
          } else if (tagName === 'offset') {
            obj.imageOffset = tagValue;
          } else if (tagName === 'click') {
            obj.event = this._processEventHandler(tagName + "=" + tagValue);
          }

          if (obj.event && tagName === 'param') {
            obj.event[tagName] = tagValue.replace(/^"|"$/g, '');
          }

          header = imageAttrReg.exec(attribute);
        }

        if (isValidImageTag && obj.isImage) {
          this._resultObjectArray.push({
            text: '',
            style: obj
          });
        }

        return {};
      }
    }

    header = /^(outline(\s)*[^>]*)/.exec(attribute);

    if (header) {
      attribute = header[0].substring('outline'.length).trim();
      var defaultOutlineObject = {
        color: '#ffffff',
        width: 1
      };

      if (attribute) {
        var outlineAttrReg = /(\s)*color(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;
        header = outlineAttrReg.exec(attribute);

        var _tagValue;

        while (header) {
          attribute = attribute.substring(attribute.indexOf(header[0]));
          tagName = attribute.substr(0, header[0].length);
          remainingArgument = attribute.substring(tagName.length).trim();
          nextSpace = remainingArgument.indexOf(' ');

          if (nextSpace > -1) {
            _tagValue = remainingArgument.substr(0, nextSpace);
          } else {
            _tagValue = remainingArgument;
          }

          tagName = tagName.replace(/[^a-zA-Z]/g, '').trim();
          tagName = tagName.toLowerCase();
          attribute = remainingArgument.substring(nextSpace).trim();

          if (tagName === 'click') {
            obj.event = this._processEventHandler(tagName + "=" + _tagValue);
          } else if (tagName === 'color') {
            defaultOutlineObject.color = _tagValue;
          } else if (tagName === 'width') {
            defaultOutlineObject.width = parseInt(_tagValue);
          }

          if (obj.event && tagName === 'param') {
            obj.event[tagName] = _tagValue.replace(/^"|"$/g, '');
          }

          header = outlineAttrReg.exec(attribute);
        }
      }

      obj.outline = defaultOutlineObject;
    }

    header = /^(on|u|b|i)(\s)*/.exec(attribute);

    if (header && header[0].length > 0) {
      tagName = header[0];
      attribute = attribute.substring(tagName.length).trim();

      switch (tagName[0]) {
        case 'u':
          obj.underline = true;
          break;

        case 'i':
          obj.italic = true;
          break;

        case 'b':
          obj.bold = true;
          break;
      }

      if (attribute === '') {
        return obj;
      }

      obj.event = this._processEventHandler(attribute);
    }

    return obj;
  };

  _proto._processEventHandler = function _processEventHandler(eventString) {
    var obj = {};
    var index = 0;
    var isValidTag = false;
    var eventNames = eventRegx.exec(eventString);

    while (eventNames) {
      var eventName = eventNames[0];
      var eventValue = '';
      isValidTag = false;
      eventString = eventString.substring(eventName.length).trim();

      if (eventString.charAt(0) === '"') {
        index = eventString.indexOf('"', 1);

        if (index > -1) {
          eventValue = eventString.substring(1, index).trim();
          isValidTag = true;
        }

        index++;
      } else if (eventString.charAt(0) === '\'') {
        index = eventString.indexOf('\'', 1);

        if (index > -1) {
          eventValue = eventString.substring(1, index).trim();
          isValidTag = true;
        }

        index++;
      } else {
        var match = /(\S)+/.exec(eventString);

        if (match) {
          eventValue = match[0];
        } else {
          eventValue = '';
        }

        index = eventValue.length;
      }

      if (isValidTag) {
        eventName = eventName.substring(0, eventName.length - 1).trim();
        obj[eventName] = eventValue;
      }

      eventString = eventString.substring(index).trim();
      eventNames = eventRegx.exec(eventString);
    }

    return obj;
  };

  _proto._addToStack = function _addToStack(attribute) {
    var obj = this._attributeToObject(attribute);

    if (this._stack.length === 0) {
      this._stack.push(obj);
    } else {
      if (obj.isNewLine || obj.isImage) {
        return;
      }

      var previousTagObj = this._stack[this._stack.length - 1];

      for (var key in previousTagObj) {
        if (!obj[key]) {
          obj[key] = previousTagObj[key];
        }
      }

      this._stack.push(obj);
    }
  };

  _proto._processResult = function _processResult(value) {
    if (value.length === 0) {
      return;
    }

    value = this._escapeSpecialSymbol(value);

    if (this._stack.length > 0) {
      this._resultObjectArray.push({
        text: value,
        style: this._stack[this._stack.length - 1]
      });
    } else {
      this._resultObjectArray.push({
        text: value
      });
    }
  };

  _proto._escapeSpecialSymbol = function _escapeSpecialSymbol(str) {
    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._specialSymbolArray), _step; !(_step = _iterator()).done;) {
      var symbolArr = _step.value;
      var key = symbolArr[0];
      var value = symbolArr[1];
      str = str.replace(key, value);
    }

    return str;
  };

  return HtmlTextParser;
}();

var _dec$1, _dec2$1, _dec3$1, _dec4$1, _dec5$1, _dec6$1, _dec7$1, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _temp$1;
var LabelOutline = (_dec$1 = jsonAsset.ccclass('cc.LabelOutline'), _dec2$1 = jsonAsset.help(), _dec3$1 = jsonAsset.executionOrder(110), _dec4$1 = jsonAsset.menu(), _dec5$1 = jsonAsset.requireComponent(sprite.Label), _dec6$1 = jsonAsset.tooltip(), _dec7$1 = jsonAsset.tooltip(), _dec$1(_class$1 = _dec2$1(_class$1 = _dec3$1(_class$1 = _dec4$1(_class$1 = _dec5$1(_class$1 = jsonAsset.executeInEditMode(_class$1 = (_class2$1 = (_temp$1 = function (_Component) {
  jsonAsset._inheritsLoose(LabelOutline, _Component);

  function LabelOutline() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_color", _descriptor$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_width", _descriptor2$1, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = LabelOutline.prototype;

  _proto.onEnable = function onEnable() {
    this._updateRenderData();
  };

  _proto.onDisable = function onDisable() {
    this._updateRenderData();
  };

  _proto._updateRenderData = function _updateRenderData() {
    var label = this.node.getComponent(sprite.Label);

    if (label) {
      label.updateRenderData(true);
    }
  };

  jsonAsset._createClass(LabelOutline, [{
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(value) {
      if (this._color === value) {
        return;
      }

      this._color.set(value);

      this._updateRenderData();
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    },
    set: function set(value) {
      if (this._width === value) {
        return;
      }

      this._width = value;

      this._updateRenderData();
    }
  }]);

  return LabelOutline;
}(jsonAsset.Component), _temp$1), (_descriptor$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_color", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Color$1(0, 0, 0, 255);
  }
}), _descriptor2$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_width", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 2;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "color", [_dec6$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "color"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "width", [_dec7$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "width"), _class2$1.prototype)), _class2$1)) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1);

var _dec$2, _dec2$2, _dec3$2, _dec4$2, _dec5$2, _dec6$2, _dec7$2, _dec8$1, _dec9$1, _dec10$1, _dec11$1, _dec12$1, _dec13$1, _dec14$1, _dec15$1, _dec16$1, _dec17, _dec18, _dec19, _class$2, _class2$2, _descriptor$2, _descriptor2$2, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3$1, _temp$2;

var _htmlTextParser = new HtmlTextParser();

var RichTextChildName = 'RICHTEXT_CHILD';
var RichTextChildImageName = 'RICHTEXT_Image_CHILD';
var labelPool = new jsonAsset.Pool$1(function (seg) {

  if (!jsonAsset.legacyCC.isValid(seg.node)) {
    return false;
  } else {
    var outline = seg.node.getComponent(LabelOutline);

    if (outline) {
      outline.width = 0;
    }
  }

  return true;
}, 20);
var imagePool = new jsonAsset.Pool$1(function (seg) {

  return jsonAsset.legacyCC.isValid(seg.node);
}, 10);

function createSegment(type) {
  return {
    node: new jsonAsset.Node(type),
    comp: null,
    lineCount: 0,
    styleIndex: 0,
    imageOffset: '',
    clickParam: '',
    clickHandler: '',
    type: type
  };
}

function getSegmentByPool(type, content) {
  var seg;

  if (type === RichTextChildName) {
    seg = labelPool._get();
  } else if (type === RichTextChildImageName) {
    seg = imagePool._get();
  }

  seg = seg || createSegment(type);
  var node = seg.node;

  if (!node) {
    node = new jsonAsset.Node(type);
  }

  node.hideFlags |= jsonAsset.CCObject.Flags.DontSave | jsonAsset.CCObject.Flags.HideInHierarchy;

  if (type === RichTextChildImageName) {
    seg.comp = node.getComponent(sprite.Sprite) || node.addComponent(sprite.Sprite);
    seg.comp.spriteFrame = content;
    seg.comp.type = sprite.Sprite.Type.SLICED;
    seg.comp.sizeMode = sprite.Sprite.SizeMode.CUSTOM;
  } else {
    seg.comp = node.getComponent(sprite.Label) || node.addComponent(sprite.Label);
    seg.comp.string = content;
    seg.comp.horizontalAlign = sprite.HorizontalTextAlignment.LEFT;
    seg.comp.verticalAlign = sprite.VerticalTextAlignment.TOP;
  }

  node.setPosition(0, 0, 0);
  var trans = node._uiProps.uiTransformComp;
  trans.setAnchorPoint(0.5, 0.5);
  seg.node = node;
  seg.lineCount = 0;
  seg.styleIndex = 0;
  seg.imageOffset = '';
  seg.clickParam = '';
  seg.clickHandler = '';
  return seg;
}

var RichText = (_dec$2 = jsonAsset.ccclass('cc.RichText'), _dec2$2 = jsonAsset.help(), _dec3$2 = jsonAsset.executionOrder(110), _dec4$2 = jsonAsset.menu(), _dec5$2 = jsonAsset.tooltip(), _dec6$2 = jsonAsset.type(sprite.HorizontalTextAlignment), _dec7$2 = jsonAsset.tooltip(), _dec8$1 = jsonAsset.tooltip(), _dec9$1 = jsonAsset.tooltip(), _dec10$1 = jsonAsset.type(sprite.Font), _dec11$1 = jsonAsset.tooltip(), _dec12$1 = jsonAsset.tooltip(), _dec13$1 = jsonAsset.type(sprite.CacheMode), _dec14$1 = jsonAsset.tooltip(), _dec15$1 = jsonAsset.tooltip(), _dec16$1 = jsonAsset.tooltip(), _dec17 = jsonAsset.type(sprite.SpriteAtlas), _dec18 = jsonAsset.tooltip(), _dec19 = jsonAsset.tooltip(), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$2(_class$2 = _dec4$2(_class$2 = jsonAsset.executeInEditMode(_class$2 = (_class2$2 = (_temp$2 = _class3$1 = function (_UIComponent) {
  jsonAsset._inheritsLoose(RichText, _UIComponent);

  jsonAsset._createClass(RichText, [{
    key: "string",
    get: function get() {
      return this._string;
    },
    set: function set(value) {
      if (this._string === value) {
        return;
      }

      this._string = value;

      this._updateRichTextStatus();
    }
  }, {
    key: "horizontalAlign",
    get: function get() {
      return this._horizontalAlign;
    },
    set: function set(value) {
      if (this.horizontalAlign === value) {
        return;
      }

      this._horizontalAlign = value;
      this._layoutDirty = true;

      this._updateRichTextStatus();
    }
  }, {
    key: "fontSize",
    get: function get() {
      return this._fontSize;
    },
    set: function set(value) {
      if (this._fontSize === value) {
        return;
      }

      this._fontSize = value;
      this._layoutDirty = true;

      this._updateRichTextStatus();
    }
  }, {
    key: "fontFamily",
    get: function get() {
      return this._fontFamily;
    },
    set: function set(value) {
      if (this._fontFamily === value) return;
      this._fontFamily = value;
      this._layoutDirty = true;

      this._updateRichTextStatus();
    }
  }, {
    key: "font",
    get: function get() {
      return this._font;
    },
    set: function set(value) {
      if (this._font === value) {
        return;
      }

      this._font = value;
      this._layoutDirty = true;

      if (this._font) {

        this.useSystemFont = false;

        this._onTTFLoaded();
      } else {
        this.useSystemFont = true;
      }

      this._updateRichTextStatus();
    }
  }, {
    key: "useSystemFont",
    get: function get() {
      return this._isSystemFontUsed;
    },
    set: function set(value) {
      if (this._isSystemFontUsed === value) {
        return;
      }

      this._isSystemFontUsed = value;

      this._layoutDirty = true;

      this._updateRichTextStatus();
    }
  }, {
    key: "cacheMode",
    get: function get() {
      return this._cacheMode;
    },
    set: function set(value) {
      if (this._cacheMode === value) {
        return;
      }

      this._cacheMode = value;

      this._updateRichTextStatus();
    }
  }, {
    key: "maxWidth",
    get: function get() {
      return this._maxWidth;
    },
    set: function set(value) {
      if (this._maxWidth === value) {
        return;
      }

      this._maxWidth = value;
      this._layoutDirty = true;

      this._updateRichTextStatus();
    }
  }, {
    key: "lineHeight",
    get: function get() {
      return this._lineHeight;
    },
    set: function set(value) {
      if (this._lineHeight === value) {
        return;
      }

      this._lineHeight = value;
      this._layoutDirty = true;

      this._updateRichTextStatus();
    }
  }, {
    key: "imageAtlas",
    get: function get() {
      return this._imageAtlas;
    },
    set: function set(value) {
      if (this._imageAtlas === value) {
        return;
      }

      this._imageAtlas = value;
      this._layoutDirty = true;

      this._updateRichTextStatus();
    }
  }, {
    key: "handleTouchEvent",
    get: function get() {
      return this._handleTouchEvent;
    },
    set: function set(value) {
      if (this._handleTouchEvent === value) {
        return;
      }

      this._handleTouchEvent = value;

      if (this.enabledInHierarchy) {
        if (this.handleTouchEvent) {
          this._addEventListeners();
        } else {
          this._removeEventListeners();
        }
      }
    }
  }]);

  function RichText() {
    var _this;

    _this = _UIComponent.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_lineHeight", _descriptor$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_string", _descriptor2$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_horizontalAlign", _descriptor3$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_fontSize", _descriptor4$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_maxWidth", _descriptor5$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_fontFamily", _descriptor6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_font", _descriptor7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_isSystemFontUsed", _descriptor8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_userDefinedFont", _descriptor9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_cacheMode", _descriptor10, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_imageAtlas", _descriptor11, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_handleTouchEvent", _descriptor12, jsonAsset._assertThisInitialized(_this));

    _this._textArray = [];
    _this._segments = [];
    _this._labelSegmentsCache = [];
    _this._linesWidth = [];
    _this._lineCount = 1;
    _this._labelWidth = 0;
    _this._labelHeight = 0;
    _this._layoutDirty = true;
    _this._lineOffsetX = 0;
    _this._updateRichTextStatus = void 0;

    _this._updateRichTextStatus = _this._updateRichText;
    return _this;
  }

  var _proto = RichText.prototype;

  _proto.onLoad = function onLoad() {
    this.node.on(jsonAsset.NodeEventType.LAYER_CHANGED, this._applyLayer, this);
  };

  _proto.onEnable = function onEnable() {
    if (this.handleTouchEvent) {
      this._addEventListeners();
    }

    this._updateRichText();

    this._activateChildren(true);
  };

  _proto.onDisable = function onDisable() {
    if (this.handleTouchEvent) {
      this._removeEventListeners();
    }

    this._activateChildren(false);
  };

  _proto.start = function start() {
    this._onTTFLoaded();

    this.node.on(jsonAsset.NodeEventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
  };

  _proto.onRestore = function onRestore() {
    {
      return;
    }
  };

  _proto.onDestroy = function onDestroy() {
    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._segments), _step; !(_step = _iterator()).done;) {
      var seg = _step.value;
      seg.node.removeFromParent();

      if (seg.type === RichTextChildName) {
        labelPool.put(seg);
      } else if (seg.type === RichTextChildImageName) {
        imagePool.put(seg);
      }
    }

    this.node.off(jsonAsset.NodeEventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
    this.node.off(jsonAsset.NodeEventType.LAYER_CHANGED, this._applyLayer, this);
  };

  _proto._addEventListeners = function _addEventListeners() {
    this.node.on(jsonAsset.NodeEventType.TOUCH_END, this._onTouchEnded, this);
  };

  _proto._removeEventListeners = function _removeEventListeners() {
    this.node.off(jsonAsset.NodeEventType.TOUCH_END, this._onTouchEnded, this);
  };

  _proto._updateLabelSegmentTextAttributes = function _updateLabelSegmentTextAttributes() {
    var _this2 = this;

    this._segments.forEach(function (item) {
      _this2._applyTextAttribute(item);
    });
  };

  _proto._createFontLabel = function _createFontLabel(str) {
    return getSegmentByPool(RichTextChildName, str);
  };

  _proto._createImage = function _createImage(spriteFrame) {
    return getSegmentByPool(RichTextChildImageName, spriteFrame);
  };

  _proto._onTTFLoaded = function _onTTFLoaded() {
    if (this._font instanceof sprite.TTFFont) {
      this._layoutDirty = true;

      this._updateRichText();
    } else {
      this._layoutDirty = true;

      this._updateRichText();
    }
  };

  _proto._measureText = function _measureText(styleIndex, string) {
    var _this3 = this;

    var func = function func(s) {
      var label;

      if (_this3._labelSegmentsCache.length === 0) {
        label = _this3._createFontLabel(s);

        _this3._labelSegmentsCache.push(label);
      } else {
        label = _this3._labelSegmentsCache[0];
        label.node.getComponent(sprite.Label).string = s;
      }

      label.styleIndex = styleIndex;

      _this3._applyTextAttribute(label);

      var labelSize = label.node._uiProps.uiTransformComp.contentSize;
      return labelSize.width;
    };

    if (string) {
      return func(string);
    } else {
      return func;
    }
  };

  _proto._onTouchEnded = function _onTouchEnded(event) {
    var _this4 = this;

    var components = this.node.getComponents(jsonAsset.Component);

    var _loop = function _loop() {
      var seg = _step2.value;
      var clickHandler = seg.clickHandler;
      var clickParam = seg.clickParam;

      if (clickHandler && _this4._containsTouchLocation(seg, event.touch.getUILocation())) {
        components.forEach(function (component) {
          var func = component[clickHandler];

          if (component.enabledInHierarchy && func) {
            func.call(component, event, clickParam);
          }
        });
        event.propagationStopped = true;
      }
    };

    for (var _iterator2 = jsonAsset._createForOfIteratorHelperLoose(this._segments), _step2; !(_step2 = _iterator2()).done;) {
      _loop();
    }
  };

  _proto._containsTouchLocation = function _containsTouchLocation(label, point) {
    var comp = label.node.getComponent(renderable2d.UITransform);

    if (!comp) {
      return false;
    }

    var myRect = comp.getBoundingBoxToWorld();
    return myRect.contains(point);
  };

  _proto._resetState = function _resetState() {
    var children = this.node.children;

    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];

      if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
        if (child.parent === this.node) {
          child.parent = null;
        } else {
          children.splice(i, 1);
        }

        var segment = createSegment(child.name);
        segment.node = child;

        if (child.name === RichTextChildName) {
          segment.comp = child.getComponent(sprite.Label);
          labelPool.put(segment);
        } else {
          segment.comp = child.getComponent(sprite.Sprite);
          imagePool.put(segment);
        }
      }
    }

    children.length = 0;
    this._segments.length = 0;
    this._labelSegmentsCache.length = 0;
    this._linesWidth.length = 0;
    this._lineOffsetX = 0;
    this._lineCount = 1;
    this._labelWidth = 0;
    this._labelHeight = 0;
    this._layoutDirty = true;
  };

  _proto._activateChildren = function _activateChildren(active) {
    for (var i = this.node.children.length - 1; i >= 0; i--) {
      var child = this.node.children[i];

      if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
        child.active = active;
      }
    }
  };

  _proto._addLabelSegment = function _addLabelSegment(stringToken, styleIndex) {
    var labelSegment;

    if (this._labelSegmentsCache.length === 0) {
      labelSegment = this._createFontLabel(stringToken);
    } else {
      labelSegment = this._labelSegmentsCache.pop();
      var label = labelSegment.node.getComponent(sprite.Label);

      if (label) {
        label.string = stringToken;
      }
    }

    labelSegment.styleIndex = styleIndex;
    labelSegment.lineCount = this._lineCount;

    labelSegment.node._uiProps.uiTransformComp.setAnchorPoint(0, 0);

    labelSegment.node.layer = this.node.layer;

    this._applyTextAttribute(labelSegment);

    this.node.addChild(labelSegment.node);

    this._segments.push(labelSegment);

    return labelSegment;
  };

  _proto._updateRichTextWithMaxWidth = function _updateRichTextWithMaxWidth(labelString, labelWidth, styleIndex) {
    var fragmentWidth = labelWidth;
    var labelSegment;

    if (this._lineOffsetX > 0 && fragmentWidth + this._lineOffsetX > this._maxWidth) {
      var checkStartIndex = 0;

      while (this._lineOffsetX <= this._maxWidth) {
        var checkEndIndex = this._getFirstWordLen(labelString, checkStartIndex, labelString.length);

        var checkString = labelString.substr(checkStartIndex, checkEndIndex);

        var checkStringWidth = this._measureText(styleIndex, checkString);

        if (this._lineOffsetX + checkStringWidth <= this._maxWidth) {
          this._lineOffsetX += checkStringWidth;
          checkStartIndex += checkEndIndex;
        } else {
          if (checkStartIndex > 0) {
            var remainingString = labelString.substr(0, checkStartIndex);

            this._addLabelSegment(remainingString, styleIndex);

            labelString = labelString.substr(checkStartIndex, labelString.length);
            fragmentWidth = this._measureText(styleIndex, labelString);
          }

          this._updateLineInfo();

          break;
        }
      }
    }

    if (fragmentWidth > this._maxWidth) {
      var fragments = sprite.fragmentText(labelString, fragmentWidth, this._maxWidth, this._measureText(styleIndex));

      for (var k = 0; k < fragments.length; ++k) {
        var splitString = fragments[k];
        labelSegment = this._addLabelSegment(splitString, styleIndex);
        var labelSize = labelSegment.node._uiProps.uiTransformComp.contentSize;
        this._lineOffsetX += labelSize.width;

        if (fragments.length > 1 && k < fragments.length - 1) {
          this._updateLineInfo();
        }
      }
    } else {
      this._lineOffsetX += fragmentWidth;

      this._addLabelSegment(labelString, styleIndex);
    }
  };

  _proto._isLastComponentCR = function _isLastComponentCR(stringToken) {
    return stringToken.length - 1 === stringToken.lastIndexOf('\n');
  };

  _proto._updateLineInfo = function _updateLineInfo() {
    this._linesWidth.push(this._lineOffsetX);

    this._lineOffsetX = 0;
    this._lineCount++;
  };

  _proto._needsUpdateTextLayout = function _needsUpdateTextLayout(newTextArray) {
    if (this._layoutDirty || !this._textArray || !newTextArray) {
      return true;
    }

    if (this._textArray.length !== newTextArray.length) {
      return true;
    }

    for (var i = 0; i < this._textArray.length; i++) {
      var oldItem = this._textArray[i];
      var newItem = newTextArray[i];

      if (oldItem.text !== newItem.text) {
        return true;
      } else {
        var oldStyle = oldItem.style;
        var newStyle = newItem.style;

        if (oldStyle) {
          if (newStyle) {
            if (!!newStyle.outline !== !!oldStyle.outline) {
              return true;
            }

            if (oldStyle.size !== newStyle.size || oldStyle.italic !== newStyle.italic || oldStyle.isImage !== newStyle.isImage) {
              return true;
            }

            if (oldStyle.src !== newStyle.src || oldStyle.imageAlign !== newStyle.imageAlign || oldStyle.imageHeight !== newStyle.imageHeight || oldStyle.imageWidth !== newStyle.imageWidth || oldStyle.imageOffset !== newStyle.imageOffset) {
              return true;
            }
          } else if (oldStyle.size || oldStyle.italic || oldStyle.isImage || oldStyle.outline) {
            return true;
          }
        } else if (newStyle) {
          if (newStyle.size || newStyle.italic || newStyle.isImage || newStyle.outline) {
            return true;
          }
        }
      }
    }

    return false;
  };

  _proto._addRichTextImageElement = function _addRichTextImageElement(richTextElement) {
    if (!richTextElement.style) {
      return;
    }

    var style = richTextElement.style;
    var spriteFrameName = style.src;

    var spriteFrame = this._imageAtlas && spriteFrameName && this._imageAtlas.getSpriteFrame(spriteFrameName);

    if (!spriteFrame) {
      jsonAsset.warnID(4400);
    } else {
      var segment = this._createImage(spriteFrame);

      var sprite = segment.comp;

      switch (style.imageAlign) {
        case 'top':
          segment.node._uiProps.uiTransformComp.setAnchorPoint(0, 1);

          break;

        case 'center':
          segment.node._uiProps.uiTransformComp.setAnchorPoint(0, 0.5);

          break;

        default:
          segment.node._uiProps.uiTransformComp.setAnchorPoint(0, 0);

          break;
      }

      segment.node.layer = this.node.layer;
      this.node.addChild(segment.node);

      this._segments.push(segment);

      var spriteRect = spriteFrame.rect.clone();
      var scaleFactor = 1;
      var spriteWidth = spriteRect.width;
      var spriteHeight = spriteRect.height;
      var expectWidth = style.imageWidth || 0;
      var expectHeight = style.imageHeight || 0;

      if (expectHeight > 0) {
        scaleFactor = expectHeight / spriteHeight;
        spriteWidth *= scaleFactor;
        spriteHeight *= scaleFactor;
      } else {
        scaleFactor = this._lineHeight / spriteHeight;
        spriteWidth *= scaleFactor;
        spriteHeight *= scaleFactor;
      }

      if (expectWidth > 0) {
        spriteWidth = expectWidth;
      }

      if (this._maxWidth > 0) {
        if (this._lineOffsetX + spriteWidth > this._maxWidth) {
          this._updateLineInfo();
        }

        this._lineOffsetX += spriteWidth;
      } else {
        this._lineOffsetX += spriteWidth;

        if (this._lineOffsetX > this._labelWidth) {
          this._labelWidth = this._lineOffsetX;
        }
      }

      segment.node._uiProps.uiTransformComp.setContentSize(spriteWidth, spriteHeight);

      segment.lineCount = this._lineCount;
      segment.clickHandler = '';
      segment.clickParam = '';
      var event = style.event;

      if (event) {
        segment.clickHandler = event.click;
        segment.clickParam = event.param;
      }
    }
  };

  _proto._updateRichText = function _updateRichText() {
    if (!this.enabledInHierarchy) {
      return;
    }

    var newTextArray = _htmlTextParser.parse(this._string);

    if (!this._needsUpdateTextLayout(newTextArray)) {
      this._textArray = newTextArray.slice();

      this._updateLabelSegmentTextAttributes();

      return;
    }

    this._textArray = newTextArray.slice();

    this._resetState();

    var lastEmptyLine = false;
    var label;

    for (var i = 0; i < this._textArray.length; ++i) {
      var richTextElement = this._textArray[i];
      var text = richTextElement.text;

      if (text === undefined) {
        continue;
      }

      if (text === '') {
        if (richTextElement.style && richTextElement.style.isNewLine) {
          this._updateLineInfo();

          continue;
        }

        if (richTextElement.style && richTextElement.style.isImage && this._imageAtlas) {
          this._addRichTextImageElement(richTextElement);

          continue;
        }
      }

      var multilineTexts = text.split('\n');

      for (var j = 0; j < multilineTexts.length; ++j) {
        var labelString = multilineTexts[j];

        if (labelString === '') {
          if (this._isLastComponentCR(text) && j === multilineTexts.length - 1) {
            continue;
          }

          this._updateLineInfo();

          lastEmptyLine = true;
          continue;
        }

        lastEmptyLine = false;

        if (this._maxWidth > 0) {
          var labelWidth = this._measureText(i, labelString);

          this._updateRichTextWithMaxWidth(labelString, labelWidth, i);

          if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
            this._updateLineInfo();
          }
        } else {
          label = this._addLabelSegment(labelString, i);
          this._lineOffsetX += label.node._uiProps.uiTransformComp.width;

          if (this._lineOffsetX > this._labelWidth) {
            this._labelWidth = this._lineOffsetX;
          }

          if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
            this._updateLineInfo();
          }
        }
      }
    }

    if (!lastEmptyLine) {
      this._linesWidth.push(this._lineOffsetX);
    }

    if (this._maxWidth > 0) {
      this._labelWidth = this._maxWidth;
    }

    this._labelHeight = (this._lineCount + sprite.BASELINE_RATIO) * this._lineHeight;

    this.node._uiProps.uiTransformComp.setContentSize(this._labelWidth, this._labelHeight);

    this._updateRichTextPosition();

    this._layoutDirty = false;
  };

  _proto._getFirstWordLen = function _getFirstWordLen(text, startIndex, textLen) {
    var character = text.charAt(startIndex);

    if (sprite.isUnicodeCJK(character) || sprite.isUnicodeSpace(character)) {
      return 1;
    }

    var len = 1;

    for (var index = startIndex + 1; index < textLen; ++index) {
      character = text.charAt(index);

      if (sprite.isUnicodeSpace(character) || sprite.isUnicodeCJK(character)) {
        break;
      }

      len++;
    }

    return len;
  };

  _proto._updateRichTextPosition = function _updateRichTextPosition() {
    var nextTokenX = 0;
    var nextLineIndex = 1;
    var totalLineCount = this._lineCount;
    var trans = this.node._uiProps.uiTransformComp;
    var anchorX = trans.anchorX;
    var anchorY = trans.anchorY;

    for (var i = 0; i < this._segments.length; ++i) {
      var segment = this._segments[i];
      var lineCount = segment.lineCount;

      if (lineCount > nextLineIndex) {
        nextTokenX = 0;
        nextLineIndex = lineCount;
      }

      var lineOffsetX = this._labelWidth * (this._horizontalAlign * 0.5 - anchorX);

      switch (this._horizontalAlign) {
        case sprite.HorizontalTextAlignment.LEFT:
          break;

        case sprite.HorizontalTextAlignment.CENTER:
          lineOffsetX -= this._linesWidth[lineCount - 1] / 2;
          break;

        case sprite.HorizontalTextAlignment.RIGHT:
          lineOffsetX -= this._linesWidth[lineCount - 1];
          break;
      }

      var pos = segment.node.position;
      segment.node.setPosition(nextTokenX + lineOffsetX, this._lineHeight * (totalLineCount - lineCount) - this._labelHeight * anchorY, pos.z);

      if (lineCount === nextLineIndex) {
        nextTokenX += segment.node._uiProps.uiTransformComp.width;
      }

      var sprite$1 = segment.node.getComponent(sprite.Sprite);

      if (sprite$1) {
        var position = segment.node.position.clone();
        var lineHeightSet = this._lineHeight;
        var lineHeightReal = this._lineHeight * (1 + sprite.BASELINE_RATIO);

        switch (segment.node._uiProps.uiTransformComp.anchorY) {
          case 1:
            position.y += lineHeightSet + (lineHeightReal - lineHeightSet) / 2;
            break;

          case 0.5:
            position.y += lineHeightReal / 2;
            break;

          default:
            position.y += (lineHeightReal - lineHeightSet) / 2;
            break;
        }

        if (segment.imageOffset) {
          var offsets = segment.imageOffset.split(',');

          if (offsets.length === 1 && offsets[0]) {
            var offsetY = parseFloat(offsets[0]);
            if (Number.isInteger(offsetY)) position.y += offsetY;
          } else if (offsets.length === 2) {
            var offsetX = parseFloat(offsets[0]);

            var _offsetY = parseFloat(offsets[1]);

            if (Number.isInteger(offsetX)) position.x += offsetX;
            if (Number.isInteger(_offsetY)) position.y += _offsetY;
          }
        }

        segment.node.position = position;
      }

      var outline = segment.node.getComponent(LabelOutline);

      if (outline) {
        var _position = segment.node.position.clone();

        _position.y -= outline.width;
        segment.node.position = _position;
      }
    }
  };

  _proto._convertLiteralColorValue = function _convertLiteralColorValue(color) {
    var colorValue = color.toUpperCase();

    if (jsonAsset.Color$1[colorValue]) {
      var colorUse = jsonAsset.Color$1[colorValue];
      return colorUse;
    } else {
      var out = new jsonAsset.Color$1();
      return out.fromHEX(color);
    }
  };

  _proto._applyTextAttribute = function _applyTextAttribute(labelSeg) {
    var label = labelSeg.node.getComponent(sprite.Label);

    if (!label) {
      return;
    }

    var index = labelSeg.styleIndex;
    var textStyle;

    if (this._textArray[index]) {
      textStyle = this._textArray[index].style;
    }

    if (textStyle) {
      label.color = this._convertLiteralColorValue(textStyle.color || 'white');
      label.isBold = !!textStyle.bold;
      label.isItalic = !!textStyle.italic;
      label.isUnderline = !!textStyle.underline;

      if (textStyle.outline) {
        var labelOutline = labelSeg.node.getComponent(LabelOutline);

        if (!labelOutline) {
          labelOutline = labelSeg.node.addComponent(LabelOutline);
        }

        labelOutline.color = this._convertLiteralColorValue(textStyle.outline.color);
        labelOutline.width = textStyle.outline.width;
      }

      label.fontSize = textStyle.size || this._fontSize;
      labelSeg.clickHandler = '';
      labelSeg.clickParam = '';
      var event = textStyle.event;

      if (event) {
        labelSeg.clickHandler = event.click || '';
        labelSeg.clickParam = event.param || '';
      }
    } else {
      label.fontSize = this._fontSize;
    }

    label.cacheMode = this._cacheMode;
    var isAsset = this._font instanceof sprite.Font;

    if (isAsset && !this._isSystemFontUsed) {
      label.font = this._font;
    } else {
      label.fontFamily = this._fontFamily;
    }

    label.useSystemFont = this._isSystemFontUsed;
    label.lineHeight = this._lineHeight;
    label.updateRenderData(true);
    var assembler = label._assembler;

    if (assembler) {
      assembler.updateRenderData(label);
    }
  };

  _proto._applyLayer = function _applyLayer() {
    for (var _iterator3 = jsonAsset._createForOfIteratorHelperLoose(this._segments), _step3; !(_step3 = _iterator3()).done;) {
      var seg = _step3.value;
      seg.node.layer = this.node.layer;
    }
  };

  return RichText;
}(deprecated.UIComponent), _class3$1.HorizontalAlign = sprite.HorizontalTextAlignment, _class3$1.VerticalAlign = sprite.VerticalTextAlignment, _temp$2), (jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "string", [jsonAsset.multiline, _dec5$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "string"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "horizontalAlign", [_dec6$2, _dec7$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "horizontalAlign"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "fontSize", [_dec8$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "fontSize"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "fontFamily", [_dec9$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "fontFamily"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "font", [_dec10$1, _dec11$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "font"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "useSystemFont", [_dec12$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "useSystemFont"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "cacheMode", [_dec13$1, _dec14$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "cacheMode"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "maxWidth", [_dec15$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "maxWidth"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "lineHeight", [_dec16$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "lineHeight"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "imageAtlas", [_dec17, _dec18], Object.getOwnPropertyDescriptor(_class2$2.prototype, "imageAtlas"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "handleTouchEvent", [_dec19], Object.getOwnPropertyDescriptor(_class2$2.prototype, "handleTouchEvent"), _class2$2.prototype), _descriptor$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_lineHeight", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 40;
  }
}), _descriptor2$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_string", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '<color=#00ff00>Rich</color><color=#0fffff>Text</color>';
  }
}), _descriptor3$1 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_horizontalAlign", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return sprite.HorizontalTextAlignment.LEFT;
  }
}), _descriptor4$1 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_fontSize", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 40;
  }
}), _descriptor5$1 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_maxWidth", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_fontFamily", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'Arial';
  }
}), _descriptor7 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_font", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor8 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_isSystemFontUsed", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor9 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_userDefinedFont", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor10 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_cacheMode", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return sprite.CacheMode.NONE;
  }
}), _descriptor11 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_imageAtlas", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor12 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_handleTouchEvent", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2$2)) || _class$2) || _class$2) || _class$2) || _class$2) || _class$2);

var _dec$3, _dec2$3, _dec3$3, _dec4$3, _class$3, _temp$3;
var UIMeshRenderer = (_dec$3 = jsonAsset.ccclass('cc.UIMeshRenderer'), _dec2$3 = jsonAsset.help(), _dec3$3 = jsonAsset.executionOrder(110), _dec4$3 = jsonAsset.menu(), _dec$3(_class$3 = _dec2$3(_class$3 = _dec3$3(_class$3 = _dec4$3(_class$3 = (_temp$3 = function (_UIComponent) {
  jsonAsset._inheritsLoose(UIMeshRenderer, _UIComponent);

  function UIMeshRenderer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _UIComponent.call.apply(_UIComponent, [this].concat(args)) || this;
    _this._models = null;
    _this._modelComponent = null;
    return _this;
  }

  var _proto = UIMeshRenderer.prototype;

  _proto.onLoad = function onLoad() {
    if (!this.node._uiProps.uiTransformComp) {
      this.node.addComponent('cc.UITransform');
    }

    this._modelComponent = this.getComponent('cc.RenderableComponent');

    if (!this._modelComponent) {
      console.warn("node '" + (this.node && this.node.name) + "' doesn't have any renderable component");
      return;
    }

    this._models = this._modelComponent._collectModels();
  };

  _proto.onEnable = function onEnable() {
    _UIComponent.prototype.onEnable.call(this);
  };

  _proto.onDisable = function onDisable() {
    _UIComponent.prototype.onDisable.call(this);
  };

  _proto.onDestroy = function onDestroy() {
    _UIComponent.prototype.onDestroy.call(this);

    this._modelComponent = this.getComponent('cc.RenderableComponent');

    if (!this._modelComponent) {
      return;
    }

    this._modelComponent._sceneGetter = null;
    this._models = null;
  };

  _proto.updateAssembler = function updateAssembler(render) {
    if (this._models) {
      this._modelComponent._detachFromScene();

      for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(this._models), _step; !(_step = _iterator()).done;) {
        var m = _step.value;
        render.commitModel.call(render, this, m, this._modelComponent.material);
      }

      return true;
    }

    return false;
  };

  _proto.update = function update() {
    this._fitUIRenderQueue();
  };

  _proto._fitUIRenderQueue = function _fitUIRenderQueue() {
    if (!this._modelComponent) {
      return;
    }

    var matNum = this._modelComponent.sharedMaterials.length;

    for (var i = 0; i < matNum; i++) {
      var material = this._modelComponent.getMaterialInstance(i);

      if (material == null) {
        continue;
      }

      var passes = material.passes;
      var passNum = passes.length;

      for (var j = 0; j < passNum; j++) {
        var pass = passes[j];
        pass._priority = jsonAsset.RenderPriority.MAX - 11;

        if (!pass.blendState.targets[0].blend) {
          material.overridePipelineStates({
            blendState: {
              targets: [{
                blend: true
              }]
            }
          }, j);
        }
      }
    }
  };

  jsonAsset._createClass(UIMeshRenderer, [{
    key: "modelComponent",
    get: function get() {
      return this._modelComponent;
    }
  }]);

  return UIMeshRenderer;
}(deprecated.UIComponent), _temp$3)) || _class$3) || _class$3) || _class$3) || _class$3);

var MeshBuffer = function () {
  jsonAsset._createClass(MeshBuffer, [{
    key: "attributes",
    get: function get() {
      return this._attributes;
    }
  }, {
    key: "vertexBuffers",
    get: function get() {
      return this._vertexBuffers;
    }
  }, {
    key: "indexBuffer",
    get: function get() {
      return this._indexBuffer;
    }
  }]);

  function MeshBuffer(batcher) {
    this.vData = null;
    this.iData = null;
    this.byteStart = 0;
    this.byteOffset = 0;
    this.indicesStart = 0;
    this.indicesOffset = 0;
    this.vertexStart = 0;
    this.vertexOffset = 0;
    this.lastByteOffset = 1;
    this._attributes = null;
    this._vertexBuffers = [];
    this._indexBuffer = null;
    this._iaInfo = null;
    this._batcher = void 0;
    this._dirty = false;
    this._vertexFormatBytes = 0;
    this._initVDataCount = 0;
    this._initIDataCount = 256 * 6;
    this._outOfCallback = null;
    this._hInputAssemblers = [];
    this._nextFreeIAHandle = 0;
    this._batcher = batcher;
  }

  var _proto = MeshBuffer.prototype;

  _proto.initialize = function initialize(attrs, outOfCallback) {
    this._outOfCallback = outOfCallback;
    var formatBytes = vertexFormat.getComponentPerVertex(attrs);
    this._vertexFormatBytes = formatBytes * Float32Array.BYTES_PER_ELEMENT;
    this._initVDataCount = 256 * this._vertexFormatBytes;
    var vbStride = Float32Array.BYTES_PER_ELEMENT * formatBytes;

    if (!this.vertexBuffers.length) {
      this.vertexBuffers.push(this._batcher.device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, vbStride, vbStride)));
    }

    var ibStride = Uint16Array.BYTES_PER_ELEMENT;

    if (!this.indexBuffer) {
      this._indexBuffer = this._batcher.device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, ibStride, ibStride));
    }

    this._attributes = attrs;
    this._iaInfo = new jsonAsset.InputAssemblerInfo(this.attributes, this.vertexBuffers, this.indexBuffer);

    if (!this.vData || !this.iData) {
      this._reallocBuffer();
    }
  };

  _proto.request = function request(vertexCount, indicesCount) {
    if (vertexCount === void 0) {
      vertexCount = 4;
    }

    if (indicesCount === void 0) {
      indicesCount = 6;
    }

    this.lastByteOffset = this.byteOffset;
    var byteOffset = this.byteOffset + vertexCount * this._vertexFormatBytes;
    var indicesOffset = this.indicesOffset + indicesCount;

    if (vertexCount + this.vertexOffset > 65535) {
      if (this._outOfCallback) {
        this._outOfCallback.call(this._batcher, vertexCount, indicesCount);
      }

      return false;
    }

    var byteLength = this.vData.byteLength;
    var indicesLength = this.iData.length;

    if (byteOffset > byteLength || indicesOffset > indicesLength) {
      while (byteLength < byteOffset || indicesLength < indicesOffset) {
        this._initVDataCount *= 2;
        this._initIDataCount *= 2;
        byteLength = this._initVDataCount * 4;
        indicesLength = this._initIDataCount;
      }

      this._reallocBuffer();
    }

    this.vertexOffset += vertexCount;
    this.indicesOffset += indicesCount;
    this.byteOffset = byteOffset;
    this._dirty = true;
    return true;
  };

  _proto.reset = function reset() {
    this.byteStart = 0;
    this.byteOffset = 0;
    this.indicesStart = 0;
    this.indicesOffset = 0;
    this.vertexStart = 0;
    this.vertexOffset = 0;
    this.lastByteOffset = 0;
    this._nextFreeIAHandle = 0;
    this._dirty = false;
  };

  _proto.destroy = function destroy() {
    this._attributes = null;
    this.vertexBuffers[0].destroy();
    this.vertexBuffers.length = 0;
    this.indexBuffer.destroy();
    this._indexBuffer = null;

    for (var i = 0; i < this._hInputAssemblers.length; i++) {
      this._hInputAssemblers[i].destroy();
    }

    this._hInputAssemblers.length = 0;
  };

  _proto.recordBatch = function recordBatch() {
    var vCount = this.indicesOffset - this.indicesStart;

    if (!vCount) {
      return null;
    }

    if (this._hInputAssemblers.length <= this._nextFreeIAHandle) {
      this._hInputAssemblers.push(this._batcher.device.createInputAssembler(this._iaInfo));
    }

    var ia = this._hInputAssemblers[this._nextFreeIAHandle++];
    ia.firstIndex = this.indicesStart;
    ia.indexCount = vCount;
    return ia;
  };

  _proto.uploadBuffers = function uploadBuffers() {
    if (this.byteOffset === 0 || !this._dirty) {
      return;
    }

    var verticesData = new Float32Array(this.vData.buffer, 0, this.byteOffset >> 2);
    var indicesData = new Uint16Array(this.iData.buffer, 0, this.indicesOffset);

    if (this.byteOffset > this.vertexBuffers[0].size) {
      this.vertexBuffers[0].resize(this.byteOffset);
    }

    this.vertexBuffers[0].update(verticesData);

    if (this.indicesOffset * 2 > this.indexBuffer.size) {
      this.indexBuffer.resize(this.indicesOffset * 2);
    }

    this.indexBuffer.update(indicesData);
    this._dirty = false;
  };

  _proto._reallocBuffer = function _reallocBuffer() {
    this._reallocVData(true);

    this._reallocIData(true);
  };

  _proto._reallocVData = function _reallocVData(copyOldData) {
    var oldVData;

    if (this.vData) {
      oldVData = new Uint8Array(this.vData.buffer);
    }

    this.vData = new Float32Array(this._initVDataCount);

    if (oldVData && copyOldData) {
      var newData = new Uint8Array(this.vData.buffer);

      for (var i = 0, l = oldVData.length; i < l; i++) {
        newData[i] = oldVData[i];
      }
    }
  };

  _proto._reallocIData = function _reallocIData(copyOldData) {
    var oldIData = this.iData;
    this.iData = new Uint16Array(this._initIDataCount);

    if (oldIData && copyOldData) {
      var iData = this.iData;

      for (var i = 0, l = oldIData.length; i < l; i++) {
        iData[i] = oldIData[i];
      }
    }
  };

  jsonAsset._createClass(MeshBuffer, [{
    key: "vertexFormatBytes",
    get: function get() {
      return this._vertexFormatBytes;
    }
  }]);

  return MeshBuffer;
}();
MeshBuffer.OPACITY_OFFSET = 8;

var UI_VIS_FLAG = jsonAsset.Layers.Enum.NONE | jsonAsset.Layers.Enum.UI_3D;
var DrawBatch2D = function () {
  jsonAsset._createClass(DrawBatch2D, [{
    key: "native",
    get: function get() {
      return this._nativeObj;
    }
  }, {
    key: "inputAssembler",
    get: function get() {
      return this._inputAssember;
    },
    set: function set(ia) {
      this._inputAssember = ia;
    }
  }, {
    key: "descriptorSet",
    get: function get() {
      return this._descriptorSet;
    },
    set: function set(ds) {
      this._descriptorSet = ds;
    }
  }, {
    key: "visFlags",
    get: function get() {
      return this._visFlags;
    },
    set: function set(vis) {
      this._visFlags = vis;
    }
  }, {
    key: "passes",
    get: function get() {
      return this._passes;
    }
  }, {
    key: "shaders",
    get: function get() {
      return this._shaders;
    }
  }]);

  function DrawBatch2D() {
    this.bufferBatch = null;
    this.camera = null;
    this.renderScene = null;
    this.model = null;
    this.texture = null;
    this.sampler = null;
    this.useLocalData = null;
    this.isStatic = false;
    this.textureHash = 0;
    this.samplerHash = 0;
    this._passes = [];
    this._shaders = [];
    this._visFlags = UI_VIS_FLAG;
    this._inputAssember = null;
    this._descriptorSet = null;
  }

  var _proto = DrawBatch2D.prototype;

  _proto.destroy = function destroy(ui) {
    this._passes = [];
  };

  _proto.clear = function clear() {
    this.bufferBatch = null;
    this.inputAssembler = null;
    this.descriptorSet = null;
    this.camera = null;
    this.texture = null;
    this.sampler = null;
    this.model = null;
    this.isStatic = false;
    this.useLocalData = null;
    this.visFlags = UI_VIS_FLAG;
    this.renderScene = null;
  };

  _proto.fillPasses = function fillPasses(mat, dss, dssHash, bs, bsHash, patches) {
    if (mat) {
      var passes = mat.passes;

      if (!passes) {
        return;
      }

      var hashFactor = 0;
      this._shaders.length = passes.length;

      for (var i = 0; i < passes.length; i++) {
        if (!this._passes[i]) {
          this._passes[i] = new jsonAsset.Pass(jsonAsset.legacyCC.director.root);
        }

        var mtlPass = passes[i];
        var passInUse = this._passes[i];
        mtlPass.update();

        if (mtlPass.hash === passInUse.hash) {
          continue;
        }

        if (!dss) {
          dss = mtlPass.depthStencilState;
          dssHash = 0;
        }

        if (!bs) {
          bs = mtlPass.blendState;
          bsHash = 0;
        }

        if (bsHash === -1) {
          bsHash = 0;
        }

        hashFactor = dssHash << 16 | bsHash;

        passInUse._initPassFromTarget(mtlPass, dss, bs, hashFactor);

        this._shaders[i] = passInUse.getShaderVariant();
      }
    }
  };

  return DrawBatch2D;
}();

var _dec$4, _dec2$4, _dec3$4, _dec4$4, _dec5$3, _class$4, _class2$3, _temp$4;
var UIStaticBatch = (_dec$4 = jsonAsset.ccclass('cc.UIStaticBatch'), _dec2$4 = jsonAsset.help(), _dec3$4 = jsonAsset.menu(), _dec4$4 = jsonAsset.executionOrder(110), _dec5$3 = jsonAsset.visible(), _dec$4(_class$4 = _dec2$4(_class$4 = _dec3$4(_class$4 = _dec4$4(_class$4 = (_class2$3 = (_temp$4 = function (_Renderable2D) {
  jsonAsset._inheritsLoose(UIStaticBatch, _Renderable2D);

  function UIStaticBatch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Renderable2D.call.apply(_Renderable2D, [this].concat(args)) || this;
    _this._init = false;
    _this._meshBuffer = null;
    _this._dirty = true;
    _this._lastMeshBuffer = null;
    _this._uiDrawBatchList = [];
    return _this;
  }

  var _proto = UIStaticBatch.prototype;

  _proto.onLoad = function onLoad() {
    var ui = this._getBatcher();

    if (!ui) {
      return;
    }

    var attr = vertexFormat.vfmtPosUvColor;
    var buffer = new MeshBuffer(ui);
    buffer.initialize(attr, this._arrivalMaxBuffer.bind(this));
    this._meshBuffer = buffer;
  };

  _proto.onDestroy = function onDestroy() {
    _Renderable2D.prototype.onDestroy.call(this);

    this._clearData();

    if (this._meshBuffer) {
      this._meshBuffer.destroy();

      this._meshBuffer = null;
    }
  };

  _proto.updateAssembler = function updateAssembler(render) {
    render.currIsStatic = true;

    if (this._dirty) {
      render.finishMergeBatches();
      this._lastMeshBuffer = render.currBufferBatch;
      render.currBufferBatch = this._meshBuffer;
      render.currStaticRoot = this;
    }

    if (this._init) {
      render.finishMergeBatches();
      render.commitStaticBatch(this);
    }
  };

  _proto.postUpdateAssembler = function postUpdateAssembler(render) {
    if (this._dirty) {
      render.finishMergeBatches();
      render.currBufferBatch = this._lastMeshBuffer;
      render.currStaticRoot = null;
      this._dirty = false;
      this._init = true;
      this.node._static = true;

      this._meshBuffer.uploadBuffers();
    }

    render.currIsStatic = false;
  };

  _proto.markAsDirty = function markAsDirty() {
    if (!this._getBatcher()) {
      return;
    }

    this.node._static = false;
    this._dirty = true;
    this._init = false;

    this._clearData();
  };

  _proto._requireDrawBatch = function _requireDrawBatch() {
    var batch = new DrawBatch2D();
    batch.isStatic = true;

    this._uiDrawBatchList.push(batch);

    return batch;
  };

  _proto._clearData = function _clearData() {
    if (this._meshBuffer) {
      this._meshBuffer.reset();

      var ui = this._getBatcher();

      for (var i = 0; i < this._uiDrawBatchList.length; i++) {
        var element = this._uiDrawBatchList[i];
        element.destroy(ui);
      }
    }

    this._uiDrawBatchList.length = 0;
    this._init = false;
  };

  _proto._getBatcher = function _getBatcher() {
    if (index.director.root && index.director.root.batcher2D) {
      return index.director.root.batcher2D;
    }

    jsonAsset.warnID(9301);
    return null;
  };

  _proto._arrivalMaxBuffer = function _arrivalMaxBuffer() {
    var ui = this._getBatcher();

    if (ui) {
      ui.autoMergeBatches();
    }

    jsonAsset.warnID(9300);
  };

  jsonAsset._createClass(UIStaticBatch, [{
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(value) {
      if (this._color === value) {
        return;
      }

      this._color.set(value);
    }
  }, {
    key: "drawBatchList",
    get: function get() {
      return this._uiDrawBatchList;
    }
  }]);

  return UIStaticBatch;
}(renderable2d.Renderable2D), _temp$4), (jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "color", [jsonAsset.override, _dec5$3], Object.getOwnPropertyDescriptor(_class2$3.prototype, "color"), _class2$3.prototype)), _class2$3)) || _class$4) || _class$4) || _class$4) || _class$4);

var _dec$5, _dec2$5, _dec3$5, _dec4$5, _dec5$4, _dec6$3, _dec7$3, _dec8$2, _class$5, _class2$4, _descriptor$3, _descriptor2$3, _descriptor3$2, _temp$5;
var LabelShadow = (_dec$5 = jsonAsset.ccclass('cc.LabelShadow'), _dec2$5 = jsonAsset.help(), _dec3$5 = jsonAsset.executionOrder(110), _dec4$5 = jsonAsset.menu(), _dec5$4 = jsonAsset.requireComponent(sprite.Label), _dec6$3 = jsonAsset.tooltip(), _dec7$3 = jsonAsset.tooltip(), _dec8$2 = jsonAsset.tooltip(), _dec$5(_class$5 = _dec2$5(_class$5 = _dec3$5(_class$5 = _dec4$5(_class$5 = _dec5$4(_class$5 = jsonAsset.executeInEditMode(_class$5 = (_class2$4 = (_temp$5 = function (_Component) {
  jsonAsset._inheritsLoose(LabelShadow, _Component);

  function LabelShadow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_color", _descriptor$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_offset", _descriptor2$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_blur", _descriptor3$2, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = LabelShadow.prototype;

  _proto.onEnable = function onEnable() {
    this._updateRenderData();
  };

  _proto.onDisable = function onDisable() {
    this._updateRenderData();
  };

  _proto._updateRenderData = function _updateRenderData() {
    var label = this.node.getComponent(sprite.Label);

    if (label) {
      label.updateRenderData(true);
    }
  };

  jsonAsset._createClass(LabelShadow, [{
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(value) {
      if (this._color === value) {
        return;
      }

      this._color.set(value);

      this._updateRenderData();
    }
  }, {
    key: "offset",
    get: function get() {
      return this._offset;
    },
    set: function set(value) {
      this._offset = value;

      this._updateRenderData();
    }
  }, {
    key: "blur",
    get: function get() {
      return this._blur;
    },
    set: function set(value) {
      this._blur = value;

      this._updateRenderData();
    }
  }]);

  return LabelShadow;
}(jsonAsset.Component), _temp$5), (_descriptor$3 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_color", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Color$1(0, 0, 0, 255);
  }
}), _descriptor2$3 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_offset", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2(2, 2);
  }
}), _descriptor3$2 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_blur", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 2;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "color", [_dec6$3], Object.getOwnPropertyDescriptor(_class2$4.prototype, "color"), _class2$4.prototype), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "offset", [_dec7$3], Object.getOwnPropertyDescriptor(_class2$4.prototype, "offset"), _class2$4.prototype), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "blur", [_dec8$2], Object.getOwnPropertyDescriptor(_class2$4.prototype, "blur"), _class2$4.prototype)), _class2$4)) || _class$5) || _class$5) || _class$5) || _class$5) || _class$5) || _class$5);

var _dec$6, _dec2$6, _dec3$6, _dec4$6, _class$6, _class2$5, _descriptor$4, _temp$6;
var UIOpacity = (_dec$6 = jsonAsset.ccclass('cc.UIOpacity'), _dec2$6 = jsonAsset.help(), _dec3$6 = jsonAsset.executionOrder(110), _dec4$6 = jsonAsset.menu(), _dec$6(_class$6 = _dec2$6(_class$6 = _dec3$6(_class$6 = _dec4$6(_class$6 = jsonAsset.executeInEditMode(_class$6 = (_class2$5 = (_temp$6 = function (_Component) {
  jsonAsset._inheritsLoose(UIOpacity, _Component);

  function UIOpacity() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_opacity", _descriptor$4, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = UIOpacity.prototype;

  _proto.onEnable = function onEnable() {
    this.node._uiProps.localOpacity = this._opacity / 255;
  };

  _proto.onDisable = function onDisable() {
    this.node._uiProps.localOpacity = 1;
  };

  jsonAsset._createClass(UIOpacity, [{
    key: "opacity",
    get: function get() {
      return this._opacity;
    },
    set: function set(value) {
      if (this._opacity === value) {
        return;
      }

      value = jsonAsset.clampf(value, 0, 255);
      this._opacity = value;
      this.node._uiProps.localOpacity = value / 255;
    }
  }]);

  return UIOpacity;
}(jsonAsset.Component), _temp$6), (jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "opacity", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2$5.prototype, "opacity"), _class2$5.prototype), _descriptor$4 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "_opacity", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 255;
  }
})), _class2$5)) || _class$6) || _class$6) || _class$6) || _class$6) || _class$6);

jsonAsset.legacyCC.MaskComponent = Mask;
jsonAsset.js$1.setClassAlias(Mask, 'cc.MaskComponent');
jsonAsset.legacyCC.LabelComponent = sprite.Label;
jsonAsset.js$1.setClassAlias(sprite.Label, 'cc.LabelComponent');
jsonAsset.legacyCC.LabelOutlineComponent = LabelOutline;
jsonAsset.js$1.setClassAlias(LabelOutline, 'cc.LabelOutlineComponent');
jsonAsset.legacyCC.RichTextComponent = RichText;
jsonAsset.js$1.setClassAlias(RichText, 'cc.RichTextComponent');
jsonAsset.legacyCC.SpriteComponent = sprite.Sprite;
jsonAsset.js$1.setClassAlias(sprite.Sprite, 'cc.SpriteComponent');
jsonAsset.legacyCC.UIModelComponent = UIMeshRenderer;
jsonAsset.js$1.setClassAlias(UIMeshRenderer, 'cc.UIModelComponent');
jsonAsset.legacyCC.GraphicsComponent = graphics.Graphics;
jsonAsset.js$1.setClassAlias(graphics.Graphics, 'cc.GraphicsComponent');
jsonAsset.js$1.setClassAlias(UIStaticBatch, 'cc.UIStaticBatchComponent');
jsonAsset.js$1.setClassAlias(UIOpacity, 'cc.UIOpacityComponent');

exports.DrawBatch2D = DrawBatch2D;
exports.HtmlTextParser = HtmlTextParser;
exports.LabelOutline = LabelOutline;
exports.LabelShadow = LabelShadow;
exports.Mask = Mask;
exports.MeshBuffer = MeshBuffer;
exports.RichText = RichText;
exports.UIMeshRenderer = UIMeshRenderer;
exports.UIOpacity = UIOpacity;
exports.UIStaticBatch = UIStaticBatch;
