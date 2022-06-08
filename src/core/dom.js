class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.createElement(selector)
        : selector;
  }
  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  text(text) {
    if (typeof text === "string") {
      this.$el.textContent = text;
      return this;
    }
    return this.$el.textContent.trim();
  }
  on(event, callback) {
    this.$el.addEventListener(event, callback);
  }
  off(event, callback) {
    this.$el.removeEventListener(event, callback);
  }
  clear() {
    this.html("");
    return this;
  }
  blur() {
    this.$el.blur();
    return this;
  }
  focus() {
    this.$el.focus();
    return this;
  }

  get data() {
    return this.$el.dataset;
  }
  append(node) {
    const childNode = node instanceof Dom ? node.$el : node;
    if (Element.prototype.append) {
      this.$el.append(childNode);
    } else {
      this.$el.appendChild(childNode);
    }
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  find(selector) {
    const $el = this.$el.querySelector(selector);
    if ($el) {
      return $($el);
    }
    return null;
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }
  attrs(fields = {}) {
    Object.keys(fields).forEach((key) => {
      this.$el[key] = fields[key];
    });
  }
  addClass(className) {
    this.$el.classList.add(className);
  }
  removeClass(className) {
    this.$el.classList.remove(className);
  }
  getContext(type) {
    return this.$el.getContext(type);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes && typeof classes === "string") {
    el.classList.add(classes);
  }
  return $(el);
};
