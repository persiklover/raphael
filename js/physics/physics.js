var Physics = {
  gravity: .2, // .06
  notifier: new Subject(),
  boxes: [],

  updateEntity(entity) {
    var wasOnGround = entity.onGround;

    // entity.dy += (entity.dy < 0) ? this.gravity : this.gravity * 1.25;
    entity.dy += this.gravity;
    entity.update();
    for (let box of this.boxes) {
      this.checkCollision(entity, box);
    }

    if (wasOnGround && !entity.onGround) {
      this.notifier.notify({
        entity: entity,
        state: 'START_FALLING'
      });
    }
    else if (!wasOnGround && entity.onGround) {
      this.notifier.notify({
        entity: entity,
        state: 'LANDED'
      });
    }
  },
  
  checkCollision(entity, box) {
    if (!entity.aabb.intersects(box)) {
      return;
    }

    let entityBBox = entity.aabb;
    entityBBox.offset = entityBBox.offset || { x: 0, y: 0 };
    let inter = box.intersection(entityBBox);
    if (inter.width == 0 || inter.height == 0) {
      return;
    }

    if (inter.height > inter.width) {
      if (entityBBox.cx < box.cx) {
        entity.setX(box.x - entityBBox.width - entityBBox.offset.x);

        this.notifier.notify({
          entity: entity,
          state: 'TOUCHED_RIGHT',
          box: box
        });
      }
      else {
        entity.setX(box.x + box.width - entityBBox.offset.x);

        this.notifier.notify({
          entity: entity,
          state: 'TOUCHED_LEFT',
          box: box
        });
      }
    }
    else if (inter.height < inter.width) {
      if (entityBBox.cy < box.cy) {
        // Only if entity is falling
        if (entity.dy < 0) {
          return;
        }

        entity.setY(box.y - entityBBox.height);
        entity.dy = 0;
        entity.onGround = true;

        this.notifier.notify({
          entity: entity,
          state: 'TOUCHED_BOTTOM',
          box: box
        });
      }
      else {
        entity.setY(box.y + box.height);
        entity.dy *= -0.5;

        this.notifier.notify({
          entity: entity,
          state: 'TOUCHED_TOP',
          box: box
        });
      }
    }
  }
};