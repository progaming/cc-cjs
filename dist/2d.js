'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./json-asset-ae61ceca.js');
require('./index-04f3192a.js');
require('./view-c0f88f03.js');
require('./texture-buffer-pool-e09c9995.js');
require('./deprecated-024a684c.js');
require('./camera-component-c6f89e45.js');
require('./renderable-component-f3f3ccc0.js');
require('./transform-utils-3cfb96de.js');
var index = require('./index-577386d4.js');
var spriteFrame = require('./sprite-frame-385ed34c.js');
var sprite = require('./sprite-14580321.js');
var renderable2d = require('./renderable-2d-fa14364b.js');
var graphics = require('./graphics-b8239a5d.js');
var vertexFormat = require('./vertex-format-30c6ba0e.js');
var deprecated = require('./deprecated-6708ddd8.js');
var deprecated$1 = require('./deprecated-50daeaeb.js');



exports.UI = index.Batcher2D;
exports.earcut = index.earcut;
exports.graphicsAssembler = index.graphicsAssemblerManager;
exports.labelAssembler = index.labelAssembler;
exports.spriteAssembler = index.spriteAssembler;
exports.SpriteFrame = spriteFrame.SpriteFrame;
exports.dynamicAtlasManager = spriteFrame.dynamicAtlasManager;
exports.BASELINE_RATIO = sprite.BASELINE_RATIO;
exports.BitmapFont = sprite.BitmapFont;
Object.defineProperty(exports, 'CacheMode', {
	enumerable: true,
	get: function () {
		return sprite.CacheMode;
	}
});
exports.CanvasPool = sprite.CanvasPool;
exports.Font = sprite.Font;
Object.defineProperty(exports, 'HorizontalTextAlignment', {
	enumerable: true,
	get: function () {
		return sprite.HorizontalTextAlignment;
	}
});
exports.Label = sprite.Label;
exports.LabelAtlas = sprite.LabelAtlas;
exports.LabelComponent = sprite.Label;
exports.MIDDLE_RATIO = sprite.MIDDLE_RATIO;
Object.defineProperty(exports, 'Overflow', {
	enumerable: true,
	get: function () {
		return sprite.Overflow;
	}
});
exports.Sprite = sprite.Sprite;
exports.SpriteAtlas = sprite.SpriteAtlas;
exports.SpriteComponent = sprite.Sprite;
exports.TTFFont = sprite.TTFFont;
Object.defineProperty(exports, 'VerticalTextAlignment', {
	enumerable: true,
	get: function () {
		return sprite.VerticalTextAlignment;
	}
});
exports.fragmentText = sprite.fragmentText;
exports.getBaselineOffset = sprite.getBaselineOffset;
exports.isUnicodeCJK = sprite.isUnicodeCJK;
exports.isUnicodeSpace = sprite.isUnicodeSpace;
exports.safeMeasureText = sprite.safeMeasureText;
Object.defineProperty(exports, 'InstanceMaterialType', {
	enumerable: true,
	get: function () {
		return renderable2d.InstanceMaterialType;
	}
});
exports.RenderComponent = renderable2d.Renderable2D;
exports.Renderable2D = renderable2d.Renderable2D;
exports.StencilManager = renderable2d.StencilManager;
exports.UIRenderable = renderable2d.Renderable2D;
exports.UITransform = renderable2d.UITransform;
exports.UITransformComponent = renderable2d.UITransform;
exports.Graphics = graphics.Graphics;
exports.GraphicsComponent = graphics.Graphics;
exports.UIVertexFormat = vertexFormat.vertexFormat;
exports.HtmlTextParser = deprecated.HtmlTextParser;
exports.LabelOutline = deprecated.LabelOutline;
exports.LabelOutlineComponent = deprecated.LabelOutline;
exports.LabelShadow = deprecated.LabelShadow;
exports.Mask = deprecated.Mask;
exports.MaskComponent = deprecated.Mask;
exports.MeshBuffer = deprecated.MeshBuffer;
exports.RichText = deprecated.RichText;
exports.RichTextComponent = deprecated.RichText;
exports.UIDrawBatch = deprecated.DrawBatch2D;
exports.UIMeshRenderer = deprecated.UIMeshRenderer;
exports.UIModelComponent = deprecated.UIMeshRenderer;
exports.UIOpacity = deprecated.UIOpacity;
exports.UIOpacityComponent = deprecated.UIOpacity;
exports.UIStaticBatch = deprecated.UIStaticBatch;
exports.UIStaticBatchComponent = deprecated.UIStaticBatch;
exports.Canvas = deprecated$1.Canvas;
exports.CanvasComponent = deprecated$1.Canvas;
exports.RenderRoot2D = deprecated$1.RenderRoot2D;
exports.UIComponent = deprecated$1.UIComponent;
