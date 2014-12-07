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

		var tickTime = (new Date()).getTime();
		self._tickTimes = self._tickTimes.filter(function (time) {
		    return time >= (tickTime - 1000);
		});
		self._tickTimes.push(tickTime);
		self._tick += 1;
	    }
	};

	this._startTime = (new Date()).getTime();
	this._tickTimes = [];
	this._tick = 0;
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

    GameLoop.prototype.fps = function () {
	return this._tickTimes.length;
    };

    GameLoop.prototype.tick = function () {
	return this._tick;
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
