'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
require('./base.js');
require('./index-04f3192a.js');
require('./view-c0f88f03.js');
require('./texture-buffer-pool-e09c9995.js');
require('./deprecated-024a684c.js');
require('./camera-component-c6f89e45.js');
require('./renderable-component-f3f3ccc0.js');
require('./transform-utils-3cfb96de.js');
require('./mesh-1b66157b.js');
require('./skeleton-42e69a3d.js');
var index = require('./index-4023e878.js');
var collisionMatrix = require('./collision-matrix-ec4af174.js');
require('./capsule-01032724.js');
require('./terrain-asset-bbf166bf.js');
require('./physics-framework.js');
var arrayCollisionMatrix = require('./array-collision-matrix-a747d78b.js');

var BuiltinObject = function () {
  function BuiltinObject() {
    this.collisionFilterGroup = index.PhysicsSystem.PhysicsGroup.DEFAULT;
    this.collisionFilterMask = -1;
  }

  var _proto = BuiltinObject.prototype;

  _proto.getGroup = function getGroup() {
    return this.collisionFilterGroup;
  };

  _proto.setGroup = function setGroup(v) {
    this.collisionFilterGroup = v;
  };

  _proto.addGroup = function addGroup(v) {
    this.collisionFilterGroup |= v;
  };

  _proto.removeGroup = function removeGroup(v) {
    this.collisionFilterGroup &= ~v;
  };

  _proto.getMask = function getMask() {
    return this.collisionFilterMask;
  };

  _proto.setMask = function setMask(v) {
    this.collisionFilterMask = v;
  };

  _proto.addMask = function addMask(v) {
    this.collisionFilterMask |= v;
  };

  _proto.removeMask = function removeMask(v) {
    this.collisionFilterMask &= ~v;
  };

  return BuiltinObject;
}();

var m4_0 = new jsonAsset.Mat4();
var v3_0 = new jsonAsset.Vec3();
var v3_1 = new jsonAsset.Vec3();
var quat_0 = new jsonAsset.Quat();
var BuiltinSharedBody = function (_BuiltinObject) {
  jsonAsset._inheritsLoose(BuiltinSharedBody, _BuiltinObject);

  BuiltinSharedBody.getSharedBody = function getSharedBody(node, wrappedWorld, wrappedBody) {
    var key = node.uuid;
    var newSB;

    if (BuiltinSharedBody.sharedBodesMap.has(key)) {
      newSB = BuiltinSharedBody.sharedBodesMap.get(key);
    } else {
      newSB = new BuiltinSharedBody(node, wrappedWorld);
      var g = collisionMatrix.PhysicsGroup.DEFAULT;
      var m = index.PhysicsSystem.instance.collisionMatrix[g];
      newSB.collisionFilterGroup = g;
      newSB.collisionFilterMask = m;
      BuiltinSharedBody.sharedBodesMap.set(node.uuid, newSB);
    }

    if (wrappedBody) {
      newSB.wrappedBody = wrappedBody;
      var _g = wrappedBody.rigidBody.group;
      var _m = index.PhysicsSystem.instance.collisionMatrix[_g];
      newSB.collisionFilterGroup = _g;
      newSB.collisionFilterMask = _m;
    }

    return newSB;
  };

  jsonAsset._createClass(BuiltinSharedBody, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "enabled",
    set: function set(v) {
      if (v) {
        if (this.index < 0) {
          this.index = this.world.bodies.length;
          this.world.addSharedBody(this);
          this.syncInitial();
        }
      } else if (this.index >= 0) {
        var isRemove = this.shapes.length === 0;

        if (isRemove) {
          this.index = -1;
          this.world.removeSharedBody(this);
        }
      }
    }
  }, {
    key: "reference",
    set: function set(v) {
      v ? this.ref++ : this.ref--;

      if (this.ref === 0) {
        this.destroy();
      }
    }
  }]);

  function BuiltinSharedBody(node, world) {
    var _this;

    _this = _BuiltinObject.call(this) || this;
    _this._id = void 0;
    _this.index = -1;
    _this.ref = 0;
    _this.node = void 0;
    _this.world = void 0;
    _this.shapes = [];
    _this.wrappedBody = null;
    _this._id = BuiltinSharedBody.idCounter++;
    _this.node = node;
    _this.world = world;
    return _this;
  }

  var _proto = BuiltinSharedBody.prototype;

  _proto.intersects = function intersects(body) {
    for (var i = 0; i < this.shapes.length; i++) {
      var shapeA = this.shapes[i];

      for (var j = 0; j < body.shapes.length; j++) {
        var shapeB = body.shapes[j];

        if (shapeA.collider.needTriggerEvent || shapeB.collider.needTriggerEvent) {
          if (jsonAsset.intersect.resolve(shapeA.worldShape, shapeB.worldShape)) {
            this.world.shapeArr.push(shapeA);
            this.world.shapeArr.push(shapeB);
          }
        }
      }
    }
  };

  _proto.addShape = function addShape(shape) {
    var i = this.shapes.indexOf(shape);

    if (i < 0) {
      this.shapes.push(shape);
    }
  };

  _proto.removeShape = function removeShape(shape) {
    var i = this.shapes.indexOf(shape);

    if (i >= 0) {
      jsonAsset.fastRemoveAt(this.shapes, i);
    }
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics() {
    if (this.node.hasChangedFlags) {
      this.node.getWorldMatrix(m4_0);
      v3_0.set(this.node.worldPosition);
      quat_0.set(this.node.worldRotation);
      v3_1.set(this.node.worldScale);

      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].transform(m4_0, v3_0, quat_0, v3_1);
      }
    }
  };

  _proto.syncInitial = function syncInitial() {
    this.node.getWorldMatrix(m4_0);
    v3_0.set(this.node.worldPosition);
    quat_0.set(this.node.worldRotation);
    v3_1.set(this.node.worldScale);

    for (var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].transform(m4_0, v3_0, quat_0, v3_1);
    }
  };

  _proto.destroy = function destroy() {
    BuiltinSharedBody.sharedBodesMap["delete"](this.node.uuid);
    this.node = null;
    this.world = null;
    this.shapes = null;
  };

  return BuiltinSharedBody;
}(BuiltinObject);
BuiltinSharedBody.sharedBodesMap = new Map();
BuiltinSharedBody.idCounter = 0;

var hitPoint = new jsonAsset.Vec3();
var TriggerEventObject = {
  type: 'onTriggerEnter',
  selfCollider: null,
  otherCollider: null,
  impl: {}
};
var BuiltInWorld = function () {
  function BuiltInWorld() {
    this.shapeArr = [];
    this.bodies = [];
    this._shapeArrPrev = [];
    this._collisionMatrix = new arrayCollisionMatrix.ArrayCollisionMatrix();
    this._collisionMatrixPrev = new arrayCollisionMatrix.ArrayCollisionMatrix();
  }

  var _proto = BuiltInWorld.prototype;

  _proto.setGravity = function setGravity(v) {};

  _proto.setAllowSleep = function setAllowSleep(v) {};

  _proto.setDefaultMaterial = function setDefaultMaterial(v) {};

  _proto.destroy = function destroy() {
    if (this.bodies.length) jsonAsset.error('You should destroy all physics component first.');
  };

  _proto.step = function step(deltaTime) {
    var tmp = this._shapeArrPrev;
    this._shapeArrPrev = this.shapeArr;
    this.shapeArr = tmp;
    this.shapeArr.length = 0;

    for (var i = 0; i < this.bodies.length; i++) {
      var bodyA = this.bodies[i];

      for (var j = i + 1; j < this.bodies.length; j++) {
        var bodyB = this.bodies[j];

        if ((bodyA.collisionFilterGroup & bodyB.collisionFilterMask) === 0 || (bodyB.collisionFilterGroup & bodyA.collisionFilterMask) === 0) {
          continue;
        }

        bodyA.intersects(bodyB);
      }
    }
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics() {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncSceneToPhysics();
    }
  };

  _proto.syncAfterEvents = function syncAfterEvents() {
    this.syncSceneToPhysics();
  };

  _proto.emitEvents = function emitEvents() {
    this.emitTriggerEvent();
  };

  _proto.raycastClosest = function raycastClosest(worldRay, options, out) {
    var tmp_d = Infinity;
    var max_d = options.maxDistance;
    var mask = options.mask;

    for (var i = 0; i < this.bodies.length; i++) {
      var body = this.bodies[i];
      if (!(body.collisionFilterGroup & mask)) continue;

      for (var _i = 0; _i < body.shapes.length; _i++) {
        var shape = body.shapes[_i];
        var distance = jsonAsset.intersect.resolve(worldRay, shape.worldShape);

        if (distance === 0 || distance > max_d) {
          continue;
        }

        if (tmp_d > distance) {
          tmp_d = distance;
          jsonAsset.Vec3.normalize(hitPoint, worldRay.d);
          jsonAsset.Vec3.scaleAndAdd(hitPoint, worldRay.o, hitPoint, distance);

          out._assign(hitPoint, distance, shape.collider, jsonAsset.Vec3.ZERO);
        }
      }
    }

    return !(tmp_d === Infinity);
  };

  _proto.raycast = function raycast(worldRay, options, pool, results) {
    var max_d = options.maxDistance;
    var mask = options.mask;

    for (var i = 0; i < this.bodies.length; i++) {
      var body = this.bodies[i];
      if (!(body.collisionFilterGroup & mask)) continue;

      for (var _i2 = 0; _i2 < body.shapes.length; _i2++) {
        var shape = body.shapes[_i2];
        var distance = jsonAsset.intersect.resolve(worldRay, shape.worldShape);

        if (distance === 0 || distance > max_d) {
          continue;
        } else {
          var r = pool.add();
          worldRay.computeHit(hitPoint, distance);

          r._assign(hitPoint, distance, shape.collider, jsonAsset.Vec3.ZERO);

          results.push(r);
        }
      }
    }

    return results.length > 0;
  };

  _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
    return BuiltinSharedBody.getSharedBody(node, this, wrappedBody);
  };

  _proto.addSharedBody = function addSharedBody(body) {
    var index = this.bodies.indexOf(body);

    if (index < 0) {
      this.bodies.push(body);
    }
  };

  _proto.removeSharedBody = function removeSharedBody(body) {
    var index = this.bodies.indexOf(body);

    if (index >= 0) {
      jsonAsset.fastRemoveAt(this.bodies, index);
    }
  };

  _proto.emitTriggerEvent = function emitTriggerEvent() {
    var shapeA;
    var shapeB;

    for (var i = 0; i < this.shapeArr.length; i += 2) {
      shapeA = this.shapeArr[i];
      shapeB = this.shapeArr[i + 1];
      TriggerEventObject.selfCollider = shapeA.collider;
      TriggerEventObject.otherCollider = shapeB.collider;

      this._collisionMatrix.set(shapeA.id, shapeB.id, true);

      if (this._collisionMatrixPrev.get(shapeA.id, shapeB.id)) {
        TriggerEventObject.type = 'onTriggerStay';
      } else {
        TriggerEventObject.type = 'onTriggerEnter';
      }

      if (shapeA.collider) {
        shapeA.collider.emit(TriggerEventObject.type, TriggerEventObject);
      }

      TriggerEventObject.selfCollider = shapeB.collider;
      TriggerEventObject.otherCollider = shapeA.collider;

      if (shapeB.collider) {
        shapeB.collider.emit(TriggerEventObject.type, TriggerEventObject);
      }
    }

    for (var _i3 = 0; _i3 < this._shapeArrPrev.length; _i3 += 2) {
      shapeA = this._shapeArrPrev[_i3];
      shapeB = this._shapeArrPrev[_i3 + 1];

      if (this._collisionMatrixPrev.get(shapeA.id, shapeB.id)) {
        if (!this._collisionMatrix.get(shapeA.id, shapeB.id)) {
          TriggerEventObject.type = 'onTriggerExit';
          TriggerEventObject.selfCollider = shapeA.collider;
          TriggerEventObject.otherCollider = shapeB.collider;

          if (shapeA.collider) {
            shapeA.collider.emit(TriggerEventObject.type, TriggerEventObject);
          }

          TriggerEventObject.selfCollider = shapeB.collider;
          TriggerEventObject.otherCollider = shapeA.collider;

          if (shapeB.collider) {
            shapeB.collider.emit(TriggerEventObject.type, TriggerEventObject);
          }

          this._collisionMatrix.set(shapeA.id, shapeB.id, false);
        }
      }
    }

    var temp = this._collisionMatrixPrev.matrix;
    this._collisionMatrixPrev.matrix = this._collisionMatrix.matrix;
    this._collisionMatrix.matrix = temp;

    this._collisionMatrix.reset();
  };

  jsonAsset._createClass(BuiltInWorld, [{
    key: "impl",
    get: function get() {
      return this;
    }
  }]);

  return BuiltInWorld;
}();

var BuiltinRigidBody = function () {
  function BuiltinRigidBody() {
    this._rigidBody = void 0;
    this._sharedBody = void 0;
  }

  var _proto = BuiltinRigidBody.prototype;

  _proto.initialize = function initialize(com) {
    this._rigidBody = com;
    this._sharedBody = index.PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
    this._sharedBody.reference = true;
  };

  _proto.onEnable = function onEnable() {
    this._sharedBody.enabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._sharedBody.enabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._rigidBody = null;
    this._sharedBody = null;
  };

  _proto.setMass = function setMass(v) {};

  _proto.setType = function setType(v) {};

  _proto.setLinearDamping = function setLinearDamping(v) {};

  _proto.setAngularDamping = function setAngularDamping(v) {};

  _proto.useGravity = function useGravity(v) {};

  _proto.useCCD = function useCCD(v) {};

  _proto.isUsingCCD = function isUsingCCD() {
    return false;
  };

  _proto.setLinearFactor = function setLinearFactor(v) {};

  _proto.setAngularFactor = function setAngularFactor(v) {};

  _proto.setAllowSleep = function setAllowSleep(v) {};

  _proto.wakeUp = function wakeUp() {};

  _proto.sleep = function sleep() {};

  _proto.clearState = function clearState() {};

  _proto.clearForces = function clearForces() {};

  _proto.clearVelocity = function clearVelocity() {};

  _proto.setSleepThreshold = function setSleepThreshold(v) {};

  _proto.getSleepThreshold = function getSleepThreshold() {
    return 0;
  };

  _proto.getLinearVelocity = function getLinearVelocity(out) {};

  _proto.setLinearVelocity = function setLinearVelocity(value) {};

  _proto.getAngularVelocity = function getAngularVelocity(out) {};

  _proto.setAngularVelocity = function setAngularVelocity(value) {};

  _proto.applyForce = function applyForce(force, relativePoint) {};

  _proto.applyLocalForce = function applyLocalForce(force, relativePoint) {};

  _proto.applyImpulse = function applyImpulse(force, relativePoint) {};

  _proto.applyLocalImpulse = function applyLocalImpulse(force, relativePoint) {};

  _proto.applyTorque = function applyTorque(torque) {};

  _proto.applyLocalTorque = function applyLocalTorque(torque) {};

  _proto.setGroup = function setGroup(v) {
    this._sharedBody.setGroup(v);
  };

  _proto.getGroup = function getGroup() {
    return this._sharedBody.getGroup();
  };

  _proto.addGroup = function addGroup(v) {
    this._sharedBody.addGroup(v);
  };

  _proto.removeGroup = function removeGroup(v) {
    this._sharedBody.removeGroup(v);
  };

  _proto.setMask = function setMask(v) {
    this._sharedBody.setMask(v);
  };

  _proto.getMask = function getMask() {
    return this._sharedBody.getMask();
  };

  _proto.addMask = function addMask(v) {
    this._sharedBody.addMask(v);
  };

  _proto.removeMask = function removeMask(v) {
    this._sharedBody.removeMask(v);
  };

  jsonAsset._createClass(BuiltinRigidBody, [{
    key: "impl",
    get: function get() {
      return this;
    }
  }, {
    key: "isAwake",
    get: function get() {
      return true;
    }
  }, {
    key: "isSleepy",
    get: function get() {
      return false;
    }
  }, {
    key: "isSleeping",
    get: function get() {
      return false;
    }
  }, {
    key: "rigidBody",
    get: function get() {
      return this._rigidBody;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }]);

  return BuiltinRigidBody;
}();

var BuiltinShape = function () {
  function BuiltinShape() {
    this.id = BuiltinShape.idCounter++;
    this._sharedBody = void 0;
    this._collider = void 0;
    this._localShape = void 0;
    this._worldShape = void 0;
  }

  var _proto = BuiltinShape.prototype;

  _proto.getAABB = function getAABB(v) {};

  _proto.getBoundingSphere = function getBoundingSphere(v) {};

  _proto.updateEventListener = function updateEventListener() {};

  _proto.setMaterial = function setMaterial(v) {};

  _proto.setAsTrigger = function setAsTrigger(v) {};

  _proto.setCenter = function setCenter(v) {
    jsonAsset.Vec3.copy(this._localShape.center, v);
  };

  _proto.initialize = function initialize(comp) {
    this._collider = comp;
    this._sharedBody = index.PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
  };

  _proto.onLoad = function onLoad() {
    this.setCenter(this._collider.center);
  };

  _proto.onEnable = function onEnable() {
    this._sharedBody.addShape(this);

    this._sharedBody.enabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._sharedBody.removeShape(this);

    this._sharedBody.enabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._collider = null;
    this._localShape = null;
    this._worldShape = null;
  };

  _proto.transform = function transform(m, pos, rot, scale) {
    this._localShape.transform(m, pos, rot, scale, this._worldShape);
  };

  _proto.getGroup = function getGroup() {
    return this._sharedBody.getGroup();
  };

  _proto.setGroup = function setGroup(v) {
    this._sharedBody.setGroup(v);
  };

  _proto.addGroup = function addGroup(v) {
    this._sharedBody.addGroup(v);
  };

  _proto.removeGroup = function removeGroup(v) {
    this._sharedBody.removeGroup(v);
  };

  _proto.getMask = function getMask() {
    return this._sharedBody.getMask();
  };

  _proto.setMask = function setMask(v) {
    this._sharedBody.setMask(v);
  };

  _proto.addMask = function addMask(v) {
    this._sharedBody.addMask(v);
  };

  _proto.removeMask = function removeMask(v) {
    this._sharedBody.removeMask(v);
  };

  jsonAsset._createClass(BuiltinShape, [{
    key: "attachedRigidBody",
    get: function get() {
      return null;
    }
  }, {
    key: "localShape",
    get: function get() {
      return this._localShape;
    }
  }, {
    key: "worldShape",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "impl",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  return BuiltinShape;
}();
BuiltinShape.idCounter = 0;

var BuiltinBoxShape = function (_BuiltinShape) {
  jsonAsset._inheritsLoose(BuiltinBoxShape, _BuiltinShape);

  jsonAsset._createClass(BuiltinBoxShape, [{
    key: "localObb",
    get: function get() {
      return this._localShape;
    }
  }, {
    key: "worldObb",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function BuiltinBoxShape() {
    var _this;

    _this = _BuiltinShape.call(this) || this;
    _this._localShape = new jsonAsset.OBB();
    _this._worldShape = new jsonAsset.OBB();
    return _this;
  }

  var _proto = BuiltinBoxShape.prototype;

  _proto.updateSize = function updateSize() {
    jsonAsset.Vec3.multiplyScalar(this.localObb.halfExtents, this.collider.size, 0.5);
    jsonAsset.Vec3.multiply(this.worldObb.halfExtents, this.localObb.halfExtents, this.collider.node.worldScale);
  };

  _proto.onLoad = function onLoad() {
    _BuiltinShape.prototype.onLoad.call(this);

    this.updateSize();
  };

  return BuiltinBoxShape;
}(BuiltinShape);

var BuiltinSphereShape = function (_BuiltinShape) {
  jsonAsset._inheritsLoose(BuiltinSphereShape, _BuiltinShape);

  var _proto = BuiltinSphereShape.prototype;

  _proto.updateRadius = function updateRadius() {
    this.localSphere.radius = this.collider.radius;
    var s = index.maxComponent(this.collider.node.worldScale);
    this.worldSphere.radius = this.localSphere.radius * s;
  };

  jsonAsset._createClass(BuiltinSphereShape, [{
    key: "localSphere",
    get: function get() {
      return this._localShape;
    }
  }, {
    key: "worldSphere",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function BuiltinSphereShape(radius) {
    var _this;

    if (radius === void 0) {
      radius = 0.5;
    }

    _this = _BuiltinShape.call(this) || this;
    _this._localShape = new jsonAsset.Sphere(0, 0, 0, radius);
    _this._worldShape = new jsonAsset.Sphere(0, 0, 0, radius);
    return _this;
  }

  _proto.onLoad = function onLoad() {
    _BuiltinShape.prototype.onLoad.call(this);

    this.updateRadius();
  };

  return BuiltinSphereShape;
}(BuiltinShape);

var BuiltinCapsuleShape = function (_BuiltinShape) {
  jsonAsset._inheritsLoose(BuiltinCapsuleShape, _BuiltinShape);

  jsonAsset._createClass(BuiltinCapsuleShape, [{
    key: "localCapsule",
    get: function get() {
      return this._localShape;
    }
  }, {
    key: "worldCapsule",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function BuiltinCapsuleShape(radius, height, direction) {
    var _this;

    if (radius === void 0) {
      radius = 0.5;
    }

    if (height === void 0) {
      height = 2;
    }

    if (direction === void 0) {
      direction = collisionMatrix.EAxisDirection.Y_AXIS;
    }

    _this = _BuiltinShape.call(this) || this;
    var halfHeight = (height - radius * 2) / 2;
    var h = halfHeight < 0 ? 0 : halfHeight;
    _this._localShape = new jsonAsset.Capsule(radius, h, direction);
    _this._worldShape = new jsonAsset.Capsule(radius, h, direction);
    return _this;
  }

  var _proto = BuiltinCapsuleShape.prototype;

  _proto.setRadius = function setRadius(v) {
    this.localCapsule.radius = v;
    this.transform(this._sharedBody.node.worldMatrix, this._sharedBody.node.worldPosition, this._sharedBody.node.worldRotation, this._sharedBody.node.worldScale);
  };

  _proto.setCylinderHeight = function setCylinderHeight(v) {
    this.localCapsule.halfHeight = v / 2;
    this.localCapsule.updateCache();
    this.transform(this._sharedBody.node.worldMatrix, this._sharedBody.node.worldPosition, this._sharedBody.node.worldRotation, this._sharedBody.node.worldScale);
  };

  _proto.setDirection = function setDirection(v) {
    this.localCapsule.axis = v;
    this.localCapsule.updateCache();
    this.worldCapsule.axis = v;
    this.worldCapsule.updateCache();
    this.transform(this._sharedBody.node.worldMatrix, this._sharedBody.node.worldPosition, this._sharedBody.node.worldRotation, this._sharedBody.node.worldScale);
  };

  _proto.onLoad = function onLoad() {
    _BuiltinShape.prototype.onLoad.call(this);

    this.setRadius(this.collider.radius);
    this.setDirection(this.collider.direction);
  };

  return BuiltinCapsuleShape;
}(BuiltinShape);

index.selector.register('builtin', {
  RigidBody: BuiltinRigidBody,
  BoxShape: BuiltinBoxShape,
  SphereShape: BuiltinSphereShape,
  PhysicsWorld: BuiltInWorld,
  CapsuleShape: BuiltinCapsuleShape
});
