import { autocompleteOptions, chatInput } from "../dom-setup/index.js";
class Node {
  constructor() {
    this.child = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  saveTrieData() {
    localStorage.setItem("autocomplete", JSON.stringify(this.root));
  }

  getTrieData() {
    const data = localStorage.getItem("autocomplete");

    if (data) {
      this.root = JSON.parse(data);
    }
  }

  add(word) {
    let node = this.root;
    for (const letter of word) {
      if (!node.child[letter]) {
        node.child[letter] = new Node();
      }

      node = node.child[letter];
    }
    node.end = true;
  }

  show(input) {
    if (!input.trim().length) {
      return [];
    }

    let node = this.root;
    for (const letter of input) {
      if (!node.child[letter]) {
        return [];
      }

      node = node.child[letter];
    }

    const possibilities = new Map();
    this.backtrack(node, input, possibilities);
    return possibilities;
  }

  backtrack(node, prefix, results) {
    if (node.end) {
      results.set(prefix, prefix);
    }

    for (const child in node.child) {
      this.backtrack(node.child[child], prefix + child, results);
    }
  }

  otionsEvent(possibility) {
    const textWords = chatInput.value.split(" ");
    textWords[textWords.length - 1] = possibility;
    chatInput.value = textWords.join(" ");
    autocompleteOptions.innerHTML = "";
    chatInput.focus();
  }

  printPossibilities(possibilities) {
    autocompleteOptions.innerHTML = "";
    possibilities.forEach((possibility) => {
      const option = document.createElement("span");
      option.tabIndex = "0";
      option.textContent = possibility;

      option.addEventListener("click", () => {
        this.otionsEvent(possibility);
      });

      option.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          this.otionsEvent(possibility);
        }
      });

      autocompleteOptions.appendChild(option);
    });
  }

  getWordsPrefixes(prefix) {
    const currentWord = prefix.split(" ");
    const possibleResults = this.show(currentWord[currentWord.length - 1]);
    this.printPossibilities(possibleResults);
  }

  setWordPrefixes() {
    const words = chatInput.value.split(" ");
    for (const word of words) {
      this.add(word);
    }

    this.saveTrieData();
  }
}

export default Trie;