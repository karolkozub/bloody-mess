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
	this._gameoverScreen = new window.GameoverScreen();
	this._loop = new window.GameLoop();
    };

    Game.prototype.attachTo = function (node) {
	this._node = node;
	this._world.attachTo(node);
	this._inputController.attachTo(node);
	this._gameoverScreen.attachTo(node);
    };

    Game.prototype.start = function () {
	var callback = this.update.bind(this);
	this._loop.startWithCallback(callback);
    };

    Game.prototype.update = function () {
	this._world.update(this._inputController.input());

	if (this._world.isGameOver()) {
	    this._loop.stop();
	    this._inputController.detachFrom(this._node);
	    this._gameoverScreen.showWithGameStatistics(this._statistics());
	}
    };

    Game.prototype._statistics = function () {
	var kills = this._world.numberOfKills();
	var time = this._loop.runTime();
	var points = kills + Math.floor(time / 1000);

	return {
	    kills: kills,
	    time: time,
	    points: points
	}
    };

    window.Game = Game;
}());
