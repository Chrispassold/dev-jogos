class Snake {
    constructor(ctx, name, id) {
        this.ctx = ctx;
        this.name = name;
        this.state = 0;
        this.velocity = new Point(0, 0); //arbitary point
        this.position = new Point(0,0)
    }
}
