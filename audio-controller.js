//
//  audio-controller.js
//
//  Created by Karol Kozub on 2014-12-07.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    var AudioController = function () {
	this._deathSound = new Audio("death.mp3");
	this._powerupSound = new Audio("powerup.mp3");
	this._reloadSound = new Audio("reload.mp3");
	this._hurtSounds = [new Audio("hurt.mp3"), new Audio("hurt2.mp3"), new Audio("hurt3.mp3")];
	this._enemyHurtSounds = [];
	this._gunSounds = [];
	this._currentGunSound = 0;
	this._currentEnemyHurtSound = 0;

	for (var i = 0; i < 10; i++) {
	    var gunSound = new Audio("gun.mp3");
	    gunSound.volume = 0.5;

	    this._enemyHurtSounds.push(new Audio("enemy-hurt.mp3"));
	    this._gunSounds.push(gunSound);
	}
    };

    AudioController.prototype.playGunSound = function () {
	this._gunSounds[this._currentGunSound].play();
	this._currentGunSound = (this._currentGunSound + 1) % this._gunSounds.length;
    };

    AudioController.prototype.playEnemyHurtSound = function () {
	this._enemyHurtSounds[this._currentEnemyHurtSound].play();
	this._currentEnemyHurtSound = (this._currentEnemyHurtSound + 1) % this._enemyHurtSounds.length;
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

    AudioController.prototype.playDeathSound = function () {
	this._deathSound.play();
    };

    AudioController.prototype.playPowerupSound = function () {
	this._powerupSound.play();
    };

    AudioController.prototype.playReloadSound = function () {
	this._reloadSound.play();
    };

    window.AudioController = AudioController;
}());
