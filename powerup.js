//
//  powerup.js
//
//  Created by Karol Kozub on 2014-12-07.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Powerup = function (tick) {
	this._setup(tick);
    };

    Powerup.prototype = new window.GameObject();

    Powerup.prototype._setup = function (tick) {
	window.GameObject.prototype._setup.call(this);

	this._node.className = "powerup";
	this._startTick = tick;
	this._lifetime = 300;
	this._type = Math.floor(Math.random() * 2);
	this._size = {width: 24, height: 16};

	switch (this._type) {
	case 0:
	    this._bodyNode.innerHTML = "HP";
	    break;
	case 1:
	    this._bodyNode.innerHTML = "PTS";
	    break;
	}
    };

    Powerup.prototype.update = function (tick) {
	var progress = this.progress(tick);

	if (progress > 0.6) {
	    var opacity = Math.floor((tick - this._startTick) / 10) % 2 === 0 ? 1 : 0;

	    this._bodyNode.style.opacity = opacity;
	}
    };

    Powerup.prototype.progress = function (tick) {
	return (tick - this._startTick) / this._lifetime;
    };

    Powerup.prototype.applyToPlayer = function (player) {
	switch (this._type) {
	case 0:
	    player.addHealth(25);
	    break;
	case 1:
	    player.addPoints(10);
	    break;
	}
    };

    Powerup.prototype.message = function () {
	switch (this._type) {
	case 0:
	    return "+25 HEALTH";
	case 1:
	    return "+10 POINTS";
	default:
	    return "";
	}
    }

    window.Powerup = Powerup;
}());
