<script setup lang="ts">
import { ref } from 'vue'

const selectedFile = ref<File | null>(null)
const isDragging = ref(false)

const emit = defineEmits<{
  (e: 'file-selected', file: File): void
}>()

function handleFiles(files: FileList | null) {
  const file = files?.[0]
  if (!file) return
  selectedFile.value = file
  emit('file-selected', file)
}

function onInputChange(event: Event) {
  handleFiles((event.target as HTMLInputElement).files)
}

function onDrop(event: DragEvent) {
  isDragging.value = false
  handleFiles(event.dataTransfer?.files ?? null)
}
</script>

<template>
  <div
    class="audio-uploader"
    :class="{ dragging: isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <p>Drag and drop a violin recording here, or choose a file.</p>
    <input type="file" accept="audio/*" @change="onInputChange" />

    <p v-if="selectedFile" class="selected-file">Selected: {{ selectedFile.name }}</p>

    <p class="not-implemented">Analysis functionality is not implemented yet.</p>
  </div>
</template>

<style scoped>
.audio-uploader {
  border: 2px dashed var(--color-border, #ccc);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}

.audio-uploader.dragging {
  border-color: #42b883;
  background-color: rgba(66, 184, 131, 0.08);
}

.selected-file {
  font-weight: 600;
}

.not-implemented {
  margin-top: 1rem;
  font-style: italic;
  color: var(--color-text-muted, #888);
}
</style>
