//
//  gameover-screen.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var GameoverScreen = function () {
	this._node = document.createElement("div");
	this._node.className = "gameover-screen";
	this._boxNode = document.createElement("div");
	this._boxNode.className = "box";
	this._boxNode.innerHTML = "<header>game over</header><table><tr><td>Kills:</td><td></td></tr><tr><td>Time:</td><td></td></tr></table><button>Retry</button>";
	this._node.appendChild(this._boxNode);
	this._killsNode = this._boxNode.getElementsByTagName("td")[1];
	this._timeNode = this._boxNode.getElementsByTagName("td")[3];
	this._retryButton = this._boxNode.getElementsByTagName("button")[0];
    };

    GameoverScreen.prototype.attachTo = function (node) {
	this._node.style.display = "none";
	node.appendChild(this._node);
    };

    GameoverScreen.prototype.showWithGameStatistics = function (gameStatistics) {
	this._retryButton.onclick = function () {
	    window.location.reload();
	};
	this._killsNode.innerHTML = "" + gameStatistics.kills;
	this._timeNode.innerHTML = "" + (gameStatistics.time / 1000).toFixed(3);
	this._node.style.display = "";
    };

    window.GameoverScreen = GameoverScreen;
}());
