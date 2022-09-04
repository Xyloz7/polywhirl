let r = 200; // Radius
let counter = 0;
let Poly;
let mode = 0;
let varr, var_prev;
let grad, prev_grad;
var PI = 3.1415;
let ratio = 0.7;
let n_sides_slider, bg_colour, mode_slider, line_colour, sign_slider;

function makeSlider(n, min, max, default_pos, name) {
  let slider;
  slider = createSlider(min, max, default_pos);
  slider.position(wX + 100, 50 * n);
  slider.style('width', '80px');
  //text(name, wX + 100, (50 * n) - 20);
  return slider;
}

function setup() {
  // Create canvas based on screensize
  wX = ratio*windowWidth-200;
  wY = ratio*windowHeight;
  createCanvas(wX + 200, wY);


  bg_colour = createColorPicker('#FFE6E6');
  bg_colour.position(wX + 100, 50 * 1);

  line_colour  = createColorPicker('#000000');
  line_colour.position(wX + 100, 50 * 6);

  speed_slider = makeSlider(2, 1, 50, 20, 'speed');
  n_sides_slider = createSlider(3, 21, 3, 1);
  n_sides_slider.position(wX + 100, 50 * 3);
  n_sides_slider.style('width', '80px');

  mode_slider = createSlider(-1, 3, 1, 1);
  mode_slider.position(wX + 100, 50 * 4);
  mode_slider.style('width', '80px');

  rotate_slider = createSlider(0, 1, 1, 1);
  rotate_slider.position(wX + 100, 50 * 5);
  rotate_slider.style('width', '80px');

  sign_slider = createSlider(0, 1, 1, 1);
  sign_slider.position(wX + 100, 50 * 7);
  sign_slider.style('width', '80px');

  Poly = new circumscribed_polygon(r, 7);
  //Poly.setcolours(rainbow);
  var_prev = 0;
  prev_grad=0;
}


function draw() {
  counter = counter + speed_slider.value()/1000;
  varr = (1+sin(counter))/2;
  background(bg_colour.color());

  Poly.n = n_sides_slider.value();
  Poly.update(varr, rotate_slider.value(), true, mode);

  grad = (varr - var_prev);
  if (sign_slider.value()) {
    if (prev_grad<=0 && grad>0) {
      Poly.sign_ = Poly.sign_*-1;
    }
    if (prev_grad>=0 && grad<0)
    {
      Poly.sign_ = Poly.sign_*-1;
    }
  }


  if (mode_slider.value() == 3) {
    // At a trough
    if (prev_grad<=0 && grad>0) {
      mode = mode + 1;
      mode = mode%3;
    }
  } else {
    mode = mode_slider.value();
  }

  var_prev = varr;
  prev_grad = grad;
}
