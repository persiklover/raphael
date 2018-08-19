function Trigger(x, y, width, height) {
  this.bbox = new BBox(x, y, width, height);
  this.createdElements = [];
  this.deletedElements = [];
}

Trigger.prototype.activate = function() {
  this.createdElements.forEach(function(i) {
    if (!i) {
      console.error("Index " + i + " doesn\'t exist!");
    }
    
    Level.elements[i].existing = true;
  });
  
  this.deletedElements.forEach(function(i) {
    if (!i) {
      console.error("Index " + i + " doesn\'t exist!");
    }

    Level.elements[i].existing = false;
  });
};