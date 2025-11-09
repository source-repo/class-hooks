import { TextEncoder, TextDecoder } from 'util';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder as any;

// Note: Removed manual JSDOM setup - vitest's jsdom environment handles this automatically
// The manual setup was causing React 19 test environment issues


