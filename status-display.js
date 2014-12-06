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
	this._healthNode = document.createElement("div");
	this._healthNode.className = "health";
	this._relativeNode.appendChild(this._healthNode);
	this._killsNode = document.createElement("div");
	this._killsNode.className = "kills";
	this._relativeNode.appendChild(this._killsNode);
	this._timeNode = document.createElement("div");
	this._timeNode.className = "time";
	this._relativeNode.appendChild(this._timeNode);
	this._pointsNode = document.createElement("div");
	this._pointsNode.className = "points";
	this._relativeNode.appendChild(this._pointsNode);
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
    };

    window.StatusDisplay = StatusDisplay;
}());
