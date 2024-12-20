<script setup lang="ts">
import FileTree from '@/components/features/FileTree.vue';
import { useFileTree } from '@/plugins/fileTreePlugin';

const fileTree = useFileTree();
</script>

<template>
  <div class="relative">
    <div class="library">
      <div class="library__container">
        <FileTree v-if="fileTree.favorites.value.length" :files="fileTree.favorites.value" />
      </div>
    </div>
  </div>
</template>