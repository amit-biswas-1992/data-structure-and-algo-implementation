function lengthOfLIS(nums: number[], k: number): number {
    let max = Math.max(...nums)
    
    let segTree = new SegmentTree(max)
    
    let maxSequence = 0
    for(let num of nums){
        let l = Math.max(1,num - k)
        let r = num - 1
        
        let currentMax = segTree.query(l,r)
        console.log(currentMax)
        
        segTree.update(num,currentMax+1)
        
        maxSequence = Math.max(maxSequence,currentMax+1)

        
    }
    
    return maxSequence
};

class SegmentTree{
    n: number
    tree: number[]

    constructor(n: number){
        this.n = n
        this.tree = Array(this.n*4).fill(0)
    }
    

    
    update(index: number, value: number){
        this.updateTree(0,this.n-1,index,0,value)
    }
    query(left: number, right: number){
        return this.queryTree(0,this.n-1,left,right,0)
    }

    updateTree(s: number, e: number, index: number, node: number, value: number){
        if(s==e){
            this.tree[node] = value
            return
        }

        let mid = s + Math.floor((e-s)/2)
        
        if(index <= mid) this.updateTree(s,mid,index,2*node+1,value)
        else this.updateTree(mid+1,e,index,2*node+2,value)
        
        this.tree[node] = Math.max(this.tree[2*node+1],this.tree[2*node+2])

        
    }

    queryTree(s: number, e: number, l: number, r: number, node: number): number{
        if(s>=l && e<=r) return this.tree[node]
        if(e<l || s>r) return 0

        let mid = s + Math.floor((e-s)/2)
        let left = this.queryTree(s,mid,l,r,2*node+1)
        let right = this.queryTree(mid+1,e,l,r,2*node+2)
        return Math.max(left,right)
    }

}

//test
let nums = [1,2,3,4,5,6,7,8,9,10]
let k = 2
console.log(lengthOfLIS(nums,k))