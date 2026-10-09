import type { DemoOutcome } from './types';

/** Deterministic, offline-only mock sender. It never performs network or SMS actions. */
export async function sendMockEvent(round: number): Promise<DemoOutcome> {
  if (!Number.isInteger(round) || round < 1) throw new Error('Round must be a positive integer.');
  // Predictable pattern makes both success and error UI states easy to test.
  return round % 5 === 0 ? 'error' : 'success';
}
