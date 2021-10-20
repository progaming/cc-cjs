'use strict';

var jsonAsset = require('./json-asset-ae61ceca.js');
var view = require('./view-c0f88f03.js');

jsonAsset.replaceProperty(jsonAsset.SystemEventType, 'Node.EventType', [{
  name: 'POSITION_PART',
  newName: 'TRANSFORM_CHANGED'
}, {
  name: 'ROTATION_PART',
  newName: 'TRANSFORM_CHANGED'
}, {
  name: 'SCALE_PART',
  newName: 'TRANSFORM_CHANGED'
}]);

var keyboardListener = null;
var accelerationListener = null;
var touchListener = null;
var mouseListener = null;
var SystemEvent = function (_EventTarget) {
  jsonAsset._inheritsLoose(SystemEvent, _EventTarget);

  function SystemEvent() {
    return _EventTarget.call(this) || this;
  }

  var _proto = SystemEvent.prototype;

  _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnabled) {

    if (isEnabled && window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(function (response) {
        jsonAsset.logID(3520, response);
        view.inputManager.setAccelerometerEnabled(response === 'granted');
      })["catch"](function (error) {
        jsonAsset.warnID(3521, error.message);
        view.inputManager.setAccelerometerEnabled(false);
      });
    } else {
      view.inputManager.setAccelerometerEnabled(isEnabled);
    }
  };

  _proto.setAccelerometerInterval = function setAccelerometerInterval(interval) {

    view.inputManager.setAccelerometerInterval(interval);
  };

  _proto.on = function on(type, callback, target, once) {

    _EventTarget.prototype.on.call(this, type, callback, target, once);

    if (type === jsonAsset.SystemEventType.KEY_DOWN || type === jsonAsset.SystemEventType.KEY_UP) {
      if (!keyboardListener) {
        keyboardListener = jsonAsset.EventListener.create({
          event: jsonAsset.EventListener.KEYBOARD,
          onKeyDown: function onKeyDown(keyCode, event) {
            systemEvent.emit(event.type, event);
          },
          onKeyPressed: function onKeyPressed(keyCode, event) {
            systemEvent.emit(event.type, event);
          },
          onKeyReleased: function onKeyReleased(keyCode, event) {
            systemEvent.emit(event.type, event);
          }
        });
        jsonAsset.eventManager.addListener(keyboardListener, 256);
      }
    }

    if (type === jsonAsset.SystemEventType.DEVICEMOTION) {
      if (!accelerationListener) {
        accelerationListener = jsonAsset.EventListener.create({
          event: jsonAsset.EventListener.ACCELERATION,
          callback: function callback(acc, event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, event);
          }
        });
        jsonAsset.eventManager.addListener(accelerationListener, 256);
      }
    }

    if (type === jsonAsset.SystemEventType.TOUCH_START || type === jsonAsset.SystemEventType.TOUCH_MOVE || type === jsonAsset.SystemEventType.TOUCH_END || type === jsonAsset.SystemEventType.TOUCH_CANCEL) {
      if (!touchListener) {
        touchListener = jsonAsset.EventListener.create({
          event: jsonAsset.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: function onTouchBegan(touch, event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, touch, event);
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, touch, event);
          },
          onTouchEnded: function onTouchEnded(touch, event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, touch, event);
          },
          onTouchCancelled: function onTouchCancelled(touch, event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, touch, event);
          }
        });
        jsonAsset.eventManager.addListener(touchListener, 256);
      }
    }

    if (type === jsonAsset.SystemEventType.MOUSE_DOWN || type === jsonAsset.SystemEventType.MOUSE_MOVE || type === jsonAsset.SystemEventType.MOUSE_UP || type === jsonAsset.SystemEventType.MOUSE_WHEEL) {
      if (!mouseListener) {
        mouseListener = jsonAsset.EventListener.create({
          event: jsonAsset.EventListener.MOUSE,
          onMouseDown: function onMouseDown(event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, event);
          },
          onMouseMove: function onMouseMove(event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, event);
          },
          onMouseUp: function onMouseUp(event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, event);
          },
          onMouseScroll: function onMouseScroll(event) {
            jsonAsset.legacyCC.systemEvent.emit(event.type, event);
          }
        });
        jsonAsset.eventManager.addListener(mouseListener, 256);
      }
    }

    return callback;
  };

  _proto.off = function off(type, callback, target) {

    _EventTarget.prototype.off.call(this, type, callback, target);

    if (keyboardListener && (type === jsonAsset.SystemEventType.KEY_DOWN || type === jsonAsset.SystemEventType.KEY_UP)) {
      var hasKeyPressingEventListener = this.hasEventListener(jsonAsset.SystemEventType.KEY_DOWN);
      var hasKeyUpEventListener = this.hasEventListener(jsonAsset.SystemEventType.KEY_UP);

      if (!hasKeyPressingEventListener && !hasKeyUpEventListener) {
        jsonAsset.eventManager.removeListener(keyboardListener);
        keyboardListener = null;
      }
    }

    if (accelerationListener && type === jsonAsset.SystemEventType.DEVICEMOTION) {
      jsonAsset.eventManager.removeListener(accelerationListener);
      accelerationListener = null;
    }

    if (touchListener && (type === jsonAsset.SystemEventType.TOUCH_START || type === jsonAsset.SystemEventType.TOUCH_MOVE || type === jsonAsset.SystemEventType.TOUCH_END || type === jsonAsset.SystemEventType.TOUCH_CANCEL)) {
      var hasTouchStart = this.hasEventListener(jsonAsset.SystemEventType.TOUCH_START);
      var hasTouchMove = this.hasEventListener(jsonAsset.SystemEventType.TOUCH_MOVE);
      var hasTouchEnd = this.hasEventListener(jsonAsset.SystemEventType.TOUCH_END);
      var hasTouchCancel = this.hasEventListener(jsonAsset.SystemEventType.TOUCH_CANCEL);

      if (!hasTouchStart && !hasTouchMove && !hasTouchEnd && !hasTouchCancel) {
        jsonAsset.eventManager.removeListener(touchListener);
        touchListener = null;
      }
    }

    if (mouseListener && (type === jsonAsset.SystemEventType.MOUSE_DOWN || type === jsonAsset.SystemEventType.MOUSE_MOVE || type === jsonAsset.SystemEventType.MOUSE_UP || type === jsonAsset.SystemEventType.MOUSE_WHEEL)) {
      var hasMouseDown = this.hasEventListener(jsonAsset.SystemEventType.MOUSE_DOWN);
      var hasMouseMove = this.hasEventListener(jsonAsset.SystemEventType.MOUSE_MOVE);
      var hasMouseUp = this.hasEventListener(jsonAsset.SystemEventType.MOUSE_UP);
      var hasMouseWheel = this.hasEventListener(jsonAsset.SystemEventType.MOUSE_WHEEL);

      if (!hasMouseDown && !hasMouseMove && !hasMouseUp && !hasMouseWheel) {
        jsonAsset.eventManager.removeListener(mouseListener);
        mouseListener = null;
      }
    }
  };

  return SystemEvent;
}(jsonAsset.EventTarget);
SystemEvent.EventType = jsonAsset.SystemEventType;
jsonAsset.legacyCC.SystemEvent = SystemEvent;
var systemEvent = new SystemEvent();
jsonAsset.legacyCC.systemEvent = systemEvent;

jsonAsset.removeProperty(view.View.prototype, 'View.prototype', [{
  name: 'isAntiAliasEnabled',
  suggest: 'The API of Texture2d have been largely modified, no alternative'
}, {
  name: 'enableAntiAlias',
  suggest: 'The API of Texture2d have been largely modified, no alternative'
}]);
jsonAsset.markAsWarning(view.View.prototype, 'View.prototype', [{
  name: 'adjustViewportMeta'
}, {
  name: 'enableAutoFullScreen',
  suggest: 'use screen.requestFullScreen() instead.'
}, {
  name: 'isAutoFullScreenEnabled'
}]);
jsonAsset.markAsWarning(jsonAsset.legacyCC, 'cc', [{
  name: 'winSize',
  suggest: 'please use view.getVisibleSize() instead.'
}]);
jsonAsset.replaceProperty(jsonAsset.Event, 'Event', [{
  name: 'ACCELERATION',
  newName: 'DEVICEMOTION',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}]);
jsonAsset.markAsWarning(jsonAsset.Event, 'Event', [{
  name: 'TOUCH',
  suggest: 'please use SystemEvent.EventType.TOUCH_START, SystemEvent.EventType.TOUCH_MOVE, SystemEvent.EventType.TOUCH_END and SystemEvent.EventType.TOUCH_CANCEL instead'
}, {
  name: 'MOUSE',
  suggest: 'please use SystemEvent.EventType.MOUSE_DOWN, SystemEvent.EventType.MOUSE_MOVE, SystemEvent.EventType.MOUSE_UP, SystemEvent.EventType.MOUSE_WHEEL, Node.EventType.MOUSE_ENTER and Node.EventType.MOUSE_LEAVE instead'
}, {
  name: 'KEYBOARD',
  suggest: 'please use SystemEvent.EventType.KEY_DOWN and SystemEvent.EventType.KEY_UP instead'
}]);
jsonAsset.replaceProperty(view.EventMouse, 'EventMouse', ['DOWN', 'UP', 'MOVE'].map(function (item) {
  return {
    name: item,
    newName: "MOUSE_" + item,
    target: SystemEvent.EventType,
    targetName: 'SystemEvent.EventType'
  };
}));
jsonAsset.replaceProperty(view.EventMouse, 'EventMouse', [{
  name: 'SCROLL',
  newName: 'MOUSE_WHEEL',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}]);
jsonAsset.markAsWarning(view.EventMouse.prototype, 'EventMouse.prototype', [{
  name: 'eventType',
  suggest: 'please use EventMouse.prototype.type instead'
}]);
jsonAsset.replaceProperty(view.EventTouch, 'EventTouch', [{
  name: 'BEGAN',
  newName: 'TOUCH_START',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}]);
jsonAsset.replaceProperty(view.EventTouch, 'EventTouch', [{
  name: 'MOVED',
  newName: 'TOUCH_MOVE',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}]);
jsonAsset.replaceProperty(view.EventTouch, 'EventTouch', [{
  name: 'ENDED',
  newName: 'TOUCH_END',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}]);
jsonAsset.replaceProperty(view.EventTouch, 'EventTouch', [{
  name: 'CANCELLED',
  newName: 'TOUCH_CANCEL',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}]);
jsonAsset.markAsWarning(view.EventTouch.prototype, 'EventTouch.prototype', [{
  name: 'getEventCode',
  suggest: 'please use EventTouch.prototype.type instead'
}]);
jsonAsset.markAsWarning(view.EventKeyboard.prototype, 'EventKeyboard.prototype', [{
  name: 'isPressed',
  suggest: 'use EventKeyboard.prototype.type !== SystemEvent.EventType.KEY_UP instead'
}]);
jsonAsset.replaceProperty(jsonAsset.sys, 'sys', ['UNKNOWN', 'ENGLISH', 'CHINESE', 'FRENCH', 'ITALIAN', 'GERMAN', 'SPANISH', 'DUTCH', 'RUSSIAN', 'KOREAN', 'JAPANESE', 'HUNGARIAN', 'PORTUGUESE', 'ARABIC', 'NORWEGIAN', 'POLISH', 'TURKISH', 'UKRAINIAN', 'ROMANIAN', 'BULGARIAN'].map(function (item) {
  return {
    name: "LANGUAGE_" + item,
    newName: item,
    target: jsonAsset.sys.Language,
    targetName: 'sys.Language'
  };
}));
jsonAsset.replaceProperty(jsonAsset.sys, 'sys', ['UNKNOWN', 'IOS', 'ANDROID', 'WINDOWS', 'LINUX', 'OSX'].map(function (item) {
  return {
    name: "OS_" + item,
    newName: item,
    target: jsonAsset.sys.OS,
    targetName: 'sys.OS'
  };
}));
jsonAsset.replaceProperty(jsonAsset.sys, 'sys', ['UNKNOWN', 'WECHAT', 'ANDROID', 'IE', 'EDGE', 'QQ', 'MOBILE_QQ', 'UC', 'UCBS', 'BAIDU_APP', 'BAIDU', 'MAXTHON', 'OPERA', 'OUPENG', 'MIUI', 'FIREFOX', 'SAFARI', 'CHROME', 'LIEBAO', 'QZONE', 'SOUGOU', 'HUAWEI'].map(function (item) {
  return {
    name: "BROWSER_TYPE_" + item,
    newName: item,
    target: jsonAsset.sys.BrowserType,
    targetName: 'sys.BrowserType'
  };
}));
jsonAsset.replaceProperty(jsonAsset.sys, 'sys', [{
  name: 'BROWSER_TYPE_360',
  newName: 'BROWSER_360',
  target: jsonAsset.sys.BrowserType,
  targetName: 'sys.BrowserType'
}]);
jsonAsset.replaceProperty(jsonAsset.sys, 'sys', ['UNKNOWN', 'EDITOR_PAGE', 'EDITOR_CORE', 'MOBILE_BROWSER', 'DESKTOP_BROWSER', 'WIN32', 'MACOS', 'IOS', 'ANDROID', 'OHOS', 'WECHAT_GAME', 'BAIDU_MINI_GAME', 'XIAOMI_QUICK_GAME', 'ALIPAY_MINI_GAME', 'BYTEDANCE_MINI_GAME', 'OPPO_MINI_GAME', 'VIVO_MINI_GAME', 'HUAWEI_QUICK_GAME', 'COCOSPLAY', 'LINKSURE_MINI_GAME', 'QTT_MINI_GAME'].map(function (item) {
  return {
    name: item,
    target: jsonAsset.sys.Platform,
    targetName: 'sys.Platform'
  };
}));
jsonAsset.replaceProperty(jsonAsset.sys, 'sys', [{
  name: 'IPHONE',
  newName: 'IOS',
  target: jsonAsset.sys.Platform,
  targetName: 'sys.Platform'
}, {
  name: 'IPAD',
  newName: 'IOS',
  target: jsonAsset.sys.Platform,
  targetName: 'sys.Platform'
}]);
jsonAsset.removeProperty(jsonAsset.sys, 'sys', ['LINUX', 'BLACKBERRY', 'NACL', 'EMSCRIPTEN', 'TIZEN', 'WINRT', 'WP8', 'QQ_PLAY', 'FB_PLAYABLE_ADS'].map(function (item) {
  return {
    name: item
  };
}));
jsonAsset.replaceProperty(jsonAsset.SystemEventType, 'SystemEventType', ['MOUSE_ENTER', 'MOUSE_LEAVE', 'TRANSFORM_CHANGED', 'SCENE_CHANGED_FOR_PERSISTS', 'SIZE_CHANGED', 'ANCHOR_CHANGED', 'COLOR_CHANGED', 'CHILD_ADDED', 'CHILD_REMOVED', 'PARENT_CHANGED', 'NODE_DESTROYED', 'LAYER_CHANGED', 'SIBLING_ORDER_CHANGED'].map(function (name) {
  return {
    name: name,
    target: jsonAsset.Node.EventType,
    targetName: 'Node.EventType'
  };
}));
jsonAsset.replaceProperty(jsonAsset.Node.EventType, 'Node.EventType', [{
  name: 'DEVICEMOTION',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}, {
  name: 'KEY_DOWN',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}, {
  name: 'KEY_UP',
  target: SystemEvent.EventType,
  targetName: 'SystemEvent.EventType'
}]);
jsonAsset.markAsWarning(jsonAsset.macro.KEY, 'macro.KEY', ['back', 'menu', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '+', '-', '/', ';', '=', ',', '.', '[', ']', 'dpadLeft', 'dpadRight', 'dpadUp', 'dpadDown', 'dpadCenter'].map(function (item) {
  return {
    name: item
  };
}));
jsonAsset.markAsWarning(jsonAsset.macro.KEY, 'macro.KEY', [{
  name: 'shift',
  suggest: 'please use KeyCode.SHIFT_LEFT instead'
}]);
jsonAsset.markAsWarning(jsonAsset.macro.KEY, 'macro.KEY', [{
  name: 'ctrl',
  suggest: 'please use KeyCode.CTRL_LEFT instead'
}]);
jsonAsset.markAsWarning(jsonAsset.macro.KEY, 'macro.KEY', [{
  name: 'alt',
  suggest: 'please use KeyCode.ALT_LEFT instead'
}]);
jsonAsset.markAsWarning(jsonAsset.macro, 'macro', [{
  name: 'KEY',
  suggest: 'please use KeyCode instead'
}]);
jsonAsset.markAsWarning(view.screen, 'screen', [{
  name: 'autoFullScreen',
  suggest: 'please use screen.requestFullScreen() instead.'
}, {
  name: 'disableAutoFullScreen'
}]);

exports.SystemEvent = SystemEvent;
exports.systemEvent = systemEvent;
