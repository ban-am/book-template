<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

const isDark = ref(true);
const showSidebar = ref(true);
const route = useRoute();
const router = useRouter();

const onClick = (routeName: string) => {
  if (route.name === routeName)
    return;

  router.push({ name: routeName });
}

const onSidebar = () => {
  showSidebar.value = !showSidebar.value;
  document.documentElement.style.setProperty('--vp-sidebar-width-small', showSidebar.value ? '230px' : '0px');
}

onMounted(() => {
  isDark.value = localStorage.getItem('theme') == 'light' ? false : true;
})

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
  <div class="flex grow">
    <div class="action-bar bg-main border-r border-r-slate-600">
      <button class="p-2" @click="onSidebar">
        <span v-if="showSidebar" class="k-icon k-font-icon k-i-chevron-left k-icon-xl"></span>
        <span v-else class="k-icon k-font-icon k-i-chevron-right k-icon-xl"></span>
      </button>

      <button class="p-2" @click="onClick('files')">
        <span class="k-icon k-font-icon k-i-list-unordered-outline k-icon-xl"></span>
      </button>

      <button class="p-2" @click="onClick('favorites')">
        <span class="k-icon k-font-icon k-i-star-outline k-icon-xl"></span>
      </button>

      <div class="grow"></div>

      <button  class="p-2" @click="onTheme">
        <span class="k-icon k-font-icon k-i-brightness-contrast k-icon-xl"></span>
      </button>

      <RouterLink to="/auth" class="p-2">
        <span class="k-icon k-font-icon k-i-gear k-icon-xl"></span>
      </RouterLink>
    </div>

    <div class="bg-sec sidebar-size" v-if="showSidebar">
      <div class="p-2">
        <RouterView name="sidebar"/>
      </div>
    </div>
    
    <div class="flex-1 bg-main">
      <RouterView />
    </div>
  </div>
</template>

<style>
.action-bar {
  display: flex;
  flex-direction: column;
}

.sidebar-size {
  width: var(--vp-sidebar-width-small);
}
</style>
