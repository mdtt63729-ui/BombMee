import type { MockProvider } from './types';

/** Offline-only provider registry. Deliberately accepts mock entries only. */
export function validateProviderList(input: unknown): MockProvider[] {
  if (!Array.isArray(input)) throw new Error('Provider data must be a JSON array.');
  return input.map((entry, index) => {
    if (!entry || typeof entry !== 'object') throw new Error(`Provider ${index + 1} is invalid.`);
    const item = entry as Record<string, unknown>;
    if (typeof item.id !== 'string' || typeof item.name !== 'string') {
      throw new Error(`Provider ${index + 1} needs an id and name.`);
    }
    if (item.kind !== 'mock') throw new Error('Only local mock providers are supported; network providers are disabled.');
    return { id: item.id, name: item.name, enabled: item.enabled === true, kind: 'mock' as const };
  });
}

export const DEFAULT_PROVIDERS: MockProvider[] = [
  { id: 'demo-ok', name: 'Local success example', enabled: true, kind: 'mock' },
  { id: 'demo-error', name: 'Local error example', enabled: true, kind: 'mock' },
];
