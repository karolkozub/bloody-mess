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
    };

    LivingObject.prototype = new window.GameObject();

    LivingObject.prototype._setup = function () {
	this._health = 100;
    };

    LivingObject.prototype.loseHealth = function () {
	this._health -= 10;
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

    window.LivingObject = LivingObject;
}());
