import { Table } from "@/components/Table";
import { $ } from "../core/dom";
import { Emitter } from "../core/Emitter";
import { StopButton } from "./StopButton";
export class Bouncer {
  constructor(selector) {
    this.$el = $(document.querySelector(selector));
    this.components = [Table, StopButton];
    this.observer = new Emitter();
  }

  render() {
    this.$el.append(this.getRoot());
    this.init();
  }

  getRoot() {
    const $root = $.create("div", "bouncer");
    this.components = this.components.map((Component) => {
      const $el = $.create(Component.tag, Component.className);
      const component = new Component($el, {
        observer: this.observer
      });

      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  init() {
    this.components.forEach((c) => {
      c.init();
    });
  }
  destroy() {
    this.components.forEach((c) => {
      c.destroy();
    });
  }
}
