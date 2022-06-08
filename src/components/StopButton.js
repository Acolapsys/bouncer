import { BouncerComponent } from "@/components/BouncerComponent";

const BUTTON_TITLES = Object.freeze({
  STOP: "Click the field",
  START: "Stop"
})

export class StopButton extends BouncerComponent {
  constructor($root, options) {
    super($root, {
      name: "StopButton",
      listeners: ["click"],
      ...options
    });
    this.title = BUTTON_TITLES.STOP;
  }
  init() {
    super.init();
    this.observer.$on("table:stop", () => {
      this.changeTitle(BUTTON_TITLES.STOP);
    });
    this.observer.$on("table:start", () => {
      this.changeTitle(BUTTON_TITLES.START);
    });
  }

  static className = "bouncer__stop_button";
  static tag = "div";
  toHTML() {
    return `
    <button id="stop_button" >${this.title}</button>
    `;
  }

  changeTitle(title) {
    const $button = this.$root.find("#stop_button")
    $button.text(title)

  }

  onClick(e) {
    e.preventDefault();
    this.observer.$emit("button:stop");
  }
}
