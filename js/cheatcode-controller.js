//
//  cheatcode-controller.js
//
//  Created by Karol Kozub on 2014-12-07.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var CheatcodeController = function () {
	this._lastChars = [];
	this._godModeEnabled = false;
    };

    CheatcodeController.prototype.attachTo  = function (node) {
	var self = this;

	node.addEventListener("keypress", function (event) {
	    var maxCheatcodeLength = 5;

	    self._lastChars.push(String.fromCharCode(event.charCode));

	    while (self._lastChars.length > maxCheatcodeLength) {
		self._lastChars.shift();
	    }

	    if (self._lastChars.join() === "I,D,D,Q,D") {
		self._godModeEnabled = true;
	    }
	});
    };

    CheatcodeController.prototype.isGodModeEnabled = function () {
	return this._godModeEnabled;
    };

    window.CheatcodeController = CheatcodeController;
}());
