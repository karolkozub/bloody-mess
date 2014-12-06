//
//  enemy.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Enemy = function () {
	this._node = $("<div class='enemy'>")
	this._relativeNode = $("<div class='relative'>");
	this._relativeNode.appendTo(this._node);
	this._bodyNode = $("<div class='body'>");
	this._bodyNode.appendTo(this._relativeNode);
	this._velocity = {x: 0, y: 0};
	this._maxSpeed = 2;
    };

    Enemy.prototype.attachTo = function (node) {
	this._node.appendTo(node);
    };

    Enemy.prototype.setPosition = function (position) {
	this._node.offset({left: position.x, top: position.y});
    };

    Enemy.prototype.position = function (position) {
	var offset = this._node.offset();
	return {x: offset.left, y: offset.top};
    };

    Enemy.prototype.updateWithPlayerPosition = function (playerPosition) {
	this._rotateTowardsPosition(playerPosition);
	this._updateVelocityTowardsPosition(playerPosition);
	this._updatePosition();
    };

    Enemy.prototype._rotateTowardsPosition = function (position) {
	var angle = Math.PI / 2 - Math.atan2(position.x - this.position().x,
					     position.y - this.position().y);

	this._node.css("transform", "rotateZ(" + angle + "rad)");
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
	    x: distance.x / linearDistance / 10,
	    y: distance.y / linearDistance / 10
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

    Enemy.prototype._updatePosition = function () {
	var position = this.position();

	position.x += this._velocity.x;
	position.y += this._velocity.y;

	this.setPosition(position);
    };

    window.Enemy = Enemy;
}());
