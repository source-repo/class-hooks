import { TextEncoder, TextDecoder } from 'util';
import { beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder as any;

// Set up JSDOM for React 19 compatibility
beforeAll(() => {
  const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    url: "http://localhost"
  });
  globalThis.window = dom.window as unknown as (Window & typeof globalThis);
  globalThis.document = dom.window.document;
  globalThis.navigator = dom.window.navigator;
});


