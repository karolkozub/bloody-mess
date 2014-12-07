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

    Bullet.prototype.didCrossObject = function (object) {
	var numberOfPoints = 4;
	var dx = -this._velocity.x / numberOfPoints;
	var dy = -this._velocity.y / numberOfPoints;

	for (var i = 0; i < numberOfPoints; i++) {
	    var point = {
	 	x: this._position.x + dx,
	 	y: this._position.y + dy,
	    };

	    if (object.hitTestPoint(point)) {
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
