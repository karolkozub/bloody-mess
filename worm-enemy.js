//
//  worm-enemy.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var WormEnemy = function () {
	this._setup();
    };

    WormEnemy.prototype = new window.Enemy();

    WormEnemy.prototype._setup = function () {
	window.Enemy.prototype._setup.call(this);

	this._node.className = "worm enemy";
	this._stretchOffset = {x: 0, y: 0};
	this._stretchMultiplier = 1;

	this._partNodes = [this._bodyNode];
	for (var i = 1; i < 4; i++) {
	    var partNode = document.createElement("div");
	    partNode.className = "body part";
	    partNode._position = {x: 0, y: 0};
	    this._relativeNode.appendChild(partNode);
	    this._previousPartNode = partNode;
	    this._partNodes.push(partNode);
	}
	this._currentPart = 0;
    };

    WormEnemy.prototype.setDifficulty = function (difficulty) {
	window.Enemy.prototype.setDifficulty.call(this, difficulty);

	if (this._partNodes) {
	    for (var i = 1; i < 4; i++) {
		var partNode = this._partNodes[i];
		var scale = 0.9 - (0.1 * i);

		partNode.style.backgroundColor = this._color;
		partNode.style.left = "" + Math.floor(-this._size.width / 2 * scale) + "px";
		partNode.style.top = "" + Math.floor(-this._size.height / 2 * scale) + "px";
		partNode.style.width = "" + Math.floor(this._size.width * scale) + "px";
		partNode.style.height = "" + Math.floor(this._size.height * scale) + "px";
		partNode.style.borderRadius = "" + Math.floor(this._size.width / 2 * scale) + "px";
		partNode.style.zIndex = i;
	    }
	}
    };

    WormEnemy.prototype.setRotation = function (angle) {
	this._rotation = angle;
    };

    WormEnemy.prototype.update = function (tick, playerPosition) {
	if (this._stop) {
	    return;
	}

	if (this._currentPart == 0) {
	    var positionBeforeUpdate = this._partPosition(this._currentPart);
	    Enemy.prototype.update.call(this, tick, playerPosition);
	    var positionAfterUpdate = this._partPosition(this._currentPart);
	    var followingPartOffset = {
		x: -(positionAfterUpdate.x - positionBeforeUpdate.x),
		y: -(positionAfterUpdate.y - positionBeforeUpdate.y)
	    };

	    for (var part = 3; part > this._currentPart; part -= 1) {
		this._offsetPart(part, followingPartOffset);
	    }
	} else {
	    var offset = this._partOffset(this._currentPart);

	    this._offsetPart(this._currentPart, {
		x: -0.1 * offset.x,
		y: -0.1 * offset.y
	    });
	}

	while (this._partShouldIncrement(this._currentPart)) {
	    var nextPart = (this._currentPart + 1) % 4;
	    this._currentPart = nextPart;
	}
    };

    WormEnemy.prototype._partPosition = function (part) {
	if (part === 0) {
	    return {
		x: this.position().x,
		y: this.position().y
	    };
	} else {
	    return {
		x: this._partNodes[part]._position.x,
		y: this._partNodes[part]._position.y
	    };
	}
    };

    WormEnemy.prototype._relativePartPosition = function (part) {
	if (part === 0) {
	    return {
		x: 0,
		y: 0
	    };
	} else {
	    return {
		x: this._partNodes[part]._position.x,
		y: this._partNodes[part]._position.y
	    };
	}
    };

    WormEnemy.prototype._setPartPosition = function (part, position) {
	if (part === 0) {
	    this.setPosition(position);
	} else {
	    var partNode = this._partNodes[part];

	    partNode._position = position;
	    partNode.style.transform = "translate(" + position.x + "px, " + position.y + "px)";
	    partNode.style.webkitTransform = "translate(" + position.x + "px, " + position.y + "px)";
	}
    };

    WormEnemy.prototype._offsetPart = function (part, offset) {
	var position = this._partPosition(part);

	position.x += offset.x;
	position.y += offset.y;

	this._setPartPosition(part, position);
    };

    WormEnemy.prototype._partOffset = function (part) {
	if (part === 0) {
	    return {x: 0, y: 0};
	} else {
	    var prevPartPosition = this._relativePartPosition(part - 1);
	    var partPosition = this._partNodes[part]._position;

	    return {
		x: partPosition.x - prevPartPosition.x,
		y: partPosition.y - prevPartPosition.y,
	    };
	}
    };

    WormEnemy.prototype._partShouldIncrement = function (part) {
	if (part !== 0) {
	    var offset = this._partOffset(part);
	    var distance = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
	    var minDistance = this._size.width / 2;

	    if (distance < minDistance) {
		return true;
	    }
	}
	if (part != 3) {
	    var nextOffset = this._partOffset(part + 1);
	    var distance = Math.sqrt(nextOffset.x * nextOffset.x + nextOffset.y * nextOffset.y);
	    var maxDistance = this._size.width;

	    if (distance > maxDistance) {
		return true;
	    }
	}
	return false;
    };

    WormEnemy.prototype.drawDeadBodyOntoCanvas = function (canvas) {
	var context = canvas.getContext("2d");
	var color = this._color;

	context.save();
	context.fillStyle = color;
	context.globalAlpha = 0.5;

	for (var i = 0; i < 4; i++) {
	    var position = {
		x: this.position().x + this._relativePartPosition(i).x,
		y: this.position().y + this._relativePartPosition(i).y,
	    };
	    var scale = i === 0 ? 1 : 0.9 - (0.1 * i);
	    var radius = Math.floor(this._size.width / 2 * scale);

	    context.beginPath();
	    context.arc(position.x, position.y, radius, 0, 2 * Math.PI, true);
	    context.closePath();
	    context.fill();
	}

	context.restore();
    };

    WormEnemy.prototype.hitTestPoint = function (point) {
	for (var i = 0; i < 4; i++) {
	    var scale = i === 0 ? 1 : 0.9 - (0.1 * i);
	    var position = {
		x: this.position().x + this._relativePartPosition(i).x,
		y: this.position().y + this._relativePartPosition(i).y,
	    };
	    var radius = Math.floor(this._size.width / 2 * scale);
	    var partBox = {
		x: position.x - radius,
		y: position.y - radius,
		width: radius * 2,
		height: radius * 2
	    };

	    if (point.x >= partBox.x &&
		point.x < (partBox.x + partBox.width) &&
		point.y >= partBox.y &&
		point.y < (partBox.y + partBox.height)) {
		return true;
	    }
	}
	return false;
    };

    WormEnemy.prototype.hitTestBox = function (box) {
	for (var i = 0; i < 4; i++) {
	    var scale = i === 0 ? 1 : 0.9 - (0.1 * i);
	    var position = {
		x: this.position().x + this._relativePartPosition(i).x,
		y: this.position().y + this._relativePartPosition(i).y,
	    };
	    var radius = Math.floor(this._size.width / 2 * scale);
	    var partBox = {
		x: position.x - radius,
		y: position.y - radius,
		width: radius * 2,
		height: radius * 2
	    };

	    if ((partBox.x + partBox.width) > box.x &&
		(partBox.y + partBox.height) > box.y &&
		partBox.x < (box.x + box.width) &&
		partBox.y < (box.y + box.height)) {
		return true;
	    }
	}
	return false;
    };

    window.WormEnemy = WormEnemy;
}());
