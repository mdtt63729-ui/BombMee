import { create } from 'zustand';
import type { DemoLog, JobRecord } from '../engine/types';
interface JobState { current?: JobRecord; logs: DemoLog[]; running: boolean; cancelled: boolean; setCurrent: (job: JobRecord) => void; addLog: (log: DemoLog) => void; setRunning: (v: boolean) => void; cancel: () => void; resetCancel: () => void; clearLogs: () => void; }
export const useJobStore = create<JobState>(set => ({
  current: undefined, logs: [], running: false, cancelled: false,
  setCurrent: current => set({ current }),
  addLog: log => set(state => ({ logs: [log, ...state.logs].slice(0, 300) })),
  setRunning: running => set({ running }), cancel: () => set({ cancelled: true }), resetCancel: () => set({ cancelled: false }), clearLogs: () => set({ logs: [] }),
}));
