let myFont = undefined;

let inputArea = undefined;

// Color picking
const colsURL =
  'https://coolors.co/palette/007bff-6610f2-6f42c1-e83e8c-dc3545-fd7e14-ffc107-28a745-20c997-17a2b8';
let colors = createCols(colsURL);

// Take some Colors from coolors URL
function createCols(url) {
  let slaIndex = url.lastIndexOf('/');
  let colStr = url.slice(slaIndex + 1);
  let colArr = colStr.split('-');
  for (let i = 0; i < colArr.length; i++) colArr[i] = '#' + colArr[i];
  return colArr;
}

function setup() {
  const cvs = createCanvas(windowWidth, windowHeight);
  cvs.drop(gotFile);
  shuffle(colors, true);
  textAlign(CENTER, CENTER);
  textSize(height/30);
  textFont('Noto Sans JP');
  strokeCap(ROUND);
  strokeWeight(7);
textWrap(CHAR);
  inputArea = createElement("textarea"); 
  inputArea.position(width*.1, height*.8); 
  inputArea.size(width*.8, height*.1);
  inputArea.value('ずっとまよなかでいいのに'); 
  inputArea.style('font-size', height/50+'px'); 
  inputArea.hide();

  input = createFileInput(gotFile);
  input.position((15 * height) / 20, height / 3.5);
  input.style('display', 'none');

  prepareTexture(width, height);
}

function gotFile(file) {
  loadFont(file.data, setupText);
  inputArea.show();
  textSize(height/20);
}

function setupText(font) {
  myFont = font;
  textFont(myFont);
  
}

function draw() {
  if (frameCount % 100 === 1) {
    shuffle(colors, true);
  }

  background(colors[0]);

  if (myFont === undefined) {
    push();
    fill('#FFFFFF80');
    rect(0, 0, windowWidth, windowHeight);
    fill(20);
    // textSize(20);
    text('1. Click/Tap HERE \n to download ZTMY font.', width / 2, height / 4);
    text('2. Click/Tap HERE \n to set downloaded ZTMY font.', width / 2, (3 * height) / 4);
    stroke(20);
    strokeWeight(3);
    line(width / 10, height / 2, (9 * width) / 10, height / 2);
    pop();
  }else{
    text(inputArea.value(),width/2,height/2)
  }

  // Draw texture
  image(textureGfx, 0, 0);
}

let input;

function mouseClicked() {
  if (!myFont) {
    if (mouseY < height / 2) {
      const url = 'https://zutomayo.net/font/';
      window.open(url, '_blank');
    } else {
      input.elt.click();
    }
  }
}
