class Subject {
  constructor() {
    this.observers = [];
  }

  notify(data) {
    for (let observer of this.observers) {
      observer.onNotify(data);
    }
  }
}

class Observer {
  observe(subject) {
    subject.observers.push(this);
    return this;
  }

  onNotify(data) {
    // default behaviour
    console.log(data);
  }
}