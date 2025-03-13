//Created a class for the movers, so that it doesn't clutter the program. 
class Mover {

    constructor() {
      this.position = createVector(random(width), random(height));
      this.velocity = createVector();
      this.acceleration = createVector();
      this.topSpeed = 5;
      this.prevPosition = this.position.copy();
      this.edgeWrap = false;
    }

  //Updates the mover to move each time the program loops.
    update() {
      let level = amp.getLevel();
      let moveFactor = map(level, 0, 1, 0, 3); 
  
      this.acceleration = p5.Vector.random2D();
      this.acceleration.mult(random(1, 2) + moveFactor);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);
    }
  
    show() {
      strokeWeight(2);
      translate(width / 2, height / 2);

      //If the program is not at the edge, creates lines 
      if (!this.edgeWrap){
        this.reflect();
      }
      this.prevPosition.set(this.position);
      this.edgeWrap = false
    }
  
    //Creates the lines and reflects/rotates the lines 
    reflect(){
       for (let i = 0; i < symmetry; i++) {
         rotate(angle);
         stroke(r, g, b)
         line(this.prevPosition.x-width/2, this.prevPosition.y-height / 2, this.position.x-width/2, this.position.y-height / 2);
  
          push();
          scale(1, -1);
          line(this.prevPosition.x-width/2, this.prevPosition.y-height / 2, this.position.x-width/2, this.position.y-height / 2);
          pop();
      }
    }

  //Checks if the mover is at the edge and moves the mover to the other edge
    checkEdges() {
      if (this.position.x > width) {
        this.position.x = 0;
        this.edgeWrap=true
      } else if (this.position.x < 0) {
        this.position.x = width;
        this.edgeWrap=true;
      }
  
      if (this.position.y > height) {
        this.position.y = 0;
        this.edgeWrap=true
      } else if (this.position.y < 0) {
        this.position.y = height;
        this.edgeWrap=true;
      }
    }
  }

  
