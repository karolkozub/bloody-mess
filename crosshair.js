//
//  crosshair.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Crosshair = function () {
	this._node = document.createElement("div");
	this._node.className = "crosshair";
	this._relativeNode = document.createElement("div");
	this._relativeNode.className = "relative";
	this._node.appendChild(this._relativeNode);
	this._bodyNode = document.createElement("div");
	this._bodyNode.className = "body";
	this._relativeNode.appendChild(this._bodyNode);
    };

    Crosshair.prototype.attachTo = function (node) {
	node.appendChild(this._node);
    };

    Crosshair.prototype.setPosition = function (position) {
	this._position = position;
	this._node.style.left = "" + Math.round(position.x) + "px";
	this._node.style.top  = "" + Math.round(position.y) + "px";
    };

    Crosshair.prototype.position = function (position) {
	if (!this._position) {
	    this._position = {
		x: window.parseInt(this._node.style.left, 10),
		y: window.parseInt(this._node.style.top,  10)
	    };
	}
	return this._position;
    };

    Crosshair.prototype.setVisible = function (visible) {
	this._node.style.display = visible ? "" : "none";
    };

    Crosshair.prototype.handleInput = function (input) {
	this.setVisible(input.isMouseOver);
	if (input.isMouseOver) {
	    this.setPosition(input.mousePosition);
	}
    };

    window.Crosshair = Crosshair;
}());
