'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./json-asset-ae61ceca.js');
require('./index-04f3192a.js');
require('./view-c0f88f03.js');
require('./deprecated-024a684c.js');
require('./camera-component-c6f89e45.js');
require('./renderable-component-f3f3ccc0.js');
require('./transform-utils-3cfb96de.js');
require('./collision-matrix-ec4af174.js');
var polygonSeparator = require('./polygon-separator-c28d3043.js');
var hingeJoint2d = require('./hinge-joint-2d-61fbed1e.js');

var Physics2DUtils = {
  PolygonSeparator: polygonSeparator.PolygonSeparator
};

exports.BoxCollider2D = hingeJoint2d.BoxCollider2D;
exports.CircleCollider2D = hingeJoint2d.CircleCollider2D;
exports.Collider2D = hingeJoint2d.Collider2D;
exports.Contact2DType = hingeJoint2d.Contact2DType;
exports.DistanceJoint2D = hingeJoint2d.DistanceJoint2D;
Object.defineProperty(exports, 'ECollider2DType', {
    enumerable: true,
    get: function () {
        return hingeJoint2d.ECollider2DType;
    }
});
Object.defineProperty(exports, 'EJoint2DType', {
    enumerable: true,
    get: function () {
        return hingeJoint2d.EJoint2DType;
    }
});
Object.defineProperty(exports, 'EPhysics2DDrawFlags', {
    enumerable: true,
    get: function () {
        return hingeJoint2d.EPhysics2DDrawFlags;
    }
});
Object.defineProperty(exports, 'ERaycast2DType', {
    enumerable: true,
    get: function () {
        return hingeJoint2d.ERaycast2DType;
    }
});
Object.defineProperty(exports, 'ERigidBody2DType', {
    enumerable: true,
    get: function () {
        return hingeJoint2d.ERigidBody2DType;
    }
});
exports.FixedJoint2D = hingeJoint2d.FixedJoint2D;
exports.HingeJoint2D = hingeJoint2d.HingeJoint2D;
exports.Joint2D = hingeJoint2d.Joint2D;
exports.MouseJoint2D = hingeJoint2d.MouseJoint2D;
exports.PHYSICS_2D_PTM_RATIO = hingeJoint2d.PHYSICS_2D_PTM_RATIO;
Object.defineProperty(exports, 'Physics2DManifoldType', {
    enumerable: true,
    get: function () {
        return hingeJoint2d.Physics2DManifoldType;
    }
});
exports.PhysicsSystem2D = hingeJoint2d.PhysicsSystem2D;
exports.PolygonCollider2D = hingeJoint2d.PolygonCollider2D;
exports.RelativeJoint2D = hingeJoint2d.RelativeJoint2D;
exports.RigidBody2D = hingeJoint2d.RigidBody2D;
exports.SliderJoint2D = hingeJoint2d.SliderJoint2D;
exports.SpringJoint2D = hingeJoint2d.SpringJoint2D;
exports.WheelJoint2D = hingeJoint2d.WheelJoint2D;
exports.Physics2DUtils = Physics2DUtils;
