let myFont = undefined;
let inputArea = undefined;
let fontColor = 20;

const gOptions = {
  bgColor: '#ffffff',
  fontColor: '#000000',
  fontSize: 0,
  isCenterAlign: true,
};

// Color picking
const colsURL =
  'https://coolors.co/palette/007bff-6610f2-6f42c1-e83e8c-dc3545-fd7e14-ffc107-28a745-20c997-17a2b8-6c757d-343a40-000000-f8f9fa';
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
  randomizeColor();
  textAlign(CENTER, CENTER);
  textSize(height / 30);
  textFont('Noto Sans JP');
  strokeCap(ROUND);
  strokeWeight(7);
  // textWrap(CHAR);
  rectMode(CENTER);
  inputArea = createElement('textarea');
  inputArea.position(width * 0.1, height * 0.8);
  inputArea.size(width * 0.8, height * 0.1);
  inputArea.value('ずっと\nまよなかでいいのに');
  inputArea.style('font-size', height / 50 + 'px');
  inputArea.hide();

  input = createFileInput(gotFile);
  input.position((15 * height) / 20, height / 3.5);
  input.style('display', 'none');
}

function gotFile(file) {
  loadFont(file.data, setupText);
  inputArea.show();
  textSize(height / 20);
}

function setupText(font) {
  myFont = font;
  textFont(myFont);
  gOptions.bgColor = colors[0];
  gOptions.fontColor = color(fontColor).toString('#rrggbb');
  gOptions.fontSize = height / 20;
  gOptions.isCenterAlign = true;
  prepareDatGUI(gOptions);
}

const randomizeColor = () => {
  shuffle(colors, true);
  setFontColor();
  options.bgColor = colors[0];
  options.fontColor = color(fontColor).toString('#rrggbb');
};

function draw() {
  if (myFont === undefined) {
    background(20);
    push();
    fill('#FFFFFF80');
    rect(width / 2, height / 2, width, height);
    fill(20);
    // textSize(20);
    text('1. Click/Tap HERE \n to download ZTMY font.', width / 2, height / 4);
    text('2. Click/Tap HERE \n to set downloaded ZTMY font.', width / 2, (3 * height) / 4);
    stroke(20);
    strokeWeight(3);
    line(width / 10, height / 2, (9 * width) / 10, height / 2);
    pop();
  } else {
    const opt = gOptions;
    if (options) {
      opt.bgColor = options.bgColor;
      opt.fontSize = options.fontSize;
      opt.isCenterAlign = options.isCenterAlign;
    }
    background(options.bgColor);
    fill(options.fontColor);
    textSize(options.fontSize);
    text(inputArea.value(), width / 2, height / 2, width, height);
  }
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

const setFontColor = () => {
  fontColor = 20;
  switch (colors[0]) {
    case '#6610f2':
    case '#6f42c1':
    case '#6c757d':
    case '#343a40':
    case '#000000':
      fontColor = 235;
      break;
  }
  fill(fontColor);
};
