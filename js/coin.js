function Coin(x, y) {
  this.x = x;
  this.y = y;
  this.bbox = new BBox(this.x, this.y, 10, 10);
  this.anim = new Animation(
    loadImage('img/coin.png'),
    [4],
    [10, 10],
    [450]
  );
  this.anim.play(0);
}

Coin.prototype.update = function() {
  this.anim.update();
};

Coin.prototype.draw = function(ctx, x, y) {
  this.anim.draw(ctx, x, y);
};
