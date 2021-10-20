'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
require('./index-04f3192a.js');

(function (ERigidBodyType) {
  ERigidBodyType[ERigidBodyType["DYNAMIC"] = 1] = "DYNAMIC";
  ERigidBodyType[ERigidBodyType["STATIC"] = 2] = "STATIC";
  ERigidBodyType[ERigidBodyType["KINEMATIC"] = 4] = "KINEMATIC";
})(exports.ERigidBodyType || (exports.ERigidBodyType = {}));

jsonAsset.Enum(exports.ERigidBodyType);

(function (EAxisDirection) {
  EAxisDirection[EAxisDirection["X_AXIS"] = 0] = "X_AXIS";
  EAxisDirection[EAxisDirection["Y_AXIS"] = 1] = "Y_AXIS";
  EAxisDirection[EAxisDirection["Z_AXIS"] = 2] = "Z_AXIS";
})(exports.EAxisDirection || (exports.EAxisDirection = {}));

jsonAsset.Enum(exports.EAxisDirection);

(function (ESimplexType) {
  ESimplexType[ESimplexType["VERTEX"] = 1] = "VERTEX";
  ESimplexType[ESimplexType["LINE"] = 2] = "LINE";
  ESimplexType[ESimplexType["TRIANGLE"] = 3] = "TRIANGLE";
  ESimplexType[ESimplexType["TETRAHEDRON"] = 4] = "TETRAHEDRON";
})(exports.ESimplexType || (exports.ESimplexType = {}));

jsonAsset.Enum(exports.ESimplexType);

(function (EColliderType) {
  EColliderType[EColliderType["BOX"] = 0] = "BOX";
  EColliderType[EColliderType["SPHERE"] = 1] = "SPHERE";
  EColliderType[EColliderType["CAPSULE"] = 2] = "CAPSULE";
  EColliderType[EColliderType["CYLINDER"] = 3] = "CYLINDER";
  EColliderType[EColliderType["CONE"] = 4] = "CONE";
  EColliderType[EColliderType["MESH"] = 5] = "MESH";
  EColliderType[EColliderType["PLANE"] = 6] = "PLANE";
  EColliderType[EColliderType["SIMPLEX"] = 7] = "SIMPLEX";
  EColliderType[EColliderType["TERRAIN"] = 8] = "TERRAIN";
})(exports.EColliderType || (exports.EColliderType = {}));

jsonAsset.Enum(exports.EColliderType);

(function (EConstraintType) {
  EConstraintType[EConstraintType["POINT_TO_POINT"] = 0] = "POINT_TO_POINT";
  EConstraintType[EConstraintType["HINGE"] = 1] = "HINGE";
  EConstraintType[EConstraintType["CONE_TWIST"] = 2] = "CONE_TWIST";
})(exports.EConstraintType || (exports.EConstraintType = {}));

jsonAsset.Enum(exports.EConstraintType);

(function (PhysicsGroup) {
  PhysicsGroup[PhysicsGroup["DEFAULT"] = 1] = "DEFAULT";
})(exports.PhysicsGroup || (exports.PhysicsGroup = {}));

jsonAsset.Enum(exports.PhysicsGroup);

var CollisionMatrix = function CollisionMatrix(strategy) {
  if (strategy === 1) {
    var self = this;

    var _loop = function _loop(i) {
      var key = "_" + (1 << i);
      self[key] = 0;
      self.updateArray = [];
      Object.defineProperty(self, 1 << i, {
        get: function get() {
          return this[key];
        },
        set: function set(v) {
          if (this[key] !== v) {
            this[key] = v;

            if (this.updateArray.indexOf(i) < 0) {
              this.updateArray.push(i);
            }
          }
        }
      });
    };

    for (var i = 0; i < 32; i++) {
      _loop(i);
    }

    this['_1'] = exports.PhysicsGroup.DEFAULT;
  } else {
    for (var _i = 0; _i < 32; _i++) {
      var key = 1 << _i;
      this["" + key] = 0;
    }

    this['1'] = exports.PhysicsGroup.DEFAULT;
  }
};

exports.CollisionMatrix = CollisionMatrix;
