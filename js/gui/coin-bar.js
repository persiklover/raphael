class CoinBar {
  constructor() {
    this.coins = 0;
    this.anim = new Animation(
      loadImage('img/coin.png'),
      [4],
      [450],
      [10, 10]
    );
    this.anim.play();

    this.text = new Text(this.coins + '', false);
  }

  update() {
    this.anim.update();
  }

  render(ctx) {
    this.anim.render(ctx, 0, 0);
    this.text.render(ctx, this.anim.width + 1, 1);
  }

  add(amount) {
    this.coins += amount;
    this.text.setStr(this.coins + '');
  }
}