import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-qa' });

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

if (!globalThis.Response) {
  // @ts-expect-error response is not defined in jsdom
  globalThis.Response = jest.fn();
}

global['Request'] = jest.fn().mockImplementation(() => ({
  signal: {
    removeEventListener: jest.fn(),
    addEventListener: jest.fn(),
  },
}));
