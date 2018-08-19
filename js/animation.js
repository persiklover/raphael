class Animation {
  constructor(img, imagesNum, delays, sizes) {
    this.img = img;

    this.imagesNum = imagesNum;
    this.delays    = delays;
    this.width     = sizes[0];
    this.height    = sizes[1];

    this.startTime = Date.now();
    this.playOnce = [];

    this.offset = { x: 0, y: 0 };
    this.currAnim = 0;
    this.facingRight = true;
  }

  play(id = 0) {
    let index = id;
    this.currAnim = index;
    this.offset.y = this.height * index;

    if (this.offset.x >= this.width * this.imagesNum[index]) {
      this.offset.x = 0;
    }
  }

  update() {
    let index = this.currAnim;
    let elapsed = (Date.now() - this.startTime);
    if (elapsed > this.delays[index]) {
      this.startTime = Date.now();
      this.offset.x += this.width;
      if (this.offset.x >= this.width * this.imagesNum[index]) {
        this.offset.x = 0;
        // ... onend();
      }
    }
  }

  render(ctx, x, y) {
    ctx.save();
    ctx.scale((this.facingRight) ? 1 : -1, 1);
    ctx.drawImage(
      this.img,
      this.offset.x,
      this.offset.y,
      this.width,
      this.height,
      (this.facingRight) ? x : -x - this.width,
      y,
      this.width,
      this.height
    );
    ctx.restore();
  }
}