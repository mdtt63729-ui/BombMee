import { sendMockEvent } from '../../src/engine/sender';

describe('sendMockEvent', () => {
  it('returns deterministic local outcomes', async () => {
    await expect(sendMockEvent(1)).resolves.toBe('success');
    await expect(sendMockEvent(5)).resolves.toBe('error');
  });
  it('rejects invalid rounds', async () => {
    await expect(sendMockEvent(0)).rejects.toThrow('Round must be a positive integer.');
  });
});
