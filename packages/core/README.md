# @diginet/class-hooks

**Use React hooks in class components** — cleanly, type-safely, and without HOCs or boilerplate.

This library lets you bind React hooks to class component fields, giving you the power of hooks while preserving an OOP-style structure.

## ✨ Features

- ✅ Access hook results as class instance fields
- ✅ Works with multiple hooks
- ✅ Full TypeScript support with auto-inferred types
- ✅ ESM-first, with CommonJS fallback
- ❌ No HOCs or decorators needed

## 📦 Installation

```bash
npm install @diginet/class-hooks
```

## 🚀 Usage

```tsx
import React from 'react';
import { classHooks } from '@diginet/class-hooks';

// Example custom hooks
function useWindowWidth() {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

function useCurrentTime() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

const hooks = {
  windowWidth: useWindowWidth,
  currentTime: useCurrentTime,
};

class MainDisplay extends classHooks(hooks) {
  render() {
    return (
      <div>
        {this.renderClassHooks()}
        <h1>Width: {this.hookValues.windowWidth}px</h1>
        <h2>Time: {this.hookValues.currentTime}</h2>
      </div>
    );
  }
}
```

## 🔍 How it works

Internally, your hooks are rendered as hidden components. Their return values are injected into your class through a `hookValues` property, with proper typing.

Use `this.renderClassHooks()` once in your render tree to activate the internal sync.

## 🛠 API

### `classHooks(hooks)`

Wraps your class to inject the defined hooks. `hooks` should be an object where each key maps to a custom hook.

```ts
const hooks = {
  someValue: () => useSomething(),
};

class MyComponent extends classHooks(hooks) { ... }
```

Inside your component, you'll have access to:

- `this.hookValues.someValue` – live hook value
- `this.renderClassHooks()` – renders hidden bridge components
- `this.getHookFieldNames()` – returns array of hook names

## 🧱 Example

```tsx
function useNow() {
  return new Date().toISOString();
}

const hooks = {
  now: useNow,
};

class Clock extends classHooks(hooks) {
  render() {
    return (
      <>
        {this.renderClassHooks()}
        <span>{this.hookValues.now}</span>
      </>
    );
  }
}
```

## 📄 License

MIT © Diginet
