let mover;

let symmetry = 6;
let angle = 360 / symmetry;

let lineArr = [];

let r = 0;
let g=0;
let b= 0;
let rdown;

function setup() {
  angleMode(DEGREES);
  createCanvas(600, 500);
  background(0);
  mover = new Mover();
}

function draw() {
  translate(random(-5, 5), random(-5, 5));
  mover.update();
  mover.show();
  mover.checkEdges();
  if (r==255){
    rdown = true;
  } else if(r==0) {
    rdown = false;
  }
  if (rdown == true) {
    r--;
  } else {
    r++;
  }

}

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
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(random(2));
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
  }

  show() {
    strokeWeight(2);
    translate(width / 2, height / 2);


    if (this.edgeWrap==false){
      this.reflect();
    }
    this.prevPosition.set(this.position);
    this.edgeWrap = false
  }

  reflect(){
     for (let i = 0; i < symmetry; i++) {
       rotate(angle);
       stroke(r, 0, 100)
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
