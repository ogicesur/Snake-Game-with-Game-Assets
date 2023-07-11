class Game {
    constructor(canvas, extent, assets) {
        this.assets = assets;
        this.canvas = canvas;
        this.extent = extent;
        this.context = this.canvas.getContext('2d');
        this.cellSize = this.canvas.width / this.extent;
        this.frameCount = 0;
        this.movementSpeed = 30;  //original speed = 15
        this.apple = new Apple(Math.floor(Math.random() * this.extent), Math.floor(Math.random() * this.extent), this.cellSize, this.context, this.assets, this.extent);
        this.snakeHandler = new SnakeHandler(1, 3, 'ArrowRight', this.cellSize, this.context, this.assets, this.movementSpeed, this.apple);
        setInterval(this.loop.bind(this), 33);
    }
    
    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }
    
    drawGrid() {
        for(let i = 0; i < this.extent; i++){
            for(let j = 0; j < this.extent; j++){
                this.context.drawImage(
                    this.assets.snake, //seeAssetLoader
                    96,
                    96,
                    32,
                    32,
                    i * this.cellSize,
                    j * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
    }
    
    draw() {
        if(this.frameCount % this.movementSpeed === 0) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawGrid();
            this.snakeHandler.draw();
            this.apple.draw();
        }
    }

    update() {
        this.snakeHandler.update(this.frameCount);
    }

    loop() {
        this.update();
        this.draw();
        this.frameCount += 1;
    }
}

new AssetLoader()
  .loadAssets([{ name: 'snake', url: 'snake.png' }])
  .then(assets => {
   const game = new Game(document.getElementById('myCanvas'), 8, assets);
  });