class DeathScreen {
  constructor() {
    this.mainText = new Text('Ты погиб'.toUpperCase(), false);
    this.dx = 0;
    this.dy = 0;

    this.continueText = new Text('Нажми Enter чтобы продолжить', false);
    this.continueText.color = 'red';

    this.jokes = [
      'Довольно глупая смерть,++ не так ли?',
      'Может стоит сделать перерыв?',
      'Серьёзно?',
      'Не пробуй больше',
      'В следующий раз++у тебя точно не получится',
      'Я даю этой смерти 4 банана из 10',
      'Бывает',
      'Плоховато даже для первого раза'
    ];
    this.currentJoke = -1;
    this.jokeText;
  }

  update() {
    let range = 1;
    this.dx = Math.randomInt(-range, range);
    this.dy = Math.randomInt(-range, range);
  }

  render(ctx) {
    ctx.save();
    ctx.globalAlpha = .65;
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.save();
    let sx, sy;
    sx = sy = 2;
    ctx.scale(sx, sy);
    this.mainText.render(
      ctx,
      (WIDTH / 2 - (this.mainText.getWidth() * sx) / 2) / sx + this.dx,
      25 + this.dy
    );
    ctx.restore();

    if (this.currentJoke == -1) {
      this.currentJoke = Math.randomInt(0, this.jokes.length - 1);

      this.jokeText = new Text(this.jokes[this.currentJoke], false);
      this.jokeText.spaceWidth = 2.5;
      this.jokeText.distance = 1.5;
      this.jokeText.textAlign = 'center';
    }

    this.jokeText.render(ctx, WIDTH / 2, 70);
    
    this.continueText.render(ctx, WIDTH / 2 - this.continueText.getWidth() / 2, 100);
    ctx.restore();
  }

  reset() {
    this.currentJoke = -1;
  }
}