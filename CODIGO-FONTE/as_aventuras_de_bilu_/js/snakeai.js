class SnakeAi extends Snake {
    constructor(ctx, name, id, color) {

        super(ctx, name, id, color, 95);

        this.force = 4;
        this.pos = new Point(ut.random(0, WORLD_SIZE.x), ut.random(0, WORLD_SIZE.y));
        this.length = ut.random(40, 50);

        this.initAiMovement();
    }

    initAiMovement() {
        var self = this;
        var count = 0;
        var units = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
        var unit = 0.5;
        setInterval(function () {

            if (count > 20) {
                self.angle += 0;
                unit = units[ut.random(0, units.length - 1)];
            } else if (count > 10) self.angle += unit;
            else if (count > 0) self.angle -= unit;

            count++;
            count %= 30;

        }, 100);
    }


    move(player) {
        super.move()
        this.drawHeadOneEye();
        // this.checkCollissionSnake();
    }

    drawHeadOneEye() {
        var x = this.pos.x;
        var y = this.pos.y;

        if (this.isAi()) {
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
    }
}
