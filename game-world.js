//
//  game-world.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var GameWorld = function () {
	this._node = $("<div class='game-world'>");
	this._relativeNode = $("<div class='relative'>");
	this._relativeNode.appendTo(this._node);
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
    };

    GameWorld.prototype.attachTo = function (node) {
	this._node.appendTo(node);
    };

    GameWorld.prototype.update = function (tick, input) {
	var self = this;
	this._crosshair.handleInput(input);
	this._player.handleInput(input);
	this._player.update();
	this._enemies.forEach(function (enemy) {
	    enemy.updateWithPlayerPosition(self._player.position());
	});
    };

    window.GameWorld = GameWorld;
}());
