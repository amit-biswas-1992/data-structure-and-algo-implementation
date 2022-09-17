//trie with array
class TrieNode {
    children: TrieNode[];
    isEndOfWord: boolean;
    constructor() {
        this.children = new Array(26);
        this.isEndOfWord = false;
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }
    insert(word: string): void {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            let ch = word[i];
            let index = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        current.isEndOfWord = true;
    }
    search(word: string): boolean {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            let ch = word[i];
            let index = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            let node = current.children[index];
            if (node == null) {
                return false;
            }
            current = node;
        }
        return current.isEndOfWord;
    }
    delete(word: string): void {
        this.deleteHelper(this.root, word, 0);
    }
    deleteHelper(current: TrieNode, word: string, index: number): boolean {
        if (index == word.length) {
            if (!current.isEndOfWord) {
                return false;
            }
            current.isEndOfWord = false;
            return current.children.every((child) => child == null);
        }
        let ch = word[index];
        let node = current.children[ch.charCodeAt(0) - 'a'.charCodeAt(0)];
        if (node == null) {
            return false;
        }
        let shouldDeleteCurrentNode = this.deleteHelper(node, word, index + 1);
        if (shouldDeleteCurrentNode) {
            current.children[ch.charCodeAt(0) - 'a'.charCodeAt(0)] = null;
        }
        return current.children.every((child) => child == null);
    }
}