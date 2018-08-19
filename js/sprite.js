class Sprite {
  constructor(img, x=0, y=0) {
    this.img = img;
    this.x   = x;
    this.y   = y;

    this.flipped = { x: false, y: false };
  }

  get width() { return (this.img) ? this.img.width : 0; }
  get height() { return (this.img) ? this.img.height : 0; }

  aabb() {
    return new AABB(this.x, this.y, this.width, this.height);
  }

  render(ctx, x = this.x, y = this.y) {
    ctx.save();
    ctx.scale(this.flipped.x ? -1 : 1, this.flipped.y ? -1 : 1);
    ctx.drawImage(
      this.img,
      this.flipped.x ? -x - this.img.width  : x,
      this.flipped.y ? -y - this.img.height : y
    );
    ctx.restore();
  }
}