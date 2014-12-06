//
//  bullet.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Bullet = function () {
	this._setup();
    };

    Bullet.prototype = new window.GameObject();

    Bullet.prototype._setup = function () {
	window.GameObject.prototype._setup.call(this);

	this._node.className = "bullet";
	this._size = {width: 4, height: 4};
    };

    Bullet.prototype.didCrossBox = function (box) {
	var numberOfPoints = 4;
	var dx = -this._velocity.x / numberOfPoints;
	var dy = -this._velocity.y / numberOfPoints;

	for (var i = 0; i < numberOfPoints; i++) {
	    var point = {
	 	x: this._position.x + dx,
	 	y: this._position.y + dy,
	    };

	    if (point.x >= box.x &&
		point.x < (box.x + box.width) &&
		point.y >= box.y &&
		point.y < (box.y + box.height)) {
		return true;
	    }
	}

	return false;
    };

    Bullet.prototype.update = function () {
	this._updatePosition();
    };

    window.Bullet = Bullet;
}());
