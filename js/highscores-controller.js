//
//  highscores-controller.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var HighscoresController = function () {
	this._maxLength = 10;
	this._localStorageKey = "highscores";
    };

    HighscoresController.prototype.isLocalStorageSupported = function () {
	try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	} catch (exception) {
	    return false;
	}
    };

    HighscoresController.prototype.highscores = function () {
	if (!this.isLocalStorageSupported()) {
	    return [];
	}

	var highscores = [];

	try {
	    var highscoresString = window.localStorage[this._localStorageKey];
	    highscores = highscoresString ? JSON.parse(highscoresString) : [];
	} catch (exception) {
	}

	return (highscores instanceof Array) ? highscores : [];
    };

    HighscoresController.prototype.addHighscore = function (highscore) {
	if (!this.isLocalStorageSupported()) {
	    return;
	}

	var highscores = this.highscores();

	highscores.push({
	    points: highscore.points,
	    time: highscore.time,
	    kills: highscore.kills,
	    name: highscore.name
	});

	highscores.sort(function (a, b) {
	    return b.points - a.points;
	});

	while (highscores.length > this._maxLength) {
	    highscores.pop();
	}

	window.localStorage[this._localStorageKey] = JSON.stringify(highscores);
    };

    window.HighscoresController = HighscoresController;
}());
