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
		partNode.style.left = "" + (-this._size.width / 2 * scale) + "px";
		partNode.style.top = "" + (-this._size.height / 2 * scale) + "px";
		partNode.style.width = "" + this._size.width * scale + "px";
		partNode.style.height = "" + this._size.height * scale + "px";
		partNode.style.borderRadius = "" + (this._size.width / 2 * scale) + "px";
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
	    return this.position();
	} else {
	    var prevPartPosition = part === 1 ? {x: 0, y: 0} : this._partNodes[part - 1]._position;
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

    window.WormEnemy = WormEnemy;
}());
