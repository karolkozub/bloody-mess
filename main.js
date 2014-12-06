//
//  main.js
//
//  Created by Karol Kozub on 2014-12-06.
//  Copyright (c) 2014 Karol Kozub. All rights reserved.
//

(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function(){
	var game = new window.Game();

	game.attachTo(document.body);
	game.start();
    });
}());
