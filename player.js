//
//  player.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var Player = function () {
	this._node = $("<div class='player'>")
	this._relativeNode = $("<div class='relative'>");
	this._relativeNode.appendTo(this._node);
	this._bodyNode = $("<div class='body'>");
	this._bodyNode.appendTo(this._relativeNode);
	this._gunNode = $("<div class='gun'>");
	this._gunNode.appendTo(this._relativeNode);
    };

    Player.prototype.attachTo = function (node) {
	this._node.appendTo(node);
    };

    Player.prototype.setPosition = function (position) {
	this._node.offset({left: position.x, top: position.y});
    };

    window.Player = Player;
}());
