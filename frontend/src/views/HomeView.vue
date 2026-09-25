<script setup lang="ts">
import BackendStatus from '@/components/BackendStatus.vue'
</script>

<template>
  <main class="home">
    <h1>DeepViolin</h1>
    <p class="tagline">
      DeepViolin investigates whether characteristics of violin performances can predict
      listeners' perceived emotional valence and arousal.
    </p>
    <BackendStatus />
  </main>
</template>

<style scoped>
.home {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.tagline {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
</style>
