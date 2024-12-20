
<script setup lang="ts">
import FileTree from '@/components/features/fileTree/FileTree.vue';
import { FileTreeProvider } from '@/components/features/fileTree/filteTree';
import { useDriveProvider } from '@/plugins/drive';
import { useFileProvider } from '@/plugins/file';
import { onBeforeMount, onMounted, provide, ref } from 'vue';

const dirveProvider = useDriveProvider();
const fileProvider = useFileProvider();

const fileTree = new FileTreeProvider(dirveProvider);

provide('fileTree', fileTree);

onBeforeMount(async () => {
  await fileTree.loadRoot();
});
</script>

<template>
  <div class="mt-4 relative">
    <div class="library shadow-md">
      <div class="library__container">
        <FileTree v-if="!!fileTree.rootFolder.value" :data="fileTree.rootFolder.value" />
      </div>

      <div class="file-preview" v-if="fileTree.selectedFile.value">
        <div class="file-preview__container gap-2">
          <h3 class="font-semibold text-lg">{{ fileTree.selectedFile.value.data.name }}</h3>
          
          <div class="grow"></div>
          <button type="button" class="k-button k-button-md k-rounded-md k-button-link with-underline"  @click="fileTree.closeFile">
            <span class="k-button-text">Close</span>
          </button>

          <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary px-6" @click="fileProvider.addFile(fileTree.selectedFile.value.data)">
            Add file
          </button>

        </div>
      </div>
    </div>
    
  </div>
</template>

<style>
</style>