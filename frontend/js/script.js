import {
  loginForm,
  chatForm,
  chatInput,
} from "./dom-setup/index.js";
import { User } from "./users/index.js";
import { Service } from "./ws/index.js";
import Trie from "./autocomplete/index.js";

const user = new User(null, null, null);
const ws = new Service();
const autocomplete = new Trie()

chatInput.addEventListener("input", (event) => {
  autocomplete.getWordsPrefixes(event.target.value)
})

loginForm.addEventListener("submit", (event) => {
  ws.handleLogin(event, user)
});

chatForm.addEventListener("submit", (event) => {
  autocomplete.setWordPrefixes();
  ws.sendMessage(event, user);
});
