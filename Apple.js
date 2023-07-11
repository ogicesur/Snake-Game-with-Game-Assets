class Apple {
    constructor(x, y, cellSize, context, assets, extent) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.context = context;
        this.assets = assets;
        this.extent = extent;
    }

    draw() {
        this.context.drawImage(
            this.assets.snake, //seeAssetLoader
            64,
            96,
            32,
            32,
            this.x * this.cellSize,
            this.y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    }

    replaceApple() {
        this.x = Math.floor(Math.random() * this.extent);
        this.y = Math.floor(Math.random() * this.extent);
    }
}