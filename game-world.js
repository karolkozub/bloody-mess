//
//  game-world.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var GameWorld = function () {
	this._node = $("<div class='game-world'>");
    };

    GameWorld.prototype.attachTo = function (node) {
	this._node.appendTo(node);
    };

    GameWorld.prototype.update = function (tick, input) {
    };

    window.GameWorld = GameWorld;
}());
