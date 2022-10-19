function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  //initial image
  image(img, 0, 0, width, height);
}

function draw() {
  // image(img, 0, 0, width, height);
  loadPixels();
  
  let threshold = [0, 8, 2, 10,
                  12, 4, 14, 6,
                  3, 11, 1,  9, 
                  15, 7, 13, 5];

  // let threshold= [0,48,12,60, 3,51,15,63,
  //                 32,16,44,28,35,19,47,31,
  //                  8,56, 4,52,11,59, 7,55,
  //                 40,24,36,20,43,27,39,23,
  //                  2,50,14,62, 1,49,13,61,
  //                 34,18,46,30,33,17,45,29,
  //                 10,58, 6,54, 9,57, 5,53,
  //                 42,26,38,22,41,25,37,21];

  let cellWidth = threshold.length/2;
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
          let k = (x + y * cellWidth/16); //Not sure if this is going right...
          // console.log(k);
          let c = grayscale(index);
          let thresholdOffset = 256 / threshold.length;
          //if grayscale value of the pixel is greater than the threshold,
          //turn that pixel white
          if (c > (threshold[k] * thresholdOffset)) {
            pixels[index + 0] = 255; //doesnt work
            pixels[index + 1] = 255;
            pixels[index + 2] = 255;
          }
          else {
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

function grayscale(index) {
  let r = pixels[index + 0];
  let g = pixels[index + 1];
  let b = pixels[index + 2];
  //return avg of 3 colors (grayscale value)
  return (r + g + b) / 3;
}

function preload() {
  img = loadImage("assets/mountains.jpg");
}

/* NOTES
//initial image
  // image(img, 0, 0, width, height);

  let threshold = [0, 8, 2, 10,
                  12, 4, 14, 6,
                  3, 11, 1,  9, 
                  15, 7, 13, 5];
  let mapSize = threshold.length;
  //256 / mapSize = threshold for each array item
  //currThreshold[k] = threshold[k] * 256/mapSize
*/