import SegmentTree from "./segment-tree"

//test segment tree
const segmentTree = new SegmentTree([1, 3, 5, 7, 9, 11])
//update segment tree
segmentTree.update(1, 10)
//query segment tree
console.log(segmentTree.query(1, 3))
//print segment tree
console.log(segmentTree.getSegmentTree())

// Language: typescript
// Path: interview prep/data-structure-implementation/typescript/segment-tree/index.ts