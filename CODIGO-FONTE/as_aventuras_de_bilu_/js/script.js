var canvas = document.getElementById("canvasSnake");
var canvasFood = document.getElementById("canvasFood");
var canvasHex = document.getElementById("canvasHex");

var ctxSnake = canvas.getContext("2d");
var ctxFood = canvasFood.getContext("2d");
var ctxHex = canvasHex.getContext("2d");

var ut = new Util();
var mouseDown = false,
	cursor = new Point(0, 0);
var game = new Game(ctxSnake, ctxFood, ctxHex);

canvas.onmousemove = function(e){
	if(mouseDown){		
		cursor = ut.getMousePos(canvas, e);	
		var ang = ut.getAngle(game.snakes[0].arr[0], cursor);				
		game.snakes[0].changeAngle(ang);		
	}
}

canvas.onmousedown = function(e){
	mouseDown = true;	
}

canvas.onmouseup = function(e){	
	mouseDown = false;
}

function start(){	
	game.init();
	update();

	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas() {
			canvas.width = canvasFood.width = canvasHex.width = window.innerWidth;
			canvas.height = canvasFood.height = canvasHex.height = window.innerHeight;

			/**
			 * Your drawings need to be inside this function otherwise they will be reset when 
			 * you resize the browser window and the canvas goes will be cleared.
			 */
			update(); 
	}
	resizeCanvas();
}


var updateId,	
previousDelta = 0,
fpsLimit = 20;
function update(currentDelta){
	updateId = requestAnimationFrame(update);
	var delta = currentDelta - previousDelta;
    if (fpsLimit && delta < 1000 / fpsLimit) return;
    previousDelta = currentDelta;

    //clear all
	ctxFood.clearRect(0, 0, canvas.width, canvas.height);
	ctxSnake.clearRect(0, 0, canvas.width, canvas.height);
	ctxHex.clearRect(0, 0, canvas.width, canvas.height);

	//draw all
	game.draw();	
}


start();