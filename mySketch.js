let ztmyFont = undefined;
let inputArea = undefined;
let input; // for file dialog
let fontColor = 20;
let isReqSaveImage = false;
let hedgehogPict = undefined;

// For datGUI
const gOptions = {
  bgColor: '#ffffff',
  fontColor: '#000000',
  fontSize: 0,
  isCenterAlign: true,
};

// Color picking
const colsStr =
  '/007bff-6610f2-6f42c1-e83e8c-dc3545-fd7e14-ffc107-28a745-20c997-17a2b8-6c757d-343a40-000000-f8f9fa';
let colors = createCols(colsStr);

// Take some Colors from coolors URL
function createCols(url) {
  let slaIndex = url.lastIndexOf('/');
  let colStr = url.slice(slaIndex + 1);
  let colArr = colStr.split('-');
  for (let i = 0; i < colArr.length; i++) colArr[i] = '#' + colArr[i];
  return colArr;
}

function preload() {
  // preload hedgehog icon
  hedgehogPict = loadImage('./images/hedgehog_3d.png');
}

function setup() {
  // Prepare canvas
  const cvs = createCanvas(windowWidth, windowHeight);
  cvs.drop(gotFile); // support drag&drop
  cvs.mouseClicked(_mouseClicked); // for Safari.

  randomizeColor();
  textAlign(CENTER, CENTER);
  textSize(height / 30);
  textFont('Noto Sans JP');
  strokeCap(ROUND);
  strokeWeight(7);
  rectMode(CENTER);

  // Prepare textarea
  inputArea = createElement('textarea');
  inputArea.position(width * 0.1, height * 0.8);
  inputArea.size(width * 0.8, height * 0.1);
  inputArea.value('ずっと\nまよなかでいいのに');
  inputArea.style('font-size', height / 50 + 'px');
  inputArea.hide();

  // For file dialog
  input = createFileInput(gotFile);
  input.position((15 * height) / 20, height / 3.5);
  input.style('display', 'none');
}

// proc on setting fontFile
function gotFile(file) {
  loadFont(file.data, setupText);
}

// Set up initial text with ztmy font
function setupText(font) {
  inputArea.show();
  textSize(height / 20);

  ztmyFont = font;
  textFont(ztmyFont);

  // Initialize datGUI
  gOptions.bgColor = colors[0];
  gOptions.fontColor = color(fontColor).toString('#rrggbb');
  gOptions.fontSize = height / 20;
  gOptions.isCenterAlign = true;
  prepareDatGUI(gOptions);
}

const randomizeColor = () => {
  shuffle(colors, true);
  options.bgColor = colors[0];
  setFontColor();
  options.fontColor = color(fontColor).toString('#rrggbb');
};

// Take care of contrast
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

function draw() {
  if (ztmyFont === undefined) {
    drawInitialScreen();
  } else {
    drawZTMYTextScreen();
  }

  // Trigger on save image
  if (isReqSaveImage) {
    isReqSaveImage = false;
    saveImage();
  }

  drawCopyRight();
}

const drawInitialScreen = () => {
  push();
  {
    // background with frame
    fill(220);
    rect(width / 2, height / 2, width, height);

    // Title
    fill(20);
    textSize(height / 25);
    text("'ZTMY Font' Tester", width / 2, height / 10);
    image(hedgehogPict, width / 2 - (height / 25) * 6.1, height / 14.3, height / 20, height / 20);
    image(
      hedgehogPict,
      width / 2 + (height / 25) * 6.1 - height / 20,
      height / 14.3,
      height / 20,
      height / 20
    );

    // Descriptions
    textSize(height / 30);
    text('1. Click/Tap HERE \n to download ZTMY font.', width / 2, (height / 4) * 1.2);
    text('2. Click/Tap HERE \n to set downloaded ZTMY font.', width / 2, ((3 * height) / 4) * 0.95);

    // Center line
    stroke(20);
    strokeWeight(3);
    line(width / 10, height / 2, (9 * width) / 10, height / 2);
  }
  pop();
};

const drawZTMYTextScreen = () => {
  // read datGUI
  const opt = gOptions;
  if (options) {
    opt.bgColor = options.bgColor;
    opt.fontSize = options.fontSize;
    opt.isCenterAlign = options.isCenterAlign;
  }
  background(options.bgColor);
  fill(options.fontColor);
  textSize(options.fontSize);

  let leftMargin = 0;
  if (options.isCenterAlign) {
    textAlign(CENTER);
  } else {
    leftMargin = width * 0.1;
    textAlign(LEFT);
  }

  // draw text with ZTMY font
  text(inputArea.value(), width / 2 + leftMargin, height / 2, width, height);
};

const _mouseClicked = () => {
  if (!ztmyFont) {
    if (mouseY < height / 2) {
      const url = 'https://zutomayo.net/font/';
      window.open(url, '_blank');
    } else {
      // Open file dialog
      input.elt.click();
    }
  }
}

// Draw fine print at the bottom of page
// This is not printed in a download image.
const drawCopyRight = () => {
  push();
  {
    textAlign(LEFT);
    textSize(height / 80);
    fill(20);
    text(
      'Hosted on GitHub. Version 0.8.0. Copyright (c) 2024 Tetsunori Nakayama. MIT License.',
      20,
      height - 20
    );
  }
  pop();
};
