# @diginet/class-hooks

**Use React hooks in class components** — cleanly, type-safely, and without HOCs or boilerplate.

This library lets you bind React hooks to class component fields, giving you the power of hooks while preserving an OOP-style structure.

React hooks revolutionized component logic by promoting composition over inheritance. But they also made class components feel obsolete — especially when trying to reuse stateful logic.

@diginet/class-hooks brings the best of both worlds:
- It lets you use modern React hooks inside class components.
- It gives each hook a clean, typed field on the class.
- It avoids messy patterns like higher-order components or verbose lifecycle glue.

Powerful, composable logic without sacrificing inheritance when needed.

## Features

- Access hook results directly as class instance fields
- Works with multiple hooks
- Full TypeScript support with auto-inferred types
- ESM-first, with CommonJS fallback
- No HOCs, decorators, or boilerplate required

## Installation

```bash
npm install @diginet/class-hooks
```

## Usage

```tsx
import React from 'react';
import { classHooks } from '@diginet/class-hooks';
import { useWindowWidth, useCurrentTime } from 'someHooks.js'

const hooks = {
  windowWidth: useWindowWidth,
  currentTime: useCurrentTime,
};

class MainDisplay extends classHooks(React.Component, hooks) {
  render() {
    return (
      <div>
        {this.renderClassHooks()}
        <h1>Width: {this.windowWidth}px</h1>
        <h2>Time: {this.currentTime}</h2>
      </div>
    );
  }
}
```

## How it works

Internally, your hooks are rendered as hidden bridge components. Their return values are assigned to class fields (matching the hook names you provide).

Use `this.renderClassHooks()` once in your render tree to activate the internal sync.

## API

### `classHooks(BaseComponent, hooks)`

Wraps your class to inject the defined hooks. Parameters:

- `BaseComponent`: usually `React.Component` or `React.PureComponent`. Can also be any existing React component class that you want to add hooks to.
- `hooks`: an object where each key maps to a hook function

Returns an extended class that:
- Has a field for each hook (e.g., `this.windowWidth`)
- Includes a `renderClassHooks()` method to include in your render tree

```ts
const hooks = {
  count: useCounter,
};

class Counter extends classHooks(React.Component, hooks) {
  render() {
    return (
      <>
        {this.renderClassHooks()}
        <p>{this.count}</p>
      </>
    );
  }
}
```

## License

MIT
