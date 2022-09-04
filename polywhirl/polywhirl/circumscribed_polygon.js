class circumscribed_polygon {
  constructor( radius, number_of_sides, colours=[]) {
    this.n = number_of_sides;
    this.r = radius;
    this.intersect = [0, 0];
    this.colours = colours;
    this.colours[0] = color(0);
    this.sign_ = 1;
  }

  setcolours(cols) {
    this.colours = cols;
  }


  update( varr, rotate_circle, circle_show, mode) {
    // Set colours and stroke weight
    stroke(0);
    strokeWeight(4);
    // Translate to the centre
    translate(wX/2, wY/2);
    // Rotate so the point is upwards not to the L/R
    rotate(-PI/2);
    // Draw the circle
    if (circle_show) {
      noFill();
      ellipse(0, 0, 2*this.r, 2*this.r);
    }
    if (rotate_circle) {
      rotate(PI*varr); // If active, rotate at same rate so it looks like lines are spinning
    }
    var a1, b1, a2, b2, c1, c2, m1, m2;
    let intersect = [0, 0];
    for ( var i=0; i<this.n; i++) {
      stroke(this.colours[i%this.colours.length]);
      stroke(line_colour.value());
      // First line
      a1 = this.matrix_multiply(this.cartesian(this.r*varr, 0), 2*i*PI/this.n); // Moving
      b1 = this.matrix_multiply(this.cartesian(this.r, 2*PI/this.n), 2*i*PI/this.n); // Static
      m1 = (b1[1] - a1[1])/(b1[0]-a1[0]); // Gradient
      c1 = b1[1] - m1*b1[0]; // Intercept

      // Next line
      a2 = this.matrix_multiply(this.cartesian(this.r*varr, 0), 2*(i+1)*PI/this.n); // Moving
      b2 = this.matrix_multiply(this.cartesian(this.r, 2*PI/this.n), 2*(i+1)*PI/this.n); // Static
      m2 = (b2[1] - a2[1])/(b2[0]-a2[0]); // Gradient
      c2 = b2[1] - m2*b2[0]; // Intercept

      // Calculate the intersection
      intersect[0] = (c2-c1)/(m1-m2);
      intersect[1] = intersect[0]*m2 + c2;

      switch(mode) {
      case -1:
        // Draw the lines weird one
        line(a1[0], a1[1], b1[0], b2[1]);
        break;
      case 0:
        // Draw the lines normal
        line(intersect[0], this.sign_*intersect[1], b1[0], this.sign_*b1[1]);
        break;
      case 2:
        // Draw the lines spidery
        line(a1[0], this.sign_*a1[1], 0, 0);
        line(a1[0], this.sign_*a1[1], b1[0], this.sign_*b1[1]);
        break;
      case 1:
        // Draw the lines with a gap
        line(a1[0], this.sign_*a1[1], b1[0], this.sign_*b1[1]);  // TODO
        break;
      }
    }
  }

  // Convert polar to cartesian
  cartesian( r, theta) {
    return [r*cos(theta), r*sin(theta)];
  }

  // Rotation matrix multiplication by theta about origin
  matrix_multiply( coord, theta) {
    return  [coord[0]*cos(theta) + coord[1]*sin(theta), coord[1]*cos(theta)-coord[0]*sin(theta)];
  }
}
