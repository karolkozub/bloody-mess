//
//  audio-controller.js
//
//  Created by Karol Kozub on 2014-12-07.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var AudioController = function () {
	this._hurtSounds = [new Audio ("hurt.mp3"), new Audio ("hurt2.mp3"), new Audio ("hurt3.mp3")];
	this._gunSounds = [new Audio ("gun.mp3"), new Audio ("gun.mp3"), new Audio ("gun.mp3"), new Audio ("gun.mp3")];
	this._currentGunSound = 0;
    };

    AudioController.prototype.playGunSound = function () {
	this._gunSounds[this._currentGunSound].play();
	this._currentGunSound = (this._currentGunSound + 1) % this._gunSounds.length;
    };

    AudioController.prototype.playHurtSound = function () {
	var isPlaying = !this._hurtSounds.every(function (sound) {
	    return sound.paused;
	});

	if (!isPlaying) {
	    var index = Math.floor(Math.random() * this._hurtSounds.length);

	    this._hurtSounds[index].play();
	}
    };

    window.AudioController = AudioController;
}());
