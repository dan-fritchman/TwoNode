import 'jsdom-global/register'

import { createCanvas, Image } from 'canvas';
import Two from 'two.js';
import * as fs from 'fs';

console.log(document);

const width = 800;
const height = 600;

const canvas = createCanvas(width, height, 'svg');
Two.Utils.shim(canvas, Image);

const time = Date.now();

const two = new Two({
  width: width,
  height: height,
  domElement: canvas as unknown  as HTMLElement
});

const rect = two.makeRectangle(width / 2, height / 2, 50, 50);
rect.fill = 'cyan';
rect.noStroke();

two.render();

fs.writeFileSync('out.svg', canvas.toBuffer())

// const settings = { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE };
// fs.writeFileSync(path.resolve(__dirname, './images/rectangle.png'), canvas.toBuffer('image/png', settings));
console.log('Finished rendering. Time took: ', Date.now() - time);

// Note it seems `canvas` probably wants us to call this? 
// It uses some weird underlying libraries, and Node seems to offer a warning if it's left out. 
process.exit();
