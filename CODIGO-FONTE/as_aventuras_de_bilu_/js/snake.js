class Snake {
    constructor(ctx, name, id) {
        this.ctx = ctx;
        this.name = name;
        this.score = 0;
        this.force = 0;
        this.state = 0;

        this.enemyImage = new Image();
        this.enemyImage.src = IMAGE_ENEMY_SRC;

        //
        this.pos = new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2);
        this.velocity = new Point(0, 0); //arbitary point
        this.angle = ut.random(0, Math.PI);

        this.length = 10;
        this.size = 7;
        this.countFoodDie = 0;

        this.position = new Point(0,0)

        if (!this.isAi()) {
            document.onmousemove = (event) => {
                this.position.x = event.clientX;
                this.position.y = event.clientY;
                this.move();
            };
        }
    }

    isAi() {
        return this instanceof SnakeAi;
    }

    move() {
        this.velocity.x = this.force * Math.cos(this.angle);
        this.velocity.y = this.force * Math.sin(this.angle);
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.checkCollissionFood();
        // this.checkCollissionSnake();
        this.checkBoundary();
    }

    checkBoundary() {

        //left
        if (this.position.x < game.world.x) {
            this.velocity.x *= -1;
            this.angle = Math.PI - this.angle;
        }

        //right
        else if (this.position.x > game.world.x + game.WORLD_SIZE.x) {
            this.velocity.x *= -1;
            this.angle = Math.PI - this.angle;
        }

        //up
        else if (this.position.y < game.world.y) {
            this.velocity.y *= -1;
            this.angle = Math.PI - this.angle;
        }

        //down
        else if (this.position.y > game.world.y + game.WORLD_SIZE.y) {
            this.velocity.y *= -1;
            this.angle = Math.PI - this.angle;
        }
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

    // checkCollissionSnake() {
    //     var x = this.position.x;
    //     var y = this.position.y;
    //     for (var i = 0; i < game.snakes.length; i++) {
    //         var s = game.snakes[i];
    //         if (s !== this) {
    //             for (var j = 0; j < game.snakes[i].arr.length; j += 2) {
    //                 if (
    //                     ut.cirCollission(x, y, this.size, s.arr[j].x, s.arr[j].y, s.size)
    //                 ) {
    //                     if (this.size > s.size) {
    //                         s.die();
    //                     } else {
    //                         this.die();
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    addScore() {
        this.length++;
        this.score++;
    }

    die() {
        this.state = 1;
        for (var i = 0; i < this.arr.length; i += 3)
            game.foods.push(new Food(game.ctxFood, 0, 0));

        var index = game.snakes.indexOf(this);
        game.snakes.splice(i, 1);
    }
}
