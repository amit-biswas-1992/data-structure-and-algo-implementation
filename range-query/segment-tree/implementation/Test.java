public class Test {

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {1, 3, 8, 11, 13, 18,19};
        int k = 3;
        int result = solution.lengthOfLIS(nums, k);
        System.out.println(result);
    }
    
}
