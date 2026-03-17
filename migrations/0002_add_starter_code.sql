-- Add starter code columns to topics table
ALTER TABLE topics ADD COLUMN starter_code_javascript TEXT;
ALTER TABLE topics ADD COLUMN starter_code_python TEXT;
ALTER TABLE topics ADD COLUMN starter_code_java TEXT;

-- Add some dummy starter code for an existing topic (e.g., Two Sum, assuming id 1)
UPDATE topics SET 
  starter_code_javascript = 'function twoSum(nums, target) {\n  // Write your code here\n};',
  starter_code_python = 'def two_sum(nums, target):\n  # Write your code here\n  pass',
  starter_code_java = 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n    }\n}'
WHERE id = 1;
