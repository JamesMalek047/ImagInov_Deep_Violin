<script setup lang="ts">
import { onMounted } from 'vue'
import { useHealthCheck } from '@/composables/useHealthCheck'

const { status, data, error, checkHealth } = useHealthCheck()

onMounted(checkHealth)
</script>

<template>
  <div class="backend-status" :class="status">
    <span v-if="status === 'loading'">Checking backend connection…</span>
    <span v-else-if="status === 'online'">
      Backend connected: {{ data?.service }} ({{ data?.status }})
    </span>
    <span v-else-if="status === 'offline'">Backend unavailable: {{ error }}</span>
    <span v-else>Backend status unknown</span>
    <button type="button" @click="checkHealth">Retry</button>
  </div>
</template>

<style scoped>
.backend-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.backend-status.online {
  background-color: rgba(66, 184, 131, 0.15);
  color: #2c8f5e;
}

.backend-status.offline {
  background-color: rgba(220, 53, 69, 0.12);
  color: #c0392b;
}

.backend-status.loading,
.backend-status.idle {
  background-color: rgba(0, 0, 0, 0.05);
}

button {
  cursor: pointer;
}
</style>
