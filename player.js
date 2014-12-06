//
//  player.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Player = function () {
	this._node = $("<div class='player'>")
	this._relativeNode = $("<div class='relative'>");
	this._relativeNode.appendTo(this._node);
	this._bodyNode = $("<div class='body'>");
	this._bodyNode.appendTo(this._relativeNode);
	this._gunNode = $("<div class='gun'>");
	this._gunNode.appendTo(this._relativeNode);
	this._velocity = {x: 0, y: 0};
	this._maxSpeed = 3;
    };

    Player.prototype.attachTo = function (node) {
	this._node.appendTo(node);
    };

    Player.prototype.setPosition = function (position) {
	this._position = position;
	this._node[0].style.left = "" + position.x + "px";
	this._node[0].style.top  = "" + position.y + "px";
    };

    Player.prototype.position = function (position) {
	if (!this._position) {
	    this._position = {
		x: window.parseInt(this._node[0].style.left, 10),
		y: window.parseInt(this._node[0].style.top,  10)
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

	this._node.css("transform", "rotateZ(" + angle + "rad)");
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

    Player.prototype.update = function () {
	var position = this.position();

	position.x += this._velocity.x;
	position.y += this._velocity.y;

	this.setPosition(position);
    };

    window.Player = Player;
}());
