//implementation of kruskal tree


function kruskalTree(n: number, edges: number[][]): number[][] {
    //sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);
    const ds = new DisjointSet(n);
    const result: number[][] = [];
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const x = edge[0];
        const y = edge[1];
        if (ds.find(x) !== ds.find(y)) {
            ds.union(x, y);
            result.push(edge);
        }
    }
}