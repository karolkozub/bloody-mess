//
//  bullet.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Bullet = function () {
	this._node = document.createElement("div");
	this._node.className = "bullet";
	this._relativeNode = document.createElement("div");
	this._relativeNode.className = "relative";
	this._node.appendChild(this._relativeNode);
	this._bodyNode = document.createElement("div");
	this._bodyNode.className = "body";
	this._relativeNode.appendChild(this._bodyNode);
	this._velocity = {x: 0, y: 0};
	this._rotation = 0;
    };

    Bullet.prototype.attachTo = function (node) {
	node.appendChild(this._node);
    };

    Bullet.prototype.detachFrom = function (node) {
	node.removeChild(this._node);
    };

    Bullet.prototype.setVelocity = function (velocity) {
	this._velocity = velocity;
    };

    Bullet.prototype.velocity = function () {
	return this._velocity;
    };

    Bullet.prototype.setRotation = function (angle) {
	this._node.style.transform = "rotateZ(" + angle + "rad)";
	this._rotation = angle;
    };

    Bullet.prototype.rotation = function () {
	return this._rotation;
    };

    Bullet.prototype.setPosition = function (position) {
	this._position = position;
	this._node.style.left = "" + position.x + "px";
	this._node.style.top  = "" + position.y + "px";
    };

    Bullet.prototype.position = function (position) {
	if (!this._position) {
	    this._position = {
		x: window.parseInt(this._node.style.left, 10),
		y: window.parseInt(this._node.style.top,  10)
	    };
	}
	return this._position;
    };

    Bullet.prototype.update = function () {
	var position = this.position();

	position.x += this._velocity.x;
	position.y += this._velocity.y;

	this.setPosition(position);
    };

    window.Bullet = Bullet;
}());
