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

	var extraScale = Math.random();
	var extraSpeed = 0.5 * Math.random() + 0.5 - 0.5 * extraScale;
	var extraHealth = Math.random();

	this._scale = 1 + extraScale;
	this._size = {width: 20 * this._scale, height: 20 * this._scale};
	this._maxSpeed = 0.5 + 3 * extraSpeed;
	this._health = 50 + 100 * extraHealth;

	var red = Math.floor(255 * (0.25 + 0.25 * extraHealth));
	var green = Math.floor(255 * (0.5 + 0.25 * extraScale));
	var blue = Math.floor(255 * (0.25 + 0.25 * extraSpeed));

	this._color = "rgb(" + red + ", " + green + ", " + blue + ")";
	this._bodyNode.style.backgroundColor = this._color;
	this._bodyNode.style.transform = "scale(" + this._scale + ")";
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

    Enemy.prototype.drawBloodOntoCanvas = function (canvas, velocity) {
	var context = canvas.getContext("2d");

	context.save();

	for (var i = 0; i < Math.random() * 10; i++) {
	    var position = {
		x: this.position().x - 15 + Math.random() * 30 + Math.random() * velocity.x,
		y: this.position().y - 15 + Math.random() * 30 + Math.random() * velocity.y
	    };
	    var radius = Math.random() * 4;
	    var color = "rgb(" + Math.floor(100 + Math.random() * 50) + ", 10, 10)";

	    context.beginPath();

	    if (Math.random() < 0.5) {
		context.arc(position.x, position.y, radius, 0, 2 * Math.PI, true);
	    } else {
		context.moveTo(position.x, position.y);
		context.lineTo(position.x + Math.random() * velocity.x, position.y + Math.random() * velocity.y);
	    }


	    context.closePath();
	    context.lineWidth = Math.random() * 3;
	    context.fillStyle = color;
	    context.strokeStyle = color;
	    context.globalAlpha = 0.5 + 0.5 * Math.random();
	    context.fill();
	    context.stroke();
	}

	context.restore();
    };

    Enemy.prototype.drawDeadBodyOntoCanvas = function (canvas) {
	var context = canvas.getContext("2d");
	var position = this.position();
	var radius = this._size.width / 2;
	var color = this._color;

	context.save();
	context.fillStyle = color;
	context.globalAlpha = 0.5;

	context.beginPath();
	context.arc(position.x, position.y, radius, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();

	context.restore();
    };

    window.Enemy = Enemy;
}());
