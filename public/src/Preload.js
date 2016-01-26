DsH.Preload = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

DsH.Preload.prototype = {
	preload: function () {
		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');
		this.load.spritesheet('start', 'assets/start.png', 200, 60);
		this.load.setPreloadSprite(this.preloadBar);

    /*load assets here*/
	},
	create: function () {
		this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');
	},
	update: function () {
		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('MainMenu');
		// }
	}
};
