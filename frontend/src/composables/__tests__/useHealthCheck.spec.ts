import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useHealthCheck } from '../useHealthCheck'

describe('useHealthCheck', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('sets status to online when the backend responds successfully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ status: 'ok', service: 'DeepViolin API' }),
      }),
    )

    const { status, data, checkHealth } = useHealthCheck()
    await checkHealth()

    expect(status.value).toBe('online')
    expect(data.value).toEqual({ status: 'ok', service: 'DeepViolin API' })
  })

  it('sets status to offline when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')))

    const { status, error, checkHealth } = useHealthCheck()
    await checkHealth()

    expect(status.value).toBe('offline')
    expect(error.value).toBe('network error')
  })
})
