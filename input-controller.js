//
//  input-controller.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var InputController = function () {
	this._node = document.createElement("div");
	this._node.className = "input-overlay";
	this._mousePosition = {x: 0, y: 0};
	this._keysPressed = {};
	this._isWindowFocused = true;
	this._isMouseOver = true;
	this._isMouseDown = false;
	this._wasMouseDown = false;
    };

    InputController.prototype.attachTo = function (node) {
	var self = this;

	this._node.addEventListener("mousemove", function (event) {
	    self._mousePosition = {
		x: event.offsetX || event.clientX,
		y: event.offsetY || event.clientY
	    };
	});

	this._node.addEventListener("mousedown", function (event) {
	    self._isMouseDown = true;
	    self._wasMouseDown = true;
	});

	this._node.addEventListener("mouseup", function (event) {
	    self._isMouseDown = false;
	});

	this._node.addEventListener("mouseenter", function (event) {
	    self._isMouseOver = true;
	});

	this._node.addEventListener("mouseleave", function (event) {
	    self._isMouseOver = false;
	    self._isMouseDown = false;
	});

	node.addEventListener("keydown", function (event) {
	    if (self._isWindowFocused) {
		self._keysPressed[event.keyCode] = true;
	    }
	});

	node.addEventListener("keyup", function (event) {
	    delete self._keysPressed[event.keyCode];
	});

	window.addEventListener("blur", function (event) {
	    self._keysPressed = {};
	    self._isWindowFocused = false;
	    self._isMouseOver = false;
	    self._isMouseDown = false;
	});

	window.addEventListener("focus", function (event) {
	    self._isWindowFocused = true;
	});

	node.appendChild(this._node);
    };

    InputController.prototype.detachFrom = function (node) {
	node.removeChild(this._node);
    };

    InputController.prototype.input = function () {
	var ArrowUp = 38,    W = 87;
	var ArrowDown = 40,  S = 83;
	var ArrowLeft = 37,  A = 65;
	var ArrowRight = 39, D = 68;
	var wasMouseDown = this._wasMouseDown;

	this._wasMouseDown = false;

	return {
	    mousePosition:  this._mousePosition,
	    isUpPressed:    this._keysPressed[ArrowUp]    || this._keysPressed[W],
	    isDownPressed:  this._keysPressed[ArrowDown]  || this._keysPressed[S],
	    isLeftPressed:  this._keysPressed[ArrowLeft]  || this._keysPressed[A],
	    isRightPressed: this._keysPressed[ArrowRight] || this._keysPressed[D],
	    isMouseOver:    this._isMouseOver,
	    isMouseDown:    this._isMouseDown || wasMouseDown
	};
    };

    window.InputController = InputController;
}());
