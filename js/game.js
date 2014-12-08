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
	this._statusDisplay = new window.StatusDisplay();
	this._inputController = new window.InputController();
	this._cheatcodeController = new window.CheatcodeController();
	this._gameoverScreen = new window.GameoverScreen();
	this._loop = new window.GameLoop();
    };

    Game.prototype.attachTo = function (node) {
	this._node = node;
	this._world.attachTo(node);
	this._statusDisplay.attachTo(node);
	this._inputController.attachTo(node);
	this._cheatcodeController.attachTo(node);
	this._gameoverScreen.attachTo(node);
    };

    Game.prototype.start = function () {
	var callback = this.update.bind(this);
	this._loop.startWithCallback(callback);
    };

    Game.prototype.update = function () {
	this._world.update(this._loop.tick(), this._inputController.input(), this._cheatcodeController.isGodModeEnabled());
	this._statusDisplay.updateWithGameStatistics(this._statistics());

	if (this._world.isGameOver()) {
	    this._loop.stop();
	    this._inputController.detachFrom(this._node);
	    this._gameoverScreen.showWithGameStatistics(this._statistics());
	}
    };

    Game.prototype._statistics = function () {
	var health = this._world.playerHealth();
	var kills = this._world.numberOfKills();
	var enemies = this._world.numberOfEnemies();
	var runTime = this._loop.runTime();
	var gameTime = this._loop.gameTime();
	var fps = this._loop.fps();
	var averageFps = this._loop.averageFps();
	var points = kills + Math.floor(this._loop.gameTime() / 1000) + this._world.extraPoints();
	var difficulty = this._world.difficulty();
	var isGodModeEnabled = this._cheatcodeController.isGodModeEnabled();

	return {
	    health: health,
	    kills: kills,
	    enemies: enemies,
	    runTime: runTime,
	    gameTime: gameTime,
	    fps: fps,
	    averageFps: averageFps,
	    points: points,
	    difficulty: difficulty,
	    isGodModeEnabled: isGodModeEnabled
	}
    };

    window.Game = Game;
}());
