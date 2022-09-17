//implement trie 

class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    constructor() {
        this.children = new Map();
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
            let node = current.children.get(ch);
            if (node == null) {
                node = new TrieNode();
                current.children.set(ch, node);
            }
            current = node;
        }
        current.isEndOfWord = true;
    }
    search(word: string): boolean {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            let ch = word[i];
            let node = current.children.get(ch);
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
            return current.children.size == 0;
        }
        let ch = word[index];
        let node = current.children.get(ch);
        if (node == null) {
            return false;
        }
        let shouldDeleteCurrentNode = this.deleteHelper(node, word, index + 1);
        if (shouldDeleteCurrentNode) {
            current.children.delete(ch);
            return current.children.size == 0;
        }
        return false;
    }
}
