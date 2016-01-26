DsH = {

};

DsH.Game=function(game){
  this.scoreText;
  this.score=0;
  this.platforms;
  this.player;
  this.cursors;
  this.stars;
};

DsH.Game.prototype={
  preload:function(){
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },
  create:function(){
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'sky');

    platforms = this.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, this.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    player = this.add.sprite(32, this.world.height - 150, 'dude');

    this.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.add.group();

    stars.enableBody = true;

    for (var i = 0; i < 12; i++){
        var star = stars.create(i * 70, 0, 'star');

        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    this.scoreText=this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  },
  update:function(){
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(stars, platforms);
    this.physics.arcade.overlap(player, stars, this.collectStar, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }else if (cursors.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }else{
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -350;
    }
  },
  collectStar:function(player, star) {
      star.kill();
      this.score += 10;
      this.scoreText.text = 'Score: ' + this.score;
  }
};
