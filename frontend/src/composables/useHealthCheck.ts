import { ref } from 'vue'
import type { HealthResponse } from '@/types/api'

export type ConnectionStatus = 'idle' | 'loading' | 'online' | 'offline'

export function useHealthCheck() {
  const status = ref<ConnectionStatus>('idle')
  const data = ref<HealthResponse | null>(null)
  const error = ref<string | null>(null)

  async function checkHealth() {
    status.value = 'loading'
    error.value = null
    try {
      const response = await fetch('/api/health')
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      data.value = (await response.json()) as HealthResponse
      status.value = 'online'
    } catch (err) {
      data.value = null
      error.value = err instanceof Error ? err.message : 'Unknown error'
      status.value = 'offline'
    }
  }

  return { status, data, error, checkHealth }
}
