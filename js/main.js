const HEIGHT = 180 - 2,               // 180
      WIDTH  = HEIGHT * (16 / 9); // (4 / 3)

(function() {

var canvas,
    ctx,
    scale = 1;

var camera = {
  x: 0,
  y: 0,
  zoom: 1,

  aabb() {
    return new AABB(this.x, this.y, WIDTH, HEIGHT);
  }
};

// For tablets and mobile devices
var ongoingTouches = [];

var Level = {
  x: 0,
  y: 0,
  w: 9000,
  h: HEIGHT * 2, // 180

  respawn: { x: 50, y: 50 },

  enemies:     [],
  flags:       [],
  coins:       [],
  texts:       [],
  grounds:     [],
  triggers:    [],
  sprites:     [],
  effects:     [],

  imagesToLoad: 0,
  imagesLoaded: 0,

  loaded: false,
  loadedOnce: false,

  load(worldObj) {
    this.worldObj = worldObj;
    var loadedImages = [];

    this.sprites = [];
    this.grounds = [];

    worldObj.sprites.forEach(data => {
      var x   = data.x;
      var y   = data.y;
      var url = data.img.url;
      console.log(url);
      var image = loadedImages[url];
      if (!image) {
        this.imagesToLoad++;
        image = loadImage(url, img => {
          if (this.imagesToLoad == ++this.imagesLoaded) {
            this.loaded = true;
            if (this.onload) {
              this.onload();
            }
          }
        });
        loadedImages[url] = image;
      }

      var sprite = new Sprite(image, x, y);
      sprite.type     = 'sprite';
      sprite.children = [];
      sprite.flipped  = data.img.flipped;
      sprite.userData = data.userData || {};

      sprite.visible = true;
      sprite.ontouch = [];

      if (data.userData) {
        if (data.userData.ontouch) {
          sprite.ontouch = data.userData.ontouch;
          for (var action of data.userData.ontouch) {
            switch (action) {
              case 'appear':
                sprite.visible = false;
                break;
            }
          }
        }
      }

      if (data.hasCollider) {
        // Create extra image
        var img = loadImage(url, img => {
          var aabb = new AABB(x, y, image.width, image.height);
          aabb.existing = true;

          sprite.children.push(aabb);

          this.grounds.push(aabb);
        });
      }

      this.sprites.push(sprite);
    });

    if (worldObj.colliders)
    worldObj.colliders.forEach(data => {
      var x         = data.x;
      var y         = data.y;
      var width     = data.width;
      var height    = data.height;
      var isTrigger = data.isTrigger;
      var offset    = data.offset;
      var userData  = data.userData;

      var aabb = new AABB(x, y, width, height);
      aabb.type      = 'collider';
      aabb.existing  = true;
      aabb.isTrigger = isTrigger;
      aabb.offset    = offset;
      aabb.userData  = userData;

      if (aabb.isTrigger) {
        this.triggers.push(aabb);
      }
      else {
        this.grounds.push(aabb);
      }
    });

    this.loadedOnce = true;
  },

  reload() {
    this.load(this.worldObj);
  }
};

var lives = 5;
var lifeImg = loadImage('img/life.png');
var actor;
// GUI
var coinBar;
var deathScreen;
var pauseScreen;

var paused = false,
    canPause = true;

// test
var numOfRenders = 0;

var observer = new Observer().observe(Physics.notifier);
observer.onNotify = function(data) {
  switch (data.state) {
    case 'START_FALLING':
      // ...
      break;
    case 'LANDED':
      // ...
      break;
  }
};

window.onload = function() {
  console.log('It works!');

  // Remove preloader
  setTimeout(function() {
    document.querySelector('.preloader').classList.add('done');
  }, 250);

  canvas = document.querySelector('#canvas');
  canvas.width  = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext('2d');

  bindEvents();
  init();

  var animate = function() {
    requestAnimationFrame(animate);
    handleInput();
    update();
    render();
  };
  animate();
};

function fullscreen(element) {
  var func = element.requestFullscreen ||
             element.webkitRequestFullscreen ||
             element.mozRequestFullscreen;
  func.call(element);
}

function bindEvents() {
  window.onresize = resize;
  if (device.desktop()) {
    window.onkeyup = function(event) {
      Keyboard.keyUp(event.keyCode);
    };
    window.onkeydown = function(event) {
      Keyboard.keyDown(event.keyCode);
    };
    canvas.oncontextmenu = function(event) {
      // event.preventDefault();
    };
  }
  else if (device.tablet() || device.mobile()) {
    canvas.ontouchstart = function(event) {
      event.preventDefault();
      var touch = {
        x: (event.changedTouches[0].pageX - wrapper.offsetLeft) / scale,
        y: (event.changedTouches[0].pageY - wrapper.offsetTop) / scale
      };

      ongoingTouches.push(touch);
    };
    canvas.ontouchend = function(event) {
      event.preventDefault();

      var endTouches = event.changedTouches;
      for (var i = 0; i < endTouches.length; i++) {
        ongoingTouches.splice(i, 1);
      }
    };
  }
};

function resize() {
  console.log('Resized!');

  scale = (window.innerHeight) / HEIGHT;
  if (WIDTH * scale > window.innerWidth) {
    scale = window.innerWidth / WIDTH;
  }

  canvas.width  = WIDTH * scale;
  canvas.height = HEIGHT * scale;

  ctx.imageSmoothingEnabled = false;

  var prefixes = ['moz', 'o', 'webkit', 'ms'];
  for (var prefix of prefixes) {
    ctx[prefix + 'ImageSmoothingEnabled'] = false;
  }
}

function init() {
  resize();

  var obj = JSON.parse(readFile('level.json'));

  // var lvl = decodeURIComponent(location.search);
  // lvl = lvl.slice(lvl.indexOf('=') + 1);
  // var obj = JSON.parse(lvl);
  Level.load(obj);

  Physics.boxes = Level.grounds;

  // Level.coins.push(new Coin(50, 120));
  // Level.coins.push(new Coin(60, 120));
  // Level.coins.push(new Coin(70, 120));
  // Level.coins.push(new Coin(80, 120));
  // Level.coins.push(new Coin(90, 120));

  Level.texts.push(new Text('Привет, это Рафаэль бета :)\nУра!').play(() => {
    console.log('Done!');
  }));

  // Level.enemies.push(new Monster(60, 20));

  // GUI
  coinBar     = new CoinBar;
  deathScreen = new DeathScreen;
  pauseScreen = new PauseScreen;
  if (device.tablet() || device.mobile()) {
    MobileInterface.init();
  }

  actor = new Actor(Level.respawn.x, Level.respawn.y);
};

function handleInput() {
  if (actor.dead) {
    if (device.desktop()) {
      if (Keyboard.isPressed(Keyboard.ENTER)) {
        restart();
      }
    }
    else if (device.tablet() || device.mobile()) {
      if (ongoingTouches.length > 0) {
        restart();
      }
    }
  }
  else {
    if (device.desktop()) {
      if (Keyboard.isPressed(Keyboard.UP)) {
        actor.jump();
      }
      
      if (Keyboard.isPressed(Keyboard.LEFT)) {
        actor.left();
      }
      else if (Keyboard.isPressed(Keyboard.RIGHT)) {
        actor.right();
      }
      else {
        actor.stop();
      }

      // Restart
      if (Keyboard.isPressed(Keyboard.R)) {
        restart();
      }
      // Pause
      if (canPause && Keyboard.isPressed(Keyboard.ESCAPE)) {
        paused = !paused;

        canPause = false;
        setTimeout(() => {
          canPause = true;
        }, 200);
      }
    }
    else if (device.tablet() || device.mobile()) {
      if (ongoingTouches.length > 0) {
        ongoingTouches.forEach(function(touch) {
          if (MobileInterface.up.contains(touch.x, touch.y)) {
            actor.jump();
          }

          if (MobileInterface.left.contains(touch.x, touch.y)) {
            actor.left();
          }
          else if (MobileInterface.right.contains(touch.x, touch.y)) {
            actor.right();
          }
        });
      }
      else {
        actor.stop();
      }
    }
  }
};

function update() {
  if (paused) {
    return;
  }

  // Camera
  if (!actor.dead) {
    camera.x += ((actor.x + actor.width/2 - camera.x) - WIDTH / 2) * 0.05;
    // camera.y += ((actor.y - camera.y) - HEIGHT / 2) * .05;
  }
  
  if (camera.x < 0) {
    camera.x = 0;
  }
  // if (camera.x > (Level.x + Level.w) - WIDTH) {
  //   camera.x = (Level.x + Level.w) - WIDTH;
  // }
  if (camera.y < 0) {
    camera.y = 0;
  }
  else if (camera.y > (Level.y + Level.h) - HEIGHT) {
    camera.y = (Level.y + Level.h) - HEIGHT;
  }

  for (var sprite of Level.sprites) {
    if (actor.dead) {
      break;
    }

    if (sprite.aabb().intersects(actor.aabb)) {
      sprite.ontouch.forEach(function(action) {
        switch (action) {
          case 'appear':
            sprite.visible = true;
            break;
          case 'die':
            actor.die();
            break;
        }
        // Level.sprites.remove(sprite);
      });
    }
  }

  for (var enemy of Level.enemies) {
    if (!actor.dead && enemy.aabb.intersects(actor.aabb)) {
      // Actor at top
      if (actor.dy > 0) {
        enemy.die(() => {
          Level.enemies.remove(enemy);
        });

        actor.onGround = true;
        actor.jump();
      }
      else {
        actor.die();
      }
    }
    Physics.updateEntity(enemy);
  }

  if (!actor.dead) {
    Physics.updateEntity(actor);
  }
  else {
    actor.dy += Physics.gravity;
    actor.update();
  }

  for (var flag of Level.flags) {
    if (flag.aabb.intersects(actor.aabb)) {
      flag.swapImg();
      Level.respawn.x = flag.x - 20;
      Level.respawn.y = flag.y;
    }
  }

  // for (var coin of Level.coins) {
  //   if (coin.aabb.intersects(actor.aabb)) {
  //     Level.coins.remove(coin);

  //     var effect = new CoinEffect(coin.x, coin.y);
  //     Level.effects.push(effect);
      
  //     coinBar.add(1);

  //     var sound = new Audio('sounds/coin.mp3');
  //     sound.play();
  //   }
  //   else {
  //     coin.update();
  //   }
  // }

  // for (var effect of Level.effects) {
  //   if (effect.anim.playedOnce) {
  //     Level.effects.remove(effect);
  //   }
  //   else {
  //     effect.update();
  //   }
  // }

  for (var trigger of Level.triggers) {
    if (actor.aabb.intersects(trigger)) {
      var action = trigger.userData.action;
      switch (action) {
        case 'die':
          actor.die();
          break;
      }
      
      Level.triggers.remove(trigger);
    }
  }

  // Collisions
  if (actor.x < Level.x) {
    actor.x = Level.x;
  }
  else if (actor.x + actor.width > Level.x + Level.w) {
    actor.x = Level.x + Level.w - actor.width;
  }
  // if (actor.y < Level.y) {
  //   actor.y = Level.y;
  // }
  if (actor.y + actor.height > Level.y + Level.h) {
    if (!actor.dead) {
      actor.die();
      lives--;
    }
  }

  // todo: remove
  // for (var ground of Level.grounds) {
  //   if (!ground.existing) {
  //     continue;
  //   }

  //   for (var enemy of Level.enemies) {
  //     Physics.checkCollision(enemy, ground);
  //   }
    
  //   if (!actor.dead) {
  //     Physics.checkCollision(actor, ground);
  //   }
  // }

  for (var text of Level.texts) {
    text.update();
  }

  // GUI
  coinBar.update();
  if (actor.dead) {
    deathScreen.update();
  }
}

function render() {
  ctx.fillStyle = '#B2EBF2';
  ctx.fillRect(0, 0, WIDTH * scale, HEIGHT * scale);

  // Background
  if (Level.bg) {
    ctx.drawImage(Level.bg, 0, 0);
  }

  ctx.save();
  ctx.scale(scale, scale * .8);
  var x = camera.x;
  var y = camera.y;
  ctx.translate(-x, -y);
  // ctx.translate((-camera.x).toFixed(1), (-camera.y).toFixed(1));

  var renders = 0;
  for (var sprite of Level.sprites) {
    // if (camera.aabb().intersects(sprite.aabb())) {
      
    // }
    if (sprite.visible) {
      sprite.render(ctx);
      renders++;
    }
  }
  numOfRenders = renders;

  // for (var flag of Level.flags) {
  //   flag.draw(ctx, flag.x, flag.y);
  // }

  // for (var coin of Level.coins) {
  //   coin.draw(ctx, coin.x, coin.y);
  // }

  // for (var enemy of Level.enemies) {
  //   enemy.render(ctx, enemy.x, enemy.y);
  // }

  // for (var ground of Level.grounds) {
  //   // test
  //   var x = ground.x + 0.5;
  //   var y = ground.y + 0.5;

  //   if (!(x > camera.x + WIDTH || x + ground.width < camera.x)) {
  //     ctx.strokeStyle = 'green';
  //     ctx.strokeRect(
  //       x + .5,
  //       y + .5,
  //       ground.width,
  //       ground.height
  //     );
  //   }
  // }

  for (var text of Level.texts) {
    text.render(ctx, 25, 20);
  }

  actor.render(ctx, actor.x, actor.y);

  // for (var effect of Level.effects) {
  //   effect.draw(ctx, effect.x, effect.y);
  // }

  ctx.restore();
  ctx.save();
  ctx.scale(scale, scale);

  // GUI
  for (var i = 0; i < lives; i++) {
    ctx.drawImage(lifeImg, 1 + i * lifeImg.width + i, 1);
  }

  if (actor.dead) {
    deathScreen.render(ctx);
  }
  else {
    if (device.tablet() || device.mobile()) {
      MobileInterface.render(ctx);
    }

    // coinBar.render(ctx);
  }

  if (paused) {
    pauseScreen.render(ctx);
  }

  ctx.restore();
}

function restart() {
  deathScreen.reset();

  // Level.gameObjects = [];
  Level.reload();

  actor.dead = false;
  actor.facingRight = true;
  actor.dy = actor.dx = 0;

  actor.x = Level.respawn.x;
  actor.y = Level.respawn.y;
}

})();