//
//  game-loop.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var GameLoop = function () {
    };

    GameLoop.prototype.startWithCallback = function (callback) {
	var self = this;

	this._callback = callback;
	this._loopframe = function () {
	    self._requestAnimationFrame(self._loopframe);
	    self._callback();
	};

	this._loopframe();
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
