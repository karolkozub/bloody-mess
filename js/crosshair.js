//
//  crosshair.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Crosshair = function () {
	this._setup();
    };

    Crosshair.prototype = new window.GameObject();

    Crosshair.prototype._setup = function () {
	window.GameObject.prototype._setup.call(this);

	this._node.className = "crosshair";
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
