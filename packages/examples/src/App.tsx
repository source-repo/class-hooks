import React, { use, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { classHooks } from '@core';
import { ItemCounter } from './params';

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

class Logger extends React.Component {
  something() {
     return 'something';
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

const EnhancedLogger = classHooks(Logger, hooks);

class MoreEnhancedLogger extends EnhancedLogger {
  render() {
    return (
      <div>
        {this.renderClassHooks()}
        <h3>Window Width: {this.windowWidth}px !!</h3>
        <h4>Current Time: {this.currentTime}</h4>
      </div>
    );
  }
}
class MostEnhancedLoggerBase extends MoreEnhancedLogger {}
const MostEnhancedLogger = classHooks(MostEnhancedLoggerBase, {
  doSomething: () => useState(0),
});

const ShowMostEnhancedLogger = class extends MostEnhancedLogger {
  componentWillMount(): void {
    setInterval(() => {
      if (this.doSomething)
        this.doSomething[1](this.doSomething[0] + 1);
    }, 1000);
  }
  render() {
    return (
      <div>
        {this.renderClassHooks()}
        <h5>Window Width: {this.windowWidth}px !!</h5>
        <h6>Current Time: {this.currentTime}</h6>
        <h6>Do Something: {this.doSomething ? this.doSomething[0] : ''}</h6>
      </div>
    );
  }
}

class App extends EnhancedLogger {
  render() {
    return (
      <div>
        {this.renderClassHooks()}
        {/*
        <h1>Window Width: {this.windowWidth}px</h1>
        <h2>Current Time: {this.currentTime}</h2>
        <MoreEnhancedLogger />
        <MostEnhancedLogger />
        <ShowMostEnhancedLogger />
        */}
        <ItemCounter />
      </div>
    );
  }
}

// --- Bootstrap React ---
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
