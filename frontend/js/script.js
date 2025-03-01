import {
  loader,
  login,
  loginForm,
  loginInput,
  chat,
  chatForm,
  chatInput,
  chatMessages,
  colors
} from "./dom-setup/index.js";
import { User } from "./users/index.js";
import { Service } from "./ws/index.js";

const user = new User(null, null, null);
const ws = new Service();

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const handleLogin = (event) => {
  loader.style.display = "flex";
  event.preventDefault();

  user.setId(crypto.randomUUID());
  user.setName(loginInput.value);
  user.setColor(getRandomColor());

  ws.setConnection();
  ws.onopen();

  login.style.display = "none";
  chat.style.display = "flex";

  /* parei aqui */
  ws.setProcess(user);
}

const sendMessage = (event) => {
  event.preventDefault();

  const message = {
    userId: user.getId(),
    userName: user.getName(),
    userColor: user.getColor(),
    content: chatInput.value
  }

  ws.send(JSON.stringify(message));

  chatInput.value = "";
}

loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);