class Actor {
  constructor(x, y) {
    this.anim = new Animation(
      loadImage('img/raphael.png'),
      [2, 2, 2, 1, 2],         // imagesNum
      [600, 120 / 1.25, 150, 0, 150], // delays
      [20, 25]                 // sizes
    );
    this.anim.play();
    
    this.states = [
      'STAND',
      'RUN',
      'JUMP',
      'FALL',
      'DEAD'
    ];
    this.currState = this.states[0];

    this.aabb = new AABB(x, y, 8, 25);
    this.aabb.offset = { x: 6, y: 0 };

    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.facingRight = true;

    this.dead = false;
    this.onGround = false;

    this._maxSpeed  = 1.6; // 1.4
    this._speed     = this._maxSpeed; // 1.15
    this._stopSpeed = 1; // .065
    this._jumpSpeed = 5.4; // 4.6
    this._angle     = 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.aabb.x = x + this.aabb.offset.x;
    this.aabb.y = y + this.aabb.offset.y;
  }

  setX(x) {
    this.x = x;
    this.aabb.x = x + this.aabb.offset.x;
  }

  setY(y) {
    this.y = y;
    this.aabb.y = y + this.aabb.offset.y;
  }

  get width() {
    return this.anim.width;
  }

  get height() {
    return this.anim.height;
  }

  right() {
    if (this.dx < this._speed) {
      this.dx = this._speed;
    }
    this.dx += 0.05;
    if (this.dx > this._maxSpeed) {
      this.dx = this._maxSpeed;
    }
  }

  left() {
    if (this.dx > -this._speed) {
      this.dx = -this._speed;
    }
    this.dx -= 0.05;
    if (this.dx < -this._maxSpeed) {
      this.dx = -this._maxSpeed;
    }
  }

  jump() {
    if (this.onGround) {
      this.dy = -this._jumpSpeed;
      this.onGround = false;
    }
  }

  stop() {
    if (this.dx > 0) {
      this.dx -= this._stopSpeed;
      if (this.dx < 0) {
        this.dx = 0;
      }
    }
    else if (this.dx < 0) {
      this.dx += this._stopSpeed;
      if (this.dx > 0) {
        this.dx = 0;
      }
    }
    // this.dx = 0;
  }

  die() {
    if (!this.dead) {
      this.dead = true;
      this.onGround = true;
      this.jump();
    }
  }

  update() {
    if (this.dead) {
      this.currState = 'DEAD';
      this.anim.play(4);
    }
    else if (!this.onGround && this.dy > 0) {
      this.currState = 'FALL';
      this.anim.play(3);
    }
    else if (!this.onGround && this.dy < 0) {
      this.currState = 'JUMP';
      this.anim.play(2);
    }
    else if (this.dx != 0) {
      this.currState = 'RUN';
      this.anim.play(1);
    }
    else {
      this.currState = 'STAND';
      this.anim.play(0);
    }

    if (this.dx > 0) {
      this.facingRight = true;
    }
    else if (this.dx < 0) {
      this.facingRight = false;
    }

    this.anim.facingRight = this.facingRight;
    this.anim.update();

    this.x += this.dx;
    this.y += this.dy;
    this.aabb.x = this.x + this.aabb.offset.x;
    this.aabb.y = this.y + this.aabb.offset.y;
    this.onGround = false;
  }

  render(ctx, x, y) {
    ctx.save();
    if (this.currState == 'DEAD') {
      ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
      ctx.rotate(Math.toRadian((this.facingRight) ? ++this._angle : --this._angle));
      ctx.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)));
    }
    else {
      this._angle = 0;
    }
    
    this.anim.render(ctx, x, y);

    // Render aabb
    // ctx.strokeStyle = 'red';
    // ctx.globalAlpha = .6;
    // let aabb = this.aabb;
    // ctx.strokeRect(
    //   aabb.x,
    //   aabb.y,
    //   aabb.width,
    //   aabb.height
    // );

    ctx.restore();
  }
}