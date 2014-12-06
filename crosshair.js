//
//  crosshair.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Crosshair = function () {
	this._node = $("<div class='crosshair'>")
	this._relativeNode = $("<div class='relative'>");
	this._relativeNode.appendTo(this._node);
	this._bodyNode = $("<div class='body'>");
	this._bodyNode.appendTo(this._relativeNode);
    };

    Crosshair.prototype.attachTo = function (node) {
	this._node.appendTo(node);
    };

    Crosshair.prototype.setPosition = function (position) {
	this._node.offset({left: position.x, top: position.y});
    };

    Crosshair.prototype.position = function (position) {
	var offset = this._node.offset();
	return {x: offset.left, y: offset.top};
    };

    Crosshair.prototype.setVisible = function (visible) {
	if (visible) {
	    this._node.show();
	} else {
	    this._node.hide();
	}
    };

    Crosshair.prototype.handleInput = function (input) {
	this.setVisible(input.isMouseOver);
	if (input.isMouseOver) {
	    this.setPosition(input.mousePosition);
	}
    };

    window.Crosshair = Crosshair;
}());
