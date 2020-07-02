class Game {
    constructor(ctxSnake, ctxFood) {
        this.ctxSnake = ctxSnake;
        this.ctxFood = ctxFood;

        this.enemies = [];
        this.foods = [];
        this.seconds = GAME_TIMEOUT;

        this.player = null;
        this.level = 1;
    }

    init() {
        this.createPlayer();
        this.generateFoods(GAME_FOOD_QUANTITY);
        this.createCounter();

        setInterval(() => {
            //gerar randomicamente
            if (ut.random(0, 1000) > 800) {
                this.createEnemy();
            }
        }, ENEMY_LIFETIME);
    }

    createPlayer() {
        this.player = new Player(localStorage.getItem(LOCAL_STORAGE_NAME));
    }

    createCounter() {
        setInterval(() => {
            this.seconds--;
            if (this.seconds === 0) {
                this.endGame();
            }
        }, 1000);
    }

    endGame() {
        databaseInstance.writeScore(
            this.player.name,
            this.player.score,
            this.level
        );
        window.location.href = `finish.html?pontos=${this.player.score}`;
    }

    draw() {
        //draw food
        this.foods.forEach((item) => {
            item.draw();
            item.checkCollisionPlayer(game.player);
        });

        //move other snakes
        this.enemies.forEach((item) => {
            item.move();
            item.checkCollisionPlayer(game.player);
        });

        this.drawScore();

        if (this.foods.length === 0) {
            this.nextLevel();
        }
    }

    drawScore() {
        var start = new Point(20, 20);
        this.ctxSnake.font = "bold 20px Arial";
        this.ctxSnake.fillText(
            this.player.name +
                " " +
                this.player.score +
                " pontos" +
                ", tempo restante: " +
                this.seconds +
                " segundos",
            start.x - 5,
            start.y
        );
    }

    createEnemy() {
        this.enemies.push(new Enemy(this.ctxSnake, "", "", "#000000"));
    }

    generateFoods(quantity) {
        console.log("gerando " + quantity + " foods");
        for (var i = 0; i < quantity; i++) {
            this.foods.push(
                new Food(
                    this.ctxFood,
                    ut.random(50, SCREEN_SIZE.x - 50),
                    ut.random(50, SCREEN_SIZE.y - 50)
                )
            );
        }
    }

    nextLevel() {
        this.level += 1;
        this.generateFoods((1 + this.level / 5) * GAME_FOOD_QUANTITY);
    }
}
