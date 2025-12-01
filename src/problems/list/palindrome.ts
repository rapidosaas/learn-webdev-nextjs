import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeIsPalindrome = `function isPalindrome(s){
  // Write your code here
};`;

const handlerIsPalindrome = (fn: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const inputs = ["racecar", "hello", "abba", "a"];
  const outputs = [true, false, true, true];
  for (let i = 0; i < inputs.length; i++) {
    let passed = true;
    try {
      const result = fn(inputs[i]);
      assertDeepStrictEqual(result, outputs[i]);
    } catch {
      passed = false;
    }
    if (passed) {
      results.push({ type: 'hint', text: `✅ Passed: isPalindrome('${inputs[i]}') === ${outputs[i]}` });
    } else {
      results.push({ type: 'error', text: `❌ Failed: isPalindrome('${inputs[i]}') — expected ${outputs[i]}` });
    }
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All test cases passed! Great job.' });
  }
  return results;
};

export const palindrome: ProblemElement = {
  id: "palindrome",
  slug: "palindrome",
  title: "Is Palindrome",
  difficulty: "Easy",
  category: "String",
  problemStatement: [
    "Given a string s, return true if s is a palindrome, otherwise false."
  ],
  examples: [
    { id: 1, inputText: "\"racecar\"", outputText: "true" },
    { id: 2, inputText: "\"hello\"", outputText: "false" },
  ],
  constraints: "Consider the string as-is (case-sensitive, no normalization).",
  handlerFunction: handlerIsPalindrome,
  starterCode: starterCodeIsPalindrome,
  order: 10,
  starterFunctionName: "function isPalindrome(",
  videoId: "",
  solution: {
    approach: "Use two pointers from both ends to compare characters.",
    explanation: "Initialize two pointers at the start and end of the string. Move them toward each other, comparing characters. If any mismatch is found, return false. If all characters match, return true.",
    complexity: {
      time: "O(n)",
      space: "O(1)"
    },
    code: `function isPalindrome(s){
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i++; j--;
  }
  return true;
}`
  }
};
