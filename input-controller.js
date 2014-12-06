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
    };

    InputController.prototype.attachTo = function (node) {
	this._node.appendTo(node);
    };

    InputController.prototype.input = function () {
	return {};
    };

    window.InputController = InputController;
}());
