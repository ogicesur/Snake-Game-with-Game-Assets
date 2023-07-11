//offers collision check methods
//double linked
//initialized by Snake.js

class SnakeSegment{
    constructor (parent, relX, relY){
        this.mapSize = 8;
        this.child = null;

        if(parent === null || parent === undefined){ //GameStart
            this.x = relX;
            this.y = relY;
            this.parent = null;
            console.log("SnakeSegmentParent constructor parentNULL-flag");
        } else {
            this.parent = parent;
            this.x = parent.x + relX;
            this.y = parent.y + relY;
            console.log("SnakeSegment constructor parentSET-flag");
        }
        console.log("New segment added to " + this.x + "|" + this.y );
    }

    setChild(child){
        this.child = child;
    }

    hasParent(){
        if((this.parent !== undefined) && (this.parent !== null)) {
            return true;
        } else {
            return false;
        }
    }

    killParent(){
        this.parent = null;
    }

    checkWallCollision(){
        if (    this.x > this.mapSize - 1
            ||  this.y > this.mapSize - 1
            ||  this.x < 0
            ||  this.y < 0
            ){
                console.log("wall collision");
                return true;
            }
    }

    //recursive
    //requires child|parent setup to be complete
    checkSelfCollision(newSegment){
        if(this.parent === null) { //tail
            return false;
        }
        if(newSegment.x === this.x && newSegment.y === this.y){
            if(this.child === null) { //head
                return this.parent.checkSelfCollision(newSegment);
            } else {
                console.log("cannibalism");
                return true;
            }
        } else {
            console.log( "info checkSelfCollision " + this.parent);
            return this.parent.checkSelfCollision(newSegment);
        }
    }
}