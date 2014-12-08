//
//  screenshake-controller.js
//
//  Created by Karol Kozub on 2014-12-07.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var ScreenshakeController = function (worldNode) {
	this._worldNode = worldNode;
	this._startTick = -Infinity;
	this._shakeDuration = 15;
    };

    ScreenshakeController.prototype.shakeScreen = function (tick) {
	this._startTick = tick;
    };

    ScreenshakeController.prototype.update = function (tick) {
	if (this._startTick + this._shakeDuration > tick) {
	    var x = Math.round(-2 + Math.random() * 4);
	    var y = Math.round(-2 + Math.random() * 4);

	    this._worldNode.style.transform = "translate(" + x + "px, " + y + "px)";
	    this._worldNode.style.webkitTransform = "translate(" + x + "px, " + y + "px)";
	} else {
	    this._worldNode.style.transform = "";
	    this._worldNode.style.webkitTransform = "";
	}
    };

    window.ScreenshakeController = ScreenshakeController;
}());
