class AABB {
  constructor(x, y, width, height) {
    this.x      = x;
    this.y      = y;
    this.width  = width;
    this.height = height;
  }

  get cx() { return this.x + this.width/2; }
  get cy() { return this.y + this.height/2; }

  get left()   { return this.x; }
  get top()    { return this.y; }
  get right()  { return this.x + this.width; }
  get bottom() { return this.y + this.height; }

  intersects(aabb = new AABB()) {
    return !(this.left   > aabb.right  ||
             this.right  < aabb.left   ||
             this.top    > aabb.bottom ||
             this.bottom < aabb.top);
  }

  /**
   * Проверяет, находится ли точка с координатами (x; y)
   * внутри прямоугольника
   *
   * @param {number} x - x координата точки
   * @param {number} y - y координата точки
   * @return {boolean} - WOW
   */
  contains(x, y) {
    return !(x > this.right  ||
             x < this.left   ||
             y > this.bottom ||
             y < this.top);
  }

  intersection(aabb) {
    var result = new AABB();
    result.x = Math.max(this.x, aabb.x);
    result.y = Math.max(this.y, aabb.y);
    result.width  = Math.min(this.x + this.width, aabb.x + aabb.width) - result.x;
    result.height = Math.min(this.y + this.height, aabb.y + aabb.height) - result.y;

    return result;
  }
}