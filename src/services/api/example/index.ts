import type { Example } from '@/feature/example/schema'

export function list(): Promise<Example[]> {
  return Promise.resolve([
    { id: crypto.randomUUID(), name: 'Sample' },
  ])
}
