let mover, amp, song, shake, beat;

let symmetry = 6;
let angle = 360 / symmetry;

let isMoving = false;

var fft;

let r = 0;
let g=0;
let b= 0;
let rdown;

let canvas;


function preload(){
  song = loadSound('everglow.mp3');
}


function setup() {
  angleMode(DEGREES);
  canvas = createCanvas(600, 500);
  canvas.position(100, 100);
  background(random(255), random(255), random(255));
  mover = new Mover();
  shake = new Shake();
  g = random(255)
  b=random(255)
  song.pause();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.8, 64); 
  song.setVolume(1); 
  fft.setInput(song)

}

function draw() {

  if (isMoving) {
    
    translate(random(-5, 5), random(-5, 5));
    mover.update();
    mover.show();
    mover.checkEdges();

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

    fft.analyze()
  beat = fft.getEnergy(20, 200);

  if (beat > 260) { 
    let shakeX = random(-5, 5);
    let shakeY = random(-5, 5);
    canvas.position(100 + shakeX, 100 + shakeY);
  }
  }
  

}

function mousePressed() {
  isMoving = !isMoving

  if (song.isPlaying()) {
    song.pause();
    } else {
    song.play();
    }
}
