class Snake {
    constructor(ctx, name, id) {
        this.ctx = ctx;
        this.name = name;
        this.score = 0;
        this.force = 0;
        this.state = 0;

        this.enemyImage = new Image();
        this.enemyImage.src = IMAGE_ENEMY_SRC;

        this.velocity = new Point(0, 0); //arbitary point

        this.size = 20;

        this.position = new Point(0,0)
    }

    addScore() {
        this.score++;
    }
}
