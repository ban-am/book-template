<script setup lang="ts">
import { useFileProvider } from '@/plugins/file';
import type { ContentInfo } from '@/plugins/file/fileProvider';
import { onBeforeMount, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

let iframeRef: HTMLIFrameElement;

const fileProvider = useFileProvider();

let contentInfo: Ref<ContentInfo>;

const getOrAddContentInfo = () => {
  const id = route.params.id as string;
  contentInfo = fileProvider.getOrAddContentInfo(id);
}

const render = () => {
  fileProvider.renderPage(route.params.id as string);
}

onBeforeMount(() => {
  getOrAddContentInfo();
});

watch(() => route.params.id, () => {
  getOrAddContentInfo();
  render();

  if (iframeRef && iframeRef.contentWindow){
    iframeRef.contentWindow.document.open();
    iframeRef.contentWindow.document.write('');
    iframeRef.contentWindow.document.close();
  }
});

const onClose = () => {
  fileProvider.close(contentInfo.value.id);
  router.push({ name: 'library' });
}

const onRef = (ref: any) => {
  iframeRef = ref;
  getOrAddContentInfo();
  render();
}

const next = () => {
  contentInfo.value.page++;
  render();
}

const prev = () => {
  contentInfo.value.page--;
  render();
}

const goToPage = (page: number) => {
  contentInfo.value.page = page;
  render();
}
</script>

<template>
  <div class="h-full flex content-width">
    <div class="flex flex-col grow gap-2 p-1">
      <div class="p-2 bg-sec rounded-sm shadow-sm flex items-center">
        <span class="font-bold text-sm">{{ contentInfo.fileInfo.name }}</span>
        <div class="grow"></div>
        <button type="button" class="k-button k-button-sm k-button-link with-underline" @click="onClose" >
          <span class="k-button-text">Close</span>
        </button>
        <button type="button" class="k-button k-button-sm k-rounded-sm k-button-solid k-button-solid-primary" @click="fileProvider.saveFileState(contentInfo.fileInfo)" >
          <span class="k-button-text">Save</span>
        </button>
      </div>

      <div class="h-full bg-main rounded-sm shadow-sm">
        <div v-if="contentInfo.loading" class="middle bg-slate-900">
          <div>LOADING</div>
        </div>
        <iframe id="file-iframe" src="javascript:void(0);" :ref="onRef" style="width: 100%; border: none; height: 100%; color: white;"></iframe>
      </div>

      <div class="p-2 bg-sec rounded-sm shadow-sm flex items-center justify-between">
        <button type="button" class="k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary w-8" @click="prev">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" class="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>

        <div class="flex overflow-auto  footer-pagination">
          <button type="button" 
            v-for="(_, index) of [...Array(contentInfo.maxPage).keys()]" 
            class="k-button k-button-md k-rounded-md k-button-link k-button-link-base px-2"
            :class="{ 'k-button-active': contentInfo.page == index }"
            @click="() => goToPage(index)">
            {{ index + 1 }}
          </button>
        </div>
        
        <button type="button" class="k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary w-8" @click="next">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" class="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

</template>


<style>
.content-width {
  --content-width: calc(100vw - 45px - var(--vp-sidebar-width-small));
  width: var(--content-width);
}

.footer-pagination {
  width: calc(var(--content-width) - 8rem);
}

.k-button-active {
  background-color: var(--p-color-primary);
  color: white;
}
</style>