<script setup lang="ts">
import { useDriveProvider } from '@/plugins/drive';
import type { GoogleDriveFile, GoogleDriveFileListResponse } from '@/plugins/drive/googleDriveProvider';
import { onMounted, ref } from 'vue';
import { useFileTreeProvider, type TreeFile } from './filteTree';

type Props = {
  data: GoogleDriveFileListResponse;
}

const fileTreeProvider = useFileTreeProvider();
const props = defineProps<Props>();
const files = ref<TreeFile[]>(fileTreeProvider.getFilteTreeFiles(props.data));

onMounted(() => {
});

</script>

<template>
  <ul class="file-tree">
    <template v-for="(file, index) in files">
      <li class="file-tree__item cursor-pointer font-semibold" @click="fileTreeProvider.onSelectedFile(file)">
         <span v-if="file.isFolder">📁 </span>
         <span v-else>📄 </span>
         {{ file.data.name }}
      </li>

      <li v-if="!!file.folderData" class="ml-4">
        <FileTree :data="file.folderData" />
      </li>
    </template>
  </ul>
</template>

