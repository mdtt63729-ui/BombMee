import { create } from 'zustand';
import { readJson, writeJson } from '../data/storage';
interface SettingsState { intervalMs: number; rounds: number; haptics: boolean; hydrated: boolean; setIntervalMs: (v: number) => void; setRounds: (v: number) => void; setHaptics: (v: boolean) => void; hydrate: () => Promise<void>; }
const KEY = 'tbomb-mobile.settings.v1';
export const useSettingsStore = create<SettingsState>((set, get) => ({
  intervalMs: 500, rounds: 20, haptics: false, hydrated: false,
  setIntervalMs: v => { const next = Math.max(100, Math.min(5000, Math.floor(v))); set({ intervalMs: next }); void persist(); },
  setRounds: v => { const next = Math.max(1, Math.min(100, Math.floor(v))); set({ rounds: next }); void persist(); },
  setHaptics: v => { set({ haptics: v }); void persist(); },
  hydrate: async () => { const saved = await readJson<Partial<SettingsState>>(KEY, {}); set({ intervalMs: saved.intervalMs ?? get().intervalMs, rounds: saved.rounds ?? get().rounds, haptics: saved.haptics ?? get().haptics, hydrated: true }); },
}));
async function persist() { const s = useSettingsStore.getState(); await writeJson(KEY, { intervalMs: s.intervalMs, rounds: s.rounds, haptics: s.haptics }); }
