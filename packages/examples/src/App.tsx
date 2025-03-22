import React from 'react';
import ReactDOM from 'react-dom/client';
import { classHooks } from '@core';

const hooks = {
  windowWidth: () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
      const onResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, []);
    return width;
  },
  currentTime: () => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    React.useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    return time;
  },
}

class App extends classHooks(hooks) {
  render() {
    return (
      <div>
        {this.renderClassHooks()}
        <h1>Window Width: {this.hookValues.windowWidth}px</h1>
        <h2>Current Time: {this.hookValues.currentTime}</h2>
      </div>
    );
  }
}

// --- Bootstrap React ---
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
