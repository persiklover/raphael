function Flag(x, y) {
  this.x = x;
  this.y = y;
  this.img  = loadImage('img/flag-1.png');
  this._img = loadImage('img/flag-2.png');
  this.bbox = new BBox(this.x, this.y, 12, 17);
}

Flag.prototype.swapImg = function() {
  this.img = this._img;
};

Flag.prototype.update = function() {};

Flag.prototype.draw = function(ctx, x, y) {
  ctx.drawImage(this.img, x, y);
};