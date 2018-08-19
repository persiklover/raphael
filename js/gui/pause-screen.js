class PauseScreen {
  constructor() {
    this.text = new Text('Пауза', false);
  }

  update() {
    // ...
  }

  render(ctx) {
    ctx.save();
    ctx.globalAlpha = .4;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.save();
    let s = 2;
    ctx.scale(s, s);
    this.text.render(
      ctx,
      (WIDTH / 2 - (this.text.getWidth() * s) / 2) / s,
      (HEIGHT / 2 - (this.text.getHeight() * s) / 2) / s
    );
    ctx.restore();
  }
}