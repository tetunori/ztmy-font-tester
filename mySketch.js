// let myP5MovRec;

let myFont = undefined;

// Color picking
const colsURL = 'https://coolors.co/palette/007bff-6610f2-6f42c1-e83e8c-dc3545-fd7e14-ffc107-28a745-20c997-17a2b8';
let colors = createCols(colsURL);

// Take some Colors from coolors URL
function createCols(url) {
	let slaIndex = url.lastIndexOf('/');
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split('-');
	for (let i = 0; i < colArr.length; i++) colArr[i] = '#' + colArr[i];
	return colArr;
}

const W = 720;

// Biological motion walker instance
const bmw = new BMWalker();

function setup() {
	const cvs = createCanvas(W, W);
	cvs.drop(gotFile);
	shuffle(colors, true);
	textAlign(CENTER, CENTER);
	textSize(35);

	strokeCap(ROUND);
	strokeWeight(7);

	// Set camera
	const angularVelocity = PI / 4;
	bmw.setCameraParam(0, angularVelocity, 0);

	prepareTexture(width, height);

	// myP5MovRec = new P5MovRec(); // P5MovRec.codecId.vp9 is selected by default.
	// myP5MovRec.startRec();
}

function gotFile(file) {
	loadFont(file.data, setupText);
}

function setupText(font) {
	myFont = font;
	textFont(myFont);
}

function draw() {

	if (frameCount % 100 === 1) {
		shuffle(colors, true)
	}

	background(colors[0]);

	const walkerHeight = 600;
	drawWalkerLines(W / 2, W / 2, walkerHeight);
	drawWalkerMarkers(W / 2, W / 2, walkerHeight);
	
	if(myFont === undefined){
		push()
		fill('#FFFFFF80');
		square(0,0,W);
		fill(20)
		// textSize(20);
		text('Download ZUTOMAYO font \n from https://zutomayo.net/font/ \n and drag&drop it.', width/2, height/2);
		pop()
	}

	// Draw texture
	image(textureGfx, 0, 0);
}

const drawWalkerLines = (offsetX, offsetY, walkerHeight, tmsec = undefined) => {
	push(); {
		stroke(colors[1]);
		const lineMarkers = bmw.getLineMarkers(walkerHeight, tmsec);

		// Draw lines
		lineMarkers.forEach((m) => {
			const ratio = 0.25; // Omit quater length from both edge => Half length line
			const orgPos0 = m[0];
			const orgPos1 = m[1];

			const pos0 = createVector(
				ratio * orgPos0.x + (1 - ratio) * orgPos1.x + offsetX,
				ratio * orgPos0.y + (1 - ratio) * orgPos1.y + offsetY
			);

			const pos1 = createVector(
				(1 - ratio) * orgPos0.x + ratio * orgPos1.x + offsetX,
				(1 - ratio) * orgPos0.y + ratio * orgPos1.y + offsetY
			);

			line(pos0.x, pos0.y, pos1.x, pos1.y);
		});
	}
	pop();
};

const descTable = [{
		desc: 'Head',
		char: 'ア'
	},
	{
		desc: 'Clavicles',
		char: 'イ'
	},
	{
		desc: 'L-Shoulder',
		char: 'ウ'
	},
	{
		desc: 'L-Elbow',
		char: 'エ'
	},
	{
		desc: 'L-Hand',
		char: 'オ'
	},
	{
		desc: 'R-Shoulder',
		char: 'カ'
	},
	{
		desc: 'R-Elbow',
		char: 'キ'
	},
	{
		desc: 'R-Hand',
		char: 'ク'
	},
	{
		desc: 'Belly',
		char: 'ケ'
	},
	{
		desc: 'L-Hip',
		char: 'コ'
	},
	{
		desc: 'L-Knee',
		char: 'サ'
	},
	{
		desc: 'L-Ankle',
		char: 'シ'
	},
	{
		desc: 'R-Hip',
		char: 'ス'
	},
	{
		desc: 'R-Knee',
		char: 'セ'
	},
	{
		desc: 'R-Ankle',
		char: 'ソ'
	},
];

const drawWalkerMarkers = (offsetX, offsetY, walkerHeight, tmsec = undefined) => {
	const markers = bmw.getMarkers(walkerHeight, tmsec);


	// randomize chars
	if (frameCount % 100 < 20) {
		const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
		descTable.forEach(e => {
			e.char = chars.substr(random(chars.length), 1);
		});
	}

	// Draw markers
	markers.forEach((m) => {
		descTable.forEach((e) => {
			if (e.desc === m.desc) {
				text(e.char, m.x + offsetX, m.y + offsetY);
			}
		});
	});
};

function mouseClicked() {
	if(!myFont){
		const url = 'https://zutomayo.net/font/';
		window.open(url, '_blank');		
	}
}

// function keyPressed() {
//   switch (keyCode) {
//     case 49: //1: Start record
//       myP5MovRec.startRec();
//       break;
//     case 50: //2: set webm, stop
//       // myP5MovRec.setMovType(P5MovRec.movTypeId.webm); // webm is default value
//       myP5MovRec.stopRec();
//       break;
//     case 51: //3: set mp4, stop
//       myP5MovRec.setMovType(P5MovRec.movTypeId.mp4); // for mp4 container
//       myP5MovRec.stopRec();
//       break;
//     default:
//       break;
//   }
// }