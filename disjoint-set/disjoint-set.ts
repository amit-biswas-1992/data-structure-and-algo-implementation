class DisjointSet{
    
    private parent: number[];
    private rank: number[];

    constructor(n: number){
        this.parent = new Array(n);
        this.rank = new Array(n);
        for(let i = 0; i < n; i++){
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }
    find(x: number): number{
        if(this.parent[x] !== x){
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    union(x: number, y: number): void{
        let xRoot = this.find(x);
        let yRoot = this.find(y);
        if(xRoot === yRoot) return;
        if(this.rank[xRoot] < this.rank[yRoot]){
            this.parent[xRoot] = yRoot;
        }else if(this.rank[xRoot] > this.rank[yRoot]){
            this.parent[yRoot] = xRoot;
        }else{
            this.parent[yRoot] = xRoot;
            this.rank[xRoot]++;
        }
    }
}