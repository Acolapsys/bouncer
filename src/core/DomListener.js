import { capitalize } from "@/utils/capitalize";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No root element");
    }

    this.listeners = listeners.filter((l) => typeof l === "string");
    this.$root = $root;
  }
  initDOMListeners() {
    this.listeners.forEach((l) => {
      const callback = getMethodName(l);
      if (!this[callback]) {
        throw new Error(`Method ${callback} is not implemented in ${this.name || ''} Component`)
      }
      this[callback] = this[callback].bind(this)
      this.$root.on(l, this[callback]);
    });
  }
  removeDOMListeners() {
    this.listeners.forEach((l) => {
      const callback = getMethodName(l);
      if (!this[callback]) {
        throw new Error(`Method ${callback} is not implemented in ${this.name || ''} Component`)
      }
      this.$root.off(l, this[callback]);
    });
  }
}

function getMethodName(event) {
  return `on${capitalize(event)}`;
}
