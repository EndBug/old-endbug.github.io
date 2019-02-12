X = -0.5
Y = 0
R = 3

var corX = X;
var corY = Y;
var range = R;

var rectx0, recty0, rectx1, recty1, drawing = false,
  mandelbrot = true;
var slider, button0, button1;

function setup() {
  var canvas = createCanvas(700, 700);
  canvas.parent('sketch-holder');
  pixelDensity(1);

  controlDiv = createDiv('');
  controlDiv.parent('sketch-holder');
  controlDiv.id("control-div");

  p = createP('Controls');
  p.parent('control-div');

  button0 = createButton('zoom out');
  button0.mousePressed(function() {
    range *= 2;
  });
  button0.parent('control-div');

  button1 = createButton('reset');
  button1.mousePressed(function() {
    corX = -0.5;
    corY = 0;
    range = 3;
    slider.value(100);
  });
  button1.parent('control-div');

  s = createSpan('Iterations [2-1000]:');
  s.id("iter");
  s.parent('control-div');

  slider = createSlider(2, 1000, 100, 10);
  slider.parent('control-div');
}

function draw() {

  if (mandelbrot || isMousePressed) {
    var maxiterations = floor(slider.value());
    loadPixels();

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {

        var c_a = map(x, 0, width, corX - range / 2, corX + range / 2);
        var c_b = map(y, height, 0, corY - range / 2, corY + range / 2);

        var z_a = c_a;
        var z_b = c_b;

        var iteration;

        for (iteration = 0; iteration < maxiterations; iteration++) {
          var aIteration = z_a * z_a - z_b * z_b;
          var bIteration = 2 * z_a * z_b;

          z_a = aIteration + c_a;
          z_b = bIteration + c_b;

          if (z_a * z_a + z_b * z_b > 16) {
            break;
          }
        }

        var hue = (map(iteration, 0, maxiterations, 0, 1));
        var lig = (map(iteration, 0, maxiterations, 0.5, 0));

        var colorRGB = hslToRgb(hue, 0.5, lig);

        var pix = (x + y * width) * 4;
        pixels[pix + 0] = colorRGB[0];
        pixels[pix + 1] = colorRGB[1];
        pixels[pix + 2] = colorRGB[2];
        pixels[pix + 3] = 255;
      }
    }
    updatePixels();
    mandelbrot = false;
  }

  if (drawing) {
    stroke(255, 255, 255);
    noFill();
    rect(rectx0, recty0, rectx1 - rectx0, (rectx1 - rectx0));
  }
}


function mousePressed() {
  if (mouseX >= 0 && mouseX <= 700 && mouseY >= 0 && mouseY <= 700) {
    rectx0 = mouseX;
    recty0 = mouseY;
    drawing = true;
    mandelbrot = true;
  }
}

function mouseDragged() {
  if (mouseX >= 0 && mouseX <= 700 && mouseY >= 0 && mouseY <= 700) {
    rectx1 = mouseX;
    recty1 = recty0 + (rectx1 - rectx0);
    mandelbrot = true;
  }
}


function mouseReleased() {
  if (mouseX >= 0 && mouseX <= 700 && mouseY >= 0 && mouseY <= 700) {
    corX = map(rectx0 + (rectx1 - rectx0) / 2, 0, 700, corX - range / 2, corX + range / 2);
    corY = map(recty0 + (recty1 - recty0) / 2, 700, 0, corY - range / 2, corY + range / 2);
    range = map(rectx1 - rectx0, 0, 700, 0, range);
    drawing = false;
    mandelbrot = true;
  }
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}