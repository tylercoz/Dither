let video;

function preload() {
  img = loadImage("assets/mountains.jpg");
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);

  video = createVideo("assets/ski.MOV", vidLoad);
}

function vidLoad() {
  video.loop();
  video.volume(0);
}

function dither() {
  //put image on screen
  image(video, 0, 0, width, height);
  //take pixels from screen
  loadPixels();

  // let threshold = [0, 3, 
  //                  1, 2];
  
  // let threshold = [0, 8, 2, 10,
  //                 12, 4, 14, 6,
  //                 3, 11, 1,  9, 
  //                 15, 7, 13, 5];

  let threshold= [0,48,12,60, 3,51,15,63,
                  32,16,44,28,35,19,47,31,
                   8,56, 4,52,11,59, 7,55,
                  40,24,36,20,43,27,39,23,
                   2,50,14,62, 1,49,13,61,
                  34,18,46,30,33,17,45,29,
                  10,58, 6,54, 9,57, 5,53,
                  42,26,38,22,41,25,37,21];

  let cellWidth = Math.sqrt(threshold.length);
  let cellAmount = width / cellWidth;

  //Iterates over every "cell"
  for (let cellY = 0; cellY < cellAmount; cellY++) {
    for (let cellX = 0; cellX < cellAmount; cellX++) {
      rect(cellX * cellWidth, cellY * cellWidth, cellWidth, cellWidth);
      //iterates every pixel in a single cell
      for (let y = 0; y < cellWidth; y++) {
        for (let x = 0; x < cellWidth; x++) {
          let pixelX = (cellX * cellWidth) + x;
          let pixelY = (cellY * cellWidth) + y;

          let index = (pixelX + pixelY * width) * 4;
          //if you divide cellWidth by 16 you get a cool result
          let k = (x + y * cellWidth); //Not sure if this is going right...
          // console.log(k);
          let c = grayscale(index);
          let thresholdOffset = 256 / threshold.length;
          //if grayscale value of the pixel is greater than the threshold,
          //turn that pixel white
          if (c > (threshold[k] * thresholdOffset)) {
            pixels[index + 0] = 255;
            pixels[index + 1] = 255;
            pixels[index + 2] = 255;
          }
          else { //173, 216, 230
            pixels[index + 0] = 0;
            pixels[index + 1] = 0;
            pixels[index + 2] = 0;
          }
          
        }
      }
    }
  }
  updatePixels();
}

function draw() {
  dither();
}

function grayscale(index) {
  let r = pixels[index + 0];
  let g = pixels[index + 1];
  let b = pixels[index + 2];
  //return avg of 3 colors (grayscale value)
  return (r + g + b) / 3;
}
