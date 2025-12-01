import { ProblemElement } from "../types/problem";

const starterCodeListRender = `function ItemList(props) {
  // Your code here
  // Render a list of items from the items prop
  // Each item should be displayed in an <li> element
  
  const items = props.items || [];
  
  return (
    <div>
      <h2>My List</h2>
      <ul>
        {/* Render items here */}
      </ul>
    </div>
  );
}`;

const handlerListRender = (Component: any) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  if (typeof Component !== 'function') {
    results.push({ type: 'error', text: 'ItemList must be a function component.' });
    return results;
  }
  try {
    const result = Component({ items: ['apple', 'banana', 'orange'] });
    if (!result || typeof result !== 'object') {
      results.push({ type: 'error', text: 'Component must return JSX.' });
      return results;
    }
    results.push({ type: 'hint', text: 'Looks like a valid React function component!' });
    return results;
  } catch (error: any) {
    results.push({ type: 'error', text: error.message });
    return results;
  }
};

export const listRender: ProblemElement = {
  id: "listrender",
  slug: "listrender",
  title: "List Rendering",
  difficulty: "Easy",
  category: "Basics",
  type: "react",
  language: "React",
  problemStatement: [
    "Create an ItemList component that accepts an 'items' prop (array of strings).",
    "Render each item in the array as an <li> element inside a <ul>.",
    "Use the map() function to transform the array into JSX elements.",
    "Don't forget to add a key prop to each <li> element!"
  ],
  examples: [
    {
      id: 1,
      inputText: "props = { items: ['apple', 'banana', 'orange'] }",
      outputText: "A list displaying: apple, banana, orange",
      explanation: "Each array item is rendered as a list item"
    },
    {
      id: 2,
      inputText: "props = { items: [] }",
      outputText: "An empty list",
      explanation: "When the array is empty, no list items are rendered"
    }
  ],
  constraints: [
    "Must use the map() function to render the list",
    "Each <li> must have a unique key prop",
    "The items prop should be an array of strings"
  ],
  handlerFunction: handlerListRender,
  starterCode: "",
  starterCodeReact: starterCodeListRender,
  order: 202,
  starterFunctionName: "ItemList",
  videoId: "",
  solution: {
    approach: "Use the map() array method to transform each item into an <li> JSX element.",
    explanation: [
      "Destructure the items prop from props",
      "Use map() to iterate over the items array",
      "Return an <li> element for each item",
      "Use the item itself or index as the key (item is better if unique)",
      "Wrap all <li> elements in a <ul>"
    ],
    code: `function ItemList({ items = [] }) {
  return (
    <div>
      <h2>My List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`
  }
};
