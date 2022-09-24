    let freqMap = new Map<string,number>()
    
    for(let char of s){
        if(!freqMap.has(char)) freqMap.set(char,0)
        freqMap.set(char,freqMap.get(char)+1)
    }
    
    //just single element wise
    let maxHeap = new MaxPriorityQueue( { priority : ([key,frequency]) => frequency})
    
    //enqueue
    for(let entry of freqMap){
        maxHeap.enqueue(entry)
    }

    //size
    console.log(maxHeap.size())



    