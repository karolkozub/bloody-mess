//
//  game.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Game = function () {
	this._world = new window.GameWorld();
	this._inputController = new window.InputController();
	this._loop = new window.GameLoop();
	this._tick = 0;
    };

    Game.prototype.attachTo = function (node) {
	this._world.attachTo(node);
	this._inputController.attachTo(node);
    };

    Game.prototype.start = function () {
	var callback = this.update.bind(this);
	this._loop.startWithCallback(callback);
    };

    Game.prototype.update = function () {
	this._world.update(this._tick, this._inputController.input());
	this._tick += 1;
    };

    window.Game = Game;
}());
