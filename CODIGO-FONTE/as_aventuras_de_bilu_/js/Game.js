class Game {
	constructor(ctxSnake, ctxFood, ctxHex) {
		this.ctxSnake = ctxSnake;
		this.ctxFood = ctxFood;
		this.ctxHex = ctxHex;

		this.WORLD_SIZE = new Point(window.innerWidth*2, window.innerHeight*2);
		this.SCREEN_SIZE = new Point(window.innerWidth, window.innerHeight);
		this.world = new Point(-1200, -600);
		this.snakes = [];
		this.foods = [];
		this.bricks = [];
	}

	init() {
		this.snakes[0] = new Snake(this.ctxSnake, "Bibhuti", 0);
		for (var i = 0; i < 10; i++) this.addSnake(ut.randomName(), 100);
		this.generateFoods(20);
	}

	draw() {
		//move other snakes
		for (var i = 1; i < this.snakes.length; i++)
			if (this.snakes[i].state === 0) this.snakes[i].move(this.snakes[0]);

		//draw food
		for (var i = 0; i < this.foods.length; i++) this.foods[i].draw(this.snakes[0]);

	}

	drawMap() {

		this.ctxSnake.globalAlpha = 0.5;

		var mapSize = new Point(100, 50);
		var start = new Point(20, this.SCREEN_SIZE.y - mapSize.y - 10);
		this.ctxSnake.fillStyle = "white";
		this.ctxSnake.fillRect(start.x, start.y, mapSize.x, mapSize.y);
		this.ctxSnake.fill();

		this.ctxSnake.globalAlpha = 1;


		//draw all player in map	
		for (var i = 0; i < this.snakes.length; i++) {
			var playerInMap = new Point(start.x + (mapSize.x / this.WORLD_SIZE.x) * this.snakes[i].pos.x,
				start.y + (mapSize.y / this.WORLD_SIZE.y) * this.snakes[i].pos.y);

			// console.log(playerInMap);
			this.ctxSnake.fillStyle = this.snakes[i].mainColor;
			this.ctxSnake.beginPath();
			this.ctxSnake.arc(start.x + playerInMap.x, playerInMap.y + 10, 2, 0, 2 * Math.PI);
			this.ctxSnake.fill();
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