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
	this._tableNode = document.createElement("div");
	this._tableNode.className = "table";
	this._node.appendChild(this._tableNode);
	this._tableCellNode = document.createElement("div");
	this._tableCellNode.className = "table-cell";
	this._tableNode.appendChild(this._tableCellNode);
	this._boxNode = document.createElement("div");
	this._boxNode.className = "box";
	this._tableCellNode.appendChild(this._boxNode);
	this._headerNode = document.createElement("header");
	this._headerNode.textContent = "GAME OVER";
	this._boxNode.appendChild(this._headerNode);
	this._congratulationsNode = document.createElement("div");
	this._congratulationsNode.className = "congratulations";
	this._boxNode.appendChild(this._congratulationsNode);
	this._highscoresTableNode = document.createElement("table");
	this._highscoresTableNode.className = "highscores";
	this._boxNode.appendChild(this._highscoresTableNode);
	this._retryButton = document.createElement("button");
	this._retryButton.className = "retry";
	this._retryButton.innerHTML = "Try again?";
	this._boxNode.appendChild(this._retryButton);
	this._highscoresController = new window.HighscoresController();
    };

    GameoverScreen.prototype.attachTo = function (node) {
	this._node.style.display = "none";
	node.appendChild(this._node);
    };

    GameoverScreen.prototype.showWithGameStatistics = function (gameStatistics) {
	this._retryButton.onclick = function () {
	    window.location.reload();
	};

	this._congratulationsNode.innerHTML = "You've scored <span class=\"points\">" + gameStatistics.points + "</span> points!";
	this._node.style.display = "";

	var currentHighscore = {
	    points: gameStatistics.points,
	    time: gameStatistics.gameTime,
	    kills: gameStatistics.kills,
	    name: ""
	};

	this._highscoresController.addHighscore(currentHighscore);

	var highscores = this._highscoresController.highscores();

	this._highscoresTableNode.innerHTML = "<tr><th>#</th><th>Points</th><th>Time</th><th>Kills</th></tr>";

	for (var i = 0; i < highscores.length; i++) {
	    var highscore = highscores[i];
	    var isCurrentHighscore = highscore.points === currentHighscore.points && highscore.time === currentHighscore.time && highscore.kills === currentHighscore.kills && highscore.name === currentHighscore.name;

	    var rowHTML = "<tr" + (isCurrentHighscore ? " class=\"current\"" : "") + "><td>" + (i + 1) + "</td><td>" + highscore.points + "</td><td>" + (highscore.time / 1000).toFixed(1) + "</td><td>" + highscore.kills + "</td></tr>";

	    this._highscoresTableNode.innerHTML = this._highscoresTableNode.innerHTML + rowHTML;
	}
    };

    window.GameoverScreen = GameoverScreen;
}());
