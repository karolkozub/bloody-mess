//
//  player.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Player = function () {
	this._node = document.createElement("div");
	this._node.className = "player";
	this._relativeNode = document.createElement("div");
	this._relativeNode.className = "relative";
	this._node.appendChild(this._relativeNode);
	this._bodyNode = document.createElement("div");
	this._bodyNode.className = "body";
	this._relativeNode.appendChild(this._bodyNode);
	this._gunNode = document.createElement("div");
	this._gunNode.className = "gun";
	this._relativeNode.appendChild(this._gunNode);
 	this._velocity = {x: 0, y: 0};
	this._size = {width: 20, height: 20};
	this._maxSpeed = 3;
	this._health = 100;
    };

    Player.prototype.attachTo = function (node) {
	node.appendChild(this._node);
    };

    Player.prototype.loseHealth = function () {
	this._health -= 1;
    };

    Player.prototype.slowDown = function () {
	var slowDownFactor = 0.1;

	this._velocity.x *= slowDownFactor;
	this._velocity.y *= slowDownFactor;
    }

    Player.prototype.health = function () {
	return this._health;
    };

    Player.prototype.isDead = function () {
	return this._health <= 0;
    }

    Player.prototype.setPosition = function (position) {
	this._position = position;
	this._node.style.left = "" + Math.round(position.x) + "px";
	this._node.style.top  = "" + Math.round(position.y) + "px";
    };

    Player.prototype.position = function (position) {
	if (!this._position) {
	    this._position = {
		x: window.parseInt(this._node.style.left, 10),
		y: window.parseInt(this._node.style.top,  10)
	    };
	}
	return this._position;
    };

    Player.prototype.handleInput = function (input) {
	this._rotateTowardsPosition(input.mousePosition);
	this._updateVelocityWithInput(input);
    };

    Player.prototype._rotateTowardsPosition = function (position) {
	var angle = Math.PI / 2 - Math.atan2(position.x - this.position().x,
					     position.y - this.position().y);

	this._node.style.transform = "rotateZ(" + angle + "rad)";
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

    Player.prototype.box = function () {
	return {
	    x:      this._position.x - this._size.width / 2,
	    y:      this._position.y - this._size.height / 2,
	    width:  this._size.width,
	    height: this._size.height
	};
    };

    Player.prototype.crossesBox = function (box) {
	var playerBox = this.box();

	return (playerBox.x + playerBox.width) > box.x &&
	    (playerBox.y + playerBox.height) > box.y &&
	    playerBox.x < (box.x + box.width) &&
	    playerBox.y < (box.y + box.height);
    };

    Player.prototype.updateWithBoundingBox = function (box) {
	var position = this.position();

	position.x += this._velocity.x;
	position.y += this._velocity.y;

	position.x = Math.max(box.x, Math.min(box.x + box.width, position.x));
	position.y = Math.max(box.y, Math.min(box.y + box.height, position.y));

	this.setPosition(position);
    };

    window.Player = Player;
}());
