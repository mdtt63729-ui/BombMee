import { Platform } from 'react-native';
import { ENDPOINTS } from '../../endpoints';

// This app works fully offline. Web builds use localStorage; native builds use
// AsyncStorage when installed and gracefully fall back to in-memory state.
const KEY = 'bmb-me.transactions.v1';
let memory = null;
let nativeStorage;
try { nativeStorage = require('@react-native-async-storage/async-storage').default; } catch (_) { nativeStorage = null; }
export async function loadTransactions() {
  try {
    const value = Platform.OS === 'web' ? globalThis.localStorage?.getItem(KEY) : await nativeStorage?.getItem(KEY);
    if (value) return JSON.parse(value);
  } catch (_) { /* private mode or storage unavailable */ }
  return memory;
}
export async function saveTransactions(items) {
  memory = items;
  const value = JSON.stringify(items);
  try {
    if (Platform.OS === 'web') globalThis.localStorage?.setItem(KEY, value);
    else if (nativeStorage) await nativeStorage.setItem(KEY, value);
  } catch (_) { /* app remains usable for this session */ }
}
export async function request(path, options = {}) {
  if (!ENDPOINTS.API_BASE_URL) throw new Error('No API server is configured. BMB·Me works offline.');
  const response = await fetch(`${ENDPOINTS.API_BASE_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}
