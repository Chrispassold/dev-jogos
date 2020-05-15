class SnakeAi extends Snake{
	constructor(ctx, name, id, color){	

		super(ctx, name, id, color, 95);

		this.force = 2;				
		this.pos = new Point(ut.random(-6000, 1800), ut.random(-300, 900));	
		// this.pos = new Point(ut.random(0, 800), ut.random(0, 400));			
		this.length = ut.random(10, 50);	
				
		this.arr = [];
		this.arr.push(this.pos);
		for(var i=1; i<this.length; i++) this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));


		this.initAiMovement();
	}

	initAiMovement(){
		var self = this;	
		var count = 0;
		var units = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
		var unit = 0.5;		
		this.timer = setInterval(function(){		

			if(count > 20){
				self.angle += 0;
				unit = units[ut.random(0, units.length-1)];
			} 
			else if(count > 10) self.angle += unit;
			else if(count > 0) self.angle -= unit;

			count++;
			count %= 30;	
		
		}, 100);
	}


	move(player){
		// this.size += 0.1;
		this.velocity.x = this.force*Math.cos(this.angle);
		this.velocity.y = this.force*Math.sin(this.angle);
		for(var i=this.length-1; i>=1; i--){
			this.arr[i].x = this.arr[i-1].x;
			this.arr[i].y = this.arr[i-1].y;			
			
			//relative motion with player
			this.arr[i].x -= player.velocity.x;
			this.arr[i].y -= player.velocity.y;

			// this.drawBody(this.arr[i].x, this.arr[i].y, i);
		}

		//move head		
		this.arr[0].x += this.velocity.x;
		this.arr[0].y += this.velocity.y;

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		//relative motion with player
		this.arr[0].x -= player.velocity.x;
		this.arr[0].y -= player.velocity.y;

		this.drawHeadOneEye();

		this.ctx.beginPath();
		this.ctx.globalAlpha = 0.5;
		this.ctx.fillStyle = "white";
		if(this.inDanger) this.ctx.fillStyle = "red";
 		this.ctx.arc(this.pos.x, this.pos.y, this.shield, 0, 2*Math.PI);		
		this.ctx.fill();
		this.ctx.globalAlpha = 1;
		
		// super.checkCollissionFood();	
		this.checkCollissionSnake();
		this.checkBoundary();
	}

	checkBoundary(){

		//left
		if(this.arr[0].x < game.world.x) this.arr[0].x = game.world.x + game.WORLD_SIZE.x;

		//right
		else if(this.arr[0].x > game.world.x + game.WORLD_SIZE.x) this.arr[0].x = game.world.x;

		//up
		if(this.arr[0].y < game.world.y) this.arr[0].y = game.world.y + game.WORLD_SIZE.y;

		//down
		else if(this.arr[0].y > game.world.y + game.WORLD_SIZE.y) this.arr[0].y = game.world.y;

	}

	
	die(){
		this.state = 1;
		for (var i = 0; i < this.arr.length; i+=3)game.foods.push(new Food(game.ctxFood,
		this.arr[i].x, this.arr[i].y));

		var index = game.snakes.indexOf(this);		
		game.snakes.splice(i, 1);
	}

	checkCollissionSnake(){
		
	}

	
}