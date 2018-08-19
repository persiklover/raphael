let Keyboard = {
  pressed: [],

  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40,

  A:      65,
  W:      87,
  S:      83,
  D:      68,
  R:      82,
  F:      70,

  1:      49,
  2:      50,
  3:      51,

  ENTER:  13,
  ESCAPE: 27,
  SPACE:  32,
  
  keyDown(keyCode = 0) {
    this.pressed[keyCode] = true;
  },
  keyUp(keyCode = 0) {
    this.pressed[keyCode] = false;
  },
  isPressed(keyCode = 0) {
    return this.pressed[keyCode];
  }
};