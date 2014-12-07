//
//  living-object.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var LivingObject = function () {
	this._setup();
	this._hurtCounter = 0;
    };

    LivingObject.prototype = new window.GameObject();

    LivingObject.prototype._setup = function () {
	this._health = 100;
    };

    LivingObject.prototype.loseHealth = function () {
	this._health -= 10;
	this._setHurt(true);
    };

    LivingObject.prototype.health = function () {
	return this._health;
    };

    LivingObject.prototype.isDead = function () {
	return this._health <= 0;
    }

    LivingObject.prototype.handleRecoil = function (recoil) {
	this.offsetPosition(recoil);
    };

    LivingObject.prototype.drawBloodOntoCanvas = function (canvas, velocity) {
	var context = canvas.getContext("2d");
	var scale = this._scale || 1;

	context.save();

	for (var i = 0; i < Math.round((0.5 + 0.5 * Math.random()) * 10 * scale); i++) {
	    var position = {
		x: this.position().x - 15 + Math.random() * 30 + Math.random() * velocity.x,
		y: this.position().y - 15 + Math.random() * 30 + Math.random() * velocity.y
	    };
	    var radius = Math.random() * 4 * scale;
	    var color = "rgb(" + Math.floor(100 + Math.random() * 50) + ", 10, 10)";

	    context.beginPath();

	    if (Math.random() < 0.5) {
		context.arc(position.x, position.y, radius, 0, 2 * Math.PI, true);
	    } else {
		context.moveTo(position.x, position.y);
		context.lineTo(position.x + Math.random() * velocity.x * scale, position.y + Math.random() * velocity.y * scale);
	    }

	    context.closePath();
	    context.lineWidth = Math.random() * 3 * scale;
	    context.fillStyle = color;
	    context.strokeStyle = color;
	    context.globalAlpha = 0.5 + 0.5 * Math.random();
	    context.fill();
	    context.stroke();
	}

	context.restore();
    };

    LivingObject.prototype.hitTestPoint = function (point) {
	var thisBox = this.box();

	return point.x >= thisBox.x &&
	    point.x < (thisBox.x + thisBox.width) &&
	    point.y >= thisBox.y &&
	    point.y < (thisBox.y + thisBox.height);
    };

    LivingObject.prototype.hitTestBox = function (box) {
	var thisBox = this.box();

	return (thisBox.x + thisBox.width) > box.x &&
	    (thisBox.y + thisBox.height) > box.y &&
	    thisBox.x < (box.x + box.width) &&
	    thisBox.y < (box.y + box.height);
    };

    LivingObject.prototype._setHurt = function (hurt) {
	if (hurt) {
	    this._node.classList.add("hurt");
	    this._hurtCounter = 3;
	} else {
	    this._node.classList.remove("hurt");
	    this._hurtCounter = 0;
	}
    };

    LivingObject.prototype._updateHurtCounter = function () {
	this._hurtCounter = Math.max(0, this._hurtCounter - 1);
	if (this._hurtCounter % 2 === 0) {
	    this._node.classList.remove("hurt");
	} else {
	    this._node.classList.add("hurt");
	}
    };

    window.LivingObject = LivingObject;
}());
