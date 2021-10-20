'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var index = require('./index-04f3192a.js');
var view = require('./view-c0f88f03.js');
require('./camera-component-c6f89e45.js');
require('./renderable-component-f3f3ccc0.js');
var mesh = require('./mesh-1b66157b.js');
require('./skeleton-42e69a3d.js');
var collisionMatrix = require('./collision-matrix-ec4af174.js');
var capsule = require('./capsule-01032724.js');
var terrainAsset = require('./terrain-asset-bbf166bf.js');

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;
var PhysicsMaterial = (_dec = jsonAsset.ccclass('cc.PhysicsMaterial'), _dec(_class = (_class2 = (_temp = _class3 = function (_Asset) {
  jsonAsset._inheritsLoose(PhysicsMaterial, _Asset);

  jsonAsset._createClass(PhysicsMaterial, [{
    key: "friction",
    get: function get() {
      return this._friction;
    },
    set: function set(value) {
      if (!jsonAsset.equals(this._friction, value)) {
        this._friction = value;
        this.emit(PhysicsMaterial.EVENT_UPDATE);
      }
    }
  }, {
    key: "rollingFriction",
    get: function get() {
      return this._rollingFriction;
    },
    set: function set(value) {
      if (!jsonAsset.equals(this._rollingFriction, value)) {
        this._rollingFriction = value;
        this.emit(PhysicsMaterial.EVENT_UPDATE);
      }
    }
  }, {
    key: "spinningFriction",
    get: function get() {
      return this._spinningFriction;
    },
    set: function set(value) {
      if (!jsonAsset.equals(this._spinningFriction, value)) {
        this._spinningFriction = value;
        this.emit(PhysicsMaterial.EVENT_UPDATE);
      }
    }
  }, {
    key: "restitution",
    get: function get() {
      return this._restitution;
    },
    set: function set(value) {
      if (!jsonAsset.equals(this._restitution, value)) {
        this._restitution = value;
        this.emit(PhysicsMaterial.EVENT_UPDATE);
      }
    }
  }]);

  function PhysicsMaterial() {
    var _this;

    _this = _Asset.call(this) || this;
    _this.id = void 0;

    jsonAsset._initializerDefineProperty(_this, "_friction", _descriptor, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_rollingFriction", _descriptor2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_spinningFriction", _descriptor3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_restitution", _descriptor4, jsonAsset._assertThisInitialized(_this));

    PhysicsMaterial.allMaterials.push(jsonAsset._assertThisInitialized(_this));
    _this.id = PhysicsMaterial._idCounter++;
    if (!_this._uuid) _this._uuid = "pm_" + _this.id;
    return _this;
  }

  var _proto = PhysicsMaterial.prototype;

  _proto.clone = function clone() {
    var c = new PhysicsMaterial();
    c._friction = this._friction;
    c._restitution = this._restitution;
    c._rollingFriction = this._rollingFriction;
    c._spinningFriction = this._spinningFriction;
    return c;
  };

  _proto.destroy = function destroy() {
    if (_Asset.prototype.destroy.call(this)) {
      var idx = PhysicsMaterial.allMaterials.indexOf(this);

      if (idx >= 0) {
        PhysicsMaterial.allMaterials.splice(idx, 1);
      }

      return true;
    }

    return false;
  };

  _proto.setValues = function setValues(friction, rollingFriction, spinningFriction, restitution) {
    var emitUpdate = this._friction !== friction || this._rollingFriction !== rollingFriction || this._spinningFriction !== spinningFriction || this._restitution !== restitution;
    this._friction = friction;
    this._rollingFriction = rollingFriction;
    this._spinningFriction = spinningFriction;
    this._restitution = restitution;
    if (emitUpdate) this.emit(PhysicsMaterial.EVENT_UPDATE);
  };

  return PhysicsMaterial;
}(jsonAsset.Asset), _class3.allMaterials = [], _class3.EVENT_UPDATE = 'event_update', _class3._idCounter = 0, _temp), (jsonAsset._applyDecoratedDescriptor(_class2.prototype, "friction", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "friction"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "rollingFriction", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "rollingFriction"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "spinningFriction", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "spinningFriction"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "restitution", [jsonAsset.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "restitution"), _class2.prototype), _descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_friction", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.6;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_rollingFriction", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_spinningFriction", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_restitution", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.0;
  }
})), _class2)) || _class);

var PhysicsRayResult = function () {
  function PhysicsRayResult() {
    this._hitPoint = new jsonAsset.Vec3();
    this._hitNormal = new jsonAsset.Vec3();
    this._distance = 0;
    this._collider = null;
  }

  var _proto = PhysicsRayResult.prototype;

  _proto._assign = function _assign(hitPoint, distance, collider, hitNormal) {
    jsonAsset.Vec3.copy(this._hitPoint, hitPoint);
    jsonAsset.Vec3.copy(this._hitNormal, hitNormal);
    this._distance = distance;
    this._collider = collider;
  };

  _proto.clone = function clone() {
    var c = new PhysicsRayResult();
    jsonAsset.Vec3.copy(c._hitPoint, this._hitPoint);
    jsonAsset.Vec3.copy(c._hitNormal, this._hitNormal);
    c._distance = this._distance;
    c._collider = this._collider;
    return c;
  };

  jsonAsset._createClass(PhysicsRayResult, [{
    key: "hitPoint",
    get: function get() {
      return this._hitPoint;
    }
  }, {
    key: "distance",
    get: function get() {
      return this._distance;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }, {
    key: "hitNormal",
    get: function get() {
      return this._hitNormal;
    }
  }]);

  return PhysicsRayResult;
}();

function updateLegacyMacro(id) {
  jsonAsset.legacyCC._global.CC_PHYSICS_BUILTIN = id === 'builtin';
  jsonAsset.legacyCC._global.CC_PHYSICS_CANNON = id === 'cannon.js';
  jsonAsset.legacyCC._global.CC_PHYSICS_AMMO = id === 'ammo.js';
}

function register(id, wrapper) {
  console.info("[PHYSICS]: register " + id + ".");
  selector.backend[id] = wrapper;

  if (!selector.physicsWorld || selector.id === id) {
    updateLegacyMacro(id);
    var mutableSelector = selector;
    mutableSelector.id = id;
    mutableSelector.wrapper = wrapper;
  }
}

var worldInitData;

function switchTo(id) {
  if (!selector.runInEditor) return;
  var mutableSelector = selector;

  if (selector.physicsWorld && id !== selector.id && selector.backend[id] != null) {
    selector.physicsWorld.destroy();
    console.info("[PHYSICS]: switch from " + selector.id + " to " + id + ".");
    updateLegacyMacro(id);
    mutableSelector.id = id;
    mutableSelector.wrapper = selector.backend[id];
    mutableSelector.physicsWorld = createPhysicsWorld();
  } else {
    console.info("[PHYSICS]: using " + id + ".");
    mutableSelector.physicsWorld = createPhysicsWorld();
  }

  if (worldInitData) {
    var world = mutableSelector.physicsWorld;
    world.setGravity(worldInitData.gravity);
    world.setAllowSleep(worldInitData.allowSleep);
    world.setDefaultMaterial(worldInitData.defaultMaterial);
  }
}

var selector = {
  id: '',
  switchTo: switchTo,
  register: register,
  wrapper: {},
  backend: {},
  physicsWorld: null,
  runInEditor: !jsonAsset.EDITOR
};
function constructDefaultWorld(data) {
  if (!worldInitData) worldInitData = data;
  if (!selector.runInEditor) return;

  if (!selector.physicsWorld) {
    console.info("[PHYSICS]: using " + selector.id + ".");
    var mutableSelector = selector;
    var world = mutableSelector.physicsWorld = createPhysicsWorld();
    world.setGravity(worldInitData.gravity);
    world.setAllowSleep(worldInitData.allowSleep);
    world.setDefaultMaterial(worldInitData.defaultMaterial);
  }
}

var FUNC = function FUNC() {
  return 0;
};

var ENTIRE_WORLD = {
  impl: null,
  setGravity: FUNC,
  setAllowSleep: FUNC,
  setDefaultMaterial: FUNC,
  step: FUNC,
  syncAfterEvents: FUNC,
  syncSceneToPhysics: FUNC,
  raycast: FUNC,
  raycastClosest: FUNC,
  emitEvents: FUNC,
  destroy: FUNC
};
var ECheckType;

(function (ECheckType) {
  ECheckType[ECheckType["World"] = 0] = "World";
  ECheckType[ECheckType["RigidBody"] = 1] = "RigidBody";
  ECheckType[ECheckType["BoxCollider"] = 2] = "BoxCollider";
  ECheckType[ECheckType["SphereCollider"] = 3] = "SphereCollider";
  ECheckType[ECheckType["CapsuleCollider"] = 4] = "CapsuleCollider";
  ECheckType[ECheckType["MeshCollider"] = 5] = "MeshCollider";
  ECheckType[ECheckType["CylinderCollider"] = 6] = "CylinderCollider";
  ECheckType[ECheckType["ConeCollider"] = 7] = "ConeCollider";
  ECheckType[ECheckType["TerrainCollider"] = 8] = "TerrainCollider";
  ECheckType[ECheckType["SimplexCollider"] = 9] = "SimplexCollider";
  ECheckType[ECheckType["PlaneCollider"] = 10] = "PlaneCollider";
  ECheckType[ECheckType["PointToPointConstraint"] = 11] = "PointToPointConstraint";
  ECheckType[ECheckType["HingeConstraint"] = 12] = "HingeConstraint";
  ECheckType[ECheckType["ConeTwistConstraint"] = 13] = "ConeTwistConstraint";
})(ECheckType || (ECheckType = {}));

function check(obj, type) {
  if (obj == null) {
    if (selector.id) {
      jsonAsset.warn(selector.id + " physics does not support " + ECheckType[type]);
    } else {
      jsonAsset.errorID(9600);
    }

    return true;
  }

  return false;
}

function createPhysicsWorld() {
  if (check(selector.wrapper.PhysicsWorld, ECheckType.World)) {
    return ENTIRE_WORLD;
  }

  return new selector.wrapper.PhysicsWorld();
}
var ENTIRE_RIGID_BODY = {
  impl: null,
  rigidBody: null,
  isAwake: false,
  isSleepy: false,
  isSleeping: false,
  initialize: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC,
  setType: FUNC,
  setMass: FUNC,
  setLinearDamping: FUNC,
  setAngularDamping: FUNC,
  useGravity: FUNC,
  setLinearFactor: FUNC,
  setAngularFactor: FUNC,
  setAllowSleep: FUNC,
  wakeUp: FUNC,
  sleep: FUNC,
  clearState: FUNC,
  clearForces: FUNC,
  clearVelocity: FUNC,
  setSleepThreshold: FUNC,
  getSleepThreshold: FUNC,
  getLinearVelocity: FUNC,
  setLinearVelocity: FUNC,
  getAngularVelocity: FUNC,
  setAngularVelocity: FUNC,
  applyForce: FUNC,
  applyLocalForce: FUNC,
  applyImpulse: FUNC,
  applyLocalImpulse: FUNC,
  applyTorque: FUNC,
  applyLocalTorque: FUNC,
  setGroup: FUNC,
  getGroup: FUNC,
  addGroup: FUNC,
  removeGroup: FUNC,
  setMask: FUNC,
  getMask: FUNC,
  addMask: FUNC,
  removeMask: FUNC,
  isUsingCCD: FUNC,
  useCCD: FUNC
};
function createRigidBody() {
  if (check(selector.wrapper.RigidBody, ECheckType.RigidBody)) {
    return ENTIRE_RIGID_BODY;
  }

  return new selector.wrapper.RigidBody();
}
var CREATE_COLLIDER_PROXY = {
  INITED: false
};
var ENTIRE_SHAPE = {
  impl: null,
  collider: null,
  attachedRigidBody: null,
  initialize: FUNC,
  onLoad: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC,
  setGroup: FUNC,
  getGroup: FUNC,
  addGroup: FUNC,
  removeGroup: FUNC,
  setMask: FUNC,
  getMask: FUNC,
  addMask: FUNC,
  removeMask: FUNC,
  setMaterial: FUNC,
  setAsTrigger: FUNC,
  setCenter: FUNC,
  getAABB: FUNC,
  getBoundingSphere: FUNC,
  updateSize: FUNC,
  updateRadius: FUNC,
  setRadius: FUNC,
  setCylinderHeight: FUNC,
  setDirection: FUNC,
  setHeight: FUNC,
  setShapeType: FUNC,
  setVertices: FUNC,
  setMesh: FUNC,
  setTerrain: FUNC,
  setNormal: FUNC,
  setConstant: FUNC,
  updateEventListener: FUNC
};
function createShape(type) {
  initColliderProxy();
  return CREATE_COLLIDER_PROXY[type]();
}

function initColliderProxy() {
  if (CREATE_COLLIDER_PROXY.INITED) return;
  CREATE_COLLIDER_PROXY.INITED = true;

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.BOX] = function createBoxShape() {
    if (check(selector.wrapper.BoxShape, ECheckType.BoxCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.BoxShape();
  };

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.SPHERE] = function createSphereShape() {
    if (check(selector.wrapper.SphereShape, ECheckType.SphereCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.SphereShape();
  };

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.CAPSULE] = function createCapsuleShape() {
    if (check(selector.wrapper.CapsuleShape, ECheckType.CapsuleCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.CapsuleShape();
  };

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.CYLINDER] = function createCylinderShape() {
    if (check(selector.wrapper.CylinderShape, ECheckType.CylinderCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.CylinderShape();
  };

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.CONE] = function createConeShape() {
    if (check(selector.wrapper.ConeShape, ECheckType.ConeCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.ConeShape();
  };

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.MESH] = function createTrimeshShape() {
    if (check(selector.wrapper.TrimeshShape, ECheckType.MeshCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.TrimeshShape();
  };

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.TERRAIN] = function createTerrainShape() {
    if (check(selector.wrapper.TerrainShape, ECheckType.TerrainCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.TerrainShape();
  };

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.SIMPLEX] = function createSimplexShape() {
    if (check(selector.wrapper.SimplexShape, ECheckType.SimplexCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.SimplexShape();
  };

  CREATE_COLLIDER_PROXY[collisionMatrix.EColliderType.PLANE] = function createPlaneShape() {
    if (check(selector.wrapper.PlaneShape, ECheckType.PlaneCollider)) {
      return ENTIRE_SHAPE;
    }

    return new selector.wrapper.PlaneShape();
  };
}

var CREATE_CONSTRAINT_PROXY = {
  INITED: false
};
var ENTIRE_CONSTRAINT = {
  impl: null,
  initialize: FUNC,
  onLoad: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC,
  setEnableCollision: FUNC,
  setConnectedBody: FUNC,
  setPivotA: FUNC,
  setPivotB: FUNC,
  setAxis: FUNC
};
function createConstraint(type) {
  initConstraintProxy();
  return CREATE_CONSTRAINT_PROXY[type]();
}

function initConstraintProxy() {
  if (CREATE_CONSTRAINT_PROXY.INITED) return;
  CREATE_CONSTRAINT_PROXY.INITED = true;

  CREATE_CONSTRAINT_PROXY[collisionMatrix.EConstraintType.POINT_TO_POINT] = function createPointToPointConstraint() {
    if (check(selector.wrapper.PointToPointConstraint, ECheckType.PointToPointConstraint)) {
      return ENTIRE_CONSTRAINT;
    }

    return new selector.wrapper.PointToPointConstraint();
  };

  CREATE_CONSTRAINT_PROXY[collisionMatrix.EConstraintType.HINGE] = function createHingeConstraint() {
    if (check(selector.wrapper.HingeConstraint, ECheckType.HingeConstraint)) {
      return ENTIRE_CONSTRAINT;
    }

    return new selector.wrapper.HingeConstraint();
  };

  CREATE_CONSTRAINT_PROXY[collisionMatrix.EConstraintType.CONE_TWIST] = function createConeTwistConstraint() {
    if (check(selector.wrapper.ConeTwistConstraint, ECheckType.ConeTwistConstraint)) {
      return ENTIRE_CONSTRAINT;
    }

    return new selector.wrapper.ConeTwistConstraint();
  };
}

jsonAsset.legacyCC.internal.PhysicsGroup = collisionMatrix.PhysicsGroup;
var PhysicsSystem = function (_System) {
  jsonAsset._inheritsLoose(PhysicsSystem, _System);

  jsonAsset._createClass(PhysicsSystem, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(value) {
      this._enable = value;
    }
  }, {
    key: "allowSleep",
    get: function get() {
      return this._allowSleep;
    },
    set: function set(v) {
      this._allowSleep = v;

      if (this.physicsWorld) {
        this.physicsWorld.setAllowSleep(v);
      }
    }
  }, {
    key: "maxSubSteps",
    get: function get() {
      return this._maxSubSteps;
    },
    set: function set(value) {
      this._maxSubSteps = value;
    }
  }, {
    key: "fixedTimeStep",
    get: function get() {
      return this._fixedTimeStep;
    },
    set: function set(value) {
      this._fixedTimeStep = value;
    }
  }, {
    key: "gravity",
    get: function get() {
      return this._gravity;
    },
    set: function set(gravity) {
      this._gravity.set(gravity);

      if (this.physicsWorld) {
        this.physicsWorld.setGravity(gravity);
      }
    }
  }, {
    key: "sleepThreshold",
    get: function get() {
      return this._sleepThreshold;
    },
    set: function set(v) {
      this._sleepThreshold = v;
    }
  }, {
    key: "autoSimulation",
    get: function get() {
      return this._autoSimulation;
    },
    set: function set(value) {
      this._autoSimulation = value;
    }
  }, {
    key: "defaultMaterial",
    get: function get() {
      return this._material;
    }
  }, {
    key: "physicsWorld",
    get: function get() {
      return selector.physicsWorld;
    }
  }], [{
    key: "PHYSICS_NONE",
    get: function get() {
      return !selector.id;
    }
  }, {
    key: "PHYSICS_BUILTIN",
    get: function get() {
      return selector.id === 'builtin';
    }
  }, {
    key: "PHYSICS_CANNON",
    get: function get() {
      return selector.id === 'cannon.js';
    }
  }, {
    key: "PHYSICS_AMMO",
    get: function get() {
      return selector.id === 'ammo.js';
    }
  }, {
    key: "PHYSICS_PHYSX",
    get: function get() {
      return selector.id === 'physx';
    }
  }, {
    key: "PhysicsGroup",
    get: function get() {
      return collisionMatrix.PhysicsGroup;
    }
  }, {
    key: "instance",
    get: function get() {
      return PhysicsSystem._instance;
    }
  }]);

  function PhysicsSystem() {
    var _this;

    _this = _System.call(this) || this;
    _this.raycastClosestResult = new PhysicsRayResult();
    _this.raycastResults = [];
    _this.collisionMatrix = new collisionMatrix.CollisionMatrix(1);
    _this.minVolumeSize = 1e-5;
    _this.useNodeChains = false;
    _this._enable = true;
    _this._allowSleep = true;
    _this._maxSubSteps = 1;
    _this._subStepCount = 0;
    _this._fixedTimeStep = 1.0 / 60.0;
    _this._autoSimulation = true;
    _this._accumulator = 0;
    _this._sleepThreshold = 0.1;
    _this._gravity = new jsonAsset.Vec3(0, -10, 0);
    _this._material = new PhysicsMaterial();
    _this.raycastOptions = {
      group: -1,
      mask: -1,
      queryTrigger: true,
      maxDistance: 10000000
    };
    _this.raycastResultPool = new jsonAsset.RecyclePool(function () {
      return new PhysicsRayResult();
    }, 1);

    _this._material.on(PhysicsMaterial.EVENT_UPDATE, _this._updateMaterial, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = PhysicsSystem.prototype;

  _proto.postUpdate = function postUpdate(deltaTime) {
    if (!this.physicsWorld) return;

    if (!this._enable) {
      this.physicsWorld.syncSceneToPhysics();
      return;
    }

    if (this._autoSimulation) {
      this._subStepCount = 0;
      this._accumulator += deltaTime;
      index.director.emit(index.Director.EVENT_BEFORE_PHYSICS);

      while (this._subStepCount < this._maxSubSteps) {
        if (this._accumulator >= this._fixedTimeStep) {
          this.physicsWorld.syncSceneToPhysics();
          this.physicsWorld.step(this._fixedTimeStep);
          this.physicsWorld.emitEvents();
          this.physicsWorld.syncAfterEvents();
          this._accumulator -= this._fixedTimeStep;
          this._subStepCount++;
        } else {
          this.physicsWorld.syncSceneToPhysics();
          break;
        }
      }

      index.director.emit(index.Director.EVENT_AFTER_PHYSICS);
    }
  };

  _proto.resetConfiguration = function resetConfiguration(config) {
    var con = config || (view.game.config ? view.game.config.physics : null);

    if (con) {
      if (typeof con.allowSleep === 'boolean') this._allowSleep = con.allowSleep;
      if (typeof con.fixedTimeStep === 'number') this._fixedTimeStep = con.fixedTimeStep;
      if (typeof con.maxSubSteps === 'number') this._maxSubSteps = con.maxSubSteps;
      if (typeof con.sleepThreshold === 'number') this._sleepThreshold = con.sleepThreshold;
      if (typeof con.autoSimulation === 'boolean') this.autoSimulation = con.autoSimulation;
      if (con.gravity) jsonAsset.Vec3.copy(this._gravity, con.gravity);

      if (con.defaultMaterial) {
        this._material.setValues(con.defaultMaterial.friction, con.defaultMaterial.rollingFriction, con.defaultMaterial.spinningFriction, con.defaultMaterial.restitution);
      }

      if (con.collisionMatrix) {
        for (var i in con.collisionMatrix) {
          this.collisionMatrix["" + (1 << parseInt(i))] = con.collisionMatrix[i];
        }
      }

      if (con.collisionGroups) {
        var cg = con.collisionGroups;

        if (cg instanceof Array) {
          cg.forEach(function (v) {
            collisionMatrix.PhysicsGroup[v.name] = 1 << v.index;
          });
          jsonAsset.Enum.update(collisionMatrix.PhysicsGroup);
        }
      }
    }

    if (this.physicsWorld) {
      this.physicsWorld.setGravity(this._gravity);
      this.physicsWorld.setAllowSleep(this._allowSleep);
      this.physicsWorld.setDefaultMaterial(this._material);
    }
  };

  _proto.resetAccumulator = function resetAccumulator(time) {
    if (time === void 0) {
      time = 0;
    }

    this._accumulator = time;
  };

  _proto.step = function step(fixedTimeStep, deltaTime, maxSubSteps) {
    if (this.physicsWorld) this.physicsWorld.step(fixedTimeStep, deltaTime, maxSubSteps);
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics() {
    if (this.physicsWorld) this.physicsWorld.syncSceneToPhysics();
  };

  _proto.emitEvents = function emitEvents() {
    if (this.physicsWorld) this.physicsWorld.emitEvents();
  };

  _proto.raycast = function raycast(worldRay, mask, maxDistance, queryTrigger) {
    if (mask === void 0) {
      mask = 0xffffffff;
    }

    if (maxDistance === void 0) {
      maxDistance = 10000000;
    }

    if (queryTrigger === void 0) {
      queryTrigger = true;
    }

    if (!this.physicsWorld) return false;
    this.raycastResultPool.reset();
    this.raycastResults.length = 0;
    this.raycastOptions.mask = mask >>> 0;
    this.raycastOptions.maxDistance = maxDistance;
    this.raycastOptions.queryTrigger = queryTrigger;
    return this.physicsWorld.raycast(worldRay, this.raycastOptions, this.raycastResultPool, this.raycastResults);
  };

  _proto.raycastClosest = function raycastClosest(worldRay, mask, maxDistance, queryTrigger) {
    if (mask === void 0) {
      mask = 0xffffffff;
    }

    if (maxDistance === void 0) {
      maxDistance = 10000000;
    }

    if (queryTrigger === void 0) {
      queryTrigger = true;
    }

    if (!this.physicsWorld) return false;
    this.raycastOptions.mask = mask >>> 0;
    this.raycastOptions.maxDistance = maxDistance;
    this.raycastOptions.queryTrigger = queryTrigger;
    return this.physicsWorld.raycastClosest(worldRay, this.raycastOptions, this.raycastClosestResult);
  };

  _proto._updateMaterial = function _updateMaterial() {
    if (this.physicsWorld) this.physicsWorld.setDefaultMaterial(this._material);
  };

  PhysicsSystem.constructAndRegister = function constructAndRegister() {
    if (!PhysicsSystem._instance) {
      var sys = new PhysicsSystem();
      sys.resetConfiguration();
      constructDefaultWorld(sys);
      PhysicsSystem._instance = sys;
      index.director.registerSystem(PhysicsSystem.ID, sys, sys.priority);
    }
  };

  return PhysicsSystem;
}(index.System);
PhysicsSystem.ID = 'PHYSICS';
PhysicsSystem._instance = null;
index.director.once(index.Director.EVENT_INIT, function () {
  PhysicsSystem.constructAndRegister();
});

var _dec$1, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4$1, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _class3$1, _temp$1;
exports.RigidBody = (_dec$1 = jsonAsset.ccclass('cc.RigidBody'), _dec2 = jsonAsset.help(), _dec3 = jsonAsset.menu(), _dec4 = jsonAsset.executionOrder(-1), _dec5 = jsonAsset.type(PhysicsSystem.PhysicsGroup), _dec6 = jsonAsset.displayOrder(), _dec7 = jsonAsset.tooltip(), _dec8 = jsonAsset.type(collisionMatrix.ERigidBodyType), _dec9 = jsonAsset.displayOrder(), _dec10 = jsonAsset.tooltip(), _dec11 = jsonAsset.visible(), _dec12 = jsonAsset.displayOrder(), _dec13 = jsonAsset.tooltip(), _dec14 = jsonAsset.visible(), _dec15 = jsonAsset.displayOrder(), _dec16 = jsonAsset.tooltip(), _dec17 = jsonAsset.visible(), _dec18 = jsonAsset.displayOrder(), _dec19 = jsonAsset.tooltip(), _dec20 = jsonAsset.visible(), _dec21 = jsonAsset.displayOrder(), _dec22 = jsonAsset.tooltip(), _dec23 = jsonAsset.visible(), _dec24 = jsonAsset.displayOrder(), _dec25 = jsonAsset.tooltip(), _dec26 = jsonAsset.visible(), _dec27 = jsonAsset.displayOrder(), _dec28 = jsonAsset.tooltip(), _dec29 = jsonAsset.visible(), _dec30 = jsonAsset.displayOrder(), _dec31 = jsonAsset.tooltip(), _dec$1(_class$1 = _dec2(_class$1 = _dec3(_class$1 = jsonAsset.executeInEditMode(_class$1 = jsonAsset.disallowMultiple(_class$1 = _dec4(_class$1 = (_class2$1 = (_temp$1 = _class3$1 = function (_Component) {
  jsonAsset._inheritsLoose(RigidBody, _Component);

  function RigidBody() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this._body = null;

    jsonAsset._initializerDefineProperty(_this, "_group", _descriptor$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_type", _descriptor2$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_mass", _descriptor3$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_allowSleep", _descriptor4$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_linearDamping", _descriptor5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_angularDamping", _descriptor6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_useGravity", _descriptor7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_linearFactor", _descriptor8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_angularFactor", _descriptor9, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = RigidBody.prototype;

  _proto.onLoad = function onLoad() {
    if (!selector.runInEditor) return;
    this._body = createRigidBody();

    this._body.initialize(this);
  };

  _proto.onEnable = function onEnable() {
    if (this._body) this._body.onEnable();
  };

  _proto.onDisable = function onDisable() {
    if (this._body) this._body.onDisable();
  };

  _proto.onDestroy = function onDestroy() {
    if (this._body) this._body.onDestroy();
  };

  _proto.applyForce = function applyForce(force, relativePoint) {
    if (this._isInitialized) this._body.applyForce(force, relativePoint);
  };

  _proto.applyLocalForce = function applyLocalForce(force, localPoint) {
    if (this._isInitialized) this._body.applyLocalForce(force, localPoint);
  };

  _proto.applyImpulse = function applyImpulse(impulse, relativePoint) {
    if (this._isInitialized) this._body.applyImpulse(impulse, relativePoint);
  };

  _proto.applyLocalImpulse = function applyLocalImpulse(impulse, localPoint) {
    if (this._isInitialized) this._body.applyLocalImpulse(impulse, localPoint);
  };

  _proto.applyTorque = function applyTorque(torque) {
    if (this._isInitialized) this._body.applyTorque(torque);
  };

  _proto.applyLocalTorque = function applyLocalTorque(torque) {
    if (this._isInitialized) this._body.applyLocalTorque(torque);
  };

  _proto.wakeUp = function wakeUp() {
    if (this._isInitialized) this._body.wakeUp();
  };

  _proto.sleep = function sleep() {
    if (this._isInitialized) this._body.sleep();
  };

  _proto.clearState = function clearState() {
    if (this._isInitialized) this._body.clearState();
  };

  _proto.clearForces = function clearForces() {
    if (this._isInitialized) this._body.clearForces();
  };

  _proto.clearVelocity = function clearVelocity() {
    if (this._isInitialized) this._body.clearVelocity();
  };

  _proto.getLinearVelocity = function getLinearVelocity(out) {
    if (this._isInitialized) this._body.getLinearVelocity(out);
  };

  _proto.setLinearVelocity = function setLinearVelocity(value) {
    if (this._isInitialized) this._body.setLinearVelocity(value);
  };

  _proto.getAngularVelocity = function getAngularVelocity(out) {
    if (this._isInitialized) this._body.getAngularVelocity(out);
  };

  _proto.setAngularVelocity = function setAngularVelocity(value) {
    if (this._isInitialized) this._body.setAngularVelocity(value);
  };

  _proto.getGroup = function getGroup() {
    if (this._isInitialized) return this._body.getGroup();
    return 0;
  };

  _proto.setGroup = function setGroup(v) {
    if (this._isInitialized) this._body.setGroup(v);
  };

  _proto.addGroup = function addGroup(v) {
    if (this._isInitialized) this._body.addGroup(v);
  };

  _proto.removeGroup = function removeGroup(v) {
    if (this._isInitialized) this._body.removeGroup(v);
  };

  _proto.getMask = function getMask() {
    if (this._isInitialized) return this._body.getMask();
    return 0;
  };

  _proto.setMask = function setMask(v) {
    if (this._isInitialized) this._body.setMask(v);
  };

  _proto.addMask = function addMask(v) {
    if (this._isInitialized) this._body.addMask(v);
  };

  _proto.removeMask = function removeMask(v) {
    if (this._isInitialized) this._body.removeMask(v);
  };

  jsonAsset._createClass(RigidBody, [{
    key: "group",
    get: function get() {
      return this._group;
    },
    set: function set(v) {
      this._group = v;

      if (this._body) {
        if (this._body.getGroup() !== v) this._body.setGroup(v);
      }
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    },
    set: function set(v) {
      if (this._type === v) return;
      this._type = v;
      if (this._body) this._body.setType(v);
    }
  }, {
    key: "mass",
    get: function get() {
      return this._mass;
    },
    set: function set(value) {
      if (this._mass === value) return;
      value = value <= 0 ? 0.0001 : value;
      this._mass = value;
      if (this._body) this._body.setMass(value);
    }
  }, {
    key: "allowSleep",
    get: function get() {
      return this._allowSleep;
    },
    set: function set(v) {
      this._allowSleep = v;
      if (this._body) this._body.setAllowSleep(v);
    }
  }, {
    key: "linearDamping",
    get: function get() {
      return this._linearDamping;
    },
    set: function set(value) {
      this._linearDamping = value;
      if (this._body) this._body.setLinearDamping(value);
    }
  }, {
    key: "angularDamping",
    get: function get() {
      return this._angularDamping;
    },
    set: function set(value) {
      this._angularDamping = value;
      if (this._body) this._body.setAngularDamping(value);
    }
  }, {
    key: "useGravity",
    get: function get() {
      return this._useGravity;
    },
    set: function set(value) {
      this._useGravity = value;
      if (this._body) this._body.useGravity(value);
    }
  }, {
    key: "linearFactor",
    get: function get() {
      return this._linearFactor;
    },
    set: function set(value) {
      jsonAsset.Vec3.copy(this._linearFactor, value);

      if (this._body) {
        this._body.setLinearFactor(this._linearFactor);
      }
    }
  }, {
    key: "angularFactor",
    get: function get() {
      return this._angularFactor;
    },
    set: function set(value) {
      jsonAsset.Vec3.copy(this._angularFactor, value);

      if (this._body) {
        this._body.setAngularFactor(this._angularFactor);
      }
    }
  }, {
    key: "sleepThreshold",
    get: function get() {
      if (this._isInitialized) {
        return this._body.getSleepThreshold();
      }

      return 0.1;
    },
    set: function set(v) {
      if (this._isInitialized) {
        this._body.setSleepThreshold(v);
      }
    }
  }, {
    key: "useCCD",
    get: function get() {
      if (this._isInitialized) {
        return this._body.isUsingCCD();
      }

      return false;
    },
    set: function set(v) {
      if (this._isInitialized) {
        this._body.useCCD(v);
      }
    }
  }, {
    key: "isAwake",
    get: function get() {
      if (this._isInitialized) return this._body.isAwake;
      return false;
    }
  }, {
    key: "isSleepy",
    get: function get() {
      if (this._isInitialized) return this._body.isSleepy;
      return false;
    }
  }, {
    key: "isSleeping",
    get: function get() {
      if (this._isInitialized) return this._body.isSleeping;
      return false;
    }
  }, {
    key: "isStatic",
    get: function get() {
      return this._type === collisionMatrix.ERigidBodyType.STATIC;
    },
    set: function set(v) {
      if (v && this.isStatic || !v && !this.isStatic) return;
      this.type = v ? collisionMatrix.ERigidBodyType.STATIC : collisionMatrix.ERigidBodyType.DYNAMIC;
    }
  }, {
    key: "isDynamic",
    get: function get() {
      return this._type === collisionMatrix.ERigidBodyType.DYNAMIC;
    },
    set: function set(v) {
      if (v && this.isDynamic || !v && !this.isDynamic) return;
      this.type = v ? collisionMatrix.ERigidBodyType.DYNAMIC : collisionMatrix.ERigidBodyType.KINEMATIC;
    }
  }, {
    key: "isKinematic",
    get: function get() {
      return this._type === collisionMatrix.ERigidBodyType.KINEMATIC;
    },
    set: function set(v) {
      if (v && this.isKinematic || !v && !this.isKinematic) return;
      this.type = v ? collisionMatrix.ERigidBodyType.KINEMATIC : collisionMatrix.ERigidBodyType.DYNAMIC;
    }
  }, {
    key: "body",
    get: function get() {
      return this._body;
    }
  }, {
    key: "_isInitialized",
    get: function get() {
      var r = this._body === null;

      if (r) {
        jsonAsset.error('[Physics]: This component has not been call onLoad yet, please make sure the node has been added to the scene.');
      }

      return !r;
    }
  }]);

  return RigidBody;
}(jsonAsset.Component), _class3$1.Type = collisionMatrix.ERigidBodyType, _temp$1), (jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "group", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2$1.prototype, "group"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "type", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2$1.prototype, "type"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "mass", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2$1.prototype, "mass"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "allowSleep", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2$1.prototype, "allowSleep"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "linearDamping", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2$1.prototype, "linearDamping"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "angularDamping", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2$1.prototype, "angularDamping"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "useGravity", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2$1.prototype, "useGravity"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "linearFactor", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2$1.prototype, "linearFactor"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "angularFactor", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2$1.prototype, "angularFactor"), _class2$1.prototype), _descriptor$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_group", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return PhysicsSystem.PhysicsGroup.DEFAULT;
  }
}), _descriptor2$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_type", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return collisionMatrix.ERigidBodyType.DYNAMIC;
  }
}), _descriptor3$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_mass", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_allowSleep", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor5 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_linearDamping", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_angularDamping", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor7 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_useGravity", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor8 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_linearFactor", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3(1, 1, 1);
  }
}), _descriptor9 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_angularFactor", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3(1, 1, 1);
  }
})), _class2$1)) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1);

(function (_RigidBody) {})(exports.RigidBody || (exports.RigidBody = {}));

var _dec$2, _dec2$1, _dec3$1, _dec4$1, _dec5$1, _dec6$1, _dec7$1, _dec8$1, _dec9$1, _dec10$1, _dec11$1, _dec12$1, _dec13$1, _dec14$1, _dec15$1, _class$2, _class2$2, _descriptor$2, _descriptor2$2, _descriptor3$2, _class3$2, _temp$2;
exports.Collider = (_dec$2 = jsonAsset.ccclass('cc.Collider'), _dec2$1 = jsonAsset.type(exports.RigidBody), _dec3$1 = jsonAsset.displayName(), _dec4$1 = jsonAsset.displayOrder(), _dec5$1 = jsonAsset.tooltip(), _dec6$1 = jsonAsset.type(PhysicsMaterial), _dec7$1 = jsonAsset.displayName(), _dec8$1 = jsonAsset.displayOrder(), _dec9$1 = jsonAsset.tooltip(), _dec10$1 = jsonAsset.displayOrder(), _dec11$1 = jsonAsset.tooltip(), _dec12$1 = jsonAsset.type(jsonAsset.Vec3), _dec13$1 = jsonAsset.displayOrder(), _dec14$1 = jsonAsset.tooltip(), _dec15$1 = jsonAsset.type(PhysicsMaterial), _dec$2(_class$2 = (_class2$2 = (_temp$2 = _class3$2 = function (_Eventify) {
  jsonAsset._inheritsLoose(Collider, _Eventify);

  jsonAsset._createClass(Collider, [{
    key: "attachedRigidBody",
    get: function get() {
      return findAttachedBody(this.node);
    }
  }, {
    key: "sharedMaterial",
    get: function get() {
      return this._material;
    },
    set: function set(value) {
      {
        this.material = value;
      }
    }
  }, {
    key: "material",
    get: function get() {
      if (this._isSharedMaterial && this._material) {
        this._material.off(PhysicsMaterial.EVENT_UPDATE, this._updateMaterial, this);

        this._material = this._material.clone();

        this._material.on(PhysicsMaterial.EVENT_UPDATE, this._updateMaterial, this);

        this._isSharedMaterial = false;
      }

      return this._material;
    },
    set: function set(value) {
      if (this._shape) {
        if (value && this._material) {
          if (this._material.id !== value.id) {
            this._material.off(PhysicsMaterial.EVENT_UPDATE, this._updateMaterial, this);

            value.on(PhysicsMaterial.EVENT_UPDATE, this._updateMaterial, this);
            this._isSharedMaterial = false;
            this._material = value;
          }
        } else if (value && !this._material) {
          value.on(PhysicsMaterial.EVENT_UPDATE, this._updateMaterial, this);
          this._material = value;
        } else if (!value && this._material) {
          this._material.off(PhysicsMaterial.EVENT_UPDATE, this._updateMaterial, this);

          this._material = value;
        }

        this._updateMaterial();
      } else {
        this._material = value;
      }
    }
  }, {
    key: "isTrigger",
    get: function get() {
      return this._isTrigger;
    },
    set: function set(value) {
      this._isTrigger = value;

      if (this._shape) {
        this._shape.setAsTrigger(this._isTrigger);
      }
    }
  }, {
    key: "center",
    get: function get() {
      return this._center;
    },
    set: function set(value) {
      jsonAsset.Vec3.copy(this._center, value);

      if (this._shape) {
        this._shape.setCenter(this._center);
      }
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }, {
    key: "worldBounds",
    get: function get() {
      if (this._aabb == null) this._aabb = new jsonAsset.AABB();
      if (this._shape) this._shape.getAABB(this._aabb);
      return this._aabb;
    }
  }, {
    key: "boundingSphere",
    get: function get() {
      if (this._boundingSphere == null) this._boundingSphere = new jsonAsset.Sphere();
      if (this._shape) this._shape.getBoundingSphere(this._boundingSphere);
      return this._boundingSphere;
    }
  }, {
    key: "needTriggerEvent",
    get: function get() {
      return this._needTriggerEvent;
    }
  }, {
    key: "needCollisionEvent",
    get: function get() {
      return this._needCollisionEvent;
    }
  }, {
    key: "_isInitialized",
    get: function get() {
      var r = this._shape === null;

      if (r) {
        jsonAsset.error('[Physics]: This component has not been call onLoad yet, please make sure the node has been added to the scene.');
      }

      return !r;
    }
  }]);

  function Collider(type) {
    var _this;

    _this = _Eventify.call(this) || this;
    _this.type = void 0;
    _this._shape = null;
    _this._aabb = null;
    _this._boundingSphere = null;
    _this._isSharedMaterial = true;
    _this._needTriggerEvent = false;
    _this._needCollisionEvent = false;

    jsonAsset._initializerDefineProperty(_this, "_material", _descriptor$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_isTrigger", _descriptor2$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_center", _descriptor3$2, jsonAsset._assertThisInitialized(_this));

    _this.type = type;
    return _this;
  }

  var _proto = Collider.prototype;

  _proto.on = function on(type, callback, target, once) {
    var ret = _Eventify.prototype.on.call(this, type, callback, target, once);

    this._updateNeedEvent(type);

    return ret;
  };

  _proto.off = function off(type, callback, target) {
    _Eventify.prototype.off.call(this, type, callback, target);

    this._updateNeedEvent();
  };

  _proto.once = function once(type, callback, target) {
    var ret = _Eventify.prototype.once.call(this, type, callback, target);

    this._updateNeedEvent(type);

    return ret;
  };

  _proto.removeAll = function removeAll(typeOrTarget) {
    _Eventify.prototype.removeAll.call(this, typeOrTarget);

    this._updateNeedEvent();
  };

  _proto.getGroup = function getGroup() {
    if (this._isInitialized) {
      return this._shape.getGroup();
    }

    return 0;
  };

  _proto.setGroup = function setGroup(v) {
    if (this._isInitialized) {
      this._shape.setGroup(v);
    }
  };

  _proto.addGroup = function addGroup(v) {
    if (this._isInitialized) {
      this._shape.addGroup(v);
    }
  };

  _proto.removeGroup = function removeGroup(v) {
    if (this._isInitialized) {
      this._shape.removeGroup(v);
    }
  };

  _proto.getMask = function getMask() {
    if (this._isInitialized) {
      return this._shape.getMask();
    }

    return 0;
  };

  _proto.setMask = function setMask(v) {
    if (this._isInitialized) {
      this._shape.setMask(v);
    }
  };

  _proto.addMask = function addMask(v) {
    if (this._isInitialized) {
      this._shape.addMask(v);
    }
  };

  _proto.removeMask = function removeMask(v) {
    if (this._isInitialized) {
      this._shape.removeMask(v);
    }
  };

  _proto.onLoad = function onLoad() {
    if (!selector.runInEditor) return;
    this.sharedMaterial = this._material == null ? PhysicsSystem.instance.defaultMaterial : this._material;
    this._shape = createShape(this.type);

    this._shape.initialize(this);

    this._shape.onLoad();
  };

  _proto.onEnable = function onEnable() {
    if (this._shape) {
      this._shape.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (this._shape) {
      this._shape.onDisable();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (this._shape) {
      if (this._material) this._material.off(PhysicsMaterial.EVENT_UPDATE, this._updateMaterial, this);

      this._shape.onDestroy();
    }

    if (this._boundingSphere) this._boundingSphere.destroy();
  };

  _proto._updateMaterial = function _updateMaterial() {
    if (this._shape) this._shape.setMaterial(this._material);
  };

  _proto._updateNeedEvent = function _updateNeedEvent(type) {
    if (this.isValid) {
      if (type !== undefined) {
        if (type === 'onCollisionEnter' || type === 'onCollisionStay' || type === 'onCollisionExit') {
          this._needCollisionEvent = true;
        }

        if (type === 'onTriggerEnter' || type === 'onTriggerStay' || type === 'onTriggerExit') {
          this._needTriggerEvent = true;
        }
      } else {
        if (!(this.hasEventListener('onTriggerEnter') || this.hasEventListener('onTriggerStay') || this.hasEventListener('onTriggerExit'))) {
          this._needTriggerEvent = false;
        }

        if (!(this.hasEventListener('onCollisionEnter') || this.hasEventListener('onCollisionStay') || this.hasEventListener('onCollisionExit'))) {
          this._needCollisionEvent = false;
        }
      }

      if (this._shape) this._shape.updateEventListener();
    }
  };

  return Collider;
}(jsonAsset.Eventify(jsonAsset.Component)), _class3$2.Type = collisionMatrix.EColliderType, _class3$2.Axis = collisionMatrix.EAxisDirection, _temp$2), (jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "attachedRigidBody", [_dec2$1, jsonAsset.readOnly, _dec3$1, _dec4$1, _dec5$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "attachedRigidBody"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "sharedMaterial", [_dec6$1, _dec7$1, _dec8$1, _dec9$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "sharedMaterial"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "isTrigger", [_dec10$1, _dec11$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "isTrigger"), _class2$2.prototype), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "center", [_dec12$1, _dec13$1, _dec14$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "center"), _class2$2.prototype), _descriptor$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_material", [_dec15$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_isTrigger", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_center", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
})), _class2$2)) || _class$2);

(function (_Collider) {})(exports.Collider || (exports.Collider = {}));

function findAttachedBody(node) {
  var rb = node.getComponent(exports.RigidBody);

  if (rb && rb.isValid) {
    return rb;
  }

  return null;
}

function setWrap(object, wrapper) {
  object.__cc_wrapper__ = wrapper;
}
function getWrap(object) {
  return object.__cc_wrapper__;
}
function maxComponent(v) {
  return Math.max(v.x, Math.max(v.y, v.z));
}
var VEC3_0 = new jsonAsset.Vec3();
var TriggerEventObject = {
  type: 'onTriggerEnter',
  selfCollider: null,
  otherCollider: null,
  impl: null
};
var CollisionEventObject = {
  type: 'onCollisionEnter',
  selfCollider: null,
  otherCollider: null,
  contacts: [],
  impl: null
};
function shrinkPositions(buffer) {
  var pos = [];

  if (buffer.length >= 3) {
    pos[0] = buffer[0], pos[1] = buffer[1], pos[2] = buffer[2];
    var len = buffer.length;

    for (var i = 3; i < len; i += 3) {
      var p0 = buffer[i];
      var p1 = buffer[i + 1];
      var p2 = buffer[i + 2];
      var len2 = pos.length;
      var isNew = true;

      for (var j = 0; j < len2; j += 3) {
        if (jsonAsset.equals(p0, pos[j]) && jsonAsset.equals(p1, pos[j + 1]) && jsonAsset.equals(p2, pos[j + 2])) {
          isNew = false;
          break;
        }
      }

      if (isNew) {
        pos.push(p0);
        pos.push(p1);
        pos.push(p2);
      }
    }
  }

  return pos;
}
function absolute(v) {
  v.x = Math.abs(v.x);
  v.y = Math.abs(v.y);
  v.z = Math.abs(v.z);
  return v;
}

var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setWrap: setWrap,
    getWrap: getWrap,
    maxComponent: maxComponent,
    VEC3_0: VEC3_0,
    TriggerEventObject: TriggerEventObject,
    CollisionEventObject: CollisionEventObject,
    shrinkPositions: shrinkPositions,
    absolute: absolute,
    cylinder: capsule.cylinder
});

var _dec$3, _dec2$2, _dec3$2, _dec4$2, _dec5$2, _class$3, _class2$3, _descriptor$3, _temp$3;
var BoxCollider = (_dec$3 = jsonAsset.ccclass('cc.BoxCollider'), _dec2$2 = jsonAsset.help(), _dec3$2 = jsonAsset.menu(), _dec4$2 = jsonAsset.type(jsonAsset.Vec3), _dec5$2 = jsonAsset.tooltip(), _dec$3(_class$3 = _dec2$2(_class$3 = _dec3$2(_class$3 = jsonAsset.executeInEditMode(_class$3 = (_class2$3 = (_temp$3 = function (_Collider) {
  jsonAsset._inheritsLoose(BoxCollider, _Collider);

  jsonAsset._createClass(BoxCollider, [{
    key: "size",
    get: function get() {
      return this._size;
    },
    set: function set(value) {
      if (jsonAsset.Vec3.strictEquals(this._size, value)) return;
      jsonAsset.Vec3.copy(this._size, value);
      absolute(this._size);

      if (this._shape) {
        this.shape.updateSize();
      }
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }]);

  function BoxCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.BOX) || this;

    jsonAsset._initializerDefineProperty(_this, "_size", _descriptor$3, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return BoxCollider;
}(exports.Collider), _temp$3), (jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "size", [_dec4$2, _dec5$2], Object.getOwnPropertyDescriptor(_class2$3.prototype, "size"), _class2$3.prototype), _descriptor$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_size", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3(1, 1, 1);
  }
})), _class2$3)) || _class$3) || _class$3) || _class$3) || _class$3);

var _dec$4, _dec2$3, _dec3$3, _dec4$3, _class$4, _class2$4, _descriptor$4, _temp$4;
var SphereCollider = (_dec$4 = jsonAsset.ccclass('cc.SphereCollider'), _dec2$3 = jsonAsset.help(), _dec3$3 = jsonAsset.menu(), _dec4$3 = jsonAsset.tooltip(), _dec$4(_class$4 = _dec2$3(_class$4 = _dec3$3(_class$4 = jsonAsset.executeInEditMode(_class$4 = (_class2$4 = (_temp$4 = function (_Collider) {
  jsonAsset._inheritsLoose(SphereCollider, _Collider);

  jsonAsset._createClass(SphereCollider, [{
    key: "radius",
    get: function get() {
      return this._radius;
    },
    set: function set(value) {
      if (this._radius === value) return;
      this._radius = Math.abs(value);

      if (this._shape) {
        this.shape.updateRadius();
      }
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }]);

  function SphereCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.SPHERE) || this;

    jsonAsset._initializerDefineProperty(_this, "_radius", _descriptor$4, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return SphereCollider;
}(exports.Collider), _temp$4), (jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "radius", [_dec4$3], Object.getOwnPropertyDescriptor(_class2$4.prototype, "radius"), _class2$4.prototype), _descriptor$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_radius", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
})), _class2$4)) || _class$4) || _class$4) || _class$4) || _class$4);

var _dec$5, _dec2$4, _dec3$4, _dec4$4, _dec5$3, _dec6$2, _dec7$2, _class$5, _class2$5, _descriptor$5, _descriptor2$3, _descriptor3$3, _temp$5;
var CapsuleCollider = (_dec$5 = jsonAsset.ccclass('cc.CapsuleCollider'), _dec2$4 = jsonAsset.help(), _dec3$4 = jsonAsset.menu(), _dec4$4 = jsonAsset.tooltip(), _dec5$3 = jsonAsset.tooltip(), _dec6$2 = jsonAsset.type(collisionMatrix.EAxisDirection), _dec7$2 = jsonAsset.tooltip(), _dec$5(_class$5 = _dec2$4(_class$5 = _dec3$4(_class$5 = jsonAsset.executeInEditMode(_class$5 = (_class2$5 = (_temp$5 = function (_Collider) {
  jsonAsset._inheritsLoose(CapsuleCollider, _Collider);

  jsonAsset._createClass(CapsuleCollider, [{
    key: "radius",
    get: function get() {
      return this._radius;
    },
    set: function set(value) {
      if (this._radius === value) return;
      this._radius = Math.abs(value);

      if (this._shape) {
        this.shape.setRadius(value);
      }
    }
  }, {
    key: "cylinderHeight",
    get: function get() {
      return this._cylinderHeight;
    },
    set: function set(value) {
      if (this._cylinderHeight === value) return;
      this._cylinderHeight = Math.abs(value);

      if (this._shape) {
        this.shape.setCylinderHeight(value);
      }
    }
  }, {
    key: "direction",
    get: function get() {
      return this._direction;
    },
    set: function set(value) {
      value = Math.floor(value);
      if (value < collisionMatrix.EAxisDirection.X_AXIS || value > collisionMatrix.EAxisDirection.Z_AXIS) return;
      if (this._direction === value) return;
      this._direction = value;

      if (this._shape) {
        this.shape.setDirection(value);
      }
    }
  }, {
    key: "height",
    get: function get() {
      return this._radius * 2 + this._cylinderHeight;
    },
    set: function set(value) {
      var ch = value - this._radius * 2;
      if (ch < 0) ch = 0;
      this.cylinderHeight = ch;
    }
  }, {
    key: "worldHeight",
    get: function get() {
      return this._radius * 2 * this._getRadiusScale() + this._cylinderHeight * this._getHeightScale();
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }]);

  function CapsuleCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.CAPSULE) || this;

    jsonAsset._initializerDefineProperty(_this, "_radius", _descriptor$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_cylinderHeight", _descriptor2$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_direction", _descriptor3$3, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = CapsuleCollider.prototype;

  _proto._getRadiusScale = function _getRadiusScale() {
    if (this.node == null) return 1;
    var ws = this.node.worldScale;
    if (this._direction === collisionMatrix.EAxisDirection.Y_AXIS) return Math.abs(jsonAsset.absMax(ws.x, ws.z));
    if (this._direction === collisionMatrix.EAxisDirection.X_AXIS) return Math.abs(jsonAsset.absMax(ws.y, ws.z));
    return Math.abs(jsonAsset.absMax(ws.x, ws.y));
  };

  _proto._getHeightScale = function _getHeightScale() {
    if (this.node == null) return 1;
    var ws = this.node.worldScale;
    if (this._direction === collisionMatrix.EAxisDirection.Y_AXIS) return Math.abs(ws.y);
    if (this._direction === collisionMatrix.EAxisDirection.X_AXIS) return Math.abs(ws.x);
    return Math.abs(ws.z);
  };

  return CapsuleCollider;
}(exports.Collider), _temp$5), (jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "radius", [_dec4$4], Object.getOwnPropertyDescriptor(_class2$5.prototype, "radius"), _class2$5.prototype), jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "cylinderHeight", [_dec5$3], Object.getOwnPropertyDescriptor(_class2$5.prototype, "cylinderHeight"), _class2$5.prototype), jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "direction", [_dec6$2, _dec7$2], Object.getOwnPropertyDescriptor(_class2$5.prototype, "direction"), _class2$5.prototype), _descriptor$5 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "_radius", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
}), _descriptor2$3 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "_cylinderHeight", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor3$3 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "_direction", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return collisionMatrix.EAxisDirection.Y_AXIS;
  }
})), _class2$5)) || _class$5) || _class$5) || _class$5) || _class$5);

var _dec$6, _dec2$5, _dec3$5, _dec4$5, _dec5$4, _dec6$3, _dec7$3, _class$6, _class2$6, _descriptor$6, _descriptor2$4, _descriptor3$4, _temp$6;
var CylinderCollider = (_dec$6 = jsonAsset.ccclass('cc.CylinderCollider'), _dec2$5 = jsonAsset.help(), _dec3$5 = jsonAsset.menu(), _dec4$5 = jsonAsset.tooltip(), _dec5$4 = jsonAsset.tooltip(), _dec6$3 = jsonAsset.type(collisionMatrix.EAxisDirection), _dec7$3 = jsonAsset.tooltip(), _dec$6(_class$6 = _dec2$5(_class$6 = _dec3$5(_class$6 = jsonAsset.executeInEditMode(_class$6 = (_class2$6 = (_temp$6 = function (_Collider) {
  jsonAsset._inheritsLoose(CylinderCollider, _Collider);

  jsonAsset._createClass(CylinderCollider, [{
    key: "radius",
    get: function get() {
      return this._radius;
    },
    set: function set(value) {
      if (this._radius === value) return;
      this._radius = Math.abs(value);

      if (this._shape) {
        this.shape.setRadius(value);
      }
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    },
    set: function set(value) {
      if (this._height === value) return;
      this._height = Math.abs(value);

      if (this._shape) {
        this.shape.setHeight(value);
      }
    }
  }, {
    key: "direction",
    get: function get() {
      return this._direction;
    },
    set: function set(value) {
      if (this._direction === value) return;
      if (value < collisionMatrix.EAxisDirection.X_AXIS || value > collisionMatrix.EAxisDirection.Z_AXIS) return;
      this._direction = value;

      if (this._shape) {
        this.shape.setDirection(value);
      }
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }]);

  function CylinderCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.CYLINDER) || this;

    jsonAsset._initializerDefineProperty(_this, "_radius", _descriptor$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_height", _descriptor2$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_direction", _descriptor3$4, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return CylinderCollider;
}(exports.Collider), _temp$6), (jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "radius", [_dec4$5], Object.getOwnPropertyDescriptor(_class2$6.prototype, "radius"), _class2$6.prototype), jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "height", [_dec5$4], Object.getOwnPropertyDescriptor(_class2$6.prototype, "height"), _class2$6.prototype), jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "direction", [_dec6$3, _dec7$3], Object.getOwnPropertyDescriptor(_class2$6.prototype, "direction"), _class2$6.prototype), _descriptor$6 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "_radius", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
}), _descriptor2$4 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "_height", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 2;
  }
}), _descriptor3$4 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "_direction", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return collisionMatrix.EAxisDirection.Y_AXIS;
  }
})), _class2$6)) || _class$6) || _class$6) || _class$6) || _class$6);

var _dec$7, _dec2$6, _dec3$6, _dec4$6, _dec5$5, _dec6$4, _dec7$4, _class$7, _class2$7, _descriptor$7, _descriptor2$5, _descriptor3$5, _temp$7;
var ConeCollider = (_dec$7 = jsonAsset.ccclass('cc.ConeCollider'), _dec2$6 = jsonAsset.help(), _dec3$6 = jsonAsset.menu(), _dec4$6 = jsonAsset.tooltip(), _dec5$5 = jsonAsset.tooltip(), _dec6$4 = jsonAsset.type(collisionMatrix.EAxisDirection), _dec7$4 = jsonAsset.tooltip(), _dec$7(_class$7 = _dec2$6(_class$7 = _dec3$6(_class$7 = jsonAsset.executeInEditMode(_class$7 = (_class2$7 = (_temp$7 = function (_Collider) {
  jsonAsset._inheritsLoose(ConeCollider, _Collider);

  jsonAsset._createClass(ConeCollider, [{
    key: "radius",
    get: function get() {
      return this._radius;
    },
    set: function set(value) {
      if (this._radius === value) return;
      this._radius = Math.abs(value);

      if (this._shape) {
        this.shape.setRadius(value);
      }
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    },
    set: function set(value) {
      if (this._height === value) return;
      if (value < 0) value = 0;
      this._height = value;

      if (this._shape) {
        this.shape.setHeight(value);
      }
    }
  }, {
    key: "direction",
    get: function get() {
      return this._direction;
    },
    set: function set(value) {
      if (this._direction === value) return;
      if (value < collisionMatrix.EAxisDirection.X_AXIS || value > collisionMatrix.EAxisDirection.Z_AXIS) return;
      this._direction = value;

      if (this._shape) {
        this.shape.setDirection(value);
      }
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }]);

  function ConeCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.CONE) || this;

    jsonAsset._initializerDefineProperty(_this, "_radius", _descriptor$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_height", _descriptor2$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_direction", _descriptor3$5, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return ConeCollider;
}(exports.Collider), _temp$7), (jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "radius", [_dec4$6], Object.getOwnPropertyDescriptor(_class2$7.prototype, "radius"), _class2$7.prototype), jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "height", [_dec5$5], Object.getOwnPropertyDescriptor(_class2$7.prototype, "height"), _class2$7.prototype), jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "direction", [_dec6$4, _dec7$4], Object.getOwnPropertyDescriptor(_class2$7.prototype, "direction"), _class2$7.prototype), _descriptor$7 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_radius", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
}), _descriptor2$5 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_height", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor3$5 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_direction", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return collisionMatrix.EAxisDirection.Y_AXIS;
  }
})), _class2$7)) || _class$7) || _class$7) || _class$7) || _class$7);

var _dec$8, _dec2$7, _dec3$7, _dec4$7, _dec5$6, _dec6$5, _class$8, _class2$8, _descriptor$8, _descriptor2$6, _temp$8;
var MeshCollider = (_dec$8 = jsonAsset.ccclass('cc.MeshCollider'), _dec2$7 = jsonAsset.help(), _dec3$7 = jsonAsset.menu(), _dec4$7 = jsonAsset.type(mesh.Mesh), _dec5$6 = jsonAsset.tooltip(), _dec6$5 = jsonAsset.tooltip(), _dec$8(_class$8 = _dec2$7(_class$8 = _dec3$7(_class$8 = jsonAsset.executeInEditMode(_class$8 = (_class2$8 = (_temp$8 = function (_Collider) {
  jsonAsset._inheritsLoose(MeshCollider, _Collider);

  jsonAsset._createClass(MeshCollider, [{
    key: "mesh",
    get: function get() {
      return this._mesh;
    },
    set: function set(value) {
      if (this._mesh === value) return;
      this._mesh = value;
      if (this._shape) this.shape.setMesh(this._mesh);
    }
  }, {
    key: "convex",
    get: function get() {
      return this._convex;
    },
    set: function set(value) {
      if (this._convex === value) return;
      this._convex = value;
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }]);

  function MeshCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.MESH) || this;

    jsonAsset._initializerDefineProperty(_this, "_mesh", _descriptor$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_convex", _descriptor2$6, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return MeshCollider;
}(exports.Collider), _temp$8), (jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "mesh", [_dec4$7, _dec5$6], Object.getOwnPropertyDescriptor(_class2$8.prototype, "mesh"), _class2$8.prototype), jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "convex", [jsonAsset.editable, _dec6$5], Object.getOwnPropertyDescriptor(_class2$8.prototype, "convex"), _class2$8.prototype), _descriptor$8 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_mesh", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2$6 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_convex", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2$8)) || _class$8) || _class$8) || _class$8) || _class$8);

var _dec$9, _dec2$8, _dec3$8, _dec4$8, _dec5$7, _dec6$6, _dec7$5, _dec8$2, _dec9$2, _dec10$2, _dec11$2, _dec12$2, _class$9, _class2$9, _descriptor$9, _descriptor2$7, _descriptor3$6, _descriptor4$2, _temp$9;
var ConstantForce = (_dec$9 = jsonAsset.ccclass('cc.ConstantForce'), _dec2$8 = jsonAsset.help(), _dec3$8 = jsonAsset.requireComponent(exports.RigidBody), _dec4$8 = jsonAsset.menu(), _dec5$7 = jsonAsset.displayOrder(), _dec6$6 = jsonAsset.tooltip(), _dec7$5 = jsonAsset.displayOrder(), _dec8$2 = jsonAsset.tooltip(), _dec9$2 = jsonAsset.displayOrder(), _dec10$2 = jsonAsset.tooltip(), _dec11$2 = jsonAsset.displayOrder(), _dec12$2 = jsonAsset.tooltip(), _dec$9(_class$9 = _dec2$8(_class$9 = _dec3$8(_class$9 = _dec4$8(_class$9 = jsonAsset.disallowMultiple(_class$9 = jsonAsset.executeInEditMode(_class$9 = (_class2$9 = (_temp$9 = function (_Component) {
  jsonAsset._inheritsLoose(ConstantForce, _Component);

  function ConstantForce() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this._rigidBody = null;

    jsonAsset._initializerDefineProperty(_this, "_force", _descriptor$9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_localForce", _descriptor2$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_torque", _descriptor3$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_localTorque", _descriptor4$2, jsonAsset._assertThisInitialized(_this));

    _this._mask = 0;
    return _this;
  }

  var _proto = ConstantForce.prototype;

  _proto.onLoad = function onLoad() {
    this._rigidBody = this.node.getComponent(exports.RigidBody);

    this._maskUpdate(this._force, 1);

    this._maskUpdate(this._localForce, 2);

    this._maskUpdate(this._torque, 4);

    this._maskUpdate(this._localTorque, 8);
  };

  _proto.lateUpdate = function lateUpdate(dt) {
    {
      if (this._rigidBody != null && this._mask !== 0) {
        if (this._mask & 1) this._rigidBody.applyForce(this._force);
        if (this._mask & 2) this._rigidBody.applyLocalForce(this.localForce);
        if (this._mask & 4) this._rigidBody.applyTorque(this._torque);
        if (this._mask & 8) this._rigidBody.applyLocalTorque(this._localTorque);
      }
    }
  };

  _proto._maskUpdate = function _maskUpdate(t, m) {
    if (t.strictEquals(jsonAsset.Vec3.ZERO)) {
      this._mask &= ~m;
    } else {
      this._mask |= m;
    }
  };

  jsonAsset._createClass(ConstantForce, [{
    key: "force",
    get: function get() {
      return this._force;
    },
    set: function set(value) {
      jsonAsset.Vec3.copy(this._force, value);

      this._maskUpdate(this._force, 1);
    }
  }, {
    key: "localForce",
    get: function get() {
      return this._localForce;
    },
    set: function set(value) {
      jsonAsset.Vec3.copy(this._localForce, value);

      this._maskUpdate(this.localForce, 2);
    }
  }, {
    key: "torque",
    get: function get() {
      return this._torque;
    },
    set: function set(value) {
      jsonAsset.Vec3.copy(this._torque, value);

      this._maskUpdate(this._torque, 4);
    }
  }, {
    key: "localTorque",
    get: function get() {
      return this._localTorque;
    },
    set: function set(value) {
      jsonAsset.Vec3.copy(this._localTorque, value);

      this._maskUpdate(this._localTorque, 8);
    }
  }]);

  return ConstantForce;
}(jsonAsset.Component), _temp$9), (_descriptor$9 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_force", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
}), _descriptor2$7 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_localForce", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
}), _descriptor3$6 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_torque", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
}), _descriptor4$2 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_localTorque", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "force", [_dec5$7, _dec6$6], Object.getOwnPropertyDescriptor(_class2$9.prototype, "force"), _class2$9.prototype), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "localForce", [_dec7$5, _dec8$2], Object.getOwnPropertyDescriptor(_class2$9.prototype, "localForce"), _class2$9.prototype), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "torque", [_dec9$2, _dec10$2], Object.getOwnPropertyDescriptor(_class2$9.prototype, "torque"), _class2$9.prototype), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "localTorque", [_dec11$2, _dec12$2], Object.getOwnPropertyDescriptor(_class2$9.prototype, "localTorque"), _class2$9.prototype)), _class2$9)) || _class$9) || _class$9) || _class$9) || _class$9) || _class$9) || _class$9);

var _dec$a, _dec2$9, _dec3$9, _dec4$9, _dec5$8, _class$a, _class2$a, _descriptor$a, _temp$a;
var TerrainCollider = (_dec$a = jsonAsset.ccclass('cc.TerrainCollider'), _dec2$9 = jsonAsset.help(), _dec3$9 = jsonAsset.menu(), _dec4$9 = jsonAsset.type(terrainAsset.TerrainAsset), _dec5$8 = jsonAsset.tooltip(), _dec$a(_class$a = _dec2$9(_class$a = _dec3$9(_class$a = jsonAsset.executeInEditMode(_class$a = (_class2$a = (_temp$a = function (_Collider) {
  jsonAsset._inheritsLoose(TerrainCollider, _Collider);

  jsonAsset._createClass(TerrainCollider, [{
    key: "terrain",
    get: function get() {
      return this._terrain;
    },
    set: function set(value) {
      this._terrain = value;
      if (this._shape) this.shape.setTerrain(this._terrain);
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }]);

  function TerrainCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.TERRAIN) || this;

    jsonAsset._initializerDefineProperty(_this, "_terrain", _descriptor$a, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return TerrainCollider;
}(exports.Collider), _temp$a), (jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "terrain", [_dec4$9, _dec5$8], Object.getOwnPropertyDescriptor(_class2$a.prototype, "terrain"), _class2$a.prototype), _descriptor$a = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_terrain", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2$a)) || _class$a) || _class$a) || _class$a) || _class$a);

var _dec$b, _dec2$a, _dec3$a, _dec4$a, _dec5$9, _dec6$7, _dec7$6, _dec8$3, _dec9$3, _dec10$3, _dec11$3, _dec12$3, _class$b, _class2$b, _descriptor$b, _descriptor2$8, _class3$3, _temp$b;
exports.SimplexCollider = (_dec$b = jsonAsset.ccclass('cc.SimplexCollider'), _dec2$a = jsonAsset.help(), _dec3$a = jsonAsset.menu(), _dec4$a = jsonAsset.type(collisionMatrix.ESimplexType), _dec5$9 = jsonAsset.tooltip(), _dec6$7 = jsonAsset.tooltip(), _dec7$6 = jsonAsset.visible(), _dec8$3 = jsonAsset.tooltip(), _dec9$3 = jsonAsset.visible(), _dec10$3 = jsonAsset.tooltip(), _dec11$3 = jsonAsset.visible(), _dec12$3 = jsonAsset.tooltip(), _dec$b(_class$b = _dec2$a(_class$b = _dec3$a(_class$b = jsonAsset.executeInEditMode(_class$b = (_class2$b = (_temp$b = _class3$3 = function (_Collider) {
  jsonAsset._inheritsLoose(SimplexCollider, _Collider);

  jsonAsset._createClass(SimplexCollider, [{
    key: "shapeType",
    get: function get() {
      return this._shapeType;
    },
    set: function set(v) {
      this._shapeType = v;

      if (this._shape) {
        this.shape.setShapeType(v);
      }
    }
  }, {
    key: "vertex0",
    get: function get() {
      return this._vertices[0];
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._vertices[0], v);
      this.updateVertices();
    }
  }, {
    key: "vertex1",
    get: function get() {
      return this._vertices[1];
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._vertices[1], v);
      this.updateVertices();
    }
  }, {
    key: "vertex2",
    get: function get() {
      return this._vertices[2];
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._vertices[2], v);
      this.updateVertices();
    }
  }, {
    key: "vertex3",
    get: function get() {
      return this._vertices[3];
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._vertices[3], v);
      this.updateVertices();
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }, {
    key: "vertices",
    get: function get() {
      return this._vertices;
    }
  }]);

  function SimplexCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.SIMPLEX) || this;

    jsonAsset._initializerDefineProperty(_this, "_shapeType", _descriptor$b, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_vertices", _descriptor2$8, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = SimplexCollider.prototype;

  _proto.updateVertices = function updateVertices() {
    if (this._shape) {
      this.shape.setVertices(this._vertices);
    }
  };

  return SimplexCollider;
}(exports.Collider), _class3$3.ESimplexType = collisionMatrix.ESimplexType, _temp$b), (jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "shapeType", [_dec4$a, _dec5$9], Object.getOwnPropertyDescriptor(_class2$b.prototype, "shapeType"), _class2$b.prototype), jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "vertex0", [jsonAsset.editable, _dec6$7], Object.getOwnPropertyDescriptor(_class2$b.prototype, "vertex0"), _class2$b.prototype), jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "vertex1", [_dec7$6, _dec8$3], Object.getOwnPropertyDescriptor(_class2$b.prototype, "vertex1"), _class2$b.prototype), jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "vertex2", [_dec9$3, _dec10$3], Object.getOwnPropertyDescriptor(_class2$b.prototype, "vertex2"), _class2$b.prototype), jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "vertex3", [_dec11$3, _dec12$3], Object.getOwnPropertyDescriptor(_class2$b.prototype, "vertex3"), _class2$b.prototype), _descriptor$b = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "_shapeType", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return collisionMatrix.ESimplexType.TETRAHEDRON;
  }
}), _descriptor2$8 = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "_vertices", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [new jsonAsset.Vec3(0, 0, 0), new jsonAsset.Vec3(0, 0, 1), new jsonAsset.Vec3(1, 0, 0), new jsonAsset.Vec3(0, 1, 0)];
  }
})), _class2$b)) || _class$b) || _class$b) || _class$b) || _class$b);

(function (_SimplexCollider) {})(exports.SimplexCollider || (exports.SimplexCollider = {}));

var _dec$c, _dec2$b, _dec3$b, _dec4$b, _dec5$a, _dec6$8, _class$c, _class2$c, _descriptor$c, _descriptor2$9, _temp$c;
var PlaneCollider = (_dec$c = jsonAsset.ccclass('cc.PlaneCollider'), _dec2$b = jsonAsset.help(), _dec3$b = jsonAsset.menu(), _dec4$b = jsonAsset.type(jsonAsset.Vec3), _dec5$a = jsonAsset.tooltip(), _dec6$8 = jsonAsset.tooltip(), _dec$c(_class$c = _dec2$b(_class$c = _dec3$b(_class$c = jsonAsset.executeInEditMode(_class$c = (_class2$c = (_temp$c = function (_Collider) {
  jsonAsset._inheritsLoose(PlaneCollider, _Collider);

  jsonAsset._createClass(PlaneCollider, [{
    key: "normal",
    get: function get() {
      return this._normal;
    },
    set: function set(value) {
      if (jsonAsset.Vec3.strictEquals(this._normal, value)) return;
      jsonAsset.Vec3.copy(this._normal, value);

      if (this._shape) {
        this.shape.setNormal(this._normal);
      }
    }
  }, {
    key: "constant",
    get: function get() {
      return this._constant;
    },
    set: function set(v) {
      if (this._constant === v) return;
      this._constant = v;

      if (this._shape) {
        this.shape.setConstant(this._constant);
      }
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }]);

  function PlaneCollider() {
    var _this;

    _this = _Collider.call(this, collisionMatrix.EColliderType.PLANE) || this;

    jsonAsset._initializerDefineProperty(_this, "_normal", _descriptor$c, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_constant", _descriptor2$9, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return PlaneCollider;
}(exports.Collider), _temp$c), (jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "normal", [_dec4$b, _dec5$a], Object.getOwnPropertyDescriptor(_class2$c.prototype, "normal"), _class2$c.prototype), jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "constant", [jsonAsset.editable, _dec6$8], Object.getOwnPropertyDescriptor(_class2$c.prototype, "constant"), _class2$c.prototype), _descriptor$c = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_normal", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3(0, 1, 0);
  }
}), _descriptor2$9 = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_constant", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2$c)) || _class$c) || _class$c) || _class$c) || _class$c);

var _dec$d, _dec2$c, _dec3$c, _dec4$c, _dec5$b, _dec6$9, _dec7$7, _dec8$4, _class$d, _class2$d, _descriptor$d, _descriptor2$a, _class3$4, _temp$d;
exports.Constraint = (_dec$d = jsonAsset.ccclass('cc.Constraint'), _dec2$c = jsonAsset.requireComponent(exports.RigidBody), _dec3$c = jsonAsset.type(exports.RigidBody), _dec4$c = jsonAsset.displayOrder(), _dec5$b = jsonAsset.type(exports.RigidBody), _dec6$9 = jsonAsset.displayOrder(), _dec7$7 = jsonAsset.displayOrder(), _dec8$4 = jsonAsset.type(exports.RigidBody), _dec$d(_class$d = _dec2$c(_class$d = (_class2$d = (_temp$d = _class3$4 = function (_Eventify) {
  jsonAsset._inheritsLoose(Constraint, _Eventify);

  jsonAsset._createClass(Constraint, [{
    key: "attachedBody",
    get: function get() {
      return this.getComponent(exports.RigidBody);
    }
  }, {
    key: "connectedBody",
    get: function get() {
      return this._connectedBody;
    },
    set: function set(v) {
      this._connectedBody = v;

      {
        if (this._constraint) this._constraint.setConnectedBody(v);
      }
    }
  }, {
    key: "enableCollision",
    get: function get() {
      return this._enableCollision;
    },
    set: function set(v) {
      this._enableCollision = v;

      {
        if (this._constraint) this._constraint.setEnableCollision(v);
      }
    }
  }]);

  function Constraint(type) {
    var _this;

    _this = _Eventify.call(this) || this;
    _this.TYPE = void 0;

    jsonAsset._initializerDefineProperty(_this, "_enableCollision", _descriptor$d, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_connectedBody", _descriptor2$a, jsonAsset._assertThisInitialized(_this));

    _this._constraint = null;
    _this.TYPE = type;
    return _this;
  }

  var _proto = Constraint.prototype;

  _proto.onLoad = function onLoad() {
    if (!selector.runInEditor) return;
    this._constraint = createConstraint(this.TYPE);

    this._constraint.initialize(this);
  };

  _proto.onEnable = function onEnable() {
    if (this._constraint) {
      this._constraint.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (this._constraint) {
      this._constraint.onDisable();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (this._constraint) {
      this._constraint.onDestroy();
    }
  };

  return Constraint;
}(jsonAsset.Eventify(jsonAsset.Component)), _class3$4.Type = collisionMatrix.EConstraintType, _temp$d), (jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "attachedBody", [_dec3$c, jsonAsset.readOnly, _dec4$c], Object.getOwnPropertyDescriptor(_class2$d.prototype, "attachedBody"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "connectedBody", [_dec5$b, _dec6$9], Object.getOwnPropertyDescriptor(_class2$d.prototype, "connectedBody"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "enableCollision", [_dec7$7], Object.getOwnPropertyDescriptor(_class2$d.prototype, "enableCollision"), _class2$d.prototype), _descriptor$d = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_enableCollision", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2$a = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_connectedBody", [_dec8$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2$d)) || _class$d) || _class$d);

(function (_Constraint) {})(exports.Constraint || (exports.Constraint = {}));

var _dec$e, _dec2$d, _dec3$d, _dec4$d, _dec5$c, _dec6$a, _dec7$8, _dec8$5, _dec9$4, _class$e, _class2$e, _descriptor$e, _descriptor2$b, _descriptor3$7, _temp$e;
var HingeConstraint = (_dec$e = jsonAsset.ccclass('cc.HingeConstraint'), _dec2$d = jsonAsset.help(), _dec3$d = jsonAsset.menu(), _dec4$d = jsonAsset.type(jsonAsset.Vec3), _dec5$c = jsonAsset.type(jsonAsset.Vec3), _dec6$a = jsonAsset.type(jsonAsset.Vec3), _dec7$8 = jsonAsset.formerlySerializedAs('axisA'), _dec8$5 = jsonAsset.formerlySerializedAs('pivotA'), _dec9$4 = jsonAsset.formerlySerializedAs('pivotB'), _dec$e(_class$e = _dec2$d(_class$e = _dec3$d(_class$e = (_class2$e = (_temp$e = function (_Constraint) {
  jsonAsset._inheritsLoose(HingeConstraint, _Constraint);

  jsonAsset._createClass(HingeConstraint, [{
    key: "pivotA",
    get: function get() {
      return this._pivotA;
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._pivotA, v);

      {
        this.constraint.setPivotA(this._pivotA);
      }
    }
  }, {
    key: "pivotB",
    get: function get() {
      return this._pivotB;
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._pivotB, v);

      {
        this.constraint.setPivotB(this._pivotB);
      }
    }
  }, {
    key: "axis",
    get: function get() {
      return this._axis;
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._axis, v);

      {
        this.constraint.setAxis(this._axis);
      }
    }
  }, {
    key: "constraint",
    get: function get() {
      return this._constraint;
    }
  }]);

  function HingeConstraint() {
    var _this;

    _this = _Constraint.call(this, collisionMatrix.EConstraintType.HINGE) || this;

    jsonAsset._initializerDefineProperty(_this, "_axis", _descriptor$e, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_pivotA", _descriptor2$b, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_pivotB", _descriptor3$7, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return HingeConstraint;
}(exports.Constraint), _temp$e), (jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "pivotA", [_dec4$d], Object.getOwnPropertyDescriptor(_class2$e.prototype, "pivotA"), _class2$e.prototype), jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "pivotB", [_dec5$c], Object.getOwnPropertyDescriptor(_class2$e.prototype, "pivotB"), _class2$e.prototype), jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "axis", [_dec6$a], Object.getOwnPropertyDescriptor(_class2$e.prototype, "axis"), _class2$e.prototype), _descriptor$e = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_axis", [jsonAsset.serializable, _dec7$8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
}), _descriptor2$b = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_pivotA", [jsonAsset.serializable, _dec8$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
}), _descriptor3$7 = jsonAsset._applyDecoratedDescriptor(_class2$e.prototype, "_pivotB", [jsonAsset.serializable, _dec9$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
})), _class2$e)) || _class$e) || _class$e) || _class$e);

var _dec$f, _dec2$e, _dec3$e, _dec4$e, _dec5$d, _class$f, _class2$f, _descriptor$f, _descriptor2$c, _temp$f;
var PointToPointConstraint = (_dec$f = jsonAsset.ccclass('cc.PointToPointConstraint'), _dec2$e = jsonAsset.help(), _dec3$e = jsonAsset.menu(), _dec4$e = jsonAsset.type(jsonAsset.Vec3), _dec5$d = jsonAsset.type(jsonAsset.Vec3), _dec$f(_class$f = _dec2$e(_class$f = _dec3$e(_class$f = (_class2$f = (_temp$f = function (_Constraint) {
  jsonAsset._inheritsLoose(PointToPointConstraint, _Constraint);

  jsonAsset._createClass(PointToPointConstraint, [{
    key: "pivotA",
    get: function get() {
      return this._pivotA;
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._pivotA, v);

      {
        this.constraint.setPivotA(this._pivotA);
      }
    }
  }, {
    key: "pivotB",
    get: function get() {
      return this._pivotB;
    },
    set: function set(v) {
      jsonAsset.Vec3.copy(this._pivotB, v);

      {
        this.constraint.setPivotB(this._pivotB);
      }
    }
  }, {
    key: "constraint",
    get: function get() {
      return this._constraint;
    }
  }]);

  function PointToPointConstraint() {
    var _this;

    _this = _Constraint.call(this, collisionMatrix.EConstraintType.POINT_TO_POINT) || this;

    jsonAsset._initializerDefineProperty(_this, "_pivotA", _descriptor$f, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_pivotB", _descriptor2$c, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  return PointToPointConstraint;
}(exports.Constraint), _temp$f), (jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "pivotA", [_dec4$e], Object.getOwnPropertyDescriptor(_class2$f.prototype, "pivotA"), _class2$f.prototype), jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "pivotB", [_dec5$d], Object.getOwnPropertyDescriptor(_class2$f.prototype, "pivotB"), _class2$f.prototype), _descriptor$f = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "_pivotA", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
}), _descriptor2$c = jsonAsset._applyDecoratedDescriptor(_class2$f.prototype, "_pivotB", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec3();
  }
})), _class2$f)) || _class$f) || _class$f) || _class$f);

jsonAsset.legacyCC.PhysicsSystem = PhysicsSystem;
jsonAsset.legacyCC.PhysicsMaterial = PhysicsMaterial;
jsonAsset.legacyCC.PhysicsRayResult = PhysicsRayResult;
jsonAsset.legacyCC.ConstantForce = ConstantForce;

var physics = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PhysicsSystem: PhysicsSystem,
    PhysicsRayResult: PhysicsRayResult,
    get Collider () { return exports.Collider; },
    BoxCollider: BoxCollider,
    SphereCollider: SphereCollider,
    CapsuleCollider: CapsuleCollider,
    MeshCollider: MeshCollider,
    CylinderCollider: CylinderCollider,
    ConeCollider: ConeCollider,
    TerrainCollider: TerrainCollider,
    get SimplexCollider () { return exports.SimplexCollider; },
    PlaneCollider: PlaneCollider,
    get Constraint () { return exports.Constraint; },
    HingeConstraint: HingeConstraint,
    PointToPointConstraint: PointToPointConstraint,
    get RigidBody () { return exports.RigidBody; },
    PhysicsMaterial: PhysicsMaterial,
    ConstantForce: ConstantForce,
    selector: selector,
    utils: util,
    get ERigidBodyType () { return collisionMatrix.ERigidBodyType; },
    get EAxisDirection () { return collisionMatrix.EAxisDirection; },
    get ESimplexType () { return collisionMatrix.ESimplexType; },
    get EColliderType () { return collisionMatrix.EColliderType; },
    get EConstraintType () { return collisionMatrix.EConstraintType; },
    get PhysicsGroup () { return collisionMatrix.PhysicsGroup; }
});

exports.BoxCollider = BoxCollider;
exports.CapsuleCollider = CapsuleCollider;
exports.CollisionEventObject = CollisionEventObject;
exports.ConeCollider = ConeCollider;
exports.ConstantForce = ConstantForce;
exports.CylinderCollider = CylinderCollider;
exports.HingeConstraint = HingeConstraint;
exports.MeshCollider = MeshCollider;
exports.PhysicsMaterial = PhysicsMaterial;
exports.PhysicsRayResult = PhysicsRayResult;
exports.PhysicsSystem = PhysicsSystem;
exports.PlaneCollider = PlaneCollider;
exports.PointToPointConstraint = PointToPointConstraint;
exports.SphereCollider = SphereCollider;
exports.TerrainCollider = TerrainCollider;
exports.TriggerEventObject = TriggerEventObject;
exports.VEC3_0 = VEC3_0;
exports.absolute = absolute;
exports.getWrap = getWrap;
exports.maxComponent = maxComponent;
exports.physics = physics;
exports.selector = selector;
exports.setWrap = setWrap;
exports.shrinkPositions = shrinkPositions;
