//
//  game-loop.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var GameLoop = function () {
	this._isStopped = false;
    };

    GameLoop.prototype.startWithCallback = function (callback) {
	var self = this;

	this._callback = callback;
	this._loopframe = function () {
	    if (!self._isStopped) {
		self._requestAnimationFrame(self._loopframe);
		self._callback();
	    }
	};

	this._startTime = (new Date()).getTime();
	this._loopframe();
    };

    GameLoop.prototype.stop = function () {
	this._isStopped = true;
	this._stopTime = (new Date()).getTime();
    };

    GameLoop.prototype.runTime = function () {
	if (!this._startTime) {
	    return 0;
	} else if (!this._stopTime) {
	    return (new Date()).getTime() - this._startTime;
	} else {
	    return this._stopTime - this._startTime;
	}
    };

    GameLoop.prototype._requestAnimationFrame = (function () {
	if (window.requestAnimationFrame) {
	    return window.requestAnimationFrame.bind(window);
	}
	if (window.webkitRequestAnimationFrame) {
	    return window.webkitRequestAnimationFrame.bind(window);
	}
	if (window.mozRequestAnimationFrame) {
	    return window.mozRequestAnimationFrame.bind(window);
	}
	return function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	};
    }());

    window.GameLoop = GameLoop;
}());
