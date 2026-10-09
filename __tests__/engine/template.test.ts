import { formatDemoMessage } from '../../src/engine/template';

describe('formatDemoMessage', () => {
  it('formats a local-only demo event', () => {
    expect(formatDemoMessage(2, 8, 'Demo')).toBe('[SIMULATION] Demo: event 2/8');
  });
  it('rejects invalid round values', () => {
    expect(() => formatDemoMessage(0, 8, 'Demo')).toThrow('Round values are invalid.');
  });
  it('rejects an empty provider name', () => {
    expect(() => formatDemoMessage(1, 1, '  ')).toThrow('A demo provider name is required.');
  });
});
