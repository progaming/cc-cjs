'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

jsonAsset.replaceProperty(index.PhysicsSystem, 'PhysicsSystem', [{
  name: 'ins',
  newName: 'instance'
}]);
jsonAsset.replaceProperty(index.PhysicsSystem.prototype, 'PhysicsSystem.prototype', [{
  name: 'deltaTime',
  newName: 'fixedTimeStep'
}, {
  name: 'maxSubStep',
  newName: 'maxSubSteps'
}]);
jsonAsset.removeProperty(index.PhysicsSystem.prototype, 'PhysicsSystem.prototype', [{
  name: 'useFixedTime'
}, {
  name: 'useCollisionMatrix'
}, {
  name: 'updateCollisionMatrix'
}, {
  name: 'resetCollisionMatrix'
}, {
  name: 'isCollisionGroup'
}, {
  name: 'setCollisionGroup'
}]);
jsonAsset.replaceProperty(index.Collider.prototype, 'Collider.prototype', [{
  name: 'attachedRigidbody',
  newName: 'attachedRigidBody'
}, {
  name: 'TYPE',
  newName: 'type'
}]);
jsonAsset.replaceProperty(index.Collider, 'Collider', [{
  name: 'EColliderType',
  newName: 'Type'
}, {
  name: 'EAxisDirection',
  newName: 'Axis'
}]);
jsonAsset.replaceProperty(index.Constraint, 'Constraint', [{
  name: 'EConstraintType',
  newName: 'Type'
}]);
jsonAsset.replaceProperty(index.BoxCollider.prototype, 'BoxCollider.prototype', [{
  name: 'boxShape',
  newName: 'shape'
}]);
jsonAsset.replaceProperty(index.SphereCollider.prototype, 'SphereCollider.prototype', [{
  name: 'sphereShape',
  newName: 'shape'
}]);
jsonAsset.replaceProperty(index.CapsuleCollider.prototype, 'CapsuleCollider.prototype', [{
  name: 'capsuleShape',
  newName: 'shape'
}]);
jsonAsset.replaceProperty(index.RigidBody.prototype, 'RigidBody.prototype', [{
  name: 'rigidBody',
  newName: 'body'
}]);
jsonAsset.replaceProperty(index.RigidBody, 'RigidBody', [{
  name: 'ERigidBodyType',
  newName: 'Type'
}]);
jsonAsset.removeProperty(index.RigidBody.prototype, 'RigidBody.prototype', [{
  name: 'fixedRotation'
}]);
jsonAsset.legacyCC.RigidBodyComponent = index.RigidBody;
jsonAsset.js$1.setClassAlias(index.RigidBody, 'cc.RigidBodyComponent');
jsonAsset.legacyCC.ColliderComponent = index.Collider;
jsonAsset.js$1.setClassAlias(index.Collider, 'cc.ColliderComponent');
jsonAsset.legacyCC.BoxColliderComponent = index.BoxCollider;
jsonAsset.js$1.setClassAlias(index.BoxCollider, 'cc.BoxColliderComponent');
jsonAsset.legacyCC.SphereColliderComponent = index.SphereCollider;
jsonAsset.js$1.setClassAlias(index.SphereCollider, 'cc.SphereColliderComponent');
jsonAsset.js$1.setClassAlias(index.CapsuleCollider, 'cc.CapsuleColliderComponent');
jsonAsset.js$1.setClassAlias(index.MeshCollider, 'cc.MeshColliderComponent');
jsonAsset.js$1.setClassAlias(index.CylinderCollider, 'cc.CylinderColliderComponent');
jsonAsset.legacyCC.PhysicMaterial = index.PhysicsMaterial;
jsonAsset.js$1.setClassAlias(index.PhysicsMaterial, 'cc.PhysicMaterial');

jsonAsset.legacyCC.physics = index.physics;

exports.BoxCollider = index.BoxCollider;
exports.BoxColliderComponent = index.BoxCollider;
exports.CapsuleCollider = index.CapsuleCollider;
exports.CapsuleColliderComponent = index.CapsuleCollider;
Object.defineProperty(exports, 'Collider', {
    enumerable: true,
    get: function () {
        return index.Collider;
    }
});
Object.defineProperty(exports, 'ColliderComponent', {
    enumerable: true,
    get: function () {
        return index.Collider;
    }
});
exports.ConeCollider = index.ConeCollider;
exports.ConstantForce = index.ConstantForce;
Object.defineProperty(exports, 'Constraint', {
    enumerable: true,
    get: function () {
        return index.Constraint;
    }
});
exports.CylinderCollider = index.CylinderCollider;
exports.CylinderColliderComponent = index.CylinderCollider;
exports.HingeConstraint = index.HingeConstraint;
exports.MeshCollider = index.MeshCollider;
exports.MeshColliderComponent = index.MeshCollider;
exports.PhysicMaterial = index.PhysicsMaterial;
exports.PhysicsMaterial = index.PhysicsMaterial;
exports.PhysicsRayResult = index.PhysicsRayResult;
exports.PhysicsSystem = index.PhysicsSystem;
exports.PlaneCollider = index.PlaneCollider;
exports.PointToPointConstraint = index.PointToPointConstraint;
Object.defineProperty(exports, 'RigidBody', {
    enumerable: true,
    get: function () {
        return index.RigidBody;
    }
});
Object.defineProperty(exports, 'RigidBodyComponent', {
    enumerable: true,
    get: function () {
        return index.RigidBody;
    }
});
Object.defineProperty(exports, 'SimplexCollider', {
    enumerable: true,
    get: function () {
        return index.SimplexCollider;
    }
});
exports.SphereCollider = index.SphereCollider;
exports.SphereColliderComponent = index.SphereCollider;
exports.TerrainCollider = index.TerrainCollider;
exports.physics = index.physics;
Object.defineProperty(exports, 'EAxisDirection', {
    enumerable: true,
    get: function () {
        return collisionMatrix.EAxisDirection;
    }
});
Object.defineProperty(exports, 'ERigidBodyType', {
    enumerable: true,
    get: function () {
        return collisionMatrix.ERigidBodyType;
    }
});
