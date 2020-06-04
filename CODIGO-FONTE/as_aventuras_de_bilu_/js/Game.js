class Game {
	constructor(ctxSnake, ctxFood, ctxHex) {
		this.ctxSnake = ctxSnake;
		this.ctxFood = ctxFood;
		this.ctxHex = ctxHex;

		this.WORLD_SIZE = new Point(window.innerWidth * 2, window.innerHeight * 2);
		this.SCREEN_SIZE = new Point(window.innerWidth, window.innerHeight);
		this.world = new Point(-1200, -600);
		this.snakes = [];
		this.foods = [];
		this.secconds = 3000;
	}

	init() {
		this.snakes[0] = new Snake(this.ctxSnake, localStorage.getItem('name'), 0);
		for (var i = 0; i < 10; i++) this.addSnake(ut.randomName(), 100);
		this.generateFoods(100);
		setInterval(() => {
			this.secconds--;
			if (this.secconds === 0) {
				window.location.href="gamehomer.html"
			}
		}, 1000);
	}

	draw() {
		//move other snakes
		for (var i = 1; i < this.snakes.length; i++)
			if (this.snakes[i].state === 0) this.snakes[i].move(this.snakes[0]);

		//draw food
		for (var i = 0; i < this.foods.length; i++) this.foods[i].draw(this.snakes[0]);

		this.drawScore();

	}

	drawScore() {
		var start = new Point(20, 20);
		if (this.snakes && this.snakes.length > 0) {
			this.ctxSnake.fillStyle = this.snakes[0].mainColor;
			this.ctxSnake.font = "bold 20px Arial";
			this.ctxSnake.fillText(this.snakes[0].name + " " + this.snakes[0].score + ' pontos' + ', tempo restante: ' + this.secconds + ' segundos',
				start.x - 5, start.y + 0 * 15);
		}
	}

	addSnake(name, id) {
		this.snakes.push(new SnakeAi(this.ctxSnake, name, id, '#000000'))
	}

	generateFoods(n) {
		for (var i = 0; i < n; i++) {
			this.foods.push(new Food(this.ctxFood, ut.random(-1200 + 50, 2800 - 50),
				ut.random(-600 + 50, 1400 - 50)));
		}
	}

}