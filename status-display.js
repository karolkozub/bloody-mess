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
	this._healthNode = this._addLabelWithOffset({x: 10, y: 10});
	this._killsNode = this._addLabelWithOffset({x: 10, y: 30});
	this._timeNode = this._addLabelWithOffset({x: 10, y: 50});
	this._pointsNode = this._addLabelWithOffset({x: 10, y: 70});
	this._fpsNode = this._addLabelWithOffset({x: 10, y: 90});
	this._enemiesNode = this._addLabelWithOffset({x: 10, y: 110});
    };

    StatusDisplay.prototype._addLabelWithOffset = function (offset) {
	var label = document.createElement("div");
	label.className = "label";
	label.style.left = "" + offset.x + "px";
	label.style.top  = "" + offset.y + "px";
	this._relativeNode.appendChild(label);
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
	this._timeNode.innerHTML = "Time: " + (statistics.time / 1000).toFixed(3);
	this._pointsNode.innerHTML = "Points: " + statistics.points;
	this._fpsNode.innerHTML = "FPS: " + statistics.fps;
	this._enemiesNode.innerHTML = "Enemies: " + statistics.enemies;
    };

    window.StatusDisplay = StatusDisplay;
}());
