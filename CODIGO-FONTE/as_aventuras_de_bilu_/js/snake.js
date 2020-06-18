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
        this.countFoodDie = 0;

        this.position = new Point(0,0)

    }

    move() {
        this.checkCollissionFood();
    }

    //check snake and food collission
    checkCollissionFood() {
        var x = this.position.x;
        var y = this.position.y;

        for (var i = 0; i < game.foods.length; i++) {
            if (
                ut.cirCollission(
                    x,
                    y,
                    this.size,
                    game.foods[i].pos.x,
                    game.foods[i].pos.y,
                    game.foods[i].size
                )
            ) {
                game.foods[i].die();
                this.countFoodDie++;
                this.addScore();
            }
        }
    }

    addScore() {
        this.score++;
    }
}
