//find articulation points in a graph
//articulation points are vertices that if removed will increase the number of connected components

//explaination of implementation:
//https://www.youtube.com/watch?v=2kREIkF9UAs

//VV note: if we want to make a graph stronger, 
//we add extra edge for articulation point, because removing it, graph will be disconnted

//init node number
let n: number = 6;

//init graph
const graph = []

//add edges
graph[0] = [1, 2]
graph[1] = [0, 2]
graph[2] = [0, 1, 3, 4, 5]
graph[3] = [2, 4]
graph[4] = [2, 3, 5]
graph[5] = [2, 4]

//init visited array
const visited: boolean[] = Array(n).fill(false)

function findArticulationPoints(graph: number[][], visited: boolean[], n: number) {
    //init parent array
    const parent: number[] = Array(n).fill(-1)

    //init discovery time array
    const discoveryTime: number[] = Array(n).fill(-1)

    //init low time array
    //low time of a node is the earliest visited node that can be reached from subtree rooted with that node
    const lowTime: number[] = Array(n).fill(-1)

    //init time
    let time: number = 0

    //init articulation points array
    const articulationPoints: number[] = []

    //loop through all nodes
    for (let i = 0; i < n; i++) {
        //if node is not visited
        if (!visited[i]) {
            //find articulation points
            findArticulationPointsUtil(graph, visited, n, i, parent, discoveryTime, lowTime, time, articulationPoints)
        }
    }

    //return articulation points
    return articulationPoints
}

function findArticulationPointsUtil(graph: number[][], visited: boolean[], n: number, node: number, parent: number[], discoveryTime: number[], lowTime: number[], time: number, articulationPoints: number[]) {
    //mark node as visited
    visited[node] = true

    //increase time
    time++

    //set discovery time
    discoveryTime[node] = time

    //set low time
    lowTime[node] = time

    //init children count
    let childrenCount: number = 0

    //loop through all neighbors
    for (let i = 0; i < graph[node].length; i++) {
        //get neighbor
        const neighbor: number = graph[node][i]

        //if neighbor is not visited
        if (!visited[neighbor]) {
            //increase children count
            childrenCount++

            //set parent of neighbor
            parent[neighbor] = node

            //find articulation points
            findArticulationPointsUtil(graph, visited, n, neighbor, parent, discoveryTime, lowTime, time, articulationPoints)

            //update low time
            lowTime[node] = Math.min(lowTime[node], lowTime[neighbor])

            //if parent is -1 and children count is greater than 1
            if (parent[node] === -1 && childrenCount > 1) {
                //add node to articulation points
                articulationPoints.push(node)
            }

            //condition: if lowtime of node is greater than or equal to it parent's discovery time, then parent is articulation point
            //if parent is not -1 and low time of neighbor is greater than discovery time of node
            if (parent[node] !== -1 && lowTime[neighbor] >= discoveryTime[node]) {
                //add node to articulation points
                articulationPoints.push(node)
            }
        }

        //if neighbor is not parent of node
        else if (neighbor !== parent[node]) {
            //update low time
            lowTime[node] = Math.min(lowTime[node], discoveryTime[neighbor])
        }
    }
}

//find articulation points
const articulationPoints: number[] = findArticulationPoints(graph, visited, n)

//print articulation points
console.log(articulationPoints)





