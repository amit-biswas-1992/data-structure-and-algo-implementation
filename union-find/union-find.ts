//implementation of union find
class UnionFind {
    private parent: number[];
    private rank: number[];
    private count: number;
    
    constructor(n: number) {
        this.count = n;
        this.parent = new Array(n);
        this.rank = new Array(n);
        for (let i = 0; i < n; i++) {
        this.parent[i] = i;
        this.rank[i] = 1;
        }
    }
    
    find(p: number): number {
        while (p != this.parent[p]) {
        this.parent[p] = this.parent[this.parent[p]];
        p = this.parent[p];
        }
        return p;
    }
    
    union(p: number, q: number): void {
        let rootP = this.find(p);
        let rootQ = this.find(q);
        if (rootP == rootQ) return;
        if (this.rank[rootP] > this.rank[rootQ]) {
        this.parent[rootQ] = rootP;
        } else if (this.rank[rootP] < this.rank[rootQ]) {
        this.parent[rootP] = rootQ;
        } else {
        this.parent[rootQ] = rootP;
        this.rank[rootP]++;
        }
        this.count--;
    }
    
    connected(p: number, q: number): boolean {
        return this.find(p) == this.find(q);
    }
    
    getCount(): number {
        return this.count;
    }
    }