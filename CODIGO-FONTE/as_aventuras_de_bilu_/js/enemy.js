class Enemy {
    constructor(ctx) {

        this.ctx = ctx;
        this.velocity = new Point(0, 0); //arbitary point

        this.force = 5;
        this.pos = new Point(ut.random(0, WORLD_SIZE.x), ut.random(0, WORLD_SIZE.y));
        this.angle = ut.random(0, Math.PI);

        this.enemyImage = new Image();
        this.enemyImage.src = IMAGE_ENEMY_SRC;

        this.size = IMAGE_ENEMY_WIDTH / 2;

        setTimeout(() => {
            this.die();
        }, ENEMY_LIFETIME)
    }

    move() {
        this.velocity.x = this.force * Math.cos(this.angle);
        this.velocity.y = this.force * Math.sin(this.angle);
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.drawHeadOneEye();
    }

    die() {
        game.enemies.splice(game.enemies.indexOf(this), 1);
    }

    drawHeadOneEye() {
        var x = this.pos.x;
        var y = this.pos.y;

        this.ctx.drawImage(
            this.enemyImage,
            0,
            0,
            IMAGE_ENEMY_WIDTH,
            IMAGE_ENEMY_HEIGHT,
            x,
            y,
            IMAGE_ENEMY_WIDTH,
            IMAGE_ENEMY_HEIGHT
        );
    }

    checkCollisionPlayer(player) {
        if (
            ut.cirCollission(
                player.pos.x,
                player.pos.y,
                player.size,
                this.pos.x,
                this.pos.y,
                this.size
            )
        ) {
            this.die();
            player.addScore(10);
        }
    }

}
