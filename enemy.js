//
//  enemy.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Enemy = function () {
	this._node = document.createElement("div");
	this._node.className = "enemy";
	this._relativeNode = document.createElement("div");
	this._relativeNode.className = "relative";
	this._node.appendChild(this._relativeNode);
	this._bodyNode = document.createElement("div");
	this._bodyNode.className = "body";
	this._relativeNode.appendChild(this._bodyNode);
	this._velocity = {x: 0, y: 0};
	this._size = {width: 20, height: 20};
	this._maxSpeed = 2;
	this._health = 100;
    };

    Enemy.prototype.attachTo = function (node) {
	node.appendChild(this._node);
    };

    Enemy.prototype.detachFrom = function (node) {
	node.removeChild(this._node);
    };

    Enemy.prototype.setPosition = function (position) {
	this._position = position;
	this._node.style.left = "" + position.x + "px";
	this._node.style.top  = "" + position.y + "px";
    };

    Enemy.prototype.position = function (position) {
	if (!this._position) {
	    this._position = {
		x: window.parseInt(this._node.style.left, 10),
		y: window.parseInt(this._node.style.top,  10)
	    };
	}
	return this._position;
    };

    Enemy.prototype.loseHealth = function () {
	this._health -= 10;
    };

    Enemy.prototype.health = function () {
	return this._health;
    };

    Enemy.prototype.isDead = function () {
	return this._health <= 0;
    }

    Enemy.prototype.updateWithPlayerPosition = function (playerPosition) {
	this._rotateTowardsPosition(playerPosition);
	this._updateVelocityTowardsPosition(playerPosition);
	this._updatePosition();
    };

    Enemy.prototype._rotateTowardsPosition = function (position) {
	var angle = Math.PI / 2 - Math.atan2(position.x - this.position().x,
					     position.y - this.position().y);

	this._node.style.transform = "rotateZ(" + angle + "rad)";
    };

    Enemy.prototype._updateVelocityTowardsPosition = function (position) {
	var speed = Math.sqrt(this._velocity.x * this._velocity.x + this._velocity.y * this._velocity.y);
	var dimmingFactor = 0.8;
	var distance = {
	    x: position.x - this.position().x,
	    y: position.y - this.position().y
	}
	var linearDistance = Math.sqrt(distance.x * distance.x + distance.y * distance.y);
	var change = {
	    x: distance.x / linearDistance / 20 + (Math.random() - 0.5) / 2,
	    y: distance.y / linearDistance / 20 + (Math.random() - 0.5) / 2
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

    Enemy.prototype.box = function () {
	return {
	    x:      this._position.x - this._size.width / 2,
	    y:      this._position.y - this._size.height / 2,
	    width:  this._size.width,
	    height: this._size.height
	};
    };

    Enemy.prototype._updatePosition = function () {
	var position = this.position();

	position.x += this._velocity.x;
	position.y += this._velocity.y;

	this.setPosition(position);
    };

    window.Enemy = Enemy;
}());
