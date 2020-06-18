class Game {
    constructor(ctxSnake, ctxFood) {
        this.ctxSnake = ctxSnake;
        this.ctxFood = ctxFood;

        this.WORLD_SIZE = WORLD_SIZE
        this.SCREEN_SIZE = SCREEN_SIZE
        this.world = new Point(-1200, -600);
        this.snakes = [];
        this.foods = [];
        this.seconds = 2000;
    }

    init() {
        this.snakes[0] = new Snake(this.ctxSnake, localStorage.getItem('name'), 0);
        for (var i = 0; i < ENEMY_QUANTITY; i++) this.addSnake(ut.randomName(), i + 1);

        this.generateFoods(GAME_FOOD_QUANTITY);

        setInterval(() => {
            this.seconds--;
            if (this.seconds === 0) {
                window.location.href = `finish.html?pontos=${this.snakes[0].score}`;
            }
        }, 1000);
    }

    draw() {
        //move other snakes
        for (var i = 1; i < this.snakes.length; i++)
            if (this.snakes[i].state === 0) this.snakes[i].move(this.snakes[0]);

        //draw food
        for (var i = 0; i < this.foods.length; i++) this.foods[i].draw();

        this.drawScore();

    }

    drawScore() {
        var start = new Point(20, 20);
        if (this.snakes && this.snakes.length > 0) {
            this.ctxSnake.fillStyle = this.snakes[0].mainColor;
            this.ctxSnake.font = "bold 20px Arial";
            this.ctxSnake.fillText(this.snakes[0].name + " " + this.snakes[0].score + ' pontos' + ', tempo restante: ' + this.seconds + ' segundos', start.x - 5, start.y);
        }
    }

    addSnake(name, id) {
        this.snakes.push(new SnakeAi(this.ctxSnake, name, id, '#000000'))
    }

    generateFoods(n) {
        for (var i = 0; i < n; i++) {
            this.foods.push(new Food(this.ctxFood, ut.random(50, SCREEN_SIZE.x - 50), ut.random(50, SCREEN_SIZE.y - 50)));
        }
    }

}
