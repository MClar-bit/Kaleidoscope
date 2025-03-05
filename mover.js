
class Mover {
    constructor() {
      this.position = createVector(random(width), random(height));
      this.velocity = createVector();
      this.acceleration = createVector();
      this.topSpeed = 5;
      this.prevPosition = this.position.copy();
      this.edgeWrap = false;
    }
  
    update() {
      let level = amp.getLevel(); // Get current volume level
      let movementFactor = map(level, 0, 1, 0, 3); 
  
      this.acceleration = p5.Vector.random2D();
      this.acceleration.mult(random(1, 2) + movementFactor);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);
    }
  
    show() {
      strokeWeight(2);
      translate(width / 2, height / 2);
  
  
      if (!this.edgeWrap){
        this.reflect();
      }
      this.prevPosition.set(this.position);
      this.edgeWrap = false
    }
  
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

  

  class Shake {
    constructor(intensity = 10) {
      this.intensity = intensity;
      this.shaking = true;
    }

    apply(){
      if (this.shaking){
        let shakeX = random(-this.intensity, this.intensity);
        let shakeY = random(-this.intensity, this.intensity);
        translate(shakeX, shakeY);
      }
    }
  }