export class MaxFlow{
    graph: number[][];
    source: number;
    sink: number;
    parent: number[];
    constructor(graph: number[][], source: number, sink: number){
        this.graph = graph;
        this.source = source;
        this.sink = sink;
        this.parent = new Array(graph.length).fill(-1);
    }
    bfs(){
        let visited = new Array(this.graph.length).fill(false);
        let queue: number[] = [];
        queue.push(this.source);
        visited[this.source] = true;
        while(queue.length > 0){
        let current: number = queue.shift() ?? 0;
        for(let i = 0; i < this.graph.length; i++){
            if(!visited[i] && this.graph[current][i] > 0){
            queue.push(i);
            visited[i] = true;
            this.parent[i] = current;
            }
        }
        }
        return visited[this.sink];
    }
    fordFulkerson(){
        let maxFlow = 0;
        while(this.bfs()){
        let pathFlow = Number.MAX_SAFE_INTEGER;
        let current = this.sink;
        while(current != this.source){
            let previous = this.parent[current];
            pathFlow = Math.min(pathFlow, this.graph[previous][current]);
            current = previous;
        }
        current = this.sink;
        while(current != this.source){
            let previous = this.parent[current];
            this.graph[previous][current] -= pathFlow;
            this.graph[current][previous] += pathFlow;
            current = previous;
        }
        maxFlow += pathFlow;
        }
        return maxFlow;
    }
}