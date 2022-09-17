function criticalEdges(n: number, edges: number[][]): number[][] {
    const result: number[][] = [];
    const ds = new DisjointSet(n);
    for(let i = 0; i < edges.length; i++){
        const edge = edges[i];
        const x = edge[0];
        const y = edge[1];
        if(ds.find(x) === ds.find(y)){
            result.push(edge);
        }else{
            ds.union(x, y);
        }
    }
    return result;
};

function spanningTree(n, edges) {
  const ds = new DisjointSet(n);
  let count = 0;
  let result = 0;
  for (const [u, v, w] of edges) {
    if (ds.find(u) !== ds.find(v)) {
      ds.union(u, v);
      result += w;
      count++;
    }
  }

  //print spanning tree
    if (count === n - 1) {
        console.log("Spanning tree exists");
        console.log("Edges in the spanning tree are: ");
        for (const [u, v, w] of edges) {
            if (ds.find(u) === ds.find(v)) {
                console.log(`${u} - ${v} with weight ${w}`);
            }
        }
    } else {
        console.log("Spanning tree does not exist");
    }

  return count === n - 1 ? result : -1;
}