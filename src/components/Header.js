import { BouncerComponent } from "@/components/BouncerComponent";

export class Header extends BouncerComponent {
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["mousedown", "keydown"],
      ...options
    });
  }

  static className = "bouncer__header";
  static tag = "div";
  toHTML() {
    return `
      <h1>Header</h1>
      <button id="stop_button">Stop</button>
    `;
  }
  init() {
    const stopButton = this.$root.find("#stopButton");
  }
}
