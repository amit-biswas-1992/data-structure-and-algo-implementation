//implement a fenwick tree - range sum query
class FenwickTree {
    nums: number[]
    fenwickTree: number[]
    //constructor
    constructor(nums) {
        this.nums = nums;
        this.fenwickTree = new Array(nums.length + 1).fill(0);
        this.buildFenwickTree();
    }
    //build fenwick tree
    buildFenwickTree() {
        for (let i = 0; i < this.nums.length; i++) {
            this.updateFenwickTree(i, this.nums[i]);
        }
    }

    //update fenwick tree
    updateFenwickTree(index, val) {
        index++;
        while (index < this.fenwickTree.length) {
            this.fenwickTree[index] += val;
            index += index & (-index);
        }
    }

    //get sum from 0 to index
    getSum(index) {
        let sum = 0;
        index++;
        while (index > 0) {
            sum += this.fenwickTree[index];
            index -= index & (-index);
        }
        return sum;
    }

    //update value at index
    update(index, val) {
        const diff = val - this.nums[index];
        this.nums[index] = val;
        this.updateFenwickTree(index, diff);
    }

    //get sum from range
    sumRange(left, right) {
        return this.getSum(right) - this.getSum(left - 1);
    }
}