import { chatInput } from "../dom-setup/index.js";
class Node {
  constructor() {
    this.child = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
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
        return;
      }

      node = node.child[letter];
    }

    const possibilities = [];
    this.backtrack(node, input, possibilities);
    return possibilities;
  }

  backtrack(node, prefix, results) {
    if (node.end) {
      results.push(prefix);
    }

    for (const child in node.child) {
      this.backtrack(node.child[child], prefix + child, results);
    }
  }

  getWordsPrefixes(prefix) {
    const possibleResults = this.show(prefix);
    console.log(possibleResults);
  }

  setWordPrefixes() {
    const words = chatInput.value.split(" ");
    for (const word of words) {
      this.add(word);
    }
  }
}

export default Trie;