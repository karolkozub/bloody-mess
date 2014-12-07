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
	this._backgroundCanvas = document.createElement("canvas");
	this._backgroundCanvas.className = "background";
	this._relativeNode.appendChild(this._backgroundCanvas);
	this._crosshair = new window.Crosshair();
	this._crosshair.attachTo(this._relativeNode);
	this._player = new window.Player();
	this._player.attachTo(this._relativeNode);
	this._enemies = [];
	this._bullets = [];
	this._deadEnemies = [];
	this._numberOfKills = 0;
	this._tick = 0;
	this._lastGunTick = -Infinity;
	this._maxNumberOfBullets = 100;
	this._reloadDelay = 30;
	this._lastReloadTick = -Infinity;
	this._numberOfBullets = this._maxNumberOfBullets;
	this._audioController = new window.AudioController();
	this._isGodModeEnabled = false;
	this._floatingTexts = [];
    };

    GameWorld.prototype.attachTo = function (node) {
	var self = this;
	window.addEventListener("resize", function () {
	    delete self._size;
	});
	node.appendChild(this._node);
	this._player.setPosition({x: this.size().width / 2, y: this.size().height / 2});
	this._backgroundCanvas.width = this.size().width;
	this._backgroundCanvas.height = this.size().height;
    };

    GameWorld.prototype.update = function (tick, input, isGodModeEnabled) {
	var self = this;
	this._tick = tick;
	this._isGodModeEnabled = isGodModeEnabled;
	this._crosshair.handleInput(input);
	this._handleInput(input);
	this._player.handleInput(input);
	this._player.updateWithBoundingBox(this.box());
	this._enemies.forEach(function (enemy) {
	    enemy.update(tick, self._player.position());

	    if (!self._isGodModeEnabled && enemy.hitTestBox(self._player.box())) {
		var recoil = {
		    x: -1 + Math.random() * 2,
		    y: -1 + Math.random() * 2
		};

		self._player.loseHealth();
		self._player.slowDown();
		self._player.handleRecoil(recoil);
		self._player.drawBloodOntoCanvas(self._backgroundCanvas, recoil);
		if (self._player.isDead()) {
		    self._audioController.playDeathSound();
		} else {
		    self._audioController.playHurtSound();
		}
	    }
	});
	this._bullets = this._bullets.filter(function (bullet) {
	    bullet.update();

	    var bulletHitEnemy = false;
	    var bulletIsOutsideWorld = bullet.position().x < 0 || bullet.position().x > self.size().width || bullet.position().y < 0 || bullet.position().y > self.size().height;

	    self._enemies.forEach(function (enemy) {
		if (bullet.didCrossObject(enemy)) {
		    var recoil = {
			x: bullet.velocity().x * 0.02 -0.5 + Math.random(),
			y: bullet.velocity().y * 0.02 -0.5 + Math.random()
		    };

		    bulletHitEnemy = true;
		    enemy.loseHealth();
		    enemy.handleRecoil(recoil);
		    enemy.drawBloodOntoCanvas(self._backgroundCanvas, bullet.velocity());
		    self._audioController.playEnemyHurtSound();
		}
	    });

	    if (bulletHitEnemy || bulletIsOutsideWorld) {
		bullet.detachFrom(self._relativeNode);
		return false;
	    } else {
		return true;
	    }
	});
	this._enemies = this._enemies.filter(function (enemy) {
	    if (enemy.isDead()) {
		enemy.detachFrom(self._relativeNode);
		enemy.drawDeadBodyOntoCanvas(self._backgroundCanvas);
		enemy.drawBloodOntoCanvas(self._backgroundCanvas, {x: 0, y: 0});
		self._numberOfKills += 1;
		self._showFloatingText(enemy.position(), "+1 KILL", "#C44");
		return false;
	    } else {
		return true;
	    }
	});
	this._floatingTexts = this._floatingTexts.filter(function (floatingText) {
	    floatingText.update(self._tick);

	    if (floatingText.progress(self._tick) >= 1) {
		floatingText.detachFrom(self._relativeNode);
		return false;
	    } else {
		return true;
	    }
	});
	this._addEnemies();
	this._resizeBackgroundCanvasIfNeeded();
    };

    GameWorld.prototype.size = function () {
	if (!this._size) {
	    this._size = {width: this._node.clientWidth, height: this._node.clientHeight};
	}
	return this._size;
    };

    GameWorld.prototype.box = function () {
	return {x: 0, y: 0, width: this.size().width, height: this.size().height};
    };

    GameWorld.prototype.difficulty = function () {
	return 1 + this._tick / 3600;
    };

    GameWorld.prototype._handleInput = function (input) {
	if (input.isMouseDown && this._canShoot()) {
	    this._shootFromPositionToPosition(this._player.position(), input.mousePosition);
	    this._lastGunTick = this._tick;
	}
    };

    GameWorld.prototype._canShoot = function () {
	var gunDelay = this._isGodModeEnabled ? 0 : 1;
	var waitingForNextBullet = this._lastGunTick + gunDelay >= this._tick;
	var waitingForReload = this._lastReloadTick + this._reloadDelay >= this._tick;

	return !waitingForNextBullet && !waitingForReload;
    };

    GameWorld.prototype._shootFromPositionToPosition = function (fromPosition, toPosition) {
	var distance = {x: toPosition.x -  fromPosition.x, y: toPosition.y -  fromPosition.y};
	var speed = 40 + Math.random() * 20;
	var angle = Math.PI / 2 - Math.atan2(distance.x, distance.y) + (Math.random() - 0.5) * Math.PI / 20;

	var bullet = new window.Bullet();
	bullet.setPosition({x: fromPosition.x, y: fromPosition.y});
	bullet.setVelocity({x: speed * Math.cos(angle), y: speed * Math.sin(angle)});
	bullet.setRotation(angle);
	bullet.attachTo(this._relativeNode);
	this._bullets.push(bullet);
	this._audioController.playGunSound();
	this._numberOfBullets -= 1;
	if (this._numberOfBullets <= 0) {
	    this._lastReloadTick = this._isGodModeEnabled ? -Infinity : this._tick;
	    this._numberOfBullets = this._maxNumberOfBullets;
	    this._audioController.playReloadSound();
	}
    };

    GameWorld.prototype._addEnemies = function () {
	if (Math.random() < 0.05 * Math.sqrt(this.difficulty())) {
	    var enemy = this._newRandomEnemy();
	    var margin = 10;
	    var x = -margin + Math.random() * (this.size().width  + 2 * margin);
	    var y = -margin + Math.random() * (this.size().height + 2 * margin);

	    if (Math.random() < 0.5) {
		x = Math.random() < 0.5 ? -margin : (this.size().width  + margin);
	    } else {
	    	y = Math.random() < 0.5 ? -margin : (this.size().height + margin);
	    }

	    enemy.setPosition({x: x, y: y});
	    enemy.attachTo(this._relativeNode);
	    this._enemies.push(enemy);
	}
    };

    GameWorld.prototype._newRandomEnemy = function () {
	var type = Math.floor(Math.random() * 3);

	switch (type) {
	case 0:
	    return new window.SpiderEnemy(this.difficulty());
	case 1:
	    return new window.WormEnemy(this.difficulty());
	case 2:
	default:
	    return new window.Enemy(this.difficulty());
	}
    };

    GameWorld.prototype._resizeBackgroundCanvasIfNeeded = function () {
	var parentWidth = this._backgroundCanvas.parentElement.offsetWidth;
	var parentHeight = this._backgroundCanvas.parentElement.offsetHeight;
	var shouldBeWider  = this._backgroundCanvas.width  < parentWidth
	var shouldBeHigher = this._backgroundCanvas.height < parentHeight;

	if (shouldBeWider || shouldBeHigher) {
	    var image = new window.Image();
	    var self = this;
	    image.src = this._backgroundCanvas.toDataURL();
	    image.onload = function () {
		self._backgroundCanvas.width = Math.max(parentWidth, self._backgroundCanvas.width);
		self._backgroundCanvas.height = Math.max(parentHeight, self._backgroundCanvas.height);
		self._backgroundCanvas.getContext("2d").drawImage(image, 0, 0);
	    };
	}
    };

    GameWorld.prototype._showFloatingText = function (position, text, color) {
	var floatingText = new window.FloatingText(this._tick, text, color);

	floatingText.setPosition({x: position.x, y: position.y});
	floatingText.attachTo(this._relativeNode);

	this._floatingTexts.push(floatingText);
    };

    GameWorld.prototype.isGameOver = function () {
	return this._player && this._player.isDead();
    };

    GameWorld.prototype.numberOfKills = function () {
	return this._numberOfKills;
    };

    GameWorld.prototype.numberOfEnemies = function () {
	return this._enemies.length;
    };

    GameWorld.prototype.playerHealth = function () {
	return this._player.health();
    };

    window.GameWorld = GameWorld;
}());
