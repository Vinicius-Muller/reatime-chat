import { loader, chatMessages, chatInput, loginInput, login, chat } from '../dom-setup/index.js';
import { API_KEY } from '../../api.js';
export class Service {
  #ws
  constructor() {
    this.#ws;
  }

  setConnection() {
    this.#ws = new WebSocket(API_KEY);
    this.#ws.addEventListener("open", () => {
      loader.style.display = "none";
      login.style.display = "none";
      chat.style.display = "flex";
    });
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
    this.#ws.addEventListener("message", (event) => {
      this.processMessage(event.data, user);
    })
  }

  processMessage(data, user) {
    const { userId, userName, userColor, content } = JSON.parse(data);

    const message = userId === user.getId() ?
      this.createMessageSelfElement(content) :
      this.createMessageOtherElement(content, userName, userColor);

    const element = message;
    chatMessages.appendChild(element);
    this.scrollScreen();
  }

  handleLogin(event, user) {
    loader.style.display = "flex";
    event.preventDefault();

    user.setId(crypto.randomUUID());
    user.setName(loginInput.value);
    user.setColor();

    this.setConnection();
    this.setProcess(user);
  }


  sendMessage(event, user) {
    event.preventDefault();

    const message = {
      userId: user.getId(),
      userName: user.getName(),
      userColor: user.getColor(),
      content: chatInput.value
    }

    this.#ws.send(JSON.stringify(message));
    chatInput.value = "";
  }
}