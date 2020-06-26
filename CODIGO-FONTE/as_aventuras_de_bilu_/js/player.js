class Player {

    constructor(name) {
        this.name = name;
        this.score = 0;
        this.pos = new Point(0, 0);
        this.size = 20;

        document.onmousemove = (event) => {
            this.pos.x = event.clientX;
            this.pos.y = event.clientY;
        };
    }

    addScore(multipler) {
        this.score += multipler || 1
    }

}
