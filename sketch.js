let mover, amp, song, shake;

let symmetry = 6;
let angle = 360 / symmetry;

let isMoving = false;

var fft;

let r = 0;
let g=0;
let b= 0;
let rdown;

function preload(){
  song = loadSound('everglow.mp3');
}


function setup() {
  angleMode(DEGREES);
  createCanvas(600, 500);
  background(random(255), random(255), random(255));
  mover = new Mover();
  shake = new Shake();
  g = random(255)
  b=random(255)
  song.pause();
  amp = new p5.Amplitude();
  fft = new p5.FFT()
  console.log(fft.waveform())
}

function draw() {

  if (isMoving) {
    
    //push();
    //shake.apply();
    translate(random(-5, 5), random(-5, 5));
    mover.update();
    mover.show();
    mover.checkEdges();

    //pop();

    if (r==255){
      rdown = true;
    } else if(r==0) {
      rdown = false;
    }
    if (rdown) {
      r--;
    } else {
      r++;
    }
  }
  

}

function mousePressed() {
  isMoving = !isMoving
  //shake.shaking = !shake.shaking;
  if (song.isPlaying()) {
    song.pause();
    } else {
    song.play();
    }
}
