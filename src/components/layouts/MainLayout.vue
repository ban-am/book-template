<script setup lang="ts">
import { RouterView } from 'vue-router';
import SideNavigation from './navigation/SideNavigation.vue';
</script>

<template>
  
  <main class="flex grow bg-white">
    <SideNavigation />

    <div class="flex-1 px-4 bg-background">
      <RouterView />
    </div>
  </main>

  
  <RouterView  name="footer"/>
</template>

<style>
.bg-background {
  background: var(--p-bg-color-page)
}
</style>
