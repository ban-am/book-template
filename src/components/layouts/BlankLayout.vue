<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <main class="flex grow bg-white overflow-auto">
    <div class="flex-1 px-4 bg-background">
      <RouterView />
    </div>
  </main>
</template>

<style>
.bg-background {
  background: var(--p-bg-color-page)
}
</style>
