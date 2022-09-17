import java.util.*;

public class Solution {
    class segTree{
        int n;
        int[] arr;
        segTree(int n){
            this.n=n;
            this.arr=new int[n];
        }
        public int querry(int node,int s,int e,int l,int r){
            if(s>e) return 0;
            if(r<s || l>e){
                return 0;
            }
            if(s>=l && e<=r){
                return arr[node];
            }
            int mid=s+(e-s)/2;
            int q1=querry(2*node,s,mid,l,r);
            int q2=querry(2*node+1,mid+1,e,l,r); 
            return Math.max(q1,q2);
        }
        public int update(int node,int s,int e,int idx,int val){
            if(s>e) return 0;
            if(s==e && s==idx){
                arr[node]=val;
                return val;
            } 
            if(idx<s || idx>e){
                return arr[node];
            }
            int mid=s+(e-s)/2;
            int q1=update(2*node,s,mid,idx,val);
            int q2=update(2*node+1,mid+1,e,idx,val);
            arr[node]=Math.max(q1,q2);
            return arr[node];
        }
    }
    public int lengthOfLIS(int[] nums, int k) {
        int maxVal=0;
        int ans=1;
        for(int num:nums) maxVal=Math.max(maxVal,num);
        segTree seg=new segTree(maxVal*4);
        int[] arr=new int[maxVal+1];
        for(int num:nums){
            int r=num-1;
            int l=num-k;
            int tempMax=seg.querry(1,0,maxVal-1,l,r);
            ans=Math.max(ans,tempMax+1);
            seg.update(1,0,maxVal-1,num,tempMax+1);
        }
        System.out.println(Arrays.toString(seg.arr));
        return ans;
    }
}