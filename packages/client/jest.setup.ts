import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import 'whatwg-fetch';

configure({ testIdAttribute: 'data-qa' });

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
