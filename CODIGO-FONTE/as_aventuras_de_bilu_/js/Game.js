class Game {
    constructor(ctxSnake, ctxFood) {
        this.ctxSnake = ctxSnake;
        this.ctxFood = ctxFood;

        this.WORLD_SIZE = WORLD_SIZE
        this.snakes = [];
        this.foods = [];
        this.seconds = 1000;

        this.player = null
    }

    init() {
        this.createPlayer()
        this.addAllEnemies()
        this.generateFoods(GAME_FOOD_QUANTITY);
        this.createCounter();
    }

    createPlayer() {
        this.player = new Player(localStorage.getItem('name'))
    }

    addAllEnemies() {
        for (var i = 0; i < ENEMY_QUANTITY; i++)
            this.addSnake(ut.randomName(), i + 1);
    }

    createCounter() {
        setInterval(() => {
            this.seconds--;
            if (this.seconds === 0) {
                window.location.href = `finish.html?pontos=${this.player.score}`;
            }
        }, 1000);
    }

    draw() {
        //move other snakes
        for (var i = 0; i < this.snakes.length; i++)
            if (this.snakes[i].state === 0) this.snakes[i].move();

        //draw food
        for (var i = 0; i < this.foods.length; i++)
            this.foods[i].draw();

        this.drawScore();

    }

    drawScore() {
        var start = new Point(20, 20);
        if (this.snakes && this.snakes.length > 0) {
            this.ctxSnake.font = "bold 20px Arial";
            this.ctxSnake.fillText(this.player.name + " " + this.player.score + ' pontos' + ', tempo restante: ' + this.seconds + ' segundos', start.x - 5, start.y);
        }
    }

    addSnake(name, id) {
        this.snakes.push(new SnakeAi(this.ctxSnake, name, id, '#000000'))
    }

    generateFoods(quantity) {
        for (var i = 0; i < quantity; i++) {
            this.foods.push(new Food(this.ctxFood, ut.random(50, SCREEN_SIZE.x - 50), ut.random(50, SCREEN_SIZE.y - 50)));
        }
    }

    //check snake and food collission
    checkCollissionFood(player) {
        for (var i = 0; i < game.foods.length; i++) {
            if (
                ut.cirCollission(
                    player.pos.x,
                    player.pos.y,
                    this.player.size,
                    game.foods[i].pos.x,
                    game.foods[i].pos.y,
                    game.foods[i].size
                )
            ) {
                game.foods[i].die();
                this.player.addScore();
            }
        }
    }

}
