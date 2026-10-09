import { runSimulation } from '../../src/engine/bomber';
import type { DemoLog, JobRecord } from '../../src/engine/types';

describe('runSimulation', () => {
  it('records simulated success and error outcomes without network use', async () => {
    const logs: DemoLog[] = []; let final: JobRecord | undefined;
    const result = await runSimulation({ label: 'Test', rounds: 5, intervalMs: 100 }, {
      onLog: item => logs.push(item), onProgress: item => { final = item; }, isCancelled: () => false, wait: async () => undefined,
    }, 'test-job');
    expect(result.status).toBe('completed');
    expect(result.completed).toBe(5);
    expect(result.successes).toBe(4);
    expect(result.errors).toBe(1);
    expect(final?.id).toBe('test-job');
    expect(logs.some(log => log.message.includes('No messages will be sent'))).toBe(true);
  });
  it('stops when cancellation is requested', async () => {
    let checks = 0;
    const result = await runSimulation({ label: 'Test', rounds: 10, intervalMs: 100 }, {
      onLog: () => undefined, onProgress: () => undefined, isCancelled: () => { checks += 1; return checks > 1; }, wait: async () => undefined,
    }, 'stop-job');
    expect(result.status).toBe('stopped');
    expect(result.completed).toBe(1);
  });
  it('validates the maximum rounds and interval', async () => {
    const callbacks = { onLog: () => undefined, onProgress: () => undefined, isCancelled: () => false, wait: async () => undefined };
    await expect(runSimulation({ label: 'Bad', rounds: 101, intervalMs: 100 }, callbacks)).rejects.toThrow('Rounds must be between 1 and 100.');
    await expect(runSimulation({ label: 'Bad', rounds: 1, intervalMs: 1 }, callbacks)).rejects.toThrow('Simulation interval must be at least 100 ms.');
  });
});
