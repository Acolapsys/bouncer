export class Emitter {
  constructor() {
    this.listeners = {};
  }

  $on(e, fx) {
    if (this.listeners[e] == undefined) {
      this.listeners[e] = [];
    }
    this.listeners[e].push(fx);
    return {
      off: () => {
        this.listeners[e] = this.listeners[e].filter(function (listener) {
          return listener !== fx;
        });
      }
    };
  }

  $emit(e, data) {
    if (this.listeners[e] == undefined) {
      return;
    }

    this.listeners[e].forEach((listener) => {
      listener(data);
    });
  }
}
