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

//Loads the song
function preload(){
  song = loadSound('everglow.mp3');
}


function setup() {
  angleMode(DEGREES);
  canvas = createCanvas(600, 500);
  canvas.position(100, 100);
  background(random(255), random(255), random(255));
  mover = new Mover();

  g = random(255)
  b=random(255)


  song.pause();

  //Measures sound aspects 
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.8, 64); 
  fft.setInput(song)

}

function draw() {

//Checks if the program is running
  if (isMoving) {
    
    
    translate(random(-5, 5), random(-5, 5));


    mover.update();
    mover.show();
    mover.checkEdges();

    //Creates random color for the line - I plan to create a class to create various colors based on music
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

    //Analyze the FFT levels and returns value
    fft.analyze()
    beat = fft.getEnergy(20, 200);
    console.log(beat);

    if (beat > 250) { 
      let shakeX = random(-5, 5);
      let shakeY = random(-5, 5);
      canvas.position(100 + shakeX, 100 + shakeY);
    }
  }
  

}

//When  clicked, pauses the program. 
function mousePressed() {
  isMoving = !isMoving

  if (song.isPlaying()) {
    song.pause();
    } else {
    song.play();
    }
}
