//
//  input-controller.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var InputController = function () {
	this._node = $("<div class='input-overlay'>");
	this._mousePosition = {x: 0, y: 0};
	this._keysPressed = {};
	this._isWindowFocused = true;
	this._isMouseOver = true;
    };

    InputController.prototype.attachTo = function (node) {
	var self = this;

	this._node.mousemove(function (event) {
	    self._mousePosition = {x: event.offsetX, y: event.offsetY};
	});

	this._node.mouseenter(function (event) {
	    self._isMouseOver = true;
	});

	this._node.mouseleave(function (event) {
	    self._isMouseOver = false;
	});

	node.keydown(function (event) {
	    if (self._isWindowFocused) {
		self._keysPressed[event.keyCode] = true;
	    }
	});

	node.keyup(function (event) {
	    delete self._keysPressed[event.keyCode];
	});

	$(window).blur(function (event) {
	    self._keysPressed = {};
	    self._isWindowFocused = false;
	});

	$(window).focus(function (event) {
	    self._isWindowFocused = true;
	});

	this._node.appendTo(node);
    };

    InputController.prototype.input = function () {
	var ArrowUp = 38,    W = 87;
	var ArrowDown = 40,  S = 83;
	var ArrowLeft = 37,  A = 65;
	var ArrowRight = 39, D = 68;

	return {
	    mousePosition:  this._mousePosition,
	    isUpPressed:    this._keysPressed[ArrowUp]    || this._keysPressed[W],
	    isDownPressed:  this._keysPressed[ArrowDown]  || this._keysPressed[S],
	    isLeftPressed:  this._keysPressed[ArrowLeft]  || this._keysPressed[A],
	    isRightPressed: this._keysPressed[ArrowRight] || this._keysPressed[D],
	    isMouseOver:    this._isMouseOver && this._isWindowFocused
	};
    };

    window.InputController = InputController;
}());
