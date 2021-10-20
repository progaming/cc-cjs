'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsonAsset = require('./json-asset-ae61ceca.js');
var index$3 = require('./index-04f3192a.js');
var view = require('./view-c0f88f03.js');
var textureBufferPool = require('./texture-buffer-pool-e09c9995.js');
var deprecated = require('./deprecated-024a684c.js');
var cameraComponent = require('./camera-component-c6f89e45.js');
var renderableComponent = require('./renderable-component-f3f3ccc0.js');
var transformUtils = require('./transform-utils-3cfb96de.js');

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Pool: jsonAsset.Pool,
    RecyclePool: jsonAsset.RecyclePool,
    CachedArray: jsonAsset.CachedArray
});

jsonAsset.legacyCC.log = jsonAsset.log;
jsonAsset.legacyCC.warn = jsonAsset.warn;
jsonAsset.legacyCC.error = jsonAsset.error;
jsonAsset.legacyCC.assert = jsonAsset.assert;
jsonAsset.legacyCC._throw = jsonAsset._throw;
jsonAsset.legacyCC.logID = jsonAsset.logID;
jsonAsset.legacyCC.warnID = jsonAsset.warnID;
jsonAsset.legacyCC.errorID = jsonAsset.errorID;
jsonAsset.legacyCC.assertID = jsonAsset.assertID;
jsonAsset.legacyCC.debug = jsonAsset.debug;
jsonAsset.legacyCC.path = {
  join: jsonAsset.join,
  extname: jsonAsset.extname,
  mainFileName: jsonAsset.mainFileName,
  basename: jsonAsset.basename,
  dirname: jsonAsset.dirname,
  changeExtname: jsonAsset.changeExtname,
  changeBasename: jsonAsset.changeBasename,
  _normalize: jsonAsset._normalize,
  stripSep: jsonAsset.stripSep,

  get sep() {
    return jsonAsset.getSeperator();
  }

};

var _stageOffset = 0;
var _name2stageID = {};
var config = {
  addStage: function addStage(name) {
    if (_name2stageID[name] !== undefined) {
      return;
    }

    var stageID = 1 << _stageOffset;
    _name2stageID[name] = stageID;
    _stageOffset += 1;
  },
  stageID: function stageID(name) {
    var id = _name2stageID[name];

    if (id === undefined) {
      return -1;
    }

    return id;
  },
  stageIDs: function stageIDs(nameList) {
    var key = 0;

    for (var _iterator = jsonAsset._createForOfIteratorHelperLoose(nameList), _step; !(_step = _iterator()).done;) {
      var name = _step.value;
      var id = _name2stageID[name];

      if (id !== undefined) {
        key |= id;
      }
    }

    return key;
  }
};

var NativeNode = null;
var NativeScene = null;
var NativeAABB = null;
var NativeModel = null;
var NativeSkinningModel = null;
var NativeBakedAnimInfo = null;
var NativeBakedJointInfo = null;
var NativeBakedSkinningModel = null;
var NativeLight = null;
var NativeDirectionalLight = null;
var NativeSphereLight = null;
var NativeSpotLight = null;
var NaitveSkybox = null;
var NativeFog = null;
var NativeRenderWindow = null;
var NativeCamera = null;
var NativePass = null;
var NativeSubModel = null;
var NativeDrawBatch2D = null;
var NativeRenderScene = null;
var NativeAmbient = null;
var NativeShadow = null;
var NativeRoot = null;
var NativeJointTransform = null;
var NativeJointInfo = null;
var NativePipelineSharedSceneData = null;

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DescriptorSet: jsonAsset.DescriptorSet,
    Buffer: jsonAsset.Buffer,
    CommandBuffer: jsonAsset.CommandBuffer,
    get ObjectType () { return jsonAsset.ObjectType; },
    get Status () { return jsonAsset.Status; },
    get API () { return jsonAsset.API; },
    get SurfaceTransform () { return jsonAsset.SurfaceTransform; },
    get Feature () { return jsonAsset.Feature; },
    get Format () { return jsonAsset.Format; },
    get FormatType () { return jsonAsset.FormatType; },
    get Type () { return jsonAsset.Type; },
    get BufferUsageBit () { return jsonAsset.BufferUsageBit; },
    get BufferFlagBit () { return jsonAsset.BufferFlagBit; },
    get MemoryAccessBit () { return jsonAsset.MemoryAccessBit; },
    get MemoryUsageBit () { return jsonAsset.MemoryUsageBit; },
    get TextureType () { return jsonAsset.TextureType; },
    get TextureUsageBit () { return jsonAsset.TextureUsageBit; },
    get TextureFlagBit () { return jsonAsset.TextureFlagBit; },
    get SampleCount () { return jsonAsset.SampleCount; },
    get Filter () { return jsonAsset.Filter; },
    get Address () { return jsonAsset.Address; },
    get ComparisonFunc () { return jsonAsset.ComparisonFunc; },
    get StencilOp () { return jsonAsset.StencilOp; },
    get BlendFactor () { return jsonAsset.BlendFactor; },
    get BlendOp () { return jsonAsset.BlendOp; },
    get ColorMask () { return jsonAsset.ColorMask; },
    get ShaderStageFlagBit () { return jsonAsset.ShaderStageFlagBit; },
    get LoadOp () { return jsonAsset.LoadOp; },
    get StoreOp () { return jsonAsset.StoreOp; },
    get AccessType () { return jsonAsset.AccessType; },
    get ResolveMode () { return jsonAsset.ResolveMode; },
    get PipelineBindPoint () { return jsonAsset.PipelineBindPoint; },
    get PrimitiveMode () { return jsonAsset.PrimitiveMode; },
    get PolygonMode () { return jsonAsset.PolygonMode; },
    get ShadeModel () { return jsonAsset.ShadeModel; },
    get CullMode () { return jsonAsset.CullMode; },
    get DynamicStateFlagBit () { return jsonAsset.DynamicStateFlagBit; },
    get StencilFace () { return jsonAsset.StencilFace; },
    get DescriptorType () { return jsonAsset.DescriptorType; },
    get QueueType () { return jsonAsset.QueueType; },
    get CommandBufferType () { return jsonAsset.CommandBufferType; },
    get ClearFlagBit () { return jsonAsset.ClearFlagBit; },
    Size: jsonAsset.Size,
    DeviceCaps: jsonAsset.DeviceCaps,
    Offset: jsonAsset.Offset,
    Rect: jsonAsset.Rect,
    Extent: jsonAsset.Extent,
    TextureSubresLayers: jsonAsset.TextureSubresLayers,
    TextureSubresRange: jsonAsset.TextureSubresRange,
    TextureCopy: jsonAsset.TextureCopy,
    TextureBlit: jsonAsset.TextureBlit,
    BufferTextureCopy: jsonAsset.BufferTextureCopy,
    Viewport: jsonAsset.Viewport,
    Color: jsonAsset.Color,
    BindingMappingInfo: jsonAsset.BindingMappingInfo,
    BufferInfo: jsonAsset.BufferInfo,
    BufferViewInfo: jsonAsset.BufferViewInfo,
    DrawInfo: jsonAsset.DrawInfo,
    DispatchInfo: jsonAsset.DispatchInfo,
    IndirectBuffer: jsonAsset.IndirectBuffer,
    TextureInfo: jsonAsset.TextureInfo,
    TextureViewInfo: jsonAsset.TextureViewInfo,
    SamplerInfo: jsonAsset.SamplerInfo,
    Uniform: jsonAsset.Uniform,
    UniformBlock: jsonAsset.UniformBlock,
    UniformSamplerTexture: jsonAsset.UniformSamplerTexture,
    UniformSampler: jsonAsset.UniformSampler,
    UniformTexture: jsonAsset.UniformTexture,
    UniformStorageImage: jsonAsset.UniformStorageImage,
    UniformStorageBuffer: jsonAsset.UniformStorageBuffer,
    UniformInputAttachment: jsonAsset.UniformInputAttachment,
    ShaderStage: jsonAsset.ShaderStage,
    Attribute: jsonAsset.Attribute,
    ShaderInfo: jsonAsset.ShaderInfo,
    InputAssemblerInfo: jsonAsset.InputAssemblerInfo,
    ColorAttachment: jsonAsset.ColorAttachment,
    DepthStencilAttachment: jsonAsset.DepthStencilAttachment,
    SubpassInfo: jsonAsset.SubpassInfo,
    SubpassDependency: jsonAsset.SubpassDependency,
    RenderPassInfo: jsonAsset.RenderPassInfo,
    GlobalBarrierInfo: jsonAsset.GlobalBarrierInfo,
    TextureBarrierInfo: jsonAsset.TextureBarrierInfo,
    FramebufferInfo: jsonAsset.FramebufferInfo,
    DescriptorSetLayoutBinding: jsonAsset.DescriptorSetLayoutBinding,
    DescriptorSetLayoutInfo: jsonAsset.DescriptorSetLayoutInfo,
    DescriptorSetInfo: jsonAsset.DescriptorSetInfo,
    PipelineLayoutInfo: jsonAsset.PipelineLayoutInfo,
    InputState: jsonAsset.InputState,
    CommandBufferInfo: jsonAsset.CommandBufferInfo,
    QueueInfo: jsonAsset.QueueInfo,
    FormatInfo: jsonAsset.FormatInfo,
    MemoryStatus: jsonAsset.MemoryStatus,
    DynamicStencilStates: jsonAsset.DynamicStencilStates,
    DynamicStates: jsonAsset.DynamicStates,
    Obj: jsonAsset.Obj,
    DeviceInfo: jsonAsset.DeviceInfo,
    get AttributeName () { return jsonAsset.AttributeName; },
    FormatInfos: jsonAsset.FormatInfos,
    DESCRIPTOR_BUFFER_TYPE: jsonAsset.DESCRIPTOR_BUFFER_TYPE,
    DESCRIPTOR_SAMPLER_TYPE: jsonAsset.DESCRIPTOR_SAMPLER_TYPE,
    DESCRIPTOR_DYNAMIC_TYPE: jsonAsset.DESCRIPTOR_DYNAMIC_TYPE,
    DRAW_INFO_SIZE: jsonAsset.DRAW_INFO_SIZE,
    IsPowerOf2: jsonAsset.IsPowerOf2,
    FormatSize: jsonAsset.FormatSize,
    FormatSurfaceSize: jsonAsset.FormatSurfaceSize,
    GetTypeSize: jsonAsset.GetTypeSize,
    getTypedArrayConstructor: jsonAsset.getTypedArrayConstructor,
    Device: jsonAsset.Device,
    Framebuffer: jsonAsset.Framebuffer,
    InputAssembler: jsonAsset.InputAssembler,
    DescriptorSetLayout: jsonAsset.DescriptorSetLayout,
    PipelineLayout: jsonAsset.PipelineLayout,
    RasterizerState: jsonAsset.RasterizerState,
    DepthStencilState: jsonAsset.DepthStencilState,
    BlendTarget: jsonAsset.BlendTarget,
    BlendState: jsonAsset.BlendState,
    PipelineStateInfo: jsonAsset.PipelineStateInfo,
    PipelineState: jsonAsset.PipelineState,
    Queue: jsonAsset.Queue,
    RenderPass: jsonAsset.RenderPass,
    Sampler: jsonAsset.Sampler,
    Shader: jsonAsset.Shader,
    Texture: jsonAsset.Texture,
    GlobalBarrier: jsonAsset.GlobalBarrier,
    TextureBarrier: jsonAsset.TextureBarrier
});

var sMetadataTag = Symbol('cc:SerializationMetadata');
function getSerializationMetadata(constructor) {
  return constructor[sMetadataTag];
}

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Ambient: jsonAsset.Ambient,
    get CameraFOVAxis () { return view.CameraFOVAxis; },
    get CameraProjection () { return view.CameraProjection; },
    get CameraAperture () { return view.CameraAperture; },
    get CameraISO () { return view.CameraISO; },
    get CameraShutter () { return view.CameraShutter; },
    SKYBOX_FLAG: view.SKYBOX_FLAG,
    Camera: view.Camera,
    CameraVisFlags: view.CameraVisFlags,
    VisibilityFlags: view.VisibilityFlags,
    DirectionalLight: view.DirectionalLight,
    ColorTemperatureToRGB: view.ColorTemperatureToRGB,
    get LightType () { return view.LightType; },
    nt2lm: view.nt2lm,
    Light: view.Light,
    get ModelType () { return view.ModelType; },
    Model: view.Model,
    ShadowSize: jsonAsset.ShadowSize,
    ShadowType: jsonAsset.ShadowType,
    PCFType: jsonAsset.PCFType,
    Shadows: jsonAsset.Shadows,
    RenderScene: view.RenderScene,
    Skybox: view.Skybox,
    SphereLight: view.SphereLight,
    SpotLight: view.SpotLight,
    SubModel: view.SubModel,
    NativeNode: NativeNode,
    NativeScene: NativeScene,
    NativeAABB: NativeAABB,
    NativeModel: NativeModel,
    NativeSkinningModel: NativeSkinningModel,
    NativeBakedAnimInfo: NativeBakedAnimInfo,
    NativeBakedJointInfo: NativeBakedJointInfo,
    NativeBakedSkinningModel: NativeBakedSkinningModel,
    NativeLight: NativeLight,
    NativeDirectionalLight: NativeDirectionalLight,
    NativeSphereLight: NativeSphereLight,
    NativeSpotLight: NativeSpotLight,
    NaitveSkybox: NaitveSkybox,
    NativeFog: NativeFog,
    NativeRenderWindow: NativeRenderWindow,
    NativeCamera: NativeCamera,
    NativePass: NativePass,
    NativeSubModel: NativeSubModel,
    NativeDrawBatch2D: NativeDrawBatch2D,
    NativeRenderScene: NativeRenderScene,
    NativeAmbient: NativeAmbient,
    NativeShadow: NativeShadow,
    NativeRoot: NativeRoot,
    NativeJointTransform: NativeJointTransform,
    NativeJointInfo: NativeJointInfo,
    NativePipelineSharedSceneData: NativePipelineSharedSceneData
});

function createIA(device, data) {
  if (!data.positions) {
    console.error('The data must have positions field');
    return null;
  }

  var verts = [];
  var vcount = data.positions.length / 3;

  for (var i = 0; i < vcount; ++i) {
    verts.push(data.positions[3 * i], data.positions[3 * i + 1], data.positions[3 * i + 2]);

    if (data.normals) {
      verts.push(data.normals[3 * i], data.normals[3 * i + 1], data.normals[3 * i + 2]);
    }

    if (data.uvs) {
      verts.push(data.uvs[2 * i], data.uvs[2 * i + 1]);
    }

    if (data.colors) {
      verts.push(data.colors[3 * i], data.colors[3 * i + 1], data.colors[3 * i + 2]);
    }
  }

  var vfmt = [];
  vfmt.push(new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_POSITION, jsonAsset.Format.RGB32F));

  if (data.normals) {
    vfmt.push(new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_NORMAL, jsonAsset.Format.RGB32F));
  }

  if (data.uvs) {
    vfmt.push(new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_TEX_COORD, jsonAsset.Format.RG32F));
  }

  if (data.colors) {
    vfmt.push(new jsonAsset.Attribute(jsonAsset.AttributeName.ATTR_COLOR, jsonAsset.Format.RGB32F));
  }

  var vb = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.VERTEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, verts.length * 4, verts.length * 4 / vcount));
  vb.update(new Float32Array(verts));
  var ib = null;

  if (data.indices) {
    ib = device.createBuffer(new jsonAsset.BufferInfo(jsonAsset.BufferUsageBit.INDEX | jsonAsset.BufferUsageBit.TRANSFER_DST, jsonAsset.MemoryUsageBit.HOST | jsonAsset.MemoryUsageBit.DEVICE, data.indices.length * 2, 2));
    ib.update(new Uint16Array(data.indices));
  }

  return device.createInputAssembler(new jsonAsset.InputAssemblerInfo(vfmt, [vb], ib));
}

var addStage = config.addStage;

var renderer = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addStage: addStage,
    scene: index$2,
    createIA: createIA,
    get RenderQueue () { return textureBufferPool.RenderQueue; },
    get PassStage () { return textureBufferPool.PassStage; },
    get PropertyType () { return jsonAsset.PropertyType; },
    genHandle: jsonAsset.genHandle,
    getPropertyTypeFromHandle: jsonAsset.getPropertyTypeFromHandle,
    getTypeFromHandle: jsonAsset.getTypeFromHandle,
    getSetIndexFromHandle: jsonAsset.getSetIndexFromHandle,
    getBindingFromHandle: jsonAsset.getBindingFromHandle,
    getOffsetFromHandle: jsonAsset.getOffsetFromHandle,
    customizeType: jsonAsset.customizeType,
    type2reader: jsonAsset.type2reader,
    type2writer: jsonAsset.type2writer,
    getDefaultFromType: jsonAsset.getDefaultFromType,
    overrideMacros: jsonAsset.overrideMacros,
    get BatchingSchemes () { return jsonAsset.BatchingSchemes; },
    Pass: jsonAsset.Pass,
    getDeviceShaderVersion: jsonAsset.getDeviceShaderVersion,
    programLib: jsonAsset.programLib,
    get SamplerInfoIndex () { return jsonAsset.SamplerInfoIndex; },
    defaultSamplerHash: jsonAsset.defaultSamplerHash,
    genSamplerHash: jsonAsset.genSamplerHash,
    samplerLib: jsonAsset.samplerLib,
    nearestPOT: textureBufferPool.nearestPOT,
    TextureBufferPool: textureBufferPool.TextureBufferPool,
    MaterialInstance: view.MaterialInstance,
    PassInstance: view.PassInstance,
    get PoolType () { return jsonAsset.PoolType; },
    NULL_HANDLE: jsonAsset.NULL_HANDLE,
    get NodeView () { return jsonAsset.NodeView; },
    NodePool: jsonAsset.NodePool,
    get PassView () { return jsonAsset.PassView; },
    PassPool: jsonAsset.PassPool,
    get AABBView () { return jsonAsset.AABBView; },
    AABBPool: jsonAsset.AABBPool
});

var animation = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UniformProxyFactory: index$3.UniformProxyFactory,
    MorphWeightValueProxy: index$3.MorphWeightValueProxy,
    MorphWeightsValueProxy: index$3.MorphWeightsValueProxy,
    MorphWeightsAllValueProxy: index$3.MorphWeightsAllValueProxy,
    Track: transformUtils.Track,
    TrackPath: transformUtils.TrackPath,
    RealTrack: transformUtils.RealTrack,
    VectorTrack: transformUtils.VectorTrack,
    QuatTrack: transformUtils.QuatTrack,
    ColorTrack: transformUtils.ColorTrack,
    SizeTrack: transformUtils.SizeTrack,
    ObjectTrack: transformUtils.ObjectTrack,
    isPropertyPath: transformUtils.isPropertyPath,
    isCustomPath: transformUtils.isCustomPath,
    HierarchyPath: transformUtils.HierarchyPath,
    ComponentPath: transformUtils.ComponentPath,
    CubicSplineVec2Value: transformUtils.CubicSplineVec2Value,
    CubicSplineVec3Value: transformUtils.CubicSplineVec3Value,
    CubicSplineVec4Value: transformUtils.CubicSplineVec4Value,
    CubicSplineQuatValue: transformUtils.CubicSplineQuatValue,
    CubicSplineNumberValue: transformUtils.CubicSplineNumberValue
});

var NodePool = function () {
  function NodePool(poolHandlerComp) {
    this.poolHandlerComp = void 0;
    this._pool = void 0;
    this.poolHandlerComp = poolHandlerComp;
    this._pool = [];
  }

  var _proto = NodePool.prototype;

  _proto.size = function size() {
    return this._pool.length;
  };

  _proto.clear = function clear() {
    var count = this._pool.length;

    for (var i = 0; i < count; ++i) {
      this._pool[i].destroy();
    }

    this._pool.length = 0;
  };

  _proto.put = function put(obj) {
    if (obj && this._pool.indexOf(obj) === -1) {
      obj.removeFromParent();
      var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;

      if (handler && handler.unuse) {
        handler.unuse();
      }

      this._pool.push(obj);
    }
  };

  _proto.get = function get() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var last = this._pool.length - 1;

    if (last < 0) {
      return null;
    } else {
      var obj = this._pool[last];
      this._pool.length = last;
      var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;

      if (handler && handler.reuse) {
        handler.reuse(arguments);
      }

      return obj;
    }
  };

  return NodePool;
}();
jsonAsset.legacyCC.NodePool = NodePool;

jsonAsset.legacyCC.renderer = renderer;

exports.AffineTransform = jsonAsset.AffineTransform;
exports.Asset = jsonAsset.Asset;
exports.BaseNode = jsonAsset.BaseNode;
exports.BitMask = jsonAsset.BitMask;
exports.BufferAsset = jsonAsset.BufferAsset;
exports.CCBoolean = jsonAsset.CCBoolean;
exports.CCClass = jsonAsset.CCClass;
exports.CCFloat = jsonAsset.CCFloat;
exports.CCInteger = jsonAsset.CCInteger;
exports.CCObject = jsonAsset.CCObject;
exports.CCString = jsonAsset.CCString;
exports.CachedArray = jsonAsset.CachedArray;
exports.Color = jsonAsset.Color$1;
exports.CompactValueTypeArray = jsonAsset.CompactValueTypeArray;
exports.Component = jsonAsset.Component;
Object.defineProperty(exports, 'DebugMode', {
    enumerable: true,
    get: function () {
        return jsonAsset.DebugMode;
    }
});
exports.Details = jsonAsset.Details;
exports.EPSILON = jsonAsset.EPSILON;
exports.EffectAsset = jsonAsset.EffectAsset;
Object.defineProperty(exports, 'Enum', {
    enumerable: true,
    get: function () {
        return jsonAsset.Enum;
    }
});
exports.Event = jsonAsset.Event;
exports.EventTarget = jsonAsset.EventTarget;
exports.Eventify = jsonAsset.Eventify;
Object.defineProperty(exports, 'ExtrapolationMode', {
    enumerable: true,
    get: function () {
        return jsonAsset.ExtrapolationMode;
    }
});
exports.ImageAsset = jsonAsset.ImageAsset;
exports.JavaScript = jsonAsset.JavaScript;
exports.JsonAsset = jsonAsset.JsonAsset;
exports.Layers = jsonAsset.Layers;
exports.MATH_FLOAT_ARRAY = jsonAsset.MATH_FLOAT_ARRAY;
exports.Mat3 = jsonAsset.Mat3;
exports.Mat4 = jsonAsset.Mat4;
exports.Material = jsonAsset.Material;
exports.MathBase = jsonAsset.MathBase;
exports.MissingScript = jsonAsset.MissingScript;
exports.Node = jsonAsset.Node;
exports.NodeActivator = jsonAsset.NodeActivator;
exports.ObjectCurve = jsonAsset.ObjectCurve;
exports.Pool = jsonAsset.Pool;
exports.Prefab = jsonAsset.Prefab;
exports.PrefabLink = jsonAsset.PrefabLink;
exports.PrivateNode = jsonAsset.PrivateNode;
exports.Quat = jsonAsset.Quat;
exports.QuatCurve = jsonAsset.QuatCurve;
Object.defineProperty(exports, 'QuatInterpolationMode', {
    enumerable: true,
    get: function () {
        return jsonAsset.QuatInterpolationMode;
    }
});
exports.RealCurve = jsonAsset.RealCurve;
Object.defineProperty(exports, 'RealInterpolationMode', {
    enumerable: true,
    get: function () {
        return jsonAsset.RealInterpolationMode;
    }
});
exports.Rect = jsonAsset.Rect$1;
exports.RecyclePool = jsonAsset.RecyclePool;
exports.RenderTexture = jsonAsset.RenderTexture;
exports.RenderingSubMesh = jsonAsset.RenderingSubMesh;
exports.Scene = jsonAsset.Scene;
exports.SceneAsset = jsonAsset.SceneAsset;
exports.Script = jsonAsset.Script;
exports.Size = jsonAsset.Size$1;
Object.defineProperty(exports, 'SystemEventType', {
    enumerable: true,
    get: function () {
        return jsonAsset.SystemEventType;
    }
});
Object.defineProperty(exports, 'TangentWeightMode', {
    enumerable: true,
    get: function () {
        return jsonAsset.TangentWeightMode;
    }
});
exports.TextAsset = jsonAsset.TextAsset;
exports.Texture2D = jsonAsset.Texture2D;
exports.TextureCube = jsonAsset.TextureCube;
exports.TypeScript = jsonAsset.TypeScript;
exports.VERSION = jsonAsset.engineVersion;
exports.ValueType = jsonAsset.ValueType;
exports.Vec2 = jsonAsset.Vec2;
exports.Vec3 = jsonAsset.Vec3;
exports.Vec4 = jsonAsset.Vec4;
exports.WorldNode3DToLocalNodeUI = jsonAsset.WorldNode3DToLocalNodeUI;
exports.WorldNode3DToWorldNodeUI = jsonAsset.WorldNode3DToWorldNodeUI;
exports._decorator = jsonAsset._decorator;
exports.absMax = jsonAsset.absMax;
exports.absMaxComponent = jsonAsset.absMaxComponent;
exports.approx = jsonAsset.approx;
exports.assert = jsonAsset.assert;
exports.assertID = jsonAsset.assertID;
exports.bits = jsonAsset.bits;
exports.builtinResMgr = jsonAsset.builtinResMgr;
exports.ccenum = jsonAsset.ccenum;
exports.cclegacy = jsonAsset.legacyCC;
exports.clamp = jsonAsset.clamp;
exports.clamp01 = jsonAsset.clamp01;
exports.color = jsonAsset.color;
exports.convertUtils = jsonAsset.convertUtils;
exports.debug = jsonAsset.debug$1;
exports.deserialize = jsonAsset.deserialize;
exports.deserializeTag = jsonAsset.deserializeTag;
exports.easing = jsonAsset.easing;
exports.editorExtrasTag = jsonAsset.editorExtrasTag;
exports.effects = jsonAsset.effects;
exports.enumerableProps = jsonAsset.enumerableProps;
exports.equals = jsonAsset.equals;
exports.error = jsonAsset.error;
exports.errorID = jsonAsset.errorID;
exports.find = jsonAsset.find;
exports.getError = jsonAsset.getError;
exports.getPhaseID = jsonAsset.getPhaseID;
exports.instantiate = jsonAsset.instantiate;
exports.inverseLerp = jsonAsset.inverseLerp;
exports.isDisplayStats = jsonAsset.isDisplayStats;
exports.isValid = jsonAsset.isValid;
exports.js = jsonAsset.js;
exports.lerp = jsonAsset.lerp;
exports.log = jsonAsset.log;
exports.logID = jsonAsset.logID;
exports.macro = jsonAsset.macro;
Object.defineProperty(exports, 'markAsWarning', {
    enumerable: true,
    get: function () {
        return jsonAsset.markAsWarning;
    }
});
exports.mat4 = jsonAsset.mat4;
exports.misc = jsonAsset.misc;
exports.murmurhash2_32_gc = jsonAsset.murmurhash2_32_gc;
exports.nextPow2 = jsonAsset.nextPow2;
exports.path = jsonAsset.path;
exports.pingPong = jsonAsset.pingPong;
exports.pipeline = jsonAsset.define;
exports.pseudoRandom = jsonAsset.pseudoRandom;
exports.pseudoRandomRange = jsonAsset.pseudoRandomRange;
exports.pseudoRandomRangeInt = jsonAsset.pseudoRandomRangeInt;
exports.quat = jsonAsset.quat;
exports.random = jsonAsset.random;
exports.randomRange = jsonAsset.randomRange;
exports.randomRangeInt = jsonAsset.randomRangeInt;
exports.rect = jsonAsset.rect;
Object.defineProperty(exports, 'removeProperty', {
    enumerable: true,
    get: function () {
        return jsonAsset.removeProperty;
    }
});
exports.repeat = jsonAsset.repeat;
Object.defineProperty(exports, 'replaceProperty', {
    enumerable: true,
    get: function () {
        return jsonAsset.replaceProperty;
    }
});
exports.serializeTag = jsonAsset.serializeTag;
exports.setDefaultLogTimes = jsonAsset.setDefaultLogTimes;
exports.setDisplayStats = jsonAsset.setDisplayStats;
exports.size = jsonAsset.size;
exports.sys = jsonAsset.sys;
exports.toDegree = jsonAsset.toDegree;
exports.toRadian = jsonAsset.toRadian;
exports.v2 = jsonAsset.v2;
exports.v3 = jsonAsset.v3;
exports.v4 = jsonAsset.v4;
exports.warn = jsonAsset.warn;
exports.warnID = jsonAsset.warnID;
exports.AnimationManager = index$3.AnimationManager;
exports.AssetLibrary = index$3.AssetLibrary;
exports.AssetManager = index$3.AssetManager;
exports.CCLoader = index$3.CCLoader;
exports.ComponentModifier = index$3.ComponentModifier;
exports.CurveValueAdapter = index$3.CurveValueAdapter;
exports.Director = index$3.Director;
exports.EventHandler = index$3.EventHandler;
exports.HierachyModifier = index$3.HierachyModifier;
exports.Scheduler = index$3.Scheduler;
exports.System = index$3.System;
exports.UniformCurveValueAdapter = index$3.UniformCurveValueAdapter;
exports.assetManager = index$3.assetManager;
exports.createDefaultPipeline = index$3.createDefaultPipeline;
exports.director = index$3.director;
exports.geometry = index$3.geometry;
exports.isCustomTargetModifier = index$3.isCustomTargetModifier;
exports.isElementModifier = index$3.isElementModifier;
exports.isPropertyModifier = index$3.isPropertyModifier;
exports.loader = index$3.loader;
exports.math = index$3.math;
exports.resources = index$3.resources;
exports.url = index$3.url;
exports.DeferredPipeline = view.DeferredPipeline;
exports.EventAcceleration = view.EventAcceleration;
exports.EventKeyboard = view.EventKeyboard;
exports.EventMouse = view.EventMouse;
exports.EventTouch = view.EventTouch;
exports.ForwardFlow = view.ForwardFlow;
exports.ForwardPipeline = view.ForwardPipeline;
exports.ForwardStage = view.ForwardStage;
exports.Game = view.Game;
exports.GbufferStage = view.GbufferStage;
exports.InstancedBuffer = view.InstancedBuffer;
Object.defineProperty(exports, 'KeyCode', {
    enumerable: true,
    get: function () {
        return view.KeyCode;
    }
});
exports.LightingStage = view.LightingStage;
exports.MainFlow = view.MainFlow;
exports.PipelineStateManager = view.PipelineStateManager;
exports.PostprocessStage = view.PostprocessStage;
exports.RenderFlow = view.RenderFlow;
exports.RenderPipeline = view.RenderPipeline;
exports.RenderStage = view.RenderStage;
exports.ResolutionPolicy = view.ResolutionPolicy;
exports.ShadowFlow = view.ShadowFlow;
exports.ShadowStage = view.ShadowStage;
exports.Touch = view.Touch;
exports.View = view.View;
exports.game = view.game;
exports.screen = view.screen;
exports.view = view.view;
exports.SystemEvent = deprecated.SystemEvent;
exports.systemEvent = deprecated.systemEvent;
exports.Camera = cameraComponent.Camera;
exports.CameraComponent = cameraComponent.Camera;
exports.RenderableComponent = renderableComponent.RenderableComponent;
exports.AnimCurve = transformUtils.AnimCurve;
exports.Animation = transformUtils.Animation;
exports.AnimationClip = transformUtils.AnimationClip;
exports.AnimationComponent = transformUtils.Animation;
exports.AnimationState = transformUtils.AnimationState;
exports.CubicSplineNumberValue = transformUtils.CubicSplineNumberValue;
exports.CubicSplineQuatValue = transformUtils.CubicSplineQuatValue;
exports.CubicSplineVec2Value = transformUtils.CubicSplineVec2Value;
exports.CubicSplineVec3Value = transformUtils.CubicSplineVec3Value;
exports.CubicSplineVec4Value = transformUtils.CubicSplineVec4Value;
exports.EventInfo = transformUtils.EventInfo;
exports.RatioSampler = transformUtils.RatioSampler;
exports.bezier = transformUtils.bezier;
exports.bezierByTime = transformUtils.bezierByTime;
exports.computeRatioByType = transformUtils.computeRatioByType;
exports.getPathFromRoot = transformUtils.getPathFromRoot;
exports.getWorldTransformUntilRoot = transformUtils.getWorldTransformUntilRoot;
exports.sampleAnimationCurve = transformUtils.sampleAnimationCurve;
exports.NodePool = NodePool;
exports.animation = animation;
exports.getSerializationMetadata = getSerializationMetadata;
exports.gfx = index$1;
exports.memop = index;
exports.renderer = renderer;
