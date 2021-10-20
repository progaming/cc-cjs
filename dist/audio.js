'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsonAsset = require('./json-asset-ae61ceca.js');
var index = require('./index-04f3192a.js');
require('./view-c0f88f03.js');
require('./deprecated-024a684c.js');
require('./camera-component-c6f89e45.js');
require('./renderable-component-f3f3ccc0.js');
require('./transform-utils-3cfb96de.js');

var AudioEvent;

(function (AudioEvent) {
  AudioEvent["PLAYED"] = "play";
  AudioEvent["PAUSED"] = "pause";
  AudioEvent["STOPPED"] = "stop";
  AudioEvent["SEEKED"] = "seeked";
  AudioEvent["ENDED"] = "ended";
  AudioEvent["INTERRUPTION_BEGIN"] = "interruptionBegin";
  AudioEvent["INTERRUPTION_END"] = "interruptionEnd";
  AudioEvent["USER_GESTURE"] = "on_gesture";
})(AudioEvent || (AudioEvent = {}));

var AudioType;

(function (AudioType) {
  AudioType[AudioType["DOM_AUDIO"] = 0] = "DOM_AUDIO";
  AudioType[AudioType["WEB_AUDIO"] = 1] = "WEB_AUDIO";
  AudioType[AudioType["MINIGAME_AUDIO"] = 2] = "MINIGAME_AUDIO";
  AudioType[AudioType["NATIVE_AUDIO"] = 3] = "NATIVE_AUDIO";
  AudioType[AudioType["UNKNOWN_AUDIO"] = 4] = "UNKNOWN_AUDIO";
})(AudioType || (AudioType = {}));

var AudioState;

(function (AudioState) {
  AudioState[AudioState["INIT"] = 0] = "INIT";
  AudioState[AudioState["PLAYING"] = 1] = "PLAYING";
  AudioState[AudioState["PAUSED"] = 2] = "PAUSED";
  AudioState[AudioState["STOPPED"] = 3] = "STOPPED";
  AudioState[AudioState["INTERRUPTED"] = 4] = "INTERRUPTED";
})(AudioState || (AudioState = {}));

var operationId = 0;

function _tryCallingRecursively(target, opInfo) {
  var _opInfo$func;

  if (opInfo.invoking) {
    return;
  }

  opInfo.invoking = true;

  (_opInfo$func = opInfo.func).call.apply(_opInfo$func, [target].concat(opInfo.args)).then(function () {
    opInfo.invoking = false;

    target._operationQueue.shift();

    target._eventTarget.emit(opInfo.id.toString());

    var nextOpInfo = target._operationQueue[0];
    nextOpInfo && _tryCallingRecursively(target, nextOpInfo);
  })["catch"](function (e) {});
}

function enqueueOperation(target, propertyKey, descriptor) {
  var originalOperation = descriptor.value;

  descriptor.value = function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve) {
      var id = operationId++;
      var instance = _this;

      instance._operationQueue.push({
        id: id,
        func: originalOperation,
        args: args,
        invoking: false
      });

      instance._eventTarget.once(id.toString(), resolve);

      var opInfo = instance._operationQueue[0];

      _tryCallingRecursively(instance, opInfo);
    });
  };
}

var _class, _temp;

function ensurePlaying(domAudio) {
  return new Promise(function (resolve) {
    var promise = domAudio.play();

    if (promise === undefined) {
      return resolve();
    }

    promise.then(resolve)["catch"](function () {
      var onGesture = function onGesture() {
        domAudio.play()["catch"](function (e) {});
        resolve();
      };

      var canvas = document.getElementById('GameCanvas');
      canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchend', onGesture, {
        once: true
      });
      canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousedown', onGesture, {
        once: true
      });
    });
    return null;
  });
}

var OneShotAudioDOM = function () {
  jsonAsset._createClass(OneShotAudioDOM, [{
    key: "onPlay",
    get: function get() {
      return this._onPlayCb;
    },
    set: function set(cb) {
      this._onPlayCb = cb;
    }
  }, {
    key: "onEnd",
    get: function get() {
      return this._onEndCb;
    },
    set: function set(cb) {
      if (this._onEndCb) {
        this._domAudio.removeEventListener('ended', this._onEndCb);
      }

      this._onEndCb = cb;

      if (cb) {
        this._domAudio.addEventListener('ended', cb);
      }
    }
  }]);

  function OneShotAudioDOM(nativeAudio, volume) {
    this._domAudio = void 0;
    this._onPlayCb = void 0;
    this._onEndCb = void 0;
    this._domAudio = nativeAudio;
    nativeAudio.volume = volume;
  }

  var _proto = OneShotAudioDOM.prototype;

  _proto.play = function play() {
    var _this = this;

    ensurePlaying(this._domAudio).then(function () {
      var _this$onPlay;

      (_this$onPlay = _this.onPlay) === null || _this$onPlay === void 0 ? void 0 : _this$onPlay.call(_this);
    })["catch"](function (e) {});
  };

  _proto.stop = function stop() {
    this._domAudio.pause();
  };

  return OneShotAudioDOM;
}();
var AudioPlayerDOM = (_class = (_temp = function () {
  function AudioPlayerDOM(nativeAudio) {
    var _this2 = this;

    this._domAudio = void 0;
    this._state = AudioState.INIT;
    this._onEnded = void 0;
    this._eventTarget = new jsonAsset.EventTarget();
    this._operationQueue = [];
    this._domAudio = nativeAudio;
    jsonAsset.systemInfo.on('hide', this._onHide, this);
    jsonAsset.systemInfo.on('show', this._onShow, this);

    this._onEnded = function () {
      _this2.seek(0)["catch"](function (e) {});

      _this2._state = AudioState.INIT;

      _this2._eventTarget.emit(AudioEvent.ENDED);
    };

    this._domAudio.addEventListener('ended', this._onEnded);
  }

  var _proto2 = AudioPlayerDOM.prototype;

  _proto2.destroy = function destroy() {
    jsonAsset.systemInfo.off('hide', this._onHide, this);
    jsonAsset.systemInfo.off('show', this._onShow, this);

    this._domAudio.removeEventListener('ended', this._onEnded);

    this._domAudio = null;
  };

  AudioPlayerDOM.load = function load(url) {
    return new Promise(function (resolve) {
      AudioPlayerDOM.loadNative(url).then(function (domAudio) {
        resolve(new AudioPlayerDOM(domAudio));
      })["catch"](function (e) {});
    });
  };

  AudioPlayerDOM.loadNative = function loadNative(url) {
    return new Promise(function (resolve, reject) {
      var domAudio = document.createElement('audio');
      var loadedEvent = 'canplaythrough';

      if (jsonAsset.systemInfo.os === jsonAsset.OS.IOS) {
        loadedEvent = 'loadedmetadata';
      } else if (jsonAsset.systemInfo.browserType === jsonAsset.BrowserType.FIREFOX) {
        loadedEvent = 'canplay';
      }

      var timer = setTimeout(function () {
        if (domAudio.readyState === 0) {
          failure();
        } else {
          success();
        }
      }, 8000);

      var clearEvent = function clearEvent() {
        clearTimeout(timer);
        domAudio.removeEventListener(loadedEvent, success, false);
        domAudio.removeEventListener('error', failure, false);
      };

      var success = function success() {
        clearEvent();
        resolve(domAudio);
      };

      var failure = function failure() {
        clearEvent();
        var message = "load audio failure - " + url;
        reject(message);
      };

      domAudio.addEventListener(loadedEvent, success, false);
      domAudio.addEventListener('error', failure, false);
      domAudio.src = url;
    });
  };

  AudioPlayerDOM.loadOneShotAudio = function loadOneShotAudio(url, volume) {
    return new Promise(function (resolve, reject) {
      AudioPlayerDOM.loadNative(url).then(function (domAudio) {
        var oneShotAudio = new OneShotAudioDOM(domAudio, volume);
        resolve(oneShotAudio);
      })["catch"](reject);
    });
  };

  _proto2._onHide = function _onHide() {
    var _this3 = this;

    if (this._state === AudioState.PLAYING) {
      this.pause().then(function () {
        _this3._state = AudioState.INTERRUPTED;

        _this3._eventTarget.emit(AudioEvent.INTERRUPTION_BEGIN);
      })["catch"](function (e) {});
    }
  };

  _proto2._onShow = function _onShow() {
    var _this4 = this;

    if (this._state === AudioState.INTERRUPTED) {
      this.play().then(function () {
        _this4._eventTarget.emit(AudioEvent.INTERRUPTION_END);
      })["catch"](function (e) {});
    }
  };

  _proto2.seek = function seek(time) {
    time = jsonAsset.clamp(time, 0, this.duration);
    this._domAudio.currentTime = time;
    return Promise.resolve();
  };

  _proto2.play = function play() {
    var _this5 = this;

    return new Promise(function (resolve) {
      ensurePlaying(_this5._domAudio).then(function () {
        _this5._state = AudioState.PLAYING;
        resolve();
      })["catch"](function (e) {});
    });
  };

  _proto2.pause = function pause() {
    this._domAudio.pause();

    this._state = AudioState.PAUSED;
    return Promise.resolve();
  };

  _proto2.stop = function stop() {
    var _this6 = this;

    return new Promise(function (resolve) {
      _this6._domAudio.pause();

      _this6._domAudio.currentTime = 0;
      _this6._state = AudioState.STOPPED;
      resolve();
    });
  };

  _proto2.onInterruptionBegin = function onInterruptionBegin(cb) {
    this._eventTarget.on(AudioEvent.INTERRUPTION_BEGIN, cb);
  };

  _proto2.offInterruptionBegin = function offInterruptionBegin(cb) {
    this._eventTarget.off(AudioEvent.INTERRUPTION_BEGIN, cb);
  };

  _proto2.onInterruptionEnd = function onInterruptionEnd(cb) {
    this._eventTarget.on(AudioEvent.INTERRUPTION_END, cb);
  };

  _proto2.offInterruptionEnd = function offInterruptionEnd(cb) {
    this._eventTarget.off(AudioEvent.INTERRUPTION_END, cb);
  };

  _proto2.onEnded = function onEnded(cb) {
    this._eventTarget.on(AudioEvent.ENDED, cb);
  };

  _proto2.offEnded = function offEnded(cb) {
    this._eventTarget.off(AudioEvent.ENDED, cb);
  };

  jsonAsset._createClass(AudioPlayerDOM, [{
    key: "src",
    get: function get() {
      return this._domAudio ? this._domAudio.src : '';
    }
  }, {
    key: "type",
    get: function get() {
      return AudioType.DOM_AUDIO;
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }, {
    key: "loop",
    get: function get() {
      return this._domAudio.loop;
    },
    set: function set(val) {
      this._domAudio.loop = val;
    }
  }, {
    key: "volume",
    get: function get() {
      return this._domAudio.volume;
    },
    set: function set(val) {
      val = jsonAsset.clamp01(val);
      this._domAudio.volume = val;
    }
  }, {
    key: "duration",
    get: function get() {
      return this._domAudio.duration;
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this._domAudio.currentTime;
    }
  }]);

  return AudioPlayerDOM;
}(), _temp), (jsonAsset._applyDecoratedDescriptor(_class.prototype, "seek", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), jsonAsset._applyDecoratedDescriptor(_class.prototype, "play", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), jsonAsset._applyDecoratedDescriptor(_class.prototype, "pause", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), jsonAsset._applyDecoratedDescriptor(_class.prototype, "stop", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class);

var AudioTimer = function () {
  function AudioTimer(nativeAudio) {
    this._nativeAudio = void 0;
    this._startTime = 0;
    this._startOffset = 0;
    this._isPaused = true;
    this._nativeAudio = nativeAudio;
  }

  var _proto = AudioTimer.prototype;

  _proto.destroy = function destroy() {
    this._nativeAudio = undefined;
  };

  _proto._now = function _now() {
    return performance.now() / 1000;
  };

  _proto._calculateCurrentTime = function _calculateCurrentTime() {
    var timePassed = this._now() - this._startTime;

    var currentTime = this._startOffset + timePassed;

    if (currentTime >= this.duration) {
      this._startTime = this._now();
      this._startOffset = 0;
    }

    return currentTime % this.duration;
  };

  _proto.start = function start() {
    this._isPaused = false;
    this._startTime = this._now();
  };

  _proto.pause = function pause() {
    if (this._isPaused) {
      return;
    }

    this._isPaused = true;
    this._startOffset = this._calculateCurrentTime();
  };

  _proto.stop = function stop() {
    this._isPaused = true;
    this._startOffset = 0;
  };

  _proto.seek = function seek(time) {
    this._startTime = this._now();
    this._startOffset = jsonAsset.clamp(time, 0, this.duration);
  };

  jsonAsset._createClass(AudioTimer, [{
    key: "duration",
    get: function get() {
      return this._nativeAudio.duration;
    }
  }, {
    key: "currentTime",
    get: function get() {
      if (this._isPaused) {
        return this._startOffset;
      } else {
        return this._calculateCurrentTime();
      }
    }
  }]);

  return AudioTimer;
}();

var _class$1, _temp$1;
var AudioContextClass = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
var AudioContextAgent = function () {
  function AudioContextAgent() {
    this._context = void 0;
    this._context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
  }

  var _proto = AudioContextAgent.prototype;

  _proto.decodeAudioData = function decodeAudioData(audioData) {
    var _this = this;

    return new Promise(function (resolve) {
      var promise = _this._context.decodeAudioData(audioData, function (audioBuffer) {
        resolve(audioBuffer);
      }, function (err) {
        console.error('failed to load Web Audio', err);
      });

      promise === null || promise === void 0 ? void 0 : promise["catch"](function (e) {});
    });
  };

  _proto.runContext = function runContext() {
    var _this2 = this;

    return new Promise(function (resolve) {
      var context = _this2._context;

      if (!context.resume) {
        return resolve();
      }

      if (context.state === 'running') {
        return resolve();
      }

      context.resume()["catch"](function (e) {});

      if (context.state !== 'running') {
        var canvas = document.getElementById('GameCanvas');

        var onGesture = function onGesture() {
          context.resume().then(resolve)["catch"](function (e) {});
        };

        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchend', onGesture, {
          once: true
        });
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousedown', onGesture, {
          once: true
        });
      }

      return null;
    });
  };

  _proto.createBufferSource = function createBufferSource(audioBuffer, loop) {
    var sourceBufferNode = this._context.createBufferSource();

    if (audioBuffer !== undefined) {
      sourceBufferNode.buffer = audioBuffer;
    }

    if (loop !== undefined) {
      sourceBufferNode.loop = loop;
    }

    return sourceBufferNode;
  };

  _proto.createGain = function createGain(volume) {
    if (volume === void 0) {
      volume = 1;
    }

    var gainNode = this._context.createGain();

    this.setGainValue(gainNode, volume);
    return gainNode;
  };

  _proto.setGainValue = function setGainValue(gain, volume) {
    if (gain.gain.setTargetAtTime) {
      try {
        gain.gain.setTargetAtTime(volume, this._context.currentTime, 0);
      } catch (e) {
        gain.gain.setTargetAtTime(volume, this._context.currentTime, 0.01);
      }
    } else {
      gain.gain.value = volume;
    }
  };

  _proto.connectContext = function connectContext(audioNode) {
    if (!this._context) {
      return;
    }

    audioNode.connect(this._context.destination);
  };

  jsonAsset._createClass(AudioContextAgent, [{
    key: "currentTime",
    get: function get() {
      return this._context.currentTime;
    }
  }]);

  return AudioContextAgent;
}();
AudioContextAgent.support = !!AudioContextClass;
var audioContextAgent;

if (AudioContextAgent.support) {
  audioContextAgent = new AudioContextAgent();
}

var OneShotAudioWeb = function () {
  jsonAsset._createClass(OneShotAudioWeb, [{
    key: "onPlay",
    get: function get() {
      return this._onPlayCb;
    },
    set: function set(cb) {
      this._onPlayCb = cb;
    }
  }, {
    key: "onEnd",
    get: function get() {
      return this._onEndCb;
    },
    set: function set(cb) {
      this._onEndCb = cb;
    }
  }]);

  function OneShotAudioWeb(audioBuffer, volume) {
    this._duration = void 0;
    this._bufferSourceNode = void 0;
    this._onPlayCb = void 0;
    this._onEndCb = void 0;
    this._duration = audioBuffer.duration;
    this._bufferSourceNode = audioContextAgent.createBufferSource(audioBuffer, false);
    var gainNode = audioContextAgent.createGain(volume);

    this._bufferSourceNode.connect(gainNode);

    audioContextAgent.connectContext(gainNode);
  }

  var _proto2 = OneShotAudioWeb.prototype;

  _proto2.play = function play() {
    var _this3 = this;

    audioContextAgent.runContext().then(function () {
      var _this3$onPlay;

      _this3._bufferSourceNode.start();

      (_this3$onPlay = _this3.onPlay) === null || _this3$onPlay === void 0 ? void 0 : _this3$onPlay.call(_this3);
      window.setTimeout(function () {
        var _this3$onEnd;

        (_this3$onEnd = _this3.onEnd) === null || _this3$onEnd === void 0 ? void 0 : _this3$onEnd.call(_this3);
      }, _this3._duration * 1000);
    })["catch"](function (e) {});
  };

  _proto2.stop = function stop() {
    this._bufferSourceNode.stop();
  };

  return OneShotAudioWeb;
}();
var AudioPlayerWeb = (_class$1 = (_temp$1 = function () {
  function AudioPlayerWeb(audioBuffer, url) {
    this._src = void 0;
    this._audioBuffer = void 0;
    this._sourceNode = void 0;
    this._gainNode = void 0;
    this._currentTimer = 0;
    this._volume = 1;
    this._loop = false;
    this._state = AudioState.INIT;
    this._audioTimer = void 0;
    this._eventTarget = new jsonAsset.EventTarget();
    this._operationQueue = [];
    this._audioBuffer = audioBuffer;
    this._audioTimer = new AudioTimer(audioBuffer);
    this._gainNode = audioContextAgent.createGain();
    audioContextAgent.connectContext(this._gainNode);
    this._src = url;
    jsonAsset.systemInfo.on('hide', this._onHide, this);
    jsonAsset.systemInfo.on('show', this._onShow, this);
  }

  var _proto3 = AudioPlayerWeb.prototype;

  _proto3.destroy = function destroy() {
    this._audioTimer.destroy();

    if (this._audioBuffer) {
      this._audioBuffer = null;
    }

    jsonAsset.systemInfo.off('hide', this._onHide, this);
    jsonAsset.systemInfo.off('show', this._onShow, this);
  };

  AudioPlayerWeb.load = function load(url) {
    return new Promise(function (resolve) {
      AudioPlayerWeb.loadNative(url).then(function (audioBuffer) {
        resolve(new AudioPlayerWeb(audioBuffer, url));
      })["catch"](function (e) {});
    });
  };

  AudioPlayerWeb.loadNative = function loadNative(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      var errInfo = "load audio failed: " + url + ", status: ";
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 0) {
          audioContextAgent.decodeAudioData(xhr.response).then(function (buffer) {
            resolve(buffer);
          })["catch"](function (e) {});
        } else {
          reject(new Error("" + errInfo + xhr.status + "(no response)"));
        }
      };

      xhr.onerror = function () {
        reject(new Error("" + errInfo + xhr.status + "(error)"));
      };

      xhr.ontimeout = function () {
        reject(new Error("" + errInfo + xhr.status + "(time out)"));
      };

      xhr.onabort = function () {
        reject(new Error("" + errInfo + xhr.status + "(abort)"));
      };

      xhr.send(null);
    });
  };

  AudioPlayerWeb.loadOneShotAudio = function loadOneShotAudio(url, volume) {
    return new Promise(function (resolve, reject) {
      AudioPlayerWeb.loadNative(url).then(function (audioBuffer) {
        var oneShotAudio = new OneShotAudioWeb(audioBuffer, volume);
        resolve(oneShotAudio);
      })["catch"](reject);
    });
  };

  _proto3._onHide = function _onHide() {
    var _this4 = this;

    if (this._state === AudioState.PLAYING) {
      this.pause().then(function () {
        _this4._state = AudioState.INTERRUPTED;

        _this4._eventTarget.emit(AudioEvent.INTERRUPTION_BEGIN);
      })["catch"](function (e) {});
    }
  };

  _proto3._onShow = function _onShow() {
    var _this5 = this;

    if (this._state === AudioState.INTERRUPTED) {
      this.play().then(function () {
        _this5._eventTarget.emit(AudioEvent.INTERRUPTION_END);
      })["catch"](function (e) {});
    }
  };

  _proto3.seek = function seek(time) {
    var _this6 = this;

    return new Promise(function (resolve) {
      _this6._audioTimer.seek(time);

      if (_this6._state === AudioState.PLAYING) {
        _this6._doPlay().then(resolve)["catch"](function (e) {});
      } else {
        resolve();
      }
    });
  };

  _proto3.play = function play() {

    return this._doPlay();
  };

  _proto3._doPlay = function _doPlay() {
    var _this7 = this;

    return new Promise(function (resolve) {
      audioContextAgent.runContext().then(function () {
        _this7._stopSourceNode();

        _this7._sourceNode = audioContextAgent.createBufferSource(_this7._audioBuffer, _this7.loop);

        _this7._sourceNode.connect(_this7._gainNode);

        _this7._sourceNode.start(0, _this7._audioTimer.currentTime);

        _this7._state = AudioState.PLAYING;

        _this7._audioTimer.start();

        var checkEnded = function checkEnded() {
          if (_this7.loop) {
            _this7._currentTimer = window.setTimeout(checkEnded, _this7._audioBuffer.duration * 1000);
          } else {
            _this7._audioTimer.stop();

            _this7._eventTarget.emit(AudioEvent.ENDED);

            _this7._state = AudioState.INIT;
          }
        };

        window.clearTimeout(_this7._currentTimer);
        _this7._currentTimer = window.setTimeout(checkEnded, (_this7._audioBuffer.duration - _this7._audioTimer.currentTime) * 1000);
        resolve();
      })["catch"](function (e) {});
    });
  };

  _proto3._stopSourceNode = function _stopSourceNode() {
    try {
      var _this$_sourceNode;

      (_this$_sourceNode = this._sourceNode) === null || _this$_sourceNode === void 0 ? void 0 : _this$_sourceNode.stop();
    } catch (e) {}
  };

  _proto3.pause = function pause() {
    if (this._state !== AudioState.PLAYING || !this._sourceNode) {
      return Promise.resolve();
    }

    this._audioTimer.pause();

    this._state = AudioState.PAUSED;
    window.clearTimeout(this._currentTimer);

    this._stopSourceNode();

    return Promise.resolve();
  };

  _proto3.stop = function stop() {
    if (!this._sourceNode) {
      return Promise.resolve();
    }

    this._audioTimer.stop();

    this._state = AudioState.STOPPED;
    window.clearTimeout(this._currentTimer);

    this._stopSourceNode();

    return Promise.resolve();
  };

  _proto3.onInterruptionBegin = function onInterruptionBegin(cb) {
    this._eventTarget.on(AudioEvent.INTERRUPTION_BEGIN, cb);
  };

  _proto3.offInterruptionBegin = function offInterruptionBegin(cb) {
    this._eventTarget.off(AudioEvent.INTERRUPTION_BEGIN, cb);
  };

  _proto3.onInterruptionEnd = function onInterruptionEnd(cb) {
    this._eventTarget.on(AudioEvent.INTERRUPTION_END, cb);
  };

  _proto3.offInterruptionEnd = function offInterruptionEnd(cb) {
    this._eventTarget.off(AudioEvent.INTERRUPTION_END, cb);
  };

  _proto3.onEnded = function onEnded(cb) {
    this._eventTarget.on(AudioEvent.ENDED, cb);
  };

  _proto3.offEnded = function offEnded(cb) {
    this._eventTarget.off(AudioEvent.ENDED, cb);
  };

  jsonAsset._createClass(AudioPlayerWeb, [{
    key: "src",
    get: function get() {
      return this._src;
    }
  }, {
    key: "type",
    get: function get() {
      return AudioType.WEB_AUDIO;
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }, {
    key: "loop",
    get: function get() {
      return this._loop;
    },
    set: function set(val) {
      this._loop = val;

      if (this._sourceNode) {
        this._sourceNode.loop = val;
      }
    }
  }, {
    key: "volume",
    get: function get() {
      return this._volume;
    },
    set: function set(val) {
      val = jsonAsset.clamp01(val);
      this._volume = val;
      audioContextAgent.setGainValue(this._gainNode, val);
    }
  }, {
    key: "duration",
    get: function get() {
      return this._audioBuffer.duration;
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this._audioTimer.currentTime;
    }
  }]);

  return AudioPlayerWeb;
}(), _temp$1), (jsonAsset._applyDecoratedDescriptor(_class$1.prototype, "seek", [enqueueOperation], Object.getOwnPropertyDescriptor(_class$1.prototype, "seek"), _class$1.prototype), jsonAsset._applyDecoratedDescriptor(_class$1.prototype, "play", [enqueueOperation], Object.getOwnPropertyDescriptor(_class$1.prototype, "play"), _class$1.prototype), jsonAsset._applyDecoratedDescriptor(_class$1.prototype, "pause", [enqueueOperation], Object.getOwnPropertyDescriptor(_class$1.prototype, "pause"), _class$1.prototype), jsonAsset._applyDecoratedDescriptor(_class$1.prototype, "stop", [enqueueOperation], Object.getOwnPropertyDescriptor(_class$1.prototype, "stop"), _class$1.prototype)), _class$1);

var OneShotAudio = function () {
  jsonAsset._createClass(OneShotAudio, [{
    key: "onPlay",
    get: function get() {
      return this._audio.onPlay;
    },
    set: function set(v) {
      this._audio.onPlay = v;
    }
  }, {
    key: "onEnd",
    get: function get() {
      return this._audio.onEnd;
    },
    set: function set(v) {
      this._audio.onEnd = v;
    }
  }]);

  function OneShotAudio(audio) {
    this._audio = void 0;
    this._audio = audio;
  }

  var _proto = OneShotAudio.prototype;

  _proto.play = function play() {
    this._audio.play();
  };

  _proto.stop = function stop() {
    this._audio.stop();
  };

  return OneShotAudio;
}();
var AudioPlayer = function () {
  function AudioPlayer(player) {
    this._player = void 0;
    this._player = player;
  }

  AudioPlayer.load = function load(url, opts) {
    return new Promise(function (resolve) {
      if ((opts === null || opts === void 0 ? void 0 : opts.audioLoadMode) === AudioType.DOM_AUDIO || !AudioContextAgent.support) {
        if (!AudioContextAgent.support) {
          jsonAsset.warnID(5201);
        }

        AudioPlayerDOM.load(url).then(function (domPlayer) {
          resolve(new AudioPlayer(domPlayer));
        })["catch"](function (e) {});
      } else {
        AudioPlayerWeb.load(url).then(function (webPlayer) {
          resolve(new AudioPlayer(webPlayer));
        })["catch"](function (e) {});
      }
    });
  };

  var _proto2 = AudioPlayer.prototype;

  _proto2.destroy = function destroy() {
    this._player.destroy();
  };

  AudioPlayer.loadNative = function loadNative(url, opts) {
    if ((opts === null || opts === void 0 ? void 0 : opts.audioLoadMode) === AudioType.DOM_AUDIO || !AudioContextAgent.support) {
      if (!AudioContextAgent.support) {
        jsonAsset.warnID(5201);
      }

      return AudioPlayerDOM.loadNative(url);
    }

    return AudioPlayerWeb.loadNative(url);
  };

  AudioPlayer.loadOneShotAudio = function loadOneShotAudio(url, volume, opts) {
    return new Promise(function (resolve, reject) {
      if ((opts === null || opts === void 0 ? void 0 : opts.audioLoadMode) === AudioType.DOM_AUDIO || !AudioContextAgent.support) {
        if (!AudioContextAgent.support) {
          jsonAsset.warnID(5201);
        }

        AudioPlayerDOM.loadOneShotAudio(url, volume).then(function (oneShotAudioDOM) {
          resolve(new OneShotAudio(oneShotAudioDOM));
        })["catch"](reject);
      } else {
        AudioPlayerWeb.loadOneShotAudio(url, volume).then(function (oneShotAudioWeb) {
          resolve(new OneShotAudio(oneShotAudioWeb));
        })["catch"](reject);
      }
    });
  };

  _proto2.seek = function seek(time) {
    return this._player.seek(time);
  };

  _proto2.play = function play() {
    return this._player.play();
  };

  _proto2.pause = function pause() {
    return this._player.pause();
  };

  _proto2.stop = function stop() {
    return this._player.stop();
  };

  _proto2.onInterruptionBegin = function onInterruptionBegin(cb) {
    this._player.onInterruptionBegin(cb);
  };

  _proto2.offInterruptionBegin = function offInterruptionBegin(cb) {
    this._player.offInterruptionBegin(cb);
  };

  _proto2.onInterruptionEnd = function onInterruptionEnd(cb) {
    this._player.onInterruptionEnd(cb);
  };

  _proto2.offInterruptionEnd = function offInterruptionEnd(cb) {
    this._player.offInterruptionEnd(cb);
  };

  _proto2.onEnded = function onEnded(cb) {
    this._player.onEnded(cb);
  };

  _proto2.offEnded = function offEnded(cb) {
    this._player.offEnded(cb);
  };

  jsonAsset._createClass(AudioPlayer, [{
    key: "src",
    get: function get() {
      return this._player.src;
    }
  }, {
    key: "type",
    get: function get() {
      return this._player.type;
    }
  }, {
    key: "state",
    get: function get() {
      return this._player.state;
    }
  }, {
    key: "loop",
    get: function get() {
      return this._player.loop;
    },
    set: function set(val) {
      this._player.loop = val;
    }
  }, {
    key: "volume",
    get: function get() {
      return this._player.volume;
    },
    set: function set(val) {
      this._player.volume = val;
    }
  }, {
    key: "duration",
    get: function get() {
      return this._player.duration;
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this._player.currentTime;
    }
  }]);

  return AudioPlayer;
}();
AudioPlayer.maxAudioChannel = 24;

var _dec, _class$2, _class2, _descriptor, _class3, _temp$2;
var AudioClip = (_dec = jsonAsset.ccclass('cc.AudioClip'), _dec(_class$2 = (_class2 = (_temp$2 = _class3 = function (_Asset) {
  jsonAsset._inheritsLoose(AudioClip, _Asset);

  function AudioClip() {
    var _this;

    _this = _Asset.call(this) || this;

    jsonAsset._initializerDefineProperty(_this, "_duration", _descriptor, jsonAsset._assertThisInitialized(_this));

    _this._loadMode = AudioType.UNKNOWN_AUDIO;
    _this._meta = null;
    _this._player = void 0;
    return _this;
  }

  var _proto = AudioClip.prototype;

  _proto.destroy = function destroy() {
    var _this$_player;

    var destroyResult = _Asset.prototype.destroy.call(this);

    (_this$_player = this._player) === null || _this$_player === void 0 ? void 0 : _this$_player.destroy();
    return destroyResult;
  };

  _proto.validate = function validate() {
    return !!this._meta;
  };

  _proto.getDuration = function getDuration() {
    if (this._duration) {
      return this._duration;
    }

    return this._meta ? this._meta.duration : 0;
  };

  _proto.getCurrentTime = function getCurrentTime() {
    return this._player ? this._player.currentTime : 0;
  };

  _proto.getVolume = function getVolume() {
    return this._player ? this._player.volume : 0;
  };

  _proto.getLoop = function getLoop() {
    return this._player ? this._player.loop : false;
  };

  _proto.setCurrentTime = function setCurrentTime(time) {
    var _this$_player2;

    (_this$_player2 = this._player) === null || _this$_player2 === void 0 ? void 0 : _this$_player2.seek(time)["catch"](function (e) {});
  };

  _proto.setVolume = function setVolume(volume) {
    if (this._player) {
      this._player.volume = volume;
    }
  };

  _proto.setLoop = function setLoop(loop) {
    if (this._player) {
      this._player.loop = loop;
    }
  };

  _proto.play = function play() {
    var _this$_player3;

    (_this$_player3 = this._player) === null || _this$_player3 === void 0 ? void 0 : _this$_player3.play()["catch"](function (e) {});
  };

  _proto.pause = function pause() {
    var _this$_player4;

    (_this$_player4 = this._player) === null || _this$_player4 === void 0 ? void 0 : _this$_player4.pause()["catch"](function (e) {});
  };

  _proto.stop = function stop() {
    var _this$_player5;

    (_this$_player5 = this._player) === null || _this$_player5 === void 0 ? void 0 : _this$_player5.stop()["catch"](function (e) {});
  };

  _proto.playOneShot = function playOneShot(volume) {
    if (volume === void 0) {
      volume = 1;
    }

    if (this._nativeAsset) {
      AudioPlayer.loadOneShotAudio(this._nativeAsset.url, volume).then(function (oneShotAudio) {
        oneShotAudio.play();
      })["catch"](function (e) {});
    }
  };

  jsonAsset._createClass(AudioClip, [{
    key: "_nativeAsset",
    set: function set(meta) {
      this._meta = meta;

      if (meta) {
        this._loadMode = meta.type;
        this._player = meta.player;
      } else {
        this._meta = null;
        this._loadMode = AudioType.UNKNOWN_AUDIO;
        this._duration = 0;
      }
    },
    get: function get() {
      return this._meta;
    }
  }, {
    key: "_nativeDep",
    get: function get() {
      return {
        uuid: this._uuid,
        audioLoadMode: this.loadMode,
        ext: this._native,
        __isNative__: true
      };
    }
  }, {
    key: "loadMode",
    get: function get() {
      return this._loadMode;
    }
  }, {
    key: "state",
    get: function get() {
      return this._player ? this._player.state : AudioState.INIT;
    }
  }]);

  return AudioClip;
}(jsonAsset.Asset), _class3.AudioType = AudioType, _temp$2), (_descriptor = jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_duration", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2.prototype, "_nativeDep", [jsonAsset.override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeDep"), _class2.prototype)), _class2)) || _class$2);
jsonAsset.legacyCC.AudioClip = AudioClip;

function loadAudioPlayer(url, options, onComplete) {
  AudioPlayer.load(url, {
    audioLoadMode: options.audioLoadMode
  }).then(function (player) {
    var audioMeta = {
      player: player,
      url: url,
      duration: player.duration,
      type: player.type
    };
    onComplete(null, audioMeta);
  })["catch"](function (err) {
    onComplete(err);
  });
}

function createAudioClip(id, data, options, onComplete) {
  var out = new AudioClip();
  out._nativeUrl = id;
  out._nativeAsset = data;
  out._duration = data.duration;
  onComplete(null, out);
}

index.downloader.register({
  '.mp3': loadAudioPlayer,
  '.ogg': loadAudioPlayer,
  '.wav': loadAudioPlayer,
  '.m4a': loadAudioPlayer
});
index.factory.register({
  '.mp3': createAudioClip,
  '.ogg': createAudioClip,
  '.wav': createAudioClip,
  '.m4a': createAudioClip
});

var AudioManager = function () {
  function AudioManager() {
    this._oneShotAudioInfoList = [];
    this._audioPlayerInfoList = [];
  }

  var _proto = AudioManager.prototype;

  _proto._findIndex = function _findIndex(audioInfoList, audio) {
    return audioInfoList.findIndex(function (item) {
      return item.audio === audio;
    });
  };

  _proto._tryAddPlaying = function _tryAddPlaying(audioInfoList, audio) {
    var idx = this._findIndex(audioInfoList, audio);

    if (idx > -1) {
      audioInfoList[idx].playTime = performance.now();
      return false;
    }

    audioInfoList.push({
      audio: audio,
      playTime: performance.now()
    });
    return true;
  };

  _proto.addPlaying = function addPlaying(audio) {
    if (audio instanceof AudioPlayer) {
      if (this._tryAddPlaying(this._audioPlayerInfoList, audio)) {
        return;
      }
    } else {
      this._tryAddPlaying(this._oneShotAudioInfoList, audio);
    }
  };

  _proto._tryRemovePlaying = function _tryRemovePlaying(audioInfoList, audio) {
    var idx = this._findIndex(audioInfoList, audio);

    if (idx === -1) {
      return false;
    }

    jsonAsset.fastRemoveAt(audioInfoList, idx);
    return true;
  };

  _proto.removePlaying = function removePlaying(audio) {
    if (audio instanceof AudioPlayer) {
      if (this._tryRemovePlaying(this._audioPlayerInfoList, audio)) {
        return;
      }
    } else {
      this._tryRemovePlaying(this._oneShotAudioInfoList, audio);
    }
  };

  _proto.discardOnePlayingIfNeeded = function discardOnePlayingIfNeeded() {
    if (this._audioPlayerInfoList.length + this._oneShotAudioInfoList.length < AudioPlayer.maxAudioChannel) {
      return;
    }

    var audioInfoToDiscard;

    if (this._oneShotAudioInfoList.length > 0) {
      this._oneShotAudioInfoList.forEach(function (audioInfo) {
        if (!audioInfoToDiscard || audioInfo.playTime < audioInfoToDiscard.playTime) {
          audioInfoToDiscard = audioInfo;
        }
      });
    } else {
      this._audioPlayerInfoList.forEach(function (audioInfo) {
        if (!audioInfoToDiscard || audioInfo.playTime < audioInfoToDiscard.playTime) {
          audioInfoToDiscard = audioInfo;
        }
      });
    }

    if (audioInfoToDiscard) {
      audioInfoToDiscard.audio.stop();
      this.removePlaying(audioInfoToDiscard.audio);
    }
  };

  return AudioManager;
}();
var audioManager = new AudioManager();

var _dec$1, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class$3, _class2$1, _descriptor$1, _descriptor2, _descriptor3, _descriptor4, _class3$1, _temp$3;
var AudioSourceEventType;

(function (AudioSourceEventType) {
  AudioSourceEventType["STARTED"] = "started";
  AudioSourceEventType["ENDED"] = "ended";
})(AudioSourceEventType || (AudioSourceEventType = {}));

var AudioSource = (_dec$1 = jsonAsset.ccclass('cc.AudioSource'), _dec2 = jsonAsset.help(), _dec3 = jsonAsset.menu(), _dec4 = jsonAsset.type(AudioClip), _dec5 = jsonAsset.type(AudioClip), _dec6 = jsonAsset.tooltip(), _dec7 = jsonAsset.tooltip(), _dec8 = jsonAsset.tooltip(), _dec9 = jsonAsset.range(), _dec10 = jsonAsset.tooltip(), _dec$1(_class$3 = _dec2(_class$3 = _dec3(_class$3 = (_class2$1 = (_temp$3 = _class3$1 = function (_Component) {
  jsonAsset._inheritsLoose(AudioSource, _Component);

  function AudioSource() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    jsonAsset._initializerDefineProperty(_this, "_clip", _descriptor$1, jsonAsset._assertThisInitialized(_this));

    _this._player = null;

    jsonAsset._initializerDefineProperty(_this, "_loop", _descriptor2, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_playOnAwake", _descriptor3, jsonAsset._assertThisInitialized(_this));

    jsonAsset._initializerDefineProperty(_this, "_volume", _descriptor4, jsonAsset._assertThisInitialized(_this));

    _this._cachedCurrentTime = 0;
    _this._operationsBeforeLoading = [];
    _this._isLoaded = false;
    _this._lastSetClip = void 0;
    return _this;
  }

  var _proto = AudioSource.prototype;

  _proto._syncPlayer = function _syncPlayer() {
    var _this2 = this;

    var clip = this._clip;
    this._isLoaded = false;

    if (!clip || this._lastSetClip === clip) {
      return;
    }

    if (!clip._nativeAsset) {
      console.error('Invalid audio clip');
      return;
    }

    this._lastSetClip = clip;
    AudioPlayer.load(clip._nativeAsset.url, {
      audioLoadMode: clip.loadMode
    }).then(function (player) {
      if (_this2._lastSetClip !== clip) {
        return;
      }

      _this2._isLoaded = true;

      if (_this2._player) {
        _this2._player.offEnded();

        _this2._player.offInterruptionBegin();

        _this2._player.offInterruptionEnd();

        _this2._player.destroy();
      }

      _this2._player = player;
      player.onEnded(function () {
        audioManager.removePlaying(player);

        _this2.node.emit(AudioSourceEventType.ENDED, _this2);
      });
      player.onInterruptionBegin(function () {
        audioManager.removePlaying(player);
      });
      player.onInterruptionEnd(function () {
        audioManager.addPlaying(player);
      });

      _this2._syncStates();
    })["catch"](function (e) {});
  };

  _proto.onLoad = function onLoad() {
    this._syncPlayer();
  };

  _proto.onEnable = function onEnable() {
    if (this._playOnAwake && !this.playing) {
      this.play();
    }
  };

  _proto.onDisable = function onDisable() {
    var rootNode = this._getRootNode();

    if (rootNode === null || rootNode === void 0 ? void 0 : rootNode._persistNode) {
      return;
    }

    this.pause();
  };

  _proto.onDestroy = function onDestroy() {
    var _this$_player;

    this.stop();
    (_this$_player = this._player) === null || _this$_player === void 0 ? void 0 : _this$_player.destroy();
  };

  _proto._getRootNode = function _getRootNode() {
    var _currentNode, _currentNode$parent;

    var currentNode = this.node;
    var currentGrandparentNode = (_currentNode = currentNode) === null || _currentNode === void 0 ? void 0 : (_currentNode$parent = _currentNode.parent) === null || _currentNode$parent === void 0 ? void 0 : _currentNode$parent.parent;

    while (currentGrandparentNode) {
      var _currentNode2, _currentNode3, _currentNode3$parent;

      currentNode = (_currentNode2 = currentNode) === null || _currentNode2 === void 0 ? void 0 : _currentNode2.parent;
      currentGrandparentNode = (_currentNode3 = currentNode) === null || _currentNode3 === void 0 ? void 0 : (_currentNode3$parent = _currentNode3.parent) === null || _currentNode3$parent === void 0 ? void 0 : _currentNode3$parent.parent;
    }

    return currentNode;
  };

  _proto.play = function play() {
    var _this$_player3,
        _this3 = this;

    if (!this._isLoaded) {
      this._operationsBeforeLoading.push('play');

      return;
    }

    audioManager.discardOnePlayingIfNeeded();

    if (this.state === AudioState.PLAYING) {
      var _this$_player2;

      (_this$_player2 = this._player) === null || _this$_player2 === void 0 ? void 0 : _this$_player2.stop()["catch"](function (e) {});
    }

    (_this$_player3 = this._player) === null || _this$_player3 === void 0 ? void 0 : _this$_player3.play().then(function () {
      audioManager.addPlaying(_this3._player);

      _this3.node.emit(AudioSourceEventType.STARTED, _this3);
    })["catch"](function (e) {});
  };

  _proto.pause = function pause() {
    var _this$_player4,
        _this4 = this;

    if (!this._isLoaded) {
      this._operationsBeforeLoading.push('pause');

      return;
    }

    (_this$_player4 = this._player) === null || _this$_player4 === void 0 ? void 0 : _this$_player4.pause().then(function () {
      audioManager.removePlaying(_this4._player);
    })["catch"](function (e) {});
  };

  _proto.stop = function stop() {
    var _this$_player5,
        _this5 = this;

    if (!this._isLoaded) {
      this._operationsBeforeLoading.push('stop');

      return;
    }

    (_this$_player5 = this._player) === null || _this$_player5 === void 0 ? void 0 : _this$_player5.stop().then(function () {
      audioManager.removePlaying(_this5._player);
    })["catch"](function (e) {});
  };

  _proto.playOneShot = function playOneShot(clip, volumeScale) {
    if (volumeScale === void 0) {
      volumeScale = 1;
    }

    if (!clip._nativeAsset) {
      console.error('Invalid audio clip');
      return;
    }

    AudioPlayer.loadOneShotAudio(clip._nativeAsset.url, this._volume * volumeScale, {
      audioLoadMode: clip.loadMode
    }).then(function (oneShotAudio) {
      audioManager.discardOnePlayingIfNeeded();

      oneShotAudio.onPlay = function () {
        audioManager.addPlaying(oneShotAudio);
      };

      oneShotAudio.onEnd = function () {
        audioManager.removePlaying(oneShotAudio);
      };

      oneShotAudio.play();
    })["catch"](function (e) {});
  };

  _proto._syncStates = function _syncStates() {
    var _this6 = this;

    if (!this._player) {
      return;
    }

    this._player.seek(this._cachedCurrentTime).then(function () {
      if (_this6._player) {
        _this6._player.loop = _this6._loop;
        _this6._player.volume = _this6._volume;

        _this6._operationsBeforeLoading.forEach(function (opName) {
          var _this6$opName;

          (_this6$opName = _this6[opName]) === null || _this6$opName === void 0 ? void 0 : _this6$opName.call(_this6);
        });

        _this6._operationsBeforeLoading.length = 0;
      }
    })["catch"](function (e) {});
  };

  jsonAsset._createClass(AudioSource, [{
    key: "clip",
    set: function set(val) {
      if (val === this._clip) {
        return;
      }

      this._clip = val;

      this._syncPlayer();
    },
    get: function get() {
      return this._clip;
    }
  }, {
    key: "loop",
    set: function set(val) {
      this._loop = val;
      this._player && (this._player.loop = val);
    },
    get: function get() {
      return this._loop;
    }
  }, {
    key: "playOnAwake",
    set: function set(val) {
      this._playOnAwake = val;
    },
    get: function get() {
      return this._playOnAwake;
    }
  }, {
    key: "volume",
    set: function set(val) {
      if (Number.isNaN(val)) {
        console.warn('illegal audio volume!');
        return;
      }

      val = jsonAsset.clamp(val, 0, 1);

      if (this._player) {
        this._player.volume = val;
        this._volume = this._player.volume;
      } else {
        this._volume = val;
      }
    },
    get: function get() {
      return this._volume;
    }
  }, {
    key: "currentTime",
    set: function set(num) {
      var _this$_player6;

      if (Number.isNaN(num)) {
        console.warn('illegal audio time!');
        return;
      }

      num = jsonAsset.clamp(num, 0, this.duration);
      this._cachedCurrentTime = num;
      (_this$_player6 = this._player) === null || _this$_player6 === void 0 ? void 0 : _this$_player6.seek(this._cachedCurrentTime)["catch"](function (e) {});
    },
    get: function get() {
      return this._player ? this._player.currentTime : this._cachedCurrentTime;
    }
  }, {
    key: "duration",
    get: function get() {
      var _this$_clip$getDurati, _this$_clip;

      return (_this$_clip$getDurati = (_this$_clip = this._clip) === null || _this$_clip === void 0 ? void 0 : _this$_clip.getDuration()) !== null && _this$_clip$getDurati !== void 0 ? _this$_clip$getDurati : this._player ? this._player.currentTime : 0;
    }
  }, {
    key: "state",
    get: function get() {
      return this._player ? this._player.state : AudioState.INIT;
    }
  }, {
    key: "playing",
    get: function get() {
      return this.state === AudioSource.AudioState.PLAYING;
    }
  }], [{
    key: "maxAudioChannel",
    get: function get() {
      return AudioPlayer.maxAudioChannel;
    }
  }]);

  return AudioSource;
}(jsonAsset.Component), _class3$1.AudioState = AudioState, _class3$1.EventType = AudioSourceEventType, _temp$3), (_descriptor$1 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_clip", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_loop", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_playOnAwake", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor4 = jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "_volume", [jsonAsset.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "clip", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2$1.prototype, "clip"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "loop", [_dec7], Object.getOwnPropertyDescriptor(_class2$1.prototype, "loop"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "playOnAwake", [_dec8], Object.getOwnPropertyDescriptor(_class2$1.prototype, "playOnAwake"), _class2$1.prototype), jsonAsset._applyDecoratedDescriptor(_class2$1.prototype, "volume", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2$1.prototype, "volume"), _class2$1.prototype)), _class2$1)) || _class$3) || _class$3) || _class$3);

jsonAsset.replaceProperty(AudioClip, 'AudioClip', [{
  name: 'PlayingState',
  newName: 'AudioState',
  target: AudioSource,
  targetName: 'AudioSource'
}]);
jsonAsset.markAsWarning(AudioClip.prototype, 'AudioClip.prototype', ['state', 'play', 'pause', 'stop', 'playOneShot', 'setCurrentTime', 'setVolume', 'setLoop', 'getCurrentTime', 'getVolume', 'getLoop'].map(function (item) {
  return {
    name: item,
    suggest: "please use AudioSource.prototype." + item + " instead"
  };
}));

jsonAsset.legacyCC.AudioSourceComponent = AudioSource;
jsonAsset.js$1.setClassAlias(AudioSource, 'cc.AudioSourceComponent');

exports.AudioClip = AudioClip;
exports.AudioSource = AudioSource;
exports.AudioSourceComponent = AudioSource;
