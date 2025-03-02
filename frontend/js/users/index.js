import { colors } from "../dom-setup/index.js";

export class User {
  #id;
  #name;
  #color;

  constructor(id, name, color) {
    this.#id = id;
    this.#name = name;
    this.#color = color;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getColor() {
    return this.#color;
  }

  setId(id) {
    this.#id = id;
  }

  setName(name) {
    this.#name = name;
  }

  setColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    this.#color = colors[randomIndex];
  }
}