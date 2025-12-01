import { ProblemElement } from "../types/problem";

const starterCodeGreeting = `function Greeting(props) {
  // Your code here
  // Display a greeting message using the name prop
  // If no name is provided, display "Guest"
  
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}`;

const handlerGreeting = (Component: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  if (typeof Component !== 'function') {
    results.push({ type: 'error', text: 'Greeting must be a function component.' });
    return results;
  }
  try {
    // Test with name prop
    const resultWithName = Component({ name: 'Alice' });
    if (!resultWithName || typeof resultWithName !== 'object') {
      results.push({ type: 'error', text: 'Component must return JSX.' });
    } else {
      results.push({ type: 'hint', text: '✅ Passed: returns JSX with name prop.' });
    }
    // Test with no name prop
    const resultNoName = Component({});
    if (!resultNoName || typeof resultNoName !== 'object') {
      results.push({ type: 'error', text: 'Component must return JSX when no name is provided.' });
    } else {
      results.push({ type: 'hint', text: '✅ Passed: returns JSX with no name prop.' });
    }
  } catch (error: any) {
    results.push({ type: 'error', text: error.message });
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All checks passed! Great job.' });
  }
  return results;
};

export const greeting: ProblemElement = {
  id: "greeting",
  slug: "greeting",
  title: "Greeting Component",
  difficulty: "Easy",
  category: "Basics",
  type: "react",
  language: "React",
  problemStatement: [
    "Create a Greeting component that accepts a 'name' prop and displays a personalized greeting.",
    "If no name is provided, display 'Hello, Guest!'",
    "If a name is provided, display 'Hello, [name]!'"
  ],
  examples: [
    {
      id: 1,
      inputText: "props = { name: 'Alice' }",
      outputText: "Hello, Alice!",
      explanation: "The component uses the name prop"
    },
    {
      id: 2,
      inputText: "props = {}",
      outputText: "Hello, Guest!",
      explanation: "When no name is provided, it defaults to 'Guest'"
    }
  ],
  constraints: [
    "Must accept a 'name' prop",
    "Must use a default value when name is not provided",
    "The greeting must be displayed in an h1 element"
  ],
  handlerFunction: handlerGreeting,
  starterCode: "",
  starterCodeReact: starterCodeGreeting,
  order: 201,
  starterFunctionName: "Greeting",
  videoId: "",
  solution: {
    approach: "Use props destructuring with a default value, or use the logical OR operator.",
    explanation: [
      "Accept props parameter in the function",
      "Destructure the name prop with a default value",
      "Use template literals or string concatenation to build the greeting",
      "Display the greeting in an h1 element"
    ],
    code: `function Greeting({ name = 'Guest' }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}`
  }
};
