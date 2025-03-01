const loader = document.querySelector(".wrapper-loader");
const login = document.querySelector(".login");
const loginForm = login.querySelector(".login__form");
const loginInput = login.querySelector(".login__input");
const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMessages = chat.querySelector(".chat__messages");

const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "gold"
];

export {
  loader,
  login,
  loginForm,
  loginInput,
  chat,
  chatForm,
  chatInput,
  chatMessages,
  colors
}