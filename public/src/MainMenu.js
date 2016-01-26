DsH.MainMenu = function (game) {
	this.music = null;
	this.playButton = null;
  this.startTxt;
};

DsH.MainMenu.prototype = {
	create: function () {
		// this.music = this.add.audio('titleMusic');
		// this.music.play();
    startTxt=this.add.sprite(32, 30, 'start');
		startTxt.animations.add('init');

    this.input.onDown.addOnce(this.startGame, this);
	},
	update:function(){
		startTxt.animations.play('init', 2);
	},
	startGame: function (pointer) {
		// this.music.stop();
		//	And start the actual game
		this.state.start('Game');
	}
};
