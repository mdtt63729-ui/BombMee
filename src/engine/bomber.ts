import { formatDemoMessage } from './template';
import { sendMockEvent } from './sender';
import type { DemoJobInput, DemoLog, JobRecord } from './types';

export interface SimulationCallbacks {
  onLog: (log: DemoLog) => void;
  onProgress: (job: JobRecord) => void;
  isCancelled: () => boolean;
  wait?: (ms: number) => Promise<void>;
}

const defaultWait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

/** Local simulation engine only. It intentionally has no target-number or network sender. */
export async function runSimulation(input: DemoJobInput, callbacks: SimulationCallbacks, id = `job-${Date.now()}`): Promise<JobRecord> {
  if (!Number.isInteger(input.rounds) || input.rounds < 1 || input.rounds > 100) {
    throw new Error('Rounds must be between 1 and 100.');
  }
  if (!Number.isFinite(input.intervalMs) || input.intervalMs < 100) {
    throw new Error('Simulation interval must be at least 100 ms.');
  }
  const now = Date.now();
  const job: JobRecord = { id, label: input.label.trim() || 'Offline demo', rounds: input.rounds, completed: 0, successes: 0, errors: 0, status: 'running', startedAt: now };
  const log = (level: DemoLog['level'], message: string) => callbacks.onLog({ id: `${id}-${job.completed}-${Date.now()}`, at: Date.now(), level, message });
  log('info', 'Offline simulation started. No messages will be sent.');
  const wait = callbacks.wait ?? defaultWait;
  for (let round = 1; round <= input.rounds; round += 1) {
    if (callbacks.isCancelled()) {
      job.status = 'stopped';
      log('warning', 'Simulation stopped by user.');
      break;
    }
    log('info', formatDemoMessage(round, input.rounds, job.label));
    const outcome = await sendMockEvent(round);
    job.completed += 1;
    if (outcome === 'success') {
      job.successes += 1;
      log('success', 'Mock event completed successfully.');
    } else {
      job.errors += 1;
      log('error', 'Mock error event generated for UI testing.');
    }
    callbacks.onProgress({ ...job });
    if (round < input.rounds && !callbacks.isCancelled()) await wait(input.intervalMs);
  }
  if (job.status === 'running') job.status = 'completed';
  job.endedAt = Date.now();
  callbacks.onProgress({ ...job });
  log('info', `Simulation finished: ${job.successes} success, ${job.errors} error.`);
  return job;
}
