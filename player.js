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

    Player.prototype.position = function (position) {
	var offset = this._node.offset();
	return {x: offset.left, y: offset.top};
    };

    Player.prototype.handleInput = function (input) {
	this._rotateTowardsPosition(input.mousePosition);
    };

    Player.prototype._rotateTowardsPosition = function (position) {
	var angle = Math.PI / 2 - Math.atan2(position.x - this.position().x,
					     position.y - this.position().y);

	this._node.css("transform", "rotateZ(" + angle + "rad)");
    };

    window.Player = Player;
}());
