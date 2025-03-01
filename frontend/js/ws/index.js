import dotenv from 'dotenv';
import { loader, chatMessages, window } from '../dom-setup';
dotenv.config();

export class Service {
  #ws
  constructor() {
    this.#ws;
  }

  setConnection() {
    this.#ws = new WebSocket(process.env.API_URL);
  }

  onopen() {
    loader.style.display = "none";
  }

  createMessageSelfElement(content) {
    const div = document.createElement("div");

    div.classList.add("message__self");
    div.innerHTML = content;

    return div;
  }

  createMessageOtherElement(content, sender, senderColor) {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("message__others");
    span.classList.add("message__sender");
    span.style.color = senderColor;

    div.appendChild(span)

    span.innerHTML = sender;
    div.innerHTML += content;

    return div;
  }

  scrollScreen() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    })
  }

  setProcess(user) {
    this.#ws = this.processMessage(user)
  }

  processMessage({ data, user }) {
    const { userId, userName, userColor, content } = JSON.parse(data);

    const message = userId === user.getId() ?
      this.createMessageSelfElement(content) :
      this.createMessageOtherElement(content, userName, userColor);

    const element = message;
    chatMessages.appendChild(element);
    this; scrollScreen();
  }
}