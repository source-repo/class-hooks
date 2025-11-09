import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Basic class component in React 19', () => {
  it('should render a simple class component', () => {
    class SimpleComponent extends React.Component {
      render() {
        return <div data-testid="simple">Hello World</div>;
      }
    }

    render(<SimpleComponent />);
    expect(screen.getByTestId('simple').textContent).toBe('Hello World');
  });

  it('should render class component with method returning element', () => {
    class TestComponent extends React.Component {
      getContent() {
        return <span data-testid="content">Content</span>;
      }
      
      render() {
        return (
          <div>
            {this.getContent()}
          </div>
        );
      }
    }

    render(<TestComponent />);
    expect(screen.getByTestId('content').textContent).toBe('Content');
  });

  it('should render class component with getter returning element', () => {
    class TestComponent extends React.Component {
      get content() {
        return <span data-testid="content">Content</span>;
      }
      
      render() {
        return (
          <div>
            {this.content}
          </div>
        );
      }
    }

    render(<TestComponent />);
    expect(screen.getByTestId('content').textContent).toBe('Content');
  });

  it('should render class component with method returning array', () => {
    class TestComponent extends React.Component {
      getItems() {
        return [
          <span key="1" data-testid="item1">Item 1</span>,
          <span key="2" data-testid="item2">Item 2</span>
        ];
      }
      
      render() {
        return (
          <div>
            {this.getItems()}
          </div>
        );
      }
    }

    render(<TestComponent />);
    expect(screen.getByTestId('item1').textContent).toBe('Item 1');
    expect(screen.getByTestId('item2').textContent).toBe('Item 2');
  });

  it('should render class component with method returning Fragment', () => {
    class TestComponent extends React.Component {
      getContent() {
        return React.createElement(
          React.Fragment,
          null,
          <span key="1" data-testid="item1">Item 1</span>,
          <span key="2" data-testid="item2">Item 2</span>
        );
      }
      
      render() {
        return (
          <div>
            {this.getContent()}
          </div>
        );
      }
    }

    render(<TestComponent />);
    expect(screen.getByTestId('item1').textContent).toBe('Item 1');
    expect(screen.getByTestId('item2').textContent).toBe('Item 2');
  });

  it('should render class component with getter returning Fragment', () => {
    class TestComponent extends React.Component {
      get content() {
        return React.createElement(
          React.Fragment,
          null,
          <span key="1" data-testid="item1">Item 1</span>,
          <span key="2" data-testid="item2">Item 2</span>
        );
      }
      
      render() {
        return (
          <div>
            {this.content}
          </div>
        );
      }
    }

    render(<TestComponent />);
    expect(screen.getByTestId('item1').textContent).toBe('Item 1');
    expect(screen.getByTestId('item2').textContent).toBe('Item 2');
  });
});

