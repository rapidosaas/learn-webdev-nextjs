import React from 'react';
import { renderToString } from 'react-dom/server';

/**
 * Render a React component to static HTML string for testing
 */
export const renderReactComponent = (Component: React.ComponentType<any>, props: any = {}): string => {
  try {
    const element = React.createElement(Component, props);
    return renderToString(element);
  } catch (error: any) {
    throw new Error(`Failed to render component: ${error.message}`);
  }
};

/**
 * Check if rendered output contains specific text
 */
export const assertContainsText = (html: string, text: string): void => {
  if (!html.includes(text)) {
    throw new Error(`Expected output to contain "${text}"`);
  }
};

/**
 * Check if rendered output contains a specific HTML element
 */
export const assertElementExists = (html: string, tagName: string): void => {
  const regex = new RegExp(`<${tagName}[\\s>]`, 'i');
  if (!regex.test(html)) {
    throw new Error(`Expected output to contain <${tagName}> element`);
  }
};

/**
 * Check if a component renders without errors
 */
export const assertRenders = (Component: React.ComponentType<any>, props: any = {}): boolean => {
  try {
    renderReactComponent(Component, props);
    return true;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error rendering component:', error);
    return false;
  }
};

/**
 * Count occurrences of a specific element in rendered output
 */
export const countElements = (html: string, tagName: string): number => {
  const regex = new RegExp(`<${tagName}[\\s>]`, 'gi');
  const matches = html.match(regex);
  return matches ? matches.length : 0;
};

/**
 * Check if component output matches a pattern
 */
export const assertMatchesPattern = (html: string, pattern: RegExp): void => {
  if (!pattern.test(html)) {
    throw new Error(`Output does not match expected pattern: ${pattern}`);
  }
};
