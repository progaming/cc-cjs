'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var index = require('./index-04f3192a.js');
require('./view-c0f88f03.js');
require('./texture-buffer-pool-e09c9995.js');
require('./deprecated-024a684c.js');
require('./camera-component-c6f89e45.js');
require('./renderable-component-f3f3ccc0.js');
require('./transform-utils-3cfb96de.js');
require('./index-577386d4.js');
require('./sprite-frame-385ed34c.js');
require('./sprite-14580321.js');
require('./renderable-2d-fa14364b.js');
var graphics = require('./graphics-b8239a5d.js');
require('./vertex-format-30c6ba0e.js');
require('./deprecated-6708ddd8.js');
var deprecated = require('./deprecated-50daeaeb.js');
require('./collision-matrix-ec4af174.js');
var hingeJoint2d = require('./hinge-joint-2d-61fbed1e.js');
var intersection2d = require('./intersection-2d-ab9546a3.js');

var BuiltinShape2D = function () {
  function BuiltinShape2D() {
    this._collider = null;
    this._worldAabb = new jsonAsset.Rect$1();
  }

  var _proto = BuiltinShape2D.prototype;

  _proto.apply = function apply() {};

  _proto.initialize = function initialize(comp) {
    this._collider = comp;
  };

  _proto.onLoad = function onLoad() {};

  _proto.onEnable = function onEnable() {
    hingeJoint2d.PhysicsSystem2D.instance.physicsWorld.addShape(this);
  };

  _proto.onDisable = function onDisable() {
    hingeJoint2d.PhysicsSystem2D.instance.physicsWorld.removeShape(this);
  };

  _proto.start = function start() {};

  _proto.update = function update() {};

  _proto.containsPoint = function containsPoint(p) {
    if (!this.worldAABB.contains(p)) {
      return false;
    }

    return true;
  };

  _proto.intersectsRect = function intersectsRect(rect) {
    if (!this.worldAABB.intersects(rect)) {
      return false;
    }

    return true;
  };

  _proto.onGroupChanged = function onGroupChanged() {
    hingeJoint2d.PhysicsSystem2D.instance.physicsWorld.updateShapeGroup(this);
  };

  jsonAsset._createClass(BuiltinShape2D, [{
    key: "impl",
    get: function get() {
      return null;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }, {
    key: "worldAABB",
    get: function get() {
      return this._worldAabb;
    }
  }]);

  return BuiltinShape2D;
}();

var BuiltinBoxShape = function (_BuiltinShape2D) {
  jsonAsset._inheritsLoose(BuiltinBoxShape, _BuiltinShape2D);

  function BuiltinBoxShape() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BuiltinShape2D.call.apply(_BuiltinShape2D, [this].concat(args)) || this;
    _this._worldPoints = [new jsonAsset.Vec2(), new jsonAsset.Vec2(), new jsonAsset.Vec2(), new jsonAsset.Vec2()];
    return _this;
  }

  var _proto = BuiltinBoxShape.prototype;

  _proto.update = function update() {
    var aabb = this._worldAabb;
    var collider = this.collider;
    var size = collider.size;
    var offset = collider.offset;
    aabb.x = offset.x - size.width / 2;
    aabb.y = offset.y - size.height / 2;
    aabb.width = size.width;
    aabb.height = size.height;
    var wps = this._worldPoints;
    var wp0 = wps[0];
    var wp1 = wps[1];
    var wp2 = wps[2];
    var wp3 = wps[3];
    aabb.transformMat4ToPoints(collider.node.worldMatrix, wp0, wp1, wp2, wp3);
    var minx = Math.min(wp0.x, wp1.x, wp2.x, wp3.x);
    var miny = Math.min(wp0.y, wp1.y, wp2.y, wp3.y);
    var maxx = Math.max(wp0.x, wp1.x, wp2.x, wp3.x);
    var maxy = Math.max(wp0.y, wp1.y, wp2.y, wp3.y);
    aabb.x = minx;
    aabb.y = miny;
    aabb.width = maxx - minx;
    aabb.height = maxy - miny;
  };

  _proto.containsPoint = function containsPoint(p) {
    if (!this.worldAABB.contains(p)) {
      return false;
    }

    return intersection2d.Intersection2D.pointInPolygon(p, this.worldPoints);
  };

  _proto.intersectsRect = function intersectsRect(rect) {
    if (!this.worldAABB.intersects(rect)) {
      return false;
    }

    return intersection2d.Intersection2D.rectPolygon(rect, this.worldPoints);
  };

  jsonAsset._createClass(BuiltinBoxShape, [{
    key: "worldPoints",
    get: function get() {
      return this._worldPoints;
    }
  }]);

  return BuiltinBoxShape;
}(BuiltinShape2D);

var tempVec2 = new jsonAsset.Vec2();
var tempMat4 = new jsonAsset.Mat4();
var BuiltinCircleShape = function (_BuiltinShape2D) {
  jsonAsset._inheritsLoose(BuiltinCircleShape, _BuiltinShape2D);

  function BuiltinCircleShape() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BuiltinShape2D.call.apply(_BuiltinShape2D, [this].concat(args)) || this;
    _this._worldPosition = new jsonAsset.Vec2();
    _this._worldRadius = 0;
    return _this;
  }

  var _proto = BuiltinCircleShape.prototype;

  _proto.update = function update() {
    var aabb = this._worldAabb;
    var collider = this.collider;
    var worldMatrix = collider.node.getWorldMatrix(tempMat4);
    jsonAsset.Vec2.transformMat4(tempVec2, collider.offset, worldMatrix);
    var worldPos = this._worldPosition;
    worldPos.x = tempVec2.x;
    worldPos.y = tempVec2.y;
    worldMatrix.m12 = worldMatrix.m13 = 0;
    tempVec2.x = collider.radius;
    tempVec2.y = 0;
    jsonAsset.Vec2.transformMat4(tempVec2, tempVec2, worldMatrix);
    var d = this._worldRadius = tempVec2.length();
    aabb.x = worldPos.x - d;
    aabb.y = worldPos.y - d;
    aabb.width = d * 2;
    aabb.height = d * 2;
  };

  _proto.containsPoint = function containsPoint(p) {
    if (!this.worldAABB.contains(p)) {
      return false;
    }

    var dist = jsonAsset.Vec2.subtract(tempVec2, p, this.worldPosition).length();
    return dist < this.worldRadius;
  };

  _proto.intersectsRect = function intersectsRect(rect) {
    if (!this.worldAABB.intersects(rect)) {
      return false;
    }

    return intersection2d.Intersection2D.rectCircle(rect, this.worldPosition, this.worldRadius);
  };

  jsonAsset._createClass(BuiltinCircleShape, [{
    key: "worldPosition",
    get: function get() {
      return this._worldPosition;
    }
  }, {
    key: "worldRadius",
    get: function get() {
      return this._worldRadius;
    }
  }]);

  return BuiltinCircleShape;
}(BuiltinShape2D);

var tempVec2$1 = new jsonAsset.Vec2();
var BuiltinPolygonShape = function (_BuiltinShape2D) {
  jsonAsset._inheritsLoose(BuiltinPolygonShape, _BuiltinShape2D);

  function BuiltinPolygonShape() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BuiltinShape2D.call.apply(_BuiltinShape2D, [this].concat(args)) || this;
    _this._worldPoints = [];
    return _this;
  }

  var _proto = BuiltinPolygonShape.prototype;

  _proto.update = function update() {
    var aabb = this._worldAabb;
    var collider = this.collider;
    var points = collider.points;
    var offset = collider.offset;
    var worldMatrix = collider.node.worldMatrix;
    var worldPoints = this._worldPoints;
    worldPoints.length = points.length;
    var minx = 1e6;
    var miny = 1e6;
    var maxx = -1e6;
    var maxy = -1e6;

    for (var i = 0, l = points.length; i < l; i++) {
      if (!worldPoints[i]) {
        worldPoints[i] = new jsonAsset.Vec2();
      }

      tempVec2$1.x = points[i].x + offset.x;
      tempVec2$1.y = points[i].y + offset.y;
      jsonAsset.Vec2.transformMat4(tempVec2$1, tempVec2$1, worldMatrix);
      var x = tempVec2$1.x;
      var y = tempVec2$1.y;
      worldPoints[i].x = x;
      worldPoints[i].y = y;
      if (x > maxx) maxx = x;
      if (x < minx) minx = x;
      if (y > maxy) maxy = y;
      if (y < miny) miny = y;
    }

    aabb.x = minx;
    aabb.y = miny;
    aabb.width = maxx - minx;
    aabb.height = maxy - miny;
  };

  _proto.containsPoint = function containsPoint(p) {
    if (!this.worldAABB.contains(p)) {
      return false;
    }

    return intersection2d.Intersection2D.pointInPolygon(p, this.worldPoints);
  };

  _proto.intersectsRect = function intersectsRect(rect) {
    if (!this.worldAABB.intersects(rect)) {
      return false;
    }

    return intersection2d.Intersection2D.rectPolygon(rect, this.worldPoints);
  };

  jsonAsset._createClass(BuiltinPolygonShape, [{
    key: "worldPoints",
    get: function get() {
      return this._worldPoints;
    }
  }]);

  return BuiltinPolygonShape;
}(BuiltinShape2D);

var BuiltinContact = function () {
  function BuiltinContact(shape1, shape2) {
    this.shape1 = void 0;
    this.shape2 = void 0;
    this.testFunc = void 0;
    this.touching = false;
    this.type = hingeJoint2d.Contact2DType.None;
    this.shape1 = shape1;
    this.shape2 = shape2;
    this.touching = false;
    var isShape1Polygon = shape1 instanceof BuiltinBoxShape || shape1 instanceof BuiltinPolygonShape;
    var isShape2Polygon = shape2 instanceof BuiltinBoxShape || shape2 instanceof BuiltinPolygonShape;
    var isShape1Circle = shape1 instanceof BuiltinCircleShape;
    var isShape2Circle = shape2 instanceof BuiltinCircleShape;

    if (isShape1Polygon && isShape2Polygon) {
      this.testFunc = intersection2d.Intersection2D.polygonPolygon;
    } else if (isShape1Circle && isShape2Circle) {
      this.testFunc = intersection2d.Intersection2D.circleCircle;
    } else if (isShape1Polygon && isShape2Circle) {
      this.testFunc = intersection2d.Intersection2D.polygonCircle;
    } else if (isShape1Circle && isShape2Polygon) {
      this.testFunc = intersection2d.Intersection2D.polygonCircle;
      this.shape1 = shape2;
      this.shape2 = shape1;
    } else {
      jsonAsset.error("Can not find contact for builtin shape: " + shape1.constructor.name + ", " + shape2.constructor.name);
    }
  }

  var _proto = BuiltinContact.prototype;

  _proto.test = function test() {
    var s1 = this.shape1;
    var s2 = this.shape2;

    if (!s1.worldAABB.intersects(s2.worldAABB)) {
      return false;
    }

    if (this.testFunc === intersection2d.Intersection2D.polygonPolygon) {
      return intersection2d.Intersection2D.polygonPolygon(s1.worldPoints, s2.worldPoints);
    } else if (this.testFunc === intersection2d.Intersection2D.circleCircle) {
      return intersection2d.Intersection2D.circleCircle(s1.worldPosition, s1.worldRadius, s2.worldPosition, s2.worldRadius);
    } else if (this.testFunc === intersection2d.Intersection2D.polygonCircle) {
      return intersection2d.Intersection2D.polygonCircle(s1.worldPoints, s2.worldPosition, s2.worldRadius);
    }

    return false;
  };

  _proto.updateState = function updateState() {
    var result = this.test();
    var type = hingeJoint2d.Contact2DType.None;

    if (result && !this.touching) {
      this.touching = true;
      type = hingeJoint2d.Contact2DType.BEGIN_CONTACT;
    } else if (!result && this.touching) {
      this.touching = false;
      type = hingeJoint2d.Contact2DType.END_CONTACT;
    }

    this.type = type;
    return type;
  };

  return BuiltinContact;
}();

var contactResults = [];
var testIntersectResults = [];
var BuiltinPhysicsWorld = function () {
  function BuiltinPhysicsWorld() {
    this._contacts = [];
    this._shapes = [];
    this._debugGraphics = null;
    this._debugDrawFlags = 0;
  }

  var _proto = BuiltinPhysicsWorld.prototype;

  _proto.shouldCollide = function shouldCollide(c1, c2) {
    var collider1 = c1.collider;
    var collider2 = c2.collider;
    var collisionMatrix = hingeJoint2d.PhysicsSystem2D.instance.collisionMatrix;
    return collider1 !== collider2 && collider1.node !== collider2.node && collisionMatrix[collider1.group] & collider2.group && collisionMatrix[collider2.group] & collider1.group;
  };

  _proto.addShape = function addShape(shape) {
    var shapes = this._shapes;
    var index = shapes.indexOf(shape);

    if (index === -1) {
      for (var i = 0, l = shapes.length; i < l; i++) {
        var other = shapes[i];

        if (this.shouldCollide(shape, other)) {
          var contact = new BuiltinContact(shape, other);

          this._contacts.push(contact);
        }
      }

      shapes.push(shape);
    }
  };

  _proto.removeShape = function removeShape(shape) {
    var shapes = this._shapes;
    var index = shapes.indexOf(shape);

    if (index >= 0) {
      shapes.splice(index, 1);
      var contacts = this._contacts;

      for (var i = contacts.length - 1; i >= 0; i--) {
        var contact = contacts[i];

        if (contact.shape1 === shape || contact.shape2 === shape) {
          if (contact.touching) {
            this._emitCollide(contact, hingeJoint2d.Contact2DType.END_CONTACT);
          }

          contacts.splice(i, 1);
        }
      }
    }
  };

  _proto.updateShapeGroup = function updateShapeGroup(shape) {
    this.removeShape(shape);
    this.addShape(shape);
  };

  _proto.step = function step(deltaTime, velocityIterations, positionIterations) {

    var shapes = this._shapes;

    for (var i = 0, l = shapes.length; i < l; i++) {
      shapes[i].update();
    }

    var contacts = this._contacts;
    contactResults.length = 0;

    for (var _i = 0, _l = contacts.length; _i < _l; _i++) {
      var collisionType = contacts[_i].updateState();

      if (collisionType === hingeJoint2d.Contact2DType.None) {
        continue;
      }

      contactResults.push(contacts[_i]);
    }

    for (var _i2 = 0, _l2 = contactResults.length; _i2 < _l2; _i2++) {
      var result = contactResults[_i2];

      this._emitCollide(result);
    }
  };

  _proto.drawDebug = function drawDebug() {
    if (!this._debugDrawFlags) {
      return;
    }

    this._checkDebugDrawValid();

    var debugDrawer = this._debugGraphics;

    if (!debugDrawer) {
      return;
    }

    debugDrawer.clear();
    var shapes = this._shapes;

    for (var i = 0, l = shapes.length; i < l; i++) {
      var shape = shapes[i];
      debugDrawer.strokeColor = jsonAsset.Color$1.WHITE;

      if (shape instanceof BuiltinBoxShape || shape instanceof BuiltinPolygonShape) {
        var ps = shape.worldPoints;

        if (ps.length > 0) {
          debugDrawer.moveTo(ps[0].x, ps[0].y);

          for (var j = 1; j < ps.length; j++) {
            debugDrawer.lineTo(ps[j].x, ps[j].y);
          }

          debugDrawer.close();
          debugDrawer.stroke();
        }
      } else if (shape instanceof BuiltinCircleShape) {
        debugDrawer.circle(shape.worldPosition.x, shape.worldPosition.y, shape.worldRadius);
        debugDrawer.stroke();
      }

      if (this._debugDrawFlags & hingeJoint2d.EPhysics2DDrawFlags.Aabb) {
        var aabb = shape.worldAABB;
        debugDrawer.strokeColor = jsonAsset.Color$1.BLUE;
        debugDrawer.moveTo(aabb.xMin, aabb.yMin);
        debugDrawer.lineTo(aabb.xMin, aabb.yMax);
        debugDrawer.lineTo(aabb.xMax, aabb.yMax);
        debugDrawer.lineTo(aabb.xMax, aabb.yMin);
        debugDrawer.close();
        debugDrawer.stroke();
      }
    }
  };

  _proto._emitCollide = function _emitCollide(contact, collisionType) {
    collisionType = collisionType || contact.type;
    var c1 = contact.shape1.collider;
    var c2 = contact.shape2.collider;
    hingeJoint2d.PhysicsSystem2D.instance.emit(collisionType, c1, c2);
    c1.emit(collisionType, c1, c2);
    c2.emit(collisionType, c2, c1);
  };

  _proto._checkDebugDrawValid = function _checkDebugDrawValid() {

    if (!this._debugGraphics || !this._debugGraphics.isValid) {
      var canvas = jsonAsset.find('Canvas');

      if (!canvas) {
        var scene = index.director.getScene();

        if (!scene) {
          return;
        }

        canvas = new jsonAsset.Node('Canvas');
        canvas.addComponent(deprecated.Canvas);
        canvas.parent = scene;
      }

      var node = new jsonAsset.Node('PHYSICS_2D_DEBUG_DRAW');
      node.hideFlags |= jsonAsset.CCObject.Flags.DontSave;
      node.parent = canvas;
      node.worldPosition = jsonAsset.Vec3.ZERO;
      this._debugGraphics = node.addComponent(graphics.Graphics);
      this._debugGraphics.lineWidth = 2;
    }

    var parent = this._debugGraphics.node.parent;

    this._debugGraphics.node.setSiblingIndex(parent.children.length - 1);
  };

  _proto.testPoint = function testPoint(p) {
    var shapes = this._shapes;
    testIntersectResults.length = 0;

    for (var i = 0; i < shapes.length; i++) {
      var shape = shapes[i];

      if (!shape.containsPoint(p)) {
        continue;
      }

      testIntersectResults.push(shape.collider);
    }

    return testIntersectResults;
  };

  _proto.testAABB = function testAABB(rect) {
    var shapes = this._shapes;
    testIntersectResults.length = 0;

    for (var i = 0; i < shapes.length; i++) {
      var shape = shapes[i];

      if (!shape.intersectsRect(rect)) {
        continue;
      }

      testIntersectResults.push(shape.collider);
    }

    return testIntersectResults;
  };

  _proto.impl = function impl() {
    return null;
  };

  _proto.setGravity = function setGravity() {};

  _proto.setAllowSleep = function setAllowSleep() {};

  _proto.syncPhysicsToScene = function syncPhysicsToScene() {};

  _proto.syncSceneToPhysics = function syncSceneToPhysics() {};

  _proto.raycast = function raycast(p1, p2, type) {
    return [];
  };

  jsonAsset._createClass(BuiltinPhysicsWorld, [{
    key: "debugDrawFlags",
    get: function get() {
      return this._debugDrawFlags;
    },
    set: function set(v) {
      this._debugDrawFlags = v;
    }
  }]);

  return BuiltinPhysicsWorld;
}();

hingeJoint2d.select('builtin', {
  PhysicsWorld: BuiltinPhysicsWorld,
  RigidBody: null,
  BoxShape: BuiltinBoxShape,
  CircleShape: BuiltinCircleShape,
  PolygonShape: BuiltinPolygonShape,
  MouseJoint: null,
  DistanceJoint: null,
  SpringJoint: null,
  RelativeJoint: null,
  SliderJoint: null,
  FixedJoint: null,
  WheelJoint: null,
  HingeJoint: null
});
