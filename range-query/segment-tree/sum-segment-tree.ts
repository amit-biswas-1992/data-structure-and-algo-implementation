//segment tree implementation without lazy propagation

export default class SegmentTree{
    private segmentTree: number[]
    private array: number[]
    private n: number

    constructor(array: number[]){
        this.array = array
        this.n = array.length
        this.segmentTree = Array(4 * this.n).fill(0)
        this.buildSegmentTree(0, this.n - 1, 0)
    }

    //here start and end are the start and end index of the original array
    //index is the index of the segment tree
    private buildSegmentTree(start: number, end: number, index: number){
        if(start === end){
            this.segmentTree[index] = this.array[start]
            return
        }

        const mid = Math.floor((start + end) / 2)
        this.buildSegmentTree(start, mid, 2 * index + 1)
        this.buildSegmentTree(mid + 1, end, 2 * index + 2)
        this.segmentTree[index] = this.segmentTree[2 * index + 1] + this.segmentTree[2 * index + 2]
    }

    private updateSegmentTree(start: number, end: number, index: number, updateIndex: number, value: number){
        if(start === end){
            this.array[updateIndex] = value
            this.segmentTree[index] = value
            return
        }

        const mid = Math.floor((start + end) / 2)
        if(updateIndex >= start && updateIndex <= mid){
            this.updateSegmentTree(start, mid, 2 * index + 1, updateIndex, value)
        }else{
            this.updateSegmentTree(mid + 1, end, 2 * index + 2, updateIndex, value)
        }

        this.segmentTree[index] = this.segmentTree[2 * index + 1] + this.segmentTree[2 * index + 2]
    }

    private querySegmentTree(start: number, end: number, index: number, queryStart: number, queryEnd: number): number{
        if(start >= queryStart && end <= queryEnd){
            return this.segmentTree[index]
        }

        if(end < queryStart || start > queryEnd){
            return 0
        }

        const mid = Math.floor((start + end) / 2)
        const left = this.querySegmentTree(start, mid, 2 * index + 1, queryStart, queryEnd)
        const right = this.querySegmentTree(mid + 1, end, 2 * index + 2, queryStart, queryEnd)
        return left + right
    }

    public update(index: number, value: number){
        this.updateSegmentTree(0, this.n - 1, 0, index, value)
    }

    public query(queryStart: number, queryEnd: number): number{
        return this.querySegmentTree(0, this.n - 1, 0, queryStart, queryEnd)
    }

    public getSegmentTree(){
        return this.segmentTree
    }

    public getArray(){
        return this.array
    }


    
}











