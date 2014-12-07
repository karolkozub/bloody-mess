//
//  status-display.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var StatusDisplay = function () {
	this._node = document.createElement("div");
	this._node.className = "status-display";
	this._relativeNode = document.createElement("div");
	this._relativeNode.className = "relative";
	this._node.appendChild(this._relativeNode);
	this._offsetX = 10;
	this._offsetY = 10;
	this._healthNode = this._addLabel();
	this._killsNode = this._addLabel();
	this._runTimeNode = this._addLabel();
	this._gameTimeNode = this._addLabel();
	this._pointsNode = this._addLabel();
	this._fpsNode = this._addLabel();
	this._averageFpsNode = this._addLabel();
	this._enemiesNode = this._addLabel();
	this._difficultyNode = this._addLabel();
    };

    StatusDisplay.prototype._addLabel = function () {
	var label = document.createElement("div");
	label.className = "label";
	label.style.left = "" + this._offsetX + "px";
	label.style.top  = "" + this._offsetY + "px";
	this._relativeNode.appendChild(label);
	this._offsetY += 20;
	return label;
    };

    StatusDisplay.prototype.attachTo = function (node) {
	node.appendChild(this._node);
    };

    StatusDisplay.prototype.detachFrom = function (node) {
	node.removeChild(this._node);
    };

    StatusDisplay.prototype.updateWithGameStatistics = function (statistics) {
	this._healthNode.innerHTML = "Health: " + statistics.health;
	this._killsNode.innerHTML = "Kills: " + statistics.kills;
	this._runTimeNode.innerHTML = "Run Time: " + (statistics.runTime / 1000).toFixed(3);
	this._gameTimeNode.innerHTML = "Game Time: " + (statistics.gameTime / 1000).toFixed(3);
	this._pointsNode.innerHTML = "Points: " + statistics.points;
	this._fpsNode.innerHTML = "FPS: " + statistics.fps;
	this._averageFpsNode.innerHTML = "Average FPS: " + statistics.averageFps.toFixed(1);
	this._enemiesNode.innerHTML = "Enemies: " + statistics.enemies;
	this._difficultyNode.innerHTML = "Difficulty: " + (Math.floor(statistics.difficulty * 10) / 10).toFixed(1);

	this._fpsNode.className = statistics.fps < 60 ? "warning label" : "label";
    };

    window.StatusDisplay = StatusDisplay;
}());
