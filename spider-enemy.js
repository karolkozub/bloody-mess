//
//  spider-enemy.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var SpiderEnemy = function () {
	this._setup();
    };

    SpiderEnemy.prototype = new window.Enemy();

    SpiderEnemy.prototype._setup = function () {
	window.Enemy.prototype._setup.call(this);

	this._node.className = "spider enemy";
	this._legNodes = [];
	this._baseJointOffsets = [];
	this._baseTipOffsets = [];
	for (var i = 0; i < 3; i++) {
	    var angle = Math.PI / 6 + Math.PI / 3 * i;
	    var radius = this._size.width / 2;
	    var width = Math.round(20 * this._scale);
	    var legNode = document.createElement("div");
	    legNode.className = "leg";
	    this._relativeNode.appendChild(legNode);
	    this._legNodes.push(legNode);
	    this._baseTipOffsets.push({
		x: Math.cos(angle) * (radius + width),
		y: Math.sin(angle) * (radius + width),
	    });
	    this._baseJointOffsets.push({
		x: Math.cos(angle) * radius,
		y: Math.sin(angle) * radius,
	    });
	}
	this._usingEvenLegs = true;
	this._extraTipOffset = {x: 0, y: 0};
	this._numberOfPauseTicks = 50 + Math.random() * 100;
	this._tickOffset = Math.floor(Math.random() * this._numberOfPauseTicks);
    };

    SpiderEnemy.prototype.setDifficulty = function (difficulty) {
	window.Enemy.prototype.setDifficulty.call(this, difficulty);

	for (var i = 0; i < 3; i++) {
	    var angle = Math.PI / 6 + Math.PI / 3 * i;
	    var radius = this._size.width / 2;
	    var width = Math.round(20 * this._scale);

	    if (this._baseTipOffsets && this._baseTipOffsets[i]) {
		this._baseTipOffsets[i].x = Math.cos(angle) * (radius + width);
		this._baseTipOffsets[i].y = Math.sin(angle) * (radius + width);
	    }
	    if (this._baseJointOffsets && this._baseJointOffsets[i]) {
		this._baseJointOffsets[i].x = Math.cos(angle) * radius;
		this._baseJointOffsets[i].y = Math.sin(angle) * radius;
	    }
	}
    };

    SpiderEnemy.prototype.setRotation = function (angle) {
	this._rotation = angle;
    };

    SpiderEnemy.prototype.update = function (tick, playerPosition) {
	if ((tick + this._tickOffset) % (2 * this._numberOfPauseTicks) < this._numberOfPauseTicks) {
	    Enemy.prototype.update.call(this, tick, playerPosition);
	}
    };

    SpiderEnemy.prototype._updatePosition = function (position) {
	window.Enemy.prototype._updatePosition.call(this, position);

	var extraTipOffset = this._extraTipOffset;

	extraTipOffset.x += this._velocity.x;
	extraTipOffset.y += this._velocity.y;

	this._updateExtraTipOffset(extraTipOffset);

	var stretch = Math.sqrt(extraTipOffset.x * extraTipOffset.x + extraTipOffset.y * extraTipOffset.y);
	var stretchLimit = 10 * this._scale;

	if (stretch > stretchLimit) {
	    this._usingEvenLegs = !this._usingEvenLegs;
	    this._extraTipOffset = {
		x: -this._extraTipOffset.x * 0.9,
		y: -this._extraTipOffset.y * 0.9,
	    };
	}
    };

    SpiderEnemy.prototype._updateExtraTipOffset = function (extraTipOffset) {
	for (var i = 0; i < 3; i++) {
	    var multiplier = (this._usingEvenLegs == (i % 2 == 0)) ? 1 : -1;
	    var radius = this._size.width / 2;
	    var legNode = this._legNodes[i];
	    var jointOffset = this._baseJointOffsets[i];
	    var tipOffset = {
		x: this._baseTipOffsets[i].x + multiplier * this._extraTipOffset.x,
		y: this._baseTipOffsets[i].y + multiplier * this._extraTipOffset.y,
	    }
	    var distance = {
		x: tipOffset.x - jointOffset.x,
		y: tipOffset.y - jointOffset.y
	    };
	    var angle = Math.PI / 2 - Math.atan2(distance.x, distance.y);
	    var width = Math.sqrt(distance.x * distance.x + distance.y * distance.y);

	    legNode.style.left = "" + -(width + radius) + "px";
	    legNode.style.width = "" + 2 * (width + radius) + "px";
	    legNode.style.transform = "rotateZ(" + angle + "rad)";
	    legNode.style.webkitTransform = "rotateZ(" + angle + "rad)";
	}
    };

    window.SpiderEnemy = SpiderEnemy;
}());
