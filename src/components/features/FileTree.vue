<script setup lang="ts">
import { useFileProvider } from '@/plugins/file';
import { useFileTree, } from '../../plugins/fileTreePlugin';
import type { TreeFile } from '@/types';

const { files } = defineProps<{
  files: TreeFile[]
}>();

const fileProvider = useFileProvider();
const fileTree = useFileTree();

</script>

<template>
  <ul class="file-tree">
    <template v-for="(file, index) in files">
      <li class="cursor-pointer font-semibold" >
        <div class="file-tree__item" >
          <div class="flex-1 self-center" @click="fileTree.onSelectedFile(file)"> 
            <span v-if="file.isFolder">📁 </span>
            <span v-else>📄 </span>
            {{ file.data.name }}
            </div>
            
            <template v-if="file.isFolder">
              <button v-if="fileTree.favorites.value.some(f => f.data.id === file.data.id)"
                type="button" class="k-button k-button-sm k-rounded-md k-button-link" @click="fileTree.removeFavorite(file)">
                <span class="k-button-text">Remove Favorite</span>
              </button>

              <button v-else type="button" class="k-button k-button-sm k-rounded-md k-button-link" @click="fileTree.addFavorite(file)">
                <span class="k-button-text">Add Favorite</span>
              </button>
            </template>

            <template v-else>
              <button type="button" class="k-button k-button-sm k-rounded-md k-button-link" @click="fileProvider.addFile(file.data)">
                <span class="k-button-text">Open</span>
              </button>
            </template>
        </div>
      </li>

      <li v-if="!!file.folderFiles" class="ml-2">
        <FileTree :files="file.folderFiles" />
      </li>
    </template>
  </ul>
</template>

