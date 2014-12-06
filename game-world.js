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
	this._relativeNode = $("<div class='relative'>");
	this._relativeNode.appendTo(this._node);
	this._player = new window.Player();
	this._player.setPosition({x: 400, y: 400});
	this._player.attachTo(this._relativeNode);
    };

    GameWorld.prototype.attachTo = function (node) {
	this._node.appendTo(node);
    };

    GameWorld.prototype.update = function (tick, input) {
	this._player.handleInput(input);
    };

    window.GameWorld = GameWorld;
}());
