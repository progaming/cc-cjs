'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var index = require('./index-04f3192a.js');
var view = require('./view-c0f88f03.js');
var collisionMatrix = require('./collision-matrix-ec4af174.js');

(function (ERigidBody2DType) {
  ERigidBody2DType[ERigidBody2DType["Static"] = 0] = "Static";
  ERigidBody2DType[ERigidBody2DType["Kinematic"] = 1] = "Kinematic";
  ERigidBody2DType[ERigidBody2DType["Dynamic"] = 2] = "Dynamic";
  ERigidBody2DType[ERigidBody2DType["Animated"] = 3] = "Animated";
})(exports.ERigidBody2DType || (exports.ERigidBody2DType = {}));

jsonAsset.Enum(exports.ERigidBody2DType);

(function (ECollider2DType) {
  ECollider2DType[ECollider2DType["None"] = 0] = "None";
  ECollider2DType[ECollider2DType["BOX"] = 1] = "BOX";
  ECollider2DType[ECollider2DType["CIRCLE"] = 2] = "CIRCLE";
  ECollider2DType[ECollider2DType["POLYGON"] = 3] = "POLYGON";
})(exports.ECollider2DType || (exports.ECollider2DType = {}));

jsonAsset.Enum(exports.ECollider2DType);

(function (EJoint2DType) {
  EJoint2DType[EJoint2DType["None"] = 0] = "None";
  EJoint2DType[EJoint2DType["DISTANCE"] = 1] = "DISTANCE";
  EJoint2DType[EJoint2DType["SPRING"] = 2] = "SPRING";
  EJoint2DType[EJoint2DType["WHEEL"] = 3] = "WHEEL";
  EJoint2DType[EJoint2DType["MOUSE"] = 4] = "MOUSE";
  EJoint2DType[EJoint2DType["FIXED"] = 5] = "FIXED";
  EJoint2DType[EJoint2DType["SLIDER"] = 6] = "SLIDER";
  EJoint2DType[EJoint2DType["RELATIVE"] = 7] = "RELATIVE";
  EJoint2DType[EJoint2DType["HINGE"] = 8] = "HINGE";
})(exports.EJoint2DType || (exports.EJoint2DType = {}));

jsonAsset.Enum(exports.EJoint2DType);

(function (ERaycast2DType) {
  ERaycast2DType[ERaycast2DType["Closest"] = 0] = "Closest";
  ERaycast2DType[ERaycast2DType["Any"] = 1] = "Any";
  ERaycast2DType[ERaycast2DType["AllClosest"] = 2] = "AllClosest";
  ERaycast2DType[ERaycast2DType["All"] = 3] = "All";
})(exports.ERaycast2DType || (exports.ERaycast2DType = {}));

var Contact2DType = {
  None: 'none-contact',
  BEGIN_CONTACT: 'begin-contact',
  END_CONTACT: 'end-contact',
  PRE_SOLVE: 'pre-solve',
  POST_SOLVE: 'post-solve'
};

(function (EPhysics2DDrawFlags) {
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["None"] = 0] = "None";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Shape"] = 1] = "Shape";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Joint"] = 2] = "Joint";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Aabb"] = 4] = "Aabb";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Pair"] = 8] = "Pair";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["CenterOfMass"] = 16] = "CenterOfMass";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Particle"] = 32] = "Particle";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Controller"] = 64] = "Controller";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["All"] = 63] = "All";
})(exports.EPhysics2DDrawFlags || (exports.EPhysics2DDrawFlags = {}));

var PHYSICS_2D_PTM_RATIO = 32;

var WRAPPER;
var physicsEngineId;
function select(id, wrapper) {
  physicsEngineId = id;
  jsonAsset.legacyCC._global.CC_PHYSICS_2D_BUILTIN = id == 'builtin';
  jsonAsset.legacyCC._global.CC_PHYSICS_2D_BOX2D = id == 'box2d';
  WRAPPER = wrapper;
}

var FUNC = function FUNC() {
  return 0;
};
function createPhysicsWorld() {

  return new WRAPPER.PhysicsWorld();
}
var EntireBody = {
  impl: null,
  rigidBody: null,
  isAwake: false,
  isSleeping: false,
  initialize: FUNC,
  setType: FUNC,
  setLinearDamping: FUNC,
  setAngularDamping: FUNC,
  setGravityScale: FUNC,
  setFixedRotation: FUNC,
  setAllowSleep: FUNC,
  isActive: FUNC,
  setActive: FUNC,
  wakeUp: FUNC,
  sleep: FUNC,
  getMass: FUNC,
  getInertia: FUNC,
  getLinearVelocity: FUNC,
  setLinearVelocity: FUNC,
  getLinearVelocityFromWorldPoint: FUNC,
  getAngularVelocity: FUNC,
  setAngularVelocity: FUNC,
  getLocalVector: FUNC,
  getWorldVector: FUNC,
  getLocalPoint: FUNC,
  getWorldPoint: FUNC,
  getLocalCenter: FUNC,
  getWorldCenter: FUNC,
  applyForce: FUNC,
  applyForceToCenter: FUNC,
  applyTorque: FUNC,
  applyLinearImpulse: FUNC,
  applyLinearImpulseToCenter: FUNC,
  applyAngularImpulse: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC
};
function createRigidBody() {
  var PHYSICS_2D_BUILTIN = jsonAsset.legacyCC._global.CC_PHYSICS_2D_BUILTIN;

  if (PHYSICS_2D_BUILTIN) {
    return EntireBody;
  } else {

    return new WRAPPER.RigidBody();
  }
}
var CREATE_COLLIDER_PROXY = {
  INITED: false
};
function createShape(type) {
  initColliderProxy();
  return CREATE_COLLIDER_PROXY[type]();
}

function initColliderProxy() {
  if (CREATE_COLLIDER_PROXY.INITED) return;
  CREATE_COLLIDER_PROXY.INITED = true;

  CREATE_COLLIDER_PROXY[exports.ECollider2DType.BOX] = function createBoxShape() {

    return new WRAPPER.BoxShape();
  };

  CREATE_COLLIDER_PROXY[exports.ECollider2DType.CIRCLE] = function createCircleShape() {

    return new WRAPPER.CircleShape();
  };

  CREATE_COLLIDER_PROXY[exports.ECollider2DType.POLYGON] = function createPolygonShape() {

    return new WRAPPER.PolygonShape();
  };
}

var CREATE_JOINT_PROXY = {
  INITED: false
};
var ENTIRE_JOINT = {
  impl: null,
  initialize: FUNC,
  setDampingRatio: FUNC,
  setFrequency: FUNC,
  setMaxForce: FUNC,
  setTarget: FUNC,
  setDistance: FUNC,
  setAngularOffset: FUNC,
  setCorrectionFactor: FUNC,
  setLinearOffset: FUNC,
  setMaxLength: FUNC,
  setMaxTorque: FUNC,
  setLowerLimit: FUNC,
  setUpperLimit: FUNC,
  setMaxMotorForce: FUNC,
  setMaxMotorTorque: FUNC,
  setMotorSpeed: FUNC,
  enableLimit: FUNC,
  enableMotor: FUNC,
  setLowerAngle: FUNC,
  setUpperAngle: FUNC
};
function createJoint(type) {
  initJointProxy();
  return CREATE_JOINT_PROXY[type]();
}

function initJointProxy() {
  if (CREATE_JOINT_PROXY.INITED) return;
  CREATE_JOINT_PROXY.INITED = true;
  var PHYSICS_2D_BUILTIN = jsonAsset.legacyCC._global.CC_PHYSICS_2D_BUILTIN;

  CREATE_JOINT_PROXY[exports.EJoint2DType.SPRING] = function createSpringJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {

      return new WRAPPER.SpringJoint();
    }
  };

  CREATE_JOINT_PROXY[exports.EJoint2DType.DISTANCE] = function createDistanceJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {

      return new WRAPPER.DistanceJoint();
    }
  };

  CREATE_JOINT_PROXY[exports.EJoint2DType.FIXED] = function createFixedJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {

      return new WRAPPER.FixedJoint();
    }
  };

  CREATE_JOINT_PROXY[exports.EJoint2DType.MOUSE] = function createMouseJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {

      return new WRAPPER.MouseJoint();
    }
  };

  CREATE_JOINT_PROXY[exports.EJoint2DType.RELATIVE] = function createRelativeJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {

      return new WRAPPER.RelativeJoint();
    }
  };

  CREATE_JOINT_PROXY[exports.EJoint2DType.SLIDER] = function createSliderJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {

      return new WRAPPER.SliderJoint();
    }
  };

  CREATE_JOINT_PROXY[exports.EJoint2DType.WHEEL] = function createWheelJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {

      return new WRAPPER.WheelJoint();
    }
  };

  CREATE_JOINT_PROXY[exports.EJoint2DType.HINGE] = function createHingeJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {

      return new WRAPPER.HingeJoint();
    }
  };
}

var instance = null;
var PhysicsSystem2D = function (_Eventify) {
  jsonAsset._inheritsLoose(PhysicsSystem2D, _Eventify);

  jsonAsset._createClass(PhysicsSystem2D, [{
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

      {
        this.physicsWorld.setAllowSleep(v);
      }
    }
  }, {
    key: "gravity",
    get: function get() {
      return this._gravity;
    },
    set: function set(gravity) {
      this._gravity.set(gravity);

      {
        this.physicsWorld.setGravity(new jsonAsset.Vec2(gravity.x / PHYSICS_2D_PTM_RATIO, gravity.y / PHYSICS_2D_PTM_RATIO));
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
    key: "autoSimulation",
    get: function get() {
      return this._autoSimulation;
    },
    set: function set(value) {
      this._autoSimulation = value;
    }
  }, {
    key: "debugDrawFlags",
    get: function get() {
      return this.physicsWorld.debugDrawFlags;
    },
    set: function set(v) {
      this.physicsWorld.debugDrawFlags = v;
    }
  }, {
    key: "stepping",
    get: function get() {
      return this._steping;
    }
  }], [{
    key: "PHYSICS_NONE",
    get: function get() {
      return !physicsEngineId;
    }
  }, {
    key: "PHYSICS_BUILTIN",
    get: function get() {
      return physicsEngineId === 'builtin';
    }
  }, {
    key: "PHYSICS_BOX2D",
    get: function get() {
      return physicsEngineId === 'box2d';
    }
  }, {
    key: "instance",
    get: function get() {
      if (!instance) {
        instance = new PhysicsSystem2D();
      }

      return instance;
    }
  }]);

  function PhysicsSystem2D() {
    var _this;

    _this = _Eventify.call(this) || this;
    _this.velocityIterations = 10;
    _this.positionIterations = 10;
    _this.physicsWorld = void 0;
    _this.collisionMatrix = new collisionMatrix.CollisionMatrix();
    _this._enable = true;
    _this._allowSleep = true;
    _this._maxSubSteps = 1;
    _this._fixedTimeStep = 1.0 / 60.0;
    _this._autoSimulation = true;
    _this._accumulator = 0;
    _this._steping = false;
    _this._gravity = new jsonAsset.Vec2(0, -10 * PHYSICS_2D_PTM_RATIO);
    _this._delayEvents = [];
    var config = view.game.config ? view.game.config.physics : null;

    if (config) {
      jsonAsset.Vec2.copy(_this._gravity, config.gravity);

      _this._gravity.multiplyScalar(PHYSICS_2D_PTM_RATIO);

      _this._allowSleep = config.allowSleep;
      _this._fixedTimeStep = config.fixedTimeStep;
      _this._maxSubSteps = config.maxSubSteps;
      _this._autoSimulation = config.autoSimulation;

      if (config.collisionMatrix) {
        for (var i in config.collisionMatrix) {
          var bit = parseInt(i);
          var value = 1 << parseInt(i);
          _this.collisionMatrix["" + value] = config.collisionMatrix[bit];
        }
      }
    }

    _this.physicsWorld = createPhysicsWorld();
    _this.gravity = _this._gravity;
    _this.allowSleep = _this._allowSleep;
    return _this;
  }

  var _proto = PhysicsSystem2D.prototype;

  _proto.postUpdate = function postUpdate(deltaTime) {
    if (!this._enable) {
      return;
    }

    if (!this._autoSimulation) {
      return;
    }

    index.director.emit(index.Director.EVENT_BEFORE_PHYSICS);
    this._steping = true;
    var fixedTimeStep = this._fixedTimeStep;
    var velocityIterations = this.velocityIterations;
    var positionIterations = this.positionIterations;
    this._accumulator += deltaTime;
    var substepIndex = 0;

    while (substepIndex++ < this._maxSubSteps && this._accumulator > fixedTimeStep) {
      this.physicsWorld.step(fixedTimeStep, velocityIterations, positionIterations);
      this._accumulator -= fixedTimeStep;
    }

    var events = this._delayEvents;

    for (var i = 0, l = events.length; i < l; i++) {
      var event = events[i];
      event.func.call(event.target);
    }

    events.length = 0;
    this.physicsWorld.syncPhysicsToScene();

    if (this.debugDrawFlags) {
      this.physicsWorld.drawDebug();
    }

    this._steping = false;
    index.director.emit(index.Director.EVENT_AFTER_PHYSICS);
  };

  _proto._callAfterStep = function _callAfterStep(target, func) {
    if (this._steping) {
      this._delayEvents.push({
        target: target,
        func: func
      });
    } else {
      func.call(target);
    }
  };

  _proto.resetAccumulator = function resetAccumulator(time) {
    if (time === void 0) {
      time = 0;
    }

    this._accumulator = time;
  };

  _proto.step = function step(fixedTimeStep) {
    this.physicsWorld.step(fixedTimeStep, this.velocityIterations, this.positionIterations);
  };

  _proto.raycast = function raycast(p1, p2, type, mask) {
    if (type === void 0) {
      type = exports.ERaycast2DType.Closest;
    }

    if (mask === void 0) {
      mask = 0xffffffff;
    }

    return this.physicsWorld.raycast(p1, p2, type, mask);
  };

  _proto.testPoint = function testPoint(p) {
    return this.physicsWorld.testPoint(p);
  };

  _proto.testAABB = function testAABB(rect) {
    return this.physicsWorld.testAABB(rect);
  };

  return PhysicsSystem2D;
}(jsonAsset.Eventify(index.System));
PhysicsSystem2D.ID = 'PHYSICS_2D';
index.director.once(index.Director.EVENT_INIT, function () {
  initPhysicsSystem();
});

function initPhysicsSystem() {
  if (!PhysicsSystem2D.PHYSICS_NONE && !jsonAsset.EDITOR) {
    index.director.registerSystem(PhysicsSystem2D.ID, PhysicsSystem2D.instance, index.System.Priority.LOW);
  }
}

(function (Physics2DManifoldType) {
  Physics2DManifoldType[Physics2DManifoldType["Circles"] = 0] = "Circles";
  Physics2DManifoldType[Physics2DManifoldType["FaceA"] = 1] = "FaceA";
  Physics2DManifoldType[Physics2DManifoldType["FaceB"] = 2] = "FaceB";
})(exports.Physics2DManifoldType || (exports.Physics2DManifoldType = {}));

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;
var property = jsonAsset.property,
    type = jsonAsset.type,
    menu = jsonAsset.menu;
var RigidBody2D = (_dec = jsonAsset.ccclass('cc.RigidBody2D'), _dec2 = menu(), _dec3 = type(collisionMatrix.PhysicsGroup), _dec4 = type(exports.ERigidBody2DType), _dec(_class = _dec2(_class = (_class2 = (_temp = function (_Component) {
  jsonAsset._inheritsLoose(RigidBody2D, _Component);

  function RigidBody2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "enabledContactListener", _descriptor, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "bullet", _descriptor2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "awakeOnLoad", _descriptor3, jsonAsset._assertThisInitialized(_this));

    _this._body = null;

    jsonAsset._initializerDefineProperty(_this, "_group", _descriptor4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_type", _descriptor5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_allowSleep", _descriptor6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_gravityScale", _descriptor7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_linearDamping", _descriptor8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_angularDamping", _descriptor9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_linearVelocity", _descriptor10, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_angularVelocity", _descriptor11, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_fixedRotation", _descriptor12, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = RigidBody2D.prototype;

  _proto.isAwake = function isAwake() {
    if (this._body) {
      return this._body.isAwake;
    }

    return false;
  };

  _proto.wakeUp = function wakeUp() {
    if (this._body) {
      this._body.wakeUp();
    }
  };

  _proto.sleep = function sleep() {
    if (this._body) {
      this._body.sleep();
    }
  };

  _proto.getMass = function getMass() {
    if (this._body) {
      return this._body.getMass();
    }

    return 0;
  };

  _proto.applyForce = function applyForce(force, point, wake) {
    if (this._body) {
      this._body.applyForce(force, point, wake);
    }
  };

  _proto.applyForceToCenter = function applyForceToCenter(force, wake) {
    if (this._body) {
      this._body.applyForceToCenter(force, wake);
    }
  };

  _proto.applyTorque = function applyTorque(torque, wake) {
    if (this._body) {
      this._body.applyTorque(torque, wake);
    }
  };

  _proto.applyLinearImpulse = function applyLinearImpulse(impulse, point, wake) {
    if (this._body) {
      this._body.applyLinearImpulse(impulse, point, wake);
    }
  };

  _proto.applyLinearImpulseToCenter = function applyLinearImpulseToCenter(impulse, wake) {
    if (this._body) {
      this._body.applyLinearImpulseToCenter(impulse, wake);
    }
  };

  _proto.applyAngularImpulse = function applyAngularImpulse(impulse, wake) {
    if (this._body) {
      this._body.applyAngularImpulse(impulse, wake);
    }
  };

  _proto.getLinearVelocityFromWorldPoint = function getLinearVelocityFromWorldPoint(worldPoint, out) {
    if (this._body) {
      return this._body.getLinearVelocityFromWorldPoint(worldPoint, out);
    }

    return out;
  };

  _proto.getLocalVector = function getLocalVector(worldVector, out) {
    if (this._body) {
      return this._body.getLocalVector(worldVector, out);
    }

    return out;
  };

  _proto.getWorldVector = function getWorldVector(localVector, out) {
    if (this._body) {
      return this._body.getWorldVector(localVector, out);
    }

    return out;
  };

  _proto.getLocalPoint = function getLocalPoint(worldPoint, out) {
    if (this._body) {
      return this._body.getLocalPoint(worldPoint, out);
    }

    return out;
  };

  _proto.getWorldPoint = function getWorldPoint(localPoint, out) {
    if (this._body) {
      return this._body.getWorldPoint(localPoint, out);
    }

    return out;
  };

  _proto.getLocalCenter = function getLocalCenter(out) {
    if (this._body) {
      return this._body.getLocalCenter(out);
    }

    return out;
  };

  _proto.getWorldCenter = function getWorldCenter(out) {
    if (this._body) {
      return this._body.getWorldCenter(out);
    }

    return out;
  };

  _proto.getInertia = function getInertia() {
    if (this._body) {
      this._body.getInertia();
    }

    return 0;
  };

  _proto.onLoad = function onLoad() {
    {
      this._body = createRigidBody();

      this._body.initialize(this);
    }
  };

  _proto.onEnable = function onEnable() {
    if (this._body) {
      this._body.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (this._body) {
      this._body.onDisable();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (this._body) {
      this._body.onDestroy();
    }
  };

  jsonAsset._createClass(RigidBody2D, [{
    key: "group",
    get: function get() {
      return this._group;
    },
    set: function set(v) {
      this._group = v;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    },
    set: function set(v) {
      this._type = v;

      if (this._body) {
        if (v === exports.ERigidBody2DType.Animated) {
          this._body.setType(exports.ERigidBody2DType.Kinematic);
        } else {
          this._body.setType(v);
        }
      }
    }
  }, {
    key: "allowSleep",
    get: function get() {
      return this._allowSleep;
    },
    set: function set(v) {
      this._allowSleep = v;

      if (this._body) {
        this._body.setAllowSleep(v);
      }
    }
  }, {
    key: "gravityScale",
    get: function get() {
      return this._gravityScale;
    },
    set: function set(v) {
      this._gravityScale = v;

      if (this._body) {
        this._body.setGravityScale(v);
      }
    }
  }, {
    key: "linearDamping",
    get: function get() {
      return this._linearDamping;
    },
    set: function set(v) {
      this._linearDamping = v;

      if (this._body) {
        this._body.setLinearDamping(v);
      }
    }
  }, {
    key: "angularDamping",
    get: function get() {
      return this._angularDamping;
    },
    set: function set(v) {
      this._angularDamping = v;

      if (this._body) {
        this._body.setAngularDamping(v);
      }
    }
  }, {
    key: "linearVelocity",
    get: function get() {
      if (this._body) {
        this._body.getLinearVelocity(this._linearVelocity);
      }

      return this._linearVelocity;
    },
    set: function set(v) {
      this._linearVelocity = v;

      if (this._body) {
        this._body.setLinearVelocity(v);
      }
    }
  }, {
    key: "angularVelocity",
    get: function get() {
      if (this._body) {
        this._angularVelocity = this._body.getAngularVelocity();
      }

      return this._angularVelocity;
    },
    set: function set(v) {
      this._angularVelocity = v;

      if (this._body) {
        this._body.setAngularVelocity(v);
      }
    }
  }, {
    key: "fixedRotation",
    get: function get() {
      return this._fixedRotation;
    },
    set: function set(v) {
      this._fixedRotation = v;

      if (this._body) {
        this._body.setFixedRotation(v);
      }
    }
  }, {
    key: "impl",
    get: function get() {
      return this._body;
    }
  }]);

  return RigidBody2D;
}(jsonAsset.Component), _temp), (jsonAsset._applyDecoratedDescriptor(_class2.prototype, "group", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "group"), _class2.prototype), _descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "enabledContactListener", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "bullet", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "type", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "allowSleep", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "allowSleep"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "gravityScale", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "gravityScale"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "linearDamping", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "linearDamping"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "angularDamping", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "angularDamping"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "linearVelocity", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "linearVelocity"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "angularVelocity", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "angularVelocity"), _class2.prototype), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "fixedRotation", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "fixedRotation"), _class2.prototype), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "awakeOnLoad", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_group", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return collisionMatrix.PhysicsGroup.DEFAULT;
  }
}), _descriptor5 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_type", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return exports.ERigidBody2DType.Dynamic;
  }
}), _descriptor6 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_allowSleep", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor7 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_gravityScale", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor8 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_linearDamping", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor9 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_angularDamping", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor10 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_linearVelocity", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2();
  }
}), _descriptor11 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_angularVelocity", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor12 = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_fixedRotation", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2)) || _class) || _class);

var _dec$1, _dec2$1, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4$1, _descriptor5$1, _descriptor6$1, _descriptor7$1, _descriptor8$1, _temp$1;
var Collider2D = (_dec$1 = jsonAsset.ccclass('cc.Collider2D'), _dec2$1 = jsonAsset.type(collisionMatrix.PhysicsGroup), _dec$1(_class$1 = (_class2$1 = (_temp$1 = function (_Eventify) {
  jsonAsset._inheritsLoose(Collider2D, _Eventify);

  function Collider2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Eventify.call.apply(_Eventify, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "editing", _descriptor$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "tag", _descriptor2$1, jsonAsset._assertThisInitialized(_this));

    _this.TYPE = exports.ECollider2DType.None;
    _this._shape = null;
    _this._body = null;

    jsonAsset._initializerDefineProperty(_this, "_group", _descriptor3$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_density", _descriptor4$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_sensor", _descriptor5$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_friction", _descriptor6$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_restitution", _descriptor7$1, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_offset", _descriptor8$1, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  var _proto = Collider2D.prototype;

  _proto.onLoad = function onLoad() {
    {
      this._shape = createShape(this.TYPE);

      this._shape.initialize(this);

      if (this._shape.onLoad) {
        this._shape.onLoad();
      }

      this._body = this.getComponent(RigidBody2D);
    }
  };

  _proto.onEnable = function onEnable() {
    if (this._shape) {
      this._shape.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (this._shape && this._shape.onDisable) {
      this._shape.onDisable();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (this._shape && this._shape.onDestroy) {
      this._shape.onDestroy();
    }
  };

  _proto.apply = function apply() {
    if (this._shape && this._shape.apply) {
      this._shape.apply();
    }
  };

  jsonAsset._createClass(Collider2D, [{
    key: "group",
    get: function get() {
      return this._group;
    },
    set: function set(v) {
      this._group = v;

      if (this._shape && this._shape.onGroupChanged) {
        this._shape.onGroupChanged();
      }
    }
  }, {
    key: "density",
    get: function get() {
      return this._density;
    },
    set: function set(v) {
      this._density = v;
    }
  }, {
    key: "sensor",
    get: function get() {
      return this._sensor;
    },
    set: function set(v) {
      this._sensor = v;
    }
  }, {
    key: "friction",
    get: function get() {
      return this._friction;
    },
    set: function set(v) {
      this._friction = v;
    }
  }, {
    key: "restitution",
    get: function get() {
      return this._restitution;
    },
    set: function set(v) {
      this._restitution = v;
    }
  }, {
    key: "offset",
    get: function get() {
      return this._offset;
    },
    set: function set(v) {
      this._offset = v;
    }
  }, {
    key: "body",
    get: function get() {
      return this._body;
    }
  }, {
    key: "impl",
    get: function get() {
      return this._shape;
    }
  }, {
    key: "worldAABB",
    get: function get() {
      if (this._shape) {
        return this._shape.worldAABB;
      }

      return new jsonAsset.Rect$1();
    }
  }]);

  return Collider2D;
}(jsonAsset.Eventify(jsonAsset.Component)), _temp$1), (_descriptor$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "editing", [jsonAsset.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "tag", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "group", [_dec2$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "group"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "density", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$1.prototype, "density"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "sensor", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$1.prototype, "sensor"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "friction", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$1.prototype, "friction"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "restitution", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$1.prototype, "restitution"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "offset", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$1.prototype, "offset"), _class2$1.prototype), _descriptor3$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_group", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return collisionMatrix.PhysicsGroup.DEFAULT;
  }
}), _descriptor4$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_density", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1.0;
  }
}), _descriptor5$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_sensor", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_friction", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.2;
  }
}), _descriptor7$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_restitution", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor8$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_offset", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2();
  }
})), _class2$1)) || _class$1);

var _dec$2, _dec2$2, _class$2, _class2$2, _descriptor$2, _temp$2;
var BoxCollider2D = (_dec$2 = jsonAsset.ccclass('cc.BoxCollider2D'), _dec2$2 = jsonAsset.menu(), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2$2 = (_temp$2 = function (_Collider2D) {
  jsonAsset._inheritsLoose(BoxCollider2D, _Collider2D);

  function BoxCollider2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Collider2D.call.apply(_Collider2D, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_size", _descriptor$2, jsonAsset._assertThisInitialized(_this));

    _this.TYPE = exports.ECollider2DType.BOX;
    return _this;
  }

  jsonAsset._createClass(BoxCollider2D, [{
    key: "size",
    get: function get() {
      return this._size;
    },
    set: function set(v) {
      this._size = v;
    }
  }, {
    key: "worldPoints",
    get: function get() {
      if (this._shape) {
        return this._shape.worldPoints;
      }

      return [];
    }
  }]);

  return BoxCollider2D;
}(Collider2D), _temp$2), (_descriptor$2 = jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "_size", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Size$1(1, 1);
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$2.prototype, "size", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$2.prototype, "size"), _class2$2.prototype)), _class2$2)) || _class$2) || _class$2);

var _dec$3, _dec2$3, _class$3, _class2$3, _descriptor$3, _temp$3;
var CircleCollider2D = (_dec$3 = jsonAsset.ccclass('cc.CircleCollider2D'), _dec2$3 = jsonAsset.menu(), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2$3 = (_temp$3 = function (_Collider2D) {
  jsonAsset._inheritsLoose(CircleCollider2D, _Collider2D);

  function CircleCollider2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Collider2D.call.apply(_Collider2D, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_radius", _descriptor$3, jsonAsset._assertThisInitialized(_this));

    _this.TYPE = exports.ECollider2DType.CIRCLE;
    return _this;
  }

  jsonAsset._createClass(CircleCollider2D, [{
    key: "radius",
    get: function get() {
      return this._radius;
    },
    set: function set(v) {
      this._radius = v < 0 ? 0 : v;
    }
  }, {
    key: "worldPosition",
    get: function get() {
      if (this._shape) {
        return this._shape.worldPosition;
      }

      return new jsonAsset.Vec2();
    }
  }, {
    key: "worldRadius",
    get: function get() {
      if (this._shape) {
        return this._shape.worldRadius;
      }

      return 0;
    }
  }]);

  return CircleCollider2D;
}(Collider2D), _temp$3), (_descriptor$3 = jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "_radius", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$3.prototype, "radius", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$3.prototype, "radius"), _class2$3.prototype)), _class2$3)) || _class$3) || _class$3);

var _dec$4, _dec2$4, _dec3$1, _dec4$1, _class$4, _class2$4, _descriptor$4, _descriptor2$2, _temp$4;
var PolygonCollider2D = (_dec$4 = jsonAsset.ccclass('cc.PolygonCollider2D'), _dec2$4 = jsonAsset.menu(), _dec3$1 = jsonAsset.property({
  serializable: false
}), _dec4$1 = jsonAsset.property({
  type: jsonAsset.Vec2
}), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2$4 = (_temp$4 = function (_Collider2D) {
  jsonAsset._inheritsLoose(PolygonCollider2D, _Collider2D);

  function PolygonCollider2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Collider2D.call.apply(_Collider2D, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "threshold", _descriptor$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_points", _descriptor2$2, jsonAsset._assertThisInitialized(_this));

    _this.TYPE = exports.ECollider2DType.POLYGON;
    return _this;
  }

  jsonAsset._createClass(PolygonCollider2D, [{
    key: "points",
    get: function get() {
      return this._points;
    },
    set: function set(v) {
      this._points = v;
    }
  }, {
    key: "worldPoints",
    get: function get() {
      if (this._shape) {
        return this._shape.worldPoints;
      }

      return [];
    }
  }]);

  return PolygonCollider2D;
}(Collider2D), _temp$4), (_descriptor$4 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "threshold", [_dec3$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor2$2 = jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "_points", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [new jsonAsset.Vec2(-1, -1), new jsonAsset.Vec2(1, -1), new jsonAsset.Vec2(1, 1), new jsonAsset.Vec2(-1, 1)];
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$4.prototype, "points", [_dec4$1], Object.getOwnPropertyDescriptor(_class2$4.prototype, "points"), _class2$4.prototype)), _class2$4)) || _class$4) || _class$4);

var _dec$5, _dec2$5, _class$5, _class2$5, _descriptor$5, _descriptor2$3, _descriptor3$2, _descriptor4$2, _temp$5;
var Joint2D = (_dec$5 = jsonAsset.ccclass('cc.Joint2D'), _dec2$5 = jsonAsset.type(RigidBody2D), _dec$5(_class$5 = (_class2$5 = (_temp$5 = function (_Component) {
  jsonAsset._inheritsLoose(Joint2D, _Component);

  function Joint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "anchor", _descriptor$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "connectedAnchor", _descriptor2$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "collideConnected", _descriptor3$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "connectedBody", _descriptor4$2, jsonAsset._assertThisInitialized(_this));

    _this._body = null;
    _this._joint = null;
    _this.TYPE = exports.EJoint2DType.None;
    return _this;
  }

  var _proto = Joint2D.prototype;

  _proto.onLoad = function onLoad() {
    {
      this._joint = createJoint(this.TYPE);

      this._joint.initialize(this);

      this._body = this.getComponent(RigidBody2D);
    }
  };

  _proto.onEnable = function onEnable() {
    if (this._joint && this._joint.onEnable) {
      this._joint.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (this._joint && this._joint.onDisable) {
      this._joint.onDisable();
    }
  };

  _proto.start = function start() {
    if (this._joint && this._joint.start) {
      this._joint.start();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (this._joint && this._joint.onDestroy) {
      this._joint.onDestroy();
    }
  };

  jsonAsset._createClass(Joint2D, [{
    key: "body",
    get: function get() {
      return this._body;
    }
  }, {
    key: "impl",
    get: function get() {
      return this._joint;
    }
  }]);

  return Joint2D;
}(jsonAsset.Component), _temp$5), (_descriptor$5 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "anchor", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2();
  }
}), _descriptor2$3 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "connectedAnchor", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2();
  }
}), _descriptor3$2 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "collideConnected", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4$2 = jsonAsset._applyDecoratedDescriptor(_class2$5.prototype, "connectedBody", [_dec2$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2$5)) || _class$5);

var _dec$6, _dec2$6, _class$6, _class2$6, _descriptor$6, _descriptor2$4, _temp$6;
var DistanceJoint2D = (_dec$6 = jsonAsset.ccclass('cc.DistanceJoint2D'), _dec2$6 = jsonAsset.menu(), _dec$6(_class$6 = _dec2$6(_class$6 = (_class2$6 = (_temp$6 = function (_Joint2D) {
  jsonAsset._inheritsLoose(DistanceJoint2D, _Joint2D);

  function DistanceJoint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
    _this.TYPE = exports.EJoint2DType.DISTANCE;

    jsonAsset._initializerDefineProperty(_this, "_maxLength", _descriptor$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_autoCalcDistance", _descriptor2$4, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  jsonAsset._createClass(DistanceJoint2D, [{
    key: "maxLength",
    get: function get() {
      if (this._autoCalcDistance && this.connectedBody) {
        return jsonAsset.Vec3.distance(this.node.worldPosition, this.connectedBody.node.worldPosition);
      }

      return this._maxLength;
    },
    set: function set(v) {
      this._maxLength = v;

      if (this._joint) {
        this._joint.setMaxLength(v);
      }
    }
  }, {
    key: "autoCalcDistance",
    get: function get() {
      return this._autoCalcDistance;
    },
    set: function set(v) {
      this._autoCalcDistance = v;
    }
  }]);

  return DistanceJoint2D;
}(Joint2D), _temp$6), (jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "maxLength", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$6.prototype, "maxLength"), _class2$6.prototype), jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "autoCalcDistance", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$6.prototype, "autoCalcDistance"), _class2$6.prototype), _descriptor$6 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "_maxLength", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor2$4 = jsonAsset._applyDecoratedDescriptor(_class2$6.prototype, "_autoCalcDistance", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2$6)) || _class$6) || _class$6);

var _dec$7, _dec2$7, _class$7, _class2$7, _descriptor$7, _descriptor2$5, _descriptor3$3, _descriptor4$3, _temp$7;
var SpringJoint2D = (_dec$7 = jsonAsset.ccclass('cc.SpringJoint2D'), _dec2$7 = jsonAsset.menu(), _dec$7(_class$7 = _dec2$7(_class$7 = (_class2$7 = (_temp$7 = function (_Joint2D) {
  jsonAsset._inheritsLoose(SpringJoint2D, _Joint2D);

  function SpringJoint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
    _this.TYPE = exports.EJoint2DType.SPRING;

    jsonAsset._initializerDefineProperty(_this, "_frequency", _descriptor$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_dampingRatio", _descriptor2$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_distance", _descriptor3$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_autoCalcDistance", _descriptor4$3, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  jsonAsset._createClass(SpringJoint2D, [{
    key: "frequency",
    get: function get() {
      return this._frequency;
    },
    set: function set(v) {
      this._frequency = v;

      if (this._joint) {
        this._joint.setFrequency(v);
      }
    }
  }, {
    key: "dampingRatio",
    get: function get() {
      return this._dampingRatio;
    },
    set: function set(v) {
      this._dampingRatio = v;

      if (this._joint) {
        this._joint.setDampingRatio(v);
      }
    }
  }, {
    key: "distance",
    get: function get() {
      if (this._autoCalcDistance && this.connectedBody) {
        return jsonAsset.Vec3.distance(this.node.worldPosition, this.connectedBody.node.worldPosition);
      }

      return this._distance;
    },
    set: function set(v) {
      this._distance = v;

      if (this._joint) {
        this._joint.setDistance(v);
      }
    }
  }, {
    key: "autoCalcDistance",
    get: function get() {
      return this._autoCalcDistance;
    },
    set: function set(v) {
      this._autoCalcDistance = v;
    }
  }]);

  return SpringJoint2D;
}(Joint2D), _temp$7), (jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "frequency", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$7.prototype, "frequency"), _class2$7.prototype), jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "dampingRatio", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$7.prototype, "dampingRatio"), _class2$7.prototype), jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "distance", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$7.prototype, "distance"), _class2$7.prototype), jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "autoCalcDistance", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$7.prototype, "autoCalcDistance"), _class2$7.prototype), _descriptor$7 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_frequency", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor2$5 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_dampingRatio", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.7;
  }
}), _descriptor3$3 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_distance", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 10;
  }
}), _descriptor4$3 = jsonAsset._applyDecoratedDescriptor(_class2$7.prototype, "_autoCalcDistance", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2$7)) || _class$7) || _class$7);

var _dec$8, _dec2$8, _class$8, _class2$8, _descriptor$8, _descriptor2$6, _descriptor3$4, _temp$8;
var MouseJoint2D = (_dec$8 = jsonAsset.ccclass('cc.MouseJoint2D'), _dec2$8 = jsonAsset.menu(), _dec$8(_class$8 = _dec2$8(_class$8 = (_class2$8 = (_temp$8 = function (_Joint2D) {
  jsonAsset._inheritsLoose(MouseJoint2D, _Joint2D);

  function MouseJoint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
    _this.TYPE = exports.EJoint2DType.MOUSE;

    jsonAsset._initializerDefineProperty(_this, "_maxForce", _descriptor$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_dampingRatio", _descriptor2$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_frequency", _descriptor3$4, jsonAsset._assertThisInitialized(_this));

    _this._target = new jsonAsset.Vec2();
    return _this;
  }

  var _proto = MouseJoint2D.prototype;

  _proto.update = function update(dt) {
    this._joint.update(dt);
  };

  jsonAsset._createClass(MouseJoint2D, [{
    key: "target",
    get: function get() {
      return this._target;
    },
    set: function set(v) {
      this._target = v;

      if (this._joint) {
        this._joint.setTarget(v);
      }
    }
  }, {
    key: "frequency",
    get: function get() {
      return this._frequency;
    },
    set: function set(v) {
      this._frequency = v;

      if (this._joint) {
        this._joint.setFrequency(v);
      }
    }
  }, {
    key: "dampingRatio",
    get: function get() {
      return this._dampingRatio;
    },
    set: function set(v) {
      this._dampingRatio = v;

      if (this._joint) {
        this._joint.setDampingRatio(v);
      }
    }
  }, {
    key: "maxForce",
    get: function get() {
      return this._maxForce;
    },
    set: function set(v) {
      this._maxForce = v;

      if (this._joint) {
        this._joint.setMaxForce(v);
      }
    }
  }]);

  return MouseJoint2D;
}(Joint2D), _temp$8), (jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "frequency", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$8.prototype, "frequency"), _class2$8.prototype), jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "dampingRatio", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$8.prototype, "dampingRatio"), _class2$8.prototype), jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "maxForce", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$8.prototype, "maxForce"), _class2$8.prototype), _descriptor$8 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_maxForce", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor2$6 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_dampingRatio", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.7;
  }
}), _descriptor3$4 = jsonAsset._applyDecoratedDescriptor(_class2$8.prototype, "_frequency", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
})), _class2$8)) || _class$8) || _class$8);

var _dec$9, _dec2$9, _class$9, _class2$9, _descriptor$9, _descriptor2$7, _descriptor3$5, _descriptor4$4, _descriptor5$2, _descriptor6$2, _temp$9;
var tempVec3_1 = new jsonAsset.Vec3();
var tempVec3_2 = new jsonAsset.Vec3();
var RelativeJoint2D = (_dec$9 = jsonAsset.ccclass('cc.RelativeJoint2D'), _dec2$9 = jsonAsset.menu(), _dec$9(_class$9 = _dec2$9(_class$9 = (_class2$9 = (_temp$9 = function (_Joint2D) {
  jsonAsset._inheritsLoose(RelativeJoint2D, _Joint2D);

  function RelativeJoint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
    _this.TYPE = exports.EJoint2DType.RELATIVE;

    jsonAsset._initializerDefineProperty(_this, "_maxForce", _descriptor$9, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_maxTorque", _descriptor2$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_correctionFactor", _descriptor3$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_angularOffset", _descriptor4$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_linearOffset", _descriptor5$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_autoCalcOffset", _descriptor6$2, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  jsonAsset._createClass(RelativeJoint2D, [{
    key: "maxForce",
    get: function get() {
      return this._maxForce;
    },
    set: function set(v) {
      this._maxForce = v;

      if (this._joint) {
        this._joint.setMaxForce(v);
      }
    }
  }, {
    key: "maxTorque",
    get: function get() {
      return this._maxTorque;
    },
    set: function set(v) {
      this._maxTorque = v;

      if (this._joint) {
        this._joint.setMaxTorque(v);
      }
    }
  }, {
    key: "correctionFactor",
    get: function get() {
      return this._correctionFactor;
    },
    set: function set(v) {
      this._correctionFactor = v;

      if (this._joint) {
        this._joint.setCorrectionFactor(v);
      }
    }
  }, {
    key: "linearOffset",
    get: function get() {
      if (this._autoCalcOffset && this.connectedBody) {
        return jsonAsset.Vec2.subtract(this._linearOffset, this.connectedBody.node.worldPosition, this.node.worldPosition);
      }

      return this._linearOffset;
    },
    set: function set(v) {
      this._linearOffset.set(v);

      if (this._joint) {
        this._joint.setLinearOffset(v);
      }
    }
  }, {
    key: "angularOffset",
    get: function get() {
      if (this._autoCalcOffset && this.connectedBody) {
        jsonAsset.Quat.toEuler(tempVec3_1, this.node.worldRotation);
        jsonAsset.Quat.toEuler(tempVec3_2, this.connectedBody.node.worldRotation);
        this._angularOffset = tempVec3_2.z - tempVec3_1.z;
      }

      return this._angularOffset;
    },
    set: function set(v) {
      this._angularOffset = v;

      if (this._joint) {
        this._joint.setAngularOffset(v);
      }
    }
  }, {
    key: "autoCalcOffset",
    get: function get() {
      return this._autoCalcOffset;
    },
    set: function set(v) {
      this._autoCalcOffset = v;
    }
  }]);

  return RelativeJoint2D;
}(Joint2D), _temp$9), (jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "maxForce", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$9.prototype, "maxForce"), _class2$9.prototype), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "maxTorque", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$9.prototype, "maxTorque"), _class2$9.prototype), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "correctionFactor", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$9.prototype, "correctionFactor"), _class2$9.prototype), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "linearOffset", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$9.prototype, "linearOffset"), _class2$9.prototype), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "angularOffset", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$9.prototype, "angularOffset"), _class2$9.prototype), jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "autoCalcOffset", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$9.prototype, "autoCalcOffset"), _class2$9.prototype), _descriptor$9 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_maxForce", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor2$7 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_maxTorque", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.7;
  }
}), _descriptor3$5 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_correctionFactor", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.3;
  }
}), _descriptor4$4 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_angularOffset", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5$2 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_linearOffset", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new jsonAsset.Vec2();
  }
}), _descriptor6$2 = jsonAsset._applyDecoratedDescriptor(_class2$9.prototype, "_autoCalcOffset", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2$9)) || _class$9) || _class$9);

var _dec$a, _dec2$a, _class$a, _class2$a, _descriptor$a, _descriptor2$8, _descriptor3$6, _descriptor4$5, _descriptor5$3, _descriptor6$3, _descriptor7$2, _descriptor8$2, _temp$a;
var tempVec2 = new jsonAsset.Vec2();
var SliderJoint2D = (_dec$a = jsonAsset.ccclass('cc.SliderJoint2D'), _dec2$a = jsonAsset.menu(), _dec$a(_class$a = _dec2$a(_class$a = (_class2$a = (_temp$a = function (_Joint2D) {
  jsonAsset._inheritsLoose(SliderJoint2D, _Joint2D);

  function SliderJoint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
    _this.TYPE = exports.EJoint2DType.SLIDER;

    jsonAsset._initializerDefineProperty(_this, "_angle", _descriptor$a, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_autoCalcAngle", _descriptor2$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_enableMotor", _descriptor3$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_maxMotorForce", _descriptor4$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_motorSpeed", _descriptor5$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_enableLimit", _descriptor6$3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_lowerLimit", _descriptor7$2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_upperLimit", _descriptor8$2, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  jsonAsset._createClass(SliderJoint2D, [{
    key: "angle",
    get: function get() {
      if (this._autoCalcAngle && this.connectedBody) {
        jsonAsset.Vec2.subtract(tempVec2, this.connectedBody.node.worldPosition, this.node.worldPosition);
        this._angle = jsonAsset.toDegree(Math.atan2(tempVec2.y, tempVec2.x));
      }

      return this._angle;
    },
    set: function set(v) {
      this._angle = v;
    }
  }, {
    key: "autoCalcAngle",
    get: function get() {
      return this._autoCalcAngle;
    },
    set: function set(v) {
      this._autoCalcAngle = v;
    }
  }, {
    key: "enableMotor",
    get: function get() {
      return this._enableMotor;
    },
    set: function set(v) {
      this._enableMotor = v;
    }
  }, {
    key: "maxMotorForce",
    get: function get() {
      return this._maxMotorForce;
    },
    set: function set(v) {
      this._maxMotorForce = v;

      if (this._joint) {
        this._joint.setMaxMotorForce(v);
      }
    }
  }, {
    key: "motorSpeed",
    get: function get() {
      return this._motorSpeed;
    },
    set: function set(v) {
      this._motorSpeed = v;

      if (this._joint) {
        this._joint.setMotorSpeed(v);
      }
    }
  }, {
    key: "enableLimit",
    get: function get() {
      return this._enableLimit;
    },
    set: function set(v) {
      this._enableLimit = v;
    }
  }, {
    key: "lowerLimit",
    get: function get() {
      return this._lowerLimit;
    },
    set: function set(v) {
      this._lowerLimit = v;

      if (this._joint) {
        this._joint.setLowerLimit(v);
      }
    }
  }, {
    key: "upperLimit",
    get: function get() {
      return this._upperLimit;
    },
    set: function set(v) {
      this._upperLimit = v;

      if (this._joint) {
        this._joint.setUpperLimit(v);
      }
    }
  }]);

  return SliderJoint2D;
}(Joint2D), _temp$a), (jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "angle", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$a.prototype, "angle"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "autoCalcAngle", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$a.prototype, "autoCalcAngle"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "enableMotor", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$a.prototype, "enableMotor"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "maxMotorForce", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$a.prototype, "maxMotorForce"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "motorSpeed", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$a.prototype, "motorSpeed"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "enableLimit", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$a.prototype, "enableLimit"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "lowerLimit", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$a.prototype, "lowerLimit"), _class2$a.prototype), jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "upperLimit", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$a.prototype, "upperLimit"), _class2$a.prototype), _descriptor$a = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_angle", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2$8 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_autoCalcAngle", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3$6 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_enableMotor", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4$5 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_maxMotorForce", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor5$3 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_motorSpeed", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor6$3 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_enableLimit", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7$2 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_lowerLimit", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor8$2 = jsonAsset._applyDecoratedDescriptor(_class2$a.prototype, "_upperLimit", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2$a)) || _class$a) || _class$a);

var _dec$b, _dec2$b, _class$b, _class2$b, _descriptor$b, _descriptor2$9, _temp$b;
var FixedJoint2D = (_dec$b = jsonAsset.ccclass('cc.FixedJoint2D'), _dec2$b = jsonAsset.menu(), _dec$b(_class$b = _dec2$b(_class$b = (_class2$b = (_temp$b = function (_Joint2D) {
  jsonAsset._inheritsLoose(FixedJoint2D, _Joint2D);

  function FixedJoint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
    _this.TYPE = exports.EJoint2DType.FIXED;

    jsonAsset._initializerDefineProperty(_this, "_frequency", _descriptor$b, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_dampingRatio", _descriptor2$9, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  jsonAsset._createClass(FixedJoint2D, [{
    key: "frequency",
    get: function get() {
      return this._frequency;
    },
    set: function set(v) {
      this._frequency = v;

      if (this._joint) {
        this._joint.setFrequency(v);
      }
    }
  }, {
    key: "dampingRatio",
    get: function get() {
      return this._dampingRatio;
    },
    set: function set(v) {
      this._dampingRatio = v;

      if (this._joint) {
        this._joint.setDampingRatio(v);
      }
    }
  }]);

  return FixedJoint2D;
}(Joint2D), _temp$b), (jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "frequency", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$b.prototype, "frequency"), _class2$b.prototype), jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "dampingRatio", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$b.prototype, "dampingRatio"), _class2$b.prototype), _descriptor$b = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "_frequency", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.7;
  }
}), _descriptor2$9 = jsonAsset._applyDecoratedDescriptor(_class2$b.prototype, "_dampingRatio", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
})), _class2$b)) || _class$b) || _class$b);

var _dec$c, _dec2$c, _class$c, _class2$c, _descriptor$c, _descriptor2$a, _descriptor3$7, _descriptor4$6, _descriptor5$4, _descriptor6$4, _temp$c;
var WheelJoint2D = (_dec$c = jsonAsset.ccclass('cc.WheelJoint2D'), _dec2$c = jsonAsset.menu(), _dec$c(_class$c = _dec2$c(_class$c = (_class2$c = (_temp$c = function (_Joint2D) {
  jsonAsset._inheritsLoose(WheelJoint2D, _Joint2D);

  function WheelJoint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
    _this.TYPE = exports.EJoint2DType.WHEEL;

    jsonAsset._initializerDefineProperty(_this, "_angle", _descriptor$c, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_enableMotor", _descriptor2$a, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_maxMotorTorque", _descriptor3$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_motorSpeed", _descriptor4$6, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_frequency", _descriptor5$4, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_dampingRatio", _descriptor6$4, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  jsonAsset._createClass(WheelJoint2D, [{
    key: "angle",
    get: function get() {
      return this._angle;
    },
    set: function set(v) {
      this._angle = v;
    }
  }, {
    key: "enableMotor",
    get: function get() {
      return this._enableMotor;
    },
    set: function set(v) {
      this._enableMotor = v;

      if (this._joint) {
        this._joint.enableMotor(v);
      }
    }
  }, {
    key: "maxMotorTorque",
    get: function get() {
      return this._maxMotorTorque;
    },
    set: function set(v) {
      this._maxMotorTorque = v;

      if (this._joint) {
        this._joint.setMaxMotorTorque(v);
      }
    }
  }, {
    key: "motorSpeed",
    get: function get() {
      return this._motorSpeed;
    },
    set: function set(v) {
      this._motorSpeed = v;

      if (this._joint) {
        this._joint.setMotorSpeed(v);
      }
    }
  }, {
    key: "frequency",
    get: function get() {
      return this._frequency;
    },
    set: function set(v) {
      this._frequency = v;

      if (this._joint) {
        this._joint.setFrequency(v);
      }
    }
  }, {
    key: "dampingRatio",
    get: function get() {
      return this._dampingRatio;
    },
    set: function set(v) {
      this._dampingRatio = v;

      if (this._joint) {
        this._joint.setDampingRatio(v);
      }
    }
  }]);

  return WheelJoint2D;
}(Joint2D), _temp$c), (jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "angle", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$c.prototype, "angle"), _class2$c.prototype), jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "enableMotor", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$c.prototype, "enableMotor"), _class2$c.prototype), jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "maxMotorTorque", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$c.prototype, "maxMotorTorque"), _class2$c.prototype), jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "motorSpeed", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$c.prototype, "motorSpeed"), _class2$c.prototype), jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "frequency", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$c.prototype, "frequency"), _class2$c.prototype), jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "dampingRatio", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$c.prototype, "dampingRatio"), _class2$c.prototype), _descriptor$c = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_angle", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 90;
  }
}), _descriptor2$a = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_enableMotor", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3$7 = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_maxMotorTorque", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor4$6 = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_motorSpeed", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5$4 = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_frequency", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor6$4 = jsonAsset._applyDecoratedDescriptor(_class2$c.prototype, "_dampingRatio", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.7;
  }
})), _class2$c)) || _class$c) || _class$c);

var _dec$d, _dec2$d, _class$d, _class2$d, _descriptor$d, _descriptor2$b, _descriptor3$8, _descriptor4$7, _descriptor5$5, _descriptor6$5, _temp$d;
var HingeJoint2D = (_dec$d = jsonAsset.ccclass('cc.HingeJoint2D'), _dec2$d = jsonAsset.menu(), _dec$d(_class$d = _dec2$d(_class$d = (_class2$d = (_temp$d = function (_Joint2D) {
  jsonAsset._inheritsLoose(HingeJoint2D, _Joint2D);

  function HingeJoint2D() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Joint2D.call.apply(_Joint2D, [this].concat(args)) || this;
    _this.TYPE = exports.EJoint2DType.HINGE;

    jsonAsset._initializerDefineProperty(_this, "_enableLimit", _descriptor$d, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_lowerAngle", _descriptor2$b, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_upperAngle", _descriptor3$8, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_enableMotor", _descriptor4$7, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_maxMotorTorque", _descriptor5$5, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_motorSpeed", _descriptor6$5, jsonAsset._assertThisInitialized(_this));

    return _this;
  }

  jsonAsset._createClass(HingeJoint2D, [{
    key: "enableLimit",
    get: function get() {
      return this._enableLimit;
    },
    set: function set(v) {
      this._enableLimit = v;
    }
  }, {
    key: "lowerAngle",
    get: function get() {
      return this._lowerAngle;
    },
    set: function set(v) {
      this._lowerAngle = v;

      if (this._joint) {
        this._joint.setLowerAngle(v);
      }
    }
  }, {
    key: "upperAngle",
    get: function get() {
      return this._upperAngle;
    },
    set: function set(v) {
      this._upperAngle = v;

      if (this._joint) {
        this._joint.setUpperAngle(v);
      }
    }
  }, {
    key: "enableMotor",
    get: function get() {
      return this._enableMotor;
    },
    set: function set(v) {
      this._enableMotor = v;

      if (this._joint) {
        this._joint.enableMotor(v);
      }
    }
  }, {
    key: "maxMotorTorque",
    get: function get() {
      return this._maxMotorTorque;
    },
    set: function set(v) {
      this._maxMotorTorque = v;

      if (this._joint) {
        this._joint.setMaxMotorTorque(v);
      }
    }
  }, {
    key: "motorSpeed",
    get: function get() {
      return this._motorSpeed;
    },
    set: function set(v) {
      this._motorSpeed = v;

      if (this._joint) {
        this._joint.setMotorSpeed(v);
      }
    }
  }]);

  return HingeJoint2D;
}(Joint2D), _temp$d), (jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "enableLimit", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$d.prototype, "enableLimit"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "lowerAngle", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$d.prototype, "lowerAngle"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "upperAngle", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$d.prototype, "upperAngle"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "enableMotor", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$d.prototype, "enableMotor"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "maxMotorTorque", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$d.prototype, "maxMotorTorque"), _class2$d.prototype), jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "motorSpeed", [jsonAsset.property], Object.getOwnPropertyDescriptor(_class2$d.prototype, "motorSpeed"), _class2$d.prototype), _descriptor$d = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_enableLimit", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$b = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_lowerAngle", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3$8 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_upperAngle", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4$7 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_enableMotor", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5$5 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_maxMotorTorque", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor6$5 = jsonAsset._applyDecoratedDescriptor(_class2$d.prototype, "_motorSpeed", [jsonAsset.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2$d)) || _class$d) || _class$d);

exports.BoxCollider2D = BoxCollider2D;
exports.CircleCollider2D = CircleCollider2D;
exports.Collider2D = Collider2D;
exports.Contact2DType = Contact2DType;
exports.DistanceJoint2D = DistanceJoint2D;
exports.FixedJoint2D = FixedJoint2D;
exports.HingeJoint2D = HingeJoint2D;
exports.Joint2D = Joint2D;
exports.MouseJoint2D = MouseJoint2D;
exports.PHYSICS_2D_PTM_RATIO = PHYSICS_2D_PTM_RATIO;
exports.PhysicsSystem2D = PhysicsSystem2D;
exports.PolygonCollider2D = PolygonCollider2D;
exports.RelativeJoint2D = RelativeJoint2D;
exports.RigidBody2D = RigidBody2D;
exports.SliderJoint2D = SliderJoint2D;
exports.SpringJoint2D = SpringJoint2D;
exports.WheelJoint2D = WheelJoint2D;
exports.select = select;
