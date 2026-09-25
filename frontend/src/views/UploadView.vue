<script setup lang="ts">
import AudioUploader from '@/components/AudioUploader.vue'

function onFileSelected(file: File) {
  console.log('Selected audio file:', file.name)
}
</script>

<template>
  <main class="upload">
    <h1>Upload a Recording</h1>
    <AudioUploader @file-selected="onFileSelected" />
  </main>
</template>

<style scoped>
.upload {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
