<script setup lang="ts">
import FileTree from '@/components/features/FileTree.vue';
import { useFileTree } from '@/plugins/fileTreePlugin';
import { onBeforeMount } from 'vue';

const fileTree = useFileTree();

onBeforeMount(async () => {
  await fileTree.loadRoot();
});
</script>

<template>
  <div class="relative">
    <div class="library">
      <div class="library__container">
        <FileTree v-if="fileTree.rootFiles.value.length" :files="fileTree.rootFiles.value" />
      </div>
    </div>
  </div>
</template>