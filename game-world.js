//
//  game-world.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var GameWorld = function () {
	this._node = document.createElement("div");
	this._node.className = "game-world";
	this._relativeNode = document.createElement("div");
	this._relativeNode.className = "relative";
	this._node.appendChild(this._relativeNode);
	this._crosshair = new window.Crosshair();
	this._crosshair.attachTo(this._relativeNode);
	this._player = new window.Player();
	this._player.setPosition({x: 400, y: 400});
	this._player.attachTo(this._relativeNode);
	this._enemies = [];
	for (var i = 0; i < 10; i++) {
	    var enemy = new window.Enemy();
	    enemy.setPosition({x: Math.random() * 1000, y: Math.random() * 1000});
	    enemy.attachTo(this._relativeNode);
	    this._enemies.push(enemy);
	}
	this._bullets = [];
	this._deadEnemies = [];
    };

    GameWorld.prototype.attachTo = function (node) {
	node.appendChild(this._node);
    };

    GameWorld.prototype.update = function (tick, input) {
	var self = this;
	this._crosshair.handleInput(input);
	this._handleInput(input);
	this._player.handleInput(input);
	this._player.update();
	this._enemies.forEach(function (enemy) {
	    enemy.updateWithPlayerPosition(self._player.position());
	});
	this._bullets = this._bullets.filter(function (bullet) {
	    bullet.update();

	    var bulletHitEnemy = false;
	    var bulletIsOutsideWorld = bullet.position().x < 0 || bullet.position().x > self._size().width || bullet.position().y < 0 || bullet.position().y > self._size().height;

	    self._enemies.forEach(function (enemy) {
		if (!enemy.isDead() && bullet.didCrossBox(enemy.box())) {
		    bulletHitEnemy = true;
		    enemy.loseHealth();
		}
	    });

	    if (bulletHitEnemy || bulletIsOutsideWorld) {
		bullet.detachFrom(self._relativeNode);
		return false;
	    } else {
		return true;
	    }
	});
    };

    GameWorld.prototype._size = function () {
	return {width: this._node.clientWidth, height: this._node.clientHeight};
    };

    GameWorld.prototype._handleInput = function (input) {
	if (input.isMouseDown) {
	    this._shootFromPositionToPosition(this._player.position(), input.mousePosition);
	}
    };

    GameWorld.prototype._shootFromPositionToPosition = function (fromPosition, toPosition) {
	var distance = {x: toPosition.x -  fromPosition.x, y: toPosition.y -  fromPosition.y};
	var speed = 20 + Math.random() * 10;
	var angle = Math.PI / 2 - Math.atan2(distance.x, distance.y) + (Math.random() - 0.5) * Math.PI / 100;

	var bullet = new window.Bullet();
	bullet.setPosition({x: fromPosition.x, y: fromPosition.y});
	bullet.setVelocity({x: speed * Math.cos(angle), y: speed * Math.sin(angle)});
	bullet.setRotation(angle);
	bullet.attachTo(this._relativeNode);
	this._bullets.push(bullet);
    };

    window.GameWorld = GameWorld;
}());
