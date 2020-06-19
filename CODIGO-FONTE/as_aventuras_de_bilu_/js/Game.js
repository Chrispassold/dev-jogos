class Game {
    constructor(ctxSnake, ctxFood) {
        this.ctxSnake = ctxSnake;
        this.ctxFood = ctxFood;

        this.WORLD_SIZE = WORLD_SIZE
        this.enemies = [];
        this.foods = [];
        this.seconds = 1000;

        this.player = null
        this.level = 1
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
        for (var i = 0; i < this.enemies.length; i++)
            this.enemies[i].move();

        //draw food
        for (var i = 0; i < this.foods.length; i++)
            this.foods[i].draw();

        this.drawScore();

    }

    drawScore() {
        var start = new Point(20, 20);
        if (this.enemies && this.enemies.length > 0) {
            this.ctxSnake.font = "bold 20px Arial";
            this.ctxSnake.fillText(this.player.name + " " + this.player.score + ' pontos' + ', tempo restante: ' + this.seconds + ' segundos', start.x - 5, start.y);
        }
    }

    addSnake(name, id) {
        this.enemies.push(new Enemy(this.ctxSnake, name, id, '#000000'))
    }

    generateFoods(quantity) {
        console.log("gerando " + quantity + " foods")
        for (var i = 0; i < quantity; i++) {
            this.foods.push(new Food(this.ctxFood, ut.random(50, SCREEN_SIZE.x - 50), ut.random(50, SCREEN_SIZE.y - 50)));
        }
    }

    //check snake and food collission
    checkCollissionEnemy(player) {
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

        if (game.foods.length === 0) {
            this.nextLevel()
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

        if (game.foods.length === 0) {
            this.nextLevel()
        }
    }

    nextLevel() {
        this.level += 1
        this.generateFoods((1 + this.level / 5) * GAME_FOOD_QUANTITY)
    }

}
