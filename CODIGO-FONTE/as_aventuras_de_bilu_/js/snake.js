class Snake {
  constructor(ctx, name, id, mainColor, max) {
    this.ctx = ctx;
    this.name = name;
    this.id = id;
    this.score = 0;
    this.force = 0;
    this.state = 0;
    this.headType = ut.random(0, 2);

    this.enemyImage = new Image();
    this.enemyImage.src = IMAGE_ENEMY_SRC;

    //
    this.pos = new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2);
    this.velocity = new Point(0, 0); //arbitary point
    this.angle = ut.random(0, Math.PI);

    this.length = 10;
    this.MAXSIZE = max ? max : 100;
    this.size = 7;
    this.countFoodDie = 0;

    // color
    this.mainColor = mainColor || "#FFFFFF";
    this.midColor = ut.color(this.mainColor, 0.33);
    this.supportColor = ut.color(this.midColor, 0.33);

    this.arr = [];
    this.arr.push(new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2));
    for (var i = 1; i < this.length; i++) {
      this.arr.push(new Point(this.arr[i - 1].x, this.arr[i - 1].y));
    }

    if (!this.isAi()) {
      document.onmousemove = (event) => {
        this.arr[0].x = event.clientX;
        this.arr[0].y = event.clientY;
        this.move();
      };
    }
  }

  isAi() {
    return this instanceof SnakeAi;
  }

  drawHeadOneEye() {
    var x = this.arr[0].x;
    var y = this.arr[0].y;

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

  drawBody(x, y, i) {
    var grd = this.ctx.createRadialGradient(x, y, 2, x + 4, y + 4, 10);
    grd.addColorStop(0, this.supportColor);
    grd.addColorStop(1, this.midColor);

    var radius = this.size - i * 0.1;
    if (radius < 0) radius = 1;

    this.ctx.beginPath();
    this.ctx.fillStyle = this.mainColor;
    this.ctx.arc(x, y, radius + 1, 0, 0);
    this.ctx.fill();

    this.ctx.fillStyle = grd;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 5);
    this.ctx.fill();
  }

  move() {
    this.velocity.x = this.force * Math.cos(this.angle);
    this.velocity.y = this.force * Math.sin(this.angle);

    //magic
    var d = this.size / 2;
    if (this.isAi()) {
      for (var i = this.length - 1; i >= 1; i--) {
        this.arr[i].x = this.arr[i - 1].x - d * Math.cos(this.angle);
        this.arr[i].y = this.arr[i - 1].y - d * Math.sin(this.angle);
        this.drawBody(this.arr[i].x, this.arr[i].y, i);
      }
    }

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    this.drawHeadOneEye();
    this.checkCollissionFood();
    this.checkCollissionSnake();
    this.checkBoundary();
  }

  checkBoundary() {
    //left
    if (this.arr[0].x < game.world.x) {
      this.pos.x = game.world.x + this.size * 2;
      this.velocity.x *= -1;
      this.angle = Math.PI - this.angle;
    }

    //right
    else if (this.arr[0].x > game.world.x + game.WORLD_SIZE.x) {
      this.pos.x = game.world.x + game.WORLD_SIZE.x - this.size * 2;
      this.velocity.x *= -1;
      this.angle = Math.PI - this.angle;
    }

    //up
    else if (this.arr[0].y < game.world.y) {
      this.pos.y = game.world.y + this.size * 2;
      this.velocity.y *= -1;
      this.angle = Math.PI - this.angle;
    }

    //down
    else if (this.arr[0].y > game.world.y + game.WORLD_SIZE.y) {
      this.pos.y = game.world.y + game.WORLD_SIZE.y - this.size * 2;
      this.velocity.y *= -1;
      this.angle = Math.PI - this.angle;
    }
  }

  //check snake and food collission
  checkCollissionFood() {
    var x = this.arr[0].x;
    var y = this.arr[0].y;
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

  checkCollissionSnake() {
    var x = this.arr[0].x;
    var y = this.arr[0].y;
    for (var i = 0; i < game.snakes.length; i++) {
      var s = game.snakes[i];
      if (s !== this) {
        for (var j = 0; j < game.snakes[i].arr.length; j += 2) {
          if (
            ut.cirCollission(x, y, this.size, s.arr[j].x, s.arr[j].y, s.size)
          ) {
            if (this.size > s.size) {
              s.die();
            } else {
              this.die();
            }
          }
        }
      }
    }
  }

  addScore() {
    this.length++;
    this.score++;
    this.arr.push(new Point(-100, -100));
  }

  incSize() {
    if (this.countFoodDie == 5) {
      this.size++;
      this.countFoodDie = 0;
    }
    if (this.size > this.MAXSIZE) this.size = this.MAXSIZE;
  }

  changeAngle(angle) {
    this.angle = angle;
  }

  die() {
    this.state = 1;
    for (var i = 0; i < this.arr.length; i += 3)
      game.foods.push(new Food(game.ctxFood, 0, 0));

    var index = game.snakes.indexOf(this);
    game.snakes.splice(i, 1);
  }
}
