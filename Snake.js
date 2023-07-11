//calls collision checks
//initialized by Game.js

class Snake {
    constructor(x, y) {
        this.head = new SnakeSegment(null, x, y);
        this.add(1, 0);
        this.add(1, 0);
    }

    add(relX, relY) {
        console.log( "info add - go x:" + relX + " y:" + relY );
        if (this.head === undefined){ //debug
            console.log( "Snake constructor flag-2 RED undefined" );
        }

        let newSegment = new SnakeSegment(this.head, relX, relY); //knows parent
        this.head.setChild(newSegment); //parent knows child
        this.head = newSegment; //child is new king

        if (this.head === undefined){ //debug
            console.log( "CRITICAL-2 add: undefined" );
        } else {
            console.log( "Snake constructor flag-2 GREEN" );
        }

        if(newSegment.checkWallCollision()){
            alert("Game Over!");
        }

        if(newSegment.checkSelfCollision(newSegment)){
            alert("Game Over!");
        }
    }

    removeTailSegment() {
        let current = this.head; //start
        while (current.parent !== null) { //go to tail
            current = current.parent;
        }
        current = current.child; //go back to child of tail
        current.killParent(); //finish the job
    }

    getPositions() {
        let positions = new Array();
        let current = this.head; //start

        let loop = true;
        while ((current !== null) && (current !== undefined) && loop) { //foreach
            let xy = [current.x,current.y];
            positions.push(xy);
            console.log( "info getPositions x:" + xy[0] + " y:" + xy[1]);
            if(current.hasParent()){ //not tail
                current = current.parent;
            } else {
                loop = false;
            }
        }
        return positions;
    }
}