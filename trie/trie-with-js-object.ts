//trie implementation with js object
class Trie {
    root: any;
    constructor() {
        this.root = {};
    }
    
    insert(word) {
        let node = this.root;
        for (let char of word) {
        if (!node[char]) {
            node[char] = {};
        }
        node = node[char];
        }
        node.isWord = true;
    }
    
    search(word) {
        let node = this.root;
        for (let char of word) {
        if (!node[char]) {
            return false;
        }
        node = node[char];
        }
        return node.isWord === true;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
        if (!node[char]) {
            return false;
        }
        node = node[char];
        }
        return true;
    }
    }

    