//
//  floatingText.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var FloatingText = function (tick, text, color) {
	this._setup(tick, text, color);
    };

    FloatingText.prototype = new window.GameObject();

    FloatingText.prototype._setup = function (tick, text, color) {
	window.GameObject.prototype._setup.call(this);

	this._node.className = "floating-text";
	this._startTick = tick;
	this._lifetime = 30;
	this._bodyNode.innerHTML = text;
	this._bodyNode.style.color = color;
	this.update(tick);
    };

    FloatingText.prototype.update = function (tick) {
	var progress = this.progress(tick);
	var offsetY = -40 * progress;
	var opacity = 1;

	this._bodyNode.style.opacity = opacity;
	this._bodyNode.style.transform = "translateY(" + offsetY + "px)";
    };

    FloatingText.prototype.progress = function (tick) {
	return (tick - this._startTick) / this._lifetime;
    };

    window.FloatingText = FloatingText;
}());
