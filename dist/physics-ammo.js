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
require('./_commonjsHelpers-14b89ad2.js');
var tupleDictionary = require('./tuple-dictionary-07e81d5c.js');
var instantiated = require('./instantiated-d036c6ce.js');
var arrayCollisionMatrix = require('./array-collision-matrix-a747d78b.js');

function cocos2AmmoVec3(out, v) {
  out.setValue(v.x, v.y, v.z);
  return out;
}
function ammo2CocosVec3(out, v) {
  out.x = v.x();
  out.y = v.y();
  out.z = v.z();
  return out;
}
function cocos2AmmoQuat(out, q) {
  out.setValue(q.x, q.y, q.z, q.w);
  return out;
}
function ammo2CocosQuat(out, q) {
  out.x = q.x();
  out.y = q.y();
  out.z = q.z();
  out.w = q.w();
  return out;
}
function ammoDeletePtr(obj, klass) {
  var cache = instantiated.Ammo.getCache(klass);
  var ptr = instantiated.Ammo.getPointer(obj);
  delete cache[ptr];
}
function cocos2AmmoTriMesh(out, mesh) {
  var len = mesh.renderingSubMeshes.length;

  for (var i = 0; i < len; i++) {
    var subMesh = mesh.renderingSubMeshes[i];
    var geoInfo = subMesh.geometricInfo;

    if (geoInfo) {
      var primitiveMode = subMesh.primitiveMode;
      var vb = geoInfo.positions;
      var ib = geoInfo.indices;
      var v0 = new instantiated.Ammo.btVector3();
      var v1 = new instantiated.Ammo.btVector3();
      var v2 = new instantiated.Ammo.btVector3();

      if (primitiveMode === jsonAsset.PrimitiveMode.TRIANGLE_LIST) {
        var cnt = ib.length;

        for (var j = 0; j < cnt; j += 3) {
          var i0 = ib[j] * 3;
          var i1 = ib[j + 1] * 3;
          var i2 = ib[j + 2] * 3;
          v0.setValue(vb[i0], vb[i0 + 1], vb[i0 + 2]);
          v1.setValue(vb[i1], vb[i1 + 1], vb[i1 + 2]);
          v2.setValue(vb[i2], vb[i2 + 1], vb[i2 + 2]);
          out.addTriangle(v0, v1, v2);
        }
      } else if (primitiveMode === jsonAsset.PrimitiveMode.TRIANGLE_STRIP) {
        var _cnt = ib.length - 2;

        var rev = 0;

        for (var _j = 0; _j < _cnt; _j += 1) {
          var _i = ib[_j - rev] * 3;

          var _i2 = ib[_j + rev + 1] * 3;

          var _i3 = ib[_j + 2] * 3;

          rev = ~rev;
          v0.setValue(vb[_i], vb[_i + 1], vb[_i + 2]);
          v1.setValue(vb[_i2], vb[_i2 + 1], vb[_i2 + 2]);
          v2.setValue(vb[_i3], vb[_i3 + 1], vb[_i3 + 2]);
          out.addTriangle(v0, v1, v2);
        }
      } else if (primitiveMode === jsonAsset.PrimitiveMode.TRIANGLE_FAN) {
        var _cnt2 = ib.length - 1;

        var _i4 = ib[0] * 3;

        v0.setValue(vb[_i4], vb[_i4 + 1], vb[_i4 + 2]);

        for (var _j2 = 1; _j2 < _cnt2; _j2 += 1) {
          var _i5 = ib[_j2] * 3;

          var _i6 = ib[_j2 + 1] * 3;

          v1.setValue(vb[_i5], vb[_i5 + 1], vb[_i5 + 2]);
          v2.setValue(vb[_i6], vb[_i6 + 1], vb[_i6 + 2]);
          out.addTriangle(v0, v1, v2);
        }
      }

      instantiated.Ammo.destroy(v0);
      instantiated.Ammo.destroy(v1);
      instantiated.Ammo.destroy(v2);
    }
  }

  return out;
}

var EAmmoSharedBodyDirty;

(function (EAmmoSharedBodyDirty) {
  EAmmoSharedBodyDirty[EAmmoSharedBodyDirty["BODY_RE_ADD"] = 1] = "BODY_RE_ADD";
  EAmmoSharedBodyDirty[EAmmoSharedBodyDirty["GHOST_RE_ADD"] = 2] = "GHOST_RE_ADD";
})(EAmmoSharedBodyDirty || (EAmmoSharedBodyDirty = {}));

var AmmoCollisionFlags;

(function (AmmoCollisionFlags) {
  AmmoCollisionFlags[AmmoCollisionFlags["CF_STATIC_OBJECT"] = 1] = "CF_STATIC_OBJECT";
  AmmoCollisionFlags[AmmoCollisionFlags["CF_KINEMATIC_OBJECT"] = 2] = "CF_KINEMATIC_OBJECT";
  AmmoCollisionFlags[AmmoCollisionFlags["CF_NO_CONTACT_RESPONSE"] = 4] = "CF_NO_CONTACT_RESPONSE";
  AmmoCollisionFlags[AmmoCollisionFlags["CF_CUSTOM_MATERIAL_CALLBACK"] = 8] = "CF_CUSTOM_MATERIAL_CALLBACK";
  AmmoCollisionFlags[AmmoCollisionFlags["CF_CHARACTER_OBJECT"] = 16] = "CF_CHARACTER_OBJECT";
  AmmoCollisionFlags[AmmoCollisionFlags["CF_DISABLE_VISUALIZE_OBJECT"] = 32] = "CF_DISABLE_VISUALIZE_OBJECT";
  AmmoCollisionFlags[AmmoCollisionFlags["CF_DISABLE_SPU_COLLISION_PROCESSING"] = 64] = "CF_DISABLE_SPU_COLLISION_PROCESSING";
})(AmmoCollisionFlags || (AmmoCollisionFlags = {}));

instantiated.Ammo.AmmoCollisionFlags = AmmoCollisionFlags;
var AmmoCollisionObjectTypes;

(function (AmmoCollisionObjectTypes) {
  AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_COLLISION_OBJECT"] = 1] = "CO_COLLISION_OBJECT";
  AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_RIGID_BODY"] = 2] = "CO_RIGID_BODY";
  AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_GHOST_OBJECT"] = 4] = "CO_GHOST_OBJECT";
  AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_SOFT_BODY"] = 8] = "CO_SOFT_BODY";
  AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_HF_FLUID"] = 16] = "CO_HF_FLUID";
  AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_USER_TYPE"] = 32] = "CO_USER_TYPE";
  AmmoCollisionObjectTypes[AmmoCollisionObjectTypes["CO_FEATHERSTONE_LINK"] = 64] = "CO_FEATHERSTONE_LINK";
})(AmmoCollisionObjectTypes || (AmmoCollisionObjectTypes = {}));

instantiated.Ammo.AmmoCollisionObjectTypes = AmmoCollisionObjectTypes;
var AmmoCollisionObjectStates;

(function (AmmoCollisionObjectStates) {
  AmmoCollisionObjectStates[AmmoCollisionObjectStates["ACTIVE_TAG"] = 1] = "ACTIVE_TAG";
  AmmoCollisionObjectStates[AmmoCollisionObjectStates["ISLAND_SLEEPING"] = 2] = "ISLAND_SLEEPING";
  AmmoCollisionObjectStates[AmmoCollisionObjectStates["WANTS_DEACTIVATION"] = 3] = "WANTS_DEACTIVATION";
  AmmoCollisionObjectStates[AmmoCollisionObjectStates["DISABLE_DEACTIVATION"] = 4] = "DISABLE_DEACTIVATION";
  AmmoCollisionObjectStates[AmmoCollisionObjectStates["DISABLE_SIMULATION"] = 5] = "DISABLE_SIMULATION";
})(AmmoCollisionObjectStates || (AmmoCollisionObjectStates = {}));

var AmmoAnisotropicFrictionFlags;

(function (AmmoAnisotropicFrictionFlags) {
  AmmoAnisotropicFrictionFlags[AmmoAnisotropicFrictionFlags["CF_ANISOTROPIC_FRICTION_DISABLED"] = 0] = "CF_ANISOTROPIC_FRICTION_DISABLED";
  AmmoAnisotropicFrictionFlags[AmmoAnisotropicFrictionFlags["CF_ANISOTROPIC_FRICTION"] = 1] = "CF_ANISOTROPIC_FRICTION";
  AmmoAnisotropicFrictionFlags[AmmoAnisotropicFrictionFlags["CF_ANISOTROPIC_ROLLING_FRICTION"] = 2] = "CF_ANISOTROPIC_ROLLING_FRICTION";
})(AmmoAnisotropicFrictionFlags || (AmmoAnisotropicFrictionFlags = {}));

instantiated.Ammo.AmmoAnisotropicFrictionFlags = AmmoAnisotropicFrictionFlags;
var AmmoRigidBodyFlags;

(function (AmmoRigidBodyFlags) {
  AmmoRigidBodyFlags[AmmoRigidBodyFlags["BT_DISABLE_WORLD_GRAVITY"] = 1] = "BT_DISABLE_WORLD_GRAVITY";
  AmmoRigidBodyFlags[AmmoRigidBodyFlags["BT_ENABLE_GYROPSCOPIC_FORCE"] = 2] = "BT_ENABLE_GYROPSCOPIC_FORCE";
})(AmmoRigidBodyFlags || (AmmoRigidBodyFlags = {}));

instantiated.Ammo.AmmoRigidBodyFlags = AmmoRigidBodyFlags;
var AmmoBroadphaseNativeTypes;

(function (AmmoBroadphaseNativeTypes) {
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["BOX_SHAPE_PROXYTYPE"] = 0] = "BOX_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["TRIANGLE_SHAPE_PROXYTYPE"] = 1] = "TRIANGLE_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["TETRAHEDRAL_SHAPE_PROXYTYPE"] = 2] = "TETRAHEDRAL_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_TRIANGLEMESH_SHAPE_PROXYTYPE"] = 3] = "CONVEX_TRIANGLEMESH_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_HULL_SHAPE_PROXYTYPE"] = 4] = "CONVEX_HULL_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_POINT_CLOUD_SHAPE_PROXYTYPE"] = 5] = "CONVEX_POINT_CLOUD_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CUSTOM_POLYHEDRAL_SHAPE_TYPE"] = 6] = "CUSTOM_POLYHEDRAL_SHAPE_TYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["IMPLICIT_CONVEX_SHAPES_START_HERE"] = 7] = "IMPLICIT_CONVEX_SHAPES_START_HERE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["SPHERE_SHAPE_PROXYTYPE"] = 8] = "SPHERE_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MULTI_SPHERE_SHAPE_PROXYTYPE"] = 9] = "MULTI_SPHERE_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CAPSULE_SHAPE_PROXYTYPE"] = 10] = "CAPSULE_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONE_SHAPE_PROXYTYPE"] = 11] = "CONE_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_SHAPE_PROXYTYPE"] = 12] = "CONVEX_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CYLINDER_SHAPE_PROXYTYPE"] = 13] = "CYLINDER_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["UNIFORM_SCALING_SHAPE_PROXYTYPE"] = 14] = "UNIFORM_SCALING_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MINKOWSKI_SUM_SHAPE_PROXYTYPE"] = 15] = "MINKOWSKI_SUM_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MINKOWSKI_DIFFERENCE_SHAPE_PROXYTYPE"] = 16] = "MINKOWSKI_DIFFERENCE_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["BOX_2D_SHAPE_PROXYTYPE"] = 17] = "BOX_2D_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONVEX_2D_SHAPE_PROXYTYPE"] = 18] = "CONVEX_2D_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CUSTOM_CONVEX_SHAPE_TYPE"] = 19] = "CUSTOM_CONVEX_SHAPE_TYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONCAVE_SHAPES_START_HERE"] = 20] = "CONCAVE_SHAPES_START_HERE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["TRIANGLE_MESH_SHAPE_PROXYTYPE"] = 21] = "TRIANGLE_MESH_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["SCALED_TRIANGLE_MESH_SHAPE_PROXYTYPE"] = 22] = "SCALED_TRIANGLE_MESH_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["FAST_CONCAVE_MESH_PROXYTYPE"] = 23] = "FAST_CONCAVE_MESH_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["TERRAIN_SHAPE_PROXYTYPE"] = 24] = "TERRAIN_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["GIMPACT_SHAPE_PROXYTYPE"] = 25] = "GIMPACT_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MULTIMATERIAL_TRIANGLE_MESH_PROXYTYPE"] = 26] = "MULTIMATERIAL_TRIANGLE_MESH_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["EMPTY_SHAPE_PROXYTYPE"] = 27] = "EMPTY_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["STATIC_PLANE_PROXYTYPE"] = 28] = "STATIC_PLANE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CUSTOM_CONCAVE_SHAPE_TYPE"] = 29] = "CUSTOM_CONCAVE_SHAPE_TYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["CONCAVE_SHAPES_END_HERE"] = 30] = "CONCAVE_SHAPES_END_HERE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["COMPOUND_SHAPE_PROXYTYPE"] = 31] = "COMPOUND_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["SOFTBODY_SHAPE_PROXYTYPE"] = 32] = "SOFTBODY_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["HFFLUID_SHAPE_PROXYTYPE"] = 33] = "HFFLUID_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["HFFLUID_BUOYANT_CONVEX_SHAPE_PROXYTYPE"] = 34] = "HFFLUID_BUOYANT_CONVEX_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["INVALID_SHAPE_PROXYTYPE"] = 35] = "INVALID_SHAPE_PROXYTYPE";
  AmmoBroadphaseNativeTypes[AmmoBroadphaseNativeTypes["MAX_BROADPHASE_COLLISION_TYPES"] = 36] = "MAX_BROADPHASE_COLLISION_TYPES";
})(AmmoBroadphaseNativeTypes || (AmmoBroadphaseNativeTypes = {}));

instantiated.Ammo.AmmoBroadphaseNativeTypes = AmmoBroadphaseNativeTypes;
var AmmoCollisionFilterGroups;

(function (AmmoCollisionFilterGroups) {
  AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["DefaultFilter"] = 1] = "DefaultFilter";
  AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["StaticFilter"] = 2] = "StaticFilter";
  AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["KinematicFilter"] = 4] = "KinematicFilter";
  AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["DebrisFilter"] = 8] = "DebrisFilter";
  AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["SensorTrigger"] = 16] = "SensorTrigger";
  AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["CharacterFilter"] = 32] = "CharacterFilter";
  AmmoCollisionFilterGroups[AmmoCollisionFilterGroups["AllFilter"] = -1] = "AllFilter";
})(AmmoCollisionFilterGroups || (AmmoCollisionFilterGroups = {}));

instantiated.Ammo.AmmoCollisionFilterGroups = AmmoCollisionFilterGroups;
var AmmoDispatcherFlags;

(function (AmmoDispatcherFlags) {
  AmmoDispatcherFlags[AmmoDispatcherFlags["CD_STATIC_STATIC_REPORTED"] = 1] = "CD_STATIC_STATIC_REPORTED";
  AmmoDispatcherFlags[AmmoDispatcherFlags["CD_USE_RELATIVE_CONTACT_BREAKING_THRESHOLD"] = 2] = "CD_USE_RELATIVE_CONTACT_BREAKING_THRESHOLD";
  AmmoDispatcherFlags[AmmoDispatcherFlags["CD_DISABLE_CONTACTPOOL_DYNAMIC_ALLOCATION"] = 4] = "CD_DISABLE_CONTACTPOOL_DYNAMIC_ALLOCATION";
})(AmmoDispatcherFlags || (AmmoDispatcherFlags = {}));

instantiated.Ammo.AmmoDispatcherFlags = AmmoDispatcherFlags;

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
var AmmoConstant = function () {
  function AmmoConstant() {
    this.EMPTY_SHAPE = new instantiated.Ammo.btEmptyShape();
    this.TRANSFORM = new instantiated.Ammo.btTransform();
    this.TRANSFORM_1 = new instantiated.Ammo.btTransform();
    this.VECTOR3_0 = new instantiated.Ammo.btVector3();
    this.VECTOR3_1 = new instantiated.Ammo.btVector3();
    this.QUAT_0 = new instantiated.Ammo.btQuaternion();
  }

  AmmoConstant.isNotEmptyShape = function isNotEmptyShape(btShape) {
    return btShape !== this.instance.EMPTY_SHAPE;
  };

  jsonAsset._createClass(AmmoConstant, null, [{
    key: "instance",
    get: function get() {
      if (AmmoConstant._instance == null) AmmoConstant._instance = new AmmoConstant();
      return AmmoConstant._instance;
    }
  }]);

  return AmmoConstant;
}();
AmmoConstant._instance = void 0;
var CC_V3_0 = new jsonAsset.Vec3();
var CC_V3_1 = new jsonAsset.Vec3();
var CC_QUAT_0 = new jsonAsset.Quat();

var v3_0 = CC_V3_0;
var v3_1 = CC_V3_1;
var AmmoRigidBody = function () {
  var _proto = AmmoRigidBody.prototype;

  _proto.setMass = function setMass(value) {
    if (!this._rigidBody.isDynamic) return;
    var localInertia = this._sharedBody.bodyStruct.localInertia;
    localInertia.setValue(1.6666666269302368, 1.6666666269302368, 1.6666666269302368);
    var shape = this.impl.getCollisionShape();

    if (shape.isCompound()) {
      if (this._sharedBody.bodyCompoundShape.getNumChildShapes() > 0) {
        shape.calculateLocalInertia(this._rigidBody.mass, localInertia);
      }
    } else {
      shape.calculateLocalInertia(this._rigidBody.mass, localInertia);
    }

    this.impl.setMassProps(value, localInertia);

    this._wakeUpIfSleep();

    this._sharedBody.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
  };

  _proto.setType = function setType(v) {
    this._sharedBody.setType(v);
  };

  _proto.setLinearDamping = function setLinearDamping(value) {
    this.impl.setDamping(this._rigidBody.linearDamping, this._rigidBody.angularDamping);
  };

  _proto.setAngularDamping = function setAngularDamping(value) {
    this.impl.setDamping(this._rigidBody.linearDamping, this._rigidBody.angularDamping);
  };

  _proto.useGravity = function useGravity(value) {
    if (!this._rigidBody.isDynamic) return;
    var m_rigidBodyFlag = this.impl.getFlags();

    if (value) {
      m_rigidBodyFlag &= ~AmmoRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
    } else {
      this.impl.setGravity(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, jsonAsset.Vec3.ZERO));
      m_rigidBodyFlag |= AmmoRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
    }

    this.impl.setFlags(m_rigidBodyFlag);

    this._wakeUpIfSleep();

    this._sharedBody.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
  };

  _proto.useCCD = function useCCD(value) {
    this.impl.setCcdMotionThreshold(value ? 0.01 : 0);
    this.impl.setCcdSweptSphereRadius(value ? 0.1 : 0);
    this._isUsingCCD = value;
  };

  _proto.isUsingCCD = function isUsingCCD() {
    return this._isUsingCCD;
  };

  _proto.setLinearFactor = function setLinearFactor(value) {
    this.impl.setLinearFactor(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, value));

    this._wakeUpIfSleep();
  };

  _proto.setAngularFactor = function setAngularFactor(value) {
    this.impl.setAngularFactor(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, value));

    this._wakeUpIfSleep();
  };

  _proto.setAllowSleep = function setAllowSleep(v) {
    if (!this._rigidBody.isDynamic) return;

    if (v) {
      this.impl.forceActivationState(AmmoCollisionObjectStates.ACTIVE_TAG);
    } else {
      this.impl.forceActivationState(AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
    }

    this._wakeUpIfSleep();
  };

  jsonAsset._createClass(AmmoRigidBody, [{
    key: "isAwake",
    get: function get() {
      var state = this.impl.getActivationState();
      return state === AmmoCollisionObjectStates.ACTIVE_TAG || state === AmmoCollisionObjectStates.DISABLE_DEACTIVATION;
    }
  }, {
    key: "isSleepy",
    get: function get() {
      var state = this.impl.getActivationState();
      return state === AmmoCollisionObjectStates.WANTS_DEACTIVATION;
    }
  }, {
    key: "isSleeping",
    get: function get() {
      var state = this.impl.getActivationState();
      return state === AmmoCollisionObjectStates.ISLAND_SLEEPING;
    }
  }, {
    key: "isEnabled",
    get: function get() {
      return this._isEnabled;
    }
  }, {
    key: "impl",
    get: function get() {
      return this._sharedBody.body;
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

  function AmmoRigidBody() {
    this.id = void 0;
    this._isEnabled = false;
    this._isUsingCCD = false;
    this._sharedBody = void 0;
    this._rigidBody = void 0;
    this.id = AmmoRigidBody.idCounter++;
  }

  _proto.clearState = function clearState() {
    this.impl.clearState();
  };

  _proto.clearVelocity = function clearVelocity() {
    this.setLinearVelocity(jsonAsset.Vec3.ZERO);
    this.setAngularVelocity(jsonAsset.Vec3.ZERO);
  };

  _proto.clearForces = function clearForces() {
    this.impl.clearForces();
  };

  _proto.initialize = function initialize(com) {
    this._rigidBody = com;
    this._sharedBody = index.PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
    this._sharedBody.reference = true;
  };

  _proto.onEnable = function onEnable() {
    this._isEnabled = true;
    this.setMass(this._rigidBody.mass);
    this.setAllowSleep(this._rigidBody.allowSleep);
    this.setLinearDamping(this._rigidBody.linearDamping);
    this.setAngularDamping(this._rigidBody.angularDamping);
    this.setLinearFactor(this._rigidBody.linearFactor);
    this.setAngularFactor(this._rigidBody.angularFactor);
    this.useGravity(this._rigidBody.useGravity);
    this._sharedBody.bodyEnabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._isEnabled = false;
    this._sharedBody.bodyEnabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._rigidBody = null;
    this._sharedBody = null;
  };

  _proto.wakeUp = function wakeUp(force) {
    if (force === void 0) {
      force = true;
    }

    this.impl.activate(force);
  };

  _proto.sleep = function sleep() {
    return this.impl.wantsSleeping();
  };

  _proto.setSleepThreshold = function setSleepThreshold(v) {
    this._wakeUpIfSleep();

    this.impl.setSleepingThresholds(v, v);
  };

  _proto.getSleepThreshold = function getSleepThreshold() {
    return this.impl.getLinearSleepingThreshold();
  };

  _proto.getLinearVelocity = function getLinearVelocity(out) {
    return ammo2CocosVec3(out, this.impl.getLinearVelocity());
  };

  _proto.setLinearVelocity = function setLinearVelocity(value) {
    this._wakeUpIfSleep();

    cocos2AmmoVec3(this.impl.getLinearVelocity(), value);
  };

  _proto.getAngularVelocity = function getAngularVelocity(out) {
    return ammo2CocosVec3(out, this.impl.getAngularVelocity());
  };

  _proto.setAngularVelocity = function setAngularVelocity(value) {
    this._wakeUpIfSleep();

    cocos2AmmoVec3(this.impl.getAngularVelocity(), value);
  };

  _proto.applyLocalForce = function applyLocalForce(force, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    var quat = this._sharedBody.node.worldRotation;
    var v = jsonAsset.Vec3.transformQuat(v3_0, force, quat);
    var rp = rel_pos ? jsonAsset.Vec3.transformQuat(v3_1, rel_pos, quat) : jsonAsset.Vec3.ZERO;
    this.impl.applyForce(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, v), cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_1, rp));
  };

  _proto.applyLocalTorque = function applyLocalTorque(torque) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    jsonAsset.Vec3.transformQuat(v3_0, torque, this._sharedBody.node.worldRotation);
    this.impl.applyTorque(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, v3_0));
  };

  _proto.applyLocalImpulse = function applyLocalImpulse(impulse, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    var quat = this._sharedBody.node.worldRotation;
    var v = jsonAsset.Vec3.transformQuat(v3_0, impulse, quat);
    var rp = rel_pos ? jsonAsset.Vec3.transformQuat(v3_1, rel_pos, quat) : jsonAsset.Vec3.ZERO;
    this.impl.applyImpulse(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, v), cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_1, rp));
  };

  _proto.applyForce = function applyForce(force, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    var rp = rel_pos || jsonAsset.Vec3.ZERO;
    this.impl.applyForce(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, force), cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_1, rp));
  };

  _proto.applyTorque = function applyTorque(torque) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    this.impl.applyTorque(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, torque));
  };

  _proto.applyImpulse = function applyImpulse(impulse, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    var rp = rel_pos || jsonAsset.Vec3.ZERO;
    this.impl.applyImpulse(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, impulse), cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_1, rp));
  };

  _proto.getGroup = function getGroup() {
    return this._sharedBody.collisionFilterGroup;
  };

  _proto.setGroup = function setGroup(v) {
    this._sharedBody.collisionFilterGroup = v;
  };

  _proto.addGroup = function addGroup(v) {
    this._sharedBody.collisionFilterGroup |= v;
  };

  _proto.removeGroup = function removeGroup(v) {
    this._sharedBody.collisionFilterGroup &= ~v;
  };

  _proto.getMask = function getMask() {
    return this._sharedBody.collisionFilterMask;
  };

  _proto.setMask = function setMask(v) {
    this._sharedBody.collisionFilterMask = v;
  };

  _proto.addMask = function addMask(v) {
    this._sharedBody.collisionFilterMask |= v;
  };

  _proto.removeMask = function removeMask(v) {
    this._sharedBody.collisionFilterMask &= ~v;
  };

  _proto._wakeUpIfSleep = function _wakeUpIfSleep() {
    if (!this.isAwake) this.impl.activate(true);
  };

  return AmmoRigidBody;
}();
AmmoRigidBody.idCounter = 0;

var AmmoInstance = function () {
  function AmmoInstance() {}

  AmmoInstance.setWrapper = function setWrapper(wrap) {
    this.ptr2WrapObj[instantiated.Ammo.getPointer(wrap.impl)] = wrap;
  };

  AmmoInstance.delWrapper = function delWrapper(wrap) {
    delete this.ptr2WrapObj[instantiated.Ammo.getPointer(wrap.impl)];
  };

  AmmoInstance.getWrapperByPtr = function getWrapperByPtr(ptr) {
    return this.ptr2WrapObj[ptr];
  };

  jsonAsset._createClass(AmmoInstance, null, [{
    key: "bodyStructs",
    get: function get() {
      return this.bodyAndGhosts;
    }
  }, {
    key: "ghostStructs",
    get: function get() {
      return this.bodyAndGhosts;
    }
  }]);

  return AmmoInstance;
}();
AmmoInstance.bodyAndGhosts = {};
AmmoInstance.ptr2WrapObj = {};

var v3_0$1 = CC_V3_0;
var quat_0 = CC_QUAT_0;
var sharedIDCounter = 0;
var AmmoSharedBody = function () {
  AmmoSharedBody.getSharedBody = function getSharedBody(node, wrappedWorld, wrappedBody) {
    var key = node.uuid;
    var newSB;

    if (AmmoSharedBody.sharedBodesMap.has(key)) {
      newSB = AmmoSharedBody.sharedBodesMap.get(key);
    } else {
      newSB = new AmmoSharedBody(node, wrappedWorld);
      var g = collisionMatrix.PhysicsGroup.DEFAULT;
      var m = index.PhysicsSystem.instance.collisionMatrix[g];
      newSB._collisionFilterGroup = g;
      newSB._collisionFilterMask = m;
      AmmoSharedBody.sharedBodesMap.set(node.uuid, newSB);
    }

    if (wrappedBody) {
      newSB._wrappedBody = wrappedBody;
      var _g = wrappedBody.rigidBody.group;
      var _m = index.PhysicsSystem.instance.collisionMatrix[_g];
      newSB._collisionFilterGroup = _g;
      newSB._collisionFilterMask = _m;
    }

    return newSB;
  };

  jsonAsset._createClass(AmmoSharedBody, [{
    key: "wrappedBody",
    get: function get() {
      return this._wrappedBody;
    }
  }, {
    key: "bodyCompoundShape",
    get: function get() {
      return this.bodyStruct.shape;
    }
  }, {
    key: "ghostCompoundShape",
    get: function get() {
      return this.ghostStruct.shape;
    }
  }, {
    key: "body",
    get: function get() {
      return this.bodyStruct.body;
    }
  }, {
    key: "ghost",
    get: function get() {
      return this.ghostStruct.ghost;
    }
  }, {
    key: "collisionFilterGroup",
    get: function get() {
      return this._collisionFilterGroup;
    },
    set: function set(v) {
      if (v !== this._collisionFilterGroup) {
        this._collisionFilterGroup = v;
        this.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
        this.dirty |= EAmmoSharedBodyDirty.GHOST_RE_ADD;
      }
    }
  }, {
    key: "collisionFilterMask",
    get: function get() {
      return this._collisionFilterMask;
    },
    set: function set(v) {
      if (v !== this._collisionFilterMask) {
        this._collisionFilterMask = v;
        this.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
        this.dirty |= EAmmoSharedBodyDirty.GHOST_RE_ADD;
      }
    }
  }, {
    key: "bodyStruct",
    get: function get() {
      this._instantiateBodyStruct();

      return this._bodyStruct;
    }
  }, {
    key: "ghostStruct",
    get: function get() {
      this._instantiateGhostStruct();

      return this._ghostStruct;
    }
  }, {
    key: "bodyEnabled",
    set: function set(v) {
      if (v) {
        if (this.bodyIndex < 0) {
          if (this.bodyStruct.wrappedShapes.length === 0) {
            if (!this.wrappedBody) return;
            if (!this.wrappedBody.rigidBody.isDynamic) return;
          }

          this.bodyIndex = this.wrappedWorld.bodies.length;
          this.wrappedWorld.addSharedBody(this);
          this.syncInitialBody();
        }
      } else if (this.bodyIndex >= 0) {
        var isRemoveBody = this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody == null || this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.isEnabled || this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.rigidBody.enabledInHierarchy;

        if (isRemoveBody) {
          this.body.clearState();
          this.bodyIndex = -1;
          this.wrappedWorld.removeSharedBody(this);
        }
      }
    }
  }, {
    key: "ghostEnabled",
    set: function set(v) {
      if (v) {
        if (this.ghostIndex < 0 && this.ghostStruct.wrappedShapes.length > 0) {
          this.ghostIndex = 1;
          this.wrappedWorld.addGhostObject(this);
          this.syncInitialGhost();
        }
      } else if (this.ghostIndex >= 0) {
        var isRemoveGhost = this.ghostStruct.wrappedShapes.length === 0 && this.ghost;

        if (isRemoveGhost) {
          this.ghostIndex = -1;
          this.wrappedWorld.removeGhostObject(this);
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

  function AmmoSharedBody(node, wrappedWorld) {
    this.id = void 0;
    this.node = void 0;
    this.wrappedWorld = void 0;
    this.wrappedJoints0 = [];
    this.wrappedJoints1 = [];
    this.dirty = 0;
    this._collisionFilterGroup = index.PhysicsSystem.PhysicsGroup.DEFAULT;
    this._collisionFilterMask = -1;
    this.ref = 0;
    this.bodyIndex = -1;
    this.ghostIndex = -1;
    this._bodyStruct = void 0;
    this._ghostStruct = void 0;
    this._wrappedBody = null;
    this.id = AmmoSharedBody.idCounter++;
    this.wrappedWorld = wrappedWorld;
    this.node = node;
  }

  var _proto = AmmoSharedBody.prototype;

  _proto._instantiateBodyStruct = function _instantiateBodyStruct() {
    if (this._bodyStruct) return;
    var st = new instantiated.Ammo.btTransform();
    st.setIdentity();
    cocos2AmmoVec3(st.getOrigin(), this.node.worldPosition);
    var bodyQuat = new instantiated.Ammo.btQuaternion();
    cocos2AmmoQuat(bodyQuat, this.node.worldRotation);
    st.setRotation(bodyQuat);
    var motionState = new instantiated.Ammo.btDefaultMotionState(st);
    var localInertia = new instantiated.Ammo.btVector3(1.6666666269302368, 1.6666666269302368, 1.6666666269302368);
    var bodyShape = new instantiated.Ammo.btCompoundShape();
    var mass = 0;

    if (this._wrappedBody && this._wrappedBody.rigidBody.enabled && this._wrappedBody.rigidBody.isDynamic) {
      mass = this._wrappedBody.rigidBody.mass;
    }

    if (mass === 0) localInertia.setValue(0, 0, 0);
    var rbInfo = new instantiated.Ammo.btRigidBodyConstructionInfo(mass, motionState, AmmoConstant.instance.EMPTY_SHAPE, localInertia);
    var body = new instantiated.Ammo.btRigidBody(rbInfo);
    var sleepTd = index.PhysicsSystem.instance.sleepThreshold;
    body.setSleepingThresholds(sleepTd, sleepTd);
    this._bodyStruct = {
      id: sharedIDCounter++,
      body: body,
      localInertia: localInertia,
      motionState: motionState,
      startTransform: st,
      shape: bodyShape,
      rbInfo: rbInfo,
      worldQuat: bodyQuat,
      wrappedShapes: [],
      useCompound: false
    };
    AmmoInstance.bodyStructs[this._bodyStruct.id] = this._bodyStruct;
    this.body.setUserIndex2(2);
    this.body.setUserIndex(this._bodyStruct.id);
    if (instantiated.Ammo.CC_CONFIG.ignoreSelfBody && this._ghostStruct) this.ghost.setIgnoreCollisionCheck(this.body, true);
    if (this.wrappedBody) this.setBodyType(this.wrappedBody.rigidBody.type);
  };

  _proto._instantiateGhostStruct = function _instantiateGhostStruct() {
    if (this._ghostStruct) return;
    var ghost = new instantiated.Ammo.btCollisionObject();
    var ghostShape = new instantiated.Ammo.btCompoundShape();
    ghost.setCollisionShape(ghostShape);
    ghost.setCollisionFlags(AmmoCollisionFlags.CF_STATIC_OBJECT | AmmoCollisionFlags.CF_NO_CONTACT_RESPONSE);
    this._ghostStruct = {
      id: sharedIDCounter++,
      ghost: ghost,
      shape: ghostShape,
      worldQuat: new instantiated.Ammo.btQuaternion(),
      wrappedShapes: []
    };
    AmmoInstance.ghostStructs[this._ghostStruct.id] = this._ghostStruct;
    this.ghost.setUserIndex2(2);
    this.ghost.setUserIndex(this._ghostStruct.id);
    if (instantiated.Ammo.CC_CONFIG.ignoreSelfBody && this._bodyStruct) this.ghost.setIgnoreCollisionCheck(this.body, true);
    if (this.wrappedBody) this.setGhostType(this.wrappedBody.rigidBody.type);
  };

  _proto.setType = function setType(v) {
    this.setBodyType(v);
    this.setGhostType(v);
  };

  _proto.setBodyType = function setBodyType(v) {
    if (this._bodyStruct && this._wrappedBody) {
      var body = this._bodyStruct.body;
      var wrap = this._wrappedBody;
      var com = wrap.rigidBody;
      var m_bcf = body.getCollisionFlags();
      var localInertia = AmmoConstant.instance.VECTOR3_0;

      switch (v) {
        case collisionMatrix.ERigidBodyType.DYNAMIC:
          m_bcf &= ~AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          m_bcf &= ~AmmoCollisionFlags.CF_STATIC_OBJECT;
          body.setCollisionFlags(m_bcf);
          wrap.setMass(com.mass);
          wrap.useGravity(com.useGravity);
          wrap.setAllowSleep(com.allowSleep);
          break;

        case collisionMatrix.ERigidBodyType.KINEMATIC:
          localInertia.setValue(0, 0, 0);
          body.setMassProps(0, localInertia);
          m_bcf |= AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          m_bcf &= ~AmmoCollisionFlags.CF_STATIC_OBJECT;
          body.setCollisionFlags(m_bcf);
          body.forceActivationState(AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
          break;

        case collisionMatrix.ERigidBodyType.STATIC:
        default:
          localInertia.setValue(0, 0, 0);
          body.setMassProps(0, localInertia);
          m_bcf |= AmmoCollisionFlags.CF_STATIC_OBJECT;
          m_bcf &= ~AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          body.setCollisionFlags(m_bcf);
          body.forceActivationState(AmmoCollisionObjectStates.ISLAND_SLEEPING);
          break;
      }

      this.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
    }
  };

  _proto.setGhostType = function setGhostType(v) {
    if (this._ghostStruct) {
      var ghost = this._ghostStruct.ghost;
      var m_gcf = ghost.getCollisionFlags();

      switch (v) {
        case collisionMatrix.ERigidBodyType.DYNAMIC:
        case collisionMatrix.ERigidBodyType.KINEMATIC:
          m_gcf &= ~AmmoCollisionFlags.CF_STATIC_OBJECT;
          m_gcf |= AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          ghost.setCollisionFlags(m_gcf);
          ghost.forceActivationState(AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
          break;

        case collisionMatrix.ERigidBodyType.STATIC:
        default:
          m_gcf &= ~AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          m_gcf |= AmmoCollisionFlags.CF_STATIC_OBJECT;
          ghost.setCollisionFlags(m_gcf);
          ghost.forceActivationState(AmmoCollisionObjectStates.ISLAND_SLEEPING);
          break;
      }

      this.dirty |= EAmmoSharedBodyDirty.GHOST_RE_ADD;
    }
  };

  _proto.addShape = function addShape(v, isTrigger) {
    function switchShape(that, shape) {
      that.body.setCollisionShape(shape);
      that.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;

      if (that._wrappedBody && that._wrappedBody.isEnabled) {
        that._wrappedBody.setMass(that._wrappedBody.rigidBody.mass);
      }
    }

    if (isTrigger) {
      var index = this.ghostStruct.wrappedShapes.indexOf(v);

      if (index < 0) {
        this.ghostStruct.wrappedShapes.push(v);
        v.setCompound(this.ghostCompoundShape);
        this.ghostEnabled = true;
      }
    } else {
      var _index = this.bodyStruct.wrappedShapes.indexOf(v);

      if (_index < 0) {
        this.bodyStruct.wrappedShapes.push(v);

        if (this.bodyStruct.useCompound) {
          v.setCompound(this.bodyCompoundShape);
        } else {
          var l = this.bodyStruct.wrappedShapes.length;

          if (l === 1 && !v.needCompound()) {
            switchShape(this, v.impl);
          } else {
            this.bodyStruct.useCompound = true;

            for (var i = 0; i < l; i++) {
              var childShape = this.bodyStruct.wrappedShapes[i];
              childShape.setCompound(this.bodyCompoundShape);
            }

            switchShape(this, this.bodyStruct.shape);
          }
        }

        this.bodyEnabled = true;
      }
    }
  };

  _proto.removeShape = function removeShape(v, isTrigger) {
    if (isTrigger) {
      var index = this.ghostStruct.wrappedShapes.indexOf(v);

      if (index >= 0) {
        jsonAsset.fastRemoveAt(this.ghostStruct.wrappedShapes, index);
        v.setCompound(null);
        this.ghostEnabled = false;
      }
    } else {
      var _index2 = this.bodyStruct.wrappedShapes.indexOf(v);

      if (_index2 >= 0) {
        if (this.bodyStruct.useCompound) {
          v.setCompound(null);
        } else {
          this.body.setCollisionShape(AmmoConstant.instance.EMPTY_SHAPE);
        }

        this.body.activate(true);
        this.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
        jsonAsset.fastRemoveAt(this.bodyStruct.wrappedShapes, _index2);
        this.bodyEnabled = false;
      }
    }
  };

  _proto.addJoint = function addJoint(v, type) {
    if (type) {
      var i = this.wrappedJoints1.indexOf(v);
      if (i < 0) this.wrappedJoints1.push(v);
    } else {
      var _i = this.wrappedJoints0.indexOf(v);

      if (_i < 0) this.wrappedJoints0.push(v);
    }
  };

  _proto.removeJoint = function removeJoint(v, type) {
    if (type) {
      var i = this.wrappedJoints1.indexOf(v);
      if (i >= 0) jsonAsset.fastRemoveAt(this.wrappedJoints1, i);
    } else {
      var _i2 = this.wrappedJoints0.indexOf(v);

      if (_i2 >= 0) jsonAsset.fastRemoveAt(this.wrappedJoints0, _i2);
    }
  };

  _proto.updateDirty = function updateDirty() {
    if (this.dirty) {
      if (this.bodyIndex >= 0 && this.dirty & EAmmoSharedBodyDirty.BODY_RE_ADD) this.updateBodyByReAdd();
      if (this.ghostIndex >= 0 && this.dirty & EAmmoSharedBodyDirty.GHOST_RE_ADD) this.updateGhostByReAdd();
      this.dirty = 0;
    }
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics() {
    if (this.node.hasChangedFlags) {
      var wt = this.body.getWorldTransform();
      cocos2AmmoVec3(wt.getOrigin(), this.node.worldPosition);
      cocos2AmmoQuat(this.bodyStruct.worldQuat, this.node.worldRotation);
      wt.setRotation(this.bodyStruct.worldQuat);

      if (this.node.hasChangedFlags & jsonAsset.TransformBit.SCALE) {
        this.syncBodyScale();
      }

      if (this.body.isKinematicObject()) {
        var ms = this.body.getMotionState();
        if (ms) ms.setWorldTransform(wt);
      } else if (this.isBodySleeping()) this.body.activate();
    }
  };

  _proto.syncPhysicsToScene = function syncPhysicsToScene() {
    if (this.body.isStaticOrKinematicObject() || this.isBodySleeping()) {
      return;
    }

    var wt0 = this.bodyStruct.startTransform;
    this.body.getMotionState().getWorldTransform(wt0);
    this.node.worldPosition = ammo2CocosVec3(v3_0$1, wt0.getOrigin());
    wt0.getBasis().getRotation(this.bodyStruct.worldQuat);
    this.node.worldRotation = ammo2CocosQuat(quat_0, this.bodyStruct.worldQuat);

    if (this._ghostStruct) {
      var wt1 = this.ghost.getWorldTransform();
      cocos2AmmoVec3(wt1.getOrigin(), this.node.worldPosition);
      cocos2AmmoQuat(this.ghostStruct.worldQuat, this.node.worldRotation);
      wt1.setRotation(this.ghostStruct.worldQuat);
    }
  };

  _proto.syncSceneToGhost = function syncSceneToGhost() {
    if (this.node.hasChangedFlags) {
      var wt1 = this.ghost.getWorldTransform();
      cocos2AmmoVec3(wt1.getOrigin(), this.node.worldPosition);
      cocos2AmmoQuat(this.ghostStruct.worldQuat, this.node.worldRotation);
      wt1.setRotation(this.ghostStruct.worldQuat);
      if (this.node.hasChangedFlags & jsonAsset.TransformBit.SCALE) this.syncGhostScale();
      this.ghost.activate();
    }
  };

  _proto.syncInitialBody = function syncInitialBody() {
    var wt = this.body.getWorldTransform();
    cocos2AmmoVec3(wt.getOrigin(), this.node.worldPosition);
    cocos2AmmoQuat(this.bodyStruct.worldQuat, this.node.worldRotation);
    wt.setRotation(this.bodyStruct.worldQuat);
    this.syncBodyScale();
    this.body.activate();
  };

  _proto.syncInitialGhost = function syncInitialGhost() {
    var wt1 = this.ghost.getWorldTransform();
    cocos2AmmoVec3(wt1.getOrigin(), this.node.worldPosition);
    cocos2AmmoQuat(this.ghostStruct.worldQuat, this.node.worldRotation);
    wt1.setRotation(this.ghostStruct.worldQuat);
    this.syncGhostScale();
    this.ghost.activate();
  };

  _proto.syncBodyScale = function syncBodyScale() {
    for (var i = 0; i < this.bodyStruct.wrappedShapes.length; i++) {
      this.bodyStruct.wrappedShapes[i].updateScale();
    }

    for (var _i3 = 0; _i3 < this.wrappedJoints0.length; _i3++) {
      this.wrappedJoints0[_i3].updateScale0();
    }

    for (var _i4 = 0; _i4 < this.wrappedJoints1.length; _i4++) {
      this.wrappedJoints1[_i4].updateScale1();
    }
  };

  _proto.syncGhostScale = function syncGhostScale() {
    for (var i = 0; i < this.ghostStruct.wrappedShapes.length; i++) {
      this.ghostStruct.wrappedShapes[i].updateScale();
    }
  };

  _proto.updateBodyByReAdd = function updateBodyByReAdd() {
    if (this.bodyIndex >= 0) {
      this.wrappedWorld.removeSharedBody(this);
      this.bodyIndex = this.wrappedWorld.bodies.length;
      this.wrappedWorld.addSharedBody(this);
    }
  };

  _proto.updateGhostByReAdd = function updateGhostByReAdd() {
    if (this.ghostIndex >= 0) {
      this.wrappedWorld.removeGhostObject(this);
      this.ghostIndex = this.wrappedWorld.ghosts.length;
      this.wrappedWorld.addGhostObject(this);
    }
  };

  _proto.destroy = function destroy() {
    AmmoSharedBody.sharedBodesMap["delete"](this.node.uuid);
    this.node = null;
    this.wrappedWorld = null;

    if (this._bodyStruct) {
      var bodyStruct = this._bodyStruct;
      instantiated.Ammo.destroy(bodyStruct.localInertia);
      instantiated.Ammo.destroy(bodyStruct.worldQuat);
      instantiated.Ammo.destroy(bodyStruct.startTransform);
      instantiated.Ammo.destroy(bodyStruct.motionState);
      instantiated.Ammo.destroy(bodyStruct.rbInfo);
      instantiated.Ammo.destroy(bodyStruct.shape);
      ammoDeletePtr(bodyStruct.shape, instantiated.Ammo.btCollisionShape);
      var body = instantiated.Ammo.castObject(bodyStruct.body, instantiated.Ammo.btRigidBody);
      body.wrapped = null;
      ammoDeletePtr(bodyStruct.body, instantiated.Ammo.btRigidBody);
      ammoDeletePtr(bodyStruct.body, instantiated.Ammo.btCollisionObject);
      delete AmmoInstance.bodyStructs[bodyStruct.id];
      this._bodyStruct = null;
    }

    if (this._ghostStruct) {
      var ghostStruct = this._ghostStruct;
      instantiated.Ammo.destroy(ghostStruct.worldQuat);
      instantiated.Ammo.destroy(ghostStruct.shape);
      ammoDeletePtr(ghostStruct.shape, instantiated.Ammo.btCollisionShape);
      instantiated.Ammo.destroy(ghostStruct.ghost);
      delete AmmoInstance.bodyStructs[ghostStruct.id];
      this._ghostStruct = null;
    }
  };

  _proto.isBodySleeping = function isBodySleeping() {
    var state = this.body.getActivationState();
    return state === AmmoCollisionObjectStates.ISLAND_SLEEPING;
  };

  return AmmoSharedBody;
}();
AmmoSharedBody.idCounter = 0;
AmmoSharedBody.sharedBodesMap = new Map();

var AmmoContactEquation = function () {
  jsonAsset._createClass(AmmoContactEquation, [{
    key: "isBodyA",
    get: function get() {
      var sb = this.event.selfCollider.shape.sharedBody.body;
      var b0 = this.event.impl.getBody0();
      return Ammo.compare(b0, sb);
    }
  }]);

  function AmmoContactEquation(event) {
    this.impl = null;
    this.event = void 0;
    this.event = event;
  }

  var _proto = AmmoContactEquation.prototype;

  _proto.getLocalPointOnA = function getLocalPointOnA(out) {
    if (this.impl) ammo2CocosVec3(out, this.impl.m_localPointA);
  };

  _proto.getLocalPointOnB = function getLocalPointOnB(out) {
    if (this.impl) ammo2CocosVec3(out, this.impl.m_localPointB);
  };

  _proto.getWorldPointOnA = function getWorldPointOnA(out) {
    if (this.impl) ammo2CocosVec3(out, this.impl.m_positionWorldOnA);
  };

  _proto.getWorldPointOnB = function getWorldPointOnB(out) {
    if (this.impl) ammo2CocosVec3(out, this.impl.m_positionWorldOnB);
  };

  _proto.getLocalNormalOnA = function getLocalNormalOnA(out) {
    if (this.impl) {
      ammo2CocosVec3(out, this.impl.m_normalWorldOnB);
      if (!this.isBodyA) jsonAsset.Vec3.negate(out, out);
      var inv_rot = CC_QUAT_0;
      var bt_rot = AmmoConstant.instance.QUAT_0;
      var body = this.event.impl.getBody0();
      body.getWorldTransform().getBasis().getRotation(bt_rot);
      ammo2CocosQuat(inv_rot, bt_rot);
      jsonAsset.Quat.conjugate(inv_rot, inv_rot);
      jsonAsset.Vec3.transformQuat(out, out, inv_rot);
    }
  };

  _proto.getLocalNormalOnB = function getLocalNormalOnB(out) {
    if (this.impl) {
      var inv_rot = CC_QUAT_0;
      var bt_rot = AmmoConstant.instance.QUAT_0;
      var body = this.event.impl.getBody1();
      body.getWorldTransform().getBasis().getRotation(bt_rot);
      ammo2CocosQuat(inv_rot, bt_rot);
      jsonAsset.Quat.conjugate(inv_rot, inv_rot);
      ammo2CocosVec3(out, this.impl.m_normalWorldOnB);
      jsonAsset.Vec3.transformQuat(out, out, inv_rot);
    }
  };

  _proto.getWorldNormalOnA = function getWorldNormalOnA(out) {
    if (this.impl) {
      ammo2CocosVec3(out, this.impl.m_normalWorldOnB);
      if (!this.isBodyA) jsonAsset.Vec3.negate(out, out);
    }
  };

  _proto.getWorldNormalOnB = function getWorldNormalOnB(out) {
    if (this.impl) ammo2CocosVec3(out, this.impl.m_normalWorldOnB);
  };

  return AmmoContactEquation;
}();

var contactsPool = [];
var v3_0$2 = CC_V3_0;
var v3_1$1 = CC_V3_1;
var AmmoWorld = function () {
  var _proto = AmmoWorld.prototype;

  _proto.setAllowSleep = function setAllowSleep(v) {
    this._btWorld.setAllowSleep(v);
  };

  _proto.setDefaultMaterial = function setDefaultMaterial(v) {};

  _proto.setGravity = function setGravity(gravity) {
    var TMP = AmmoConstant.instance.VECTOR3_0;
    cocos2AmmoVec3(TMP, gravity);

    this._btWorld.setGravity(TMP);
  };

  jsonAsset._createClass(AmmoWorld, [{
    key: "impl",
    get: function get() {
      return this._btWorld;
    }
  }]);

  function AmmoWorld(options) {
    this._btWorld = void 0;
    this._btBroadphase = void 0;
    this._btSolver = void 0;
    this._btDispatcher = void 0;
    this._btCollisionConfiguration = void 0;
    this.bodies = [];
    this.ghosts = [];
    this.constraints = [];
    this.triggerArrayMat = new arrayCollisionMatrix.ArrayCollisionMatrix();
    this.collisionArrayMat = new arrayCollisionMatrix.ArrayCollisionMatrix();
    this.contactsDic = new tupleDictionary.TupleDictionary();
    this.oldContactsDic = new tupleDictionary.TupleDictionary();
    this._btCollisionConfiguration = new instantiated.Ammo.btDefaultCollisionConfiguration();
    this._btDispatcher = new instantiated.Ammo.btCollisionDispatcher(this._btCollisionConfiguration);
    this._btBroadphase = new instantiated.Ammo.btDbvtBroadphase();
    this._btSolver = new instantiated.Ammo.btSequentialImpulseConstraintSolver();
    this._btWorld = new instantiated.Ammo.ccDiscreteDynamicsWorld(this._btDispatcher, this._btBroadphase, this._btSolver, this._btCollisionConfiguration);
    var TMP = AmmoConstant.instance.VECTOR3_0;
    TMP.setValue(0, -10, 0);

    this._btWorld.setGravity(TMP);

    if (!AmmoWorld.closeHitCB) AmmoWorld.closeHitCB = new instantiated.Ammo.ccClosestRayResultCallback(TMP, TMP);
    if (!AmmoWorld.allHitsCB) AmmoWorld.allHitsCB = new instantiated.Ammo.ccAllHitsRayResultCallback(TMP, TMP);
  }

  _proto.destroy = function destroy() {
    if (this.constraints.length || this.bodies.length) jsonAsset.error('You should destroy all physics component first.');
    instantiated.Ammo.destroy(this._btWorld);
    instantiated.Ammo.destroy(this._btSolver);
    instantiated.Ammo.destroy(this._btBroadphase);
    instantiated.Ammo.destroy(this._btDispatcher);
    instantiated.Ammo.destroy(this._btCollisionConfiguration);
    this._btCollisionConfiguration = null;
    this._btDispatcher = null;
    this._btBroadphase = null;
    this._btSolver = null;
    this._btWorld = null;
    this.bodies = null;
    this.ghosts = null;
    this.constraints = null;
    this.triggerArrayMat = null;
    this.collisionArrayMat = null;
    this.contactsDic = null;
    this.oldContactsDic = null;
    contactsPool.length = 0;
  };

  _proto.step = function step(deltaTime, timeSinceLastCalled, maxSubStep) {
    if (maxSubStep === void 0) {
      maxSubStep = 0;
    }

    if (this.bodies.length === 0 && this.ghosts.length === 0) return;
    if (timeSinceLastCalled === undefined) timeSinceLastCalled = deltaTime;

    this._btWorld.stepSimulation(timeSinceLastCalled, maxSubStep, deltaTime);

    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncPhysicsToScene();
    }
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics() {
    for (var i = 0; i < this.ghosts.length; i++) {
      this.ghosts[i].updateDirty();
      this.ghosts[i].syncSceneToGhost();
    }

    for (var _i = 0; _i < this.bodies.length; _i++) {
      this.bodies[_i].updateDirty();

      this.bodies[_i].syncSceneToPhysics();
    }
  };

  _proto.syncAfterEvents = function syncAfterEvents() {
    this.syncSceneToPhysics();
  };

  _proto.raycast = function raycast(worldRay, options, pool, results) {
    var allHitsCB = AmmoWorld.allHitsCB;
    var from = cocos2AmmoVec3(allHitsCB.m_rayFromWorld, worldRay.o);
    worldRay.computeHit(v3_0$2, options.maxDistance);
    var to = cocos2AmmoVec3(allHitsCB.m_rayToWorld, v3_0$2);
    allHitsCB.reset(options.mask, options.queryTrigger);

    this._btWorld.rayTest(from, to, allHitsCB);

    if (allHitsCB.hasHit()) {
      var shapePtrs = allHitsCB.getCollisionShapePtrs();
      var hp = allHitsCB.getHitPointWorld();
      var hn = allHitsCB.getHitNormalWorld();

      for (var i = 0, n = shapePtrs.size(); i < n; i++) {
        var shape = AmmoInstance.getWrapperByPtr(shapePtrs.at(i));
        ammo2CocosVec3(v3_0$2, hp.at(i));
        ammo2CocosVec3(v3_1$1, hn.at(i));
        var r = pool.add();

        r._assign(v3_0$2, jsonAsset.Vec3.distance(worldRay.o, v3_0$2), shape.collider, v3_1$1);

        results.push(r);
      }

      return true;
    }

    return false;
  };

  _proto.raycastClosest = function raycastClosest(worldRay, options, result) {
    var closeHitCB = AmmoWorld.closeHitCB;
    var from = cocos2AmmoVec3(closeHitCB.m_rayFromWorld, worldRay.o);
    worldRay.computeHit(v3_0$2, options.maxDistance);
    var to = cocos2AmmoVec3(closeHitCB.m_rayToWorld, v3_0$2);
    closeHitCB.reset(options.mask, options.queryTrigger);

    this._btWorld.rayTest(from, to, closeHitCB);

    if (closeHitCB.hasHit()) {
      var shape = AmmoInstance.getWrapperByPtr(closeHitCB.getCollisionShapePtr());
      ammo2CocosVec3(v3_0$2, closeHitCB.getHitPointWorld());
      ammo2CocosVec3(v3_1$1, closeHitCB.getHitNormalWorld());

      result._assign(v3_0$2, jsonAsset.Vec3.distance(worldRay.o, v3_0$2), shape.collider, v3_1$1);

      return true;
    }

    return false;
  };

  _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
    return AmmoSharedBody.getSharedBody(node, this, wrappedBody);
  };

  _proto.addSharedBody = function addSharedBody(sharedBody) {
    var i = this.bodies.indexOf(sharedBody);

    if (i < 0) {
      this.bodies.push(sharedBody);

      this._btWorld.addRigidBody(sharedBody.body, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
    }
  };

  _proto.removeSharedBody = function removeSharedBody(sharedBody) {
    var i = this.bodies.indexOf(sharedBody);

    if (i >= 0) {
      jsonAsset.fastRemoveAt(this.bodies, i);

      this._btWorld.removeRigidBody(sharedBody.body);
    }
  };

  _proto.addGhostObject = function addGhostObject(sharedBody) {
    var i = this.ghosts.indexOf(sharedBody);

    if (i < 0) {
      this.ghosts.push(sharedBody);

      this._btWorld.addCollisionObject(sharedBody.ghost, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
    }
  };

  _proto.removeGhostObject = function removeGhostObject(sharedBody) {
    var i = this.ghosts.indexOf(sharedBody);

    if (i >= 0) {
      jsonAsset.fastRemoveAt(this.ghosts, i);

      this._btWorld.removeCollisionObject(sharedBody.ghost);
    }
  };

  _proto.addConstraint = function addConstraint(constraint) {
    var i = this.constraints.indexOf(constraint);

    if (i < 0) {
      this.constraints.push(constraint);

      this._btWorld.addConstraint(constraint.impl, !constraint.constraint.enableCollision);

      constraint.index = i;
    }
  };

  _proto.removeConstraint = function removeConstraint(constraint) {
    var i = this.constraints.indexOf(constraint);

    if (i >= 0) {
      this.constraints.splice(i, 1);

      this._btWorld.removeConstraint(constraint.impl);

      constraint.index = -1;
    }
  };

  _proto.emitEvents = function emitEvents() {
    var ccdTriggerRecord = this._btWorld.getCcdTriggerRecorder();

    var nRecordSize = ccdTriggerRecord.size();
    var offset = 0;

    for (var i = 0; i < nRecordSize; i += offset) {
      var count = ccdTriggerRecord.at(offset);
      var shape0 = AmmoInstance.getWrapperByPtr(ccdTriggerRecord.at(offset + 1));

      for (var j = 0; j < count; j++) {
        var shape1 = AmmoInstance.getWrapperByPtr(ccdTriggerRecord.at(offset + j + 2));

        if (shape0.collider.needTriggerEvent || shape1.collider.needTriggerEvent) {
          var item = this.contactsDic.get(shape0.id, shape1.id);

          if (item == null) {
            item = this.contactsDic.set(shape0.id, shape1.id, {
              shape0: shape0,
              shape1: shape1,
              contacts: [],
              impl: ccdTriggerRecord
            });
          }
        }
      }

      offset += count + 2;
    }

    var numManifolds = this._btDispatcher.getNumManifolds();

    for (var _i2 = 0; _i2 < numManifolds; _i2++) {
      var manifold = this._btDispatcher.getManifoldByIndexInternal(_i2);

      var body0 = manifold.getBody0();
      var body1 = manifold.getBody1();

      if (body0.useCharacter || body1.useCharacter) {
        continue;
      }

      var numContacts = manifold.getNumContacts();

      for (var _j = 0; _j < numContacts; _j++) {
        var manifoldPoint = manifold.getContactPoint(_j);
        var s0 = body0.getCollisionShape();
        var s1 = body1.getCollisionShape();

        var _shape = void 0;

        var _shape2 = void 0;

        if (s0.isCompound()) {
          var com = instantiated.Ammo.castObject(s0, instantiated.Ammo.btCompoundShape);
          _shape = com.getChildShape(manifoldPoint.m_index0).wrapped;
        } else {
          _shape = s0.wrapped;
        }

        if (s1.isCompound()) {
          var _com = instantiated.Ammo.castObject(s1, instantiated.Ammo.btCompoundShape);

          _shape2 = _com.getChildShape(manifoldPoint.m_index1).wrapped;
        } else {
          _shape2 = s1.wrapped;
        }

        if (!_shape || !_shape2) continue;

        if (_shape.collider.needTriggerEvent || _shape2.collider.needTriggerEvent || _shape.collider.needCollisionEvent || _shape2.collider.needCollisionEvent) {
          var _item = this.contactsDic.get(_shape.id, _shape2.id);

          if (_item == null) {
            _item = this.contactsDic.set(_shape.id, _shape2.id, {
              shape0: _shape,
              shape1: _shape2,
              contacts: [],
              impl: manifold
            });
          }

          _item.contacts.push(manifoldPoint);
        }
      }
    }

    var dicL = this.contactsDic.getLength();

    while (dicL--) {
      contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
      CollisionEventObject.contacts.length = 0;
      var key = this.contactsDic.getKeyByIndex(dicL);
      var data = this.contactsDic.getDataByKey(key);
      var _shape3 = data.shape0;
      var _shape4 = data.shape1;
      this.oldContactsDic.set(_shape3.id, _shape4.id, data);
      var collider0 = _shape3.collider;
      var collider1 = _shape4.collider;

      if (collider0 && collider1) {
        var isTrigger = collider0.isTrigger || collider1.isTrigger;

        if (isTrigger) {
          if (this.triggerArrayMat.get(_shape3.id, _shape4.id)) {
            TriggerEventObject.type = 'onTriggerStay';
          } else {
            TriggerEventObject.type = 'onTriggerEnter';
            this.triggerArrayMat.set(_shape3.id, _shape4.id, true);
          }

          TriggerEventObject.impl = data.impl;
          TriggerEventObject.selfCollider = collider0;
          TriggerEventObject.otherCollider = collider1;
          collider0.emit(TriggerEventObject.type, TriggerEventObject);
          TriggerEventObject.selfCollider = collider1;
          TriggerEventObject.otherCollider = collider0;
          collider1.emit(TriggerEventObject.type, TriggerEventObject);
        } else {
          var _body = collider0.attachedRigidBody;
          var _body2 = collider1.attachedRigidBody;

          if (_body && _body2) {
            if (_body.isSleeping && _body2.isSleeping) continue;
          } else if (_body == null && _body2) {
            if (_body2.isSleeping) continue;
          } else if (_body2 == null && _body) {
            if (_body.isSleeping) continue;
          }

          if (this.collisionArrayMat.get(_shape3.id, _shape4.id)) {
            CollisionEventObject.type = 'onCollisionStay';
          } else {
            CollisionEventObject.type = 'onCollisionEnter';
            this.collisionArrayMat.set(_shape3.id, _shape4.id, true);
          }

          for (var _i3 = 0; _i3 < data.contacts.length; _i3++) {
            var cq = data.contacts[_i3];

            if (contactsPool.length > 0) {
              var c = contactsPool.pop();
              c.impl = cq;
              CollisionEventObject.contacts.push(c);
            } else {
              var _c = new AmmoContactEquation(CollisionEventObject);

              _c.impl = cq;
              CollisionEventObject.contacts.push(_c);
            }
          }

          CollisionEventObject.impl = data.impl;
          CollisionEventObject.selfCollider = collider0;
          CollisionEventObject.otherCollider = collider1;
          collider0.emit(CollisionEventObject.type, CollisionEventObject);
          CollisionEventObject.selfCollider = collider1;
          CollisionEventObject.otherCollider = collider0;
          collider1.emit(CollisionEventObject.type, CollisionEventObject);
        }

        if (this.oldContactsDic.get(_shape3.id, _shape4.id) == null) {
          this.oldContactsDic.set(_shape3.id, _shape4.id, data);
        }
      }
    }

    var oldDicL = this.oldContactsDic.getLength();

    while (oldDicL--) {
      var _key = this.oldContactsDic.getKeyByIndex(oldDicL);

      var _data = this.oldContactsDic.getDataByKey(_key);

      var _shape5 = _data.shape0;
      var _shape6 = _data.shape1;
      var _collider = _shape5.collider;
      var _collider2 = _shape6.collider;

      if (_collider && _collider2) {
        var _isTrigger = _collider.isTrigger || _collider2.isTrigger;

        if (this.contactsDic.getDataByKey(_key) == null) {
          if (_isTrigger) {
            if (this.triggerArrayMat.get(_shape5.id, _shape6.id)) {
              TriggerEventObject.type = 'onTriggerExit';
              TriggerEventObject.selfCollider = _collider;
              TriggerEventObject.otherCollider = _collider2;

              _collider.emit(TriggerEventObject.type, TriggerEventObject);

              TriggerEventObject.selfCollider = _collider2;
              TriggerEventObject.otherCollider = _collider;

              _collider2.emit(TriggerEventObject.type, TriggerEventObject);

              this.triggerArrayMat.set(_shape5.id, _shape6.id, false);
              this.oldContactsDic.set(_shape5.id, _shape6.id, null);
            }
          } else if (this.collisionArrayMat.get(_shape5.id, _shape6.id)) {
            contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
            CollisionEventObject.contacts.length = 0;
            CollisionEventObject.type = 'onCollisionExit';
            CollisionEventObject.selfCollider = _collider;
            CollisionEventObject.otherCollider = _collider2;

            _collider.emit(CollisionEventObject.type, CollisionEventObject);

            CollisionEventObject.selfCollider = _collider2;
            CollisionEventObject.otherCollider = _collider;

            _collider2.emit(CollisionEventObject.type, CollisionEventObject);

            this.collisionArrayMat.set(_shape5.id, _shape6.id, false);
            this.oldContactsDic.set(_shape5.id, _shape6.id, null);
          }
        }
      }
    }

    this.contactsDic.reset();
  };

  return AmmoWorld;
}();
AmmoWorld.closeHitCB = void 0;
AmmoWorld.allHitsCB = void 0;

var v3_0$3 = CC_V3_0;
var AmmoShape = function () {
  var _proto = AmmoShape.prototype;

  _proto.updateEventListener = function updateEventListener() {};

  _proto.setMaterial = function setMaterial(v) {
    if (!this._isTrigger && this._isEnabled && v) {
      if (this._btCompound) {
        this._btCompound.setMaterial(this._index, v.friction, v.restitution, v.rollingFriction, v.spinningFriction, 2);
      } else {
        this._sharedBody.body.setFriction(v.friction);

        this._sharedBody.body.setRestitution(v.restitution);

        this._sharedBody.body.setRollingFriction(v.rollingFriction);

        this._sharedBody.body.setSpinningFriction(v.spinningFriction);

        this._sharedBody.body.setUserIndex2(2);
      }
    }
  };

  _proto.setCenter = function setCenter(v) {
    jsonAsset.Vec3.copy(v3_0$3, v);
    v3_0$3.multiply(this._collider.node.worldScale);
    cocos2AmmoVec3(this.transform.getOrigin(), v3_0$3);
    this.updateCompoundTransform();
  };

  _proto.setAsTrigger = function setAsTrigger(v) {
    if (this._isTrigger === v) {
      return;
    }

    if (this._isEnabled) {
      this._sharedBody.removeShape(this, !v);

      this._sharedBody.addShape(this, v);
    }

    this._isTrigger = v;
  };

  jsonAsset._createClass(AmmoShape, [{
    key: "attachedRigidBody",
    get: function get() {
      if (this._sharedBody.wrappedBody) {
        return this._sharedBody.wrappedBody.rigidBody;
      }

      return null;
    }
  }, {
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }, {
    key: "index",
    get: function get() {
      return this._index;
    }
  }]);

  function AmmoShape(type) {
    this.id = void 0;
    this.type = void 0;
    this._index = -1;
    this._isEnabled = false;
    this._isBinding = false;
    this._isTrigger = false;
    this._sharedBody = void 0;
    this._btShape = void 0;
    this._btCompound = null;
    this._collider = void 0;
    this.transform = void 0;
    this.quat = void 0;
    this.scale = void 0;
    this.type = type;
    this.id = AmmoShape.idCounter++;
    this.quat = new instantiated.Ammo.btQuaternion();
    this.transform = new instantiated.Ammo.btTransform();
    this.transform.setIdentity();
    this.scale = new instantiated.Ammo.btVector3(1, 1, 1);
  }

  _proto.getAABB = function getAABB(v) {
    var TRANS = AmmoConstant.instance.TRANSFORM;
    TRANS.setIdentity();
    TRANS.setRotation(cocos2AmmoQuat(AmmoConstant.instance.QUAT_0, this._collider.node.worldRotation));
    var MIN = AmmoConstant.instance.VECTOR3_0;
    var MAX = AmmoConstant.instance.VECTOR3_1;

    this._btShape.getAabb(TRANS, MIN, MAX);

    v.halfExtents.set((MAX.x() - MIN.x()) / 2, (MAX.y() - MIN.y()) / 2, (MAX.z() - MIN.z()) / 2);
    jsonAsset.Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
  };

  _proto.getBoundingSphere = function getBoundingSphere(v) {
    v.radius = this._btShape.getLocalBoundingSphere();
    jsonAsset.Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
  };

  _proto.initialize = function initialize(com) {
    this._collider = com;
    this._isBinding = true;
    this._sharedBody = index.PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
    this.onComponentSet();
    this.setWrapper();
  };

  _proto.setWrapper = function setWrapper() {
    if (AmmoConstant.isNotEmptyShape(this._btShape)) {
      AmmoInstance.setWrapper(this);

      this._btShape.setUserPointerAsInt(instantiated.Ammo.getPointer(this._btShape));

      var shape = instantiated.Ammo.castObject(this._btShape, instantiated.Ammo.btCollisionShape);
      shape.wrapped = this;
    }
  };

  _proto.onComponentSet = function onComponentSet() {};

  _proto.onLoad = function onLoad() {
    this.setCenter(this._collider.center);
    this.setAsTrigger(this._collider.isTrigger);
  };

  _proto.onEnable = function onEnable() {
    this._isEnabled = true;

    this._sharedBody.addShape(this, this._isTrigger);

    this.setMaterial(this.collider.sharedMaterial);
  };

  _proto.onDisable = function onDisable() {
    this._isEnabled = false;

    this._sharedBody.removeShape(this, this._isTrigger);
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._btCompound = null;
    this._collider = null;
    var shape = instantiated.Ammo.castObject(this._btShape, instantiated.Ammo.btCollisionShape);
    shape.wrapped = null;
    instantiated.Ammo.destroy(this.quat);
    instantiated.Ammo.destroy(this.scale);
    instantiated.Ammo.destroy(this.transform);

    if (AmmoConstant.isNotEmptyShape(this._btShape)) {
      AmmoInstance.delWrapper(this);
      instantiated.Ammo.destroy(this._btShape);
      ammoDeletePtr(this._btShape, instantiated.Ammo.btCollisionShape);
    }

    this._btShape = null;
    this.transform = null;
    this.quat = null;
    this.scale = null;
  };

  _proto.updateByReAdd = function updateByReAdd() {
    if (this._isEnabled) {
      this._sharedBody.removeShape(this, this._isTrigger);

      this._sharedBody.addShape(this, this._isTrigger);
    }
  };

  _proto.getGroup = function getGroup() {
    return this._sharedBody.collisionFilterGroup;
  };

  _proto.setGroup = function setGroup(v) {
    this._sharedBody.collisionFilterGroup = v;
  };

  _proto.addGroup = function addGroup(v) {
    this._sharedBody.collisionFilterGroup |= v;
  };

  _proto.removeGroup = function removeGroup(v) {
    this._sharedBody.collisionFilterGroup &= ~v;
  };

  _proto.getMask = function getMask() {
    return this._sharedBody.collisionFilterMask;
  };

  _proto.setMask = function setMask(v) {
    this._sharedBody.collisionFilterMask = v;
  };

  _proto.addMask = function addMask(v) {
    this._sharedBody.collisionFilterMask |= v;
  };

  _proto.removeMask = function removeMask(v) {
    this._sharedBody.collisionFilterMask &= ~v;
  };

  _proto.setCompound = function setCompound(compound) {
    if (this._btCompound) {
      this._btCompound.removeChildShape(this._btShape);

      this._index = -1;
    }

    if (compound) {
      this._index = compound.getNumChildShapes();
      compound.addChildShape(this.transform, this._btShape);
    }

    this._btCompound = compound;
  };

  _proto.updateScale = function updateScale() {
    this.setCenter(this._collider.center);
  };

  _proto.updateCompoundTransform = function updateCompoundTransform() {
    if (this._btCompound) {
      this._btCompound.updateChildTransform(this.index, this.transform, true);
    } else if (this._isEnabled && !this._isTrigger) {
      if (this._sharedBody && !this._sharedBody.bodyStruct.useCompound) {
        this._sharedBody.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
      }
    }
  };

  _proto.needCompound = function needCompound() {
    if (this.type === AmmoBroadphaseNativeTypes.TERRAIN_SHAPE_PROXYTYPE) {
      return true;
    }

    if (this._collider.center.equals(jsonAsset.Vec3.ZERO)) {
      return false;
    }

    return true;
  };

  return AmmoShape;
}();
AmmoShape.idCounter = 0;

var AmmoBoxShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoBoxShape, _AmmoShape);

  var _proto = AmmoBoxShape.prototype;

  _proto.updateSize = function updateSize() {
    var hf = AmmoConstant.instance.VECTOR3_0;
    cocos2AmmoVec3(hf, this.getMinUnscaledHalfExtents(index.VEC3_0));
    this.impl.setUnscaledHalfExtents(hf);
    this.updateCompoundTransform();
  };

  jsonAsset._createClass(AmmoBoxShape, [{
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function AmmoBoxShape() {
    return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.BOX_SHAPE_PROXYTYPE) || this;
  }

  _proto.onComponentSet = function onComponentSet() {
    var hf = AmmoConstant.instance.VECTOR3_0;
    cocos2AmmoVec3(hf, this.getMinUnscaledHalfExtents(index.VEC3_0));
    this._btShape = new instantiated.Ammo.btBoxShape(hf);
    this.updateScale();
  };

  _proto.updateScale = function updateScale() {
    _AmmoShape.prototype.updateScale.call(this);

    cocos2AmmoVec3(this.scale, this.getMinScale(index.VEC3_0));

    this._btShape.setLocalScaling(this.scale);

    this.updateCompoundTransform();
  };

  _proto.getMinUnscaledHalfExtents = function getMinUnscaledHalfExtents(out) {
    var size = this.collider.size;
    var ws = index.absolute(index.VEC3_0.set(this._collider.node.worldScale));
    var minVolumeSize = index.PhysicsSystem.instance.minVolumeSize;
    var halfSizeX = size.x / 2;
    var halfSizeY = size.y / 2;
    var halfSizeZ = size.z / 2;
    var halfX = halfSizeX * ws.x < minVolumeSize ? minVolumeSize / ws.x : halfSizeX;
    var halfY = halfSizeY * ws.y < minVolumeSize ? minVolumeSize / ws.y : halfSizeY;
    var halfZ = halfSizeZ * ws.z < minVolumeSize ? minVolumeSize / ws.z : halfSizeZ;
    out.set(halfX, halfY, halfZ);
    return out;
  };

  _proto.getMinScale = function getMinScale(out) {
    var size = this.collider.size;
    var ws = index.absolute(index.VEC3_0.set(this._collider.node.worldScale));
    var minVolumeSize = index.PhysicsSystem.instance.minVolumeSize;
    var halfSizeX = size.x / 2;
    var halfSizeY = size.y / 2;
    var halfSizeZ = size.z / 2;
    var scaleX = halfSizeX * ws.x < minVolumeSize ? minVolumeSize / halfSizeX : ws.x;
    var scaleY = halfSizeY * ws.y < minVolumeSize ? minVolumeSize / halfSizeY : ws.y;
    var scaleZ = halfSizeZ * ws.z < minVolumeSize ? minVolumeSize / halfSizeZ : ws.z;
    out.set(scaleX, scaleY, scaleZ);
    return out;
  };

  return AmmoBoxShape;
}(AmmoShape);

var AmmoSphereShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoSphereShape, _AmmoShape);

  var _proto = AmmoSphereShape.prototype;

  _proto.updateRadius = function updateRadius() {
    this.impl.setUnscaledRadius(this.getMinUnscaledRadius());
    this.updateCompoundTransform();
  };

  jsonAsset._createClass(AmmoSphereShape, [{
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function AmmoSphereShape() {
    return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.SPHERE_SHAPE_PROXYTYPE) || this;
  }

  _proto.onComponentSet = function onComponentSet() {
    var ws = Math.abs(jsonAsset.absMaxComponent(this._collider.node.worldScale));
    var radius = this.collider.radius;
    var minVolumeSize = index.PhysicsSystem.instance.minVolumeSize;
    var unscaledRadius = ws * radius < minVolumeSize ? minVolumeSize / ws : radius;
    this._btShape = new instantiated.Ammo.btSphereShape(unscaledRadius);
    this.updateScale();
  };

  _proto.updateScale = function updateScale() {
    _AmmoShape.prototype.updateScale.call(this);

    var scale = this.getMinScale();
    index.VEC3_0.set(scale, scale, scale);
    cocos2AmmoVec3(this.scale, index.VEC3_0);

    this._btShape.setLocalScaling(this.scale);

    this.updateCompoundTransform();
  };

  _proto.getMinUnscaledRadius = function getMinUnscaledRadius() {
    var radius = this.collider.radius;
    var ws = Math.abs(jsonAsset.absMaxComponent(this._collider.node.worldScale));
    var minVolumeSize = index.PhysicsSystem.instance.minVolumeSize;
    return ws * radius < minVolumeSize ? minVolumeSize / ws : radius;
  };

  _proto.getMinScale = function getMinScale() {
    var radius = this.collider.radius;
    var ws = Math.abs(jsonAsset.absMaxComponent(this._collider.node.worldScale));
    var minVolumeSize = index.PhysicsSystem.instance.minVolumeSize;
    return ws * radius < minVolumeSize ? minVolumeSize / radius : ws;
  };

  return AmmoSphereShape;
}(AmmoShape);

var AmmoCapsuleShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoCapsuleShape, _AmmoShape);

  var _proto = AmmoCapsuleShape.prototype;

  _proto.setCylinderHeight = function setCylinderHeight(v) {
    this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
  };

  _proto.setDirection = function setDirection(v) {
    this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
  };

  _proto.setRadius = function setRadius(v) {
    this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
  };

  jsonAsset._createClass(AmmoCapsuleShape, [{
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function AmmoCapsuleShape() {
    return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.CAPSULE_SHAPE_PROXYTYPE) || this;
  }

  _proto.onComponentSet = function onComponentSet() {
    this._btShape = new instantiated.Ammo.btCapsuleShape(0.5, 1);
    this.setRadius(this.collider.radius);
  };

  _proto.updateScale = function updateScale() {
    _AmmoShape.prototype.updateScale.call(this);

    this.setRadius(this.collider.radius);
  };

  _proto.updateProperties = function updateProperties(radius, height, direction, scale) {
    var ws = scale;
    var upAxis = direction;

    if (upAxis === 1) {
      var wr = radius * Math.abs(jsonAsset.absMax(ws.x, ws.z));
      var halfH = height / 2 * Math.abs(ws.y);
      this.impl.updateProp(wr, halfH, upAxis);
    } else if (upAxis === 0) {
      var _wr = radius * Math.abs(jsonAsset.absMax(ws.y, ws.z));

      var _halfH = height / 2 * Math.abs(ws.x);

      this.impl.updateProp(_wr, _halfH, upAxis);
    } else {
      var _wr2 = radius * Math.abs(jsonAsset.absMax(ws.x, ws.y));

      var _halfH2 = height / 2 * Math.abs(ws.z);

      this.impl.updateProp(_wr2, _halfH2, upAxis);
    }

    this.updateCompoundTransform();
  };

  return AmmoCapsuleShape;
}(AmmoShape);

var AmmoTrimeshShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoTrimeshShape, _AmmoShape);

  var _proto = AmmoTrimeshShape.prototype;

  _proto.setMesh = function setMesh(v) {
    if (!this._isBinding) return;

    if (this._btShape != null && AmmoConstant.isNotEmptyShape(this._btShape)) {
      jsonAsset.warnID(9620);
    } else {
      var mesh = v;

      if (mesh && mesh.renderingSubMeshes.length > 0) {
        var _btTriangleMesh = this._getBtTriangleMesh(mesh);

        if (this.collider.convex) {
          this._btShape = new instantiated.Ammo.btConvexTriangleMeshShape(_btTriangleMesh, true);
        } else {
          this._btShape = new instantiated.Ammo.btBvhTriangleMeshShape(_btTriangleMesh, true, true);
        }

        cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

        this._btShape.setMargin(0.01);

        this._btShape.setLocalScaling(this.scale);

        this.setWrapper();
        this.setCompound(this._btCompound);
        this.updateByReAdd();
      } else {
        this._btShape = AmmoConstant.instance.EMPTY_SHAPE;
      }
    }
  };

  jsonAsset._createClass(AmmoTrimeshShape, [{
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }, {
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }]);

  function AmmoTrimeshShape() {
    var _this;

    _this = _AmmoShape.call(this, AmmoBroadphaseNativeTypes.TRIANGLE_MESH_SHAPE_PROXYTYPE) || this;
    _this.refBtTriangleMesh = null;
    return _this;
  }

  _proto.onComponentSet = function onComponentSet() {
    this.setMesh(this.collider.mesh);
  };

  _proto.onDestroy = function onDestroy() {
    if (this.refBtTriangleMesh) {
      instantiated.Ammo.destroy(this.refBtTriangleMesh);
    }

    _AmmoShape.prototype.onDestroy.call(this);
  };

  _proto.setCompound = function setCompound(compound) {
    _AmmoShape.prototype.setCompound.call(this, compound);

    this.impl.setUserIndex(this._index);
  };

  _proto.updateScale = function updateScale() {
    _AmmoShape.prototype.updateScale.call(this);

    cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

    this._btShape.setLocalScaling(this.scale);

    this.updateCompoundTransform();
  };

  _proto._getBtTriangleMesh = function _getBtTriangleMesh(mesh) {
    var btTriangleMesh;
    var cache = instantiated.Ammo.CC_CACHE;

    if (cache.btTriangleMesh.enable) {
      if (cache.btTriangleMesh[mesh._uuid] == null) {
        var btm = new instantiated.Ammo.btTriangleMesh();
        cache.btTriangleMesh[mesh._uuid] = btm;
        cocos2AmmoTriMesh(btm, mesh);
      }

      btTriangleMesh = cache.btTriangleMesh[mesh._uuid];
    } else {
      this.refBtTriangleMesh = btTriangleMesh = new instantiated.Ammo.btTriangleMesh();
      cocos2AmmoTriMesh(btTriangleMesh, mesh);
    }

    return btTriangleMesh;
  };

  return AmmoTrimeshShape;
}(AmmoShape);

var AmmoCylinderShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoCylinderShape, _AmmoShape);

  var _proto = AmmoCylinderShape.prototype;

  _proto.setHeight = function setHeight(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  };

  _proto.setDirection = function setDirection(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  };

  _proto.setRadius = function setRadius(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  };

  jsonAsset._createClass(AmmoCylinderShape, [{
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function AmmoCylinderShape() {
    return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.CYLINDER_SHAPE_PROXYTYPE) || this;
  }

  _proto.onComponentSet = function onComponentSet() {
    var hf = AmmoConstant.instance.VECTOR3_0;
    hf.setValue(0.5, 1, 0.5);
    this._btShape = new instantiated.Ammo.btCylinderShape(hf);
    this.setRadius(this.collider.radius);
  };

  _proto.updateScale = function updateScale() {
    _AmmoShape.prototype.updateScale.call(this);

    this.setRadius(this.collider.radius);
  };

  _proto.updateProperties = function updateProperties(radius, height, direction, scale) {
    var ws = scale;
    var upAxis = direction;

    if (upAxis === 1) {
      var wh = height * Math.abs(ws.y);
      var wr = radius * Math.abs(jsonAsset.absMax(ws.x, ws.z));
      var halfH = wh / 2;
      this.impl.updateProp(wr, halfH, upAxis);
    } else if (upAxis === 0) {
      var _wh = height * Math.abs(ws.x);

      var _wr = radius * Math.abs(jsonAsset.absMax(ws.y, ws.z));

      var _halfH = _wh / 2;

      this.impl.updateProp(_wr, _halfH, upAxis);
    } else {
      var _wh2 = height * Math.abs(ws.z);

      var _wr2 = radius * Math.abs(jsonAsset.absMax(ws.x, ws.y));

      var _halfH2 = _wh2 / 2;

      this.impl.updateProp(_wr2, _halfH2, upAxis);
    }

    this.updateCompoundTransform();
  };

  return AmmoCylinderShape;
}(AmmoShape);

var AmmoConeShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoConeShape, _AmmoShape);

  var _proto = AmmoConeShape.prototype;

  _proto.setHeight = function setHeight(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  };

  _proto.setDirection = function setDirection(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  };

  _proto.setRadius = function setRadius(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  };

  jsonAsset._createClass(AmmoConeShape, [{
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function AmmoConeShape() {
    return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.CONE_SHAPE_PROXYTYPE) || this;
  }

  _proto.onComponentSet = function onComponentSet() {
    this._btShape = new instantiated.Ammo.btConeShape(0.5, 1);
    this.setRadius(this.collider.radius);
  };

  _proto.updateScale = function updateScale() {
    _AmmoShape.prototype.updateScale.call(this);

    this.setRadius(this.collider.radius);
  };

  _proto.updateProperties = function updateProperties(radius, height, direction, scale) {
    var ws = scale;
    var upAxis = direction;

    if (upAxis === 1) {
      var wh = height * Math.abs(ws.y);
      var wr = radius * Math.abs(jsonAsset.absMax(ws.x, ws.z));
      this.impl.setRadius(wr);
      this.impl.setHeight(wh);
    } else if (upAxis === 0) {
      var _wh = height * Math.abs(ws.x);

      var _wr = radius * Math.abs(jsonAsset.absMax(ws.y, ws.z));

      this.impl.setRadius(_wr);
      this.impl.setHeight(_wh);
    } else {
      var _wh2 = height * Math.abs(ws.z);

      var _wr2 = radius * Math.abs(jsonAsset.absMax(ws.x, ws.y));

      this.impl.setRadius(_wr2);
      this.impl.setHeight(_wh2);
    }

    this.impl.setConeUpIndex(upAxis);
    this.scale.setValue(1, 1, 1);
    this.impl.setLocalScaling(this.scale);
    this.updateCompoundTransform();
  };

  return AmmoConeShape;
}(AmmoShape);

var AmmoTerrainShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoTerrainShape, _AmmoShape);

  var _proto = AmmoTerrainShape.prototype;

  _proto.setTerrain = function setTerrain(v) {
    if (!this._isBinding) return;

    if (this._btShape != null && AmmoConstant.isNotEmptyShape(this._btShape)) {
      jsonAsset.warn('[Physics] Ammo change the terrain asset after initialization is not support.');
    } else {
      var terrain = v;

      if (terrain) {
        this._tileSize = terrain.tileSize;
        var sizeI = terrain.getVertexCountI();
        var sizeJ = terrain.getVertexCountJ();
        this._buffPtr = instantiated.Ammo._malloc(4 * sizeI * sizeJ);
        var offset = 0;
        var maxHeight = Number.MIN_VALUE;
        var minHeight = Number.MAX_VALUE;

        for (var j = 0; j < sizeJ; j++) {
          for (var i = 0; i < sizeI; i++) {
            var _v = terrain.getHeight(i, j);

            instantiated.Ammo.HEAPF32[this._buffPtr + offset >> 2] = _v;
            maxHeight = maxHeight < _v ? _v : maxHeight;
            minHeight = minHeight > _v ? _v : minHeight;
            offset += 4;
          }
        }

        maxHeight += 0.1;
        minHeight -= 0.1;

        this._localOffset.set((sizeI - 1) / 2 * this._tileSize, (maxHeight + minHeight) / 2, (sizeJ - 1) / 2 * this._tileSize);

        var heightScale = 1;
        var hdt = 'PHY_FLOAT';
        var upAxis = 1;
        var flipQuadEdges = false;
        this._btShape = new instantiated.Ammo.btHeightfieldTerrainShape(sizeI, sizeJ, this._buffPtr, heightScale, minHeight, maxHeight, upAxis, hdt, flipQuadEdges);
        this.scale.setValue(this._tileSize, 1, this._tileSize);

        this._btShape.setLocalScaling(this.scale);

        this.setCompound(this._btCompound);
        this.updateByReAdd();
      } else {
        this._btShape = AmmoConstant.instance.EMPTY_SHAPE;
      }
    }
  };

  jsonAsset._createClass(AmmoTerrainShape, [{
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }, {
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }]);

  function AmmoTerrainShape() {
    var _this;

    _this = _AmmoShape.call(this, AmmoBroadphaseNativeTypes.TERRAIN_SHAPE_PROXYTYPE) || this;
    _this._buffPtr = void 0;
    _this._tileSize = void 0;
    _this._localOffset = void 0;
    _this._buffPtr = 0;
    _this._tileSize = 0;
    _this._localOffset = new jsonAsset.Vec3();
    return _this;
  }

  _proto.onComponentSet = function onComponentSet() {
    this.setTerrain(this.collider.terrain);
  };

  _proto.onDestroy = function onDestroy() {
    if (this._buffPtr) instantiated.Ammo._free(this._buffPtr);

    _AmmoShape.prototype.onDestroy.call(this);
  };

  _proto.setCompound = function setCompound(compound) {
    _AmmoShape.prototype.setCompound.call(this, compound);

    this.impl.setUserIndex(this._index);
  };

  _proto.setCenter = function setCenter(v) {
    jsonAsset.Vec3.copy(CC_V3_0, v);
    CC_V3_0.add(this._localOffset);
    cocos2AmmoVec3(this.transform.getOrigin(), CC_V3_0);
    this.updateCompoundTransform();
  };

  return AmmoTerrainShape;
}(AmmoShape);

var AmmoSimplexShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoSimplexShape, _AmmoShape);

  var _proto = AmmoSimplexShape.prototype;

  _proto.setShapeType = function setShapeType(v) {
    if (this._isBinding) ;
  };

  _proto.setVertices = function setVertices(v) {
    var length = this.VERTICES.length;

    for (var i = 0; i < length; i++) {
      cocos2AmmoVec3(this.VERTICES[i], v[i]);
    }

    cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

    this._btShape.setLocalScaling(this.scale);

    if (this._btCompound) {
      this._btCompound.updateChildTransform(this.index, this.transform, true);
    }
  };

  jsonAsset._createClass(AmmoSimplexShape, [{
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function AmmoSimplexShape() {
    var _this;

    _this = _AmmoShape.call(this, AmmoBroadphaseNativeTypes.TETRAHEDRAL_SHAPE_PROXYTYPE) || this;
    _this.VERTICES = [];
    return _this;
  }

  _proto.onComponentSet = function onComponentSet() {
    this._btShape = new instantiated.Ammo.btBU_Simplex1to4();
    var length = this.collider.shapeType;
    var vertices = this.collider.vertices;

    for (var i = 0; i < length; i++) {
      this.VERTICES[i] = new instantiated.Ammo.btVector3();
      cocos2AmmoVec3(this.VERTICES[i], vertices[i]);
      this.impl.addVertex(this.VERTICES[i]);
    }

    cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

    this._btShape.setLocalScaling(this.scale);
  };

  _proto.onLoad = function onLoad() {
    _AmmoShape.prototype.onLoad.call(this);

    this.collider.updateVertices();
  };

  _proto.onDestroy = function onDestroy() {
    var length = this.VERTICES.length;

    for (var i = 0; i < length; i++) {
      instantiated.Ammo.destroy(this.VERTICES[i]);
    }

    this.VERTICES = null;

    _AmmoShape.prototype.onDestroy.call(this);
  };

  _proto.updateScale = function updateScale() {
    _AmmoShape.prototype.updateScale.call(this);

    cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

    this._btShape.setLocalScaling(this.scale);

    if (this._btCompound) {
      this._btCompound.updateChildTransform(this.index, this.transform, true);
    }
  };

  return AmmoSimplexShape;
}(AmmoShape);

var AmmoPlaneShape = function (_AmmoShape) {
  jsonAsset._inheritsLoose(AmmoPlaneShape, _AmmoShape);

  var _proto = AmmoPlaneShape.prototype;

  _proto.setNormal = function setNormal(v) {
    cocos2AmmoVec3(this.impl.getPlaneNormal(), v);
    this.updateCompoundTransform();
  };

  _proto.setConstant = function setConstant(v) {
    this.impl.setPlaneConstant(v);
    this.updateCompoundTransform();
  };

  _proto.updateScale = function updateScale() {
    _AmmoShape.prototype.updateScale.call(this);

    cocos2AmmoVec3(this.scale, this._collider.node.worldScale);

    this._btShape.setLocalScaling(this.scale);

    this.updateCompoundTransform();
  };

  jsonAsset._createClass(AmmoPlaneShape, [{
    key: "impl",
    get: function get() {
      return this._btShape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }]);

  function AmmoPlaneShape() {
    return _AmmoShape.call(this, AmmoBroadphaseNativeTypes.STATIC_PLANE_PROXYTYPE) || this;
  }

  _proto.onComponentSet = function onComponentSet() {
    var normal = AmmoConstant.instance.VECTOR3_0;
    cocos2AmmoVec3(normal, this.collider.normal);
    this._btShape = new instantiated.Ammo.btStaticPlaneShape(normal, this.collider.constant);
    this.updateScale();
  };

  return AmmoPlaneShape;
}(AmmoShape);

var AmmoConstraint = function () {
  function AmmoConstraint() {
    this.dirty = 0;
    this.index = -1;
    this._impl = void 0;
    this._com = void 0;
    this._rigidBody = void 0;
    this._collided = false;
  }

  var _proto = AmmoConstraint.prototype;

  _proto.setConnectedBody = function setConnectedBody(v) {};

  _proto.setEnableCollision = function setEnableCollision(v) {
    if (this._collided !== v) {
      this._collided = v;
      this.updateByReAdd();
    }
  };

  _proto.updateByReAdd = function updateByReAdd() {
    if (this._rigidBody && this.index >= 0) {
      var sb = this._rigidBody.body.sharedBody;
      sb.wrappedWorld.removeConstraint(this);
      sb.wrappedWorld.addConstraint(this);
    }
  };

  _proto.initialize = function initialize(v) {
    this._com = v;
    this._rigidBody = v.attachedBody;
    this._collided = v.enableCollision;
    this.onComponentSet();
  };

  _proto.onComponentSet = function onComponentSet() {};

  _proto.updateScale0 = function updateScale0() {};

  _proto.updateScale1 = function updateScale1() {};

  _proto.onEnable = function onEnable() {
    var sb = this._rigidBody.body.sharedBody;
    sb.wrappedWorld.addConstraint(this);
    sb.addJoint(this, 0);
    var connect = this.constraint.connectedBody;

    if (connect) {
      var sb2 = connect.body.sharedBody;
      sb2.addJoint(this, 1);
    }
  };

  _proto.onDisable = function onDisable() {
    var sb = this._rigidBody.body.sharedBody;
    sb.wrappedWorld.removeConstraint(this);
    sb.removeJoint(this, 0);
    var connect = this.constraint.connectedBody;

    if (connect) {
      var sb2 = connect.body.sharedBody;
      sb2.removeJoint(this, 1);
    }
  };

  _proto.onDestroy = function onDestroy() {
    instantiated.Ammo.destroy(this._impl);
    this._com = null;
    this._rigidBody = null;
    this._impl = null;
  };

  jsonAsset._createClass(AmmoConstraint, [{
    key: "impl",
    get: function get() {
      return this._impl;
    }
  }, {
    key: "constraint",
    get: function get() {
      return this._com;
    }
  }]);

  return AmmoConstraint;
}();

var AmmoPointToPointConstraint = function (_AmmoConstraint) {
  jsonAsset._inheritsLoose(AmmoPointToPointConstraint, _AmmoConstraint);

  function AmmoPointToPointConstraint() {
    return _AmmoConstraint.apply(this, arguments) || this;
  }

  var _proto = AmmoPointToPointConstraint.prototype;

  _proto.setPivotA = function setPivotA(v) {
    var pivotA = AmmoConstant.instance.VECTOR3_0;
    var cs = this.constraint;
    jsonAsset.Vec3.multiply(CC_V3_0, cs.node.worldScale, cs.pivotA);
    cocos2AmmoVec3(pivotA, CC_V3_0);
    this.impl.setPivotA(pivotA);
    if (!cs.connectedBody) this.setPivotB(cs.pivotB);
  };

  _proto.setPivotB = function setPivotB(v) {
    var cs = this.constraint;
    var node = this._rigidBody.node;
    var pivotB = AmmoConstant.instance.VECTOR3_0;
    var cb = cs.connectedBody;

    if (cb) {
      jsonAsset.Vec3.multiply(CC_V3_0, cb.node.worldScale, cs.pivotB);
      cocos2AmmoVec3(pivotB, CC_V3_0);
    } else {
      jsonAsset.Vec3.multiply(CC_V3_0, node.worldScale, cs.pivotA);
      jsonAsset.Vec3.add(CC_V3_0, CC_V3_0, node.worldPosition);
      jsonAsset.Vec3.add(CC_V3_0, CC_V3_0, cs.pivotB);
      cocos2AmmoVec3(pivotB, CC_V3_0);
    }

    this.impl.setPivotB(pivotB);
  };

  _proto.onComponentSet = function onComponentSet() {
    var bodyA = this._rigidBody.body.impl;
    var cb = this.constraint.connectedBody;
    var bodyB;

    if (cb) {
      bodyB = cb.body.impl;
    }

    var pivotA = AmmoConstant.instance.VECTOR3_0;

    if (bodyB) {
      var pivotB = AmmoConstant.instance.VECTOR3_1;
      this._impl = new instantiated.Ammo.btPoint2PointConstraint(bodyA, bodyB, pivotA, pivotB);
    } else {
      this._impl = new instantiated.Ammo.btPoint2PointConstraint(bodyA, pivotA);
    }

    this.setPivotA(this.constraint.pivotA);
    this.setPivotB(this.constraint.pivotB);
  };

  _proto.updateScale0 = function updateScale0() {
    this.setPivotA(this.constraint.pivotA);
  };

  _proto.updateScale1 = function updateScale1() {
    this.setPivotB(this.constraint.pivotB);
  };

  jsonAsset._createClass(AmmoPointToPointConstraint, [{
    key: "impl",
    get: function get() {
      return this._impl;
    }
  }, {
    key: "constraint",
    get: function get() {
      return this._com;
    }
  }]);

  return AmmoPointToPointConstraint;
}(AmmoConstraint);

var AmmoHingeConstraint = function (_AmmoConstraint) {
  jsonAsset._inheritsLoose(AmmoHingeConstraint, _AmmoConstraint);

  function AmmoHingeConstraint() {
    return _AmmoConstraint.apply(this, arguments) || this;
  }

  var _proto = AmmoHingeConstraint.prototype;

  _proto.setPivotA = function setPivotA(v) {
    this.updateFrames();
  };

  _proto.setPivotB = function setPivotB(v) {
    this.updateFrames();
  };

  _proto.setAxis = function setAxis(v) {
    this.updateFrames();
  };

  _proto.onComponentSet = function onComponentSet() {
    var sb0 = this._rigidBody.body.sharedBody;
    var cb = this.constraint.connectedBody;
    var bodyB = cb ? cb.body.impl : sb0.wrappedWorld.impl.getFixedBody();
    var trans0 = AmmoConstant.instance.TRANSFORM;
    var trans1 = AmmoConstant.instance.TRANSFORM_1;
    this._impl = new instantiated.Ammo.btHingeConstraint(sb0.body, bodyB, trans0, trans1);
    this.updateFrames();
  };

  _proto.updateFrames = function updateFrames() {
    var cs = this.constraint;
    var node = cs.node;
    var v3_0 = CC_V3_0;
    var rot_0 = CC_QUAT_0;
    var trans0 = AmmoConstant.instance.TRANSFORM;
    jsonAsset.Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
    cocos2AmmoVec3(trans0.getOrigin(), v3_0);
    var quat = AmmoConstant.instance.QUAT_0;
    jsonAsset.Quat.rotationTo(rot_0, jsonAsset.Vec3.UNIT_Z, cs.axis);
    trans0.setRotation(cocos2AmmoQuat(quat, rot_0));
    var trans1 = AmmoConstant.instance.TRANSFORM_1;
    var cb = this.constraint.connectedBody;

    if (cb) {
      jsonAsset.Vec3.multiply(v3_0, cb.node.worldScale, cs.pivotB);
    } else {
      jsonAsset.Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
      jsonAsset.Vec3.add(v3_0, v3_0, node.worldPosition);
      jsonAsset.Vec3.add(v3_0, v3_0, cs.pivotB);
      jsonAsset.Quat.multiply(rot_0, rot_0, node.worldRotation);
    }

    cocos2AmmoVec3(trans1.getOrigin(), v3_0);
    trans1.setRotation(cocos2AmmoQuat(quat, rot_0));
    this.impl.setFrames(trans0, trans1);
  };

  _proto.updateScale0 = function updateScale0() {
    this.updateFrames();
  };

  _proto.updateScale1 = function updateScale1() {
    this.updateFrames();
  };

  jsonAsset._createClass(AmmoHingeConstraint, [{
    key: "impl",
    get: function get() {
      return this._impl;
    }
  }, {
    key: "constraint",
    get: function get() {
      return this._com;
    }
  }]);

  return AmmoHingeConstraint;
}(AmmoConstraint);

index.selector.register('ammo.js', {
  PhysicsWorld: AmmoWorld,
  RigidBody: AmmoRigidBody,
  BoxShape: AmmoBoxShape,
  SphereShape: AmmoSphereShape,
  CapsuleShape: AmmoCapsuleShape,
  TrimeshShape: AmmoTrimeshShape,
  CylinderShape: AmmoCylinderShape,
  ConeShape: AmmoConeShape,
  TerrainShape: AmmoTerrainShape,
  SimplexShape: AmmoSimplexShape,
  PlaneShape: AmmoPlaneShape,
  PointToPointConstraint: AmmoPointToPointConstraint,
  HingeConstraint: AmmoHingeConstraint
});

window.Ammo = instantiated.Ammo;
instantiated.Ammo.CC_CONFIG = {
  ignoreSelfBody: true
};
instantiated.Ammo.CC_CACHE = {
  btTriangleMesh: {
    enable: false
  }
};
