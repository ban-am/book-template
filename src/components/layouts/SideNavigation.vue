<script setup lang="ts">
import type { GoogleDriveFile } from '@/plugins/drive/googleDriveProvider';
import { useFileProvider } from '@/plugins/file';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router';

const route = useRoute();
const router = useRouter();
const fileProvider = useFileProvider();

const showSidebar = ref(true);
const isDark = ref(true);

const sideRoutes = ref<RouteRecordRaw[]>([]);
const baseRoutes = route.matched[0].children;

const setRoot = () => {
  for (let i = route.matched.length -1; i > 0; i--) {
    const item = route.matched[i];

    if (item.meta && item.meta.root) {
      sideRoutes.value = item.children;
      break;
    }
  }
}

onMounted(() => {
  isDark.value = localStorage.getItem('theme') == 'light' ? false : true;
  setRoot();
})

watch(() => route.path, () => {
  setRoot();
});

const onFileSelect = (fileInfo: GoogleDriveFile) => {
  fileProvider.select(fileInfo);
  router.push({ name: 'file', params: { id: fileInfo.id } });
}

const onShow = () => {
  showSidebar.value = !showSidebar.value;
  document.documentElement.style.setProperty('--vp-sidebar-width-small', showSidebar.value ? '230px' : '50px');
}

const onTheme = () => {
  isDark.value = !isDark.value;

  if (isDark.value) {
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.remove('theme-light');
  } else {
    document.documentElement.classList.add('theme-light');
    document.documentElement.classList.remove('theme-dark');
  }

  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}
</script>

<template>

 <div class="scrollbar sidebar" >
  <div class="scrollbar__wrap relative">

    <div class="sidebar-menu">
      <div class="sidebar-wrapper" v-if="showSidebar">
        <div class="font-semibold mb-2">Main routes</div>
        <template v-for="baseRoute of baseRoutes">
          <RouterLink v-if="baseRoute.meta" :to="{ name: baseRoute.name}"
            class="link nav-link-item">
              {{ baseRoute.meta.title }}
          </RouterLink>
        </template>

        <div class="font-semibold mb-2 mt-4">Files</div>
          <div v-for="fileInfo of fileProvider.files.value"
            class="link nav-link-item" 
            :class="{ 'router-link-active': fileInfo.id === fileProvider.selectedFile.value?.id }"
            @click="onFileSelect(fileInfo)">
            {{ fileInfo.name }}
          </div>
      </div>
    </div>

    <div class="absolute bottom-0 right-0 flex flex-col">
      <button @click="onTheme" class="k-button k-button-md k-rounded-sm k-button-link">
        <span class="k-button-text">
          {{ isDark ? 'Light' : 'Dark' }}
        </span>
      </button><button @click="onShow" class="k-button k-button-md k-rounded-sm k-button-link">
        <span class="k-button-text">
          {{ showSidebar ? 'Hide' : 'Show' }}
        </span>
      </button>
    </div>
  </div>
 </div>

</template>
