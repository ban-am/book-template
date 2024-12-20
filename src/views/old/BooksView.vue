<script setup lang="ts">
  import { useBookProvider } from '@/plugins/book';
import { onMounted, ref } from 'vue';

  const bookProvider = useBookProvider();
  const iframeRef = ref<HTMLIFrameElement>();

  onMounted(() => {
    if (!iframeRef.value)
      return;

    bookProvider.setIframe(iframeRef.value);
  });
</script>

<template>
  
  <div class="my-4 flex flex-col gap-4 h-full" v-if="bookProvider.selectedBook.value">
    <div class="content shadow-md">
      <div class="content__container flex">
          <span class="font-bold">{{ bookProvider.selectedBook.value.fileInfo.name }}</span>
          <div class="grow"></div>
          <button type="button" class="k-button k-button-md k-rounded-md k-button-link with-underline" >
            <span class="k-button-text">Close</span>
          </button>
      </div>
    </div>

    <div class="content shadow-md  h-full">
      <div class="content__container">
        <iframe src="javascript:void(0);" ref="iframeRef" style="width: 100%; border: none; height: 100%;"></iframe>
      </div>
    </div>
  </div>
</template>