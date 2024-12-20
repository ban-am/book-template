<script setup lang="ts">
import type { GoogleDriveFile } from '@/plugins/drive/googleDriveProvider';
import { useFileProvider } from '@/plugins/file';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const fileProvider = useFileProvider();

const onFileSelect = (fileInfo: GoogleDriveFile) => {
  fileProvider.select(fileInfo);
  router.push({ name: 'file', params: { id: fileInfo.id } });
}
</script>

<template>
  <span class="font-semibold uppercase text-sm">Files</span>
  
  <div class="flex flex-col mt-2">
    <div v-for="fileInfo of fileProvider.files.value"
      class="link nav-link-item text-xs truncate cursor-pointer p-1" 
      :class="{ 'router-link-active': fileInfo.id === fileProvider.selectedFile.value?.id }"
      @click="onFileSelect(fileInfo)">
      {{ fileInfo.name }}
    </div>
  </div>
</template>

<style>
.nav-link-item.router-link-active {
  background-color: rgb(51 65 85);
}
</style>