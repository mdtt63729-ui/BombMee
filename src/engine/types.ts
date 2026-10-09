export type LogLevel = 'info' | 'success' | 'warning' | 'error';
export type JobStatus = 'idle' | 'running' | 'stopped' | 'completed' | 'failed';
export type DemoOutcome = 'success' | 'error';

export interface DemoJobInput {
  label: string;
  rounds: number;
  intervalMs: number;
}

export interface DemoLog {
  id: string;
  at: number;
  level: LogLevel;
  message: string;
}

export interface JobRecord {
  id: string;
  label: string;
  rounds: number;
  completed: number;
  successes: number;
  errors: number;
  status: JobStatus;
  startedAt: number;
  endedAt?: number;
}

export interface MockProvider {
  id: string;
  name: string;
  enabled: boolean;
  kind: 'mock';
}
