class SnakeHandler {
    constructor(x, y, pressedKey, cellSize, context, assets, movementSpeed, apple) {
        this.assets= assets;
        console.log("info SnakeHandler constructor");

        this.pressedKey = pressedKey;
        this.cellSize = cellSize;
        this.context = context;
        this.movementSpeed = movementSpeed;
        this.spriteSize = 32;
        this.apple = apple;
        this.spritePositions = {
            ArrowUp: {x: 0, y: 0},
            ArrowDown: {x: this.spriteSize * 2, y: 0},
            ArrowRight:{x: this.spriteSize, y: 0},
            ArrowLeft: {x: this.spriteSize * 3, y: 0}
        }; 
        this.tailPositions = {
            up: { x: 0, y: this.spriteSize },
            down: { x: this.spriteSize * 2, y: this.spriteSize},
            right: { x: this.spriteSize, y: this.spriteSize},
            left: { x: this.spriteSize * 3, y: this.spriteSize }
        };
        this.bodyPositions = {
            vertical: { x: 0, y: this.spriteSize * 3},
            horizontal: { x: this.spriteSize, y: this.spriteSize * 3},
            rightToDown: { x: this.spriteSize * 2, y: this.spriteSize * 2},
            leftToDown: { x: this.spriteSize, y: this.spriteSize * 2},
            leftToUp: { x: 0, y: this.spriteSize * 2},
            rightToUp: { x: this.spriteSize * 3, y: this.spriteSize * 2}
        };
        this.direction = 'right';
        this.body = 'horizontal';
        this.snake = new Snake(x, y);

        //EventListener with Arrow-Function
        document.addEventListener('keyup', event => {
            this.handleKeyUp(event);
        });

        console.log("info SnakeHandler initialized.");
    }

    getDirection(segment1, segment2) {
        if (segment1[0] < segment2[0]) {
            return 'right';
        } else if (segment1[0] > segment2[0]) {
            return 'left';
        } else if (segment1[1] < segment2[1]) {
            return 'down';
        } else {
            return 'up';
        }
    }

    update(frameCount) {
        let relX = 0;
        let relY = 0;
        if(frameCount % this.movementSpeed === 0) {
            switch (this.pressedKey) {
                case 'ArrowUp':
                    relY = -1;
                    break;
                case 'ArrowDown':
                    relY = 1;
                    break;
                case 'ArrowLeft':
                    relX = -1;
                    break;
                case 'ArrowRight':
                    relX = 1;
                    break;
            }
            this.snake.add(relX,relY);
            if(!(this.apple.x === this.snake.head.x && this.apple.y === this.snake.head.y)) {
                this.snake.removeTailSegment();
            } else {
                this.apple.replaceApple();
            }
        }
    }

    draw(){
        let positions = this.snake.getPositions();
        let xHead = positions[0][0];
        let yHead = positions[0][1];
        this.drawHead(xHead, yHead);
        for (let i = 1; i < positions.length - 1; i++) {
            let xSeg = positions[i][0];
            let ySeg = positions[i][1];
            this.drawSegment(xSeg, ySeg, i);
        }
        let xTail = positions[positions.length - 1][0];
        let yTail = positions[positions.length - 1][1];
        this.drawTail(xTail, yTail);
    }

    drawHead(x, y) {
        const canvasX = x * this.cellSize;
        const canvasY = y * this.cellSize;
        this.context.drawImage(
            this.assets.snake, //seeAssetLoader
            this.spritePositions[this.pressedKey].x,
            this.spritePositions[this.pressedKey].y,
            32,
            32,
            canvasX,
            canvasY,
            this.cellSize,
            this.cellSize
        );
    }

    drawSegment(x, y, index) {
        const canvasX = x * this.cellSize;
        const canvasY = y * this.cellSize;
        let positions = this.snake.getPositions();
        if (index > 0 && index < positions.length - 1) {
            let prevSegment = positions[index - 1];
            let currSegment = positions[index];
            let nextSegment = positions[index + 1];

            let prevDirection = this.getDirection(prevSegment, currSegment);
            let nextDirection = this.getDirection(currSegment, nextSegment);

            if (prevDirection === 'left' && nextDirection === 'up' || prevDirection === 'down' && nextDirection === 'right') {
                this.body = 'leftToUp';
            } else if (prevDirection === 'right' && nextDirection === 'up' || prevDirection === 'down' && nextDirection === 'left') {
                this.body = 'rightToUp';
            } else if (prevDirection === 'left' && nextDirection === 'down' || prevDirection === 'up' && nextDirection === 'right') {
                this.body = 'leftToDown';
            } else if (prevDirection === 'right' && nextDirection === 'down' || prevDirection === 'up' && nextDirection === 'left') {
                this.body = 'rightToDown';
            } else if (prevDirection === nextDirection && (prevDirection === 'left' || prevDirection === 'right')) {
                this.body = 'horizontal';
            } else if (prevDirection === nextDirection && (prevDirection === 'up' || prevDirection === 'down')) {
                this.body = 'vertical';
            }
        }

        this.context.drawImage(
            this.assets.snake, 
            this.bodyPositions[this.body].x,
            this.bodyPositions[this.body].y,
            32,
            32,
            canvasX,
            canvasY,
            this.cellSize,
            this.cellSize
        );  
    }

    drawTail(x, y) {
        const canvasX = x * this.cellSize;
        const canvasY = y * this.cellSize;
        let positions = this.snake.getPositions();
        if (positions[positions.length - 1][1] + 1 === positions[positions.length - 2][1]){
            this.direction = 'down';
        } else if (positions[positions.length - 1][1] - 1 === positions[positions.length - 2][1]){
            this.direction = 'up';
        } else if (positions[positions.length - 1][0] + 1 === positions[positions.length - 2][0]){
            this.direction = 'right';
        } else if (positions[positions.length - 1][0] - 1 === positions[positions.length - 2][0]){
            this.direction = 'left';
        }
        this.context.drawImage(
            this.assets.snake, //seeAssetLoader
            this.tailPositions[this.direction].x,
            this.tailPositions[this.direction].y,
            32,
            32,
            canvasX,
            canvasY,
            this.cellSize,
            this.cellSize
        );
    }

    handleKeyUp(event) {
        if (event.code === 'ArrowRight' || 
            event.code === 'ArrowLeft' || 
            event.code === 'ArrowUp' || 
            event.code === 'ArrowDown') {
            this.pressedKey = event.code;
        }
    }
}
