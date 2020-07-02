var canvas = document.getElementById("canvasSnake");
var canvasFood = document.getElementById("canvasFood");
var canvasHex = document.getElementById("canvasHex");

var ctxSnake = canvas.getContext("2d");
var ctxFood = canvasFood.getContext("2d");

var ut = new Util();
var game = new Game(ctxSnake, ctxFood);
var firebaseInstance = new Firebase(firebase);
var databaseInstance = firebaseInstance.getDatabase();

function start() {

    if (localStorage.getItem(LOCAL_STORAGE_NAME) === null) {
        window.location.href = `index.html`;
    }

    game.init();

    function resizeCanvas() {
        canvas.width = canvasFood.width = canvasHex.width = window.innerWidth;
        canvas.height = canvasFood.height = canvasHex.height =
            window.innerHeight;

        /**
         * Your drawings need to be inside this function otherwise they will be reset when
         * you resize the browser window and the canvas goes will be cleared.
         */
        update();
    }

    // resize the canvas to fill browser window dynamically
    window.addEventListener("resize", resizeCanvas, false);

    resizeCanvas();
}

var updateId,
    previousDelta = 0,
    fpsLimit = 20;
function update(currentDelta) {
    updateId = requestAnimationFrame(update);
    var delta = currentDelta - previousDelta;
    if (fpsLimit && delta < 1000 / fpsLimit) return;
    previousDelta = currentDelta;

    //clear all
    ctxFood.clearRect(0, 0, canvas.width, canvas.height);
    ctxSnake.clearRect(0, 0, canvas.width, canvas.height);

    //draw all
    game.draw();
}

start();
