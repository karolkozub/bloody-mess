//
//  player.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Player = function () {
	this._setup();
    };

    Player.prototype = new window.LivingObject();

    Player.prototype._setup = function () {
	window.LivingObject.prototype._setup.call(this);

	this._node.className = "player";
	this._gunNode = document.createElement("div");
	this._gunNode.className = "gun";
	this._relativeNode.appendChild(this._gunNode);
	this._size = {width: 20, height: 20};
	this._maxSpeed = 3;
	this._collectedPoints = 0;
    };

    Player.prototype.loseHealth = function () {
	this._health -= 1;
	this._setHurt(true);
    };

    Player.prototype.slowDown = function () {
	var slowDownFactor = 0.1;

	this._velocity.x *= slowDownFactor;
	this._velocity.y *= slowDownFactor;
    };

    Player.prototype.handleInput = function (input) {
	this._rotateTowardsPosition(input.mousePosition);
	this._updateVelocityWithInput(input);
    };

    Player.prototype._updateVelocityWithInput = function (input) {
	var speed = Math.sqrt(this._velocity.x * this._velocity.x + this._velocity.y * this._velocity.y);
	var dimmingFactor = 0.8;
	var change = {
	    x: (input.isRightPressed ? 1 : 0) - (input.isLeftPressed ? 1 : 0),
	    y: (input.isDownPressed  ? 1 : 0) - (input.isUpPressed   ? 1 : 0)
	};

	this._velocity.x += change.x;
	this._velocity.y += change.y;

	if (change.x === 0) {
	    this._velocity.x *= dimmingFactor;
	}
	if (change.y === 0) {
	    this._velocity.y *= dimmingFactor;
	}

	if (speed > this._maxSpeed) {
	    this._velocity.x *= this._maxSpeed / speed;
	    this._velocity.y *= this._maxSpeed / speed;
	}
    };

    Player.prototype.updateWithBoundingBox = function (box) {
	var position = this.position();

	position.x += this._velocity.x;
	position.y += this._velocity.y;

	position.x = Math.max(box.x, Math.min(box.x + box.width, position.x));
	position.y = Math.max(box.y, Math.min(box.y + box.height, position.y));

	this.setPosition(position);
	this._updateHurtCounter();
    };

    Player.prototype.addHealth = function (health) {
	this._health += health;
    };

    Player.prototype.addPoints = function (points) {
	this._collectedPoints += points;
    };

    Player.prototype.collectedPoints = function () {
	return this._collectedPoints;
    };

    window.Player = Player;
}());
