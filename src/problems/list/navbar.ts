import { ProblemElement } from "../types/problem";
import { 
  createTestDOM, 
  assertElementExists
} from "@/problems/utils/htmlCssAssert";

const starterCodeHTMLNavbar = `<nav class="navbar">
  <!-- Add your navigation items here -->
</nav>`;

const starterCodeCSSNavbar = `.navbar {
  /* Add your CSS here */
}`;

function checkNavbarExists(doc: Document, results: { type: 'hint' | 'error'; text: string }[]) {
  try {
    assertElementExists(doc, ".navbar");
    results.push({ type: 'hint', text: '✅ .navbar element exists.' });
  } catch {
    results.push({ type: 'error', text: '❌ .navbar element is missing.' });
  }
}

function checkLogo(doc: Document, results: { type: 'hint' | 'error'; text: string }[]) {
  const logo = doc.querySelector('.navbar .logo, .navbar .brand, .navbar h1');
  if (logo) {
    results.push({ type: 'hint', text: '✅ Navbar contains a logo or brand name.' });
  } else {
    results.push({ type: 'error', text: '❌ Navbar should contain a logo or brand name (.logo, .brand, or h1).' });
  }
}

function checkNavLinks(doc: Document, results: { type: 'hint' | 'error'; text: string }[]) {
  const navLinks = doc.querySelectorAll('.navbar a, .navbar .nav-link');
  if (navLinks.length >= 3) {
    results.push({ type: 'hint', text: '✅ Navbar contains at least 3 navigation links.' });
  } else {
    results.push({ type: 'error', text: '❌ Navbar should contain at least 3 navigation links.' });
  }
}

function checkNavbarCSS(css: string, results: { type: 'hint' | 'error'; text: string }[]) {
  const cssLower = css.toLowerCase().replaceAll(/\s+/g, ' ');
  const navbarRegex = /\.navbar\s*\{([^}]+)\}/;
  const navbarMatch = navbarRegex.exec(cssLower);
  if (!navbarMatch) {
    results.push({ type: 'error', text: '❌ Navbar CSS rules not found.' });
    return;
  }
  const navbarRules = navbarMatch[1];
  if (navbarRules.includes('display') && navbarRules.includes('flex')) {
    results.push({ type: 'hint', text: '✅ Navbar uses display: flex.' });
  } else {
    results.push({ type: 'error', text: '❌ Navbar should use display: flex.' });
  }
  if (navbarRules.includes('justify-content') && navbarRules.includes('space-between')) {
    results.push({ type: 'hint', text: '✅ Navbar uses justify-content: space-between.' });
  } else {
    results.push({ type: 'error', text: '❌ Navbar should use justify-content: space-between.' });
  }
  if (navbarRules.includes('align-items') && navbarRules.includes('center')) {
    results.push({ type: 'hint', text: '✅ Navbar uses align-items: center.' });
  } else {
    results.push({ type: 'error', text: '❌ Navbar should use align-items: center.' });
  }
  if (navbarRules.includes('padding')) {
    results.push({ type: 'hint', text: '✅ Navbar has padding.' });
  } else {
    results.push({ type: 'error', text: '❌ Navbar should have padding.' });
  }
  if (navbarRules.includes('background-color') || navbarRules.includes('background:')) {
    results.push({ type: 'hint', text: '✅ Navbar has a background color.' });
  } else {
    results.push({ type: 'error', text: '❌ Navbar should have a background color.' });
  }
}

const handlerNavbar = ({ html, css }: { html: string; css: string }) => {
  const results: { type: 'hint' | 'error'; text: string }[] = [];
  try {
    const doc = createTestDOM(html, css);
    checkNavbarExists(doc, results);
    checkLogo(doc, results);
    checkNavLinks(doc, results);
    checkNavbarCSS(css, results);
  } catch (error: any) {
    results.push({ type: 'error', text: error.message });
  }
  if (results.every(r => r.type === 'hint')) {
    results.push({ type: 'hint', text: 'All checks passed! Great job.' });
  }
  return results;
};

export const navbar: ProblemElement = {
  id: "navbar",
  slug: "navbar",
  title: "Create a Navbar",
  difficulty: "Medium",
  category: "Components",
  type: "html-css",
  language: "HTML/CSS",
  problemStatement: [
    "Create a responsive navigation bar with a logo/brand name on the left and navigation links on the right.",
    "Use Flexbox to layout the navbar items horizontally with proper spacing."
  ],
  examples: [
    { 
      id: 1, 
      inputText: "A navbar element", 
      outputText: "A horizontal navbar with logo on left and links on right",
      explanation: "Use Flexbox with space-between to push logo left and links right"
    },
  ],
  constraints: [
    "Navbar must contain a logo/brand (.logo, .brand, or h1) and at least 3 navigation links",
    "Must use display: flex, justify-content: space-between, and align-items: center",
    "Must have padding and a background color"
  ],
  handlerFunction: handlerNavbar,
  starterCode: "",
  starterCodeHTML: starterCodeHTMLNavbar,
  starterCodeCSS: starterCodeCSSNavbar,
  order: 102,
  starterFunctionName: "",
  videoId: "",
  solution: {
    approach: "Use Flexbox to create a horizontal navigation bar with proper alignment.",
    explanation: [
      "Use display: flex on the navbar",
      "Use justify-content: space-between to separate logo and links",
      "Use align-items: center for vertical centering",
      "Add padding and background color for styling",
      "Style links to remove default underlines"
    ],
    code: `<!-- HTML -->
<nav class="navbar">
  <div class="logo">MyBrand</div>
  <div class="nav-links">
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </div>
</nav>

/* CSS */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1f2937;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #6366f1;
}`
  }
};
