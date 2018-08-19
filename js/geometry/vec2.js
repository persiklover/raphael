class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    let len = this.length();
    this.x /= len;
    this.y /= len;
    return this;
  }

  add(vec = new Vec2) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  sub(vec = new Vec2) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  mul(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  div(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  distance(vec = new Vec2) {
    let x = this.x = vec.x;
    let y = this.y = vec.y;
    return Math.sqrt(x * x + y * y);
  }

  toAngle() {
    return Math.atan2(this.y, this.x);
  }

  rotate(a, ox = 0, oy = 0) {
    this.x -= ox;
    this.y -= oy;
    this.x = this.x * Math.cos(a) - this.y * Math.sin(a);
    this.y = this.x * Math.sin(a) + this.y * Math.cos(a);
    this.x += ox;
    this.y += oy;
    return this;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  toArray() {
    return [this.x, this.y];
  }
  
  toString() {
    return `(${this.x}; ${this.y})`;
  }
}