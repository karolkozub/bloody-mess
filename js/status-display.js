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
	this._offsetY = 45;
	this._healthBarNode = document.createElement("div");
	this._healthBarNode.className = "health-bar";
	this._relativeNode.appendChild(this._healthBarNode);
	this._healthProgressNode = document.createElement("div");
	this._healthProgressNode.className = "progress";
	this._healthBarNode.appendChild(this._healthProgressNode);
	this._healthLabelNode = document.createElement("div");
	this._healthLabelNode.className = "health-label";
	this._healthBarNode.appendChild(this._healthLabelNode);
	this._pointsNode = this._addLabel();
	this._timeNode = this._addLabel();
	this._killsNode = this._addLabel();
	this._copyrightNode = document.createElement("div");
	this._copyrightNode.className = "copyright";
	this._copyrightNode.innerHTML = "Copyright 2014 Karol Kozub";
	this._relativeNode.appendChild(this._copyrightNode);
	this._statusNode = document.createElement("div");
	this._statusNode.className = "status";
	this._statusNode.innerHTML = "God Mode Enabled";
	this._statusNode.style.display = "none";
	this._relativeNode.appendChild(this._statusNode);
	this._pointsNodeScale = 1;
	this._killsNodeScale = 1;
    };

    StatusDisplay.prototype._addLabel = function () {
	var label = document.createElement("div");
	label.className = "label";
	label.style.left = "" + this._offsetX + "px";
	label.style.top  = "" + this._offsetY + "px";
	this._relativeNode.appendChild(label);
	this._offsetX += 100;
	return label;
    };

    StatusDisplay.prototype.attachTo = function (node) {
	node.appendChild(this._node);
    };

    StatusDisplay.prototype.detachFrom = function (node) {
	node.removeChild(this._node);
    };

    StatusDisplay.prototype.updateWithGameStatistics = function (statistics) {
	var healthPercent = "" + Math.floor(statistics.health) + "%";
	var pointsHTML = "Points: <span>" + statistics.points + "</span>";
	var killsHTML = "Kills: <span>" + statistics.kills + "</span>";

	this._healthProgressNode.style.width = healthPercent;
	this._healthLabelNode.innerHTML = healthPercent;

	if (this._pointsNode.innerHTML !== pointsHTML) {
	    this._pointsNode.innerHTML = pointsHTML;
	    this._pointsNodeScale = 1.2;
	}
	this._pointsNode.style.transform = "scale(" + this._pointsNodeScale + ", " + this._pointsNodeScale + ")";
	this._pointsNodeScale = 0.8 * this._pointsNodeScale + 0.2;

	if (this._killsNode.innerHTML !== killsHTML) {
	    this._killsNode.innerHTML = killsHTML;
	    this._killsNodeScale = 1.2;
	}
	this._killsNode.style.transform = "scale(" + this._killsNodeScale + ", " + this._killsNodeScale + ")";
	this._killsNodeScale = 0.8 * this._killsNodeScale + 0.2;

	this._timeNode.innerHTML = "Time: " + (statistics.gameTime / 1000).toFixed(1);
	this._statusNode.style.display = statistics.isGodModeEnabled ? "" : "none";
    };

    window.StatusDisplay = StatusDisplay;
}());
