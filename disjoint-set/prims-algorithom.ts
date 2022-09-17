//implementation of prims algorithm

function primsAlgorithm(n: number, edges: number[][]): number[][] {


    // declare mstSet
    let mstSet = new Set();
    //declare result
    let result: number[][] = [];
    //declare key
    let key = new Array(n);
    //declare parent
    let parent = new Array(n);
    //declare minHeap
    let minHeap = new MinHeap();
    //initialize key
    for (let i = 0; i < n; i++) {
        key[i] = Number.MAX_SAFE_INTEGER;
    } 
    
    
    //initialize parent
    for (let i = 0; i < n; i++) {
        parent[i] = -1;
    }

    //create graph from edges
    let graph = new Graph(n);
    for (let i = 0; i < edges.length; i++) {
        let edge = edges[i];
        let u = edge[0];
        let v = edge[1];
        let w = edge[2];
        graph.addEdge(u, v, w);
    }


    //initialize key
    key[0] = 0;
    minHeap.enqueue(0, key[0]);

    //while minHeap is not empty
    while (!minHeap.isEmpty()) {
        //extract min
        let u = minHeap.dequeue();
        //add u to mstSet
        mstSet.add(u);
        //loop through edges
        for (let i = 0; i < graph.adjList[u].length; i++) {
            let v = graph.adjList[u][i].vertex;
            let w = graph.adjList[u][i].weight;
            if (!mstSet.has(v) && key[v] > w) {
                key[v] = w;
                minHeap.enqueue(v, key[v]);
                parent[v] = u;
            }
        }
    }

    //loop through parent
    for (let i = 1; i < n; i++) {
        result.push([parent[i], i, key[i]]);
    }

    return result;
}


class Graph{
    adjList: any[];
    constructor(n: number){
        this.adjList = new Array(n);
        for (let i = 0; i < n; i++) {
            this.adjList[i] = [];
        }
    }
    addEdge(u: number, v: number, w: number){
        this.adjList[u].push({vertex: v, weight: w});
        this.adjList[v].push({vertex: u, weight: w});
    }
}

class MinHeap{
    heap: any[];
    constructor(){
        this.heap = [];
    }
    isEmpty(){
        return this.heap.length === 0;
    }
    dequeue(){
        let min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.minHeapify(0);
        return min;
    }
    enqueue(i: number, key: number){
        this.heap[i] = key;
        while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
            let temp = this.heap[i];
            this.heap[i] = this.heap[this.parent(i)];
            this.heap[this.parent(i)] = temp;
            i = this.parent(i);
        }
    }
    parent(i: number){
        return Math.floor((i - 1) / 2);
    }
    minHeapify(i: number){
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let smallest = i;
        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        if (smallest !== i) {
            let temp = this.heap[i];
            this.heap[i] = this.heap[smallest];
            this.heap[smallest] = temp;
            this.minHeapify(smallest);
        }
    }
}