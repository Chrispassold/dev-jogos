class Food {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.pos = new Point(x, y);
        this.sizeMin = 5;
        this.sizeMax = 10;
        this.mainColor = ut.randomColor();
        this.supportColor = ut.color(this.mainColor, 0.5);
        this.size = ut.random(this.sizeMin, this.sizeMax);
    }

    draw() {
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = this.mainColor;
        this.ctx.beginPath();
        this.ctx.arc(parseInt(this.pos.x), parseInt(this.pos.y), this.size, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = this.supportColor;
        this.ctx.beginPath();
        this.ctx.arc(parseInt(this.pos.x), parseInt(this.pos.y), this.size / 2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    die() {
        game.foods.splice(game.foods.indexOf(this), 1);
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
            player.addScore();
        }
    }

}
