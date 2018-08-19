class Text {
  constructor(str) {
    this.fontBlack = loadImage('img/font7.png');
    this.fontWhite = loadImage('img/font8.png');
    this.fontRed   = loadImage('img/font9.png');

    this.str = str.split('\n');
    this.line   = this.str.length - 1;
    this.column = this.str[this.line].length;
    this.font = this.fontBlack;

    this.size = 1;
    this.letterSpacing = 1.2;
    this.wordSpacing   = 2;
    this.textAlign = 'start';

    this.playing = false;
    this.wasShown = false;
    this.startTime = Date.now();
    this.delay = 60;

    this.letters = [];
    // Cyrilic
    this.letters['А'] = [0, 3, 6, 7];
    this.letters['Б'] = [8, 3, 5, 7];
    this.letters['В'] = [15, 3, 5, 7];
    this.letters['Г'] = [22, 3, 5, 7];
    this.letters['Д'] = [27, 3, 7, 8, -1, 0];
    this.letters['Е'] = [35, 3, 5, 7];
    this.letters['Ё']  = [42, 1, 5, 9, 0, -2];
    this.letters['Ж'] = [48, 3, 9, 7];
    this.letters['З'] = [58, 3, 5, 7];
    this.letters['И'] = [65, 3, 6, 7];
    this.letters['Й'] = [73, 0, 6, 10, 0, -3];
    this.letters['К'] = [81, 3, 5, 7];
    this.letters['Л'] = [87, 3, 6, 7];
    this.letters['М'] = [95, 3, 7, 7];
    this.letters['Н'] = [104, 3, 6, 7];
    this.letters['О'] = [112, 3, 7, 7];
    this.letters['П'] = [121, 3, 6, 7];
    this.letters['Р'] = [129, 3, 5, 7];
    this.letters['С'] = [136, 3, 6, 7];
    this.letters['Т'] = [143, 3, 7, 7];
    this.letters['У'] = [151, 3, 5, 7];
    this.letters['Ф'] = [157, 3, 7, 7];
    this.letters['Х'] = [165, 3, 5, 7];
    this.letters['Ц'] = [172, 3, 6, 8];
    this.letters['Ч'] = [180, 3, 5, 7];
    this.letters['Ш'] = [187, 3, 7, 7];
    this.letters['Щ'] = [196, 3, 8, 8];
    this.letters['Ъ'] = [204, 3, 7, 7];
    this.letters['Ы'] = [213, 3, 7, 7];
    this.letters['Ь'] = [222, 3, 5, 7];
    this.letters['Э'] = [229, 3, 6, 7];
    this.letters['Ю'] = [237, 3, 7, 7];
    this.letters['Я'] = [245, 3, 6, 7];
    this.letters['а'] = [0, 15, 4, 5, 0, 2];
    this.letters['б'] = [6, 12, 4, 8, 0, -1];
    this.letters['в'] = [12, 15, 4, 5, 0, 2];
    this.letters['г'] = [18, 15, 3, 5, 0, 2];
    this.letters['д'] = [21, 15, 6, 6, -1, 2];
    this.letters['е'] = [28, 15, 4, 5, 0, 2];
    this.letters['ё'] = [34, 13, 4, 7, 0, 0];
    this.letters['ж'] = [39, 15, 7, 5, 0, 2];
    this.letters['з'] = [47, 15, 4, 5, 0, 2];
    this.letters['и'] = [53, 15, 4, 5, 0, 2];
    this.letters['й'] = [59, 12, 4, 8, 0, -1];
    this.letters['к'] = [65, 15, 4, 5, 0, 2];
    this.letters['л'] = [70, 15, 5, 5, 0, 2];
    this.letters['м'] = [77, 15, 5, 5, 0, 2];
    this.letters['н'] = [84, 15, 4, 5, 0, 2];
    this.letters['о'] = [90, 15, 4, 5, 0, 2];
    this.letters['п'] = [96, 15, 4, 5, 0, 2];
    this.letters['р'] = [102, 15, 4, 7, 0, 2];
    this.letters['с'] = [108, 15, 4, 5, 0, 2];
    this.letters['т'] = [113, 15, 5, 5, 0, 2];
    this.letters['у'] = [119, 15, 4, 7, 0, 2];
    this.letters['ф'] = [125, 12, 7, 10, 0, -1];
    this.letters['х'] = [134, 15, 4, 5, 0, 2];
    this.letters['ц'] = [140, 15, 5, 6, 0, 2];
    this.letters['ч'] = [146, 15, 4, 5, 0, 2];
    this.letters['ш'] = [152, 15, 7, 5, 0, 2];
    this.letters['щ'] = [161, 15, 8, 6, 0, 2];
    this.letters['ъ'] = [169, 15, 6, 5, 0, 2];
    this.letters['ы'] = [177, 15, 6, 5, 0, 2];
    this.letters['ь'] = [185, 15, 4, 5, 0, 2];
    this.letters['э'] = [191, 15, 4, 5, 0, 2];
    this.letters['ю'] = [197, 15, 6, 5, 0, 2];
    this.letters['я'] = [205, 15, 4, 5, 0, 2];
    // Latin
    this.letters['A'] = [205, 15, 4, 5, 0, 2];
    this.letters['B'] = [205, 15, 4, 5, 0, 2];
    this.letters['C'] = [205, 15, 4, 5, 0, 2];
    this.letters['D'] = [205, 15, 4, 5, 0, 2];
    this.letters['E'] = [31, 25, 5, 7];
    this.letters['F'] = [205, 15, 4, 5, 0, 2];
    this.letters['e'] = [24, 37, 4, 5, 0, 2];
    this.letters['n'] = [69, 37, 4, 5, 0, 2];
    this.letters['r'] = [93, 37, 3, 5, 0, 2];
    this.letters['t'] = [102, 36, 4, 6, 0, 1];
    this.letters['0'] = [0, 47, 5, 7];
    this.letters['1'] = [8, 47, 3, 7];
    this.letters['2'] = [14, 47, 5, 7];
    this.letters['3'] = [21, 47, 5, 7];
    this.letters['4'] = [28, 47, 5, 7];
    this.letters['5'] = [35, 47, 5, 7];
    this.letters['6'] = [42, 47, 5, 7];
    this.letters['7'] = [49, 47, 5, 7];
    this.letters['8'] = [56, 47, 5, 7];
    this.letters['9'] = [63, 47, 5, 7];
    this.letters['!'] = [71, 47, 1, 7];
    this.letters['?'] = [75, 47, 4, 7];
    this.letters['.'] = [81, 53, 1, 1, 0, 6];
    this.letters[','] = [82, 52, 2, 3, -1, 6];
    this.letters[':'] = [86, 49, 1, 5, 0, 2];
    this.letters[';'] = [92, 31, 2, 8, 0, 1];
    this.letters['('] = [94, 46, 3, 10, 0, -1];
    this.letters['/'] = [110, 46, 4, 9];
    this.letters[')'] = [136, 46, 3, 10, 0, -1];
    this.letters['*'] = [166, 45, 5, 5, 0, -1];
    this.letters['-'] = [147, 50, 4, 1, 0, 3];
    this.letters['+'] = [159, 48, 5, 5, 0, 2];
    this.letters['\"'] = [225, 46, 3, 3, 0, -1];
  }

  setStr(str) {
    this.str = str.split(this.separator);
    if (!this.animated) {
      this.line   = this.str.length - 1;
      this.column = this.str[this.line].length;
    }
  }

  play(callback = function() {}) {
    this.playing = true;
    this.line   = 0;
    this.column = 0;

    this.onend = callback;
    return this;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  getHeight() {
    return this._heightOf(this.str[0]);
  }

  getWidth() {
    return this._widthOf(this.str[0]);
  }

  update() {
    if (!this.playing || this.paused) {
      return;
    }

    let elapsed = (Date.now() - this.startTime);
    if (elapsed > this.delay) {
      if (this.column == this.str[this.line].length && this.line == this.str.length - 1) {
        this.playing = false;
        this.onend();
      }
      else if (this.column + 1 <= this.str[this.line].length) {
        this.column++;
        this.startTime = Date.now();
      }
      else if (this.line + 1 < this.str.length) {
        this.line++;
        this.column = 0;
        this.startTime = Date.now();
      }
    }
  };

  render(ctx, x, y) {
    ctx.save();
    ctx.scale(this.size, this.size);
    ctx.translate(x, y);

    if (this.textAlign == 'start') {
      for (let i = 0; i < this.line; i++) {
        this._drawStr(ctx, this.str[i], 0, i * 12);
      }
      this._drawStr(ctx, this.str[this.line].substr(0, this.column), 0, 0 + this.line * 12);
    }
    else if (this.textAlign == 'center') {
      for (let i = 0; i < this.line; i++) {
        this._drawStr(
          ctx,
          this.str[i],
          0 - this._widthOf(this.str[i]) / 2,
          0 + i * 12
        );
      }
      this._drawStr(
        ctx,
        this.str[this.line].substr(0, this.column),
        0 - this._widthOf(this.str[this.line].substr(0, this.column)) / 2,
        0 + this.line * 12
      );
    }

    ctx.restore();
  }

  // Private
  _drawStr(ctx, str, x, y) {
    let next_x = x;
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (this.letters[char] != null) {
        let data = this.letters[char];
        ctx.drawImage(
          this.font,
          data[0],
          data[1],
          data[2],
          data[3],
          data[4] != null ? next_x + data[4] : next_x,
          data[5] != null ? y + data[5] : y,
          data[2],
          data[3]
        );
        next_x += data[4] != null ? data[2] + data[4] + this.letterSpacing : data[2] + this.letterSpacing;
      }
      else if (char === ' ') {
        next_x += this.wordSpacing;
      }
    }
  }

  _heightOf(str) {
    let height = 0;
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (this.letters[char] != null) {
        let data = this.letters[char];
        if (data[3] > height) {
          height = data[3];
        }
      }
    }
    return height;
  }

  _widthOf(str) {
    var char, data, j, len, width;
    width = 0;
    for (j = 0, len = str.length; j < len; j++) {
      char = str[j];
      if (this.letters[char] != null) {
        data = this.letters[char];
        width += data[4] != null ? data[2] + data[4] : data[2];
        width += this.letterSpacing;
      } else if (char === ' ') {
        width += this.wordSpacing;
      }
    }
    return width;
  }
}