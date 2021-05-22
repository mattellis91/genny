import { createCanvas } from "canvas";
import * as fs from 'fs';

const width = 1200;
const height = 620;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "magenta";
ctx.fillRect(0,0,width, height);
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);