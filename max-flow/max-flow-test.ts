//import maxFlow class
import { MaxFlow } from './max-flow';

let graph = [
    [0, 16, 13, 0, 0, 0],
    [0, 0, 10, 12, 0, 0],
    [0, 4, 0, 0, 14, 0],
    [0, 0, 9, 0, 0, 20],
    [0, 0, 0, 7, 0, 4],
    [0, 0, 0, 0, 0, 0]
];

//declare maxFLow object
let maxFlow = new MaxFlow(graph, 0, 5);
console.log(maxFlow.fordFulkerson())

