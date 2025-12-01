import { ProblemElement } from "../types/problem";
import { assertDeepStrictEqual } from "@/problems/utils/assert";

const starterCodeCountVowels = `function countVowels(s){
  // Write your code here
};`;

const handlerCountVowels = (fn: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  const tests = [
    { s: "hello", expected: 2 },
    { s: "aeiou", expected: 5 },
    { s: "xyz", expected: 0 },
    { s: "JavaScript", expected: 3 },
  ];
  for (const test of tests) {
    try {
      const result = fn(test.s);
      assertDeepStrictEqual(result, test.expected);
      results.push({ type: 'hint', text: `✅ Passed: countVowels('${test.s}') === ${test.expected}` });
    } catch (error: any) {
      results.push({ type: 'error', text: `❌ Failed: countVowels('${test.s}') — expected ${test.expected}, got ${error?.actual ?? 'error'}` });
    }
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All test cases passed! Great job.' });
  }
  return results;
};

export const countVowels: ProblemElement = {
  id: "countvowels",
  slug: "countvowels",
  title: "Count Vowels in String",
  difficulty: "Easy",
  category: "String",
  problemStatement: [
    "Write a function that counts the number of vowels (a, e, i, o, u) in a string.",
    "Count both lowercase vowels. This teaches loops and string manipulation."
  ],
  examples: [
    { id: 1, inputText: "\"hello\"", outputText: "2", explanation: "e and o" },
    { id: 2, inputText: "\"aeiou\"", outputText: "5" },
    { id: 3, inputText: "\"xyz\"", outputText: "0" },
  ],
  constraints: "Only lowercase letters.",
  handlerFunction: handlerCountVowels,
  starterCode: starterCodeCountVowels,
  order: 9,
  starterFunctionName: "function countVowels(",
  videoId: "",
  solution: {
    approach: "Loop through each character and check if it's a vowel.",
    explanation: "Define a string or set containing vowels (aeiou), then iterate through each character in the input string and increment a counter if the character is a vowel.",
    complexity: {
      time: "O(n)",
      space: "O(1)"
    },
    code: `function countVowels(s){
  const vowels = 'aeiou';
  let count = 0;
  for (const ch of s) {
    if (vowels.includes(ch)) count++;
  }
  return count;
}`
  }
};
