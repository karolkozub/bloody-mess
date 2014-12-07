//
//  game-object.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var GameObject = function () {
	this._setup();
    };

    GameObject.prototype._setup = function () {
	this._node = document.createElement("div");
	this._node.className = "game-object";
	this._relativeNode = document.createElement("div");
	this._relativeNode.className = "relative";
	this._node.appendChild(this._relativeNode);
	this._bodyNode = document.createElement("div");
	this._bodyNode.className = "body";
	this._relativeNode.appendChild(this._bodyNode);
	this._velocity = {x: 0, y: 0};
	this._position = {x: 0, y: 0};
	this._rotation = 0;
	this._size = {width: 0, height: 0};
    };

    GameObject.prototype.attachTo = function (node) {
	node.appendChild(this._node);
    };

    GameObject.prototype.detachFrom = function (node) {
	node.removeChild(this._node);
    };

    GameObject.prototype.setPosition = function (position) {
	this._position = position;
	this._node.style.transform = "translate(" + position.x + "px, " + position.y + "px)";
	this._node.style.webkitTransform = "translate(" + position.x + "px, " + position.y + "px)";
    };

    GameObject.prototype.position = function (position) {
	if (!this._position) {
	    this._position = {
		x: window.parseInt(this._node.style.left, 10),
		y: window.parseInt(this._node.style.top,  10)
	    };
	}
	return this._position;
    };

    GameObject.prototype.setVelocity = function (velocity) {
	this._velocity = velocity;
    };

    GameObject.prototype.velocity = function () {
	return this._velocity;
    };

    GameObject.prototype.setRotation = function (angle) {
	this._relativeNode.style.transform = "rotateZ(" + angle + "rad)";
	this._relativeNode.style.webkitTransform = "rotateZ(" + angle + "rad)";
	this._rotation = angle;
    };

    GameObject.prototype.rotation = function () {
	return this._rotation;
    };

    GameObject.prototype.box = function () {
	return {
	    x:      this._position.x - this._size.width / 2,
	    y:      this._position.y - this._size.height / 2,
	    width:  this._size.width,
	    height: this._size.height
	};
    };

    GameObject.prototype._rotateTowardsPosition = function (position) {
	var angle = Math.PI / 2 - Math.atan2(position.x - this.position().x,
					     position.y - this.position().y);

	this.setRotation(angle);
    };

    GameObject.prototype._updatePosition = function () {
	var position = this.position();

	position.x += this._velocity.x;
	position.y += this._velocity.y;

	this.setPosition(position);
    };

    GameObject.prototype.drawBloodOntoCanvas = function (canvas, velocity) {
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

    window.GameObject = GameObject;
}());
